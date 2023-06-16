export const drawTextCentred = (font: Font, text: string, x: number, y: number, w: number, h: number) => {
    let [fW, fH] = Renderer.GetTextSize(font, text);

    fH -= 4;

    if (w > fW) {
        x += (w - fW) / 2;
    }
    if (h > fH) {
        y += (h - fH) / 2;
    }

    Renderer.DrawText(font, x, y, text);
}