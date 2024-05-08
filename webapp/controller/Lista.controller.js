sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, DateFormat, UIComponent) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport357.controller.Lista", {
            onInit: function () {

                //var oConfiguration = sap.ui.getCore().getConfiguration();
                //oConfiguration.setFormatLocale("pt-BR");

            },

            onSearch: function () {

                var oFilter = new Filter({
                    filters: [
                        new Filter({
                            path: "ProductId",
                            operator: FilterOperator.Contains,
                            value1: this.getView().byId("inputProdutoId").getValue()
                        }),
                        new Filter({
                            path: "Name",
                            operator: FilterOperator.Contains,
                            value1: this.getView().byId("inputProdutoNome").getValue()
                        })
                    ],
                    and: true
                });

                var oTable = this.getView().byId("tableProdutos");
                var binding = oTable.getBinding("items");

                binding.filter(oFilter);


            },

            date: function (value) {

                var oConfiguration = sap.ui.getCore().getConfiguration(),
                    oLocale = oConfiguration.getFormatLocale(),
                    oPattern = "";

                if (oLocale === "pt-BR") {
                    oPattern = "dd/MM/yyyy"
                } else {
                    oPattern = "MM/dd/yyyy"
                }

                if (value) {
                    var day = String(new Date(value).getDate()).padStart(2, '0');
                    var month = String(new Date(value).getMonth() + 1).padStart(2, '0');
                    var year = new Date(value).getFullYear();
                    if (year === 9999) {
                        return "";
                    } else {
                        var oDateFormat = DateFormat.getDateTimeInstance({
                            //style: "short"
                            pattern: oPattern
                        });
                        return oDateFormat.format(new Date(value));
                    }

                } else {
                    return value;
                }
            },

            statusProduto: function (value) {
                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                try {
                    return oBundle.getText("status" + value);
                } catch(err) {
                    return "";
                }
            },

            stateProduto: function (value) {
                try {

                    if(value === "S1") {
                        return "Success";
                    }else if(value === "S2") {
                        return "Warning";
                    }else if (value === "S3"){
                        return "Error";
                    } else {
                        return "None";
                    }

                } catch(err) {
                    return "None";
                }
            },

            iconProduto: function (value) {
                try {
        
                    if(value === "S1") {
                        return "sap-icon://sys-enter-2";
                    }else if(value === "S2") {
                        return "sap-icon://alert";
                    }else if (value === "S3"){
                        return "sap-icon://error";
                    } else {
                        return "";
                    }
        
                } catch(err) {
                    return "";
                }
            },

            onRounting: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Detalhes");
            },

            onSelectedItem: function (oEvent) {

                var oProductId = oEvent.getSource().getBindingContext().getProperty("ProductId");

                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Detalhes", {
                    ProductId: oProductId
                });

            },

            onFuncaoGit: function() {
                
            }

        });
    });
