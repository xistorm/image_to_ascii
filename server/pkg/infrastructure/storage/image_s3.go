package storage

import (
	"bytes"
	"context"
	"fmt"
	"io"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type ImageS3 struct {
	s3     *s3.Client
	bucket string
}

func NewImageS3(s3 *s3.Client, bucket string) *ImageS3 {
	return &ImageS3{
		s3:     s3,
		bucket: bucket,
	}
}

func (f *ImageS3) GetKey(file *model.File) string {
	return fmt.Sprintf("%s/%s_%s", file.UploadId, file.Kind, file.Theme)
}

func (f *ImageS3) Put(file *model.File) error {
	ctx := context.Background()
	key := f.GetKey(file)
	input := &s3.PutObjectInput{
		Bucket:      aws.String(f.bucket),
		Key:         aws.String(key),
		ContentType: aws.String(file.MimeType),
		Body:        bytes.NewReader(file.Data),
	}

	_, err := f.s3.PutObject(ctx, input)
	if err != nil {
		return err
	}

	return nil
}

func (f *ImageS3) Get(file *model.File) ([]byte, error) {
	ctx := context.Background()
	key := f.GetKey(file)
	input := &s3.GetObjectInput{
		Bucket: aws.String(f.bucket),
		Key:    aws.String(key),
	}

	result, err := f.s3.GetObject(ctx, input)
	if err != nil {
		return nil, err
	}
	defer result.Body.Close()

	data, err := io.ReadAll(result.Body)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (f *ImageS3) GetUrl(file *model.File) (string, error) {
	ctx := context.Background()
	key := f.GetKey(file)
	presigner := s3.NewPresignClient(f.s3)
	input := &s3.GetObjectInput{
		Bucket: aws.String(f.bucket),
		Key:    aws.String(key),
	}

	request, err := presigner.PresignGetObject(
		ctx,
		input,
	)
	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func (f *ImageS3) Delete(file *model.File) error {
	ctx := context.Background()

	key := f.GetKey(file)
	input := &s3.DeleteObjectInput{
		Bucket: aws.String(f.bucket),
		Key:    aws.String(key),
	}

	_, err := f.s3.DeleteObject(ctx, input)
	if err != nil {
		return err
	}

	return nil
}
