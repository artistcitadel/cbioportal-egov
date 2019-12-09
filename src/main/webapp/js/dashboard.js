/**
 * 대시보드 서비스
 * @Page : dashboard.jsp
 */
var gvResult = {
		"dsBoardList": [],
		"dsBoardDetail": [],
		"dsMySaveList": [],
		"dsChartList": [],
		"dsChartMgmtList" : [],
		"dsDashBoard" : []
	};

var filterApplyYN = false;
var dataClinical = []; // chart data

var gvChartOpts = {
		lines: 13, // The number of lines to draw
		length: 11, // The length of each line
		width: 5, // The line thickness
		radius: 17, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#756969', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
};
var filterYN = false;

//------------------------------------------------------------------------------------------
// PAGE INIT	
//------------------------------------------------------------------------------------------
$(document).ready(function(){	
	
	init();
	
	setMySaveGrid();	
	
	initEvent();
	
/*	//summary영역 세팅
	getSummaryAreaData();
	
	//차트영역 세팅
	getChartAreaData();
	
	getMySaveData();*/


	
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
function serviceCallback(svcId, result){
	/*if(result.ERR_CD != '0'){
		//summary query 에러 시
		if(svcId == "setSummarySQLData"){
			var summaryHtml = "";
    		summaryHtml = summaryHtml + "<div class='col-lg-12'>";
    		summaryHtml = summaryHtml + "<div class='widget widget-stats bg-red'>";
    		summaryHtml = summaryHtml + "<div class='stats-title'></div>";
    		summaryHtml = summaryHtml + "<div class='stats-number text-align-center'>";
    		summaryHtml = summaryHtml + "<i class='fa fa-fw fa-exclamation-triangle'></i>&nbsp;";
    		summaryHtml = summaryHtml + "Summary Query 오류 입니다.";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-progress progress'>";
    		summaryHtml = summaryHtml + "<div class='progress-bar progress-bar-white' style='width: 101.0%;'></div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-desc text-align-center'>관리자 > Dashboard관리에서 Summary Query를 다시 확인 해 주세요.</div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "</div>";
    		
    		$('#summaryArea').append(summaryHtml);
    		return;
		}else if(svcId == "setChartView"){
			console.log(result);
			var summaryHtml = "";
			var chartNum = parseInt(parseInt(result['CHART_INDEX'])+1);
    		summaryHtml = summaryHtml + "<div class='col-lg-12'>";
    		summaryHtml = summaryHtml + "<div class='widget widget-stats bg-red'>";
    		summaryHtml = summaryHtml + "<div class='stats-title'></div>";
    		summaryHtml = summaryHtml + "<div class='stats-number text-align-center'>";
    		summaryHtml = summaryHtml + "<i class='fa fa-fw fa-exclamation-triangle'></i>&nbsp;";
    		summaryHtml = summaryHtml + "Chart Query 오류 입니다.";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-progress progress'>";
    		summaryHtml = summaryHtml + "<div class='progress-bar progress-bar-white' style='width: 101.0%;'></div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-desc text-align-center'>관리자 > Dashboard관리에서 "+ chartNum +"번째 Chart Query를 다시 확인 해 주세요.</div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "</div>";
    		
    		$('#chart'+result['CHART_INDEX']).append(summaryHtml);
    		return;
		}else{
			showAlert('Dashboard',result.ERR_MSG,null);
			return;
		}
	}
	
	
	switch(svcId){			
		case "getBoardData":
			console.log(result);
			$('#gridBoardList').dataTable().fnClearTable();
			
			if(result.dsBoardList.length > 0){
				$('#gridBoardList').dataTable().fnAddData(result.dsBoardList);
			}
			
			gvResult['dsBoardList'] = result.dsBoardList;
			
			break;
			
		case "setBoardData":
			console.log(result);
			if(result['ERR_CD'] == 0){		//저장성공
				alert(COM_0001);

				getBoardDataForDashBoard();

				$('.btnListBoard:eq(0)').trigger('click');
				showAlert('게시판',COM_0001,function(e){
					getBoardDataForDashBoard();

					$('.btnListBoard:eq(0)').trigger('click');
		        });
				
			}else{							//저장 실패
				showAlert('게시판',COM_0008,null);
			}		
			
			break;
			
		case "getBoardDataAjax":
			boardForAjax($('#boardSeq').val(), result['dsBoardList']);
			
			
			break;
			
		case "getBoardDataDetail":
			console.log(result);
			var boardData = result['dsBoardDetail'][0];
			
			$('#bTitle').html(boardData['TITLE']);
			$('#bWriter').html(boardData['PER_NAME']);
			$('#bDate').html(boardData['UDT_DT']);
			$('#bVisit').html(boardData['VISIT']);
			$('#bFile').html('');
			$('#bContent').html(boardData['CONTENT']);
			
			//$('#bWriterId').val(boardData['UDT_ID']);
			
			if($('.btnMyData').css('display') == "inline-block"){		//권한이 있는게시판
				if(boardData['UDT_ID'] == $.session.get('PER_CODE')){	//자기가 쓴 글만 수정/삭제 
					
				}else{
					$('.btnMyData').hide();
				}
				
				//관리자 한번더 체크
				for(var i=0; i<AUTINX.length; i++){
					if(AUTINX[i].AUT_CODE == "ADMIN"){	//관리자 일 경우
						$('.btnAuth').show();
						break;
					}
				}
			}
			
			//조회수 업데이트 데이터 리로딩
			getBoardDataForDashBoard();
			
			//첨부파일 표시
			for(var i=0; i<result['dsBoardDetailFile'].length; i++){
				var fileHtml = "";
				var ATTACH_PATH =  result['dsBoardDetailFile'][i].ATTACH_PATH;
				var SAVE_FILE_NAME =  result['dsBoardDetailFile'][i].SAVE_FILE_NAME;
				var FILE_NAME = result['dsBoardDetailFile'][i].FILE_NAME;
				var ATTACH_SIZE = result['dsBoardDetailFile'][i].ATTACH_SIZE;
				
				fileHtml = fileHtml + "<a class='margin-right-10' href='"+ gvCONTEXT +"/dashboard/fileDownload?path="+ ATTACH_PATH +"&SAVE_FILE_NAME="+ SAVE_FILE_NAME +"&FILE_NAME="+ FILE_NAME +"'>";
				fileHtml = fileHtml + FILE_NAME;
				fileHtml = fileHtml + "(" + numberWithCommas(number_to_human_size(ATTACH_SIZE)) + ")";
				fileHtml = fileHtml + "</a>";
				
//html += '<i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'+"'txtFromDt_"+dsTabCd.CODE+'_' + meta.row + "'"+')"></i>';
				fileHtml = fileHtml + '<a class="margin-right-10" href="javascript:fileDownload('+"'"+ATTACH_PATH+"'"+','+"'"+SAVE_FILE_NAME+"'"+','+"'"+FILE_NAME+"'"+');">';
				fileHtml = fileHtml + '<a class="margin-right-10" href="javascript:fileDownload('+"'"+escape(ATTACH_PATH)+"'"+','+"'"+SAVE_FILE_NAME+"'"+','+"'"+FILE_NAME+"'"+');">';
				fileHtml = fileHtml + FILE_NAME;
				fileHtml = fileHtml + "(" + numberWithCommas(number_to_human_size(ATTACH_SIZE)) + ")";
				fileHtml = fileHtml + "</a>";

				//fileDownload(ATTACH_PATH,SAVE_FILE_NAME,FILE_NAME)
				
				$('#bFile').append(fileHtml);
			}
						
			break;
			
		case "getBoardDataUpdateDetail":
			var boardData = result['dsBoardDetail'][0];
			
			$('#vSEQ').val(boardData['SEQ']);
			$('#vBoardTitle').val(boardData['TITLE']);
			$('.filename').each(function(){
				$(this).val('');
			});
			console.log(result);
			
			setTimeout(function(){ CKEDITOR.instances['vBoardContent'].insertHtml(boardData['CONTENT']); }, 500);
			
			//첨부파일 표시
			for(var i=0; i<result['dsBoardDetailFile'].length; i++){
				var fileHtml = "";
				var FILE_NAME = result['dsBoardDetailFile'][i].FILE_NAME;
				var ATTACH_SIZE = result['dsBoardDetailFile'][i].ATTACH_SIZE;
				var SEQ = result['dsBoardDetailFile'][i].SEQ;
				var ATTACH_PATH = result['dsBoardDetailFile'][i].ATTACH_PATH;
				var SAVE_FILE_NAME = result['dsBoardDetailFile'][i].SAVE_FILE_NAME;
					
				fileHtml = fileHtml + "<div class='margin-top-10' id='file"+result['dsBoardDetailFile'][i].SEQ+"'>";
				fileHtml = fileHtml + FILE_NAME;
				fileHtml = fileHtml + "(" + numberWithCommas(number_to_human_size(ATTACH_SIZE)) + ")";
				fileHtml = fileHtml + "<button class='fileDel btn btn-xs btn-flat btn-danger margin-left-5' SEQ='"+ SEQ +"' ATTACH_PATH='"+ ATTACH_PATH +"' SAVE_FILE_NAME='"+ SAVE_FILE_NAME +"'><i class='fa fa-trash' aria-hidden='true'></i></button>";
				fileHtml = fileHtml + "</div>";
				
				$('#fileArea').append(fileHtml);
			}
			
			break;
			
		case "setBoardDataDelete":
			if(result['ERR_CD'] == 0){		//삭제성공
				showAlert('게시판',COM_0003,null);
				getBoardDataForDashBoard();

				$('.btnListBoard:eq(1)').trigger('click');
			}else{							//삭제 실패
				showAlert('게시판',COM_0009,null);
			}
			
			break;
			
		case "getMySaveData":
			$('#gridMySaveList').dataTable().fnClearTable();
			console.log(result.dsMySaveData);
			if(result.dsMySaveData.length > 0){
				$('#gridMySaveList').dataTable().fnAddData(result.dsMySaveData);
			}else{
				$('#gridMySaveListArea').hide();
			}
			
			gvResult['dsMySaveList'] = result.dsMySaveData;
			
			break;
			
		case "getChartAreaData":
			console.log(result);
			
			gvResult['dsChartMgmtList'] = result.dsChartMgmtList;
			
			//차트영역 그리기
			setChartArea();
			
			break;
			
		case "setChartView":
			//차트그리기
			var gvResultMeasureSplit 	= gvResult['dsChartMgmtList'][result['CHART_INDEX']]['MEASURE'].split('||');
        	var CHART_INDEX 			= result['CHART_INDEX'];
        	var dsChartViewData 		= result['dsChartView'];
        	var cTYPE 					= gvResult['dsChartMgmtList'][result['CHART_INDEX']]['TYPE'];
        	var cDIM 					= gvResult['dsChartMgmtList'][result['CHART_INDEX']]['DIM'];
        	//var cDate					= isDate(dsChartViewData[0][gvResult['dsChartMgmtList'][result['CHART_INDEX']]['DIM']]);

        	//차트 그리기 cDate가 true일경우 date타입으로 차트그림 false일경우 category타입으로 그림
        	makeChart('#chart'+CHART_INDEX, dsChartViewData, cTYPE, gvResultMeasureSplit, cDIM, false);
        	//makeChart('#chart'+CHART_INDEX, dsChartViewData, cTYPE, gvResultMeasureSplit, cDIM, cDate);
			
			break;
		
		case "setSummaryData":
			console.log(result);
			gvResult.dsDashBoard = result.dsDashBoard[0];
			if(result.dsDashBoard[0].SHOW_MY_RESEARCH == "Y"){
				var dataSet = {
						CHART_SQL	: result.dsDashBoard[0].RESEARCH_TARGET_STAT_SQL		 summary SQL 
				};
				
				callService("setSummarySQLData", "admin/dashboardMgmt/selectSummarySQL", dataSet, "serviceCallback");
			}
			
			break;
			
		case "setSummarySQLData":
			console.log(result);
			
			for(var i=0; i<result['dsSummary'].length; i++){
        		var codeNum = i % gvSummaryColor.length;
        		var iconNum = i % gvSummaryIcon.length;
        		var summaryHtml = "";
        		summaryHtml = summaryHtml + "<div class='col-lg-"+ gvResult.dsDashBoard.SUMMARY_WIDTH +"'>";
        		summaryHtml = summaryHtml + "<div class='widget widget-stats "+ gvSummaryColor[codeNum] +"'>";
        		summaryHtml = summaryHtml + "<div class='stats-icon stats-icon-lg icon'>";
        		summaryHtml = summaryHtml + "<i class='fa fa-fw "+ gvSummaryIcon[iconNum] +"'></i>";
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "<div class='stats-title'>연구대상 "+ result['dsSummary'][i]['DSTC'] +"</div>";
        		summaryHtml = summaryHtml + "<div class='stats-number'>";
        		summaryHtml = summaryHtml + numberWithCommas(result['dsSummary'][i]['SUM']);
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "<div class='stats-progress progress'>";
        		summaryHtml = summaryHtml + "<div class='progress-bar progress-bar-white' style='width: 101.0%;'></div>";
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "<div class='stats-desc'>Bigger than yesterday "+ numberWithCommas(result['dsSummary'][i]['RATE']) +" </div>";
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "</div>";
        		
        		$('#summaryArea').append(summaryHtml);
        	}
			
			break;
			
		case "fileDel":
			console.log(result);
			showAlert('게시판',COM_0003,null);
			
			$('#file'+result.dsFileSeq).hide();
			
			break;
			
		default:
			break;
	}
	*/
}

//ATTACH_PATH +"&SAVE_FILE_NAME="+ SAVE_FILE_NAME +"&FILE_NAME="+ FILE_NAME
function fileDownload(ATTACH_PATH,SAVE_FILE_NAME,FILE_NAME){
	var frm = document.formFile;
	
	frm.path.value=ATTACH_PATH;
	frm.SAVE_FILE_NAME.value=SAVE_FILE_NAME;
	frm.FILE_NAME.value=FILE_NAME;

	frm.action = gvCONTEXT + "/dashboard/fileDownload";
	frm.submit();
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
//summary 데이터 받아오기
function getSummaryAreaData(){
	var dataSet = {};
	
	callService("setSummaryData", "admin/dashboardMgmt/selectDashBoardMgmt", dataSet, "serviceCallback");
}

//차트관리데이터 받아오기
function getChartAreaData(){
	var dataSet = {};
	
	callService("getChartAreaData", "/dashboard/selectChartMgmt", dataSet, "serviceCallback");
}

//차트영역 그리기
function setChartArea(){
	//차트영역 생성
	for(var i=0; i<gvResult['dsChartMgmtList'].length; i++){

		if(gvResult['dsChartMgmtList'][i]['SHOW_YN'] == "Y"){		//사용인 차트만 표기
			var WIDTH = gvResult['dsChartMgmtList'][i]['WIDTH'];
			
        	var chartHtml = "";
        	chartHtml = chartHtml + "<section class='col-lg-"+ WIDTH +"'>";
        	chartHtml = chartHtml + "<div class='box'>";
        	chartHtml = chartHtml + "<div class='box-header'>";
        	chartHtml = chartHtml + "<i class='ion ion-search'></i>";
        	chartHtml = chartHtml + "<h3 class='box-title'>"+ gvResult['dsChartMgmtList'][i]['TITLE'] +"</h3>";
        	chartHtml = chartHtml + "</div>";
        	chartHtml = chartHtml + "<div class='box-body min-height-340'>";		
        	chartHtml = chartHtml + "<div class='item' id='chart"+i+"'></div>";		
        	chartHtml = chartHtml + "</div>";
        	chartHtml = chartHtml + "</div>";
        	chartHtml = chartHtml + "</section>";
        	
        	$('#chartOuterBox').append(chartHtml);
		}   
	}
	
	//차트데이터 통신
	for(var i=0; i<gvResult['dsChartMgmtList'].length; i++){
		
		if(gvResult['dsChartMgmtList'][i]['SHOW_YN'] == "Y"){		//사용인 차트만 표기
			var dataSet = {
					CHART_INDEX	: i,
					CHART_SQL	: gvResult['dsChartMgmtList'][i]['DATA_SQL']		/* chart SQL */
			};
			
			callService("setChartView", "admin/dashboardMgmt/selectChartView", dataSet, "serviceCallback");
		}
	}
}

/**
 * 모달게시판 리스트
 * @returns
 */
function getBoardData(seq){
	if ( $.fn.dataTable.isDataTable( '#gridBoardList' ) ) {
		$('#gridBoardList').DataTable().destroy();
	}
	
	$('#boardSeq').val(seq);
	
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true
	};
	
	var tableColumns = [
	        			{ 
	        				data:"NUM",
	        				orderable:false
	        			},
	        			{ 
	        				data:"TITLE", 		
	        				render:function(data,type,row,meta){
	        					var html = '';
	        					
	        					html = '<a href="#" class="btnViewBoard" '; 
	        					html = html + 'data-toggle="modal" ';
	        					html = html + 'data-target="#modalBoardModalView" ';
	        					html = html + 'data-dismiss="modal" boardseq="' + row['BOARD_SEQ'] + '" ';
	        					html = html + 'ccBoard_seq="' + row['SEQ'] + '">';
	        					html = html + data + '</a>';
	        					return html;
	        				}
	        			},
	        			{ 
	        				data:"PER_NAME"
	        			},
	        			{ 
	        				data:"UDT_DT",
	        				"type": "date",
	        				"dateFormat": "yy-mm-dd"
	        			},
	        			{ 
	        				data:"VISIT"
	        			}
	        		];	
	
	var tableColumnDef = [
	          		    { 
	        		    	className: "dt-body-center", 
	        		    	targets: [ 0,2,3,4 ] 
	        		    },
	        		    { width: 50, targets: [0] },
	        		    { width: 80, targets: [2,3,4] }
	        		];
	
	callServiceDataTables('gridBoardList', tableOption, tableColumns, tableColumnDef, '/dashboard/getBoardOneData');
}

/**
 * 대쉬보드게시판 리스트
 * @returns
 */
function getBoardDataForDashBoard(){
	console.log($('#boardSeq').val());
	console.log($('#boardSize'+$('#boardSeq').val()).val());
	var dataSet = {
			BOARD_SEQ 	: $('#boardSeq').val(),				//게시판코드
			LIST_COUNT_DASHBOARD : $('#boardSize'+$('#boardSeq').val()).val()
	};
	
	callService("getBoardDataAjax" ,"dashboard/getBoardData" ,dataSet ,"serviceCallback");
	/*var seq = $('#boardSeq').val();
	getBoardData(seq)*/
}

/**
 * 대쉬보드게시판 ajax 통신
 * @returns
 */
function boardForAjax(seq, data){
	$('#board_'+seq+' tbody').html('');
	
	console.log(data);
	
	for(var i=0; i<data.length; i++){
		var tableHtml = '';
		tableHtml = tableHtml + "<tr>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ (i+1) +"</td>";
		tableHtml = tableHtml + "<td scope='row'>";
		tableHtml = tableHtml + "<a href='#' class='btnViewBoard' data-toggle='modal' data-target='#modalBoardModalView' data-dismiss='modal' ccboard_seq='"+ data[i]['SEQ'] +"' boardSeq='"+ data[i]['BOARD_SEQ'] +"'>"+ data[i]['TITLE'] +"</a>";
		tableHtml = tableHtml + "</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ data[i]['PER_NAME'] +"</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ data[i]['CRT_DT'].split(' ')[0] +"</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ data[i]['VISIT'] +"</td>";
		tableHtml = tableHtml + "</tr>";
		
		$('#board_'+seq+' > tbody').append(tableHtml);
	}
}

//나의연구활동 table setting
function setMySaveGrid()
{
	var gridMySaveList = $('#gridMySaveList').DataTable( {
		data: gvResult.dsMySaveList,
		paging:false,
		info:false,
		searching:true,
		pagingType: "full_numbers",
		deferLoading: 57,
		processing: true,
		scrollX: '100%',
		scrollY: '340px',
        scrollCollapse: true,
        aaSorting : [[2,'DESC']],
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
		columns: [
			{ 
				data:"METH_CD",
				render:function(data,type,row,meta){
					var html = gvStudyCode[data];
										 
					return html;
				}
			},
			{ 
				data:"CONDT_NM",
				render:function(data,type,row,meta){
					var html = "";
					
					html = data;
					
					if(row.DATA_NM){
						html = html + " > " + row.DATA_NM;
					}
					
					return html;
				}
			},
			{ 
				data:"UDT_DT",
				render:function(data,type,row,meta){
					var html;
					
					if(row.DATA_UDT_DT){
						html = row.DATA_UDT_DT;
					}else{
						html = data;
					}
					
					return html;
				}
			},
			{ 
				data:"SAVE_CD",
				render:function(data,type,row,meta){
					var html;
					var url = "";
					var mainUrl = "";
					var DATA_SEQ = row['DATA_SEQ'];
					
					if(DATA_SEQ == undefined){
						DATA_SEQ = "";
					}
					
					if(row['METH_CD'] == 'CS'){			//단면연구
						url = "/research/crossSectionalStudy/crssecMain?FROM_MAIN_YN=Y&LINK_TYPE="+row['SAVE_CD']+"&CONT_SEQ="+row['SEQ']+"&DATA_SEQ="+DATA_SEQ;
						mainUrl = "/research/crossSectionalStudy/crssecMain";
					}else if(row['METH_CD'] == 'CH'){	//코호트연구
						url = "/research/cohort/cohortMain?FROM_MAIN_YN=Y&FROM_MAIN_YN=Y&LINK_TYPE="+row['SAVE_CD']+"&CONT_SEQ="+row['SEQ']+"&DATA_SEQ="+DATA_SEQ;
						mainUrl = "/research/cohort/cohortMain";
					}else if(row['METH_CD'] == 'CC'){	//사례대조
						url = "/research/casctrl/casctrlMain?FROM_MAIN_YN=Y&FROM_MAIN_YN=Y&LINK_TYPE="+row['SAVE_CD']+"&CONT_SEQ="+row['SEQ']+"&DATA_SEQ="+DATA_SEQ;
						mainUrl = "/research/casctrl/casctrlMain";
					}
					
					for(var i=0; i<vMNUINX.length; i++){
						if(vMNUINX[i].MENU_URL == mainUrl && vMNUINX[i].CHKVAL == 1){		//메뉴 권한이 있을때
							url = url + "&SEQ="+ findMenuSeq(mainUrl);
							url = url + "&UPPER_SEQ="+ findMenuUpperSeq(mainUrl);
							html = "<a href='"+ gvCONTEXT + url +"'>"+ gvSaveCode[data] +"</a>";
							break;
						}else{
							html = "<a class='no_permission'>"+ gvSaveCode[data] +"</a>";
						}
					}
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"TABLE_CNT",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html;
					var url = "";
					var mainUrl = "";
					var htmlUrl = "";
					var DATA_SEQ = row['DATA_SEQ'];
					
					if(DATA_SEQ == undefined){
						DATA_SEQ = "";
					}
					
					if(row['METH_CD'] == 'CS'){			//단면연구
						url = "/research/crossSectionalStudy/crssecMain?SEQ=11&UPPER_SEQ=0&FROM_MAIN_YN=Y&LINK_TYPE="+row['SAVE_CD']+"&CONT_SEQ="+row['SEQ']+"&DATA_SEQ="+DATA_SEQ;
						mainUrl = "/research/crossSectionalStudy/crssecMain";
					}else if(row['METH_CD'] == 'CH'){	//코호트연구
						url = "/research/cohort/cohortMain?SEQ=12&UPPER_SEQ=0&FROM_MAIN_YN=Y&LINK_TYPE="+row['SAVE_CD']+"&CONT_SEQ="+row['SEQ']+"&DATA_SEQ="+DATA_SEQ;
						mainUrl = "/research/cohort/cohortMain";
					}else if(row['METH_CD'] == 'CC'){	//사례대조
						url = "/research/casctrl/casctrlMain?SEQ=13&UPPER_SEQ=0&FROM_MAIN_YN=Y&LINK_TYPE="+row['SAVE_CD']+"&CONT_SEQ="+row['SEQ']+"&DATA_SEQ="+DATA_SEQ;
						mainUrl = "/research/casctrl/casctrlMain";
					}
					
					
					if(data >= 0){
						for(var i=0; i<vMNUINX.length; i++){
							if(vMNUINX[i].MENU_URL == mainUrl && vMNUINX[i].CHKVAL == 1){		//메뉴 권한이 있을때
								html = "<a href='"+ gvCONTEXT + url +"'>"+ numberWithCommas(data) +"건</a>";
								break;
							}else{
								html = "<a class='no_permission'>"+ numberWithCommas(data) +"건</a>";
							}
						}
					}else{
						html = "";
					}
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"CHART_SEQ",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html;
					var DATA_SEQ = row['DATA_SEQ'];
					
					if(DATA_SEQ == undefined){
						DATA_SEQ = "";
					}
					
					var url = "/research/chartReview/chartReviewMain?DATA_SEQ="+DATA_SEQ;
					if(DATA_SEQ){
						html = "<a href='"+ gvCONTEXT + url +"'>차트리뷰</a>";
					}else{
						html = "";
					}
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"APRV_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html;
					var DATA_SEQ = row['DATA_SEQ'];
					
					if(DATA_SEQ == undefined){
						DATA_SEQ = "";
					}
					var url = "/research/approve/approveMain?DATA_SEQ="+DATA_SEQ;
					if(row['APRV_SEQ']){
						if(data == "Y"){
							html = "<a href='"+ gvCONTEXT + url +"'>승인완료</a>";
							html = html + "&nbsp;&nbsp;<a href='"+ gvCONTEXT + "/research/dataDownload/dataDownloadMain?DATA_SEQ="+DATA_SEQ+"'><button class='btn btn-xs btn-success'><i class='fa fa-file-excel-o' aria-hidden='true'></i></button></a>";
						}else if(data == "N"){
							html = "<a href='"+ gvCONTEXT + url +"'>승인거부</a>";
						}else{
							html = "<a href='"+ gvCONTEXT + url +"'>승인대기</a>";
						}
					}
										 
					return html;
				},
				orderable:false
			}
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5,6 ] 
		    },
		    { width: 50, targets: [0,2,3,4,5,6] },
		    { width: 150, targets: [1] }
		]
	});
	
	//검색 박스 생성
	$('.gridMySaveListInput').each( function () {
        var title = $(this).text();
        if(title == "등록일"){		//등록일 일때 캘린더 생성
            $(this).html( "<div class='input-group'><span class='input-group-addon'><i class='fa fa-calendar calendar' style='cursor:pointer;' onclick=\"javascript:showDatePicker(this,'maskDateInput')\"></i></span><input type='text' class='form-control mySaveInput maskDateInput' id='maskDateInput' style='width:100%;' placeholder='"+title+"' /></div>" );
        }else if(title == "데이터저장"){
        	$(this).html( '<input type="text" class="form-control" id="inpSaveData" style="width:100%;" placeholder="'+title+'" disabled />' );
        }else{
            $(this).html( '<input type="text" class="form-control mySaveInput" style="width:100%;" placeholder="'+title+'" />' );
        }
    } );
	
	//검색 이벤트 추가
	$('.mySaveInput').on( 'keyup change', function () {
    	console.log($('.mySaveInput').index(this));
    	gridMySaveList.columns($('.mySaveInput').index(this)).search( this.value ).draw();
    } );
	
}

