/**
 * 모달창 1H
 * @Page : modal1H
 */
var gv1HList 	= [];			//전체코드
var gv1HSelectedList 	= [];	//선택된 코드

var gvDataSource1H;
var gvDataSource1HSelected;

var gvDataAdapter1H;
var gvDataAdapter1HSelected;

var $args;
var jObj;
var query;


var instcdFilterList = "";
var codeFilterList = "";


/**
 * Application Ready
 */
$(document).ready(function(){	
	initEvent1H();
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
function serviceCallback1H(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeList":
			console.log(result);	
			
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}

				console.log($.session.get('HOSPITAL_CODE'));
				
			}
			
			gv1HList = result.dsCodeList;
			
			setGrid_1H();
			
			break;
			
		case "getCommonSelectedCodeList":
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeSelectedList.length; i++){
					result.dsCodeSelectedList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeSelectedList[i]['INSTCD']];
				}
			}
			
			gv1HSelectedList = result.dsCodeSelectedList;
			
			setGrid_1H2();
			
			break;
			
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

/**
 * grid setting
 * @returns
 */
function get1HData(){
	$args = $('#args');
	
	jObj = JSON.parse($args.val());
	
	query = decodeURIComponent(jObj.CODE_SET);
	
	//jObj.INSTCD_YN = "Y";
	
	var searchWrd = $('#searchWrd').val();
	
	if(searchWrd){
		query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
	}else{
		query = query.replace('#{CODE_NM}',"''");
	}
		
	
	var dataSet = {};
	
	var replaceQuery = query;
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		dataSet.INSTCD = ", A.INSTCD";
		replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
	}
	dataSet.QUERY = replaceQuery;
	
	callServiceSpinnerClose("getCommonCodeList"
			,"common/modal/getCommonCodeList"
			,dataSet
			,"serviceCallback1H");
	
	if(isNull(jObj.VALUE)){				//선택값이 없을때	
		gv1HSelectedList 	= [];
		setGrid_1H2();
	}else{								//선택값이 있을때
		var obj = jObj.VALUE;
		var objValSplit = obj.split('|');
		var val = '';
		var nQuery = decodeURIComponent(jObj.CODE_SET);
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			
			for(var i=0; i<objValSplit.length; i++){
				var objValSplitSplit = objValSplit[i].split('__');
				
				val = val + "'" + objValSplitSplit[0] + "^" + objValSplitSplit[1] + "',";
			}
			val = val.slice(0,-1);
			
			var selQuery = replaceAll(nQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD || '^' || " + jObj.POPUP_COLUMN + " IN (" + val + ")");
			selQuery = replaceAll(selQuery, '${INSTCD}', ', A.INSTCD');
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
				,"serviceCallback1H");
	}
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
/**
* init함수
* @returns
*/
function init1H()
{
	get1HData();
	
	//initEvent1H();
	
}

/**
 * Grid 초기화
 * @returns
 */
function setGrid_1H()
{
	
	if(jObj.INSTCD_YN == "Y"){
		
		var datafields = [
		                { name: 'INSTCD', type:"string"},
		                { name: "INSTCDNM", type:"string"},
		      	    	{ name: 'CODE'},
		      	        { name: 'CODE_NM'}
		      	    ];
		
		var columns = [
		               	{text : "병원구분코드",datafield : "INSTCD", filtertype: 'list', filteritems: gvArrInstcd, width:"20%",
		               		createfilterwidget: function (column, columnElement, widget) {
		                          instcdFilterList = widget;
		                    }
		               	},
			            {text : "병원명",datafield : "INSTCDNM", filtertype: 'list', filteritems: gvArrInstcdKor, width:"15%"},
			   	    	{ text: '코드', datafield: 'CODE', width: "30%",
			   	    		createfilterwidget: function (column, columnElement, widget) {
		                          codeFilterList = widget;
		                    }
			            },
				        { text: '코드명', datafield: 'CODE_NM', width: "30%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
	    	{ name: 'CODE'},
	        { name: 'CODE_NM'}
	    ];
		
		var columns = [
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "65%"}
				    ];
	}
	
	gvDataSource1H = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gv1HList
	};
	
	gvDataAdapter1H = new $.jqx.dataAdapter(gvDataSource1H, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	var isFirst = true;
	$("#search1HGrid").jqxGrid('clear');
	$("#search1HGrid").jqxGrid({
	    source: gvDataAdapter1H,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'checkbox',
		showfilterrow: true,
		filterable: true,
	    columns: columns,
	    rendered : function () {
	    	//사업장코드가 있을때 나의 사업장 자동필터
	    	if(jObj.INSTCD_YN == "Y"){
		    	//필터값 변경
	    		if(isFirst){
	    			console.log($.session.get('HOSPITAL_CODE'));
		    		var HOSPITAL_CODE = String($.session.get('HOSPITAL_CODE'));
		    		//instcdFilterList.jqxDropDownList('val', HOSPITAL_CODE);
			    	
			    	//다른 필터 이벤트트리거
			    	var e = $.Event('keydown');
					e.keyCode= 13; // enter
			    	console.log('#'+codeFilterList[0]['id']);
			    	$('#'+codeFilterList[0]['id']).trigger(e);
			    	
			    	isFirst = false;
	    		}
	    		
	    	}
        }
	});

}

