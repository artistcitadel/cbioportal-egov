/**
 * 기초분석 - 대응표본 T 검정
 * @Page : actionSampleTTest.jsp
 */
var gactionSampleTTest_TableID = "";
var gactionSampleTTest_TargetList = [];

var gactionSampleTTest_DataGridList1 = [];
var gactionSampleTTest_DataGridList2 = [];

var gactionSampleTTest_DataGrid1;
var gactionSampleTTest_DataGrid2;

var gactionSampleTTest_DataAdapter1;
var gactionSampleTTest_DataAdapter2;

//jsp 파일의 태그 id 값
var actionSampleTTest_targetList = "actionSampleTTest_targetList";
var actionSampleTTest_targetA = "actionSampleTTest_targetA";
var actionSampleTTest_targetB = "actionSampleTTest_targetB";
var actionSampleTTest_dataGridList_1 = "actionSampleTTest_dataGridList_1";
var actionSampleTTest_dataGridList_2 = "actionSampleTTest_dataGridList_2";
var btnactionSampleTTest_Execute = "btnactionSampleTTest_Execute";
var btnactionSampleTTest_Init = "btnactionSampleTTest_Init";
alertNameactionSampleTTest_1 = $("#actionSampleTTest_targetA_name").text();
alertNameactionSampleTTest_2 = $("#actionSampleTTest_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
	
	getData_actionSampleTTest();
	
	setGrid_actionSampleTTest();
	
	initEvent_actionSampleTTest();
	
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
function serviceCallback_actionSampleTTest(svcId, result){
	switch(svcId){
		case "getData_actionSampleTTest":
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
			gactionSampleTTest_TableID = tableId;
			gactionSampleTTest_TargetList = targetList;
			setJqxListGrid_actionSampleTTest();

			break;
			
		case "setData_actionSampleTTest1":
			console.log(result.gridData);
			gactionSampleTTest_DataGrid1.localdata = result.gridData;
			$("#"+actionSampleTTest_dataGridList_1).jqxGrid('clear');			
			$("#"+actionSampleTTest_dataGridList_1).jqxGrid('updatebounddata', 'cells');
			
			break;

		case "setData_actionSampleTTest2":
			console.log(result.gridData);
			gactionSampleTTest_DataGrid2.localdata = result.gridData;
			$("#"+actionSampleTTest_dataGridList_2).jqxGrid('clear');			
			$("#"+actionSampleTTest_dataGridList_2).jqxGrid('updatebounddata', 'cells');
			$("#actionSampleTTest_loading").hide();
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
function getData_actionSampleTTest(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'NUM'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_actionSampleTTest", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_actionSampleTTest");
	
}

function setData_actionSampleTTest(){
	var val001 = $("#"+actionSampleTTest_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+actionSampleTTest_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+actionSampleTTest_targetA).find("label:first").text();	/* 값1 명 */
	var val002_name = $("#"+actionSampleTTest_targetB).find("label:first").text();	/* 값2 명 */
	var dataSet = {
			TABLE_ID : gactionSampleTTest_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));
	
	// Grid 1
	callService("setData_actionSampleTTest1", "basicAnalysis/actionSampleTTestGrid1", dataSet, "serviceCallback_actionSampleTTest");
	// Grid 2
	setTimeout(function(){
		callService("setData_actionSampleTTest2", "basicAnalysis/actionSampleTTestGrid2", dataSet, "serviceCallback_actionSampleTTest");
	}, 500);
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_actionSampleTTest(){
//	console.log("# setJqxListGrid_actionSampleTTest >> " + gactionSampleTTest_TargetList);
	$("#"+actionSampleTTest_targetList).jqxListBox('clear');
	$('#'+actionSampleTTest_targetList).jqxListBox({ 
		allowDrag : true,
		allowDrop : true,
		width : '100%',
		height : 550,
		source : gactionSampleTTest_TargetList 
    });
	
	$('#'+actionSampleTTest_targetA).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+actionSampleTTest_targetB).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_actionSampleTTest()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	gactionSampleTTest_DataGrid1 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL5'}
	    ],
	    cache: false,
	    localdata: gactionSampleTTest_DataGridList1
	};
	
	
	gactionSampleTTest_DataAdapter1 = new $.jqx.dataAdapter(gactionSampleTTest_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+actionSampleTTest_dataGridList_1).jqxGrid({
	    source: gactionSampleTTest_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '그룹', datafield: 'COL1', width: "25%", align:'center', cellsalign:'center',editable: false},
	        { text: 'N', datafield: 'COL2', width: "25%", align:'center', cellsalign:'center',editable: false},
	        { text: '평균', datafield: 'COL3', width: "25%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '표준편차', datafield: 'COL5', width: "25%", align:'center', cellsalign:'center' ,editable: false},
	    ]
	    		
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 2
	//	--------------------------------------------------------------------------------	
	gactionSampleTTest_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'}
	    ],
	    cache: false,
	    localdata: gactionSampleTTest_DataGridList2
	};
	
	
	gactionSampleTTest_DataAdapter2 = new $.jqx.dataAdapter(gactionSampleTTest_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+actionSampleTTest_dataGridList_2).jqxGrid({
	    source: gactionSampleTTest_DataAdapter2,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: 't', datafield: 'COL1', width: "30%", align:'center', cellsalign:'center',editable: false},
	        { text: 'df', datafield: 'COL2', width: "30%", align:'center', cellsalign:'center',editable: false},
	        { text: 'P-value', datafield: 'COL3', width: "40%", align:'center', cellsalign:'center' ,editable: false}
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
function initEvent_actionSampleTTest(){
	// targetList 드래그 앤드 이벤트
	$("#"+actionSampleTTest_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : gactionSampleTTest_TargetList
		});
		// targetA Selected
		$("#"+actionSampleTTest_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+actionSampleTTest_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+actionSampleTTest_targetA).on("change", function(event){
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
	$("#"+actionSampleTTest_targetB).on("change", function(event){
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
	$("#"+btnactionSampleTTest_Init).on('click', function() {
		
		BootstrapDialog.confirm($("#actionSampleTTest_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#actionSampleTTest_loading").hide();
            	//setJqxListGrid_actionSampleTTest();
            	setJqxListGrid_actionSampleClear();
    			$("#"+actionSampleTTest_dataGridList_1).jqxGrid('clear');	
    			$("#"+actionSampleTTest_dataGridList_2).jqxGrid('clear');	
    			// Grid 초기화
    			setGrid_actionSampleTTest();
            }
        });
		
	});
	// 실행
	$("#"+btnactionSampleTTest_Execute).on("click", function(){
		if($("#"+actionSampleTTest_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameactionSampleTTest_1+" 를 선택해 주세요.");
			return;
		}
		else if($("#"+actionSampleTTest_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameactionSampleTTest_2+" 를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_actionSampleTTest();
			$("#actionSampleTTest_loading").show();
			setData_actionSampleTTest();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_actionSampleClear(){
	$('#'+actionSampleTTest_targetList).jqxListBox({ 
		allowDrag : true,
		allowDrop : true,
		width : '100%',
		height : 550,
		source : gactionSampleTTest_TargetList 
    });
	
	$("#"+actionSampleTTest_targetA).jqxListBox('clear');
	$('#'+actionSampleTTest_targetA).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+actionSampleTTest_targetB).jqxListBox('clear');
	$('#'+actionSampleTTest_targetB).jqxListBox({ 
		width : '100%',
		height : 50,
		source: []
	});
}
