package model

type Generation struct {
	Id       string `json:"id"`
	UploadId string `json:"upload_id"`
	SeqIndex int    `json:"seq_index"`
	Content  string `json:"content"`
}
