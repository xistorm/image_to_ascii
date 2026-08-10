package repository

import (
	"database/sql"
	"errors"

	"github.com/go-sql-driver/mysql"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type GenerationMysql struct {
	db *sql.DB
}

func NewGenerationMysql(db *sql.DB) *GenerationMysql {
	return &GenerationMysql{db: db}
}

func (r *GenerationMysql) GetGenerations() ([]*model.Generation, error) {
	var generations []*model.Generation
	query := `
		SELECT
		    id, 'index', content, upload_id
		FROM
		    generations
		ORDER BY
		    id DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var GenerationData model.Generation
		if err := rows.Scan(
			&GenerationData.Id,
			&GenerationData.Index,
			&GenerationData.Content,
			&GenerationData.UploadId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		generations = append(generations, &GenerationData)
	}

	return generations, nil
}

func (r *GenerationMysql) GetUploadGenerations(uploadId string) ([]*model.Generation, error) {
	var generations []*model.Generation
	query := `
		SELECT
		    id, 'index', content, upload_id
		FROM
		    generations
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
		var GenerationData model.Generation
		if err := rows.Scan(
			&GenerationData.Id,
			&GenerationData.Index,
			&GenerationData.Content,
			&GenerationData.UploadId,
		); err != nil {
			return nil, ErrDatabaseError
		}
		generations = append(generations, &GenerationData)
	}

	return generations, nil
}

func (r *GenerationMysql) GetGeneration(id string) (*model.Generation, error) {
	var generation model.Generation
	query := `
		SELECT
		    id, 'index', content, upload_id
		FROM
		    generations
		WHERE
			id=?
	`

	err := r.db.QueryRow(
		query,
		id,
	).Scan(
		&generation.Id,
		&generation.Index,
		&generation.Content,
		&generation.UploadId,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, ErrDatabaseError
	}

	return &generation, nil
}

func (r *GenerationMysql) CreateGeneration(generation *model.Generation) (*model.Generation, error) {
	query := `
		INSERT INTO
			generations(id, 'index', content, upload_id)
		VALUES
		    (?, ?, ?, ?)
	`
	_, err := r.db.Exec(
		query,
		generation.Id,
		generation.Index,
		generation.Content,
		generation.UploadId,
	)

	if err != nil {
		var sqlErr *mysql.MySQLError
		if errors.As(err, &sqlErr) && sqlErr.Number == 1062 {
			return nil, ErrPrimaryKeyConflict
		}

		return nil, ErrDatabaseError
	}

	return generation, nil
}

func (r *GenerationMysql) DeleteGeneration(id string) error {
	query := `
		DELETE FROM
		   generations
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

func (r *GenerationMysql) UpdateGeneration(id string, generation *model.Generation) (*model.Generation, error) {
	query := `
		UPDATE
			generations
		SET
			content = ?
		WHERE
    		id=?
	`
	res, err := r.db.Exec(
		query,
		generation.Content,
		id,
	)

	if err != nil {
		return nil, ErrDatabaseError
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		return nil, ErrNotFound
	}

	return generation, nil
}
