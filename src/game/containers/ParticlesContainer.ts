/**
 * The class facilitates the usage of the PIXI particles system
 */
import {AnimatedParticle, Emitter} from "pixi-particles";
import * as PIXI from "pixi.js";
import {GameStage} from "./../stage/GameStage";

export class ParticlesContainer extends PIXI.Container {

    //Class properties
    /**
     *  The PIXI particle system
     */
    public system: Emitter;
    /**
     * The container of the particle system emitter
     */
    protected container: PIXI.Container;
    /**
     * Time elapsed
     */
    protected elapsed: number;

    protected isAnimated: boolean = false;
    protected animationStarted: boolean = false;

    constructor(particlesTextures, particlesProperties) {
        super();

        this.container = new PIXI.Container();
        this.addChild(this.container);

        this.system = new Emitter(this.container,
            particlesTextures,
            particlesProperties);
        this.system.emit = false;
        if (particlesProperties["anim"]) {
            this.system.particleConstructor = AnimatedParticle;
            this.isAnimated = true;
        } else {
            this.system.autoUpdate = true;
        }
    }

    /**
     * Play the particle system animations
     */
    public play() {
        this.system.emit = true;

        if(this.isAnimated && !this.animationStarted) {
            this.animationStarted = true;
            this.elapsed = Date.now();
            this.animate();
        }
    }

    /**
     * Stop the particle system
     */
    public stop() {
        this.system.emit = false;
    }

    /**
     * Animate the particle system
     */
    protected animate() {

        GameStage.ticker.add(() => {
            let now = Date.now();
            this.system.update((now - this.elapsed) * 0.001);
            this.elapsed = now;
            this.animate();
        });
    }
}
