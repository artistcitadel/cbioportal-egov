/**
 * 연구항목관리
 * @Page : researchItem.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;


var gvResearchItemList 	= [];

var gvSchemaList 		= [];		//스키마목록
var gvTableList 		= [];		//테이블목록

var gvItemCateList  	= [];		//대분류
var gvItemCateDetlList 	= [];		//중분류목록
var gvColumnList 		= [];
var gvItemMgmtList  	= [];
var gvColumnDateList 	= [];		//컬럼목록(Date 타입만)

var gvDataSourceItemMgmt;
var gvDataAdapterItemMgmt;


var gvItemMgmtTableList = [];
var gvItemMgmtColumnList = [];

var gvPageScrollXPos = 0;
var gvPageScrollYPos = 0;
var gvItemMgmtSeq = 0;


var gvItemTypeCdList = [];
var gvPopupProgramList = [];

var gvCommonCode = [
	{'SEARCH_COMM_GRP_ID':'CDW_ITEM_TYPE_CD','DATA_SET':'gvItemTypeCdList'},
	{'SEARCH_COMM_GRP_ID':'CDW_POPUP_LIST_CD','DATA_SET':'gvPopupProgramList'}
	
];



/**
 * Application Ready
 */
$(document).ready(function(){

//	iCheck css Set	
	makeiCheck('.importantChk, .manyChk, .searchChk, .codeChk, .popupChk, .importantUpChk, .manyUpChk, .analogueUpChk, .itemFirstYnChk');
	makeiCheck('.chkSearchAll, .chkSearchYn, .chkGmecYn, .chkHccYn, .chkSynonymYn, .rdoInstCdYn');
	
	getItemCateList();
	
	getSchemaList();
	
	getTableList();
	
	
	getItemMgmtTableList();
	
	getCommonCodeList();
	
	init();
	
	setGrid();
	
	initEvent();
	
	//메뉴고정
	menuFix('admin_researchItem_researchItemMain');
	
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
		case "getItemCateList":
			gvItemCateList = result.dsItemCateList;
			
			if(typeof gvItemCateList === 'undefined'){
				return;
			}
			
			break;
			
		case "getItemCateDetlList":
			gvItemCateDetlList = result.dsItemCateDetlList;
			
			if(typeof gvItemCateDetlList === 'undefined'){
				return;
			}
			
			setComboList('selItemCateDetlList', gvItemCateDetlList ,'SEQ', 'CATE_NM','','전체');
			
			break;
			
		case "getItemCateDetlAddList":
			if(typeof result.dsItemCateDetlList === 'undefined'){
				return;
			}
			
			setComboList('selItemCateDetl', result.dsItemCateDetlList ,'SEQ', 'CATE_NM','','선택');
			break;
	
		case "getSchemaList":
			gvSchemaList = result.dsSchemaList;
			
			break;
			
		case "getTableList":
			gvTableList = result.dsTableList;
			
			break;
			
		case "getColumnList":
			gvColumnList = result.dsColumnList;
			
			setComboList('selColumnList', gvColumnList, 'COLUMN', 'COLUMN','','선택');
			
			break;
			
			
		case "insertItemMgmt":
			showAlert('연구항목저장',COM_0001,function(e){
				$('#btnItemMgmtClose').trigger('click');
				getItemMgmtList();
				
			});
			break;
			
		case "getItemMgmtList":
			gvDataSourceItemMgmt.localdata = result.dsItemMgmtList;
			
			$("#jqxResearchItemList").jqxGrid('clear');			
			$("#jqxResearchItemList").jqxGrid('updatebounddata', 'cells');
			
			if( gvItemMgmtSeq > 0){
				if(gvPageScrollYPos != 0){
					$("#jqxResearchItemList").jqxGrid('scrolloffset',gvPageScrollYPos,gvPageScrollXPos);
				}
				
				$("#jqxResearchItemList").jqxGrid('selectrow', gvItemMgmtSeq);
				
			}else{
				$("#jqxResearchItemList").jqxGrid('selectrow', 0);
			}
			
			break;
			
			
		case "selectItemMgmtView":
			
			
			var data = result.dsItemMgmtView;
			console.log(data);
			
			changeChkCODE_TYPE(data.CODE_TYPE);
			//	데이터타입에 따른 엘리먼트 활성화	
			changeSelITEM_TYPE(data.ITEM_TYPE);

			
		//	연구항목컬럼상세
			$('#txtSCHEMA').val(data.SCHEMA);
			$('#txtTABLE').val(data.TABLE);
			$('#txtITEM_NM').val(data.ITEM_NM);
			$('#txtColumn_NM').val(data.COLUMN_COMMENT);
			$('#txtITEM_DESC').val(data.ITEM_DESC);	
			
			$('#txtORDER').val(data.ORDER);
			$('#chkSEARCH_YN').iCheck(iif(data.SEARCH_YN == 'Y','check','uncheck'));
			$('#chkPOPUP_YN').iCheck(iif(data.POPUP_YN == 'Y','check','uncheck'));
			$('#selITEM_TYPE').val(data.ITEM_TYPE);
			changeChkPOPUP_TYPE(data.ITEM_TYPE);
			
			$('#selPOPUP_PROGRAM_ID').val(data.POPUP_PROGRAM_ID);
			if(data.ITEM_TYPE == 'COD'){
				changeSelPopupPROGRAM_TYPE(data.POPUP_PROGRAM_ID);
			}
			
			$('#chkGMEC_YN').iCheck(iif(data.GMEC_YN == 'Y','check','uncheck'));
			$('#chkHCC_YN').iCheck(iif(data.HCC_YN == 'Y','check','uncheck'));
			$('#chkSYNONYM_YN').iCheck(iif(data.SYNONYM_YN == 'Y','check','uncheck'));
			$('#chkITEM_FIRST_YN').iCheck(iif(data.ITEM_FIRST_YN == 'Y','check','uncheck'));
			$('#rdoCODE_TYPE_SQL').iCheck(iif(data.CODE_TYPE == 'SQL','check','uncheck'));
			$('#rdoCODE_TYPE_JSN').iCheck(iif(data.CODE_TYPE == 'JSN','check','uncheck'));
			$('#rdoCODE_TYPE_NON').iCheck(iif(data.CODE_TYPE == 'NON','check','uncheck'));
			
			$('#selUPPER_TABLE').val(data.UPPER_TABLE);
			
			getItemMgmtColumnList();
			
			$('#selUPPER_COLUMN').val(data.UPPER_COLUMN);
			$('#selBASE_DT_COLUMN').val(data.BASE_DT_COLUMN);	
			
			$('#txtCODE_SET').val(data.CODE_SET);
			if(data.POPUP_COLUMN == undefined){
				$('#txtPOPUP_COLUMN').val('');
			}else{
				$('#txtPOPUP_COLUMN').val(data.POPUP_COLUMN);
			}
			
			if(isNull(data.INSTCD_YN) || data.INSTCD_YN === 'N'){
				$('#INSTCD_YN_Y').iCheck('uncheck');
				$('#INSTCD_YN_N').iCheck('check');
			}else{
				$('#INSTCD_YN_Y').iCheck('check');
				$('#INSTCD_YN_N').iCheck('uncheck');
			}
			
			$('#txtSEQ').val(data.SEQ);	//hidden value
			
			
		/*	
		//	조회여부
			if(data.SEARCH_YN === 'N' || isNull(data.SEARCH_YN)){
				$('.importantUpChk').iCheck('disable');
				$('.manyUpChk').iCheck('disable');
				$('.analogueUpChk').iCheck('disable');
				
			}
			
		//	코드타입 초기화
			if(data.CODE_TYPE != 'SQL'){
				$('.popupChk').iCheck('disable');
				$('#selPOPUP_PROGRAM_ID').prop('disabled', true);
			}
			
		//	기준일자 여부에 따른 최초 여부 활성/비활성
			if(isNull(data.BASE_DT_COLUMN)){
				$('.itemFirstYnChk').iCheck('disable');
			}
		*/	
			break;
			
		case "updateItemMgmt":
			showAlert('연구항목저장',COM_0002,function(e){
				$('#btnCloseItemMgmt').trigger('click');
				getItemMgmtList();
				
			});
			break;
			
		case "deleteItemMgmt":
			showAlert('연구항목저장',COM_0003,function(e){
				$('#btnCloseItemMgmt').trigger('click');
				getItemMgmtList();
				
			});
			break;
			
		case "updateItemCateDetl":
			break;
			
		case "getColumnDateList":
			var dsDateList = [];
			
			gvColumnDateList = result.dsColumnDateList;
			
			for(var i=0; i < gvColumnDateList.length; i++){
				var dsDate = gvColumnDateList[i];
				
			//	Timestamp사용여부	
				if(gvBASE_DT_TIMESTAMP_YN === 'Y'){
					dsDateList.push(dsDate);
					
				}else{
					if(dsDate.DATA_TYPE === 'date'){
						dsDateList.push(dsDate);
					}
				}
			}
			
			setComboList('selBASE_DT_COLUMN', dsDateList, 'COLUMN', 'COLUMN','0000','선택');
			
			break;
			
			
		case "updateItemMgmtOrder":
			getItemMgmtList();
			break;
			
			
		case "getItemMgmtTableList":
			gvItemMgmtTableList = result.dsItemMgmtTableList;
			break;
			
		case "getItemMgmtColumnList":
			gvItemMgmtColumnList = result.dsItemMgmtColumnList;
			setComboList('selUPPER_COLUMN',gvItemMgmtColumnList,'VALUE','VALUE','','선택');
			
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
					,"serviceCallback");
		
	}
	
}

