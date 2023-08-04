import ShooterScene from "../scenes/ShooterScene";

export enum PlayerStates {
  DEAD,
  HURT,
  IDLE,
  SHOT1,
  SHOT2,
}

export default abstract class Soldier extends Phaser.Physics.Arcade.Sprite {
  public scene: ShooterScene;

  constructor(scene: ShooterScene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.createAnimations();

    this.scene.add
      .existing(this)
      .setState(PlayerStates.IDLE);

    this.play(`${this.texture.key}-idle`);

    this.rescheduleShot();

    // Добавляем обработчики завершения анимаций:
    // Выстрел 1
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + `${this.texture.key}-shot1`, () => {
        this.setState(PlayerStates.IDLE);
    });
    // Выстрел 2
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + `${this.texture.key}-shot2`, () => {
        this.setState(PlayerStates.IDLE);
    });
    // Ранение
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + `${this.texture.key}-hurt`, () => {
        this.setState(PlayerStates.IDLE);
    });
  }

  public abstract createAnimations(): void;

  public setState(value: PlayerStates) {
    switch (value) {
        case PlayerStates.DEAD:
          this.play(`${this.texture.key}-dead`).playAudio(Math.random() < 0.5 ? "death1" : "death2");
          break;
  
        case PlayerStates.HURT:
          this.play(`${this.texture.key}-hurt`);
          break;
  
        case PlayerStates.IDLE:
          this.play(`${this.texture.key}-idle`);
          break;
  
        case PlayerStates.SHOT1:
          this.rescheduleShot();
          this.scene.events.emit("enemy-shot", this.texture.key);

          this.play(`${this.texture.key}-shot1`).playAudio(Math.random() < 0.5 ? "shot1" : "shot2");
          break;
  
        case PlayerStates.SHOT2:
          this.rescheduleShot();
          this.scene.events.emit("enemy-shot", this.texture.key);
  
          this.play(`${this.texture.key}-shot2`).playAudio(Math.random() < 0.5 ? "shot1" : "shot2");
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
