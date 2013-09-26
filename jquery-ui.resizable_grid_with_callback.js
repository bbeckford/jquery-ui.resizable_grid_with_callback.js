/*! jquery-ui.resizable_grid_with_callback.js - v1 - 2013-09-26
* http://benbeckford.com
* Plugin based on jQuery UI grid plugin for the resizable interaction
* Adds an extra callback "snapCallback" which fires after object has snapped to grid, standard jQuery UI behaviour is to fire the resize callback before the grid is invoked
* Usage - include after jQuery UI, then usage is as follows:
*        - Old Method: $('#element').resizable({grid: [10,10], resize: function(event, ui){ alert(ui.size.width); } })
*        - New Method: $('#element').resizable({gridWithCallback: [10,10], snapCallback: function(event, ui){ alert(ui.size.width); } })
* Copyright 2013 Ben Beckford, jQuery Foundation and other contributors; jQuery UI is licensed under MIT, Ben Beckford doesn't care how you use this code, but attribution is always nice ;) */

$.ui.plugin.add("resizable", "gridWithCallback", {

	resize: function() {
		var that = $(this).data("ui-resizable"),
			o = that.options,
			cs = that.size,
			os = that.originalSize,
			op = that.originalPosition,
			a = that.axis,
			gridWithCallback = typeof o.gridWithCallback === "number" ? [o.gridWithCallback, o.gridWithCallback] : o.gridWithCallback,
			gridX = (gridWithCallback[0]||1),
			gridY = (gridWithCallback[1]||1),
			ox = Math.round((cs.width - os.width) / gridX) * gridX,
			oy = Math.round((cs.height - os.height) / gridY) * gridY,
			newWidth = os.width + ox,
			newHeight = os.height + oy,
			isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
			isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
			isMinWidth = o.minWidth && (o.minWidth > newWidth),
			isMinHeight = o.minHeight && (o.minHeight > newHeight);

		o.gridWithCallback = gridWithCallback;

		if (isMinWidth) {
			newWidth = newWidth + gridX;
		}
		if (isMinHeight) {
			newHeight = newHeight + gridY;
		}
		if (isMaxWidth) {
			newWidth = newWidth - gridX;
		}
		if (isMaxHeight) {
			newHeight = newHeight - gridY;
		}

		if (/^(se|s|e)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
		} else if (/^(ne)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.top = op.top - oy;
		} else if (/^(sw)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.left = op.left - ox;
		} else {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.top = op.top - oy;
			that.position.left = op.left - ox;
		}

		if(o.snapCallback) {
      o.snapCallback(event, that.ui());
    }
	}

});
