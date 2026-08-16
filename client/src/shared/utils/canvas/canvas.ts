export interface DrawCanvasMultilineTextParams {
    charHeight: number;
    charWidth: number;
    fontFamily: string;
    fontColor: string;
}

export const drawCanvasMultilineText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    params: DrawCanvasMultilineTextParams,
) => {
    const lines = text.split('\n');

    ctx.font = `400 ${params.charHeight}px ${params.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = params.fontColor;

    lines.forEach((line, lineIndex) => {
        let currentX = 0;
        const chars = Array.from(line);

        chars.forEach((char) => {
            ctx.fillText(char, currentX, lineIndex * params.charHeight);
            currentX += params.charWidth;
        });
    });
};
