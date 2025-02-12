package image

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"strings"
)

const CharDensity = "@QB#NgWM8RDHdOKq9$6khEPXwmeZaoS2yjufF]}{tx1zv7lciL/\\|?*>r^;:_\"~,'.-`"
const WhiteColor = 65536

func FromBase64(mimeType string, content string) (image.Image, error) {
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(content))

	switch mimeType {
	case "image/jpeg":
		return jpeg.Decode(reader)
	case "image/png":
		return png.Decode(reader)
	default:
		return nil, fmt.Errorf("unsupported media type: %s", mimeType)
	}
}

func ToBase64(mimeType string, img image.Image) (string, error) {
	var buffer bytes.Buffer
	var err error

	switch mimeType {
	case "image/jpeg":
		err = jpeg.Encode(&buffer, img, nil)
		break
	case "image/png":
		err = png.Encode(&buffer, img)
		break
	}

	if err != nil {
		return "", err
	}

	content := base64.StdEncoding.EncodeToString(buffer.Bytes())

	return content, nil
}

func ToGreyScale(img image.Image) image.Image {
	bounds := img.Bounds()
	grey := image.NewGray(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			rgba := img.At(x, y)
			grey.Set(x, y, rgba)
		}
	}

	return grey
}

func ToAsciiText(img image.Image) string {
	greyImage := ToGreyScale(img)
	bounds := greyImage.Bounds()
	ascii := ""
	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			color, _, _, _ := greyImage.At(x, y).RGBA()
			index := int(color) * len(CharDensity) / WhiteColor
			char := string(CharDensity[index])
			ascii += char
		}
		ascii += "\n"
	}

	return ascii
}
