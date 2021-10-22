import Ui from './components/Ui';

function component(){
    const element = document.createElement('div');
    element.innerText = 'Webpack Getting Started';
    return element;
}

function Image(src = null){
    this.src = src;
    let el = document.createElement('img');
    el.src = this.src;
    return el;
}


let ui = new Ui();
ui.start();