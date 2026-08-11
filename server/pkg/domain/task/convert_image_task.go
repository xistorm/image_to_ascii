package task

import (
	"encoding/json"

	"github.com/google/uuid"
)

const ConvertImageTaskType = "convert_image"

type ConvertImageTaskPayload struct {
	UploadId string `json:"upload_id"`
}

type ConvertImageTask struct {
	Id      string                  `json:"id"`
	Type    string                  `json:"type"`
	Payload ConvertImageTaskPayload `json:"payload"`
}

func NewConvertImageTask(payload ConvertImageTaskPayload) *ConvertImageTask {
	return &ConvertImageTask{
		Id:      uuid.NewString(),
		Type:    "convert_image",
		Payload: payload,
	}
}

func (t *ConvertImageTask) Marshall() (*Task, error) {
	parsedPayload, err := json.Marshal(t.Payload)
	if err != nil {
		return nil, err
	}

	task := &Task{
		Id:      t.Id,
		Type:    t.Type,
		Payload: parsedPayload,
	}

	return task, nil
}

func Unmarshall(task *Task) (*ConvertImageTask, error) {
	var payload ConvertImageTaskPayload
	if err := json.Unmarshal(task.Payload, &payload); err != nil {
		return nil, err
	}

	parsedTask := NewConvertImageTask(payload)
	return parsedTask, nil
}
