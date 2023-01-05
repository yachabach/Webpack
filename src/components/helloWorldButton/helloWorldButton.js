const HelloWorldButton = () => {

    let button;
    const render = title => {
        button = document.createElement('button');
        button.textContent = title;
        const body = document.querySelector('body');
        body.appendChild(button) 
    }
    
    const hello = 'Hello world';

    return { render, hello }
};

export default HelloWorldButton;