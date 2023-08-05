import ShooterScene from "../scenes/ShooterScene";
import Soldier from "./Soldier";

export default class Soldier2 extends Soldier {
    public scene: ShooterScene;

    constructor(scene: ShooterScene, x: number, y: number) {
        super(scene, x, y, "soldier2");

        // поворачиваю спрайты в горизонтальной плоскости
        this.flipX = !this.flipX;
    }

    public createAnimations(): void {
        const animations: Phaser.Types.Animations.Animation[] = [
            {
                key: `${this.texture.key}-dead`,
                frameRate: 12,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [0, 1, 2, 3] }),
            },
            {
                key: `${this.texture.key}-hurt`,
                frameRate: 12,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [4, 5, 6] }),
            },
            {
                key: `${this.texture.key}-idle`,
                frameRate: 12,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [7, 8, 9, 10, 11, 12, 13, 14, 15] }),
                repeat: -1,
            },
            {
                key: `${this.texture.key}-shot1`,
                frameRate: 12,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [16, 17, 18, 19] }),
            },
            {
                key: `${this.texture.key}-shot2`,
                frameRate: 12,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [20, 21, 22, 23] }),
            },
        ];

        animations.forEach((animation) => this.scene.anims.create(animation));
    };
}
