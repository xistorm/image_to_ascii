package app

import (
	"context"

	"github.com/xistorm/ascii_image/pkg/domain/task"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"github.com/xistorm/ascii_image/pkg/infrastructure/queue"
	"github.com/xistorm/ascii_image/pkg/worker"
	"golang.org/x/sync/errgroup"
)

type Worker struct {
	Queue    *queue.Queue
	Handlers *worker.Handler
}

func NewWorker(queue *queue.Queue, handlers *worker.Handler) *Worker {
	return &Worker{
		Queue:    queue,
		Handlers: handlers,
	}
}

func (w *Worker) Run(ctx context.Context) error {
	dispatcher := task.NewDispatcher()

	dispatcher.Register(task.ConvertImageTaskType, w.Handlers.ImageConvert)

	g, gCtx := errgroup.WithContext(ctx)

	for i := 0; i < config.Cfg.Worker.Count; i++ {
		g.Go(func() error {
			return w.Queue.ConvertImageQueue.Consume(gCtx, dispatcher.Dispatch)
		})
	}

	return g.Wait()
}
