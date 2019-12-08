$(document).ready(function () {
   var patientList = new PatientList();
   patientList.init();
});
function PatientList() {
    var self = this;
    var action;
    var util;
    self.PS = [];

    self.init = function() {

        $("#search_pat").keyup(function (event) {
            event.preventDefault();
            var value = $(this).val();
            var temp=[];
                for (var i = 0; i < self.TABLE.length; i++) {
                    _.map(self.TABLE[i],function(v){
                        if(v===value){
                            temp.push(self.TABLE[i]);
                        }
                    });
                }
                console.log('includes', temp, value);
            if($.trim(temp).length===0)temp=self.TABLE;
            setData(temp,1);
        });

        action = new Action();
        util = new Util();
        util.showLoader();

        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientChoiceList"};
        ds_cond.callback = setData;
        action.selectList(ds_cond);


        $("#pat_con").on("click", "[id^='patientTr_']",function (e) {
            var pid = this.id.split("_")[1];
            var idx = _.findIndex(self.PS, pid);
            console.log(self.PS, pid);
            if(!_.includes(self.PS, pid))
              self.setPatientList(pid);
        });
        $("#patientList").on("click", "[id^='remove_']",function (e) {
            var pid = this.id.split("_")[1];
            self.PS.splice(idx,1);
            self.removePatientId(this);
        })

        $("#movePatientView").on("click", function(){
            console.log(self.PS);
            var q = '';
            if(self.PS.length<1)return;
            if(self.PS.length===0)q = self.PS[0];
            if(self.PS.length>0)var q = self.PS.join(",");
            //location.href='/patient/patientView?patient='+q;
            document.pform.patient.value = q;
            document.pform.submit();
        })

    }


    var setData = function(json,dirty) {
        json = _.uniq(json);
        console.log(json);
        if (json.length > 0) {
          var txt = '';
          for(var i=0;i<json.length;i++){
            txt+='<tr id="patientTr_'+json[i].patientId+'" style="cursor:pointer">\n' +
                '  <td>'+json[i].patientId+'</td>\n' +
                '  <td>'+json[i].sampleId+'</td>\n' +
                '  <td>'+json[i].age+'</td>\n' +
                '  <td>'+json[i].cancerStudy+'</td>\n' +
                '  <td>'+json[i].cancerType+'</td>\n' +
                '  <td>'+json[i].cancerTypeDetail+'</td>\n' +
                '  </tr>'
          }
        }
        //console.log(txt);
        $("#pat_con").empty();
        $("#pat_con").append(txt);
        var pager = new Pager();
        var el = $("#pat_pageview");
        var tpage = Math.ceil(json.length/10);
        pager.buildPage(1, tpage, el, self, json, null);

        if(_.isUndefined(dirty)){
            self.TABLE = json;
        }
        util.hideLoader();
    }

    self.setPatientList = function(patientId) {
        console.log(patientId);
        self.PS.push(patientId);
        var txt ='<li id="patientli_"'+patientId+' role="presentation"><a id="remove_'+patientId+'" href="#">'+patientId+' <span class="badge">X</span></a></li>'
        console.log(txt);
        $("#patientList").append(txt);
        return txt;
    }

    self.removePatientId = function(el) {
        //console.log("patientli_"+patientId);
        //$("#patientli_"+patientId+"").remove();
        $(el).parents('li').remove();
    }

 }