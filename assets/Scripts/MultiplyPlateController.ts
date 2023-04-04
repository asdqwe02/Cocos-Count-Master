import { _decorator, Component, Node, CCInteger, Collider, ITriggerEvent, random, randomRange, randomRangeInt, TerrainLayer, CCBoolean, Material, MeshRenderer, Enum, EAxisDirection, equals, Mesh, RichText } from 'cc';
import { MultiplyPlateParent } from './MultiplyPlateParent';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

export enum EquationType {
    SUBTRACT,
    PLUS,
    MULTIPLY,
    DIVIDE
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
    @property(RichText)
    plateEquationText: RichText = null
    @property({ type: Enum(EquationType) })
    equationType: EquationType = EquationType.PLUS
    private _equationValue: number
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
        var equationSign = "";
        switch (this.equationType) {
            case EquationType.SUBTRACT:
                equationSign = "-"
                plateMat.setMaterial(this.plateMat[1], 0)
                break;
            case EquationType.PLUS:
                equationSign = "+"
                plateMat.setMaterial(this.plateMat[0], 0)
                break;
            default:
                break;
        }
        this._equationValue = randomRangeInt(this.minAmount, this.maxAmount)
        this.plateEquationText.string = equationSign + this._equationValue

    }
    onTriggerEnter(event: ITriggerEvent): void {
        var playerNode = event.otherCollider.node.getComponent(PlayerController)
        if (playerNode && this.CanActivate) {
            // var increaseAmount = randomRangeInt(this.minAmount, this.maxAmount)
            switch (this.equationType) {
                case EquationType.SUBTRACT:
                    this._equationValue = -this._equationValue;
                    break
                case EquationType.PLUS:
                    break;
                default:
                    break;

            }
            playerNode.node.emit("multiplyPlate_interacted", this._equationValue)
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


