package database

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	"github.com/xistorm/ascii_image/pkg/infrastructure/config"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func NewMysqlConnection() (*sql.DB, error) {
	dbCfg := config.Cfg.Database

	sqlCfg := mysql.Config{
		User:                 dbCfg.User,
		Passwd:               dbCfg.Password,
		Addr:                 fmt.Sprintf("%s:%d", dbCfg.Host, dbCfg.Port),
		Net:                  "tcp",
		DBName:               dbCfg.Name,
		AllowNativePasswords: true,
	}

	db, err := sql.Open("mysql", sqlCfg.FormatDSN())
	if err != nil {
		log.Fatal("Cant connect to mysql database", err.Error())
		return nil, err
	}

	if err = db.Ping(); err != nil {
		log.Fatal("Cant ping mysql database", err.Error())
		return nil, err
	}

	return db, nil
}
