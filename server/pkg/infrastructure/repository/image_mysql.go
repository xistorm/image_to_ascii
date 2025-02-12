package repository

import (
	"database/sql"
	"fmt"
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type ImageMysql struct {
	db *sql.DB
}

func NewImageMysql(db *sql.DB) *ImageMysql {
	return &ImageMysql{db: db}
}

func (r *ImageMysql) GetImages() ([]*model.Image, error) {
	var images []*model.Image
	query := fmt.Sprintf("SELECT * FROM images ORDER BY id DESC")

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var imageData model.Image
		if err := rows.Scan(&imageData.Id, &imageData.UserId, &imageData.OriginalImage, &imageData.AsciiImage, &imageData.Name, &imageData.Type); err != nil {
			return nil, err
		}
		images = append(images, &imageData)
	}

	return images, nil
}

func (r *ImageMysql) GetUserImages(id string) ([]*model.Image, error) {
	var images []*model.Image
	query := fmt.Sprintf("SELECT * FROM images WHERE user_id = '%s' ORDER BY id DESC", id)

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var imageData model.Image
		if err := rows.Scan(&imageData.Id, &imageData.UserId, &imageData.OriginalImage, &imageData.AsciiImage, &imageData.Name, &imageData.Type); err != nil {
			return nil, err
		}
		images = append(images, &imageData)
	}

	return images, nil
}

func (r *ImageMysql) GetImage(id string) (*model.Image, error) {
	var image model.Image
	query := fmt.Sprintf("SELECT * FROM users WHERE login='%s'", id)

	row := r.db.QueryRow(query)
	err := row.Scan(&image.Id, &image.UserId, &image.OriginalImage, &image.AsciiImage, &image.Name, &image.Type)
	if err != nil {
		return nil, err
	}

	return &image, nil
}

func (r *ImageMysql) CreateImage(image *model.Image) (*model.Image, error) {
	query := fmt.Sprintf("INSERT INTO images(id, user_id, original_image, ascii_image, name, type) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')", image.Id, image.UserId, image.OriginalImage, image.AsciiImage, image.Name, image.Type)
	if _, err := r.db.Exec(query); err != nil {
		return nil, err
	}

	return image, nil
}

func (r *ImageMysql) DeleteImage(id string) error {
	query := fmt.Sprintf("DELETE from users where id='%s'", id)
	_, err := r.db.Exec(query)

	return err
}