//나의연구항목 데이터 가져오기
function getMySaveData(){
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get('PER_CODE');
	
	callService("getMySaveData", "dashboard/getMySaveData", dataSet, "serviceCallback");
	
}

/**
 * 
 * @param obj
 * @param input
 * @returns
 */
function showDatePicker(obj, input)
{
//	$(obj).datepicker('remove'); //detach

	$(obj).datepicker({
		showOnFocus:false,
		format: 'yyyy-mm-dd',
		todayHighlight:true,
		autoclose:true
		
	}).on('changeDate', function(e){
		var date = $(this).datepicker('getDate');
		var formatDate = getDateToString(date);
		
		$('#' + input).val(formatDate);
		$(this).datepicker('hide');
		
		var e = $.Event('keyup');
		e.keyCode= 13; // enter
		$('#maskDateInput').trigger(e);
		
	});
	
	$(obj).datepicker('show');	
}

function numberWithCommas(x) {
	  x = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
	  x = x.replace(/,/g,'');          // ,값 공백처리
	  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가 
}

function setStateBox(){
	var dataSet = {};
	var promise = http('dashboard/getStatebox', 'post', true , dataSet);
	
	promise.then(function(result){
		//console.log(result)
		
		var bgList = ['bg-black','bg-navy','bg-green','bg-teal','bg-light-blue']
		var dataView = result.selStateBox;
		
		var html = '';
		html += '<div class="col-lg-12" style="justify-content: space-between; display: flex;">';
		for(var i=0; i<dataView.length; i++){
			
			html += '<div class="small-box '+bgList[i]+'" style="display:inline-block; width:19%; border-radius: 5px; ">';
			html +=     '<div class="inner">';
			html += 		'<h3>'+dataView[i].NM+'</h3>';
			html += 		'<h1>'+numberWithCommas(dataView[i].CNT.toString())+'</h1>';
			html += 		'<p>New Orders</p>'
			html += 	'</div>';
			html += 	'<div class="icon">';
			html += 		'<i class="ion ion-bag"></i>';
			html += 	'</div>';
			html += '</div>';
			
		}
		html += '</div>';
		
		$('#stateBoxList').html(html);
	});
	
	
}

