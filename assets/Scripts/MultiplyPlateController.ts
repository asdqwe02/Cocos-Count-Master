import { _decorator, Component, Node, CCInteger, Collider, ITriggerEvent, random, randomRange, randomRangeInt, TerrainLayer, CCBoolean, Material, MeshRenderer, Enum, EAxisDirection, equals, Mesh } from 'cc';
import { MultiplyPlateParent } from './MultiplyPlateParent';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

enum EquationType {
    SUBTRACT,
    PLUS,
}
@ccclass('MultiplyPlateController')
export class MultiplyPlateController extends Component {
    @property(CCBoolean)
    public CanActivate: boolean = true
    @property(CCInteger)
    minAmount: number = 0
    @property(CCInteger)
    maxAmount: number = 1
    public MultiplyPlateParent: MultiplyPlateParent = null
    @property(Material)
    plateMat: Material[] = []

    @property({ type: Enum(EquationType) })
    equationType: EquationType = EquationType.PLUS
    start() {
        let collider = this.node.getComponent(Collider)
        collider.on("onTriggerEnter", this.onTriggerEnter, this)
        this.node.on("resetMultiplyPlate", this.onResetPlate, this)
        // this.equationType = this.getRandomEnumValue(EquationType);
        this.onResetPlate();


    }
    onResetPlate() {
        this.CanActivate = true
        this.equationType = this.getRandomEnumValue(EquationType);
        var plateMat = this.node.getComponent(MeshRenderer);
        switch (this.equationType) {
            case EquationType.SUBTRACT:
                plateMat.setMaterial(this.plateMat[1], 0)
                break;
            case EquationType.PLUS:
                plateMat.setMaterial(this.plateMat[0], 0)
                break;
            default:
                break;
        }

    }
    onTriggerEnter(event: ITriggerEvent): void {
        var playerNode = event.otherCollider.node.getComponent(PlayerController)
        if (playerNode && this.CanActivate) {
            var increaseAmount = randomRangeInt(this.minAmount, this.maxAmount)
            switch (this.equationType) {
                case EquationType.SUBTRACT:
                    increaseAmount = -increaseAmount;
                    break
                case EquationType.PLUS:
                    break;
                default:
                    break;

            }
            playerNode.node.emit("multiplyPlate_interacted", increaseAmount)
            this.MultiplyPlateParent.node.emit("multiplyPlate_interacted")
        }
    }
    getRandomEnumValue<T>(enumeration: T): T[keyof T] {
        const keys = Object.keys(enumeration);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        return enumeration[randomKey];
    }
}


