import { vWidth, vHeight } from '../utils';
import Background from '../assets/img/background.png';
import Retry from '../assets/img/retry.png';
import Platform from '../assets/img/platform.png';
import DoodleStill from '../assets/img/doodle_still.png';
import GameOverTitle from '../assets/img/gameover.png';

function GameOverScreen(){
    let screen = new Phaser.Scene('over');
    var vw = vWidth.bind(screen);
    var vh = vHeight.bind(screen);

    screen.preload = function (){
        this.load.image('background', Background);
        this.load.image('retry', Retry);
        this.load.image('platform', Platform);
        this.load.image('doodle', DoodleStill);
        this.load.image('gameover', GameOverTitle);
    }
    screen.create = function (){
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = vw(100);
        this.background.displayHeight = vh(110);
        this.button = this.add.sprite(vw(35), vh(80), 'retry').setOrigin(0,0);
        this.button.setInteractive();
        this.platform = this.add.sprite(vw(37), vh(60), 'platform').setOrigin(0,0);
        this.platform.scaleX=0.5;
        this.platform.scaleY = 0.5;
        this.doodle = this.add.sprite(vw(38), vh(44.5), 'doodle').setOrigin(0,0);
        this.doodle.scaleX = 2;
        this.doodle.scaleY = 2;
        this.title = this.add.sprite(vw(17), vh(10), 'gameover').setOrigin(0,0);
        this.title.scale = 0.7;
        this.title.scale = 0.7;

        this.button.on('pointerdown', retry);
    }
    screen.update = function (){
        //..
    }

    var retry = (function(pointer){
        console.log(this);
        this.scene.start('game');
    }).bind(screen);

    return screen;
}

export default GameOverScreen;