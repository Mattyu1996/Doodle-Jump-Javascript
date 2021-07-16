import { delay, vWidth, vHeight } from '../utils';
import Background from '../assets/img/background.png';
import Title from '../assets/img/title.png';
import Play from '../assets/img/play.png';
import Ufo from '../assets/img/ufo.png';
import UfoLight from '../assets/img/ufo-light.png';
import DoodleStill from '../assets/img/doodle_still.png';
import DoodleJumping from '../assets/img/doodle_jumping.png';

function StartScreen(){
    let screen = new Phaser.Scene('startscreen');
    var vw = vWidth.bind(screen);
    var vh = vHeight.bind(screen);

    screen.preload = function (){
        this.load.image('background', Background);
        this.load.image('title', Title);
        this.load.image('play', Play);
        this.load.image('ufo-light', UfoLight);
        this.load.image('ufo', Ufo);
        this.load.image('doodle_still', DoodleStill);
        this.load.image('doodle_jumping', DoodleJumping);
    }

    screen.create = function (){
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        
        let title = this.add.sprite(vw(50), vh(10), 'title');
        title.displayWidth = vw(70);
        title.displayHeight = vh(13);

        let playButton = this.physics.add.sprite(vw(50), vh(90), 'play');
        playButton.displayHeight = vh(10);
        playButton.displayHeight = playButton.displayHeight*0.7; 
        playButton.displayWidth = vw(50);
        playButton.displayWidth = playButton.displayWidth*0.7;
        playButton.setImmovable(true);
        playButton.body.allowGravity = false;
        playButton.setInteractive();
        playButton.on('pointerdown', (pointer)=>{
            this.scene.start('game');
        })

        this.ufo = this.add.sprite(vw(50), vh(40), 'ufo-light');
        this.ufo.displayHeight = vh(40);
        this.ufo.displayWidth = vw(40);
        ufoFlash();

        this.doodle = this.physics.add.sprite(vw(50), vh(50), 'doodle_jumping');
        this.doodle.displayHeight = vh(20);
        this.doodle.displayWidth = vw(25);
        this.doodle.setGravityY(3000);
        this.doodle.setBounce(1);
        this.physics.add.collider(this.doodle, playButton, jump);

        //this.add.text(100, 100, 'Doodle jump', {fontFamily: 'alSeana', fill: "green", fontSize: '500px'});
    }

    screen.update = function(){
        //...        
    }

     var ufoFlash = (function(){
        setInterval(async ()=>{
                this.ufo.setTexture('ufo');
                await delay(80);
                this.ufo.setTexture('ufo-light');
                await delay(80);
                this.ufo.setTexture('ufo');
                await delay(80);
                this.ufo.setTexture('ufo-light');
                await delay(80);
                this.ufo.setTexture('ufo');
                await delay(80);
                this.ufo.setTexture('ufo-light');
        }, 5000);
    }).bind(screen);

    var jump = (async function(){
        this.doodle.setTexture('doodle_still');
        await delay(100);
        this.doodle.setTexture('doodle_jumping');
    }).bind(screen);
    

    return screen;
}



export default StartScreen;