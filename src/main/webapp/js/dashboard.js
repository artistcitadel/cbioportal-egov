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
	if(result.ERR_CD != '0'){
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
				/*showAlert('게시판',COM_0001,function(e){
					getBoardDataForDashBoard();

					$('.btnListBoard:eq(0)').trigger('click');
		        });*/
				
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
				/*
				fileHtml = fileHtml + "<a class='margin-right-10' href='"+ gvCONTEXT +"/dashboard/fileDownload?path="+ ATTACH_PATH +"&SAVE_FILE_NAME="+ SAVE_FILE_NAME +"&FILE_NAME="+ FILE_NAME +"'>";
				fileHtml = fileHtml + FILE_NAME;
				fileHtml = fileHtml + "(" + numberWithCommas(number_to_human_size(ATTACH_SIZE)) + ")";
				fileHtml = fileHtml + "</a>";
				*/
//html += '<i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'+"'txtFromDt_"+dsTabCd.CODE+'_' + meta.row + "'"+')"></i>';
				/*fileHtml = fileHtml + '<a class="margin-right-10" href="javascript:fileDownload('+"'"+ATTACH_PATH+"'"+','+"'"+SAVE_FILE_NAME+"'"+','+"'"+FILE_NAME+"'"+');">';*/
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
						CHART_SQL	: result.dsDashBoard[0].RESEARCH_TARGET_STAT_SQL		/* summary SQL */
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

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function init()
{
	//에디터 로딩
	//CKEDITOR.replace('vBoardContent');
	
	
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
			  height : 320,
			  width : 400,
			  dragmode : 'select',
			  selectdirection : "h"
			};
	Plotly.newPlot('graphTest2', data, layout);
	Plotly.newPlot('graphTest5', data, layout);
	
	var barPlot = $('#graphTest2');
	barPlot[0].on('plotly_selected',function(data){
		
		if(data == undefined || data.points.length == 0) return;
		console.log(data);
		
		var x;
		var y;
		
	});
	
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
			  height : 320,
			  width : 400,
			  dragmode : 'select',
			  xaxis: {
				  title :  'FGA'	  
			  },
			  yaxis: {
				  title : 'Mutation'
			  }
			};
	var data = [trace1, trace2];

	Plotly.newPlot('graphTest3', data, scatterLayout);
	
	var scatterPlot = $("#graphTest3");
	scatterPlot[0].on('plotly_selected',function(data){
		
		if(data == undefined || data.points.length == 0) return;
		console.log(data);
		console.log(scatterLayout)
		var  scatterPlot2 = scatterPlot[0];
		var name = scatterPlot2.getAttribute('name');
		
		var x;
		var y;
				
		var html = '';
		html += '<div class="filter-box" id="filter_'+name+'">';
		html += 	'<span>';
		html += 		name + ' : ';
		html += 	'</span>';
		html += 	'<div class="btn-group">';
		html += 		'<button type="button" class="btn bg-navy btn-flat" name="">';
		html +=  			data.range.x[0]+ '&gte' +scatterLayout.yaxis.title +'&gte' + data.range.x[1];
		html +=  			'and'+ data.range.y[0]+ '&gte' +scatterLayout.yaxis.title +'&gte' + data.range.y[1];
		html += 		'</button>';
		html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
		html += 		'<i class="fa fa-times"></i>';
		html += 		'</button>';
		html += 	'</div>';
		html += '</div>';
		
		$('#filter-group').append(html);
		

		
	});
	
	
	
	
	
	// pie
	
	var myplot = $("#graphTest1");
	var myplot2 = document.getElementById('graphTest1');
	
	var data = [{
		  values: [19, 26, 55],
		  labels: ['Residential', 'Non-Residential', 'Utility'],
		  type: 'pie'
		}];

	
	Plotly.newPlot('graphTest1', data, layout);
	myplot[0].on('plotly_click',function(data){
		console.log(myplot2.getAttribute('name'));
		console.log(data.points[0].label, data.points[0].value);
		var name = myplot2.getAttribute('name');
		
		if($('button[name="'+data.points[0].label+'"]').length != 0) return ;
	
		var html = '';
		if($('#filter_'+name).length == 0){
			html += '<div class="filter-box" id="filter_'+myplot2.getAttribute('name')+'">';
			html += 	'<span>';
			html += 		myplot2.getAttribute('name') + ' : ';
			html += 	'</span>';
			html += 	'<div class="btn-group">';
			html += 		'<button type="button" class="btn bg-navy btn-flat" name="'+data.points[0].label+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			html += '</div>';
			
			$('#filter-group').append(html);
		}
		else{
			html += 	' ';
			html += 	'<div class="btn-group">';
			html += 		'<button type="button" class="btn bg-navy btn-flat" name="'+data.points[0].label+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			
			$('#filter_'+name).append(html);
		}
		
		
		
		
		
		
	});
	

	
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


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	$(document).on('click','.delete',function(){
		
		if($(this).parent().parent().children('div').length <= 1){
			$(this).parent().parent().remove();
		}
		else{
			$(this).parent().remove();
		}
	});
	
	$('#mainChartAdd,#mainSaveAdd').click(function(){
		 var $this = $(this)

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	    
	    if (!isActive) {
	     	
	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')
	
	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))
	    }
	    else{
	    	$this.attr('aria-expanded', 'false')
	        $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
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
        sort:true,
        helper: "clone",
        connectWith: "#item_1,#item_2,#item_3,#item_4",
        forcePlaceholderSize: true,
        dropOnEmpty: true,
        placeholder: "highlight",
        zIndex: 999999,
        start: function (event, ui) {
                ui.item.toggleClass("highlight");
        },
        stop: function (event, ui) {
                ui.item.toggleClass("highlight");
        },
        cancel: "#graphTest,#graphTest1,#graphTest2,#graphTest3,#graphTest4,#graphTest5"
    });

	$("#item_1,#item_2,#item_3,#item_4").disableSelection();
	 
	$(".list").hover(function(){
			/*$("#btnShowTable").css("display","inline-block");
			$("#btnShowPie").css("display","inline-block");*/
			var num = $(this).attr('num');
			$("#btnDropdownMenu_"+num).css("display","inline-block");
		},
		function(){
			var num = $(this).attr('num');
			$("#btnDropdownMenu_"+num).css("display","none");
/*			$("#btnShowTable").css("display","none");
			$("#btnShowPie").css("display","none");*/
	});
	
	$(document).on('click','#btnShowTable',function(){
		var graphNM = "graphTest"+$(this).parents('li').attr('num');
		var graphkind = $(this).parents('li').attr('graph');
		var graph = eval(graphNM);
		$("#"+graphNM).html("");
		
		values = graph.data[0].values;
		labels = graph.data[0].labels;
		var html = "";
		html += "<table class='table'><tr>";
		html += "<th>Name</th>";
		html += "<th>#</th>";
		html += "<th>Freq</th>";
		html += "</tr>";
		for(var i=0; i<labels.length; i++){
			html += "<tr><td>" + labels[i] + "</td>";
			html += "<td><button type='checkbox'></button></td>";
			html += "<td>"+ values[i] + "</td></tr>";
		}
		html += "</table>"
		
		$("#"+graphNM).html(html);

		var dropli = "dropdownli_"+$(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowPie"><a href="#">Show Pie</a></li>';
		$("#"+dropli).html(html2);
		
	});
	
	$(document).on('click','#btnShowPie',function(){
		var graphNM = "graphTest"+$(this).parents('li').attr('num');
		var graph = eval(graphNM);
		$("#"+graphNM).html("");
		var data = [{
			  values: values = graph.data[0].values,
			  labels: labels = graph.data[0].labels,
			  type: 'pie'
			}];
		var layout = {
				  autosize: false,
				  height : 320,
				  width : 400
				};

		Plotly.newPlot(graphNM, data, layout);
		
		var dropli = "dropdownli_"+$(this).parents('li').attr('num');
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