function setCohortList(){
	var dataSet = {};
	var promise = http('dashboard/selectCohortList', 'post', true , dataSet);
	promise.then(function(result){
		
		
		var dataView = result.selectCohortList;
		var html = '';
		//console.log(dataView);
		for(var i=0; i<dataView.length; i++){
			html = '';
			var tmpMap = dataView[i];
			if($('#itemCate_'+tmpMap.CATE_SEQ).length == 0){
				html += '<div class="treeview" id="itemCate_'+tmpMap.CATE_SEQ+'">';
				html += '<a data-toggle="collapse" data-parent="#tree" href="#itemCate_tree'+tmpMap.CATE_SEQ+'" aria-expanded="false">'+tmpMap.CATE_NM+'</a>';
				html += '<ul class="treeview-menu collapse" id="itemCate_tree'+tmpMap.CATE_SEQ+'" style="padding-left: 10px;">';
				
				html += '<div class="treeview"><div class="radio" href="#"><label for="itemCateDetl_tree_'+i+'">';
				html += '<input type="radio" name="itemCate_tree" seq="'+tmpMap.CATE_SEQ+'" value="'+tmpMap.MID_SEQ+'" id="itemCateDetl_tree_'+i+'">';
				html += tmpMap.CATE+'</label></div></div>';
				
				html += '</ul>';
				html += '</div>';
				$('#divDashboardCohortList').append(html);
			}
			else{
				html += '<div class="treeview"><div class="radio" href="#"><label for="itemCateDetl_tree_'+i+'">';
				html += '<input type="radio" name="itemCate_tree" seq="'+tmpMap.CATE_SEQ+'" value="'+tmpMap.MID_SEQ+'" id="itemCateDetl_tree_'+i+'">';
				html += tmpMap.CATE+'</label></div></div>';
				$('#itemCate_tree'+tmpMap.CATE_SEQ).append(html);
			}
				
		}
		
	});
}

