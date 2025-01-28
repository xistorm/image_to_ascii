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

	router.GET("/ping", h.GetPingHandler)

	api := router.Group("/api")
	{
		users := api.Group("/users").Use(middleware.JWTAuthMiddleware)
		{
			users.GET("/", h.UsersHandler)
			users.PUT("/", h.CreateUserHandler)
			users.GET("/:login", h.UserHandler)
			users.DELETE("/:login", h.DeleteUserHandler)
			users.POST("/:login", h.UpdateUserHandler)
		}

		auth := api.Group("/auth")
		{
			auth.POST("/login", h.LoginHandler)
			auth.PUT("/signup", h.SignUpHandler)
		}
	}

	return router
}
