/**
 * 기초분석 - 비모수 독립 k
 * @Page : indeSampleK.jsp
 */
var gindeSampleK_TableID = "";
var gindeSampleK_TargetList = [];

var gindeSampleK_DataGridList1 = [];
var gindeSampleK_DataGridList2 = [];

var gindeSampleK_DataGrid1;
var gindeSampleK_DataGrid2;

var gindeSampleK_DataAdapter1;
var gindeSampleK_DataAdapter2;

//jsp 파일의 태그 id 값
var indeSampleK_dataGridList_1 = "indeSampleK_dataGridList_1";
var indeSampleK_dataGridList_2 = "indeSampleK_dataGridList_2";

var indeSampleK_targetList = "indeSampleK_targetList";
var indeSampleK_targetA = "indeSampleK_targetA";
var indeSampleK_targetB = "indeSampleK_targetB";
var btnindeSampleK_Execute = "btnindeSampleK_Execute";
var btnindeSampleK_Init = "btnindeSampleK_Init";
var alertNameindeSampleK_1 = $("#indeSampleK_targetA_name").text();
var alertNameindeSampleK_2 = $("#indeSampleK_targetB_name").text();
/**
 * Application Ready
 */
$(document).ready(function(){
	
	getData_indeSampleK();
	
	setGrid_indeSampleK();
	
	initEvent_indeSampleK();
	
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
function serviceCallback_indeSampleK(svcId, result){
	var groupName = $("#"+indeSampleK_targetB).find("label:first").text();
	if(groupName.indexOf("_") > -1){
		groupName = groupName.substring(groupName.indexOf("_")+1);
		groupName = (groupName.indexOf("_") > -1) ? groupName.substring(0, groupName.indexOf("_")) : groupName;
	}
	switch(svcId){
		case "getData_indeSampleK":
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
			gindeSampleK_TableID = tableId;
			gindeSampleK_TargetList = targetList;
			setJqxListGrid_indeSampleK();

			break;
			
		case "setData_indeSampleK1":
			console.log(result.gridData);
			gindeSampleK_DataGrid1.localdata = result.gridData;
			$("#"+indeSampleK_dataGridList_1).jqxGrid('clear');			
			$("#"+indeSampleK_dataGridList_1).jqxGrid({
			    source: gindeSampleK_DataAdapter1,
			    width: '100%',
			    autoheight : true,
				selectionmode: 'singlerow',
				columnsresize: true,
			    columns: [
			    	{ text: groupName, datafield: 'COL1', width: "16%", align:'center', cellsalign:'center',editable: false},
			        { text: 'N', datafield: 'COL2', width: "16%", align:'center', cellsalign:'center',editable: false},
			        { text: '평균', datafield: 'COL3', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: '표준편차', datafield: 'COL5', width: "16%", align:'center',cellsalign:'center' ,editable: false},
			        { text: 'Median', datafield: 'COL4', width: "16%", align:'center', cellsalign:'center' ,editable: false},
			        { text: 'IQR', datafield: 'COL6', width: "20%", align:'center',cellsalign:'center' ,editable: false}
			    ]
			    		
			});
			
			break;

		case "setData_indeSampleK2":
			if(result.gridData_msg != null){
				BootstrapDialog.alert("<집단 변수>의 관측값 수가 " + result.gridData_msg + "개로 [비모수 독립 k표본검정]을 실행할 수 없습니다.\n[비모수 독립 k표본검정]은 <집단 변수>의 관측값 수가 2개 이상일 경우에만 실행할 수 있습니다.");
			}
			else{
				console.log(result.gridData);
				gindeSampleK_DataGrid2.localdata = result.gridData;
				$("#"+indeSampleK_dataGridList_2).jqxGrid('clear');	
				$("#"+indeSampleK_dataGridList_2).jqxGrid('updatebounddata', 'cells');
			}
			$("#indeSampleK_loading").hide();
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
function getData_indeSampleK(){
	var dataSet = {
			CONT_SEQ : $("#CONT_SEQ").val()			/* 조회 SEQ */
			, DATA_SEQ : $("#DATA_SEQ").val()		/* 조회 SEQ */
			, ITEM_TYPE : "'COD','NUM'"					/* 조회 타입 */
	};
	console.log(JSON.stringify(dataSet));
	callService("getData_indeSampleK", "basicAnalysis/analysisTableInfo", dataSet, "serviceCallback_indeSampleK");
	
}

function setData_indeSampleK(){
	var val001 = $("#"+indeSampleK_targetA).find("label:first").attr("val");		/* 값1 */
	var val002 = $("#"+indeSampleK_targetB).find("label:first").attr("val");		/* 값2 */
	var val001_name = $("#"+indeSampleK_targetA).find("label:first").text();		/* 값1 명 */
	var val002_name = $("#"+indeSampleK_targetB).find("label:first").text();		/* 값2 명 */
	var dataSet = {
			TABLE_ID : gindeSampleK_TableID				/* 조회 테이블 */
			, VARIABLE_001 : val001		
			, VARIABLE_002 : val002		
			, VARIABLE_001_NAME : val001_name		
			, VARIABLE_002_NAME : val002_name		
	};
	console.log("param Data >> "+JSON.stringify(dataSet));

	// Grid 1
	callService("setData_indeSampleK1", "basicAnalysis/indeSampleKGrid1", dataSet, "serviceCallback_indeSampleK");
	// Grid 2
	setTimeout(function(){
		callService("setData_indeSampleK2", "basicAnalysis/indeSampleKGrid2", dataSet, "serviceCallback_indeSampleK");
	}, 500);
	
}
	
	

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setJqxListGrid_indeSampleK(){
//	console.log("# setJqxListGrid_indeSampleK >> " + gindeSampleK_TargetList);
	$("#"+indeSampleK_targetList).jqxListBox('clear');
	$('#'+indeSampleK_targetList).jqxListBox({ 
		allowDrag : true,
//		allowDrop : true,
		width : '100%',
		height : 550,
		source : gindeSampleK_TargetList 
    });
	
	$('#'+indeSampleK_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$('#'+indeSampleK_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}

function setGrid_indeSampleK()
{
	//	--------------------------------------------------------------------------------	
	//	Grid 1
	//	--------------------------------------------------------------------------------	
	gindeSampleK_DataGrid1 = {
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
	    localdata: gindeSampleK_DataGridList1
	};
	
	
	gindeSampleK_DataAdapter1 = new $.jqx.dataAdapter(gindeSampleK_DataGrid1, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+indeSampleK_dataGridList_1).jqxGrid({
	    source: gindeSampleK_DataAdapter1,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: '그룹', datafield: 'COL1', width: "16%", align:'center', cellsalign:'center',editable: false},
	        { text: 'N', datafield: 'COL2', width: "16%", align:'center', cellsalign:'center',editable: false},
	        { text: '평균', datafield: 'COL3', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: '표준편차', datafield: 'COL5', width: "16%", align:'center',cellsalign:'center' ,editable: false},
	        { text: 'Median', datafield: 'COL4', width: "16%", align:'center', cellsalign:'center' ,editable: false},
	        { text: 'IQR', datafield: 'COL6', width: "20%", align:'center',cellsalign:'center' ,editable: false}
	    ]
	    		
	}); 
	
	//	--------------------------------------------------------------------------------	
	//	Grid 2
	//	--------------------------------------------------------------------------------	
	gindeSampleK_DataGrid2 = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'COL1'},
	    	{ name: 'COL2'},
	        { name: 'COL3'}
	    ],
	    cache: false,
	    localdata: gindeSampleK_DataGridList2
	};
	
	
	gindeSampleK_DataAdapter2 = new $.jqx.dataAdapter(gindeSampleK_DataGrid2, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#"+indeSampleK_dataGridList_2).jqxGrid({
	    source: gindeSampleK_DataAdapter2,
	    width: '100%',
	    autoheight : true,
		selectionmode: 'singlerow',
		columnsresize: true,
	    columns: [
	    	{ text: 'X<sup>2</sup>', datafield: 'COL1', width: "40%", align:'center', cellsalign:'center',editable: false},
	        { text: 'df', datafield: 'COL2', width: "30%", align:'center', cellsalign:'center',editable: false},
	        { text: 'P-value', datafield: 'COL3', width: "30%", align:'center', cellsalign:'center' ,editable: false}
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
function initEvent_indeSampleK(){
	// targetList 드래그 앤드 이벤트
	$("#"+indeSampleK_targetList).on('dragEnd', function() {
		$(this).jqxListBox('clear');
		$(this).jqxListBox({
			source : gindeSampleK_TargetList
		});
		// targetA Selected
		$("#"+indeSampleK_targetA).jqxListBox('selectIndex', 0);
		// targetB Selected
		$("#"+indeSampleK_targetB).jqxListBox('selectIndex', 0);
	});
	
	// targetA 드랍 이벤트
	$("#"+indeSampleK_targetA).on("change", function(event){
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
			BootstrapDialog.alert(alertNameindeSampleK_1+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	// targetB 드랍 이벤트
	$("#"+indeSampleK_targetB).on("change", function(event){
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
			BootstrapDialog.alert(alertNameindeSampleK_2+" 타입이 맞지 않습니다.");
			$(this).jqxListBox('clear');
		}
	});
	
	// 초기화
	$("#"+btnindeSampleK_Init).on('click', function() {
		
		BootstrapDialog.confirm($("#indeSampleK_Tab").text() + "의 변수 및 결과를 초기화 하시겠습니까?", function(result){
            if(result) {
            	$("#indeSampleK_loading").hide();
//            	setJqxListGrid_indeSampleK();
            	setJqxListGrid_indexSampleKClear();
    			$("#"+indeSampleK_dataGridList_1).jqxGrid('clear');	
    			$("#"+indeSampleK_dataGridList_2).jqxGrid('clear');	
    			// Grid 초기화
    			setGrid_indeSampleK();
            }
        });
	});
	
	// 실행
	$("#"+btnindeSampleK_Execute).on("click", function(){
		if($("#"+indeSampleK_targetA).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameindeSampleK_1+"를 선택해 주세요.");
			return;
		}
		else if($("#"+indeSampleK_targetB).find("label:first").html() == undefined){
			BootstrapDialog.alert(alertNameindeSampleK_2+"를 선택해 주세요.");
			return;
		}
		else{
			// Grid 초기화
			setGrid_indeSampleK();
			$("#indeSampleK_loading").show();
			setData_indeSampleK();
		}
	});
	
}

//input 초기화 
function setJqxListGrid_indexSampleKClear(){
	$('#'+indeSampleK_targetList).jqxListBox({ 
		allowDrag : true,
		width : '100%',
		height : 550,
		source : gindeSampleK_TargetList 
    });
	
	$("#"+indeSampleK_targetA).jqxListBox('clear');
	$('#'+indeSampleK_targetA).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
    });
	
	$("#"+indeSampleK_targetB).jqxListBox('clear');
	$('#'+indeSampleK_targetB).jqxListBox({ 
		allowDrop : true,
		width : '100%',
		height : 50,
		source: []
	});
}
