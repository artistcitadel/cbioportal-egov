/**
 * 모달창 2H
 * @Page : modal2H
 */
var gv2HList 	= [];			//코드
var gvSelect2HList 	= [];		//선택된 코드

var gvDataSource2H;
var gvDataSourceSelect2H;

var gvDataAdapter2H;
var gvDataAdapterSelect2H;

var INPUT_1H;
var objVal2H;// = "031__2017^031__0000|031__0006|031__0009";

var item_seq2H;
var item_cate_seq2H;
var item_cateDetl_seq2H;

var $args;
var jObj;
var query;

/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent2H();
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
function serviceCallback2H(svcId, result){
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
			}
			
			gv2HList = result.dsCodeList;
			
			setGrid2H();
			
			$('#search2HGrid').jqxGrid('clearselection');
			
			//넘어온 값체크
			/*var $args = $('#args');	
			var jObj = JSON.parse($args.val());	
			var query = decodeURIComponent(jObj.CODE_SET);*/	
			var searchWrd = $('#searchWrd').val();
			
			console.log(query);
			
			if(searchWrd){
				query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
			}else{
				query = query.replace('#{CODE_NM}',"''");
			}
			
			
			//넘어온값 받음
			objVal2H = jObj.VALUE;
			
			if(isNull(objVal2H)){					//넘어온 값이 없을때
				setGrid2HSelect();
			}else{								//넘어온 값이 있을때
				var objVal2HSplit = objVal2H.split(gvSplitChar);
				var dataSet = {};	
				var val = '';
				var nQuery = decodeURIComponent(jObj.CODE_SET);
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					
					//var objValSplitSplit = objVal2HSplit[0].split('__');
					//val = val + "'" + objValSplitSplit[0] + "^" + objValSplitSplit[1] + "'";
					
					var objVal2HSplitSplit = objVal2HSplit[0].split('__');
					var replaceQuery = replaceAll(nQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD = '" + objVal2HSplitSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD = '" + objVal2HSplitSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD = '" + objVal2HSplitSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD = '" + objVal2HSplitSplit[0] + "'");
					//var replaceQuery = query;
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
					
					dataSet.QUERY 		= replaceQuery;
					dataSet.INPUT_1H 	= objVal2HSplitSplit[1];
					INPUT_1H = objVal2HSplitSplit[1];
				}else{					
					var replaceQuery = replaceAll(nQuery,"#{CODE_NM}", "''");
					dataSet.QUERY 		= replaceQuery;
					dataSet.INPUT_1H 	= objVal2HSplit[0];
					INPUT_1H = objVal2HSplit[0];
				}
					
				callServiceSpinnerClose("getCommonSelectedCodeListVal"
						,"common/modal/getCommonSelectedCodeList"
						,dataSet
						,"serviceCallback2H");
			}
			
			break;
			
		case "getCommonSelectedCodeListVal":
			console.log(result);
			gvSelect2HList = result.dsCodeSelectedList;
			
			setGrid2HSelect();
			
			if(gvSelect2HList.length > 0){
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal2HSplit = objVal2H.split(gvSplitChar);
				var selSelect2HRows = $('#searchSelect2HGrid').jqxGrid('getdatainformation').rowscount;
				var sel2HRows = $('#search2HGrid').jqxGrid('getdatainformation').rowscount;
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var objVal2HSplitVal = objVal2HSplit[0].split('__');	//1H코드 사업장코드와 분리
					var objVal2HSplitValInstcd = objVal2HSplitVal[0];		//1H사업장코드
					var sel2HRowsChk = objVal2HSplitVal[1];		//1H코드
					var objVal2HSplitSplit = objVal2HSplit[1].split('|');	//선택한 코드
				}else{
					var sel2HRowsChk = objVal2HSplit[0];		//1H코드
					var objVal2HSplitSplit = objVal2HSplit[1].split('|');	//선택한 코드
				}

				for(var i=0; i< sel2HRows; i++){		//코드조회/선택 체크
					var dsGetrowdata = $('#search2HGrid').jqxGrid('getrowdata', i);	//sel2HRows[i] 선택된 로우의 index
					
					//사업장코드가 있을때
					if(jObj.INSTCD_YN == "Y"){
						//체크	
						if(objVal2HSplitValInstcd === dsGetrowdata.INSTCD){
							if(sel2HRowsChk === dsGetrowdata.CODE){
								$("#search2HGrid").jqxGrid('selectrow', i);
							}
						}
					}else{
						//체크	
						if(sel2HRowsChk === dsGetrowdata.CODE){
							$("#search2HGrid").jqxGrid('selectrow', i);
						}
					}
				}
				
				for(var i=0; i< selSelect2HRows; i++){		//선택한코드 체크
					var dsGetrowdata = $('#searchSelect2HGrid').jqxGrid('getrowdata', i);	//selSelect2HRows[i] 선택된 로우의 index
					
					//체크	
					for(var j=0; j < objVal2HSplitSplit.length; j++){
						
						//사업장코드가 있을때
						if(jObj.INSTCD_YN == "Y"){
							var objVal2HSplitSplitSplit = objVal2HSplitSplit[j].split('__');	//선택된 코드 사업장번호와 분리
							
							if(objVal2HSplitSplitSplit[0] === dsGetrowdata.INSTCD){
								if(objVal2HSplitSplitSplit[1] === dsGetrowdata.CODE){
									$("#searchSelect2HGrid").jqxGrid('selectrow', i);
								}
							}
						}else{
							if(objVal2HSplitSplit[j] === dsGetrowdata.CODE){
								$("#searchSelect2HGrid").jqxGrid('selectrow', i);
							}
						}
					}
				}
				
			}
			//다른 중위코드 선택시 동일코드 선택안되게 초기화함
			objVal2H = "";

			break;
			
		case "getCommonSelectedCodeList":
			console.log(result);
			

			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeSelectedList.length; i++){
					result.dsCodeSelectedList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeSelectedList[i]['INSTCD']];
				}
			}
			
			
			gvDataSourceSelect2H.localdata = result.dsCodeSelectedList;
			
			$('#searchSelect2HGrid').jqxGrid('clearselection');
			
			$("#searchSelect2HGrid").jqxGrid('clear');			
			$("#searchSelect2HGrid").jqxGrid('updatebounddata', 'cells');
			
			break;
			
		case "getUpperCommonCodeList":
			console.log(result.dsUpperCommonCodeList);
			
			var searchWrd = $('#searchWrd').val();
			var queryUpper = result.dsUpperCommonCodeList[0]['CODE_SET'];
			
			if(searchWrd){
				queryUpper = queryUpper.replace('#{CODE_NM}',"'"+ searchWrd +"'");
			}else{
				queryUpper = queryUpper.replace('#{CODE_NM}',"''");
			}

			queryUpper = replaceAll(queryUpper, '${INSTCD}', ', A.INSTCD');
			
			var dataSet = {};
			dataSet.QUERY	= queryUpper;
			console.log(queryUpper);
			
			if(isNull(objVal2H)){					//넘어온 값이 없을때
				callServiceSpinnerClose("getCommonCodeList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback2H");
			}else{
				callService("getCommonCodeList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback2H");
			}
			
			break;
			
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 키워드검색조회
 * @returns
 */
