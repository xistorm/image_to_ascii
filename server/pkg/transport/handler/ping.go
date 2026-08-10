package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) PingHandler(c *gin.Context) {
	c.String(http.StatusOK, "Pong")
}
