var gvMethCd = 'CS';			//메뉴
var gvActiveTab = '01';			//탭(01:환자선택, 02:연구항목)

var gvCommand = 'C';
var gvDate;

var groupIdentify 		= 0;
var gvGrpIdx 			= 0;
var gvGrpStudyItemIdx 	= 0;
var gvGrpEventIdx 		= 0;
var gvGrpCensoredIdx 	= 0;
var gvGrpCaseIdx		= 0;
var gvGrpControlIdx		= 0;
var gvChkDuplCondNmList = [];	//연구항목 중복체크
var gvTargetId;

//공통코드
var gvItemCont;
var gvItemMgmtList = [];		//조건연구항목
var gvItemContDetlList = [];	//조건공유 목록

var gvTabCd = {
		'C':{
			'CODE':'C'		
			,'NAME':'조회조건'	
			,'TABLE_ID':'gridSearch'
			,'GR_LV_IDX':'gvGrpIdx'			
			,'GR_LV_IDX_ELEM':'grpIdx'			
			,'GR_LV_BTN':'btnGRP_C'		
			,'GR_LV_ID':'txtGRP_C'	
			,'ANDOR_ID':'txtANDOR_C'
		},
		'R':{
			'CODE':'R'		
			,'NAME':'연구항목'	
			,'TABLE_ID':'gridStudyItem'			
			,'GR_LV_IDX':'gvGrpStudyItemIdx'	
			,'GR_LV_IDX_ELEM':'grpStudyItemIdx'
			,'GR_LV_BTN':'btnGRP_R'		
			,'GR_LV_ID':'txtGRP_R'	
			,'ANDOR_ID':'txtANDOR_R'
		},
		'RE':{
			'CODE':'RE'
			,'NAME':'사건정의'
			,'TABLE_ID':'gridEventList'			
			,'GR_LV_IDX':'gvGrpEventIdx'
			,'GR_LV_IDX_ELEM':'grpEventIdx'	
			,'GR_LV_BTN':'btnGRP_RE'
			,'GR_LV_ID':'txtGRP_RE'
			,'ANDOR_ID':'txtANDOR_RE'
		},
		'RQ':{
			'CODE':'RQ'
			,'NAME':'중도절단'
			,'TABLE_ID':'gridCensoredDataList'
			,'GR_LV_IDX':'gvGrpCensoredIdx'
			,'GR_LV_IDX_ELEM':'grpCensoredDataIdx'	
			,'GR_LV_BTN':'btnGRP_RQ'
			,'GR_LV_ID':'txtGRP_RQ'
			,'ANDOR_ID':'txtANDOR_RQ'
		},
		'CA':{
			'CODE':'CA'
			,'NAME':'사례군'		
			,'TABLE_ID':'gridCaseGroup'			
			,'GR_LV_IDX':'gvGrpCaseIdx'
			,'GR_LV_IDX_ELEM':'grpCaseIdx'	
			,'GR_LV_BTN':'btnGRP_CA'
			,'GR_LV_ID':'txtGRP_CA'
			,'ANDOR_ID':'txtANDOR_CA'
		},
		'CO':{
			'CODE':'CO'
			,'NAME':'대조군'		
			,'TABLE_ID':'gridControlGroup'		
			,'GR_LV_IDX':'gvGrpControlIdx'
			,'GR_LV_IDX_ELEM':'grpControlIdx'	
			,'GR_LV_BTN':'btnGRP_CO'
			,'GR_LV_ID':'txtGRP_CO'
			,'ANDOR_ID':'txtANDOR_CO'
		},
		'P':{
			'CODE':'P'		
			,'NAME':'주기'		
			,'TABLE_ID':'gridPeriod'			
			,'GR_LV_IDX':''
			,'GR_LV_IDX_ELEM':''	
			,'GR_LV_BTN':'btnGRP_P'		
			,'GR_LV_ID':'txtGRP_P'
			,'ANDOR_ID':'txtANDOR_P'
		}
};

var gvPeriodCdList = [];
var gvSurviveCensoredCdList = [];
var gvItemMgmtTxtList = [];	
var gvItemMgmtNumList = [];
var gvRangeCdList = [];
var gvAggCdList = [];
var gvDeviationCdList = []; 		//CDW_DEVIATION_CD
var gvRegexpLikeModifier = [];		//CDW_REGEXP_LIKE_MODIFIER
var gvShareCdList = [];				//CDW_SHARE_CD
var gvPersonalShareYnList = [];		//CDW_PERSONAL_SHARE_YN_CD

//사례대조군
var gvContCdList = [];	//대조군배수
var gvMatCdList = [];	//대조군매칭

//개인자료업로드
var gvPersonalDataTypeList = [];

var gvCommonCode = [
	{'SEARCH_COMM_GRP_ID':'CDW_PERIOD_CD','DATA_SET':'gvPeriodCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_CENSORING_CD','DATA_SET':'gvSurviveCensoredCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_TXT_CD','DATA_SET':'gvItemMgmtTxtList'},
	{'SEARCH_COMM_GRP_ID':'CDW_NUM_CD','DATA_SET':'gvItemMgmtNumList'},
	{'SEARCH_COMM_GRP_ID':'CDW_REGEXP_LIKE_MODIFIER_CD','DATA_SET':'gvRegexpLikeModifier'},
	{'SEARCH_COMM_GRP_ID':'CDW_RANGE_CD','DATA_SET':'gvRangeCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_AGG_CD','DATA_SET':'gvAggCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_DEVIATION_CD','DATA_SET':'gvDeviationCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_CC_CONT_CD','DATA_SET':'gvContCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_CC_MAT_CD','DATA_SET':'gvMatCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_PERSONAL_DATA_TYPE_LIST_CD','DATA_SET':'gvPersonalDataTypeList'},
	{'SEARCH_COMM_GRP_ID':'CDW_SHARE_CD','DATA_SET':'gvShareCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_PERSONAL_SHARE_YN_CD','DATA_SET':'gvPersonalShareYnList'}
	
	
];

//	조회조건
var gvItemSearchCondition = [];

//	반복관리
var gvItemPeriod = [];

var gvTargetIdx = 0;		//타겟 조회시 설정(datatable의 현재 row)
var gvCurrentRow = -1;		//모달창 출력시 설정(datatable의 현재 row) 
var gvPopupTabCd = '';

var gvDataSourcePeriod;
var gvDataSourcePeriod_01;
var gvDataSourcePeriod_02;


var hidden 	= "hidden";		//group debug용

//그리드번호 : column resize를 위해 번호를 담음 
var gridNum = 0;

var idleTime = 0;

/**
 * Application Ready
 */
