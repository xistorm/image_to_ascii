package dto

import (
	"github.com/xistorm/ascii_image/pkg/domain/model"
	"github.com/xistorm/ascii_image/pkg/lib/sql_values"
)

type User struct {
	Id       string  `json:"id"`
	Login    string  `json:"login"`
	Password string  `json:"password"`
	Email    *string `json:"email"`
	Avatar   *string `json:"avatar"`
}

func NewUserDTO(id string, login string, password string, email *string, avatar *string) *User {
	return &User{
		Id:       id,
		Login:    login,
		Password: password,
		Email:    email,
		Avatar:   avatar,
	}
}

func UserFromModel(user *model.User) *User {
	return &User{
		Id:       user.Id,
		Login:    user.Login,
		Password: user.Password,
		Email:    sql_values.NullableToStringPtr(user.Email),
		Avatar:   sql_values.NullableToStringPtr(user.Avatar),
	}
}

func UserToModel(dto *User) *model.User {
	return &model.User{
		Id:       dto.Id,
		Login:    dto.Login,
		Password: dto.Password,
		Email:    sql_values.StringPtrToNullable(dto.Email),
		Avatar:   sql_values.StringPtrToNullable(dto.Avatar),
	}
}
