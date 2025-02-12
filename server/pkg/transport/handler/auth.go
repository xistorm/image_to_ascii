package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
	"net/http"
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
		c.String(http.StatusUnauthorized, "invalid token")
		return
	}

	user, err := h.services.Authorization.Authorize(token)
	if err != nil {
		c.String(http.StatusUnauthorized, "invalid token")
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *Handler) LoginHandler(c *gin.Context) {
	var loginData LoginRequest
	if err := c.BindJSON(&loginData); err != nil {
		c.String(http.StatusBadRequest, "Incorrect data")
		return
	}

	user, token, err := h.services.Authorization.Login(loginData.Login, loginData.Password)
	if err != nil {
		c.String(http.StatusBadRequest, "Incorrect data")
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
		c.String(http.StatusBadRequest, "Incorrect data")
		return
	}

	user, token, err := h.services.Authorization.SignUp(&userData)
	if err != nil {
		c.String(http.StatusBadRequest, "Incorrect data")
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		User:  user,
	})
}
