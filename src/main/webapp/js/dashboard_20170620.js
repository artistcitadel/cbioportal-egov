/**
 * 대시보드 서비스
 * @Page : dashboard.jsp
 */
var gvResult = {
		"dsBoardList": [],
		"dsBoardDetail": [],
		"dsMySaveList": []
	};


//------------------------------------------------------------------------------------------
// PAGE INIT	
//------------------------------------------------------------------------------------------
$(document).ready(function(){	
	init();
	
	setMySaveGrid();	
	
	initEvent();
	
	//차트영역 세팅
	setChartAreaData();
	
	getChartData();
	
	getMySaveData();
	
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
	if(result.ERR_CD != "0"){
		alert(result.ERR_MSG);
		return;
	}
	
	
	switch(svcId){
		case "getChartData":
			console.log(result);
			if(typeof result.dsChartList === 'undefined'){
				return;
			}
			
			var $chartOuterBox = $('#chartOuterBox');
			
			for(var i=0; i < result.dsChartList.length; i++){
				var width = result.dsChartList[i].WIDTH;
				
				html = '<section class="col-lg-'+width+'">';
				html += '<div class="box">';
					html += '<div class="box-header">';
						html += '<i class="ion ion-search"></i>';
						html += '<h3 class="box-title">' + result.dsChartList[i].TITLE + '</h3>';
					html += '</div>';
					
					html += '<div class="box-body min-height-340">';
						html += '<div class="item" id="chart_'+i+'"></div>';
					html += '</div>';
					
				html += '</div>';
				html += '</section>';
				
				$chartOuterBox.append(html);
				
			}
			
			//console.log($chartOuterBox.html());
			
			for(var i=0; i < result.dsChartList.length; i++){
				var chartData = [];
				var keyData = [];
				var axisOption = { 
						x: {type : 'category'}
				};
						
				var keyTemp = '';
							
				keyTemp = result.dsChartList[i].MEASURE.toString();
				
				keyTemp = keyTemp.split("||");
				
				for(var j=0; j < keyTemp.length; j++){
					keyData.push(keyTemp[j]);
				}
				
				chartData = result.dsChartList[i].CHART_DATA;
				
				chart = c3.generate({
				    bindto: '#chart_' + i,
				    padding: {
				        right: '4'
				    },
				    data: {
				    	x : 'x',
				    	json: chartData,
						keys: {
							x: result.dsChartList[i].DIM, 
							value: keyData,
						},
						type: result.dsChartList[i].TYPE	
				    },
				    axis: axisOption
				});
			}
			
			break;
			
		case "getBoardData":
			console.log(result);
			$('#gridBoardList').dataTable().fnClearTable();
			
			if(result.dsBoardList.length > 0){
				$('#gridBoardList').dataTable().fnAddData(result.dsBoardList);
			}
			
			gvResult['dsBoardList'] = result.dsBoardList;
			
			break;
			
		case "setBoardData":
			//console.log(result);
			if(result['ERR_CD'] == 0){		//저장성공
				BootstrapDialog.alert(COM_0001, function(){
					getBoardDataForDashBoard();

					$('.btnListBoard:eq(0)').trigger('click');
		        });
			}else{							//저장 실패
				BootstrapDialog.alert(COM_0008);
			}			
			
			break;
			
		case "getBoardDataAjax":
			boardForAjax($('#boardSeq').val(), result['dsBoardList']);
			
			
			break;
			
		case "getBoardDataDetail":
			//console.log(result);
			var boardData = result['dsBoardDetail'][0];
			
			$('#bTitle').html(boardData['TITLE']);
			$('#bWriter').html(boardData['PER_NAME']);
			$('#bDate').html(boardData['UDT_DT']);
			$('#bVisit').html(boardData['VISIT']);
			$('#bFile').html('');
			$('#bContent').html(boardData['CONTENT']);
			
			getBoardDataForDashBoard();
						
			break;
			
		case "getBoardDataUpdateDetail":
			var boardData = result['dsBoardDetail'][0];
			
			$('#vSEQ').val(boardData['SEQ']);
			$('#vBoardTitle').val(boardData['TITLE']);
			console.log(boardData['CONTENT']);
			
			setTimeout(function(){ CKEDITOR.instances['vBoardContent'].insertHtml(boardData['CONTENT']); }, 500);
			
			break;
			
		case "setBoardDataDelete":
			if(result['ERR_CD'] == 0){		//삭제성공
				BootstrapDialog.alert(COM_0003);
				getBoardDataForDashBoard();

				$('.btnListBoard:eq(1)').trigger('click');
			}else{							//삭제 실패
				BootstrapDialog.alert(COM_0009);
			}
			
			break;
			
		case "getMySaveData":
			$('#gridMySaveList').dataTable().fnClearTable();
			
			if(result.dsMySaveData.length > 0){
				$('#gridMySaveList').dataTable().fnAddData(result.dsMySaveData);
			}else{
				$('#gridMySaveListArea').hide();
			}
			
			gvResult['dsMySaveList'] = result.dsMySaveData;
			
			break;
			
		default:
			break;
	}
	
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 권한목록조회
 * @returns
 */
function getChartData(){
	var dataSet = {
			
	};
	
	callService("getChartData"
				,"dashboard/getChartData"
				,dataSet
				,"serviceCallback");
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
	
	for(var i=0; i<data.length; i++){
		var tableHtml = '';
		tableHtml = tableHtml + "<tr>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ (i+1) +"</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>";
		tableHtml = tableHtml + "<a href='#' class='btnViewBoard' data-toggle='modal' data-target='#modalBoardModalView' data-dismiss='modal' ccboard_seq='"+ data[i]['SEQ'] +"' boardSeq='"+ data[i]['BOARD_SEQ'] +"'>"+ data[i]['TITLE'] +"</a>";
		tableHtml = tableHtml + "</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ data[i]['UDT_ID'] +"</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ data[i]['CRT_DT'] +"</td>";
		tableHtml = tableHtml + "<td scope='row' class='text-center'>"+ data[i]['VISIT'] +"</td>";
		tableHtml = tableHtml + "</tr>";
		
		$('#board_'+seq+' > tbody').append(tableHtml);
	}
}

//나의연구활동 table setting
function setMySaveGrid()
{
	table = $('#gridMySaveList').DataTable( {
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
				},
				orderable:false
			},
			{ 
				data:"CONDT_NM",
				orderable:false
			},
			{ 
				data:"SAVE_CD",
				render:function(data,type,row,meta){
					var html;
					var url = "";
					
					if(row['METH_CD'] == 'CS'){			//단면연구
						url = "/research/crossSectionalStudy/crssecMain?SEQ=11&UPPER_SEQ=0"
					}else if(row['METH_CD'] == 'CH'){	//코호트연구
						url = "/research/cohort/cohortMain?SEQ=12&UPPER_SEQ=0"
					}else if(row['METH_CD'] == 'CC'){	//사례대조
						url = "/research/casctrl/casctrlMain?SEQ=13&UPPER_SEQ=0"
					}
					html = "<a href='"+ gvCONTEXT + url +"'>"+ gvSaveCode[data] +"</a>";
										 
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
					
					if(row['METH_CD'] == 'CS'){			//단면연구
						url = "/research/crossSectionalStudy/crssecMain?SEQ=11&UPPER_SEQ=0"
					}else if(row['METH_CD'] == 'CH'){	//코호트연구
						url = "/research/cohort/cohortMain?SEQ=12&UPPER_SEQ=0"
					}else if(row['METH_CD'] == 'CC'){	//사례대조
						url = "/research/casctrl/casctrlMain?SEQ=13&UPPER_SEQ=0"
					}
					if(data){
						html = "<a href='"+ gvCONTEXT + url +"'>"+ numberWithCommas(data) +"건</a>";
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
					var url = "/research/chartReview/chartReviewMain";
					if(data){
						html = "<a href='"+ gvCONTEXT + url +"'>데이터 수정</a>";
					}else{
						html = "";
					}
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"APRV_SEQ",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html;
					var url = "/research/approve/approveMain";
					if(data){
						html = "<a href='"+ gvCONTEXT + url +"'>승인요청</a>";
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
					var url = "/research/approve/approveMain";
					if(row['APRV_SEQ']){
						if(data == "Y"){
							html = "<a href='"+ gvCONTEXT + url +"'>승인완료</a>";
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
	
}

//나의연구항목 데이터 가져오기
function getMySaveData(){
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get('PER_CODE');
	
	callService("getMySaveData", "dashboard/getMySaveData", dataSet, "serviceCallback");
	
}

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function init()
{
	//에디터 로딩
	CKEDITOR.replace('vBoardContent');
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


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
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
		CKEDITOR.instances.vBoardContent.setData('');
		$('#vBoardTitle').val('');
	});
	
	//검색버튼
	$('#btnSearch').on('click',function(e){
		var boardSeq	= $('#boardSeq').val(boardSeq);
		
		if(isNullOrEmpty($('#searchVal').val())){
			BootstrapDialog.alert(COM_0006);
			return;
			
		}
		
		getBoardData(boardSeq);
		
		
	});
	
	$('#searchVal').on('keypress',function(e){
		var boardSeq	= $('#boardSeq').val(boardSeq);
		
		if(e.keyCode === 13){
			if(isNullOrEmpty($('#searchVal').val())){
				BootstrapDialog.alert(COM_0006);
				return;
				
			}
			
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
			BootstrapDialog.alert('Title을 입력해 주세요.');
			return;
		}
		
		//content
		var editorText = CKEDITOR.instances.vBoardContent.getData();
		if(editorText == ""){
			$('#cke_vBoardContent').addClass('border-red');
			BootstrapDialog.alert('내용을 입력해 주세요.');
			return;
		}
		
		//첨부파일
		/*var dataSet = new FormData();
		dataSet.uploadfile = $("input[name=filename]")[0].files[0];*/
		
		//var dataSet = new FormData($("#frmBoard")[0]);

		if($('#vSEQ').val() == ""){			//등록
			var dataSet = {};
			//dataSet.append("TITLE", $('#vBoardTitle').val());
			dataSet.BOARD_SEQ 	= $('#boardSeq').val();
			dataSet.TITLE 		= $('#vBoardTitle').val();
			dataSet.CONTENT 	= editorText;
			dataSet.UDT_ID 		= $.session.get('PER_CODE');
			dataSet.CRT_ID 		= $.session.get('PER_CODE');
			
			console.log(dataSet);
						//callServiceForm("setBoardData" ,"/attach/fileUpload", dataSet ,"serviceCallback");
			callService("setBoardData" ,"dashboard/insertBoardData", dataSet ,"serviceCallback");
			;
		}else{								//수정
			var dataSet = {
					SEQ 		: $('#vSEQ').val(),					//게시글번호
					BOARD_SEQ 	: $('#boardSeq').val(),				//게시판코드
					TITLE		: $('#vBoardTitle').val(),			//제목
					CONTENT		: editorText,						//내용
					UDT_ID 		: $.session.get('PER_CODE'),		//변경자 ID
				};
			
			callService("setBoardData" ,"dashboard/updateBoardData" ,dataSet ,"serviceCallback");
		}
		
	});
	
	//글보기
	$(document).on('click', '.btnViewBoard', function(){
		//게시판 seq 등록
		var boardSeq	= $(this).attr('boardseq');
		$('#boardSeq').val(boardSeq);
		
		$('#vSEQ').val($(this).attr('ccboard_seq'));
		
		console.log($('#boardTitle'+boardSeq).val());
		$('#bViewTitle').text($('#boardTitle'+boardSeq).val());
		
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
		CKEDITOR.instances.vBoardContent.setData('');
		$('#vBoardTitle').val('');
		
		var dataSet = {
				SEQ 	: $('#vSEQ').val()				//게시판seq
		};
		
		callService("getBoardDataUpdateDetail" ,"dashboard/selectBoardDataDetail" ,dataSet ,"serviceCallback");
	});
	
	//상세게시판 글삭제 버튼 클릭이벤트
	$('#btnDelBoard').on('click', function(){
		BootstrapDialog.confirm('게시글 및 첨부파일이 모두 삭제 됩니다.<br>정말 삭제하시겠습니까?', function(result){
            if(result) {
            	var dataSet = {
						SEQ	: $('#vSEQ').val()
				};
            	
            	callService("setBoardDataDelete" ,"dashboard/deleteBoardData" ,dataSet ,"serviceCallback");
            }
        });
	});
	
	
}

