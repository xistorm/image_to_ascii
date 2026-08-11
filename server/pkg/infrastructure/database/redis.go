package database

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
)

func NewRedisConnection() (*redis.Client, error) {
	queueCfg := config.Cfg.Redis

	redisCfg := redis.Options{
		Username:     queueCfg.User,
		Password:     queueCfg.Password,
		Addr:         fmt.Sprintf("%s:%d", queueCfg.Host, queueCfg.Port),
		DB:           queueCfg.DB,
		MaxRetries:   queueCfg.MaxRetries,
		DialTimeout:  queueCfg.DialTimeout * time.Second,
		ReadTimeout:  queueCfg.Timeout * time.Second,
		WriteTimeout: queueCfg.Timeout * time.Second,
	}

	db := redis.NewClient(&redisCfg)

	// Проверка соединения
	if err := db.Ping(context.Background()).Err(); err != nil {
		return nil, fmt.Errorf("failed to connect to redis: %w", err)
	}

	return db, nil
}
