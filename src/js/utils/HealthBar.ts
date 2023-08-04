
// https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
export default class HealthBar {

    public static readonly EDGE = 2;
    public static readonly WIDTH = 64;
    public static readonly HEIGHT = 8;
    public static readonly TEXT_SIZE = 30;

    private scene: Phaser.Scene;
    private bar: Phaser.GameObjects.Graphics;
    private x: number;
    private y: number;
    public value: number;
    private max: number;
    private p: number;
    // всплывающее сообщение об уроне
    private text?: Phaser.GameObjects.Text;
    private tween?: Phaser.Tweens.Tween;

    constructor (scene: Phaser.Scene, x: number, y: number, max: number) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.scene = scene;

        this.x = x - HealthBar.WIDTH / 2;
        this.y = y - HealthBar.HEIGHT / 2;
        this.max = max;
        this.value = max;
        this.p = (HealthBar.WIDTH - 2 * HealthBar.EDGE) / max;

        this.draw();

        scene.add.existing(this.bar);
    }

    /**
     * Всплывающий текст, показывающий урон.
     * 
     * Пример: https://phaser.io/examples/v3/view/tweens/tween-text-size
     * 
     * @param amount урон, который нужно отобразить
     */
    damageText(amount: number) {
        this.text?.destroy();
        this.text = this.scene.add
            .text(
                this.x + HealthBar.WIDTH / 2, 
                this.y, 
                `-${amount}`, { 
                    fontFamily: 'Arial', 
                    fontSize: HealthBar.TEXT_SIZE, color: 
                    '#00FF00' 
                })
            .setOrigin(0.5, 0.5);

        this.tween?.destroy();
        this.tween = this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 1000,
            yoyo: false,
            onUpdate: (tween) => {
                
                const v = tween.getValue();
                const c = 255 * v;

                this.text.y -= v;
                this.text.setFontSize(HealthBar.TEXT_SIZE - v * HealthBar.TEXT_SIZE);
                this.text.setColor(`rgb(${c}, ${c}, ${c})`);
            }
        });
    }

    decrease (amount: number): boolean {
        this.damageText(amount);

        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw (): void {
        this.bar.clear();

        // BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, HealthBar.WIDTH, HealthBar.HEIGHT);

        // Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(
            this.x + HealthBar.EDGE, 
            this.y + HealthBar.EDGE, 
            HealthBar.WIDTH - 2 * HealthBar.EDGE, 
            HealthBar.HEIGHT - 2 * HealthBar.EDGE
        );

        if (100 * this.value / this.max < 30) {
            this.bar.fillStyle(0xff0000);
        } else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(
            this.x + HealthBar.EDGE, 
            this.y + HealthBar.EDGE, 
            d, 
            HealthBar.HEIGHT - 2 * HealthBar.EDGE
        );
    }

}