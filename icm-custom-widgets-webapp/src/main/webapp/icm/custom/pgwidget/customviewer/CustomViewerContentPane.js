define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/text!./templates/CustomViewerContentPane.html",
    	"dijit/_Widget",
    	"dijit/_TemplatedMixin",
    	"dijit/_WidgetsInTemplateMixin",
        "dijit/form/Button",
        "dijit/form/CheckBox",
        "icm/pgwidget/viewer/Viewer"],
		 function(declare, lang, template, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, Button, CheckBox, Viewer) {

	/*
	 * This class demonstrates approach that can be taken to build UI of custom widget and embed ICM Viewer widget in that UI.
	 */
	return declare("icm.custom.pgwidget.customviewer.CustomViewerContentPane", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString: template,
		widgetsInTemplate: true,
		mode: "widget",
		viewer: null,

	    MODE_MAP: {
	    	widget: "widget",
	        dialog: "dialog"
	    },

		postCreate: function() {
			this.renderUI();
			this.mode = this.MODE_MAP.widget;
		},

	    renderUI: function() {
	    	/*
	    	 * Pass required parameter to Viewer widget constructor.
	    	 */
	    	this.viewer = new Viewer({
	    		height: "400px" // height in px
	    	});
	    	this.viewer.placeAt(this.viewerWidget);
			var button = new Button({
				label: "Clear UI",
				onClick: lang.hitch(this, this._clearUI)
			});
			button.placeAt(this.clearUIButton);
			this.checkBox = new CheckBox({
				value: "dialog",
				checked: false,
				onChange: lang.hitch(this, this._setMode)
			});
			this.checkBox.placeAt(this.modeCheckBox);
	    },

		isDirty: function() {
			// Implement as required
			return false;
		},

	    _clearUI: function() {
	    	this.handleICM_ClearContentEvent();
	    },

		_setMode: function() {
			var value = this.checkBox.get("value");
			if (value == this.MODE_MAP.dialog) {
				this.mode = this.MODE_MAP.dialog;
			}
			else {
				this.mode = this.MODE_MAP.widget;
			}
		},

		_eoc_: null
	});
});