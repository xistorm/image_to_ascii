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
		api.GET("/auth", middleware.JWTAuthMiddleware(), h.AuthHandler)
		api.POST("/login", h.LoginHandler)
		api.PUT("/signup", h.SignUpHandler)
	}

	return router
}
