package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) GetPingHandler(c *gin.Context) {
	c.String(http.StatusOK, "Pong")
}
