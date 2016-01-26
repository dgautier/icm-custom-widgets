define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"icm/action/Action",
	"icm/util/Coordination"
	], function(declare, lang, array, Action, Coordination) {

		return declare("icm.custom.action.CustomAddCaseAction", [Action], {
			solution: null,
			caseType: null,

			isEnabled: function()
			{
				return true;
			},

			// cache this as self for event broadcasting
			_retrieveSolutions: function(solutionList) {
				var solid = this.solution;
				var caseTypeId = this.caseType;
				var self = this;
				array.forEach(solutionList, function(solution) {
					if (solution.id === solid) {
						console.log("Find solution " + solution);
						self.retrieveCaseTypeFunc(solution, caseTypeId);
					}
				});
			},

			execute: function()
			{
				var self = this;
				this.solution = this.propertiesValue.solution;
				this.caseType = this.propertiesValue.caseType;
				ecm.model.desktop.retrieveSolutions(lang.hitch(this, this._retrieveSolutions));
			},
			retrieveCaseTypeFunc: function(solution, caseTypeId) {
				var that = this;
				solution.retrieveCaseType(caseTypeId, function(caseType){
					console.log("Begin retrieve case type " + caseTypeId);
					solution.createNewCaseEditable(caseType, function(pendingCaseEditable){
						console.log("#### ---- createNewCaseEditable completed");
						that.broadcastEvent(
							"icm.AddCase",
							{
								"caseType" : caseType,
								"caseEditable" : pendingCaseEditable,
								"coordination" : new Coordination()
							}
							);
					});
				})
			},

			_eoc_:null

		});
});