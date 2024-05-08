sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function(Controller, MessageBox) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport357.controller.i18n", {
            onInit: function() {

            },

            enviaCadastro: function() {

                debugger

                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                var Cliente = this.getView().byId("cliente").getValue(),
                    Cidade = this.getView().byId("estado").getValue(),
                    Estado = this.getView().byId("cidade").getValue();

                var sMensagem = oResourceBundle.getText("msgConfirmacao", [Cliente, Cidade, Estado]); 

                var sTitleMsg = oResourceBundle.getText("titleMsg")

                MessageBox.confirm(sMensagem, {
                    title: sTitleMsg,
                    onClose: null,
                    styleClass: "",
                    actions: [MessageBox.Action.OK,
                              MessageBox.Action.CANCEL],
                    emphasizeAction: MessageBox.Action.OK,
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                })


            }

        });
    });