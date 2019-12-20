"use strict";

function Action() {
    var self = this;
    var gvSERVER  = gvServer;
    gvSERVER = '/pmp';
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

    self.cancerGeanList = function (props){
        $.ajax({
            type: "get",
            dataType: "json",
            cache: false,
            url: gvSERVER+"/proxy/geanList",
            contentType: "application/json",
            //data: JSON.stringify(props.data),
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
    self.getCancerGeanAnnotation = function (props){

        $.ajax({
            type: "post",
            dataType: "json",
            cache: false,
            url: gvSERVER+"/proxy/searchGean",
            contentType: "application/json",
            data: JSON.stringify(props),
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

    self.selectList = function (props) {
        $.ajax({
            type: "post",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: gvSERVER+"/patient/selectList",
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

    self.selectEventList = function (props) {
        $.ajax({
            type: "post",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: gvSERVER+"/patient/selectEventList",
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

    self.selectPatientMuList = function (props) {

        $.ajax({
            type: "post",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: gvSERVER+"/patient/selectPatientMuList",
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
