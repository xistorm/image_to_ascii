package worker

import (
	"context"
	"encoding/base64"

	"github.com/google/uuid"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/lib/image"
)

type ImageConvertHandler struct {
	UploadRepository     repository.UploadRepository
	ParameterRepository  repository.ParameterRepository
	FileRepository       repository.FileRepository
	GenerationRepository repository.GenerationRepository
}

func NewImageConvertHandler(
	uploadRepository repository.UploadRepository,
	parameterRepository repository.ParameterRepository,
	fileRepository repository.FileRepository,
	generationRepository repository.GenerationRepository,
) *ImageConvertHandler {
	return &ImageConvertHandler{
		UploadRepository:     uploadRepository,
		ParameterRepository:  parameterRepository,
		FileRepository:       fileRepository,
		GenerationRepository: generationRepository,
	}
}

func (s *ImageConvertHandler) Handle(ctx context.Context, t *task.Task) error {
	convertImageTask, err := t.UnmarshallConvertImageTask()
	uploadStatus := dto.UploadStatusSuccess
	if err != nil {
		uploadStatus = dto.UploadStatusError
		return err
	}

	upload, err := s.UploadRepository.GetUpload(convertImageTask.Payload.UploadId)
	if err != nil {
		uploadStatus = dto.UploadStatusError
		return err
	}

	defer func() {
		upload.Status = uploadStatus
		s.UploadRepository.UpdateUpload(upload.Id, upload)
	}()

	parameter, err := s.ParameterRepository.GetUploadParameter(convertImageTask.Payload.UploadId)
	if err != nil {
		uploadStatus = dto.UploadStatusError
		return err
	}

	file, err := s.FileRepository.GetUploadFile(upload.Id)
	if err != nil {
		uploadStatus = dto.UploadStatusError
		return err
	}

	encodedFileData := base64.StdEncoding.EncodeToString(file.Data)
	parsedImage, err := image.FromBase64(file.Type, encodedFileData)
	if err != nil {
		uploadStatus = dto.UploadStatusError
		return err
	}

	generation := model.Generation{
		Id:       uuid.NewString(),
		UploadId: upload.Id,
		SeqIndex: 0,
		Content:  image.ToAsciiText(parsedImage, parameter.CharWidth, parameter.CharHeight),
	}

	if _, err := s.GenerationRepository.CreateGeneration(&generation); err != nil {
		uploadStatus = dto.UploadStatusError
		return err
	}

	return nil
}
