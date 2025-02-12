package service

import (
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

type UserService struct {
	userRepository repository.UserRepository
}

func NewUserService(userRepository repository.UserRepository) *UserService {
	return &UserService{userRepository: userRepository}
}

func (s *UserService) GetUsers() ([]*dto.User, error) {
	users, err := s.userRepository.GetUsers()
	if err != nil {
		return nil, err
	}

	var usersDto []*dto.User
	for _, user := range users {
		userDto := dto.UserFromModel(user)
		usersDto = append(usersDto, userDto)
	}

	return usersDto, nil
}

func (s *UserService) GetUser(id string) (*dto.User, error) {
	user, err := s.userRepository.GetUser(id)
	if err != nil {
		return nil, err
	}

	userDto := dto.UserFromModel(user)
	return userDto, nil
}

func (s *UserService) AddUser(userDataDto *dto.User) (*dto.User, error) {
	userData := dto.UserToModel(userDataDto)

	user, err := s.userRepository.CreateUser(userData)
	if err != nil {
		return nil, err
	}

	userDto := dto.UserFromModel(user)

	return userDto, nil
}

func (s *UserService) DeleteUser(login string) error {
	return s.userRepository.DeleteUser(login)
}

func (s *UserService) UpdateUser(login string, userDataDto *dto.User) error {
	userData := dto.UserToModel(userDataDto)

	return s.userRepository.UpdateUser(login, userData)
}
