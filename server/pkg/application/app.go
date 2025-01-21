package application

import (
	"context"
	"fmt"
	"github.com/xistorm/ascii_image/pkg/application/service"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/infrastructure/database"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/transport/handler"
	"net/http"
	"time"
)

type Server struct {
	httpServer *http.Server
}

func (s *Server) Run() error {
	db, err := database.NewMysqlConnection()
	if err != nil {
		panic(err)
	}

	repositories := repository.NewRepository(db)
	services := service.NewService(repositories)
	handlers := handler.NewHandler(services)

	s.httpServer = &http.Server{
		Addr:         fmt.Sprintf(":%d", config.Cfg.Server.Port),
		Handler:      handlers.Routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return s.httpServer.ListenAndServe()
}

func (s *Server) Stop() error {
	return s.httpServer.Shutdown(context.Background())
}