function dropboxEvent(){
	if($('#mainChartAdd').attr('aria-expanded') == "true"){
		var $parent  = getParent($('#mainSaveAdd'));
		$('#mainSaveAdd').attr('aria-expanded','false');
		$parent.removeClass('open');
	}
	else if($('#mainSaveAdd').attr('aria-expanded') == "true"){
		var $parent  = getParent($('#mainChartAdd'));
		$('#mainChartAdd').attr('aria-expanded','false');
		$parent.removeClass('open');
	}
}

function setDrawChart(rowData){
	var dataSet = {};
	dataSet.DATAQUERY = rowData.EXEC_SQL;
	
	var tmpMap = boxListSearch();
	var len = tmpMap.len;
	var idx = tmpMap.idx + 1;
	var num = parseInt(tmpMap.num) + 1;
	var seq = rowData.SEQ;
	

	if(rowData.CHART_TYPE == 'PIE'){			 
	  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx); 
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'BAR'){
	  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx);
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'GRD'){
	  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx); 
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'GAO'){
		html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx); 
		$('#item_'+idx).append(html);
	}
	var itemTarget = $('#box_item_'+seq).children('.box')[0];
	var spinner = new Spinner(gvChartOpts).spin(itemTarget);

	
	var promise = http('dashboard/loadselectedChart', 'post', true , dataSet);
    promise.then(function(result){
    	spinner.stop();
    	
    	setChartKindBox(rowData, seq, idx, result);
    	
    });
}

function checkDefaultChart(){
	
	for(var i=0; i<dataClinical.length; i++){
		
		var rowData = dataClinical[i];
		
		
		if(rowData.DEFAULT_YN == 'Y' || rowData.DEFAULT_YN == true){
			
			setDrawChart(rowData);
		}
		
	}
	
}

function setChartKindBox(rowData, seq, idx, result){
	 if(rowData.CHART_TYPE == 'PIE'){
		  makeTableChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
		  makePieChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
		  $('#boxChart'+seq+'_jqx').css('display','none');
	  }
	  else if(rowData.CHART_TYPE == 'BAR'){
		  makeBarChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);	    		  
	  }
	  else if(rowData.CHART_TYPE == 'GRD'){
		  makeTableChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
	  }
	  else if(rowData.CHART_TYPE == 'GAO'){
		  makeTableGAOChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
	  }
}

function setChartAddList(){
	
	dataClinical = [];
	
	var dataSet = {};
	
	dataSet.CATE_ID_CLINICAL = "CLINICAL";
	dataSet.CATE_ID_GENOMIC = "GENOMIC";
	dataSet.CATE_ID_ETC = "ETC";
	var promise = http('dashboard/selectChartList', 'post', false , dataSet);
	
	promise.then(function(result){
		var dataView = result.CATE_ID_CLINICAL;
		
		dataClinical = dataView;
		
	});

	console.log(dataClinical)
	
	
	 var source =
	   {
	       localdata: dataClinical,
	       datafields:
	       [
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'SEQ', type: 'string' },
	           { name: 'ITEM_CATE_NM', type: 'string' },
	           { name: 'ITEM_ID', type: 'string' },
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'ORDER', type: 'int' },
	           { name: 'SEARCH_YN', type: 'string' },
	           { name: 'DEFAULT_YN', type: 'string' },
	           { name: 'ITEM_TYPE', type: 'string' },
	           { name: 'CHART_TYPE', type: 'string' },
	           { name: 'EXEC_SQL', type: 'string' },
	           { name: 'BASE_DT_TABLE', type: 'string' },
	           { name: 'BASE_DT_COLUMN', type: 'string' },
	           { name: 'FREQ', type: 'int' },
	           { name: 'ITEM_COLUMN', type: 'string' },
	           { name: 'ITEM_LABEL', type: 'string' },
	           { name: 'ORIGIN_SQL', type: 'string' }
	        ],
	       datatype: "json",
	       id : 'SEQ',
	       updaterow: function (rowid, rowdata) {
	           // synchronize with the server - send update command   
	       }
	       
	   };
	  

	  $("#subClinical").on("bindingcomplete", function (event){
		
	  });
	  
	 var dataAdapter = new $.jqx.dataAdapter(source, {
		 beforeLoadComplete: function (records) {
		        var data = new Array();
		        // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
		        for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(tmp.DEFAULT_YN == 'Y'){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
		        }
		        return data;
	     },
	     loadComplete: function (data) 
	     {
	     }
	 });
	  // Create jqxGrid
	  $("#subClinical").jqxGrid(
	  {
		  width: '100%',
	      source: dataAdapter,
	      editable: true,
	      theme: 'bootstrap',
	      showfilterrow : true,
	      filterable: true,
	      //selectionmode: 'checkbox',
	      sortable : true,
	      columnsresize: true,
	      columnsautoresize : true,
	      ready: function(){
	    	  
	      },
	      columns: [
	    	{ 
	    		text: '#', datafield: 'DEFAULT_YN' , editable: true, columntype:'checkbox'
	    	},  
	        { 
	    		text: 'Name', datafield: 'ITEM_NM', width: '80%' , editable: false
	    	},
	        { 
	        	text: 'Freq', datafield: 'FREQ' , editable: false,
	        	cellsrenderer : function(row, column, value){
	        		
	        	}, cellsformat : 'p1'
	        }
	      ]
	  });
	  
