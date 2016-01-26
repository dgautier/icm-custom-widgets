define([ "dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-geometry",
	"dojo/dom-style",
	"icm/base/BasePageWidget",
	"dojo/text!./templates/CustomScriptAdapterContentPane.html",
	"icm/pgwidget/scriptadapter/ScriptAdapter"], function(declare, lang, domGeom, domStyle, BasePageWidget,
		template, ScriptAdapter){

    return declare("icm.custom.pgwidget.customScriptAdapter.CustomScriptAdapter", [ScriptAdapter], {

    	widgetsInTemplate: true,
        templateString: template,
    	/**
		 *
		 */
		postCreate: function(){
			this.inherited(arguments);
			this.scriptPaneView.value = this.widgetProperties.payload;

		},		

		/**
		 * Handler for icm.Custom event.
		 *
		 * @param payload
		 *        	paylod of the event
		 */
		handleICM_ReceiveEvent: function(payload){
			if (this.getParent() && this.getParent()["class"] =="icmWidgetContainerHidden"){
					; //Perf defect 60611 Do nothing, since it is hidden widget.
				}else{
					this.scriptEventNotReceived.style.display = "none";
					this.scriptEventReceived.style.display = "block";
				}
				if (payload){
					this.sourceEventName.innerHTML = payload.eventName;
					this.sourceEventType.innerHTML = payload.eventType;
				}
				
				//SA has large leak here in output payload for caseeditable object or other objects on IE8, and also result in performance issue on IE8 in parsing object
				//current solution is not output if it's under IE8 and hidden widget.
				//and only console output by console.dir which is not available for IE8
				if (console.dir){
					console.dir(payload);
				}
				if (this.getParent() && this.getParent()["class"] =="icmWidgetContainerHidden"){
						; //Do nothing to avoid performance issue in parsing large object to json string.
						  //Especial for IE8.
				}else{
						this._displayData(payload, "source");
				} 
				
				
				
//				this.setScriptVisible(true);

				
				var scriptText = this.scriptPaneView.value;
				try {
					this.setupRunner(scriptText.replace(/#_##/g, ""));
				} catch (e) {
					result = e.message;
				}

				try{
					var newPayload = this.theRunner(payload);
					var event = new Array();
					event["name"] = "icm.SendEventPayload";
					event["type"] = "published";
					event["payload"] = newPayload;
					this.setSentEvent(event);
				}
				catch (ex) {
					var newPayload = this.resourceBundle.CAN_NOT_INTERPRET_EVENT;
					errorEncountered = true;
				}
		},



	});
});