import Phaser from 'phaser';
import Background from '../assets/img/background.png';

function Game(width, height, parentId){
    console.log(width, height)
    this.config = {
        type: Phaser.AUTO,
        parent: parentId,
        width: width,
        height: height,
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
    }
    addCssStyle();
    this.game = new Phaser.Game(this.config);
    

    function preload ()
    {
        this.load.image('background', Background);
    }

    function create ()
    {
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
    }

    function update ()
    {
        //...
    }

    function addCssStyle(){
        let style = document.createElement('style');
        style.innerText = `#${parentId} > *{width:100%;height:100%}`;
        document.head.append(style);
    }
}

export default Game;