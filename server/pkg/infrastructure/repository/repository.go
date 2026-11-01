package repository

import (
	"errors"

	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/infrastructure/database"
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

type ParameterRepository interface {
	GetParameters() ([]*model.Parameter, error)
	GetParameter(string) (*model.Parameter, error)
	GetUploadParameter(string) (*model.Parameter, error)
	CreateParameter(*model.Parameter) (*model.Parameter, error)
	DeleteParameter(string) error
	UpdateParameter(string, *model.Parameter) (*model.Parameter, error)
}

type FileRepository interface {
	GetFiles() ([]*model.File, error)
	GetFile(string) (*model.File, error)
	GetUploadFiles(string) ([]*model.File, error)
	CreateFile(*model.File) (*model.File, error)
	DeleteFile(string) error
	UpdateFile(string, *model.File) (*model.File, error)
}

type Repository struct {
	UserRepository
	UploadRepository
	ParameterRepository
	FileRepository
}

func NewRepository(db *database.Database) *Repository {
	return &Repository{
		UserRepository:      NewUserMysql(db.Sql),
		UploadRepository:    NewUploadMysql(db.Sql),
		ParameterRepository: NewParameterMysql(db.Sql),
		FileRepository:      NewFileMysql(db.Sql),
	}
}
