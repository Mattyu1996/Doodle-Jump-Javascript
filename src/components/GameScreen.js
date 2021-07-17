import { getRandomInt, vWidth, vHeight } from '../utils';
import Background from '../assets/img/background.png';
import Platform from '../assets/img/platform.png';
import Doodle from '../assets/img/doodle.png';

function GameScreen(){
    let screen = new Phaser.Scene('game');
    var vw = vWidth.bind(screen);
    var vh = vHeight.bind(screen);

    screen.preload = function (){
        this.load.image('background', Background);
        this.load.image('platform', Platform);
        this.load.image('doodle', Doodle);
    }

    screen.create = function(){
        this.physics.world.setBounds(0, 0, this.sys.canvas.height, this.sys.canvas.width);
        console.log(this.physics.world.bounds.width)
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        makePlatforms();
    }

    screen.update = function (){
        //...
    }

    var makePlatforms = (function(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.enableBody = true;
        this.platforms.createMultiple(10, 'platform');
        //creo le prime 10 piattaforme
        for(let i = 0; i< 10; i++){
            makePlatform(getRandomInt(vw(10), vw(90)), vh(10)*i, vw(20), vh(5) )
        }
    }).bind(screen);

    var makePlatform = (function (x, y, width, height){
        var platform = this.platforms.create(x,y, 'platform');
        platform.displayWidth = width;
        platform.displayHeight = height;
        platform.scaleY = 2;
        platform.scaleX = 1.5;
        platform.enableBody = true;
        platform.body.immovable = true;
        platform.body.allowGravity = false;
        return platform;
    }).bind(screen);

    return screen;
}

export default GameScreen;
