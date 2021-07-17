import { delay, getRandomInt, vWidth, vHeight } from '../utils';
import Background from '../assets/img/background.png';
import Platform from '../assets/img/platform.png';
import DoodleRJ from '../assets/img/doodle_rj.png';
import DoodleRS from '../assets/img/doodle_rs.png';
import DoodleLJ from '../assets/img/doodle_lj.png';
import DoodleLS from '../assets/img/doodle_ls.png';

function GameScreen(){
    let screen = new Phaser.Scene('game');
    var vw = vWidth.bind(screen);
    var vh = vHeight.bind(screen);

    screen.preload = function (){
        this.load.image('background', Background);
        this.load.image('platform', Platform);
        this.load.image('doodle_rj', DoodleRJ);
        this.load.image('doodle_rs', DoodleRS);
        this.load.image('doodle_lj', DoodleLJ);
        this.load.image('doodle_ls', DoodleLS);
    }

    screen.create = function(){
        this.physics.world.setBounds(0, 0, this.sys.canvas.height, this.sys.canvas.width);
        console.log(this.physics.world.bounds.width)
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        makePlatforms();

        this.doodle = this.physics.add.sprite(vw(50), vh(85), 'doodle_rj');
        this.doodle.scaleX = 2.25;
        this.doodle.scaleY = 3;
        this.doodle.setGravityY(5000);
        this.doodle.setBounce(1);
        this.doodle.body.checkCollision.up = false;
        this.doodle.body.checkCollision.left = false;
        this.doodle.body.checkCollision.right = false;
        this.physics.add.collider(this.doodle, this.platforms, jump);

        this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    screen.update = function (){
        if(this.keyboardArrows.right.isDown){
            right();
        }
        else if(this.keyboardArrows.left.isDown){
            left();
        }
    }

    var makePlatforms = (function(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.enableBody = true;
        this.platforms.createMultiple(10, 'platform');
        //creo la piattaforma dove partità il doodle
        makePlatform(vw(50), vh(95), vw(20), vh(5))
        //creo le prime 10 piattaforme
        for(let i = 0; i< 9; i++){
            let y = (i !=0) ? vh(85)-(vh(10)*i) : vh(85);
            makePlatform(getRandomInt(vw(10), vw(90)), y, vw(20), vh(5) )
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

    var jump = (async function(){
        this.doodle.body.velocity.y = -4000;
        if(this.doodle.texture.key == 'doodle_rj'){
            this.doodle.setTexture('doodle_rs');
            await delay(100);
            this.doodle.setTexture('doodle_rj');
        }
        else if(this.doodle.texture.key == 'doodle_lj'){
            this.doodle.setTexture('doodle_ls');
            await delay(100);
            this.doodle.setTexture('doodle_lj');
        }        
    }).bind(screen);


    var right = (function(){
        console.log('destra');
        this.doodle.setTexture('doodle_rj');
        this.doodle.body.velocity.x = 1000;
    }).bind(screen);

    var left = (function(){
        console.log('sinistra');
        this.doodle.setTexture('doodle_lj');
        this.doodle.body.velocity.x = -1000;
    }).bind(screen);
    return screen;
}

export default GameScreen;
