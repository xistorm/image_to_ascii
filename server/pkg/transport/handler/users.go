package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"net/http"
)

func (h *Handler) UsersHandler(c *gin.Context) {
	users, err := h.services.User.GetUsers()
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, users)
}

func (h *Handler) UserHandler(c *gin.Context) {
	login := c.Param("login")

	user, err := h.services.User.GetUser(login)
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *Handler) CreateUserHandler(c *gin.Context) {
	var userData model.User

	if err := c.BindJSON(&userData); err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	user, err := h.services.User.AddUser(&userData)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *Handler) DeleteUserHandler(c *gin.Context) {
	login := c.Param("login")

	err := h.services.User.DeleteUser(login)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (h *Handler) UpdateUserHandler(c *gin.Context) {
	var userData model.User
	login := c.Param("login")
	if err := c.BindJSON(&userData); err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	err := h.services.User.UpdateUser(login, &userData)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, userData)
}
