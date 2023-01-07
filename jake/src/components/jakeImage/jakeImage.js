import jake from '../../../assets/jake.jpg';
import './jakeImage.css'

const AddJake = () => {
    const img = document.createElement('img');
    img.src = jake;
    img.alt = 'Jake'
    img.classList.add('small-image');
    const body = document.querySelector('body');
    body.appendChild(img)
}

export default AddJake