package repository

import (
	"database/sql"

	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type UserMysql struct {
	db *sql.DB
}

func NewUserMysql(db *sql.DB) *UserMysql {
	return &UserMysql{db: db}
}

func (r *UserMysql) GetUsers() ([]*model.User, error) {
	var users []*model.User
	query := `
		SELECT
		    *
		FROM
		    users
		ORDER BY
		    id DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var userData model.User
		if err := rows.Scan(&userData.Id, &userData.Login, &userData.Password, &userData.Email, &userData.Avatar); err != nil {
			return nil, err
		}
		users = append(users, &userData)
	}

	return users, nil
}

func (r *UserMysql) GetUser(login string) (*model.User, error) {
	var user model.User
	query := `
		SELECT
		    *
		FROM
		    users
		WHERE
			login=?
	`

	row := r.db.QueryRow(
		query,
		login,
	)
	err := row.Scan(
		&user.Id,
		&user.Login,
		&user.Password,
		&user.Email,
		&user.Avatar,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserMysql) CreateUser(user *model.User) (*model.User, error) {
	query := `
		INSERT INTO
			users(id, login, password, email, avatar)
		VALUES
		    (?, ?, ?, ?, ?)
	`
	if _, err := r.db.Exec(
		query,
		user.Id,
		user.Login,
		user.Password,
		user.Email,
		user.Avatar,
	); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserMysql) DeleteUser(login string) error {
	query := `
		DELETE FROM
		   users
		WHERE
		    login=?
	`
	_, err := r.db.Exec(
		query,
		login,
	)

	return err
}

func (r *UserMysql) UpdateUser(login string, user *model.User) error {
	query := `
		UPDATE
			users
		SET
			login = ?,
			password = ?,
			email = ?,
			avatar = ?
		WHERE
    		login=?
	`
	_, err := r.db.Exec(
		query,
		user.Login,
		user.Password,
		user.Email,
		user.Avatar,
		login,
	)

	return err
}
