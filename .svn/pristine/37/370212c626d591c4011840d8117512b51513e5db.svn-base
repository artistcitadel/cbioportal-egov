/*
 * 그룹 클릭시 처리 : 개별 그룹처리 
 * parameter : val = object, row = clicked row 
 */
function funcGrouping(val, idx, tabCd) 
{
//	연구항목 이면서, 조회조건, 사례군은 그룹처리 안되도록 처리	
	if(gvActiveTab === '02' && (tabCd === 'C' || tabCd === 'CA')){
		return;
	}
	
	var table;
	var tableId;
	var element;
	
	var nTotalCnt 		= 0;
	var dsGrpPrev 		= {};
	var dsGrpCurrent 	= {};
	var dsGrpNext 		= {};
	
	var grpIdxPrev;
	var grpIdxNext;
	var grpIdxCurrent;
	
	var grpValPrev;
	var grpValNext;
	var grpValCurrent;
	
	var grpNodePrev;
	var grpNodeNext;
	var grpNodeCurrent;
	
	var grpCellPrev;
	var grpCellNext;
	var grpCellCurrent;
	var elementAndOr = 'C';
	
	var grpRowVal = '';
	
	
	var dsTabCd = {};
	var dsTabCd2 = gvTabCd.CO;
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	if(dsTabCd.CODE == 'R' || dsTabCd.CODE == 'RE' || dsTabCd.CODE == 'RQ'){
		table = $('#' + dsTabCd.TABLE_ID).DataTable();
		tableId = '#' + dsTabCd.TABLE_ID;
		
	}else{
		table = $('#' + dsTabCd.TABLE_ID + '_' + gvActiveTab).DataTable();
		tableId = '#' + dsTabCd.TABLE_ID + '_' + gvActiveTab;	
	}
	

	
	
	element = dsTabCd.GR_LV_ID;
	elementAndOr = dsTabCd.ANDOR_ID;
	
	
	var html = '';
	var param = "'" + dsTabCd.CODE + "'";
		
	grpIdxCurrent = idx;
	grpIdxPrev = idx - 1;
	grpIdxNext = idx + 1;
		
	grpValPrev = $('#' + dsTabCd.GR_LV_ID + '_' + grpIdxPrev).val();
	grpValNext = $('#' + dsTabCd.GR_LV_ID + '_' + grpIdxNext).val();
	grpValCurrent = $('#' + dsTabCd.GR_LV_ID + '_' + grpIdxCurrent).val();
	
	nTotalCnt = (table.data().count()) - 1;
	
	if(nTotalCnt == grpIdxCurrent){
		showAlert(null,'그룹 가능한 정보가 존재하지 않습니다.',null);
		return;
		
	}
	
	

	
	if(grpIdxCurrent == 0){
		grpNodeNext = table.row(grpIdxNext).node();
		grpNodeCurrent = table.row(grpIdxCurrent).node();
		
		grpCellNext = grpNodeNext.cells[0];
		grpCellCurrent = grpNodeCurrent.cells[0];
		
	}else{
		grpNodePrev = table.row(grpIdxPrev).node();
		grpNodeNext = table.row(grpIdxNext).node();
		grpNodeCurrent = table.row(grpIdxCurrent).node();
		
		grpCellPrev = grpNodePrev.cells[0];
		grpCellNext = grpNodeNext.cells[0];
		grpCellCurrent = grpNodeCurrent.cells[0];
	}
	
	
//	현재, 다음이 그룹으로 묶어져 있으면 
	if(grpValCurrent > 0 && grpValNext > 0){
		return;
		
	}

	var grpDataNext = table.rows(grpIdxNext).data();
	var grpDataPrev = table.rows(grpIdxPrev).data();
	var grpDataCurrent = table.rows(grpIdxCurrent).data();
	
//	현재 그룹X, 다음이 그룹 O
	if(grpValCurrent == 0 && grpValNext > 0){
		if(dsTabCd.CODE === 'R' && (gvMethCd === 'CS' || gvMethCd === 'CC')){
			if(grpDataCurrent[0].TABLE != grpDataNext[0].TABLE){
				showAlert('연구항목',COM_0033,null);			//서로다른 중분류는 그룹이 될 수 없습니다.
				return;
				
			}
		}	

		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="' + dsTabCd.GR_LV_BTN + '_' + idx + '"';
		html += ' onclick="funcGrouping(this,' + grpIdxCurrent + ','+param+')">';
		html += '</i>';
		html += '<span class="text-danger"> ┌</span>';
		html += '<input type="'+hidden+'" name="' + element + '_' + grpIdxCurrent + '" ';
		html += 'id="'+ element + '_' + grpIdxCurrent+'" ';
		html += 'style="width:40px;" ';
		html += 'value="'+grpValNext+'" ';
		html += '>';
		
		$(grpCellCurrent).html(html);
		
		html = '';
		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="' + dsTabCd.GR_LV_BTN + '_' + grpIdxNext + '"';
		html += ' onclick="funcGrouping(this,' + grpIdxNext + ','+param+')">';
		html += '</i>';
		html += '<span class="text-danger"> │</span>';
		html += '<input type="'+hidden+'" name="' + element + '_' + grpIdxNext+'" ';
		html += 'id="' + element + '_' + grpIdxNext+'" ';
		html += 'style="width:40px;" ';
		html += 'value="'+grpValNext+'"';
		html += '>';
		
		$(grpCellNext).html(html);
		
		
		grpRowVal = grpValNext;
		
	
	}else if(grpValCurrent > 0 && (grpValNext == 0 || isNullOrEmpty(grpValNext))){
		if(dsTabCd.CODE === 'R' && (gvMethCd === 'CS' || gvMethCd === 'CC' || gvMethCd === 'CH')){
			if(grpDataCurrent[0].TABLE != grpDataNext[0].TABLE){
				showAlert('연구항목',COM_0033,null);			//서로다른 중분류는 그룹이 될 수 없습니다.
				return;
				
			}
		}	
		
		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="' + dsTabCd.GR_LV_BTN + '_' + grpIdxCurrent + '"';
		html += ' onclick="funcGrouping(this,' + grpIdxCurrent + ','+param+')">';
		html += '</i>';
		html += '<span class="text-danger"> │</span>';
		
		html += '<input type="'+hidden+'" ';
		html += 'name="' + element + '_' + grpIdxCurrent + '" ';
		html += 'id="'+ element + '_' + grpIdxCurrent+'" ';
		html += 'style="width:40px;" ';
		html += 'value="'+grpValCurrent+'"';
		html += '>';
		
		$(grpCellCurrent).html(html);
		
		html = '';
		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="' + dsTabCd.GR_LV_BTN + '_' + grpIdxNext + '"';
		html += ' onclick="funcGrouping(this,' + grpIdxNext + ','+param+')">';
		html += '</i>';
		html += '<span class="text-danger"> └</span>';
		
		html += '<input type="'+hidden+'" ';
		html += 'name="' + element + '_' + grpIdxNext + '" ';
		html += 'id="'+ element + '_' + grpIdxNext+'" ';
		html += 'style="width:40px;" ';
		html += 'value="'+grpValCurrent+'" ';
		html += '>';
		
		$(grpCellNext).html(html);
		
		grpRowVal = grpValCurrent;
		
		
	}else{
		if(dsTabCd.CODE === 'R' && (gvMethCd === 'CS' || gvMethCd === 'CC' || gvMethCd === 'CH')){
			if(grpDataCurrent[0].TABLE != grpDataNext[0].TABLE){
				showAlert('연구항목',COM_0033,null);			//서로다른 중분류는 그룹이 될 수 없습니다.
				return;
			}
		}	
		
		
		if( dsTabCd.CODE == 'C'){
			gvGrpIdx++;
			grpRowVal = gvGrpIdx;
			
		}else if(dsTabCd.CODE == 'R'){
			gvGrpStudyItemIdx++;
			grpRowVal = gvGrpStudyItemIdx;
			
			
		}else if(dsTabCd.CODE == 'RE'){
			gvGrpEventIdx++;
			grpRowVal = gvGrpEventIdx;
			
		}else if(dsTabCd.CODE == 'RQ'){
			gvGrpCensoredIdx++;
			grpRowVal = gvGrpCensoredIdx;
			
		}else if(dsTabCd.CODE == 'CA'){
			gvGrpCaseIdx++;
			grpRowVal = gvGrpCaseIdx;
			
		}else if(dsTabCd.CODE == 'CO'){
			gvGrpControlIdx++;
			grpRowVal = gvGrpControlIdx;
			
		}
		
		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="' + dsTabCd.GR_LV_BTN + '_' + grpIdxNext + '"';
		html += ' onclick="funcGrouping(this,' + grpIdxCurrent + ','+param+')">';
		html += '</i>';
		html += '<span class="text-danger"> ┌</span>';
		
		html += '<input type="'+hidden+'" ';
		html += 'name="' + element + '_' + grpIdxCurrent + '" id="'+ element + '_' + grpIdxCurrent+'" ';
		html += 'value="'+gvGrpIdx+'" ';
		html += 'style="width:40px;">';
		
		
		$(grpCellCurrent).html(html);
		
		html = '';
		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="' + dsTabCd.GR_LV_BTN + '_' + grpIdxNext + '"';
		html += ' onclick="funcGrouping(this,' + grpIdxNext + ','+param+')">';
		html += '</i>';
		html += '<span class="text-danger"> └</span>';
		
		html += '<input type="'+hidden+'" ';
		html += 'name="' + element + '_' + grpIdxNext + '" id="'+ element + '_' + grpIdxNext+'" ';
		html += 'value="'+gvGrpIdx+'" ';
		html += 'style="width:40px;">';
		
		$(grpCellNext).html(html);
		
		
		
		if( dsTabCd.CODE == 'C'){
			$('#' + element + '_' + grpIdxCurrent).val(gvGrpIdx);
			$('#' + element + '_' + grpIdxNext).val(gvGrpIdx);
			
		}else if(dsTabCd.CODE == 'R'){
			$('#' + element + '_' + grpIdxCurrent).val(gvGrpStudyItemIdx);
			$('#' + element + '_' + grpIdxNext).val(gvGrpStudyItemIdx);
			
			
		}else if(dsTabCd.CODE == 'RE'){
			$('#' + element + '_' + grpIdxCurrent).val(gvGrpEventIdx);
			$('#' + element + '_' + grpIdxNext).val(gvGrpEventIdx);
			
		}else if(dsTabCd.CODE == 'RQ'){
			$('#' + element + '_' + grpIdxCurrent).val(gvGrpCensoredIdx);
			$('#' + element + '_' + grpIdxNext).val(gvGrpCensoredIdx);
			
		}else if(dsTabCd.CODE == 'CA'){
			$('#' + element + '_' + grpIdxCurrent).val(gvGrpCaseIdx);
			$('#' + element + '_' + grpIdxNext).val(gvGrpCaseIdx);
						
		}else if(dsTabCd.CODE == 'CO'){
			$('#' + element + '_' + grpIdxCurrent).val(gvGrpControlIdx);
			$('#' + element + '_' + grpIdxNext).val(gvGrpControlIdx);
			
		}
	}
	
	if(gvActiveTab === '01'){
		if(gvMethCd === 'CC'){
			var table1 = $('#gridCaseGroup_' + gvActiveTab).DataTable();
			var table2 = $('#gridControlGroup_' + gvActiveTab).DataTable();
			
			var dsList1 = $('#gridCaseGroup_' + gvActiveTab).getGridCaseControl();
			var dsList2 = [];
			
			var dsTabCd2 = gvTabCd.CO;
			
			//대조군 정의에 그룹 동일하게 적용하기
			var prevGrLevel = '';
			var grLevel = '';
			for(var i=0; i < dsList1.length; i++){
				var dsItem = dsList1[i];
				dsItem.TAB_CD = 'CO';
				
				grLevel = dsItem.GR_LV;					//현재 그룹레벨
				if(grLevel > 0){								//그룹 표시
					if(grLevel != prevGrLevel){			//그룹 첫항목
						dsItem.GR_LV_START = 'S';
						prevGrLevel = grLevel;			//나의 그룹레벨 저장
					}else{
						if(dsList1[i+1] == undefined){	//그룹이고 그리드의 마지막 로우일때
							dsItem.GR_LV_END = 'E';
						}else{									
							var nextLevel = dsList1[i+1]['GR_LV'];
							if(grLevel != nextLevel){		//마지막 로우가 아니고 다음로우 그룹레벨 과 다를때
								dsItem.GR_LV_END = 'E';
							}
						}
					}
				}
				
				dsList2.push(dsItem);
			}
			
			table2.rows().remove().draw();
			table2.rows.add(dsList2).draw();
			
			var firstRow = $('#gridControlGroup_01').getMinGrpIdx(grpRowVal);
			var lastRow = $('#gridControlGroup_01').getMaxGrpIdx(grpRowVal);
			
			
			//대조군 정의에 그룹 첫번째 로우 셀렉트박스 스타일 변경		
			table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data = this.data();
				
				if(data.GR_LV_START == 'S'){
					$('#'+dsTabCd2.ANDOR_ID + '_' + rowIdx).css('border','3px dotted #74DF00');
				}
			});
		}
		
	}else if(gvActiveTab === '02'){
		var rows = table.rows(grpIdxNext).data();
		
		table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var data = this.data();
			var node = this.node();
			var cell0 = node.cells[0];
			var cell4 = node.cells[4];
			var cell5 = node.cells[5];
			var cell6 = node.cells[6];
			
			if(rowIdx === grpIdxNext){
				var html = '';
				
				var meta = {
					row:rowIdx	
				};
				
				if(rows[0].POPUP_YN === 'Y'){
					html = templetePopup(null, null, data, meta, dsTabCd.CODE);
					
				}else{
					if(rows[0].ITEM_TYPE === 'DAT'){
						html = templeteDate( null, null, data, meta, dsTabCd.CODE);
						
					}else if(rows[0].ITEM_TYPE === 'TEX'){
						html = templeteText( null, null, data, meta, dsTabCd.CODE);
						
					}else if(rows[0].ITEM_TYPE === 'NUM'){
						html = templeteNumber( null, null, data, meta, dsTabCd.CODE);
						
						
					}else if(rows[0].ITEM_TYPE === 'COD'){
						html = templeteCode( null, null, data, meta, dsTabCd.CODE);
						
						
					}
				}
			//	사건정의/중도절단	
				if(dsTabCd.CODE === 'RE' || dsTabCd.CODE === 'RQ'){
					$(cell5).html(html);	//조건
					
				}else if(dsTabCd.CODE === 'R'){
					$(cell4).html(html);	//조건
					
					if(!isNull(data.BASE_DT_COLUMN)){
						var meta = {row:rowIdx}
						templeteRange(data,'',data,meta,'R');
					}
					
				//	그룹이 없고 BASE_DT_COLUMN가 있을때 초기화
					if(cell0['childNodes'].length == 2 && !isNull(data.BASE_DT_COLUMN)){
						var meta = {row:rowIdx}
						templeteRange(data,'',data,meta,'R');
					}else if(cell0['childNodes'].length == 2 && isNull(data.BASE_DT_COLUMN)){		//그룹이 없고 BASE_DT_COLUMN가 없을때 초기화
						$(cell5).html('');
					}
					
					
					$(cell5).html('');
					
				}
			}
		});
		
		//연구항목 번호 추가
		/*makeStudyNum('G');*/
	}
	
