import AddJake from "./components/jakeImage/jakeImage";
import Heading from "./components/headings/heading";

const heading = Heading().createHeading("Jake's Page");
AddJake();

//Button loaded dynamically at runtime
import('HelloWorldApp/HelloWorldButton')
.then(HelloWorldButtonModule => {
    const HelloWorldButton = HelloWorldButtonModule.default;
    HelloWorldButton().render("Jake's Button");
});