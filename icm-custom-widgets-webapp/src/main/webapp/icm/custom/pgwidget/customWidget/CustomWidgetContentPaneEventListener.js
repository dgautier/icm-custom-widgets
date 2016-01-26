define(["dojo/_base/declare",
	"dojo/_base/lang",
	"icm/base/Constants",
	"icm/model/Case",
	"ecm/LoggerMixin"],
	function(declare, lang, Constants, Case, LoggerMixin){
    return declare("icm.custom.pgwidget.customWidget.CustomWidgetContentPaneEventListener", [LoggerMixin], {

	contentPane: null,
	searchTemplate: null,

	// An array of ever selected cases. This is used to refresh the case items when properties are changed.
	caseEditableArray: [],

    constructor: function(contentPane){
        this.contentPane = contentPane;
    },

	displayPayload: function(payload) {
        this.contentPane.displayEvent.innerHTML = payload.eventName;
	},

	initContentPane: function()	{
		this.contentPane.showContentNode();
		var props = 'String property: ' + this.contentPane.widgetProperties['customProperty1'] +'<br> Integer property: '+ this.contentPane.widgetProperties['customProperty2'] +'<br> Boolean property: '+ this.contentPane.widgetProperties['customProperty3'];
		this.contentPane.displayAttributes.innerHTML = props;
	}


});
});
