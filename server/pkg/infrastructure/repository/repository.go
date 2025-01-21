package repository

import (
	"database/sql"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type UserRepository interface {
	GetUsers() ([]model.User, error)
	GetUser(string) (*model.User, error)
	CreateUser(*model.User) (*model.User, error)
	DeleteUser(string) error
	UpdateUser(string, *model.User) error
}

type Repository struct {
	UserRepository
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		UserRepository: NewUserMysql(db),
	}
}