$(document).ready(function(){
	gvDate = getServerDate();
	
	init_common();
	initEvent_common();
	
    
});




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
		
	});
	
	$(obj).datepicker('show');	
}






/**
 * Datepicker show
 * @param param
 * @returns
 */
function setCalDate(param)
{
	
	var $element = $(param);
	
	$element.datepicker({
		format: 'yyyy-mm-dd',
		showOnFocus:false,
		todayHighlight:true,
		autoclose:true
	});
	
}


//

//------------------------------------------------------------------------------------------
// CALLBACK	
//------------------------------------------------------------------------------------------
/**
 * callback 함수
 * @param svcId
 * @param result
 * @returns
 */

function serviceCallback_research_common(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}
	
	switch(svcId){
		case "getCommonCodeList":
			for(var i=0; i < gvCommonCode.length; i++){
				var dsCommonCode = gvCommonCode[i];
				
				if(result.commonCodeGrpId === dsCommonCode.SEARCH_COMM_GRP_ID){
					eval(dsCommonCode.DATA_SET + "=result.dsCommonCodeList;");
					break;
				}
			}
			
			break;
			
		case "insertSearchCondition":
			showAlert(null,COM_0001,null);
			break;
			
		//조회조건 카운트 조회 콜백	
		case "getCount":
			gvResult = result.DATA;
			
			var count = 0;
			
			for(var i=0; i < gvResult.length; i++){
				count += gvResult[i].dsCount;
			}
			
			if(isNull(gvTargetId)){
				if(gvTargetIdx > -1){
					$('#txtCNT_' + gvTargetIdx).val(count);	
				}
				
			}else{
				$('#' + gvTargetId).val(count);
			}
			
			gvTargetId = null;
			gvTargetIdx = -1;
			
			
			break;
			
		//사례대조 카운트 조회 콜백	
		case "getCountCaseControl":
			gvResult = result.DATA;
			
			var count = 0;
			
			for(var i=0; i < gvResult.length; i++){
				count += gvResult[i].dsCount;
			}
			
			if(gvTargetId.indexOf('CC_CASE_NUM') >= 0){
				$('#txtCC_CASE_NUM').val(count);
				
			}else{
				if(gvTargetIdx > -1){
					$('#txtCNT_' + gvTargetId + '_' + gvTargetIdx).val(count);	
				}	
			}
			
			
			gvTargetId = null;
			gvTargetIdx = -1;
			
			break;
			
		//연구항목 저장 중복체크	
		case "chkDuplCondNmList":
			gvChkDuplCondNmList = result.dsChkDuplCondNmList;
			
			break;
		default:
			break;
	}
		
}


//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
function getCommonCodeList(){
	for(var i=0; i < gvCommonCode.length; i++){
		var ds = gvCommonCode[i];
		var dataSet = {};
		dataSet.SEARCH_COMM_GRP_ID = ds.SEARCH_COMM_GRP_ID;
		callServiceSync("getCommonCodeList"
					,"common/sys/getCommonCodeList"
					,dataSet
					,"serviceCallback_research_common");
		
	}
	
}

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init_common()
{
//	공통코드 조회	
	getCommonCodeList();
	
//	조회조건그리드 초기화	
	$('#gridSearch_01').setGrid();
	$('#gridSearch_02').setGrid();
	
//	연구항목 초기화	
	$('#gridStudyItem').setGridStudyItem();
	
}

var gvTable;


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
* 이벤트 초기화
* @returns
*/
function initEvent_common()
{

	//서식지 검색결과 modal
	/*$(document).on('click', '.btnSearchModal', function(){
		$('#popSearchModal').modal('show');
	});*/
	
	$(document).on('click', '#tabResult > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[1];
		
		$('#btnAutoColumns').attr('tabNum', gridNum);
		
	});
	
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var href = $(this).attr('href');
		
		if(isNull(href) || href === '#patient'){
			gvActiveTab = '01';
			
		}else if(href === '#study'){
			gvActiveTab = '02';
			
			
		}
		
		$('#gridSearch_' + gvActiveTab).setGrid();
		
		
		var srcTable = $('#gridSearch_01').DataTable();
		
		if(href === '#study' && !isNull(srcTable.rows().data())){
			
			var table = $('#gridSearch_' + gvActiveTab).DataTable();
			
			table.rows().remove().draw();
			
			table.rows.add(srcTable.rows().data()).draw();
			
		}	 
 		 
		if(!isNull(gvItemPeriod)){
			//setJqxGridPeriod();
			
			
		}
		
	});
	
	
	
