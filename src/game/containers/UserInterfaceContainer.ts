import {GameContainer} from "./GameContainer";
import {Container, Sprite, Text, TextStyle, Texture} from "pixi.js";
import {GameStage} from "../stage/GameStage";
import {EventManager} from "../manager/EventManager";
import {GameEvents} from "../events/GameEvents";

/**
     * User interface will display
     * - target color
     * - current level
     * - available superpowers
*/
export class UserInterfaceContainer extends GameContainer {

    private task1Button: Container;
    private task2Button: Container;
    private task3Button: Container;

    protected add() {
        super.add();

        let fontStyle = new TextStyle();
        fontStyle.lineJoin = "round";
        fontStyle.fill = "#ffffff";
        fontStyle.strokeThickness = 5;
        fontStyle.stroke = "#000000";
        fontStyle.dropShadow = true;
        fontStyle.dropShadowColor = "#858585";
        fontStyle.dropShadowDistance = 2;
        fontStyle.fontSize = 30;

        this.task1Button = new Container();
        this.task2Button = new Container();
        this.task3Button = new Container();

        const background1 = new Sprite(Texture.from("button.png"));
        background1.anchor.set(0.5);
        const text1 = new Text("TASK 1", fontStyle);
        text1.anchor.set(0.5);
        this.task1Button.addChild(background1);
        this.task1Button.addChild(text1);

        const background2 = new Sprite(Texture.from("button.png"));
        background2.anchor.set(0.5);
        const text2 = new Text("TASK 2", fontStyle);
        text2.anchor.set(0.5);
        this.task2Button.addChild(background2);
        this.task2Button.addChild(text2);

        const background3 = new Sprite(Texture.from("button.png"));
        background3.anchor.set(0.5);
        const text3 = new Text("TASK 3", fontStyle);
        text3.anchor.set(0.5);
        this.task3Button.addChild(background3);
        this.task3Button.addChild(text3);

        this.addChild(this.task1Button);
        this.addChild(this.task2Button);
        this.addChild(this.task3Button);

        this.task1Button.interactive = true;
        this.task1Button.buttonMode = true;

        this.task2Button.interactive = true;
        this.task2Button.buttonMode = true;

        this.task3Button.interactive = true;
        this.task3Button.buttonMode = true;

        this.task1Button.on("pointerup", () => {
            EventManager.emit(GameEvents.Task1Pressed);
        });
        this.task2Button.on("pointerup", () => {
            EventManager.emit(GameEvents.Task2Pressed);
        });
        this.task3Button.on("pointerup", () => {
            EventManager.emit(GameEvents.Task3Pressed);
        });
    }

    protected updateLayout() {
        super.updateLayout();

        this.task1Button.scale.set(1);
        this.task2Button.scale.set(1);
        this.task3Button.scale.set(1);

        const scale = Math.min(1, GameStage.stageSize.width * 0.3 / this.task1Button.width);

        this.task1Button.scale.set(scale);
        this.task2Button.scale.set(scale);
        this.task3Button.scale.set(scale);

        this.task1Button.y = GameStage.stageSize.height - this.task1Button.height / 2 - 10;
        this.task1Button.x = 10 + this.task1Button.width / 2;

        this.task2Button.y = GameStage.stageSize.height - this.task2Button.height / 2 - 10;
        this.task2Button.x = GameStage.stageSize.width / 2;

        this.task3Button.y = GameStage.stageSize.height - this.task3Button.height / 2 - 10;
        this.task3Button.x = GameStage.stageSize.width - this.task3Button.width / 2 - 10;


    }
}
