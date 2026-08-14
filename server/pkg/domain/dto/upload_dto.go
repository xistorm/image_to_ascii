package dto

import (
	"encoding/base64"
	"time"

	"github.com/xistorm/ascii_image/pkg/domain/model"
)

const (
	UPLOAD_STATUS_PENDING = "pending"
	UPLOAD_STATUS_SUCCESS = "success"
	UPLOAD_STATUS_ERROR   = "error"
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
			Data: base64.StdEncoding.EncodeToString(file.Data),
		}
	}

	if generation != nil {
		dto.Generation = &GenerationInfo{
			Id:      generation.Id,
			Index:   generation.SeqIndex,
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

	var file *model.File
	if dto.File != nil {
		var fileData, _ = base64.StdEncoding.DecodeString(dto.File.Data)
		if fileData != nil {
			file = &model.File{
				Id:       dto.File.Id,
				Name:     dto.File.Name,
				Type:     dto.File.Type,
				Data:     fileData,
				UploadId: dto.Id,
			}
		}
	}

	var generation *model.Generation
	if dto.Generation != nil {
		generation = &model.Generation{
			Id:       dto.Generation.Id,
			SeqIndex: dto.Generation.Index,
			Content:  dto.Generation.Content,
			UploadId: dto.Id,
		}
	}

	return upload, file, generation
}
