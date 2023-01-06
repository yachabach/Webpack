import './heading.css'

const Heading = () => {

    const Title = '';

    const createHeading = (title) => {
        const h1 = document.createElement('h1');
        h1.innerHTML = title;
        h1.classList.add('heading');
        const body = document.querySelector('body');
        body.appendChild(h1);
    };
    return { createHeading };
};

export default Heading;