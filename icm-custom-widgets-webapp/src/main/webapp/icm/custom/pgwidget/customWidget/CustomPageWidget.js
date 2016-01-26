define([ "dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-geometry",
	"dojo/dom-style",
	"icm/base/BasePageWidget",
	"icm/custom/pgwidget/customWidget/CustomWidgetContentPaneEventListener",
	"icm/custom/pgwidget/customWidget/dijit/CustomWidgetContentPane",
	"icm/widget/menu/MenuManager",
	"icm/widget/menu/Toolbar",
	"icm/widget/menu/ContextualMenu",
	"icm/base/BaseActionContext"], function(declare, lang, domGeom, domStyle, BasePageWidget,
		eventListener, contentPaneWidget, MenuManager, toolBar, ContextualMenu, BaseActionContext){

    return declare("icm.custom.pgwidget.customWidget.CustomPageWidget", [contentPaneWidget, BasePageWidget, BaseActionContext], {

    	contentPaneEventListener: null,
    	topToolbar: null,
    	menu: null,

		/**
		 *
		 */
		postCreate: function(){
			this.inherited(arguments);
			this.contentPaneEventListener = new eventListener(this);
			this.contentPaneEventListener.initContentPane();
			
			//set your context defined for CustomContext so that action can get it for running as required;
			this.setActionContext("CustomContext", {customProperty: true});
			
			
			
			 if (!this.topToolbar)
             {
                 this.topToolbar = new toolBar({
             	    dojoAttachPoint: "customToolbar" //consistent to the id value of the toolbar's definition in the page widget definition json file;
                 });
				  //set the toolbar as a content of the page widget in order to get the action configuration from page widget		
                 this.wrapTopToolbar.set("content", this.topToolbar.domNode);

                 // activate menu
                 this.topToolbar.startup();
             }
			 
			 if (!this.menu)
             {
                 this.menu = new ContextualMenu({
             	    dojoAttachPoint: "customContextualMenu" //consistent to the id value of the contextualMenu's definition in the page widget definition json file;
                 });
				 
				 //append the menu in the page widget in order to get the action configuration from page widget		 
				this.contextualMenuStore.appendChild(this.menu.domNode); 
				 
				 //set the target reference of the contextualMenu so that it can bound to the target point;
				MenuManager.setTargetReference(this.menu, "contextualMenuTargetRefPoint");
				//set your context defined for CustomContext so that action configured in contextualMenu can get it for running as required;
			    //That is another way to set the action context. If the target is grid, the following method could be called automatically;
			    MenuManager.setSelectedItems(this.id, "contextualMenuTargetRefPoint", [{customProperty: true}], "CustomContext");

                 // activate menu
                 this.menu.startup();
             }

		},



		/**
		 * Handler for icm.Custom event.
		 *
		 * @param payload
		 *        	paylod of the event
		 */
		handleICM_CustomEvent: function(payload){
			if(!payload){
				return;
			}
			this.logInfo("handleSearchCasesEvent", payload);
			this.contentPaneEventListener.displayPayload(payload);
		},



	});
});