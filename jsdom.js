var jsdom = require('./node_modules/jsdom');

jsdom.env(
    '<p class="intro"> Welcome to Node in Practie</p>',
    ['http://code.jquery.com/jquery.js'],
    function(errors, window) {
        console.log('Intro:', window.$('.intro').text());
    }
);