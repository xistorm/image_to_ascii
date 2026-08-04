package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	config := cors.DefaultConfig()
	config.AllowOrigins = append(config.AllowOrigins, "http://localhost:5173")
	config.AllowHeaders = append(config.AllowHeaders, "Authorization", "Accept")
	config.AllowCredentials = true

	return cors.New(config)
}