function getItemCateList()
{
	var dataSet = {};
	
	callServiceSync("getItemCateList", 
				"admin/researchItem/selectItemCateList", 
				dataSet, 
				"serviceCallback");
}


function getItemCateDetlList()
{

	var dataSet = {};
	
	dataSet.SEARCH_ITEM_CATE_SEQ = $('#selItemCateList').val();
	
	
	callServiceSync("getItemCateDetlList", 
				"admin/researchItem/selectItemCateDetlList", 
				dataSet, 
				"serviceCallback");
	
}


function getItemCateDetlAddList()
{

	var dataSet = {};
	
	dataSet.SEARCH_ITEM_CATE_SEQ = $('#selItemCate').val();
	
	callServiceSync("getItemCateDetlAddList", 
				"admin/researchItem/selectItemCateDetlList", 
				dataSet, 
				"serviceCallback");
	
}

function getSchemaList()
{
	var dataSet = {};
	
	callServiceSync("getSchemaList"
					,"admin/researchItem/selectCatalogSchemaList"
					,dataSet
					,"serviceCallback");
}


/**
 * 
 * @returns
 */
function getTableList()
{
	var dataSet = {
			
	};
	
	callServiceSync("getTableList"
					,"admin/researchItem/selectCatalogTableList"
					,dataSet
					,"serviceCallback");
}





function getItemMgmtTableList(){
	var dataSet = {};
	callServiceSync("getItemMgmtTableList"
					,"admin/researchItem/selectItemMgmtTableList"
					,dataSet
					,"serviceCallback");
}


function getItemMgmtColumnList(){
	var dataSet = {};
	
	dataSet.SEARCH_TABLE = $('#selUPPER_TABLE').val();
	
	callServiceSync("getItemMgmtColumnList"
					,"admin/researchItem/selectItemMgmtColumnList"
					,dataSet
					,"serviceCallback");
}


/**
 * 연구항목조회
 * @returns
 */
