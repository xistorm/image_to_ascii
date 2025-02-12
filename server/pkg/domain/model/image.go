package model

type Image struct {
	Id            string `json:"id"`
	UserId        string `json:"user_id"`
	Name          string `json:"name"`
	Type          string `json:"type"`
	OriginalImage string `json:"original_image"`
	AsciiImage    string `json:"ascii_image"`
}
