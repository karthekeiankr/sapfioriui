sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project3.controller.View2", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("View2").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
         
            var sPlantId = parseInt(oEvent.getParameter("arguments").Id, 10);  // Convert to integer
            console.log(sPlantId)
            this.getView().bindElement({
                path: "/laptopsSet(" + sPlantId + ")"  // Use integer type in the path
            });
        },

        onRowPress: function (oEvent) {
            var oSelectedItem = oEvent.getSource().getBindingContext(); // Ensure this fetches the right context
            if (!oSelectedItem) {
                console.error("No row selected.");
                return;
            }
            var sPlant = oSelectedItem.getProperty("Id");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View3", {
                Id: sPlant
            });
       
            console.log("Navigated to Third with Id:", sPlant);  

        }

    });
});
