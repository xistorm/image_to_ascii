package service

import (
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

type User interface {
	GetUsers() ([]*dto.User, error)
	GetUser(string) (*dto.User, error)
	AddUser(*dto.User) (*dto.User, error)
	DeleteUser(string) error
	UpdateUser(string, *dto.User) error
}

type Authorization interface {
	Authorize(*jwt.Token) (*dto.User, error)
	Login(string, string) (*dto.User, string, error)
	SignUp(*dto.User) (*dto.User, string, error)
}

type Image interface {
	GetImages() ([]*dto.Image, error)
	GetImage(string) (*dto.Image, error)
	GetUserImages(string) ([]*dto.Image, error)
	ConvertImageToAscii(*dto.Image) (*dto.Image, error)
	UploadImage(*dto.Image, *dto.User) (string, error)
	DeleteImage(string) error
}

type Service struct {
	User
	Authorization
	Image
}

func NewService(repositories *repository.Repository) *Service {
	return &Service{
		User:          NewUserService(repositories.UserRepository),
		Authorization: NewAuthorizationService(repositories.UserRepository),
		Image:         NewImageService(repositories.ImageRepository, repositories.UserRepository),
	}
}
