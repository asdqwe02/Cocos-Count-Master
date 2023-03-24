import { _decorator, Component, Node, Button, Enum, director, CCFloat, CCBoolean } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

enum Direction {
    LEFT,
    RIGHT
}
const HOLD_TIME = .005; // Hold time in seconds
@ccclass('MoveButton')
export class MoveButton extends Component {

    @property(PlayerController)
    playerController: PlayerController = null
    @property(CCFloat)
    private holdTimer: number = 0;
    @property(CCBoolean)
    private isHolding: boolean = false;
    @property({ type: Enum(Direction) })
    public direction: Direction = Direction.LEFT

    onLoad() {
        // const button = this.node.getChildByName('Button').getComponent(Button);

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
  
    onTouchStart() {
        this.holdTimer = 0;
        this.isHolding = true;
    }

    onTouchMove() {
        this.isHolding = false;
    }

    onTouchEnd() {
        this.isHolding = false;
    }

    update(dt: number) {
        if (this.isHolding) {
            this.holdTimer += dt;

            if (this.holdTimer >= HOLD_TIME) {
                console.log('Button is being held!')
                if (this.direction === Direction.LEFT) {
                    this.playerController.moveLeft()
                }
                else if (this.direction === Direction.RIGHT) {
                    this.playerController.moveRight()
                }
            }
        } else {
            this.holdTimer = 0;
        }
    }
}



