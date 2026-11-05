package handler

import (
	"bytes"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"

	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	apierrors "github.com/xistorm/ascii_image/pkg/errors"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
	"github.com/xistorm/ascii_image/pkg/service"
)

var (
	ErrUploadForbidden          = apierrors.NewApiError("StatusForbidden", "Вы не можете просматривать чужие загрузки")
	ErrUploadNotFound           = apierrors.NewApiError("StatusNotFound", "Такой загрузки не существует")
	ErrUploadInvalidCredentials = apierrors.NewApiError("StatusInvalidCredentials", "Некорректные данные картинки")
	ErrUploadConflict           = apierrors.NewApiError("StatusConflict", "Такая загрузка уже существует")
)

func (h *Handler) GetUploadsHandler(c *gin.Context) {
	token, err := jwt_token.GetToken(c)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	user, err := h.Services.Authorization.Authorize(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	uploads, err := h.Services.Upload.GetUploads(user.Id)
	if errors.Is(err, service.ErrNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, ErrUploadNotFound)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	c.JSON(http.StatusOK, uploads)
}

func (h *Handler) GetUploadHandler(c *gin.Context) {
	token, err := jwt_token.GetToken(c)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	user, err := h.Services.Authorization.Authorize(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	uploadId := c.Param("id")
	upload, err := h.Services.Upload.GetUpload(uploadId)
	if errors.Is(err, service.ErrNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, ErrUploadNotFound)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	if upload == nil || upload.UserId != user.Id {
		c.AbortWithStatusJSON(http.StatusForbidden, ErrUploadForbidden)
		return
	}

	c.JSON(http.StatusOK, upload)
}

func (h *Handler) CreateUploadHandler(c *gin.Context) {
	token, err := jwt_token.GetToken(c)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	user, err := h.Services.Authorization.Authorize(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
		return
	}

	src, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer src.Close()

	buf := new(bytes.Buffer)
	if _, err := buf.ReadFrom(src); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось прочитать файл"})
		return
	}
	imageBytes := buf.Bytes()

	id := c.PostForm("id")
	if id == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
		return
	}

	name := c.PostForm("name")
	if name == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
		return
	}

	mime := c.PostForm("type")
	if mime == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
		return
	}

	qualityRaw := c.PostForm("quality")
	quality, err := strconv.Atoi(qualityRaw)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
		return
	}

	alphabet := c.PostForm("alphabet")
	if alphabet == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
	}

	parameter := &dto.ParameterInfo{
		Id:       uuid.NewString(),
		Quality:  quality,
		Alphabet: alphabet,
	}

	file := &dto.FileInfo{
		Id:       uuid.NewString(),
		MimeType: mime,
		Name:     name,
		Kind:     dto.ImageOriginalKind,
		Theme:    dto.ImageCommonTheme,
		Data:     imageBytes,
	}

	uploadData := &dto.Upload{
		Id:        id,
		UserId:    user.Id,
		Status:    dto.UploadStatusPending,
		CreatedAt: time.Now(),
		Parameter: parameter,
		Files:     []*dto.FileInfo{file},
	}

	upload, err := h.Services.Upload.CreateUpload(c.Request.Context(), uploadData)
	if errors.Is(err, service.ErrConflict) {
		c.AbortWithStatusJSON(http.StatusConflict, ErrUploadConflict)
		return
	}
	if errors.Is(err, service.ErrInvalidCredentials) {
		c.AbortWithStatusJSON(http.StatusBadRequest, ErrUploadInvalidCredentials)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	c.JSON(http.StatusOK, upload)
}

func (h *Handler) DeleteUploadHandler(c *gin.Context) {
	token, err := jwt_token.GetToken(c)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	user, err := h.Services.Authorization.Authorize(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, ErrUnauthorized)
		return
	}

	uploadId := c.Param("id")
	upload, err := h.Services.Upload.GetUpload(uploadId)
	if errors.Is(err, service.ErrNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, ErrUploadNotFound)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	if upload == nil || upload.UserId != user.Id {
		c.AbortWithStatusJSON(http.StatusForbidden, ErrUploadForbidden)
		return
	}

	err = h.Services.Upload.DeleteUpload(uploadId)
	if errors.Is(err, service.ErrNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, ErrUploadNotFound)
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, ErrInternal)
		return
	}

	c.Status(http.StatusOK)
}
