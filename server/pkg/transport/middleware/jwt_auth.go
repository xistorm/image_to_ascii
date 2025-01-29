package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/xistorm/ascii_image/pkg/lib/jwt_token"
	"net/http"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := jwt_token.ValidateToken(c); err != nil {
			c.Status(http.StatusUnauthorized)
			c.Abort()
			return
		}

		c.Next()
	}
}
