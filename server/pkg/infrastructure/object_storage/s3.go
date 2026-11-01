package object_storage

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	awsconfig "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
)

func NewS3Storage() (*s3.Client, error) {
	ctx := context.Background()
	cfg := config.Cfg.Storage

	storageCredentials := credentials.NewStaticCredentialsProvider(
		cfg.Id,
		cfg.Key,
		"",
	)

	storageCfg, err := awsconfig.LoadDefaultConfig(
		ctx,
		awsconfig.WithRegion(cfg.Region),
		awsconfig.WithCredentialsProvider(storageCredentials),
	)
	if err != nil {
		return nil, err
	}

	client := s3.NewFromConfig(
		storageCfg,
		func(o *s3.Options) {
			o.BaseEndpoint = aws.String("https://storage.yandexcloud.net")
			o.UsePathStyle = true
		},
	)

	return client, nil
}
