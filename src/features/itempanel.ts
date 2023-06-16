import { drawTextCentred } from "../utils/render";

let font = Renderer.LoadFont('PTSANS-BOLD', 16, Enum.FontWeight.BOLD);
let fontSm = Renderer.LoadFont('PTSANS-BOLD', 12, Enum.FontWeight.BOLD);

export const darwItemPanel = (hero: Hero, imgs: Record<string, LoadedImage>, scale: number, offsetX: number, offsetY: number) => {
    if (hero.IsDormant() || !hero.IsAlive() || hero.IsIllusion()) { return }
    
    scale = scale / 100;
    let abs = hero.GetAbsOrigin();
    abs.z += hero.GetHealthBarOffset();

    let [x,y, onScreen] = Renderer.WorldToScreen(abs);

    if (!onScreen) { return };

    x += offsetX;
    y += offsetY;

    let items = hero.GetItems(true);

    let itemsForDraw: Array<Item> = [];

    let index = 0;
    for (const item of items) {
        if (index > 5) { break };
        
        if (item.GetCost() == 0 && item.GetName() != "item_ward_observer") {
            continue;
        } else if (item.GetName() == "item_tpscroll") {
            continue;
        }

        itemsForDraw.push(item);
        index++;
    }

    //console.log(6-itemsForDraw.length)
    if (itemsForDraw.length != 6) {
        let count = 6-itemsForDraw.length;
        for (let index = 0; index < count; index++) {
            itemsForDraw.push(null);
        }
    }

    x -= 130;
    y -= 5;

    Renderer.SetDrawColor(34, 34, 34, 255);
    Renderer.DrawFilledRect(x, y, 81 * scale, 96 * scale, 7 * scale);

    let heroMana = hero.GetMana();

    index = 0;
    let row = 0;
    for (const item of itemsForDraw) {
        let cd: number = 0;
        let manaCost: number = 0;
        
        if (!item) {
            Renderer.SetDrawColor(91, 91, 91, 255);
        } else {
            cd = item.GetCooldown();
            manaCost = item.GetManaCost();

            if (cd) {
                Renderer.SetDrawColor(255, 114, 148, 255);
            } else if (manaCost > heroMana) {
                Renderer.SetDrawColor(178, 182, 255, 255);
            } else {
                Renderer.SetDrawColor(183, 240, 111, 255);
            }
        }
        Renderer.DrawFilledRect(x + (3 + 39 * (index % 2)) * scale, y + (3 + row * 31) * scale, 36 * scale, 28 * scale, 6 * scale);

        if (!item) {
            Renderer.SetDrawColor(48, 48, 48, 255);
            Renderer.DrawFilledRect(x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale, 6 * scale);
        } else {
            if (cd) { 
                Renderer.SetDrawColor(255, 114, 148, 255);
            } else if (manaCost > heroMana) {
                Renderer.SetDrawColor(178, 182, 255, 255);
            } else {
                Renderer.SetDrawColor(255, 255, 255, 255);
            }
            
            Renderer.DrawImage(imgs[item.GetName()], x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale, 6 * scale);

            if (cd) {
                Renderer.SetDrawColor(255, 255, 255, 255);

                if (cd > 100) {
                    drawTextCentred(fontSm, Math.round(cd).toString(), x + (5 + 39 * (index % 2))  * scale, y + (5 + row * 31)  * scale, 32 * scale, 24 * scale);
                } else if (cd > 3) {
                    drawTextCentred(font, Math.round(cd).toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                } else {
                    drawTextCentred(font, cd.toFixed(1), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24  * scale);
                }
            } else if (manaCost > heroMana) {
                Renderer.SetDrawColor(255, 255, 255, 255);

                let value = Math.round(manaCost - heroMana);

                if (value > 100) {
                    drawTextCentred(fontSm, value.toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                } else {
                    drawTextCentred(font, value.toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                }
            }
        }
        
        
        row += index % 2;
        index++;
    }
    console.log("Test", itemsForDraw.length)
}