sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/layout/form/SimpleForm"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function(Controller, JSONModel, SimpleForm) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport357.controller.DataBinding", {

            onInit: function() {

                var objModelJSON = new JSONModel();
                objModelJSON.loadData("dados/Produtos.json");
                this.getView().setModel(objModelJSON, "Model_JSON_Produtos");

            },

            getRegion: function() {

                var objRegionModel = new JSONModel();
                objRegionModel.loadData("dados/Regions.json");
                this.getView().setModel(objRegionModel, "Model_JSON_Regions");

                var objFormulario = this.getView().byId("form_regions");
                objFormulario.bindElement("Model_JSON_Regions>/regions/0");

            }
        });
    });