package service

import (
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

type User interface {
	GetUsers() ([]model.User, error)
	GetUser(string) (*model.User, error)
	AddUser(*model.User) (*model.User, error)
	DeleteUser(string) error
	UpdateUser(string, *model.User) error
}

type Authorization interface {
	Authorize(*jwt.Token) (*model.User, error)
	Login(string, string) (string, error)
	SignUp(*model.User) (string, error)
}

type Service struct {
	User
	Authorization
}

func NewService(repositories *repository.Repository) *Service {
	return &Service{
		User:          NewUserService(repositories.UserRepository),
		Authorization: NewAuthorizationService(repositories.UserRepository),
	}
}
