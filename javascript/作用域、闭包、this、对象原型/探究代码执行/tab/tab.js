window.onload = function() {

    (function() {
        var a, j = 0;

        var ndFather = document.getElementById('gallerya');
        if (!ndFather) {
            return;
        }

        while (a = ndFather.getElementsByTagName('DIV')[j++]) {

            //Error: tab.js:5 Uncaught TypeError: Cannot read property 'getElementsByTagName' of null at window.onload (tab.js:5)
            if (a.className == 'on' || a.className == 'off') {
                a.onclick = function() {
                    var getEls = document.getElementsByTagName('DIV');
                    for (var z = 0; z < getEls.length; z++) {
                        getEls[z].className = getEls[z].className.replace('show', 'hide');
                        getEls[z].className = getEls[z].className.replace('on', 'off');
                    }
                    this.className = 'on';
                    var target = this.getAttribute('title');
                    document.getElementById(target).className = "show";
                }
            }
        }

    })();
    var e, i = 0;
    while (e = document.getElementById('gallery').getElementsByTagName('DIV')[i++]) {
        if (e.className == 'on' || e.className == 'off') {
            e.onclick = function() {
                var getEls = document.getElementsByTagName('DIV');
                for (var z = 0; z < getEls.length; z++) {
                    getEls[z].className = getEls[z].className.replace('show', 'hide');
                    getEls[z].className = getEls[z].className.replace('on', 'off');
                }
                this.className = 'on';
                var target = this.getAttribute('title');
                document.getElementById(target).className = "show";
            }
        }
    }


}
