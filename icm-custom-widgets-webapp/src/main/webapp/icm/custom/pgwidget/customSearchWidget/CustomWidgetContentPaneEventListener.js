define(["dojo/_base/declare", 
"dojo/_base/lang",
"dojo/_base/array",
"icm/base/Constants",
"icm/model/Case",	
"ecm/LoggerMixin"], 
function(declare, lang, array, Constants, Case, LoggerMixin){
    return declare("icm.custom.pgwidget.customSearchWidget.CustomWidgetContentPaneEventListener", [LoggerMixin], {

        searchTemplate: null,
        widget: null,

        constructor: function(widget){
            this.widget = widget;
        },

        displayPayload: function(payload) {
            var values = [];
            var text = JSON.stringify(payload, function(key, value){
                if(value && typeof value === 'object' ) {
                    if(array.indexOf(values, value) != -1) {
                        return;
                    } 
                    else {
                        values.push(value);
                    }
                }
                return value || undefined;
            }, '<br>');

            this.widget.displayTextContent(text);
        },

        buildPayload: function(values) {
            if(!values) {
                console.log("An invalid values is received!");
                return;
            }

            var searchPayload = new icm.util.SearchPayload();
            var solution = this.widget.solution;
            var params = {};
            params.ObjectStore = solution.getTargetOS().id;

            params.ceQuery = "SELECT t.[FolderName], t.[LastModifier], t.[DateLastModified], t.[CmAcmCaseTypeFolder], t.[CmAcmCaseState], t.[CmAcmCaseIdentifier], t.[DateCreated], t.[Creator], t.[Id], t.[ContainerType], t.[LockToken], t.[LockTimeout],  t.[ClassDescription], t.[DateLastModified], t.[FolderName] FROM [CmAcmCaseFolder] t where ";
            params.ceQuery += "t.[CmAcmCaseIdentifier] LIKE '%%' AND ";

            for(var key in values) {
                var attr = values[key].attr;
                if(attr.dataType === "xs:string") {
                    params.ceQuery += "t.[" + key + "] LIKE '%" + values[key].value + "%' AND ";
                } else {
                    params.ceQuery += "t.[" + key + "] = " + values[key].value + " AND ";
                }
            }

            params.ceQuery = params.ceQuery.substring(0, params.ceQuery.length - 4);

            var that = this;
            this.widget.solution.retrieveCaseTypes(function(types) {
                console.log(params.ceQuery);
                params.caseType = types && types.length > 0 && types[0].name; // default to the first case type
                params.solution = solution;

searchPayload.setModel(params);
var payload = searchPayload.getSearchPayload(function(payload) {
                	that.widget.onBroadcastEvent("icm.SearchCases", payload); 
                	console.log(payload);
					that.displayPayload(payload);
	     });
//
            });
        },

        _eoc_: null
    });
});
