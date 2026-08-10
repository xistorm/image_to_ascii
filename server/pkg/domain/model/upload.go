package model

import "time"

type Upload struct {
	Id        string    `json:"id"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UserId    string    `json:"user_id"`
}
