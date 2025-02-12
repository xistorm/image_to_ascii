package repository

import (
	"database/sql"
	"fmt"
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
	query := fmt.Sprintf("SELECT * FROM users ORDER BY id DESC")

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var userData model.User
		if err := rows.Scan(&userData.Id, &userData.Login, &userData.Password, &userData.Email); err != nil {
			return nil, err
		}
		users = append(users, &userData)
	}

	return users, nil
}

func (r *UserMysql) GetUser(login string) (*model.User, error) {
	var user model.User
	query := fmt.Sprintf("SELECT * FROM users WHERE login='%s'", login)

	row := r.db.QueryRow(query)
	err := row.Scan(&user.Id, &user.Login, &user.Password, &user.Email)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserMysql) CreateUser(user *model.User) (*model.User, error) {
	query := fmt.Sprintf("INSERT INTO users(id, login, password, email) VALUES ('%s', '%s', '%s', '%s')", user.Id, user.Login, user.Password, user.Email)
	if _, err := r.db.Exec(query); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserMysql) DeleteUser(login string) error {
	query := fmt.Sprintf("DELETE from users where login='%s'", login)
	_, err := r.db.Exec(query)

	return err
}

func (r *UserMysql) UpdateUser(login string, user *model.User) error {
	query := fmt.Sprintf("UPDATE users SET login = '%s', password = '%s', email = '%s' where login='%s'", user.Login, user.Password, user.Email, login)
	_, err := r.db.Exec(query)

	return err
}
