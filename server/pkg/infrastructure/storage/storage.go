package storage

import (
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/infrastructure/object_storage"
)

type ImageStorage interface {
	Put(*model.File) error
	Get(*model.File) ([]byte, error)
	Delete(*model.File) error
	GetUrl(*model.File) (string, error)
}

type Storage struct {
	ImageStorage
}

func NewStorage(objectStorage *object_storage.ObjectStorage) *Storage {
	bucket := config.Cfg.Storage.Bucket

	return &Storage{
		ImageStorage: NewImageS3(objectStorage.S3, bucket),
	}
}
