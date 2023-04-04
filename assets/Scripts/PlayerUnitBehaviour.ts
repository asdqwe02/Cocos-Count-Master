import { _decorator, Component, Node, Collider, ITriggerEvent, debug, instantiate, randomRange, Vec3, RigidBody, CCFloat } from 'cc';
import { dir, trace } from 'console';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('PlayerUnitBehaviour')
export class PlayerUnitBehaviour extends Component {
    @property(Node)
    public CenterNode: Node = null
    @property(CCFloat)
    public MoveCenterVelocity: number = 1.0
    start() {
        let collider = this.node.getComponent(Collider);
        collider.on("onTriggerEnter", this.onTriggerEnter, this);



    }
    onTriggerEnter(event: ITriggerEvent) {
        // console.log(event.type, event);
        // var pc = PlayerController.instance;
        // pc.spawnUnit()
        // const prefab = PlayerController.instance.UnitPrefab;
        // console.log(prefab === null)
        // for (let i = 0; i < 4; i++) {
        //     var prefabInstance = instantiate(prefab)
        //     PlayerController.instance.node.addChild(prefabInstance)
        //     var position = new Vec3(randomRange(-3.0, 3.0), 0, randomRange(-3.0, 3.0));
        //     prefabInstance.setPosition(position)
        // }
    }
    update(deltaTime: number) {
        if (this.CenterNode !== null) {
            var centerPos = new Vec3(this.CenterNode.worldPosition.x, 0, this.CenterNode.worldPosition.z)
            var unitPos = new Vec3(this.node.worldPosition.x, 0, this.node.worldPosition.z)
            var direction = centerPos.subtract(unitPos).normalize();
            this.node.getComponent(RigidBody).setLinearVelocity(direction.multiplyScalar(this.MoveCenterVelocity))
        }
    }
}


