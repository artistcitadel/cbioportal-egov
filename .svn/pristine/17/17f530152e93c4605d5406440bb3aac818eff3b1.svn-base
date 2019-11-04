var gvDate;
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
			
	//	반복데이터 생성		
		case "getItemMgmtList":
			if(typeof result.dsItemMgmtList === 'undefined'){
				return;
			}
			
			$('#btnRepeatClose').trigger('click');
			
			var dsList = [];
			
			for(var i=0; i < result.periodCount; i++){
				var ds = $.extend({},result.dsItemMgmtList[0]);
				
				ds.AND_OR = (i+1) + '주기';
				ds.TAB_CD = 'P';
				ds.INPUT_VAL0 = 'DAY';
				ds.INPUT_VAL1 = gvDate;
				ds.INPUT_VAL2 = gvDate;
				
				
				printJSON(ds);
				
				dsList.push(ds);
				
			}
			
			var table = $('#gridPeriod_' + gvActiveTab).DataTable();
			table.rows().remove().draw();
			table.rows.add(dsList).draw();
			
			$('#divPeriodWrap_01').css('display','block');
			$('#btnRepeatDataInit').attr('disabled',false);
			
			break;
			
			
	//	검색결과		
		case "searchPatient":
			drawPatientResult(result);
			break;
			
	//	조회조건저장		
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
				
			
	//	2017/07/24 추가		
	//	단면연구 환자선택 저장 (차트리뷰)		
		case "savePatientSelect":
			var strMsg = '';
			strMsg = '환자선택 조회결과 저장은 ';
			strMsg += '차트리뷰에서 확인 가능합니다.<br>';
			strMsg += '차트리뷰화면으로 이동하시겠습니까?';
						
			
			showConfirm('환자선택 조회 결과 저장',strMsg, function(e){
				if(e){
					location.href = gvCONTEXT + '/research/chartReview/chartReviewMain';
					
				}else{
					var dataSet = {};
					dataSet.SEARCH_ITEM_CONT_SEQ=result.SEQ;
					
					getItemContDetlList(dataSet);
					getItemContTreeList();
				}
			});
			
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


/**
 * 반복데이터 삭제
 */
