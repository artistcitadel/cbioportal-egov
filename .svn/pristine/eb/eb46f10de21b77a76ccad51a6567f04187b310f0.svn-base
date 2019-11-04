/**
 * 모달창 W
 * @Page : modalW
 */
var gvDiseaseCodeListP	= [];
var gvSelectBoxData = [];

var gvDataSourceDiseaseCodeP;
var gvDataSourceSelectDiseaseCodeP;

var code = "A";


var args;

var $args;

var jObj;

var argsVal;

/**
 * Application Ready
 */
$(document).ready(function(){
	
	/*$('#submitBtnP').on('click', function(){
		$('#result').val('AA600|AA601');
		$('#popPModal').modal('hide');
	});*/
	
	initEventP();
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
function serviceCallbackP(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){			
		case "getSelectBox":
			console.log(result);
			dsSelectBoxList = result['dsSelectBoxList'];
			
			if(dsSelectBoxList.length > 0){
				$("#" + result['idKey']).jqxComboBox({ source: dsSelectBoxList });
			}
			
			break;
			
		case "getDataP":
			console.log(result);
			
			gvDiseaseCodeListP.localdata = result.dsCodeListP;
			gvDiseaseCodeListP[result.idKey] = result.dsCodeListP;
			
			if(result["dsCodeListP"].length > 0){
				if(result.idKey == code){
					$("#searchPGrid"+result.idKey).jqxGrid('clear');			
					$("#searchPGrid"+result.idKey).jqxGrid('updatebounddata', 'cells');
					
					$("#searchPGrid"+result.idKey).jqxGrid('clearselection');
				}
			}
			
			break;
			
		case "getParentDataP":
			gvDataSourceDiseaseParentCodeP.localdata = result.dsDiseaseParentCodeListP;
			
			$("#searchSelectPGrid").jqxGrid('clear');			
			$("#searchSelectPGrid").jqxGrid('updatebounddata', 'cells');
			
			$("#searchSelectPGrid").jqxGrid('clearselection');
			
			break;
			
		case "getDiseaseCodeTreeP":
			gvDiseaseCodeTreeP = result.gvDiseaseCodeTreeP;
			
			if(typeof gvDiseaseCodeTreeP === 'undefined'){
				return;
			}
			
			setTreeDiseaseCodeP();
			
			break;
			
		case "setDiseaseCodeForTreeP":
			getDiseaseCodeTreeP();

			$('#modalPSave').modal('hide');
			
			BootstrapDialog.alert(COM_0001);
			
			break;
		
		case "delDiseaseCodeForTreeP":
			BootstrapDialog.alert(COM_0003);
			
			getDiseaseCodeTreeP();
			
			break;
		
		case "getSearchSelectItemContDetlPList":
			
			gvItemContDetlWList = result.dsItemContDetlList;
			
			//console.log(gvItemContDetlWList);
			
			var selPerinxRows 	= gvItemContDetlWList;		//상병코드목록
			var selPerAuthRows 	= $('#searchSelectPGrid').jqxGrid('getrows');				//선택된 상병코드 목록
			
			for(var i=0; i<selPerinxRows.length; i++){
				var dsPerinx = selPerinxRows[i];
				var flag = true;
				
				
				//중복체크	
				for(var j=0; j < selPerAuthRows.length; j++){
					var dsPerAuth = selPerAuthRows[j];
					
					if(dsPerAuth.CODE === dsPerinx.CODE){
						flag = false;
						break;
					}
	    		}	
				
				if(flag){
					dsPerinx.ROW_STATE = 'C';
					
					$("#searchSelectPGrid").jqxGrid('addrow', null, selPerinxRows[i]);					
				}
			}
			
			$('#searchSelectPGrid').jqxGrid('clearselection');
			
			break;
		
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 처방코드 조회
 * @returns
 */
function getDataP(){	
	var dataSet = {
			
	};
	dataSet.SEARCH_KEY 			= $('#searchConditionP'+code).val();
	dataSet.SEARCH_VAL 			= $('#searchValP'+code).val();
	dataSet.id 					= code;
	dataSet.ORDKIND				= $("#ORD_KIND").val();
	dataSet.ORDSCLS				= $("#ORD_SCLS").val();
	dataSet.LBSLCODE			= $('#LB_SL_CODE').val();
	dataSet.RADPACSPECIALITY 	= $('#RAD_PACSPECIALITY').val();
	dataSet.SPSLCODE 			= $('#SP_SL_CODE').val();
	dataSet.PATHSLCODE 			= $('#PATH_SL_CODE').val();
	dataSet.MBTHRUCHAN 			= $('#MB_THRU_CHAN').val();
	dataSet.MBCLSSCODE 			= $('#MB_CLSS_COED').val();
	dataSet.OPSLCODE 			= $('#OP_SL_CODE').val();
	
	callService("getDataP" ,"common/modal/getCodeListP" ,dataSet ,"serviceCallbackP");
}

//selectbox data가져오기
function getSelectBoxDataP(){
	for(var i=0; i<gvPopPSel[code].length; i++){
		if(gvPopPSel[code][i].length > 1){
			var dataSet = {};
			
			dataSet.id = gvPopPSel[code][i][0];
			dataSet.columnName = gvPopPSel[code][i][1];
			dataSet.columnKorName = gvPopPSel[code][i][2];
			dataSet.tableName = gvPopPSel[code][i][3];
			dataSet.whereColumnName = gvPopPSel[code][i][4];
			dataSet.whereColumnData = gvPopPSel[code][i][5];
			dataSet.logic = gvPopPSel[code][i][6];		
			
			callService("getSelectBox", "common/modal/selectSelectBoxP", dataSet, "serviceCallbackP");
		}else{				//로컬데이터로 셀렉트박스 생성
			$("#" + gvPopPSel[code][i][0]).jqxComboBox({ source: selBoxDara[gvPopPSel[code][i][0]] });
		}
		
	}
}

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function initP()
{
	args = $('#args').val();
	
	$args = $('#args');
	
	jObj = JSON.parse($args.val());
	
	argsVal = jObj.VALUE;
	
	jObj.INSTCD_YN = "Y";
	
	$('#searchValP').val('');
	$('#searchConditionP option:eq(0)').prop('selected', true);
	
	setGridP();	
	
	setSelectGridP();
	
	setSelectBoxP();
	
	getSelectBoxDataP();
	
	getDataP();		
	
	getParentDataP();
	
	getDiseaseCodeTreeP();
	
	initEventP();
}

/**
 * grid setting
 * @returns
 */
function setGridP()
{
//	---------------------------------------------------
	var gridDatafieldsPVal =  gridDatafieldsP[code];
	var gridColumnsPVal = gridColumnsP[code];
	
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		//jqx가 두번 실행됨 ㅠㅠ 두번실행될때 메타정보 추가안함
		if(gridDatafieldsPVal[0]['name'] != 'INSTCD'){
			gridDatafieldsPVal.unshift({"name" : "INSTCD"});
		}
		if(gridColumnsPVal[0]['datafield'] != 'INSTCD'){
			gridColumnsPVal.unshift({"text" : "사업장코드","datafield" : "INSTCD","width":"100"});
		}
	}
	
	
//	처방코드 조회	
	gvDataSourceDiseaseCodeP = {
	    datatype: "json",
	    datafields: gridDatafieldsPVal,
	    cache: false,
	    localdata: gvDiseaseCodeListP
	};
	
	
	var gvDataAdapterDiseaseCodeP = new $.jqx.dataAdapter(gvDataSourceDiseaseCodeP, {
		downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#searchPGrid"+code).jqxGrid({
	    source: gvDataAdapterDiseaseCodeP,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'checkbox',
		sortable: true,
	    columns: gridColumnsPVal
	}); 
}

//셀렉트박스 생성
function setSelectBoxP(){
	for(var i=0; i<gvPopPSel[code].length; i++){
		var source = {
			datatype : "json",
			datafields : [ {
				name : 'CODE'
			}, {
				name : 'KNAM'
			}, {
				name : 'SUMNAM'
			} ],
			localdata : gvSelectBoxData
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#" + gvPopPSel[code][i][0]).jqxComboBox({
			selectedIndex : 0,
			source : dataAdapter,
			displayMember : "SUMNAM",
			valueMember : "CODE",
			width : "100%",
			height : 25,
			placeHolder : "전체",
			selectedIndex: -1
		});
		
//		$("#" + gvPopPSel[code][i][0]).jqxComboBox({ selectedIndex: -1 });
	}
	
}

//선택된 처방코드 그리드
function setSelectGridP()
{
//	---------------------------------------------------
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		var columns = [
		   	        { text: '사업장코드', datafield: 'INSTCD', width: "20%"},
			    	{ text: '상병코드', datafield: 'CODE', width: "20%"},
			        { text: '영문명', datafield: 'ENAM', width: "30%"},
			        { text: '한글명', datafield: 'KNAM', width: "30%"}
			    ];
		
		var datafields = [
		                  	{ name: 'INSTCD', type:"string"},
			      	    	{ name: 'CODE'},
			    	        { name: 'ENAM'},
			    	        { name: 'KNAM'}
			    	    ];
	}else{		//사업장 코드가 없을때
		var columns = [
				    	{ text: '상병코드', datafield: 'CODE', width: "20%"},
				        { text: '영문명', datafield: 'ENAM', width: "40%"},
				        { text: '한글명', datafield: 'KNAM', width: "40%"}
				    ];
		
		var datafields = [
		      	    	{ name: 'CODE'},
		    	        { name: 'ENAM'},
		    	        { name: 'KNAM'}
		    	    ];
	}
	
//	상병코드	
	gvDataSourceDiseaseParentCodeP = {
	    datatype: "json",
	    datafields: datafields,
	    cache: false
	};
	
	
	gvDataAdapterDiseaseParentCodeP = new $.jqx.dataAdapter(gvDataSourceDiseaseParentCodeP, {
		downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#searchSelectPGrid").jqxGrid({
	    source: gvDataAdapterDiseaseParentCodeP,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'singlerow',
		sortable: true,
	    columns: columns
	}); 
}