function getItemMgmtList()
{
	
	var tmpCheckYn = '';
	
	var sqlWhere = '';
	
	if(!$('#chkSEARCH_ALL_YN').prop('checked')){
		$('input[name=chkSEARCH_GBN_YN]:checkbox').each(function(idx){
			if($(this).prop('checked')){
				if(isNullOrEmpty(sqlWhere)){
					sqlWhere = ' AND ';
					sqlWhere += ' (';
					sqlWhere += $(this).val() + " = 'Y' ";
					
				}else{
					sqlWhere += ' OR ';
					sqlWhere += $(this).val() + " = 'Y' ";
				}
			}
			
		});
		
		if(!isNullOrEmpty(sqlWhere)){
			sqlWhere += ')';
		}
	}
	
	
	
	var dataSet = {
		SEARCH_ITEM_CATE_SEQ:$('#selItemCateList').val(),
		SEARCH_ITEM_CATE_DETL_SEQ:$('#selItemCateDetlList').val(),
		SEARCH_YN:sqlWhere
	};	
	
	
	callService("getItemMgmtList"
				,"admin/researchItem/selectItemMgmtList"
				,dataSet
				,"serviceCallback");
}

/**
 * 
 * @returns
 */
function getColumnList()
{
	var dataSet = {
			SEARCH_SCHEMA:$('#selAddSchemaList').val(),
			SEARCH_TABLE:$('#selAddTableList').val()
			
	};
	
	callService("getColumnList"
				,"admin/researchItem/selectCatalogColumnList"
				,dataSet
				,"serviceCallback");
}



/**
 * 
 * @returns
 */
function getItemMgmtView()
{
	var dataSet = {
		
			
	};	
	callService("getItemMgmtList"
				,"admin/researchItem/selectItemMgmtList"
				,dataSet
				,"serviceCallback");
}


/**
 * 연구항목수정
 * @returns
 */
function updateItemMgmt()
{
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init()
{
	setComboList('selItemCate', gvItemCateList, 'SEQ', 'CATE_NM','','선택');
	setComboList('selItemCateDetl', gvItemCateDetlList, 'SEQ', 'CATE_NM','','선택');
	setComboList('selItemCateList', gvItemCateList, 'SEQ', 'CATE_NM','','전체');
	setComboList('selItemCateDetlList', gvItemCateDetlList, 'SEQ', 'CATE_NM','','전체');
	setComboList('selITEM_TYPE'			,gvItemTypeCdList	,'VALUE'	,'TEXT'		,'','선택');	//항목선택
	setComboList('selPOPUP_PROGRAM_ID'	,gvPopupProgramList,'VALUE'	,'TEXT'		,'','선택');	//항목선택
	setComboList('selUPPER_TABLE'		,gvItemMgmtTableList	,'VALUE'	,'VALUE'		,'','선택');	//
	setComboList('selUPPER_COLUMN'		,gvItemMgmtColumnList	,'VALUE'	,'VALUE'		,'','선택');	//항목선택
	
	$('#txtORDER').inputmask({
		mask:'99999',
		placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false
	});   
	
	
	var value = $('#selSchemaList').val();
	
	var expr = 'jObj.SCHEMA === "' + value + '"';
	
	optionFilter('selTableList', gvTableList, expr, 'TABLE', 'TABLE_COMMENT_ID','','전체');
	
	getItemMgmtList();
	
	$('#chkSEARCH_ALL_YN').iCheck('check');
	$('#chkSEARCH_SEARCH_YN').iCheck('check');
	$('#chkSEARCH_GMEC_YN').iCheck('check');
	$('#chkSEARCH_HCC_YN').iCheck('check');
	$('#chkSEARCH_SYNONYM_YN').iCheck('check');
	
	
	
}

function setGrid()
{	
	
//	연구항목 그리드	
	gvDataSourceItemMgmt = {
	    datatype: "json",
	    datafields : [ 
	    	{
				name : 'SEQ',
				type : 'string'
			}, 
	    	{
				name : 'SCHEMA',
				type : 'string'
			}, {
				name : 'TABLE',
				type : 'string'
			}, {
				name : 'TABLE_COMMENT',
				type : 'string'
			}, {
				name : 'COLUMN',
				type : 'string'
			}, { 
				name : 'COLUMN_COMMENT',
				type : 'string'
			}, {
				name : 'ORDER',//'ordinal_position',
				type : 'string'
			}, {
				name : 'DATA_TYPE',
				type : 'string'
			}, {
				name : 'ITEM_CATE_NM',
				type : 'string'
			}, {
				name : 'ITEM_CATE_DETL_NM',
				type : 'string'
			}, {
				name : 'ITEM_NM',
				type : 'string'
			}, {
				name : 'SEARCH_YN',
				type : 'string'
			}, {
				name : 'UDT_DT',
				type : 'date'
			} 
		],
	    cache: false,
	    localdata: gvResearchItemList,
	    updaterow: function (rowid, newdata, commit) {
	    	newdata.UDT_ID = $.session.get('PER_CODE');
	    	
	    	commit(true);
	    	
			callService("updateItemMgmtOrder" 
						,"admin/researchItem/updateItemMgmt"
						,newdata
						,"serviceCallback");
	    	
            

        },
	    processdata: function(data){
	    	//data.pagesize = 20;
	    }
	};
	
	gvDataAdapterItemMgmt = new $.jqx.dataAdapter(gvDataSourceItemMgmt, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#jqxResearchItemList").jqxGrid({
		width : '100%',
		height : 500,
		source : gvDataAdapterItemMgmt,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		showfilterrow : true,
		filterable : true,
		selectionmode : 'singlerow',
		columnsresize: true,
		theme: 'bootstrap',
		pageable: true,
		pagesize: 100,
		pagesizeoptions: ['10', '20', '30', '50', '100'], 
		columns : [
			{ 	text : '스키마', 	datafield : 'SCHEMA', 	width : '80px', 	pinned:true },
			{ 	text : '테이블', 	datafield : 'TABLE', 	width : '180px', 	pinned:true },
			{ 	text : '테이블명', 	datafield : 'TABLE_COMMENT', 	width : '180px', 	pinned:true },
			{ 	text : '컬럼', 		datafield : 'COLUMN', 	width : '120px', 	cellclassname:'gridCellLink'},
			{ 	text : '컬럼명', 	datafield : 'COLUMN_COMMENT', 	width : '180px', 	cellclassname:'gridCellLink' },
			{ 	text : '조회여부', 	datafield : 'SEARCH_YN', 	width : '50px' ,	cellsalign:'center',
				cellclassname:function(row, columnfield, value){
					if(value === 'Y'){
						return "green";
					}else{
						return "background-color:#c0c0c0;";
					}
				}
			},{ 	text : '표시순서', 	datafield : 'ORDER', 	width : '60px' ,	cellsalign:'center',
				cellsrenderer:function (row, column, value) {
					var html = '';
					
					html += '<div style="margin-top:3px;text-align:center;">';
					html += '<button class="btn btn-primary btnOrderUp btn-xs" seq="" val="" index=""><i class="ion ion-arrow-up-c"></i></button>&nbsp;';
					html += '<button class="btn btn-warning btnOrderDown btn-xs" seq="" val="" index=""><i class="ion ion-arrow-down-c"></i></button>&nbsp;';
					html += '</div>';
					
					return html;
				}
				
			},
			{ 	text : '테이터Type', 	datafield : 'DATA_TYPE', 	width : '100px' },
			{ 	text : '연구항목대분류', 	datafield : 'ITEM_CATE_NM', 	width : '100px' },
			{ 	text : '연구항목중분류', 	datafield : 'ITEM_CATE_DETL_NM', 	width : '180px' },
			{ 	text : '연구항목명', 	datafield : 'ITEM_NM', 	width : '100px' },
			{ 	text : "수정일자", 	datafield : 'UDT_DT', 	cellsformat:'yyyy-MM-dd',	cellsalign:'center', 	width : '100px' 	 }
		]
	});
}

