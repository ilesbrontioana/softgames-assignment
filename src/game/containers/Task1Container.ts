import {GameContainer} from "./GameContainer";
import {Sprite, Text, TextStyle, Texture} from "pixi.js";
import { gsap } from "gsap";
import {GameStage} from "./../stage/GameStage";


export class Task1Container extends GameContainer {

    private cards: Sprite[];
    private timeline;

    private stack1Pos: number;
    private stack2Pos: number;

    protected add() {
        super.add();
        this.cards = [];
        for(let i = 0; i < 144; i++) {
            const sprite = new Sprite(Texture.from("card.png"));
            sprite.anchor.set(0.5);
            this.cards.push(sprite);
        }

        let fontStyle = new TextStyle();
        fontStyle.lineJoin = "round";
        fontStyle.fill = "#000000";
        fontStyle.dropShadowDistance = 2;
        fontStyle.fontSize = 15;
    }

    protected updateLayout() {
        super.updateLayout();
        this.scale.set(1);
        const scale = Math.min(1, GameStage.stageSize.width * 0.8 / this.width);
        this.scale.set(scale);
    }

    public show() {
        super.show();

        this.stack1Pos = 100;
        this.stack2Pos = 250;
        this.cards.forEach((card, index: number) => {
            card.x =  this.stack1Pos;
            card.y = 100 + index * 2;
        });

        this.updateLayout();
        this.removeChildren();
        this.timeline = gsap.timeline();
        this.cards.forEach((card) => {
            this.addChild(card);
        });
        this.cards.reverse().forEach((card, index: number) => {
            this.timeline.to(card, {
                x: this.stack2Pos, duration: 2, y: 100 + index * 2,
                onStart: () => {
                    this.setChildIndex(card, this.cards.length - 1);
                }
            }, index);
        });
    }

    hide() {
        super.hide();
        this.cards.reverse();
        this.updateLayout();
        this.timeline?.kill();
    }

}
