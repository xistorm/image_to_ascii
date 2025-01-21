package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"net/http"
)

type LoginRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type LoginResponse struct {
	User  *model.User `json:"user"`
	Token string      `json:"token"`
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

	c.JSON(http.StatusOK, LoginResponse{
		User:  user,
		Token: token,
	})
}

func (h *Handler) SignUpHandler(c *gin.Context) {
	var userData model.User
	if err := c.BindJSON(&userData); err != nil {
		c.String(http.StatusBadRequest, "Incorrect data")
		return
	}

	user, err := h.services.Authorization.SignUp(&userData)
	if err != nil {
		c.String(http.StatusBadRequest, "Incorrect data")
		return
	}

	c.JSON(http.StatusOK, user)
}
