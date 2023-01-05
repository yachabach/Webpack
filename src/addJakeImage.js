import jake from '../assets/jake.jpg';

const addJake = () => {
    const img = document.createElement('img');
    img.alt='Jake';
    img.width=300;
    img.src=jake;
    const body = document.querySelector('body');
    body.appendChild(img)
}

export default addJake;