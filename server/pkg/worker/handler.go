package worker

import (
	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/infrastructure/storage"
)

type Handler struct {
	ImageConvert task.Handler
}

func NewHandler(repositories *repository.Repository, storages *storage.Storage) *Handler {
	return &Handler{
		ImageConvert: NewImageConvertHandler(
			repositories.UploadRepository,
			repositories.ParameterRepository,
			repositories.FileRepository,
			storages.ImageStorage,
		),
	}
}
