import Soldier1 from "../gameObjects/Soldier1";

export default class ShooterScene extends Phaser.Scene {
  private _player: Soldier1;

  constructor() {
    super({ key: "shooter", active: false, visible: false });
  }

  public preload() {
    
  }

  public create() {
    this._player = new Soldier1(this, 32, 64);

    const widthInPixels = 512, heightInPixels = 128;

    this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
  }

  public get player() {
    return this._player;
  }
}
