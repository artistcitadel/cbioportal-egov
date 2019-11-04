var prevFile;

/**


 * 모달창 개인자료조건
 * @Page : modalPerDataList
 */


/**
 * Application Ready
 */
$(document).ready(function(){
	initPerDataList();
	initEventPerDataList();
	
	
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
function serviceCallback_psnlDta(svcId, result){
	if(result.ERR_CD != '0'){
		showAlertError('개인자료조건', result.ERR_MSG, null);
		return;
	}
	
	switch(svcId){
		//개인자료조건저장 미리보기
		case "savePersonalDataPreview":
			console.log(result);
			var strMsg = "";
			
			strMsg += '<div class="row margin-top-20">';
				strMsg += '<label class="col-lg-12">아래목록은 환자변환테이블에 없는 환자목록입니다.<br>계속 진행하시려면 [YES]버튼을 클릭하세요.</label>';
			strMsg += '</div>';
			
			strMsg += '<div class="row margin-top-20">';
				strMsg += '<div class="col-lg-12"  style="height:400px;overflow-y:scroll;" >';
					strMsg += '<table width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls">';
						strMsg += '<thead>';
						strMsg += '<th>환자번호 <span class="badge bg-red" style="font-size:14px;">'+result.NOT_CNT+'</span></th>';
						strMsg += '</thead>';
						
						strMsg += '<tbody>';
						for(var i=0; i < result.dsNoExistPatList.length; i++){
							strMsg += '<tr>';
								strMsg += '<td>'+result.dsNoExistPatList[i]+'</td>';
							strMsg += '</tr>';
						}
						strMsg += '</tbody>';
					strMsg += '</table>';
				strMsg += '</div>';
				
			strMsg += '</div>';
			
			
			
			showConfirm('개인자료 업로드', strMsg, function(e){
				if(e){
					$('#btnPerDataReg').trigger("click"); 
				}
			});
			
			
			break;
			
		//개인자료조건저장
		case "savePersonalData":
			var strMsg = "";
			
			strMsg = '<div class="row">';
			strMsg += '<label>개인자료가 업로드 되었습니다.</label>';
			strMsg += '</div>';
			
			strMsg += '<div class="row margin-top-20">';
				strMsg += '<div class="col-lg-12 ">';
					strMsg += '<table width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" >';
						strMsg += '<tr>';
							strMsg += '<th class="text-align-center" width="33%">업로드 완료</th>';
							strMsg += '<th class="text-align-center" width="33%">환자대체번호 누락</th>';
							strMsg += '<th class="text-align-center" width="34%">전체</th>';
						strMsg += '</tr>';
						
						strMsg += '<tr>';
							strMsg += '<td><span class="badge bg-blue" style="font-size:14px;">'+result.UPD_CNT+'</span></td>';
							strMsg += '<td><span class="badge bg-red" style="font-size:14px;">'+result.NOT_CNT+'</span></td>';
							strMsg += '<td><span class="badge bg-green" style="font-size:14px;">'+result.TOT_CNT+'</span></td>';
						strMsg += '</tr>';
					strMsg += '</table>';
				strMsg += '</div>';
			strMsg += '</div>';
			
			
			console.log(result.dsNoExistPatList);
			
			showAlert('개인자료 업로드', strMsg, function(e){
				$('#btnPerDataCancel').trigger('click');
				getCategoryList();
			});
			
			break;
			
		//개인자료명 중복체크	
		case "getItemMgmtPsnlDataNmDuplicateCheck":
			var btnDuplCheck 	= $('#btnDataNmDuplicate');
			var spanResultInfo 	= $('#dataNmCheckresult');
			var element 		= $('#txtTABLE_COMMENT');
			
			if(result.dsCheckList[0].CNT > 0){
				
				
				setTimeout(function() {
					$(btnDuplCheck).button('reset');
					
					$(spanResultInfo).removeClass('label-default');
					$(spanResultInfo).removeClass('label-success');
					$(spanResultInfo).addClass('label-danger');
					$(spanResultInfo).html('Not available');
					
					$(element).focus();
					
			   	}, 500);
				
			}else{
				setTimeout(function() {
					$(btnDuplCheck).button('reset');
					
					$(spanResultInfo).removeClass('label-default');
					$(spanResultInfo).removeClass('label-danger');
					$(spanResultInfo).addClass('label-success');
					$(spanResultInfo).html('Available');
					
			   	}, 500);
				
				
			}
			
			break;
			
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

var gvPersonalDataTypeList = [];

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
/**
* init함수
* @returns
*/
function initPerDataList()
{
	$('#txtTABLE_COMMENT').val('');
	$('#excelFile').val('');
	$('#txtExcelFile').val('');
	$("#selSheetList option").remove();
	$("#selPatSbstNoColumnList option").remove();
	$("#selPatSbstNoSpecList option").remove();
	$("#selBaseDtColumnList option").remove();
	$("#selMgmtColumnList option").remove();
	
	
	setComboList('selSheetList', [{'VALUE':'','TEXT':'선택'}], 'VALUE', 'TEXT', null, null);
	setComboList('selPatSbstNoColumnList', [{'VALUE':'','TEXT':'선택'}], 'VALUE', 'TEXT', null, null);
	setComboList('selPatSbstNoSpecList', [{'VALUE':'','TEXT':'선택'}], 'VALUE', 'TEXT', null, null);
	setComboList('selBaseDtColumnList', [{'VALUE':'','TEXT':'선택'}], 'VALUE', 'TEXT', null, null);
	setComboList('selMgmtColumnList', [{'VALUE':'','TEXT':'선택'}], 'VALUE', 'TEXT', null, null);
	
	$('.image-preview-clear').css('display','none');
	
	//테이블 초기화
	$('.perDataListTableArea').html('');
	$('.perDataListTableArea').append('<table id="perDataListTable" class="table table-bordered table-striped" width="100%"><thead id="perDataListTableHeader"></thead></table>');
	
	
}

function initPsnlDataModal(){
	$('#txtTABLE_COMMENT').val('');
	$('#excelFile').val('');
	$('#txtExcelFile').val('');
	$("#selSheetList option").remove();
	$("#selSheetList").append('<option>선택</option>');
	
	$('#perDataListTableHeader').html('');
	$('.image-preview-clear').css('display','none');
	
	$('#selPatSbstNoColumnList option').remove();
	$('#selPatSbstNoColumnList').append('<option>선택</option>');
	$('#selBaseDtColumnList option').remove();
	$('#selBaseDtColumnList').append('<option>선택</option>');
	$('#selMgmtColumnList option').remove();
	$('#selMgmtColumnList').append('<option>선택</option>');
	$('#selPatSbstNoSpecList option').remove();
	$('#selPatSbstNoSpecList').append('<option>선택</option>');
	
	//테이블 초기화
	$('.perDataListTableArea').html('');
	$('.perDataListTableArea').append('<table id="perDataListTable" class="table table-bordered table-striped" width="100%"><thead id="perDataListTableHeader"></thead></table>');
	
	
	$('#chkHeaderUserYn').iCheck('check');
	
	$('.itemNmChk').iCheck('uncheck');
	$('.itemNmChk').iCheck('disable');
	
	$('.baseDtChk').iCheck('uncheck');
	$('.baseDtChk').iCheck('disable');
	
	$('#txtPAT_SBST_NO').val('');
	
	$('#dataNmCheckresult').removeClass('label-success');
	$('#dataNmCheckresult').removeClass('label-danger');
	$('#dataNmCheckresult').removeClass('label-default');
	
}

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEventPerDataList(){
	
	makeiCheck('.headerChk, .itemNmChk, .baseDtChk');
	$('.itemNmChk').iCheck('disable');
	$('.baseDtChk').iCheck('disable');
	
	
	
	
	// 개인자료조건 file Clear event
    $('.image-preview-clear').click(function(){
    	console.log($('#perDataListTable > tbody').length);
    	
    	//기존 데이터가 있을때
    	if($('#perDataListTable > tbody').length > 0){
    		showConfirm('개인자료 업로드', COM_0042, function(result){
    			if(!result){
    				return;
    			}else{
        			initPsnlDataModal();
    			}
    			
    			$('.image-preview').attr("data-content","").popover('hide');
    	        $('.image-preview-filename').val("");
    	        $('.image-preview-clear').hide();
    	        $('.image-preview-input input:file').val("");
    	        $(".image-preview-input-title").text("Browse");
    			
    		});
    	}
    }); 
    // 개인자료조건 file Create the preview image
    $(".image-preview-input input:file").change(function (){     
    	console.log($('#perDataListTable > tbody').length);
    	$('#chkHeaderUserYn').iCheck('check');
    	    	
    	//기존 데이터가 있을때
    	if($('#perDataListTable > tbody').length > 0){
    		//테이블 초기화
    		$('.perDataListTableArea').html('');
    		$('.perDataListTableArea').append('<table id="perDataListTable" class="table table-bordered table-striped" width="100%"><thead id="perDataListTableHeader"></thead></table>');
    	}
    	
    	
/*    	//181123 취소 누르면 파일 기존것으로 대체 
    	var file;
    	if(isNullOrEmpty(this.files[0])){
    		file = prevFile;
        }else{
        	file = this.files[0];
        	prevFile = file;
        }*/
    	
    	var file = this.files[0];
        var reader = new FileReader();
        

        //181123 파일크기 검사
        if(file.size >= 5*1024*1024){
        	alert("파일 용량을 5MB이하로 해주시길 바랍니다.");
        	return ;
        }
        
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);            
            
        }        
        reader.readAsDataURL(file);
        
    //	validation check    
        event.preventDefault();

        var form = $('#form_personalData')[0];
		var data = new FormData(form);
        data.append("CustomField", "This is some extra data, testing");

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: gvSERVER + gvCONTEXT + "/psnldta/uploadExcelFile",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (result) {
            	console.log(result);
            	if(!isNullOrEmpty(result.error)){
            		alert("엑셀 행에 빈칸이 많습니다. 수정하여 주시기 바랍니다.");
            		return;
            	}
            	drawPersonalDataList(result);	
            	
            },
            error: function (request,status,error) {
            	showAlertError("개인자료조건", request.responseText, null);
            	
            }
        });
    	
                
    });
    
    
    $('#btnPerDataRefresh').on('click',function(e){
    	
    	//기존 데이터가 있을때
    	if($('#perDataListTable > tbody').length > 0){
    		showConfirm('개인자료 업로드', COM_0042, function(result){
    			if(!result){
    				return;
    			}else{
        			initPsnlDataModal();
    			}
    			
    		});
    	}else{
    		initPsnlDataModal();
    	}
    });
    
    
//	중복체크    
    $('#btnDataNmDuplicate').on('click', function() {
		if(isNullOrEmpty($('#txtTABLE_COMMENT').val())){
    		showAlert('개인자료조건','데이터명은 ' + COM_0010,null);	//데이터명은 필수항목입니다.
    		return;
    		
    	}
		
		var $this = $(this);
		$this.button('loading');
		
		var dataSet = {};
		
		dataSet.SEARCH_ITEM_DESC		= $.session.get('PER_CODE');		/* 사용자id*/
		dataSet.SEARCH_ITEM_CATE_DETL	= $('#txtTABLE_COMMENT').val();		/* 데이터명*/
		
		
		callService("getItemMgmtPsnlDataNmDuplicateCheck"
				,"psnldta/getItemMgmtPsnlDataNmDuplicateCheck"
				,dataSet
				,"serviceCallback_psnlDta");
	});
    
    //데이터저장 미리보기
    $('#btnPerDataRegPreview').on('click',function(e){
    	var dsList1 = [];
		var dsList2 = [];
		var dsList3 = [];
		var dsList4 = [];
		
    	var dataSet = {};
    	var dsColumn = {};
    	var dsColumnList = [];	//ITEM_MGMT 등록용 컬럼
    	
    	
    	if(isNullOrEmpty($('#selPatSbstNoColumnList').val())){
    		showAlert('개인자료조건','환자번호 컬럼은 ' + COM_0010,null);		//환자번호컬럼은 필수항목입니다.
    		return;
    		
    	}
    	
    	if(isNullOrEmpty($('#selPatSbstNoSpecList').val())){
    		showAlert('개인자료조건','환자번호,주민번호,환자대체번호 컬럼은 ' + COM_0010,null);		//환자번호컬럼은 필수항목입니다.
    		return;
    		
    	}
    	
    	//관리코드 사용일경우 관리코드를 선택했는지 체크
		if($('#chkMGMT').is(':checked')){
			if(isNullOrEmpty($('#selMgmtColumnList').val())){
				showAlert('개인자료조건','관리코드를 ' + COM_0023,null);
				return;
			}
		}
    	
    	
    	dsColumn 						= {};
    	dsColumn.SEQ           			= '';
    	dsColumn.SCHEMA              	= $.session.get('PER_CODE');
    	dsColumn.TABLE               	= '';
    	dsColumn.TABLE_COMMENT       	= $('#txtTABLE_COMMENT').val();
    	dsColumn.COLUMN 				= nvl(gvPAT_SBST_NO,'PAT_SBST_NO');
    	dsColumn.COLUMN_COMMENT			= $('#txtPAT_SBST_NO').val();
    	dsColumn.ITEM_NM 				= $('#txtPAT_SBST_NO').val();
    	
    	dsColumn.DATA_TYPE 				= 'VARCHAR' + ' ('+gvPAT_SBST_NO_SIZE+')';
    	dsColumn.ITEM_TYPE 				= 'TEX';
    	dsColumn.ORDER = 0;
    	dsColumn.SEARCH_YN              = 'Y';		
		dsColumn.CODE_TYPE              = '';
		dsColumn.CODE_SET               = '';
		dsColumn.POPUP_YN               = 'N';
		dsColumn.POPUP_PROGRAM_ID       = '';
		dsColumn.UPPER_TABLE            = '';
		dsColumn.UPPER_COLUMN           = '';
		dsColumn.GMEC_YN                = 'Y';
		dsColumn.HCC_YN                 = 'N';
		dsColumn.SYNONYM_YN             = 'N';
		dsColumn.ITEM_DESC              = $.session.get('PER_CODE');
		dsColumn.ITEM_CATE_SEQ          = 999;
	//	dsColumn.ITEM_CATE_DETL_SEQ     = 999;
		dsColumn.CRT_ID                 = $.session.get('PER_CODE');
		dsColumn.UDT_ID              	= $.session.get('PER_CODE');
		dsColumn.ITEM_CATE       	  	= '개인자료';
		dsColumn.ITEM_CATE_DETL  	  	= $('#txtTABLE_COMMENT').val();
		dsColumn.BASE_DT_COLUMN	  	  	= 'BASE_DT';
		
		dsColumnList.push(dsColumn);
				
		dsColumn 						= {};
    	dsColumn.SEQ           			= '';
    	dsColumn.SCHEMA              	= $.session.get('PER_CODE');
    	dsColumn.TABLE               	= '';
    	dsColumn.TABLE_COMMENT       	= $('#txtTABLE_COMMENT').val();
    	dsColumn.COLUMN 				= 'BASE_DT';
    	dsColumn.COLUMN_COMMENT			= '기준일자';
    	dsColumn.ITEM_NM 				= '기준일자';
    	
    	
    	dsColumn.DATA_TYPE 				= 'DATE';
    	dsColumn.ITEM_TYPE 				= 'DAT';
    	dsColumn.ORDER = 0;
    	dsColumn.SEARCH_YN              = 'Y';		
		dsColumn.CODE_TYPE              = '';
		dsColumn.CODE_SET               = '';
		dsColumn.POPUP_YN               = 'N';
		dsColumn.POPUP_PROGRAM_ID       = '';
		dsColumn.UPPER_TABLE            = '';
		dsColumn.UPPER_COLUMN           = '';
		dsColumn.GMEC_YN                = 'Y';
		dsColumn.HCC_YN                 = 'N';
		dsColumn.SYNONYM_YN             = 'N';
		dsColumn.ITEM_DESC              = $.session.get('PER_CODE');
		dsColumn.ITEM_CATE_SEQ          = 999;
	//	dsColumn.ITEM_CATE_DETL_SEQ     = 999;
		dsColumn.CRT_ID                 = $.session.get('PER_CODE');
		dsColumn.UDT_ID              	= $.session.get('PER_CODE');
		dsColumn.ITEM_CATE       	  	= '개인자료';
		dsColumn.ITEM_CATE_DETL  	  	= $('#txtTABLE_COMMENT').val();
		dsColumn.BASE_DT_COLUMN	  	  	= $('#selBaseDtColumnList option:selected').text();
		
		dsColumnList.push(dsColumn);
		
		//관리코드 사용일경우
		if($('#chkMGMT').is(':checked')){
			dsColumn 						= {};
	    	dsColumn.SEQ           			= '';
	    	dsColumn.SCHEMA              	= $.session.get('PER_CODE');
	    	dsColumn.TABLE               	= '';
	    	dsColumn.TABLE_COMMENT       	= $('#txtTABLE_COMMENT').val();
	    	dsColumn.COLUMN 				= 'MGMT_CODE';
	    	dsColumn.COLUMN_COMMENT			= $('#selMgmtColumnList option:selected').text();
	    	dsColumn.ITEM_NM 				= $('#selMgmtColumnList option:selected').text();
	    	
	    	dsColumn.DATA_TYPE 				= 'VARCHAR' + ' (4)';
	    	dsColumn.ITEM_TYPE 				= 'TEX';
	    	dsColumn.ORDER = 0;
	    	dsColumn.SEARCH_YN              = 'Y';		
			dsColumn.CODE_TYPE              = '';
			dsColumn.CODE_SET               = '';
			dsColumn.POPUP_YN               = 'N';
			dsColumn.POPUP_PROGRAM_ID       = '';
			dsColumn.UPPER_TABLE            = '';
			dsColumn.UPPER_COLUMN           = '';
			dsColumn.GMEC_YN                = 'Y';
			dsColumn.HCC_YN                 = 'N';
			dsColumn.SYNONYM_YN             = 'N';
			dsColumn.ITEM_DESC              = $.session.get('PER_CODE');
			dsColumn.ITEM_CATE_SEQ          = 999;
		//	dsColumn.ITEM_CATE_DETL_SEQ     = 999;
			dsColumn.CRT_ID                 = $.session.get('PER_CODE');
			dsColumn.UDT_ID              	= $.session.get('PER_CODE');
			dsColumn.ITEM_CATE       	  	= '개인자료';
			dsColumn.ITEM_CATE_DETL  	  	= $('#txtTABLE_COMMENT').val();
			dsColumn.BASE_DT_COLUMN	  	  	= 'BASE_DT';
			
			dsColumnList.push(dsColumn);
		}
		
		dsList1 = table.column($('#selPatSbstNoColumnList option:selected').val()).data();
		dsList2 = table.column($('#selBaseDtColumnList option:selected').val()).data();	
		dsList3 = [];
		dsList4 = table.column($('#selMgmtColumnList option:selected').val()).data();
		dataSet.PAT_ID_TYPE				= $('#selPatSbstNoSpecList option:selected').val();
		
		var serverDate = getServerDate();
		
		for(var i=0; i < dsList1.length; i++){
			var dsRow = dsList1[i];
			
			var dsMap = {};
			
			if(dataSet.PAT_ID_TYPE === 'PAT_SBST_NO'){
				dsMap.PAT_SBST_NO = gfn_lpad(dsList1[i],gvPAT_SBST_NO_SIZE);
			}else{
				dsMap.PAT_SBST_NO = dsList1[i];
			}
			
			if($('#chkBASE_DT').is(':checked')){
			//	dsMap.BASE_DT_COLUMN = serverDate;
				dsMap.BASE_DT_COLUMN = '1900-01-01';
				
			}else{
				dsMap.BASE_DT_COLUMN = dsList2[i];
				
			}
			
			//관리코드 사용일경우
			if($('#chkMGMT').is(':checked')){
				var dsList4ToSting = dsList4[i].toString();
				if(dsList4ToSting.length <= 4){
					dsMap.MGMT_CODE_COLUMN = dsList4ToSting;
				}else{
					showAlert('개인자료조건','관리코드는 반드시 4자리 이하만 가능합니다.<br/>관리코드를 다시 확인해 주세요. ',null);
					return;
				}
			}
			
			dsList3.push(dsMap);
			
			
		}
		dataSet.PER_CODE 				= $.session.get('PER_CODE');
		dataSet.dsColumnList			= dsColumnList;
		dataSet.dsPsnlDataList 			= dsList3;
		
		console.log(dataSet)
		callService("savePersonalDataPreview"
				,"psnldta/savePersonalDataPreview"
				,dataSet
				,"serviceCallback_psnlDta");
		
	});

    
    
//	데이터저장    
    $('#btnPerDataReg').on('click',function(e){
    	var classId = $('#dataNmCheckresult').attr('class');
    	
    	if(classId.indexOf('label-danger') < 0 && classId.indexOf('label-success') < 0){
    		showAlert('개인자료조건','데이터명 [중복체크]를 먼저 진행해 주세요.',function(e){
    			$('#txtTABLE_COMMENT').focus();
    			$('#txtTABLE_COMMENT').select();
    		});
    		return;
    	}
    	
    	if(classId.indexOf('label-danger') >= 0){
    		showAlert('개인자료조건','이미 중복된 데이터명이 있습니다.<br>다른 이름으로 저장하시기 바랍니다.',null);
    		$('#txtTABLE_COMMENT').focus();
    		return;
    		
    	}
    	
    	var dsList1 = [];
		var dsList2 = [];
		var dsList3 = [];
		var dsList4 = [];
		
    	if(isNullOrEmpty($('#txtTABLE_COMMENT').val())){
    		showAlert('개인자료조건','데이터명은 ' + COM_0010,null);	//데이터명은 필수항목입니다.
    		return;
    		
    	}
    	
    	if(isNullOrEmpty($('#excelFile').val())){
    		showAlert('개인자료조건','엑셀 파일은 ' + COM_0010,null);	//엑셀 시트선택은 필수항목입니다.
    		return;
    		
    	}
    	
    	if(isNullOrEmpty($('#selPatSbstNoColumnList').val())){
    		showAlert('개인자료조건','환자번호 컬럼은 ' + COM_0010,null);		//환자번호컬럼은 필수항목입니다.
    		return;
    		
    	}
    	
    	if(isNullOrEmpty($('#selPatSbstNoSpecList').val())){
    		showAlert('개인자료조건','환자번호,주민번호,환자대체번호 컬럼은 ' + COM_0010,null);		//환자번호컬럼은 필수항목입니다.
    		return;
    		
    	}
    	
    	/*if(isNullOrEmpty($('#selBaseDtColumnList').val())){
    		showAlert('개인자료조건','기준일자 컬럼은 ' + COM_0010,null);	//기준일자 컬럼은 필수항목입니다.
    		return;
    		
    	}*/
    	
    	//관리코드 사용일경우 관리코드를 선택했는지 체크
		if($('#chkMGMT').is(':checked')){
			if(isNullOrEmpty($('#selMgmtColumnList').val())){
				showAlert('개인자료조건','관리코드를 ' + COM_0023,null);
				return;
			}
		}
    	
    //	기준일자 체크
    	if(!$('#chkBASE_DT').is(':checked')){
    		dsList2 = table.column($('#selBaseDtColumnList option:selected').val()).data();
        	console.log(dsList2);
        	
        	var datePattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    		var isValid = true;
    		
    		for(var i=0; i < dsList2.length; i++){
    			if(!datePattern.test(dsList2[i])){
    				isValid = false;
    				break;
    			}
    		}
    		
    		if(!isValid){
    			showAlert('개인자료조건','기준일자 컬럼의 ' + COM_0032,null);	//기준일자 컬럼의 날짜포맷이 부정확합니다.
    			return;
    		}
    	}
    	
		
    	var dataSet = {};
    	var dsColumn = {};
    	var dsColumnList = [];	//ITEM_MGMT 등록용 컬럼
    	
    	dsColumn 						= {};
    	dsColumn.SEQ           			= '';
    	dsColumn.SCHEMA              	= $.session.get('PER_CODE');
    	dsColumn.TABLE               	= '';
    	dsColumn.TABLE_COMMENT       	= $('#txtTABLE_COMMENT').val();
    	dsColumn.COLUMN 				= nvl(gvPAT_SBST_NO,'PAT_SBST_NO');
    	dsColumn.COLUMN_COMMENT			= $('#txtPAT_SBST_NO').val();
    	dsColumn.ITEM_NM 				= $('#txtPAT_SBST_NO').val();
    	
    	dsColumn.DATA_TYPE 				= 'VARCHAR' + ' ('+gvPAT_SBST_NO_SIZE+')';
    	dsColumn.ITEM_TYPE 				= 'TEX';
    	dsColumn.ORDER = 0;
    	dsColumn.SEARCH_YN              = 'Y';		
		dsColumn.CODE_TYPE              = '';
		dsColumn.CODE_SET               = '';
		dsColumn.POPUP_YN               = 'N';
		dsColumn.POPUP_PROGRAM_ID       = '';
		dsColumn.UPPER_TABLE            = '';
		dsColumn.UPPER_COLUMN           = '';
		dsColumn.GMEC_YN                = 'Y';
		dsColumn.HCC_YN                 = 'N';
		dsColumn.SYNONYM_YN             = 'N';
		dsColumn.ITEM_DESC              = $.session.get('PER_CODE');
		dsColumn.ITEM_CATE_SEQ          = 999;
	//	dsColumn.ITEM_CATE_DETL_SEQ     = 999;
		dsColumn.CRT_ID                 = $.session.get('PER_CODE');
		dsColumn.UDT_ID              	= $.session.get('PER_CODE');
		dsColumn.ITEM_CATE       	  	= '개인자료';
		dsColumn.ITEM_CATE_DETL  	  	= $('#txtTABLE_COMMENT').val();
		dsColumn.BASE_DT_COLUMN	  	  	= 'BASE_DT';
		
		dsColumnList.push(dsColumn);
				
		dsColumn 						= {};
    	dsColumn.SEQ           			= '';
    	dsColumn.SCHEMA              	= $.session.get('PER_CODE');
    	dsColumn.TABLE               	= '';
    	dsColumn.TABLE_COMMENT       	= $('#txtTABLE_COMMENT').val();
    	dsColumn.COLUMN 				= 'BASE_DT';
    	dsColumn.COLUMN_COMMENT			= '기준일자';
    	dsColumn.ITEM_NM 				= '기준일자';
    	
    	
    	dsColumn.DATA_TYPE 				= 'DATE';
    	dsColumn.ITEM_TYPE 				= 'DAT';
    	dsColumn.ORDER = 0;
    	dsColumn.SEARCH_YN              = 'N';		
		dsColumn.CODE_TYPE              = '';
		dsColumn.CODE_SET               = '';
		dsColumn.POPUP_YN               = 'N';
		dsColumn.POPUP_PROGRAM_ID       = '';
		dsColumn.UPPER_TABLE            = '';
		dsColumn.UPPER_COLUMN           = '';
		dsColumn.GMEC_YN                = 'N';
		dsColumn.HCC_YN                 = 'N';
		dsColumn.SYNONYM_YN             = 'N';
		dsColumn.ITEM_DESC              = $.session.get('PER_CODE');
		dsColumn.ITEM_CATE_SEQ          = 999;
	//	dsColumn.ITEM_CATE_DETL_SEQ     = 999;
		dsColumn.CRT_ID                 = $.session.get('PER_CODE');
		dsColumn.UDT_ID              	= $.session.get('PER_CODE');
		dsColumn.ITEM_CATE       	  	= '개인자료';
		dsColumn.ITEM_CATE_DETL  	  	= $('#txtTABLE_COMMENT').val();
		dsColumn.BASE_DT_COLUMN	  	  	= '';
		
		dsColumnList.push(dsColumn);
		
		//관리코드 사용일경우
		if($('#chkMGMT').is(':checked')){
			dsColumn 						= {};
	    	dsColumn.SEQ           			= '';
	    	dsColumn.SCHEMA              	= $.session.get('PER_CODE');
	    	dsColumn.TABLE               	= '';
	    	dsColumn.TABLE_COMMENT       	= $('#txtTABLE_COMMENT').val();
	    	dsColumn.COLUMN 				= 'MGMT_CODE';
	    	dsColumn.COLUMN_COMMENT			= $('#selMgmtColumnList option:selected').text();
	    	dsColumn.ITEM_NM 				= $('#selMgmtColumnList option:selected').text();
	    	
	    	dsColumn.DATA_TYPE 				= 'VARCHAR' + ' (4)';
	    	dsColumn.ITEM_TYPE 				= 'TEX';
	    	dsColumn.ORDER = 0;
	    	dsColumn.SEARCH_YN              = 'Y';		
			dsColumn.CODE_TYPE              = '';
			dsColumn.CODE_SET               = '';
			dsColumn.POPUP_YN               = 'N';
			dsColumn.POPUP_PROGRAM_ID       = '';
			dsColumn.UPPER_TABLE            = '';
			dsColumn.UPPER_COLUMN           = '';
			dsColumn.GMEC_YN                = 'Y';
			dsColumn.HCC_YN                 = 'N';
			dsColumn.SYNONYM_YN             = 'N';
			dsColumn.ITEM_DESC              = $.session.get('PER_CODE');
			dsColumn.ITEM_CATE_SEQ          = 999;
		//	dsColumn.ITEM_CATE_DETL_SEQ     = 999;
			dsColumn.CRT_ID                 = $.session.get('PER_CODE');
			dsColumn.UDT_ID              	= $.session.get('PER_CODE');
			dsColumn.ITEM_CATE       	  	= '개인자료';
			dsColumn.ITEM_CATE_DETL  	  	= $('#txtTABLE_COMMENT').val();
			dsColumn.BASE_DT_COLUMN	  	  	= 'BASE_DT';
			
			dsColumnList.push(dsColumn);
		}
		
		dsList1 = table.column($('#selPatSbstNoColumnList option:selected').val()).data();
		dsList2 = table.column($('#selBaseDtColumnList option:selected').val()).data();	
		dsList3 = [];
		dsList4 = table.column($('#selMgmtColumnList option:selected').val()).data();	
		dataSet.PAT_ID_TYPE				= $('#selPatSbstNoSpecList option:selected').val();
		
		var serverDate = getServerDate();
		
		for(var i=0; i < dsList1.length; i++){
			var dsRow = dsList1[i];
			
			var dsMap = {};
			
			if(dataSet.PAT_ID_TYPE === 'PAT_SBST_NO'){
				dsMap.PAT_SBST_NO = gfn_lpad(dsList1[i],gvPAT_SBST_NO_SIZE);
			}else{
				dsMap.PAT_SBST_NO = dsList1[i];
			}
			
			if($('#chkBASE_DT').is(':checked')){
				dsMap.BASE_DT_COLUMN = serverDate;
				
			}else{
				dsMap.BASE_DT_COLUMN = dsList2[i];
				
			}
			
			//관리코드 사용일경우
			if($('#chkMGMT').is(':checked')){
				var dsList4ToSting = dsList4[i].toString();
				if(dsList4ToSting.length <= 4){
					dsMap.MGMT_CODE_COLUMN = dsList4ToSting;
				}else{
					showAlert('개인자료조건','관리코드는 반드시 4자리 이하만 가능합니다.<br/>관리코드를 다시 확인해 주세요. ',null);
					return;
				}
			}
			
			dsList3.push(dsMap);
			
			
		}
		dataSet.PER_CODE 				= $.session.get('PER_CODE');
		dataSet.dsColumnList			= dsColumnList;
		dataSet.dsPsnlDataList 			= dsList3;
		
		
		callService("savePersonalData"
				,"psnldta/savePersonalData"
				,dataSet
				,"serviceCallback_psnlDta");
    	
    });
    
    
    $('#chkHeaderUserYn').on('ifChecked ifUnchecked', function(e){
    	
    	if(e.type === 'ifChecked'){
    		if(!$.fn.dataTable.isDataTable($('#perDataListTable'))){
    			return;
    		}
    		
    		$('.inputColClass').attr("readonly",true); 
    		
    		for(var i=0; i < gvXlsList.length; i++){
    			var dsXlsList = gvXlsList[i];
    			
    			var html = '';
    			if($('#selSheetList').val() == dsXlsList.SHEET_VALUE){
    				var cellCnt = dsXlsList.SHEET_CELL_CNT;
    				var dsList 	= dsXlsList.SHEET_DATA;
    				
    				var dsHeader = dsList[0];
    				
    				for(var j=0; j < cellCnt; j++){
    					$('#headCol_' + j).val(dsHeader[j]);
    				}
    				
    				drawDtBody(dsXlsList);
    			}
    		}
    		
    	}else{
    		if(!$.fn.dataTable.isDataTable($('#perDataListTable'))){
    			return;
    		}
    		
    		
    		$('.inputColClass').attr("readonly",false);
    		
    		$('.inputColClass').each(function(idx){
    			$('#headCol_' + idx).val('');
    			
    			for(var i=0; i < gvXlsList.length; i++){
        			var dsXlsList = gvXlsList[i];
        			
        			var html = '';
        			if($('#selSheetList').val() == dsXlsList.SHEET_VALUE){
        				drawDtBody(dsXlsList);
        				
        			}
        		}
    		});
    	}
	});
    
    $(document).on('ifChecked', '.patSbstNoChk', function(){
    	//선택 초기화
		$('.info').each(function(){
    		$(this).removeClass('info');
    	});
		
		var colIdx = $('.patSbstNoChk').index(this);
		
		$('#perDataListTable > tbody > tr').each(function(){
			$(this).find("td:eq("+ colIdx +")").addClass('info');
		});
    });
    
    
    
//	환자번호 컬럼
    $('#selPatSbstNoColumnList').on('change',function(e){
    	if(isNull($(this).val())){
    		if(!$('#chkITEM_NM').is(':checked')){
    			$('#txtPAT_SBST_NO').val('');	
    		}
    		
    	}else{
    		if(!$('#chkITEM_NM').is(':checked')){
    			$('#txtPAT_SBST_NO').val($('#selPatSbstNoColumnList option:selected').text());	
    		}
    	}
    });
    
    
//	직접입력
	$('#chkITEM_NM').on('ifChecked ifUnchecked',function(e){
		var data = e.target;
		var itemNm = '';
		
		if(e.type === 'ifChecked'){
			if(isNull($('#selPatSbstNoColumnList option:selected').val())){
				itemNm = '환자대체번호';
				
			}else{
				itemNm = $('#selPatSbstNoColumnList option:selected').text();
				
			}
			
			$('#txtPAT_SBST_NO').attr('disabled',false);
			$('#txtPAT_SBST_NO').val(itemNm);
			$('#txtPAT_SBST_NO').focus();
			$('#txtPAT_SBST_NO').select();
			
		}else{
			if(isNull($('#selPatSbstNoColumnList option:selected').val())){
				itemNm = '';
				
			}else{
				itemNm = $('#selPatSbstNoColumnList option:selected').text();
				
			}
			
			$('#txtPAT_SBST_NO').attr('disabled',true);
			$('#txtPAT_SBST_NO').val(itemNm);
			
		}
		
	});
	
	
	
    
}

