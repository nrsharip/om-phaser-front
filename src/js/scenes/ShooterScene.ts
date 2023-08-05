import Soldier, { PlayerStates } from "../gameObjects/Soldier";
import Soldier1 from "../gameObjects/Soldier1";
import Soldier2 from "../gameObjects/Soldier2";
import Soldier3 from "../gameObjects/Soldier3";

export default class ShooterScene extends Phaser.Scene {
    private _npc1: Soldier;
    private _npc2: Soldier;

    private textWinner: Phaser.GameObjects.Text | undefined;
    private textButton: Phaser.GameObjects.Text | undefined;
    private button: Phaser.GameObjects.NineSlice | undefined;

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

                this.showInfoAndMenu(win1 ? 1 : 2);
            }
        });
    }

    public showInfoAndMenu(winner: number) {
        this.textWinner?.destroy();
        this.textWinner = this.add.text(134, 15, `Победил персонаж ${winner}`, {
            fontFamily: 'Arial',
            fontSize: 26,
            color: '#000000'
        });

        this.textButton?.destroy();
        this.textButton = this.add.text(226, 72, `Новый бой`, {
            fontFamily: 'Arial',
            fontSize: 11,
            color: '#000000'
        });
        this.textButton.setDepth(1);

        this.button?.destroy();
        this.button = this.add.nineslice(256, 80, 'grey-button-03', 0, 120, 30, 2, 2, 2, 2);
        this.button.setInteractive();

        this.button.on('pointerdown', () => {
            this.button?.destroy();
            this.button = this.add.nineslice(256, 80, 'grey-button-04', 0, 120, 30, 2, 2, 2, 2);
            this.button.setInteractive();

            this.textButton.y += 1;

            this.button.on('pointerup', () => {
                this.textWinner?.destroy();
                this.button?.destroy();
                this.textButton?.destroy();

                // this.scene.restart();
                this._npc1.resetCharacter();
                this._npc2.resetCharacter();
            });
        });
    }
}
