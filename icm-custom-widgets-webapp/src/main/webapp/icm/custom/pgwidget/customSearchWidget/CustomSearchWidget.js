define([ "dojo/_base/declare", 
"dojo/_base/lang",
"dojo/dom-geometry",
"dojo/dom-style",
"dojo/dom-attr",
"dojo/on",
"dojo/query",
"icm/base/BasePageWidget",
"icm/util/SearchPayload",
"icm/custom/pgwidget/customSearchWidget/CustomWidgetContentPaneEventListener",
"icm/custom/pgwidget/customSearchWidget/dijit/CustomWidgetContentPane"], function(declare, lang, domGeom, domStyle, domAttr, on, query, BasePageWidget, SearchPayload, 
eventListener, contentPaneWidget){

    return declare("icm.custom.pgwidget.customSearchWidget.CustomSearchWidget", [contentPaneWidget, BasePageWidget], {

        contentPaneEventListener: null,
        model: null,
        criterion: null,
        /** 
         * 
         */
        postCreate: function(){
            this.inherited(arguments);
            this.contentPaneEventListener = new eventListener(this);
            this.connect(this, "onSearchSubmitted", lang.hitch(this.contentPaneEventListener, "buildPayload"));
            this.showContentNode();
        },

        /**
         * Handler for icm.ClearContent event.
         */
        handleClearContent: function(){
            console.log("handleClearContent");
            this.clearInputValue();
        },    
		
		  handleICM_SearchCasesEvent: function(){
			console.log("begin payload dump!");
			
			console.log("end payload dump!");
		},

        _eoc_: null

    });
});
