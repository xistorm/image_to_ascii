package handler

import (
	"github.com/gin-gonic/gin"
	apierrors "github.com/xistorm/ascii_image/pkg/errors"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/service"
	"github.com/xistorm/ascii_image/pkg/transport/middleware"
)

var (
	ErrUnauthorized = apierrors.NewApiError("StatusUnauthorized", "Необходимо авторизоваться")
	ErrBadRequest   = apierrors.NewApiError("StatusBadRequest", "Некорректные данные")
	ErrInternal     = apierrors.NewApiError("StatusInternalServerError", "Ошибка сервера")
)

type Handler struct {
	Services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{
		Services: services,
	}
}

func (h *Handler) Routes() *gin.Engine {
	gin.SetMode(config.Cfg.Server.Mode)

	router := gin.New()

	router.Use(gin.Logger())
	router.Use(middleware.CORSMiddleware())

	router.GET("/ping", h.PingHandler)

	api := router.Group("/api")
	{
		api.GET("/auth", middleware.JWTAuthMiddleware(), h.AuthHandler)
		api.POST("/login", h.LoginHandler)
		api.PUT("/signup", h.SignUpHandler)

		upload := api.Group("/uploads", middleware.JWTAuthMiddleware())
		{
			upload.GET("/", h.GetUploadsHandler)
			upload.GET("/:id", h.GetUploadHandler)
			upload.PUT("/", h.CreateUploadHandler)
			upload.DELETE("/:id", h.DeleteUploadHandler)
		}
	}

	return router
}
