define([
	"dojo/_base/declare",
	"dojo/_base/lang",	
	"icm/pgwidget/caselist/CaseListViewMagazine",
	"icm/base/Constants"
], 
function(declare, lang, CaseListViewMagazine, Constants) {

	/**
	 * @name icm.custom.pgwidget.customcaselist.CustomCaseListViewMagazine
	 * @class This module provides magazine view capability for the Custom Case List widget.
	 * @augments icm.pgwidget.caselist.CaseListViewMagazine
	 */
	return declare("icm.custom.pgwidget.customcaselist.CustomCaseListViewMagazine", [CaseListViewMagazine], {
    	/** @lends icm.custom.pgwidget.customcaselist.CustomCaseListViewMagazine.prototype */
	
		name: 'customCaseListViewMagazine',

		/**
		 * @private 
		 */
		getAPIPath: function() {
			return {
				customCaseListViewMagazine: this
			};
		},
	
		/**
		 * Returns the decorator of the cell value that is displayed in the magazine view of the Custom Case List widget.
		 * 
		 * @return A decorator function for the cell value of the magazine view.
		 */	
		getViewDecorator: function() {
			var cellValue = lang.hitch(this, function(gridData, storeData, cellWidget) {
				if (!this.caseListModel) {
					return "";			
				}
				var currentRowIndex = cellWidget.cell.row.index();
				var item = cellWidget.cell.row.grid.model.byIndex(currentRowIndex).item;
				
				// Get case title 
				var title = item.getValue(this.caseListModel.CASE_TITLE);				
				// Create case title link and avoid duplicate action execution when double clicking the link
				var stopEvent = 'console.log(\'icm.pgwidget.caselist.CaseListViewMagazine --- '
					+ 'event type: \' + event.type + \', detail: \' + event.detail);'
					+ 'if (dojo.isIE === 8){console.log(\'set IE8 cancelBubble!\'); event.cancelBubble = true;} else '
					+ 'if(dojo.isFunction(event.preventDefault) && dojo.isFunction(event.stopPropagation))'
					+ '{event.preventDefault();event.stopPropagation()}';
				var fieldsHTML = '<a class="caseTitle" href="javascript:;" onclick="' + stopEvent
					+ 'if(event.type===\'click\' && (dojo.isIE === 8 || event.detail===1))'
					+ 'icm.action.Action.perform(\'' + this.widgetPaneId + '\', \'icm.action.case.OpenCasePage\');'
					+ '" ondblclick="' + stopEvent
					+ '" title="' + title + '">' 
					+ title + '</a><br>';										
					
				// Get case model object
				var caseId = item.getValue(Constants.Case.IDENTITY);
				var caseModel = this.caseListModel.cases[caseId];			

				// Get the case type
				var caseType = caseModel.getCaseType();	
				var caseTypeId = caseType.getCaseType();
				
				// Get magazine view properties				
				var magazineViewProperties = this.caseListModel.payload.magazineViewProperties;
				if (magazineViewProperties && caseTypeId && magazineViewProperties[caseTypeId] 
					&& magazineViewProperties[caseTypeId].length > 0) {
					fieldsHTML += '<div class="content">';
					fieldsHTML += this.caseListModel.getFormattedProperties(magazineViewProperties[caseTypeId], item);
					fieldsHTML += '</div>';
				}
								
				var content = dojo.create("div", {innerHTML: fieldsHTML});

				// Set the color of a property per the property value
				var propertyName = "A074A_intID";
				var property = item.getValue(propertyName);
				if (property) {
					// Set style per the property value
					var style;
					if (property < 200) {
						style = "color:red;"
					} else if (property >= 200 && property < 500) {
						style = "color:green;"
					} else if (property >= 500) {
						style = "color:yellow;"
					} 

					// Update the property value node with new style
					var labels = dojo.query("label", content);
					var propertyLabel = propertyName.substring(propertyName.lastIndexOf('_') + 1);
					var labelNode, valueNode, newValueNode;
					for (var i = 0; i < labels.length; i ++) {
						labelNode = labels[i].innerHTML;
						if (labelNode.indexOf(propertyLabel + ':') === 0){
							valueNode = labels[i].parentNode.lastChild;
							newValueNode = dojo.create("div", {"style": style, innerHTML: valueNode.innerHTML}); 
							valueNode.innerHTML = "";
							valueNode.appendChild(newValueNode);
						}
					}
				}

				if (window.profilePlugin && magazineViewProperties && caseTypeId && magazineViewProperties[caseTypeId] 
				&& magazineViewProperties[caseTypeId].length > 0) {
					// Sametime awareness only if profilePlugin is present and attributes contains a user name field
					var i;
					for (i = 0; i < magazineViewProperties[caseTypeId].length; i ++) {
						var symName = magazineViewProperties[caseTypeId][i].symbolicName;
						if (symName == "LastModifier" || 
							(window.profilePlugin && profilePlugin.isUserNameField 
								&& profilePlugin.isUserNameField(symName))) {
							var shortName = item.attributes[symName];
							var idx = i * 2;
							var userNode = dojo.query(".content", content)[0].childNodes[idx].childNodes[2];
							userNode.nodeValue = "&nbsp;";
							var valueNode = dojo.create("span", {innerHTML: "&nbsp;"});
							userNode.parentNode.replaceChild(valueNode, userNode);
							profilePlugin.createLiveName(shortName, valueNode);
						}
					}					
				}
				if (cellWidget.entry.firstChild == null) { // do not duplicate the cell when scrolling
					cellWidget.entry.appendChild(content);
				}
				else { // refresh the cell content
					cellWidget.entry.replaceChild(content, cellWidget.entry.firstChild);					
				}
			});
			return cellValue;
		}
		
	});
});
