page.ready(function() {
    document.documentElement.className = 'page-ready';
    
    if (navigator.platform && /Mac/.test(navigator.platform)) {
        document.documentElement.className += ' is-mac';
    }
});