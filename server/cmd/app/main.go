package main

import (
	"github.com/xistorm/ascii_image/pkg/app"
	"github.com/xistorm/ascii_image/pkg/config"
	"log"
)

func main() {
	cfg := config.NewConfig("configs")
	server := new(app.Server)

	err := server.Run(cfg)
	if err != nil {
		log.Fatal("Error starting server: ", err.Error())
	}
}
