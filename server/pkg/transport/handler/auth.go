package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	apierrors "github.com/xistorm/ascii_image/pkg/errors"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
	"github.com/xistorm/ascii_image/pkg/service"
)

var (
	ErrUserNotFound           = apierrors.NewApiError("StatusNotFound", "Такого пользователя не существует")
	ErrUserInvalidCredentials = apierrors.NewApiError("StatusInvalidCredentials", "Некорректный пароль")
	ErrUserConflict           = apierrors.NewApiError("StatusConflict", "Такой пользователь уже существует")
)

type LoginRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token string    `json:"token"`
	User  *dto.User `json:"user"`
}

func (h *Handler) AuthHandler(c *gin.Context) {
	token, err := jwt_token.GetToken(c)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	user, err := h.Services.Authorization.Authorize(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUserNotFound)
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token.Raw,
		User:  user,
	})
}

func (h *Handler) LoginHandler(c *gin.Context) {
	var loginData LoginRequest
	if err := c.BindJSON(&loginData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrBadRequest)
		return
	}

	user, token, err := h.Services.Authorization.Login(loginData.Login, loginData.Password)
	if errors.Is(err, service.ErrNotFound) {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUserNotFound)
		return
	}
	if errors.Is(err, service.ErrInvalidCredentials) {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUserInvalidCredentials)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		User:  user,
	})
}

func (h *Handler) SignUpHandler(c *gin.Context) {
	var userData dto.User
	if err := c.BindJSON(&userData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrBadRequest)
		return
	}

	user, token, err := h.Services.Authorization.SignUp(&userData)
	if errors.Is(err, service.ErrInvalidCredentials) {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrBadRequest)
		return
	}
	if errors.Is(err, service.ErrConflict) {
		c.AbortWithStatusJSON(http.StatusConflict, ErrUserConflict)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		User:  user,
	})
}
