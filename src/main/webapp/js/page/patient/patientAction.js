/**
 * @author 오세영
 */

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
            headers: {
                Bearer: 'ca94ed72-6380-4f16-ab74-a573874781db'
            },
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
    self.getCancerGeanAnnotation = function (props, node){
        $.ajax({
            type: "post",
            headers: {
                Bearer: 'ca94ed72-6380-4f16-ab74-a573874781db'
            },
            dataType: "json",
            cache: false,
            url: gvSERVER+"/proxy/searchGean",
            contentType: "application/json",
            data: JSON.stringify(props),
            callback: props.disposer,
            //timeout: 10000,
            success: function (json) {
                props.callback(json,node);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }
    self.getEvidence = function (props, data){
        $.ajax({
            type: "post",
            dataType: "json",
            cache: false,
            url: gvSERVER+"/proxy/searchEvidence",
            contentType: "application/json",
            data: JSON.stringify(props.body),
            callback: props.disposer,
            timeout: 10000,
            success: function (json) {
                props.callback(json, data);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    self.getCivic = function (props){

        $.ajax({
            type: "post",
            dataType: "json",
            // cache: false,
           url: gvSERVER+"/proxy/searchCivic",
           //  url: 'https://civicdb.org/api/genes/' + props.ids,
            contentType: "application/json",
            data: JSON.stringify(props),
            callback: props.disposer,
            timeout: 10000,
            success: function (json) {
              //  console.log(json);
                props.callback(json);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    self.getVarient = function(props){
        $.ajax({
            type: "post",
            dataType: "json",
            // cache: false,
            url: gvSERVER+"/proxy/searchCivicVarient",
            contentType: "application/json",
            data: JSON.stringify(props),
            callback: props.disposer,
            timeout: 10000,
            success: function (json) {
                //  console.log(json);
                props.callback(json, props);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    self.selectPatientz = function (props) {
    	console.log('self.selectPatientz ', props);
        $.ajax({
            type: "post",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: gvSERVER+"/patient/selectPatientz",
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
            timeout: 10000,
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
            timeout: 10000,
            success: function (json) {
                props.callback(json);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    self.selectPatientMuList = function (props, arg) {

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
                props.callback(json, arg);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    self.regBrc = function (props){
        $.ajax({
            type: "post",
            /*headers: {
                Authorization: apiKey
            },*/
            dataType: "json",
            cache: false,
            url: gvSERVER+"/patient/regBrc",
            contentType: "application/json",
            data: JSON.stringify(props.data),
            callback: props.disposer,
            //timeout: 10000,
            success: function (json) {
                props.callback(json, arg);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

}
