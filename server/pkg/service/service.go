package service

import (
	"context"
	"errors"

	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/queue"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrNotFound           = errors.New("not_found")
	ErrConflict           = errors.New("conflict")
	ErrInternal           = errors.New("internal")
)

type Authorization interface {
	Authorize(*jwt.Token) (*dto.User, error)
	Login(string, string) (*dto.User, string, error)
	SignUp(*dto.User) (*dto.User, string, error)
}

type Upload interface {
	GetUploads(string) ([]*dto.Upload, error)
	GetUpload(string) (*dto.Upload, error)
	CreateUpload(context.Context, *dto.Upload) (*dto.Upload, error)
	DeleteUpload(string) error
}

type Service struct {
	Authorization
	Upload
}

func NewService(repositories *repository.Repository, queues *queue.Queue) *Service {
	return &Service{
		Authorization: NewAuthorizationService(repositories.UserRepository),
		Upload: NewUploadService(
			queues.ConvertImageQueue,
			repositories.UserRepository,
			repositories.UploadRepository,
			repositories.ParameterRepository,
			repositories.FileRepository,
			repositories.GenerationRepository,
		),
	}
}
