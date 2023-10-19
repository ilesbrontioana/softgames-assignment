import { GameStage } from "./game/stage/GameStage";
import { UserInterfaceContainer} from "./game/containers/UserInterfaceContainer";
import { LoadManager } from "./game/manager/LoadManager";
import { EventManager } from "./game/manager/EventManager";
import { GameEvents } from "./game/events/GameEvents";
import {Task3Container} from "./game/containers/Task3Container";
import {Task2Container} from "./game/containers/Task2Container";
import {Task1Container} from "./game/containers/Task1Container";

export class Assignment {
    private static task1: Task1Container;
    private static task2: Task2Container;
    private static task3: Task3Container;
    private static ui: UserInterfaceContainer;

    public static async start() {
        this.initAssets();
        GameStage.init();
        await LoadManager.startLoading();
        this.addGameElements();
        this.addListeners();
    }

    private static addGameElements() {
        this.ui = new UserInterfaceContainer();
        this.task1 = new Task1Container();
        this.task2 = new Task2Container();
        this.task3 = new Task3Container();

        this.task1.hide();
        this.task2.hide();
        this.task3.hide();
    }

    private static addListeners() {
        EventManager.on(GameEvents.Task1Pressed, this.task1Pressed.bind(this));
        EventManager.on(GameEvents.Task2Pressed, this.task2Pressed.bind(this));
        EventManager.on(GameEvents.Task3Pressed, this.task3Pressed.bind(this));
    }

    private static task1Pressed() {
        this.task1.show();
        this.task2.hide();
        this.task3.hide();
    }

    private static task2Pressed() {
        this.task1.hide();
        this.task2.show();
        this.task3.hide();
    }

    private static task3Pressed() {
        this.task1.hide();
        this.task2.hide();
        this.task3.show();
    }

    private static initAssets() {
        LoadManager.pngs.push("button.png");
        LoadManager.pngs.push("card.png");
        LoadManager.pngs.push("flame.png");
        LoadManager.pngs.push("money1.png");
        LoadManager.pngs.push("money2.png");
        LoadManager.pngs.push("money3.png");
    }
}
