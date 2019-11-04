/**
 * 기초분석 - 일원분산분석
 * @Page : oneWayAnalysis.jsp
 */
var goneWayAnalysis_TableID = "";
var goneWayAnalysis_TargetList = [];

var goneWayAnalysis_DataGridList1 = [];
var goneWayAnalysis_DataGridList2 = [];
var goneWayAnalysis_DataGridList3 = [];
var goneWayAnalysis_DataGridList4 = [];

var goneWayAnalysis_DataGrid1;
var goneWayAnalysis_DataGrid2;
var goneWayAnalysis_DataGrid3;
var goneWayAnalysis_DataGrid4;

var goneWayAnalysis_DataAdapter1;
var goneWayAnalysis_DataAdapter2;
var goneWayAnalysis_DataAdapter3;
var goneWayAnalysis_DataAdapter4;

// jsp 파일의 태그 id 값
var oneWayAnalysis_dataGridList_1 = "oneWayAnalysis_dataGridList_1";
var oneWayAnalysis_dataGridList_2 = "oneWayAnalysis_dataGridList_2";
var oneWayAnalysis_dataGridList_3 = "oneWayAnalysis_dataGridList_3";
var oneWayAnalysis_dataGridList_4 = "oneWayAnalysis_dataGridList_4";

var oneWayAnalysis_targetList = "oneWayAnalysis_targetList";
var oneWayAnalysis_targetA = "oneWayAnalysis_targetA";
var oneWayAnalysis_targetB = "oneWayAnalysis_targetB";
var btnoneWayAnalysis_Execute = "btnoneWayAnalysis_Execute";
var btnoneWayAnalysis_Init = "btnoneWayAnalysis_Init";
var alertNameoneWayAnalysis_1 = $("#oneWayAnalysis_targetA_name").text();
var alertNameoneWayAnalysis_2 = $("#oneWayAnalysis_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
//	$("#oneWayAnalysis_ResultPanel_1").css("height", (varHeight - 110) / 2);
//	$("#oneWayAnalysis_ResultPanel_2").css("height", (varHeight - 110) / 2);
	getData_oneWayAnalysis();
	
	setGrid_oneWayAnalysis();
	
	initEvent_oneWayAnalysis();
	
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
function serviceCallback_oneWayAnalysis(svcId, result){
	var groupName = $("#"+oneWayAnalysis_targetB).find("label:first").text();
	if(groupName.indexOf("_") > -1){
		groupName = groupName.substring(groupName.indexOf("_")+1);
		groupName = (groupName.indexOf("_") > -1) ? groupName.substring(0, groupName.indexOf("_")) : groupName;
	}
	switch(svcId){
		case "getData_oneWayAnalysis":
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
			goneWayAnalysis_TableID = tableId;
			goneWayAnalysis_TargetList = targetList;
			setJqxListGrid_oneWayAnalysis();

			break;
			
		case "setData_oneWayAnalysis1":
			console.log(result.gridData);
			goneWayAnalysis_DataGrid1.localdata = result.gridData;
			$("#"+oneWayAnalysis_dataGridList_1).jqxGrid('clear');			
			$("#"+oneWayAnalysis_dataGridList_1).jqxGrid({
			    source: goneWayAnalysis_DataAdapter1,
			    width: '100%',
			    autoheight : true,
				selectionmode: 'singlerow',
				columnsresize: true,
			    columns: [
			    	{ text: groupName, datafield: 'COL1', width: "20%", align:'center', cellsalign:'center',editable: false},
			        { text: 'N', datafield: 'COL2', width: "16%", align:'center', cellsalign:'center',editable: false},
			        { text: '평균', datafield: 'COL3', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: '표준편차', datafield: 'COL4', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: 'Median', datafield: 'COL5', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: 'IQR', datafield: 'COL6', width: "16%", align:'center', cellsalign:'center' ,editable: false}
			    ]
			    		
			}); 
			
			break;

		case "setData_oneWayAnalysis2":
			if(result.gridData_msg != null){
				BootstrapDialog.alert("<요인1>의 관측값 수가 " + result.gridData_msg + "개로 [일원분산분석]을 실행할 수 없습니다.\n[일원분산분석]은 <요인1>의 관측값 수가 2개 이상일 경우에만 실행할 수 있습니다.");
			}
			else{
				console.log(result.gridData001);
				goneWayAnalysis_DataGrid2.localdata = result.gridData001;
				$("#"+oneWayAnalysis_dataGridList_2).jqxGrid('clear');			
				$("#"+oneWayAnalysis_dataGridList_2).jqxGrid('updatebounddata', 'cells');
				
				console.log(result.gridData002);
				goneWayAnalysis_DataGrid3.localdata = result.gridData002;
				$("#"+oneWayAnalysis_dataGridList_3).jqxGrid('clear');			
				$("#"+oneWayAnalysis_dataGridList_3).jqxGrid('updatebounddata', 'cells');
				
				console.log(result.gridData003);
				goneWayAnalysis_DataGrid4.localdata = result.gridData003;
				$("#"+oneWayAnalysis_dataGridList_4).jqxGrid('clear');			
				$("#"+oneWayAnalysis_dataGridList_4).jqxGrid('updatebounddata', 'cells');
			}
			$("#oneWayAnalysis_loading_1").hide();
			$("#oneWayAnalysis_loading_2").hide();
			
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
function getData_oneWayAnalysis(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'COD','NUM'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_oneWayAnalysis", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_oneWayAnalysis");
	
}

function setData_oneWayAnalysis(){
	var val001 = $("#"+oneWayAnalysis_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+oneWayAnalysis_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+oneWayAnalysis_targetA).find("label:first").text();		/* 값1 명 */
	var val002_name = $("#"+oneWayAnalysis_targetB).find("label:first").text();		/* 값2 명 */
	var dataSet = {
			TABLE_ID : goneWayAnalysis_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));
	
	// Grid 1
	callService("setData_oneWayAnalysis1", "basicAnalysis/oneWayAnalysisGrid1", dataSet, "serviceCallback_oneWayAnalysis");
	setTimeout(function(){
		// Grid 2
		callService("setData_oneWayAnalysis2", "basicAnalysis/oneWayAnalysisGrid2", dataSet, "serviceCallback_oneWayAnalysis");
	}, 500);
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_oneWayAnalysis(){
//	console.log("# setJqxListGrid_oneWayAnalysis >> " + goneWayAnalysis_TargetList);
	$("#"+oneWayAnalysis_targetList).jqxListBox('clear');
	$('#'+oneWayAnalysis_targetList).jqxListBox({ 
		allowDrag : true,
//		allowDrop : true,
		width : '100%',
		height : 550,
		source : goneWayAnalysis_TargetList 
    });
	
	$('#'+oneWayAnalysis_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+oneWayAnalysis_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_oneWayAnalysis()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	goneWayAnalysis_DataGrid1 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL4'},
	        { name: 'COL5'},
	        { name: 'COL6'},
	    ],
	    cache: false,
	    localdata: goneWayAnalysis_DataGridList1
	};
	
	
	goneWayAnalysis_DataAdapter1 = new $.jqx.dataAdapter(goneWayAnalysis_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+oneWayAnalysis_dataGridList_1).jqxGrid({
	    source: goneWayAnalysis_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '구분', datafield: 'COL1', width: "20%", align:'center', cellsalign:'center',editable: false},
	        { text: 'N', datafield: 'COL2', width: "16%", align:'center', cellsalign:'center',editable: false},
	        { text: '평균', datafield: 'COL3', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '표준편차', datafield: 'COL4', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'Median', datafield: 'COL5', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'IQR', datafield: 'COL6', width: "16%", align:'center', cellsalign:'center' ,editable: false}
	    ]
	    		
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 2
	//	--------------------------------------------------------------------------------	
	goneWayAnalysis_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL4'},
	        { name: 'COL5'},
	        { name: 'COL6'}
	    ],
	    cache: false,
	    localdata: goneWayAnalysis_DataGridList2
	};
	
	
	goneWayAnalysis_DataAdapter2 = new $.jqx.dataAdapter(goneWayAnalysis_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+oneWayAnalysis_dataGridList_2).jqxGrid({
	    source: goneWayAnalysis_DataAdapter2,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	        { text: '구분', datafield: 'COL1', width: "10%", align:'center', cellsalign:'center',editable: false},
	    	{ text: 'Sum Sq', datafield: 'COL2', width: "18%", align:'center', cellsalign:'center',editable: false},
	        { text: 'df', datafield: 'COL3', width: "18%", align:'center', cellsalign:'center',editable: false},
	        { text: 'Mean Sq', datafield: 'COL4', width: "18%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'F value', datafield: 'COL5', width: "18%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'P-value', datafield: 'COL6', width: "18%", align:'center', cellsalign:'center' ,editable: false}
	    ]
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 3
	//	--------------------------------------------------------------------------------	
	goneWayAnalysis_DataGrid3 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'},
	        { name: 'COL4'},
	        { name: 'COL5'}
	    ],
	    cache: false,
	    localdata: goneWayAnalysis_DataGridList3
	};
	
	
	goneWayAnalysis_DataAdapter3 = new $.jqx.dataAdapter(goneWayAnalysis_DataGrid3, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+oneWayAnalysis_dataGridList_3).jqxGrid({
	    source: goneWayAnalysis_DataAdapter3,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '요인', datafield: 'COL1', width: "20%", align:'center', cellsalign:'center',editable: false},
	        { text: '평균차', datafield: 'COL2', width: "20%", align:'center', cellsalign:'center',editable: false},
	        { text: '하한값', datafield: 'COL3', width: "20%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '상한값', datafield: 'COL4', width: "20%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '유의확률', datafield: 'COL5', width: "20%", align:'center', cellsalign:'center' ,editable: false}
	    ]
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 4
	//	--------------------------------------------------------------------------------	
	goneWayAnalysis_DataGrid4 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'}
	    ],
	    cache: false,
	    localdata: goneWayAnalysis_DataGridList4
	};
	
	
	goneWayAnalysis_DataAdapter4 = new $.jqx.dataAdapter(goneWayAnalysis_DataGrid4, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+oneWayAnalysis_dataGridList_4).jqxGrid({
	    source: goneWayAnalysis_DataAdapter4,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '요인', datafield: 'COL1', width: "30%", align:'center', cellsalign:'center',editable: false},
	        { text: '평균', datafield: 'COL2', width: "40%", align:'center', cellsalign:'center',editable: false},
	        { text: '부집단', datafield: 'COL3', width: "30%", align:'center', cellsalign:'center' ,editable: false}
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
function initEvent_oneWayAnalysis(){
	// targetList 드래그 앤드 이벤트
	$("#"+oneWayAnalysis_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : goneWayAnalysis_TargetList
		});
		// targetA Selected
		$("#"+oneWayAnalysis_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+oneWayAnalysis_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+oneWayAnalysis_targetA).on("change", function(event){
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
			BootstrapDialog.alert(alertNameoneWayAnalysis_1+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	// targetB 드랍 이벤트
	$("#"+oneWayAnalysis_targetB).on("change", function(event){
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
		// 타입체크
		var type = $(this).find("label:first").attr("name");
		if(type == "NUM"){
			BootstrapDialog.alert(alertNameoneWayAnalysis_2+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	
	// 초기화
	$("#"+btnoneWayAnalysis_Init).on('click', function() {
		BootstrapDialog.confirm($("#oneWayAnalysis_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#oneWayAnalysis_loading_1").hide();
            	$("#oneWayAnalysis_loading_2").hide();
//            	setJqxListGrid_oneWayAnalysis();
            	setJqxListGrid_oneWayAnalysisClear();
    			$("#"+oneWayAnalysis_dataGridList_1).jqxGrid('clear');	
    			$("#"+oneWayAnalysis_dataGridList_2).jqxGrid('clear');
    			// Grid 초기화
    			setGrid_oneWayAnalysis();
            }
        });
	});
	
	// 실행
	$("#"+btnoneWayAnalysis_Execute).on("click", function(){
		if($("#"+oneWayAnalysis_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameoneWayAnalysis_1+"를 선택해 주세요.");
			return;
		}
		else if($("#"+oneWayAnalysis_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameoneWayAnalysis_2+"를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_oneWayAnalysis();
			$("#oneWayAnalysis_loading_1").show();
			$("#oneWayAnalysis_loading_2").show();
			setData_oneWayAnalysis();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_oneWayAnalysisClear(){
	$('#'+oneWayAnalysis_targetList).jqxListBox({ 
		allowDrag : true,
		width : '100%',
		height : 550,
		source : goneWayAnalysis_TargetList 
    });
	
	$("#"+oneWayAnalysis_targetA).jqxListBox('clear');
	$('#'+oneWayAnalysis_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+oneWayAnalysis_targetB).jqxListBox('clear');
	$('#'+oneWayAnalysis_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}
