define([
        "dojo/_base/declare",
        "dojox/uuid",
		"dojo/json",
        "icm/action/Action",
        "icm/util/Coordination"
], function(declare, UUID, JSON, Action, Coordination) {

	/**
	 * @name icm.action.solution.OpenAddCasePage
	 * @class Opens the Add Case page so that the user can create a case of the selected case type. <br>
	 *        Context required by this action: ['Solution'] <br>
	 * @augments icm.action.Action
	 */
	return declare("icm.custom.action.CustomAddCasePerRoleAction", [Action], {
	/** @lends icm.action.solution.OpenAddCasePage.prototype */
		isEnabled: function()
		{
			var caseType = this.propertiesValue.caseType;
			var widget = this.getWidget();
			var self = this;
            var Solution = this.getActionContext("Solution");
			if(Solution === null || Solution.length == 0) {
			    return false;
			}

			var enabled = true;

            var solution = Solution[0];
			solution.retrieveCaseType(caseType, function(caseType){
			    enabled = caseType.instanceCreationRights && caseType.createSubfolderRights;
				self.setEnabled(enabled);
			});

			return enabled;
		},


		execute: function()
		{
			var self = this;

			//Get the specific case type from action properties
			var caseType = this.propertiesValue.caseType;
			//Get the solution from action context
			var Solution = this.getActionContext("Solution");
			if(Solution === null || Solution.length == 0) {
			    return false;
			}

			var solution = Solution[0];

			//Get the case type model object
			solution.retrieveCaseType(caseType, function(caseType){
				//Create the case editable model object of the specific case type
			    solution.createNewCaseEditable(caseType, function(pendingCaseEditable){
			    	//Get the role specific page configuration from action configuration
			    	//Format of the pageConfiguration is a JSON - '{"<SolutionPrefix>_<RoleName>":"<PageResourceId>","CJ5_r1":"CmAcmCASE_NEW_DEFAULT_PAGE"}'
			        var pageConfiguration = self.propertiesValue.pageConfiguration;
			        pageConfiguration = JSON.parse(pageConfiguration);
			        //Get current role model object from action context
			        var role = self.getActionContext("Role")[0];
					var roleId = solution.getPrefix()+'_'+role.name;
					//Get the page name from configuration
			        var pageName = pageConfiguration[roleId];

			        //Prepare add case page setting
			        var pageClassSetting = {"pageClass":solution.getPackageName()+'/'+pageName,
			        			"pageTitle":"Case Creation",
			        			"pageType":"caseNewPage",
			        			"pageName":pageName};
			        //Prepare the send new case info event payload
			        var payload = {
						 	   	   "caseType" : caseType,
						  		   "caseEditable" : pendingCaseEditable,
						   		   "coordination" : new Coordination()
						   	      };
					//Open the add case page
                    self.getWidget().onBroadcastEvent("icm.OpenPage",
                            {
                            'pageClassName': pageClassSetting.pageClass,
                            'pageType': pageClassSetting.pageType,
                            'subject': UUID.generateRandomUuid(),
                            'pageContext':{'solution':solution, 'role': role},
                            'crossPageEventName':'icm.SendNewCaseInfo',
                            'crossPageEventPayload':payload,
                            'isLazy': false
                            }
                    );
				});
			});
		},

		getIterator: function(callback)
		{
			var widget = this.getWidget();
			var Solution = this.getActionContext("Solution");
			if(Solution === null || Solution.length == 0) {
			    return false;
			}
			var solution = Solution[0];
		    var self = this;
		    solution.retrieveCaseTypes(function(caseTypes) {
			   console.log("caseTypes is ", caseTypes);
			   var caseType = self.arguments.caseType;
			   var result = [];
			   var i;
			   for(i = 0; i < caseTypes.length; i++)
			   {
			       if (caseType.toUpperCase() === "ALL" || caseType === caseTypes[i].id)
				   {
					// make sure the item as a title used as menu item title
				       caseTypes[i].title = caseTypes[i].getDisplayName();
					   result.push(caseTypes[i]);
					   if (caseType === caseTypes[i].id)
					   {
					       break;
					   }
			       }
		      }

			  if(self.arguments.flat && result.length === 1){//RTC defect 53386
			  		result[0].title = self.arguments.label;
			  }
			  			  result.sort(function(x, y){return x.title > y.title? 1:-1;});//RTC defect 46276

				    // invoke the callback method which will create the menu items
			   callback(result);
		    });
		},

		_eoc_:null

	});

});