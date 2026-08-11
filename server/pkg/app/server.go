package app

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/transport/handler"
)

type Server struct {
	httpServer *http.Server
}

func NewServer(handlers *handler.Handler) *Server {
	httpServer := &http.Server{
		Addr:         fmt.Sprintf(":%d", config.Cfg.Server.Port),
		Handler:      handlers.Routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return &Server{httpServer: httpServer}
}

func (s *Server) Run() error {
	return s.httpServer.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
