(function (w) {
    var onReadyCallback = function() {},
        public = {},
        state = {
            picture: false,
            readyCallback: false
        };

    public.clickEmail = function(element) {
        var address = element.getAttribute('data-address'),
            site = element.getAttribute('data-site'),
            href = 'mailto:hello@' + site,
            link = document.createElement('a');
        
        link.href = href;
        link.click();
    };

    public.setState = function(name, value) {
        state[name] = value;

        for (var key in state) {
            if (state.hasOwnProperty(key) && !state[key]) return;
        }

        onReadyCallback();
    };

    public.ready = function(callback) {
        onReadyCallback = callback;

        public.setState('readyCallback', true);
    };

    w.page = public;
})(window);