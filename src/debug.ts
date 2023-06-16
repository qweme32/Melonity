import { scale } from './utils/adaptive'; 

namespace QwemeDebug {
    export let script: ScriptDescription = {};

    let version = new Date(parseInt(process.env.version + "000")).toString().replace(" GMT+0300 ()", "");

    Menu.AddLabel(['Qweme', 'About'], "Telegram: @qwemec")
    Menu.AddLabel(['Qweme', 'About'], "Discord: @qweme")
    Menu.AddLabel(['Qweme', 'About'], "")
    Menu.AddLabel(['Qweme', 'About'], `Screen resolution: ${Renderer.GetScreenSize()[0]}x${Renderer.GetScreenSize()[1]}`);
    Menu.AddLabel(['Qweme', 'About'], `Render scale: ${scale}`);
    Menu.AddLabel(['Qweme', 'About'], "");
    Menu.AddLabel(['Qweme', 'About'], `Version: ${version}`);
    Menu.AddLabel(['Qweme', 'About'], "Build by qweme with <3");

    let debugDraw = Menu.AddToggle(['Qweme', 'Debug'], "Debug draw", false);

    let font = Renderer.LoadFont('SFProDisplay-Bold', 12, Enum.FontWeight.BOLD);

    script.OnDraw = () => {
        if (!debugDraw.GetValue()) { return };
        let npcs = EntitySystem.GetNPCsList();

        Renderer.SetDrawColor(255, 255, 255, 255);

        for (const npc of npcs) {
            let abs = npc.GetAbsOrigin();
            let name = npc.GetEntityName();

            Renderer.DrawWorldText(font, abs, name);
        }
    }
}

RegisterScript(QwemeDebug.script)