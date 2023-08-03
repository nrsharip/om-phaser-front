import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";
import ShooterScene from "./scenes/ShooterScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 512,
  height: 192,
  zoom: 2,
  backgroundColor: '#fdfdfd',
  input: {
    keyboard: true,
    gamepad: true,
  },
  render: {
    pixelArt: true,
    antialias: false,
    antialiasGL: false,
  },
//   physics: {
//     default: "arcade",
//     arcade: {
//       debug: false,
//       gravity: {
//         y: 100,
//       },
//     },
//   },
  scene: [LoaderScene, GameScene, ShooterScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
