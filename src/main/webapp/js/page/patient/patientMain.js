var PDATA;
$(document).ready(function () {
    //var url = "/resources/json/patient.json";
    // prepare the data
    var action = new Action();
    var ds_cond = {};
    ds_cond.data = {};
    ds_cond.callback = setData;
    action.getPatientList(ds_cond);

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
});

function setData(data){
    console.log(data);
    (PDATA == null) ? PDATA = data: PDATA;
    var source =
        {
            localdata: data,
            datafields: [
                { name: 'patientId', type: 'string' },
                { name: 'sampleId', type: 'string' },
                { name: 'age', type: 'string' },
                { name: 'cancerStudies', type: 'string' },
                { name: 'cancerType', type: 'string' },
                { name: 'cancerTypeDetails', type: 'string' },
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
            // altrows: true,
            // enabletooltips: true,
            // editable: true,
             selectionmode: 'multiplecellsadvanced',
            columns: [
                { text: 'Patient Id',  datafield: 'patientId', width: 150 },
                { text: 'Sample Id',  datafield: 'sampleId', width: 150 },
                { text: 'age',  datafield: 'age', width: 100, cellsalign: 'center' },
                { text: 'Cancer Studies',  datafield: 'cancerStudies', width: 150 },
                { text: 'Cancer Type',  datafield: 'cancerType', width: 150 },
                { text: 'Cancer Type Details',  datafield: 'cancerTypeDetails', width: 150 },
            ],
        });

}
