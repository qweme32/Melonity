import { CalcAdaptive } from "./utils/adaptive";
import { drawManaBar } from "./features/manabar";
import { Console } from "./utils/console";
import { drawAbilityPanel } from "./features/abilitypanel";
import { darwItemPanel } from "./features/itempanel";

namespace QwemeVisuals {
    // Script
    export let script: ScriptDescription = {};

    // Vars
    let localHero: Hero = null;
    let allyHeroes: Array<Hero> = [];
    let enmyHeroes: Array<Hero> = [];
    let heroes: Array<Hero> = [];
    let inGame: boolean = false;
    let abilityImgs: Record<string, LoadedImage> = {};
    let itemImgs: Record<string, LoadedImage> = {};

    const logger = new Console("Visuals");

    // Menu
    let manaBarEnabled = Menu.AddToggle(['Qweme', 'Visuals', 'Mana Bar'], 'Enabled', false);
    let manaBarPositionX = Menu.AddSlider(['Qweme', 'Visuals', 'Mana Bar'], 'Position X', -100, 100, -50, 1);
    let manaBarPositionY = Menu.AddSlider(['Qweme', 'Visuals', 'Mana Bar'], 'Position Y', -100, 100, -20, 1);

    let abilityPanelEnabled = Menu.AddToggle(['Qweme', 'Visuals', 'Ability panel'], 'Enabled [Beta]', false);
    let abilityPanelAlign = Menu.AddSlider(['Qweme', 'Visuals', 'Ability panel'], "Align", 1, 3, 2, 1);
    let abilityPanelPositionX = Menu.AddSlider(['Qweme', 'Visuals', 'Ability panel'], 'Position X', -300, 300, -50, 1);
    let abilityPanelPositionY = Menu.AddSlider(['Qweme', 'Visuals', 'Ability panel'], 'Position Y', -300, 300, -20, 1);

    let itemPanelEnabled = Menu.AddToggle(['Qweme', 'Visuals', 'Item panel'], 'Enabled', false);
    let itemPanelScale = Menu.AddSlider(['Qweme', 'Visuals', 'Item panel'], "Scale", 0, 300, 100, 10);
    let itemPanelPositionX = Menu.AddSlider(['Qweme', 'Visuals', 'Item panel'], 'Position X', -300, 300, 0, 1);
    let itemPanelPositionY = Menu.AddSlider(['Qweme', 'Visuals', 'Item panel'], 'Position Y', -300, 300, 0, 1);

    // Init
    let initHeroes = () => {
        localHero = EntitySystem.GetLocalHero();

        if (!localHero) {
            logger.error("Localhero not found at gamestart event.");
            return false;
        }

        let heroesList = EntitySystem.GetHeroesList();
        for (const index in heroesList) {
            let hero = heroesList[index];
            heroes.push(hero);

            if (hero.IsSameTeam(localHero)) {
                allyHeroes.push(hero);
            } else { enmyHeroes.push(hero) }

            
        }

        return true;
    }

    // Entry
    script.OnScriptLoad = () => {
        if (GameRules.IsActiveGame()) {
            if (!initHeroes()) {
                logger.error("Failed while starting script...");
                return;
            }

            inGame = true;
        }

        logger.info('Successfully initialized.');
    };

    // Load heroes
    script.OnGameStart = () => {
        inGame = initHeroes();
    }

    // Clear heroes
    script.OnGameEnd = script.OnScriptUnload = () => {
        inGame = false;
        allyHeroes = [];
        enmyHeroes = [];
        localHero = null;
        heroes = [];
    }

    script.OnEntityDestroy = (entity: NPC, index: number) => {
        if (entity.IsHero() && heroes.includes(entity as Hero)) {
            heroes = heroes.filter((hero: Hero) => {
                return hero != entity as Hero;
            })
            allyHeroes = allyHeroes.filter((hero: Hero) => {
                return hero != entity as Hero;
            })
            enmyHeroes = enmyHeroes.filter((hero: Hero) => {
                return hero != entity as Hero;
            })
        }
    }

    // On new hero
    script.OnEntityCreate = (entity: NPC) => {
        if (!inGame) { return };

        if (entity.IsHero()) {
            setTimeout(() => {
                if (entity.IsSameTeam(localHero)) {
                    allyHeroes.push(entity as Hero);
                } else {
                    enmyHeroes.push(entity as Hero);
                }
                heroes.push(entity as Hero);
            }, 33)
        }
    }

    // Per dota tick
    script.OnUpdate = () => {
        if (!inGame) { return };

        for (const key in heroes) {
            let hero = heroes[key];
            let abilities = hero.GetAbilities();
            let items = hero.GetItems(true);

            for (let index = 0; index < abilities.length; index++) {
                if (index > 5) { break };
                const ability = abilities[index];
                let name = ability.GetName();
                if (!(name in abilityImgs)) {
                    abilityImgs[name] = ability.GetImage();
                    logger.debug(`Icon ${name} loaded!`);
                }
            }

            for (const item of items) {
                let name = item.GetName();
                if (!(name in itemImgs)) {
                    itemImgs[name] = item.GetImage();
                    logger.debug(`Icon ${name} loaded!`);
                }
            }
        }
    }

    // Draw
    script.OnDraw = () => {
        if (!inGame) { return };

        for (const index in enmyHeroes) {
            if (manaBarEnabled.GetValue()) {
                drawManaBar(enmyHeroes[index], manaBarPositionX.GetValue(), manaBarPositionY.GetValue());
            } if (abilityPanelEnabled.GetValue()) {
                drawAbilityPanel(enmyHeroes[index], abilityImgs, abilityPanelPositionX.GetValue(), abilityPanelPositionY.GetValue(), abilityPanelAlign.GetValue())
            } if (itemPanelEnabled.GetValue()) {
                darwItemPanel(enmyHeroes[index], itemImgs, itemPanelScale.GetValue(), itemPanelPositionX.GetValue(), itemPanelPositionY.GetValue())
            }
        }
    }
}

RegisterScript(QwemeVisuals.script);