$(document).on('click','.btnOrderUp',function(){
	if(isNull($('#selItemCateList').val()) || isNull($('#selItemCateDetlList').val())){
		showAlert('연구항목 순서변경','표시순서 변경전에 대분류, 중분류를 선택하시기 바랍니다.',null);
		return;
	}
	
	var position = $("#jqxResearchItemList").jqxGrid('scrollposition');
	
	gvPageScrollXPos = position.left;
	gvPageScrollYPos = position.top;
	
	gvItemMgmtSeq = $("#jqxResearchItemList").upRow();
	
	
	
});

$(document).on('click','.btnOrderDown',function(){
	if(isNull($('#selItemCateList').val()) || isNull($('#selItemCateDetlList').val())){
		showAlert('연구항목 순서변경','표시순서 변경전에 대분류, 중분류를 선택하시기 바랍니다.',null);
		return;
		
	}
	
	var position = $("#jqxResearchItemList").jqxGrid('scrollposition');
	
	gvPageScrollXPos = position.left;
	gvPageScrollYPos = position.top;
	
	
	gvItemMgmtSeq = $("#jqxResearchItemList").downRow();
});

function optionFilter(elem, dataSet, expr, value, text, defaultValue, defaultText)
{
	var optionList = [];
	
	$.each(dataSet, function(key,jObj){
		if(eval(expr)){
			var ds = {};
			
			ds.VALUE 	= jObj.TABLE;
			ds.TEXT 	= jObj.TABLE_COMMENT_ID;
			
			optionList.push(ds);
		}
	});
	
	setComboList(elem, optionList, 'VALUE', 'TEXT', defaultValue, defaultText);
	
}

var changeSelITEM_TYPE = function(val){
	if(val == "TEX"){	//텍스트일 경우
		$('#chkPOPUP_YN').iCheck('enable');										//팝업여부 enable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "NUM" || val == "DAT"){	//숫자,날짜일 경우
		$('#chkPOPUP_YN').iCheck('disable');									//팝업여부 disable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "COD"){								//코드일 경우
		$('#chkPOPUP_YN').iCheck('enable');										//팝업여부 enable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else{				//선택 일 경우
		$('#chkPOPUP_YN').iCheck('enable');										//팝업여부 enable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', false);						//팝업선택 enable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', false);							//상위테이블 enable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', false);							//상위컬럼 enable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('enable');								//기준코드SQL enable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', false);							//코드컬럼 enable
	}
}

var changeChkPOPUP_TYPE = function(val){
	if(val == "TEX"){	//텍스트일 경우
		$('#selPOPUP_PROGRAM_ID option[value=P_SYNONYM]').prop('selected','selected');		//팝업선택 P_SYNONYM
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "COD"){								//코드일 경우
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', false);						//팝업선택 enable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}
}

var changeUnChkPOPUP_TYPE = function(val){
	if(val == "TEX"){	//텍스트일 경우
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "COD"){								//코드일 경우
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}
}

var changeSelPopupPROGRAM_TYPE = function(val){
	if(val == "P_COMMON_CODE" || val == "P_COMMON_CODE_KEY" || val == "P_COMMON_CODE_1H" || val == "P_COMMON_CODE_1HT" || val == "P_COMMON_CODE_1HT_MR"){								//코드일 경우
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('check');									//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('enable');								//기준코드SQL enable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', false);							//코드컬럼 enable
	}else if(val == "P_COMMON_CODE_2H" || val == "P_COMMON_CODE_3H" || val == "P_COMMON_CODE_2HT" || val == "P_COMMON_CODE_3HT" || val == "P_COMMON_CODE_2HT_MR"){
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', false);							//상위테이블 enable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', false);							//상위컬럼 enable
		$('#rdoCODE_TYPE_SQL').iCheck('check');									//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('enable');								//기준코드SQL enable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', false);							//코드컬럼 enable
	}else if(val == "P_COMMON_CODE_3HT_MR"){
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', false);							//상위테이블 enable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', false);							//상위컬럼 enable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "P_ORDR_CODE" || val == "P_DISINX" || val == "P_SYNONYM"){
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else{
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}
}

