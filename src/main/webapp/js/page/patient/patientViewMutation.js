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
        ds_cond.callback = setMut;
        action.selectPatientMuList(ds_cond);
    }

    function setMut(json) {
        var data= [];
        //if(json.length>0){
           /* _.forEach(json, function(v) {
                var item = {};
                item.mttnExamRsltId = v.mttnExamRsltId;
                item.reschPatId = v.reschPatId;
                item.geneExamSpcnId = v.geneExamSpcnId;
                item.examNo = v.examNo;
                item.geneExamMthNm = v.geneExamMthNm;
                item.chrnNo = v.chrnNo;
                item.geneNm = v.geneNm;
                data.push(item);
            });*/
        //}
        //console.log(data);
        var source =
            {
                localdata: json,
                dataFields: [
                    {name: 'mttnExamRsltId', type: 'string'},
                    {name: 'reschPatId', type: 'string'},
                    {name: 'geneExamSpcnId', type: 'string'},
                    {name: 'examNo', type: 'string'},
                    {name: 'geneExamMthNm', type: 'string'},
                    {name: 'chrnNo', type: 'string'},
                    {name: 'geneNm', type: 'string'},
                    {name: 'geneVariStLocVal', type: 'string'},
                    {name: 'geneVariEndLocVal', type: 'string'},
                    {name: 'dnaStandVal', type: 'string'},
                    {name: 'geneVariClsfNm', type: 'string'},
                    {name: 'geneVariTypNo', type: 'string'},
                    {name: 'refAlleleSqncVal', type: 'string'},
                    {name: 'variAlleleSqncVal', type: 'string'},
                    {name: 'mttnStatNo', type: 'string'},
                    {name: 'hgvscVal', type: 'string'},
                    {name: 'hgvspVal', type: 'string'},
                    {name: 'totAlleleReadCnt', type: 'string'},
                    {name: 'refAlleleReadCnt', type: 'string'},
                    {name: 'variAlleleReadCnt', type: 'string'},
                    {name: 'variAlleleReadRt', type: 'string'},
                    {name: 'exonLocVal', type: 'string'},
                    {name: 'intrnLocVal', type: 'string'},
                    {name: 'trscId', type: 'string'}

                ],
                datatype: "array"
            };

        var dataAdapter = new $.jqx.dataAdapter(source);
        // var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
        //
        //     $("#"+columnfield).jqxTooltip({ content: '<b>Title:</b> <i>The Amazing Spider-man</i><br /><b>Year:</b> 2012', position: 'mouse', name: 'movieTooltip'});
        //
        // }
        $("#dataTableMu").jqxDataTable(
            {
                //width: getWidth("dataTable"),
                //width: getWidth("dataTable"),
                width: getWidth("dataTable")+300,
                source: dataAdapter,
                pageable: true,
                sortable: true,
                // pageable: true,
                // sortable: true,
                // pagerButtonsCount: 10,
                // //altRows: true,
                // filterable: true,
                 height: 400,
                columnsResize: true,
                enableHover:true,
                // filterMode: 'simple',
                columns: [
                    { text: '병원등록번호', cellsAlign: 'center', align: 'center', dataField: 'mttnExamRsltId', width: 130},
                    { text: '유전자검사검체ID',  cellsAlign: 'center', align: 'center', dataField: 'geneExamSpcnId', width: 130},
                    { text: '검사번호',  dataField: 'examNo',  cellsAlign: 'center', align: 'center', width: 100},
                    { text: '유전자검사방법명',  dataField: 'geneExamMthNm', align: 'center', cellsAlign: 'center', width: 120},
                    { text: '염색체번호', cellsAlign: 'center', align: 'center', dataField: 'chrnNo', width: 80},
                    { text: '유전자명', cellsAlign: 'left', align: 'left', dataField: 'geneNm' , width: 80},
                    { text: '유전자변이시작위치값',  cellsAlign: 'right', align: 'center', dataField: 'geneVariStLocVal' , width: 150},
                    { text: '유전자변이종료위치값', cellsAlign: 'right', align: 'center', dataField: 'geneVariEndLocVal' , width: 150},
                    { text: 'DNA가닥값',  cellsAlign: 'center', align: 'center', dataField: 'dnaStandVal' , width: 90},
                    { text: '유전자변이분류명',  cellsAlign: 'center', align: 'center', dataField: 'geneVariClsfNm' , width: 140},
                    { text: '유전자변이유형번호',  cellsAlign: 'center', align: 'center', dataField: 'geneVariTypNo' , width: 140},
                    { text: '참조대립유전자염기서열값',  cellsAlign: 'center', align: 'center', dataField: 'refAlleleSqncVal' , width: 150},
                    { text: '변이대립유전자염기서열값', cellsAlign: 'center', align: 'center', dataField: 'variAlleleSqncVal' , width: 150},
                    { text: '돌연변이상태번호',  cellsAlign: 'center', align: 'center', dataField: 'mttnStatNo', width: 100 },
                    { text: 'HGVSC값',  cellsAlign: 'left', align: 'center', dataField: 'hgvscVal' , width: 110},
                    { text: 'HGVSP값',  cellsAlign: 'left', align: 'center', dataField: 'hgvspVal' , width: 110},
                    { text: '총대립유전자리드수',  cellsAlign: 'center', align: 'center', dataField: 'totAlleleReadCnt', width: 150 },
                    { text: '참조대립유전자리드수',  cellsAlign: 'center', align: 'center', dataField: 'refAlleleReadCnt' , width: 150},
                    { text: '변이대립유전자리드수',  cellsAlign: 'center', align: 'center', dataField: 'variAlleleReadCnt' , width: 150},
                    { text: '변이대립유전자리드비율', cellsAlign: 'center', align: 'center', dataField: 'variAlleleReadRt' , width: 120},
                    { text: '엑손위치값', cellsAlign: 'center', align: 'center', dataField: 'exonLocVal' , width: 80},
                    { text: '인트론위치값',cellsAlign: 'center', align: 'center', dataField: 'intrnLocVal' , width: 80},
                    { text: '전사체ID', cellsAlign: 'left', align: 'center', dataField: 'trscId' , width: 140},

                ]
            });
    }

});

