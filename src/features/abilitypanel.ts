import { CalcAdaptive } from "../utils/adaptive";
import { drawTextCentred } from "../utils/render";

let fontBig = Renderer.LoadFont('SFProDisplay-Bold', 18, Enum.FontWeight.BOLD);
let fontMed = Renderer.LoadFont('SFProDisplay-Bold', 15, Enum.FontWeight.BOLD);
let fontSml = Renderer.LoadFont('SFProDisplay-Bold', 12, Enum.FontWeight.BOLD);

export const drawAbilityPanel = (hero: Hero, imgs: Record<string, LoadedImage>, offsetX: number, offsetY: number, align: number) => {
    if (hero.IsDormant() || !hero.IsAlive() || hero.IsIllusion()) { return }
    
    let abs = hero.GetAbsOrigin();
    abs.z += hero.GetHealthBarOffset();

    let [x,y, onScreen] = Renderer.WorldToScreen(abs);

    let baseX = x + offsetX;
    let baseY = y + offsetY;

    if (!onScreen) { return };

    let abilOffset = 2;
    let abilities = hero.GetAbilities();
    let mana = hero.GetMana();
    let heroName = hero.GetUnitName().replace("npc_dota_hero_", "");
    let index = 0;
    let normalAbils: Array<Ability> = [];
    for (const ability of abilities) {
        let abilName = ability.GetName();
        if (index > 5) { break }
        else if ( !abilName.startsWith(heroName) ) {
            index += 1;
            continue;
        }

        if (!ability.GetLevel()) {
            index += 1;
            continue;
        }

        normalAbils.push(ability);
        index += 1;
    }

    let center = (normalAbils.length * 27 + 2 - 164);

    if (align == 2) {
        baseX -= center / 2;
    } else if (align == 3) {
        baseX -= center;
    }

    Renderer.SetDrawColor(23, 23, 23, 255);
    Renderer.DrawFilledRect(baseX, baseY, normalAbils.length * 27 + 2, 29, 3);

    index = 0;
    
    for (const ability of normalAbils) {
        let abilName = ability.GetName();
        let cd = ability.GetCooldown();
        let mc = ability.GetManaCost();
        let al = ability.GetLevel();

        if (cd > 0) {
            Renderer.SetDrawColor(245, 66 , 81, 255);
        } else if(mc > mana) {
            Renderer.SetDrawColor(66, 107 , 254, 255);
        }else {
            Renderer.SetDrawColor(183, 240, 111, 255);
        }
        Renderer.DrawFilledRect(baseX + abilOffset, baseY + 2, 25, 25, 2);

        if (cd <= 0 && mc < mana) {
            Renderer.SetDrawColor(255, 255, 255, 255);
        }
        
        Renderer.DrawImage(imgs[abilName], baseX + abilOffset + 1, baseY + 3, 23, 23, 2);

        if (cd > 0) {
            Renderer.SetDrawColor(245, 66 , 81, 255);
        } else if(mc > mana) {
            Renderer.SetDrawColor(66, 107 , 254, 255);
        }else {
            Renderer.SetDrawColor(183, 240, 111, 255);
        }
        Renderer.DrawFilledRect(baseX + abilOffset, baseY + 21, 25, 5);

        if (cd > 0) {
            Renderer.SetDrawColor(255, 255, 255, 255);

            if (cd < 10) {
                drawTextCentred(fontBig, Math.floor(cd).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
            } else if (cd < 100) {
                drawTextCentred(fontMed, Math.floor(cd).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
            } else {
                drawTextCentred(fontSml, Math.floor(cd).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
            }
        } else if (mc > mana) {
            Renderer.SetDrawColor(255, 255, 255, 255);

            if (mc - mana < 10) {
                drawTextCentred(fontBig, Math.floor(mc - mana).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
            } else if (mc - mana < 100) {
                drawTextCentred(fontMed, Math.floor(mc - mana).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
            } else {
                drawTextCentred(fontSml, Math.floor(mc - mana).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
            }
        }

        if (al <= 4) {
            for (let index = 0; index < al; index++) {
                //console.log(index);
            }
        }

        abilOffset += 27;
        index += 1;
    }
}