//	-------------------------------------	
//	그룹의 첫행은 그룹간 조인
	var firstRow = $(tableId).getMinGrpIdx(grpRowVal);
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();

		$(node).find("td input").each(function (){
			if(this.name.indexOf(dsTabCd.GR_LV_ID) >= 0){
				if(grpRowVal == this.value){
					$('#'+dsTabCd.ANDOR_ID + '_' + rowIdx).css('border','');
				}
			}
		});
	});
	
	$('#'+dsTabCd.ANDOR_ID + '_' + firstRow).css('border','3px dotted #74DF00');
	
	updateGroupIdx();
}


var ____groupInit____;


$.fn.groupInit = function()
{
	
	var tableId = this.selector;
	var element;
	var tabCd = 0;
	var elementAndOr = '';
	
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(tableId.indexOf(gvTabCd[key].TABLE_ID) >= 0){
			dsTabCd = gvTabCd[key];
			
		}
	}
	
	element = dsTabCd.GR_LV_ID;
	elementAndOr = dsTabCd.ANDOR_ID;
	
	if(dsTabCd.CODE == 'C'){
		gvGrpIdx = 0;
		
	}else if(dsTabCd.CODE == 'R'){
		gvGrpStudyItemIdx=0;
		
	}else if(dsTabCd.CODE == 'RE'){
		gvGrpEventIdx=0;
		
	}else if(dsTabCd.CODE == 'RQ'){
		gvGrpCensoredIdx=0;
		
	}else if(dsTabCd.CODE == 'CA'){
		gvGrpCaseIdx=0;
		
	}else if(dsTabCd.CODE == 'CO'){
		gvGrpControlIdx=0;
		//tabCd=5;
		//elementAndOr = 'CO';
	}
	
	table = $(this).DataTable();
	
	//getOrgItemNmList();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell = node.cells[0];
		var cell1 = node.cells[1];	//AND_OR, 연구항목 : 대분류
		var cell4 = node.cells[4];	//조건
		var cell5 = node.cells[5];	//기준
		
		
		//190611 그룹 이동초기화 수정
		var cellVal = data.GR_LV;
		var cellHtml = '';

		data.GR_LV = 0;
		
		var html = '';
		
		var paramTabCd = "'"+dsTabCd.CODE+"'";
		
		html = '<i class="ion-ios-plus-outline grouping"';
		html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
		html += ' id="row_'+rowIdx+'_groupBtn"';
		html += ' onclick="funcGrouping(this,' + rowIdx + ','+paramTabCd+')">';
		html += '</i>';
		
		html += '<input type="'+hidden+'" ';
		html += 'name="'+element+'_'+rowIdx+'" ';
		html += 'id="'+element+'_'+rowIdx+'" ';
		html += 'value="0" style="width:40px;">';
		$(cell).html(html);
		
		if(gvMethCd === 'CH' && tableId.indexOf('gridSearch') >= 0 && (rowIdx == 0 || rowIdx == 1)){
			html = '-';
			html += '<input type="'+hidden+'" ';
			html += 'name="'+element+'_'+rowIdx+'" ';
			html += 'id="'+element+'_'+rowIdx+'" ';
			html += 'value="0" style="width:40px;">';
			
			$(cell).html(html);
		}
		
		if(tableId.indexOf('gridStudyItem') >= 0){
			var idx = rowIdx + 1;
			
			if($(cell4).children().length == 2){
				var obj = $(cell4).children('span').children('input:first-child');
				
				html = '';
				html += '<span class="studyNum">';
					html += '<input type="text" class="form-control input_text" ';
					html += 'id="txtITEM_TEXT_'+idx+'" ';
					html += 'name="txtITEM_TEXT" ';
					html += 'value="'+$(obj).val()+'">';
					
				html += '</span>';
				html += '<input type="'+hidden+'" ';
				html += 'class="form-control input_text margin-left-10" ';
				html += 'style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
				
			}else{
				html = '';
				html += '<span class="studyNum">';
					html += '<input type="text" class="form-control input_text" ';
					html += 'id="txtITEM_TEXT_'+idx+'" ';
					html += 'name="txtITEM_TEXT" ';
					
					if(isNull(data.ITEM_TEXT)){
						html += 'value="연구항목'+idx+'">';
						
					}else{
						html += 'value="'+data.ITEM_TEXT+'">';
						
					}
					
				html += '</span>';
				
				html += '<input type="'+hidden+'" ';
				html += 'class="form-control input_text margin-left-10" ';
				html += 'style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
				
			}
			
			
			$(cell4).html(html);
			var celldata5 = '';
			//190610 기준 데이터 불러오기
			if(!isNullOrEmpty($(cell5).children('select'))){
				celldata5 = $(cell5).children('select').val();
			}
			
			
			
			//그룹이 없고 BASE_DT_COLUMN가 있을때 초기화
			if(cell['childNodes'].length == 2 && !isNull(data.BASE_DT_COLUMN)){
				var meta = {
					row:rowIdx
				}
				//190610 그룹초기화시 기준데이터 불러오기
				if(!isNullOrEmpty(celldata5)){
					if(gvMethCd === 'CH'){
						data.AGG = celldata5;
						if(celldata5 === 'PER'){
							data.RANGE_CD = $(cell5).children('div').children('select').val();
							data.RANGE_DN = $(cell5).children('div').children('input').val();
						}
						
						
					}else{
						data.RANGE_CD = celldata5;
						if(celldata5 === 'R'){
							data.RANGE_DN = $(cell5).children('div').children('input').val();
						}
					}
					

				}
				templeteRange(data,'',data,meta,'R');
				
			}else if(cell['childNodes'].length == 2 && isNull(data.BASE_DT_COLUMN)){		//그룹이 없고 BASE_DT_COLUMN가 없을때 초기화
				$(cell5).html('');
			}
		}
		
		
		//그룹초기화시 AND_OR select 초기화	
		$('#' + elementAndOr + '_' + rowIdx).css('border','');
		
	});
	
	//연구항목 번호 추가
	//makeStudyNum('I');
	
	updateGroupIdx();
	
}


