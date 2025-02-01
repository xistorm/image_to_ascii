package service

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/model"
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

func (s *AuthorizationService) Authorize(token *jwt.Token) (*model.User, error) {
	claims := token.Claims.(jwt.MapClaims)
	login := claims["jti"].(string)

	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *AuthorizationService) Login(login, password string) (*model.User, string, error) {
	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return nil, "", fmt.Errorf("there is no user with login: %w", err)
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return nil, "", fmt.Errorf("invalid password")
	}

	token, err := jwt_token.CreateToken(user.Login)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *AuthorizationService) SignUp(user *model.User) (*model.User, string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}
	user.Password = string(hash)

	newUser, err := s.userRepository.CreateUser(user)
	if err != nil {
		return nil, "", err
	}

	token, err := jwt_token.CreateToken(newUser.Login)

	return newUser, token, err
}
