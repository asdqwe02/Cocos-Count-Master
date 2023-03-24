import { _decorator, Component, Node, Vec2, Vec3, CCFloat, Collider, ITriggerEvent, instantiate, CCObject, Prefab, random, randomRange, director, game, Event, Input, EventKeyboard, KeyCode, debug } from 'cc';
import { GameManager } from './GameManager';
import { MultiplyPlateController } from './MultiplyPlateController';
import { PlayerUnitBehaviour } from './PlayerUnitBehaviour';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(Prefab)
    public UnitPrefab: Prefab
    @property(CCFloat)
    public Speed: number = 1.0
    @property(CCFloat)
    public SideWaySpeed: number = 1.0
    @property(PlayerUnitBehaviour)
    playerUnits: PlayerUnitBehaviour[] = []
    // private static _instance: PlayerController = null
    start() {
        let collider = this.node.getComponent(Collider)
        collider.on("onTriggerEnter", this.onTriggerEnter, this)
        this.node.on("multiplyPlate_interacted", this.onInteractMultiplyPlate, this)
        this.node.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)

    }
    onKeyDown(event: EventKeyboard) {
        console.log("key pressed")
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.moveLeft()
                break
            case KeyCode.KEY_D:
                this.moveRight()
                break
        }
    }
    moveLeft() {
        this.node.translate(new Vec3(-this.SideWaySpeed, 0, 0).multiplyScalar(game.deltaTime));
    }
    moveRight() {
        this.node.translate(new Vec3(this.SideWaySpeed, 0, 0).multiplyScalar(game.deltaTime));

    }
    onInteractMultiplyPlate(amount: number) {
        // console.log(amount)
        this.spawnUnit(amount);
        // GameManager.instance.onSpawnNextGround()
        // this.node.emit("spawnNextGround")
        // console.log(GameManager.instance.node);
    }
    onTriggerEnter(event: ITriggerEvent) {
        if (event.otherCollider.node.name == "EndOfGround") {
            GameManager.instance.node.emit("spawnNextGround")
        }
    }
    public spawnUnit(amount: number): void {
        // console.log("call spawn unit on PlayerController")
        if (amount < 0) {
            var amountToDestroy = this.playerUnits.length + amount > 0 ? -amount : this.playerUnits.length
            console.log("amount of player unit to destroy", amountToDestroy)
            for (let index = 0; index < amountToDestroy; index++) {

                if (element !== undefined) {
                    var element = this.playerUnits[index];
                    this.playerUnits.splice(index, 1)
                    element.node.destroy()

                }
            }
            return
        }
        for (let i = 0; i < amount; i++) {
            var prefabInstance = instantiate(this.UnitPrefab)
            this.playerUnits.push(prefabInstance.getComponent(PlayerUnitBehaviour));
            this.node.addChild(prefabInstance)
            var position = new Vec3(randomRange(-3.0, 3.0), 0, randomRange(-3.0, 3.0));
            prefabInstance.setPosition(position)
        }

    }
    update(deltaTime: number) {
        this.moveForward(deltaTime)
        // console.log(GameManager.instance)
    }

    moveForward(deltaTime: number) {
        var dir = new Vec3(Vec3.FORWARD).multiplyScalar(this.Speed * deltaTime)
        // this.node.position.add(dir)
        // this.node.setPosition(this.node.position)
        this.node.translate(dir);


    }

    // Private constructor to prevent external instantiation
    // private constructor() {
    //     super();
    // }

    // // Public method to get the singleton instance
    // public static get instance(): PlayerController {
    //     if (!PlayerController._instance) {
    //         PlayerController._instance = new PlayerController();
    //     }
    //     return PlayerController._instance;
    // }

}