//	MODAL EVENT
	$('#popCSModal').on('shown.bs.modal', function(event){
		initCS();
	});
	
	$('#popPModal').on('shown.bs.modal', function(event){
		initP();
	});
	
	$('#popWModal').on('shown.bs.modal', function(event){
		initW();
	});
	
	$('#pop1HModal').on('shown.bs.modal', function(event){
		init1H();
	});
	
	$('#pop2HModal').on('shown.bs.modal', function(event){
		init2H();
	});
	
	$('#pop3HModal').on('shown.bs.modal', function(event){
		init3H();
	});
	
	$('#pop1HTMRModal').on('shown.bs.modal', function(event){
		init1HTMR();
	});
	
	$('#pop2HTMRModal').on('shown.bs.modal', function(event){
		init2HTMR();
	});
	
	$('#pop3HTMRModal').on('shown.bs.modal', function(event){
		init3HTMR();
	});
	
	$('#pop1HTModal').on('shown.bs.modal', function(event){
		init1HT();
	});
	
	$('#pop2HTModal').on('shown.bs.modal', function(event){
		init2HT();
	});
	
	$('#pop3HTModal').on('shown.bs.modal', function(event){
		init3HT();
	});
	
	$('#popKWModal').on('shown.bs.modal', function(event){
		initKW();
	});
	
	$('#perDataListModal').on('shown.bs.modal', function(event){
		initPerDataList();
	});
	
	
	$('#popSearchModal').on('shown.bs.modal', function(event){
		initSearchModal();
	});
	
	$('#popCSModal').on('hide.bs.modal', function(event){
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var resultVal = $('#result').val();
				if(resultVal == "clear"){
					resultVal = "";
				}
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val(resultVal);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
				
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#jqxCodeSetListCS").remove();
		$('#jqxCodeSetListCSArea').append('<div id="jqxCodeSetListCS"></div>');
		
		$("#jqxCodeSetSelectedList").remove();
		$('#jqxCodeSetSelectedListArea').append('<div id="jqxCodeSetSelectedList"></div>');
	});
	
	
	$('#popKWModal').on('hide.bs.modal', function(event){
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var resultVal = $('#result').val();
				if(resultVal == "clear"){
					resultVal = "";
				}
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val(resultVal);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
				
			}	
		}
		
		gvSpinnerClose();
	});
	
	$('#popPModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var resultVal = $('#result').val();
				if(resultVal == "clear"){
					resultVal = "";
				}
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val(resultVal);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#searchPGridA").remove();
		$('.keywordPCls').append('<div id="searchPGridA"></div>');
		
		$("#searchSelectPGrid").remove();
		$('#searchSelectPGridArea').append('<div id="searchSelectPGrid"></div>');
		
		$('#ORD_KIND').remove();
		$('#ORD_KIND_AREA').append('<div id="ORD_KIND" name="ORD_KIND" class="jqxComboBox"></div>');
		$('#ORD_SCLS').remove();
		$('#ORD_SCLS_AREA').append('<div id="ORD_SCLS" name="ORD_SCLS" class="jqxComboBox"></div>');
		/*$('#LB_SL_CODE').remove();
		$('#LB_SL_CODE_AREA').append('<div id="LB_SL_CODE" name="LB_SL_CODE" class="jqxComboBox"></div>');
		$('#RAD_PACSPECIALITY').remove();
		$('#RAD_PACSPECIALITY_AREA').append('<div id="RAD_PACSPECIALITY" name="RAD_PACSPECIALITY" class="jqxComboBox"></div>');
		$('#SP_SL_CODE').remove();
		$('#SP_SL_CODE_AREA').append('<div id="SP_SL_CODE" name="SP_SL_CODE" class="jqxComboBox"></div>');
		$('#PATH_SL_CODE').remove();
		$('#PATH_SL_CODE_AREA').append('<div id="PATH_SL_CODE" name="PATH_SL_CODE" class="jqxComboBox"></div>');
		$('#MB_THRU_CHAN').remove();
		$('#MB_THRU_CHAN_AREA').append('<div id="MB_THRU_CHAN" name="MB_THRU_CHAN" class="jqxComboBox"></div>');
		$('#MB_CLSS_COED').remove();
		$('#MB_CLSS_COED_AREA').append('<div id="MB_CLSS_COED" name="MB_CLSS_COED" class="jqxComboBox"></div>');
		$('#OP_SL_CODE').remove();
		$('#OP_SL_CODE_AREA').append('<div id="OP_SL_CODE" name="OP_SL_CODE" class="jqxComboBox"></div>');*/
		
		code = "A";
		$('.btnTab:eq(0)').trigger('click');
	});
	
	
	$('#popWModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var resultVal = $('#result').val();
				if(resultVal == "clear"){
					resultVal = "";
				}
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val(resultVal);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#searchWGrid").remove();
		$('#keywordW').append('<div id="searchWGrid"></div>');
		
		$("#searchSelectWGrid").remove();
		$('#searchSelectWGridArea').append('<div id="searchSelectWGrid"></div>');
	});
	
	

	$('#pop1HModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var resultVal = $('#result').val();
				if(resultVal == "clear"){
					resultVal = "";
				}
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val(resultVal);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#search1HGrid").remove();
		$('#search1HGridArea').append('<div id="search1HGrid"></div>');
		
		$("#searchSelect1HGrid").remove();
		$('#searchSelect1HGridArea').append('<div id="searchSelect1HGrid"></div>');
	});
	
	

	$('#pop2HModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var retVal = $('#result').val();
				
			//	설정된 값이 없으면	
				if(isNullOrEmpty(retVal) || gvCurrentRow < 0){
					return;
					
				}
				
				var arrPopupVal = retVal.split(gvSplitChar);
				
				var popupVal1 = arrPopupVal[0];
				var popupVal2 = arrPopupVal[1];
				
				//넘어온 값이 clear일경우 input값 초기화
				if(popupVal2 == "clear"){
					popupVal1 = "";
					popupVal2 = "";
				}
				
				var nCurrentRow = Number(gvCurrentRow);
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 1)).val(popupVal1);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + nCurrentRow).val(popupVal2);	
				
			//	값설정후 clear
				$('#args').val('');
				$('#result').val('');
				
				gvCurrentRow = -1;
				gvPopupTabCd = '';
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#search2HGrid").remove();
		$('#search2HGridArea').append('<div id="search2HGrid"></div>');
		
		$("#searchSelect2HGrid").remove();
		$('#searchSelect2HGridArea').append('<div id="searchSelect2HGrid"></div>');
	});
	
	
	$('#pop3HModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			//if(!isNull($('#result').val())){
				var retVal = $('#result').val();

				//	설정된 값이 없으면	
				if(isNullOrEmpty(retVal) || gvCurrentRow < 0){
					return;
					
				}
				
				
				var arrPopupVal = retVal.split(gvSplitChar);
				
				var popupVal1 = arrPopupVal[0];
				var popupVal2 = arrPopupVal[1];
				var popupVal3 = arrPopupVal[2];
				
				//넘어온 값이 clear일경우 input값 초기화
				if(popupVal3 == "clear"){
					popupVal1 = "";
					popupVal2 = "";
					popupVal3 = "";
				}
				
				var nCurrentRow = Number(gvCurrentRow);
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 2)).val(popupVal1);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 1)).val(popupVal2);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + nCurrentRow).val(popupVal3);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvCurrentRow = -1;
				gvPopupTabCd = '';
			//}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#searchTop3HGrid").remove();
		$('#searchTop3HGridArea').append('<div id="searchTop3HGrid"></div>');
		
		$("#searchMiddle3HGrid").remove();
		$('#searchMiddle3HGridArea').append('<div id="searchMiddle3HGrid"></div>');
		
		$("#searchBottom3HGrid").remove();
		$('#searchBottom3HGridArea').append('<div id="searchBottom3HGrid"></div>');
	});
	
	
	$('#pop1HTMRModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val($('#result').val());	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#codeTree1HTMR").remove();
		$('#codeTree1HTMRArea').append('<div id="codeTree1HTMR" class="margin-top-5"></div>');
	});
	
	
	$('#pop2HTMRModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var retVal = $('#result').val();
				
			//	설정된 값이 없으면	
				if(isNullOrEmpty(retVal) || gvCurrentRow < 0){
					return;
					
				}
				
				var arrPopupVal = retVal.split(gvSplitChar);
				
				var popupVal1 = arrPopupVal[0];
				var popupVal2 = arrPopupVal[1];
				
				//넘어온 값이 clear일경우 input값 초기화
				if(popupVal2 == "clear"){
					popupVal1 = "";
					popupVal2 = "";
				}
				
				var nCurrentRow = Number(gvCurrentRow);
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 1)).val(popupVal1);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + nCurrentRow).val(popupVal2);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvCurrentRow = -1;
				gvPopupTabCd = '';
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#codeTree2HTMR").remove();
		$('#codeTree2HTMRArea').append('<div id="codeTree2HTMR" class="margin-top-5"></div>');
		
		$("#searchSelect2HTMRGrid").remove();
		$('#searchSelect2HTMRGridArea').append('<div id="searchSelect2HTMRGrid"></div>');
	});
	
	

	$('#pop3HTMRModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var retVal = $('#result').val();
				
			//	설정된 값이 없으면	
				if(isNullOrEmpty(retVal) || gvCurrentRow < 0){
					return;
					
				}
				
				var arrPopupVal = retVal.split(gvSplitChar);
				
				var popupVal1 = arrPopupVal[0];
				var popupVal2 = arrPopupVal[1];
				var popupVal3 = arrPopupVal[2];
				
				//넘어온 값이 clear일경우 input값 초기화
				if(popupVal3 == "clear"){
					popupVal1 = "";
					popupVal2 = "";
					popupVal3 = "";
				}
				
				var nCurrentRow = Number(gvCurrentRow);
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 2)).val(popupVal1);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 1)).val(popupVal2);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + nCurrentRow).val(popupVal3);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvCurrentRow = -1;
				gvPopupTabCd = '';
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#codeTree3HTMR").remove();
		$('#codeTree3HTMRArea').append('<div id="codeTree3HTMR" class="margin-top-5"></div>');
		
		$("#searchMiddle3HTMRGrid").remove();
		$('#searchMiddle3HTMRGridArea').append('<div id="searchMiddle3HTMRGrid"></div>');
	});
	
	
	$('#pop1HTModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + gvCurrentRow).val($('#result').val());	
				
				$('#args').val('');
				$('#result').val('');
				
				gvPopupTabCd = '';
				gvCurrentRow = -1;
			}	
		}
		
		gvSpinnerClose();
	});
	
	$('#pop2HTModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var retVal = $('#result').val();
				
			//	설정된 값이 없으면	
				if(isNullOrEmpty(retVal) || gvCurrentRow < 0){
					return;
					
				}
				
				var arrPopupVal = retVal.split(gvSplitChar);
				
				var popupVal1 = arrPopupVal[0];
				var popupVal2 = arrPopupVal[1];
				
				//넘어온 값이 clear일경우 input값 초기화
				if(popupVal2 == "clear"){
					popupVal1 = "";
					popupVal2 = "";
				}
				
				var nCurrentRow = Number(gvCurrentRow);
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 1)).val(popupVal1);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + nCurrentRow).val(popupVal2);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvCurrentRow = -1;
				gvPopupTabCd = '';
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#codeTree2HT").remove();
		$('#codeTree2HTArea').append('<div id="codeTree2HT" class="margin-top-5"></div>');
		
		$("#searchSelect2HTGrid").remove();
		$('#searchSelect2HTGridArea').append('<div id="searchSelect2HTGrid"></div>');
	});
	
	
	$('#pop3HTModal').on('hide.bs.modal', function(event){
		var table = $('gridSearch_' + gvActiveTab).DataTable();
		
		if(gvCurrentRow != -1){
			if(!isNull($('#result').val())){
				var retVal = $('#result').val();
				
			//	설정된 값이 없으면	
				if(isNullOrEmpty(retVal) || gvCurrentRow < 0){
					return;
					
				}
				
				var arrPopupVal = retVal.split(gvSplitChar);
				
				var popupVal1 = arrPopupVal[0];
				var popupVal2 = arrPopupVal[1];
				var popupVal3 = arrPopupVal[2];
				
				//넘어온 값이 clear일경우 input값 초기화
				if(popupVal3 == "clear"){
					popupVal1 = "";
					popupVal2 = "";
					popupVal3 = "";
				}
				
				var nCurrentRow = Number(gvCurrentRow);
				
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 2)).val(popupVal1);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + (nCurrentRow - 1)).val(popupVal2);
				$('#txtPOPUP_VAL_' + gvPopupTabCd + '_' + nCurrentRow).val(popupVal3);	
				
				$('#args').val('');
				$('#result').val('');
				
				gvCurrentRow = -1;
				gvPopupTabCd = '';
			}	
		}
		
		gvSpinnerClose();
		
		//영역 초기화
		$("#codeTree3HT").remove();
		$('#codeTree3HTArea').append('<div id="codeTree3HT" class="margin-top-5"></div>');
		
		$("#searchMiddle3HTGrid").remove();
		$('#searchMiddle3HTGridArea').append('<div id="searchMiddle3HTGrid"></div>');
		
		$("#searchBottom3HTGrid").remove();
		$('#searchBottom3HTGridArea').append('<div id="searchBottom3HTGrid"></div>');
	});
	
	$('#popSearchModal').on('hide.bs.modal', function(event){
		$('#formList').html('');
	});
	
	
