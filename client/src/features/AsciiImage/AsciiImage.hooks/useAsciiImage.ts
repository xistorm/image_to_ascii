import { useEffect, useState } from 'react';

import { useGifWriter } from './useGifWriter';
import { useAsciiCanvas } from './useAsciiCanvas';
import { useGifPalette } from './useGifPalette';

import type { UploadGeneration, UploadParams } from '@/entities/upload';
import type { ImageSize } from '@/shared/components/Image/Image.hooks';

interface UseAsciiImageParams {
    size?: ImageSize;
    params: UploadParams;
    frames: UploadGeneration[];
}

export const useAsciiImage = ({
    size,
    params,
    frames,
}: UseAsciiImageParams) => {
    const [imageUrl, setImageUrl] = useState<string>();

    const palette = useGifPalette();
    const { drawAsciiImage } = useAsciiCanvas(size, palette);
    const { addFrame, render } = useGifWriter(size, palette);

    useEffect(() => {
        for (const frame of frames) {
            const imageData = drawAsciiImage(frame.content, {
                charWidth: params.charWidth,
                charHeight: params.charHeight,
            });

            addFrame(imageData);
        }

        const imageUrl = render();
        setImageUrl(imageUrl);
    }, [
        drawAsciiImage,
        addFrame,
        render,
        params,
        frames,
        palette,
    ]);

    useEffect(() => {
        if (!imageUrl) return;

        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [imageUrl]);

    return imageUrl;
};
