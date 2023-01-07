console.log('dashboard is running');

const url = window.location.pathname;

console.log('url is: ', url)
if (url === '/hello-world-page') {
    import('HelloWorldApp/HelloWorldPage')
    .then(HelloWorldModule => {
        const HelloWorldPage = HelloWorldModule.default;
        HelloWorldPage().render();
    });    
} else if (url === '/jake-page') {
    import('JakeApp/JakePage')
    .then(JakeAppModule => {
        const JakePage = JakeAppModule.default;
        JakePage().render();
    });    
}




