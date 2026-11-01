package image

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/color"
	"image/draw"
	"image/gif"
	"image/jpeg"
	"image/png"
	"strings"

	"github.com/xistorm/ascii_image/pkg/lib/slice"
	xdraw "golang.org/x/image/draw"
	"golang.org/x/image/font"
	"golang.org/x/image/font/basicfont"
	"golang.org/x/image/math/fixed"
)

const CharDensity = "@%#*+=-:. "

func CalculateCharSize(imageCfg image.Config, quality float32) (int, int) {
	targetColumns := int((quality + 0.3) * 100)
	columns := min(targetColumns, imageCfg.Width)
	charWidth := (imageCfg.Width-1)/columns + 1
	charHeight := charWidth * 2

	return charWidth, charHeight
}

func FullGIFFrames(animation *gif.GIF) ([]image.Image, error) {
	if animation == nil || len(animation.Image) == 0 {
		return nil, fmt.Errorf("GIF has no frames")
	}

	width := animation.Config.Width
	height := animation.Config.Height
	if width <= 0 || height <= 0 {
		return nil, fmt.Errorf("invalid GIF dimensions")
	}

	bounds := image.Rect(0, 0, width, height)
	canvas := image.NewRGBA(bounds)
	frames := make([]image.Image, 0, len(animation.Image))

	for i, frame := range animation.Image {
		disposal := byte(gif.DisposalNone)
		if i < len(animation.Disposal) {
			disposal = animation.Disposal[i]
		}

		// Сохраняем состояние до текущего кадра, если его нужно восстановить.
		var previous *image.RGBA
		if disposal == gif.DisposalPrevious {
			previous = image.NewRGBA(bounds)
			draw.Draw(previous, bounds, canvas, bounds.Min, draw.Src)
		}

		// Прозрачные пиксели кадра оставляют видимыми предыдущие.
		draw.Draw(
			canvas,
			frame.Bounds(),
			frame,
			frame.Bounds().Min,
			draw.Over,
		)

		// Сохраняем независимую копию текущего полного кадра.
		fullFrame := image.NewRGBA(bounds)
		draw.Draw(fullFrame, bounds, canvas, bounds.Min, draw.Src)
		frames = append(frames, fullFrame)

		// Подготавливаем холст к следующему кадру.
		switch disposal {
		case gif.DisposalBackground:
			draw.Draw(
				canvas,
				frame.Bounds(),
				image.Transparent,
				image.Point{},
				draw.Src,
			)

		case gif.DisposalPrevious:
			draw.Draw(canvas, bounds, previous, bounds.Min, draw.Src)
		}
	}

	return frames, nil
}

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
		images, err = FullGIFFrames(decoded)
		if err != nil {
			return nil, err
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

func OnWhiteBackground(src image.Image) image.Image {
	bounds := src.Bounds()
	result := image.NewRGBA(bounds)

	draw.Draw(result, bounds, image.White, image.Point{}, draw.Src)
	draw.Draw(result, bounds, src, bounds.Min, draw.Over)

	return result
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
		opaqueImage := OnWhiteBackground(img)
		pixelatedImage := ToPixelated(opaqueImage, charWidth, chatHeight)
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

type RenderAsciiSizeParams struct {
	Width  int
	Height int
}

type RenderAsciiPaletteParams struct {
	Name            string
	BackgroundColor color.Color
	ForegroundColor color.Color
}

type RenderAsciiGifParams struct {
	Delay     []int
	LoopCount int
}

type RenderAsciiParams struct {
	Image   RenderAsciiSizeParams
	Char    RenderAsciiSizeParams
	Palette RenderAsciiPaletteParams
	Gif     RenderAsciiGifParams
	Theme   string
}

func RenderAsciiFrame(
	ascii string,
	params RenderAsciiParams,
) (image.Image, error) {
	rect := image.Rect(0, 0, params.Image.Width, params.Image.Height)
	canvas := image.NewRGBA(rect)

	backgroundColor := image.NewUniform(params.Palette.BackgroundColor)
	foregroundColor := image.NewUniform(params.Palette.ForegroundColor)

	// Белый фон и чёрные символы.
	draw.Draw(canvas, canvas.Bounds(), backgroundColor, image.Point{}, draw.Src)

	// Face7x13 — встроенный моноширинный растровый шрифт.
	face := basicfont.Face7x13

	for row, line := range strings.Split(ascii, "\n") {
		y := row * params.Char.Height
		if y >= params.Image.Height {
			break
		}

		for column, char := range []rune(line) {
			x := column * params.Char.Width
			if x >= params.Image.Width {
				break
			}

			// Рисуем символ в исходном размере шрифта.
			glyph := image.NewRGBA(image.Rect(0, 0, 7, 13))
			draw.Draw(glyph, glyph.Bounds(), backgroundColor, image.Point{}, draw.Src)

			drawer := font.Drawer{
				Dst:  glyph,
				Src:  foregroundColor,
				Face: face,
				Dot:  fixed.P(0, face.Ascent),
			}
			drawer.DrawString(string(char))

			// Масштабируем символ в ячейку. На краях холста
			// часть ячейки автоматически обрежется.
			target := image.Rect(x, y, x+params.Char.Width, y+params.Char.Height)
			xdraw.NearestNeighbor.Scale(
				canvas,
				target,
				glyph,
				glyph.Bounds(),
				draw.Src,
				nil,
			)
		}
	}

	return canvas, nil
}

func RenderAsciiImage(
	mimeType string,
	ascii []string,
	params RenderAsciiParams,
) ([]byte, error) {
	var buffer bytes.Buffer

	switch mimeType {
	case "image/png":
		frame, err := RenderAsciiFrame(
			ascii[0],
			params,
		)
		if err != nil {
			return nil, err
		}

		if err := png.Encode(&buffer, frame); err != nil {
			return nil, err
		}

	case "image/jpeg":
		frame, err := RenderAsciiFrame(
			ascii[0],
			params,
		)
		if err != nil {
			return nil, err
		}

		encodeParams := &jpeg.Options{Quality: 100}
		if err := jpeg.Encode(&buffer, frame, encodeParams); err != nil {
			return nil, err
		}

	case "image/gif":
		animation := &gif.GIF{
			Image:     make([]*image.Paletted, 0, len(ascii)),
			Delay:     params.Gif.Delay,
			LoopCount: params.Gif.LoopCount,
		}

		palette := color.Palette{
			params.Palette.BackgroundColor,
			params.Palette.ForegroundColor,
		}

		for i, content := range ascii {
			frame, err := RenderAsciiFrame(
				content,
				params,
			)
			if err != nil {
				return nil, fmt.Errorf("render frame %d: %w", i, err)
			}

			paletted := image.NewPaletted(frame.Bounds(), palette)
			draw.Draw(paletted, paletted.Bounds(), frame, image.Point{}, draw.Src)

			animation.Image = append(animation.Image, paletted)
		}

		if err := gif.EncodeAll(&buffer, animation); err != nil {
			return nil, err
		}

	default:
		return nil, fmt.Errorf("unsupported media type: %s", mimeType)
	}

	return buffer.Bytes(), nil
}
