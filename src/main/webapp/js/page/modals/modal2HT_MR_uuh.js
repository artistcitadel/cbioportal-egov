/**
 * 모달창 2HTMR
 * @Page : modal2HTMR
 */
var gv2HTMRList = [];
var gvSelect2HTMRList 	= [];		//선택된 코드

var gvDiseaseCodeTree2HTMR;
var gvDataSourceSelect2HTMR;
var gvDataAdapterSelect2HTMR;

var input_1h_1;
var input_1h_2;

var objVal2HTMR;// = "003002^AA0001|AA0200|AA0432";

var item_seq2HTMR;
var item_cate_seq2HTMR;
var item_cateDetl_seq2HTMR;

var $args;
var jObj;

/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent2HTMR();
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
function serviceCallback2HTMR(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeList":
			console.log(result);	
			gv2HTMRList = result.dsCodeList;
			
			setTree2HTMR();

			/*var $args = $('#args');		
			var jObj = JSON.parse($args.val());		*/
			var query = decodeURIComponent(jObj.CODE_SET);
			//넘어온값 받음
			objVal2HTMR = jObj.VALUE;
			
			setGrid2HTMRSelect();
			
			if(isNull(objVal2HTMR)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				var objVal2HTMRSplit = objVal2HTMR.split('^');		//1H, 2H분리
				var objVal2HTMRSplit0 = objVal2HTMRSplit[0];		//1H
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					var objVal2HTMRSplit00Split = objVal2HTMRSplit0.split('__');	//사업자 코드 분리
					var objVal2HTMRSplit00 = objVal2HTMRSplit00Split[1];
				}else{
					var objVal2HTMRSplit00 = objVal2HTMRSplit0;		
				}
				var objVal2HTMRSplit0Split = objVal2HTMRSplit00.split('_');			//쿼리분리여부 체크
				var querySplit = query.split(';');
				
				var dataSet = {};
				if(objVal2HTMRSplit0Split.length == 1){
					dataSet.QUERY 		= querySplit[0];
					dataSet.input_1h_1 	= objVal2HTMRSplit00;
					input_1h_1 = objVal2HTMRSplit00;
					
				}else if(objVal2HTMRSplit0Split.length == 2){
					dataSet.QUERY 		= querySplit[1];
					dataSet.input_1h_1 	= objVal2HTMRSplit0Split[1];
					dataSet.input_1h_2 	= objVal2HTMRSplit0Split[0];
					input_1h_1 = objVal2HTMRSplit0Split[1];
					input_1h_2 = objVal2HTMRSplit0Split[0];
				}
				
				if(objVal2HTMRSplit0Split.length > 0){
					callServiceSync("getCommonSelectedCodeList"
							,"common/modal/getCommonSelectedCodeList"
							,dataSet
							,"serviceCallback2HTMR");
				}
			}
			
			break;
			
		case "getUpperCommonCodeList":
			console.log(result.dsUpperCommonCodeList);
			
			var searchWrd = $('#searchWrd2HTMR').val();
			var query = result.dsUpperCommonCodeList[0]['CODE_SET'];
			
			if(searchWrd){
				query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
			}else{
				query = query.replace('#{CODE_NM}',"''");
			}
			
			//폴더 이미지변경
			query = query.replace(/\/resource\/jqwidgets\/images\/folderOpen.png/gi, "../../images/folder.png");
			
			var dataSet = {};
			dataSet.QUERY	= query;
			
			callService("getCommonCodeList"
					,"common/modal/getCommonCodeList"
					,dataSet
					,"serviceCallback2HTMR");
			
			break;
			
		case "getCommonSelectedCodeList":
			console.log(result);
			
			gvDataSourceSelect2HTMR.localdata = result.dsCodeSelectedList;
			
			$('#searchSelect2HTMRGrid').jqxGrid('clearselection');
			
			$("#searchSelect2HTMRGrid").jqxGrid('clear');			
			$("#searchSelect2HTMRGrid").jqxGrid('updatebounddata', 'cells');
			
			if(isNull(objVal2HTMR)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				/*var $args = $('#args');	
				var jObj = JSON.parse($args.val());	*/
				var objVal2HTMRSplit = objVal2HTMR.split('^');
				var objVal2HTMRSplitSplit = objVal2HTMRSplit[1].split('|');
				var selSelect2HRows = $('#searchSelect2HTMRGrid').jqxGrid('getdatainformation').rowscount;
				
				//트리선택
				var items = $('#codeTree2HTMR').jqxTree('getItems');
				$.each(items, function () {
					if(this.value == objVal2HTMRSplit[0]) {
						$("#codeTree2HTMR").jqxTree('expandItem', this.element);
						$('#codeTree2HTMR').jqxTree('selectItem', this.element);
						return false;
					}
				});
				
				for(var i=0; i< selSelect2HRows; i++){		//선택한코드 체크
					var dsGetrowdata = $('#searchSelect2HTMRGrid').jqxGrid('getrowdata', i);	//selSelect2HRows[i] 선택된 로우의 index
					
					//체크	
					for(var j=0; j < objVal2HTMRSplitSplit.length; j++){
						
						//사업장코드가 있을때
						if(jObj.INSTCD_YN == "Y"){
							var objVal2HMRSplitSplitSplit = objVal2HTMRSplitSplit[j].split('__');	//선택된 코드 사업장번호와 분리
							
							if(objVal2HMRSplitSplitSplit[0] === dsGetrowdata.INSTCD){
								if(objVal2HMRSplitSplitSplit[1] === dsGetrowdata.CODE){
									$("#searchSelect2HTMRGrid").jqxGrid('selectrow', i);
								}
							}
						}else{
							if(objVal2HTMRSplitSplit[j] == $.trim(dsGetrowdata.CODE)){
								$("#searchSelect2HTMRGrid").jqxGrid('selectrow', i);
							}
						}
						
						
					}
				}
			}
			
			
			//다른 중위코드 선택시 동일코드 선택안되게 초기화함
			objVal2HTMR = "";
			
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
function getData2HTMR(){
	/*var $args = $('#args');	
	var jObj = JSON.parse($args.val());	*/
	var query = decodeURIComponent(jObj.CODE_SET);	
	var searchWrd = $('#searchWrd2HTMR').val();
	
	if(searchWrd){
		query = query.replace(/#{CODE_NM}/gi,"'"+ searchWrd +"'");
	}else{
		query = query.replace(/#{CODE_NM}/gi,"''");
	}
		
	
	var dataSet = {};
	
	dataSet.ID 					= '2H';
	dataSet.item_seq 			= item_seq2HTMR;
	dataSet.item_cate_seq 		= item_cate_seq2HTMR;
	dataSet.item_cateDetl_seq 	= item_cateDetl_seq2HTMR;
	
	callServiceSync("getUpperCommonCodeList"
			,"common/modal/getUpperCommonCodeList"
			,dataSet
			,"serviceCallback2HTMR");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init2HTMR()
{
	//코드받아오기
	getCode2HTMR();
	
	$('#searchWrd2HTMR').val('');
	
	//initEvent2HTMR();
	
	getData2HTMR();
}

//코드받아오기
function getCode2HTMR(){
	$args = $('#args');		
	jObj = JSON.parse($args.val());	
	
	item_cateDetl_seq2HTMR	= jObj.ITEM_CATE_DETL_SEQ;
	item_seq2HTMR			= jObj.ITEM_SEQ;
	item_cate_seq2HTMR 		= jObj.ITEM_CATE_SEQ;
}

/**
 * grid setting
 * @returns
 */
function setTree2HTMR()
{	
	console.log(gv2HTMRList);
	var source2HTMR = {
			datatype: "json",
            datafields: [
                { name: 'ID' },
                { name: 'ICON'}, 
                { name: 'PARENTID' },
                { name: 'text' },
                { name: 'VALUE' }
            ],
            id: 'ID',
            localdata: gv2HTMRList

    };
	
	var treeAdapter2HTMR = new $.jqx.dataAdapter(source2HTMR);
	
	treeAdapter2HTMR.dataBind();
	
	var records2HTMR = treeAdapter2HTMR.getRecordsHierarchy('ID', 'PARENTID', 'items', [{ name: 'text', map: 'label'},{ name: 'ICON', map: 'icon'},{ name: 'VALUE', map: 'value'}]);
	
	$('#codeTree2HTMR').jqxTree({
		allowDrag : false,
		allowDrop : false,
		height : '550',
		width:'100%',
		source : records2HTMR,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#codeTree2HTMR').on('expand', function(event) {
		var args = event.args;
		var item = $('#codeTree2HTMR').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree2HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#codeTree2HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$('#codeTree2HTMR').on('collapse', function(event) {
		var item = $('#codeTree2HTMR').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree2HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#codeTree2HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());		*/
	
	
}

//선택한 코드 테이블
function setGrid2HTMRSelect()
{
	//사업장코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: 'CODE'},
		                { name: 'CODE_NM'},
		    	        { name: 'type_name'},
		    	        { name: 'UMR_ITYPE'},
		    	        { name: 'UMR_DTYPE'}
		      	    ];
		
		var columns = [
		               	{ text: '사업장코드', datafield: 'INSTCD', width: "15%"},
		               	{ text: '코드', datafield: 'CODE', width: "15%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "20%"},
				        { text: '항목타입', datafield: 'type_name', width: "15%"},
				        { text: '항목타입코드', datafield: 'UMR_ITYPE', width: "15%"},
				        { text: '데이터타입', datafield: 'UMR_DTYPE', width: "15%"}
				    ];
	}else{	//사업장코드가 없을때
		var datafields = [
		      	    	{ name: 'CODE'},
		    	        { name: 'CODE_NM'},
		    	        { name: 'type_name'},
		    	        { name: 'UMR_ITYPE'},
		    	        { name: 'UMR_DTYPE'}
		    	    ];
		
		var columns = [
		   	    	{ text: '코드', datafield: 'CODE', width: "15%"},
			        { text: '코드명', datafield: 'CODE_NM', width: "20%"},
			        { text: '항목타입', datafield: 'type_name', width: "20%"},
			        { text: '항목타입코드', datafield: 'UMR_ITYPE', width: "20%"},
			        { text: '데이터타입', datafield: 'UMR_DTYPE', width: "20%"}
			    ];
	}
	
	gvDataSourceSelect2HTMR = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvSelect2HTMRList
	};
	
	gvDataAdapterSelect2HTMR = new $.jqx.dataAdapter(gvDataSourceSelect2HTMR, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelect2HTMRGrid").jqxGrid('clear');
	$("#searchSelect2HTMRGrid").jqxGrid({
	    source: gvDataAdapterSelect2HTMR,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
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
function initEvent2HTMR(){	
	
	$('#codeTree2HTMR').on('select', function (event) {

		var query = decodeURIComponent(jObj.CODE_SET);
		var argsEvent = event.args;
	    var item = $('#codeTree2HTMR').jqxTree('getItem', argsEvent.element);
		
		var level = item.level;
		var value = item.value;
		
		var querySplit = query.split(';');
		
		var dataSet = {};		
		if(level == 2){
			var replaceQuery = querySplit[0];
			//사업장코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				var valueSplit = value.split('__');
				value = valueSplit[1];
				replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
				replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
			}else{
				replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
			}
			
			dataSet.QUERY 		= replaceQuery;
			dataSet.input_1h_1 	= value;
			input_1h_1 = value;
			
		}else if(level == 3){
			var replaceQuery = querySplit[1];
			
			//사업장코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				var valueSplit = value.split('__');
				value = valueSplit[1];
				replaceQuery = replaceAll(replaceQuery,"'%'||#{CODE_NM}||'%'", "'%'||''||'%' AND A.INSTCD ='" + valueSplit[0] + "'");
				replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
				
				var valueSplitSplit = valueSplit[1].split("_");
				dataSet.QUERY 		= replaceQuery;
				dataSet.input_1h_1 	= valueSplitSplit[1];
				dataSet.input_1h_2 	= valueSplitSplit[0];
				input_1h_1 = valueSplitSplit[1];
				input_1h_2 = valueSplitSplit[0];
			}else{
				var valueSplit = value.split("_");
				replaceQuery = replaceAll(replaceQuery, '${INSTCD}', '');
				
				dataSet.QUERY 		= replaceQuery;
				dataSet.input_1h_1 	= valueSplit[1];
				dataSet.input_1h_2 	= valueSplit[0];
				input_1h_1 = valueSplit[1];
				input_1h_2 = valueSplit[0];
			}
			
		}
		
		if(level > 1){
			$('#searchSelect2HTMRGrid').jqxGrid('clearselection');
			
			callServiceSync("getCommonSelectedCodeList"
					,"common/modal/getCommonSelectedCodeList"
					,dataSet
					,"serviceCallback2HTMR");
		}
	});
	
	
	//조건 등록
	$('#submitBtn2HTMR').on('click',function(e){
		var selectedrowindex = $("#searchSelect2HTMRGrid").jqxGrid('selectedrowindexes');
		var retObj = '';
		
		for(var i=0; i< selectedrowindex.length; i++){
	        var rows = $('#searchSelect2HTMRGrid').jqxGrid('getrowdata', selectedrowindex[i]);
	        
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
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			var rows = $('#codeTree2HTMR').jqxTree('getSelectedItem').value;
			
			$("#result").val(rows + '^' + retObj);
		}else{
			$("#result").val(input_1h_1 + '^' + retObj);
		}
		
		$('#pop2HTMRModal').modal('hide');
	});
	
	//검색버튼
	$('#btn2HTMRSearch').on('click',function(e){
		if(isNullOrEmpty($('#searchWrd2HTMR').val())){
			BootstrapDialog.alert(COM_0006);
			return;
			
		}
		
		getData2HTMR();
		
		
	});
	
	$('#searchWrd2HTMR').on('keypress',function(e){
		if(e.keyCode === 13){
			if(isNullOrEmpty($('#searchWrd2HTMR').val())){
				BootstrapDialog.alert(COM_0006);
				return;
				
			}
			
			getData2HTMR();
			
		}
	});
}




