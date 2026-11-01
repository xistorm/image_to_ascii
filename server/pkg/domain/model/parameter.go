package model

type Parameter struct {
	Id       string  `json:"id"`
	UploadId string  `json:"upload_id"`
	Quality  float32 `json:"quality"`
}
