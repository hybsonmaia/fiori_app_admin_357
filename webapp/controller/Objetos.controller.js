sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/TextArea",
    "sap/ui/layout/form/SimpleForm"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Label, Input, TextArea, SimpleForm) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport357.controller.Objetos", {
            onInit: function () {

            },

            onClickSet: function (oEvent) {
                var titleHeader = this.getView().byId("headerTitle");
                titleHeader.setText("Novo Titulo do Header");

            },

            onClickGet: function (oEvent) {
                var titleHeader = this.getView().byId("headerTitle");
                var sValorTitleHeader = titleHeader.getText();
            },

            addFormulario: function (oEvent) {
                debugger
                var objPanel = this.getView().byId("panelFormulario");

                if (objPanel.getContent()[0]) {
                    objPanel.destroyContent();
                    return;
                };
                var objItensFormulario = [];
                objItensFormulario.push(new Label("labelPergunta1", { text: "Pergunta 1", required: true }));
                objItensFormulario.push(new Input("inputPergunta1", { placeholder: "Pergunta 1" }));

                objItensFormulario.push(new Label("labelPergunta2", { text: "Pergunta 2", required: false }));
                objItensFormulario.push(new TextArea("txtArea2", { value: "Pergunta 2", rows: 8 }));

                var oForm = new SimpleForm("simpleForm", { content: objItensFormulario });

                objPanel.addContent(oForm)

            }
        });
    });
