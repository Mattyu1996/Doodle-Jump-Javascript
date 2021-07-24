import {setStyle} from '../utils';
import Background from '../assets/img/background.png';

function Sidebar(){
    let element = document.createElement('aside');
    setStyle(element, {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundImage: 'url('+Background+')',
        overflowY: 'hidden'
    });

    return element;
}

export default Sidebar;