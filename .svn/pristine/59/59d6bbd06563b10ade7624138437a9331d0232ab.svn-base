/**
 * 모달창 3H
 * @Page : modal3H
 */
var gvTop3HList 	= [];			//상위코드
var gvMiddle3HList 	= [];			//중위코드
var gvBottom3HList 	= [];			//하위코드

var gvDataSourceTop3H;
var gvDataSourceMiddle3H;
var gvDataSourceBottom3H;

var gvDataAdapterTop3H;
var gvDataAdapterMiddle3H;
var gvDataAdapterBottom3H;

var INPUT_1H;
var INPUT_2H;

var objVal3H;// = "031__2017^031__0005^031__A000622|031__A000096|031__A000646";
var item_seq3H;
var item_cate_seq3H;
var item_cateDetl_seq3H;

var $args;
var jObj;
var query;

/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent3H();
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
function serviceCallback3H(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeTopList":
			console.log(result);	
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}
			}
			
			gvTop3HList = result.dsCodeList;
			
			setGrid3HTop();

			setGrid3HMiddle();
			
			setGrid3HBottom();
			
			$('#searchTop3HGrid').jqxGrid('clearselection');		
			
			//값이 있을때만 clear처리
			if($("#searchMiddle3HGrid").jqxGrid('getdatainformation').rowscount > 0){
				//$('#searchMiddle3HGrid').jqxGrid('clearselection');		
				$("#searchMiddle3HGrid").jqxGrid('clear');
			}
			
			if($("#searchBottom3HGrid").jqxGrid('getdatainformation').rowscount > 0){
				//$('#searchBottom3HGrid').jqxGrid('clearselection');
				$("#searchBottom3HGrid").jqxGrid('clear');
			}
			
			//넘어온 값체크
			/*var $args = $('#args');	
			var jObj = JSON.parse($args.val());	*/
			
			//넘어온값 받음	
			objVal3H = jObj.VALUE;
			
			if(isNull(objVal3H)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				var objVal3HSplit = objVal3H.split(gvSplitChar);
				var selTop3HRows = $('#searchTop3HGrid').jqxGrid('getdatainformation').rowscount;
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var objVal3HSplitSplit = objVal3HSplit[0].split('__');
					
					console.log(selTop3HRows);
					
					for(var i=0; i< selTop3HRows; i++){		//상위코드 체크
						var dsGetrowdata = $('#searchTop3HGrid').jqxGrid('getrowdata', i);	//sel3HRows[i] 선택된 로우의 index
						
						//체크	
						if(objVal3HSplitSplit[1] === dsGetrowdata.CODE){
							if(objVal3HSplitSplit[0] === dsGetrowdata.INSTCD){
								$("#searchTop3HGrid").jqxGrid('selectrow', i);
							}
						}
					}
				}else{
					for(var i=0; i< selTop3HRows; i++){		//상위코드 체크
						var dsGetrowdata = $('#searchTop3HGrid').jqxGrid('getrowdata', i);	//sel3HRows[i] 선택된 로우의 index
						
						//체크	
						if(objVal3HSplit[0] === dsGetrowdata.CODE){
							$("#searchTop3HGrid").jqxGrid('selectrow', i);
						}
					}
				}
			}
			
			break;
			
		case "getCommonCodeMiddleList":
			console.log(result);
			
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}
			}
			
			gvMiddle3HList.localdata = result.dsCodeList;
			
			$('#searchMiddle3HGrid').jqxGrid('clearselection');
			
			$("#searchMiddle3HGrid").jqxGrid('clear');			
			$("#searchMiddle3HGrid").jqxGrid('updatebounddata', 'cells');
			
			//넘어온 값체크
			/*var $args = $('#args');	
			var jObj = JSON.parse($args.val());	
			var query = decodeURIComponent(jObj.CODE_SET);	*/
			var searchWrd = $('#searchWrd').val();
			
			/*if(searchWrd){
				query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
			}else{
				query = query.replace('#{CODE_NM}',"''");
			}*/
			
			if(isNull(objVal3H)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//var $args = $('#args');	
				//var jObj = JSON.parse($args.val());	
				var objVal3HSplit = objVal3H.split(gvSplitChar);
				var selMiddle3HRows = $('#searchMiddle3HGrid').jqxGrid('getdatainformation').rowscount;
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var objVal3HSplitSplit = objVal3HSplit[1].split('__');
					
					for(var i=0; i< selMiddle3HRows; i++){		//중위코드 체크
						var dsGetrowdata = $('#searchMiddle3HGrid').jqxGrid('getrowdata', i);	//sel3HRows[i] 선택된 로우의 index
						
						//체크	
						if(objVal3HSplitSplit[1] === dsGetrowdata.CODE){
							if(objVal3HSplitSplit[0] === dsGetrowdata.INSTCD){
								$("#searchMiddle3HGrid").jqxGrid('selectrow', i);
							}
						}
					}
					
				}else{
					for(var i=0; i< selMiddle3HRows; i++){		//중위코드 체크
						var dsGetrowdata = $('#searchMiddle3HGrid').jqxGrid('getrowdata', i);	//sel3HRows[i] 선택된 로우의 index
						
						//체크	
						if(objVal3HSplit[1] === dsGetrowdata.CODE){
							$("#searchMiddle3HGrid").jqxGrid('selectrow', i);
						}
					}
				}
			}
			
			break;
		
		case "getCommonCodeBottomList":
			console.log(result);
			
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}
			}
			
			gvBottom3HList.localdata = result.dsCodeList;
			
			$('#searchBottom3HGrid').jqxGrid('clearselection');
			
			$("#searchBottom3HGrid").jqxGrid('clear');			
			$("#searchBottom3HGrid").jqxGrid('updatebounddata', 'cells');

			console.log('hoho');
			console.log(objVal3H);
			
			//선택값 체크
			if(isNull(objVal3H)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HSplit = objVal3H.split(gvSplitChar);
				var objVal3HSplitSplit = objVal3HSplit[2].split('|');
				var selBottom3HRows = $('#searchBottom3HGrid').jqxGrid('getdatainformation').rowscount;
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					
					for(var i=0; i< selBottom3HRows; i++){		//하위코드 체크
						var dsGetrowdata = $('#searchBottom3HGrid').jqxGrid('getrowdata', i);	//selSelect3HRows[i] 선택된 로우의 index
						
						//체크	
						for(var j=0; j < objVal3HSplitSplit.length; j++){
							var objVal3HSplitSplitSplit = objVal3HSplitSplit[j].split('__');
							
							if(objVal3HSplitSplitSplit[1] === dsGetrowdata.CODE){
								if(objVal3HSplitSplitSplit[0] === dsGetrowdata.INSTCD){
									$("#searchBottom3HGrid").jqxGrid('selectrow', i);
								}
							}
						}
					}
				}else{
					for(var i=0; i< selBottom3HRows; i++){		//하위코드 체크
						var dsGetrowdata = $('#searchBottom3HGrid').jqxGrid('getrowdata', i);	//selSelect3HRows[i] 선택된 로우의 index
						
						//체크	
						for(var j=0; j < objVal3HSplitSplit.length; j++){
							
							if(objVal3HSplitSplit[j] === dsGetrowdata.CODE){
								$("#searchBottom3HGrid").jqxGrid('selectrow', i);
							}
						}
					}
				}
				
			}
			
			//다른 중위코드 선택시 동일코드 선택안되게 초기화함
			//objVal3H = "";
			
			break;
			
		case "getUpperCommonCodeTopList":				//상위 쿼리받아오기
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
			
			if(isNull(objVal3H)){					//넘어온 값이 없을때
				callServiceSpinnerClose("getCommonCodeTopList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3H");
			}else{								//넘어온 값이 있을때
				callService("getCommonCodeTopList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3H");
			}
			
			break;
			
		case "getUpperCommonCodeMiddleList":		//중간 쿼리받아오기
			console.log(result.dsUpperCommonCodeList);
			
			var searchWrd = $('#searchWrd').val();
			var queryMiddle = result.dsUpperCommonCodeList[0]['CODE_SET'];
			
			/*if(searchWrd){
				queryMiddle = queryMiddle.replace('#{CODE_NM}',"'"+ searchWrd +"'");
			}else{
				queryMiddle = queryMiddle.replace('#{CODE_NM}',"''");
			}*/
			
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				queryMiddle = replaceAll(queryMiddle,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + result.INSTCD + "'");
				queryMiddle = replaceAll(queryMiddle,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + result.INSTCD + "'");
				queryMiddle = replaceAll(queryMiddle,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + result.INSTCD + "'");
				queryMiddle = replaceAll(queryMiddle,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + result.INSTCD + "'");
				queryMiddle = replaceAll(queryMiddle, '${INSTCD}', ', A.INSTCD');
			}else{
				queryMiddle = replaceAll(queryMiddle,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
				queryMiddle = replaceAll(queryMiddle,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
				queryMiddle = replaceAll(queryMiddle,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
				queryMiddle = replaceAll(queryMiddle,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
				queryMiddle = replaceAll(queryMiddle, '${INSTCD}', '');
			}
			
			queryMiddle = replaceAll(queryMiddle, '#{INPUT_1H}', "'"+ INPUT_1H +"'");
			
			var dataSet = {};
			dataSet.INPUT_1H 	= INPUT_1H;
			dataSet.QUERY	 	= queryMiddle;
			
			console.log(dataSet);
			
			callService("getCommonCodeMiddleList"
					,"common/modal/getCommonCodeList"
					,dataSet
					,"serviceCallback3H");
			
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
function getDataTop3H(){		
	
	var dataSet = {};
	
	dataSet.ID 					= '3H';
	dataSet.item_seq 			= item_seq3H;
	dataSet.item_cate_seq 		= item_cate_seq3H;
	dataSet.item_cateDetl_seq 	= item_cateDetl_seq3H;
	
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		dataSet.INSTCD = ", A.INSTCD";
	}
	
	callService("getUpperCommonCodeTopList"
			,"common/modal/getUpperCommonCodeList"
			,dataSet
			,"serviceCallback3H");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init3H()
{
	//코드받아오기
	getCode3H();
	
	getDataTop3H();
	
	//initEvent3H();
}

//코드받아오기
function getCode3H(){
	$args = $('#args');		
	jObj = JSON.parse($args.val());	
	query = decodeURIComponent(jObj.CODE_SET);
	
	item_cateDetl_seq3H		= jObj.ITEM_CATE_DETL_SEQ;
	item_seq3H				= jObj.ITEM_SEQ;
	item_cate_seq3H			= jObj.ITEM_CATE_SEQ;
}

/**
 * grid setting
 * @returns
 */
function setGrid3HTop()
{
	if(jObj.INSTCD_YN == "Y"){
		$("#searchTop3HGrid").remove();
		$('#searchTop3HGridArea').append('<div id="searchTop3HGrid"></div>');
		
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
	
	gvDataSourceTop3H = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvTop3HList
	};
	
	gvDataAdapterTop3H = new $.jqx.dataAdapter(gvDataSourceTop3H, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchTop3HGrid").jqxGrid('clear');
	$("#searchTop3HGrid").jqxGrid({
	    source: gvDataAdapterTop3H,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		showfilterrow: true,
		filterable: true,
	    columns: columns,
	    columnsresize: true,
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
	
	/*if(searchWrd){
		query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
	}else{
		query = query.replace('#{CODE_NM}',"''");
	}	*/
	
	
}

function setGrid3HMiddle()
{
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		      	    	{ name: 'CODE'},
		      	        { name: 'CODE_NM'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', filtertype: 'list', filteritems: gvArrInstcd, width: "20%"},
		               	{text : "병원명",datafield : "INSTCDNM", filtertype: 'list', filteritems: gvArrInstcdKor, width:"15%"},
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
	
	gvDataSourceMiddle3H = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvMiddle3HList
	};
	
	gvDataAdapterMiddle3H = new $.jqx.dataAdapter(gvDataSourceMiddle3H, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchMiddle3HGrid").jqxGrid('clear');
	$("#searchMiddle3HGrid").jqxGrid({
	    source: gvDataAdapterMiddle3H,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		showfilterrow: true,
		filterable: true,
		columnsresize: true,
	    columns: columns
	});
	
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());		
	var query = decodeURIComponent(jObj.CODE_SET);*/
	var searchWrd = $('#searchWrd').val();
	
	/*if(searchWrd){
		query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
	}else{
		query = query.replace('#{CODE_NM}',"''");
	}	*/
	
	
}

function setGrid3HBottom()
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
	
	gvDataSourceBottom3H = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvBottom3HList
	};
	
	gvDataAdapterBottom3H = new $.jqx.dataAdapter(gvDataSourceBottom3H, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchBottom3HGrid").jqxGrid('clear');
	$("#searchBottom3HGrid").jqxGrid({
	    source: gvDataAdapterBottom3H,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'checkbox',
		showfilterrow: true,
		filterable: true,
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
function initEvent3H(){
	
	//조건 등록
	$('#submit3HBtn').on('click',function(e){
		var selectedrowindex = $("#searchBottom3HGrid").jqxGrid('selectedrowindexes');
		var retObj = '';
		
		for(var i=0; i< selectedrowindex.length; i++){
	        var rows = $('#searchBottom3HGrid').jqxGrid('getrowdata', selectedrowindex[i]);
	        
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
		
		var selectedrowindexTop3H = $("#searchTop3HGrid").jqxGrid('selectedrowindexes');
		var selectedrowindexMiddle3H = $("#searchMiddle3HGrid").jqxGrid('selectedrowindexes');
		
		//넘길 값이 없을때 clear 넘김
		if(retObj == ""){
			retObj = "clear";
		}
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			var rowsTop3H = $('#searchTop3HGrid').jqxGrid('getrowdata', selectedrowindexTop3H[0]);
			var rowsMiddle3H = $('#searchMiddle3HGrid').jqxGrid('getrowdata', selectedrowindexMiddle3H[0]);
			
			$("#result").val(rowsTop3H.INSTCD + '__' + INPUT_1H + gvSplitChar + rowsMiddle3H.INSTCD + '__' + INPUT_2H + gvSplitChar + retObj);
		}else{
			
			$("#result").val(INPUT_1H + gvSplitChar + INPUT_2H + gvSplitChar + retObj);
		}
		
		$('#pop3HModal').modal('hide');
		
	});
	
	

	$(document).on('rowselect', '#searchTop3HGrid', function (event) {
		console.log(event);
		$('#searchBottom3HGrid').jqxGrid('clear');
		var dataSet = {};		
		
		dataSet.ID 						= '2H';
		dataSet.item_seq 				= item_seq3H;
		dataSet.item_cate_seq 			= item_cate_seq3H;
		dataSet.item_cateDetl_seq 		= item_cateDetl_seq3H;
		INPUT_1H = event.args.row.CODE;
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			dataSet.INSTCD = event.args.row.INSTCD;
		}else{
			dataSet.INSTCD = "";
		}
		
		callService("getUpperCommonCodeMiddleList"
				,"common/modal/getUpperCommonCodeList"
				,dataSet
				,"serviceCallback3H");
	});
	
	$(document).on('rowselect', '#searchMiddle3HGrid', function (event) {
		var dataSet = {};		
		
		var myQuery = query;
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			dataSet.INSTCD = event.args.row.INSTCD;
			myQuery = replaceAll(myQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + event.args.row.INSTCD + "'");
			myQuery = replaceAll(myQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + event.args.row.INSTCD + "'");
			myQuery = replaceAll(myQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + event.args.row.INSTCD + "'");
			myQuery = replaceAll(myQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + event.args.row.INSTCD + "'");
			myQuery = replaceAll(myQuery, '${INSTCD}', ', A.INSTCD');
		}else{
			dataSet.INSTCD = "";
			myQuery = replaceAll(myQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
			myQuery = replaceAll(myQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
			myQuery = replaceAll(myQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
			myQuery = replaceAll(myQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
			myQuery = replaceAll(myQuery, '${INSTCD}', '');
		}
		
		myQuery = replaceAll(myQuery, '#{INPUT_1H}', "'"+ INPUT_1H +"'");
		myQuery = replaceAll(myQuery, '#{INPUT_2H}', "'"+ event.args.row.CODE +"'");
		
		dataSet.QUERY 		= myQuery;
		dataSet.INPUT_1H 	= INPUT_1H;
		dataSet.INPUT_2H 	= event.args.row.CODE;
		INPUT_2H = event.args.row.CODE;
		
		console.log(dataSet);
		
		callServiceSpinnerClose("getCommonCodeBottomList"
				,"common/modal/getCommonCodeList"
				,dataSet
				,"serviceCallback3H");
	});
}




