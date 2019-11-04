var gvColumnList = [];
var gvPatSbstNoList = [];
var gvSearchPatSbstNoList = [];
var gvSearchResultList = [];

var gvInstNmList = [];
var gvDeptNmList = [];
var gvFormNmList = [];


var gvPageNo = 1;
var gvPageSize = 10;
var gvStartNum = 1;
var gvSortSpec = '_score';

/**
 * Application Ready
 */
$(document).ready(function(){
	getCommonCodeList();	//공통코드
	initSearch();
	initEventSearch();
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

function serviceCallback_search(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}
	
	switch(svcId){
	//	공통코드
		case "getCommonCodeList":
			gvColumnList = result.dsCommonCodeList;
			getPatSbstNoList();		//환자목록
			
			break;
			
	//	환자목록		
		case "getPatSbstNoList":
			gvPatSbstNoList = result.dsPatSbstNoList;
			break;
	
		case "searchRequest":
			var html = '';
			var startNo = 1;
			
			if(result.PAGE_NO === '1'){
				gvStartNum = 1;
				
			}else{
				gvStartNum = (parseInt(result.PAGE_NO) - 1) * parseInt(result.PAGE_SIZE);
				
			}
			
		//	검색건수 설정
			$('#lblTotalCount').html(numberFormat(result.INDEX_COUNT));
			$('#lblSearchCount').html(numberFormat(result.SEARCH_COUNT));
			$('#lblPatSbstCount').html(numberFormat(result.EXTRACT_PAT_COUNT));
			
		//	Aggreagate Fields 설정	
			drawAggregateFields('INSTNM', result.AGGREGATE_MAP.INSTNM.buckets);
			drawAggregateFields('FRM_DEPT_NM', result.AGGREGATE_MAP.FRM_DEPT_NM.buckets);
			drawAggregateFields('FRM_NM', result.AGGREGATE_MAP.FRM_NM.buckets);
			
			makeiCheckBlue('.chkMenu');
			
			
		//	동의어 목록
			drawSynonymList(result.dsSynonymList, result.SEARCH_SYNONYM_LIST);
			makeiCheck('.chkItem');
			
			
			gvSearchPatSbstNoList = result.EXTRACT_PAT_LIST;
			gvSearchResultList = result.RESULT_LIST;
			
		//	결과 목록 draw	
			drawResult();
			
		//	Pagination Render	
			$('#divPagination').html(result.PAGE_RENDER_HTML);
			
			
			
			break;
				
		default:
			break;
	}
		
}




//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------

/**
 * 공통코드 조회(검색컬럼)
 * @returns
 */
function getCommonCodeList(){
	var dataSet = {};
	
	dataSet.SEARCH_COMM_GRP_ID = 'CDW_FORM_SEARCH_CD';
	
	callServiceSync("getCommonCodeList"
				,"common/sys/getCommonCodeList"
				,dataSet
				,"serviceCallback_search");
	
}

/**
 * 환자목록조회
 * @returns
 */
function getPatSbstNoList(){
	var dataSet = {};
	
	dataSet.SEARCH_TABLE_ID = $('#txtSEARCH_TABLE_ID').val();
	
	callServiceSync("getPatSbstNoList"
				,"search/getPatSbstNoList"
				,dataSet
				,"serviceCallback_search");
	
}


function getSearchRequest(){
	var dataSet = {};
	var dsWordsList = [];
	var dsSynonymList = [];
	
	
	var checked = $('input[name="chkSynonym"]').parent('[class*="icheckbox"]').hasClass("checked");
	
	$('input[name="chkSynonym"]').each(function (index, value) {
		var isChecked = $(this).parent('[class*="icheckbox"]').hasClass("checked");
		
		if(isChecked){
			dsSynonymList.push($(this).val());
		}
	});
	
	gvInstNmList = [];
	gvDeptNmList = [];
	gvFormNmList = [];
	
	$('input[name="chkINSTNM"]:checked').each(function (index, value) {
		gvInstNmList.push($(this).val());
		
	});
	
	$('input[name="chkFRM_DEPT_NM"]:checked').each(function (index, value) {
		gvDeptNmList.push($(this).val());
		
	});
	
	$('input[name="chkFRM_NM"]:checked').each(function (index, value) {
		gvFormNmList.push($(this).val());
		
	});
	
	
	
	$('.searchItems').each(function(){		
		var dsWords = {};
		
		$(this).find("select,input").each(function (){
			if(this.tagName === 'SELECT'){
				dsWords.AND_OR_NOT = $(this).val();
			}
			
			if(this.tagName === 'INPUT'){
				dsWords.INPUT_VAL = $(this).val();
			}
		});
		dsWordsList.push(dsWords);
	});
	
	dataSet.SEARCH_VAL 				= $('#vSearchWord').val();
	dataSet.SEARCH_PAT_SBST_NO_LIST = gvPatSbstNoList;
	dataSet.SEARCH_SYNONYM_LIST		= dsSynonymList;
	dataSet.PAGE_NO 				= gvPageNo;
	dataSet.PAGE_SIZE 				= gvPageSize;
	dataSet.AGG_KEY 				= '';
	dataSet.AGG_INSTCD_NM_LIST		= gvInstNmList;
	dataSet.AGG_REG_DEPT_NM_LIST	= gvDeptNmList;
	dataSet.AGG_FORM_NM_LIST		= gvFormNmList;
	dataSet.SEARCH_WORDS_LIST		= dsWordsList;
	
	if($('#chkExactMatchYN').is(':checked')){
		dataSet.SEARCH_EXACT_MATCH_YN	= 'Y';
	}else{
		dataSet.SEARCH_EXACT_MATCH_YN	= 'N';
	}
	
	dataSet.SEARCH_FROM_DT			= $('#vStartDate').val();
	dataSet.SEARCH_TO_DT			= $('#vEndDate').val();
	dataSet.SEARCH_SORT_SPEC 		= gvSortSpec;
	dataSet.SEARCH_COLUMN_LIST = gvColumnList;
	
	
	print_bigcenmed(dataSet);
	
	callService("searchRequest"
				,"search/searchRequest"
				,dataSet
				,"serviceCallback_search");
	
}




function fn_searchPage(pageNo){
	gvPageNo = pageNo;
	
	getSearchRequest();
	
}


function fn_searchSortSpec(sortSpec){
	gvPageNo = 1;
	gvSortSpec = sortSpec;
	
	getSearchRequest();
}


function searchAggreation(aggKey){
	var dataSet = {};
	
	dataSet.SEARCH_VAL 				= $('#vSearchWord').val();
	dataSet.SEARCH_PAT_SBST_NO_LIST = $("#selPatSbstNoList", opener.document).val();
	dataSet.SEARCH_SYNONYM 			= '';
	dataSet.PAGE_NO 				= gvPageNo;
	dataSet.PAGE_SIZE 				= gvPageSize;
	dataSet.AGG_KEY 				= aggKey;
	
	dataSet.SEARCH_EXACT_MATCH_YN	= 'Y';
	dataSet.SEARCH_FROM_DT			= '2017-01-01';
	dataSet.SEARCH_TO_DT			= '2017-08-01';
	dataSet.SEARCH_SORT_SPEC 		= gvSortSpec;
	
	callService("searchRequest"
				,"search/searchRequest"
				,dataSet
				,"serviceCallback_search");
	
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function initSearch()
{
	//날짜
	getDateForMonth('vStartDate',36,'month');
	getDateForMonth('vEndDate',0,'month');
	
	//체크박스 세팅
	makeiCheck('.chkSearchForm, .chkItem, .chkColor');
	makeiCheckBlue('.chkMenu, .chkItemAgg');
	
	//날짜inpur mask
	$('.maskDateInput').on('focus',function(){
		$(this).mask('0000-00-00');
		$(this).select();
	});
	
	
	if(!isNull($('#vSearchWord'))){
		getSearchRequest();
		
	}
	
}




/**
 * Aggreagate Fields Draw
 * @param aggKey
 * @param dsAggList
 * @returns
 */
function drawAggregateFields(aggKey, dsAggList){
	var html = '';
	
	for(var i=0; i < dsAggList.length; i++){
		var dsAgg = dsAggList[i];
		
		html += '<li class="font-size-12 margin-bottom-5 list-style-none chk3">';
		
		if(isAggregateChecked(dsAgg.key,aggKey)){
			html += '<input type="checkbox" class="chkMenu chkItemAgg" checked name="chk' + aggKey + '" value="'+dsAgg.key+'">&nbsp;&nbsp;&nbsp;';	
		}else{
			html += '<input type="checkbox" class="chkMenu chkItemAgg" name="chk' + aggKey + '" value="'+dsAgg.key+'">&nbsp;&nbsp;&nbsp;';
		}
		
		html += '<a href="javascript:searchAggreation('+"'"+dsAgg.key+"'"+')">' + dsAgg.key + '</a>';
		html += '&nbsp;<span style="color:#DF7401;">(' + numberFormat(dsAgg.doc_count) + ')</span>';
		html += '</li>';
	}
	
	
	var element = '';
	
	if(aggKey === 'INSTNM'){
		element = 'aggGubnList';
		
	}else if(aggKey === 'FRM_DEPT_NM'){
		element = 'aggDeptNameList';
		
	}else if(aggKey === 'FRM_NM'){
		element = 'aggReportList';
		
	}
	$('#' + element).html(html);
	
	
}

/**
 * Aggregate
 * @param key
 * @param aggKey
 * @returns
 */
function isAggregateChecked(key, aggKey){
	var retVal = false;
	var dsList = [];
	
	if(aggKey === 'INSTNM'){
		dsList = gvInstNmList;
		
	}else if(aggKey === 'FRM_DEPT_NM'){
		dsList = gvDeptNmList;
		
	}else if(aggKey === 'FRM_NM'){
		dsList = gvFormNmList;
		
	}
	
	for(var i=0; i < dsList.length; i++){
		if(key === dsList[i]){
			retVal = true;
			break;
		}
	}
	
	return retVal;
	
}

/**
 * 
 * @param dsList1
 * @param dsList2
 * @returns
 */
function drawSynonymList(dsList1, dsList2){
	var html = '';
	
	for(var i=0; i < dsList1.length; i++){
		var dsSynonym = dsList1[i];
		var isChecked = false;
		
		for(var j=0; j < dsList2.length; j++){
			if(dsSynonym.SYN_TERM == dsList2[j]){
				isChecked = true;
				break;
			}
		}
		
		html += '<label class="font-size-12 margin-right-15 searchWordLabel">';
		
		if(isChecked){
			html += '<input type="checkbox" class="chkItem" value="'+dsSynonym.SYN_TERM+'" name="chkSynonym" checked>';	
		}else{
			html += '<input type="checkbox" class="chkItem" value="'+dsSynonym.SYN_TERM+'" name="chkSynonym">';
		}
		
		html += '&nbsp;&nbsp;' + dsSynonym.SYN_TERM;
		html += '</label>';
		
	}
	
	$('#searchWordArea').html(html);
}


/**
 * 검색결과 출력
 * @returns
 */
function drawResult(){
	var html ='';
	
	if(gvSearchResultList.length < 1){
		html += '<div class="margin-5-0 " style="padding-top:100px;text-align:center;">';
			html += '<h4>';
				html += '<span style="color:orange;">';
					html += '"' + $('#vSearchWord').val() + '"';
				html += '</span>';
				html += '에 대한 검색결과가 없습니다.';
			html += '</h4>';
		html += '</div>';
		
		$('#divSearchResult').html(html);
		
		return;
	}
	
	
	for(var i=0; i < gvSearchResultList.length; i++){
		var dsObj	= gvSearchResultList[i];
		var idx 	= gvStartNum + (i+1);
		
		html += '<div class="margin-5-0 padding-bottom-10" style="border-bottom:solid #f7f7f7 1px;">';
			html += '<div class="margin-bottom-5 padding-5">';
				html += '<span>'+idx+'.&nbsp;</span>';
				html += '<span class="text-bold" style="margin-right:15px;">'+dsObj.FRM_NM+'</span>';
				html += '<span style="margin-right:15px;">'+dsObj.REC_DATE+'</span> | ';
				html += '<span style="margin-right:15px;">작성자 : </span>';
				html += '<span>' + dsObj.FRM_DISP_USER_INFO+'</span>';
			html += '</div>';
			html += '<div>';
				html += '<span>';
				html += dsObj.HIGHLIGHT;
				html += '</span>';
			html += '</div>';
		html += '</div>';
	}
	
	
	$('#divSearchResult').html(html);
}







//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
* 이벤트 초기화
* @returns
*/
function initEventSearch()
{

	
	
	//검색어 추가 이벤트
	$('#btnSearchPlus').on('click', function(){
		
		//빈칸 체크
		if($.trim($('#vSearchWord').val()) == ""){
			showAlert('서식지 검색',COM_0006,null);
			return;
		}
		
		//중복 체크
		var flag = true;
		$('.vWords').each(function(){
			if($(this).val() == $('#vSearchWord').val()){
				showAlert('서식지 검색',COM_0039,null);
				flag = false;
				return false;
			}
		});
		if(flag == false){
			return;
		}
		
		if($('.vWords').length > 4){	//5개까지 가능
			showAlert('서식지 검색', "검색어를 " + COM_0041, null);
			return;
		}
		
		var html = "<div class='margin-bottom-5 searchItems' style='width:30%;'>" +
						"<div class='row'>" +
							"<div class='col-lg-4 col-sm-4'>" +
								"<select class='form-control' style='height:30px;'>" +
									"<option value='AND'>AND</option>" +
									"<option value='OR'>OR</option>" +
									"<option value='NOT'>NOT</option>" +
								"</select>" +
							"</div>" +
							"<div class='col-lg-8 col-sm-8'>" +
								"<div class='input-group input-group-sm'>" +
									"<input type='text' class='form-control vWords' value='"+ $('#vSearchWord').val() +"'>" +
									"<span class='input-group-btn'>" +
										"<button type='button' class='btn btn-danger btn-flat btnSearchMinus'>" +
											"<i class='fa fa-minus'></i>" +
										"</button>" +
									"</span>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>";
		
		$('#detailSearchBody').append(html);
		

		if($('#detailSearchArea').hasClass('collapsed-box')){
			$('#viewSearch').trigger('click');
		}
		
	});
	
	//검색어 삭제 이벤트
	$(document).on('click', '.btnSearchMinus', function(){
		$(this).parent().parent().parent().parent().parent().remove();
		
		print_bigcenmed($('.searchItems').length);
		
		if($('.searchItems').length == 0){
			$('#viewSearch').trigger('click');
		}
		
	});
	
	//초기화 이벤트
	$('#btnReset').on('click', function(){
		showConfirm('서식지 검색',COM_0040, function(result){
			if(!result){
				return;
			}
			$('#vSearchWord').val('');
			$('#vStartDate').val('');
			$('#vEndDate').val('');
			$('#searchWordArea').html('');
		});
	});
	
	
	
	//vSearchWord
	$('#vSearchWord').on('keyup',function(e){
		if(e.keyCode == 13){
			gvPageNo = 1;
			gvSortSpec = '_score';
			getSearchRequest();
		}
		
	});
	
	var url = gvSERVER + gvCONTEXT + '/search/typeahead';
	
	$('#vSearchWord').typeahead({
		source: function (request, response) {
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify({
                	'SEARCH_VAL':$('#vSearchWord').val()
                }),
                dataType: 'json',
                contentType: "application/json", 
                async: false,
                beforeSend : function(xhr){
        			xhr.setRequestHeader("isAjax", "true");
        			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
        			
        		},
                success: function(data) {
                	var items = [];	
                	items = data['data'];
                	response(items);
                }
            });
		},
		hint:true,
		highlight:true,
		minLength:1,
		autoselect:true
		

		
    });
	
	$('#btnSearch').on('click',function(e){
		gvPageNo = 1;
		gvSortSpec = '_score';
		getSearchRequest();
		
		
	});
	
	
	$('#btnResultApply').on('click',function(e){
		window.opener.setPatientList(gvSearchPatSbstNoList);
        window.close();
        
	});
	
	
	
	
	$(document).on('ifClicked', '.chkAll', function(){
		var num = $(this).attr('num');
		
		if(num == 1){								//병원구분
			if($(this).prop("checked") == false){		//체크 이벤트
				$('input[name="chkINSTNM"]').each(function(){
					$(this).iCheck('check');
				});
			}else{										//체크해제 이벤트
				$('input[name="chkINSTNM"]').each(function(){
					$(this).iCheck('uncheck');
				});
			}
			
			
		}else if(num == 2){							//기록지
			if($(this).prop("checked") == false){		//체크 이벤트
				$('input[name="chkFRM_NM"]').each(function(){
					$(this).iCheck('check');
				});
			}else{										//체크해제 이벤트
				$('input[name="chkFRM_NM"]').each(function(){
					$(this).iCheck('uncheck');
				});
			}
			
			
		}else if(num == 3){								//진료과
			if($(this).prop("checked") == false){		//체크 이벤트
				$('input[name="chkFRM_DEPT_NM"]').each(function(){
					$(this).iCheck('check');
				});
				
			}else{										//체크해제 이벤트
				$('input[name="chkFRM_DEPT_NM"]').each(function(){
					$(this).iCheck('uncheck');
				});
			}
		}
		
		
		getSearchRequest();
		
	});
	
	
	$(document).on('ifClicked', '.chkItemAgg', function(){
		if($(this).prop("checked") == false){		//체크 이벤트
			$(this).iCheck('check');
			
		}else{										//체크해제 이벤트
			$(this).iCheck('uncheck');
		}
		
		getSearchRequest();
		
		
		
	});
	
	
	
	$(document).on('keypress', '.dropdown-menu', function(){
		
	});
	
	
}
