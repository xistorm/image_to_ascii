import { useCallback, useEffect, useState } from 'react';
import { GifWriter } from 'omggif';

import type { ImageSize } from '@/shared/components/Image/Image.hooks';
import { quantizeImageData } from '@/shared/utils';

export const useGifWriter = (
    size?: ImageSize,
    palette: number[] = [],
) => {
    const [writer, setWriter] = useState<GifWriter>();

    useEffect(() => {
        if (!size) {
            return setWriter(undefined);
        }

        const estimatedSize = size.height * size.width * 3;
        const buffer = new Uint8Array(estimatedSize);
        const newGifWriter = new GifWriter(
            buffer,
            size.width,
            size.height,
            { palette, loop: 0 },
        );

        setWriter(newGifWriter);
    }, [size, palette]);

    const addFrame = useCallback((imageData?: ImageData) => {
        if (!imageData || !writer) {
            return;
        }

        const pixels = quantizeImageData(imageData, palette);
        writer.addFrame(0, 0, imageData.width, imageData.height, pixels);
    }, [writer, palette]);

    const render = useCallback(() => {
        if (!writer) {
            return;
        }

        writer.end();
        const buffer = writer.getOutputBuffer();
        const endPos = writer.getOutputBufferPosition();
        const gifData = new Uint8Array(buffer).subarray(0, endPos);
        const blob = new Blob([gifData], { type: 'image/gif' });

        return URL.createObjectURL(blob);
    }, [writer]);

    return {
        writer,
        addFrame,
        render,
    };
};
