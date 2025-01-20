package service

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/config"
	"github.com/xistorm/ascii_image/pkg/model"
	"github.com/xistorm/ascii_image/pkg/repository"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type AuthorizationService struct {
	userRepository repository.UserRepository
}

func NewAuthorizationService(userRepository repository.UserRepository) *AuthorizationService {
	return &AuthorizationService{userRepository: userRepository}
}

func (s *AuthorizationService) Login(login, password string) (*model.User, string, error) {
	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return nil, "", fmt.Errorf("there is no user with login: %w", err)
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return nil, "", fmt.Errorf("invalid password")
	}

	claimsOpts := jwt.StandardClaims{
		Issuer:    user.Id,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsOpts)

	token, err := claims.SignedString(config.Cfg.Server.JwtToken)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *AuthorizationService) SignUp(user *model.User) (*model.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user.Password = string(hash)

	return s.userRepository.CreateUser(user)
}
