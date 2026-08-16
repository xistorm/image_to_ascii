import { useCallback, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import type { UploadModel } from '@/entities/upload';
import { $theme } from '@/entities/theme';
import { useImageSize } from '@/shared/components/Image/Image.hooks/useImageSize';
import { drawCanvasMultilineText } from '@/shared/utils';

export const useTextCanvas = (upload: UploadModel) => {
    const [canvasUrl, setCanvasUrl] = useState<string | undefined>(undefined);

    const theme = useStore($theme);
    const { size } = useImageSize(upload.url);

    const drawCanvas = useCallback(() => {
        if (!size || !upload.generation[0]) {
            setCanvasUrl(undefined);
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setCanvasUrl(undefined);
            return;
        }

        const rootStyles = window.getComputedStyle(document.documentElement);
        const fontFamily = rootStyles.getPropertyValue('--font-font-monospace').trim();
        const fontColor = rootStyles.getPropertyValue('--color-text-primary').trim();

        ctx.font = `500 ${upload.params.charHeight}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = fontColor;

        drawCanvasMultilineText(
            ctx,
            upload.generation[0].content,
            upload.params.charHeight,
            upload.params.charWidth,
        );

        const canvasSrc = canvas.toDataURL('image/png');

        setCanvasUrl(canvasSrc);
    }, [size, upload]);

    useEffect(() => {
        requestAnimationFrame(drawCanvas);
    }, [drawCanvas, theme]);

    return canvasUrl;
};
