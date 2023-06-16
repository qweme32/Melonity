import { Console } from "./utils/console";

namespace QwemeCustomRange {
    export const script: ScriptDescription = {};

    const logger = new Console("CustomRange");
    let localHero: Hero = null;
    let customParticle: Particle = null;
    let enmyHeroes: Array<Hero> = [];

    script.OnGameEnd = script.OnScriptUnload = () => {
        localHero = null;
        enmyHeroes = [];
        customParticle = null;
    }

    script.OnEntityDestroy = (entity: NPC, index: number) => {
        if (entity.IsHero() && enmyHeroes.includes(entity as Hero)) {
            enmyHeroes = enmyHeroes.filter((hero: Hero) => {
                return hero != entity as Hero;
            })
        }
    }

    // On new hero
    script.OnEntityCreate = (entity: NPC) => {
        if (!localHero) { return };

        if (entity.IsHero()) {
            setTimeout(() => {
                if (!entity.IsSameTeam(localHero)) {
                    enmyHeroes.push(entity as Hero);
                }
            }, 33)
        }
    }

    const getColorVec = (element: MenuColorPickerHandler) => {
        let [r, g, b, a] = element.GetValue();

        return new Vector(r,g,b);
    }

    let enabled = Menu.AddToggle(['Qweme', 'Other', 'Custom range'],
        "Enabled",
        false
    ).OnChange((state: MenuToggleHandlerChangeObject) => {
        if (state.newValue) {
            applyRange();
        } else {
            destroyRange();
        }
    })

    let enemyTrigger = Menu.AddToggle(['Qweme', 'Other', 'Custom range'],
        "Enemy trigger",
        false
    )

    let enemyInRange: boolean = false;

    script.OnUpdate = () => {
        if (!localHero || !enemyTrigger.GetValue() || !customParticle) { return };

        let localAbs = localHero.GetAbsOrigin();
        let detectedInRange: number = 0;
        for (const hero of enmyHeroes) {
            let enemyAbs = hero.GetAbsOrigin();

            if (enemyAbs.Distance(localAbs) <= rangeSize.GetValue()) {
                detectedInRange += 1;
            }
        }

        if (detectedInRange > 0 && !enemyInRange) {
            customParticle.SetControl(1, new Vector(255, 0, 0))
            enemyInRange = true;
        } else {
            if (enemyInRange && detectedInRange == 0) {
                applyRangeColor();
                enemyInRange = false;
            }
        }
    }

    let rangeRipple = Menu.AddToggle(['Qweme', 'Other', 'Custom range'],
        "Ripple",
        false
    ).OnChange((state: MenuToggleHandlerChangeObject) => {
        applyRangeRipple();
    })

    let rangeColor = Menu.AddColorPicker(['Qweme', 'Other', 'Custom range'], 
        "Color", 
        255, 
        0, 
        255, 
        255
    ).OnChange((state: MenuColorPickerHandlerChangeObject) => {
        applyRangeColor();
    })

    let rangeSize = Menu.AddSlider(['Qweme', 'Other', 'Custom range'], 
        "Size", 
        100, 
        2000, 
        500, 
        50
    ).OnChange((state) => {
        destroyRange();
        applyRange();
    })

    const applyRangeColor = () => {
        if (!customParticle) { return };

        let value = getColorVec(rangeColor);

        customParticle.SetControl(1, value);
    }

    const applyRangeRipple = () => {
        if (!customParticle) { return };

        if (rangeRipple.GetValue()) {
            customParticle.SetControl(3, new Vector(100, 100, 100));
        } else {
            customParticle.SetControl(3, new Vector(0,0,0));
        }
    }

    const applyRange = () => {
        if (!localHero || customParticle) { return }

        customParticle = Particle.Create("particles/ui_mouseactions/drag_selected_ring.vpcf",
            Enum.ParticleAttachment.PATTACH_ABSORIGIN_FOLLOW,
            localHero
        )

        customParticle.SetControl(1, getColorVec(rangeColor));
        customParticle.SetControl(2, new Vector(rangeSize.GetValue(), rangeSize.GetValue(), rangeSize.GetValue()));
        if (rangeRipple.GetValue()) {
            customParticle.SetControl(3, new Vector(100, 100, 100));
        } else {
            customParticle.SetControl(3, new Vector(0, 0, 0));
        }
    }

    const destroyRange = () => {
        if (!localHero || !customParticle) { return };

        customParticle.Destroy();
        customParticle = null;
    }

    script.OnScriptLoad = () => {
        script.OnGameStart();
    }

    script.OnGameStart = () => {
        localHero = EntitySystem.GetLocalHero();

        if (!localHero) { return };

        let heroes = EntitySystem.GetHeroesList();

        enmyHeroes = [];
        for (const hero of heroes) {
            if (!localHero.IsSameTeam(hero)) {
                enmyHeroes.push(hero);
            }
        }

        if (enabled.GetValue()) {
            applyRange()
        }
    }
}

RegisterScript(QwemeCustomRange.script);