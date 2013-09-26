jquery-ui.resizable_grid_with_callback.js
=========================================

* http://benbeckford.com
* Plugin based on jQuery UI grid plugin for the resizable interaction
* Adds an extra callback "snapCallback" which fires after object has snapped to grid, standard jQuery UI behaviour is to fire the resize callback before the grid is invoked
* Usage - include after jQuery UI, then usage is as follows:
*        - Old Method: $('#element').resizable({grid: [10,10], resize: function(event, ui){ alert(ui.size.width); } })
*        - New Method: $('#element').resizable({gridWithCallback: [10,10], snapCallback: function(event, ui){ alert(ui.size.width); } })