/*	  $("#subClinical").jqxGrid('setcellvalue', 1 , 'ITEM_NM', "asas");
	  for(var i=0; i<dataClinical.length; i++){
			var tmpData = dataClinical[i];
			if(tmpData.DEFAULT_YN == 'Y'){
				$("#subClinical").jqxGrid('setcellvalue',0, 'DEFAULT_YN', 1);
			}
	  }*/

	  $("#subClinical").jqxGrid('sortby', 'FREQ', 'desc');

	  $("#subClinical").on('cellvaluechanged', function (event) 
	  {
	      // event arguments.
	      var args = event.args;
	      // column data field.
	      var datafield = event.args.datafield;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // new cell value.
	      var value = args.newvalue;
	      // old cell value.
	      var oldvalue = args.oldvalue;
	      var rowData = $('#subClinical').jqxGrid('getrowdata',rowBoundIndex);
	      
	      if(value == true){
	    	  console.log("true");
	    	  var query = rowData.EXEC_SQL;

		      var dataSet = {};
		      dataSet.DATAQUERY = query;
		      
		      var tmpMap = boxListSearch();
    		  var len = tmpMap.len;
    		  var idx = tmpMap.idx + 1;
    		  var num = parseInt(tmpMap.num) + 1;
    		  var seq = rowData.SEQ;
    		  var html = '';
    		  if(rowData.CHART_TYPE == 'PIE'){			 
    			  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx);    			  
    		  }
    		  else if(rowData.CHART_TYPE == 'BAR'){
    			  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx);   			  
    		  }
    		  else if(rowData.CHART_TYPE == 'GRD'){
    			  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx);   			  
    		  }
    		  else if(rowData.CHART_TYPE == 'GAO'){
    			  html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx); 
			  }
			  $('#item_'+idx).append(html);

			  var itemTarget = $('#box_item_'+seq).children('.box')[0];
			  var spinner = new Spinner(gvChartOpts).spin(itemTarget);
			  
		      var promise = http('dashboard/loadselectedChart', 'post', true , dataSet);
		      promise.then(function(result){
		    	  spinner.stop();
	    		  setChartKindBox(rowData,seq,idx,result);

		      });
	      }
	      else{
	    	  console.log("false");
	    	  if($('#filter_'+rowData.SEQ).length != 0 ){
	    		  $('#filter_'+rowData.SEQ).remove();
	    	  }
	    	  $('#box_item_'+rowData.SEQ).remove();
	    	  
	      }

	  });
	  
	  
	  
	  
/*	  $("#subClinical").on("cellclick", function (event) 
	  {
	      // event arguments.
	      var args = event.args;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // row's visible index.
	      var rowVisibleIndex = args.visibleindex;
	      // right click.
	      var rightclick = args.rightclick; 
	      // original event.
	      var ev = args.originalEvent;
	      // column index.
	      var columnindex = args.columnindex;
	      // column data field.
	      var dataField = args.datafield;
	      // cell value
	      var value = args.value;

	  });   */ 
/*	  $('#subClinical').on('rowselect', function (event) 
	  {
 		
		  if(event.args.rowindex.length==0) return;
		  
	      // event arguments.
	      var args = event.args;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;

	      var rowData;

	      
	  });*/
	  
	  /*$('#subClinical').on('rowunselect', function (event) 
	  {
 		  // event arguments.
	      var args = event.args;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
	      var rowData = args.row;
	      $('#box_item_'+rowData.SEQ).remove();
	  });*/

	
}

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function init()
{
	
	//메인화면 데이터현황 박스
	setStateBox();

	//코호트 저장 목록
	setCohortList();

	//차트추가 목록
	setChartAddList();
	
	
	checkDefaultChart();
	//에디터 로딩
	//CKEDITOR.replace('vBoardContent');
	var config = {
			scrollZoom: true, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
			//modeBarButtonsToAdd: ['lasso2d'],
			displaylogo: false // this one also seems to not work
			//displayModeBar: true //this one does work
		};
	//bar
	var data = [
		  {
		    x: [1,2,3],
		    y: [20, 14, 23],
		    type: 'bar'
		  }
		];
	var layout = {
			  autosize: false,
			  height : 140,
			  width : 390,
			  dragmode : 'select',
			  selectdirection : "h",
			  margin: {
				    l: 20,
				    r: 20,
				    b: 20,
				    t: 20,
			  }
			};
	
	/*Plotly.newPlot('boxChart1_2', data, layout,config);
	
	var barPlot = $('#boxChart1_2');
	barPlot[0].on('plotly_selected',function(data){
		
		if(data == undefined || data.points.length == 0) return;

		console.log(data);
		var barPlot2 = barPlot[0];
		var name = barPlot2.getAttribute('name');
		
		if($('#filter_'+name).length > 0){
			$('#filter_'+name).remove();
		}
		
		var html = '';
		html += '<div class="filter-box" id="filter_'+name+'">';
		html += 	'<span>';
		html += 		name + ' : ';
		html += 	'</span>';
		html += 	'<div class="btn-group">';
		html += 		'<button type="button" class="btn bg-blue btn-flat" name="">';
		html +=  			data.range.x[0].toFixed(2)+ ' &le; x &le; ' + data.range.x[1].toFixed(2);
		html += 		'</button>';
		html +=			'<button type="button" class="btn bg-blue btn-flat delete">';
		html += 		'<i class="fa fa-times"></i>';
		html += 		'</button>';
		html += 	'</div>';
		html += '</div>';
		
		$('#filter-group').append(html);
		
	});*/
	
	//scatter
	var trace1 = {
		  x: [1, 2, 3, 4],
		  y: [10, 15, 13, 17],
		  mode: 'markers',
		  type: 'scatter'
	};

	var trace2 = {
	  x: [2, 3, 4, 5],
	  y: [16, 5, 11, 9],
	  mode: 'markers',
	  type: 'scatter'
	};

	var scatterLayout = {
			  autosize: false,
			  height : 330,
			  width : 390,
			  dragmode : 'select',
			  xaxis: {
				  title :  'FGA'	  
			  },
			  yaxis: {
				  title : 'Mutation'
			  },
			  showlegend: false,
			  margin: {
				    l: 0,
				    r: 0,
				    b: 0,
				    t: 0,
			  }
			};
	var data = [trace1, trace2];

	/*Plotly.newPlot('boxChart2_1', data, scatterLayout,config);
	
	var scatterPlot = $("#boxChart2_1");
	scatterPlot[0].on('plotly_selected',function(data){
		
		if(data == undefined || data.points.length == 0) return;
		console.log(data);

		var  scatterPlot2 = scatterPlot[0];
		var scatterLayout = scatterPlot2.layout;

		var name = scatterPlot2.getAttribute('name');
		
		var x;
		var y;
		
		if($('#filter_'+name).length > 0){
			$('#filter_'+name).remove();
		}
		
		var html = '';
		html += '<div class="filter-box" id="filter_'+name+'">';
		html += 	'<span>';
		html += 		name + ' : ';
		html += 	'</span>';
		html += 	'<div class="btn-group">';
		html += 		'<button type="button" class="btn bg-blue btn-flat" name="">';
		html +=  			data.range.x[0].toFixed(2)+ ' &le; ' +scatterLayout.xaxis.title.text +' &le; ' + data.range.x[1].toFixed(2);
		html +=  			' and '+ data.range.y[0].toFixed(2)+ ' &le; ' +scatterLayout.yaxis.title.text +' &le; ' + data.range.y[1].toFixed(2);
		html += 		'</button>';
		html +=			'<button type="button" class="btn bg-blue btn-flat delete">';
		html += 		'<i class="fa fa-times"></i>';
		html += 		'</button>';
		html += 	'</div>';
		html += '</div>';
		
		$('#filter-group').append(html);
		

		
	});*/
	
	
	
	
	
	
	

	
}




/**
 * grid setting
 * @returns
 */
function setGrid()
{
}


function drawChart()
{
}

function chkBoardAuth(boardSeq){
	var boardAuth = $('#boardAuth'+boardSeq).val();			//게시판 권한
	
	for(var i=0; i<AUTINX.length; i++){
		if(boardAuth == AUTINX[i].AUT_CODE || boardAuth == "" || boardAuth == "ALL"){	//권한이 있거나 전체 권한 이면
			$('.btnAuth').show();
			break;
		}else{													//권한이 없으면
			$('.btnAuth').hide();
		}
	}
	
	//관리자 한번더 체크
	for(var i=0; i<AUTINX.length; i++){
		if(AUTINX[i].AUT_CODE == "ADMIN"){	//관리자 일 경우
			$('.btnAuth').show();
			break;
		}
	}
}

//탭확인 및 데이터 불러오는 함수 호출
function loadData_common(page, rowIdx){

	if(page == 0){						//summary

	}else if(page == 1){				//진단정보
	}else if(page == 2){				//모니터링
		
	}else if(page == 3){				//이벤트
		
	}else if(page == 4){				//HCC
		
	}

}
function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
}

function getSelectedChartList(){
	var selectedArr = [];
	var rows = $('#subClinical').jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		var rowData = rows[i];
		var chk = rows[i].DEFAULT_YN;
		if(chk == true){
			selectedArr.push(rowData);
		}
	}
	return selectedArr;
	//var rowData = $('#subClinical').jqxGrid('getrowdata',rowBoundIndex);
}

