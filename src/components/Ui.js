import { setStyle } from '../utils';
import Sidebar from './Sidebar';
import HighScoreManager from './HighScoreManager';
import Game from './Game';
import Icon from '../assets/img/favicon.png';
import SidebarImage from '../assets/img/sidebarImage.png';


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
        gameContainer.setAttribute('id','game');
        //Creo la seconda sidebar
        const istructionsSidebar = new Sidebar();
        setStyle(istructionsSidebar, {
            borderLeft: '3px solid green',
            alignItems: 'center'
        })
        appendIstructions(istructionsSidebar);
        //appendo gli elementi al body
        document.body.append(gameContainer);
        document.body.append(istructionsSidebar);
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

    function appendIstructions(e){
        let title = document.createElement('h1');
        setStyle(title, {
            color: 'green',
            textAlign: 'center',
            fontFamily: 'alSeana',
            fontSize: '3rem'
        });
        title.innerText = 'How to play';
        e.append(title);

        let pStyle =  {
            textAlign: 'center',
            fontFamily: 'alSeana',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '2rem'
        };

        let p = document.createElement('p');
        setStyle(p, pStyle);
        p.innerHTML ='Just press <kbd>←</kbd> and <kbd>→</kbd> to move your doodle';
        e.append(p);

        p = document.createElement('p');
        setStyle(p, pStyle);
        p.innerHTML ='And try not to fall!';
        e.append(p);

        let image = document.createElement('img');
        image.setAttribute('src', SidebarImage);
        setStyle(image, {
            width: '70%'
        })
        e.append(image)
    }

}

export default Ui;