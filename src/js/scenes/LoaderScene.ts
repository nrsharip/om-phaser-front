export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.image("tiles", "./assets/images/tiles.png");
    this.load.audio("jump", "./assets/audio/jump.mp3");
    this.load.spritesheet("player", "./assets/images/player.png", { frameWidth: 16, frameHeight: 32 });
    
    this.load.spritesheet("soldier1", "./assets/images/soldier1.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("soldier2", "./assets/images/soldier2.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("soldier3", "./assets/images/soldier3.png", { frameWidth: 128, frameHeight: 128 });
  }

  public create() {
    // this.scene.start("game");
    this.scene.start("shooter");
  }
}
