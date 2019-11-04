/**
 * 모달창 W
 * @Page : modalW
 */
var gvDiseaseCodeListW 	= [];
var gvDiseaseCodeTreeW = [];
var gvItemContDetlWList = [];

var gvDataSourceDiseaseCodeW;
var gvDataSourceDiseaseParentCodeW;

var beforeMode;
var beforeSeq;

var args;

var $args;

var jObj;

var argsVal;

var strINSTCD;
var strINSTCD2;

/**
 * Application Ready
 */
$(document).ready(function(){
	initEventW();
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
function serviceCallbackW(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getDataW":
			//console.log(result.dsDiseaseCodeListW);
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsDiseaseCodeListW.length; i++){
					result.dsDiseaseCodeListW[i]['INSTCDNM'] = gvArrInstcdNm[result.dsDiseaseCodeListW[i]['INSTCD']];
				}
			}*/
			
			if(result.dsDiseaseCodeListW != undefined){
				gvDataSourceDiseaseCodeW.localdata = result.dsDiseaseCodeListW;				
			}
			
			$("#searchWGrid").jqxGrid('clear');			
			$("#searchWGrid").jqxGrid('updatebounddata', 'cells');
			
			$('#searchWGrid').jqxGrid('clearselection');
			
			//로딩끝
			gvSpinnerClose();
			
			break;
			
		case "getDiseaseCodeTreeW":
			console.log(result);
			gvDiseaseCodeTreeW = result.gvDiseaseCodeTreeW;
			
			if(typeof gvDiseaseCodeTreeW === 'undefined'){
				return;
			}
			
			setTreeDiseaseCodeW();
			
			break;
			
		case "getParentDataW":
			
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsDiseaseParentCodeListW.length; i++){
					result.dsDiseaseParentCodeListW[i]['INSTCDNM'] = gvArrInstcdNm[result.dsDiseaseParentCodeListW[i]['INSTCD']];
				}
			}*/
			
			gvDataSourceDiseaseParentCodeW.localdata = result.dsDiseaseParentCodeListW;
			
			$("#searchSelectWGrid").jqxGrid('clear');			
			$("#searchSelectWGrid").jqxGrid('updatebounddata', 'cells');
			
			$('#searchSelectWGrid').jqxGrid('clearselection');
			
			break;
			
		case "getSearchSelectItemContDetlWList":
			
			//사업장 코드가 있을때
			/*if(jObj.INSTCD_YN == "Y"){
				//사업장명 추가
				for(var i=0; i<result.dsItemContDetlList.length; i++){
					result.dsItemContDetlList[i]['INSTCDNM'] = gvArrInstcdNm[result.dsItemContDetlList[i]['INSTCD']];
				}
			}*/
			
			gvItemContDetlWList = result.dsItemContDetlList;
			
			//console.log(gvItemContDetlWList);
			
			var selPerinxRows 	= gvItemContDetlWList;		//상병코드목록
			var selPerAuthRows 	= $('#searchSelectWGrid').jqxGrid('getrows');				//선택된 상병코드 목록
			
			for(var i=0; i<selPerinxRows.length; i++){
				var dsPerinx = selPerinxRows[i];
				var flag = true;
				
				
				//중복체크	
				for(var j=0; j < selPerAuthRows.length; j++){
					var dsPerAuth = selPerAuthRows[j];
					
					//사업장 코드가 있을때
					/*if(jObj.INSTCD_YN == "Y"){
						if(dsPerAuth.INSTCD === dsPerinx.INSTCD){
							if(dsPerAuth.CODE === dsPerinx.CODE){
								flag = false;
								break;
							}
						}
					}else{	//사업장코드가 없을때
*/						if(dsPerAuth.CODE === dsPerinx.CODE){
							flag = false;
							break;
						}
					/*}*/
	    		}	
				
				if(flag){
					dsPerinx.ROW_STATE = 'C';
					
					$("#searchSelectWGrid").jqxGrid('addrow', null, selPerinxRows[i]);					
				}
			}
			
			$('#searchSelectWGrid').jqxGrid('clearselection');
			
			break;
			
		case "setDiseaseCodeForTreeW":
			
			getDiseaseCodeTreeW();

			$('#modalWSave').modal('hide');
			
			BootstrapDialog.alert(COM_0001);
			
			
			break;
			
		case "delDiseaseCodeForTreeW":
			BootstrapDialog.alert(COM_0003);
			
			getDiseaseCodeTreeW();
			
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
function getDataW(){
	var dataSet = {
			
	};
	dataSet.SEARCH_KEY 	= $('#searchConditionW').val();
	dataSet.SEARCH_VAL 	= $('#searchValW').val();
	dataSet.INSTCD_YN	= jObj.INSTCD_YN;
	dataSet.INSTCD		= strINSTCD2;
	
	callServiceSpinnerClose("getDataW" ,"common/modal/getDiseaseCodeListW" ,dataSet ,"serviceCallbackW");
}

