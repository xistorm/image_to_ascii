package dto

import (
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type Image struct {
	Id       string  `json:"id"`
	Name     string  `json:"name"`
	Type     string  `json:"type"`
	Original string  `json:"original"`
	Ascii    *string `json:"ascii"`
}

func NewImage(id string, name string, imageType string, original string, ascii *string) *Image {
	return &Image{
		Id:       id,
		Name:     name,
		Type:     imageType,
		Original: original,
		Ascii:    ascii,
	}
}

func ImageFromModel(image *model.Image) *Image {
	return &Image{
		Id:       image.Id,
		Name:     image.Name,
		Type:     image.Type,
		Original: image.OriginalImage,
		Ascii:    &image.AsciiImage,
	}
}

func ImageToModel(image *Image, user *User) *model.Image {
	var ascii string
	if image.Ascii != nil {
		ascii = *image.Ascii
	} else {
		ascii = ""
	}

	return &model.Image{
		Id:            image.Id,
		UserId:        user.Id,
		Name:          image.Name,
		Type:          image.Type,
		OriginalImage: image.Original,
		AsciiImage:    ascii,
	}
}
