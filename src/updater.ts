import { Console } from "./utils/console";

namespace QwemeUpdater {
    export const script: ScriptDescription = {};
    const logger = new Console("Updater");

    script.OnScriptLoad = async () => {
        logger.info("Checking updates...");
        HTTP.Request("raw.githubusercontent.com", "qweme32/Melonity/main/bundle.js", "GET", 
        { 
            ssl: true, 
            onResolve: (data: HTTPConnection) => {
                if (!data.IsResolved() || data.GetStatusCode() >= 400) { 
                    logger.error("Request failed.");
                    return;
                }

                let raw = data.GetBody();

                let remoteVersion = parseInt(raw.split("\n")[0].replace("// ", ""));

                if (remoteVersion > parseInt(process.env.version)) {
                    logger.info("Need update.");
                    Menu.GetFolder(['Qweme']).SetNameLocale("ru", "Qweme need update!");
                    Menu.GetFolder(['Qweme']).SetNameLocale("en", "Qweme need update!");
                    Menu.AddLabel(['Qweme'], "New version available!");
                    Menu.AddButton(['Qweme'], "Update scripts", () => {
                        Engine.OpenURL("https://github.com/qweme32/Melonity/blob/main/UPDATE.md");
                    });

                    Menu.AddLabel(['Qweme', 'About'], 'Updater: Need update');
                } else {
                    logger.info("Update not required, latest.");
                    Menu.AddLabel(['Qweme', 'About'], 'Updater: Latest version');
                }
            } 
        })
    }
}

RegisterScript(QwemeUpdater.script);