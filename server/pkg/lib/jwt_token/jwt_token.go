package jwt_token

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"strings"
	"time"
)

func CreateToken(id string) (string, error) {
	claimsOpts := jwt.StandardClaims{
		Id:        id,
		Issuer:    "ascii_image",
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsOpts)
	token, err := claims.SignedString(config.Cfg.Server.JwtToken)

	return token, err
}

func ValidateToken(c *gin.Context) error {
	token, err := GetToken(c)
	if err != nil {
		return err
	}

	if _, ok := token.Claims.(jwt.Claims); ok && token.Valid {
		return nil
	}

	return fmt.Errorf("invalid jwt_token provided")
}

func GetToken(c *gin.Context) (*jwt.Token, error) {
	tokenString := GetTokenFromHeader(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return config.Cfg.Server.JwtToken, nil
	})

	return token, err
}

func GetTokenFromHeader(c *gin.Context) string {
	bearerToken := c.Request.Header.Get("Authorization")
	tokenValue := strings.TrimPrefix(bearerToken, "Bearer ")

	return tokenValue
}
