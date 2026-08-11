package worker

import (
	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

type Handler struct {
	ImageConvert task.Handler
}

func NewHandler(repositories *repository.Repository) *Handler {
	return &Handler{
		ImageConvert: NewImageConvertHandler(
			repositories.UploadRepository,
			repositories.FileRepository,
			repositories.GenerationRepository,
		),
	}
}