//	시각화
	$('#btnVisualization').on('click',function(e){
		var per_code = $.session.get('PER_CODE');
		var contSeq = $("#txtCONT_SEQ").val();
        var dataSeq = $("#txtDATA_SEQ").val();
		
		if ($('#txtCONT_SEQ').val() == "" || $('#txtDATA_SEQ').val() == "") { // 조건을 입력하지 않았을 경우 처리
			//BootstrapDialog.alert("연구항목 검색 및 데이터 저장 후 시도해 주세요.");
			showAlert(null,'연구항목 검색 및 데이터 저장 후 시도해 주세요.',null);
			return;
			
		}else{ 
			var dataSet = {};
			dataSet.SEARCH_CONT_SEQ = contSeq;
			dataSet.SEARCH_DATA_SEQ = dataSeq;
			
			var url = gvSERVER + gvCONTEXT + "/visualize/control";		
			var param = "";
		
			param = "?";
			param += "contSeq=" + contSeq;
			param += "&";
			param += "dataSeq=" + dataSeq;
			
			event.preventDefault();
			window.open(url+param, "popupWindow", "width=1400,height=700,scrollbars=yes");
		}					
	});
	
//	시각화_재작업
	$('#btnVisualization2').on('click',function(e){
		var per_code = $.session.get('PER_CODE');
		var contSeq = $("#txtCONT_SEQ").val();
        var dataSeq = $("#txtDATA_SEQ").val();
		
		if ($('#txtCONT_SEQ').val() == "" || $('#txtDATA_SEQ').val() == "") { // 조건을 입력하지 않았을 경우 처리
			//BootstrapDialog.alert("연구항목 검색 및 데이터 저장 후 시도해 주세요.");
			showAlert(null,'연구항목 검색 및 데이터 저장 후 시도해 주세요.',null);
			return;
			
		}else{ 
			var dataSet = {};
			dataSet.SEARCH_CONT_SEQ = contSeq;
			dataSet.SEARCH_DATA_SEQ = dataSeq;
			
			var url = gvSERVER + gvCONTEXT + "/visualizepopup/main";		
			var param = "";
		
			param = "?";
			param += "contSeq=" + contSeq;
			param += "&";
			param += "dataSeq=" + dataSeq;
			
			event.preventDefault();
			window.open(url+param, "popupWindow", "width=1600,height=900,scrollbars=yes");
		}					
	});
	