$(document).on('change','#selSheetList',function(e){
	
	//테이블 초기화
	$('#chkHeaderUserYn').iCheck('check');
	
	for(var i=0; i < gvXlsList.length; i++){
		var dsXlsList = gvXlsList[i];
		
		var html = '';
		if(this.value == dsXlsList.SHEET_VALUE){
			drawDtHeader(dsXlsList);
			drawDtBody(dsXlsList);
			
		}
	}
});


$(document).on('change','#selColumnList',function(e){
	if(isNull(this.value)){
		return;
		
	}
	
	var selIdx = this.value;
	
	$('.inputColClass').each(function(idx){
		
		if(idx == selIdx){
			$('#colHeadType_' + idx).css('border','2px solid #74DF00');
		}else{
			$('#colHeadType_' + idx).css('border','');
		}
	});
});





function typeChange(element){
	
	
}

var gvXlsList = [];

function drawPersonalDataList(result)
{

	var dsSheetList = [];
	var dsColumnList = [];
	var dsRowList = [];
	
	gvXlsList=[];
	
	for(var i=0; i < result.dsXlsList.length; i++){
		var dsXlsList = result.dsXlsList[i];

		var dsSheet = {};
		dsSheet.VALUE = dsXlsList.SHEET_VALUE;
		dsSheet.TEXT  = dsXlsList.SHEET_TEXT;
		dsSheetList.push(dsSheet);
		gvXlsList.push(dsXlsList);
		
	}
	
	setComboList('selSheetList', dsSheetList, 'VALUE', 'TEXT', null, null);
	
	$('#selSheetList').val('0').trigger('change');
    
	
}

