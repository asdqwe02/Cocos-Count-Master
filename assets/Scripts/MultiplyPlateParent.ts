import { _decorator, Component, Node, CCClass } from 'cc';
import { MultiplyPlateController } from './MultiplyPlateController';
const { ccclass, property } = _decorator;

@ccclass('MultiplyPlateParent')
export class MultiplyPlateParent extends Component {
    @property([MultiplyPlateController])
    public ChildMultiplyPlates: MultiplyPlateController[] = []
    start() {
        this.ChildMultiplyPlates = this.node.getComponentsInChildren(MultiplyPlateController)
        this.ChildMultiplyPlates.forEach(plate => {
            plate.MultiplyPlateParent = this
            plate.CanActivate = true
        });
        this.node.on("multiplyPlate_interacted", this.onPlayerInteracted, this)
    }

    onPlayerInteracted() {
        console.log(this.ChildMultiplyPlates === undefined)
        this.ChildMultiplyPlates.forEach(plate => {
            plate.CanActivate = false
        });

    }
}


