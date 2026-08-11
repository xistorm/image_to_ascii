package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/xistorm/ascii_image/pkg/app"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/infrastructure/database"
	"github.com/xistorm/ascii_image/pkg/infrastructure/queue"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/service"
	"github.com/xistorm/ascii_image/pkg/transport/handler"
	"github.com/xistorm/ascii_image/pkg/worker"
)

func main() {
	config.LoadConfig("configs")

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	databases, err := database.NewDatabase()
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := databases.Close(); err != nil {
			panic(err)
		}
	}()

	queues := queue.NewQueue(databases)
	repositories := repository.NewRepository(databases)
	services := service.NewService(repositories, queues)
	workerHandlers := worker.NewHandler(repositories)
	apiHandlers := handler.NewHandler(services)
	worker := app.NewWorker(queues, workerHandlers)
	server := app.NewServer(apiHandlers)

	go func() {
		if err := server.Run(); err != nil {
			panic(err)
		}
	}()

	if err := worker.Run(ctx); err != nil {
		log.Fatal("Error starting worker: ", err.Error())
	}
}
