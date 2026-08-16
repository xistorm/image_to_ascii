import { useCallback } from 'react';
import type { UploadParams } from '@/entities/upload';

import type { ImageSize } from '@/shared/components/Image/Image.hooks';
import { drawCanvasMultilineText, hexNumberToColor } from '@/shared/utils';

export const useAsciiCanvas = (
    size?: ImageSize,
    palette: number[] = [],
) => {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const fontFamily = rootStyles.getPropertyValue('--font-font-ascii').trim();

    const createContext = useCallback(() => {
        if (!size) {
            return null;
        }

        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;

        return canvas.getContext('2d');
    }, [size]);

    const drawAsciiImage = useCallback((ascii: string, params: UploadParams) => {
        const context = createContext();
        if (!size || !context) {
            return;
        }

        context.clearRect(0, 0, size.width, size.height);
        context.fillStyle = hexNumberToColor(palette[0]);
        context.fillRect(0, 0, size.width, size.height);

        drawCanvasMultilineText(context, ascii, {
            fontFamily,
            fontColor: hexNumberToColor(palette[1]),
            charWidth: params.charWidth,
            charHeight: params.charHeight,
        });

        return context.getImageData(0, 0, size.width, size.height);
    }, [
        createContext,
        size,
        palette,
        fontFamily,
    ]);

    return {
        createContext,
        drawAsciiImage,
    };
};
