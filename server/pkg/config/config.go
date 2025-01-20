package config

import (
	"github.com/spf13/viper"
	"log"
)

type Config struct {
	Server   *ServerConfig
	Database *DatabaseConfig
}

type ServerConfig struct {
	Port int
}

type DatabaseConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	Name     string
}

func NewConfig(path string) *Config {
	viper.AddConfigPath(path)
	viper.SetConfigName("config")
	viper.SetConfigType("json")

	viper.SetDefault("server.port", 8000)

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err.Error())
	}

	return &Config{
		Server: &ServerConfig{
			viper.GetInt("server.port"),
		},
		Database: &DatabaseConfig{
			User:     viper.GetString("database.user"),
			Password: viper.GetString("database.password"),
			Host:     viper.GetString("database.host"),
			Port:     viper.GetInt("database.port"),
			Name:     viper.GetString("database.name"),
		},
	}
}
