import {GameStage} from "../stage/GameStage";
import {Container} from "pixi.js";
import {EventManager} from "./../manager/EventManager";
import {GameEvents} from "./../events/GameEvents";

export class GameContainer extends Container {

    constructor() {
        super();
        this.add();
        GameStage.addChild(this);
        this.updateLayout();
        EventManager.on(GameEvents.Resize, this.updateLayout.bind(this));
    }

    protected add() {

    }

    protected updateLayout() {

    }


    public show() {
        this.hide();
        this.visible = true;
    }

    public hide() {
        this.visible = false;
    }
}
