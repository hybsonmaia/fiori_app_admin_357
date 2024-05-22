sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "br/com/gestao/fioriappadmin357/util/Formatter"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, UIComponent, JSONModel, Formatter) {
    "use strict";

    return Controller.extend("br.com.gestao.fioriappadmin357.controller.Lista", {

      objFormatter: Formatter,

      onInit: function () {
        debugger;
        var oRouter = UIComponent.getRouterFor(this);
        oRouter.getRoute("Detalhes").attachMatched(this.onBindingProdutoDetalhes, this);

      },

      onBindingProdutoDetalhes: function (oEvent) {
        var oView = this.getView(),
          oProduto = oEvent.getParameter("arguments").ProductId,
          sURL = `/Produtos('${oProduto}')`;

        oView.bindElement({
          path: sURL,
          parameters: { expand: 'to_Category' },
          events: {
            change: this.onBindingChange.bind(this),
            dataRequested: function () {
              oView.setBusy(true);
            },
            dataReceived: function (data) {
              oView.setBusy(false);
            }
          }
        });
      },

      onBindingChange: function (oEvent) {
        var oView = this.getView(),
          oElementBinding = oView.getElementBinding(),
          oRouter = sap.ui.core.UIComponent.getRouterFor(this);

        if (!oElementBinding.getBoundContext()) {
          oRouter.getTargets().display("objectNotFound")
          return;
        }
      },

      onNavBack: function () {
        var oRouter = UIComponent.getRouterFor(this);

        oRouter.navTo("Lista")
      }

    });
  });
