package queue

import (
	"context"

	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/database"
)

type ConvertImageQueue interface {
	Push(context.Context, *task.Task) error
	Consume(context.Context, func(context.Context, *task.Task) error) error
}

type Queue struct {
	ConvertImageQueue
}

func NewQueue(db *database.Database) *Queue {
	return &Queue{
		ConvertImageQueue: NewRedisQueue(db.Redis, "convert_image"),
	}
}
