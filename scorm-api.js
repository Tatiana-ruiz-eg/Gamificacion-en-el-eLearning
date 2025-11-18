// SCORM 1.2 API Wrapper
const scorm = (function() {
    'use strict';

    let api = window.API;
    let isInitialized = false;

    function debug(msg) {
        console.log(`SCORM Wrapper: ${msg}`);
    }

    return {
        init: function() {
            if (api && !isInitialized) {
                const result = api.LMSInitialize("");
                if (String(result) === "true") {
                    isInitialized = true;
                    debug("LMSInitialize successful.");
                } else {
                    debug(`LMSInitialize failed: ${api.LMSGetLastError()} - ${api.LMSGetErrorString(api.LMSGetLastError())}`);
                }
            } else {
                 debug("Initialization failed: API not found or already initialized.");
            }
            return isInitialized;
        },

        finish: function() {
            if (api && isInitialized) {
                api.LMSCommit(""); // Guardar datos antes de terminar
                const result = api.LMSFinish("");
                if (String(result) === "true") {
                    isInitialized = false;
                    debug("LMSFinish successful.");
                } else {
                    debug(`LMSFinish failed: ${api.LMSGetLastError()} - ${api.LMSGetErrorString(api.LMSGetLastError())}`);
                }
            }
        },

        get: function(param) {
            if (api && isInitialized) {
                return api.LMSGetValue(param);
            }
            return null;
        },

        set: function(param, value) {
            if (api && isInitialized) {
                return api.LMSSetValue(param, value);
            }
            return false;
        },
        
        // --- High-level functions ---

        setStatus: function(status) { // 'passed', 'failed', 'completed', 'incomplete', 'browsed', 'not attempted'
            this.set('cmi.core.lesson_status', status);
            this.set('cmi.core.exit', 'suspend'); // Guardar estado para la proxima vez
        },

        setScore: function(raw, min = 0, max = 100) {
            this.set('cmi.core.score.raw', raw);
            this.set('cmi.core.score.min', min);
            this.set('cmi.core.score.max', max);
        }
    };
})();