function getData2H(){
	
	/*$args = $('#args');	
	jObj = JSON.parse($args.val());	
	query = decodeURIComponent(jObj.CODE_SET);	*/
	var searchWrd = $('#searchWrd').val();
	
	if(searchWrd){
		query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
	}else{
		query = query.replace('#{CODE_NM}',"''");
	}
		
	
	var dataSet = {};
	
	dataSet.ID 					= '2H';
	dataSet.item_seq 			= item_seq2H;
	dataSet.item_cate_seq 		= item_cate_seq2H;
	dataSet.item_cateDetl_seq 	= item_cateDetl_seq2H;
	
	
	callService("getUpperCommonCodeList"
			,"common/modal/getUpperCommonCodeList"
			,dataSet
			,"serviceCallback2H");
	
	
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init2H()
{
	$args = $('#args');	
	jObj = JSON.parse($args.val());	
	query = decodeURIComponent(jObj.CODE_SET);
	//jObj.INSTCD_YN = "Y";
	
	//코드받아오기
	getCode2H();
	
	getData2H();
	
	//initEvent2H();
}

//코드받아오기
function getCode2H(){
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());	*/
	
	item_cateDetl_seq2H		= jObj.ITEM_CATE_DETL_SEQ;
	item_seq2H				= jObj.ITEM_SEQ;
	item_cate_seq2H 		= jObj.ITEM_CATE_SEQ;
}

/**
 * grid setting
 * @returns
 */
