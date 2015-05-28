(function () {
    "use strict";
    
    var stylecow = require("stylecow");
    
    stylecow
        .loadPlugin('calc')
        .loadPlugin('color')
        .loadPlugin('custom-media')
        .loadPlugin('custom-selector')
        .loadPlugin('extend')
        .loadPlugin('fixes')
        .loadPlugin('flex')
        .loadPlugin('import')
        .loadPlugin('matches')
        .loadPlugin('nested-rules')
        .loadPlugin('prefixes')
        .loadPlugin('rem')
        .loadPlugin('variables')
        .minSupport({
            explorer: 0,
            firefox: 0,
            chrome: 0,
            safari: 0,
            opera: 0,
            android: 0,
            ios: 0
        });

    function convert(code) {
        var css = stylecow.parse(code);
        stylecow.run(css);
        return css.toString();
    }

    function init(domainManager) {
        if (!domainManager.hasDomain("stylecow")) {
            domainManager.registerDomain("stylecow", {major: 0, minor: 1});
        }

        domainManager.registerCommand(
            "stylecow",     // domain name
            "convert",      // command name
            convert,        // command handler function
            false,          // this command is synchronous in Node
            "Convert css code with stylecow",
            [ // parameters
                {
                    name: "code", 
                    type: "string",
                    description: "The code to convert"
                }
            ],
            [// return values
                {
                    name: "css", 
                    type: "string",
                    description: "The code converted"
                }
            ]
        );
    }
    
    exports.init = init;
    
}());