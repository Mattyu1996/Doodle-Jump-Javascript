import Phaser from 'phaser';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import FontManager from './FontManager';
import AlSeana from '../assets/fonts/al-seana.ttf';


function Game(width, height, parentId){
    this.config = {
        type: Phaser.CANVAS,
        parent: parentId,
        scale: {
            parent: parentId,
            mode: Phaser.Scale.CENTER_BOTH,
            width: 1000,
            height: 1520,
        },
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
    
    this.game.scene.add('startscreen', new StartScreen(), true);
    this.game.scene.add('over', new GameOverScreen());
    this.game.scene.add('game', new GameScreen());
    
    
    

    function setStyle(){
        let style = document.createElement('style');
        style.innerText = `#${parentId} > *{width:100%;height:100%}`;
        document.head.append(style);
    }
}

export default Game;