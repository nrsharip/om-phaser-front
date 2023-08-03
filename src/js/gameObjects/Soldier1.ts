import ShooterScene from "../scenes/ShooterScene";

export enum PlayerStates {
  DEAD,
  HURT,
  IDLE,
  SHOT1,
  SHOT2,
}

export default class Soldier1 extends Phaser.Physics.Arcade.Sprite {
  public scene: ShooterScene;

  constructor(scene: ShooterScene, x: number, y: number) {
    super(scene, x, y, "soldier1");

    const animations: Phaser.Types.Animations.Animation[] = [
      { 
        key: "dead",
        frameRate: 12,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [0, 1, 2, 3] }),
      },
      {
        key: "hurt",
        frameRate: 12,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [4, 5, 6] }),
      },
      { 
        key: "idle",
        frameRate: 12,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [7, 8, 9, 10, 11, 12, 13] }),
        repeat: -1, 
      },
      { 
        key: "shot1",
        frameRate: 12,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [14, 15, 16, 17] }),
      },
      { 
        key: "shot2",
        frameRate: 12, 
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [18, 19, 20, 21] }),
      },
    ];

    animations.forEach((animation) => this.scene.anims.create(animation));

    this.scene.add
      .existing(this)
      .setState(PlayerStates.IDLE);

    this.play("idle");

    this.rescheduleShot();

    // добавляем обработчик завершения анимации выстрелов
    // Выстрел 1
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'shot1', () => {
        this.setState(PlayerStates.IDLE);
        this.rescheduleShot();
    });
    // Выстрел 2
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'shot2', () => {
        this.setState(PlayerStates.IDLE);
        this.rescheduleShot();
    });
  }

  public setState(value: PlayerStates) {
    switch (value) {
        case PlayerStates.DEAD:
          this.play("dead");
          break;
  
        case PlayerStates.HURT:
          this.play("hurt");
          break;
  
        case PlayerStates.IDLE:
          this.play("idle");
          break;
  
        case PlayerStates.SHOT1:
          this.play("shot1");
          break;
  
        case PlayerStates.SHOT2:
          this.play("shot2"); // .playAudio("jump")
          break;
    }

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {

    super.preUpdate(time, delta);
  }

  /**
   * Функция переустанавливает событие выстрела между 2 и 5 секундами
   */
  public rescheduleShot() {
    this.scene.time.addEvent({ 
        // задержка между 2 и 5 секундами
        delay: 2000 + 3000 * Math.random(),
        callback: () => { 
            // меняем состояние либо на выстрел 1, либо на выстрел 2
            this.setState(Math.random() < 0.5 ? PlayerStates.SHOT1 : PlayerStates.SHOT2); 
        }, 
        callbackScope: this 
    });
  }

  public setSize(height: number) {
    super.setSize(16, height);

    return this;
  }

  public playAudio(key: string) {
    this.scene.sound.play(key, { volume: 0.5 });

    return this;
  }
}
