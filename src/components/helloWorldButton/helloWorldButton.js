import './helloWorldButton.css'

const HelloWorldButton = () => {

    let button;
    const render = title => {
        button = document.createElement('button');
        button.textContent = title;
        button.classList.add('hello-world-button')
        const body = document.querySelector('body');
        body.appendChild(button) 
        button.onclick = () => {
            console.log('button was clicked');
            const p = document.createElement('p');
            p.classList.add('hello-world-p')
            p.innerHTML = "Hello World Button Clicked";
            body.appendChild(p);
        }
    }
    
    const hello = 'Hello world';

    return { render, hello }
};

export default HelloWorldButton;