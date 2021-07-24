import { setStyle } from '../utils';
import Sidebar from './Sidebar';
import HighScoreManager from './HighScoreManager';
import Game from './Game';
import Icon from '../assets/img/favicon.png';


function Ui(){

    this.start = function(){
        //Imposto l'icona del sito
        setFavicon()
        //Imposto lo stile del body
        setBodyStyle();
        //Creo la primaSidebar
        const highscoreSidebar = new HighScoreManager();
        //Creo il contenitore del gioco
        const gameContainer = new Sidebar();
        setStyle(gameContainer, {
            backgroundColor: 'white'
        });
        //Creo la seconda sidebar
        gameContainer.setAttribute('id','game');
        const istructions = new Sidebar();
        setStyle(istructions, {
            backgroundColor: 'blue',
            borderLeft: '3px solid green'
        })
        //appendo gli elementi al body
        document.body.append(gameContainer);
        document.body.append(istructions);
        //inizializzo il gioco
        let {width, height} = gameContainer.getBoundingClientRect(); 
        let game = new Game(width.toFixed(), height.toFixed(), 'game');
        game.game.newScore = highscoreSidebar.newScore;
        game.game.updateScore = highscoreSidebar.updateScore;
    }

    function setBodyStyle(){
        let element = document.body;
        setStyle(element, {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 33.3%)',
            margin: '0'
        });
    }

    function setFavicon(){
        let favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        favicon.setAttribute('type', 'image/png');
        favicon.setAttribute('href', Icon);
        document.head.append(favicon);
    }

}

export default Ui;