//tree에서 받아온 정보 모두 초기화
function setSelectGridPClear(){
	$("#searchSelectPGrid").jqxGrid('clear');	//table클리어
	$('#saveNameP').val('');					//트리 title 클리어
	$('#saveSeqP').val('');						//트리 seq 클리어
}

function getParentDataP(){
	
	var param = "";
		
	if(argsVal){								//넘어온 값이 있을때만 실행
		var argsArr = argsVal.split('|');
		
		//사업장 코드가 있을때
		if(jObj.INSTCD_YN == "Y"){
			for(var i=0; i<argsArr.length; i++){
				var argsArrSplit = argsArr[i].split('^');
				param = param + "'" + argsArrSplit[0] + "^" + argsArrSplit[1] + "',";
			}
		}else{	//사업장코드가 없을때
			for(var i=0; i<argsArr.length; i++){
				param = param + "'" + argsArr[i] + "',";
			}
		}
		
		param = param.slice(0,-1);
		
		var dataSet = {
				
		};
		dataSet.SEARCH_VAL = param;
		
		callService("getParentDataP" ,"common/modal/getDiseaseParentCodeListP" ,dataSet ,"serviceCallbackP");
	}
}


/**
 * 트리 초기세팅
 */
function setTreeDiseaseCodeP()
{
	console.log(gvDiseaseCodeTreeP);
	var sourceP = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'icon'}, 
            { name: 'parentid' },
            { name: 'text' },
            { name: 'value' }
        ],
        id: 'id',
        localdata: gvDiseaseCodeTreeP

    };
	
	var treeAdapterP = new $.jqx.dataAdapter(sourceP);
	
	treeAdapterP.dataBind();
	
	var recordsP = treeAdapterP.getRecordsHierarchy('id', 'parentid'
												 ,'items'
												 ,[ 
													 {name : 'text',map : 'label'}, 
													 {name : 'value',map : 'value'} 
													 ]);
	$('#diseaseCodeTreeP').jqxTree({
		allowDrag : true,
		allowDrop : false,
		width : '100%',
		height : '480',
		source : recordsP,
		checkboxes : true,
		hasThreeStates : true,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#diseaseCodeTreeP').on('expand', function(event) {
		var args = event.args;
		var item = $('#diseaseCodeTreeP').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#diseaseCodeTreeP div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#diseaseCodeTreeP div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$("#diseaseCodeTreeP .jqx-checkbox").css("margin-top", "4.5px");

	$('#diseaseCodeTreeP').on('collapse', function(event) {
		var item = $('#diseaseCodeTreeP').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#diseaseCodeTreeP div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#diseaseCodeTreeP div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	
	 
	$("#diseaseCodeTreeP").on('dragEnd', function(event) {
		if (event.args.label) {
			var ev = event.args.originalEvent;
			var x = ev.pageX;
			var y = ev.pageY;
			if (event.args.originalEvent && event.args.originalEvent.originalEvent && event.args.originalEvent.originalEvent.touches) {
				var touch = event.args.originalEvent.originalEvent.changedTouches[0];
				x = touch.pageX;
				y = touch.pageY;
			}
			var offset = $("#searchSelectPGrid").offset();
			var width = $("#searchSelectPGrid").width();
			var height = $("#searchSelectPGrid").height();
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
					var parent = $('#diseaseCodeTreeP').jqxTree('getItem', parentEle);
					
					if(level === 1){
						var dataSet = {};
						dataSet.tableNm = "CC_DISINX_LOV";
						dataSet.codeNm = "CODE";
						dataSet.enamNm = "ENAM";
						dataSet.knamNm = "KNAM";
						dataSet.label = args.label;
						dataSet.value = args.value;
						dataSet.id = parent.id;
						
						//가져온 데이터 title 저장
						$('#saveNameP').val(args.label);
						
						//가져온 데이터 seq 저장
						$('#saveSeqP').val(args.value);
						
						callService("getSearchSelectItemContDetlPList"
								,"/common/modal/getSearchSelectItemContDetlWList"
								,dataSet
								,"serviceCallbackP");
						
					}else{
						return;
					}
				}
			}
		}
		
	});
	

};

function getDiseaseCodeTreeP()
{
	var dataSet = {};
	dataSet.perCode = $.session.get('PER_CODE');
	dataSet.deptCode = $.session.get('DEPT_CODE');
	dataSet.perName = $.session.get('PER_NAME');
	dataSet.tableNm = "CC_DISINX_LOV";
	dataSet.code1 = "K";
	dataSet.code2 = "G";
	dataSet.code3 = "J";
	

//	동기방식	
	callServiceSync("getDiseaseCodeTreeP", "/common/modal/getDiseaseCodeTreeP", dataSet, "serviceCallbackP");
	
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEventP(){

	
	
	makeiCheck('.saveModeP');
	
	//modal창 열림버튼 이벤트
	$(document).on('click','.popP', function(){
		
	});
	
	//검색버튼
	$('.btnSearchP').on('click',function(e){
		
		/*if(isNullOrEmpty($('#searchValP'+code).val())){
			BootstrapDialog.alert(COM_0006);
			return;
		}*/
		
		getDataP();
		
		
	});
	
	$('.searchValP').on('keypress',function(e){
		
		if(e.keyCode === 13){
			/*if(isNullOrEmpty($(this).val())){
				BootstrapDialog.alert(COM_0006);
				return;
			}*/
			
			getDataP();
			
			
		}
	});

	//탭선택 시 code 변경
	$('.btnTab').on('click', function(){
		code = $(this).attr('code');
		
		if(!gvDiseaseCodeListP[code]){
			setGridP();	
			
			getDataP();
			
			setSelectBoxP();
			
			getSelectBoxDataP();
			
		}
		
	});
	
	//jqx combobx change
	$(document).on('change', '.jqxComboBox', function (event) {
		
		getDataP();
	});
	
	//처방코드 추가	
	$(document).on('click', '#selectItemP', function(){
		var selPerinxRows 	= $('#searchPGrid'+code).jqxGrid('getselectedrowindexes');		//처방코드목록
		var selPerAuthRows 	= $('#searchSelectPGrid').jqxGrid('getrows');				//선택된 처방코드 목록
		
		for(var i=0; i< selPerinxRows.length; i++){
			var dsPerinx = $('#searchPGrid'+code).jqxGrid('getrowdata', selPerinxRows[i]);	//selPerinxRows[i] 선택된 로우의 index
			
			var flag = true;
			//중복체크	
			for(var j=0; j < selPerAuthRows.length; j++){
				var dsPerAuth = selPerAuthRows[j];
				
				if(dsPerAuth.CODE === dsPerinx.CODE){
					BootstrapDialog.alert(dsPerinx.CODE + '는 이미 추가된 코드입니다.');
					$('#searchPGrid'+code).jqxGrid('clearselection');
					flag = false;
					break;
				}
    		}
			
			if(flag){
				dsPerinx.ROW_STATE = 'C';
				
				$("#searchSelectPGrid").jqxGrid('addrow', null, dsPerinx);			
			}
			
		}
		
		$('#searchPGrid'+code).jqxGrid('clearselection');

		
	});
	
	//처방코드 삭제
	$(document).on('click', '#cancelItemP', function(){
		var selectedrowindex = $("#searchSelectPGrid").jqxGrid('getselectedrowindex');
        var dsPerAuth = $('#searchSelectPGrid').jqxGrid('getrowdata', selectedrowindex);
		
        //row delete
        var id = $("#searchSelectPGrid").jqxGrid('getrowid', selectedrowindex);
		$("#searchSelectPGrid").jqxGrid('deleterow', id);
	});
	
	//조건 초기화
	$('#clearPBtn').on('click', function(){
		setSelectGridPClear();
	});
	
	//조건 등록
	$('#submitPBtn').on('click',function(e){
		var rows = $('#searchSelectPGrid').jqxGrid('getrows');
		var retObj = '';
		
		for(var i=0; i< rows.length; i++){
			var dsValue = rows[i];	//selPerinxRows[i] 선택된 로우의 index
			
			if(isNull(retObj)){
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					retObj = dsValue.INSTCD +"^"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
					retObj = dsValue.CODE;
				}
				
			}else{
				//사업장 코드가 있을때
				if(jObj.INSTCD_YN == "Y"){
					retObj += '|' + dsValue.INSTCD +"^"+ dsValue.CODE;
				}else{	//사업장코드가 없을때
					retObj += '|' + dsValue.CODE;
				}
				
			}
			
		}
		
		$("#result").val(retObj);
		
		$('#popPModal').modal('hide');
		
	});
	
	//조건저장
	$('#createPBtn').on('click', function(){
		var rows = $('#searchSelectPGrid').jqxGrid('getrows');

		if(rows.length > 0){
			$('#lovNmW').val('');
			$('#insertModeP').val('K').prop("selected", true);
			if($('#saveNameP').val()){					//값을 불러왔을때
				$("#saveP").iCheck('check');
				$('#saveP').iCheck('enable');
				$('#lovNmP').val($('#saveNameP').val());
				$('#lovNmP').attr('disabled', true);
			}else{										//값을 불러오지 않았을때
				$("#newSaveP").iCheck('check');
				$('#lovNmP').attr('disabled', false);
				$('#saveP').iCheck('disable');
			}
			
			$('#modalPSave').modal();
		}else{
			BootstrapDialog.alert('처방코드를 '+COM_0013);
			return;
		}
		
	});
	
	//모달 > 저장버튼
	$('#codeSaveP').on('click', function(){		
		if($('#lovNmP').val() == ""){
			BootstrapDialog.alert('처방코드코드 LOV 이름을 '+COM_0014);
			return;
		}else{
			var insertMode = $('#insertModeP option:selected').val();
			var json;
			
			if(insertMode == "K"){
				json = $("#searchSelectPGrid").jqxGrid('exportdata', 'json');
			}
			
			var dataSet = {};
						
			var saveType = $(':radio[name=saveModeP]:checked').val();
			
			if(saveType == "newSave"){			//새이름 저장
				dataSet.tableNm 		= "CC_DISINX_LOV";
				dataSet.codeCol 		= "CODE";
				dataSet.enamCol 		= "ENAM";
				dataSet.knamCol 		= "KNAM";
				dataSet.perCode 		= $.session.get('PER_CODE');
				dataSet.perName 		= $.session.get('PER_NAME');
				dataSet.deptCode 		= $.session.get('DEPT_CODE');
				dataSet.lovNm 			= $('#lovNmP').val();
				dataSet.mode 			= "P";
				dataSet.insertMode 		= insertMode;			//LOV 분류
				dataSet.data 			= json;
				dataSet.beforeMode 		= beforeMode;
				dataSet.beforeSeq 		= beforeSeq;
				dataSet.code 			= "'K','G','J'";
				console.log(dataSet);
				
				//callService("setDiseaseCodeForTreeP", "common/modal/insertDiseaseCodeForTreeW", dataSet, "serviceCallbackP");
				return;
			}else{								//저장
				dataSet.tableNm 		= "CC_DISINX_LOV";
				dataSet.codeCol 		= "CODE";
				dataSet.enamCol 		= "ENAM";
				dataSet.knamCol 		= "KNAM";
				dataSet.perCode 		= $.session.get('PER_CODE');
				dataSet.perName 		= $.session.get('PER_NAME');
				dataSet.deptCode 		= $.session.get('DEPT_CODE');
				dataSet.lovNm 			= $('#lovNmP').val();
				dataSet.mode 			= "P";
				dataSet.insertMode 		= insertMode;			//LOV 분류
				dataSet.data 			= json;
				dataSet.maxSeq 			= $('#saveSeqP').val();
				dataSet.SEQ 			= $('#saveSeqP').val();
				dataSet.delCode 		= "'K','P'";
				
				callService("setDiseaseCodeForTreeP", "common/modal/updateDiseaseCodeForTreeW", dataSet, "serviceCallbackP");
				return;
			}
			
			
		}
	});
	
	//전체공유 & 과공유
	$('.btnShareP').on('click', function(){
		beforeMode = "";
		beforeSeq = "";
		var insertModeCode = $(this).attr('insertModeCode');
		
		var items = $('#diseaseCodeTreeP').jqxTree('getCheckedItems');
		var chkNum = 0;
		
		var itemsLength = items.length;
		
		if (itemsLength == 0) {
			BootstrapDialog.alert(COM_0017);
			return;
		}
		
		if(items[0]['id']=="J" || items[0]['id']=="G" || items[0]['id']=="K"){
			itemsLength = itemsLength - 1;
			chkNum = 1;
		}
		
		beforeSeq = items[chkNum]['value'];
		beforeMode = items[chkNum]['parentId'];
		
		if (itemsLength > 1) {
			BootstrapDialog.alert(COM_0018);
			return;
		}
		
		$("#newSaveP").iCheck('check');
		$('#insertModeP').val(insertModeCode).prop("selected", true);
		$('#lovNmP').attr('disabled', false);
		$('#lovNmP').val(items[chkNum]['label']);
		$('#saveP').iCheck('disable');
		
		$('#modalPSave').modal();
	});
	
	//모달 > 상병코드 삭제
	$("#btnShareDeleteP").click(function() {
		var items = $('#diseaseCodeTreeP').jqxTree('getCheckedItems');
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
			if (temp[0] == "J" || temp[0] == "G" || temp[0] == "K") {		//제목폴더 skip
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
        		
        		callService("delDiseaseCodeForTreeP", "/common/modal/deleteDiseaseCodeForTreeW", dataSet, "serviceCallbackP");
            }
        });

	});
}


