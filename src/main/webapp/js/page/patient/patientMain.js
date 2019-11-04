$(document).ready(function () {
    var url = "/resources/json/patient.json";
    // prepare the data
    var source =
        {
            datatype: "json",
            datafields: [
                { name: 'patientId', type: 'string' },
                { name: 'sampleId', type: 'string' },
                { name: 'age', type: 'string' },
                { name: 'cancerStudies', type: 'string' },
                { name: 'cancerType', type: 'string' },
                { name: 'cancerTypeDetails', type: 'string' },
            ],
            url : url,
            async:true
        };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#grid").jqxGrid(
        {
            width: getWidth('Grid'),
            source: dataAdapter,
            // pageable: true,
            // autoheight: true,
             sortable: true,
            // altrows: true,
            // enabletooltips: true,
            // editable: true,
            // selectionmode: 'multiplecellsadvanced',
            columns: [
                { text: 'Patient Id',  datafield: 'patientId', width: 150 },
                { text: 'Sample Id',  datafield: 'sampleId', width: 150 },
                { text: 'age',  datafield: 'age', width: 100, cellsalign: 'center' },
                { text: 'Cancer Studies',  datafield: 'cancerStudies', width: 150 },
                { text: 'Cancer Type',  datafield: 'cancerType', width: 150 },
                { text: 'Cancer Type Details',  datafield: 'cancerTypeDetails', width: 150 },
           ],

        });
});
