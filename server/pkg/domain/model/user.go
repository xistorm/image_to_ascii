package model

import "database/sql"

type User struct {
	Id       string         `json:"id"`
	Login    string         `json:"login"`
	Password string         `json:"password"`
	Email    sql.NullString `json:"email"`
	Avatar   sql.NullString `json:"avatar"`
}
