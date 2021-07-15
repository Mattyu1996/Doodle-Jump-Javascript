import Background from '../assets/img/background.png';
import Title from '../assets/img/title.png';
import Play from '../assets/img/play.png';
function StartScreen(){
    let screen = new Phaser.Scene('startscreen');
    screen.preload = function (){
        this.load.image('background', Background);
        this.load.image('title', Title);
        this.load.image('play', Play);
    }

    screen.create = function(){
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        const vw = this.sys.canvas.width;
        const vh = this.sys.canvas.height;
        
        let title = this.add.sprite(0.5*vw, 0.1*vh, 'title');
        title.displayWidth = 0.7*vw;
        title.displayHeight = 0.13*vh;

        let playButton = this.add.sprite(0.5*vw, 0.7*vh, 'play');
        playButton.displayHeight = 0.1*vh;
        playButton.displayHeight = playButton.displayHeight*0.55; 
        playButton.displayWidth = 0.5*vw;
        playButton.displayWidth = playButton.displayWidth*0.55;
        //this.add.text(100, 100, 'Doodle jump', {fontFamily: 'alSeana', fill: "green", fontSize: '500px'});
    }

    screen.update = function (){
        //...
    }

    return screen;
}


export default StartScreen;