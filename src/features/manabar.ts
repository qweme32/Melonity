import { CalcAdaptive } from "../utils/adaptive";

export const drawManaBar = (hero: Hero, offsetX: number, offsetY: number) => {
    if (hero.IsDormant() || !hero.IsAlive() || hero.IsIllusion()) { return }
    let abs = hero.GetAbsOrigin();
    abs.z += hero.GetHealthBarOffset();

    let [x,y, onScreen] = Renderer.WorldToScreen(abs);

    x += offsetX;
    y += offsetY;

    if (!onScreen) { return };

    let pxPerMana = hero.GetMaxMana() / 100;
    let mana = hero.GetMana();

    Renderer.SetDrawColor(10, 10, 10, 255);
    Renderer.DrawFilledRect(x - CalcAdaptive(1), y - CalcAdaptive(1), CalcAdaptive(101), CalcAdaptive(7));

    Renderer.SetDrawColor(81, 122, 237, 255);
    Renderer.DrawFilledRect(x, y, CalcAdaptive(mana / pxPerMana - 1), CalcAdaptive(5));
}