package service

import (
	"github.com/xistorm/ascii_image/pkg/repository"
)

type Service struct {
}

func NewService(repositories *repository.Repository) *Service {
	return &Service{}
}
