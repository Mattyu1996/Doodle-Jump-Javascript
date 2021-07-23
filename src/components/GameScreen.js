import { delay, getRandomInt, vWidth, vHeight } from '../utils';
import Background from '../assets/img/background.png';
import Platform from '../assets/img/platform.png';
import PlatformB from '../assets/img/platform-b.png';
import DoodleRJ from '../assets/img/doodle_rj.png';
import DoodleRS from '../assets/img/doodle_rs.png';
import SpringH from '../assets/img/spring_h.png';
import SpringL from '../assets/img/spring_l.png';

function GameScreen(){
    let screen = new Phaser.Scene('game');
    var vw = vWidth.bind(screen);
    var vh = vHeight.bind(screen);

    screen.preload = function (){
        this.load.image('background', Background);
        this.load.image('platform', Platform);
        this.load.image('platform-b', PlatformB);
        this.load.image('doodle_rj', DoodleRJ);
        this.load.image('doodle_rs', DoodleRS);
        this.load.image('springH', SpringH);
        this.load.image('springL', SpringL);
    }

    screen.create = function(){        
        this.scale.scaleMode = 0;
        //Constants
        this.platformWidth = 0;
        this.keyboardArrows = this.input.keyboard.createCursorKeys();
        this.camera = this.cameras.cameras[0];
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.background.displayWidth = vw(100);
        this.background.displayHeight = vh(110);
        this.background.fixedToCamera = true;
        makePlatforms();

        this.center = this.physics.add.sprite(this.camera.centerX, this.camera.centerY);
        this.center.body.allowGravity = false;
        
        this.doodle = this.physics.add.sprite(vw(50), vh(85), 'doodle_rj');
        this.doodle.scaleX = 0.7;
        this.doodle.scaleY = 0.7;
        this.doodle.body.setSize(this.doodle.width, this.doodle.height-50, true);
        this.doodle.setGravityY(vh(70));
        this.doodle.setBounce(1);
        this.doodle.setDepth(100);
        this.doodle.body.checkCollision.up = false;
        this.doodle.body.checkCollision.left = false;
        this.doodle.body.checkCollision.right = false;
        this.physics.add.collider(this.doodle, this.platforms, jump);
        
        this.score = 0;
        this.scoreOffset = Math.abs(this.doodle.y-this.sys.canvas.height);
        this.camera.startFollow(this.center);
        this.camera.setLerp(0,0.03);
        this.physics.add.collider(this.doodle, this.springs, collectSpring);
    }

    screen.update = function (){
        //console.log(this.camera.worldView.top)
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
        if(this.doodle.y < this.center.y){
            this.center.y -= Math.abs(this.doodle.y-this.center.y)+vh(20);
        }

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
            //movimento piattaforme blu
            if(platform.b) platform.body.velocity.x = (platform.right) ? vh(20) : -vh(20);
            if(platform.b && platform.x >= this.physics.world.bounds.right) platform.right = false;
            if(platform.b && platform.x <= this.physics.world.bounds.left+vw(25)) platform.right = true;
            //Distruzione piattaforme
            if(platform.y >= (this.camera.worldView.y+this.sys.canvas.height+vh(2.5))){
                this.platforms.remove(platform);
                platform.destroy();
                makePlatform(computeNewPlatformX(), getLastPlatform().y-vh(13));
            }   
        }
        if(this.springs.children.entries[0] && this.springs.children.entries[0].y >= (this.camera.worldView.y+this.sys.canvas.height+vh(2.5))){
            this.springs.children.entries[0].destroy();
        }
    }

    var makePlatforms = (function(){
        this.platforms = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.springs = this.physics.add.staticGroup();
        this.platforms.enableBody = true;
        this.platforms.createMultiple(10, 'platform');
        //creo la piattaforma dove partirà il doodle
        let plat = makePlatform(vw(50), vh(95));
        this.platformWidth = plat.width;
        //creo le prime 10 piattaforme
        for(let i = 0; i< 9; i++){
            let y = (i !=0) ? vh(85)-(vh(13)*i) : vh(85);
            makePlatform(computeNewPlatformX(), Math.min(getLastPlatform().y,y));
        }
    }).bind(screen);

    var makePlatform = (function (x, y, width, height){
        let platform;
        if(this.score > 15000 && getRandomInt(1, 10) == 3){
            console.log('dentro')
            platform = this.platforms.create(x,y, 'platform-b');
            platform.setOrigin(1.25,1.25);
            platform.scaleY = 0.4;
            platform.scaleX = 0.4;
            platform.enableBody = true;
            platform.body.velocity.x = vh(10);
            platform.b = true;
            console.log(platform)
            this.platforms.add(platform);
        }
        else{
            platform = this.platforms.create(x,y, 'platform');
            platform.setOrigin(1.25,1.25);
            platform.scaleY = 0.4;
            platform.scaleX = 0.4;
            platform.enableBody = true;
            this.platforms.add(platform);
        }

        //Dopo un punteggio di 7000 ogni 7000 punti creo una molla
        if(this.score > 7000 && this.score%7000 < 1000 && this.springs.children.entries.length < 1){
            makeSpring(platform.x, platform.y);
        }
        return platform;
    }).bind(screen);

    var makeSpring = (function (x,y){
        let spring = this.springs.create(x-vw(6), y-vh(1.4), 'springL');
        spring.scaleX = 0.3;
        spring.scaleY = 0.3;
        spring.enableBody = true;
        spring.body.allowGravity = false;
        spring.setOrigin(1.65,1.65);
        spring.body.setSize(spring.displayWidth, spring.displayHeight, true)
        this.springs.add(spring);
    }).bind(screen);

    var jump = (async function(){
        this.doodle.body.velocity.y = -vh(50);
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
        this.doodle.flipX = false;

        this.doodle.body.velocity.x = vw(45);
    }).bind(screen);

    var left = (function(){
        this.doodle.flipX = true;
        
        this.doodle.body.velocity.x = -vw(45);
    }).bind(screen);

    var collectSpring = (async function(){
        let spring = this.springs.children.entries[0];
        spring.setTexture('springH');
        this.doodle.body.velocity.y = -vh(150);
        await delay(100);
        spring.setTexture('springL');
        await delay(100);
        spring.destroy();
    }).bind(screen);

    var getLastPlatform = (function(){
        return Array.from(this.platforms.children.entries).reduce(function(prev,current){
            return (prev.y < current.y) ? prev : current;
        });
    }).bind(screen);

    var computeNewPlatformX = (function(){
        let lastPlatform = Array.from(this.platforms.children.entries).reduce(function(prev,current){
            return (prev.y < current.y) ? prev : current;
        });

        let x = getRandomInt(lastPlatform.x-vw(50), lastPlatform.x+vw(50));
        if(x >= this.physics.world.bounds.right){
            x = (x-this.physics.world.bounds.right);
        }
        if(x <= this.physics.world.bounds.left+(this.platformWidth/2)){
            x = this.physics.world.bounds.right-x;
        }
        return x;
    }).bind(screen);

    return screen;
}

export default GameScreen;