function getParentDataW(){
	var param = "";
		
	if(argsVal){								//넘어온 값이 있을때만 실행
		var argsArr = argsVal.split('|');
		
		/*for(var i=0; i<argsArr.length; i++){
			param = param + "'" + argsArr[i] + "',";
		}*/
		
		//사업장 코드가 있을때
		/*if(jObj.INSTCD_YN == "Y"){
			for(var i=0; i<argsArr.length; i++){
				var argsArrSplit = argsArr[i].split('__');
				param = param + "'" + argsArrSplit[0] + "^" + argsArrSplit[1] + "',";
			}
		}else{	//사업장코드가 없을때
*/			for(var i=0; i<argsArr.length; i++){
				param = param + "'" + argsArr[i] + "',";
			}
		/*}*/
		
		param = param.slice(0,-1);
		
		var dataSet = {
				
		};
		dataSet.SEARCH_VAL	= param;
		dataSet.INSTCD_YN 	= jObj.INSTCD_YN;
		dataSet.INSTCD 		= strINSTCD2;
		
		callService("getParentDataW" ,"common/modal/getDiseaseParentCodeListW" ,dataSet ,"serviceCallbackW");
	}
}

function getDiseaseCodeTreeW()
{
	var dataSet = {};
	dataSet.perCode = $.session.get('PER_CODE');
	dataSet.deptCode = $.session.get('DEPT_CODE');
	dataSet.perName = $.session.get('PER_NAME');
	dataSet.tableNm = "CC_DISINX_LOV";
	dataSet.code1 = "P";
	dataSet.code2 = "D";
	dataSet.code3 = "A";
	

//	동기방식	
	callService("getDiseaseCodeTreeW", "/common/modal/getDiseaseCodeTreeW", dataSet, "serviceCallbackW");
	
}

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function initW()
{
	args = $('#args').val();
	
	$args = $('#args');
	
	jObj = JSON.parse($args.val());
	
	argsVal = jObj.VALUE;
	
	if(gvINSTCD == '030'){
		strINSTCD = gvINSTCDTemp1;
		strINSTCD2 = gvINSTCDTemp2;
	}else{
		strINSTCD = "'"+ gvINSTCD +"'";
		strINSTCD2 = "'"+ gvINSTCD +"'";
	}
	
	//jObj.INSTCD_YN = "Y";
	
	$('#searchValW').val('');
	$('#searchConditionW option:eq(0)').prop('selected', true);
	
	//tree에서 받아온 데이터초기화
	setSelectGridWClear();
	
	setGridW();	
	
	setSelectGridW();
	
	getDiseaseCodeTreeW();
	
	getDataW();
	
	getParentDataW();
}

/**
 * grid setting
 * @returns
 */
function setGridW()
{
//	---------------------------------------------------
	
	
	//사업장 코드가 있을때
	/*if(jObj.INSTCD_YN == "Y"){
		var datafields =  [
		                   	{ name: "INSTCD"},
		                   	{ name: "INSTCDNM", type:"string"},
			       	    	{ name: 'CODE'},
			    	        { name: 'ENAM'},
			    	        { name: 'KNAM'}
			    	    ];
		var columns = [
		            {text : "병원구분코드",datafield : "INSTCD",width:"20%"},
		            {text : "병원명",datafield : "INSTCDNM",width:"15%"},
		   	    	{ text: '상병코드', datafield: 'CODE', width: "15%"},
			        { text: '영문명', datafield: 'ENAM', width: "25%"},
			        { text: '한글명', datafield: 'KNAM', width: "20%"}
			    ];
	}else{*/
		var datafields =  [
			       	    	{ name: 'CODE'},
			    	        { name: 'ENAM'},
			    	        { name: 'KNAM'}
			    	    ];
		var columns = [
		   	    	{ text: '상병코드', datafield: 'CODE', width: "25%"},
			        { text: '영문명', datafield: 'ENAM', width: "35%"},
			        { text: '한글명', datafield: 'KNAM', width: "35%"}
			    ];
	/*}*/
	
	gvDataSourceDiseaseCodeW = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false,
	    localdata: gvDiseaseCodeListW
	};
	
	
	gvDataAdapterDiseaseCodeW = new $.jqx.dataAdapter(gvDataSourceDiseaseCodeW, {
		downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchWGrid").jqxGrid({
	    source: gvDataAdapterDiseaseCodeW,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'checkbox',
		sortable: true,
	    columns: columns
	}); 
}

