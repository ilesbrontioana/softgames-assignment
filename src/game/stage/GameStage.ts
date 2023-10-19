import * as PIXI from "pixi.js";
import {EventManager} from "./../manager/EventManager";
import {GameEvents} from "./../events/GameEvents";

export class GameStage {

    private static _application: PIXI.Application;
    protected static _renderer: PIXI.Renderer;

    protected static _stageSize: PIXI.Rectangle;
    public static ticker: PIXI.Ticker;
    static get stageSize(): PIXI.Rectangle {
        return this._stageSize;
    }

    public static init() {

        this._stageSize = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);

        this._application = new PIXI.Application({
            width: this._stageSize.width,
            height: this._stageSize.height,
            resolution: window.devicePixelRatio || 1,
            clearBeforeRender: true,
            antialias: true,
            backgroundColor: 0xAAAAAAA,
        });

        globalThis.__PIXI_APP__ = this._application;

        this.ticker = this._application.ticker;


        this._renderer = this._application.renderer;
        document.body.appendChild(this._application.view);

        window.addEventListener("resize", () => {
            this._renderer.resize(window.innerWidth, window.innerHeight);
            this._stageSize.width = window.innerWidth;
            this._stageSize.height = window.innerHeight;
            EventManager.emit(GameEvents.Resize);
        });
    }

    public static addChild(child) {
        this._application.stage.addChild(child);
    }
}
