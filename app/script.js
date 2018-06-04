window._page = {

    email: function(element) {
        var address = element.getAttribute('data-address'),
            site = element.getAttribute('data-site'),
            href = 'mailto:' + address + '@' + site,
            link = document.createElement('a');
        
        link.href = href;
        link.click();
    }

};