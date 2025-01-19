package repository

import "database/sql"

type Repository struct {
	db *sql.DB
}

func NewRepository() *Repository {
	return &Repository{}
}
