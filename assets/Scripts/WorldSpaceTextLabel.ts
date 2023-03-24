import { _decorator, Component, Node, Label, Billboard, v2, Vec2, Vec3, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WorldSpaceTextLabel')
export class WorldSpaceTextLabel extends Component {
    @property(Node)
    myNode: Node = null;
    @property(Node)
    label: Label = null;
    @property(Camera)
    camera: Camera = null
    onLoad() {
        camera
    }
}


