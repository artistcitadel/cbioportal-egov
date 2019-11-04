var gvResult = [];	//조회결과

/**
 * Application Ready
 */
$(document).ready(function(){
	init_sub02();
	initEvent_sub02();
	
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
function serviceCallback_sub02(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}
	
	switch(svcId){
	
	//	검색결과
		case "searchStudyItemTargetList":
			drawStudyItemResult(result);
			break;
			
		case "saveQueryStudyItemConditions": //"saveItemContDetl":
			var strMsg = '';
			
			if(gvCommand == 'C'){
				strMsg = COM_0001;			//저장되었습니다.
				
			}else if(gvCommand = 'U'){
				strMsg = COM_0002;			//수정되었습니다.
			}
			
			showAlert('연구항목저장','연구항목이 ' + strMsg,function(e){
				$('#btnSaveData').attr('disabled',false);
				$('#btnCloseStudyItem').trigger('click');
				
				var dataSet = {
					SEARCH_ITEM_CONT_SEQ:result.SEQ
				};
				
				getItemContDetlList(dataSet);
				getItemContTreeList();
				
			});
			
			break;
			
		case "saveResultData":	
			showAlert('연구항목저장','연구항목 결과가 ' + COM_0001,function(e){
				$('#btnCloseStudyItemTarget').trigger('click');
				
				var dataSet = {};
				var strItemSelType = $(".rdoITEM_SEL_TYPE:checked").val();
				
				dataSet.SEARCH_ITEM_CONT_SEQ = result.CONT_SEQ;
				dataSet.PARENT_ID = 'E';
				dataSet.SEARCH_DATA_ID = result.DATA_SEQ;
				
				getItemContDetlList(dataSet);
				
				//$('#btnSaveData').attr('disabled',true);
				
			});
			
			
			break;
			
		default:
			break;
	}
	
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init_sub02()
{
	makeiCheck('.rdoSaveStudyItem');
	
}



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------

$(document).on('change','.selRANGE_CD',function(e){
	var $element = $(this).parent();
	
	var html = '';
	
	$(this).val($(this).val());
	
	$element.children().remove('.divRANGE_CD');
	
	if($(this).val() === 'R' || $(this).val() === 'P' || $(this).val() === 'A'){
		html = '<div class="divRANGE_CD" style="">';
		html += '<input type="text" name="txtRANGE_DN" class="form-control input-text" style="float:left;width:30%;height:34px;">';
		html += '일';
		html += '</div>';
		
	}else{
		html = '<div class="txtRANCE_CD"></div>';
	}
	
	$element.append(html);
		
});


$(document).on('click','#gridStudyItem tbody td',function(e){
	$('#gridStudyItem').deleteRow(this);
	
});



/**
 * 이벤트 초기화
 * @returns
 */
function initEvent_sub02()
{
	$('#btnInitGroupStudyItem').on('click', function(e){
		$('#gridStudyItem').groupInit();
		
		
	});

//	연구항목초기화	
	$('#btnInitStudyItem').on('click',function(e){
		var table = $('#gridStudyItem').DataTable();
		
		if(!isNull(table.rows().data())){
			if(!confirm('기존에 설정하신 연구항목이 초기화 됩니다.\n계속하시겠습니까?')){
				return;	
			}
		}

		//조건저장 체크박스 초기세팅 20170901 by 최종호
		gvItemCont = "";
		
		table.clear().draw();
		
		//연구항목 데이터 초기화 20190402 by 정고은
		$('#tabResult_02').html('');
		$('#jqxGridResultWrap_02').html('');
		$('#lblResultInfo_02').html('');
		
	});
	
//	연구항목저장
	$('#btnStudyItemModal').on('click',function(e){
		var dataSet = {};
		
		dataSet.dsItemColumnList = $('#gridSearch_' + gvActiveTab).getData();
		dataSet.dsStudyItem = $('#gridStudyItem').getGridStudyItem();
		
		if(isNull(dataSet.dsItemColumnList)){
			alert('조회조건은 최소 한건이상 있어야 합니다.');
			return;
		}
		
		if(isNull(dataSet.dsStudyItem)){
			alert('연구항목은 최소 한건이상 있어야 합니다.');
			return;
		}
		
		
//		신규	(저장 비활성화)
		//if(isNullOrEmpty(gvItemCont)){
		//조건저장 체크박스 초기세팅 20170901 by 최종호
		if(isNullOrEmpty(gvItemCont) || gvItemCont.SHARE_CD=="A" || gvItemCont.SHARE_CD=="D" || gvItemCont.SHARE_CD=="S"){
			$('#rdoSaveSi').iCheck('disable');
			$('#rdoNewSaveSi').iCheck('enable');
			$('#rdoNewSaveSi').iCheck('check');
			
		}else{
			$('#rdoSaveSi').iCheck('enable');
			$('#rdoNewSaveSi').iCheck('enable');
			$('#rdoSaveSi').iCheck('check');
		}
		
		$('#selSHARE_CD').val('P');
		
		var dlg = $('#studyItemModal').modal();
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.modal('show');
		
		
	});	
	
	
	$('#rdoSaveSi').on('ifChecked',function(e){
		$('#txtCONDT_NM_STUDY_ITEM').val(gvItemCont.CONDT_NM);
		$('#txtCONDT_NM_STUDY_ITEM').focus();
		$('#txtCONDT_NM_STUDY_ITEM').prop('disabled',true);
		
	});
	
	$('#rdoNewSaveSi').on('ifChecked',function(e){
		$('#txtCONDT_NM_STUDY_ITEM').val('');
		$('#txtCONDT_NM_STUDY_ITEM').focus();
		$('#txtCONDT_NM_STUDY_ITEM').prop('disabled',false);
	});
	
	

//	연구항목 저장	
	$('#btnSaveStudyItem').on('click',function(e){
		
		//181122 저장시 # 있으면 경고창
		if($('#txtCONDT_NM_STUDY_ITEM').val().indexOf('#') != -1){			
			alert("연구 이름에는 #이 입력되지 않습니다.");
			return ;
		}
		
		if(isNull($('#txtCONDT_NM_STUDY_ITEM').val())){
			showAlert(null,'연구이름은 ' + COM_0010,null);
			return ;
		}
		
		if(!isNull(gvItemCont) && gvINSTCD_YN === 'Y'){
			if(!isDiffInstcd(gvItemCont.INSTCD)){
				var strMsg = '';
				
				strMsg += '저장하신 조건(' + getInstcdName(gvItemCont.INSTCD) + ')과 로그인시 선택한 연구데이터의 병원구분값이 다릅니다.';
				strMsg += '<br>';
				strMsg += '연구조회조건 저장은 로그아웃후 동일 병원구분코드로 로그인 하시기 바랍니다.';
				
				showAlert('연구항목조회',strMsg,null);
				
				return false;
			}	
		}
		
		//중복체크
		if($('input:radio[name="rdoSaveStudyItem"]:checked').val() === 'C'){
			chkDuplCondNmList($('#txtCONDT_NM_STUDY_ITEM').val());	//researchCommon.js에서 실행
				
			if(gvChkDuplCondNmList.length > 0){
				showAlert('조회조건 저장', COM_0045, null);	//중복된 조건이 있습니다.다른 명칭으로 저장해 주시기 바랍니다.
				return;
				
			}else{
				saveQueryStudyItemConditions();
			}
			
		}else{
			saveQueryStudyItemConditions();
			
		}
		
	});	
	
	
//	연구항목대상조회	
	$('#btnSearch_Tab02').on('click', function(e){
		if(!$('#gridSearch_02').validDate()){
			showAlert(null, COM_0032, null);
			return;
		}
		
		if(!$('#gridStudyItem').validDate()){
			showAlert(null, COM_0032, null);
			return;
		}
		
		if(!$('#gridControlGroup_02').validDate()){
			showAlert(null, COM_0032, null);
			return;
		}
		
		if(!$('#gridControlGroup_02').validDate()){
			showAlert(null, COM_0032, null);
			return;
		}
		
		
		//기존저장된 데이터가 있으면
		if(gvINSTCD_YN === 'Y' && !isNull(gvItemCont)){
			if(!isDiffInstcd(gvItemCont.INSTCD)){
				var strMsg = '';
				
				strMsg += '저장하신 조건(' + getInstcdName(gvItemCont.INSTCD) + ')과 로그인시 선택한 연구데이터의 병원구분값이 다릅니다.';
				strMsg += '<br>';
				strMsg += '계속 진행하시겠습니까?';
				
				var isRet = false;
				
				showConfirm('연구항목조회',strMsg,function(e){
					if(e){
						getQueryResultList();
						
					}else{
						return false;
						
					}
				});
			}else{
				getQueryResultList();
			}
		}else{
			getQueryResultList();
			
		}
	});
	
	/**
	 * 연구항목대상 결과 저장
	 */
	$('#btnSaveData').on('click', function(e){
		if(!isNull(gvItemCont) && gvINSTCD_YN === 'Y'){
			if(!isDiffInstcd(gvItemCont.INSTCD)){
				var strMsg = '';
				
				strMsg += '저장하신 조건(' + getInstcdName(gvItemCont.INSTCD) + ')과 로그인시 선택한 연구데이터의 병원구분값이 다릅니다.';
				strMsg += '<br>';
				strMsg += '연구조회조건 저장은 로그아웃후 동일 병원구분코드로 로그인 하시기 바랍니다.';
				
				showAlert('연구항목조회',strMsg,null);
				
				return false;
			}	
		}

		
		if(isNull(gvResult)){
			showAlert(null,COM_0037,null);	//검색결과가 없습니다.
			return;
		}
		
		
		if( isNull(gvItemCont)){
			showAlert(null,COM_0038,null);	//조회조건 또는 연구항목을 먼저 저장하시기 바랍니다.
			return;
			
		}
		
		$('#txtDATA_NM').val('');
		
		var dlg = $('#studyItemTargetModal').modal({
			handle: ".modal-header",
            backdrop:'static'
		});
		dlg.modal('show');
		
		
	});
	
//	연구항목대상 결과목록 저장	
	$('#btnSaveStudyItemTarget').on('click',function(e){
		
		//181122 저장시 # 있으면 경고창
		if($('#txtDATA_NM').val().indexOf('#') != -1){			
			alert("연구이름에는 #이 입력되지 않습니다.");
			return ;
		}
		
		var dataSet = {};
		
		dataSet.GBN_MODEL 		= 'CC';
		dataSet.GBN_TAB 		= '02';
		dataSet.TAB_CD		= 'R';
		dataSet.DATA_NM 		= $('#txtDATA_NM').val();
		dataSet.INSTCD 			= $.session.get('INSTCD');		//$.session.set('INSTCD'		,gvINSTCD);
		dataSet.PER_CODE 		= $.session.get('PER_CODE');
		
		dataSet.dsItemTableList = getSearchTableData();						//스키마, 테이블 목록
		dataSet.dsItemColumnList 	= $('#gridSearch_02').getData();			//조회조건 목록
		dataSet.dsPeriodList 	= [];										//반복관리 목록
		dataSet.dsStudyItem		= $('#gridStudyItem').getGridStudyItem();	//연구항목
		dataSet.dsItemCont 		= gvItemCont;
		dataSet.dsStudyItemTargetResult = gvResult;				//결과목록
		
	//	$('#btnSaveStudyItemTarget').attr('disabled',true);
	//	$('#btnCloseStudyItemTarget').attr('disabled',true);
		
		callService("saveResultData"
					,"research/queryResultDataStore/saveResultDataByRow"
					,dataSet,"serviceCallback_sub02");
		
		
	});
	
//	연구항목 저장	
	$('#btnStudyItemModal').on('click',function(e){
		var dataSet = {};
		
		/*dataSet.dsItemColumnList 	= getSearchConditionData();	//조회조건 목록
		dataSet.dsStudyItem			= getDtStudyItem();*/
		
		dataSet.dsItemColumnList 	= $('#gridSearch_02').getData();	//조회조건 목록
		dataSet.dsStudyItem			= $('#gridStudyItem').getGridStudyItem();
		
		if(isNull(dataSet.dsItemColumnList)){
			showAlert(null,'조회조건은 최소 한건이상 선태택하셔야 합니다.',null);
			return;
		}
		
		if(isNull(dataSet.dsStudyItem)){
			showAlert(null,'연구항목은 최소 한건이상 선태택하셔야 합니다.',null);
			return;
		}
		
	//	신규	(저장 비활성화)
		if(isNullOrEmpty(gvItemCont)){
			$('#rdoSaveSi').iCheck('disable');
			$('#rdoNewSaveSi').iCheck('enable');
			
		}else{
			$('#rdoSaveSi').iCheck('enable');
			$('#rdoNewSaveSi').iCheck('enable');
		}
		
		var dlg = $('#studyItemModal').modal();
		dlg.modal('show');
		
		
	});
	
	$('#rdoSaveSi').on('ifChecked',function(e){
		$('#txtCONDT_NM_STUDY_ITEM').val(gvItemCont.CONDT_NM);
		$('#txtCONDT_NM_STUDY_ITEM').focus();
		
	});
	
	$('#rdoNewSaveSi').on('ifChecked',function(e){
		$('#txtCONDT_NM_STUDY_ITEM').val('');
		$('#txtCONDT_NM_STUDY_ITEM').focus();
	});
	
	
	
	/*$('#btnAutoColumns_02').on('click', function(){
		$('#jqxGridResult_02_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
		$('#jqxGridResult_02_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
	});
	
	$(document).on('click', '#tabResult > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[1];
		
		$('#btnAutoColumns_02').attr('tabNum', gridNum);
		
	});*/
	
	$('#btnAutoColumns_02').on('click', function(){
		var viewFlag = $("#jqxGridResult_02_0").html();
	     
		if (viewFlag == "" || viewFlag == undefined) {
        	showAlert(null,'조회 후 시도해 주세요.',null);
            return;
            
        }else{
    		$('#jqxGridResult_02_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
    		$('#jqxGridResult_02_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
        }
	});
	
	//열너비 설정 이벤트
	$('#btnWidthColumns_02').on('click', function(){
		var viewFlag = $("#jqxGridResult_02_0").html();
	     
		if (viewFlag == "" || viewFlag == undefined) {
        	showAlert(null,'조회 후 시도해 주세요.',null);
            return;
            
        }else{
    		$('#popColumnAlignModal').modal('show');
        }
	});
	
	$(document).on('click', '#tabResult_02 > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[2];
		
		$('#btnAutoColumns_02').attr('tabNum', gridNum);
		
	});
	
	
}

//------------------------------------------------------------------------------------------
//TRANSACTION	
//------------------------------------------------------------------------------------------
function getQueryResultList()
{
	var dataSet = {};
	var dsCcMgmtInfo = {};
	
	dsCcMgmtInfo = $('#frmCcMgmt').formToJson();
	
	dataSet.GBN_MODEL 	= 'CC';
	dataSet.GBN_TAB 	= '02';
	dataSet.CC_POP_NUM 	= nvl(dsCcMgmtInfo.CC_POP_NUM,'');			//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = nvl(dsCcMgmtInfo.CC_CASE_NUM,'');			//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= nvl(dsCcMgmtInfo.CC_SAM_NUM,'');			//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= nvl(dsCcMgmtInfo.CC_CONT_CD,'');			//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= nvl(dsCcMgmtInfo.CC_MAT_CD,'');			//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.CC_AGE_NUM  = nvl(dsCcMgmtInfo.CC_AGE_NUM,'');
	
	dataSet.dsItemTableList 	= getSearchTableData();									//스키마, 테이블 목록
	dataSet.dsItemColumnList 	= $('#gridSearch_02').getData();						//조회조건 목록
	dataSet.dsPeriodList 		= [];													//반복관리 목록
	dataSet.dsStudyItem			= $('#gridStudyItem').getGridStudyItem();				//연구항목
	dataSet.dsCaseGroupList		= $('#gridCaseGroup_02').getGridCaseControl();			//사례군
	dataSet.dsControlGroupList  = $('#gridControlGroup_02').getGridCaseControl();		//대조군
	
	callService("searchStudyItemTargetList"
				,"research/casctrl/searchStudyItemTargetList"
				,dataSet
				,"serviceCallback_sub02");
}

/**
 * 연구항목 조건저장
 * @returns
 */
function saveQueryStudyItemConditions(){

	var dataSet = {};
	var dsCcMgmtInfo = {};
	var dsItemContDetlList 	= [];
	var dsPeriodList 		= [];
	var dsStudyItemList 	= [];
	var dsCaseGroupList		= [];
	var dsControlGroupList	= [];
	
	dataSet.MODE = $('input:radio[name="rdoSaveStudyItem"]:checked').val();
	
	
	gvCommand = dataSet.MODE;
	
	dsCcMgmtInfo = $('#frmCcMgmt').formToJson();
	
//	ITEM_CONT	
	if(isNullOrEmpty(gvItemCont) || $('#selSHARE_CD').val() != 'P'){
		dataSet.SEQ = '';
	}else{
		dataSet.SEQ = gvItemCont.SEQ;
	}
	
	dataSet.SHARE_CD	= 'P';									//공유조건(P:개인, A:전체, D:과)
	dataSet.PER_CODE	= $.session.get('PER_CODE');			//사용자ID
	dataSet.CONDT_NM 	= $('#txtCONDT_NM_STUDY_ITEM').val();	//연구조건명
	dataSet.METH_CD 	= 'CC';									//연구종료(CS:단면,CC:사례대조,CH:코호트)
	dataSet.SAVE_CD 	= 'SI';									//저장코드 : 연구항목(SI)
	
	dataSet.CC_POP_NUM 	= nvl(dsCcMgmtInfo.CC_POP_NUM,'0');			//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = nvl(dsCcMgmtInfo.CC_CASE_NUM,'0');			//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= nvl(dsCcMgmtInfo.CC_SAM_NUM,'0');			//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= nvl(dsCcMgmtInfo.CC_CONT_CD,'');			//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= nvl(dsCcMgmtInfo.CC_MAT_CD,'');			//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.CC_AGE_NUM  = nvl(dsCcMgmtInfo.CC_AGE_NUM,'0');
	
	dsItemContDetlList	= $('#gridSearch_02').getData();		//조회조건
	dsPeriodList 		= [];
	dsStudyItemList		= $('#gridStudyItem').getGridStudyItem();
	dsCaseGroupList		= $('#gridCaseGroup_02').getGridCaseControl();
	dsControlGroupList	= $('#gridControlGroup_02').getGridCaseControl();
	dataSet.INSTCD 		= $.session.get('INSTCD');		//$.session.set('INSTCD'		,gvINSTCD);
	
	
	
//	연구항목	
	for(var i=0; i < dsStudyItemList.length; i++){
		var ds = dsStudyItemList[i];
		dsItemContDetlList.push(ds);
		
	}
	
	
//	대조군	
	for(var i=0; i < dsCaseGroupList.length; i++){
		var ds = dsCaseGroupList[i];
		dsItemContDetlList.push(ds);
		
	}
	
	
//	사례군	
	for(var i=0; i < dsControlGroupList.length; i++){
		var ds = dsControlGroupList[i];
		dsItemContDetlList.push(ds);
		
	}	
	
	//RANGE_DN 빈값0처리
	for(var i=0; i<dsItemContDetlList.length; i++){
		if(dsItemContDetlList[i]['RANGE_DN'] == ''){
			dsItemContDetlList[i]['RANGE_DN'] = 0;
		}
		
		if(dsItemContDetlList[i]['CNT'] == ''){
			dsItemContDetlList[i]['CNT'] = 0;
		}
	}
	
	dataSet.dsItemContDetlList = dsItemContDetlList;
	
	callService( "saveQueryStudyItemConditions"
				,"research/sharingconditions/saveQueryConditions"
				,dataSet,"serviceCallback_sub02");
	
	/*callService("saveItemContDetl"
			,"research/crossSectionalStudy/saveItemContDetl"
			,dataSet
			,"serviceCallback_sub02");*/
}



