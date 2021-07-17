import Phaser from 'phaser';
import GameScreen from './GameScreen';
import StartScreen from './StartScreen';
import FontManager from './FontManager';
import AlSeana from '../assets/fonts/al-seana.ttf';


function Game(width, height, parentId){
    this.config = {
        type: Phaser.CANVAS,
        parent: parentId,
        width: width,
        height: height,
        mode: Phaser.Scale.CENTER_BOTH,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
    }
    setStyle();
    FontManager.addFont('alSeana', AlSeana);
    this.game = new Phaser.Game(this.config);
    //Aggiungo le due schermate
    this.game.scene.add('startscreen', new StartScreen());
    this.game.scene.add('game', new GameScreen(), true);
    

    function setStyle(){
        let style = document.createElement('style');
        style.innerText = `#${parentId} > *{width:100%;height:100%}`;
        document.head.append(style);
    }
}

export default Game;