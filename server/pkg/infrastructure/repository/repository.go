package repository

import (
	"database/sql"
	"errors"

	"github.com/xistorm/ascii_image/pkg/domain/model"
)

var (
	ErrNotFound           = errors.New("not_found")
	ErrPrimaryKeyConflict = errors.New("email_taken")
	ErrDatabaseError      = errors.New("database_error")
)

type UserRepository interface {
	GetUsers() ([]*model.User, error)
	GetUser(string) (*model.User, error)
	CreateUser(*model.User) (*model.User, error)
	DeleteUser(string) error
	UpdateUser(string, *model.User) (*model.User, error)
}

type UploadRepository interface {
	GetUploads() ([]*model.Upload, error)
	GetUserUploads(string) ([]*model.Upload, error)
	GetUpload(string) (*model.Upload, error)
	CreateUpload(*model.Upload) (*model.Upload, error)
	DeleteUpload(string) error
	UpdateUpload(string, *model.Upload) (*model.Upload, error)
}

type FileRepository interface {
	GetFiles() ([]*model.File, error)
	GetFile(string) (*model.File, error)
	GetUploadFile(string) (*model.File, error)
	CreateFile(*model.File) (*model.File, error)
	DeleteFile(string) error
	UpdateFile(string, *model.File) (*model.File, error)
}

type GenerationRepository interface {
	GetGenerations() ([]*model.Generation, error)
	GetUploadGenerations(string) ([]*model.Generation, error)
	GetGeneration(string) (*model.Generation, error)
	CreateGeneration(*model.Generation) (*model.Generation, error)
	DeleteGeneration(string) error
	UpdateGeneration(string, *model.Generation) (*model.Generation, error)
}

type Repository struct {
	UserRepository
	FileRepository
	UploadRepository
	GenerationRepository
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		UserRepository:       NewUserMysql(db),
		UploadRepository:     NewUploadMysql(db),
		FileRepository:       NewFileMysql(db),
		GenerationRepository: NewGenerationMysql(db),
	}
}
