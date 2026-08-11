package worker

import (
	"context"

	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
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
	return nil
}
