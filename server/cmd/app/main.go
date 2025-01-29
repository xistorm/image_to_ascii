package main

import (
	"github.com/xistorm/ascii_image/pkg/app"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"log"
)

func main() {
	config.LoadConfig("configs")

	server := new(app.Server)
	err := server.Run()
	if err != nil {
		log.Fatal("Error starting server: ", err.Error())
	}
}
