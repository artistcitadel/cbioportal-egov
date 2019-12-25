function Noop(){
    var self = this;
    self.movePage = function(page){
    document.pform.patient.value=patients;
    document.pform.pages.value=page;
    document.pform.patientId.value=patients.split(",")[parseInt(page)-1];
    PATIENTID = document.pform.patientId.value;
    console.log("PATIENTID ", PATIENTID);
    console.log(patients);
    document.pform.submit();
    }
}

$(document).ready(function () {
    getPatientDescription();

    $("#patientname").text(PATIENTID);
    var pager = new Pager();
    var sel = $("#summary_pageview");
    var udata = [];
    // var patients = document.pform.patient.value;
    // var pages = document.pform.pages.value;
    if(patients.indexOf(",")!==-1){
        var ps = patients.split(",");
        for(var i=0;i<ps.length;i++){
            udata.push(ps[i]);
        }
    }else{
        udata.push(patients);
    }

    // console.log(document.pform.pages.value);
    // console.log(document.pform.patient.value);
    var page = parseInt(document.pform.pages.value);
    var tpage = udata.length;
    //alert(udata.length + ' '+ page);

    pager.buildPage(page, tpage, sel, new Noop, udata, 'simple');

    function getPatientDescription(){
        var action = new Action();
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientDescription", "patientId": PATIENTID};
        ds_cond.callback = setPatientDescription;
        action.selectList(ds_cond);
    }

    function setPatientDescription(json){

        if(json.length<1)return;
        console.log('patientDesc ', json);
        var biocondition = json[0].deathYn === 'Y' ? 'survival' :'decease';
        var sex = json[0].sex === 'M' ? 'Male' :'Female';

        $("#patientage").text(json[0].patientId);

        var cancerType='';
        var cancerMode = '';
        var cancerTypeDetail='';
        if(json.length>0){
            for(var i=0;i<json.length;i++){
                cancerType += json[i].cancerType;
                cancerType+=',';
                cancerMode += json[i].cancerMode;
                cancerMode+=',';
                cancerTypeDetail += json[i].cancerTypeDetail;
                cancerTypeDetail+=',';
            }
            cancerType = cancerType.substring(0, cancerType.length-1);
            cancerMode = cancerMode.substring(0, cancerMode.length-1);
            cancerTypeDetail = cancerTypeDetail.substring(0, cancerTypeDetail.length-1);
        }

        var txt = json[0].age + ' years old, ' + sex + ', ' + cancerTypeDetail + ', ' + cancerType + ', '+cancerMode;
        $('.bio').html(txt);
    }

 });
