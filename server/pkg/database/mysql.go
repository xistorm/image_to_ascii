package database

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	"github.com/xistorm/ascii_image/pkg/config"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func NewMysqlConnection(cfg *config.DatabaseConfig) (*sql.DB, error) {
	sqlCfg := mysql.Config{
		User:                 cfg.User,
		Passwd:               cfg.Password,
		Addr:                 fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		Net:                  "tcp",
		DBName:               cfg.Name,
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
