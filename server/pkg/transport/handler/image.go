package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"net/http"
)

type UploadRequest struct {
	File *dto.Image `json:"file"`
	User *dto.User  `json:"user"`
}

type UploadResponse struct {
	Id string `json:"id"`
}

func (h *Handler) ImagesHandler(c *gin.Context) {
	images, err := h.services.Image.GetImages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, images)
}

func (h *Handler) ImageHandler(c *gin.Context) {
	id := c.Param("id")
	image, err := h.services.Image.GetImage(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, image)
}

func (h *Handler) ConvertHandler(c *gin.Context) {
	var imageData *dto.Image
	if err := c.BindJSON(&imageData); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	image, err := h.services.Image.ConvertImageToAscii(imageData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, image)
}

func (h *Handler) UploadHandler(c *gin.Context) {
	var req UploadRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Image.UploadImage(req.File, req.User)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, UploadResponse{
		Id: id,
	})
}

func (h *Handler) DeleteHandler(c *gin.Context) {
	id := c.Param("id")
	err := h.services.Image.DeleteImage(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.Status(http.StatusOK)
}
