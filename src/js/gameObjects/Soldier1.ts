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
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: ShooterScene, x: number, y: number) {
    super(scene, x, y, "soldier1");

    const animations: Phaser.Types.Animations.Animation[] = [
      { 
        key: "dead",
        frameRate: 12,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [0, 1, 2, 3] }),
        repeat: -1,
      },
      {
        key: "hurt",
        frameRate: 12,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [4, 5, 6] }),
        repeat: -1,
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
        repeat: -1,
      },
      { 
        key: "shot2",
        frameRate: 12, 
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [18, 19, 20, 21] }),
        repeat: -1,
      },
    ];

    animations.forEach((animation) => this.scene.anims.create(animation));

    this.scene.add
      .existing(this)
      .setState(PlayerStates.IDLE);

    this.play("shot2");
  }

  public setState(value: PlayerStates) {


    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {

    super.preUpdate(time, delta);
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
