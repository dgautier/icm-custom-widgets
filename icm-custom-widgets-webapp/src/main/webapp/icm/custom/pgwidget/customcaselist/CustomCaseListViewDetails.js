define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"icm/pgwidget/caselist/CaseListViewDetails"
], 
function(declare, lang, CaseListViewDetails) {

	/**
	 * @name icm.custom.pgwidget.customcaselist.CustomCaseListViewDetails
	 * @class This module provides detail view capability for the Custom Case List widget.
	 * @augments icm.pgwidget.caselist.CaseListViewDetails
	 */
    return declare("icm.custom.pgwidget.customcaselist.CustomCaseListViewDetails", [CaseListViewDetails], {
    	/** @lends icm.custom.pgwidget.customcaselist.CustomCaseListViewDetails */
	
		name: 'customCaseListViewDetails',

		/**
		 * @private 
		 */
		getAPIPath: function() {
			return {
				customCaseListViewDetails: this
			};
		},

		/**
		 * Returns the decorators of columns that are displayed in the details view of the Custom Case List widget.
		 * 
		 * @return An object of decorator functions associated with specific data fields. 
		 */
		getViewDecorator: function() {
			var viewDecorator = this.inherited(arguments);
			
			viewDecorator["A074A_intID"] = lang.hitch(this, function(data, rowId, rowIndex) {
				var cl = this.contentList;
				var item = cl.grid.row(rowId).item();
				
				// Get a property value
				var propertyName = "A074A_intID";
				var property = item.getValue(propertyName);
					
				// Set decorator for the property
				if (!property) {
					return "";
				}
				// Set style per the property value
				var style;
				if (property < 200) {
					style = "color:red;"
				} else if (property >= 200 && property < 500) {
					style = "color:green;"
				} else if (property >= 500) {
					style = "color:yellow;"
				} 

				// Set the cell content
				var fieldsHTML = '<div style="' + style + '">'
					+ property + '</div>';
				return fieldsHTML;												
			});			
			
			return viewDecorator;
		}
		
	});
});
