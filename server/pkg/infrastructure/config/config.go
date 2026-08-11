package config

import (
	"log"
	"time"

	"github.com/spf13/viper"
)

type ServerConfig struct {
	Port     int
	Mode     string
	JwtToken []byte
}

type SqlConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	Name     string
}

type RedisConfig struct {
	User        string
	Password    string
	Host        string
	Port        int
	DB          int
	MaxRetries  int
	DialTimeout time.Duration
	Timeout     time.Duration
}

type WorkerConfig struct {
	Count int `json:"count"`
}

type Config struct {
	Server   *ServerConfig
	Database *SqlConfig
	Redis    *RedisConfig
	Worker   *WorkerConfig
}

var Cfg *Config

func LoadConfig(path string) {
	viper.AddConfigPath(path)
	viper.SetConfigName("config")
	viper.SetConfigType("json")

	viper.SetDefault("server.port", 8000)

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err.Error())
	}

	Cfg = &Config{
		Server: &ServerConfig{
			Port:     viper.GetInt("server.port"),
			Mode:     viper.GetString("server.mode"),
			JwtToken: []byte(viper.GetString("server.jwt_token")),
		},
		Database: &SqlConfig{
			User:     viper.GetString("sql.user"),
			Password: viper.GetString("sql.password"),
			Host:     viper.GetString("sql.host"),
			Port:     viper.GetInt("sql.port"),
			Name:     viper.GetString("sql.name"),
		},
		Redis: &RedisConfig{
			User:        viper.GetString("redis.user"),
			Password:    viper.GetString("redis.password"),
			Host:        viper.GetString("redis.host"),
			Port:        viper.GetInt("redis.port"),
			DB:          viper.GetInt("redis.db"),
			MaxRetries:  viper.GetInt("redis.max_retries"),
			DialTimeout: viper.GetDuration("redis.dial_timeout"),
			Timeout:     viper.GetDuration("redis.timeout"),
		},
		Worker: &WorkerConfig{
			Count: viper.GetInt("worker.count"),
		},
	}
}
