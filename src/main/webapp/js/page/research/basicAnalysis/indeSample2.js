/**
 * 기초분석 - 비모수 독립2
 * @Page : indeSample2.jsp
 */
var gindeSample2_TableID = "";
var gindeSample2_TargetList = [];

var gindeSample2_DataGridList1 = [];
var gindeSample2_DataGridList2 = [];

var gindeSample2_DataGrid1;
var gindeSample2_DataGrid2;

var gindeSample2_DataAdapter1;
var gindeSample2_DataAdapter2;

//jsp 파일의 태그 id 값
var indeSample2_targetList = "indeSample2_targetList";
var indeSample2_targetA = "indeSample2_targetA";
var indeSample2_targetB = "indeSample2_targetB";
var indeSample2_dataGridList_1 = "indeSample2_dataGridList_1";
var indeSample2_dataGridList_2 = "indeSample2_dataGridList_2";
var btnindeSample2_Execute = "btnindeSample2_Execute";
var btnindeSample2_Init = "btnindeSample2_Init";
var alertNameindeSample2_1 = $("#indeSample2_targetA_name").text();
var alertNameindeSample2_2 = $("#indeSample2_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
	
	getData_indeSample2();
	
	setGrid_indeSample2();
	
	initEvent_indeSample2();
	
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
function serviceCallback_indeSample2(svcId, result){
	var groupName = $("#"+indeSample2_targetB).find("label:first").text();
	if(groupName.indexOf("_") > -1){
		groupName = groupName.substring(groupName.indexOf("_")+1);
		groupName = (groupName.indexOf("_") > -1) ? groupName.substring(0, groupName.indexOf("_")) : groupName;
	}
	switch(svcId){
		case "getData_indeSample2":
			var tableId = result.dsItemContData[0].TABLE_ID;
			var data = result.dsItemContDataDetl
			//주기번호 제거
			data = data.filter( el => el.COLUMN_COMMENT !== "주기번호" );
			var targetList = [];
			for(var i = 0; i < data.length; i++){
				var html = "";
				var type = data[i].ITEM_TYPE;
				var columnId = data[i].COLUMN_ID;
				var columnName = data[i].COLUMN_COMMENT;
				if(type == "COD"){
					html = "<label style='font-size:12px;font-weight:100;'  val='"+columnId+"' name='"+type+"'><img src='../images/COD.png'>&nbsp;"+columnName+"</label>";
				}
				else if(type == "NUM"){
					html = "<label style='font-size:12px;font-weight:100;'  val='"+columnId+"' name='"+type+"'><img src='../images/NUM.png'>&nbsp;"+columnName+"</label>";
				}
				/*else{
					html = "<i class='md md-subject'></i></i>&nbsp;<label style='font-size:12px;'>"+columnName+"</label>"
				}*/
				html += "";
				targetList[i] = html;
			}
			gindeSample2_TableID = tableId;
			gindeSample2_TargetList = targetList;
			setJqxListGrid_indeSample2();

			break;
			
		case "setData_indeSample21":
			console.log(result.gridData);
			gindeSample2_DataGrid1.localdata = result.gridData;
			$("#"+indeSample2_dataGridList_1).jqxGrid('clear');			
			$("#"+indeSample2_dataGridList_1).jqxGrid({
			    source: gindeSample2_DataAdapter1,
			    width: '100%',
			    autoheight : true,
				selectionmode: 'singlerow',
				columnsresize: true,
			    columns: [
			    	{ text: groupName, datafield: 'COL1', width: "16%", align:'center', cellsalign:'center',editable: false},
			        { text: 'N', datafield: 'COL2', width: "16%", align:'center', cellsalign:'center',editable: false},
			        { text: '평균', datafield: 'COL3', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: '표준편차', datafield: 'COL5', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: 'Median', datafield: 'COL4', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: 'IQR', datafield: 'COL6', width: "20%", align:'center', cellsalign:'center' ,editable: false}
			    ]
			    		
			});
			
			break;

		case "setData_indeSample22":
			if(result.gridData_msg != null){
				BootstrapDialog.alert("<집단 변수>의 관측값 수가 " + result.gridData_msg + "개로 [비모수 독립 2표본검정]을 실행할 수 없습니다.\n[비모수 독립 2표본검정]은 <집단 변수>의 관측값 수가 2개일 경우에만 실행할 수 있습니다.");
			}
			else{
				console.log(result.gridData);
				gindeSample2_DataGrid2.localdata = result.gridData;
				$("#"+indeSample2_dataGridList_2).jqxGrid('clear');			
				$("#"+indeSample2_dataGridList_2).jqxGrid('updatebounddata', 'cells');
			}
			$("#indeSample2_loading").hide();
			break;

		default:
			break;

	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 
 * @returns
 */
function getData_indeSample2(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'COD','NUM'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_indeSample2", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_indeSample2");
	
}

function setData_indeSample2(){
	var val001 = $("#"+indeSample2_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+indeSample2_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+indeSample2_targetA).find("label:first").text();		/* 값1 명 */
	var val002_name = $("#"+indeSample2_targetB).find("label:first").text();		/* 값2 명 */
	var dataSet = {
			TABLE_ID : gindeSample2_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));
	
	// Grid 1
	callService("setData_indeSample21", "basicAnalysis/indeSample2Grid1", dataSet, "serviceCallback_indeSample2");
	// Grid 2
	setTimeout(function(){
		callService("setData_indeSample22", "basicAnalysis/indeSample2Grid2", dataSet, "serviceCallback_indeSample2");
	}, 500);
	
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_indeSample2(){
//	console.log("# setJqxListGrid_indeSample2 >> " + gindeSample2_TargetList);
	$("#"+indeSample2_targetList).jqxListBox('clear');
	$('#'+indeSample2_targetList).jqxListBox({ 
		allowDrag : true,
//		allowDrop : true,
		width : '100%',
		height : 550,
		source : gindeSample2_TargetList 
    });
	
	$('#'+indeSample2_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+indeSample2_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_indeSample2()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	gindeSample2_DataGrid1 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL5'},
	        { name: 'COL4'},
	        { name: 'COL6'}
	    ],
	    cache: false,
	    localdata: gindeSample2_DataGridList1
	};
	
	
	gindeSample2_DataAdapter1 = new $.jqx.dataAdapter(gindeSample2_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+indeSample2_dataGridList_1).jqxGrid({
	    source: gindeSample2_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '그룹', datafield: 'COL1', width: "16%", align:'center', cellsalign:'center',editable: false},
	        { text: 'N', datafield: 'COL2', width: "16%", align:'center', cellsalign:'center',editable: false},
	        { text: '평균', datafield: 'COL3', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '표준편차', datafield: 'COL5', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'Median', datafield: 'COL4', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'IQR', datafield: 'COL6', width: "20%", align:'center', cellsalign:'center' ,editable: false}
	    ]
	    		
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 2
	//	--------------------------------------------------------------------------------	
	gindeSample2_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'}
	    ],
	    cache: false,
	    localdata: gindeSample2_DataGridList2
	};
	
	
	gindeSample2_DataAdapter2 = new $.jqx.dataAdapter(gindeSample2_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+indeSample2_dataGridList_2).jqxGrid({
	    source: gindeSample2_DataAdapter2,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: 'Mann_Whitney U', datafield: 'COL1', width: "50%", align:'center', cellsalign:'center',editable: false},
	        { text: 'P-value', datafield: 'COL2', width: "50%", align:'center', cellsalign:'center' ,editable: false}
	    ]
	}); 
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent_indeSample2(){
	// targetList 드래그 앤드 이벤트
	$("#"+indeSample2_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : gindeSample2_TargetList
		});
		// targetA Selected
		$("#"+indeSample2_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+indeSample2_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+indeSample2_targetA).on("change", function(event){
		var args = event.args;
		if (args) {
			var item = args.item;
			var items = $(this).jqxListBox('getItems');
			
			for (var i = 0; i < items.length; i++) {
				if (item.label != items[i].label) {
					$(this).jqxListBox('removeItem', items[i].label);
				}
				// 개수 체크 후 삭제
				if(items.length > 1 && i > 0){
					$(this).jqxListBox('removeItem', items[i].label);
				}
			}
		}
		// 타입 체크
		var type = $(this).find("label:first").attr("name");
		if(type == "COD"){
			BootstrapDialog.alert(alertNameindeSample2_1+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	// targetB 드랍 이벤트
	$("#"+indeSample2_targetB).on("change", function(event){
		var args = event.args;
		if (args) {
			var item = args.item;
			var items = $(this).jqxListBox('getItems');
			
			for (var i = 0; i < items.length; i++) {
				if (item.label != items[i].label) {
					$(this).jqxListBox('removeItem', items[i].label);
				}
				// 개수 체크 후 삭제
				if(items.length > 1 && i > 0){
					$(this).jqxListBox('removeItem', items[i].label);
				}
			}
		}
		// 타입 체크
		var type = $(this).find("label:first").attr("name");
		if(type == "NUM"){
			BootstrapDialog.alert(alertNameindeSample2_2+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	
	// 초기화
	$("#"+btnindeSample2_Init).on('click', function() {
		
		BootstrapDialog.confirm($("#indeSample2_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#indeSample2_loading").hide();
//            	setJqxListGrid_indeSample2();
            	setJqxListGrid_indexSample2Clear();
    			$("#"+indeSample2_dataGridList_1).jqxGrid('clear');	
    			$("#"+indeSample2_dataGridList_2).jqxGrid('clear');	
    			// Grid 초기화
    			setGrid_indeSample2();
            }
        });
	});
	
	// 실행
	$("#"+btnindeSample2_Execute).on("click", function(){
		if($("#"+indeSample2_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameindeSample2_1+"를 선택해 주세요.");
			return;
		}
		else if($("#"+indeSample2_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameindeSample2_2+"를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_indeSample2();
			$("#indeSample2_loading").show();
			setData_indeSample2();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_indexSample2Clear(){
	$('#'+indeSample2_targetList).jqxListBox({ 
		allowDrag : true,
		width : '100%',
		height : 550,
		source : gindeSample2_TargetList 
    });
	
	$("#"+indeSample2_targetA).jqxListBox('clear');
	$('#'+indeSample2_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+indeSample2_targetB).jqxListBox('clear');
	$('#'+indeSample2_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}
