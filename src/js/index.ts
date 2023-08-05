import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import ShooterScene from "./scenes/ShooterScene";
import { createChatDomElements } from "./utils/Chat";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 512,
    height: 192,
    zoom: 2,
    backgroundColor: '#fdfdfd',
    render: {
        pixelArt: true,
        antialias: false,
        antialiasGL: false,
    },
    scene: [LoaderScene, ShooterScene],
};

window.addEventListener("load", () => {
    new Phaser.Game(config);
    createChatDomElements();
});


