/**
 * 모달창 3HT
 * @Page : modal3HT
 */
var gv3HTList = [];
var gvMiddle3HTList 	= [];		//서식항목 코드
var gvBottom3HTList 	= [];		//기록내용 코드

var gvDiseaseCodeTree3HT;

var gvDataSourceMiddle3HT;
var gvDataSourceBottom3HT;

var gvDataAdapterMiddle3HT;
var gvDataAdapterBottom3HT;

var input_1h_1_3HT;
var input_2h_1_3HT;

var objVal3HT;// = "14011^문1 무슨날인지 모른다^1|3";

var level3HT;
var value3HT;
var mCode;

var type_name;		//기록내용 타입 edit,list,radio

var item_cateDetl_seq3HT;
var item_seq3HT;
var item_cate_seq3HT;

var $args;		
var jObj;

var INSTCD;

/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent3HT();
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
function serviceCallback3HT(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeTopList":
			console.log(result);	
			gv3HTList = result.dsCodeList;
			
			setTree3HT();

			/*var $args = $('#args');		
			var jObj = JSON.parse($args.val());	*/	
			var query = decodeURIComponent(jObj.CODE_SET);
			
			if(gvCateDetl_seq[item_cateDetl_seq3HT] == "1"){			//신검일때 grid변경
				setGrid3HTMiddle2();
			}else{
				setGrid3HTMiddle();
			}
			
			setGrid3HTBottom();
			
			if(isNull(objVal3HT)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HTSplit = objVal3HT.split(gvSplitChar);
				var objVal3HTSplitSplit = objVal3HTSplit[1].split('|');
				
				//트리선택
				var items = $('#codeTree3HT').jqxTree('getItems');
				$.each(items, function () {
					if(this.value == objVal3HTSplit[0]) {
						$("#codeTree3HT").jqxTree('expandItem', this.element);
						$('#codeTree3HT').jqxTree('selectItem', this.element);
						return false;
					}
				});
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
			
			gvDataSourceMiddle3HT.localdata = result.dsCodeList;
			
			$('#searchMiddle3HTGrid').jqxGrid('clearselection');
			
			$("#searchMiddle3HTGrid").jqxGrid('clear');			
			$("#searchMiddle3HTGrid").jqxGrid('updatebounddata', 'cells');
			
			
			if(isNull(objVal3HT)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HTSplit = objVal3HT.split(gvSplitChar);
				var objVal3HTSplitSplit = objVal3HTSplit[1];
				var selSelect3HTRows = $('#searchMiddle3HTGrid').jqxGrid('getdatainformation').rowscount;
				
				for(var i=0; i< selSelect3HTRows; i++){		//서식항목코드 체크
					var dsGetrowdata = $('#searchMiddle3HTGrid').jqxGrid('getrowdata', i);	//selSelect3HRows[i] 선택된 로우의 index
					
					//사업장코드가 있을때
					if(jObj.INSTCD_YN == "Y"){
						var objVal3HTSplitSplitSplit = objVal3HTSplitSplit.split('__');	//선택된 코드 사업장번호와 분리
						
						if(objVal3HTSplitSplitSplit[0] === dsGetrowdata.INSTCD){
							if(objVal3HTSplitSplitSplit[1] === dsGetrowdata.CODE){
								$("#searchMiddle3HTGrid").jqxGrid('selectrow', i);
							}
						}
					}else{
						if(objVal3HTSplit[1] === dsGetrowdata.CODE){
							$("#searchMiddle3HTGrid").jqxGrid('selectrow', i);
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
			
			gvDataSourceBottom3HT.localdata = result.dsCodeList;
			
			$('#searchBottom3HTGrid').jqxGrid('clearselection');
			
			$("#searchBottom3HTGrid").jqxGrid('clear');			
			$("#searchBottom3HTGrid").jqxGrid('updatebounddata', 'cells');
			
			if(isNull(objVal3HT)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HTSplit = objVal3HT.split(gvSplitChar);
				var objVal3HTSplitSplit = objVal3HTSplit[2].split('|');
				var selSelect3HTRows = $('#searchBottom3HTGrid').jqxGrid('getdatainformation').rowscount;
				
				for(var i=0; i< selSelect3HTRows; i++){		//서식항목코드 체크
					var dsGetrowdata = $('#searchBottom3HTGrid').jqxGrid('getrowdata', i);	//selSelect3HRows[i] 선택된 로우의 index
					
					//체크	
					for(var j=0; j < objVal3HTSplitSplit.length; j++){
						
						//사업장코드가 있을때
						if(jObj.INSTCD_YN == "Y"){
							var objVal3HTSplitSplitSplit = objVal3HTSplitSplit[j].split('__');	//선택된 코드 사업장번호와 분리
							
							if(objVal3HTSplitSplitSplit[0] === dsGetrowdata.INSTCD){
								if(objVal3HTSplitSplitSplit[1] === dsGetrowdata.CODE){
									$("#searchBottom3HTGrid").jqxGrid('selectrow', i);
								}
							}
						}else{
							if(objVal3HTSplitSplit[j] == $.trim(dsGetrowdata.CODE)){
								$("#searchBottom3HTGrid").jqxGrid('selectrow', i);
							}
						}
					}
				}
				
				//다른 하위코드 선택시 동일코드 선택안되게 초기화함
				objVal3HT = "";
			}
			
			break;
			
		case "getUpperCommonCodeTopList":				//상위 쿼리받아오기
			console.log(result.dsUpperCommonCodeList);
			
			var searchWrd = $('#searchWrd3HT').val();
			var queryCommonCodeList = result.dsUpperCommonCodeList[0]['CODE_SET'];
			
			if(searchWrd){
				queryCommonCodeList = queryCommonCodeList.replace('#{CODE_NM}',"'"+ searchWrd +"'");
			}else{
				queryCommonCodeList = queryCommonCodeList.replace('#{CODE_NM}',"''");
			}
			
			//폴더 이미지변경
			queryCommonCodeList = queryCommonCodeList.replace(/\/resource\/jqwidgets\/images\/folderOpen.png/gi, "../../images/folder.png");
			
			var dataSet = {};
			dataSet.QUERY	= queryCommonCodeList;
			
			if(isNull(objVal3HT)){					//넘어온 값이 없을때
				callServiceSpinnerClose("getCommonCodeTopList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3HT");
			}else{								//넘어온 값이 있을때
				callService("getCommonCodeTopList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3HT");
			}
			
			break;
			
		case "getUpperCommonCodeMiddleList":				//상위 쿼리받아오기
			console.log(result.dsUpperCommonCodeList);
			
			var queryCommonCodeList = result.dsUpperCommonCodeList[0]['CODE_SET'];
			
			//queryCommonCodeList = queryCommonCodeList.replace('#{CODE_NM}',"''");
			
			var querySplit = queryCommonCodeList.split(';');
			
			var dataSet = {};		
			if(level3HT == 1 || level3HT == 2){
				var replaceQuery = querySplit[0];
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var valueSplit = value3HT.split('__');
					replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
					dataSet.input_1h_1 	= valueSplit[1];
					input_1h_1_3HT = valueSplit[1];
				}else{
					replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
					dataSet.input_1h_1 	= value3HT;
					input_1h_1_3HT = value3HT;
				}
				
				dataSet.QUERY 		= replaceQuery;
				
			}else if(level3HT == 3){
				var replaceQuery = querySplit[1];
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var valueSplit = value3HT.split('__');
					
					replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
					
					var valueSplitSplit = valueSplit[1].split("_");
					dataSet.QUERY 		= replaceQuery;
					dataSet.input_1h_1 	= valueSplitSplit[1];
					dataSet.input_1h_2 	= valueSplitSplit[0];
					input_1h_1 = valueSplitSplit[1];
					input_1h_2 = valueSplitSplit[0];
				}else{
					var valueSplit = value3HT.split("_");
					replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
					
					dataSet.QUERY 		= replaceQuery;
					
					dataSet.input_1h_1 	= valueSplit[1];
					dataSet.input_1h_2 	= valueSplit[0];
					input_1h_1_3HT = valueSplit[1];
					input_2h_1_3HT = valueSplit[0];
				}
				
			}
			
			if(input_1h_1_3HT){
				$('#searchMiddle3HTGrid').jqxGrid('clearselection');
				
				callService("getCommonCodeMiddleList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3HT");
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
function getData3HT(){		
	
	var dataSet = {};
	
	dataSet.ID 					= '3H';
	dataSet.item_seq 			= item_seq3HT;
	dataSet.item_cate_seq 		= item_cate_seq3HT;
	dataSet.item_cateDetl_seq 	= item_cateDetl_seq3HT;
	
	callService("getUpperCommonCodeTopList"
			,"common/modal/getUpperCommonCodeList"
			,dataSet
			,"serviceCallback3HT");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init3HT()
{
	//코드받아오기
	getCode3HT();
	
	$('#searchWrd3HT').val('');
	
	//트리 & 그리드 초기화
	$('#codeTree3HT').jqxTree('clear');
	$("#searchMiddle3HTGrid").jqxGrid('clear');
	$("#searchBottom3HTGrid").jqxGrid('clear');
	
	//initEvent3HT();
	
	getData3HT();
}

//코드받아오기
function getCode3HT(){
	$args = $('#args');		
	jObj = JSON.parse($args.val());	
	//넘어온값 받음
	objVal3HT = jObj.VALUE;
	
	item_cateDetl_seq3HT	= jObj.ITEM_CATE_DETL_SEQ;
	item_seq3HT				= jObj.ITEM_SEQ;
	item_cate_seq3HT 		= jObj.ITEM_CATE_SEQ;
}

/**
 * grid setting
 * @returns
 */
function setTree3HT()
{	
	console.log(gv3HTList);
	var source3HT = {
			datatype: "json",
            datafields: [
                { name: 'ID' },
                { name: 'ICON'}, 
                { name: 'PARENTID' },
                { name: 'text' },
                { name: 'VALUE' }
            ],
            id: 'ID',
            localdata: gv3HTList

    };
	
	var treeAdapter3HT = new $.jqx.dataAdapter(source3HT);
	
	treeAdapter3HT.dataBind();
	
	var records3HT = treeAdapter3HT.getRecordsHierarchy('ID', 'PARENTID', 'items', [{ name: 'text', map: 'label'},{ name: 'ICON', map: 'icon'},{ name: 'VALUE', map: 'value'}]);
	
	$('#codeTree3HT').jqxTree({
		allowDrag : false,
		allowDrop : false,
		height : '550',
		width:'100%',
		source : records3HT,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#codeTree3HT').on('expand', function(event) {
		var args = event.args;
		var item = $('#codeTree3HT').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree3HT div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#codeTree3HT div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$('#codeTree3HT').on('collapse', function(event) {
		var item = $('#codeTree3HT').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree3HT div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#codeTree3HT div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());	*/	
	
	
}

//선택한 코드 테이블
function setGrid3HTMiddle()
{
	//사업장코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		                { name: 'CODE'},
		    	        { name: 'CODE_NM'},
		    	        { name: 'CODE_GB'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', filtertype: 'list', filteritems: gvArrInstcd, width: "20%"},
		               	{text : "병원명",datafield : "INSTCDNM", filtertype: 'list', filteritems: gvArrInstcdKor, width:"15%"},
		               	{ text: '코드', datafield: 'CODE', width: "25%"},
				        { text: '서식항목명', datafield: 'CODE_NM', width: "20%"},
				        { text: '구분', datafield: 'CODE_GB', width: "20%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
		      	    	{ name: 'CODE'},
		    	        { name: 'CODE_NM'},
		    	        { name: 'CODE_GB'}
		    	    ];
		
		var columns = [
		   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
			        { text: '서식항목명', datafield: 'CODE_NM', width: "40%"},
			        { text: '구분', datafield: 'CODE_GB', width: "30%"}
			    ];
	}
	
	gvDataSourceMiddle3HT = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvMiddle3HTList
	};
	
	gvDataAdapterMiddle3HT = new $.jqx.dataAdapter(gvDataSourceMiddle3HT, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchMiddle3HTGrid").jqxGrid('clear');
	$("#searchMiddle3HTGrid").jqxGrid({
	    source: gvDataAdapterMiddle3HT,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'singlerow',
		showfilterrow: true,
		filterable: true,
		columnsresize: true,
	    columns: columns
	});
	
	
}

//선택한 코드 테이블
function setGrid3HTMiddle2()
{
	//사업장코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		                { name: 'CODE'},
		    	        { name: 'CODE_NM'},
		    	        { name: 'CODE_GB'},
		    	        { name: 'SEQ'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', filtertype: 'list', filteritems: gvArrInstcd, width: "20%"},
		               	{text : "병원명",datafield : "INSTCDNM", filtertype: 'list', filteritems: gvArrInstcdKor, width:"15%"},
		               	{ text: '코드', datafield: 'CODE', width: "20%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "15%"},
				        { text: '구분', datafield: 'CODE_GB', width: "15%"},
				        { text: '고유번호', datafield: 'SEQ', width: "15%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
		      	    	{ name: 'CODE'},
		    	        { name: 'CODE_NM'},
		    	        { name: 'CODE_GB'},
		    	        { name: 'SEQ'}
		    	    ];
		
		var columns = [
		   	    	{ text: '코드', datafield: 'CODE', width: "30%"},
			        { text: '코드명', datafield: 'CODE_NM', width: "30%"},
			        { text: '구분', datafield: 'CODE_GB', width: "20%"},
			        { text: '고유번호', datafield: 'SEQ', width: "20%"}
			    ];
	}
	
	gvDataSourceMiddle3HT = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvMiddle3HTList
	};
	
	gvDataAdapterMiddle3HT = new $.jqx.dataAdapter(gvDataSourceMiddle3HT, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchMiddle3HTGrid").jqxGrid('clear');
	$("#searchMiddle3HTGrid").jqxGrid({
	    source: gvDataAdapterMiddle3HT,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'singlerow',
		showfilterrow: true,
		filterable: true,
		columnsresize: true,
	    columns: columns
	});
	
	
}

//기록내용 코드 테이블
function setGrid3HTBottom()
{
	//사업장코드가 있을때
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
		               	{ text: '코드', datafield: 'CODE', width: "30%"},
				        { text: '기록내용', datafield: 'CODE_NM', width: "30%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
		      	    	{ name: 'CODE'},
		    	        { name: 'CODE_NM'}
		    	    ];
		
		var columns = [
		   	    	{ text: '코드', datafield: 'CODE', width: "45%"},
			        { text: '기록내용', datafield: 'CODE_NM', width: "50%"}
			    ];
	}
	
	gvDataSourceBottom3HT = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvBottom3HTList
	};
	
	gvDataAdapterBottom3HT = new $.jqx.dataAdapter(gvDataSourceBottom3HT, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchBottom3HTGrid").jqxGrid('clear');
	$("#searchBottom3HTGrid").jqxGrid({
	    source: gvDataAdapterBottom3HT,
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
function initEvent3HT(){
	//2H 그리드 클릭이벤트
	$(document).on('rowselect', '#searchMiddle3HTGrid', function (event) {
		/*var $args = $('#args');	
		var jObj = JSON.parse($args.val());	*/
		var query = decodeURIComponent(jObj.CODE_SET);	
		var searchWrd = $('#searchWrd2HT').val();
		
		var args = event.args;
		var rowBoundIndex = args.rowindex;
		var rowData = args.row;
		
		/*if(searchWrd){
			query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
		}else{
			query = query.replace('#{CODE_NM}',"''");
		}*/
		
		
		console.log(event.args.row.CODE);
		
		var dataSet = {};
		dataSet.input_1h_1 			= input_1h_1_3HT;
		dataSet.input_2h_1 			= event.args.row.CODE;
		
		input_2h_1_3HT = event.args.row.CODE;
		
		console.log(query);
		
		var replaceQuery = query;

		INSTCD = event.args.row.INSTCD;
		//사업장코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			dataSet.INSTCD 			= INSTCD;
			replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + INSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + INSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + INSTCD + "'");
			replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + INSTCD + "'");
			replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
		}else{
			replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
			replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
		}

		var querySplit = replaceQuery.split(';');
		
		if(gvCateDetl_seq[item_cateDetl_seq3HT] == "2"){			//간호기록일때 gubun에 따라 쿼리바뀜
			var gubun = rowData.CODE_GB;
			gubun = gubun.replace(/ /gi,"");
			
			if(gubun =='값'){			//쿼리 split
				dataSet.QUERY 			= querySplit[1];
			}else{
				dataSet.QUERY 			= querySplit[0];
			}
		}else{
			dataSet.QUERY 			= query;
		}
		
		callServiceSpinnerClose("getCommonCodeBottomList"
				,"common/modal/getCommonCodeList"
				,dataSet
				,"serviceCallback3HT");
	});	
	
	
	//1H 트리 클릭 이벤트
	$(document).on('select', '#codeTree3HT', function (event) {

		var query = decodeURIComponent(jObj.CODE_SET);
		var dataSet = {};
		
		dataSet.ID 					= '2H';
		dataSet.item_seq 			= item_seq3HT;
		dataSet.item_cate_seq 		= item_cate_seq3HT;
		dataSet.item_cateDetl_seq 	= item_cateDetl_seq3HT;
		
		var item = $('#codeTree3HT').jqxTree('getItem', args.element);
		
		level3HT = item.level;
		value3HT = item.value;
		
		var e = event.args.element;
        var children = $(e).find("li");
        
        if(children.length == 0){
        	callService("getUpperCommonCodeMiddleList"
					,"common/modal/getUpperCommonCodeList"
					,dataSet
					,"serviceCallback3HT");
			
			$('#searchBottom3HTGrid').jqxGrid('clearselection');
			
			$("#searchBottom3HTGrid").jqxGrid('clear');
        }
	});
	
	//조건 등록
	$('#submitBtn3HT').on('click',function(e){
		
		if($("#editBox3HT").css("display") == "block"){		//텍스트박스일때
			if($('#editBox3HT').val() == ""){
				BootstrapDialog.alert("기록내용을 "+COM_0014);
				return;
			}else{
				$("#result").val(input_1h_1_3HT + gvSplitChar + input_2h_1_3HT + gvSplitChar + $('#editBox3HT').val());
			}
		}else{													//그리드일때
			var selectedrowindex = $("#searchBottom3HTGrid").jqxGrid('selectedrowindexes');
			var retObj = '';
			
			for(var i=0; i< selectedrowindex.length; i++){
		        var rows = $('#searchBottom3HTGrid').jqxGrid('getrowdata', selectedrowindex[i]);
		        
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
				var rows = $('#codeTree3HT').jqxTree('getSelectedItem').value;
				
				$("#result").val(rows + gvSplitChar + INSTCD + '__' + input_2h_1_3HT + gvSplitChar + retObj);
			}else{
				$("#result").val(input_1h_1_3HT + gvSplitChar + input_2h_1_3HT + gvSplitChar + retObj);
			}
			
			
		}
		
		$('#pop3HTModal').modal('hide');
	});
}