var changeChkCODE_TYPE = function(val){
	/*if(val == "SQL"){	//코드관리가 SQL일경우
		$('#txtPOPUP_COLUMN').prop('disabled', false);
		
	}else{								
		$('#txtPOPUP_COLUMN').prop('disabled', true);
		
	}*/
}

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
//	대분류선택
	$('#selItemCateList').on('change',function(e){
		getItemCateDetlList();
		
	});
	
//	중분류선택	
	$('#selItemCateDetlList').on('change',function(e){
		getItemMgmtList();
		
	});
	
//	등록화면-대분류 선택	
	$('#selItemCate').on('change',function(e){
		getItemCateDetlAddList();
		
	});
	
	
	
	$('#txtSEARCH_VAL').on('keypress',function(e){
		if( e.keyCode === 13){
			getItemMgmtList();
			
		}
	});
	
	$("#jqxResearchItemList").bind("pagechanged", function (event) {
	    var args = event.args;
	    var pagenumber = args.pagenum;
	    var pagesize = args.pagesize;
	});



	$("#jqxResearchItemList").bind("pagesizechanged", function (event) {
	    var args = event.args;
	    var pagenumber = args.pagenum;
	    var pagesize = args.pagesize;
	});
	
	
	
//	연구항목등록
	$('#btnRegistItemMgmt').on('click',function(e)
	{
		if(isNullOrEmpty($('#selItemCate').val())){
			showAlert('연구항목등록','대분류는 필수항목입니다.',null);
			return;
		}
		
		if(isNullOrEmpty($('#selItemCateDetl').val())){
			showAlert('연구항목등록','중분류는 필수항목입니다.',null);
			return;
		}
		
		if(isNullOrEmpty($('#selAddSchemaList').val())){
			showAlert('연구항목등록','스키마는 필수항목입니다.',null);
			return;
		}
		
		if(isNullOrEmpty($('#selAddTableList').val())){
			showAlert('연구항목등록','테이블은 필수항목입니다.',null);
			return;
			
		}
		
		if(isNullOrEmpty($('#selColumnList').val())){
			showAlert('연구항목등록','항목명은 필수항목입니다.',null);
			return;
			
		}
		
		var dataSet = {
			ITEM_CATE_SEQ:$('#selItemCate').val(),
			ITEM_CATE_DETL_SEQ:$('#selItemCateDetl').val(),
			SCHEMA:$('#selAddSchemaList').val(),
			TABLE:$('#selAddTableList').val(),
			COLUMN:$('#selColumnList').val(),
			UDT_ID:$.session.get('PER_CODE'),
			CRT_ID:$.session.get('PER_CODE')
				
		};
		
		callService("insertItemMgmt"
					,"admin/researchItem/insertItemMgmt"
					,dataSet
					,"serviceCallback");
		
		
	});
	
	$("#jqxResearchItemList").on("cellclick", function(event) {
		var args = event.args;
	    var rowBoundIndex = args.rowindex;
	    var columnindex = args.columnindex;
	    var dataField = args.datafield;
	    var value = args.value;
	    
	    
	    if(dataField !== 'COLUMN' && dataField !== 'COLUMN_COMMENT'){
	    	return;
	    	
	    }
	    var data = $("#jqxResearchItemList").jqxGrid('getrowdata', rowBoundIndex);
	    var dataSet = {};
		
		dataSet.SEARCH_SEQ = data.SEQ;
		dataSet.SEARCH_SCHEMA = data.SCHEMA;
		dataSet.SEARCH_TABLE = data.TABLE;
		
		callServiceSync("getColumnDateList"
				,"admin/researchItem/selectCatalogColumnDateList"
				,dataSet
				,"serviceCallback");
		
		
		callServiceSync("selectItemMgmtView"
					,"admin/researchItem/selectItemMgmtView"
					,dataSet
					,"serviceCallback");
		
		var dlg = $('#itemMgmtUpdModal').modal();
		dlg.find('.modal-title').text('연구항목수정');
		dlg.modal('show');
		
		
	});
	
	
	
	/**
	 * 연구항목 추가 스키마 목록
	 */
	$('#selAddSchemaList').on('change',function(e){
		var expr = 'jObj.SCHEMA === "' + $(this).val() + '"';
		
		optionFilter('selAddTableList', gvTableList, expr, 'TABLE', 'TABLE','','선택');
		
	});
	
	/**
	 * 연구항목 추가 테이블 목록
	 */
	$('#selAddTableList').on('change',function(e){
		getColumnList();
		
	});
	
	
	/**
	 * 연구항목추가
	 */
	$('#btnAdd').on('click',function(e){
		var value = '';
		var expr  = '';
		
		gvColumnList = [];
		
		setComboList('selItemCate', gvItemCateList, 'SEQ', 'CATE_NM','','선택');
		setComboList('selItemCateDetl', gvItemCateDetlList, 'SEQ', 'CATE_NM','','선택');
		setComboList('selAddSchemaList', gvSchemaList, 'SCHEMA', 'SCHEMA','','선택');
		setComboList('selAddTableList', gvTableList, 'TABLE', 'TABLE','','선택');
		setComboList('selColumnList', gvColumnList, 'COLUMN', 'COLUMN','','선택');
		
		value = $('#selAddSchemaList').val();
		expr  = 'jObj.SCHEMA === "' + value + '"';
		
		optionFilter('selAddTableList', gvTableList, expr, 'TABLE', 'TABLE','','선택');
		
		var dlg = $("#itemMgmtAddModal").modal({
			handle: ".modal-header"
		});
		dlg.title = "연구항목등록";
		dlg.modal('show');
		
	});
	
	/**
	 * 연구항목수정
	 */
	$('#btnUpd').on('click',function(e){
		gvCommand = 'U';
		
		var rowindex = -1;
		var data = {};
				
		rowindex = $('#jqxResearchItemList').jqxGrid('getselectedrowindex');
		
		if(rowindex < 0){
			showAlert(null,'선택된 정보가 없습니다.',null);
			return;
		}
		
		data = $('#jqxResearchItemList').jqxGrid('getrowdata',rowindex);
		
		
		var dataSet = {};
		
		dataSet.SEARCH_SEQ = data.SEQ;
		dataSet.SEARCH_SCHEMA = data.SCHEMA;
		dataSet.SEARCH_TABLE = data.TABLE;
		
		callServiceSync("getColumnDateList"
				,"admin/researchItem/selectCatalogColumnDateList"
				,dataSet
				,"serviceCallback");
		
		
		callServiceSync("selectItemMgmtView"
					,"admin/researchItem/selectItemMgmtView"
					,dataSet
					,"serviceCallback");
		
		
		var dlg = $('#itemMgmtUpdModal').modal();
		dlg.find('.modal-title').text('연구항목수정');
		dlg.modal('show');
		
		
	});

	$('#btnDel').on('click',function(e){
		var rowindex = -1;
		var data = {};
				
		rowindex = $('#jqxResearchItemList').jqxGrid('getselectedrowindex');
		
		if(rowindex < 0){
			showAlert('연구항목 삭제',COM_0031,null);
			return;
		}
		
		data = $('#jqxResearchItemList').jqxGrid('getrowdata',rowindex);
		
		var dataSet = {};
		
		dataSet.SEQ = data.SEQ;
		
		callService("deleteItemMgmt"
					,"admin/researchItem/deleteItemMgmt"
					,dataSet
					,"serviceCallback");
	});
	
	
