package dto

import (
	"time"

	"github.com/xistorm/ascii_image/pkg/domain/model"
)

const (
	UploadStatusPending = "pending"
	UploadStatusSuccess = "success"
	UploadStatusError   = "error"

	ImageOriginalKind = "original"
	ImageAsciiKind    = "ascii"

	ImageCommonTheme = "common"
	ImageLightTheme  = "light"
	ImageDarkTheme   = "dark"
)

type ParameterInfo struct {
	Id         string `json:"id"`
	CharWidth  int    `json:"char_width"`
	CharHeight int    `json:"char_height"`
}

type FileInfo struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	MimeType string `json:"mime_type"`
	Kind     string `json:"kind"`
	Theme    string `json:"theme"`
	Url      string `json:"url"`
	Data     []byte `json:"-"`
}

type Upload struct {
	Id        string         `json:"id"`
	Status    string         `json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UserId    string         `json:"user_id"`
	Parameter *ParameterInfo `json:"parameter"`
	Files     []*FileInfo    `json:"files"`
}

func NewUploadDTO(
	id string,
	status string,
	createdAt time.Time,
	userId string,
	parameter *ParameterInfo,
	files []*FileInfo,
) *Upload {
	return &Upload{
		Id:        id,
		Status:    status,
		CreatedAt: createdAt,
		UserId:    userId,
		Parameter: parameter,
		Files:     files,
	}
}

func UploadFromModel(
	upload *model.Upload,
	parameter *model.Parameter,
	files []*model.File,
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

	if len(files) > 0 {
		dto.Files = []*FileInfo{}
		for _, file := range files {
			fileDto := &FileInfo{
				Id:       file.Id,
				Name:     file.Name,
				MimeType: file.MimeType,
				Kind:     file.Kind,
				Theme:    file.Theme,
				Data:     file.Data,
				Url:      file.Url,
			}
			dto.Files = append(dto.Files, fileDto)
		}
	}

	return dto
}

func UploadToModel(dto *Upload) (*model.Upload, *model.Parameter, []*model.File) {
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

	var files []*model.File
	if dto.Files != nil && len(dto.Files) > 0 {
		for _, file := range dto.Files {
			fileModel := &model.File{
				Id:       file.Id,
				Name:     file.Name,
				MimeType: file.MimeType,
				Kind:     file.Kind,
				Theme:    file.Theme,
				UploadId: dto.Id,
				Data:     file.Data,
				Url:      file.Url,
			}
			files = append(files, fileModel)
		}
	}

	return upload, parameter, files
}
