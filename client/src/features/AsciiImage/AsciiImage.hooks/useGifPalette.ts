import { useStore } from '@nanostores/react';
import { useCallback, useEffect, useState } from 'react';

import { $theme } from '@/entities/theme';
import { colorToHexNumber } from '@/shared/utils';

export const useGifPalette = () => {
    const [palette, setPalette] = useState<number[]>([]);
    const theme = useStore($theme);

    const updatePalette = useCallback(() => {
        const rootStyles = window.getComputedStyle(document.documentElement);
        const backgroundColor = rootStyles.getPropertyValue('--color-background-secondary').trim();
        const textColor = rootStyles.getPropertyValue('--color-text-primary').trim();

        const parsedBackgroundColor = colorToHexNumber(backgroundColor);
        const parsedTextColor = colorToHexNumber(textColor);

        setPalette([parsedBackgroundColor, parsedTextColor]);
    }, []);

    useEffect(() => {
        requestAnimationFrame(updatePalette);
    }, [updatePalette, theme]);

    return palette;
};
