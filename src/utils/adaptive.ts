export const scale: number = Renderer.GetScreenSize()[1] / 1080;

export const CalcAdaptive = (px: number) => {
    return px * scale;
}