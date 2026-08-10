package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetUploadsHandler(c *gin.Context) {
	c.String(http.StatusOK, "Uploads")
}

func (h *Handler) GetUploadHandler(c *gin.Context) {
	c.String(http.StatusOK, "Uploads")
}

func (h *Handler) CreateUploadHandler(c *gin.Context) {
	c.String(http.StatusOK, "Uploads")
}
