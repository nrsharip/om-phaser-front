import Soldier1 from "../gameObjects/Soldier1";

export default class ShooterScene extends Phaser.Scene {
  private _npc1: Soldier1;

  constructor() {
    super({ key: "shooter", active: false, visible: false });
  }

  public preload() {
    
  }

  public create() {
    this._npc1 = new Soldier1(this, 64, 128);

    const widthInPixels = 512, heightInPixels = 192;

    this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
  }
}
