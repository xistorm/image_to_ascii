package model

type File struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Data     []byte `json:"data"`
	UploadId string `json:"upload_id"`
}