function getSelectedChartFilter(rowData, sb){
	
	//if(isNullOrEmpty(sb)) return;
	var seq = rowData.SEQ;
	
	var itemTarget = $('#box_item_'+seq).children('.box')[0];

	var spinner = new Spinner(gvChartOpts).spin(itemTarget);
	
	var dataSet = {};
	dataSet.ROW = rowData;
	dataSet.SUB_QUERY = sb;
	
	console.log(dataSet);
	var promise = http('dashboard/loadselectedChartFilter', 'post', true , dataSet);
    promise.then(function(result){
    	console.log(result);
    	spinner.stop();

    	var resultData = result.loadselectedChartFilter.CHART;
    	
    	if(rowData.CHART_TYPE == 'PIE'){
    		var $chart = $('#boxChart'+rowData.SEQ);
    		var data = setPieChartdataform(resultData);
    		Plotly.react('boxChart'+rowData.SEQ,data,pieLayout,config);
    		
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		$jqx.jqxGrid('source')._source.localdata = resultData;
    		$jqx.jqxGrid('updatebounddata','cells');
    	}
    	else if(rowData.CHART_TYPE == 'BAR'){
    		var $chart = $('#boxChart'+rowData.SEQ);
    		var data = setBarChartdataform(resultData);
    		Plotly.react('boxChart'+rowData.SEQ,data,barLayout,config);
    	}
    	else if(rowData.CHART_TYPE == 'GRD'){
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		var resultData = result.loadselectedChartFilter.CHART;
    		$jqx.jqxGrid('source')._source.localdata = resultData;
    		
    		$jqx.jqxGrid('updatebounddata','cells');
    		
    	}
    	else if(rowData.CHART_TYPE == 'GAO'){
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		var resultData = result.loadselectedChartFilter.CHART;
    		$jqx.jqxGrid('source')._source.localdata = resultData;
    		
    		$jqx.jqxGrid('updatebounddata','cells');
    		
    	}
    	
    	
    })
	
}

function getFilterBoxGroup(){
	var filterArray = [];
	
	$('.filter-box').each(function(key,value){
		var $this = $(this);
		var itemId = this.getAttribute('name');
		var seq = this.id.replace('filter_','');
		var baseTable = this.getAttribute('table');
		var tmpArray = [];
		var tmpMap = {};
		var itemCol = '';

		
		var rowData = $('#subClinical').jqxGrid('getrowdatabyid',seq);
		var type = rowData.CHART_TYPE;
		if(!isNullOrEmpty(rowData.ITEM_LABEL)){
			itemCol = rowData.ITEM_COLUMN.split(',');
		}
		
		if(type == 'PIE'){
			$.each($(this).children('.btn-group'),function(){
				tmpArray.push(this.id); 	
			});
		}
		else if(type == 'BAR'){
			$.each($(this).children('input[type="hidden"]'),function(){
				tmpArray.push(this.value);
			});
		}
		else if(type == 'GRD'){
			$.each($(this).children('.btn-group'),function(){
				tmpArray.push(this.id); 	
			});
		}
		else if(type == 'GAO'){
			$.each($(this).children('.and-group'),function(){
				var tmpArr2 = [];
				var $this2 = $(this);
				$.each($(this).children('.btn-group'),function(){
					var tmpSet = {};
					//tmpSet["ID"] = this.id;
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpSet[this.name] = this.value;
					})
					tmpArr2.push(tmpSet);
				});
				
				tmpArray.push(tmpArr2);
			});
		}
		tmpMap.CHART_TYPE = type;
		tmpMap.CONDITION = tmpArray;
		tmpMap.ITEM_ID = itemId;
		tmpMap.BASE_TABLE = baseTable;
		tmpMap.SEQ = seq;
		filterArray.push(tmpMap);
	});
	
	return filterArray;
}
//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	$('#filter-group').eq(0).on('DOMSubtreeModified', function(){
		$('#filterApplyAfter').css('display','none');
		$('#filterApplyBefore').css('display','inline-block');
		filterApplyYN = false;
	});
	
	$('#btnDashboardFilterApply').on('click',function(){
		
		var filterArray = [];
		
		if($('.filter-box').length != 0){
			$('.filter-box').each(function(key,value){
				var $this = $(this);
				var itemId = this.getAttribute('name');
				var seq = this.id.replace('filter_','');
				var baseTable = this.getAttribute('table');
				var tmpArray = [];
				var tmpMap = {};
				
				var rowData = $('#subClinical').jqxGrid('getrowdatabyid',seq);
				var type = rowData.CHART_TYPE;
				var itemCol = '';
				if(!isNullOrEmpty(rowData.ITEM_LABEL)){
					itemCol = rowData.ITEM_COLUMN.split(',');
				}
				
				if(type == 'PIE'){
					$.each($(this).children('.btn-group'),function(){
						tmpArray.push(this.id); 	
					});
				}
				else if(type == 'BAR'){
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpArray.push(this.value);
					});
				}
				else if(type == 'GRD'){
					$.each($(this).children('.btn-group'),function(){
						tmpArray.push(this.id); 	
					});
				}
				else if(type == 'GAO'){
					$.each($(this).children('.and-group'),function(){
						var tmpArr2 = [];
						var $this2 = $(this);
						$.each($(this).children('.btn-group'),function(){
							var tmpSet = {};
							//tmpSet["ID"] = this.id;
							$.each($(this).children('input[type="hidden"]'),function(){
								tmpSet[this.name] = this.value;
							})
							tmpArr2.push(tmpSet);
						});
						
						tmpArray.push(tmpArr2);
					});
				}
				tmpMap.CONDITION = tmpArray;
				tmpMap.ITEM_ID = itemId;
				tmpMap.BASE_TABLE = baseTable;
				tmpMap.SEQ = seq;
				filterArray.push(tmpMap);
			});
		}
		var dataSet = {};
		console.log(filterArray);
		dataSet.FILTER = filterArray;
		var promise = http('dashboard/filterApply', 'post', true, dataSet);
		promise.then(function(result){

			console.log(result);
			
			var selectedArr = [];
			selectedArr = getSelectedChartList();
			var dataView = result.filterApply;
			var resultKeys = Object.keys(dataView);
			var resultVals = Object.values(dataView);
			
			for(var i=0; i<selectedArr.length; i++){
				
				var row = selectedArr[i];
				var idx = resultKeys.indexOf(row.SEQ.toString());
				if( idx != -1 ){
					if(isNullOrEmpty(resultVals[idx])) continue;
					getSelectedChartFilter(row, resultVals[idx]);
				}
				else{
					getSelectedChartFilter(row, dataView.all);
				}
			}
			$('#filterApplyBefore').css('display','none');
			$('#filterApplyAfter').css('display','inline-block');
			filterApplyYN = true;
			
			
		});
		
	});
	
	
	$('#btnDashboardCohortClear').on('click',function(){
		$('#filter-group').empty();
		
	});
	
	$(document).on('change','input[name="itemCate_tree"]',function(){
		var dataSet = {};

		dataSet.CATE_MID_SEQ = $(this).val();
		console.log(dataSet);
		
		var promise = http('dashboard/selectCohortDetlList', 'post', true , dataSet);
		
		promise.then(function(result){
			//console.log(result);
			var html = '';
			var dataView = result.selectCohortDetlList;
			
			if(isNullOrEmpty(dataView)){
				$('#selDashboardCohortList').empty();
				$('#selDashboardCohortList').attr('disabled',true);

				html += '<option value="">';
				html += '없음';
				html += '</option>';
				$('#selDashboardCohortList').append(html);
				return;
			}
			else{
				$('#selDashboardCohortList').empty();
				$('#selDashboardCohortList').attr('disabled',false);

				for(var i=0; i<dataView.length; i++){
					var tmpMap = dataView[i];
					html += '<option value="'+tmpMap.CATE_DETL_SEQ+'">';
					html += tmpMap.CATE_DETL_NM;
					html += '</option>';
				}
				$('#selDashboardCohortList').append(html);

			}
		});
		
		
	});
	
	
	$('#btnDashboardCohortAdd').on('click',function(){
		if(filterApplyYN == false){
			showAlert('알림','필터 적용후, 저장 해주십시오.',null);
			return ;
		}
		
		if(isNullOrEmpty($('input[name="itemCate_tree"]:checked').val())){
			showAlert('알림','코호트를 선택해주십시오.',null);
			return ;
		}
		if(isNullOrEmpty($('#txtDashboardCohortNM').val())){
			showAlert('알림','코호트 명을 입력해주십시오.',null);
			return ;
		}
		
		var dataSet = {};
		//dataSet.SEQ = $('input[name="itemCate_tree"]:checked').attr('seq');
		//dataSet.MID_SEQ = $('input[name="itemCate_tree"]:checked').val();
		dataSet.CATE_DETL_SEQ = $('#selDashboardCohortList').val();
		dataSet.CONT_NM = $('#txtDashboardCohortNM').val();
		dataSet.CONT_DESC = $('#txtDashboardCohortSub').val();
		dataSet.UDT_ID = $.session.get('PER_CODE');
		dataSet.CRT_ID = $.session.get('PER_CODE');
		
		var selectedArr = getSelectedChartList();
		dataSet.SELECTED_CHART = selectedArr;
		
		var filterArr = getFilterBoxGroup();
		dataSet.FILTER = filterArr;
		
		console.log(dataSet);
		var promise = http('/dashboard/insertCohortItemCont', 'post' ,true, dataSet);
		promise.then(function(result){
			showAlert('알림','저장 되었습니다.',null);
			
			console.log(result);
		});
		
	});
	

	$(document).on('click','.delete',function(){
		
		var grid = $(this).attr('grid');
		var id = $(this).attr('name');
		var chart = $(this).attr('table');
		
		if($("#"+grid+'_jqx').jqxGrid('getstate')==undefined){
			if($(this).parent().parent().children('div').length <= 1){
				$(this).parent().parent().remove();
			}
			else{
				$(this).parent().remove();
			}
		}
		else{
			var graphNM = grid+'_jqx';
			var idx = $("#"+graphNM).jqxGrid('getrowboundindexbyid',id);
			$("#"+graphNM).jqxGrid('unselectrow', idx);
			$("#"+graphNM).jqxGrid('setcellvaluebyid', id, "CHK", false);

		}
		
		
	});
	
	$(document).on('click','.box-delete',function(){
		
		var gridId = $(this).parents('li').attr('num');
		var gridIdx = $('#subClinical').jqxGrid('getrowboundindexbyid',gridId);
		$("#subClinical").jqxGrid('setcellvaluebyid',gridId,'DEFAULT_YN',false);
		//$('#subClinical').jqxGrid('unselectrow',gridIdx);
		//$(this).parents('li').remove();
		//$("#subClinical").jqxGrid('refresh');
		
	});
	
	$('#mainChartAdd,#mainSaveAdd').click(function(){
		
		
		var $this = $(this);
		var $divthis = $('#div'+$this[0].id);
		
	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	    var isZindex = $divthis.css('z-index');
	    
	    if (isZindex == "-1" ) {
	    	 
	     /* var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      
	
	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))*/
	    	$this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')
	        
	        $divthis.css('z-index',1000);
	    	
	        if('mainChartAdd' == $this[0].id && $('#mainSaveAdd').attr('aria-expanded') == 'true'){
				$('#mainSaveAdd').attr('aria-expanded','false');
				$('#divmainSaveAdd').css('z-index',-1);
				
				/*var $parent2  = getParent($('#mainSaveAdd'));
				$parent2.removeClass('open');*/
			}
			else if('mainSaveAdd' ==  $this[0].id && $('#mainChartAdd').attr('aria-expanded') == 'true'){
				$('#mainChartAdd').attr('aria-expanded','false');
				$('#divmainChartAdd').css('z-index',-1);
				/*var $parent2  = getParent($('#mainChartAdd'));
				$parent2.removeClass('open');*/
			}
	    }
	    else{
	    	$this.attr('aria-expanded', 'false')
	    	$divthis.css('z-index',-1);
	    	/* $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))*/
	    }
		
	});