/**
 * Grid 초기화
 * @returns
 */
function setGrid_1H2()
{
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		      	    	{ name: 'CODE'},
		      	        { name: 'CODE_NM'}
		      	    ];
		
		var columns = [
		               	{text : "병원구분코드",datafield : "INSTCD",width:"20%"},
			            {text : "병원명",datafield : "INSTCDNM",width:"15%"},
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "30%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
	    	{ name: 'CODE'},
	        { name: 'CODE_NM'}
	    ];
		
		var columns = [
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "65%"}
				    ];
	}
	
	gvDataSource1H2 = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gv1HSelectedList
	};
	
	gvDataAdapter1H2 = new $.jqx.dataAdapter(gvDataSource1H2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelect1HGrid").jqxGrid('clear');
	$("#searchSelect1HGrid").jqxGrid({
	    source: gvDataAdapter1H2,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'checkbox',
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
function initEvent1H(){
	
	//코드 추가	
	$(document).on('click', '#selectItem1H', function(){
		var selPerinxRows 	= $('#search1HGrid').jqxGrid('getselectedrowindexes');		//처방코드목록
		var selPerAuthRows 	= $('#searchSelect1HGrid').jqxGrid('getrows');				//선택된 처방코드 목록
		
		for(var i=0; i< selPerinxRows.length; i++){
			var dsPerinx = $('#search1HGrid').jqxGrid('getrowdata', selPerinxRows[i]);	//selPerinxRows[i] 선택된 로우의 index
			
			var flag = true;
			//중복체크	
			for(var j=0; j < selPerAuthRows.length; j++){
				var dsPerAuth = selPerAuthRows[j];
				
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					if(dsPerAuth.INSTCD === dsPerinx.INSTCD){
						if(dsPerAuth.CODE === dsPerinx.CODE){
							//BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
							$('#search1HGrid').jqxGrid('clearselection');
							flag = false;
							break;
						}
					}
				}else{	//사업장코드가 없을때
					if(dsPerAuth.CODE === dsPerinx.CODE){
						//BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
						$('#search1HGrid').jqxGrid('clearselection');
						flag = false;
						break;
					}
				}
    		}
			
			
			
			if(flag){
				dsPerinx.ROW_STATE = 'C';
				
				$("#searchSelect1HGrid").jqxGrid('addrow', null, dsPerinx);			
			}
			
		}
		
		$('#search1HGrid').jqxGrid('clearselection');
		$("#search1HGrid").jqxGrid('updatebounddata', 'cells');

		
	});
	
	//코드 삭제
	$(document).on('click', '#cancelItem1H', function(){
		var rows = $("#searchSelect1HGrid").jqxGrid('selectedrowindexes');
        var selectedRecords = new Array();
        
        for(var i = (rows.length-1); i >= 0; i--) {
            var row = $("#searchSelect1HGrid").jqxGrid('getrowdata', rows[i]);
            $("#searchSelect1HGrid").jqxGrid('deleterow', row.uid);
        }
        
	});
	
	//조건 등록
	$('#submit1HBtn').on('click',function(e){
		var rows = $('#searchSelect1HGrid').jqxGrid('getrows');
		var retObj = '';
		
		for(var i=0; i< rows.length; i++){
			var dsValue = rows[i];	//selPerinxRows[i] 선택된 로우의 index
			
			if(isNull(retObj)){
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					retObj = dsValue.INSTCD +"__"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
					retObj = dsValue.CODE;
				}
				
			}else{
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					retObj += '|' + dsValue.INSTCD +"__"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
					retObj += '|' + dsValue.CODE;
				}
				
			}
			
		}
		
		//넘길 값이 없을때 clear 넘김
		if(retObj == ""){
			retObj = "clear";
		}
		
		$("#result").val(retObj);
		
		$('#pop1HModal').modal('hide');
		
	});
	
}




