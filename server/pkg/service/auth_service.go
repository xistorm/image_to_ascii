package service

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"golang.org/x/crypto/bcrypt"
	"time"
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

func (s *AuthorizationService) Login(login, password string) (string, error) {
	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return "", fmt.Errorf("there is no user with login: %w", err)
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return "", fmt.Errorf("invalid password")
	}

	claimsOpts := jwt.StandardClaims{
		Id:        user.Login,
		Issuer:    "ascii_image",
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsOpts)

	token, err := claims.SignedString(config.Cfg.Server.JwtToken)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *AuthorizationService) SignUp(user *model.User) (*model.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user.Password = string(hash)

	return s.userRepository.CreateUser(user)
}
