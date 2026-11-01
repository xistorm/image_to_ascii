package service

import (
	"context"
	"errors"

	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/queue"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	"github.com/xistorm/ascii_image/pkg/infrastructure/storage"
	"github.com/xistorm/ascii_image/pkg/lib/slice"
)

type UploadService struct {
	ConvertImageQueue   queue.ConvertImageQueue
	UserRepository      repository.UserRepository
	UploadRepository    repository.UploadRepository
	ParameterRepository repository.ParameterRepository
	FileRepository      repository.FileRepository
	ImageStorage        storage.ImageStorage
}

func NewUploadService(
	convertImageQueue queue.ConvertImageQueue,
	userRepository repository.UserRepository,
	uploadRepository repository.UploadRepository,
	parameterRepository repository.ParameterRepository,
	fileRepository repository.FileRepository,
	imageStorage storage.ImageStorage,
) *UploadService {
	return &UploadService{
		ConvertImageQueue:   convertImageQueue,
		UserRepository:      userRepository,
		UploadRepository:    uploadRepository,
		ParameterRepository: parameterRepository,
		FileRepository:      fileRepository,
		ImageStorage:        imageStorage,
	}
}

func (s *UploadService) GetUploads(userId string) ([]*dto.Upload, error) {
	uploads, err := s.UploadRepository.GetUserUploads(userId)
	if err != nil {
		return nil, err
	}

	uploadsDto := slice.Map(uploads, func(upload *model.Upload) *dto.Upload {
		parameter, err := s.ParameterRepository.GetUploadParameter(upload.Id)
		if err != nil {
			return nil
		}

		files, err := s.FileRepository.GetUploadFiles(upload.Id)
		if err != nil {
			return nil
		}
		for _, file := range files {
			url, err := s.ImageStorage.GetUrl(file)
			if err != nil {
				return nil
			}

			file.Url = url
		}

		return dto.UploadFromModel(upload, parameter, files)
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

	parameter, err := s.ParameterRepository.GetUploadParameter(id)
	if errors.Is(err, repository.ErrNotFound) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, ErrInternal
	}

	files, err := s.FileRepository.GetUploadFiles(upload.Id)
	if errors.Is(err, repository.ErrNotFound) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, ErrInternal
	}
	for _, file := range files {
		url, err := s.ImageStorage.GetUrl(file)
		if err != nil {
			return nil, ErrInternal
		}

		file.Url = url
	}

	uploadDto := dto.UploadFromModel(upload, parameter, files)

	return uploadDto, nil
}

func (s *UploadService) CreateUpload(ctx context.Context, uploadDto *dto.Upload) (*dto.Upload, error) {
	upload, parameter, files := dto.UploadToModel(uploadDto)

	_, err := s.UploadRepository.CreateUpload(upload)
	if errors.Is(err, repository.ErrPrimaryKeyConflict) {
		return nil, ErrConflict
	}
	if err != nil {
		return nil, err
	}

	if parameter != nil {
		_, err := s.ParameterRepository.CreateParameter(parameter)
		if errors.Is(err, repository.ErrPrimaryKeyConflict) {
			return nil, ErrConflict
		}
		if err != nil {
			return nil, ErrInternal
		}
	}

	if files != nil {
		for _, file := range files {
			err := s.ImageStorage.Put(file)
			if err != nil {
				return nil, ErrInternal
			}
			url, err := s.ImageStorage.GetUrl(file)
			if err != nil {
				return nil, ErrInternal
			}

			file.Url = url
			_, err = s.FileRepository.CreateFile(file)
			if errors.Is(err, repository.ErrPrimaryKeyConflict) {
				return nil, ErrConflict
			}
			if err != nil {
				return nil, ErrInternal
			}
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

func (s *UploadService) DeleteUpload(id string) error {
	upload, err := s.UploadRepository.GetUpload(id)
	if errors.Is(err, repository.ErrNotFound) {
		return ErrNotFound
	}
	if err != nil {
		return ErrInternal
	}

	files, err := s.FileRepository.GetUploadFiles(upload.Id)
	if errors.Is(err, repository.ErrNotFound) {
		return ErrNotFound
	}
	if err != nil {
		return ErrInternal
	}
	for _, file := range files {
		if err := s.ImageStorage.Delete(file); err != nil {
			return ErrInternal
		}
	}

	err = s.UploadRepository.DeleteUpload(id)
	if errors.Is(err, repository.ErrNotFound) {
		return ErrNotFound
	}
	if err != nil {
		return ErrInternal
	}

	return nil
}
