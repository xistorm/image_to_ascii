package models

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Login    string `json:"name"`
	Password string `json:"password"`
}
