export const base64ToImageSrc = (
    data: string,
    type: string,
): string => {
    return `data:${type};base64,${encodeURIComponent(data)}`;
};

export const quantizeImageData = (
    imageData: ImageData,
    palette: readonly number[],
): number[] => {
    const { width, height, data } = imageData;
    const indices = new Array(width * height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = data[offset];
            const g = data[offset + 1];
            const b = data[offset + 2];

            let bestIndex = 0;
            let minDistSq = Infinity;

            for (let i = 0; i < palette.length; i++) {
                const hex = palette[i];
                const pr = (hex >> 16) & 0xFF;
                const pg = (hex >> 8) & 0xFF;
                const pb = hex & 0xFF;

                const dr = r - pr;
                const dg = g - pg;
                const db = b - pb;
                const distSq = dr * dr + dg * dg + db * db;

                if (distSq < minDistSq) {
                    minDistSq = distSq;
                    bestIndex = i;
                }
            }

            indices[y * width + x] = bestIndex;
        }
    }

    return indices;
};
