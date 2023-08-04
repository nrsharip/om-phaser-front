import Soldier, { PlayerStates } from "../gameObjects/Soldier";
import Soldier1 from "../gameObjects/Soldier1";
import Soldier2 from "../gameObjects/Soldier2";
import Soldier3 from "../gameObjects/Soldier3";

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

    // Обработка выстрела противника
    this.events.on("enemy-shot", (key: string) => {
        if (key === this._npc1.texture.key) {
            this._npc2.setState(PlayerStates.HURT);
        } else if (key === this._npc2.texture.key) {
            this._npc1.setState(PlayerStates.HURT);
        }

        let win1 = !this._npc2.hp.value;
        let win2 = !this._npc1.hp.value;

        if (win1 || win2) {
            this.time.clearPendingEvents();
            this.time.removeAllEvents();
        }
    });
  }
}