//	시각화_재작업
	$('#btnVisualization3').on('click',function(e){
		var per_code = $.session.get('PER_CODE');
		var contSeq = $("#txtCONT_SEQ").val();
        var dataSeq = $("#txtDATA_SEQ").val();
		
		if ($('#txtCONT_SEQ').val() == "" || $('#txtDATA_SEQ').val() == "") { // 조건을 입력하지 않았을 경우 처리
			//BootstrapDialog.alert("연구항목 검색 및 데이터 저장 후 시도해 주세요.");
			showAlert(null,'연구항목 검색 및 데이터 저장 후 시도해 주세요.',null);
			return;
			
		}else{ 
			var dataSet = {};
			dataSet.SEARCH_CONT_SEQ = contSeq;
			dataSet.SEARCH_DATA_SEQ = dataSeq;
			
			var url = gvSERVER + gvCONTEXT + "/visualizepopup/main2";		
			var param = "";
		
			param = "?";
			param += "contSeq=" + contSeq;
			param += "&";
			param += "dataSeq=" + dataSeq;
			
			event.preventDefault();
			window.open(url+param, "popupWindow", "width=1600,height=900,scrollbars=yes");
		}					
	});
	
	
	//	기초분석
	$('#btnAnalysis').on('click',function(e){
		
		var per_code = $.session.get('PER_CODE');		 /*  ID */
        var contSeq = $("#txtCONT_SEQ").val();
        var dataSeq = $("#txtDATA_SEQ").val();
        
        if (contSeq == "" || dataSeq == "") {
        	showAlert(null,'연구항목 검색 및 데이터 저장 후 시도해 주세요.',null);
            return;
            
        } else {
        	var url = gvCONTEXT+"/basicAnalysis/main?&contSeq=" + contSeq + "&dataSeq=" + dataSeq;
            var openParam = "scrollbars=yes,toolbar=0,location=no,resizable=0,status=0,menubar=0,width=1580,height=700,left=0,top=0";

            var dialogParam = "dialogWidth:1200px;dialogHeight:600px;center:yes;";
            window.showModalDialog(url, null, dialogParam);
        }

		
	});
	
}






/**
 * 조회조건에서 테이블만
 * @returns
 */
function getSearchTableData()
{
	var dsItemTableList 	= [];

	var table = $('#gridSearch_' + gvActiveTab).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		dsItemTableList.push(data.SCHEMA + "." + data.TABLE);
		
	});
	
	return dsItemTableList;
}




/**
 * 조회조건 데이터
 * @returns
 */
function getSearchConditionData()
{
	var dataSet 	= {};
	var dsItemTableList 	= [];
	var dsItemColumnList 	= [];
	var table = $('#gridSearch_' + gvActiveTab).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var dsItemColum = {};
		
		var data = this.data();
		var node = this.node();
		
		dsItemColum.SCHEMA 		= data.SCHEMA;
		dsItemColum.TABLE 		= data.TABLE;
		dsItemColum.COLUMN 		= data.COLUMN;
		dsItemColum.COLUMN_COMMENT	= data.COLUMN_COMMENT;
		dsItemColum.ITEM_TYPE 	= data.ITEM_TYPE;
		dsItemColum.POPUP_YN	= data.POPUP_YN;
		dsItemColum.BASE_DT_COLUMN = data.BASE_DT_COLUMN;
		
		dsItemColum.ITEM_SEQ = data.SEQ;
		dsItemColum.CONT_SEQ = nvl(data.CONT_SEQ,'');
		dsItemColum.PER_CODE = $.session.get('PER_CODE');
		dsItemColum.ORDER = rowIdx + 1;
		dsItemColum.TAB_CD = 'C';
		
		$(node).find("td select,input").each(function (){
			var cellData = this.value;
			
			if( this.name.indexOf('txtGRP') >= 0){
				dsItemColum.GR_LV = cellData;
			}
			
			if( this.name.indexOf('selCODE') >= 0 || 
				this.name.indexOf('selNUM_LIST') >= 0 || 
				this.name.indexOf('selTEX_LIST') >= 0 )
			{
				dsItemColum.INPUT_VAL0 = cellData;
			}
			
			if( this.name.indexOf('txtNUM1') >= 0 || 
				this.name.indexOf('txtTEX1') >= 0 || 
				this.name.indexOf('calFROM_DT') >= 0 || 
				this.name.indexOf('POPUP_VAL') >= 0)
			{
				dsItemColum.INPUT_VAL1 = nvl(cellData,' ');
			}
			
			if( this.name.indexOf('txtTEX2') >= 0 ||  
				this.name.indexOf('txtNUM2') >= 0 || 
				this.name.indexOf('calTO_DT') >= 0)
			{
				dsItemColum.INPUT_VAL2 = cellData;
			}
			
			
			if(this.name.indexOf('INCEXC') >= 0){
				dsItemColum.INC_EXC = cellData;
			}
			
			if(this.name.indexOf('ANDOR_YN') >= 0){
				dsItemColum.AND_OR = cellData;
			}
			
			if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
				dsItemColum.BASE_DT_YN = this.value;
				
			}
			
			if(this.name.indexOf('FIRST_YN') >= 0){
				dsItemColum.FIRST_YN = this.value;
				
			}
			
		});
		
		dsItemColum.CNT = '0';
		dsItemColum.AGG = 'first';
		dsItemColum.RANGE_CD = '';
		dsItemColum.RANGE_DN = '';
		dsItemColum.DELETE_YN = 'N';
		
		dsItemTableList.push(data.SCHEMA + "." + data.TABLE);
		dsItemColumnList.push(dsItemColum);
	});
	
	dataSet.dsItemTableList = dsItemTableList;
	dataSet.dsItemColumnList = dsItemColumnList;
	
	return dsItemColumnList;
	
	
}
















function getElementId(tableId){
	var element = '';
	
	if(tableId.indexOf('gridSearch') >= 0){
		element = 'txtGRP_C';
		
	}else if(tableId.indexOf('gridStudyItem') >= 0){
		element = 'txtGRP_R';
		
	}else if(tableId.indexOf('gridEventList') >= 0){
		element = 'txtGRP_RE';
		
	}else if(tableId.indexOf('gridCensoredDataList') >= 0){
		element = 'txtGRP_RQ';
		
	}else if(tableId.indexOf('gridCaseGroup') >= 0){
		element = 'txtGRP_CA';
		
	}else if(tableId.indexOf('gridControlGroup') >= 0){
		element = 'txtGRP_CO';
		
	}
	
	return element;
	
}


