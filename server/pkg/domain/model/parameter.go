package model

type Parameter struct {
	Id         string `json:"id"`
	UploadId   string `json:"upload_id"`
	CharWidth  int    `json:"char_width"`
	CharHeight int    `json:"char_height"`
}
