package repository

import (
	"database/sql"
	"errors"

	"github.com/go-sql-driver/mysql"
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
		return nil, ErrDatabaseError
	}
	defer rows.Close()

	for rows.Next() {
		var userData model.User
		if err := rows.Scan(
			&userData.Id,
			&userData.Login,
			&userData.Password,
			&userData.Email,
			&userData.Avatar,
		); err != nil {
			return nil, ErrDatabaseError
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

	err := r.db.QueryRow(
		query,
		login,
	).Scan(
		&user.Id,
		&user.Login,
		&user.Password,
		&user.Email,
		&user.Avatar,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, ErrDatabaseError
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
	_, err := r.db.Exec(
		query,
		user.Id,
		user.Login,
		user.Password,
		user.Email,
		user.Avatar,
	)

	if err != nil {
		var sqlErr *mysql.MySQLError
		if errors.As(err, &sqlErr) && sqlErr.Number == 1062 {
			return nil, ErrPrimaryKeyConflict
		}

		return nil, ErrDatabaseError
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
	res, err := r.db.Exec(
		query,
		login,
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

func (r *UserMysql) UpdateUser(login string, user *model.User) (*model.User, error) {
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
	res, err := r.db.Exec(
		query,
		user.Login,
		user.Password,
		user.Email,
		user.Avatar,
		login,
	)

	if err != nil {
		return nil, ErrDatabaseError
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		return nil, ErrNotFound
	}

	return user, nil
}
