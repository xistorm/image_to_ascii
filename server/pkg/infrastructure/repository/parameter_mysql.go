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
	var parameters []*model.Parameter
	query := `
		SELECT
		    id, quality, alphabet, upload_id
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
			&ParameterData.Alphabet,
			&ParameterData.UploadId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		parameters = append(parameters, &ParameterData)
	}

	return parameters, nil
}

func (r *ParameterMysql) GetParameter(id string) (*model.Parameter, error) {
	var parameter model.Parameter
	query := `
		SELECT
		    id, quality, alphabet, upload_id
		FROM
		    parameters
		WHERE
			id=?
	`

	err := r.db.QueryRow(
		query,
		id,
	).Scan(
		&parameter.Id,
		&parameter.Quality,
		&parameter.Alphabet,
		&parameter.UploadId,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, ErrDatabaseError
	}

	return &parameter, nil
}

func (r *ParameterMysql) GetUploadParameter(uploadId string) (*model.Parameter, error) {
	var parameter model.Parameter
	query := `
		SELECT
		    id, quality, alphabet, upload_id
		FROM
		    parameters
		WHERE
			upload_id=?
	`

	err := r.db.QueryRow(
		query,
		uploadId,
	).Scan(
		&parameter.Id,
		&parameter.Quality,
		&parameter.Alphabet,
		&parameter.UploadId,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, ErrDatabaseError
	}

	return &parameter, nil
}

func (r *ParameterMysql) CreateParameter(parameter *model.Parameter) (*model.Parameter, error) {
	query := `
		INSERT INTO
			parameters(id, quality, alphabet, upload_id)
		VALUES
		    (?, ?, ?, ?)
	`
	_, err := r.db.Exec(
		query,
		parameter.Id,
		parameter.Quality,
		parameter.Alphabet,
		parameter.UploadId,
	)

	if err != nil {
		var sqlErr *mysql.MySQLError
		if errors.As(err, &sqlErr) && sqlErr.Number == 1062 {
			return nil, ErrPrimaryKeyConflict
		}

		return nil, ErrDatabaseError
	}

	return parameter, nil
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

func (r *ParameterMysql) UpdateParameter(id string, parameter *model.Parameter) (*model.Parameter, error) {
	query := `
		UPDATE
			parameters
		SET
			quality = ?,
			alphabet = ?
		WHERE
    		id=?
	`
	res, err := r.db.Exec(
		query,
		parameter.Quality,
		parameter.Alphabet,
		id,
	)

	if err != nil {
		return nil, ErrDatabaseError
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		return nil, ErrNotFound
	}

	return parameter, nil
}