function setSelectGridW()
{
//	---------------------------------------------------
	
	//사업장 코드가 있을때
	/*if(jObj.INSTCD_YN == "Y"){
		var datafields =  [
		                   	{ name: "INSTCD", type:"string"},
		                   	{ name: "INSTCDNM", type:"string"},
			       	    	{ name: 'CODE'},
			    	        { name: 'ENAM'},
			    	        { name: 'KNAM'}
			    	    ];
		var columns = [
		            {text : "병원구분코드",datafield : "INSTCD",width:"20%"},
		            {text : "병원명",datafield : "INSTCDNM",width:"15%"},
		   	    	{ text: '상병코드', datafield: 'CODE', width: "20%"},
			        { text: '영문명', datafield: 'ENAM', width: "25%"},
			        { text: '한글명', datafield: 'KNAM', width: "20%"}
			    ];
	}else{*/
		var datafields =  [
			       	    	{ name: 'CODE'},
			    	        { name: 'ENAM'},
			    	        { name: 'KNAM'}
			    	    ];
		var columns = [
		   	    	{ text: '상병코드', datafield: 'CODE', width: "25%"},
			        { text: '영문명', datafield: 'ENAM', width: "35%"},
			        { text: '한글명', datafield: 'KNAM', width: "35%"}
			    ];
	/*}*/
//	상병코드	
	gvDataSourceDiseaseParentCodeW = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false
	};
	
	
	gvDataAdapterDiseaseParentCodeW = new $.jqx.dataAdapter(gvDataSourceDiseaseParentCodeW, {
		downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelectWGrid").jqxGrid({
	    source: gvDataAdapterDiseaseParentCodeW,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'singlerow',
		sortable: true,
	    columns: columns
	}); 
}

/**
 * 트리 초기화
 */