//190624 김지훈 그룹초기화
var ____groupMove____;


$.fn.groupMove = function(cellHtml, nData, oData, diff)
{
	
	var tableId = this.selector;
	var element;
	var tabCd = 0;
	var elementAndOr = '';
	
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(tableId.indexOf(gvTabCd[key].TABLE_ID) >= 0){
			dsTabCd = gvTabCd[key];
			
		}
	}
	
	element = dsTabCd.GR_LV_ID;
	elementAndOr = dsTabCd.ANDOR_ID;
	

	
	//190710 항목이동 그룹초기화
	table = $(this).DataTable();
	
	var diffLength = diff.length-1;
	var selectdiff = '';
	var diffIdx = '';
	
	if(diff.length==2){
		nData = diff[0].newData.GR_LV;
		oData = diff[0].oldData.GR_LV;
	}
	else{
		if(diff[0].newData === diff[diffLength].oldData){
			selectdiff = diff[0].newData;
			diffIdx = diff[diffLength].newPosition;
			
		}
		else if (diff[0].oldData === diff[diffLength].newData){
			selectdiff = diff[0].oldData;
			diffIdx = diff[0].newPosition;
		}
		
		nData = selectdiff.GR_LV;
		if(diffIdx == 0 || diffIdx == table.data().length-1){
			oData = 0;
		}
		else{
			upIdx = diffIdx -1;
			downIdx = diffIdx +1;
			upGRLV = table.row(upIdx).data().GR_LV;
			downGRLV = table.row(downIdx).data().GR_LV
			if( upGRLV == downGRLV ){
				oData = upGRLV;
			}
		}
		
	}
	
	
	
	
	//getOrgItemNmList();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell = node.cells[0];
		var cell1 = node.cells[1];	//AND_OR, 연구항목 : 대분류
		var cell4 = node.cells[4];	//조건
		var cell5 = node.cells[5];	//기준
		
		console.log(selectdiff)
		
		if(selectdiff == data){
			console.log('dd')
		}
		
		//190611 그룹 이동초기화 수정
		var cellVal = data.GR_LV;

		//data.GR_LV = 0;
		
		var html = '';
		
		var paramTabCd = "'"+dsTabCd.CODE+"'";
		

		
		if(cellVal == nData || cellVal == oData || cellVal == '0') {
			html = '<i class="ion-ios-plus-outline grouping"';
			html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
			html += ' id="row_'+rowIdx+'_groupBtn"';
			html += ' onclick="funcGrouping(this,' + rowIdx + ','+paramTabCd+')">';
			html += '</i>';
			
			html += '<input type="'+hidden+'" ';
			html += 'name="'+element+'_'+rowIdx+'" ';
			html += 'id="'+element+'_'+rowIdx+'" ';
			html += 'value="0" style="width:40px;">';
			$(cell).html(html);
		}
		else{
			html = '<i class="ion-ios-plus-outline grouping"';
			html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
			html += ' id="row_'+rowIdx+'_groupBtn"';
			html += ' onclick="funcGrouping(this,' + rowIdx + ','+paramTabCd+')">';
			html += '</i>';
			html += '<span class="text-danger">'+cellHtml[rowIdx]+'</span>';
			html += '<input type="'+hidden+'" ';
			html += 'name="'+element+'_'+rowIdx+'" ';
			html += 'id="'+element+'_'+rowIdx+'" ';
			html += 'value="'+cellVal+'" style="width:40px;">';
			$(cell).html(html);
			
		}
		
		if(gvMethCd === 'CH' && tableId.indexOf('gridSearch') >= 0 && (rowIdx == 0 || rowIdx == 1)){
			html = '-';
			
			$(cell).html(html);
		}
		
		if(tableId.indexOf('gridStudyItem') >= 0){
			var idx = rowIdx + 1;
			if(cellVal == nData || cellVal == oData ) {
				if($(cell4).children().length == 2){
					var obj = $(cell4).children('span').children('input:first-child');
					
					html = '';
					html += '<span class="studyNum">';
						html += '<input type="text" class="form-control input_text" ';
						html += 'id="txtITEM_TEXT_'+idx+'" ';
						html += 'name="txtITEM_TEXT" ';
						html += 'value="'+$(obj).val()+'">';
						
					html += '</span>';
					html += '<input type="'+hidden+'" ';
					html += 'class="form-control input_text margin-left-10" ';
					html += 'style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
					
				}else{
					html = '';
					html += '<span class="studyNum">';
						html += '<input type="text" class="form-control input_text" ';
						html += 'id="txtITEM_TEXT_'+idx+'" ';
						html += 'name="txtITEM_TEXT" ';
						
						if(isNull(data.ITEM_TEXT)){
							html += 'value="연구항목'+idx+'">';
							
						}else{
							html += 'value="'+data.ITEM_TEXT+'">';
							
						}
						
					html += '</span>';
					
					html += '<input type="'+hidden+'" ';
					html += 'class="form-control input_text margin-left-10" ';
					html += 'style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
					
				}
				
				
				$(cell4).html(html);
			}
			var celldata5 = '';
			//190610 기준 데이터 불러오기
			if(!isNullOrEmpty($(cell5).children('select'))){
				celldata5 = $(cell5).children('select').val();
			}
			
			
			
			//그룹이 없고 BASE_DT_COLUMN가 있을때 초기화
			if(cell['childNodes'].length == 2 && !isNull(data.BASE_DT_COLUMN)){
				var meta = {
					row:rowIdx
				}
				//190610 그룹초기화시 기준데이터 불러오기
				if(!isNullOrEmpty(celldata5)){
					if(gvMethCd === 'CH'){
						data.AGG = celldata5;
						if(celldata5 === 'PER'){
							data.RANGE_CD = $(cell5).children('div').children('select').val();
							data.RANGE_DN = $(cell5).children('div').children('input').val();
						}
						
						
					}else{
						data.RANGE_CD = celldata5;
						if(celldata5 === 'R'){
							data.RANGE_DN = $(cell5).children('div').children('input').val();
						}
					}
					

				}
				templeteRange(data,'',data,meta,'R');
				
			}else if(cell['childNodes'].length == 2 && isNull(data.BASE_DT_COLUMN)){		//그룹이 없고 BASE_DT_COLUMN가 없을때 초기화
				$(cell5).html('');
			}
		}
		
		
		//그룹초기화시 AND_OR select 초기화	
		$('#' + elementAndOr + '_' + rowIdx).css('border','');
		
	});
	
	//연구항목 번호 추가
	//makeStudyNum('I');
	
	updateGroupIdx();
	
}

