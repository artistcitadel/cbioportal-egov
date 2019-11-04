/**
 * 기초분석 - 독립표본 T 검정
 * @Page : indeSampleTTest.jsp
 */
var gIndeSampleTTest_TableID = "";
var gIndeSampleTTest_TargetList = [];

var gIndeSampleTTest_DataGridList1 = [];
var gIndeSampleTTest_DataGridList2 = [];

var gIndeSampleTTest_DataGrid1;
var gIndeSampleTTest_DataGrid2;

var gIndeSampleTTest_DataAdapter1;
var gIndeSampleTTest_DataAdapter2;

// jsp 파일의 태그 id 값
var IndeSampleTTest_targetList = "IndeSampleTTest_targetList";
var IndeSampleTTest_targetA = "IndeSampleTTest_targetA";
var IndeSampleTTest_targetB = "IndeSampleTTest_targetB";
var IndeSampleTTest_dataGridList_1 = "IndeSampleTTest_dataGridList_1";
var IndeSampleTTest_dataGridList_2 = "IndeSampleTTest_dataGridList_2";
var btnIndeSampleTTest_Execute = "btnIndeSampleTTest_Execute";
var btnIndeSampleTTest_Init = "btnIndeSampleTTest_Init";
var alertNameIndeSampleTTest_1 = $("#IndeSampleTTest_targetA_name").text();
var alertNameIndeSampleTTest_2 = $("#IndeSampleTTest_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
	
	getData_IndeSampleTTest();
	
	setGrid_IndeSampleTTest();
	
	initEvent_IndeSampleTTest();
	
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
function serviceCallback_IndeSampleTTest(svcId, result){
	var groupName = $("#"+IndeSampleTTest_targetB).find("label:first").text();
	if(groupName.indexOf("_") > -1){
		groupName = groupName.substring(groupName.indexOf("_")+1);
		groupName = (groupName.indexOf("_") > -1) ? groupName.substring(0, groupName.indexOf("_")) : groupName;
	}
	
	switch(svcId){
		case "getData_IndeSampleTTest":
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
			gIndeSampleTTest_TableID = tableId;
			gIndeSampleTTest_TargetList = targetList;
			setJqxListGrid_IndeSampleTTest();

			break;
			
		case "setData_IndeSampleTTest1":
			console.log(result.gridData);
			gIndeSampleTTest_DataGrid1.localdata = result.gridData;
			
			$("#"+IndeSampleTTest_dataGridList_1).jqxGrid('clear');			
			$("#"+IndeSampleTTest_dataGridList_1).jqxGrid({
			    source: gIndeSampleTTest_DataAdapter1,
			    width: '100%',
			    autoheight : true,
				selectionmode: 'singlerow',
				columnsresize: true,
			    columns: [
			    	{ text: groupName, datafield: 'COL1', width: "25%", align:'center', cellsalign:'center',editable: false},
			        { text: 'N', datafield: 'COL2', width: "25%",align:'center', cellsalign:'center',editable: false},
			        { text: '평균', datafield: 'COL3', width: "25%",align:'center', cellsalign:'center' ,editable: false},
			        { text: '표준편차', datafield: 'COL5', width: "25%",align:'center', cellsalign:'center' ,editable: false}
			    ]
			}); 
			
			break;

		case "setData_IndeSampleTTest2":
			if(result.gridData_msg != null){
				BootstrapDialog.alert("<집단변수>의 관측값 수가 " + result.gridData_msg + "개로 [독립표본 T검정]을 실행할 수 없습니다.\n[독립표본 T검정]은 <집단변수>의 관측값 수가 2개일 경우에만 실행할 수 있습니다.");
			}
			else{
				console.log(result.gridData);
				gIndeSampleTTest_DataGrid2.localdata = result.gridData;
				$("#"+IndeSampleTTest_dataGridList_2).jqxGrid('clear');			
				$("#"+IndeSampleTTest_dataGridList_2).jqxGrid('updatebounddata', 'cells');
			}
			$("#IndeSampleTTest_loading").hide();
			$('.spinnermod').css({
				  'display': 'none'
				});
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
function getData_IndeSampleTTest(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'COD','NUM'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_IndeSampleTTest", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_IndeSampleTTest");
	
}

function setData_IndeSampleTTest(){
	var val001 = $("#"+IndeSampleTTest_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+IndeSampleTTest_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+IndeSampleTTest_targetA).find("label:first").text();		/* 값1 명 */
	var val002_name = $("#"+IndeSampleTTest_targetB).find("label:first").text();		/* 값2 명 */
	var dataSet = {
			TABLE_ID : gIndeSampleTTest_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));
	
	// Grid 1
	callService("setData_IndeSampleTTest1", "basicAnalysis/indeSampleTTestGrid1", dataSet, "serviceCallback_IndeSampleTTest");
	// Grid 2
	setTimeout(function(){
		callService("setData_IndeSampleTTest2", "basicAnalysis/indeSampleTTestGrid2", dataSet, "serviceCallback_IndeSampleTTest");
	}, 500);
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_IndeSampleTTest(){
//	console.log("# setJqxListGrid_IndeSampleTTest >> " + gIndeSampleTTest_TargetList);
	$("#"+IndeSampleTTest_targetList).jqxListBox('clear');
	$('#'+IndeSampleTTest_targetList).jqxListBox({ 
		allowDrag : true,
//		allowDrop : true,
		width : '100%',
		height : 550,
		source : gIndeSampleTTest_TargetList 
    });
	
	$('#'+IndeSampleTTest_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+IndeSampleTTest_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_IndeSampleTTest()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	gIndeSampleTTest_DataGrid1 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL5'}
	    ],
	    cache: false,
	    localdata: gIndeSampleTTest_DataGridList1
	};
	
	
	gIndeSampleTTest_DataAdapter1 = new $.jqx.dataAdapter(gIndeSampleTTest_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+IndeSampleTTest_dataGridList_1).jqxGrid({
	    source: gIndeSampleTTest_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '그룹', datafield: 'COL1', width: "25%", align:'center', cellsalign:'center',editable: false},
	        { text: 'N', datafield: 'COL2', width: "25%",align:'center', cellsalign:'center',editable: false},
	        { text: '평균', datafield: 'COL3', width: "25%",align:'center', cellsalign:'center' ,editable: false},
	        { text: '표준편차', datafield: 'COL5', width: "25%",align:'center', cellsalign:'center' ,editable: false}
	    ]
	    		
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 2
	//	--------------------------------------------------------------------------------	
	gIndeSampleTTest_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'}
	    ],
	    cache: false,
	    localdata: gIndeSampleTTest_DataGridList2
	};
	
	
	gIndeSampleTTest_DataAdapter2 = new $.jqx.dataAdapter(gIndeSampleTTest_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+IndeSampleTTest_dataGridList_2).jqxGrid({
	    source: gIndeSampleTTest_DataAdapter2,
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
function initEvent_IndeSampleTTest(){
	// targetList 드래그 앤드 이벤트
	$("#"+IndeSampleTTest_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : gIndeSampleTTest_TargetList
		});
		// targetA Selected
		$("#"+IndeSampleTTest_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+IndeSampleTTest_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+IndeSampleTTest_targetA).on("change", function(event){
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
			BootstrapDialog.alert(alertNameIndeSampleTTest_1+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	
	// targetB 드랍 이벤트
	$("#"+IndeSampleTTest_targetB).on("change", function(event){
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
			BootstrapDialog.alert(alertNameIndeSampleTTest_2+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	
	// 초기화
	$("#"+btnIndeSampleTTest_Init).on('click', function() {
		
		BootstrapDialog.confirm($("#indeSampleTTest_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#IndeSampleTTest_loading").hide();
//            	setJqxListGrid_IndeSampleTTest();
            	setJqxListGrid_indexSampleTClear();
    			$("#"+IndeSampleTTest_dataGridList_1).jqxGrid('clear');	
    			$("#"+IndeSampleTTest_dataGridList_2).jqxGrid('clear');	
    			// Grid 초기화
    			setGrid_IndeSampleTTest();
            }
        });
	});
	
	// 실행
	$("#"+btnIndeSampleTTest_Execute).on("click", function(){
		if($("#"+IndeSampleTTest_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameIndeSampleTTest_1+"를 선택해 주세요.");
			return;
		}
		else if($("#"+IndeSampleTTest_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameIndeSampleTTest_2+"를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_IndeSampleTTest();
			$("#IndeSampleTTest_loading").show();
			setData_IndeSampleTTest();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_indexSampleTClear(){
	$('#'+IndeSampleTTest_targetList).jqxListBox({ 
		allowDrag : true,
		width : '100%',
		height : 550,
		source : gIndeSampleTTest_TargetList 
    });
	
	$("#"+IndeSampleTTest_targetA).jqxListBox('clear');
	$('#'+IndeSampleTTest_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+IndeSampleTTest_targetB).jqxListBox('clear');
	$('#'+IndeSampleTTest_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}
