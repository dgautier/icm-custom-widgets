define(["dojo/_base/declare",
		"dojo/_base/array",
        "icm/pgwidget/caseinfo/CaseInfo",
        "icm/custom/pgwidget/customcaseinfo/CaseInfoCommentsContentPane",
        "icm/util/Dom"],
        function(declare,array,CaseInfo,CaseInfoCommentsContentPane,Dom){

	return declare("icm.custom.pgwidget.customcaseinfo.CustomCaseInfo", [CaseInfo], {

		postCreate: function() {
			this.inherited(arguments);

			//Load custom CSS
			var customCSSFile =
				"/ICMCustomWidgets/icm/custom/pgwidget/customcaseinfo/themes/CaseInfoComments.css";
			Dom.loadCSS(customCSSFile);

			//Create the tab dijit
			var commentPane = new CaseInfoCommentsContentPane({
				title: "Comments",               //Tab title
				description:"A sample widget",   //Tab description, shown when CaseInfo is initialized.
				definitionId: "Comments",        //Tab ID.
				resourceBundle: this.resourceBundle,//Resource bundle for the dijit. Could be custom resource bundle.
				context: this                    //The custom CaseInfo instance

			});
			this.addChild(commentPane);  //Add the new tab.
		},

		handleICM_SendWorkItemEvent: function(payload){
			this.inherited(arguments);
			array.forEach(this.getChildWidgets(), function(widget){
				widget.setActionContext("WorkItem", payload.workItemEditable);
			});
		},

	    _eoc_: null
	});
});