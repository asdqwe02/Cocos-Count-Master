import { _decorator, Component, Node, Vec2, EventTouch, EventMouse, CCFloat, CCObject, CCClass, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
const TOUCH_MOVE_TOLERANCE = 5; // minimum distance required to move joystick
@ccclass('Joystick')
export class Joystick extends Component {
    private _centerPos: Vec2;

    @property(Node)
    player: Node;
    @property(CCFloat)
    private radius: number = 1;
    private _direction: Vec2 = new Vec2(0, 0);
    private _isTouched: boolean = false;
    private _touchId: number = -1;
    private _node: Node;

    start() {
        this._node = this.node;

        this._centerPos = new Vec2(this._node.position.x, this._node.position.y);
        this.registerEvent();
    }
    public get direction(): Vec2 {
        return this._direction;
    }

    private registerEvent() {
        this._node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this._node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this._node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this._node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        // this._node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        // this._node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        // this._node.on(Node.EventType.MOUSE_UP, this.onMouseUp, this);
        // this._node.on(Node.EventType.MOUSE_LEAVE, this.onMouseUp, this);
    }

    private onTouchStart(event: EventTouch) {
        if (this._isTouched) {
            return;
        }
        this._isTouched = true;
        this._touchId = event.getID();
        this.updateDirection(event.getUILocation());
    }

    private onTouchMove(event: EventTouch) {
        if (!this._isTouched || event.getID() !== this._touchId) {
            return;
        }
        const curPos = event.getUILocation();
        if (curPos.subtract(this._centerPos).length() > TOUCH_MOVE_TOLERANCE) {
            this.updateDirection(curPos);
        }
    }

    private onTouchEnd(event: EventTouch) {
        if (!this._isTouched || event.getID() !== this._touchId) {
            return;
        }
        this.reset();
    }

    private onMouseDown(event: EventMouse) {
        if (this._isTouched || event.getButton() !== EventMouse.BUTTON_LEFT) {
            return;
        }
        this._isTouched = true;
        this.updateDirection(event.getUILocation());
    }

    private onMouseMove(event: EventMouse) {
        if (!this._isTouched || event.getButton() !== EventMouse.BUTTON_LEFT) {
            return;
        }
        const curPos = event.getUILocation();
        if (curPos.subtract(this._centerPos).length() > TOUCH_MOVE_TOLERANCE) {
            this.updateDirection(curPos);
        }
    }

    private onMouseUp(event: EventMouse) {
        if (!this._isTouched || event.getButton() !== EventMouse.BUTTON_LEFT) {
            return;
        }
        this.reset();
    }

    private updateDirection(pos: Vec2) {
        const direction = pos.subtract(this._centerPos);
        const length = direction.length();
        if (length > this.radius) {
            this._direction = direction
            this.player.translate(new Vec3(direction.x, 0, 0))

        }
    }
    private reset() {
        this._isTouched = false;
        this._touchId = -1;
        this._direction = new Vec2(0, 0);
    }
}