package model

type Generation struct {
	Id       string `json:"id"`
	UploadId string `json:"upload_id"`
	Index    int    `json:"index"`
	Content  string `json:"content"`
}
