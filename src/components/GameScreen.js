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
        this.camera = this.cameras.cameras[0];
        this.physics.world.setBounds(0, 0, this.sys.canvas.height, this.sys.canvas.width);
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = vh(110);
        this.background.fixedToCamera = true;
        makePlatforms();

        this.doodle = this.physics.add.sprite(vw(50), vh(85), 'doodle_rj');
        this.doodle.scaleX = 2.25;
        this.doodle.scaleY = 3;
        this.doodle.setGravityY(5000);
        this.doodle.setBounce(1);
        this.doodle.setDepth(100);
        this.doodle.body.checkCollision.up = false;
        this.doodle.body.checkCollision.left = false;
        this.doodle.body.checkCollision.right = false;
        this.physics.add.collider(this.doodle, this.platforms, jump);
        this.score = 0;
        this.scoreOffset = Math.abs(this.doodle.y-this.sys.canvas.height);
        this.camera.startFollow(this.doodle);
        this.camera.setLerp(0,1);
        
        this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    screen.update = function (){
        //movimenti
        if(this.keyboardArrows.right.isDown){
            right();
        }
        else if(this.keyboardArrows.left.isDown){
            left();
        }

        //calcolo dello score
        this.score = Math.floor(Math.max( this.score, (Math.abs(this.doodle.y-this.sys.canvas.height)-this.scoreOffset)));
        
        //muovo lo sfondo in concomitanza della camera
        this.background.y = this.camera.worldView.y-vh(5);

        //effetto Pacman
        if(this.doodle.x <= 0){
            this.doodle.x = this.sys.canvas.width-(this.doodle.width/2);
        }
        else if(this.doodle.x >= this.sys.canvas.width){
            this.doodle.x = 0+(this.doodle.width/2);
        }

        //check fine partita
        if(this.doodle.y >= this.sys.canvas.height){
            console.log('Hai Perso');
        }

        
        for (let platform of this.platforms.children.entries) {
            if(platform.y >= (this.camera.worldView.y+this.sys.canvas.height+vh(2.5))){
                console.log('Rimuovo');
                this.platforms.remove(platform);
                platform.destroy();
                makePlatform(getRandomInt(vw(10), vw(90)), this.camera.worldView.top-vh(10));
            }   
        }
    }

    var makePlatforms = (function(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.enableBody = true;
        this.platforms.createMultiple(10, 'platform');
        //creo la piattaforma dove partirà il doodle
        makePlatform(vw(50), vh(95))
        //creo le prime 10 piattaforme
        for(let i = 0; i< 9; i++){
            let y = (i !=0) ? vh(85)-(vh(10)*i) : vh(85);
            makePlatform(getRandomInt(vw(10), vw(90)), y)
        }
    }).bind(screen);

    var makePlatform = (function (x, y, width, height){
        var platform = this.platforms.create(x,y, 'platform');
        platform.displayWidth = vw(20);
        platform.displayHeight = vh(5);
        platform.scaleY = 2;
        platform.scaleX = 1.5;
        platform.enableBody = true;
        platform.body.immovable = true;
        platform.body.allowGravity = false;
        this.platforms.add(platform);
    }).bind(screen);

    var jump = (async function(){
        //console.log(this.doodle)
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
        this.doodle.setTexture('doodle_rj');
        this.doodle.body.velocity.x = 1200;
    }).bind(screen);

    var left = (function(){
        this.doodle.setTexture('doodle_lj');
        this.doodle.body.velocity.x = -1200;
    }).bind(screen);
    return screen;
}

export default GameScreen;