/**
 * 데이터테이블 헤더 그리기
 * @param dsXlsList
 * @returns
 */
function drawDtHeader(dsXlsList){
	var cellCnt = dsXlsList.SHEET_CELL_CNT;
	var dsList 	= dsXlsList.SHEET_DATA;
	
	console.log(dsList.length);
	
	//데이터가 있는지 체크
	if(dsList.length > 0){
		//html 초기화
		$('.perDataListTableArea').html('');
		var myTable = '<table id="perDataListTable" class="table table-bordered table-striped" width="100%"><thead id="perDataListTableHeader"></thead></table>'
		$('.perDataListTableArea').append(myTable);
	}else{
		$('#perDataListTable').initGrid();
		//$('#perDataListTable').DataTable();
		$('#perDataListTableHeader').html('');
	}
		
	
	html = '';
	html += '<tr>';
	
	var dsHeader = dsList[0];
	
	var dsColumnList = [];
	
	var dsColumn = {};
	
	for(var i=0; i < cellCnt; i++){
		var dsTmp = {};
		
		dsColumn = {};
		dsColumn.VALUE = i;
		dsColumn.TEXT  = dsHeader[i];
		
		dsColumnList.push(dsColumn);
	}
	
	setComboList('selPatSbstNoColumnList', dsColumnList, 'VALUE', 'TEXT', '', '선택');
	setComboList('selBaseDtColumnList', dsColumnList, 'VALUE', 'TEXT', '', '선택');
	setComboList('selMgmtColumnList', dsColumnList, 'VALUE', 'TEXT', '', '선택');
	setComboList('selPatSbstNoSpecList', gvPersonalDataTypeList, 'VALUE', 'TEXT', '', '선택');
	
	html += '<tr >';
	for(var j=0; j < cellCnt; j++){
		var checked = '';
		
		html += '<th>';
			html += '<div class="form-group">';
				html += '<div class="col-sm-12">';
					html += '<input class="form-control inputColClass" type="text" ';
					html += 'name="headCol_'+j+'" ';
					html += 'id="headCol_'+j+'" ';
					html += 'readonly="readonly" ';
					html += 'value="'+dsHeader[j]+'" ';
					html += 'style="width:100%;border:0px;" ';
					html += 'disabled>';
				html += '</div>';
				
				/*html += '<div class="col-sm-4 text-align-center" style="padding-top:5px;">';
					html += '<input type="radio" class="minimal patSbstNoChk" ';
					html += 'name="PAT_SBST_NO" ';
					html += 'id="rdoPAT_SBST_NO_'+j+'" ';
					html += 'value="'+j+'" ';
					html += 'style="width:100%" ';
					html += checked;
					html += '>';
				html += '</div>';*/
			html += '</div>';
		html += '</th>';
	}
	html += '</tr>';
	
	html += '<tr style="display:none;">';
	for(var j=0; j < cellCnt; j++){
		html += '<th>';	
			html += '<div class="form-group">';
				
				
				html += '<div class="col-sm-8">';
					html += '<select class="form-control selectColClass" ';
					html += 'name="colHeadType_'+j+'" ';
					html += 'id="colHeadType_'+j+'" ';
					html += 'onchange="javascript:typeChange(this);" ';
					html += '>';
					
					for(var k=0; k < gvPersonalDataTypeList.length; k++){
						html += '<option value="'+gvPersonalDataTypeList[k].VALUE+'">';
							html += gvPersonalDataTypeList[k].TEXT;
						html += '</option>';
					}
					
					html += '</select>';
				html += '</div>';
				
				html += '<div class="col-sm-4">';
					
				html += '</div>';
				
			html += '</div>';
		html += '</th>';
	}
	html += '</tr>';
	
	$('#perDataListTableHeader').append(html);
	
	$('.itemNmChk').iCheck('enable');
	$('.baseDtChk').iCheck('enable');
	
	
	$.fn.dataTable.ext.errMode = 'none';
	
	//var table = $('#perDataListTable').DataTable();
	//table.destroy();
	//$('#perDataListTable').empty();
	
	$('#perDataListTable').DataTable({
		"paging" : true,
		"bFilter" : false,
		"bSort" : false,
		"serverSide" : false,
		"sDom" : '<"top"i>rt<"bottom"flp><"clear">',
		"ordering" : false,
		"searching" : false
	});
	
	makeiCheck('.patSbstNoChk');
	
}

function drawDtBody(dsXlsList)
{
	table = $('#perDataListTable').DataTable();
	
	var dsList1 = dsXlsList.SHEET_DATA;
	var dsList2 = [];

	var startRow = 0;
	
	if($('#chkHeaderUserYn:checked').attr('checked') === 'checked'){
		startRow = 1;
	}
	
	
	for(var i=startRow; i < dsList1.length; i++){
		var ds = dsList1[i];
		dsList2.push(ds);
	}
	
	table.rows().remove();
	table.rows.add(dsList2).draw();
	
	$('.patSbstNoChk:eq(0)').iCheck('check');
	
}

