/**
 * 모달창 KeyWord
 * @Page : modalKeyWord
 */
var item_cate_seqKW;// = "4";
var item_cate_detl_seqKW;// = "24";

var objValKW;// = "동의어1-1|동의어2-2";

var $args;
var jObj;

/**
 * Application Ready
 */
$(document).ready(function(){	
	initEventKW();
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
function serviceCallbackKW(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getDataKW":
			console.log(result);
			var dsKeyWordCodeList = result.dsKeyWordCodeList;
			
			$('#keywordArea').html('');
			for(var i=0; i<dsKeyWordCodeList.length; i++){
				var keywordBtn = "<button type='button' class='btn btn-default btn-block btn-flat myKeyword' SEQ='"+ dsKeyWordCodeList[i]['SEQ'] +"'>"+ dsKeyWordCodeList[i]['TERM'] +"</button>";
				$('#keywordArea').append(keywordBtn);
			}
				
			break;
			
		case "getDataDetlKW":
			console.log(result);
			var dsKeyWordCodeDetlList = result.dsKeyWordCodeDetlList;
			
			$('#keywordDetlArea').html('');
			for(var i=0; i<dsKeyWordCodeDetlList.length; i++){
				var keywordDetlChk = "<label><input type='checkbox' class='keywordRst' SEQ='"+ dsKeyWordCodeDetlList[i]['SEQ'] +"' TERM='"+ dsKeyWordCodeDetlList[i]['TERM'] +"'><span class='margin-right-15'>"+ dsKeyWordCodeDetlList[i]['TERM'] +"</span></label>";
				$('#keywordDetlArea').append(keywordDetlChk);
			}
			
			makeiCheck('.keywordRst');		
			
			break;
		
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 키워드검색조회
 * @returns
 */
function getDataKW(){
	var dataSet = {
			
	};
	dataSet.SEARCH_VAL 			= $('#searchWrdKW').val();
	dataSet.item_cate_seq 		= item_cate_seqKW;
	dataSet.item_cate_detl_seq	= item_cate_detl_seqKW;
	
	console.log(dataSet);
	
	callService("getDataKW" ,"common/modal/getKeyWordCodeList" ,dataSet ,"serviceCallbackKW");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function initKW()
{
	gvSpinnerClose();
	
	getCodeKW();
	
	//결과영역 초기화
	$('#keywordArea').html('');
	$('#keywordDetlArea').html('');
	
	$('#searchWrdKW').val('');
}

//코드받아오기
function getCodeKW(){
	$args = $('#args');
	jObj = JSON.parse($args.val());
	
	item_cate_seqKW = jObj.ITEM_CATE_SEQ;
	item_cate_detl_seqKW = jObj.ITEM_CATE_DETL_SEQ;
	
	/*item_cateDetl_seq2H		= jObj.ITEM_CATE_DETL_SEQ;
	item_seq2H				= jObj.ITEM_SEQ;
	item_cate_seq2H 		= jObj.ITEM_CATE_SEQ;*/
}

/**
 * grid setting
 * @returns
 */
function setGridKW()
{
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEventKW(){
		
	//조건 등록
	$('#submitBtnKW').on('click',function(e){
		var retObj = '';
		
		$(".keywordRst").each(function() {
			if($(this).prop('checked')){
				if(isNull(retObj)){
					retObj = $(this).attr('TERM');
					
				}else{
					retObj += '|' + $(this).attr('TERM');
					
				}
			}
		});
		
		//넘길 값이 없을때 clear 넘김
		if(retObj == ""){
			retObj = "clear";
		}
		
		$("#result").val(retObj);
		
		$('#popKWModal').modal('hide');
	});
	
	//검색버튼
	$('#btnKWSearch').on('click',function(e){
		if(isNullOrEmpty($('#searchWrdKW').val())){
			BootstrapDialog.alert(COM_0006);
			return;			
		}
		
		if($('#searchWrdKW').val().length <2){
			BootstrapDialog.alert(COM_0020);
			return;			
		}
		
		getDataKW();
		
		
	});
	
	$('#searchWrdKW').on('keypress',function(e){
		if(e.keyCode === 13){
			if(isNullOrEmpty($('#searchWrdKW').val())){
				BootstrapDialog.alert(COM_0006);
				return;
			}
			
			if($('#searchWrdKW').val().length <2){
				BootstrapDialog.alert(COM_0020);
				return;			
			}
			
			getDataKW();
			
		}
	});
	
	//대표어버튼 선택 이벤트
	$(document).on('click', '.myKeyword', function(){
		//버튼 초기화
		$(".myKeyword").each(function() {
			$(this).removeClass('btn-info');
		});
		
		//선택한 버튼 색추가
		$(this).addClass('btn-info');
		
		var dataSet = {};
		dataSet.REP_SEQ = $(this).attr('SEQ');
		
		callService("getDataDetlKW" ,"common/modal/getKeyWordCodeDetlList" ,dataSet ,"serviceCallbackKW");
		
	});
}




