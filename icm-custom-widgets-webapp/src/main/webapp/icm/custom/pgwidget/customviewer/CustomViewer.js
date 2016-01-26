define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom-construct",
        "idx/widget/Dialog",
        "icm/pgwidget/viewer/Viewer",
        "icm/custom/pgwidget/customviewer/CustomViewerContentPane"],
        function(declare, lang, domConstruct, Dialog, Viewer, CustomViewerContentPane){

	/*
	 * This class demonstrates approaches that can be taken to embed Viewer widget into other page widget
	 * or into modal dialog.
	 */
	return declare("icm.custom.pgwidget.customviewer.CustomViewer", [CustomViewerContentPane], {

		/*
		 * Must declare this variable so that Open action could recognize this widget as implementation of viewer.
		 * If this variable is not declare documents would be always open in ICN Content Viewer instead.
		 */
		isViewer: true,

		handleICM_OpenDocumentEvent: function(payload) {
			if (this.mode == this.MODE_MAP.widget) {
				if (this.viewer) {
					this.viewer.handleICM_OpenDocumentEvent(payload);
				}
				else {
					console.info("Custom Viewer Widget: cannot instantiate Viewer widget");
				}
			}
			else {
				this._showDocumentInDialog(payload);
			}
		},

		handleICM_ClearContentEvent: function() {
			if (this.viewer) {
				this.viewer.handleICM_ClearContentEvent();
			}
		},

		handleICM_PageClosingEvent: function() {
			if (this.viewer) {
				this.viewer.destroy();
			}
		},

		_showDocumentInDialog: function(payload) {
			/*
			 * Use separate instance of viewer and don't "steal" instance of viewer embedded in page widget.
			 * Pass required parameter to Viewer widget constructor.
			 */
	    	this.dialogViewer = new Viewer({
	    		height: "400px" // height in px
	    	});
			if (!this.viewerModalDialog) {

				this.viewerModalDialog = new Dialog({
					title: "Viewer Dialog", // or replace it with document title
					instruction: "", // anything,
					content: "&nbsp;",
					closeButtonLabel: "Close",
					style: "width: 640px; height: 600px;",
					onCancel: lang.hitch (this, function() {
						if (this.dialogViewer) {
							this.dialogViewer.reset();
						}
					})
				}, domConstruct.create("div", {}, document.body));
			}
			this.viewerModalDialog.show();
			this.dialogViewer.build(this.viewerModalDialog.containerNode);
			this.dialogViewer.handleICM_OpenDocumentEvent(payload);
		},

	    _eoc_: null
	});
});