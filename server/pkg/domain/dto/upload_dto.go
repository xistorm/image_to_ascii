package dto

import (
	"time"

	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type FileInfo struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
	Data string `json:"data"`
}

type GenerationInfo struct {
	Id      string `json:"id"`
	Index   int    `json:"index"`
	Content string `json:"content"`
}

type Upload struct {
	Id         string          `json:"id"`
	Status     string          `json:"status"`
	CreatedAt  time.Time       `json:"created_at"`
	UserId     string          `json:"user_id"`
	File       *FileInfo       `json:"file"`
	Generation *GenerationInfo `json:"generation"`
}

func NewUploadDTO(
	id string,
	status string,
	createdAt time.Time,
	userId string,
	file *FileInfo,
	generation *GenerationInfo,
) *Upload {
	return &Upload{
		Id:         id,
		Status:     status,
		CreatedAt:  createdAt,
		UserId:     userId,
		File:       file,
		Generation: generation,
	}
}

func UploadFromModel(
	upload *model.Upload,
	file *model.File,
	generation *model.Generation,
) *Upload {
	dto := &Upload{
		Id:        upload.Id,
		Status:    upload.Status,
		CreatedAt: upload.CreatedAt,
		UserId:    upload.UserId,
	}

	if file != nil {
		dto.File = &FileInfo{
			Id:   file.Id,
			Name: file.Name,
			Type: file.Type,
			Data: file.Data,
		}
	}

	if generation != nil {
		dto.Generation = &GenerationInfo{
			Id:      generation.Id,
			Index:   generation.Index,
			Content: generation.Content,
		}
	}

	return dto
}

func UploadToModel(dto *Upload) (*model.Upload, *model.File, *model.Generation) {
	upload := &model.Upload{
		Id:        dto.Id,
		Status:    dto.Status,
		CreatedAt: dto.CreatedAt,
		UserId:    dto.UserId,
	}

	file := &model.File{
		Id:       dto.File.Id,
		Name:     dto.File.Id,
		Type:     dto.File.Type,
		Data:     dto.File.Data,
		UploadId: dto.Id,
	}

	generation := &model.Generation{
		Id:       dto.Generation.Id,
		Index:    dto.Generation.Index,
		Content:  dto.Generation.Content,
		UploadId: dto.Id,
	}

	return upload, file, generation
}
