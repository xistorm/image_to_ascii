export const drawCanvasMultilineText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    lineHeight: number,
    letterSpacing: number,
    x = 0,
    y = 0,
) => {
    const lines = text.split('\n');

    lines.forEach((line, lineIndex) => {
        let currentX = x;
        const chars = Array.from(line);

        chars.forEach((char) => {
            ctx.fillText(char, currentX, y + lineIndex * lineHeight);
            currentX += letterSpacing;
        });
    });
};
