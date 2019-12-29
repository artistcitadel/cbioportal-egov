/**
 * @author 오세영
 */



function PatientView(){
   var self = this;
   self.getPatientDescription = function (){
        var action = new Action();
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientDescription", "patientId": PATIENTID};
        ds_cond.callback = setPatientDescription;
        action.selectList(ds_cond);
    }

    function setPatientDescription(json){
        console.log('setPatientDescription', json);
        if(json.length<1)return;
        // console.log('patientDesc ', json);
        var biocondition = json[0].deathYn === 'Y' ? 'survival' :'decease';
        var sex = json[0].sex === 'M' ? 'Male' :'Female';

        // $("#patientage").text(json[0].patientId);

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
        // console.log('pat info ', txt);
        // $('.bio').html(txt);
        $("#patientage").text(json[0].patientId + ' , '+txt);
    }


}