import HelloWorldButton from "./components/helloWorldButton/helloWorldButton.js";
import Heading from './components/headings/heading';
import AddJake from './components/jakeImage/jakeImage';

const heading = Heading();
heading.createHeading('This is my heading');
const button = HelloWorldButton();
button.render('Hello World')
