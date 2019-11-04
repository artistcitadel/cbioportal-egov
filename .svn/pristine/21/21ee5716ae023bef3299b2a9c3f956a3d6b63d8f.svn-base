/**
 * 승인요청 관리
 * @Page : approveMgmt.jsp
 */
//그리드번호 : column resize를 위해 번호를 담음 
var gridNum = 0;
var modalSearchData;
var modalSearchData2;
/**
 * Application Ready
 */
$(document).ready(function(){
	
	//메뉴고정
	menuFix('admin_approveMgmt_approveMgmtMain');
	
	//승인요청현황 가져오기
	setGridRequest();
	
	initEvent();
	
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
function serviceCallback_approveMgmt(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getItemContDetlList":
			console.log(result);
			drawStudyItemSavedResultApprove(result);
			
			break;
			
		case "setApproveData":
			console.log(result);
			
			BootstrapDialog.alert(COM_0001);
			$('#gridRequestList').dataTable().fnDraw();
			
			//승인관리SNS연동common_utils.js 	'승인자ID', 					'승인자명', 		'승인결과', 	'조건명', 		'조건 seq', 	'데이터 seq', 	'요청자 부서'		'요청자ID'		'요청자명'			'추출목적'			'사유'
			callSNS_ADMIN($.session.get('PER_CODE'), $.session.get('PER_NAME'), result.APRV_YN, result.CONDT_NM, result.CONT_SEQ, result.DATA_SEQ, result.DEPT_NAME, result.PER_CODE, result.PER_NAME, result.PURPOSE_CD, result.REJT_REASON);
			
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
function getData(){
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

//승인요청/조회
function setGridRequest(){
		
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true,
			info: false,
			lengthMenu: [5,10],
			pageLength: 5,
			dom: '<"top"l>rt<"bottom"p><"clear">',
			fnRowCallback: function( row, data, index ) {
				if ( data.APRV_YN == "Y" ){
					$( row ).addClass( "label-primary" );
				}else if ( data.APRV_YN == "N" ){
					$( row ).addClass( "label-danger" );
				}
			}
	};
	
	var tableColumns = [
  			{ 
				data:"CONDT_NM",
				orderable:false
			},
			{ 
				data:"RSCH_DT",
				orderable:false,
				"type": "date",
				"dateFormat": "yy-mm-dd"
			},
			{ 
				data:"PER_NAME", 
				orderable:false
			},
			{ 
				data:"APRV_PER_NAME",
				orderable:false,
				defaultContent:""
			},
			{ 
				data:"APRV_YN",
				orderable:false,
				defaultContent:""
			},
			{ 
				data:"APRV_DT",
				orderable:false,
				defaultContent:"",
				"type": "date",
				"dateFormat": "yy-mm-dd",
				render:function(data,type,row,meta){
					var html = '';
					
					if(data == "0000-00-00 00:00"){
						html = '';
					}else{
						html = data;
					}
										 
					return html;
				}
			}
		];
	
	var tableColumnDef = [
	        { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5] 
		    },
		    { width: 10, targets: [2,3,4] },
		    { width: 30, targets: [1,5] },
		    { width: 50, targets: [0] }
	    ];
	
	var jsonData = {};
	console.log($('.approveNonChk').prop('checked')); //false가 선택된거 임
	jsonData.PER_CODE = '';
	jsonData.APROVE_FILTER = $('.approveNonChk').prop('checked'); //false가 선택된거 임
	
	callServiceDataTablesWithJson('gridRequestList', tableOption, tableColumns, tableColumnDef, '/admin/approveMgmt/getRequestList',jsonData);
	
	$('#gridRequestList').on('click', 'tr', function(event) {
		if(event.target.localName == "td"){
			var SEQ = $('#gridRequestList').DataTable().row(this).data().DATA_SEQ;
			var CONT_SEQ = $('#gridRequestList').DataTable().row(this).data().CONT_SEQ;
			var TABLE_ID = $('#gridRequestList').DataTable().row(this).data().TABLE_ID;
			var dataSet = {
					SEARCH_DATA_ID : SEQ,
					SEARCH_ITEM_CONT_SEQ : CONT_SEQ,
					TABLE_ID : TABLE_ID
			};
			
			modalSearchData2 = '';
			modalSearchData2 = dataSet;
			
			getItemContDetlListApproveMgmt(dataSet);
			
			datatablesSelected(this, 'info');
			
			var tableData = $('#gridRequestList').DataTable().row(this).data();
			console.log(tableData);
			//선택된 meth_cd 종류
			gvMethCd = $('#gridRequestList').DataTable().row(this).data().METH_CD;
		
			$('#seq').val(tableData.SEQ);												//승인관리 seq
			$('#CONT_SEQ').val(tableData.CONT_SEQ);										//조건 seq
			$('#DATA_SEQ').val(tableData.DATA_SEQ);										//데이터 seq
			$('#USER_PER_CODE').val(tableData.PER_CODE);								//요청자ID
			//$('#approveDivision').text(tableData.TABLE_ID);							//구분
			$('#approveName').text(tableData.CONDT_NM);									//조건명
			$('#approveAnd').text(' > ');
			$('#approveDataName').text(tableData.DATA_NM);								//데이터명
			$('#approveRequestNm').text(tableData.PER_NAME);							//요청자
			$('#approveGroup').text(tableData.DEPT_NAME);								//소속
			$('#approveRequestDate').text(tableData.RSCH_DT);							//요청일시
			if(gvSITE_CODE == 'UUH'){
	            $('#approveRequestPurpose').text(gvPURPOSE_CD_UUH[tableData.PURPOSE_CD]);      //추출목적
	        }
			else{
	            $('#approveRequestPurpose').text(gvPURPOSE_CD_KUH[tableData.PURPOSE_CD]);      //추출목적
	        }
			if(tableData.APRV_YN == "N"){
				$('input:radio[name="approveType"][value="N"]').iCheck('check');
				$('#approveReason').val(tableData.REJT_REASON);
				$('#approveReason').attr('disabled', false);
			}else{
				$('input:radio[name="approveType"][value="Y"]').iCheck('check');
				$('#approveReason').val('');
				$('#approveReason').attr('disabled', true);
			}
		}
	});
	
};

//연구항목 데이터 가져오기
function getItemContDetlListApproveMgmt(dataSet)
{
	callService("getItemContDetlList"
			,"research/approve/getItemContDetlList"
			,dataSet
			,"serviceCallback_approveMgmt");
	
}

function drawStudyItemSavedResultApprove(result)
{
	modalSearchData = '';
	modalSearchData = result;
	
	//그리드번호 초기화
	gridNum = 0;
	
//	저장데이터 	
	var $tabResult   = $('#tabResult');
	var $jqxGridResultWrap = $('#jqxGridResultWrap');
	
	var dsColumnList = [];			//jqxgrid 설정용
	var dsDataFieldList = [];		//jqxgrid 설정용	
	
	var dsWrapColumnList = [];		
	var dsWrapDataFieldList = [];
	
//	메타설정	
	 for(var j=0; j < result.dsDataResultList.length; j++){
	    	dsDataFieldList = [];
			dsColumnList = [];		
			
			for(var i=0; i < result.dsMetaDataList.length; i++){
				var dsMetaData = result.dsMetaDataList[i];
				
				var dsField = {};
				var dsColumn = {};
				
				dsField.name=dsMetaData.COLUMN_ID;
				
				dsColumn.datafield = dsMetaData.COLUMN_ID;
				dsColumn.text = dsMetaData.COLUMN_COMMENT;
				
				if( dsMetaData.COLUMN_ID === 'CHART_YN' || dsMetaData.COLUMN_ID === 'CHART_DT' || dsMetaData.COLUMN_ID === 'DEL_YN'){
					dsColumn.hidden = true;
				}
				
				if( dsMetaData.COLUMN_ID === 'CRT_DT'){
					dsField.type='date';
					dsColumn.cellsalign='center';
					dsColumn.cellsformat='yyyy-MM-dd';
					dsColumn.width=100;
				}
				
				if(isNull(dsMetaData.HIDDEN_YN)){
	    			dsColumn.hidden = false;
				}else{
	    			var strHiddenYn = dsMetaData.HIDDEN_YN;
	    			var arrHiddenYn = strHiddenYn.split(',');
	    			
	    			if(arrHiddenYn[j] === 'Y'){
	    				dsColumn.hidden = true;
	    			}else{
	    				dsColumn.hidden = false;
	    			}
	    		}
				
				dsDataFieldList.push(dsField);
				dsColumnList.push(dsColumn);
				
			}
			dsDataFieldList.push({name:'TABLE_ID'});
			dsColumnList.push({datafield:'TABLE_ID',text:'테이블',hidden:true});
			
			dsWrapColumnList.push(dsColumnList);		
	    	dsWrapDataFieldList.push(dsDataFieldList);
			
	 }
	
	   console.log("dsDta::::::::",dsWrapColumnList);
	   console.log("dsCta::::::::",dsWrapDataFieldList);
	
	   $tabResult.html('');
	$jqxGridResultWrap.html('');
	
	
	gvItemPeriodList = result.dsDataResultPeriodList;
	
	for(var i=0; i < result.dsDataResultList.length; i++){
		var tabhtml = '';			//tab
		var tabInnerHtml = '';		//tab div
		var $jqxGridHtml = '';		//jqxgrid wrap
		var jqxGridId = '';
		
		jqxGridId = 'jqxGridResult_' + i;
		
		if(i == 0){
			tabhtml = '<li class="active">';	
			
			tabInnerHtml = '<div class="tab-pane active" id="tabResult_' + i + '">';
				tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			tabInnerHtml += '</div>';
		
		
		}else{
			tabhtml = '<li>';
			
			tabInnerHtml = '<div class="tab-pane" id="tabResult_' + i +'">';
				tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			tabInnerHtml += '</div>';
		}
		
		/*		tabhtml += '<a href="#tabResult_' + i + '" data-toggle="tab">'+result.dsDataResultList[i].dsPeriodNm + '주기 ('+result.dsDataResultList[i].dsCount+')' + '</a>';
		tabhtml += '</li>';*/
		
		
		
		if(gvMethCd === 'CS'){
			tabhtml += '<a href="#tabResult_'+ i + '" data-toggle="tab">'+result.dsDataResultList[i].dsPeriodNm + '주기 ('+result.dsDataResultList[i].dsCount+')' + '</a>';
			tabhtml += '</li>';	
		}else if(gvMethCd === 'CH'){
			if(i == 0){
				tabhtml += '<a href="#tabResult_'+ i + '" data-toggle="tab">연구항목('+result.dsDataResultList[i].dsCount+')' + '</a>';
				tabhtml += '</li>';
			}else{
				tabhtml += '<a href="#tabResult_'+ i + '" data-toggle="tab">전체-'+i + ' ('+result.dsDataResultList[i].dsCount+')' + '</a>';
				tabhtml += '</li>';
			}
			
		}else{
			tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			$jqxGridResultWrap.append(tabInnerHtml);
			$('#lblResultInfo_').html('('+result.dsDataResultList[i].dsCount+')');
			
		}
		
		
		$tabResult.append(tabhtml);
		$jqxGridResultWrap.append(tabInnerHtml);
		
		var dataSource = {
		    datatype: "json",
		    datafields: dsWrapDataFieldList[i],
		    cache: false,
		    localdata: result.dsDataResultList[i].dsList	//데이터
		};
		
		var dataAdapter = new $.jqx.dataAdapter(dataSource, {
			loadError: function(xhr, status, error){
				alert(error);
			}
		});
		
		$('#' + jqxGridId).jqxGrid({
		    source: dataAdapter,
		    theme: 'bootstrap',
		    width: '100%',
		    height: '500',
		    columnsresize: true,
			sortable: true,
		    columns: dsWrapColumnList[i],
		    selectionmode: 'multiplecellsadvanced',
		    enabletooltips: true,
		    ready: function () {
		    	setTimeout(function(){ 
        			$('#jqxGridResult_'+gridNum).jqxGrid({ width: '100%' });
	        		$('#jqxGridResult_'+gridNum).jqxGrid('autoresizecolumns', 'column');
        		}, 500);
		    }
		});
		
	}
}

//승인요청관리 테이블 clear
function clearTable(){
	$('#gridRequestListArea').html('');
	var tableHtml = '';
	tableHtml = '<table width="100%" class="table table-bordered table-striped" id="gridRequestList" cellspacing="0">';
	tableHtml = tableHtml + '<thead>';
	tableHtml = tableHtml + 	'<tr>';
	tableHtml = tableHtml + 		'<th class="text-center">연구과제</th>';
	tableHtml = tableHtml + 		'<th class="text-center">요청일자</th>';
	tableHtml = tableHtml + 		'<th class="text-center">요청자</th>';
	tableHtml = tableHtml + 		'<th class="text-center">승인자</th>';
	tableHtml = tableHtml + 		'<th class="text-center">승인여부</th>';
	tableHtml = tableHtml + 		'<th class="text-center">승인/반려일자</th>';
	tableHtml = tableHtml + 	'</tr>';
	tableHtml = tableHtml + '</thead>';
	tableHtml = tableHtml + '</table>';
	
	$('#gridRequestListArea').html(tableHtml);
}

function AprvRegexp_filter(str_value){
	return str_value.replace(/[^imnx]/gi, ""); 
}



function setRegSearchGrid(dsDataFieldList,dsDataList,dsColumnList){
	
	var dataSource = {
		    datatype: "json",
		    datafields: dsDataFieldList,
		    cache: false,
		    localdata: dsDataList	//데이터
		};
		
		console.log("datafields",dsDataFieldList);
		console.log(dataSource);
		console.log(dsColumnList);
		
		var dataAdapter = new $.jqx.dataAdapter(dataSource, {
			loadError: function(xhr, status, error){
				alert(error);
			}
		});
		
		$('#gridRegexSearch').jqxGrid({
		    source: dataAdapter,
		    theme: 'bootstrap',
		    width: '100%',
		    height: '500',
		    showfilterrow: true,
		    filterable: true,
		    columnsresize: true,
			sortable: true,
		    selectionmode: 'multiplecellsadvanced',
		    enabletooltips: true,
			altrows : true,
		    columns: dsColumnList
		});
}
//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	makeiCheck('.approveChk, .approveNonChk');
	
	$("input:radio[name=approveType]").on('ifClicked', function(){
		if($(this).val() == "Y"){
			$('#approveReason').attr('disabled', true);
			$('#approveReason').val('');
		}else{
			$('#approveReason').attr('disabled', false);
		}
	});
	
	$('#btnApprove').on('click', function(){
		if($('#seq').val() == ""){
			BootstrapDialog.alert("연구과제를 " + COM_0023);
			return;
		}else{
			if($('#approveReason').attr('disabled') == undefined){
				if($('#approveReason').val() == ""){
					BootstrapDialog.alert("사유를 " + COM_0014);
					return;
				}
			};
			
			var dataSet = {};
			dataSet.SEQ 				= $('#seq').val();						//승인 seq
			dataSet.APRV_PER_CODE 		= $.session.get('PER_CODE');			//승인자 ID
			dataSet.APRV_YN 			= $('input:radio[name="approveType"]:checked').val();	//승인결과
			dataSet.REJT_REASON 		= $('#approveReason').val();			//사유	
			dataSet.CONDT_NM 			= $('#approveName').text();				//조건명
			dataSet.CONT_SEQ 			= $('#CONT_SEQ').val();					//조건 seq
			dataSet.DATA_NM 			= $('#approveDataName').text();			//데이터명
			dataSet.DATA_SEQ 			= $('#DATA_SEQ').val();					//데이터 seq
			dataSet.DEPT_NAME 			= $('#approveGroup').text();			//소속
			dataSet.PER_CODE 			= $('#USER_PER_CODE').val();			//요청자 ID
			dataSet.PER_NAME 			= $('#approveRequestNm').text();		//요청자명
			dataSet.PURPOSE_CD 			= $('#approveRequestPurpose').text();	//추출목적
			
			callService("setApproveData"
					,"admin/approveMgmt/setApproveData"
					,dataSet
					,"serviceCallback_approveMgmt");
		}
		
	});
	
	$('#RegexSearch').keydown(function(key){
		if(key.keyCode=='13'){
			$('#btnRegexSearch').trigger('click');
		}
	});
	
	$('#RegexSearchtxt').keydown(function(key){
		if(key.keyCode=='13'){
			$('#btnRegexSearch').trigger('click');
		}
	})
	
	
	$(document).on('click', '#btnAutoColumns', function(){
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
	});
	
	$(document).on('click','#modalApproveClose',function(){
		setRegSearchGrid([],[],[]);
		$('#gridRegexSearch').jqxGrid('clear');
	});
	
	$(document).on('click','#btnApproveSearch',function(){
		console.log(modalSearchData);
		// 연구과제 선택 유무 확인
		if(modalSearchData==undefined){
			showAlert("알림","연구데이터가 없습니다. 연구과제를 선택해주시길 바랍니다.",null);
			return;
		}
		setRegSearchGrid([],[],[]);
		$('#gridRegexSearch').jqxGrid('clear');
		$('#modalApproveSearch').modal('show');
		//input 박스 초기화
		$('#ColumnSearch').text('');
		$('#RegexSearch').val('');
		$('#RegexSearchtxt').val('im');
		
		$('#ColumnSearch').append("<option value=''>선 택</option>");

		
		var dsColumnList = modalSearchData.dsMetaDataList;
		var tmpOption='';
		
		//컬럼 예외처리
		$.each(dsColumnList,function(key,value){
			if(value.COLUMN_ID ==='PAT_SBST_NO' ||value.COLUMN_ID ==='CHART_YN' || value.COLUMN_ID === 'CHART_DT' || value.COLUMN_ID === 'DEL_YN'){
				return;
			}
			
			tmpOption += "<option value='"+value.COLUMN_ID+"'>"+value.COLUMN_COMMENT+"</option>"
		});
		
		$('#ColumnSearch').append(tmpOption);
		
		

	});
	
	$(document).on('click','#btnRegexSearch',function(){
		
		//활성화탭 찾기
		var jqxGridId = $('.tab-pane.active').children('div').attr('id');
		
		
		if(jqxGridId.indexOf("jqxGridResult_")==-1){
			alert("선택안됨");
			return;
		}
		
		//빈값 체크
		if($('#ColumnSearch').val() == '' || $('#RegexSearch').val()=='' ||  $('#RegexSearchtxt').val() == ''){
			alert("값을 입력해주세요");
			return;
		}

		var table = modalSearchData2.TABLE_ID;
		var period = jqxGridId.replace("jqxGridResult_",'');
		period = period*1+1;
		var colType='';
		
		//선택한 컬럼의 데이터 타입 구하기 ( DAT,COD, TEX, NUM)
		$.each(modalSearchData.dsMetaDataList,function(key,value){

			if(value.COLUMN_ID == $('#ColumnSearch').val()){
				colType = value.ITEM_TYPE;
			}
		});
		var dataSet = {};
		
		dataSet.PERIOD_CD = period;
		dataSet.TABLE_ID = table;
		dataSet.COLUM_ID = $('#ColumnSearch').val();
		dataSet.REXSEARCH = $('#RegexSearch').val();
		dataSet.REXTXT = $('#RegexSearchtxt').val();
		dataSet.ITEM_TYPE = colType;
		console.log(dataSet);
		
		
		var promise = http("research/approve/getRegexSearchList",'post',false,dataSet);
		promise.then(function(result){
			console.log(result);
			var dsDataFieldList = new Array();
			var dsColumnList = new Array();
			var dsDataList= new Array();
			
			for(i=0; i<2; i++){
				var dsField = {};
				var dsColumn = {};

			
				if(i==0){
					dsField.name = "PAT_SBST_NO";
					dsField.type = 'string';
					dsColumn.datafield = "PAT_SBST_NO";		
					dsColumn.text = "환자대체번호";
					dsColumn.width='40%';
				}
				else{
					dsField.name = $('#ColumnSearch').val();
					dsColumn.datafield = $('#ColumnSearch').val();
					dsColumn.text = $('#ColumnSearch option:selected').text();
					if( $('#ColumnSearch').val() == 'CRT_DT' || colType=='DAT'){
						dsField.type='date';
						dsColumn.cellsformat='yyyy-MM-dd';
						dsColumn.width='60%';
					}
					else{
						dsColumn.width='60%';
						dsField.type = 'string';
					}
					
				}
				dsColumn.align='center';
				dsColumn.cellsalign='center';
				dsDataFieldList.push(dsField);
				dsColumnList.push(dsColumn);

									
			}
			
			//그리드 Set
			setRegSearchGrid(dsDataFieldList,result.dsDataResultList,dsColumnList);
			
		});
		

		
		
	});
	
	$(document).on('click','#btnRegExpHelp',function(){
		var msg = '';

		msg = '<div style="font-size:14pt;text-align:left;height:200px;overflow-y:scroll;">';
			msg += '<ul>';
			
				msg += '<li>';
					msg += '예시) 주민번호 정규식 검색 방법\n [0-9]{2}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])-?[012349][0-9]{6}';
				msg += '</li>\n';
	
				msg += '<li>';
					msg += 'i : 대소문자구분 안함';
				msg += '</li>';
				
				msg += '<li>';
					msg += 'm : Treats the string being matched as multiple lines. With this modifier, the start of line (^) and end of line ($) regular expression operators match line breaks (\n) within the string. Ordinarily, these operators only match the start and end of the string.';
				msg += '</li>';
				
				msg += '<li>';
					msg += 'n : Allows the single character regular expression operator (.) to match a newline (\n). Normally, the . operator will match any character except a newline.';
				msg += '</li>';
				
				msg += '<li>';
					msg += 'x : Allows you to document your regular expressions. It causes all unescaped space characters and comments in the regular expression to be ignored. Comments start with a hash character (#) and end with';
				msg += '</li>';
		
			msg += '</ul>';
		msg += '</div>';
		
		showAlert('정규식 Modifier 도움말',msg,null);
	});
	
	$(document).on('click', '#tabResult > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[1];
		
		$('#btnAutoColumns').attr('tabNum', gridNum);
		
	});
	
	
	$(".approveNonChk").on('ifChecked', function(event){
		console.log("a");
		
		clearTable();
		
		setGridRequest();
	});
	
	$(".approveNonChk").on('ifUnchecked', function(event){
		console.log("b");
		
		clearTable();
		
		setGridRequest();
	});
	
	
}
