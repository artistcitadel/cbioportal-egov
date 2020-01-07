$(document).ready(function () {

    $("#pview").on("click",function(){
        //document.dform.submit();
        window.close();
    });
    $("#sview").on("click",function(){
        document.pform.action='patientResemble';
        moveTab();
    });

    var moveTab = function(){
        // document.pform.target = "_blank";
        document.pform.samples.value=samples;
        document.pform.samplespermutation.value=samplespermutation;
        document.pform.mutationcount.value=MUTATIOINCOUNT;
        document.pform.sex.value=SEX;
        document.pform.age.value=AGE;
        document.pform.cancertype.value=CANCERTYPE;
        document.pform.cancertypedetail.value=CANCERTYPEDETAIL;
        document.pform.oncotreecode.value=ONCOTREECODE;
        document.pform.submit();
    }

});