"use strict";

function Action() {
    var self = this;

    self.getPatientList = function (props) {
        $.ajax({
            type: "get",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: "http://localhost:4000/data",
            contentType: "application/json",
            data: JSON.stringify(props.data),
            //callback: disposer,
            //timeout: 10000,
            success: function (json) {
                props.callback(json);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    self.getPatientView = function (props) {
        $.ajax({
            type: "post",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: gvSERVER+"/patient/selectPatientView",
            contentType: "application/json",
            data: JSON.stringify(props.data),
            callback: props.disposer,
            //timeout: 10000,
            success: function (json) {
                props.callback(json);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }
}
