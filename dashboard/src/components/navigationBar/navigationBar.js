import './navigationBar.css'

const NavigationBar = () => {

    const render = NavItems => {
        const liItems = NavItems.map(item => {
            return `
                <li>
                    <a href="${item.url}">${item.title}</a>
                </li>
            `;
        });
        const ul = document.createElement('ul');
        ul.innerHTML = liItems.join('');
        ul.classList.add('navigation-bar');
        document.querySelector('body').appendChild(ul);
    }
    return {render};
};

export default NavigationBar;