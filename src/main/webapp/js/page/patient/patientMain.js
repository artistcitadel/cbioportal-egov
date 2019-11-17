var action;
var util;
var PDATA;
var PIDX=0;
$(document).ready(function () {
    //var url = "/resources/json/patient.json";
    // prepare the data
    action = new Action();
    util = new Util();
    var ds_cond = {};
    ds_cond.data = {"qid":"selectPatientChoiceList"};
    ds_cond.callback = setData;
    action.selectList(ds_cond);

    $('#patientId, #sampleId, #age, #cancerStudies, #cancerType, #cancerTypeDetails').keyup(function (e) {
        //console.log(this.id, ' ',$(this).val());
        var id = this.id;
        var value = $(this).val();
        var temp = _.filter(PDATA, function(data){
            //console.log(data[id].indexOf(value));
            return data[id].indexOf(value)>-1;
        })
        //console.log(temp);
        setData(temp);
    });

    $('#grid').on('cellselect', function (event) {
        var columnheader = $("#grid").jqxGrid('getcolumn', event.args.datafield).text;
        //alert(event.args.datafield);
        //alert($("#grid").jqxGrid('getcellvalue', event.args.rowindex, 'patientId'));
        //alert("Row with bound index: " + event.args.rowindex +" has been clicked.");
        if(event.args.datafield==='patientId'){
            //alert($("#grid").jqxGrid('getcellvalue', event.args.datafield));
            var props={value:$("#grid").jqxGrid('getcellvalue', event.args.rowindex, 'patientId')};
            ////$("#patientList").append(getPatientRow(props));
            ////++PIDX;
            document.pform.patientId.value=props.value;
            document.pform.submit();
        }
    });

});

function setData(json){
    $('.spinner').hide();
    console.log(json);
    if(json.result.length>0) {
        var data = json.result;
        console.log(data);
        (PDATA == null) ? PDATA = data : PDATA;
        var source =
            {
                localdata: data,
                datafields: [
                    {name: 'patientId', type: 'string'},
                    {name: 'sampleId', type: 'string'},
                    {name: 'age', type: 'string'},
                    {name: 'cancerStudies', type: 'string'},
                    {name: 'cancerType', type: 'string'},
                    {name: 'cancerTypeDetails', type: 'string'},
                ],
                datatype: "array"
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#grid").jqxGrid(
            {
                width: getWidth('Grid'),
                source: dataAdapter,
                // pageable: true,
                autoheight: true,
                sortable: true,
                filterable: true,
                showfilterrow: true,
                // altrows: true,
                // enabletooltips: true,
                // editable: true,
                selectionmode: 'singlecell',
                columns: [
                    {text: 'Patient Id', datafield: 'patientId', width: 150},
                    {text: 'Sample Id', datafield: 'sampleId', width: 150},
                    {text: 'age', datafield: 'age', width: 100, cellsalign: 'center'},
                    {text: 'Cancer Studies', datafield: 'cancerStudies', width: 150},
                    {text: 'Cancer Type', datafield: 'cancerType', width: 150},
                    {text: 'Cancer Type Details', datafield: 'cancerTypeDetails', width: 150},
                ],
            });
        /*  $("div").on('click', '[id^=patientremove_]', function(e) {
              var idx = this.id.split("_")[1];
                removePatientRow(idx);
          });*/
    }
}

function getPatientRow(props){
    var txt =
      ' <div id= "patient_'+(PIDX)+'"  class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;width:min-content;"> \
          <div class="input-group" style="width:min-content"> \
            <input type="text" class="form-control input-sm" value="'+props.value+'" style="width:110px"> \
              <span class="input-group-btn"> \
                <button type="button" class="btn btn-default btn-sm" onClick="removePatientRow()"> \
                  <span class="glyphicon glyphicon-remove"></span> \
               </button> \
              </span> \
           </div> \
         </div> ';
    console.log(txt);
    return txt;
}

function removePatientRow(){
    console.log('ddd');
    $("#patient_"+(--PIDX)).remove();
}