/*	  $(".connectedSortable").sortable({
		    placeholder: "sort-highlight",
		    connectWith: ".connectedSortable",
		    handle: ".box-header, .nav-tabs",
		    forcePlaceholderSize: true,
		    zIndex: 999999
		  });
		  $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");*/
	$("#item_1,#item_2,#item_3,#item_4").sortable({
        opacity: 0.5,
        cursor: "move",
        connectWith: "#item_1,#item_2,#item_3,#item_4",
        placeholder: "highlight",
        zIndex: 999999,
        distance: 20,
        dropOnEmpty: true,
        sort:true,
        helper:  "clone",
        forcePlaceholderSize: true,
        start: function (event, ui) {
        		//ui.item.toggleClass("");
        		var $this = $(this);
        		if(ui.item.hasClass('pie')){
        			ui.placeholder.addClass('pie');
        			ui.placeholder.html('<div style="display:inherit"></div>');
        		}
        		else if(ui.item.hasClass('bar')){
        			ui.placeholder.addClass('bar');
        		}
        		else{
        			
        		}
        		
        },
        stop: function (event, ui) {
                //ui.item.toggleClass("");
                
        },
        cancel: "#graphTest,#graphTest1,#graphTest2,#graphTest3,#graphTest4,#graphTest5"
    });

	$("#item_1,#item_2,#item_3,#item_4").disableSelection();
	 
	$(document).on('mouseenter','.list',function(){
			/*$("#btnShowTable").css("display","inline-block");
			$("#btnShowPie").css("display","inline-block");*/
			var num = $(this).attr('num');
			var idx = $(this).attr('idx');
			/*$("#btnDropdownMenu_"+num).css("display","inline-block");*/
			$(this).children().children().children('.btn-drop-menu').css("display","inline-block");
			$(this).children().children().children('.btn-or-select').css("display","inline-block");
	});
	$(document).on('mouseleave','.list',function(){
			var num = $(this).attr('num');
			var idx = $(this).attr('idx');
			$(this).children().children().children('.btn-drop-menu').css("display","none");
/*			$("#btnShowTable").css("display","none");
			$("#btnShowPie").css("display","none");*/
			$(this).children().children().children('.btn-or-select').css("display","none");
	});	
	
	$(document).on('click','.btn-or-select',function(){
		var seq = $(this).parents('li').attr('num');
		var graphNM = 'boxChart'+seq;
		var divId = 'boxChart'+seq;
		var item = $('#subClinical').jqxGrid('getrowdatabyid',seq);
		var rowLen = $('#'+graphNM+'_jqx').jqxGrid('getrows').length;
		var itemLabel = item.ITEM_LABEL.split(',');
		var itemCol = item.ITEM_COLUMN.split(',');
		var name = item.ITEM_NM;;
		
		var selectedGAOArr = [];
		var selectedRowArr = [];
		
		for(var i=0; i<rowLen; i++){
			if($('#'+graphNM+'_jqx').jqxGrid('getcellvalue',i,'CHK')){
				selectedGAOArr.push($('#'+graphNM+'_jqx').jqxGrid('getrowdata',i));
				selectedRowArr.push($('#'+graphNM+'_jqx').jqxGrid('getrowboundindex',i));
			}
		}
		
		for(var i=0; i<selectedRowArr.length; i++){
			$('#'+graphNM+'_jqx').jqxGrid('selectrow',selectedRowArr[i]);
			
		}
		console.log(selectedGAOArr);
	
		if($('#filter_'+seq).length == 0){
			var htmlf = '';
			htmlf += '<div class="filter-box" id="filter_'+seq+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
			htmlf += 	'<span>';
			htmlf += 		name + ' : ';
			htmlf += 	'</span>';
			htmlf += '</div>';
			$('#filter-group').append(htmlf);
			
			
			var html = '';
			
			for(var i=0; i<selectedGAOArr.length; i++){
				//var html2 = '';
				var rowData = selectedGAOArr[i];
				var rowDataIdCol = rowData.CKEY.split(',');
				
				if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0) continue ;
				
				if(!isNullOrEmpty(html)) html += '<label>or</label>';
				
				html += 	'<div class="btn-group or-group" id="'+rowData.uid+'">';
				for(var j=0; j<itemCol.length; j++){
					html +=			'<input type="hidden" name="'+itemCol[j]+'" value='+ rowDataIdCol[j] +'>';	
				}
				html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+rowData.uid+'">';
				html +=  			rowData.CKEY;
				html += 		'</button>';
				html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+rowData.uid+'" grid="'+divId+'">';
				html += 		'<i class="fa fa-times"></i>';
				html += 		'</button>';
				html += 	'</div>';
				
				//$('#'+seq+'_and_'+'1 > .and-group-label').append(html2);
			}
			
			var htmlsub = '';
			htmlsub += 	'<div class="and-group" seq="'+seq+'">';
			htmlsub +=  '<label class="and-group-label">(</label>';
			
			htmlsub += html;
			
			htmlsub +=  '<label>)</label>';
			htmlsub += 	'</div>'
				
			$('#filter_'+seq).append(htmlsub);

			
			
		}
		else{
			var html = '';
			
			//var andLen = $('.btn-group.and-group').length;
			
			for(var i=0; i<selectedGAOArr.length; i++){
				//var html2 = '';
				var rowData = selectedGAOArr[i];
				var rowDataIdCol = rowData.CKEY.split(',');
				if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0) continue ;
				
				if(!isNullOrEmpty(html)) html += '<label>or</label>';
				
				html += 	'<div class="btn-group or-group" id="'+rowData.uid+'">';
				for(var j=0; j<itemCol.length; j++){
					html +=			'<input type="hidden" name="'+itemCol[j]+'" value='+ rowDataIdCol[j] +'>';	
				}
				html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+rowData.uid+'">';
				html +=  			rowData.CKEY;
				html += 		'</button>';
				html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+rowData.uid+'" grid="'+divId+'">';
				html += 		'<i class="fa fa-times"></i>';
				html += 		'</button>';
				html += 	'</div>';
				
				//$('#'+seq+'_and_'+(andLen+1)+' > .and-group-label').append(html2);
			}
			
			var htmlsub = '';
			htmlsub +=  '<label>and</label>';
			htmlsub += 	'<div class="and-group" seq="'+seq+'">';
			htmlsub +=  '<label class="and-group-label">(</label>';
			
			htmlsub += html;
			
			htmlsub +=  '<label>)</label>';
			htmlsub += 	'</div>'
				
			if(!isNullOrEmpty(html)){
				$('#filter_'+seq).append(htmlsub);
			}
			
			
		}
	
	

	});
	
	$(document).on('click','#btnShowTable',function(){
		var graphNM = "boxChart" + $(this).parents('li').attr('num');
		var graphkind = $(this).parents('li').attr('graph');
		var graph = eval(graphNM);
		
		$("#"+graphNM).css("display","none");
		$("#"+graphNM+"_jqx").css("display","block");
		$(this).parents('li').removeClass('pie');
		
		

		var dropli = "dropdownli_" + $(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowPie"><a href="#">Show Pie</a></li>';
		$("#"+dropli).html(html2);
		
	});
	
	$(document).on('click','#btnShowPie',function(){
		var graphNM = "boxChart" + $(this).parents('li').attr('num');
		var graph = eval(graphNM);
		
		$("#"+graphNM).css("display","block");
		$("#"+graphNM+"_jqx").css("display","none");
		$(this).parents('li').addClass('pie');
		
		
		var dropli = "dropdownli_" + $(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowTable"><a href="#">Show Table</a></li>';
		$("#"+dropli).html(html2);
	});
	
	

	
	
	
	//index페이지 펼침 메뉴 숨기
	if($('#pageType').val() == "index"){
		$('#btnFold').css('display', 'none');
	}
	
	//게시판 더보기 버튼
	$('.btnBoardMore').on('click', function(){
		$('#modalBoardList').css('display', 'block');
		
		//검색툴 초기화
		$('#searchKey option:eq(0)').prop('selected', true);
		$('#searchVal').val('');
		
		var boardSeq	= $(this).attr('boardSeq');
		var boardSize	= $('#boardSize'+$(this).attr('boardSeq')).val();
		
		//게시판 권한체크
		chkBoardAuth(boardSeq);
		
		
		//게시판 타이틀
		$('#modalBoardListLabel').text($('#boardTitle'+$(this).attr('boardSeq')).val());
		//게시판 seq 등록
		$('#boardSeq').val(boardSeq);
		
		getBoardData(boardSeq);
	});
	
	//게시판 목록 버튼
	$('.btnListBoard').on('click', function(){
		$('#modalBoardList').css('display', 'block');
		
		//스크롤 오류로 인해 setTimeout사용
		setTimeout(function(){$('#modalBoardList').modal('show');}, 500);
		
		
		//검색툴 초기화
		$('#searchKey option:eq(0)').prop('selected', true);
		$('#searchVal').val('');
		
		var boardSeq	= $('#boardSeq').val();
		var boardSize	= $('#boardSize'+boardSeq).val();
		
		//게시판 타이틀
		$('#modalBoardListLabel').text($('#boardTitle'+boardSeq).val());
		
		getBoardData(boardSeq);
	});
	
	//게시판 modal 글등록열기 버튼
	$('#btnRegModalBoard').on('click', function(){

		$('#vSEQ').val('');
		
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		//게시판 타이틀
		$('#modalBoardModalRegLabel').text($('#boardTitle'+$('#boardSeq').val()).val());
		
		//등록글 초기화
		//CKEDITOR.instances.vBoardContent.setData('');
		$('#vBoardTitle').val('');
		$('#filename').val('');
		$('#fileArea').html('');
		$('.filename').each(function(){
			$(this).val('');
		});
		
		//첨부파일노출 유무
		if($('#boardFile'+$('#boardSeq').val()).val() == "Y"){
			$('#fileUploadArea').show();
		}else{
			$('#fileUploadArea').hide();
		}
	});
	
	//검색버튼
	$('#btnSearch').on('click',function(e){
		var boardSeq	= $('#boardSeq').val(boardSeq);
		
		/*if(isNullOrEmpty($('#searchVal').val())){
			showAlert('게시판',COM_0006,null);
			return;
			
		}*/
		
		getBoardData(boardSeq);
		
		
	});
	
	$('#searchVal').on('keypress',function(e){
		var boardSeq	= $('#boardSeq').val(boardSeq);
		
		if(e.keyCode === 13){
			/*if(isNullOrEmpty($('#searchVal').val())){
				showAlert('게시판',COM_0006,null);
				return;
				
			}*/
			
			getBoardData(boardSeq);
			
		}
	});
	
	//게시판 글등록
	$('#btnRegBoard').on('click', function(){		
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		
		//title
		if($('#vBoardTitle').val() == ""){
			$('#vBoardTitle').addClass('border-red');
			showAlert('게시판','Title을 입력해 주세요.',null);
			return;
		}
		
		//content
		var editorText = CKEDITOR.instances.vBoardContent.getData();
		if(editorText == ""){
			$('#cke_vBoardContent').addClass('border-red');
			showAlert('게시판','내용을 입력해 주세요.',null);
			return;
		}
		
		//첨부파일
		var dataSet = new FormData($("#frmBoard")[0]);
		dataSet.append("CONTENT", editorText);
		dataSet.append("UDT_ID", $.session.get('PER_CODE'));
		dataSet.append("CRT_ID", $.session.get('PER_CODE'));
		
		var dsBoardFlag = true;
		$('.filename').each(function(){
			
			if($(this).val()){			//첨부파일이 있을때
				if($.inArray($(this).val().split('.').pop().toLowerCase(), gvFileExt) > -1){		//제한 확장자 체크
					showAlert('게시판',$(this).val().split('.').pop().toLowerCase() + "파일은 업로드 할 수 없습니다.",null);
					dsBoardFlag = false;
					return;
				}
				
				if(this.files[0].size > gvFileSize){		//제한 용량 체크
					showAlert('게시판',number_to_human_size(gvFileSize) + "이상의 파일은 업로드 할 수 없습니다.",null);
					dsBoardFlag = false;
					return;
				}
			}
		});
		if(dsBoardFlag == false){
			return;
		}
		console.log(dataSet);

		if($('#vSEQ').val() == ""){			//등록
			callServiceForm("setBoardData" ,"dashboard/insertBoardData", dataSet ,"serviceCallback");
		}else{								//수정
			callServiceForm("setBoardData" ,"dashboard/updateBoardData" ,dataSet ,"serviceCallback");
		}
		
	});
	
	//글보기
	$(document).on('click', '.btnViewBoard', function(){
		//게시판 seq 등록
		var boardSeq	= $(this).attr('boardseq');
		$('#boardSeq').val(boardSeq);
		
		//게시판 권한체크
		chkBoardAuth(boardSeq);
		
		$('#vSEQ').val($(this).attr('ccboard_seq'));
		
		$('#bViewTitle').text($('#boardTitle'+boardSeq).val());
		
		//게시판 타이틀
		$('#modalBoardModalRegLabel').text($('#boardTitle'+$('#boardSeq').val()).val());
		
		//페이지 초기화
		$('#bTitle').html('');
		$('#bWriter').html('');
		$('#bDate').html('');
		$('#bVisit').html('');
		$('#bFile').html('');
		$('#bContent').html('');
		
		//스크롤 오류로 인해 setTimeout사용
		//setTimeout(function(){$('#modalBoardModalView').modal('show');}, 500);
		
		var dataSet = {
				SEQ 	: $(this).attr('ccboard_seq')				//게시판seq
		};
		
		callService("getBoardDataDetail" ,"dashboard/selectBoardDataDetail" ,dataSet ,"serviceCallback");
	});
	

	//상세게시판 글수정 버튼 클릭이벤트
	$('#btnModBoard').on('click', function(){
		
		//등록글 초기화
		//CKEDITOR.instances.vBoardContent.setData('');
		$('#vBoardTitle').val('');
		$('#fileArea').html('');
		$('.filename').each(function(){
			$(this).val('');
		});
		
		var dataSet = {
				SEQ 	: $('#vSEQ').val()				//게시판seq
		};
		
		callService("getBoardDataUpdateDetail" ,"dashboard/selectBoardDataDetail" ,dataSet ,"serviceCallback");
	});
	
	//상세게시판 글삭제 버튼 클릭이벤트
	$('#btnDelBoard').on('click', function(){
		
		showConfirm('게시판','게시글 및 첨부파일이 모두 삭제 됩니다.<br>정말 삭제하시겠습니까?', function(result){
			if(!result){
				return;
			}
			var dataSet = {
					SEQ	: $('#vSEQ').val()
			};
        	
        	callService("setBoardDataDelete" ,"dashboard/deleteBoardData" ,dataSet ,"serviceCallback");
		});
	});
	
	//첨부파일 삭제 버튼
	$(document).on('click', '.fileDel', function(){
		var SEQ = $(this).attr('SEQ');
		var ATTACH_PATH = $(this).attr('ATTACH_PATH');
		var SAVE_FILE_NAME = $(this).attr('SAVE_FILE_NAME');
		
		showConfirm('게시판',COM_0005, function(result){
			if(!result){
				return;
			}
			var dataSet = {
					SEQ					: SEQ,		/* file SQL */
					ATTACH_PATH 		: ATTACH_PATH,
					SAVE_FILE_NAME 		: SAVE_FILE_NAME
			};
			
			callService("fileDel", "dashboard/deleteFile", dataSet, "serviceCallback");
		});
	});
	
	//날짜inpur mask
	$(document).on('focus','.maskDateInput',function(){
		$(this).mask('0000-00-00');
		$(this).select();
	});
	
}

