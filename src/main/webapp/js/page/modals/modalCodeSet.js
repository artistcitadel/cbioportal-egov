/**
 * 모달창 CodeSet
 * @Page : modalCodeSet
 */


var gvCodeSetList 	= [];			//전체코드
var gvCodeSetSelectedList 	= [];	//선택된 코드

var gvDataSourceCodeSet;
var gvDataSourceCodeSetSelected;

var gvDataAdapterCodeSet;
var gvDataAdapterCodeSetSelected;

var $args;

var jObj;

var query;

var strINSTCD;

/**
 * Application Ready
 */
$(document).ready(function(){	
	initEventCS();
});

//------------------------------------------------------------------------------------------
// CALLBACK	
//------------------------------------------------------------------------------------------
/**
 * callback 함수
 * @param svcId
 * @param result
 * @returns
 */
function serviceCallbackCS(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	switch(svcId){
		case "getCommonCodeList":		
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}
			}*/
			
			gvCodeSetList = result.dsCodeList;
			
			setGrid_codeSet();
			
			break;
			
		case "getCommonSelectedCodeList":
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeSelectedList.length; i++){
					result.dsCodeSelectedList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeSelectedList[i]['INSTCD']];
				}
			}*/
			
			gvCodeSetSelectedList = result.dsCodeSelectedList;
			
			setGrid_codeSet2();
			
			if(gvCodeSetSelectedList.length > 0){
				$("#jqxCodeSetSelectedList").jqxGrid('clearSelection', true);
			}
			
			break;
			
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------

