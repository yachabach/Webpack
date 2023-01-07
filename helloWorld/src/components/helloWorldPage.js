import HelloWorldButton from "./helloWorldButton/helloWorldButton";
import Heading from './headings/heading';

const HelloWorldPage = () => {
    const render = () => {
        const heading = Heading();
        heading.createHeading('This is my heading');
        const button = HelloWorldButton();
        button.render('Hello World');        
    }
    return { render }
};

export default HelloWorldPage;

