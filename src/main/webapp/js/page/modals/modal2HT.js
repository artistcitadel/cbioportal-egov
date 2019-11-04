/**
 * 모달창 2HT
 * @Page : modal2HT
 */
var gv2HTList = [];
var gvSelect2HTList 	= [];		//선택된 코드

var gvDiseaseCodeTree2HT;
var gvDataSourceSelect2HT;
var gvDataAdapterSelect2HT;

var input_1h_1;
var input_1h_2;

var objVal2HT;// = "011001^E00001|E00002|E00003";//"14035^주민번호";//

var item_cateDetl_seq2HT;
var item_seq2HT;
var item_cate_seq2HT;

var $args;
var jObj;

/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent2HT();
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
function serviceCallback2HT(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeList":
			console.log(result);	
			gv2HTList = result.dsCodeList;
			
			setTree2HT();

			/*var $args = $('#args');		
			var jObj = JSON.parse($args.val());	*/	
			var query = decodeURIComponent(jObj.CODE_SET);
			//넘어온값 받음
			objVal2HT = jObj.VALUE;
			
			if(gvCateDetl_seq[item_cateDetl_seq2HT] == "1"){			//신검일때 grid변경
				setGrid2HTSelect2();
			}else{
				setGrid2HTSelect();
			}
			
			
			if(isNull(objVal2HT)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				var objVal2HTSplit = objVal2HT.split(gvSplitChar);
				var objVal2HTSplitSplit = objVal2HTSplit[1].split('|');
				var selSelect2HRows = $('#searchSelect2HTGrid').jqxGrid('getdatainformation').rowscount;
				
				//트리선택
				var items = $('#codeTree2HT').jqxTree('getItems');
				$.each(items, function () {
					if(this.value == objVal2HTSplit[0]) {
						$("#codeTree2HT").jqxTree('expandItem', this.element);
						$('#codeTree2HT').jqxTree('selectItem', this.element);
						return false;
					}
				});
			}
			
			break;
			
		case "getUpperCommonCodeList":
			console.log(result.dsUpperCommonCodeList);
			
			var searchWrd = $('#searchWrd2HT').val();
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
			
			if(isNull(objVal2HT)){					//넘어온 값이 없을때
				callServiceSpinnerClose("getCommonCodeList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback2HT");
			}else{								//넘어온 값이 있을때
				callService("getCommonCodeList"
						,"common/modal/getCommonCodeList"
						,dataSet
						,"serviceCallback2HT");
			}
			
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
			
			gvDataSourceSelect2HT.localdata = result.dsCodeSelectedList;
			
			//값이 있을때만 clear처리
			if($("#searchSelect2HTGrid").jqxGrid('getdatainformation').rowscount > 0){
				$('#searchSelect2HTGrid').jqxGrid('clearselection');		
				$("#searchSelect2HTGrid").jqxGrid('clear');
			}
			
			$("#searchSelect2HTGrid").jqxGrid('updatebounddata', 'cells');
			
			if(isNull(objVal2HT)){					//넘어온 값이 없을때
			}else{								//넘어온 값이 있을때
				//선택값 체크
				var objVal2HTSplit = objVal2HT.split(gvSplitChar);
				var objVal2HTSplitSplit = objVal2HTSplit[1].split('|');
				var selSelect2HRows = $('#searchSelect2HTGrid').jqxGrid('getdatainformation').rowscount;
				
				for(var i=0; i< selSelect2HRows; i++){		//선택한코드 체크
					var dsGetrowdata = $('#searchSelect2HTGrid').jqxGrid('getrowdata', i);	//selSelect2HRows[i] 선택된 로우의 index
					
					//체크	
					for(var j=0; j < objVal2HTSplitSplit.length; j++){
						
						//사업장코드가 있을때
						if(jObj.INSTCD_YN == "Y"){
							var objVal2HTSplitSplitSplit = objVal2HTSplitSplit[j].split('__');	//선택된 코드 사업장번호와 분리
							
							if(objVal2HTSplitSplitSplit[0] === dsGetrowdata.INSTCD){
								if(objVal2HTSplitSplitSplit[1] === dsGetrowdata.CODE){
									$("#searchSelect2HTGrid").jqxGrid('selectrow', i);
								}
							}
						}else{
							if(objVal2HTSplitSplit[j] == $.trim(dsGetrowdata.CODE)){
								$("#searchSelect2HTGrid").jqxGrid('selectrow', i);
							}
						}
					}
				}
			}
			//다른 중위코드 선택시 동일코드 선택안되게 초기화함
			objVal2HT = "";
			
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
function getData2HT(){
	/*var $args = $('#args');	
	var jObj = JSON.parse($args.val());	*/
	var query = decodeURIComponent(jObj.CODE_SET);	
	var searchWrd = $('#searchWrd2HT').val();
	
	if(searchWrd){
		query = query.replace('#{CODE_NM}',"'"+ searchWrd +"'");
	}else{
		query = query.replace('#{CODE_NM}',"''");
	}
		
	
	var dataSet = {};
	
	dataSet.ID 					= '2H';
	dataSet.item_seq 			= item_seq2HT;
	dataSet.item_cate_seq 		= item_cate_seq2HT;
	dataSet.item_cateDetl_seq 	= item_cateDetl_seq2HT;
	
	callService("getUpperCommonCodeList"
			,"common/modal/getUpperCommonCodeList"
			,dataSet
			,"serviceCallback2HT");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init2HT()
{
	//코드받아오기
	getCode2HT();
	
	$('#searchWrd2HT').val('');
	
	//initEvent2HT();
	
	getData2HT();
}

//코드받아오기
function getCode2HT(){
	$args = $('#args');		
	jObj = JSON.parse($args.val());	
	
	item_cateDetl_seq2HT	= jObj.ITEM_CATE_DETL_SEQ;
	item_seq2HT				= jObj.ITEM_SEQ;
	item_cate_seq2HT 		= jObj.ITEM_CATE_SEQ;
}

/**
 * grid setting
 * @returns
 */
function setTree2HT()
{	
	console.log(gv2HTList);
	var source2HT = {
			datatype: "json",
            datafields: [
                { name: 'ID' },
                { name: 'ICON'}, 
                { name: 'PARENTID' },
                { name: 'text' },
                { name: 'VALUE' }
            ],
            id: 'ID',
            localdata: gv2HTList

    };
	
	var treeAdapter2HT = new $.jqx.dataAdapter(source2HT);
	
	treeAdapter2HT.dataBind();
	
	var records2HT = treeAdapter2HT.getRecordsHierarchy('ID', 'PARENTID', 'items', [{ name: 'text', map: 'label'},{ name: 'ICON', map: 'icon'},{ name: 'VALUE', map: 'value'}]);
	
	$('#codeTree2HT').jqxTree({
		allowDrag : false,
		allowDrop : false,
		height : '550',
		width:'100%',
		source : records2HT,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#codeTree2HT').on('expand', function(event) {
		var args = event.args;
		var item = $('#codeTree2HT').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree2HT div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#codeTree2HT div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$('#codeTree2HT').on('collapse', function(event) {
		var item = $('#codeTree2HT').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree2HT div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#codeTree2HT div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());		*/
	
	
}

//선택한 코드 테이블
function setGrid2HTSelect()
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
		               	{ text: '사업장코드', datafield: 'INSTCD', width: "20%"},
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
		   	    	{ text: '코드', datafield: 'CODE', width: "45%"},
			        { text: '코드명', datafield: 'CODE_NM', width: "50%"}
			    ];
	}
	
	gvDataSourceSelect2HT = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvSelect2HTList
	};
	
	gvDataAdapterSelect2HT = new $.jqx.dataAdapter(gvDataSourceSelect2HT, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelect2HTGrid").jqxGrid('clear');
	$("#searchSelect2HTGrid").jqxGrid({
	    source: gvDataAdapterSelect2HT,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		selectionmode: 'checkbox',
	    columns: columns
	});
	
	
}

//선택한 코드 테이블
function setGrid2HTSelect2()
{
	//사업장코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		var datafields = [
		                { name: 'INSTCD'},
		                { name: 'CODE'},
		    	        { name: 'CODE_NM'},
		    	        { name: 'CODE_GB'},
		    	        { name: 'SEQ'}
		      	    ];
		
		var columns = [
		               	{ text: '사업장코드', datafield: 'INSTCD', width: "15%"},
		               	{ text: '코드', datafield: 'CODE', width: "20%"},
				        { text: '코드명', datafield: 'CODE_NM', width: "25%"},
				        { text: '구분', datafield: 'CODE_GB', width: "15%"},
				        { text: '고유번호', datafield: 'SEQ', width: "20%"}
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
			        { text: '구분', datafield: 'CODE_GB', width: "15%"},
			        { text: '고유번호', datafield: 'SEQ', width: "20%"}
			    ];
	}
	
	gvDataSourceSelect2HT = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvSelect2HTList
	};
	
	gvDataAdapterSelect2HT = new $.jqx.dataAdapter(gvDataSourceSelect2HT, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelect2HTGrid").jqxGrid('clear');
	$("#searchSelect2HTGrid").jqxGrid({
	    source: gvDataAdapterSelect2HT,
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
function initEvent2HT(){	
	
	//1H트리 클릭 이벤트 
	$(document).on('select', '#codeTree2HT', function (event) {
		var query = decodeURIComponent(jObj.CODE_SET);
		
		var args = event.args;
	    var item = $('#codeTree2HT').jqxTree('getItem', args.element);
		
		var level = item.level;
		var value = item.value;
		value = value.replace(/ /gi,"");
		
		var querySplit = query.split(';');
		
		var e = event.args.element;
        var children = $(e).find("li");
		
		//console.log(children.length);
		
		var dataSet = {};	
		var replaceQuery = querySplit[0];
		
		if(children.length == 0){
			//사업장코드가 있을때
			if(jObj.INSTCD_YN == "Y"){
				var valueSplit = value.split('__');
				value = valueSplit[1];
				replaceQuery = replaceQuery.replace("group by"," AND A.INSTCD ='" + valueSplit[0] + "' group by" );
				//replaceQuery = replaceQuery.replace(/\${INSTCD}/gi,", A.INSTCD");
				replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
			}else{
				//replaceQuery = replaceQuery.replace(/\${INSTCD}/gi,"");
				replaceQuery = replaceAll(replaceQuery, '${INSTCD}', ', A.INSTCD');
			}
			
			replaceQuery = replaceAll(replaceQuery, '#{input_1h_1}', "'"+value+"'");
			
			dataSet.QUERY 		= replaceQuery;
			dataSet.input_1h_1 	= value;
			input_1h_1 = value;
			
			
			callServiceSpinnerClose("getCommonSelectedCodeList"
					,"common/modal/getCommonSelectedCodeList"
					,dataSet
					,"serviceCallback2HT");
		}
		
	});
	
	//조건 등록
	$('#submitBtn2HT').on('click',function(e){
		var selectedrowindex = $("#searchSelect2HTGrid").jqxGrid('selectedrowindexes');
		var retObj = '';
		
		for(var i=0; i< selectedrowindex.length; i++){
	        var rows = $('#searchSelect2HTGrid').jqxGrid('getrowdata', selectedrowindex[i]);
	        
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
			var rows = $('#codeTree2HT').jqxTree('getSelectedItem').value;
			
			$("#result").val(rows + gvSplitChar + retObj);
		}else{
			$("#result").val(input_1h_1 + gvSplitChar + retObj);
		}
		
		$('#pop2HTModal').modal('hide');
	});
}




