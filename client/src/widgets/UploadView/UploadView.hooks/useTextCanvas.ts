import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import { $theme } from '@/entities/theme';
import type { UploadModel } from '@/entities/upload';
import { useImageSize } from '@/shared/hooks/useImageSize';

export const useTextCanvas = (upload: UploadModel) => {
    const theme = useStore($theme);
    const { size, loading, error } = useImageSize(upload.url);
    const [canvasUrl, setCanvasUrl] = useState<string | undefined>(undefined);

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

        // 2. Настраиваем размеры
        canvas.width = size.width;
        canvas.height = size.height;

        // 3. Настраиваем стиль текста
        const rootStyles = window.getComputedStyle(document.documentElement);

        ctx.font = rootStyles.getPropertyValue('--font-heading-3xl').trim();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = rootStyles.getPropertyValue('--color-text-primary').trim();

        const x = canvas.width / 2;
        const y = canvas.height / 2;

        ctx.fillText(upload.generation[0].content || '', x, y);

        // 4. Получаем Data URL (это строка вида data:image/png;base64,...)
        const canvasSrc = canvas.toDataURL('image/png');
        setCanvasUrl(canvasSrc);
    }, [upload, size, loading, error, setCanvasUrl, theme]);

    return canvasUrl;
};