var ____deleteRow____;

$.fn.deleteRow = function(td)
{
	var tableId = $(this).selector;
	var table 	= $(this).DataTable();
	var element = getElementId(tableId);
	var tabCd   = getTabCd(tableId);
	
//	table에 row가 없으면 리턴	
	if(table.rows().count() < 1){
		return;
		
	}
	
	var cells 	= table.cell(td);
	var nodes 	= table.row($(td).parents('tr')).node();
	var rows 	= table.row($(td).parents('tr'));
	
	var cellIdx	= cells[0][0].column;
	var currRow	= cells[0][0].row;
	
	var delGrpVal = -1;
	var chkCellIdx = 10;
	
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(tableId.indexOf(gvTabCd[key].TABLE_ID) >= 0){
			dsTabCd = gvTabCd[key];
		}
	}
	

	
	if( tableId === '#gridStudyItem' || tableId === '#gridEventList' || 
		tableId === '#gridCensoredDataList'){
		chkCellIdx = 6;
		
	}else if( tableId === '#gridCaseGroup_01'){
		chkCellIdx = 8;
		
	}else{
		chkCellIdx = 10;
	}
	
	if(cellIdx != chkCellIdx){
		return;
	}
	
	$(nodes).find("td input").each(function (){
		if(this.name.indexOf(dsTabCd.GR_LV_ID) >= 0){
			delGrpVal = this.value;
		}
	});
	
