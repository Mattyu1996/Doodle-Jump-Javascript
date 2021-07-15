import Background from '../assets/img/background.png';

function GameScreen(){
    let screen = new Phaser.Scene('game');
    screen.preload = function (){
        this.load.image('background', Background);
    }

    screen.create = function(){
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
    }

    screen.update = function (){
        //...
    }

    return screen;
}

export default GameScreen;
