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
        var ctype='';
        if(json.length>0){
            for(var i=0;i<json.length;i++){
                //cancerType += json[i].cancerType;
                ctype += json[i].cancerType;
                ctype +=',';
            	cancerType += "<span style='color:"+onco_colors[json[i].cancerType]+";'>"+json[i].cancerType+"</span>";
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

        AGE = json[0].age;
        if(json.length>1)AGE=json[1].age;
        SEX = sex;
        CANCERTYPE = ctype;
        CANCERTYPEDETAIL = cancerTypeDetail;
        ONCOTREECODE = cancerMode;

        // var txt = json[0].age + ' years old, ' + sex + ', ' + cancerTypeDetail + ', ' + cancerType + ', '+cancerMode;
        cancerType = "<span style='color:"+onco_colors[cancerType]+";'>"+cancerType+"</span>";
        var txt = json[0].age + ' years old ' + sex + ' ' + cancerType;
        // console.log('pat info ', txt);
        // $('.bio').html(txt);
        var pid = '<span id="patienthead" style="color:#3786C2;cursor:default">'+json[0].patientId+'</span>';
        $("#patientage").html(pid + '  '+txt);
    }

}