//	연구항목 조건 설정 초기화
	if(gvActiveTab === '02' && dsTabCd.CODE === 'R'){
		table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var data = this.data();
			var node = this.node();
			var cell0 = node.cells[0];
			var cell4 = node.cells[4];
			var cell5 = node.cells[5];

			$(node).find("td input").each(function (){
				if(this.name.indexOf('txtGRP_R') >= 0){
					if(this.value == delGrpVal){
						var idx = rowIdx + 1;
						
						if($(cell4).children().length == 2){
							var obj = $(cell4).children('span').children('input:first-child');
							
							html = '';
							html += '<span class="studyNum">';
								html += '<input type="text" class="form-control input_text" ';
								html += 'id="txtITEM_TEXT_'+idx+'" ';
								html += 'name="txtITEM_TEXT" ';
								html += 'value="'+$(obj).val()+'">';
								
							html += '</span>';
							html += '<input type="'+hidden+'" ';
							html += 'class="form-control input_text margin-left-10" ';
							html += 'style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
							
						}else{
							html = '';
							html += '<span class="studyNum">';
								html += '<input type="text" class="form-control input_text" ';
								html += 'id="txtITEM_TEXT_'+idx+'" ';
								html += 'name="txtITEM_TEXT" ';
								
								if(isNull(data.INPUT_VAL0)){
									html += 'value="연구항목'+idx+'">';
									
								}else{
									html += 'value="'+data.INPUT_VAL0+'">';
									
								}
								
							html += '</span>';
							
							html += '<input type="'+hidden+'" ';
							html += 'class="form-control input_text margin-left-10" ';
							html += 'style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
							
						}
						
						/*html = '';
						html += '<span class="studyNum">연구항목</span>';
						html += '<input type="'+hidden+'" name="txtITEM_TYPE" value="STUDY_ITEM">';*/
						
						
						$(cell4).html(html);
						
						if(!isNull(data.BASE_DT_COLUMN)){
							var meta = {row:rowIdx}
							templeteRange(data,'',data,meta,'R');
							
						}else{
							$(cell5).html('');	
						}
					}
				}
				
				/*
				
			//	그룹이 없고 BASE_DT_COLUMN가 있을때 초기화
				if(cell0['childNodes'].length == 2 && !isNull(data.BASE_DT_COLUMN)){
					var meta = {row:rowIdx}
					templeteRange(data,'',data,meta,'R');
				}else if(cell0['childNodes'].length == 2 && isNull(data.BASE_DT_COLUMN)){		//그룹이 없고 BASE_DT_COLUMN가 없을때 초기화
					$(cell5).html('');
				}*/
			})
		});	
	}
	
	
	
	table.row(currRow).remove().draw();
		
