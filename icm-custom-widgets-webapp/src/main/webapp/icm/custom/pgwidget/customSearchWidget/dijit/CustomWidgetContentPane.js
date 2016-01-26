define([ "dojo/_base/declare", 
    "dojo/text!./templates/CustomWidgetContentPane.html", 
    "dijit/form/Button",
    "dojo/dom",
    "dojo/on",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/form/Form",
	"icm/base/_BaseWidget"
	], 
	
	function(declare, template, Button, dom, on, array, lang, Form, _BaseWidget){
	return declare("icm.custom.customSearchWidget.dijit.CustomWidgetContentPane", [_BaseWidget], {
    templateString: template,
	widgetsInTemplate: true,
    fieldsInForm: null,
		
    createSearchFields: function(solution) {
        solution.retrieveAttributeDefinitions(lang.hitch(this, this._buildSearchFields));
    },

    _buildSearchFields: function(attrs) {
        var f = this.fieldsInForm;

        var fields = [];
        fields.push("<table>");
        array.forEach(attrs, function(attr) {
            // if(attr.hidden || attr.system || !attr.dataType || attr.displayMode !== "readwrite" ||  attr.dataType === "xs:object" || attr.dataType === "xs:guid") {
            if(attr.hidden || attr.id.indexOf("_") == -1 || attr.cardinality == "LIST") {
                return;
            }
            // handle the boolean type attributes specially
            if(attr.dataType === "xs:boolean") {
                fields.push("<tr><td><h3>");
                fields.push(attr.name);
                fields.push("</h3></td><td><input type=\"radio\" value=\"true\" name=\"");
                fields.push(attr.id);
                fields.push("\">true</input>");
                fields.push("<input type=\"radio\" value=\"false\"name=\"");
                fields.push(attr.id);
                fields.push("\">false</input>");
                fields.push("</td></tr>");
                f.push(attr);
            } else if(attr.dataType === "xs:timestamp"){
                // ignore timestamp attributes for the time being
                console.log("skip data time field - " + attr.id);
            } else {
                fields.push("<tr><td><h3>");
                fields.push(attr.name);
                fields.push("</h3></td><td><input type=\"text\" size=\"25\" name=\"");
                fields.push(attr.id);
                fields.push("\"></input>");
                fields.push("</tr></td>");
                f.push(attr);
            }
        });
        fields.push("</table>");
        this.fieldsNode.innerHTML = fields.join("");
    },

	postCreate:	function(){
        this.inherited(arguments);
        this.fieldsInForm = [];

        var that = this;

        this.solution && this.createSearchFields(this.solution);
        on(this.submitMeButton, "click", function(evt){
            var form = that.searchform;
            var f = that.fieldsInForm;
            var valueObject = {};

            array.forEach(f, function(attr) {
                var v;
                if(attr.dataType === "xs:boolean") {
                    var i = 0, length = form[attr.id].length;
                    for(; i<length; i++) {
                        if(form[attr.id][i].checked) {
                            v = form[attr.id][i].value;
                            break;
                        }
                    }
                } else {
                    v = form[attr.id].value;
                }

                if(v) {
                    valueObject[attr.id] = {"attr": attr, "value":v};
                }
            });
            that.onSearchSubmitted(valueObject);
        });
	},

    clearInputValue: function() {
            var form = this.searchform;
            form.AssignedToUser.value = "";
            form.CustomerName.value = "";
            form.MerchantContacted[0].checked = true;
    },

    onSearchSubmitted: function(values) {
    },

    displayTextContent: function(text) {
        this.displayTextNode.innerHTML = text;
    },

	/**
	 * @private destroys this widget
	 */
	destroy: function() {
		//Do any custom clean up here
		this.inherited(arguments);
    },

    _eoc_: null
	
});
});


