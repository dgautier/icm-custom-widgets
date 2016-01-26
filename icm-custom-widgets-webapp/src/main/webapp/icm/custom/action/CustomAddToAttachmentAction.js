define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "icm/action/Action",
    "icm/util/Coordination"
    ], function(declare, lang, array, Action, Coordination) {

        return declare("icm.custom.action.CustomAddToAttachmentAction", [Action], {

            isEnabled: function()
            {
                return (this.id !== 'custom.CAddToAttachmentAction_NoAttachmentDefined');
            },

            execute: function()
            {
                var item = this.getArgument("item");
                this.publishEvent("icm.AddDocumentAsAttachment", {"attachmentName":item.id, "documents":this.getActionContext("Document")});
            },

            getIterator: function(callback){
                var result = [];
                if(this.getActionContext()["WorkItem"]){
                    var workitem = this.getActionContext("WorkItem")[0];
                    for(var k in workitem.propertiesCollection){
                        var prop = workitem.propertiesCollection[k];
                        if (prop.dataType == "xs:attachment"){
                            result.push({'title':prop.name, 'id':prop.id});
                        }
                    }
                }
                if(result.length == 0){
                    this.enabled = false;
                    result.push({'title':'Wow! No attachment, You should add one.', 'id':'NoAttachmentDefined'});
                }else{
                    this.enabled = true;

                }

                callback(result);
            },

            _eoc_:null

        });
});