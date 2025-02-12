package dto

import (
	"github.com/xistorm/ascii_image/pkg/domain/model"
)

type User struct {
	Id       string `json:"id"`
	Email    string `json:"email"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

func NewUserDTO(id string, email string, login string, password string) *User {
	return &User{
		Id:       id,
		Email:    email,
		Login:    login,
		Password: password,
	}
}

func UserFromModel(user *model.User) *User {
	return &User{
		Id:       user.Id,
		Email:    user.Email,
		Login:    user.Login,
		Password: user.Password,
	}
}

func UserToModel(dto *User) *model.User {
	return &model.User{
		Id:       dto.Id,
		Email:    dto.Email,
		Login:    dto.Login,
		Password: dto.Password,
	}
}
