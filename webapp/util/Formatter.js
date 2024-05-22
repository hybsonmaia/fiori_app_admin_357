sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/NumberFormat"
],function (UIComponent, DateFormat, JSONModel, NumberFormat) {
    "use strict";

    var Formatter = {

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
    
        floatNumber: function (value) {
          var numberFloat = NumberFormat.getFloatInstance({
            maxFractionDigits:2,
            minFractionDigits:2,
            groupingEnabled:true,
            groupingSeparator:".",
            decimalSeparator:",",
          })
          return numberFloat.format(value)
        }       

    };

    return Formatter;

}, true);

