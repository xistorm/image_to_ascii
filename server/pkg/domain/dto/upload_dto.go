package dto

import (
	"encoding/base64"
	"time"

	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/lib/slice"
)

const (
	UploadStatusPending = "pending"
	UploadStatusSuccess = "success"
	UploadStatusError   = "error"
)

type ParameterInfo struct {
	Id         string `json:"id"`
	CharWidth  int    `json:"char_width"`
	CharHeight int    `json:"char_height"`
}

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
	Id         string            `json:"id"`
	Status     string            `json:"status"`
	CreatedAt  time.Time         `json:"created_at"`
	UserId     string            `json:"user_id"`
	Parameter  *ParameterInfo    `json:"parameter"`
	File       *FileInfo         `json:"file"`
	Generation []*GenerationInfo `json:"generation"`
}

func NewUploadDTO(
	id string,
	status string,
	createdAt time.Time,
	userId string,
	parameter *ParameterInfo,
	file *FileInfo,
	generation []*GenerationInfo,
) *Upload {
	return &Upload{
		Id:         id,
		Status:     status,
		CreatedAt:  createdAt,
		UserId:     userId,
		Parameter:  parameter,
		File:       file,
		Generation: generation,
	}
}

func UploadFromModel(
	upload *model.Upload,
	parameter *model.Parameter,
	file *model.File,
	generation []*model.Generation,
) *Upload {
	dto := &Upload{
		Id:        upload.Id,
		Status:    upload.Status,
		CreatedAt: upload.CreatedAt,
		UserId:    upload.UserId,
	}

	if parameter != nil {
		dto.Parameter = &ParameterInfo{
			Id:         parameter.Id,
			CharWidth:  parameter.CharWidth,
			CharHeight: parameter.CharHeight,
		}
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
		dto.Generation = slice.Map(generation, func(gen *model.Generation) *GenerationInfo {
			return &GenerationInfo{
				Id:      gen.Id,
				Index:   gen.SeqIndex,
				Content: gen.Content,
			}
		})
	}

	return dto
}

func UploadToModel(dto *Upload) (*model.Upload, *model.Parameter, *model.File, []*model.Generation) {
	upload := &model.Upload{
		Id:        dto.Id,
		Status:    dto.Status,
		CreatedAt: dto.CreatedAt,
		UserId:    dto.UserId,
	}

	var parameter *model.Parameter
	if dto.Parameter != nil {
		parameter = &model.Parameter{
			Id:         dto.Parameter.Id,
			CharWidth:  dto.Parameter.CharWidth,
			CharHeight: dto.Parameter.CharHeight,
			UploadId:   dto.Id,
		}
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

	var generation []*model.Generation
	if dto.Generation != nil {
		generation = slice.Map(dto.Generation, func(gen *GenerationInfo) *model.Generation {
			return &model.Generation{
				Id:       gen.Id,
				SeqIndex: gen.Index,
				Content:  gen.Content,
				UploadId: dto.Id,
			}
		})
	}

	return upload, parameter, file, generation
}
