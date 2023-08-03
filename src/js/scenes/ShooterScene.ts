import Soldier from "../gameObjects/Soldier";
import Soldier1 from "../gameObjects/Soldier1";
import Soldier2 from "../gameObjects/Soldier2";

export default class ShooterScene extends Phaser.Scene {
  private _npc1: Soldier;
  private _npc2: Soldier;

  constructor() {
    super({ key: "shooter", active: false, visible: false });
  }

  public preload() {
    
  }

  public create() {
    this._npc1 = new Soldier1(this, 96, 128);
    this._npc2 = new Soldier2(this, 416, 128);

    const widthInPixels = 512, heightInPixels = 192;

    this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
  }
}
