package service

import (
	"github.com/xistorm/ascii_image/pkg/model"
	"github.com/xistorm/ascii_image/pkg/repository"
)

type UserService struct {
	userRepository repository.UserRepository
}

func NewUserService(userRepository repository.UserRepository) *UserService {
	return &UserService{userRepository: userRepository}
}

func (s *UserService) GetUsers() ([]model.User, error) {
	return s.userRepository.GetUsers()
}

func (s *UserService) GetUser(id string) (*model.User, error) {
	return s.userRepository.GetUser(id)
}

func (s *UserService) AddUser(user *model.User) (*model.User, error) {
	return s.userRepository.CreateUser(user)
}

func (s *UserService) DeleteUser(login string) error {
	return s.userRepository.DeleteUser(login)
}

func (s *UserService) UpdateUser(login string, user *model.User) error {
	return s.userRepository.UpdateUser(login, user)
}
