import AddJake from "./jakeImage/jakeImage";
import Heading from "./headings/heading";

const JakePage = () => {
    const render = () => {
        Heading().createHeading("Jake's Page");
        AddJake();        
    }
    return { render };
}

export default JakePage