function getTabCd(tableId){
	var tabCd = 0;
	
	if(tableId.indexOf('gridSearch') >= 0){
		tabCd = 0;
		
	}else if(tableId.indexOf('gridStudyItem') >= 0){
		tabCd = 1;
		
	}else if(tableId.indexOf('gridEventList') >= 0){
		tabCd = 2;
		
	}else if(tableId.indexOf('gridCensoredDataList') >= 0){
		tabCd = 3;
		
	}else if(tableId.indexOf('gridCaseGroup') >= 0){
		tabCd = 4;
		
	}else if(tableId.indexOf('gridControlGroup') >= 0){
		tabCd = 5;
		
	}
	
	return tabCd;
	
}


function getGrpIconStyle(rowIdx, tabCd){
	var html = '';
	
	return html;
}





/**
 * 기준일자 체크
 * @returns
 */
function isBaseDtCheck()
{
	var ret = false;
	var cnt = 0;	
	var table = $('#gridSearch_' + gvActiveTab).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		$(node).find("td input").each(function (){
			if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
				if($(this).is(':checked')){
					cnt++;
				}
			}	
		});
		
	});
	
	if(cnt > 0){
		ret = true;
	}
	
	
	return ret;
	
}


/**
 * 기준일자 카운트
 * @returns
 */
function getBaseDtCheckCount()
{
	var cnt = 0;
	
	var table = $('#gridSearch_' + gvActiveTab).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		$(node).find("td input").each(function (){
			if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
				if($(this).is(':checked')){
					cnt++;
				}
			}	
		});
		
	});
	
	return cnt;
	
}




/**
 * 그리드의 영역 리턴
 */
$.fn.getGridRactangle = function()
{
	var targetX = $(this).offset().left;
	var targetY = $(this).offset().top;
	var width 	= $(this).width();
	var height 	= $(this).height();
	
	var dataSet = {
			
	};
	
	
	
	dataSet.x = targetX;
	dataSet.y = targetY;
	dataSet.w = width;
	dataSet.h = height;
	
	return dataSet;
}




function changeAgg(element,row)
{
	var $element = $(element);
	var $elementPeriodWrap = $('#divPeriodWrap_' + row);
	
	if($element.val() === 'PER'){
		$elementPeriodWrap.css('display','inline-block');
		
	}else{
		$elementPeriodWrap.css('display','none');
		
	}
	
}


/*function isValidDate()*/
$.fn.validDate = function()
{
	var tableId = this.selector; 
	var table 	= $(this).DataTable();
	var datePattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
	var isValid = true;
	
	var dsTabCd = {};
	
	if(tableId.indexOf("gridSearch") >= 0){
		dsTabCd = gvTabCd.C;
	}
	if(tableId.indexOf("gridPeriod") >= 0){
		dsTabCd = gvTabCd.P;
	}
	if(tableId.indexOf("gridStudyItem") >= 0){
		dsTabCd = gvTabCd.R;
	}
	if(tableId.indexOf("gridEvent") >= 0){
		dsTabCd = gvTabCd.RE;
	}
	if(tableId.indexOf("gridCensoredData") >= 0){
		dsTabCd = gvTabCd.RQ;
	}
	if(tableId.indexOf("gridCase") >= 0){
		dsTabCd = gvTabCd.CA;
	}
	if(tableId.indexOf("gridControl") >= 0){
		dsTabCd = gvTabCd.CO;
	}
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		if(data.ITEM_TYPE === 'DAT'){
			$(node).find("td input").each(function (){
				var cellData = this.value;
				
				if(this.name.indexOf('calFROM_DT') >= 0){
					if(!datePattern.test(cellData)){
						$('#txtFromDt_' + dsTabCd.CODE + '_' + rowIdx).select();
						$('#txtFromDt_' + dsTabCd.CODE + '_' + rowIdx).focus();
						isValid = false;
					}
				}
				
				if( this.name.indexOf('calTO_DT') >= 0){
					if(!datePattern.test(cellData)){
						$('#txtToDt_' + dsTabCd.CODE + '_' + rowIdx).select();
						$('#txtToDt_' + dsTabCd.CODE + '_' + rowIdx).focus();
						
						isValid = false;
					}
				}
				
				
				if(this.name.indexOf('calPeriodFrom') >= 0){
					if(!datePattern.test(cellData)){
						$('#txtPeriodFrom_' + gvActiveTab + '_' + rowIdx).select();
						$('#txtPeriodFrom_' + gvActiveTab + '_' + rowIdx).focus();
						isValid = false;
					}
				}
				
				if(this.name.indexOf('calPeriodTo') >= 0){
					if(!datePattern.test(cellData)){
						$('#txtPeriodTo_' + gvActiveTab + '_' + rowIdx).select();
						$('#txtPeriodTo_' + gvActiveTab + '_' + rowIdx).focus();
						
						isValid = false;
					}
				}
			});
		}
	});
	
	return isValid;
};


function regexp_filter(str_value){
	return str_value.replace(/[^imnx]/gi, ""); 
}


function number_filter(str_value){
	return str_value.replace(/[^0-9.]/gi, ""); 
}

//코호트 > 연구항목 > 주기 선택 필터
function number_period_filter(str_value, this_dom){
	var rst = number_filter(str_value);
	var selVal = $(this_dom).prevAll('.selAGG_CD').val();
	var limitDay = 0;
	
	if(selVal == "Y"){			//년 선택 일때
		limitDay = 185;
	}else if(selVal == "Q"){	//주기 선택 일때
		limitDay = 45;
	}else{						//월 선택 일때
		limitDay = 15;
	}
	
	if(rst > limitDay){
		showAlert('연구항목','날짜는 최대 '+limitDay+'일까지 입력 가능합니다.',null);
		rst = '';
	}
	
	return rst;
}


function updateGroupIdx(){
	$('#grpIdx').val(gvGrpIdx);
	$('#grpStudyItemIdx').val(gvGrpStudyItemIdx);
	$('#grpEventIdx').val(gvGrpEventIdx);
	$('#grpCensoredDataIdx').val(gvGrpCensoredIdx);
	$('#grpCaseIdx').val(gvGrpCaseIdx);
	$('#grpControlIdx').val(gvGrpControlIdx);
}



