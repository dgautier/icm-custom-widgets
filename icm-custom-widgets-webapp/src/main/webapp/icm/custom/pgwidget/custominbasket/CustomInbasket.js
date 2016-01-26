define(["dojo/_base/declare",
		"dojo/_base/lang",
        "icm/pgwidget/inbasket/Inbasket"],
        function(declare, lang,Inbasket){
	
	return declare("icm.custom.pgwidget.custominbasket.CustomInbasket", [Inbasket], {

		postCreate: function() {
			this.inherited(arguments);
		},
		
		getColumnDecorator: function(){
			var deco = {};
			deco["F_Subject"] = lang.hitch(this, function(data, rowId, rowIndex) {
				if (this.selectedIndex != -1){
					var cl = this.contentLists[this.selectedIndex];
					var item = cl.grid.row(rowId).item();
					var value = item.getDisplayValue("F_Subject");
					var fieldsHTML = '<a class="firstColumnLink" href="javascript:;" onclick="'
						+ 'icm.pgwidget.inbasket.InbasketContentPaneEventListener.openItemByLink(\'' + this.id + '\');'
						+ '">' + value + '</a>';
					return fieldsHTML;
				}			
			});
			deco["B615_flo"] = lang.hitch(this, function(data, rowId, rowIndex) {
				var cl = this.contentLists[this.selectedIndex];
				var item = cl.grid.row(rowId).item();
				
				// Get a property value
				var propertyName = "B615_flo";
				var property = item.getValue(propertyName);
					
				// Set decorator for the property
				if (!property) {
					return "";
				}
				// Set style per the property value
				var style;
				if (property < 100) {
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

			return deco;
		},
		
		
	    _eoc_: null
	});
});