function getCodeSetData(){
	$args = $('#args');
	
	jObj = JSON.parse($args.val());
	
	query = decodeURIComponent(jObj.CODE_SET);
	
	if(gvINSTCD == '030'){
		strINSTCD = gvINSTCDTemp2;
	}else{
		strINSTCD = "'"+ gvINSTCD +"'";
	}
	
	var searchWrd = $('#searchWrd').val();
	
	/*if(searchWrd){
		query = query.replace(/\#{CODE_NM}/gi, "'"+ searchWrd +"'");
	}else{
		query = query.replace(/\#{CODE_NM}/gi, "''");
	}*/
		
	
	var dataSet = {};
	var selQuery = query;
	
	
	
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		selQuery = replaceAll(selQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD IN (" + strINSTCD + ")");
		selQuery = replaceAll(selQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD IN (" + strINSTCD + ")");
		selQuery = replaceAll(selQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD IN (" + strINSTCD + ")");
		selQuery = replaceAll(selQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD IN (" + strINSTCD + ")");
		selQuery = replaceAll(selQuery, '${INSTCD}', '');
		/*dataSet.INSTCD = ", A.INSTCD";
		selQuery = selQuery.replace(/\${INSTCD}/gi,", A.INSTCD");*/
	}else{
		selQuery = replaceAll(selQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
		selQuery = replaceAll(selQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
		selQuery = replaceAll(selQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
		selQuery = replaceAll(selQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
		selQuery = replaceAll(selQuery, '${INSTCD}', '');
		//selQuery = selQuery.replace(/\${INSTCD}/gi,"");
	}
	dataSet.QUERY = selQuery;
	
	callServiceSpinnerClose("getCommonCodeList"
			,"common/modal/getCommonCodeList"
			,dataSet
			,"serviceCallbackCS");
	
	if(isNull(jObj.VALUE)){				//선택값이 없을때	
		setGrid_codeSet2();
		
		$('#jqxCodeSetSelectedList').jqxGrid('clear');
	}else{								//선택값이 있을때
		var obj = jObj.VALUE;
		var objValSplit = obj.split('|');
		var nQuery = decodeURIComponent(jObj.CODE_SET);
		var val = '';
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			
			for(var i=0; i<objValSplit.length; i++){
				val = val + "'" + objValSplit[i] + "',";
			}
			val = val.slice(0,-1);
			
			var selQuery = replaceAll(nQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD  IN (" + strINSTCD + ") AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD  IN (" + strINSTCD + ") AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD  IN (" + strINSTCD + ") AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD  IN (" + strINSTCD + ") AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery, '${INSTCD}', '');
			
			/*for(var i=0; i<objValSplit.length; i++){
				var objValSplitSplit = objValSplit[i].split('__');
				
				val = val + "'" + objValSplitSplit[0] + "^" + objValSplitSplit[1] + "',";
			}
			val = val.slice(0,-1);
			
			var selQuery = replaceAll(nQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery, '${INSTCD}', ', A.INSTCD');*/
		}else{	//사업장코드가 없을때
			for(var i=0; i<objValSplit.length; i++){
				val = val + "'" + objValSplit[i] + "',";
			}
			val = val.slice(0,-1);
			
			var selQuery = replaceAll(nQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND " + jObj.POPUP_COLUMN + " IN (" + val + ")");
		}
			
		var dataSet = {};
		
		dataSet.QUERY = selQuery;
		
		callService("getCommonSelectedCodeList"
				,"common/modal/getCommonSelectedCodeList"
				,dataSet
				,"serviceCallbackCS");
	}
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
/**
 * init함수
 * @returns
 */
function initCS()
{
	getCodeSetData();
	
	//initEventCS();
	
	
}

/**
 * Grid 초기화
 * @returns
 */
function setGrid_codeSet()
{
	$("#jqxCodeSetListCS").remove();
	$('#jqxCodeSetListCSArea').append('<div id="jqxCodeSetListCS"></div>');
	
	//사업장 코드가 있을때
	/*if(jObj.INSTCD_YN == "Y"){
		//$("#jqxCodeSetListCS").jqxGrid('destroy');
		var instcdFilterList;
		var codeFilterList;
		
		var datafields = [
		                { name: 'INSTCD', type:"string"},
		                { name: "INSTCDNM", type:"string"},
		      	    	{ name: 'CODE'},
		      	        { name: 'CODE_NM'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', filtertype: 'list', filteritems: gvArrInstcd, width: "20%",
		               		createfilterwidget: function (column, columnElement, widget) {
		                          instcdFilterList = widget;
		                    }
		               	},
		               	{text : "병원명",datafield : "INSTCDNM",width:"15%"},
			   	    	{ text: '코드', datafield: 'CODE', width: "30%",
			   	    		createfilterwidget: function (column, columnElement, widget) {
		                          codeFilterList = widget;
		                    }
		               	},
				        { text: '코드명', datafield: 'CODE_NM', width: "30%"}
				    ];
	}else{	//사업장코드가 없을때
*/		var datafields = [
	    	{ name: 'CODE', type:"string"},
	        { name: 'CODE_NM', type:"string"}
	    ];
		
		var columns = [
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "65%"}
				    ];
	/*}*/
	
	gvDataSourceCodeSet = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvCodeSetList
	};
	
	gvDataAdapterCodeSet = new $.jqx.dataAdapter(gvDataSourceCodeSet, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	var isFirst = true;
	
	$("#jqxCodeSetListCS").jqxGrid('clear');
	$("#jqxCodeSetListCS").jqxGrid({
	    source: gvDataAdapterCodeSet,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'checkbox',
		columnsresize: true,
		showfilterrow: true,
		filterable: true,
	    columns: columns,
	    rendered : function () {
	    	//사업장코드가 있을때 나의 사업장 자동필터
	    	/*if(jObj.INSTCD_YN == "Y"){
	    		//필터값 변경(최초한번만)
	    		if(isFirst){
	    			instcdFilterList.jqxDropDownList('selectItem', $.session.get('HOSPITAL_CODE'));
			    	
			    	//다른 필터 이벤트트리거
			    	var e = $.Event('keydown');
			    	
					e.keyCode= 13; // enter
			    	console.log('#'+codeFilterList[0]['id']);
			    	$('#'+codeFilterList[0]['id']).trigger(e);	
			    	isFirst=false;
	    		}
	    	}*/
        }
	});
	
	if(gvCodeSetSelectedList.length > 0){
		$("#jqxCodeSetListCS").jqxGrid('clearSelection', true);
	}
	
}

/**
 * Grid 초기화
 * @returns
 */
function setGrid_codeSet2()
{
	//사업장 코드가 있을때
	/*if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		      	    	{ name: 'CODE'},
		      	        { name: 'CODE_NM'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', width: "20%"},
		               	{text : "병원명",datafield : "INSTCDNM",width:"15%"},
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "30%"}
				    ];
	}else{	//사업장코드가 없을때
*/		var datafields = [
	    	{ name: 'CODE', type:"string"},
	        { name: 'CODE_NM', type:"string"}
	    ];
		
		var columns = [
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "65%"}
				    ];
	/*}*/
	
	gvDataSourceCodeSet2 = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvCodeSetSelectedList
	};
	
	gvDataAdapterCodeSet2 = new $.jqx.dataAdapter(gvDataSourceCodeSet2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#jqxCodeSetSelectedList").jqxGrid('clear');
	$("#jqxCodeSetSelectedList").jqxGrid({
	    source: gvDataAdapterCodeSet2,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'checkbox',
		columnsresize: true,
	    columns: columns
	});
	
}



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------

/**
 * 이벤트 초기화
 * @returns
 */
function initEventCS(){
	
	//코드 추가	
	$(document).on('click', '#selectItemCS', function(){
		var selPerinxRows 	= $('#jqxCodeSetListCS').jqxGrid('getselectedrowindexes');		//처방코드목록
		var selPerAuthRows 	= $('#jqxCodeSetSelectedList').jqxGrid('getrows');				//선택된 처방코드 목록
		
		for(var i=0; i< selPerinxRows.length; i++){
			var dsPerinx = $('#jqxCodeSetListCS').jqxGrid('getrowdata', selPerinxRows[i]);	//selPerinxRows[i] 선택된 로우의 index
			
			var flag = true;
			//중복체크	
			for(var j=0; j < selPerAuthRows.length; j++){
				var dsPerAuth = selPerAuthRows[j];
				
				//사업장 코드가 있을때
				/*if(jObj.INSTCD_YN == "Y"){
					if(dsPerAuth.INSTCD === dsPerinx.INSTCD){
						if(dsPerAuth.CODE === dsPerinx.CODE){
							//BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
							$('#jqxCodeSetListCS').jqxGrid('clearselection');
							flag = false;
							break;
						}
					}
				}else{	//사업장코드가 없을때
*/					if(dsPerAuth.CODE === dsPerinx.CODE){
						//BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
						$('#jqxCodeSetListCS').jqxGrid('clearselection');
						flag = false;
						break;
					}
				/*}*/
    		}
			
			if(flag){
				dsPerinx.ROW_STATE = 'C';
				
				$("#jqxCodeSetSelectedList").jqxGrid('addrow', null, dsPerinx);			
			}
			
		}
		
		$('#jqxCodeSetListCS').jqxGrid('clearselection');
		$("#jqxCodeSetListCS").jqxGrid('updatebounddata', 'cells');
		

		
	});
	
	//코드 삭제
	$(document).on('click', '#cancelItemCS', function(){
		var rows = $("#jqxCodeSetSelectedList").jqxGrid('selectedrowindexes');
        var selectedRecords = new Array();
        
        for(var i = (rows.length-1); i >= 0; i--) {
            var row = $("#jqxCodeSetSelectedList").jqxGrid('getrowdata', rows[i]);
            $("#jqxCodeSetSelectedList").jqxGrid('deleterow', row.uid);
        }
        
	});
	
	//조건 등록
	$('#submitCSBtn').on('click',function(e){
		var rows = $('#jqxCodeSetSelectedList').jqxGrid('getrows');
		var retObj = '';
		
		for(var i=0; i< rows.length; i++){
			var dsValue = rows[i];	//selPerinxRows[i] 선택된 로우의 index
			
			if(isNull(retObj)){
				//사업장 코드가 있을때
				/*if(jObj.INSTCD_YN == "Y"){
					retObj = dsValue.INSTCD +"__"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
*/					retObj = dsValue.CODE;
				/*}*/
				
			}else{
				//사업장 코드가 있을때
				/*if(jObj.INSTCD_YN == "Y"){
					retObj += '|' + dsValue.INSTCD +"__"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
*/					retObj += '|' + dsValue.CODE;
				/*}*/
				
			}
			
		}
		
		//넘길 값이 없을때 clear 넘김
		if(retObj == ""){
			retObj = "clear";
		}
		
		$("#result").val(retObj);
		
		
		
		$('#popCSModal').modal('hide');
		

		/*$("#jqxCodeSetListCS").jqxGrid('clear');
		$("#jqxCodeSetSelectedList").jqxGrid('clear');*/
		
	});
	
}




