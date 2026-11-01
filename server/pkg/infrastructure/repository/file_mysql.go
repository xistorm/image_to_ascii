package repository

import (
	"database/sql"
	"errors"

	"github.com/go-sql-driver/mysql"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type FileMysql struct {
	db *sql.DB
}

func NewFileMysql(db *sql.DB) *FileMysql {
	return &FileMysql{db: db}
}

func (r *FileMysql) GetFiles() ([]*model.File, error) {
	var files []*model.File
	query := `
		SELECT
		    id, name, mime_type, kind, theme, upload_id
		FROM
		    files
		ORDER BY
		    id DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var FileData model.File
		if err := rows.Scan(
			&FileData.Id,
			&FileData.Name,
			&FileData.MimeType,
			&FileData.Kind,
			&FileData.Theme,
			&FileData.UploadId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		files = append(files, &FileData)
	}

	return files, nil
}

func (r *FileMysql) GetFile(id string) (*model.File, error) {
	var file model.File
	query := `
		SELECT
		    id, mime_type, name, kind, theme, upload_id
		FROM
		    files
		WHERE
			id=?
	`

	err := r.db.QueryRow(
		query,
		id,
	).Scan(
		&file.Id,
		&file.MimeType,
		&file.Name,
		&file.Kind,
		&file.Theme,
		&file.UploadId,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, ErrDatabaseError
	}

	return &file, nil
}

func (r *FileMysql) GetUploadFiles(uploadId string) ([]*model.File, error) {
	var files []*model.File
	query := `
		SELECT
		    id, mime_type, name, kind, theme, upload_id
		FROM
		    files
		WHERE
			upload_id=?
	`

	rows, err := r.db.Query(
		query,
		uploadId,
	)
	if err != nil {
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var FileData model.File
		if err := rows.Scan(
			&FileData.Id,
			&FileData.MimeType,
			&FileData.Name,
			&FileData.Kind,
			&FileData.Theme,
			&FileData.UploadId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		files = append(files, &FileData)
	}

	return files, nil
}

func (r *FileMysql) CreateFile(file *model.File) (*model.File, error) {
	query := `
		INSERT INTO
			files(id, mime_type, name, kind, theme, upload_id)
		VALUES
		    (?, ?, ?, ?, ?, ?)
	`
	_, err := r.db.Exec(
		query,
		file.Id,
		file.MimeType,
		file.Name,
		file.Kind,
		file.Theme,
		file.UploadId,
	)

	if err != nil {
		var sqlErr *mysql.MySQLError
		if errors.As(err, &sqlErr) && sqlErr.Number == 1062 {
			return nil, ErrPrimaryKeyConflict
		}

		return nil, ErrDatabaseError
	}

	return file, nil
}

func (r *FileMysql) DeleteFile(id string) error {
	query := `
		DELETE FROM
		   files
		WHERE
		    id=?
	`
	res, err := r.db.Exec(
		query,
		id,
	)

	if err != nil {
		return ErrDatabaseError
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		return ErrNotFound
	}

	return nil
}

func (r *FileMysql) UpdateFile(id string, file *model.File) (*model.File, error) {
	query := `
		UPDATE
			files
		SET
			mime_type = ?,
			name = ?,
			kind = ?,
			theme = ?
		WHERE
    		id=?
	`
	res, err := r.db.Exec(
		query,
		file.MimeType,
		file.Name,
		file.Kind,
		file.Theme,
		id,
	)

	if err != nil {
		return nil, ErrDatabaseError
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		return nil, ErrNotFound
	}

	return file, nil
}
