define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojox/uuid",
        "icm/action/Action",
        "icm/util/Coordination"
], function(declare, lang, array, UUID, Action, Coordination) {

    return declare("icm.custom.action.CustomAddTaskAction", [Action], {

        isEnabled: function()
        {
            var caseEditable = this.getActionContext("Case")[0];
            var caseType = this.propertiesValue.caseType;
            if(caseEditable.caseType.id === caseType){
                return true;
            }else{
                return false;
            }
        },


        execute: function()
        {
            this.logEntry("execute");

            //Get case editable
            var caseEditable = this.getActionContext("Case")[0];
            //Get task tye configuration from the action configuration
            var taskType = this.propertiesValue.taskType;
            //Get option of if need to launching add task page
            var withoutLaunchTaskPage = this.propertiesValue.withoutLaunchTaskPage;
            var callback = null;
            var self = this;

            if(!withoutLaunchTaskPage){
                //Create a task of specific task type with add task page.
                callback=function(taskEditable){
                    taskEditable.setTaskName(taskType +"-"+ UUID.generateRandomUuid());
                    var addTaskPagePayload = {
                            "taskEditable": taskEditable,
                            "coordination": new Coordination()
                    };
                    //Open add task page
                    self.broadcastEvent("icm.AddTask", addTaskPagePayload);
                };
            }else{
                //Create a task of specific task type dirctly without add launching add task page.
                callback=function(taskEditable){
                    taskEditable.setTaskName(taskType +"-"+ UUID.generateRandomUuid());
                    //Save task editable
                    taskEditable.save(lang.hitch(this, function(response, fieldErrors) {
                        //Refresh the Case Information widget tasks tab.
                        self.broadcastEvent("icm.RefreshTab",{"tabId":"Tasks"});
                        self.broadcastEvent("icm.TaskCreated",{'taskEditable':taskEditable});
                    }));
                };
            }

            //Create a task editable
            caseEditable.getCase().createNewTaskEditable(taskType, dojo.hitch(this,callback));

            this.logExit("execute");
        },

        _eoc_:null

    });

});
