sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
  ], function (Controller, MessageToast) {
    "use strict";
 
    return Controller.extend("project4.controller.View1", {
      onInit: function () {
        // Load JSON data into the model (example data)
        var oJSONModel = new sap.ui.model.json.JSONModel({
          Materials: [
            {
              Id: 201,
              Material_Name: "Steel Rod",
              Material_Des: "High-quality steel rod for construction",
              Quantity: "500",
              City: "Mumbai"
            },
            {
              Id: 22,
              Material_Name: "Cement Bag",
              Material_Des: "Premium grade cement",
              Quantity: "200",
              City: "Delhi"
            },
            {
              Id: 23,
              Material_Name: "Bricks",
              Material_Des: "Red clay bricks", 
              Quantity: "1500",
              City: "Chennai"
            },
            {
              Id: 24,
              Material_Name: "Paint",
              Material_Des: "Weather-resistant exterior paint",
              Quantity: "300",
              City: "Bangalore"
            },
            {
              Id: 25,
              Material_Name: "PVC Pipes",
              Material_Des: "Durable plumbing pipes",
              Quantity: "800",
              City: "Hyderabad"
            }
          ]
        });
 
        // Set the JSON model to the view for binding
        this.getView().setModel(oJSONModel, "jsonModel");
      },
 
      onSendToBackend: function () {
        // Retrieve the JSON model bound to the table
        var oJSONModel = this.getView().getModel("jsonModel");
        var aMaterials = oJSONModel.getProperty("/Materials");
 
        // Retrieve the OData model from the view
       // Fetch the OData model globally
var oODataModel = this.getOwnerComponent().getModel();
 
 
        // Validate the OData model exists
        if (!oODataModel) {
          MessageToast.show("OData model is not configured!");
          return;
        }
 
        // Iterate through the materials and send each to the backend
        aMaterials.forEach(function (oMaterial) {
          oODataModel.create("/laptopsSet", oMaterial, {
            success: function () {
              MessageToast.show("Data successfully sent for ID: " + oMaterial.Id);
            },
            error: function (oError) {
              MessageToast.show("Error sending data for ID: " + oMaterial.Id);
            }
          });
        });
      }
    });
  });