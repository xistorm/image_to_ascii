package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
)

type UploadsResponse struct {
	Uploads []*dto.Upload `json:"uploads"`
}

type UploadResponse struct {
	Upload *dto.Upload `json:"upload"`
}

func (h *Handler) GetUploadsHandler(c *gin.Context) {
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

	uploads, err := h.Services.Upload.GetUploads(user.Id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUserNotFound)
	}

	c.JSON(http.StatusOK, &UploadsResponse{
		Uploads: uploads,
	})
}

func (h *Handler) GetUploadHandler(c *gin.Context) {
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

	uploadId := c.Param("id")
	upload, err := h.Services.Upload.GetUpload(uploadId)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUserNotFound)
	}

	if upload == nil || upload.UserId != user.Id {
		c.AbortWithStatusJSON(http.StatusNotFound, ErrUserNotFound)
	}

	c.JSON(http.StatusOK, &UploadResponse{
		Upload: upload,
	})
}

func (h *Handler) CreateUploadHandler(c *gin.Context) {
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

	var upload *dto.Upload
	if err := c.BindJSON(&upload); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrBadRequest)
	}
	upload.UserId = user.Id

	if _, err := h.Services.Upload.CreateUpload(upload); err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUserNotFound)
	}

	c.JSON(http.StatusOK, &UploadResponse{
		Upload: upload,
	})
}