//	첫번째 로우는 조건 출력안함
	var firstRow = $(tableId).getMinGrpIdx(delGrpVal);
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell1 = node.cells[1];
		
		if(rowIdx == 0 && delGrpVal == '0'){
			$(cell1).html('');
		}
	});
	
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell0 = node.cells[0];
		var cell1 = node.cells[1];
		var cell5 = node.cells[5];	//조건
		var cell6 = node.cells[6];	//대상
		var cell7 = node.cells[7];	//포함
		var cell8 = node.cells[8];	//기준일
		var cell9 = node.cells[9];	//최초
		
	//	templete에 넘겨줄 Param설정	
		var meta = {
			row:rowIdx
		};
		
	//	지우고자하는 행보다 클경우 idx 재설정
		$(node).find("td input,select").each(function (){
			if(rowIdx >= currRow ){
				var grpVal = 0;
				
				if(this.name.indexOf(dsTabCd.GR_LV_ID) >= 0){
					if(delGrpVal == this.value || this.value == 0){
						grpVal = 0;
						
					}else{
						grpVal = this.value;
					}
					
					var html = '';
					var param = "'"+dsTabCd.CODE+"'";
					
					html = '<i class="ion-ios-plus-outline grouping"';
					html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
					html += ' id="' + dsTabCd.GR_LV_BTN + '_' +rowIdx+'"';					
					html += ' onclick="funcGrouping(this,' + rowIdx + ','+param+')">';
					html += '</i>';
					
					if(grpVal != 0){
						var max = $(tableId).getMaxGrpIdx(grpVal);
						var min = $(tableId).getMinGrpIdx(grpVal);
						
						if(min == rowIdx){
							html += '<span class="text-danger"> ┌</span>';
							
						}else if(max == rowIdx){
							html += '<span class="text-danger"> └</span>';
							
						}else{
							html += '<span class="text-danger"> │</span>';
						}
					}
					
					html += '<input type="'+hidden+'" ';
					html += 'name="' + dsTabCd.GR_LV_ID + '_' + rowIdx+'" ';
					html += 'id="' + dsTabCd.GR_LV_ID + '_' + rowIdx+'" ';
					
					if(delGrpVal === grpVal){
						html += 'value="0" style="width:40px;">';	
					}else{
						html += 'value="'+grpVal+'" style="width:40px;">';
					}
					
					$(cell0).html(html);
					
					if(rowIdx == 0 && delGrpVal === '0'){
						if(tableId != '#gridStudyItem'){
							html = '';
							$(cell1).html(html);	
						}
					}else{
				//		ANDOR컬럼 border 해제	
						if(tableId != '#gridStudyItem'){
							html = templeteAndOrForDeleteRow(data,rowIdx,dsTabCd.CODE);
							$(cell1).html(html);
							$('#'+dsTabCd.ANDOR_ID + '_' + min).css('border','3px dotted #74DF00');
						}
					}
					
					if((gvMethCd === 'CH' && tableId.indexOf('#gridSearch') >= 0) && (rowIdx == 0 || rowIdx == 1)){
						html += '-';
						html += '<input type="'+hidden+'" ';
						html += 'name="'+dsTabCd.GR_LV_ID+'_'+rowIdx+'" ';
						html += 'id="'+dsTabCd.GR_LV_ID+'_'+rowIdx+'" ';
						html += 'value="0" style="width:40px;">';
						
						$(cell0).html(html);
					}
				}
			//	AND_OR
				if(this.name.indexOf('txtANDOR') >= 0){
					html = '';
					html = templeteAndOr(data,null,data,meta,dsTabCd.CODE);
					$(cell1).html(html);
				}
				
			//	대상
				if(this.name.indexOf('txtCNT') >= 0){
					html = '';
					html = templeteTarget(data,null,data,meta);
					$(cell6).html(html);
				}	
				
			//	포함
				if(this.name.indexOf('INCEXC') >= 0){
					html = '';
					html = templeteIncExc(data,null,data,meta,dsTabCd.CODE);
					$(cell7).html(html);
					
				}	
				
			//	기준일자(조회조건만)
				if(this.name.indexOf('BASE_DT_COLUMN_C') >= 0){
					html = '';
					html = templeteBaseDtYn(data,null,data,meta,'C');
					$(cell8).html(html);
				}
			

			//	최초여부(조회조건만)
				if(this.name.indexOf('FIRST_YN_C') >= 0){
					html = '';
					html = templeteFirstYn(data,null,data,meta,'C');
					$(cell9).html(html);
				}
			}
		});
	});

	
