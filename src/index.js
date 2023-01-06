import HelloWorldButton from "./components/helloWorldButton/helloWorldButton.js";
import Heading from './components/heading';

const heading = Heading();
heading.createHeading('This is my heading');
const button = HelloWorldButton();
button.render('Hello World')