//	컬럼수정
	$('#btnUpdateItemMgmt').on('click',function(e){
		
		//연구항목명 체크
		if(isNull($('#txtITEM_NM').val())){
			showAlert("연구항목수정","연구항목명은 " + COM_0010,null);			//연구항목명은 필수항목입니다.
			$('#txtITEM_NM').focus();
			return;
		}
		
	//	데이터타입에 따른 코드관리 유효성 체크
		if(isNull($('#selITEM_TYPE').val())){
			showAlert("연구항목수정","데이터타입은 " + COM_0010,null);			//데이터타입은 필수항목입니다.
			$('#selITEM_TYPE').focus();
			return;
		}
		
		if($('#selITEM_TYPE').val() === 'COD'){									//데이터 타입이 코드 일 경우
			if($('#chkPOPUP_YN:checked').val() == "on"){						//팝업여부 체크
				if(isNullOrEmpty($('#selPOPUP_PROGRAM_ID option:selected').val())){		//팝업을 선택 안했을 경우
					showAlert("연구항목수정","팝업선택은 " + COM_0010,null);
					$('#selPOPUP_PROGRAM_ID').focus();
					return;
				}else{
					if($('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_2H'){		//팝업을 선택 했을 경우
						if(isNullOrEmpty($('#selUPPER_TABLE option:selected').val())){		//상위테이블을 선택 안했을 경우
							showAlert("연구항목수정","상위테이블은 " + COM_0010,null);
							$('#selUPPER_TABLE').focus();
							return;
						}
					}
					
					if($('#selUPPER_COLUMN option:selected').val() == 'P_COMMON_CODE_2H'){		//팝업을 선택 했을 경우
						if(isNullOrEmpty($('#selUPPER_COLUMN option:selected').val())){		//상위컬럼을 선택 안했을 경우
							showAlert("연구항목수정","상위컬럼은 " + COM_0010,null);
							$('#selUPPER_COLUMN').focus();
							return;
						}
					}
					
					if($('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_KEY' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_1H' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_1HT' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_1HT_MR' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_2H' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_2HT' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_2HT_MR' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_3H' || 
							$('#selPOPUP_PROGRAM_ID option:selected').val() == 'P_COMMON_CODE_3HT'){		//팝업을 선택 했을 경우
						if($('input:radio[name=rdoCODE_TYPE]:checked').val() == 'SQL' || $('input:radio[name=rdoCODE_TYPE]:checked').val() == 'JSN'){		//기준코드가 SQL or JSON 일 경우
							if(isNullOrEmpty($('#txtCODE_SET').val())){		//코드관리 textarea 체크
								showAlert("연구항목수정","코드관리는 " + COM_0010,null);
								$('#txtCODE_SET').focus();
								return;
							}
							
							if(isNullOrEmpty($('#txtPOPUP_COLUMN').val())){					//코드컬럼 체크
								showAlert("연구항목수정","코드컬럼은 " + COM_0010,null);
								$('#txtPOPUP_COLUMN').focus();
								return;
							}else{
								var blank_pattern = /[\s]/g;
								if( blank_pattern.test($('#txtPOPUP_COLUMN').val()) == true){	//코드컬럼 빈칸체크
									showAlert("연구항목수정","코드컬럼은 공백이 들어갈 수 없습니다.",null);
									return;
								}
							}
						}
					}
				}
			}else{																//팝업여부 un체크
				if($('input:radio[name=rdoCODE_TYPE]:checked').val() == 'JSN'){	//기준코드가 json일 경우
					if(isNullOrEmpty($('#txtCODE_SET').val())){
						showAlert("연구항목수정","코드관리는 " + COM_0010,null);
						$('#txtCODE_SET').focus();
						return;
					}
				}
			}
		}
		
		/*
	//	코드셋타입
		if( $('input:radio[name=rdoCODE_TYPE]:checked').val() === 'SQL' || 
			$('input:radio[name=rdoCODE_TYPE]:checked').val() === 'JSN'	){
			if(isNullOrEmpty($('#txtCODE_SET').val())){
				showAlert("연구항목수정","코드셋은 " + COM_0010,null);
				$('#txtCODE_SET').focus();
				return;
			}
			
		}
		
		//팝업여부 선택 시 팝업선택 체크
		if($('#chkPOPUP_YN:checked').val() == "on"){
			if($('#selPOPUP_PROGRAM_ID').val() == ""){
				showAlert("연구항목수정","팝업선택은 " + COM_0010,null);
				return;
			}
		}*/
		
		
		var dataSet = {};
		
		/*//코드컬럼
		if($('input:radio[name=rdoCODE_TYPE]:checked').val() == "SQL"){
			if(isNullOrEmpty($('#txtPOPUP_COLUMN').val())){
				showAlert("연구항목수정","코드컬럼은 " + COM_0010,null);
				$('#txtPOPUP_COLUMN').focus();
				return;
			}else{
				var blank_pattern = /[\s]/g;
				if( blank_pattern.test($('#txtPOPUP_COLUMN').val()) == true){
					showAlert("연구항목수정","코드컬럼은 공백이 들어갈 수 없습니다.",null);
					return;
				}else{
					dataSet.POPUP_COLUMN 		= $('#txtPOPUP_COLUMN').val();
				}
			}
		}else{
			dataSet.POPUP_COLUMN 		= '';
		}*/
		
		var CODE_TYPE_VAL = $('input:radio[name=rdoCODE_TYPE]:checked').val();
		if(CODE_TYPE_VAL == undefined){
			CODE_TYPE_VAL = '';
		}
		
		dataSet.POPUP_COLUMN 		= $('#txtPOPUP_COLUMN').val();
		dataSet.SCHEMA 				= $('#txtSCHEMA').val();
		dataSet.TABLE 				= $('#txtTABLE').val();
		dataSet.SEQ 				= $('#txtSEQ').val();
		dataSet.ITEM_NM 			= $('#txtITEM_NM').val();
		dataSet.COLUMN_COMMENT 		= $('#txtColumn_NM').val();
		dataSet.ITEM_DESC 			= $('#txtITEM_DESC').val();
		dataSet.ITEM_TYPE 			= $('#selITEM_TYPE').val();
		dataSet.ORDER 				= $('#txtORDER').val();
		dataSet.CODE_TYPE			= CODE_TYPE_VAL;
		dataSet.CODE_SET 			= $('#txtCODE_SET').val();
		
		dataSet.BASE_DT_COLUMN 		= nvl($('#selBASE_DT_COLUMN').val(),'');
		dataSet.POPUP_PROGRAM_ID 	= $('#selPOPUP_PROGRAM_ID').val();
		dataSet.UPPER_TABLE 		= nvl($('#selUPPER_TABLE option:selected').val(),'');
		dataSet.UPPER_COLUMN 		= nvl($('#selUPPER_COLUMN option:selected').val(),'');
		
		dataSet.SEARCH_YN 			= iif($('#chkSEARCH_YN:checked').val() === 'on', 'Y','N');
		dataSet.POPUP_YN 			= iif($('#chkPOPUP_YN:checked').val() === 'on', 'Y','N');
		dataSet.GMEC_YN 			= iif($('#chkGMEC_YN:checked').val() === 'on', 'Y','N');
		dataSet.HCC_YN 				= iif($('#chkHCC_YN:checked').val() === 'on', 'Y','N');
		dataSet.SYNONYM_YN 			= iif($('#chkSYNONYM_YN:checked').val() === 'on', 'Y','N');
		dataSet.ITEM_FIRST_YN 		= iif($('#chkITEM_FIRST_YN:checked').val() === 'on', 'Y','N');
		dataSet.INSTCD_YN			= $('input:radio[name=INSTCD_YN]:checked').val()
		
		dataSet.UDT_ID 				= $.session.get('PER_CODE');
		
		/*console.log(dataSet);
		return;*/
		
		callService("updateItemMgmt"
					,"admin/researchItem/updateItemMgmt"
					,dataSet
					,"serviceCallback");
		
	});
	
	var checkboxes = $('input[name=chkSEARCH_GBN_YN]:checkbox');
	
	$('#chkSEARCH_ALL_YN').on('ifChecked ifUnchecked',function(e){
		if(e.type === 'ifChecked'){
			$('input[name=chkSEARCH_GBN_YN]:checkbox').each(function(){
				$(this).iCheck('check');
				
			});
			
		}else{
			$('input[name=chkSEARCH_GBN_YN]:checkbox').each(function(){
				$(this).iCheck('uncheck');
				
			});
		}
	});
	
	
	$('input[name=chkSEARCH_GBN_YN]:checkbox').on('ifChanged', function(e){
		var checkedLen = checkboxes.filter(':checked').length;
		
		if(checkedLen == 4) {
			$('#chkSEARCH_ALL_YN').prop('checked', true);
			
        } else {
        	$('#chkSEARCH_ALL_YN').prop('checked', false);
        	
        }
		
		$('#chkSEARCH_ALL_YN').iCheck('update');
		
	});
	
	
	$('#btnInitSearch').on('click',function(e){
		setComboList('selItemCateList', gvItemCateList, 'SEQ', 'CATE_NM','','전체');
		setComboList('selItemCateDetlList', gvItemCateDetlList, 'SEQ', 'CATE_NM','','전체');
		setComboList('selITEM_TYPE'			,gvItemTypeCdList		,'VALUE'	,'TEXT'		,'','선택');	//항목선택
		setComboList('selPOPUP_PROGRAM_ID'	,gvPopupProgramList	,'VALUE'	,'TEXT'		,'','선택');	//항목선택
		setComboList('selUPPER_TABLE'		,gvItemMgmtTableList		,'VALUE'	,'VALUE'		,'','선택');	//항목선택
		setComboList('selUPPER_COLUMN'		,gvItemMgmtColumnList		,'VALUE'	,'VALUE'		,'','선택');	//항목선택
		
		optionFilter('selItemCateDetlList', gvItemCateDetlList, "ITEM_CATE_SEQ=''", 'SEQ', 'CATE_NM','','전체');
		
		$('#chkSEARCH_ALL_YN').iCheck('check');
		$('#chkSEARCH_SEARCH_YN').iCheck('check');
		$('#chkSEARCH_GMEC_YN').iCheck('check');
		$('#chkSEARCH_HCC_YN').iCheck('check');
		$('#chkSEARCH_SYNONYM_YN').iCheck('check');
	});
	
	

//	조회
	$('#btnSearch').on('click',function(e){
		var checkedLen = checkboxes.filter(':checked').length;
		
		if(checkedLen == 0){
			showAlert(null,COM_0015,null);
			return;
		}
		
		getItemMgmtList();
		
		
	});
	

//	조회여부 체크박스 Change
	$('#chkSEARCH_YN').on('ifChecked ifUnchecked',function(e){
		console.log(e);
		
		if(e.type === 'ifChecked'){
			$('.importantUpChk').iCheck('enable');
			$('.manyUpChk').iCheck('enable');
			$('.analogueUpChk').iCheck('enable');
			
		}else if(e.type === 'ifUnchecked'){
			$('.importantUpChk').iCheck('disable');
			$('.manyUpChk').iCheck('disable');
			$('.analogueUpChk').iCheck('disable');
			
			$('.importantUpChk').iCheck('uncheck');
			$('.manyUpChk').iCheck('uncheck');
			$('.analogueUpChk').iCheck('uncheck');
		}
	});
	
	
//	데이터타입 셀렉트박스 변경이벤트  enable, disable
	$('#selITEM_TYPE').on('change', function(){
		changeSelITEM_TYPE($(this).val());
	});

	//코드관리 체크박스 변경이벤트
	$('.codeChk').on('ifChecked', function(event){
		changeChkCODE_TYPE($(this).val());
	});
	
	//팝업여부 체크관련 이벤트
	$('#chkPOPUP_YN').on('ifChecked', function(event){
		changeChkPOPUP_TYPE($('#selITEM_TYPE option:selected').val());
	});
	
	//팝업여부 체크해제관련 이벤트
	$('#chkPOPUP_YN').on('ifUnchecked', function(event){
		changeUnChkPOPUP_TYPE($('#selITEM_TYPE option:selected').val());
	});
	
	//팝업선택 셀렉트박스 이벤트
	$('#selPOPUP_PROGRAM_ID').on('change', function(){
		if($('#selITEM_TYPE option:selected').val() == 'COD'){
			changeSelPopupPROGRAM_TYPE($(this).val());
		}
	});
	
	
	
	$('input:radio[name="rdoCODE_TYPE"]').on('ifChecked ifUnchecked',function(e){
		var data = e.target;
		
		if(e.type === 'ifChecked'){
			/*if(data.value === 'SQL'){
				$('#txtCODE_SET').select();
				$('.popupChk').iCheck('enable');
				$('#selPOPUP_PROGRAM_ID').prop('disabled', false);
				
				
			}else if(data.value === 'JSN'){
				$('#txtCODE_SET').select();
				
				$('.popupChk').iCheck('disable');
				$('.popupChk').iCheck('uncheck');
				
				$('#selPOPUP_PROGRAM_ID').prop('disabled', true);
				$('#selPOPUP_PROGRAM_ID').val('');
				$('#txtPOPUP_COLUMN').val('');
				
			}else{
				$('.popupChk').iCheck('disable');
				$('.popupChk').iCheck('uncheck');
				
				$('#selPOPUP_PROGRAM_ID').prop('disabled', true);
				$('#selPOPUP_PROGRAM_ID').val('');
				$('#txtPOPUP_COLUMN').val('');
				
			}*/
		}
	});
	
	$('#selBASE_DT_COLUMN').on('change',function(e){
		if(isNull($(this).val())){
			$('.itemFirstYnChk').iCheck('disable').iCheck('uncheck');
			
		}else{
			$('.itemFirstYnChk').iCheck('enable');
			
		}
		
	});
	
	
//	연구항목
	$('#selUPPER_TABLE').on('change',function(e){
		getItemMgmtColumnList();
		
	});
	
	//기준코드SQL 체크박스 이벤트
	$('#rdoCODE_TYPE_SQL').on('ifChecked', function(){
		$('#txtCODE_SET').prop("placeholder", "예) select PAT_SBST_NO as CODE, PAT_NAME as CODE_NM, PAT_ADDR, BIRTH_YMD, SEX  from CRDW.PT_PAT_MST where PAT_SBST_NO like '%'||#{CODE_NM}||'%' or PAT_NAME like '%'||#{CODE_NM}||'%' order by 1 limit 1000");
		$('#txtCODE_SET').prop('disabled', false);
	});
	
	//기준코드JSON 체크박스 이벤트
	$('#rdoCODE_TYPE_JSN').on('ifChecked', function(){
		$('#txtCODE_SET').prop('placeholder', '예) [{"M":"남성","F":"여성"}]');
		$('#txtCODE_SET').prop('disabled', false);
	});
	
	//기준코드직접입력 체크박스 이벤트
	$('#rdoCODE_TYPE_NON').on('ifChecked', function(){
		$('#txtCODE_SET').prop('placeholder', '');
		$('#txtCODE_SET').prop('disabled', true);
	});
	
}