//테이블 옵션
//A: 전체, B: 진단검사, C: 영상검사, D: 특수검사, E: 병리검사, F: 투약, G: 수술
var gridDatafieldsP = {
	'A' : [
    		{name : "CODE"}, 
    		{name : "KNAM"},
    		{name : "ENAM"}, 
    		{name : "ORD_SNAM"}, 
    		{name : "ORD_ADAT"}, 
    		{name : "ORD_ASAT"}, 
    		{name : "ORD_KIND"}, 
    		{name : "ORD_SCLS"}, 
    		{name : "ORD_TRDP"}, 
    		{name : "ORD_PRFL"}, 
    		{name : "ORD_GRFL"}, 
    		{name : "ORD_BQTY"}, 
    		{name : "ORD_UNIT"}, 
    		{name : "ORD_DCFL"}, 
    		{name : "ORD_SPCD"}, 
    		{name : "ORD_SUCD"}, 
    		{name : "ORD_ETDT"}, 
    		{name : "ORD_ETPR"}
	],
	'B'	: [
			{name : "CODE"}, 
			{name : "KNAM"},
			{name : "ENAM"}, 
			{name : "ORD_SNAM"}, 
			{name : "ORD_ADAT"}, 
			{name : "ORD_ASAT"}, 
			{name : "LB_GR_FLAG"}, 
			{name : "LB_PB_G_CODE"}, 
			{name : "LB_PB_G_NAME"}, 
			{name : "LB_PB_CODE"}, 
			{name : "LB_PB_NAME"}, 
			{name : "LB_SP_CODE"}, 
			{name : "LB_SP_NAME"}, 
			{name : "LB_RS_B_CODE"},
			{name : "LB_RS_TYPE"},
			{name : "LB_TX_FLAG"},
			{name : "LB_M_MAX"},
			{name : "LB_M_MIN"},
			{name : "LB_W_MAX"},
			{name : "LB_W_MIN"},
			{name : "LB_Y_MAX"},
			{name : "LB_Y_MIN"},
			{name : "LB_TS_CODE"},
			{name : "LB_SL_CODE"},
			{name : "LB_SL_NAME"},
			{name : "LB_UNIT"},
			{name : "LB_HL_CHK"},
			{name : "LB_DP_CHK"},
			{name : "LB_DLT_FLAG"},
			{name : "LB_APP_FLAG"},
			{name : "LB_D_MAX"},
			{name : "LB_D_MIN"},
			{name : "LB_P_MAX"},
			{name : "LB_P_MIN"}
	],
	'C' : [
			{name : "CODE"}, 
			{name : "KNAM"},
			{name : "ENAM"}, 
			{name : "ORD_SNAM"}, 
			{name : "ORD_ADAT"}, 
			{name : "ORD_ASAT"}, 
			{name : "RAD_ROOM_CODE"}, 
			{name : "RAD_ROOM_NAME"}, 
			{name : "RAD_PART_CODE"}, 
			{name : "RAD_PART_NAME"}, 
			{name : "RAD_D_PAR_CODE"},
			{name : "RAD_D_PAR_NAME"},
			{name : "RAD_PACSPECIALITY"},
			{name : "RAD_CNT"}
	],
	'D' : [
			{name : "CODE"}, 
			{name : "KNAM"},
			{name : "ENAM"}, 
			{name : "ORD_SNAM"}, 
			{name : "ORD_ADAT"}, 
			{name : "ORD_ASAT"}, 
			{name : "FUN_L_CLS"}, 
			{name : "FUN_L_CLS_NAME"}, 
			{name : "FUN_M_CLS"}, 
			{name : "FUN_M_CLS_NAME"}, 
			{name : "FUN_S_CLS"}, 
			{name : "FUN_S_CLS_NAME"}, 
			{name : "FUN_DEPT_CODE"}, 
			{name : "FUN_DEPT_NAME"}
	],
	'E' : [
			{name : "CODE"}, 
			{name : "KNAM"},
			{name : "ENAM"}, 
			{name : "ORD_SNAM"}, 
			{name : "ORD_ADAT"}, 
			{name : "ORD_ASAT"}, 
			{name : "PT_B_CODE"}, 
			{name : "PT_B_NAME"}, 
			{name : "PT_D_CODE"}, 
			{name : "PT_D_NAME"}, 
			{name : "PT_SLIP"},
			{name : "PT_IOGU"}
	],
	'F' : [
			{name : "CODE"}, 
			{name : "KNAM"},
			{name : "ENAM"}, 
			{name : "ORD_SNAM"}, 
			{name : "ORD_ADAT"}, 
			{name : "ORD_ASAT"}, 
			{name : "MB_PROC_TYPE"}, 
			{name : "MB_CONT_QTY"}, 
			{name : "MB_CONT_UNIT"}, 
			{name : "MB_STND_QTY"}, 
			{name : "MB_STND_UNIT"},
			{name : "MB_PCK_UNIT"},
			{name : "MB_THRU_CHAN"},
			{name : "MB_MED_FLAG"},
			{name : "MB_ELEM_CODE"},
			{name : "MB_ELEM_NM"},
			{name : "MB_CLSS_COED"},
			{name : "MB_CLSS_NM"},
			{name : "MB_KEEP_FLAG1"},
			{name : "MB_KEEP_FLAG2"},
			{name : "MB_KEEP_FLAG3"},
			{name : "MB_INVN_FLAG"},
			{name : "MB_FULL_QTY"},
			{name : "MB_DAY_CNT"},
			{name : "MB_TMP1"},
			{name : "MB_MINIMUM_QTY"},
			{name : "MB_VOLUMN"},
			{name : "MB_FLUID"}
	],
	'G' : [
			{name : "CODE"}, 
			{name : "KNAM"},
			{name : "ENAM"}, 
			{name : "ORD_SNAM"}, 
			{name : "ORD_ADAT"}, 
			{name : "ORD_ASAT"}, 
			{name : "PT_FLAG1"}, 
			{name : "PT_FLAG2"}, 
			{name : "PT_PART"}, 
			{name : "PT_PART_LNAME"}, 
			{name : "PT_PART_RNAME"}
	]
};

