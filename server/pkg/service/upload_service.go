package service

import (
	"context"
	"errors"

	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/queue"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/lib/slice"
)

type UploadService struct {
	ConvertImageQueue    queue.ConvertImageQueue
	UserRepository       repository.UserRepository
	UploadRepository     repository.UploadRepository
	FileRepository       repository.FileRepository
	GenerationRepository repository.GenerationRepository
}

func NewUploadService(
	ConvertImageQueue queue.ConvertImageQueue,
	userRepository repository.UserRepository,
	uploadRepository repository.UploadRepository,
	fileRepository repository.FileRepository,
	generationRepository repository.GenerationRepository,
) *UploadService {
	return &UploadService{
		ConvertImageQueue:    ConvertImageQueue,
		UserRepository:       userRepository,
		UploadRepository:     uploadRepository,
		FileRepository:       fileRepository,
		GenerationRepository: generationRepository,
	}
}

func (s *UploadService) GetUploads(userId string) ([]*dto.Upload, error) {
	uploads, err := s.UploadRepository.GetUserUploads(userId)
	if err != nil {
		return nil, err
	}

	uploadsDto := slice.Map(uploads, func(upload *model.Upload) *dto.Upload {
		file, err := s.FileRepository.GetUploadFile(upload.Id)
		if err != nil {
			return nil
		}

		return dto.UploadFromModel(upload, file, nil)
	})

	filteredUploads := slice.Filter(uploadsDto, func(upload *dto.Upload) bool {
		return upload != nil
	})

	return filteredUploads, nil
}

func (s *UploadService) GetUpload(id string) (*dto.Upload, error) {
	upload, err := s.UploadRepository.GetUpload(id)
	if errors.Is(err, repository.ErrNotFound) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, ErrInternal
	}

	file, err := s.FileRepository.GetUploadFile(upload.Id)
	if errors.Is(err, repository.ErrNotFound) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, ErrInternal
	}

	generation, err := s.GenerationRepository.GetGeneration(upload.Id)
	if errors.Is(err, repository.ErrNotFound) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, ErrInternal
	}

	uploadDto := dto.UploadFromModel(upload, file, generation)

	return uploadDto, nil
}

func (s *UploadService) CreateUpload(ctx context.Context, uploadDto *dto.Upload) (*dto.Upload, error) {
	upload, file, generation := dto.UploadToModel(uploadDto)

	_, err := s.UploadRepository.CreateUpload(upload)
	if errors.Is(err, repository.ErrPrimaryKeyConflict) {
		return nil, ErrConflict
	}
	if err != nil {
		return nil, err
	}

	if file != nil {
		_, err := s.FileRepository.CreateFile(file)
		if errors.Is(err, repository.ErrPrimaryKeyConflict) {
			return nil, ErrConflict
		}
		if err != nil {
			return nil, ErrInternal
		}
	}

	if generation != nil {
		_, err := s.GenerationRepository.CreateGeneration(generation)
		if errors.Is(err, repository.ErrPrimaryKeyConflict) {
			return nil, ErrConflict
		}
		if err != nil {
			return nil, ErrInternal
		}
	}

	defer func() {
		generationTaskPayload := task.ConvertImageTaskPayload{UploadId: uploadDto.Id}
		generationTask := task.NewConvertImageTask(generationTaskPayload)
		task, err := generationTask.Marshall()
		if err != nil {
			return
		}

		if err := s.ConvertImageQueue.Push(ctx, task); err != nil {
			return
		}
	}()

	return uploadDto, nil
}
