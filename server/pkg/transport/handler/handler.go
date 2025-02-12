package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/service"
	"github.com/xistorm/ascii_image/pkg/transport/middleware"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{
		services: services,
	}
}

func (h *Handler) Routes() *gin.Engine {
	gin.SetMode(config.Cfg.Server.Mode)

	router := gin.New()

	router.Use(gin.Logger())
	router.Use(middleware.CORSMiddleware())

	router.GET("/ping", h.GetPingHandler)

	api := router.Group("/api")
	{
		users := api.Group("/users").Use(middleware.JWTAuthMiddleware())
		{
			users.GET("/", h.UsersHandler)
			users.PUT("/", h.CreateUserHandler)
			users.GET("/:login", h.UserHandler)
			users.DELETE("/:login", h.DeleteUserHandler)
			users.POST("/:login", h.UpdateUserHandler)
			users.GET("/:login/images", h.UserImagesHandler)
		}

		auth := api.Group("/auth")
		{
			auth.GET("/", middleware.JWTAuthMiddleware(), h.AuthHandler)
			auth.POST("/login", h.LoginHandler)
			auth.PUT("/signup", h.SignUpHandler)
		}

		file := api.Group("/images").Use(middleware.JWTAuthMiddleware())
		{
			file.GET("/", h.ImagesHandler)
			file.GET("/:id", h.ImageHandler)
			file.POST("/convert", h.ConvertHandler)
			file.POST("/upload", h.UploadHandler)
			file.DELETE("/:id/delete", h.UploadHandler)
		}
	}

	return router
}