function setTreeDiseaseCodeW()
{
	var sourceW = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'icon'}, 
            { name: 'parentid' },
            { name: 'text' },
            { name: 'value' }
        ],
        id: 'id',
        localdata: gvDiseaseCodeTreeW

    };
	
	var treeAdapterW = new $.jqx.dataAdapter(sourceW);
	
	treeAdapterW.dataBind();
	
	var recordsW = treeAdapterW.getRecordsHierarchy('id', 'parentid'
												 ,'items'
												 ,[ 
													 {name : 'text',map : 'label'}, 
													 {name : 'value',map : 'value'} 
													 ]);
	$('#diseaseCodeTreeW').jqxTree({
		allowDrag : true,
		allowDrop : false,
		width : '100%',
		height : '480',
		source : recordsW,
		checkboxes : true,
		hasThreeStates : true,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#diseaseCodeTreeW').on('expand', function(event) {
		var args = event.args;
		var item = $('#diseaseCodeTreeW').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#diseaseCodeTreeW div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#diseaseCodeTreeW div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$("#diseaseCodeTreeW .jqx-checkbox").css("margin-top", "4.5px");

	$('#diseaseCodeTreeW').on('collapse', function(event) {
		var item = $('#diseaseCodeTreeW').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#diseaseCodeTreeW div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#diseaseCodeTreeW div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	
	 
	$("#diseaseCodeTreeW").on('dragEnd', function(event) {
		if (event.args.label) {
			var ev = event.args.originalEvent;
			var x = ev.pageX;
			var y = ev.pageY;
			if (event.args.originalEvent && event.args.originalEvent.originalEvent && event.args.originalEvent.originalEvent.touches) {
				var touch = event.args.originalEvent.originalEvent.changedTouches[0];
				x = touch.pageX;
				y = touch.pageY;
			}
			var offset = $("#searchSelectWGrid").offset();
			var width = $("#searchSelectWGrid").width();
			var height = $("#searchSelectWGrid").height();
			var right = parseInt(offset.left) + width;
			var bottom = parseInt(offset.top) + height;

			if (x >= parseInt(offset.left) && x <= right) {
				if (y >= parseInt(offset.top) && y <= bottom) {				//drag 가능영역
					console.log(event);
					var args  = event.args;
					var level = args.owner._dragItem == null ? "" : args.owner._dragItem.level;
					var item = args.owner._dragItem;
					var itemParents = args.owner._dragItem.parentItem;
					var parentEle = item.parentElement;
					var parent = $('#diseaseCodeTreeW').jqxTree('getItem', parentEle);
					
					if(level === 1){
						var dataSet = {};
						dataSet.tableNm 	= "CC_DISINX_LOV";
						dataSet.codeNm 		= "CODE";
						dataSet.enamNm 		= "ENAM";
						dataSet.knamNm 		= "KNAM";
						dataSet.label 		= args.label;
						dataSet.value 		= args.value;
						dataSet.id 			= parent.id;
						dataSet.INSTCD_YN 	= jObj.INSTCD_YN;
						
						//가져온 데이터 title 저장
						$('#saveNameW').val(args.label);
						
						//가져온 데이터 seq 저장
						$('#saveSeqW').val(args.value);
						
						callService("getSearchSelectItemContDetlWList"
								,"/common/modal/getSearchSelectItemContDetlWList"
								,dataSet
								,"serviceCallbackW");
						
					}else{
						return;
					}
				}
			}
		}
		
	});
	

};


//tree에서 받아온 정보 모두 초기화
function setSelectGridWClear(){
	$("#searchSelectWGrid").jqxGrid('clear');	//table클리어
	$('#saveNameW').val('');					//트리 title 클리어
	$('#saveSeqW').val('');						//트리 seq 클리어
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEventW(){
	makeiCheck('.saveModeW');
	
	//modal창 열림버튼 이벤트
	$(document).on('click','.popW', function(){
		
		
	});
	
	//검색버튼
	$('#btnSearchW').on('click',function(e){
		
		if(isNullOrEmpty($('#searchValW').val())){
			BootstrapDialog.alert(COM_0006);
			return;
			
		}
		
		getDataW();
		
		
	});
	
	$('#searchValW').on('keypress',function(e){
		
		if(e.keyCode === 13){
			if(isNullOrEmpty($('#searchValW').val())){
				BootstrapDialog.alert(COM_0006);
				return;
				
			}
			
			getDataW();
			
		}
	});
	
	//상병코드 추가	
	$(document).on('click', '#selectItemW', function(){
		var selPerinxRows 	= $('#searchWGrid').jqxGrid('getselectedrowindexes');		//상병코드목록
		var selPerAuthRows 	= $('#searchSelectWGrid').jqxGrid('getrows');				//선택된 상병코드 목록
		
		for(var i=0; i< selPerinxRows.length; i++){
			var dsPerinx = $('#searchWGrid').jqxGrid('getrowdata', selPerinxRows[i]);	//selPerinxRows[i] 선택된 로우의 index
			
			var flag = true;
			//중복체크	
			for(var j=0; j < selPerAuthRows.length; j++){
				var dsPerAuth = selPerAuthRows[j];
				
				/*if(dsPerAuth.CODE === dsPerinx.CODE){
					BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
					$('#searchWGrid').jqxGrid('clearselection');
					flag = false;
					break;
				}*/
				
				//사업장 코드가 있을때
				/*if(jObj.INSTCD_YN == "Y"){
					if(dsPerAuth.INSTCD === dsPerinx.INSTCD){
						if(dsPerAuth.CODE === dsPerinx.CODE){
							//BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
							$('#searchWGrid').jqxGrid('clearselection');
							flag = false;
							break;
						}
					}
				}else{	//사업장코드가 없을때
*/					if(dsPerAuth.CODE === dsPerinx.CODE){
						//BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
						$('#searchWGrid').jqxGrid('clearselection');
						flag = false;
						break;
					}
				/*}*/
    		}
			
			if(flag){
				dsPerinx.ROW_STATE = 'C';
				
				$("#searchSelectWGrid").jqxGrid('addrow', null, dsPerinx);			
			}
			
		}
		
		$('#searchWGrid').jqxGrid('clearselection');

		
	});
	
	//상병코드 삭제
	$(document).on('click', '#cancelItemW', function(){
		var rows = $("#searchSelectWGrid").jqxGrid('selectedrowindexes');
        var selectedRecords = new Array();
        
        for(var i = (rows.length-1); i >= 0; i--) {
            var row = $("#searchSelectWGrid").jqxGrid('getrowdata', rows[i]);
            $("#searchSelectWGrid").jqxGrid('deleterow', row.uid);
        }
	});
	
	//조건 등록
	$('#submitWBtn').on('click',function(e){
		var rows = $('#searchSelectWGrid').jqxGrid('getrows');
		var retObj = '';
		
		for(var i=0; i< rows.length; i++){
			var dsValue = rows[i];	//selPerinxRows[i] 선택된 로우의 index
			
			/*if(isNull(retObj)){
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					retObj = dsValue.INSTCD +"__"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
					retObj = dsValue.CODE;
				}
				
			}else{*/
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					if(isNull(retObj)){
						retObj = dsValue.INSTCD +"__"+ dsValue.CODE;
					}else{
						retObj += '|' + dsValue.INSTCD +"__"+ dsValue.CODE;
					}
					
					
				}else{	//사업장코드가 없을때					
					if(isNull(retObj)){
						retObj = dsValue.CODE;
					}else{
						retObj += '|' + dsValue.CODE;	
					}
					
				}
				
			/*}*/
			
		}
		
		if(retObj == ""){
			retObj = "clear";
		}
		
		$("#result").val(retObj);
		
		$('#popWModal').modal('hide');
		
	});
	
	//조건 초기화
	$('#clearWBtn').on('click', function(){
		setSelectGridWClear();
	});
	
	//조건저장
	$('#createWBtn').on('click', function(){
		var rows = $('#searchSelectWGrid').jqxGrid('getrows');

		if(rows.length > 0){
			$('#lovNmW').val('');
			$('#insertModeW').val('P').prop("selected", true);
			if($('#saveNameW').val()){					//값을 불러왔을때
				$("#saveW").iCheck('check');
				$('#saveW').iCheck('enable');
				$('#lovNmW').val($('#saveNameW').val());
				$('#lovNmW').attr('disabled', true);
			}else{										//값을 불러오지 않았을때
				$("#newSaveW").iCheck('check');
				$('#lovNmW').attr('disabled', false);
				$('#saveW').iCheck('disable');
			}
			
			$('#modalWSave').modal();
		}else{
			BootstrapDialog.alert('상병코드를 '+COM_0013);
			return;
		}
		
	});
	
	//라디오 새이름 저장 이벤트
	$("#newSaveW").on('ifClicked', function(){
		$('#lovNmW').val('');
		$('#lovNmW').attr('disabled', false);
	});
	
	//라디오 그냥저장 이벤트
	$("#saveW").on('ifClicked', function(){
		$('#lovNmW').attr('disabled', true);
		if($('#saveNameW').val()){
			$('#lovNmW').val($('#saveNameW').val());
		}else{
			if($('#lovNmW').val() == ""){
				BootstrapDialog.alert('상병코드 LOV 이름을 '+COM_0014);
				$("#newSaveW").iCheck('check');
			}
		}
	});
	
	//모달 > 저장버튼
	$('#codeSaveW').on('click', function(){		
		if($('#lovNmW').val() == ""){
			BootstrapDialog.alert('상병코드 LOV 이름을 '+COM_0014);
			return;
		}else{
			var insertMode = $('#insertModeW option:selected').val();
			var json;
			
			if(insertMode == "P"){
				json = $("#searchSelectWGrid").jqxGrid('exportdata', 'json');
			}
			
			var dataSet = {};
						
			var saveType = $(':radio[name=saveModeW]:checked').val();
			
			if(saveType == "newSave"){			//새이름 저장
				dataSet.tableNm 		= "CC_DISINX_LOV";
				dataSet.codeCol 		= "CODE";
				dataSet.enamCol 		= "ENAM";
				dataSet.knamCol 		= "KNAM";
				dataSet.perCode 		= $.session.get('PER_CODE');
				dataSet.perName 		= $.session.get('PER_NAME');
				dataSet.deptCode 		= $.session.get('DEPT_CODE');
				dataSet.lovNm 			= $('#lovNmW').val();
				dataSet.mode 			= "W";
				dataSet.insertMode 		= insertMode;			//LOV 분류
				dataSet.data 			= json;
				dataSet.beforeMode 		= beforeMode;
				dataSet.beforeSeq 		= beforeSeq;
				dataSet.code 			= "'P','D','A'";
				dataSet.INSTCD_YN 		= jObj.INSTCD_YN;
				
				callService("setDiseaseCodeForTreeW", "common/modal/insertDiseaseCodeForTreeW", dataSet, "serviceCallbackW");
			}else{								//저장
				dataSet.tableNm 		= "CC_DISINX_LOV";
				dataSet.codeCol 		= "CODE";
				dataSet.enamCol 		= "ENAM";
				dataSet.knamCol 		= "KNAM";
				dataSet.perCode 		= $.session.get('PER_CODE');
				dataSet.perName 		= $.session.get('PER_NAME');
				dataSet.deptCode 		= $.session.get('DEPT_CODE');
				dataSet.lovNm 			= $('#lovNmW').val();
				dataSet.mode 			= "W";
				dataSet.insertMode 		= insertMode;			//LOV 분류
				dataSet.data 			= json;
				dataSet.maxSeq 			= $('#saveSeqW').val();
				dataSet.SEQ 			= $('#saveSeqW').val();
				dataSet.delCode 		= "'K','P'";
				dataSet.INSTCD_YN 		= jObj.INSTCD_YN;
				
				callService("setDiseaseCodeForTreeW", "common/modal/updateDiseaseCodeForTreeW", dataSet, "serviceCallbackW");
			}
			
			
		}
	});
	
	//모달 > 상병코드 삭제
	$("#btnShareDeleteW").click(function() {
		var items = $('#diseaseCodeTreeW').jqxTree('getCheckedItems');
		if(items==""){
			BootstrapDialog.alert(COM_0015);
			return;
		}
		
		var deleteSeq = "";
		var deleteMode = "";
		var perCode = $.trim($.session.get('PER_CODE'));
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var temp = item.id.split("_");
			if (temp[0] == "A" || temp[0] == "D" || temp[0] == "P") {		//제목폴더 skip
				continue;
			}else if (temp[0] != perCode) {									//타인공유 제한
				BootstrapDialog.alert(COM_0016);
				return;
			}

			if (item.parentId == '0' || temp[2] == 'undefined') {
				continue;
			}
			deleteSeq += temp[2] + ",";
			deleteMode += item.parentId + ",";
		}
		deleteSeq = deleteSeq.substring(0, deleteSeq.lastIndexOf(","));
		deleteMode = deleteMode.substring(0, deleteMode.lastIndexOf(","));
		
		BootstrapDialog.confirm(COM_0005, function(result){
            if(result) {
            	var dataSet = {
            			tableNm		: "CC_DISINX_LOV",
            			maxSeq		: deleteSeq,
            			perCode		: $.session.get('PER_CODE')
        		};
        		
        		callService("delDiseaseCodeForTreeW", "/common/modal/deleteDiseaseCodeForTreeW", dataSet, "serviceCallbackW");
            }
        });

	});
	
	//전체공유 & 과공유
	$('.btnShareW').on('click', function(){
		beforeMode = "";
		beforeSeq = "";
		var insertModeCode = $(this).attr('insertModeCode');
		
		var items = $('#diseaseCodeTreeW').jqxTree('getCheckedItems');
		var chkNum = 0;
		
		var itemsLength = items.length;
		
		if (itemsLength == 0) {
			BootstrapDialog.alert(COM_0017);
			return;
		}
		
		if(items[0]['id']=="A" || items[0]['id']=="D" || items[0]['id']=="P"){
			itemsLength = itemsLength - 1;
			chkNum = 1;
		}
		
		beforeSeq = items[chkNum]['value'];
		beforeMode = items[chkNum]['parentId'];
		
		if (itemsLength > 1) {
			BootstrapDialog.alert(COM_0018);
			return;
		}
		
		$("#newSaveW").iCheck('check');
		$('#insertModeW').val(insertModeCode).prop("selected", true);
		$('#lovNmW').attr('disabled', false);
		$('#lovNmW').val(items[chkNum]['label']);
		$('#saveW').iCheck('disable');
		
		$('#modalWSave').modal();
	});
}