$(document).on('click','#gridPeriod_01 tbody td',function(e){
	var table = $('#gridPeriod_01').DataTable();
	var target = e.target;
	var td = target.parentNode.parentNode.parentNode.parentNode.parentNode;	//i > span > div > div > div > td

	
	var cells 	= table.cell(td);
	var nodes 	= table.row($(td).parents('tr')).node();
	var rows 	= table.row($(td).parents('tr'));
	
	var cellIdx	= cells[0][0].column;
	var currRow	= cells[0][0].row;
	
	if(cellIdx != 6){
		return;
	}
	
	
	table.row(currRow).remove().draw();
	
	
});


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
		
		var cnt1 = $('#gridSearch_01').getRowCount();
		var cnt2 = $('#gridPeriod_01').getRowCount();
		
		if(!cnt1 > 0 || cnt2 > 0){
			if(!confirm('기존에 설정하신 조건 또는 데이터는 초기화 됩니다.\n계속하시겠습니까?')){
				return;	
			}
		}
		//조건저장 체크박스 초기세팅 20170901 by 최종호
		gvItemCont = "";
		
		$('#gridSearch_01').initGrid();
		$('#gridPeriod_01').initGrid();
		
		$('#divPeriodWrap_01').css('display','none');
		$('#tabResult').html('');
		$('#jqxGridResultWrap').html('');
		
		gvGrpIdx = 0;
		
		gvResult = [];
		
		updateGroupIdx();
		
	});
	
	
	
	
	/**
	 * 그룹초기화
	 */
	$('#btnGroupInit').on('click',function(e){
		$('#gridSearch_01').groupInit();
	});
	
	
	/**
	 * 반복데이터관리 Modal	
	 */
	$('#btnRepeatData').on('click',function(e){
		setComboList('selRepeatTarget', gvPeriodCdList, 'VALUE', 'TEXT', '', '');	//항목선택
		
		$('#selRepeateCount').val('2');
		
		var dlg = $('#modalRepeat').modal();
		dlg.find('.modal-title').text('반복데이터 관리');
		dlg.modal('show');
	});
	
	
	/**
	 * 반복데이터 생성	
	 */
	$('#btnRepeatCreate').on('click',function(e){
		var rows = $("#jqxGridPeriod_" + gvActiveTab).jqxGrid('getrows');
		
		if(!isNull(rows)){
			if(!confirm('기존 반복데이터가 있습니다.\n계속 하시겠습니까?')){
				return;
			}
		}
 
		
		var dataSet = {};
		
		dataSet.SEARCH_PERIOD_COLUMN = $('#selRepeatTarget').val();
		dataSet.SEARCH_PERIOD_COUNT = $('#selRepeateCount').val();
		
		callService( "getItemMgmtList"
				,"common/sys/getItemMgmtList"
				,dataSet
				,"serviceCallback_sub01");
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
		$('#txtCONDT_NM').val(nvl(gvItemCont.CONDT_NM,''));
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
	
		
	$('#btnRepeatDataInit').on('click',function(e){
		var table = $('#gridPeriod_' + gvActiveTab).DataTable();
		table.rows().remove().draw();
		$('#divPeriodWrap_01').css('display','none');
		$(this).attr('disabled',true);
		
	});
	
	$('#btnSavePatientData').on('click',function(e){
		//btnSavePatientData
		
		if( isNull(gvItemCont)){
			showAlert(null,'조회조건 또는 연구항목을 먼저 저장하시기 바랍니다.',null);
			return;
			
		}
		
		
		if(gvItemCont.SHARE_CD === 'A' || gvItemCont.SHARE_CD === 'D'){
		//	전체공유 또는 과공유 조건은 데이터를 저장할 수 없습니다.<br>개인조건 저장후 데이터를 저장 하시기 바랍니다.	
			showAlert(null,COM_0036,null);	
			return;
		}
		
		
	//	검색결과 체크 gvResult[0].dsList	
		if(isNull(gvResult)){
			showAlert(null,'검색결과가 없습니다.',null);
			return;
		}
		
		$('#txtPAT_DATA_NM').val('');
		
		
		var dlg = $('#patientSelectDataModal').modal({
			handle: ".modal-header",
            backdrop:'static'
		});
		dlg.modal('show');
		
		
		
	});
	
	
	$('#btnSavePatientSelectResult').on('click',function(e){
		
		if($('#txtPAT_DATA_NM').val().indexOf('#') != -1){			
			alert("연구 이름에는 #이 입력되지 않습니다.");
			return ;
		}
		savePatientData();
		
	});
	
	$('#btnAutoColumns_01').on('click', function(){
		var viewFlag = $("#tabResult_0").html();
	     
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
		var viewFlag = $("#tabResult_0").html();
	     
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




function onBtnSaveCrssec(){
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
//	TRANSACTION	
//------------------------------------------------------------------------------------------
function getPatientList()
{
	if(!$('#gridSearch_01').validDate()){
		showAlert(null,COM_0032,null);
		return;
	}
	
	if(!$('#gridPeriod_01').validDate()){
		showAlert(null,COM_0032,null);
		return;
	}
	
	var dataSet = {};
	
	dataSet.GBN_MODEL 	= 'CS';
	dataSet.GBN_TAB 	= '01';
	
//	dataSet.dsItemTableList 	= getSearchTableData();		//스키마, 테이블 목록
	dataSet.dsItemColumnList 	= $('#gridSearch_01').getData();		//조회조건 목록
	dataSet.dsPeriodList 		= $('#gridPeriod_01').getGridPeriod();		//반복관리 목록
	dataSet.dsStudyItem			= $('#gridStudyItem').getGridStudyItem();

	console.log(dataSet);
	
	callService("searchPatient"
			,"research/crossSectionalStudy/searchPatient"
			,dataSet
			,"serviceCallback_sub01");
}


function savePatientData()
{
	var dataSet = {};
	
	dataSet.GBN_MODEL 	= 'CS';
	dataSet.GBN_TAB 	= '01';
	dataSet.TAB_CD		= 'C';
	dataSet.INSTCD 		= $.session.get('INSTCD');		//$.session.set('INSTCD'		,gvINSTCD);
	dataSet.PER_CODE	= $.session.get('PER_CODE');	
	dataSet.DATA_NM 	= $('#txtPAT_DATA_NM').val();
	
	dataSet.dsItemColumnList 	= $('#gridSearch_01').getData();			//조회조건 목록
	dataSet.dsPeriodList 		= $('#gridPeriod_01').getGridPeriod();	//반복관리 목록
	dataSet.dsStudyItem			= $('#gridStudyItem').getGridStudyItem();
	
	dataSet.dsItemCont 			= gvItemCont;
	dataSet.dsStudyItemTargetResult = gvResult;				//결과목록
	
	$('#btnSaveStudyItemTarget').attr('disabled',true);
	$('#btnCloseStudyItemTarget').attr('disabled',true);
	
	
	callService("savePatientSelect","/research/queryResultDataStore/saveResultData"
				,dataSet
				,"serviceCallback_sub01");
	
}




/**
 * 조회조건 저장
 * @returns
 */
function saveQueryConditions(){
	var dataSet = {};
	var dsItemContDetlList = [];
	var dsPeriodList = [];
	
	dataSet.MODE = $('input:radio[name="rdoSaveSc"]:checked').val();
	
	gvCommand = dataSet.MODE;
	
	
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
	dataSet.METH_CD 	= 'CS';							//연구종료(CS:단면,CC:사례대조,CH:코호트)
	dataSet.CC_POP_NUM 	= '';							//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = '';							//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= '';							//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= '';							//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= '';							//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.INSTCD 		= $.session.get('INSTCD');		//$.session.set('INSTCD'		,gvINSTCD);
	
	dsItemContDetlList	= $('#gridSearch_01').getData();
	dsPeriodList		= $('#gridPeriod_01').getGridPeriod();
	dsStudyItemList 	= $('#gridStudyItem').getGridStudyItem();
	
	for(var i=0; i < dsPeriodList.length; i++){
		var ds = dsPeriodList[i];
		dsItemContDetlList.push(ds);
		
	}

	for(var i=0; i < dsStudyItemList.length; i++){
		var ds = dsStudyItemList[i];
		dsItemContDetlList.push(ds);
		
	}
	
	dataSet.dsItemContDetlList = dsItemContDetlList;
	
	callService( "saveQueryConditions"
				,"research/sharingconditions/saveQueryConditions"
				,dataSet,"serviceCallback_sub01");
}


