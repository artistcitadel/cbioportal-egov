/**
 * 기초분석 - 교차분석표
 * @Page : crossAnalysisTable.jsp
 */
var gcrossAnalysisTable_TableID = "";
var gcrossAnalysisTable_TargetList = [];

var gcrossAnalysisTable_DataGridList1 = [];
var gcrossAnalysisTable_DataGridList2 = [];

var gcrossAnalysisTable_DataGrid1;
var gcrossAnalysisTable_DataGrid2;

var gcrossAnalysisTable_DataAdapter1;
var gcrossAnalysisTable_DataAdapter2;

//jsp 파일의 태그 id 값
var crossAnalysisTable_dataGridList_1 = "crossAnalysisTable_dataGridList_1";
var crossAnalysisTable_dataGridList_2 = "crossAnalysisTable_dataGridList_2";

var crossAnalysisTable_targetList = "crossAnalysisTable_targetList";
var crossAnalysisTable_targetA = "crossAnalysisTable_targetA";
var crossAnalysisTable_targetB = "crossAnalysisTable_targetB";
var btncrossAnalysisTable_Execute = "btncrossAnalysisTable_Execute";
var btncrossAnalysisTable_Init = "btncrossAnalysisTable_Init";
var alertNamecrossAnalysisTable_1 = $("#crossAnalysisTable_targetA_name").text();
var alertNamecrossAnalysisTable_2 = $("#crossAnalysisTable_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
	
	getData_crossAnalysisTable();
	
	setGrid_crossAnalysisTable();
	
	initEvent_crossAnalysisTable();
	
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
function serviceCallback_crossAnalysisTable(svcId, result){
	switch(svcId){
		case "getData_crossAnalysisTable":
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
			gcrossAnalysisTable_TableID = tableId;
			gcrossAnalysisTable_TargetList = targetList;
			setJqxListGrid_crossAnalysisTable();

			break;
			
		case "setData_crossAnalysisTable1":
			console.log(result.gridData);
			console.log(result.gridData_dataFields);
			console.log(result.gridData_columns);
			
			gcrossAnalysisTable_DataGrid1.datafields = result.gridData_dataFields;
			gcrossAnalysisTable_DataGrid1.localdata = result.gridData;
//			gcrossAnalysisTable_DataAdapter1.dataBind();
			$("#"+crossAnalysisTable_dataGridList_1).jqxGrid('clear');
			$("#"+crossAnalysisTable_dataGridList_1).jqxGrid({
			    source: gcrossAnalysisTable_DataAdapter1,
			    width: '100%',
			    autoheight : true,
				selectionmode: 'singlerow',
				columnsresize: true,
			    columns: result.gridData_columns
			}); 
			
			break;

		case "setData_crossAnalysisTable2":
			if(result.gridData_msg != null){
				BootstrapDialog.alert("<집단 변수>의 관측값 수가 " + result.gridData_msg + "개로 [교차분석]을 실행할 수 없습니다.\n[교차분석]은 <집단 변수>의 관측값 수가 2개 이상일 경우에만 실행할 수 있습니다.");
			}
			else{
				if(result.gridData001_msg != null || result.gridData002_msg != null || result.gridData003_msg != null){
					// BootstrapDialog.alert("집단 변수의 관측값 수가 CROSSTABS 수용 한계 값을 초과합니다.");
				}
				console.log(result.gridData);
				gcrossAnalysisTable_DataGrid2.localdata = result.gridData;
				$("#"+crossAnalysisTable_dataGridList_2).jqxGrid('clear');			
				$("#"+crossAnalysisTable_dataGridList_2).jqxGrid('updatebounddata', 'cells');
			}
			$("#crossAnalysisTable_loading").hide();
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
function getData_crossAnalysisTable(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'COD'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_crossAnalysisTable", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_crossAnalysisTable");
	
}

function setData_crossAnalysisTable(){
	var val001 = $("#"+crossAnalysisTable_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+crossAnalysisTable_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+crossAnalysisTable_targetA).find("label:first").text();		/* 값1 명 */
	var val002_name = $("#"+crossAnalysisTable_targetB).find("label:first").text();		/* 값2 명 */
	
	var dataSet = {
			TABLE_ID : gcrossAnalysisTable_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));
	
	// Grid 1
	callService("setData_crossAnalysisTable1", "basicAnalysis/crossAnalysisTableGrid1", dataSet, "serviceCallback_crossAnalysisTable");
	// Grid 2
	setTimeout(function(){
		callService("setData_crossAnalysisTable2", "basicAnalysis/crossAnalysisTableGrid2", dataSet, "serviceCallback_crossAnalysisTable");
	}, 500);
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_crossAnalysisTable(){
//	console.log("# setJqxListGrid_crossAnalysisTable >> " + gcrossAnalysisTable_TargetList);
	$("#"+crossAnalysisTable_targetList).jqxListBox('clear');
	$('#'+crossAnalysisTable_targetList).jqxListBox({ 
		allowDrag : true,
//		allowDrop : true,
		width : '100%',
		height : 550,
		source : gcrossAnalysisTable_TargetList 
    });
	
	$('#'+crossAnalysisTable_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+crossAnalysisTable_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_crossAnalysisTable()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	gcrossAnalysisTable_DataGrid1 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'}
	    ],
	    cache: false,
	    localdata: gcrossAnalysisTable_DataGridList1
	};
	
	
	gcrossAnalysisTable_DataAdapter1 = new $.jqx.dataAdapter(gcrossAnalysisTable_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+crossAnalysisTable_dataGridList_1).jqxGrid({
	    source: gcrossAnalysisTable_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '그룹', datafield: 'COL1', width: "10%", align:'center', cellsalign:'center',editable: false},
	        { text: '구분', datafield: 'COL2', width: "20%", align:'center', cellsalign:'center',editable: false}
	    ]
	    		
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 2
	//	--------------------------------------------------------------------------------	
	gcrossAnalysisTable_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL4'},
	        { name: 'COL5'}
	    ],
	    cache: false,
	    localdata: gcrossAnalysisTable_DataGridList2
	};
	
	
	gcrossAnalysisTable_DataAdapter2 = new $.jqx.dataAdapter(gcrossAnalysisTable_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+crossAnalysisTable_dataGridList_2).jqxGrid({
	    source: gcrossAnalysisTable_DataAdapter2,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '구분', datafield: 'COL1', width: "20%", align:'center', cellsalign:'center',editable: false},
	        { text: '값', datafield: 'COL2', width: "20%", align:'center', cellsalign:'center',editable: false},
	        { text: 'df', datafield: 'COL3', width: "20%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '점근 P-value', datafield: 'COL4', width: "20%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '정확한 P-value', datafield: 'COL5', width: "20%", align:'center', cellsalign:'center' ,editable: false}
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
function initEvent_crossAnalysisTable(){
	// targetList 드래그 앤드 이벤트
	$("#"+crossAnalysisTable_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : gcrossAnalysisTable_TargetList
		});
		// targetA Selected
		$("#"+crossAnalysisTable_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+crossAnalysisTable_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+crossAnalysisTable_targetA).on("change", function(event){
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
	});
	
	// targetB 드랍 이벤트
	$("#"+crossAnalysisTable_targetB).on("change", function(event){
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
	});
	
	// 초기화
	$("#"+btncrossAnalysisTable_Init).on('click', function() {
		
		BootstrapDialog.confirm($("#crossAnalysisTable_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#crossAnalysisTable_loading").hide();
//            	setJqxListGrid_crossAnalysisTable();
            	setJqxListGrid_crossAnalysisClear();
    			$("#"+crossAnalysisTable_dataGridList_1).jqxGrid('clear');	
    			$("#"+crossAnalysisTable_dataGridList_2).jqxGrid('clear');
    			setGrid_crossAnalysisTable();
            }
        });
	});
	
	// 실행
	$("#"+btncrossAnalysisTable_Execute).on("click", function(){
		if($("#"+crossAnalysisTable_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNamecrossAnalysisTable_1+"를 선택해 주세요.");
			return;
		}
		else if($("#"+crossAnalysisTable_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNamecrossAnalysisTable_2+"를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_crossAnalysisTable();
			$("#crossAnalysisTable_loading").show();
			setData_crossAnalysisTable();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_crossAnalysisClear(){
	$('#'+crossAnalysisTable_targetList).jqxListBox({ 
		allowDrag : true,
		width : '100%',
		height : 550,
		source : gcrossAnalysisTable_TargetList 
    });
	
	$("#"+crossAnalysisTable_targetA).jqxListBox('clear');
	$('#'+crossAnalysisTable_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+crossAnalysisTable_targetB).jqxListBox('clear');
	$('#'+crossAnalysisTable_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}
