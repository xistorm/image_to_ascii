package model

import "time"

const (
	UPLOAD_STATUS_PENDING = "pending"
	UPLOAD_STATUS_SUCCESS = "success"
	UPLOAD_STATUS_ERROR   = "error"
)

type Upload struct {
	Id        string    `json:"id"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UserId    string    `json:"user_id"`
}
