/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var STYLECOW       = "stylecow.run",
        AppInit        = brackets.getModule('utils/AppInit'),
        CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain"),
        stylecow;
    
    //Execute stylecow
    function execute() {
        var editor = EditorManager.getCurrentFullEditor();
        
        //On selection
        if (editor.hasSelection()) {
            var currentSelection = editor.getSelection();
            
            return stylecow.exec("convert", editor.getSelectedText())
                .done(function (code) {
                    editor.document.replaceRange(code, currentSelection.start, currentSelection.end);
                })
                .fail(function (err) {
                    console.error("[brackets-simple-node] failed to run convert", err);
                });
        }
        
        //On entire document
        stylecow.exec("convert", editor.document.getText())
            .done(function (code) {
                editor.document.setText(code);
            })
            .fail(function (err) {
                console.error("[brackets-simple-node] failed to run convert", err);
            });
    }
    
    //Init the extension
    AppInit.appReady(function () {
        //Add commant to menu
        CommandManager.register("Execute stylecow", STYLECOW, execute);
        Menus.getMenu(Menus.AppMenuBar.EDIT_MENU).addMenuItem(STYLECOW);
        
        //Init the node domain
        stylecow = new NodeDomain("stylecow", ExtensionUtils.getModulePath(module, "node/stylecow"));

        //Load stylesheets
        ExtensionUtils.loadStyleSheet(module, "styles/stylecow.css");
    
        // Add toolbar icon 
        $("<a>")
            .attr({
                id: "stylecow-icon",
                href: "#",
                title: "Execute stylecow"
            })
            .on('click', execute)
            .appendTo($("#main-toolbar .buttons"));
    });
});