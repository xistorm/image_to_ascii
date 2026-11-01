package object_storage

import (
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type ObjectStorage struct {
	S3 *s3.Client
}

func NewObjectStorage() (*ObjectStorage, error) {
	s3Storage, err := NewS3Storage()
	if err != nil {
		return nil, err
	}

	objectStorage := &ObjectStorage{
		S3: s3Storage,
	}

	return objectStorage, nil
}
