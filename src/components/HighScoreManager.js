import {setStyle} from '../utils';
import Background from '../assets/img/background.png';
import CurrentScoreBackground from '../assets/img/CurrentScoreBackground.png';

function HighScoreManager(){
    let element = document.createElement('aside');
    setStyle(element, {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundImage: 'url('+Background+')',
        borderRight: '3px solid green'
    });

    let currentScoreContainer = document.createElement('div');
    setStyle(currentScoreContainer,{
        display: 'flex',
        backgroundImage: 'url('+CurrentScoreBackground+')',
        backgroundSize: 'contain',
        fontFamily: 'alSeana',
        fontSize: '40px',
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
    });
    let span = document.createElement('span');
    span.innerText = 'Current Score';
    let scoreElement = document.createElement('p');
    this.score = scoreElement;
    setStyle(scoreElement, {
        margin: '0'
    });
    scoreElement.innerText = 0;
    currentScoreContainer.append(span);
    currentScoreContainer.append(scoreElement);

    element.append(currentScoreContainer);

    this.updateScore = (function(score){
        this.score.innerText = score;
    }).bind(this); 
    
    this.newScore = (function (score){
        console.log('dentro', score);
        let container = document.createElement('div');
        setStyle(container, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'alSeana',
            fontSize: '40px',
            fontWeight: '600',
            marginTop: '10px',
            marginBottom: '10px',
            padding: '10px'
        });
        let span = document.createElement('span');
        span.innerText = 'PlayerName';
        let scoreElement = document.createElement('p');

        setStyle(scoreElement, {
            margin: '0'
        });
        scoreElement.innerText = score;
        container.append(span);
        container.append(scoreElement);
        element.append(container);
    }).bind(this);

    document.body.append(element)
}
export default HighScoreManager;