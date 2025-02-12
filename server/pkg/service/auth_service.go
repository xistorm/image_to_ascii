package service

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
	"golang.org/x/crypto/bcrypt"
)

type AuthorizationService struct {
	userRepository repository.UserRepository
}

func NewAuthorizationService(userRepository repository.UserRepository) *AuthorizationService {
	return &AuthorizationService{userRepository: userRepository}
}

func (s *AuthorizationService) Authorize(token *jwt.Token) (*dto.User, error) {
	claims := token.Claims.(jwt.MapClaims)
	login := claims["jti"].(string)

	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return nil, err
	}

	userDTO := dto.UserFromModel(user)
	return userDTO, nil
}

func (s *AuthorizationService) Login(login, password string) (*dto.User, string, error) {
	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return nil, "", fmt.Errorf("there is no user with login: %w", err)
	}

	userDTO := dto.UserFromModel(user)

	if bcrypt.CompareHashAndPassword([]byte(userDTO.Password), []byte(password)) != nil {
		return nil, "", fmt.Errorf("invalid password")
	}

	token, err := jwt_token.CreateToken(userDTO.Login)
	if err != nil {
		return nil, "", err
	}

	return userDTO, token, nil
}

func (s *AuthorizationService) SignUp(userDataDTO *dto.User) (*dto.User, string, error) {
	user := dto.UserToModel(userDataDTO)

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}
	user.Password = string(hash)

	newUser, err := s.userRepository.CreateUser(user)
	if err != nil {
		return nil, "", err
	}

	userDTO := dto.UserFromModel(newUser)
	token, err := jwt_token.CreateToken(newUser.Login)

	return userDTO, token, err
}
