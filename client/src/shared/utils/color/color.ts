import { compact } from '@/shared/utils';

const hexColorToHexNumber = (color: string) => {
    const hex = color.slice(1);

    const validatedHex = (() => {
        switch (hex.length) {
            case 6:
            case 8:
                return hex.substring(0, 6);
            case 3:
            case 4: {
                const [r, g, b] = hex.split('');
                return compact([r, r, g, g, b, b]).join('');
            }
            default:
                return '';
        }
    })();

    return parseInt(validatedHex, 16);
};

const rgbColorToHexNumber = (color: string) => {
    const match = color.match(/\d+/g);
    if (!match || match.length < 3) {
        return NaN;
    }
    const r = parseInt(match[0], 10);
    const g = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    return (r << 16) | (g << 8) | b;
};

export const colorToHexNumber = (color: string): number => {
    const parsedColor = color.trim().replace(/['"]/g, '');

    if (parsedColor.startsWith('#')) {
        return hexColorToHexNumber(parsedColor);
    }

    if (parsedColor.startsWith('rgb')) {
        return rgbColorToHexNumber(parsedColor);
    }

    return NaN;
};

export const hexNumberToColor = (color: number): string => {
    const validatedHex = color & 0xFFFFFF;

    const hex = validatedHex
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();

    return `#${hex}`;
};
