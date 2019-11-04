/**
 * 모달창 열너비적용
 * @Page : modalColumnAlign
 */

/**
 * Application Ready
 */
$(document).ready(function(){	
	initEventColumnAlign();
});

//------------------------------------------------------------------------------------------
// CALLBACK	
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
var changeColSize = function(){
	var intColSize = parseInt($('#colSize').val());
	
	if(intColSize == '' || intColSize == undefined){			//값이 없을 경우
		showAlert(null,'Data Grid 열너비 설정값을 입력 해 주세요.',null);
        return;
	}else if(intColSize < 10){		//값이 10보다 작을 경우
		showAlert(null,'Data Grid 열너비 설정값은 10px이상 입력 해 주세요.',null);
        return;
	}else{
		if($('#patient').hasClass('active') == true){		//환자선택 일 경우
			var colTabNum = $('#btnAutoColumns_01').attr('tabNum');
			console.log('#jqxGridResult_'+colTabNum);
			
			for(var i=0; i<fieldListForWidthChange[colTabNum].length; i++){
				$('#jqxGridResult_'+colTabNum).jqxGrid('setcolumnproperty', fieldListForWidthChange[colTabNum][i]['name'], 'width', intColSize);
			}

			$('#jqxGridResult_'+colTabNum).jqxGrid({ width: '100%' });
		}else if($('#study').hasClass('active') == true){	//연구항목 일 경우
			var colTabNum = $('#btnAutoColumns_02').attr('tabNum');
			
			for(var i=0; i<fieldListForWidthChange[colTabNum].length; i++){
				$('#jqxGridResult_02_'+colTabNum).jqxGrid('setcolumnproperty', fieldListForWidthChange[colTabNum][i]['name'], 'width', intColSize);
			}

			$('#jqxGridResult_02_'+colTabNum).jqxGrid({ width: '100%' });
		}
		
		$('#colSize').val('');
		$('#popColumnAlignModal').modal('hide');
	}
}

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEventColumnAlign(){
	$(document).on('click', '#btnColumnAlign', function(){
		changeColSize();
	});
	
	$(document).on('keypress', '#colSize', function(e){
		if (e.which == 13){
			changeColSize();
		}
	});
	
}




