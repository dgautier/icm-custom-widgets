define([ "dojo/_base/declare",
    "dojo/text!./templates/CustomWidgetContentPane.html",
	"icm/base/_BaseWidget"
	],

	function(declare, template, _BaseWidget){
	return declare("icm.custom.pgwidget.customWidget.dijit.CustomWidgetContentPane", [_BaseWidget], {
    templateString: template,
	widgetsInTemplate: true,


	constructor: function(){

    },

	postCreate:	function(){
		this.inherited(arguments);

	},

	/**
	 * @private destroys this widget
	 */
	destroy: function() {
		//Do any custom clean up here
		this.inherited(arguments);
	}

});
});