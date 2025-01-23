sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project3.controller.View1", {
        onInit: function () {
            var oSmartFilterbar = this.byId("smartFilterbar");
            if (oSmartFilterbar) {
                oSmartFilterbar.setFilterBarExpanded(true); // Expands the FilterBar
            }

        },
        onDeleteRow: function () {
            var oSmartTable = this.byId("smarttable");
            var oTable = oSmartTable.getTable();
            var aSelectedItems = oTable.getSelectedItems();
       
            if (aSelectedItems.length === 0) {
                sap.m.MessageToast.show("Please select at least one row to delete.");
                return;
            }
       
            var oModel = oSmartTable.getModel();
            var aPromises = [];
       
            // Iterate through selected rows
            aSelectedItems.forEach(function (oSelectedItem) {
                var oContext = oSelectedItem.getBindingContext();
                var sPath = oContext.getPath();
       
                // Create a promise for each delete operation
                var oPromise = new Promise(function (resolve, reject) {
                    oModel.remove(sPath, {
                        success: function () {
                            resolve(); // Resolve the promise when delete is successful
                        },
                        error: function (oError) {
                            reject(oError); // Reject the promise if delete fails
                        }
                    });
                });
       
                aPromises.push(oPromise);
            });
       
            // Wait for all delete operations to complete
            Promise.allSettled(aPromises) // Use Promise.allSettled to handle both resolved and rejected promises
                .then(function (aResults) {
                    var bHasErrors = false;
       
                    aResults.forEach(function (oResult) {
                        if (oResult.status === "rejected") {
                            bHasErrors = true;
                            console.error("Error deleting row:", oResult.reason);
                        }
                    });
       
                    if (bHasErrors) {
                        sap.m.MessageToast.show("Some rows could not be deleted. Check the console for details.");
                    } else {
                        sap.m.MessageToast.show("Selected rows deleted successfully.");
                    }
       
                    // Refresh the table binding to update the frontend
                    oTable.getBinding("items").refresh();
                    oTable.removeSelections();
                });
        },
       
       
 
        onRowPress: function (oEvent) {
            var oSelectedItem = oEvent.getSource().getBindingContext(); // Ensure this fetches the right context
            if (!oSelectedItem) {
                console.error("No row selected.");
                return;
            }
            var sPlant = oSelectedItem.getProperty("Id");
       
            // var oRouter = this.getOwnerComponent().getRouter();
            // oRouter.navTo("View2", {
            //     Id: sPlant
            // });
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View2", {
                Id: sPlant
            });
       
            console.log("Navigated to Secondpage with Id:", sPlant);  
           
            // var oModel = this.getView().getModel();
            //     console.log(oModel.getData());  // Check if the data exists in the model
 
            // Check if Id is passed correctly
        }
    });
});
