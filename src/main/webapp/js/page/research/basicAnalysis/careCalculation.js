/**
 * 기초분석 - 이변량상관계수
 * @Page : careCalculation.jsp
 */
var gcareCalculation_TableID = "";
var gcareCalculation_TargetList = [];

var gcareCalculation_DataGridList1 = [];
var gcareCalculation_DataGridList2 = [];
var gcareCalculation_DataGridList3 = [];

var gcareCalculation_DataGrid1;
var gcareCalculation_DataGrid2;
var gcareCalculation_DataGrid3;

var gcareCalculation_DataAdapter1;
var gcareCalculation_DataAdapter2;
var gcareCalculation_DataAdapter3;

//jsp 파일의 태그 id 값
var careCalculation_dataGridList_1 = "careCalculation_dataGridList_1";
var careCalculation_dataGridList_2 = "careCalculation_dataGridList_2";
var careCalculation_dataGridList_3 = "careCalculation_dataGridList_3";

var careCalculation_targetList = "careCalculation_targetList";
var careCalculation_targetA = "careCalculation_targetA";
var careCalculation_targetB = "careCalculation_targetB";
var btncareCalculation_Execute = "btncareCalculation_Execute";
var btncareCalculation_Init = "btncareCalculation_Init";
alertNamecareCalculation_1 = $("#careCalculation_targetA_name").text();
alertNamecareCalculation_2 = $("#careCalculation_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
	
	getData_careCalculation();
	
	setGrid_careCalculation();
	
	initEvent_careCalculation();
	
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
function serviceCallback_careCalculation(svcId, result){
	switch(svcId){
		case "getData_careCalculation":
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
			gcareCalculation_TableID = tableId;
			gcareCalculation_TargetList = targetList;
			setJqxListGrid_careCalculation();

			break;
			
		case "setData_careCalculation1":
			console.log(result.gridData);
			gcareCalculation_DataGrid1.localdata = result.gridData;
			$("#"+careCalculation_dataGridList_1).jqxGrid('clear');			
			$("#"+careCalculation_dataGridList_1).jqxGrid('updatebounddata', 'cells');
			
			break;

		case "setData_careCalculation2":
			console.log(result.gridData);
			gcareCalculation_DataGrid2.localdata = result.gridData;
			$("#"+careCalculation_dataGridList_2).jqxGrid('clear');			
			$("#"+careCalculation_dataGridList_2).jqxGrid('updatebounddata', 'cells');
			
			break;

		case "setData_careCalculation3":
			console.log(result.gridData);
			gcareCalculation_DataGrid3.localdata = result.gridData;
			$("#"+careCalculation_dataGridList_3).jqxGrid('clear');			
			$("#"+careCalculation_dataGridList_3).jqxGrid('updatebounddata', 'cells');
			$("#careCalculation_loading").hide();
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
function getData_careCalculation(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'NUM'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_careCalculation", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_careCalculation");
	
}

function setData_careCalculation(){
	var val001 = $("#"+careCalculation_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+careCalculation_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+careCalculation_targetA).find("label:first").text();	/* 값1 명 */
	var val002_name = $("#"+careCalculation_targetB).find("label:first").text();	/* 값2 명 */
	var dataSet = {
			TABLE_ID : gcareCalculation_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));
	
	// Grid 1
	callService("setData_careCalculation1", "basicAnalysis/careCalculationGrid1", dataSet, "serviceCallback_careCalculation");
	setTimeout(function(){
		// Grid 2
		callService("setData_careCalculation2", "basicAnalysis/careCalculationGrid2", dataSet, "serviceCallback_careCalculation");
		// Grid 3
		callService("setData_careCalculation3", "basicAnalysis/careCalculationGrid3", dataSet, "serviceCallback_careCalculation");
	}, 500);
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_careCalculation(){
//	console.log("# setJqxListGrid_careCalculation >> " + gcareCalculation_TargetList);
	$("#"+careCalculation_targetList).jqxListBox('clear');
	$('#'+careCalculation_targetList).jqxListBox({ 
		allowDrag : true,
		allowDrop : true,
		width : '100%',
		height : 550,
		source : gcareCalculation_TargetList 
    });
	
	$('#'+careCalculation_targetA).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+careCalculation_targetB).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_careCalculation()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	gcareCalculation_DataGrid1 = {
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
	    localdata: gcareCalculation_DataGridList1
	};
	
	
	gcareCalculation_DataAdapter1 = new $.jqx.dataAdapter(gcareCalculation_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+careCalculation_dataGridList_1).jqxGrid({
	    source: gcareCalculation_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '구분', datafield: 'COL1', width: "16%", align:'center', cellsalign:'center',editable: false},
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
	gcareCalculation_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'}
	    ],
	    cache: false,
	    localdata: gcareCalculation_DataGridList2
	};
	
	
	gcareCalculation_DataAdapter2 = new $.jqx.dataAdapter(gcareCalculation_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+careCalculation_dataGridList_2).jqxGrid({
	    source: gcareCalculation_DataAdapter2,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: 'Pearson r', datafield: 'COL1', width: "50%", align:'center', cellsalign:'center',editable: false},
	        { text: 'P-value', datafield: 'COL2', width: "50%", align:'center', cellsalign:'center' ,editable: false}
	    ]
	}); 
	
//	--------------------------------------------------------------------------------	
	//	Grid 3
	//	--------------------------------------------------------------------------------	
	gcareCalculation_DataGrid3 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'}
	    ],
	    cache: false,
	    localdata: gcareCalculation_DataGridList3
	};
	
	
	gcareCalculation_DataAdapter3 = new $.jqx.dataAdapter(gcareCalculation_DataGrid3, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+careCalculation_dataGridList_3).jqxGrid({
	    source: gcareCalculation_DataAdapter3,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: 'Spearman r', datafield: 'COL1', width: "50%", align:'center', cellsalign:'center',editable: false},
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
function initEvent_careCalculation(){
	// targetList 드래그 앤드 이벤트
	$("#"+careCalculation_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : gcareCalculation_TargetList
		});
		// targetA Selected
		$("#"+careCalculation_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+careCalculation_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+careCalculation_targetA).on("change", function(event){
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
	$("#"+careCalculation_targetB).on("change", function(event){
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
	$("#"+btncareCalculation_Init).on('click', function() {
		
		BootstrapDialog.confirm($("#careCalculation_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#careCalculation_loading").hide();
//            	setJqxListGrid_careCalculation();
            	setJqxListGrid_careClear();
    			$("#"+careCalculation_dataGridList_1).jqxGrid('clear');	
    			$("#"+careCalculation_dataGridList_2).jqxGrid('clear');	
    			// Grid 초기화
    			setGrid_careCalculation();
            }
        });
		
	});
	// 실행
	$("#"+btncareCalculation_Execute).on("click", function(){
		if($("#"+careCalculation_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNamecareCalculation_1+" 를 선택해 주세요.");
			return;
		}
		else if($("#"+careCalculation_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNamecareCalculation_2+" 를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_careCalculation();
			$("#careCalculation_loading").show();
			setData_careCalculation();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_careClear(){
	$('#'+careCalculation_targetList).jqxListBox({ 
		allowDrag : true,
		allowDrop : true,
		width : '100%',
		height : 550,
		source : gcareCalculation_TargetList 
    });
	
	$("#"+careCalculation_targetA).jqxListBox('clear');
	$('#'+careCalculation_targetA).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+careCalculation_targetB).jqxListBox('clear');
	$('#'+careCalculation_targetB).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
	});
}
