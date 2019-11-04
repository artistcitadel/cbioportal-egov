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


function serviceCallback_sub01(svcId, result)
{
	if(result.ERR_CD != 0){
		return;
	}
	
	switch(svcId){
	//	환자선택 검색결과
		case "searchPatient":
			drawPatientResult(result);
			break;
			
		case "saveQueryConditions": 	//"saveItemContDetl":
			showAlert('환자선택 조건저장', COM_0001, function(e){
				$('#btnClose').trigger('click');
				
				var dataSet = {};
				
				dataSet.SEARCH_ITEM_CONT_SEQ=result.SEQ;
				
				getItemContDetlList(dataSet);
				
				getItemContTreeList();
				
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



$(document).on('click','#gridCaseGroup_01 tbody td',function(e){
	var table1 = $('#gridCaseGroup_' + gvActiveTab).DataTable();
	var table2 = $('#gridControlGroup_' + gvActiveTab).DataTable();
	
	var cell = table1.cell(this);
	var cellInfo = cell[0];
	
	var cellIdx = cellInfo[0].column;
	var delRow = cellInfo[0].row;
	
	$('#gridCaseGroup_01').deleteRow(this);
	
	if(cellIdx != 8){
		return;
		
	}
	
	
	table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data1 = this.data();
		var node1 = this.node();
		
		var node2 = table2.row(rowIdx).node();
		
		var cell1 = node1.cells[0];
		var cell2 = node2.cells[0];
		
		$(cell2).html($(cell1).html());
		
	});
	
	table2.row(delRow).remove().draw();
	
	table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell0 = node.cells[0];
		
		$(node).find("td input").each(function (){
			if(this.name.indexOf("txtGRP_CA") >= 0){
				
				if(this.value > 0){
					var max = $('#gridCaseGroup_' + gvActiveTab).getMaxGrpIdx(this.value);
					var min = $('#gridCaseGroup_' + gvActiveTab).getMinGrpIdx(this.value);
					
					var html = '';
					
					html = '<i class="ion-ios-plus-outline grouping"';
					html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
					html += ' id="row_'+rowIdx+'_groupBtn"';
					html += ' onclick="funcGrouping(this,' + rowIdx + ',4)">';
					html += '</i>';
					
					if(min == rowIdx){
						html += '<span class="text-danger"> ┌</span>';
						
					}else if(max == rowIdx){
						html += '<span class="text-danger"> └</span>';
						
					}else{
						html += '<span class="text-danger"> │</span>';
					}
					
					html += '<input type="'+hidden+'" ';
					html += 'name="txtGRP_CA_' + rowIdx+'" ';
					html += 'id="txtGRP_CA_'+rowIdx+'" ';
					html += 'value="'+this.value+'" style="width:40px;">';
					
					$(cell0).html(html);
				}
			}
		});
	});
	
	table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell0 = node.cells[0];
		
		$(node).find("td input").each(function (){
			if(this.name.indexOf("txtGRP_CO") >= 0){
				
				if(this.value > 0){
					var max = $('#gridControlGroup_' + gvActiveTab).getMaxGrpIdx(this.value);
					var min = $('#gridControlGroup_' + gvActiveTab).getMinGrpIdx(this.value);
					
					var html = '';
					
					html = '<i class="ion-ios-plus-outline grouping"';
					html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
					html += ' id="row_'+rowIdx+'_groupBtn"';
					html += ' onclick="funcGrouping(this,' + rowIdx + ',5)">';
					html += '</i>';
					
					if(min == rowIdx){
						html += '<span class="text-danger"> ┌</span>';
						
					}else if(max == rowIdx){
						html += '<span class="text-danger"> └</span>';
						
					}else{
						html += '<span class="text-danger"> │</span>';
					}
					
					html += '<input type="'+hidden+'" ';
					html += 'name="txtGRP_CO_' + rowIdx+'" ';
					html += 'id="txtGRP_CO_'+rowIdx+'" ';
					html += 'value="'+this.value+'" style="width:40px;">';
					
					$(cell0).html(html);
				}
			}
		});
	});	
});



