// 1686886528

/*           Qweme Custom Scripts           */
/*                                          */
// Build version: 1686886528
// Build date: 6/16/2023, 6:35:28 AM
// Build by: @qweme32
/*                                          */
/*                File Tree                 */
// ./src/debug.ts
// ./src/features/abilitypanel.ts
// ./src/features/itempanel.ts
// ./src/features/manabar.ts
// ./src/range.ts
// ./src/updater.ts
// ./src/utils/adaptive.ts
// ./src/utils/console.ts
// ./src/utils/render.ts
// ./src/visuals.ts
/*                                          */

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.drawAbilityPanel = void 0;
    const render_1 = __webpack_require__(289);
    let fontBig = Renderer.LoadFont('SFProDisplay-Bold', 18, Enum.FontWeight.BOLD);
    let fontMed = Renderer.LoadFont('SFProDisplay-Bold', 15, Enum.FontWeight.BOLD);
    let fontSml = Renderer.LoadFont('SFProDisplay-Bold', 12, Enum.FontWeight.BOLD);
    const drawAbilityPanel = (hero, imgs, offsetX, offsetY, align) => {
        if (hero.IsDormant() || !hero.IsAlive() || hero.IsIllusion()) {
            return;
        }
        let abs = hero.GetAbsOrigin();
        abs.z += hero.GetHealthBarOffset();
        let [x, y, onScreen] = Renderer.WorldToScreen(abs);
        let baseX = x + offsetX;
        let baseY = y + offsetY;
        if (!onScreen) {
            return;
        }
        ;
        let abilOffset = 2;
        let abilities = hero.GetAbilities();
        let mana = hero.GetMana();
        let heroName = hero.GetUnitName().replace("npc_dota_hero_", "");
        let index = 0;
        let normalAbils = [];
        for (const ability of abilities) {
            let abilName = ability.GetName();
            if (index > 5) {
                break;
            }
            else if (!abilName.startsWith(heroName)) {
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
        }
        else if (align == 3) {
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
                Renderer.SetDrawColor(245, 66, 81, 255);
            }
            else if (mc > mana) {
                Renderer.SetDrawColor(66, 107, 254, 255);
            }
            else {
                Renderer.SetDrawColor(183, 240, 111, 255);
            }
            Renderer.DrawFilledRect(baseX + abilOffset, baseY + 2, 25, 25, 2);
            if (cd <= 0 && mc < mana) {
                Renderer.SetDrawColor(255, 255, 255, 255);
            }
            Renderer.DrawImage(imgs[abilName], baseX + abilOffset + 1, baseY + 3, 23, 23, 2);
            if (cd > 0) {
                Renderer.SetDrawColor(245, 66, 81, 255);
            }
            else if (mc > mana) {
                Renderer.SetDrawColor(66, 107, 254, 255);
            }
            else {
                Renderer.SetDrawColor(183, 240, 111, 255);
            }
            Renderer.DrawFilledRect(baseX + abilOffset, baseY + 21, 25, 5);
            if (cd > 0) {
                Renderer.SetDrawColor(255, 255, 255, 255);
                if (cd < 10) {
                    (0, render_1.drawTextCentred)(fontBig, Math.floor(cd).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
                }
                else if (cd < 100) {
                    (0, render_1.drawTextCentred)(fontMed, Math.floor(cd).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
                }
                else {
                    (0, render_1.drawTextCentred)(fontSml, Math.floor(cd).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
                }
            }
            else if (mc > mana) {
                Renderer.SetDrawColor(255, 255, 255, 255);
                if (mc - mana < 10) {
                    (0, render_1.drawTextCentred)(fontBig, Math.floor(mc - mana).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
                }
                else if (mc - mana < 100) {
                    (0, render_1.drawTextCentred)(fontMed, Math.floor(mc - mana).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
                }
                else {
                    (0, render_1.drawTextCentred)(fontSml, Math.floor(mc - mana).toString(), baseX + abilOffset + 1, baseY + 3, 23, 20);
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
    };
    exports.drawAbilityPanel = drawAbilityPanel;
    
    
    /***/ }),
    
    /***/ 579:
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.darwItemPanel = void 0;
    const render_1 = __webpack_require__(289);
    let font = Renderer.LoadFont('PTSANS-BOLD', 16, Enum.FontWeight.BOLD);
    let fontSm = Renderer.LoadFont('PTSANS-BOLD', 12, Enum.FontWeight.BOLD);
    const darwItemPanel = (hero, imgs, scale, offsetX, offsetY) => {
        if (hero.IsDormant() || !hero.IsAlive() || hero.IsIllusion()) {
            return;
        }
        scale = scale / 100;
        let abs = hero.GetAbsOrigin();
        abs.z += hero.GetHealthBarOffset();
        let [x, y, onScreen] = Renderer.WorldToScreen(abs);
        if (!onScreen) {
            return;
        }
        ;
        x += offsetX;
        y += offsetY;
        let items = hero.GetItems(true);
        let itemsForDraw = [];
        let index = 0;
        for (const item of items) {
            if (index > 5) {
                break;
            }
            ;
            if (item.GetCost() == 0 && item.GetName() != "item_ward_observer") {
                continue;
            }
            else if (item.GetName() == "item_tpscroll") {
                continue;
            }
            itemsForDraw.push(item);
            index++;
        }
        //console.log(6-itemsForDraw.length)
        if (itemsForDraw.length != 6) {
            let count = 6 - itemsForDraw.length;
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
            let cd = 0;
            let manaCost = 0;
            if (!item) {
                Renderer.SetDrawColor(91, 91, 91, 255);
            }
            else {
                cd = item.GetCooldown();
                manaCost = item.GetManaCost();
                if (cd) {
                    Renderer.SetDrawColor(255, 114, 148, 255);
                }
                else if (manaCost > heroMana) {
                    Renderer.SetDrawColor(178, 182, 255, 255);
                }
                else {
                    Renderer.SetDrawColor(183, 240, 111, 255);
                }
            }
            Renderer.DrawFilledRect(x + (3 + 39 * (index % 2)) * scale, y + (3 + row * 31) * scale, 36 * scale, 28 * scale, 6 * scale);
            if (!item) {
                Renderer.SetDrawColor(48, 48, 48, 255);
                Renderer.DrawFilledRect(x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale, 6 * scale);
            }
            else {
                if (cd) {
                    Renderer.SetDrawColor(255, 114, 148, 255);
                }
                else if (manaCost > heroMana) {
                    Renderer.SetDrawColor(178, 182, 255, 255);
                }
                else {
                    Renderer.SetDrawColor(255, 255, 255, 255);
                }
                Renderer.DrawImage(imgs[item.GetName()], x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale, 6 * scale);
                if (cd) {
                    Renderer.SetDrawColor(255, 255, 255, 255);
                    if (cd > 100) {
                        (0, render_1.drawTextCentred)(fontSm, Math.round(cd).toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                    }
                    else if (cd > 3) {
                        (0, render_1.drawTextCentred)(font, Math.round(cd).toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                    }
                    else {
                        (0, render_1.drawTextCentred)(font, cd.toFixed(1), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                    }
                }
                else if (manaCost > heroMana) {
                    Renderer.SetDrawColor(255, 255, 255, 255);
                    let value = Math.round(manaCost - heroMana);
                    if (value > 100) {
                        (0, render_1.drawTextCentred)(fontSm, value.toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                    }
                    else {
                        (0, render_1.drawTextCentred)(font, value.toString(), x + (5 + 39 * (index % 2)) * scale, y + (5 + row * 31) * scale, 32 * scale, 24 * scale);
                    }
                }
            }
            row += index % 2;
            index++;
        }
        console.log("Test", itemsForDraw.length);
    };
    exports.darwItemPanel = darwItemPanel;
    
    
    /***/ }),
    
    /***/ 721:
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.drawManaBar = void 0;
    const adaptive_1 = __webpack_require__(604);
    const drawManaBar = (hero, offsetX, offsetY) => {
        if (hero.IsDormant() || !hero.IsAlive() || hero.IsIllusion()) {
            return;
        }
        let abs = hero.GetAbsOrigin();
        abs.z += hero.GetHealthBarOffset();
        let [x, y, onScreen] = Renderer.WorldToScreen(abs);
        x += offsetX;
        y += offsetY;
        if (!onScreen) {
            return;
        }
        ;
        let pxPerMana = hero.GetMaxMana() / 100;
        let mana = hero.GetMana();
        Renderer.SetDrawColor(10, 10, 10, 255);
        Renderer.DrawFilledRect(x - (0, adaptive_1.CalcAdaptive)(1), y - (0, adaptive_1.CalcAdaptive)(1), (0, adaptive_1.CalcAdaptive)(101), (0, adaptive_1.CalcAdaptive)(7));
        Renderer.SetDrawColor(81, 122, 237, 255);
        Renderer.DrawFilledRect(x, y, (0, adaptive_1.CalcAdaptive)(mana / pxPerMana - 1), (0, adaptive_1.CalcAdaptive)(5));
    };
    exports.drawManaBar = drawManaBar;
    
    
    /***/ }),
    
    /***/ 604:
    /***/ ((__unused_webpack_module, exports) => {
    
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.CalcAdaptive = exports.scale = void 0;
    exports.scale = Renderer.GetScreenSize()[1] / 1080;
    const CalcAdaptive = (px) => {
        return px * exports.scale;
    };
    exports.CalcAdaptive = CalcAdaptive;
    
    
    /***/ }),
    
    /***/ 33:
    /***/ ((__unused_webpack_module, exports) => {
    
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Console = void 0;
    let showDebug = false;
    class Console {
        constructor(service) {
            this.service = "";
            this.service = service;
        }
        log(type, msg) {
            console.log(`[QWEME][${this.service}][${type}] ${msg}`);
        }
        info(msg) {
            this.log("INFO", msg);
        }
        debug(msg) {
            if (!showDebug) {
                return;
            }
            this.log("DEBUG", msg);
        }
        error(msg) {
            this.log("ERROR", msg);
        }
    }
    exports.Console = Console;
    
    
    /***/ }),
    
    /***/ 289:
    /***/ ((__unused_webpack_module, exports) => {
    
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.drawTextCentred = void 0;
    const drawTextCentred = (font, text, x, y, w, h) => {
        let [fW, fH] = Renderer.GetTextSize(font, text);
        fH -= 4;
        if (w > fW) {
            x += (w - fW) / 2;
        }
        if (h > fH) {
            y += (h - fH) / 2;
        }
        Renderer.DrawText(font, x, y, text);
    };
    exports.drawTextCentred = drawTextCentred;
    
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    (() => {
    var exports = {};
    var __webpack_unused_export__;
    
    __webpack_unused_export__ = ({ value: true });
    const adaptive_1 = __webpack_require__(604);
    var QwemeDebug;
    (function (QwemeDebug) {
        QwemeDebug.script = {};
        let version = new Date(parseInt("1686886528" + "000")).toString().replace(" GMT+0300 ()", "");
        Menu.AddLabel(['Qweme', 'About'], "Telegram: @qwemec");
        Menu.AddLabel(['Qweme', 'About'], "Discord: @qweme");
        Menu.AddLabel(['Qweme', 'About'], "");
        Menu.AddLabel(['Qweme', 'About'], `Screen resolution: ${Renderer.GetScreenSize()[0]}x${Renderer.GetScreenSize()[1]}`);
        Menu.AddLabel(['Qweme', 'About'], `Render scale: ${adaptive_1.scale}`);
        Menu.AddLabel(['Qweme', 'About'], "");
        Menu.AddLabel(['Qweme', 'About'], `Version: ${version}`);
        Menu.AddLabel(['Qweme', 'About'], "Build by qweme with <3");
        let debugDraw = Menu.AddToggle(['Qweme', 'Debug'], "Debug draw", false);
        let font = Renderer.LoadFont('SFProDisplay-Bold', 12, Enum.FontWeight.BOLD);
        QwemeDebug.script.OnDraw = () => {
            if (!debugDraw.GetValue()) {
                return;
            }
            ;
            let npcs = EntitySystem.GetNPCsList();
            Renderer.SetDrawColor(255, 255, 255, 255);
            for (const npc of npcs) {
                let abs = npc.GetAbsOrigin();
                let name = npc.GetEntityName();
                Renderer.DrawWorldText(font, abs, name);
            }
        };
    })(QwemeDebug || (QwemeDebug = {}));
    RegisterScript(QwemeDebug.script);
    
    })();
    
    // This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    (() => {
    var exports = {};
    var __webpack_unused_export__;
    
    __webpack_unused_export__ = ({ value: true });
    const console_1 = __webpack_require__(33);
    var QwemeCustomRange;
    (function (QwemeCustomRange) {
        QwemeCustomRange.script = {};
        const logger = new console_1.Console("CustomRange");
        let localHero = null;
        let customParticle = null;
        let enmyHeroes = [];
        QwemeCustomRange.script.OnGameEnd = QwemeCustomRange.script.OnScriptUnload = () => {
            localHero = null;
            enmyHeroes = [];
            customParticle = null;
        };
        QwemeCustomRange.script.OnEntityDestroy = (entity, index) => {
            if (entity.IsHero() && enmyHeroes.includes(entity)) {
                enmyHeroes = enmyHeroes.filter((hero) => {
                    return hero != entity;
                });
            }
        };
        // On new hero
        QwemeCustomRange.script.OnEntityCreate = (entity) => {
            if (!localHero) {
                return;
            }
            ;
            if (entity.IsHero()) {
                setTimeout(() => {
                    if (!entity.IsSameTeam(localHero)) {
                        enmyHeroes.push(entity);
                    }
                }, 33);
            }
        };
        const getColorVec = (element) => {
            let [r, g, b, a] = element.GetValue();
            return new Vector(r, g, b);
        };
        let enabled = Menu.AddToggle(['Qweme', 'Other', 'Custom range'], "Enabled", false).OnChange((state) => {
            if (state.newValue) {
                applyRange();
            }
            else {
                destroyRange();
            }
        });
        let enemyTrigger = Menu.AddToggle(['Qweme', 'Other', 'Custom range'], "Enemy trigger", false);
        let enemyInRange = false;
        QwemeCustomRange.script.OnUpdate = () => {
            if (!localHero || !enemyTrigger.GetValue() || !customParticle) {
                return;
            }
            ;
            let localAbs = localHero.GetAbsOrigin();
            let detectedInRange = 0;
            for (const hero of enmyHeroes) {
                let enemyAbs = hero.GetAbsOrigin();
                if (enemyAbs.Distance(localAbs) <= rangeSize.GetValue()) {
                    detectedInRange += 1;
                }
            }
            if (detectedInRange > 0 && !enemyInRange) {
                customParticle.SetControl(1, new Vector(255, 0, 0));
                enemyInRange = true;
            }
            else {
                if (enemyInRange && detectedInRange == 0) {
                    applyRangeColor();
                    enemyInRange = false;
                }
            }
        };
        let rangeRipple = Menu.AddToggle(['Qweme', 'Other', 'Custom range'], "Ripple", false).OnChange((state) => {
            applyRangeRipple();
        });
        let rangeColor = Menu.AddColorPicker(['Qweme', 'Other', 'Custom range'], "Color", 255, 0, 255, 255).OnChange((state) => {
            applyRangeColor();
        });
        let rangeSize = Menu.AddSlider(['Qweme', 'Other', 'Custom range'], "Size", 100, 2000, 500, 50).OnChange((state) => {
            destroyRange();
            applyRange();
        });
        const applyRangeColor = () => {
            if (!customParticle) {
                return;
            }
            ;
            let value = getColorVec(rangeColor);
            customParticle.SetControl(1, value);
        };
        const applyRangeRipple = () => {
            if (!customParticle) {
                return;
            }
            ;
            if (rangeRipple.GetValue()) {
                customParticle.SetControl(3, new Vector(100, 100, 100));
            }
            else {
                customParticle.SetControl(3, new Vector(0, 0, 0));
            }
        };
        const applyRange = () => {
            if (!localHero || customParticle) {
                return;
            }
            customParticle = Particle.Create("particles/ui_mouseactions/drag_selected_ring.vpcf", Enum.ParticleAttachment.PATTACH_ABSORIGIN_FOLLOW, localHero);
            customParticle.SetControl(1, getColorVec(rangeColor));
            customParticle.SetControl(2, new Vector(rangeSize.GetValue(), rangeSize.GetValue(), rangeSize.GetValue()));
            if (rangeRipple.GetValue()) {
                customParticle.SetControl(3, new Vector(100, 100, 100));
            }
            else {
                customParticle.SetControl(3, new Vector(0, 0, 0));
            }
        };
        const destroyRange = () => {
            if (!localHero || !customParticle) {
                return;
            }
            ;
            customParticle.Destroy();
            customParticle = null;
        };
        QwemeCustomRange.script.OnScriptLoad = () => {
            QwemeCustomRange.script.OnGameStart();
        };
        QwemeCustomRange.script.OnGameStart = () => {
            localHero = EntitySystem.GetLocalHero();
            if (!localHero) {
                return;
            }
            ;
            let heroes = EntitySystem.GetHeroesList();
            enmyHeroes = [];
            for (const hero of heroes) {
                if (!localHero.IsSameTeam(hero)) {
                    enmyHeroes.push(hero);
                }
            }
            if (enabled.GetValue()) {
                applyRange();
            }
        };
    })(QwemeCustomRange || (QwemeCustomRange = {}));
    RegisterScript(QwemeCustomRange.script);
    
    })();
    
    // This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    (() => {
    var exports = {};
    var __webpack_unused_export__;
    
    __webpack_unused_export__ = ({ value: true });
    const console_1 = __webpack_require__(33);
    var QwemeUpdater;
    (function (QwemeUpdater) {
        QwemeUpdater.script = {};
        const logger = new console_1.Console("Updater");
        QwemeUpdater.script.OnScriptLoad = async () => {
            logger.info("Checking updates...");
            HTTP.Request("raw.githubusercontent.com", "qweme32/Melonity/main/bundle.js", "GET", {
                ssl: true,
                onResolve: (data) => {
                    if (!data.IsResolved() || data.GetStatusCode() >= 400) {
                        logger.error("Request failed.");
                        return;
                    }
                    let raw = data.GetBody();
                    let remoteVersion = parseInt(raw.split("\n")[0].replace("// ", ""));
                    if (remoteVersion > parseInt("1686886528")) {
                        logger.info("Need update.");
                        Menu.GetFolder(['Qweme']).SetNameLocale("ru", "Qweme need update!");
                        Menu.GetFolder(['Qweme']).SetNameLocale("en", "Qweme need update!");
                        Menu.AddLabel(['Qweme'], "New version available!");
                        Menu.AddButton(['Qweme'], "Update scripts", () => {
                            Engine.OpenURL("https://github.com/qweme32/Melonity/blob/main/UPDATE.md");
                        });
                        Menu.AddLabel(['Qweme', 'About'], 'Updater: Need update');
                    }
                    else {
                        logger.info("Update not required, latest.");
                        Menu.AddLabel(['Qweme', 'About'], 'Updater: Latest version');
                    }
                }
            });
        };
    })(QwemeUpdater || (QwemeUpdater = {}));
    RegisterScript(QwemeUpdater.script);
    
    })();
    
    // This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    (() => {
    var exports = __webpack_exports__;
    var __webpack_unused_export__;
    
    __webpack_unused_export__ = ({ value: true });
    const manabar_1 = __webpack_require__(721);
    const console_1 = __webpack_require__(33);
    const abilitypanel_1 = __webpack_require__(717);
    const itempanel_1 = __webpack_require__(579);
    var QwemeVisuals;
    (function (QwemeVisuals) {
        // Script
        QwemeVisuals.script = {};
        // Vars
        let localHero = null;
        let allyHeroes = [];
        let enmyHeroes = [];
        let heroes = [];
        let inGame = false;
        let abilityImgs = {};
        let itemImgs = {};
        const logger = new console_1.Console("Visuals");
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
                }
                else {
                    enmyHeroes.push(hero);
                }
            }
            return true;
        };
        // Entry
        QwemeVisuals.script.OnScriptLoad = () => {
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
        QwemeVisuals.script.OnGameStart = () => {
            inGame = initHeroes();
        };
        // Clear heroes
        QwemeVisuals.script.OnGameEnd = QwemeVisuals.script.OnScriptUnload = () => {
            inGame = false;
            allyHeroes = [];
            enmyHeroes = [];
            localHero = null;
            heroes = [];
        };
        QwemeVisuals.script.OnEntityDestroy = (entity, index) => {
            if (entity.IsHero() && heroes.includes(entity)) {
                heroes = heroes.filter((hero) => {
                    return hero != entity;
                });
                allyHeroes = allyHeroes.filter((hero) => {
                    return hero != entity;
                });
                enmyHeroes = enmyHeroes.filter((hero) => {
                    return hero != entity;
                });
            }
        };
        // On new hero
        QwemeVisuals.script.OnEntityCreate = (entity) => {
            if (!inGame) {
                return;
            }
            ;
            if (entity.IsHero()) {
                setTimeout(() => {
                    if (entity.IsSameTeam(localHero)) {
                        allyHeroes.push(entity);
                    }
                    else {
                        enmyHeroes.push(entity);
                    }
                    heroes.push(entity);
                }, 33);
            }
        };
        // Per dota tick
        QwemeVisuals.script.OnUpdate = () => {
            if (!inGame) {
                return;
            }
            ;
            for (const key in heroes) {
                let hero = heroes[key];
                let abilities = hero.GetAbilities();
                let items = hero.GetItems(true);
                for (let index = 0; index < abilities.length; index++) {
                    if (index > 5) {
                        break;
                    }
                    ;
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
        };
        // Draw
        QwemeVisuals.script.OnDraw = () => {
            if (!inGame) {
                return;
            }
            ;
            for (const index in enmyHeroes) {
                if (manaBarEnabled.GetValue()) {
                    (0, manabar_1.drawManaBar)(enmyHeroes[index], manaBarPositionX.GetValue(), manaBarPositionY.GetValue());
                }
                if (abilityPanelEnabled.GetValue()) {
                    (0, abilitypanel_1.drawAbilityPanel)(enmyHeroes[index], abilityImgs, abilityPanelPositionX.GetValue(), abilityPanelPositionY.GetValue(), abilityPanelAlign.GetValue());
                }
                if (itemPanelEnabled.GetValue()) {
                    (0, itempanel_1.darwItemPanel)(enmyHeroes[index], itemImgs, itemPanelScale.GetValue(), itemPanelPositionX.GetValue(), itemPanelPositionY.GetValue());
                }
            }
        };
    })(QwemeVisuals || (QwemeVisuals = {}));
    RegisterScript(QwemeVisuals.script);
    
    })();
    
    /******/ })()
    ;