$(document).ready(function () {
    $("#pview").on("click",function(){
        document.pform.action='patientView';
        document.pform.submit();
    });
});