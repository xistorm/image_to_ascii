package image

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/color"
	"image/gif"
	"image/jpeg"
	"image/png"
	"strings"

	"github.com/xistorm/ascii_image/pkg/lib/slice"
)

const CharDensity = "@%#*+=-:. "

func FromBase64(mimeType string, content string) ([]image.Image, error) {
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(content))
	images := make([]image.Image, 0)

	switch mimeType {
	case "image/jpeg":
		decoded, err := jpeg.Decode(reader)
		if err != nil {
			return nil, err
		}
		images = append(images, decoded)
		break
	case "image/png":
		decoded, err := png.Decode(reader)
		if err != nil {
			return nil, err
		}
		images = append(images, decoded)
		break
	case "image/gif":
		decoded, err := gif.DecodeAll(reader)
		if err != nil {
			return nil, err
		}
		for _, img := range decoded.Image {
			images = append(images, img)
		}
		break
	default:
		return nil, fmt.Errorf("unsupported media type: %s", mimeType)
	}

	return images, nil
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
	case "image/gif":
		err = gif.Encode(&buffer, img, nil)
		break
	}

	if err != nil {
		return "", err
	}

	content := base64.StdEncoding.EncodeToString(buffer.Bytes())

	return content, nil
}

func ToPixelated(img image.Image, blockWidth, blockHeight int) image.Image {
	if blockWidth <= 0 || blockHeight <= 0 || img == nil {
		return img
	}

	bounds := img.Bounds()
	width := bounds.Dx()
	height := bounds.Dy()

	pixelated := image.NewRGBA(bounds)

	for y := 0; y < height; y += blockHeight {
		for x := 0; x < width; x += blockWidth {
			y0 := y
			x0 := x
			y1 := min(y+blockHeight, height)
			x1 := min(x+blockWidth, width)

			colorValue := img.At(x0, y0)

			for y := y0; y < y1; y++ {
				for x := x0; x < x1; x++ {
					pixelated.Set(x, y, colorValue)
				}
			}
		}
	}

	return pixelated
}

func ToGreyScale(img image.Image) image.Image {
	bounds := img.Bounds()
	grey := image.NewGray16(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			rgba := img.At(x, y)
			grey.Set(x, y, rgba)
		}
	}

	return grey
}

func ToContrast(img image.Image) image.Image {
	bounds := img.Bounds()

	contrast := image.NewGray16(bounds)

	minVal := color.White.Y
	maxVal := color.Black.Y

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			val := img.At(x, y).(color.Gray16).Y
			if val < minVal {
				minVal = val
			}
			if val > maxVal {
				maxVal = val
			}
		}
	}

	rangeDiff := float32(max(maxVal-minVal, 1))

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			oldVal := float32(img.At(x, y).(color.Gray16).Y)
			diffVal := oldVal - float32(minVal)
			newVal := uint16(diffVal / rangeDiff * float32(color.White.Y))

			contrast.Set(x, y, color.Gray16{Y: newVal})
		}
	}

	return contrast
}

func ToAsciiText(
	mimeType string,
	content string,
	charWidth int,
	chatHeight int,
) ([]string, error) {
	images, err := FromBase64(mimeType, content)
	if err != nil {
		return nil, err
	}

	asciiFrames := slice.Map(images, func(img image.Image) string {
		pixelatedImage := ToPixelated(img, charWidth, chatHeight)
		greyImage := ToGreyScale(pixelatedImage)
		contrastImage := ToContrast(greyImage)
		bounds := contrastImage.Bounds()

		var ascii strings.Builder
		for y := bounds.Min.Y; y < bounds.Max.Y; y += chatHeight {
			for x := bounds.Min.X; x < bounds.Max.X; x += charWidth {
				colorValue := float32(contrastImage.At(x, y).(color.Gray16).Y)
				colorWhite := float32(color.White.Y) + 1
				densityLength := float32(len(CharDensity))

				index := int(colorValue / colorWhite * densityLength)
				char := string(CharDensity[index])

				ascii.WriteString(char)
			}
			ascii.WriteString("\n")
		}

		return ascii.String()
	})

	return asciiFrames, nil
}
