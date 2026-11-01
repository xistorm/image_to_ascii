package worker

import (
	"bytes"
	"context"
	"encoding/base64"
	stdimage "image"
	"image/color"
	"image/gif"

	"github.com/google/uuid"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/infrastructure/storage"
	"github.com/xistorm/ascii_image/pkg/lib/image"
	"github.com/xistorm/ascii_image/pkg/lib/slice"
)

type ImageConvertHandler struct {
	UploadRepository    repository.UploadRepository
	ParameterRepository repository.ParameterRepository
	FileRepository      repository.FileRepository
	ImageStorage        storage.ImageStorage
}

func NewImageConvertHandler(
	uploadRepository repository.UploadRepository,
	parameterRepository repository.ParameterRepository,
	fileRepository repository.FileRepository,
	imageStorage storage.ImageStorage,
) *ImageConvertHandler {
	return &ImageConvertHandler{
		UploadRepository:    uploadRepository,
		ParameterRepository: parameterRepository,
		FileRepository:      fileRepository,
		ImageStorage:        imageStorage,
	}
}

func (s *ImageConvertHandler) Handle(ctx context.Context, t *task.Task) error {
	convertImageTask, err := t.UnmarshallConvertImageTask()
	uploadStatus := dto.UploadStatusError
	if err != nil {
		return err
	}

	upload, err := s.UploadRepository.GetUpload(convertImageTask.Payload.UploadId)
	if err != nil {
		return err
	}

	defer func() {
		upload.Status = uploadStatus
		s.UploadRepository.UpdateUpload(upload.Id, upload)
	}()

	parameter, err := s.ParameterRepository.GetUploadParameter(convertImageTask.Payload.UploadId)
	if err != nil {
		return err
	}

	files, err := s.FileRepository.GetUploadFiles(upload.Id)
	if err != nil {
		return err
	}

	originalFile, err := slice.Find(files, func(file *model.File) bool {
		return file.Kind == dto.ImageOriginalKind
	})
	if err != nil {
		return err
	}

	originalFileData, err := s.ImageStorage.Get(originalFile)
	if err != nil {
		return err
	}

	encodedFileData := base64.StdEncoding.EncodeToString(originalFileData)
	imageCfg, _, err := stdimage.DecodeConfig(bytes.NewReader(originalFileData))
	if err != nil {
		return err
	}

	asciiFrames, err := image.ToAsciiText(
		originalFile.MimeType,
		encodedFileData,
		parameter.CharWidth,
		parameter.CharHeight,
	)
	if err != nil {
		return err
	}

	var gifParams image.RenderAsciiGifParams
	originalGIF, err := gif.DecodeAll(bytes.NewReader(originalFileData))
	if err == nil {
		gifParams.LoopCount = originalGIF.LoopCount
		gifParams.Delay = originalGIF.Delay
	}

	imageParams := image.RenderAsciiSizeParams{
		Width:  imageCfg.Width,
		Height: imageCfg.Height,
	}
	charParams := image.RenderAsciiSizeParams{
		Width:  parameter.CharWidth,
		Height: parameter.CharHeight,
	}
	palettes := []image.RenderAsciiPaletteParams{
		{
			Name:            dto.ImageLightTheme,
			ForegroundColor: color.Black,
			BackgroundColor: color.White,
		},
		{
			Name:            dto.ImageDarkTheme,
			ForegroundColor: color.White,
			BackgroundColor: color.Black,
		},
	}
	for _, palette := range palettes {
		renderParams := image.RenderAsciiParams{
			Image:   imageParams,
			Char:    charParams,
			Palette: palette,
			Gif:     gifParams,
		}
		asciiImage, err := image.RenderAsciiImage(originalFile.MimeType, asciiFrames, renderParams)
		if err != nil {
			return err
		}

		asciiFileModel := &model.File{
			Id:       uuid.NewString(),
			UploadId: originalFile.UploadId,
			MimeType: originalFile.MimeType,
			Name:     originalFile.Name,
			Kind:     dto.ImageAsciiKind,
			Theme:    palette.Name,
			Data:     asciiImage,
		}
		if err := s.ImageStorage.Put(asciiFileModel); err != nil {
			return err
		}
		if _, err := s.FileRepository.CreateFile(asciiFileModel); err != nil {
			return err
		}
	}

	uploadStatus = dto.UploadStatusSuccess

	return nil
}
