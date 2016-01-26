define(["dojo/_base/declare",
    "dojo/_base/lang",
    "icm/base/Constants",
    "icm/base/BasePageWidget",
    "icm/base/_BaseWidget",
    "icm/dialog/addcommentdialog/dijit/CommentContentPane",
    "dojo/text!./templates/commentWidget.html",
    "icm/base/Constants"
    ],

    function(declare, lang, Constants,
        BasePageWidget, _BaseWidget, CommentContentPane, template, Constants){

        return declare("icm.custom.pgwidget.commentWidget.CommentWidget", [_BaseWidget, BasePageWidget], {

        templateString: template,
        widgetsInTemplate: true,
        resourceBundle: null,

        constructor: function(){
            this.resourceBundle = icm.util.Util.getResourceBundle("AddCommentDialog");
        },

        handleICM_SendCaseInfoEvent: function(payload) {
            this._displayCommentPane(payload);
        },

        handleICM_SelectCaseEvent: function(payload){
            this._displayCommentPane(payload);
        },
        _displayCommentPane: function(payload) {

            if (!payload || !payload.caseEditable) {
                return;
            }
            var caseEditable = payload.caseEditable;

            if (this.commentContentPane) {
                this.commentNode.removeChild(this.commentContentPane.domNode);
                this.commentContentPane.destroyRecursive();
                this.commentContentPane = null;
            }

            var context = {
                "artifactType": "Case",
                "artifactLabel": caseEditable.getCase().caseIdentifier,
                "commentContext": Constants.CommentContext.CASE,
                "caseModel": caseEditable.getCase()
            };
            this.commentContentPane = new CommentContentPane(context);
            this.commentNode.appendChild(this.commentContentPane.domNode);

            var coord = payload.coordination;
            var readonly = this.widgetProperties.commentsAreReadOnly;
            var self = this;

            if(readonly){
               this.commentContentPane.commentText.disabled = true;
            }else{
               this.commentContentPane.addCommentButton.watch("disabled",function(){
                    if(self.commentContentPane.addCommentButton.disabled === true){
                        self.onBroadcastEvent("icm.SetDirtyState",{'dirtyState':false, 'reference':self.id});
                    }else{
                        self.onBroadcastEvent("icm.SetDirtyState",{'dirtyState':true, 'reference':self.id});
                    }
               });

               if(coord){
                    coord.participate(Constants.CoordTopic.BEFORECANCEL, function(context, complete, abort){
                     if(self.commentContentPane.addCommentButton.disabled === false){
                        abort({message:"Comments unsaved"});
                     }else{
                        complete();
                     }
                   });

                   coord.participate(Constants.CoordTopic.SAVE, function(context, complete, abort){
                     if(self.commentContentPane.addCommentButton.disabled === false){
                        self.commentContentPane.addCommentButton.onClick();
                        complete();
                     }else{
                        complete();
                     }
                   });

                   coord.participate(Constants.CoordTopic.COMPLETE, function(context, complete, abort){
                     if(self.commentContentPane.addCommentButton.disabled === false){
                        self.commentContentPane.addCommentButton.onClick();
                        complete();
                     }else{
                        complete();
                     }
                   });
               }
            }

        },

        _eoc_: null

    });
});