function setGrid2H()
{
	
	if(jObj.INSTCD_YN == "Y"){
		$("#search2HGrid").remove();
		$('#search2HGridArea').append('<div id="search2HGrid"></div>');
		
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
		               	{text : "병원명",datafield : "INSTCDNM", filtertype: 'list', filteritems: gvArrInstcdKor, width:"15%"},
			   	    	{ text: '코드', datafield: 'CODE', width: "35%",
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
				        { text: '코드명', datafield: 'CODE_NM', width: "70%"}
				    ];
	}
	
	gvDataSource2H = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gv2HList
	};
	
	gvDataAdapter2H = new $.jqx.dataAdapter(gvDataSource2H, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#search2HGrid").jqxGrid('clear');
	$("#search2HGrid").jqxGrid({
	    source: gvDataAdapter2H,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'singlerow',
		columnsresize: true,
		showfilterrow: true,
		filterable: true,
	    columns: columns,
	    rendered : function () {
	    	//사업장코드가 있을때 나의 사업장 자동필터
	    	if(jObj.INSTCD_YN == "Y"){
		    	//필터값 변경
	    		instcdFilterList.jqxDropDownList('selectItem', $.session.get('HOSPITAL_CODE'));
		    	
		    	//다른 필터 이벤트트리거
		    	var e = $.Event('keydown');
				e.keyCode= 13; // enter
		    	console.log('#'+codeFilterList[0]['id']);
		    	$('#'+codeFilterList[0]['id']).trigger(e);
	    	}
        }
	});
	
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());		
	var query = decodeURIComponent(jObj.CODE_SET);*/
	var searchWrd = $('#searchWrd').val();
	
	if(searchWrd){
		query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
	}else{
		query = query.replace('#{CODE_NM}',"''");
	}	
	
	var replaceQuery = query;
	
	
}

//선택한 코드 테이블
function setGrid2HSelect()
{
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		      	    	{ name: 'CODE'},
		      	        { name: 'CODE_NM'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', width: "20%"},
		               	{text : "병원명",datafield : "INSTCDNM",width:"15%"},
			   	    	{ text: '코드', datafield: 'CODE', width: "35%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "30%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
	    	{ name: 'CODE'},
	        { name: 'CODE_NM'}
	    ];
		
		var columns = [
			   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "70%"}
				    ];
	}
	
	gvDataSourceSelect2H = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvSelect2HList
	};
	
	gvDataAdapterSelect2H = new $.jqx.dataAdapter(gvDataSourceSelect2H, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelect2HGrid").jqxGrid('clear');
	$("#searchSelect2HGrid").jqxGrid({
	    source: gvDataAdapterSelect2H,
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
function initEvent2H(){
	
	$(document).on('rowselect', '#search2HGrid', function (event) {
		var dataSet = {};		
		var replaceQuery = decodeURIComponent(jObj.CODE_SET);

		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			var rowsINSTCD = event.args.row.INSTCD;
			
			//replaceQuery = replaceAll(replaceQuery,"||'%'", "||'%' AND A.INSTCD ='" + rowsINSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + rowsINSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + rowsINSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + rowsINSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + rowsINSTCD + "'");
			replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
		}else{
			replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
		}
		replaceQuery = replaceAll(replaceQuery, '#{INPUT_1H}', "'"+ event.args.row.CODE +"'");
		dataSet.QUERY 		= replaceQuery;
		//dataSet.INPUT_1H 	= event.args.row.CODE;
		INPUT_1H = event.args.row.CODE;
		
		//console.log(replaceQuery);
		
		callService("getCommonSelectedCodeList"
				,"common/modal/getCommonSelectedCodeList"
				,dataSet
				,"serviceCallback2H");
	});
	
	//조건 등록
	$('#submit2HBtn').on('click',function(e){
		var selectedrowindex1H = $("#search2HGrid").jqxGrid('selectedrowindexes');
		var selectedrowindex = $("#searchSelect2HGrid").jqxGrid('selectedrowindexes');
		var retObj = '';
		
		for(var i=0; i< selectedrowindex.length; i++){
	        var rows = $('#searchSelect2HGrid').jqxGrid('getrowdata', selectedrowindex[i]);
	        
			var dsValue = rows;	//selPerinxRows[i] 선택된 로우의 index
			
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
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			var rows1H = $('#search2HGrid').jqxGrid('getrowdata', selectedrowindex1H[0]);
			
			$("#result").val(rows1H.INSTCD + '__' + INPUT_1H + gvSplitChar + retObj);
		}else{
			var rows1H = $('#search2HGrid').jqxGrid('getrowdata', selectedrowindex1H[0]);
			
			$("#result").val(INPUT_1H + gvSplitChar + retObj);
		}
		
		$('#pop2HModal').modal('hide');
		
	});
}




