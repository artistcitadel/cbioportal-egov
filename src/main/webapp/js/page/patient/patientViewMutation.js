//Functional Impact
//vs
//center
//variant reads(N)
//ref reads(N)

$(document).ready(function () {
    //getMutation();

    function getMutation() {
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientMuList", "patientId": '52089167'};
        ds_cond.callback = mutation_disposer;
        action.selectPatientMuList(ds_cond);
    }

    function mutation_disposer(json) {
        $("#mutation_con").empty();
        $("#mutation_template").tmpl(json).appendTo($("#con"));
        0
    }

});

