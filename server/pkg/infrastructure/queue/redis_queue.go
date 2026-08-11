package queue

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/redis/go-redis/v9"
	"github.com/xistorm/ascii_image/pkg/domain/task"
)

type RedisQueue struct {
	client *redis.Client
	key    string
}

func NewRedisQueue(client *redis.Client, key string) *RedisQueue {
	return &RedisQueue{
		client: client,
		key:    key,
	}
}

func (q *RedisQueue) Push(ctx context.Context, t *task.Task) error {
	data, _ := json.Marshal(t)
	return q.client.LPush(ctx, q.key, data).Err()
}

func (q *RedisQueue) Consume(ctx context.Context, handler func(context.Context, *task.Task) error) error {
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			val, err := q.client.BLPop(ctx, 0, q.key).Result()
			if err != nil && errors.Is(err, context.Canceled) {
				return ctx.Err()
			}
			if len(val) < 1 {
				continue
			}

			var t task.Task
			if err := json.Unmarshal([]byte(val[1]), &t); err != nil {
				continue
			}

			if err := handler(ctx, &t); err != nil {
				continue
			}
		}
	}
}
