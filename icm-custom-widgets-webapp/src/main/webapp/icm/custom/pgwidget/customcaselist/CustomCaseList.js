define([ "dojo/_base/declare",
    "icm/pgwidget/caselist/CaseList",
	"icm/custom/pgwidget/customcaselist/CustomCaseListViewDetails",
	"icm/custom/pgwidget/customcaselist/CustomCaseListViewMagazine"
	], function(declare, CaseList, customCaseListViewDetails, customCaseListViewMagazine){

    return declare("icm.custom.pgwidget.customcaselist.CustomCaseList", [CaseList], {
		/**
		 * Returns the details view of the Custom Case List widget.
		 * 
		 * @return The details view of the Custom Case List widget. 
		 */
		getDetailsViewModule: function() {
			var view = {
				moduleClass: customCaseListViewDetails,
				CASE_TITLE: this.caseListModel.CASE_TITLE,
				widgetPaneId: this.id
			};
			return view;
		},

		/**
		 * Returns the magazine view of the Custom Case List widget.
		 * 
		 * @return The magazine view of the Custom Case List widget.
		 */
		getMagazineViewModule: function() {
			var view = {
				moduleClass: customCaseListViewMagazine,
				caseListModel: this.caseListModel,
				widgetPaneId: this.id	
			};
			return view;
		}
		
	});
});