//	groupVal가 0이면 리턴	
	if(delGrpVal === '0'){
		return;
		
	}
	


	
//	groupVal가 1이상이면 group해제	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell0 = node.cells[0];
		var cell1 = node.cells[1];
		var cell4 = node.cells[4];
		var cell5 = node.cells[5];
		
				
		$(node).find("td input").each(function (){
			if(this.name.indexOf(dsTabCd.GR_LV_ID) >= 0){
				if(delGrpVal == this.value){
					data.GR_LV = 0;
					
					var html = '';
					var param = "'"+dsTabCd.CODE+"'";
					
					html = '<i class="ion-ios-plus-outline grouping"';
					html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
					html += ' id="' + dsTabCd.GR_LV_BTN + '_' +rowIdx+'"';
					html += ' onclick="funcGrouping(this,' + rowIdx + ','+param+')">';
					html += '</i>';
					
					html += '<input type="'+hidden+'" ';
					html += 'name="'+dsTabCd.GR_LV_ID+'_'+rowIdx+'" ';
					html += 'id="'+dsTabCd.GR_LV_ID+'_'+rowIdx+'" ';
					html += 'value="0" style="width:40px;">';
					
					$(cell0).html(html);
					
					if((gvMethCd === 'CH' && tableId.indexOf('#gridSearch') >= 0) && (rowIdx == 0 || rowIdx == 1)){
						html += '-';
						html += '<input type="'+hidden+'" ';
						html += 'name="'+dsTabCd.GR_LV_ID+'_'+rowIdx+'" ';
						html += 'id="'+dsTabCd.GR_LV_ID+'_'+rowIdx+'" ';
						html += 'value="0" style="width:40px;">';
						
						$(cell0).html(html);
					}
					
				//	ANDOR컬럼 border 해제	
					if(tableId != '#gridStudyItem'){
						$('#' + dsTabCd.ANDOR_ID + '_' + rowIdx).css('border','');	
					}
				}
			}
		});

		
	//	지우고자하는 행보다 클경우 idx 재설정
		$(node).find("td input").each(function (){
			if(rowIdx > currRow ){
				var grpVal = 0;
				
				if(this.name.indexOf(dsTabCd.GR_LV_ID) >= 0){
					if(delGrpVal == this.value || this.value == 0){
						grpVal = 0;
						
					}else{
						grpVal = this.value;
					}
					
					var html = '';
					
					var param = "'"+dsTabCd.CODE+"'";
					
					html = '<i class="ion-ios-plus-outline grouping"';
					html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
					html += ' id="' + dsTabCd.GR_LV_BTN + '_' +rowIdx+'"';
					html += ' onclick="funcGrouping(this,' + rowIdx + ','+param+')">';
					html += '</i>';
					
					if(grpVal != 0){
						var max = $(tableId).getMaxGrpIdx(grpVal);
						var min = $(tableId).getMinGrpIdx(grpVal);
						
						if(min == rowIdx){
							html += '<span class="text-danger"> ┌</span>';
							
						}else if(max == rowIdx){
							html += '<span class="text-danger"> └</span>';
							
						}else{
							html += '<span class="text-danger"> │</span>';
						}
					}
					
					html += '<input type="'+hidden+'" ';
					html += 'name="' + dsTabCd.GR_LV_ID + '_' + rowIdx+'" ';
					html += 'id="' + dsTabCd.GR_LV_ID + '_' + rowIdx+'" ';
					
					if(delGrpVal === grpVal){
						html += 'value="0" style="width:40px;">';	
					}else{
						html += 'value="'+grpVal+'" style="width:40px;">';
					}
					
					$(cell0).html(html);
					
//					ANDOR컬럼 border 해제	
					if(tableId != '#gridStudyItem'){
						html = templeteAndOrForDeleteRow(data,rowIdx,dsTabCd.CODE);	
						$(cell1).html(html);
						$('#'+dsTabCd.ANDOR_ID + '_' + min).css('border','3px dotted #74DF00');
						
					}
					
					if((gvMethCd === 'CH' && tableId.indexOf('#gridSearch') >= 0) && (rowIdx == 0 || rowIdx == 1)){
						html += '-';
						html += '<input type="'+hidden+'" ';
						html += 'name="' + dsTabCd.GR_LV_ID + '_' + rowIdx+'" ';
						html += 'id="' + dsTabCd.GR_LV_ID + '_' + rowIdx+'" ';
						html += 'value="0" style="width:40px;">';
						
						$(cell0).html(html);
					}
				}
			}
		});
	});
}

var ____getMaxGrpIdx____;

$.fn.getMaxGrpIdx = function(grpIdx)
{
	var tableId = $(this).selector;
	var table 	= $(this).DataTable();
	var element = getElementId(tableId);
	
	
	var arrGroup = [];
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell0 = node.cells[0];
				
		$(node).find("td input").each(function (){
			if(this.name.indexOf(element) >= 0){
				if(this.value == grpIdx){
					arrGroup.push(rowIdx);
				}
			}
		});
	});
	
	
	
	var max = Math.max.apply(null,arrGroup);
	return max;
}

var ____getMinGrpIdx____;

$.fn.getMinGrpIdx = function(grpIdx)
{
	var tableId = $(this).selector;
	var table 	= $(this).DataTable();
	var element = getElementId(tableId);
	
	var arrGroup = [];
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell0 = node.cells[0];
				
		$(node).find("td input").each(function (){
			if(this.name.indexOf(element) >= 0){
				if(this.value == grpIdx){
					arrGroup.push(rowIdx);
				}
			}
		});
	});
	
	
	
	var min = Math.min.apply(null,arrGroup);
	return min;
}

var ____group_end_____;