import {Loader} from "pixi.js";

export class LoadManager {
    public static pngs: string[] = [];
    private static pixiLoader = new Loader();

    static startLoading() {
        return new Promise<void>(resolve => {
            for (let i = 0; i < this.pngs.length; i++) {
                this.pixiLoader.add(this.pngs[i], "assets/images/" + this.pngs[i]);
            }
            this.pixiLoader.onComplete.once((e) => {
                resolve();
            });
            this.pixiLoader.load();
        });
    }
}