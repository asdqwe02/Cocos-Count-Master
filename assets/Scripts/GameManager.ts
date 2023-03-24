import { _decorator, Component, Node, CCFloat, game, Game, director } from 'cc';
import { MultiplyPlateParent } from './MultiplyPlateParent';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager = null

    // @property(PlayerController)
    // playerController: PlayerController = null
    @property(CCFloat)
    spaceBetweenGround: number = 0
    @property(Node)
    grounds: Node[] = []
    private currentGroundIndex: number = 0;
    private lastGroundIndex: number = 0;
    start() {
        // this.playerController.node.on()
        this.currentGroundIndex = 0;
        this.lastGroundIndex = this.grounds.length - 1
        this.node.on("spawnNextGround", this.onSpawnNextGround, this)

        GameManager._instance = this;
    }
    update(deltaTime: number) {

    }
    public onSpawnNextGround() {
        // this.lastGroundIndex++
        var nextGroundPos = this.grounds[this.lastGroundIndex].position.add3f(0, 0, -this.spaceBetweenGround)
        this.grounds[this.currentGroundIndex].position = nextGroundPos
        this.grounds[this.currentGroundIndex].setPosition(nextGroundPos);
        this.grounds[this.currentGroundIndex].getComponentInChildren(MultiplyPlateParent).ChildMultiplyPlates.forEach(element => {
            element.node.emit("resetMultiplyPlate")
        })
        // this.grounds[this.currentGroundIndex].setPosition(this.grounds[this.lastGroundIndex].position.add3f(0, 0, this.spaceBetweenGround))
        this.lastGroundIndex = this.currentGroundIndex;
        this.currentGroundIndex++;
        if (this.currentGroundIndex > this.grounds.length - 1) {
            this.currentGroundIndex = 0;

        }
    }
    // Private constructor to prevent external instantiation
    private constructor() {
        super();
        // GameManager.instance
    }

    // Public method to get the singleton instance
    public static get instance(): GameManager {
        // if (!GameManager._instance) {
        //     GameManager._instance = new GameManager();
        //     director.addPersistRootNode(GameManager.instance.node);
        // }
        // return GameManager._instance;
        return director.getScene().getChildByName("GameManager").getComponent(GameManager);
    }

}


