import { _decorator, Component, Node, director, Enum, Game, game, Scheduler } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;


enum Direction {
    LEFT,
    RIGHT
}
@ccclass('ControlButton')
export class ControlButton extends Component {
    @property(Node)
    button: Node = null;
    @property({ type: Enum(Direction) })
    public direction: Direction = Direction.LEFT
    @property(PlayerController)
    playerController: PlayerController = null
    private holdTimer: number = 0;
    private holdTime: number = 1.0; // Time in seconds to trigger the hold event.
    private holdInterval: number = 0.1; // Interval in seconds to trigger the hold event.
    private holdSchedule: Scheduler
    private holdEvent: Function = null

    // Called when the component is added to a node.
    onLoad() {
        // Register the button press and release event listeners.
        this.button.on(Node.EventType.TOUCH_START, this.onButtonPress, this);
        this.button.on(Node.EventType.TOUCH_END, this.onButtonRelease, this);
        this.button.on(Node.EventType.TOUCH_CANCEL, this.onButtonRelease, this);
    }

    // Called when the component is removed from a node.
    onDestroy() {
        // Unregister the button press and release event listeners.
        this.button.off(Node.EventType.TOUCH_START, this.onButtonPress, this);
        this.button.off(Node.EventType.TOUCH_END, this.onButtonRelease, this);
        this.button.off(Node.EventType.TOUCH_CANCEL, this.onButtonRelease, this);
    }

    // Called when the button is pressed.
    private onButtonPress() {
        // Schedule the hold event.
        //   this.holdTimer =
        if (this.holdEvent === null) {
            this.holdEvent = () => this.onButtonHold();
            director.getScheduler().schedule(this.onButtonHold, this, game.deltaTime);
        }

    }

    // Called when the button is released.
    private onButtonRelease() {
        // Unschedule the hold event.
        if (this.holdEvent !== null) {
            // console.log("unschedule onButtonHold")
            director.getScheduler().unschedule(this.onButtonHold, this);
            this.holdEvent = null;
        }
    }

    // Called repeatedly while the button is being held down.
    private onButtonHold() {
        // Trigger the hold event.
        // console.log('Button held down.');
        if (this.direction === Direction.LEFT) {
            // console.log('Left Button held down.');
            this.playerController.moveLeft();

        }

        if (this.direction === Direction.RIGHT) {
            // console.log('Right Button held down.');
            this.playerController.moveRight();
        }
    }
}


