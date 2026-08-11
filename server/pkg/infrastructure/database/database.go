package database

import (
	"database/sql"

	"github.com/redis/go-redis/v9"
)

type Database struct {
	Sql   *sql.DB
	Redis *redis.Client
}

func NewDatabase() (*Database, error) {
	sqlDb, err := NewMysqlConnection()
	if err != nil {
		return nil, err
	}

	redisClient, err := NewRedisConnection()
	if err != nil {
		return nil, err
	}

	database := &Database{
		Sql:   sqlDb,
		Redis: redisClient,
	}

	return database, nil
}

func (db *Database) Close() error {
	if err := db.Sql.Close(); err != nil {
		return err
	}

	if err := db.Redis.Close(); err != nil {
		return err
	}

	return nil
}