function setGroupIdxUpper(tabCd)
{
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	var table;
	var tableId;
	var grpIdx = -1;
	
	if(dsTabCd.CODE == 'R' || dsTabCd.CODE == 'RE' || dsTabCd.CODE == 'RQ'){
		table = $('#' + dsTabCd.TABLE_ID).DataTable();
		tableId = '#' + dsTabCd.TABLE_ID;
		
	}else{
		table = $('#' + dsTabCd.TABLE_ID + '_' + gvActiveTab).DataTable();
		tableId = '#' + dsTabCd.TABLE_ID + '_' + gvActiveTab;	
	}
	

	if(isNull($('#' + dsTabCd.GR_LV_IDX_ELEM).val()) || $('#' + dsTabCd.GR_LV_IDX_ELEM).val() === '0'){
		eval(dsTabCd.GR_LV_IDX + '=' + '0');
	}else{
		eval(dsTabCd.GR_LV_IDX + '=' + Number($('#' + dsTabCd.GR_LV_IDX_ELEM).val()));
	}
	
	
	
	
//	그룹설정	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		if(data.GR_LV === '000'){
			$(node).find("td select,input").each(function (){
				if(this.name.indexOf(dsTabCd.GR_LV_ID)){
					var firstRow = $(tableId).getMinGrpIdx(eval(dsTabCd.GR_LV_IDX));
					
					data.GR_LV = eval(dsTabCd.GR_LV_IDX);
					$('#txtGRP_' + dsTabCd.CODE + '_' + rowIdx).val(eval(dsTabCd.GR_LV_IDX));
					$('#txtANDOR_' + dsTabCd.CODE + '_' + firstRow).css('border','3px dotted #74DF00');
				}
			});
		}
	});
	
	
//	연구항목	
	if(tabCd === 'R'){
		table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var data = this.data();
			var node = this.node();
			var cell4 = node.cells[4];
			var cell5 = node.cells[5];
			
			var html = '';
			
			var meta = {
				row:rowIdx	
			};
			
			if(data.GR_LV === eval(dsTabCd.GR_LV_IDX)){
				var firstRow = $(tableId).getMinGrpIdx(eval(dsTabCd.GR_LV_IDX));
				
			//	연구항목 오류 수정(2017-09-10)	
				if(rowIdx == firstRow || $('#txtGRP_R_' + rowIdx).val() === '0'){
					return;
					
				}
				
				if(data.POPUP_YN === 'Y'){
					html = templetePopup(null, null, data, meta, dsTabCd.CODE);
					
				}else{
					if(data.ITEM_TYPE === 'DAT'){
						html = templeteDate( null, null, data, meta, dsTabCd.CODE);
						
					}else if(data.ITEM_TYPE === 'TEX'){
						html = templeteText( null, null, data, meta, dsTabCd.CODE);
						
					}else if(data.ITEM_TYPE === 'NUM'){
						html = templeteNumber( null, null, data, meta, dsTabCd.CODE);
						
						
					}else if(data.ITEM_TYPE === 'COD'){
						html = templeteCode( null, null, data, meta, dsTabCd.CODE);
						
					}
				}
				$(cell4).html(html);	//조건
				$(cell5).html('');		//범위
				
			}
			
		});	
	}
	
	updateGroupIdx()
	
}



function isDiffInstcd(instcd)
{
	var retVal = false;
	
	if(gvINSTCD_YN === 'Y'){
		if($.session.get('INSTCD') == instcd){
			retVal = true;
			
		}else{
			retVal = false;
			
		}	
	}else{
		retVal = true;
	}
	
	
	
	return retVal;
	
}





