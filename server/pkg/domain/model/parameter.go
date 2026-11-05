package model

type Parameter struct {
	Id       string `json:"id"`
	UploadId string `json:"upload_id"`
	Quality  int    `json:"quality"`
	Alphabet string `json:"alphabet"`
}
