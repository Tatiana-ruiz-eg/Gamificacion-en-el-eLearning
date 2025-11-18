// SCORM 1.2 API Driver (based on pipwerks)
(function() {
    'use strict';
    
    window.API = null;
    
    function findAPI(win) {
        let findAPITries = 0;
        const maxTries = 500;
        while ((!win.API) && (win.parent) && (win.parent !== win)) {
            findAPITries++;
            if (findAPITries > maxTries) {
                console.error("Error: Se superó el número máximo de intentos para encontrar la API. (SCORM 1.2)");
                return null;
            }
            win = win.parent;
        }
        return win.API;
    }

    function getAPI() {
        let a = null;
        if (window.parent && window.parent !== window) {
            a = findAPI(window.parent);
        }
        if (!a && window.top.opener) {
            a = findAPI(window.top.opener);
        }
        if (a) {
            window.API = a;
        } else {
            console.error("Error: No se pudo localizar la API del LMS. (SCORM 1.2)");
        }
    }

    getAPI();
})();