$(document).on('click','.btnRegexpHelp',function(){
	var msg = '';
	
	
	msg = '<div style="font-size:14pt;text-align:left;height:200px;overflow-y:scroll;">';
		msg += '<ul>';
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


$(document).on('click','.input_text',function(){
	$(this).select();
});

$(document).on('click','.input_num',function(){
	$(this).select();
});

$(document).on('focus','.maskDateInput',function(){
	$(this).mask('0000-00-00');
	$(this).select();
});


function timerIncrement() {
    idleTime = idleTime + 1;
    print_bigcenmed(idleTime);
    if (idleTime > 19) { // 20 minutes
    	/*showAlert('로그인','로그인',function(e){
    		
    	});*/
        //window.location.reload();
    }
}



/**
 * 전체대상 환자조회
 * @param idx
 * @param targetId
 * @returns
 */
function getCount(idx, targetId)
{
	if(gvINSTCD_YN === 'Y'){
		getCountAll(idx, targetId);
		
	}else{
		getCountGroup(idx, targetId);
		
	}
	
}


/**
 * 전체대상 환자조회
 * @param idx
 * @param targetId
 * @returns
 */
function getCountAll(idx, targetId)
{
	if(!isNullOrEmpty(targetId)){
		gvTargetId = targetId;
		
	}

	var dsList1 = [];
	var dsList2 = [];
	var dsList3 = [];
	var dataSet = {};
	
	dataSet.GBN_MODEL 	= gvMethCd;
	dataSet.GBN_TAB 	= '01';
	
	dsList1 = $('#gridSearch_' + gvActiveTab).getData();
	
	var grpVal = $('#txtGRP_C_' + idx).val();
	
//	그룹목록 추출
	for(var i=0; i < dsList1.length && i <= idx; i++){
		var dsMap = dsList1[i];
		dsList2.push(dsMap);
		
	}
	
	
	for(var i=0; i < dsList2.length; i++){
		var dsMap = dsList2[i];
		dsList3.push(dsMap);
		
	}
	
	dataSet.dsItemColumnList 	= dsList3;		//조회조건
	dataSet.dsPeriodList 		= [];			//반복관리
	dataSet.dsStudyItem			= [];			//연구항목
	
	gvTargetIdx = idx;
	
	var requestUrl = '';
	
	if(gvMethCd === 'CS'){
		requestUrl = 'research/crossSectionalStudy/searchPatient';
		
	}else if(gvMethCd === 'CH'){
		requestUrl = 'research/cohort/searchPatient';
		
	}else if(gvMethCd === 'CC'){
		dataSet.dsCaseGroupList		= [];			//사례군
		dataSet.dsControlGroupList  = [];			//대조군
		
		requestUrl = 'research/casctrl/searchPatient';
	}
	
	callService("getCount"
			,requestUrl
			,dataSet
			,"serviceCallback_research_common");
}


/**
 * 그룹별 환자조회 Count 함수
 * @param idx
 * @param targetId
 * @returns
 */
function getCountGroup(idx, targetId)
{
	if(!isNullOrEmpty(targetId)){
		gvTargetId = targetId;
		
	}

	var dsList1 = [];
	var dsList2 = [];
	var dsList3 = [];
	var dataSet = {};
	
	dataSet.GBN_MODEL 	= gvMethCd;
	dataSet.GBN_TAB 	= '01';
	
	dsList1 = $('#gridSearch_' + gvActiveTab).getData();
	
	var grpVal = $('#txtGRP_C_' + idx).val();
	
//	그룹목록 추출
	for(var i=0; i < dsList1.length && i <= idx; i++){
		var dsMap = dsList1[i];
		
		if(gvMethCd === 'CH'){
			if(i < 2){
				dsList2.push(dsMap);
			}
			
			
			if(grpVal == dsMap.GR_LV){
				dsList2.push(dsMap);
			}
			
		}else{
			if(grpVal == dsMap.GR_LV){
				dsList2.push(dsMap);
			}	
		}
	}
	
	
	
	for(var i=0; i < dsList2.length; i++){
		var dsMap = dsList2[i];
		dsList3.push(dsMap);
		
	}
	
	dataSet.dsItemColumnList 	= dsList3;		//조회조건
	dataSet.dsPeriodList 		= [];			//반복관리
	dataSet.dsStudyItem			= [];			//연구항목
	
	gvTargetIdx = idx;
	
	var requestUrl = '';
	
	if(gvMethCd === 'CS'){
		requestUrl = 'research/crossSectionalStudy/searchPatient';
		
	}else if(gvMethCd === 'CH'){
		requestUrl = 'research/cohort/searchPatient';
		
	}else if(gvMethCd === 'CC'){
		dataSet.dsCaseGroupList		= [];			//사례군
		dataSet.dsControlGroupList  = [];			//대조군
		
		requestUrl = 'research/casctrl/searchPatient';
	}
	
	callService("getCount"
			,requestUrl
			,dataSet
			,"serviceCallback_research_common");
}




function getCountCaseControl(tableId, idx, targetId)
{	
	if(!isNullOrEmpty(targetId)){
		gvTargetId = targetId;
		
	}
	
	
	var table = $('#' + tableId).DataTable();
	var requestUrl = 'research/casctrl/searchPatient';
	
	param = "'" + tableId.replace('#','') + "'";
	
	if(tableId.indexOf('gridCaseGroup') >= 0){
		gvTargetId = 'CA';	
		
		
	}else if(tableId.indexOf('gridControlGroup') >= 0){
		gvTargetId = 'CO';
		
	}
	
	
	var dataSet = {};
	//var dsList1 = [];	//조회조건
	
	var dsCaseGroupList1 = [];	//사례군
	var dsCaseGroupList2 = [];
	var dsCaseGroupList3 = [];
	
	var dsControlGroupList1 = [];	//대조군
	var dsControlGroupList2 = [];
	var dsControlGroupList3 = [];
	
	
	var grpVal 	= '0';
	
	grpVal = $('#txtGRP_' + gvTargetId + "_" + idx).val();
		
	dsCaseGroupList1 	= $('#gridCaseGroup_01').getGridCaseControl();
	dsControlGroupList1 = $('#gridControlGroup_01').getGridCaseControl();
	
//	그룹목록 추출
	if(!isNullOrEmpty(targetId)){								//대조군관리 사례군숫자 조회
		dsCaseGroupList3 = dsCaseGroupList1;
		
	}else{														//테이블에서 대상조회(그룹별 목록 추출)
		for(var i=0; i < dsCaseGroupList1.length && i <= idx; i++){
			var dsMap = dsCaseGroupList1[i];
			
			if(grpVal == dsMap.GR_LV){
				dsCaseGroupList2.push(dsMap);
			}
		}
		
		for(var i=0; i < dsCaseGroupList2.length; i++){
			var dsMap = dsCaseGroupList2[i];
			dsCaseGroupList3.push(dsMap);
			
		}
	}
	
//	dataset 설정
	dsCcMgmtInfo = $('#frmCcMgmt').formToJson();
	
	dataSet.GBN_MODEL 	= gvMethCd;
	dataSet.GBN_TAB 	= '01';
	dataSet.CC_POP_NUM 	= nvl(dsCcMgmtInfo.CC_POP_NUM,'');			//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = nvl(dsCcMgmtInfo.CC_CASE_NUM,'');			//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= nvl(dsCcMgmtInfo.CC_SAM_NUM,'');			//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= nvl(dsCcMgmtInfo.CC_CONT_CD,'');			//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= nvl(dsCcMgmtInfo.CC_MAT_CD,'');			//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.CC_AGE_NUM  = nvl(dsCcMgmtInfo.CC_AGE_NUM,'');			//나이편차
	
	dataSet.dsItemColumnList 	= $('#gridSearch_' + gvActiveTab).getData();		//
	dataSet.dsPeriodList 		= [];				//반복관리 목록
	dataSet.dsStudyItem			= [];				//연구항목

//	사례군 설정	
	if(tableId.indexOf('gridCaseGroup') >= 0){
		dataSet.dsCaseGroupList		= dsCaseGroupList3;		
		dataSet.dsControlGroupList  = [];	
		
		dataSet.CONTROL_GROUP_CNT = 'N';
		
//	대조군		
	}else{
		for(var i=0; i < dsControlGroupList1.length && i <= idx; i++){
			var dsMap = dsControlGroupList1[i];
			
			if(grpVal == dsMap.GR_LV){
				dsControlGroupList2.push(dsMap);
			}
		}
		
		for(var i=0; i < dsControlGroupList2.length; i++){
			var dsMap = dsControlGroupList2[i];
			dsControlGroupList3.push(dsMap);
			
		}
		
		dataSet.dsCaseGroupList		= dsCaseGroupList3;			
		dataSet.dsControlGroupList  = dsControlGroupList3;
		
		dataSet.CONTROL_GROUP_CNT = 'Y';
	}
	
	
	if(tableId.indexOf('gridCaseGroup') >= 0){
		if(targetId === 'CC_CASE_NUM'){
			gvTargetId = 'CC_CASE_NUM';
		}else{
			gvTargetId = 'CA';	
		}
			
		
		
	}
	
	
	gvTargetIdx = idx;
	
	callService("getCountCaseControl"
				,requestUrl
				,dataSet
				,"serviceCallback_research_common");
	
}



/**
 * 조회조건명 중복체크 메소드
 * 각 연구별 화면에서 호출
 * @returns
 */
function chkDuplCondNmList(condNm){
	var dataSet = {};
	var dsItemContDetlList = [];
	var dsPeriodList = [];
	
	dataSet.CONDT_NM 	= condNm;
	dataSet.PER_CODE 	= $.session.get('PER_CODE');
	
	callServiceSync("chkDuplCondNmList"
					,"research/sharingconditions/chkDuplCondNmList"
					,dataSet,"serviceCallback_research_common");
	
	
}

/** 조회 조건 명 # 입력 금지*/
function OnlyInput(event){
	if(event.key == "#"){
		event.preventDefault();
	}
}


