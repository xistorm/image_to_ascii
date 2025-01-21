package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"net/http"
	"strings"
)

func JWTAuthMiddleware(c *gin.Context) {
	err := validateToken(c)

	if err != nil {
		c.Status(http.StatusUnauthorized)
		c.Abort()
		return
	}

	c.Next()
}

func validateToken(c *gin.Context) error {
	token, err := getToken(c)
	if err != nil {
		return err
	}

	if _, ok := token.Claims.(jwt.Claims); ok && token.Valid {
		return nil
	}

	return fmt.Errorf("invalid token provided")
}

func getToken(c *gin.Context) (*jwt.Token, error) {
	tokenString := getTokenFromHeader(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return config.Cfg.Server.JwtToken, nil
	})

	return token, err
}

func getTokenFromHeader(c *gin.Context) string {
	bearerToken := c.Request.Header.Get("Authorization")
	tokenValue := strings.TrimPrefix(bearerToken, "Bearer ")

	return tokenValue
}
