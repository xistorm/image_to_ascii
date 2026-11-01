package repository

import (
	"database/sql"
	"errors"

	"github.com/go-sql-driver/mysql"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type ParameterMysql struct {
	db *sql.DB
}

func NewParameterMysql(db *sql.DB) *ParameterMysql {
	return &ParameterMysql{db: db}
}

func (r *ParameterMysql) GetParameters() ([]*model.Parameter, error) {
	var files []*model.Parameter
	query := `
		SELECT
		    id, quality, upload_id
		FROM
		    parameters
		ORDER BY
		    id DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var ParameterData model.Parameter
		if err := rows.Scan(
			&ParameterData.Id,
			&ParameterData.Quality,
			&ParameterData.UploadId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		files = append(files, &ParameterData)
	}

	return files, nil
}

func (r *ParameterMysql) GetParameter(id string) (*model.Parameter, error) {
	var file model.Parameter
	query := `
		SELECT
		    id, quality, upload_id
		FROM
		    parameters
		WHERE
			id=?
	`

	err := r.db.QueryRow(
		query,
		id,
	).Scan(
		&file.Id,
		&file.Quality,
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

func (r *ParameterMysql) GetUploadParameter(uploadId string) (*model.Parameter, error) {
	var file model.Parameter
	query := `
		SELECT
		    id, quality, upload_id
		FROM
		    parameters
		WHERE
			upload_id=?
	`

	err := r.db.QueryRow(
		query,
		uploadId,
	).Scan(
		&file.Id,
		&file.Quality,
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

func (r *ParameterMysql) CreateParameter(file *model.Parameter) (*model.Parameter, error) {
	query := `
		INSERT INTO
			parameters(id, quality, upload_id)
		VALUES
		    (?, ?, ?)
	`
	_, err := r.db.Exec(
		query,
		file.Id,
		file.Quality,
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

func (r *ParameterMysql) DeleteParameter(id string) error {
	query := `
		DELETE FROM
		   parameters
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

func (r *ParameterMysql) UpdateParameter(id string, file *model.Parameter) (*model.Parameter, error) {
	query := `
		UPDATE
			parameters
		SET
			quality = ?
		WHERE
    		id=?
	`
	res, err := r.db.Exec(
		query,
		file.Quality,
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
