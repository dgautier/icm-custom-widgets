define(["dojo/_base/declare",
        "dojo/text!./templates/CaseInfoCommentsContentPane.html",
        "icm/pgwidget/caseinfo/dijit/CaseInfoComponentContentPane",
        "icm/dialog/addcommentdialog/dijit/CommentContentPane",
        "icm/base/Constants",
        "dojo/_base/array",
        "icm/base/Constants"],
         function(declare, template, CaseInfoComponentContentPane, CommentContentPane, Constants, array, Constants) {

return declare("icm.custom.pgwidget.customcaseinfo.CaseInfoCommentsContentPane", CaseInfoComponentContentPane, {

        templateString: template,

        // Set any required data
        setModel: function(model) {
            this.inherited(arguments);
            this.render(model);
        },

        //Render the tab dijit
        render: function(model) {

            if (!this.isInFocus() || !model || !model.payload) {
                return;
            }

            if ( this.commentContentPane ) {
                this.contentNode.removeChild(this.commentContentPane.domNode);
                this.commentContentPane = null;
            }

            this.inherited(arguments);

            var caseObj = model.payload.caseEditable.getCase();
            var coord = model.payload.coordination || new icm.util.Coordination();
            var readonly = this.context.widgetProperties.commentsAreReadOnly;
            var self = this;

            var context = {
                "artifactType": "Case",
                "artifactLabel": caseObj.getCaseTitle(),
                "commentContext": Constants.CommentContext.CASE,
                "caseModel": caseObj
            };
            this.commentContentPane = new CommentContentPane(context);

            if(readonly){
               this.commentContentPane.commentText.disabled = true;
            }else{
               this.commentContentPane.addCommentButton.watch("disabled",function(){
                    if(self.commentContentPane.addCommentButton.disabled === true){
                        self.context.onBroadcastEvent("icm.SetDirtyState",{'dirtySate':false, 'reference':self.id});
                    }else{
                        self.context.onBroadcastEvent("icm.SetDirtyState",{'dirtySate':true, 'reference':self.id});
                    }
               });

               coord && coord.participate(Constants.CoordTopic.BEFORECANCEL, function(context, complete, abort){
                 if(self.commentContentPane.addCommentButton.disabled === false){
                    abort({message:"Comments unsaved"});
                 }else{
                    complete();
                 }
               });

               coord && coord.participate(Constants.CoordTopic.SAVE, function(context, complete, abort){
                 if(self.commentContentPane.addCommentButton.disabled === false){
                    self.commentContentPane.addCommentButton.onClick();
                    complete();
                 }else{
                    complete();
                 }
               });

               coord && coord.participate(Constants.CoordTopic.COMPLETE, function(context, complete, abort){
                 if(self.commentContentPane.addCommentButton.disabled === false){
                    self.commentContentPane.addCommentButton.onClick();
                    complete();
                 }else{
                    complete();
                 }
               });
            }

            this.contentNode.appendChild(this.commentContentPane.domNode);
        },

        // Resize function if need
        resize: function() {
            if(this.commentContentPane){
                this.commentContentPane.resize();
            }
        },

        _eoc_: null

});


});