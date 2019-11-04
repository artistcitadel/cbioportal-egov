/**
 * 모달창 3HTMR
 * @Page : modal3HTMR
 */
var gv3HTMRList = [];
var gvMiddle3HTMRList 	= [];		//서식항목 코드
var gvBottom3HTMRList 	= [];		//기록내용 코드

var gvDiseaseCodeTree3HTMR;

var gvDataSourceMiddle3HTMR;
var gvDataSourceBottom3HTMR;

var gvDataAdapterMiddle3HTMR;
var gvDataAdapterBottom3HTMR;

var input_1h_1;
var input_1h_2;

var objVal3HTMR;// = "003003^AA0432^02|05";

var level3HTMR;
var value3HTMR;
var mCode;

var type_name;		//기록내용 타입 edit,list,radio

var item_seq3HTMR;
var item_cate_seq3HTMR;
var item_cateDetl_seq3HTMR;

var $args;	
var jObj;

var INSTCD;

var strINSTCD;
var strINSTCD2;

//depth별 레벨세팅 - 경북대
/*var level1 = 3;
var level2 = 4;
var levelLimit = 2;*/

//depth별 레벨세팅 - 울산대 통일
var level1 = 2;
var level2 = 3;
var levelLimit = 1;
/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent3HTMR();
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
function serviceCallback3HTMR(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeTopList":
			console.log(result);	
			gv3HTMRList = result.dsCodeList;
			
			$('#editBox3HTMR').hide();
			$('#searchBottom3HTMRGrid').show();
			
			setTree3HTMR();

			/*var $args = $('#args');		
			var jObj = JSON.parse($args.val());	*/	
			var query = decodeURIComponent(jObj.CODE_SET);
			//넘어온값 받음
			objVal3HTMR = jObj.VALUE;
			
			setGrid3HTMRMiddle();
			
			setGrid3HTMRBottom();
			
			if(isNull(objVal3HTMR)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HTMRSplit = objVal3HTMR.split(gvSplitChar);
				var objVal3HTMRSplitSplit = objVal3HTMRSplit[1].split('|');
				
				//트리선택
				var items = $('#codeTree3HTMR').jqxTree('getItems');
				$.each(items, function () {
					if(this.value == objVal3HTMRSplit[0]) {
						$("#codeTree3HTMR").jqxTree('expandItem', this.element);
						$('#codeTree3HTMR').jqxTree('selectItem', this.element);
						$("#codeTree3HTMR").jqxTree('ensureVisible', this.element);
						return false;
					}
				});
			}
			
			break;
			
		case "getCommonCodeMiddleList":
			console.log(result);
			
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}
			}*/
			
			gvDataSourceMiddle3HTMR.localdata = result.dsCodeList;
			
			$('#searchMiddle3HTMRGrid').jqxGrid('clearselection');
			
			$("#searchMiddle3HTMRGrid").jqxGrid('clear');			
			$("#searchMiddle3HTMRGrid").jqxGrid('updatebounddata', 'cells');
			
			
			if(isNull(objVal3HTMR)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HTMRSplit = objVal3HTMR.split(gvSplitChar);
				var objVal3HTMRSplitSplit = objVal3HTMRSplit[1];
				var selSelect3HTMRRows = $('#searchMiddle3HTMRGrid').jqxGrid('getdatainformation').rowscount;
				
				for(var i=0; i< selSelect3HTMRRows; i++){		//서식항목코드 체크
					var dsGetrowdata = $('#searchMiddle3HTMRGrid').jqxGrid('getrowdata', i);	//selSelect3HRows[i] 선택된 로우의 index
					
					//사업장코드가 있을때
					/*if(jObj.INSTCD_YN == "Y"){
						var objVal3HTMRSplitSplitSplit = objVal3HTMRSplitSplit.split('__');	//선택된 코드 사업장번호와 분리
						
						if(objVal3HTMRSplitSplitSplit[0] === $.trim(dsGetrowdata.INSTCD)){
							if(objVal3HTMRSplitSplitSplit[1] === $.trim(dsGetrowdata.CODE)){
								$("#searchMiddle3HTMRGrid").jqxGrid('selectrow', i);
							}
						}
					}else{*/
						if(objVal3HTMRSplit[1] === dsGetrowdata.CODE){
							$("#searchMiddle3HTMRGrid").jqxGrid('selectrow', i);
						}
					/*}*/
				}
				
				$('#editBox3HTMR').val(objVal3HTMRSplit[2]);
			}
			
			break;
			
		case "getCommonCodeBottomList":
			console.log(result);
			
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsCodeList.length; i++){
					result.dsCodeList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsCodeList[i]['INSTCD']];
				}
			}*/
			
			gvDataSourceBottom3HTMR.localdata = result.dsCodeList;
			
			$('#searchBottom3HTMRGrid').jqxGrid('clearselection');
			
			$("#searchBottom3HTMRGrid").jqxGrid('clear');			
			$("#searchBottom3HTMRGrid").jqxGrid('updatebounddata', 'cells');
			
			if(isNull(objVal3HTMR)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal3HTMRSplit = objVal3HTMR.split(gvSplitChar);
				var objVal3HTMRSplitSplit = objVal3HTMRSplit[2].split('|');
				var selSelect3HTMRRows = $('#searchBottom3HTMRGrid').jqxGrid('getdatainformation').rowscount;
				
				for(var i=0; i< selSelect3HTMRRows; i++){		//서식항목코드 체크
					var dsGetrowdata = $('#searchBottom3HTMRGrid').jqxGrid('getrowdata', i);	//selSelect3HRows[i] 선택된 로우의 index
					
					//체크	
					for(var j=0; j < objVal3HTMRSplitSplit.length; j++){
						
						//사업장코드가 있을때
						/*if(jObj.INSTCD_YN == "Y"){
							var objVal3HTMRSplitSplitSplit = objVal3HTMRSplitSplit[j].split('__');	//선택된 코드 사업장번호와 분리
							
							if(objVal3HTMRSplitSplitSplit[0] === dsGetrowdata.INSTCD){
								if(objVal3HTMRSplitSplitSplit[1] === dsGetrowdata.CODE){
									$("#searchBottom3HTMRGrid").jqxGrid('selectrow', i);
								}
							}
						}else{*/
							if(objVal3HTMRSplitSplit[j] == dsGetrowdata.CODE){
								$("#searchBottom3HTMRGrid").jqxGrid('selectrow', i);
							}
						/*}*/
					}
				}
				
				
				//다른 하위코드 선택시 동일코드 선택안되게 초기화함
				objVal3HTMR = "";
			}
			
			break;
			
		case "getUpperCommonCodeTopList":				//상위 쿼리받아오기
			console.log(result.dsUpperCommonCodeList);
			
			var searchWrd = $('#searchWrd3HTMR').val();
			var query = result.dsUpperCommonCodeList[0]['CODE_SET'];
			var queryCommonCodeList = query;
			
			if(searchWrd){
				queryCommonCodeList = queryCommonCodeList.replace(/#{CODE_NM}/gi,"'"+ searchWrd +"'");
			}else{
				queryCommonCodeList = queryCommonCodeList.replace(/#{CODE_NM}/gi,"''");
			}
			
			//사업장 코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				queryCommonCodeList = replaceAll(queryCommonCodeList, "#{INSTCD}", strINSTCD);
				queryCommonCodeList = replaceAll(queryCommonCodeList, "#{INSTCD2}", strINSTCD2);
				queryCommonCodeList = replaceAll(queryCommonCodeList, '${INSTCD}', '');
				/*dataSet.INSTCD = ", A.INSTCD";
				selQuery = selQuery.replace(/\${INSTCD}/gi,", A.INSTCD");*/
			}else{
				queryCommonCodeList = replaceAll(queryCommonCodeList, "#{INSTCD}",  '');
				queryCommonCodeList = replaceAll(queryCommonCodeList, "#{INSTCD2}",  '');
				queryCommonCodeList = replaceAll(queryCommonCodeList, '${INSTCD}', '');
				//selQuery = selQuery.replace(/\${INSTCD}/gi,"");
			}
			
			//폴더 이미지변경
			queryCommonCodeList = queryCommonCodeList.replace(/\/resource\/jqwidgets\/images\/folderOpen.png/gi, "../../images/folder.png");
			
			var dataSet = {};
			dataSet.QUERY	= queryCommonCodeList;
			
			if(isNull(objVal3HTMR)){					//넘어온 값이 없을때
				callServiceSpinnerClose("getCommonCodeTopList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3HTMR");
			}else{								//넘어온 값이 있을때
				callService("getCommonCodeTopList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3HTMR");
			}
			
			break;
			
		case "getUpperCommonCodeMiddleList":				//상위 쿼리받아오기
			console.log(result.dsUpperCommonCodeList);
			
			var query = result.dsUpperCommonCodeList[0]['CODE_SET'];
			
			//query = query.replace('#{CODE_NM}',"''");
			query = replaceAll(query, '#{CODE_NM}', "''");
			
			var querySplit = query.split(';');
			
			var dataSet = {};		
			if(level3HTMR == level1){
				var replaceQuery = querySplit[0];
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					replaceQuery = replaceAll(replaceQuery, "#{INSTCD}", strINSTCD2);
					replaceQuery = replaceAll(replaceQuery, "#{INSTCD2}", strINSTCD2);
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
					dataSet.input_1h_1 	= value3HTMR;
					input_1h_1 = value3HTMR;
					/*var valueSplit = value3HTMR.split('__');
					replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
					dataSet.input_1h_1 	= valueSplit[1];
					input_1h_1 = valueSplit[1];*/
				}else{
					replaceQuery = replaceAll(replaceQuery, "#{INSTCD}",  '');
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
					/*replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');*/
					dataSet.input_1h_1 	= value3HTMR;
					input_1h_1 = value3HTMR;
				}
				dataSet.QUERY 		= replaceQuery;
				
			}else if(level3HTMR == level2){
				var replaceQuery = querySplit[1];
				
				//사업장코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var valueSplit = value3HTMR.split("_");
					replaceQuery = replaceAll(replaceQuery, "#{INSTCD}", strINSTCD2);
					replaceQuery = replaceAll(replaceQuery, "#{INSTCD2}", strINSTCD2);
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
					
					dataSet.QUERY 		= replaceQuery;
					dataSet.input_1h_1 	= valueSplit[1];
					dataSet.input_1h_2 	= valueSplit[0];
					input_1h_1 = valueSplit[1];
					input_1h_2 = valueSplit[0];
					/*var valueSplit = value3HTMR.split('__');
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
					input_1h_2 = valueSplitSplit[0];*/
				}else{
					replaceQuery = replaceAll(replaceQuery, "#{INSTCD}",  '');
					replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
					var valueSplit = value3HTMR.split("_");
					/*replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%'|| #{CODE_NM} ||'%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' ||#{CODE_NM}|| '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(replaceQuery,"'%' || #{CODE_NM} || '%'", "'%'||''||'%'");
					replaceQuery = replaceAll(querySplit[1], '${INSTCD}', '');*/
					
					dataSet.QUERY 		= replaceQuery;
					dataSet.input_1h_1 	= valueSplit[1];
					dataSet.input_1h_2 	= valueSplit[0];
					input_1h_1 = valueSplit[1];
					input_1h_2 = valueSplit[0];
				}
				
				
			}
			
			if(level3HTMR > levelLimit){
				$('#searchMiddle3HTMRGrid').jqxGrid('clearselection');
				
				callService("getCommonCodeMiddleList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback3HTMR");
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
function getData3HTMR(){		
	
	var dataSet = {};
	
	dataSet.ID 					= '3H';
	dataSet.item_seq 			= item_seq3HTMR;
	dataSet.item_cate_seq 		= item_cate_seq3HTMR;
	dataSet.item_cateDetl_seq 	= item_cateDetl_seq3HTMR;
	
	callService("getUpperCommonCodeTopList"
			,"common/modal/getUpperCommonCodeList"
			,dataSet
			,"serviceCallback3HTMR");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init3HTMR()
{
	//코드받아오기
	getCode3HTMR();
	
	$('#searchWrd3HTMR').val('');
	
	//트리 & 그리드 초기화
	$('#codeTree3HTMR').jqxTree('clear');
	$("#searchMiddle3HTMRGrid").jqxGrid('clear');
	$("#searchBottom3HTMRGrid").jqxGrid('clear');
	
	//initEvent3HTMR();
	
	getData3HTMR();
}

//코드받아오기
function getCode3HTMR(){
	$args = $('#args');		
	jObj = JSON.parse($args.val());	
	
	if(gvINSTCD == '030'){
		strINSTCD = gvINSTCDTemp1;
		strINSTCD2 = gvINSTCDTemp2;
	}else{
		strINSTCD = "'"+ gvINSTCD +"'";
		strINSTCD2 = "'"+ gvINSTCD +"'";
	}
	
	item_cateDetl_seq3HTMR	= jObj.ITEM_CATE_DETL_SEQ;
	item_seq3HTMR			= jObj.ITEM_SEQ;
	item_cate_seq3HTMR 		= jObj.ITEM_CATE_SEQ;
}

/**
 * grid setting
 * @returns
 */
function setTree3HTMR()
{	
	console.log(gv3HTMRList);
	var source3HTMR = {
			datatype: "json",
            datafields: [
                { name: 'ID' },
                { name: 'ICON'}, 
                { name: 'PARENTID' },
                { name: 'text' },
                { name: 'VALUE' }
            ],
            id: 'ID',
            localdata: gv3HTMRList

    };
	
	var treeAdapter3HTMR = new $.jqx.dataAdapter(source3HTMR);
	
	treeAdapter3HTMR.dataBind();
	
	var records3HTMR = treeAdapter3HTMR.getRecordsHierarchy('ID', 'PARENTID', 'items', [{ name: 'text', map: 'label'},{ name: 'ICON', map: 'icon'},{ name: 'VALUE', map: 'value'}]);
	
	$('#codeTree3HTMR').jqxTree({
		allowDrag : false,
		allowDrop : false,
		height : '550',
		width:'100%',
		source : records3HTMR,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#codeTree3HTMR').on('expand', function(event) {
		var args = event.args;
		var item = $('#codeTree3HTMR').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree3HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#codeTree3HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$('#codeTree3HTMR').on('collapse', function(event) {
		var item = $('#codeTree3HTMR').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree3HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#codeTree3HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());	*/	
	
	
}

//선택한 코드 테이블
function setGrid3HTMRMiddle()
{
	//사업장코드가 있을때
	/*if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: "INSTCDNM", type:"string"},
		                { name: 'CODE'},
		                { name: 'CODE_NM'},
		    	        { name: 'type_name'},
		    	        { name: 'UMR_ITYPE'},
		    	        { name: 'UMR_DTYPE'}
		      	    ];
		
		var columns = [
		               	{ text: '병원구분코드', datafield: 'INSTCD', filtertype: 'list', filteritems: gvArrInstcd, width: "20%"},
		               	{text : "병원명",datafield : "INSTCDNM", filtertype: 'list', filteritems: gvArrInstcdKor, width:"10%"},
		               	{ text: '코드', datafield: 'CODE', width: "25%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "25%"},
				        { text: '항목타입', datafield: 'type_name', width: "5%"},
				        { text: '항목타입코드', datafield: 'UMR_ITYPE', width: "5%"},
				        { text: '데이터타입', datafield: 'UMR_DTYPE', width: "5%"}
				    ];
	}else{	//사업장코드가 없을때
*/		var datafields = [
		      	    	{ name: 'CODE', type:"string"},
		    	        { name: 'CODE_NM', type:"string"},
		    	        { name: 'type_name', type:"string"},
		    	        { name: 'UMR_ITYPE', type:"string"},
		    	        { name: 'UMR_DTYPE', type:"string"}
		    	    ];
		
		var columns = [
		   	    	{ text: '항목코드', datafield: 'CODE', width: "25%"},
			        { text: '항목명', datafield: 'CODE_NM', width: "35%"},
			        { text: '항목타입', datafield: 'type_name', width: "15%"},
			        { text: '항목타입코드', datafield: 'UMR_ITYPE', width: "15%"},
			        { text: '데이터타입', datafield: 'UMR_DTYPE', width: "10%"}
			    ];
	/*}*/
	
	gvDataSourceMiddle3HTMR = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvMiddle3HTMRList
	};
	
	gvDataAdapterMiddle3HTMR = new $.jqx.dataAdapter(gvDataSourceMiddle3HTMR, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchMiddle3HTMRGrid").jqxGrid('clear');
	$("#searchMiddle3HTMRGrid").jqxGrid({
	    source: gvDataAdapterMiddle3HTMR,
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
function setGrid3HTMRBottom()
{
	//사업장코드가 있을때
	/*if(jObj.INSTCD_YN == "Y"){
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
*/		var datafields = [
		      	    	{ name: 'CODE', type:"string"},
		    	        { name: 'CODE_NM', type:"string"}
		    	    ];
		
		var columns = [
		   	    	{ text: '코드', datafield: 'CODE', width: "35%"},
			        { text: '기록내용', datafield: 'CODE_NM', width: "60%"}
			    ];
	/*}*/
	
	gvDataSourceBottom3HTMR = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvBottom3HTMRList
	};
	
	gvDataAdapterBottom3HTMR = new $.jqx.dataAdapter(gvDataSourceBottom3HTMR, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchBottom3HTMRGrid").jqxGrid('clear');
	$("#searchBottom3HTMRGrid").jqxGrid({
	    source: gvDataAdapterBottom3HTMR,
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
function initEvent3HTMR(){
	//2H그리드 클릭 이벤트
	$(document).on('rowselect', '#searchMiddle3HTMRGrid', function (event) {
		var args = event.args;
		var rowBoundIndex = args.rowindex;
		var rowData = args.row;
		mCode = rowData.CODE;
		var itype = rowData.UMR_ITYPE;
		type_name = rowData.type_name;
		
		if(type_name=='Edit box'){
			$('#editBox3HTMR').show();
			$('#searchBottom3HTMRGrid').hide();
			$('#editBox3HTMR').val('');
			
			gvSpinnerClose();
		}else{
			$('#editBox3HTMR').hide();
			$('#editBox3HTMR').val('');
			$('#searchBottom3HTMRGrid').show();
			console.log(itype);
			
			var dataSet = {};
			
			dataSet.umrCode 			= mCode;
			
			//사업장코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				dataSet.INSTCD_YN 		= "Y";
				dataSet.formCode	= value3HTMR;
				dataSet.INSTCD 		= strINSTCD2;
			}else{
				dataSet.INSTCD_YN 	= "";
				dataSet.formCode	= value3HTMR;
				dataSet.INSTCD 		= "";
			}
			
			console.log(dataSet);
			
			if(itype == "1" || itype == "9"){
				callServiceSpinnerClose("getCommonCodeBottomList"
						,"common/modal/getCommonCodeList_3HT_MR_EDIT"
						,dataSet
						,"serviceCallback3HTMR");
			}else if(itype == "2" || itype == "5"){
				callServiceSpinnerClose("getCommonCodeBottomList"
						,"common/modal/getCommonCodeList_3HT_MR_LIST"
						,dataSet
						,"serviceCallback3HTMR");
			}else if(itype == "4"){
				callServiceSpinnerClose("getCommonCodeBottomList"
						,"common/modal/getCommonCodeList_3HT_MR_CHECK"
						,dataSet
						,"serviceCallback3HTMR");
			}
		}
	});
	
	//1H트리클릭 이벤트
	$(document).on('select', '#codeTree3HTMR', function (event) {
		var query = decodeURIComponent(jObj.CODE_SET);
		
		var dataSet = {};
		
		dataSet.ID 					= '2H';
		dataSet.item_seq 			= item_seq3HTMR;
		dataSet.item_cate_seq 		= item_cate_seq3HTMR;
		dataSet.item_cateDetl_seq 	= item_cateDetl_seq3HTMR;
		
		var item = $('#codeTree3HTMR').jqxTree('getItem', args.element);
		
		level3HTMR = item.level;
		value3HTMR = item.value;
		
		if(level3HTMR > 1){
			callService("getUpperCommonCodeMiddleList"
					,"common/modal/getUpperCommonCodeList"
					,dataSet
					,"serviceCallback3HTMR");
			
			$('#searchBottom3HTMRGrid').jqxGrid('clearselection');
			
			$("#searchBottom3HTMRGrid").jqxGrid('clear');
		}
	});
	
	
	//조건 등록
	$('#submitBtn3HTMR').on('click',function(e){
		
		if($("#editBox3HTMR").css("display") == "block"){		//텍스트박스일때
			if($('#editBox3HTMR').val() == ""){
				BootstrapDialog.alert("기록내용을 "+COM_0014);
				return;
			}else{
				
				//사업장 코드가 있을때
				/*if(jObj.INSTCD_YN == "Y"){
					$("#result").val(input_1h_1 + gvSplitChar + INSTCD + '__' + mCode + gvSplitChar + $('#editBox3HTMR').val());
				}else{	//사업장코드가 없을때
*/					$("#result").val(input_1h_1 + gvSplitChar + mCode + gvSplitChar + $('#editBox3HTMR').val());
				/*}*/
			}
		}else{													//그리드일때
			var selectedrowindex = $("#searchBottom3HTMRGrid").jqxGrid('selectedrowindexes');
			var retObj = '';
			
			for(var i=0; i< selectedrowindex.length; i++){
		        var rows = $('#searchBottom3HTMRGrid').jqxGrid('getrowdata', selectedrowindex[i]);
		        
				var dsValue = rows;	//selPerinxRows[i] 선택된 로우의 index
				
				if(isNull(retObj)){
					//사업장 코드가 있을때
					/*if(jObj.INSTCD_YN == "Y"){
						retObj = dsValue.INSTCD +"__"+ dsValue.CODE;
					}else{	//사업장코드가 없을때
*/						retObj = dsValue.CODE;
					/*}*/
					
				}else{
					//사업장 코드가 있을때
					/*if(jObj.INSTCD_YN == "Y"){
						retObj += '|' + dsValue.INSTCD +"__"+ dsValue.CODE;
					}else{	//사업장코드가 없을때
*/						retObj += '|' + dsValue.CODE;
					/*}*/
					
				}
				
			}
			
			//넘길 값이 없을때 clear 넘김
			if(retObj == ""){
				retObj = "clear";
			}
			
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				$("#result").val(input_1h_1 + gvSplitChar + INSTCD + '__' + mCode + gvSplitChar + retObj);
			}else{*/
				$("#result").val(input_1h_1 + gvSplitChar + mCode + gvSplitChar + retObj);
			/*}*/
		}
		
		$('#pop3HTMRModal').modal('hide');
	});
	
	//검색버튼
	$('#btn3HTMRSearch').on('click',function(e){
		if(isNullOrEmpty($('#searchWrd3HTMR').val())){
			BootstrapDialog.alert(COM_0006);
			return;
			
		}
		
		getData3HTMR();
		
		
	});
	
	$('#searchWrd3HTMR').on('keypress',function(e){
		if(e.keyCode === 13){
			if(isNullOrEmpty($('#searchWrd3HTMR').val())){
				BootstrapDialog.alert(COM_0006);
				return;
				
			}
			
			getData3HTMR();
			
		}
	});
}




