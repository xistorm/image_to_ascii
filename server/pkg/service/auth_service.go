package service

import (
	"errors"

	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid_credentials")
	ErrUserNotFound       = errors.New("not_found")
	ErrUserConflict       = errors.New("user_conflict")
	ErrInternal           = errors.New("internal_error")
)

type AuthorizationService struct {
	UserRepository repository.UserRepository
}

func NewAuthorizationService(userRepository repository.UserRepository) *AuthorizationService {
	return &AuthorizationService{UserRepository: userRepository}
}

func (s *AuthorizationService) Authorize(token *jwt.Token) (*dto.User, error) {
	claims := token.Claims.(jwt.MapClaims)
	login, ok := claims["jti"].(string)
	if !ok {
		return nil, ErrInvalidCredentials
	}

	user, err := s.UserRepository.GetUser(login)
	if errors.Is(err, repository.ErrNotFound) {
		return nil, ErrUserNotFound
	}
	if err != nil {
		return nil, ErrInternal
	}

	userDTO := dto.UserFromModel(user)
	return userDTO, nil
}

func (s *AuthorizationService) Login(login, password string) (*dto.User, string, error) {
	user, err := s.UserRepository.GetUser(login)
	if err != nil {
		return nil, "", ErrUserNotFound
	}

	userDTO := dto.UserFromModel(user)

	if bcrypt.CompareHashAndPassword([]byte(userDTO.Password), []byte(password)) != nil {
		return nil, "", ErrInvalidCredentials
	}

	token, err := jwt_token.CreateToken(userDTO.Login)
	if err != nil {
		return nil, "", ErrInternal
	}

	return userDTO, token, nil
}

func (s *AuthorizationService) SignUp(userDataDTO *dto.User) (*dto.User, string, error) {
	user := dto.UserToModel(userDataDTO)

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", ErrInternal
	}
	user.Password = string(hash)

	newUser, err := s.UserRepository.CreateUser(user)
	if errors.Is(err, repository.ErrPrimaryKeyConflict) {
		return nil, "", ErrUserConflict
	}

	if err != nil {
		return nil, "", ErrInternal
	}

	userDTO := dto.UserFromModel(newUser)
	token, err := jwt_token.CreateToken(newUser.Login)
	if err != nil {
		return nil, "", ErrInternal
	}

	return userDTO, token, nil
}
