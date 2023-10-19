import {GameContainer} from "./GameContainer";
import {ParticlesContainer} from "./ParticlesContainer";
import emitter from "./../../../assets/particles/emitter.json";
import {GameStage} from "./../stage/GameStage";

export class Task3Container extends GameContainer {

    private particles: ParticlesContainer;

    protected add() {
        super.add();

        this.particles = new ParticlesContainer(
            ["flame.png"],
            emitter
            );
        this.addChild(this.particles);
    }

    protected updateLayout() {
        super.updateLayout();

        this.particles.scale.set(1);
        const scale = Math.min(1, GameStage.stageSize.width * 0.9 / this.width);
        this.particles.scale.set(scale);

        this.particles.x = GameStage.stageSize.width / 2;
        this.particles.y = GameStage.stageSize.height / 2;
    }

    public show() {
        super.show();
        this.particles.play();
    }

    public hide() {
        super.hide();
        this.particles?.stop();
    }
}
