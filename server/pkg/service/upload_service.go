package service

import (
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
)

var ()

type UploadService struct {
	UserRepository       repository.UserRepository
	UploadRepository     repository.UploadRepository
	FileRepository       repository.FileRepository
	GenerationRepository repository.GenerationRepository
}

func NewUploadService(
	userRepository repository.UserRepository,
	uploadRepository repository.UploadRepository,
	fileRepository repository.FileRepository,
	generationRepository repository.GenerationRepository,
) *UploadService {
	return &UploadService{
		UserRepository:       userRepository,
		UploadRepository:     uploadRepository,
		FileRepository:       fileRepository,
		GenerationRepository: generationRepository,
	}
}

func (s *UploadService) GetUploads() ([]*dto.Upload, error) {
	return nil, nil
}

func (s *UploadService) GetUpload(id string) (*dto.Upload, error) {
	return nil, nil
}

func (s *UploadService) CreateUpload(uploadDto *dto.Upload) (*dto.Upload, error) {
	return nil, nil
}
