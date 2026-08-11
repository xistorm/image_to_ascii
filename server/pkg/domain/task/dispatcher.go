package task

import (
	"context"
	"errors"
)

var (
	ErrUnknownType = errors.New("unknown type")
)

type Handler interface {
	Handle(ctx context.Context, task *Task) error
}

type Dispatcher struct {
	handlers map[string]Handler
}

func NewDispatcher() *Dispatcher {
	return &Dispatcher{
		handlers: make(map[string]Handler),
	}
}

func (d *Dispatcher) Register(name string, handler Handler) {
	d.handlers[name] = handler
}

func (d *Dispatcher) Dispatch(ctx context.Context, task *Task) error {
	handler, ok := d.handlers[task.Type]
	if !ok {
		return ErrUnknownType
	}

	return handler.Handle(ctx, task)
}
