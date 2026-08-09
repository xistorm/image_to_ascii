package service

import (
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

type Authorization interface {
	Authorize(*jwt.Token) (*dto.User, error)
	Login(string, string) (*dto.User, string, error)
	SignUp(*dto.User) (*dto.User, string, error)
}

type Service struct {
	Authorization
}

func NewService(repositories *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthorizationService(repositories.UserRepository),
	}
}
