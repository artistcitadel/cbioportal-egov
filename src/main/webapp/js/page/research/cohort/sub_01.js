var gvResult = [];	//조회결과 


/**
 * Application Ready
 */
$(document).ready(function(){
	init_sub01();
	initEvent_sub01();
	
    
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
var gvDataSourcePeriod;

function serviceCallback_sub01(svcId, result){
	switch(svcId){
		case "insertSearchCondition":
			BootstrapDialog.alert(COM_0001, function(){
				$('#btnClose').trigger('click');
	        });
			
			break;
			
	
			
		//조건저장		
		case "saveItemContDetl":
			showAlert('환자선택 조건저장', COM_0001, function(e){
				$('#btnClose').trigger('click');
				
				var dataSet = {};
				
				dataSet.SEARCH_ITEM_CONT_SEQ=result.SEQ;
				
				getItemContDetlList(dataSet);
				
				getItemContTreeList();
				
			});
			
			break;
			
		//조회조건 저장 콜백	
		case "saveQueryConditions":
			showAlert('환자선택 조건저장', COM_0001, function(e){
				$('#btnClose').trigger('click');
				
				var dataSet = {};
				dataSet.SEARCH_ITEM_CONT_SEQ=result.SEQ;
				getItemContDetlList(dataSet);
				
				getItemContTreeList();
				
			});
			
			break;
			
	//	환자선택 검색결과		
		case "searchPatient":
			drawPatientResult(result);
			
			break;
			
		
		
		default:
			break;
	}
		
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init_sub01()
{
	makeiCheck('.rdoSaveSc');
	
	
}









//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------

$(document).on('click','#gridSearch_01 tbody td',function(e){
	$('#gridSearch_01').deleteRow(this);
});


//조회조건 삭제
/*$('#gridSearch_01 tbody').on('click','td',function () {
	
	
});*/



/**
 * 이벤트 초기화
 * @returns
 */
function initEvent_sub01()
{
	/**
	 * 초기화
	 */
	$('#btnInit').on('click',function(e){
		var table = $('#gridSearch_' + gvActiveTab).DataTable();
				
		if(!isNull(table.rows().data()) || !isNull(rows) || !isNull(gvResult)){
			if(!confirm('기존에 설정하신 조건 또는 데이터는 초기화 됩니다.\n계속하시겠습니까?')){
				return;	
			}
		}
		//조건저장 체크박스 초기세팅 20170901 by 최종호
		gvItemCont = "";
		
		
		var rows = table.rows().data();
		
		for(var i = rows.length; i > 1; i--){
			console.log(table.rows(i).data());
			table.rows(i).remove().draw();
		}
		
		$('#tabResult').html('');
		$('#jqxGridResultWrap').html('');
		
		gvGrpIdx = 0;
		
		gvResult = [];
		
		updateGroupIdx();
		
		//연구항목 데이터 초기화 20190402 by 정고은
		$('#lblResultInfo_01').html('');
	});
	
	
	
	
	/**
	 * 그룹초기화
	 */
	$('#btnGroupInit').on('click',function(e){
		$('#gridSearch_01').groupInit();
		
	});
	
	
	/**
	 * 조회조건 저장 modal call
	 */
	$('#btnSearchConditionModal').on('click',function(e){
		//-----------------------------------------------------------	
		//병원구분코드체크
		if(gvINSTCD_YN === 'Y' && !isNull(gvItemCont)){
			if(!isDiffInstcd(gvItemCont.INSTCD)){
				var strMsg = '';
				
				strMsg += '저장하신 조건(' + getInstcdName(gvItemCont.INSTCD) + ')과 로그인시 선택한 연구데이터의 병원구분값이 다릅니다.';
				strMsg += '<br>';
				strMsg += '연구조회조건 저장은 로그아웃후 동일 병원구분코드로 로그인 하시기 바랍니다.';
				
				showAlert('연구조회',strMsg,null);
				
				return false;
			}	
		}
		
		
		var table = $('#gridSearch_' + gvActiveTab).DataTable();
		

		if(isNull(table.rows().data())){
			showAlert(null,'조회조건은 ' + COM_0031,null); 	//연구항목은 최소 한건 이상이어야 합니다.
			return;
		}
		
		$('#selSHARE_CD').val('P');

		//if(isNullOrEmpty(gvItemCont)){
		//조건저장 체크박스 초기세팅 20170901 by 최종호  // A : 전체공유,  D : 과공유,  S : 개인공유
		if(isNullOrEmpty(gvItemCont) || gvItemCont.SHARE_CD=="A" || gvItemCont.SHARE_CD=="D" || gvItemCont.SHARE_CD=="S"){
			$('#txtITEM_CONT_SEQ').val('');
			$('#txtCONDT_NM').val('');
			
			$('#rdoSaveSc').iCheck('disable');
			$('#rdoNewSaveSc').iCheck('enable');
			$('#rdoNewSaveSc').iCheck('check');
			
		}else{
			$('#txtITEM_CONT_SEQ').val(gvItemCont.SEQ);
			$('#txtCONDT_NM').val(gvItemCont.CONDT_NM);
			
			$('#rdoSaveSc').iCheck('enable');
			$('#rdoSaveSc').iCheck('check');
			$('#rdoNewSaveSc').iCheck('enable');
			
		}
		
		var dlg = $('#searchConditionModal');
		dlg.find('.modal-title').text('조회조건 저장');
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.modal('show');
		
		
	});
	
	
	$('#rdoSaveSc').on('ifChecked',function(e){
		$('#txtCONDT_NM').val(gvItemCont.CONDT_NM);
		$('#txtCONDT_NM').focus();
		$('#txtCONDT_NM').prop('disabled',true);
		
	});
	
	$('#rdoNewSaveSc').on('ifChecked',function(e){
		$('#txtCONDT_NM').val('');
		$('#txtCONDT_NM').focus();
		$('#txtCONDT_NM').prop('disabled',false);
	});
	
	
	
	/**
	 * 환자선택 조회
	 */
	$('#btnSearch').on('click',function(e){
		var table = $('#gridSearch_' + gvActiveTab).DataTable();
		
		if(isNull(table.rows().data())){
			showAlert(null,'조회조건을 설정하시기 바랍니다.',null);
			return;
		}
		
		
	//	기준일자 체크	
		if(!isBaseDtCheck()){
			showAlert(null,'기준일은 반드시 하나이상 설정하시기 바랍니다.',null);
			return ;
		}
		
		//기존저장된 데이터가 있으면
		if(!isNull(gvItemCont)){
			if(gvINSTCD_YN === 'Y' && !isDiffInstcd(gvItemCont.INSTCD)){
				var strMsg = '';
				
				strMsg += '저장하신 조건(' + getInstcdName(gvItemCont.INSTCD) + ')과 로그인시 선택한 연구데이터의 병원구분값이 다릅니다.';
				strMsg += '<br>';
				strMsg += '계속 진행하시겠습니까?';
				
				var isRet = false;
				
				showConfirm('연구조회',strMsg,function(e){
					if(e){
						getPatientList();
						
					}else{
						return false;
						
					}
				});
			}else{
				getPatientList();
			}
		}else{
			getPatientList();
			
		}
		
		
		
		
		
	});
	
		
	$('#btnDownload').on('click',function(e){
		location.href = "/bigcenmed2/excel/download";
		
		/*$.ajax({
			type: 'POST',
			url: "/bigcenmed2/excel/download",
			dataType: 'json',
			//contentType: "application/xlxs", 
			data: null, 
			beforeSend : function(xhr){
				xhr.setRequestHeader("isAjax", "true");
				xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
				
			},
			success : function(data){
				console.log(result);
			
			},
			error:function(request,status,error){
				
		    }
		});*/
		
	});
	
	/*$('#btnAutoColumns_01').on('click', function(){
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
	});*/
	
	$('#btnAutoColumns_01').on('click', function(){
		var viewFlag = $("#jqxGridResult_0").html();
	     
		if (viewFlag == "" || viewFlag == undefined) {
        	showAlert(null,'조회 후 시도해 주세요.',null);
            return;
            
        }else{
    		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
    		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
        }
	});
	
	//열너비 설정 이벤트
	$('#btnWidthColumns_01').on('click', function(){
		var viewFlag = $("#jqxGridResult_0").html();
	     
		if (viewFlag == "" || viewFlag == undefined) {
        	showAlert(null,'조회 후 시도해 주세요.',null);
            return;
            
        }else{
    		$('#popColumnAlignModal').modal('show');
        }
	});
	
	$(document).on('click', '#tabResult > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[1];
		
		$('#btnAutoColumns_01').attr('tabNum', gridNum);
		
	});
	
	
}


function onBtnSaveCohort(){
	if(isNull($('#txtCONDT_NM').val())){
		showAlert('조회조건 저장','조회조건명은 ' + COM_0010,null);	//필수항목입니다.
		return;
	}
	
	//새이름으로 저장시 중복체크	
	if($('input:radio[name="rdoSaveSc"]:checked').val() === 'C'){
		chkDuplCondNmList($('#txtCONDT_NM').val());	//researchCommon.js에서 실행
		
		//중복된 조건명이 있으면	
		if(gvChkDuplCondNmList.length > 0){
			showAlert('조회조건 저장', COM_0045, null);	//중복된 조건이 있습니다.다른 명칭으로 저장해 주시기 바랍니다.
			return;
			
		}else{
			saveQueryConditions();
			
		}
	}else{
		saveQueryConditions();
		
	}
	
}



//------------------------------------------------------------------------------------------
//TRANSACTION	
//------------------------------------------------------------------------------------------
function getPatientList()
{
	if(!$('#gridSearch_01').validDate()){
		showAlert(null,COM_0032,null);
		return;
	}
	
	var dataSet = {};
	
	dataSet.GBN_MODEL 	= 'CH';
	dataSet.GBN_TAB 	= '01';
	
	dataSet.dsItemTableList 	= getSearchTableData();		//스키마, 테이블 목록
	dataSet.dsItemColumnList 	= $('#gridSearch_01').getData();	//조회조건 목록
	dataSet.dsPeriodList 		= [];			//반복관리 목록(getPeriodList)
	dataSet.dsStudyItem			= [];			//연구항목(getDtStudyItem())
	
	callService("searchPatient"
			,"research/cohort/searchPatient"
			,dataSet
			,"serviceCallback_sub01");

}



function saveQueryConditions(){
	var dataSet 			= {};
	var dsList 				= [];
	var dsSearchList 		= [];
	var dsPeriodList 		= [];
	var dsStudyItemList 	= [];
	var dsEventList 		= [];		//사건정의
	var dsCensoredDataList 	= [];		//중도절단
	
	var saveTypeCd 	= '';		//저장구분코드
	
	
	if(isNull($('#txtCONDT_NM').val())){
		alert('조회조건명은 ' + COM_0010);	//필수항목입니다.
		return;
	}
	
	dataSet.MODE = $('input:radio[name="rdoSaveSc"]:checked').val();
	
	gvCommand = dataSet.MODE;
	
	
//	ITEM_CONT	

//	ITEM_CONT	
	if(isNullOrEmpty(gvItemCont) || $('#selSHARE_CD').val() != 'P'){
		dataSet.SEQ = '';
		
		if( gvActiveTab === '01'){
			dataSet.SAVE_CD = 'SC';
			
		}else if(gvActiveTab === '02'){
			dataSet.SAVE_CD = 'SI';
			
		}
		
	}else{
		dataSet.SEQ = gvItemCont.SEQ;
		dataSet.SAVE_CD = gvItemCont.SAVE_CD;
	}
	
	
	dataSet.SHARE_CD	= $('#selSHARE_CD').val();		//공유조건(P:개인, A:전체, D:과)
	dataSet.PER_CODE	= $.session.get('PER_CODE');	//사용자ID
	dataSet.DEPT_CODE	= $.session.get('DEPT_CODE');	//부서코드
	dataSet.CONDT_NM 	= $('#txtCONDT_NM').val();		//연구조건명
	dataSet.METH_CD 	= 'CH';							//연구종료(CS:단면,CC:사례대조,CH:코호트)
	dataSet.CC_POP_NUM 	= '0';							//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = '0';							//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= '0';							//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= '';							//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= '';							//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.INSTCD 		= $.session.get('INSTCD');		//$.session.set('INSTCD'		,gvINSTCD);
	
	dsSearchList		= $('#gridSearch_01').getData();							//검색조건
	dsStudyItemList		= $('#gridStudyItem').getGridStudyItem();					//연구항목
	dsEventList 		= $('#gridEventList').getGridSurvivalAnalysis();			//사건정의
	dsCensoredDataList 	= $('#gridCensoredDataList').getGridSurvivalAnalysis();		//중도절단
	
	
//	조건
	for(var i=0; i < dsSearchList.length; i++){
		var ds = dsSearchList[i];
		dsList.push(ds);
	}
	
	
//	연구항목	
	for(var i=0; i < dsStudyItemList.length; i++){
		var ds = dsStudyItemList[i];
		dsList.push(ds);
		
	}
	
//	사건정의	
	for(var i=0; i < dsEventList.length; i++){
		var ds = dsEventList[i];
		dsList.push(ds);
		
	}
	
//	생존분석	
	for(var i=0; i < dsCensoredDataList.length; i++){
		var ds = dsCensoredDataList[i];
		dsList.push(ds);
		
	}
	
	//RANGE_DN 빈값0처리
	for(var i=0; i<dsList.length; i++){
		if(dsList[i]['RANGE_DN'] == ''){
			dsList[i]['RANGE_DN'] = 0;
		}
		
		if(dsList[i]['CNT'] == ''){
			dsList[i]['CNT'] = 0;
		}
	}
	
	dataSet.dsItemContDetlList = dsList;
	
	callService( "saveQueryConditions"
				,"research/sharingconditions/saveQueryConditions"
				,dataSet,"serviceCallback_sub01");
	
	/*callService( "saveQueryConditions"
			,"research/sharingconditions/saveQueryConditions"
			,dataSet,"serviceCallback_sub01");*/
}