//A: 전체, B: 진단검사, C: 영상검사, D: 특수검사, E: 병리검사, F: 투약, G: 수술
var gridColumnsP = {
	'A' :[
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '처방분류',datafield : 'ORD_KIND',width:100},
			{text : '슬립분류',datafield : 'ORD_SCLS',width:100},
			{text : '전달부서',datafield : 'ORD_TRDP',width:100},
			{text : '선처치여부',datafield : 'ORD_PRFL',width:100},
			{text : '그룹구분',datafield : 'ORD_GRFL',width:100},
			{text : '투여량',datafield : 'ORD_BQTY',width:100},
			{text : '단위',datafield : 'ORD_UNIT',width:100},
			{text : '약품분류코드',datafield : 'ORD_DCFL',width:100},
			{text : '지정여부',datafield : 'ORD_SPCD',width:100},
			{text : '수가코드',datafield : 'ORD_SUCD',width:100},
			{text : '입력일시',datafield : 'ORD_ETDT',width:100},
			{text : '입력자',datafield : 'ORD_ETPR',width:100}
	],
	'B'	:[
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '그룹코드여부',datafield : 'LB_GR_FLAG',width:100},
			{text : '기본분류',datafield : 'LB_PB_G_CODE',width:100},
			{text : '기본분류명',datafield : 'LB_PB_G_NAME',width:100},
			{text : '세부분류',datafield : 'LB_PB_CODE',width:100},
			{text : '세부분류명',datafield : 'LB_PB_NAME',width:100},
			{text : '기본검체',datafield : 'LB_SP_CODE',width:100},
			{text : '기본검체명',datafield : 'LB_SP_NAME',width:100},
			{text : '결과유형',datafield : 'LB_RS_B_CODE',width:100},
			{text : '결과형태',datafield : 'LB_RS_TYPE',width:100},
			{text : '검사시행구분',datafield : 'LB_TX_FLAG',width:100},
			{text : '기본 참고치 MAX(남)',datafield : 'LB_M_MAX',width:100},
			{text : '기본 참고치 MIN(남)',datafield : 'LB_M_MIN',width:100},
			{text : '기본 참고치 MAX(여)',datafield : 'LB_W_MAX',width:100},
			{text : '기본 참고치 MIN(여)',datafield : 'LB_W_MIN',width:100},
			{text : '기본 참고치 MAX(소아)',datafield : 'LB_Y_MAX',width:100},
			{text : '기본 참고치 MIN(소아)',datafield : 'LB_Y_MIN',width:100},
			{text : '검사실용 코드',datafield : 'LB_TS_CODE',width:100},
			{text : 'SLIP구분',datafield : 'LB_SL_CODE',width:100},
			{text : 'SLIP구분명',datafield : 'LB_SL_NAME',width:100},
			{text : '단위',datafield : 'LB_UNIT',width:100},
			{text : 'HIGH/LOW CHECK 정도관리기준',datafield : 'LB_HL_CHK',width:100},
			{text : 'DELTA CHECK 정도관리기준',datafield : 'LB_DP_CHK',width:100},
			{text : 'DELTA 공식 구분',datafield : 'LB_DLT_FLAG',width:100},
			{text : 'DELTA TIME',datafield : 'LB_APP_FLAG',width:100},
			{text : 'DELTA MAX 정도관리기준',datafield : 'LB_D_MAX',width:100},
			{text : 'DELTA MIN 정도관리기준',datafield : 'LB_D_MIN',width:100},
			{text : 'PANIC MAX 정도관리기준',datafield : 'LB_P_MAX',width:100},
			{text : 'PANIC MIN 정도관리기준',datafield : 'LB_P_MIN',width:100}
	],
	'C' : [
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '기본촬영실',datafield : 'RAD_ROOM_CODE',width:100},
			{text : '기본촬영실명',datafield : 'RAD_ROOM_NAME',width:100},
			{text : '대분류',datafield : 'RAD_PART_CODE',width:100},
			{text : '대분류명',datafield : 'RAD_PART_NAME',width:100},
			{text : '세부분류',datafield : 'RAD_D_PAR_CODE',width:100},
			{text : '세부분류명',datafield : 'RAD_D_PAR_NAME',width:100},
			{text : 'PACSSpeciality',datafield : 'RAD_PACSPECIALITY',width:100},
			{text : '영상촬영기본횟수',datafield : 'RAD_CNT',width:100}
	],
	'D' : [
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '대분류',datafield : 'FUN_L_CLS',width:100},
			{text : '대분류명',datafield : 'FUN_L_CLS_NAME',width:100},
			{text : '중분류',datafield : 'FUN_M_CLS',width:100},
			{text : '중분류명',datafield : 'FUN_M_CLS_NAME',width:100},
			{text : '소분류',datafield : 'FUN_S_CLS',width:100},
			{text : '소분류명',datafield : 'FUN_S_CLS_NAME',width:100},
			{text : '수행부서',datafield : 'FUN_DEPT_CODE',width:100},
			{text : '수행부서명',datafield : 'FUN_DEPT_NAME',width:100}
	],
	'E' : [
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '기본분류',datafield : 'PT_B_CODE',width:100},
			{text : '기본분류명',datafield : 'PT_B_NAME',width:100},
			{text : '세부분류',datafield : 'PT_D_CODE',width:100},
			{text : '세부분류명',datafield : 'PT_D_NAME',width:100},
			{text : 'SLIP구분',datafield : 'PT_SLIP',width:100},
			{text : '검사위치',datafield : 'PT_IOGU',width:100}
	],
	'F' : [
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '약품제형코드',datafield : 'MB_PROC_TYPE',width:100},
			{text : '함량',datafield : 'MB_CONT_QTY',width:100},
			{text : '함량단위',datafield : 'MB_CONT_UNIT',width:100},
			{text : '규격',datafield : 'MB_STND_QTY',width:100},
			{text : '규격단위',datafield : 'MB_STND_UNIT',width:100},
			{text : '최소포장단위코드',datafield : 'MB_PCK_UNIT',width:100},
			{text : '투여경로',datafield : 'MB_THRU_CHAN',width:100},
			{text : '약품구분',datafield : 'MB_MED_FLAG',width:100},
			{text : '성분코드',datafield : 'MB_ELEM_CODE',width:100},
			{text : '성분코드명',datafield : 'MB_ELEM_NM',width:100},
			{text : '약품분류',datafield : 'MB_CLSS_COED',width:100},
			{text : '약품분류명',datafield : 'MB_CLSS_NM',width:100},
			{text : '보관방법1',datafield : 'MB_KEEP_FLAG1',width:100},
			{text : '보관방법2',datafield : 'MB_KEEP_FLAG2',width:100},
			{text : '보관방법3',datafield : 'MB_KEEP_FLAG3',width:100},
			{text : '주사제구분',datafield : 'MB_INVN_FLAG',width:100},
			{text : '1회투여한계량',datafield : 'MB_FULL_QTY',width:100},
			{text : '기본횟수',datafield : 'MB_DAY_CNT',width:100},
			{text : '주성분코드',datafield : 'MB_TMP1',width:100},
			{text : '1회투여최소량',datafield : 'MB_MINIMUM_QTY',width:100},
			{text : '추천용해약ml',datafield : 'MB_VOLUMN',width:100},
			{text : '약품볼륨수액제',datafield : 'MB_FLUID',width:100}
	],
	'G' : [
			{text : '처방코드',datafield : 'CODE',width:100},
			{text : '영문명',datafield : 'ENAM',width:100},
			{text : '한글명',datafield : 'KNAM',width:100},
			{text : '약어',hidden:true,datafield : 'ORD_SNAM',width:100},
			{text : '처방적용일자',datafield : 'ORD_ADAT',width:100},
			{text : '처방중지일자',datafield : 'ORD_ASAT',width:100},
			{text : '대분류',datafield : 'PT_FLAG1',width:100},
			{text : '중분류',datafield : 'PT_FLAG2',width:100},
			{text : '치료파트코드',datafield : 'PT_PART',width:100},
			{text : '치료파트L',datafield : 'PT_PART_LNAME',width:100},
			{text : '치료파트R',datafield : 'PT_PART_RNAME',width:100}
	]
};

var selBoxDara = {
	'MB_THRU_CHAN' : [
		{
			"CODE" : "",
			"KNAM" : "전체",
			"SUMNAM" : "전체"
		},{
			"CODE" : "1",
			"KNAM" : "경구",
			"SUMNAM" : "1.경구"
		}, {
			"CODE" : "2",
			"KNAM" : "외용",
			"SUMNAM" : "2.외용"
		}, {
			"CODE" : "3",
			"KNAM" : "주사",
			"SUMNAM" : "3.주사"
		} 
	]
};


