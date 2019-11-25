$(document).ready(function () {
    getMutation();

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

        $("#dataTableMu").jqxDataTable(
            {
                width: getWidth("dataTableMu"),
                source: dataAdapter,
                pageable: true,
                sortable: true,
                pagerButtonsCount: 10,
                altRows: true,
                filterable: true,
                height: 400,
                filterMode: 'simple',
                columns: [
                    { text: '병원등록번호', cellsAlign: 'center', align: 'center', dataField: 'mttnExamRsltId'},
                    { text: '유전자검사검체ID',  cellsAlign: 'center', align: 'center', dataField: 'geneExamSpcnId'},
                    { text: '검사번호',  dataField: 'examNo',  cellsAlign: 'center', align: 'center'},
                    { text: '유전자검사방법명',  dataField: 'geneExamMthNm', align: 'center', cellsAlign: 'center'},
                    { text: '염색체번호', cellsAlign: 'center', align: 'center', dataField: 'chrnNo'},
                    { text: '유전자명', cellsAlign: 'center', align: 'center', dataField: 'geneNm' },
                   /* { text: '유전자변이시작위치값',  cellsAlign: 'center', align: 'center', dataField: 'geneVariStLocVal' },
                    { text: '유전자변이종료위치값', cellsAlign: 'center', align: 'center', dataField: 'geneVariEndLocVal' },
                    { text: 'DNA가닥값',  cellsAlign: 'center', align: 'center', dataField: 'dnaStandVal' },
                    { text: '유전자변이분류명',  cellsAlign: 'center', align: 'center', dataField: 'geneVariClsfNm' },
                    { text: '유전자변이유형번호',  cellsAlign: 'center', align: 'center', dataField: 'geneVariTypNo' },
                    { text: '참조대립유전자염기서열값',  cellsAlign: 'center', align: 'center', dataField: 'refAlleleSqncVal' },
                    { text: '변이대립유전자염기서열값', cellsAlign: 'center', align: 'center', dataField: 'variAlleleSqncVal' },
                    { text: '돌연변이상태번호',  cellsAlign: 'center', align: 'center', dataField: 'mttnStatNo' },
                    { text: 'HGVSC값',  cellsAlign: 'center', align: 'center', dataField: 'hgvscVal' },
                    { text: 'HGVSP값',  cellsAlign: 'center', align: 'center', dataField: 'hgvspVal' },
                    { text: '총대립유전자리드수',  cellsAlign: 'center', align: 'center', dataField: 'totAlleleReadCnt' },
                    { text: '참조대립유전자리드수',  cellsAlign: 'center', align: 'center', dataField: 'refAlleleReadCnt' },
                    { text: '변이대립유전자리드수',  cellsAlign: 'center', align: 'center', dataField: 'variAlleleReadCnt' },
                    { text: '변이대립유전자리드비율', cellsAlign: 'center', align: 'center', dataField: 'variAlleleReadRt' },
                    { text: '엑손위치값', cellsAlign: 'center', align: 'center', dataField: 'exonLocVal' },
                    { text: '인트론위치값',cellsAlign: 'center', align: 'center', dataField: 'intrnLocVal' },
                    { text: '전사체ID', cellsAlign: 'center', align: 'center', dataField: 'trscId' }*/
                ]
            });
    }

});

