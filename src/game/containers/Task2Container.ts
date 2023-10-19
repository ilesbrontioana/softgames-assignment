import {GameContainer} from "./GameContainer";
import {Container, Sprite, Text, TextStyle, Texture} from "pixi.js";
import {gsap} from "gsap";
import {GameStage} from "./../stage/GameStage";

export class Task2Container extends GameContainer {

    private text: Container;
    private timeline;
    private fontStyle: PIXI.TextStyle;

    protected add() {
        super.add();

        this.fontStyle = new TextStyle();
        this.fontStyle.lineJoin = "round";
        this.fontStyle.fill = "#000000";

        this.text = new Container();
        this.addChild(this.text);
    }

    protected updateLayout() {
        super.updateLayout();

        this.text.scale.set(1);
        const scale = Math.min(1, GameStage.stageSize.width * 0.9 / this.width);
        this.text.scale.set(scale);

        this.text.x = GameStage.stageSize.width / 2 - this.text.width / 2;
        this.text.y = GameStage.stageSize.height / 2;
    }

    public show() {
        super.show();
        this.updateText(3);
        this.timeline = gsap.timeline({repeat: -1});
        this.timeline.add(() => {
            this.updateText(3);
        }, 2);
    }

    public hide() {
        super.hide();
        this.timeline?.kill();
    }

    private updateText(length: number) {
        this.fontStyle.fontSize = 15 + Math.floor(Math.random() * 30);
        this.text.removeChildren();
        for(let i = 0; i < 3; i++) {
            if(Math.random() >= 0.5) {
                const randomSprite =  1 + Math.floor(Math.random() * 3)
                const img = new Sprite(Texture.from("money" + randomSprite + ".png"));
                img.scale.set(this.fontStyle.fontSize / 100);
                img.x = this.text.width;
                this.text.addChild(img);
                img.anchor.set(0, 0.5);
            } else {
                const randomText: string = this.getRandomString();
                console.log(randomText);
                const txt: Text = new Text(randomText, this.fontStyle);
                txt.x = this.text.width;
                txt.anchor.set(0, 0.5);
                this.text.addChild(txt);
            }
        }

        this.updateLayout();
    }

    private getRandomString() {
        const randomLength =  1 + Math.floor(Math.random() * 20);
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < randomLength; i++ ) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
}