var gvCcMgmtInfo = {};

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
		var table1 = $('#gridSearch_' + gvActiveTab).DataTable();
				
		if(!isNull(table1.rows().data()) || !isNull(gvResult)){
			if(!confirm('기존에 설정하신 조건 또는 데이터는 초기화 됩니다.\n계속하시겠습니까?')){
				return;	
			}
		}
		
		//조건저장 체크박스 초기세팅 20170901 by 최종호
		gvItemCont = "";
		
		table1.clear().draw();
		
		$('#divPeriodWrap_01').css('display','none');
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
	 * 그룹초기화
	 */
	$('#btnGroupInitCase').on('click',function(e){
		$('#gridCaseGroup_01').groupInit();
		
		//대조군 그룹 초기화
		$('#gridControlGroup_01').groupInit();
		
		var table1 = $('#gridCaseGroup_' + gvActiveTab).DataTable();
		var table2 = $('#gridControlGroup_' + gvActiveTab).DataTable();
		
		table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var data1 = this.data();
			var node1 = this.node();
			var node2 = table2.row(rowIdx).node();
			
			var cell1 = node1.cells[0];
			var cell2 = node2.cells[0];
			
			$(cell2).html($(cell1).html());
		});
		
	});
	
	
	$('#btnInitCase').on('click',function(e){
		var table1 = $('#gridCaseGroup_' + gvActiveTab).DataTable();
		var table2 = $('#gridControlGroup_' + gvActiveTab).DataTable();
				
		if(!isNull(table1.rows().data()) || !isNull(gvResult)){
			if(!confirm('기존에 설정하신 조건 또는 데이터는 초기화 됩니다.\n계속하시겠습니까?')){
				return;	
			}
		}
		
		table1.clear().draw();
		table2.clear().draw();
		
		$('#divPeriodWrap_01').css('display','none');
		$('#tabResult').html('');
		$('#jqxGridResultWrap').html('');
		
		gvGrpIdx = 0;
		gvResult = [];
		updateGroupIdx();
		
		//연구항목 데이터 초기화 20190402 by 정고은
		$('#lblResultInfo_01').html('');
		
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
			showAlert(null,'조회조건을 설정하시기 바랍니다.',null);
			return;
		}
		
		$('#selSHARE_CD').val('P');

		//if(isNullOrEmpty(gvItemCont)){
		//조건저장 체크박스 초기세팅 20170901 by 최종호 // A : 전체공유,  D : 과공유,  S : 개인공유
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
	
	$('#btnControlModal').on('click',function(e){
		var dlg = $('#controlGroupModal').modal();
		dlg.find('.modal-title').text('대조군 관리');
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.modal('show');
		
		if(isNull(gvItemCont)){
			$('#selCC_CONT_CD').val('1');
			$('#selCC_MAT_CD').val('N');
				
		}else{
			$('#selCC_CONT_CD').val(gvItemCont.CC_CONT_CD);
			$('#selCC_MAT_CD').val(gvItemCont.CC_MAT_CD);
			
			if(gvItemCont.CC_MAT_CD === 'AM' || gvItemCont.CC_MAT_CD === 'ASM'){
				$('#txtCC_AGE_NUM').attr('disabled',false);
				
			}else{
				$('#txtCC_AGE_NUM').attr('disabled',true);
				
			}
		}
		
	});
	
	
	/**
	 * 대조군관리 적용버튼이벤트
	 */
	$('#btnSaveControlGroup').on('click',function(event){
		var caseNum = Number(nvl($('#txtCC_CASE_NUM').val(),'0'));
		var samNum = Number(nvl($('#txtCC_SAM_NUM').val(),'0'));
		
		
		if(samNum > caseNum){
			showAlert('대조군관리','샘플링 숫자가 사례군 숫자보다 ' + COM_0034, null);
			return;
			
		}
		
		var dlg = $('#controlGroupModal').modal();
		dlg.modal('hide');
		
		
	});
	
	
	//모달창 close event
	$('#controlGroupModal').on('hidden.bs.modal', function (e) {
		//gvItemCont = {};
		
		gvItemCont.CC_POP_NUM 	= $('#txtCC_POP_NUM').val();
		gvItemCont.CC_CASE_NUM 	= $('#txtCC_CASE_NUM').val();
		gvItemCont.CC_SAM_NUM 	= $('#txtCC_SAM_NUM').val();
		gvItemCont.CC_CONT_CD 	= $('#selCC_CONT_CD').val();
		gvItemCont.CC_MAT_CD 	= $('#selCC_MAT_CD').val();
		gvItemCont.CC_AGE_NUM 	= $('#txtCC_AGE_NUM').val();
		
		
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
	
	//환자선택조회
	$('#btnSearch').on('click',function(e){
		var table1 = $('#gridSearch_' + gvActiveTab).DataTable();
		var table2 = $('#gridCaseGroup_' + gvActiveTab).DataTable();
		
		
		if( table1.rows().count() < 1){
			showAlert(null,'조회조건은  ' + COM_0031,null);	//~~~최소 한건이상 있어야 합니다.
			return;
		}
		
		
		if( table2.rows().count() < 1){
			showAlert(null,'사례군 연구항목은 ' + COM_0031,null);	//~~~최소 한건이상 있어야 합니다.
			return;
		}
		
	//	기준일자 체크	
		if(!isBaseDtCheck() && table1.rows().count() > 1){
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
	
	
	$('#btnCcPopNumSearch').on('click',function(e){
		var table = $('#gridSearch_01').DataTable();
		var cnt = -1;
		
		cnt = table.rows().count();
		
		if(cnt < 1){
			showAlert(null,"모집단정의 연구항목은 " + COM_0031,null);
			return;
			
		}
		
		getCount(cnt-1,'txtCC_POP_NUM');
		
	});
	
	$('#btnCaseNumSearch').on('click',function(e){
		var table = $('#gridCaseGroup_01').DataTable();
		var cnt = -1;
		
		cnt = table.rows().count();
		
		if(cnt < 1){
			showAlert(null,"사례군 연구항목은 " + COM_0031,null);
			return;
			
		}

		getCountCaseControl('gridCaseGroup_' + gvActiveTab, cnt-1,'CC_CASE_NUM');
		
		
	});
	
	
	$('#btnAutoItem').on('click',function(e){
		var table1 = $('#gridSearch_01').DataTable();
		
		if(table1.rows().count() > 0){
			showAlert(null,"모집단 자동 입력 기능은 조회조건이 없을때 사용하기 위한 기능입니다.",null);
			return;
		}
		
		
		var dataSet = {};
		
		dataSet.SEARCH_SEQ = 3364;
		
		callServiceSync( "getItemMgmtList"
				,"common/sys/getItemMgmtList"
				,dataSet
				,"serviceCallbackSidebar");
		
		var table = $('#gridSearch_' + gvActiveTab).DataTable();
		
		gvItemMgmtList[0].INPUT_VAL1 = '1900-01-01';	//전체대상
		gvItemMgmtList[0].BASE_DT_YN = 'Y';
		
		table.rows.add(gvItemMgmtList).draw();
		
		
	});
	
	
	/*$('#btnAutoColumns_01').on('click', function(){
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
	});
	
	$(document).on('click', '#tabResult > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[1];
		
		$('#btnAutoColumns_01').attr('tabNum', gridNum);
		
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


function onBtnSaveCasctrl(){
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
	
	if(!$('#gridCaseGroup_01').validDate()){
		showAlert(null,COM_0032,null);
		return;
	}
	
	if(!$('#gridControlGroup_01').validDate()){
		showAlert(null,COM_0032,null);
		return;
	}
	
	var dataSet = {};
	var dsCcMgmtInfo = {};
	
	dsCcMgmtInfo = $('#frmCcMgmt').formToJson();
	
	dataSet.GBN_MODEL 	= 'CC';
	dataSet.GBN_TAB 	= '01';
	dataSet.CC_POP_NUM 	= nvl(dsCcMgmtInfo.CC_POP_NUM,'');			//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = nvl(dsCcMgmtInfo.CC_CASE_NUM,'');			//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= nvl(dsCcMgmtInfo.CC_SAM_NUM,'');			//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= nvl(dsCcMgmtInfo.CC_CONT_CD,'');			//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= nvl(dsCcMgmtInfo.CC_MAT_CD,'');			//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.CC_AGE_NUM  = nvl(dsCcMgmtInfo.CC_AGE_NUM,'');
	
	dataSet.dsItemTableList 	= getSearchTableData();				//스키마, 테이블 목록
	dataSet.dsItemColumnList 	= $('#gridSearch_01').getData();	//조회조건 목록
	dataSet.dsPeriodList 		= [];								//반복관리 목록
	dataSet.dsStudyItem			= [];								//연구항목
	dataSet.dsCaseGroupList		= $('#gridCaseGroup_01').getGridCaseControl();				//사례군
	dataSet.dsControlGroupList  = $('#gridControlGroup_01').getGridCaseControl();			//대조군
			
	callService("searchPatient"
			,"research/casctrl/searchPatient"
			,dataSet
			,"serviceCallback_sub01");
	
}



function saveQueryConditions(){
	var dataSet = {};
	
	var dsList 				= [];
	var dsSearchList 		= [];
	var dsPeriodList 		= [];
	var dsStudyItemList 	= [];
	var dsCaseGroupList 	= [];			//사례군
	var dsControlGroupList 	= [];			//대조군
	var saveTypeCd 			= '';			//저장구분코드
	var dsCcMgmtInfo 		= {};			//
	
	dsCcMgmtInfo = $('#frmCcMgmt').formToJson();
	
	if(isNull($('#txtCONDT_NM').val())){
		showAlert(null, '조회조건명은 ' + COM_0010, null);	//필수항목입니다.
		return;
	}
	
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
	
	
	dataSet.SHARE_CD	= $('#selSHARE_CD').val();				//공유조건(P:개인, A:전체, D:과)
	dataSet.PER_CODE	= $.session.get('PER_CODE');			//사용자ID
	dataSet.DEPT_CODE	= $.session.get('DEPT_CODE');			//부서코드
	dataSet.CONDT_NM 	= $('#txtCONDT_NM').val();				//연구조건명
	dataSet.METH_CD 	= 'CC';									//연구종료(CS:단면,CC:사례대조,CH:코호트)
	dataSet.CC_POP_NUM 	= nvl($('#txtCC_POP_NUM').val(),'0');		//(사례대조) 모집단 숫자
	dataSet.CC_CASE_NUM = nvl($('#txtCC_CASE_NUM').val(),'0');		//(사례대조) 사례군 숫자
	dataSet.CC_SAM_NUM 	= nvl(dsCcMgmtInfo.CC_SAM_NUM,'0');		//(사례대조) 대조군 배수
	dataSet.CC_CONT_CD 	= nvl(dsCcMgmtInfo.CC_CONT_CD,'');		//(사례대조) 대조군 배수
	dataSet.CC_MAT_CD 	= nvl(dsCcMgmtInfo.CC_MAT_CD,'');		//(사례대조) 대조군 매칭, 'AM' : Age Match, 'SM' : Sex Match, 'ASM' : Age Sex Match
	dataSet.CC_AGE_NUM  = nvl(dsCcMgmtInfo.CC_AGE_NUM,'0');
	dataSet.INSTCD 		= $.session.get('INSTCD');	
	
	dsSearchList		= $('#gridSearch_01').getData();
	dsPeriodList		= [];
	dsStudyItemList 	= $('#gridStudyItem').getGridStudyItem();					
	dsCaseGroupList 	= $('#gridCaseGroup_01').getGridCaseControl();
	dsControlGroupList 	= $('#gridControlGroup_01').getGridCaseControl();
	

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
	
//	사례군	
	for(var i=0; i < dsCaseGroupList.length; i++){
		var ds = dsCaseGroupList[i];
		dsList.push(ds);
	}
	
//	대조군	
	for(var i=0; i < dsControlGroupList.length; i++){
		var ds = dsControlGroupList[i];
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
	
	/*callService("saveItemContDetl"
			,"research/crossSectionalStudy/saveItemContDetl"
			,dataSet
			,"serviceCallback_sub01");*/
}



