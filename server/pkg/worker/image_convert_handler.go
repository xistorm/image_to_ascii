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
	FileRepository       repository.FileRepository
	GenerationRepository repository.GenerationRepository
}

func NewImageConvertHandler(
	uploadRepository repository.UploadRepository,
	fileRepository repository.FileRepository,
	generationRepository repository.GenerationRepository,
) *ImageConvertHandler {
	return &ImageConvertHandler{
		UploadRepository:     uploadRepository,
		FileRepository:       fileRepository,
		GenerationRepository: generationRepository,
	}
}

func (s *ImageConvertHandler) Handle(ctx context.Context, t *task.Task) error {
	convertImageTask, err := t.UnmarshallConvertImageTask()
	uploadStatus := dto.UPLOAD_STATUS_SUCCESS
	if err != nil {
		return err
	}

	upload, err := s.UploadRepository.GetUpload(convertImageTask.Payload.UploadId)
	if err != nil {
		uploadStatus = dto.UPLOAD_STATUS_ERROR
		return err
	}

	file, err := s.FileRepository.GetUploadFile(upload.Id)
	if err != nil {
		uploadStatus = dto.UPLOAD_STATUS_ERROR
		return err
	}

	encodedFileData := base64.StdEncoding.EncodeToString(file.Data)
	parsedImage, err := image.FromBase64(file.Type, encodedFileData)
	if err != nil {
		uploadStatus = dto.UPLOAD_STATUS_ERROR
		return err
	}

	convertedImage := image.ToGreyScale(parsedImage)
	encodedConvertedImage, err := image.ToBase64(file.Type, convertedImage)
	if err != nil {
		uploadStatus = dto.UPLOAD_STATUS_ERROR
		return err
	}

	generation := model.Generation{
		Id:       uuid.NewString(),
		UploadId: upload.Id,
		SeqIndex: 0,
		Content:  encodedConvertedImage,
	}

	if _, err := s.GenerationRepository.CreateGeneration(&generation); err != nil {
		uploadStatus = dto.UPLOAD_STATUS_ERROR
		return err
	}

	upload.Status = uploadStatus
	if _, err := s.UploadRepository.UpdateUpload(upload.Id, upload); err != nil {
		return err
	}

	return nil
}
