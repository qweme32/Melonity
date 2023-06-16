let showDebug = false;

export class Console {
    private service: string = "";
    constructor (service: string) {
        this.service = service;
    }

    log(type: string, msg: any): void {
        console.log(`[QWEME][${this.service}][${type}] ${msg}`);
    }

    info(msg: any): void {
        this.log("INFO", msg);
    }

    debug(msg: any): void {
        if (!showDebug) { return } 
        this.log("DEBUG", msg);
    }

    error(msg: any): void {
        this.log("ERROR", msg);
    }
}