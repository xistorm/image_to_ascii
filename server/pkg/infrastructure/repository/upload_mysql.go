package repository

import (
	"database/sql"
	"errors"

	"github.com/go-sql-driver/mysql"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type UploadMysql struct {
	db *sql.DB
}

func NewUploadMysql(db *sql.DB) *UploadMysql {
	return &UploadMysql{db: db}
}

func (r *UploadMysql) GetUploads() ([]*model.Upload, error) {
	var uploads []*model.Upload
	query := `
		SELECT
		    *
		FROM
		    uploads
		ORDER BY
		    id DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var UploadData model.Upload
		if err := rows.Scan(
			&UploadData.Id,
			&UploadData.Status,
			&UploadData.CreatedAt,
			&UploadData.UserId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		uploads = append(uploads, &UploadData)
	}

	return uploads, nil
}

func (r *UploadMysql) GetUserUploads(userId string) ([]*model.Upload, error) {
	var uploads []*model.Upload
	query := `
		SELECT
		    *
		FROM
		    uploads
		WHERE
			user_id=?
	`

	rows, err := r.db.Query(
		query,
		userId,
	)
	if err != nil {
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var UploadData model.Upload
		if err := rows.Scan(
			&UploadData.Id,
			&UploadData.Status,
			&UploadData.CreatedAt,
			&UploadData.UserId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		uploads = append(uploads, &UploadData)
	}

	return uploads, nil
}

func (r *UploadMysql) GetUpload(id string) (*model.Upload, error) {
	var upload model.Upload
	query := `
		SELECT
		    *
		FROM
		    uploads
		WHERE
			id=?
	`

	err := r.db.QueryRow(
		query,
		id,
	).Scan(
		&upload.Id,
		&upload.Status,
		&upload.CreatedAt,
		&upload.UserId,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, ErrDatabaseError
	}

	return &upload, nil
}

func (r *UploadMysql) CreateUpload(upload *model.Upload) (*model.Upload, error) {
	query := `
		INSERT INTO
			uploads(id, status, created_at, user_id)
		VALUES
		    (?, ?, ?, ?)
	`
	_, err := r.db.Exec(
		query,
		upload.Id,
		upload.Status,
		upload.CreatedAt,
		upload.UserId,
	)

	if err != nil {
		var sqlErr *mysql.MySQLError
		if errors.As(err, &sqlErr) && sqlErr.Number == 1062 {
			return nil, ErrPrimaryKeyConflict
		}

		return nil, ErrDatabaseError
	}

	return upload, nil
}

func (r *UploadMysql) DeleteUpload(id string) error {
	query := `
		DELETE FROM
		   uploads
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

func (r *UploadMysql) UpdateUpload(id string, upload *model.Upload) (*model.Upload, error) {
	query := `
		UPDATE
			uploads
		SET
			status = ?,
			created_at = ?,
			user_id = ?
		WHERE
    		id=?
	`
	res, err := r.db.Exec(
		query,
		upload.Status,
		upload.CreatedAt,
		upload.UserId,
		id,
	)

	if err != nil {
		return nil, ErrDatabaseError
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		return nil, ErrNotFound
	}

	return upload, nil
}
