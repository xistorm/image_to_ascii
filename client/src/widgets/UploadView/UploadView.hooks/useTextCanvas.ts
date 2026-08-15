/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import { $theme } from '@/entities/theme';
import type { UploadModel } from '@/entities/upload';
import { useImageSize } from '@/shared/hooks/useImageSize';
import { drawCanvasMultilineText } from '@/shared/utils';

export const useTextCanvas = (upload: UploadModel) => {
    const theme = useStore($theme);
    const { size, loading, error } = useImageSize(upload.url);
    const [canvasUrl, setCanvasUrl] = useState<string | undefined>(undefined);

    const rootStyles = window.getComputedStyle(document.documentElement);
    const fontFamily = rootStyles.getPropertyValue('--font-font-monospace').trim();
    const fontColor = rootStyles.getPropertyValue('--color-text-primary').trim();

    useEffect(() => {
        if (!size || loading || error) {
            setCanvasUrl(undefined);
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setCanvasUrl(undefined);
            return;
        }

        canvas.width = size.width;
        canvas.height = size.height;

        ctx.font = `500 ${upload.params.charHeight}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = fontColor;

        drawCanvasMultilineText(
            ctx,
            upload.generation[0]?.content ?? '',
            upload.params.charHeight,
            upload.params.charWidth,
        );

        const canvasSrc = canvas.toDataURL('image/png');

        setCanvasUrl(canvasSrc);
    }, [
        fontFamily,
        fontColor,
        upload,
        size,
        loading,
        error,
        setCanvasUrl,
        theme,
    ]);

    return canvasUrl;
};
