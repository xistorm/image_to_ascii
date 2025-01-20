package service

import (
	"github.com/xistorm/ascii_image/pkg/model"
	"github.com/xistorm/ascii_image/pkg/repository"
)

type User interface {
	GetUsers() ([]model.User, error)
	GetUser(string) (*model.User, error)
	AddUser(*model.User) (*model.User, error)
	DeleteUser(string) error
	UpdateUser(string, *model.User) error
}

type Service struct {
	User
}

func NewService(repositories *repository.Repository) *Service {
	return &Service{
		User: NewUserService(repositories.UserRepository),
	}
}
