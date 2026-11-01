package model

type File struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	MimeType string `json:"mime_type"`
	Kind     string `json:"data"`
	Theme    string `json:"theme"`
	UploadId string `json:"upload_id"`
	Data     []byte `json:"-"`
	Url      string `json:"-"`
}
