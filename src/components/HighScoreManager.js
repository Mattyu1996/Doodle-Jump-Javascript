import {setStyle, setAttributes} from '../utils';
import Background from '../assets/img/background.png';
import CurrentScoreBackground from '../assets/img/CurrentScoreBackground.png';

function HighScoreManager(){
    let sidebar = document.createElement('aside');
    setStyle(sidebar, {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundImage: 'url('+Background+')',
        borderRight: '3px solid green',
        overflowY: 'auto'
    });

    

    sidebar.append(makeCurrentScoreContainer.call(this));

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

        container.addEventListener('click', openForm)

        container.append(span);
        container.append(scoreElement);
        sidebar.append(container);
        sortScores();
    }).bind(this);


    function makeCurrentScoreContainer(){
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

        return currentScoreContainer;
    }

    function openForm(event){
        console.log(event.target.tagName);
        if(event.target.tagName != 'INPUT'){
            console.log('dentro')
            let el = (event.target.tagName == 'DIV') ? event.target : event.target.parentElement;
            let span = el.children[0];
            span.style.display = 'none';
            let form = document.createElement('form');
            form.addEventListener('submit', (e)=>{
                e.preventDefault();
                span.innerText = input.value;
                span.style.display = 'initial';
                form.remove();
            });

            let input = document.createElement('input');
            setAttributes(input, {
                type: 'text',
                placeholder: 'PlayerName'
            });
            setStyle(input, {
                height: '100%',
                fontFamily: 'alSeana',
                fontSize: '35px',
                fontWeight: '600',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '2px solid green',
            });
            input.value = span.innerText;
            let sheet = document.styleSheets[0];
            sheet.insertRule(
                `input:focus-visible{
                    outline: none;
                }`, 
                sheet.cssRules.length);
            form.append(input);
            el.prepend(form)

        }
    }

    function sortScores(){
        let [currentScoreEl, ...scoresEl] = sidebar.children;
        console.log(scoresEl.map(e => e.innerHTML));
        let sorted = scoresEl.sort(scoreCompare);
        console.log(sorted.map(e => e.innerHTML));
        if(scoresEl.length >= 2){
            for(let i = 0; i < scoresEl.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            }
        }
    }

    function scoreCompare(a ,b){
        return(Number(a.lastChild.innerText) > Number(b.lastChild.innerText)) ? -1 : (Number(a.lastChild.innerText) < Number(b.lastChild.innerText)) ? 1 : 0;
    }

    document.body.append(sidebar)
}
export default HighScoreManager;