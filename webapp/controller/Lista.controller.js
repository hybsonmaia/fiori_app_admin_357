sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
    "br/com/gestao/fioriappadmin357/util/Formatter",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, UIComponent, Formatter, Fragment) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappadmin357.controller.Lista", {

            objFormatter: Formatter,

            onInit: function () {

                //var oConfiguration = sap.ui.getCore().getConfiguration();
                //oConfiguration.setFormatLocale("pt-BR");

            },

            onSearch: function () {

                var objFilter = { filters: [], and: true };
                objFilter.filters.push(new Filter("ProductId", FilterOperator.Contains, this.getView().byId("inputProdutoId").getValue()));
                objFilter.filters.push(new Filter("Name", FilterOperator.Contains, this.getView().byId("inputProdutoNome").getValue()));
                objFilter.filters.push(new Filter("Category", FilterOperator.Contains, this.getView().byId("inputCategoria").getValue()));

                var oFilter = new Filter(objFilter);

                var oTable = this.getView().byId("tableProdutos");
                var binding = oTable.getBinding("items");

                binding.filter(oFilter);


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

            onCategoria: function (oEvent) {
                this._oInput = oEvent.getSource().getId();
                var oView = this.getView();

                // Verificando a existencia do Fragment, caso nao exista, cria e atribui a View
                if (!this._CategoriaSearchHelp) {
                    this._CategoriaSearchHelp = Fragment.load({
                        id: oView.getId(),
                        name: "br.com.gestao.fioriappadmin357.frags.SH_Categorias",
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._CategoriaSearchHelp.then(function(oDialog){
                    // Limpar filtro inicial
                    oDialog.getBinding("items").filter([]);
                    oDialog.open();
                })
            },

            onNovoProduto: function (oEvent) {
                var oView = this.getView();

                if (!this._Produto) {
                    this._Produto = Fragment.load({
                        id: oView.getId(),
                        name: "br.com.gestao.fioriappadmin357.frags.Insert",
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._Produto.then(function(oDialog){
                    oDialog.open();
                })
            },

            onValueHelpSearch: function (oEvent) {
                var objFilter = { filters: [], and: false }
                objFilter.filters.push(new Filter("Description", FilterOperator.Contains, sValue));
                objFilter.filters.push(new Filter("Category", FilterOperator.Contains, sValue));

                var oFilter = new Filter(objFilter)

                oEvent.getSource().getBinding("items").filter(oFilter);

            },

            onValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var oInput = null;

                if(this.byId(this._oInput)) {
                    oInput = this.byId(this._oInput);
                }else {
                    oInput = sap.ui.getCore().byId(this._oInput);
                }

                if(!oSelectedItem) {
                    oInput.resetProperty("value");
                    return;
                }

                oInput.setValue(oSelectedItem.getTitle());
            }

        });
    });
