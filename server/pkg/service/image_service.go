package service

import (
	"encoding/base64"
	"github.com/nfnt/resize"
	"github.com/xistorm/ascii_image/pkg/domain/dto"
	"github.com/xistorm/ascii_image/pkg/infrastructure/repository"
	imgutils "github.com/xistorm/ascii_image/pkg/lib/image"
	"github.com/xistorm/ascii_image/pkg/lib/slice"
)

type ImageService struct {
	userRepository  repository.UserRepository
	imageRepository repository.ImageRepository
}

func NewImageService(imageRepository repository.ImageRepository, userRepository repository.UserRepository) *ImageService {
	return &ImageService{
		imageRepository: imageRepository,
		userRepository:  userRepository,
	}
}

func (s *ImageService) GetImages() ([]*dto.Image, error) {
	images, err := s.imageRepository.GetImages()
	if err != nil {
		return nil, err
	}

	imagesDto := slice.Map(images, dto.ImageFromModel)

	return imagesDto, nil
}

func (s *ImageService) GetImage(id string) (*dto.Image, error) {
	image, err := s.imageRepository.GetImage(id)
	if err != nil {
		return nil, err
	}

	imageDto := dto.ImageFromModel(image)

	return imageDto, nil
}

func (s *ImageService) GetUserImages(login string) ([]*dto.Image, error) {
	user, err := s.userRepository.GetUser(login)
	if err != nil {
		return nil, err
	}

	images, err := s.imageRepository.GetUserImages(user.Login)
	if err != nil {
		return nil, err
	}

	imagesDto := slice.Map(images, dto.ImageFromModel)

	return imagesDto, nil
}

func (s *ImageService) ConvertImageToAscii(imageDataDto *dto.Image) (*dto.Image, error) {
	img, err := imgutils.FromBase64(imageDataDto.Type, imageDataDto.Original)
	if err != nil {
		return nil, err
	}

	resizedImage := resize.Resize(230, 110, img, resize.Lanczos3)
	ascii := imgutils.ToAsciiText(resizedImage)
	base64Ascii := base64.StdEncoding.EncodeToString([]byte(ascii))

	imageDto := dto.NewImage(imageDataDto.Id, imageDataDto.Name, imageDataDto.Type, imageDataDto.Original, &base64Ascii)

	return imageDto, nil
}

func (s *ImageService) UploadImage(imageDataDto *dto.Image, userDataDto *dto.User) (string, error) {
	imageData := dto.ImageToModel(imageDataDto, userDataDto)
	image, err := s.imageRepository.CreateImage(imageData)
	if err != nil {
		return "", err
	}

	return image.Id, nil
}

func (s *ImageService) DeleteImage(id string) error {
	return s.imageRepository.DeleteImage(id)
}
