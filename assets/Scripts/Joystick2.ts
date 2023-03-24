import { _decorator, Component, Node, EventTouch, Vec2, Vec3, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Joystick2')
export class Joystick2 extends Component {
    @property(Node)
    private thumb: Node = null;

    @property(Node)
    private base: Node = null;

    private startPos: Vec2 = null;

    start() {
        this.startPos = new Vec2(this.thumb.position.x, this.thumb.position.y);
        this.registerTouchEvents();
    }

    private registerTouchEvents() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch) {
        this.updateThumbPosition(event.getLocation());
    }

    private onTouchMove(event: EventTouch) {
        this.updateThumbPosition(event.getLocation());
    }

    private onTouchEnd() {
        this.thumb.position = new Vec3(this.startPos.x, this.startPos.y, 0);
    }

    private updateThumbPosition(touchPos: Vec2) {
        const distance = touchPos.subtract(new Vec2(this.base.position.x, this.base.position.y));
        const direction = distance.normalize();
        const length = Math.min(distance.length(), this.base.scale.x / 2);
        var directionV3 = new Vec3(direction.x, direction.y, 0)
        this.thumb.position = this.base.position.add(directionV3.multiplyScalar(length));
    }
}



