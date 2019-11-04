
/**
 * 그룹
 * @param data
 * @param type
 * @param row
 * @param meta
 * @param tabCd
 * @returns
 */
function templeteGroup(data, type, row, meta, tabCd)
{
	var html = '';
	var elemGrp;
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	
//	코호트연구항목	
	if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
		html = '-';
		html += '<span></span>';
		html += '<input type="'+hidden+'" ';
		html += 'name="'+dsTabCd.GR_LV_ID + '_' + meta.row+'" ';
		html += 'id="'+dsTabCd.GR_LV_ID + '_' + meta.row+'" ';
		html += 'value="0" style="width:40px;">';
		
		return;
	}
	
	
	html = '<i class="ion-ios-plus-outline grouping"';
	html += ' style="font-weight:bolt;font-size:14px;cursor:pointer;"';
	html += ' id="' + dsTabCd.GR_LV_BTN + '_' + meta.row + '"';

	if( dsTabCd.CODE != 'CO'){	//대조군
		html += ' onclick="funcGrouping(this,' + meta.row + ','+"'"+dsTabCd.CODE+"'"+');">';
	}
	
	html += '</i>';
	
	if(row.GR_LV == "0" || isNull(row.GR_LV)){
		html += '<input type="'+hidden+'" ';
		html += 'name="'+dsTabCd.GR_LV_ID + '_' + meta.row+'" ';
		html += 'id="'+dsTabCd.GR_LV_ID + '_' + meta.row+'" ';
		html += 'value="0" style="width:40px;">';
		
	}else{
		var grpDisp = ' │';
		
		if(row.GR_LV_START === 'S'){
			grpDisp = ' ┌';
		}
		
		if(row.GR_LV_END === 'E'){
			grpDisp = ' └';
		}
		
		html += '<span class="text-danger">'+grpDisp+'</span>';
		
		html += '<input type="'+hidden+'" ';
		html += 'name="'+dsTabCd.GR_LV_ID + '_' + meta.row+'" ';
		html += 'id="'+dsTabCd.GR_LV_ID + '_' + meta.row+'" ';
		html += 'value="'+row.GR_LV+'" style="width:40px;">';
		
	}
	
	return html;
	
}

/**
 * 
 * @param data
 * @param type
 * @param row
 * @param meta
 * @param tabCd
 * @returns
 */
function templeteAndOr(data,type,row,meta,tabCd)
{
	
	var html = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	
	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
				html += '<select class="default-select4 form-control input-sm" ';
				html += 'name="' + dsTabCd.ANDOR_ID + '_' + meta.row + '" ';
				html += 'id="' + dsTabCd.ANDOR_ID + '_' + meta.row + '" ';
				
				if(gvActiveTab == "02" && dsTabCd.CODE === 'C'){
					html += 'disabled="disabled"';
				}else{
					html += '';
				}
				html += '>';
				
				
			//	저장된 값이 없으면	
				if(isNull(row.AND_OR)){
					if(gvActiveTab == "02" && dsTabCd.CODE === 'RQ'){
						html += '<option value="AND"> AND </option>';
						html += '<option value="OR" selected> OR </option>';
						
					}else{
						html += '<option value="AND"> AND </option>';
						html += '<option value="OR"> OR </option>';
					}
					
				}else{
					if(row.AND_OR === 'AND'){
						html += '<option value="AND" selected> AND </option>';
						html += '<option value="OR"> OR </option>';
						
					}else{
						html += '<option value="AND"> AND </option>';
						html += '<option value="OR" selected> OR </option>';
					}
				}
					
					
				html += '</select>';
			html += '</div>';
		html += '</div>';
	html += '</div>';

	
//	코호트 연구의 연구등록기간, 종료기간	
	if(row.TABLE === 'COHORT' && (row.COLUMN === 'RSCH_TERM' || row.COLUMN === 'RGST_TERM')){
		html = '-';
	}	
	
	return html;
}




/**
 * 포함 제외 여부 Templete
 * @param data
 * @param type
 * @param row
 * @param meta
 * @param tabCd
 * @returns
 */
function templeteIncExc(data,type,row,meta,tabCd)
{
	var html = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
				html += '<select class="default-select4 form-control input-sm" ';
				/*html += 'name="row_' + meta.row + '_incExc" ';
				html += 'id="row_' + meta.row + '_incExc" ';*/
				
				html += 'name="INCEXC_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="INCEXC_' + dsTabCd.CODE + '_' + meta.row + '" ';
				
				if(gvActiveTab == "02"){
					html += 'disabled="disabled"';
				}
				html += '>';
				
					if(isNull(row.INC_EXC) || row.INC_EXC === 'INC'){
						html += '<option value="INC" selected> 포함 </option>';
						html += '<option value="EXC"> 제외 </option>';	
					}else{
						html += '<option value="INC"> 포함 </option>';
						html += '<option value="EXC" selected > 제외 </option>';
					}
					
				html += '</select>';
			html += '</div>';
		html += '</div>';
	html += '</div>';
	
	
//	코호트 연구의 연구등록기간, 종료기간	
	if(row.TABLE === 'COHORT' && (row.COLUMN === 'RSCH_TERM' || row.COLUMN === 'RGST_TERM')){
		html = '-';
	}	
	
	return html;
}


/**
 * 기준일자여부
 * @param data
 * @param type
 * @param row
 * @param meta
 * @returns
 */
function templeteBaseDtYn(data,type,row,meta,tabCd)
{
	var html = '';
	
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	var disabled = '';
	if(gvActiveTab === '02' || row.ITEM_TYPE === 'DAT'){
		disabled = ' disabled ';
	}
	
	
	if(isNull(row.BASE_DT_COLUMN)){
		html = '<div class="row">';
			html += '<div class="checkbox disabled" >';
				html += '<label>';
					html += '<input type="checkbox" name="BASE_DT_COLUMN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'id="BASE_DT_COLUMN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'value="N"  class="baseDtYn" disabled>';
					html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i></span>';
				html += '</label>';
			html += '</div>';
		html += '</div>';
        
		
	}else{
		var checked = '';
		
		if((row.BASE_DT_YN === 'Y' || $('#BASE_DT_COLUMN_' + dsTabCd.CODE+'_'+meta.row).prop('checked')) && (row.ITEM_TYPE != 'DAT')){
			checked = ' checked ';
		}
		
		
		if(isNull(row.BASE_DT_COLUMN)){
			disabled = ' disabled ';
		}
		
		html = '<div class="row">';
			html += '<div class="checkbox '+disabled+'">';
				html += '<label>';
					html += '<input type="checkbox" name="BASE_DT_COLUMN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'id="BASE_DT_COLUMN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'value="Y" ';
					html += disabled;
					html += 'class="baseDtYn" '+checked+'>';
					html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i></span>';
				html += '</label>';
			html += '</div>';
		html += '</div>';
	}
	
	
	
//	코호트 연구의 연구등록기간, 종료기간	
	if(row.TABLE === 'COHORT' && (row.COLUMN === 'RSCH_TERM' || row.COLUMN === 'RGST_TERM')){
		html = '-';
	}	
	
	return html;
}

/**
 * 최초여부 Templete
 * @param data
 * @param type
 * @param row
 * @param meta
 * @param tabCd
 * @returns
 */
function templeteFirstYn(data,type,row,meta,tabCd)
{
	var html = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	var disabled = '';
	if(gvActiveTab === '02' || row.ITEM_TYPE === 'DAT'){
		disabled = ' disabled ';
	}
	
	/*if(isNull(row.BASE_DT_COLUMN)){*/
	if(row.ITEM_FIRST_YN === 'N'){
		html = '<div class="row">';
			html += '<div class="checkbox disabled" >';
				html += '<label>';
					html += '<input type="checkbox" ';
					html += 'name="FIRST_YN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'id="FIRST_YN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'value="N" disabled>';
					html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i></span>';
				html += '</label>';
			html += '</div>';
		html += '</div>';
        
		
	}else{
		var checked = '';

		if((row.FIRST_YN === 'Y' || $('#FIRST_YN_' + dsTabCd.CODE+'_'+meta.row).prop('checked')) && (row.ITEM_TYPE != 'DAT')){
			checked = ' checked ';
		}
		
		html = '<div class="row">';
			html += '<div class="checkbox '+disabled+'">';
				html += '<label>';
					html += '<input type="checkbox" ';
					html += 'name="FIRST_YN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += 'id="FIRST_YN_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += disabled;
					html += 'value="Y" '+checked+'>';
					html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i></span>';
				html += '</label>';
			html += '</div>';
		html += '</div>';
	}
	

	
//	코호트 연구의 연구등록기간, 종료기간	
	if(row.TABLE === 'COHORT' && (row.COLUMN === 'RSCH_TERM' || row.COLUMN === 'RGST_TERM')){
		html = '-';
	}	
	
	return html;
}




/**
 * Delete Row시 And Or Templete
 * @param data
 * @param rowIdx
 * @param tabCd
 * @returns
 */
function templeteAndOrForDeleteRow(data,rowIdx,tabCd)
{
	
	var html = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	
	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
				html += '<select class="default-select4 form-control input-sm" ';
				html += 'name="' + dsTabCd.ANDOR_ID + '_' + rowIdx + '" ';
				html += 'id="' + dsTabCd.ANDOR_ID + '_' + rowIdx + '" ';
				
				if(gvActiveTab == "02" && dsTabCd.CODE == 'C'){
					html += 'disabled="disabled"';
				}
				html += '>';
					html += '<option value="AND" selected> AND </option>';
					html += '<option value="OR"> OR </option>';
					
				html += '</select>';
			html += '</div>';
		html += '</div>';
	html += '</div>';
	
	return html;
}


/**
 * 삭제여부
 * @param data
 * @param type
 * @param row
 * @param meta
 * @returns
 */
function templeteDeleteYn(data,type,row,meta)
{
	var html = '';
	
	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
			html += '<span class="edit_delete" style="cursor:pointer;"><i class="fa fa-trash"></i></span>';
			html += '</div>';
		html += '</div>';
	html += '</div>';

	
//	코호트 연구의 연구등록기간, 종료기간	
	if(row.TABLE === 'COHORT' && (row.COLUMN === 'RSCH_TERM' || row.COLUMN === 'RGST_TERM')){
		html = '-';
	}	
	
	return html;
}

/**
 * 
 * @param data
 * @param type
 * @param row
 * @param meta
 * @param tabCd
 * @returns
 */
function templeteText(data,type,row,meta,tabCd)
{
	var html = '';
	var disabled = '';
	var readonly = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	if(gvActiveTab === '02' && (dsTabCd.CODE === 'C' || dsTabCd.CODE === 'CA' || dsTabCd.CODE === 'CO')){
		disabled = 'disabled';
		
	}
	
	if(row.TABLE.indexOf('TMPV') >= 0){
		disabled = 'disabled';
	}
	
		
	html = '<div class="row">';
		html += '<div class="col-md-4">';
			html += '<div class="form-group">';
			html += '<select '+disabled+' ';
			html += readonly;
			html += 'class="default-select4 form-control input-sm" ';
			html += 'name="selTEX_LIST_'+dsTabCd.CODE+'_'+meta.row+'" ';
			html += 'id="selTEX_LIST_'+dsTabCd.CODE+'_'+meta.row+'" ';
			html += 'onchange="javascript:changeTextValue(this,'+meta.row+','+"'"+dsTabCd.CODE+"'"+');">';
			
				for(var i=0 ; i < gvItemMgmtTxtList.length; i++){
					if(isNull(row.INPUT_VAL0)){
						if(gvItemMgmtTxtList[i].VALUE == 'LIKE'){
							html += '<option value="'+gvItemMgmtTxtList[i].VALUE+'" selected>';
							html += gvItemMgmtTxtList[i].TEXT;
							html += '</option>';	
						}else{
							html += '<option value="'+gvItemMgmtTxtList[i].VALUE+'">';
							html += gvItemMgmtTxtList[i].TEXT;
							html += '</option>';
						}

					}else{
						if(gvItemMgmtTxtList[i].VALUE == row.INPUT_VAL0){
							html += '<option value="'+gvItemMgmtTxtList[i].VALUE+'" selected>';
							html += gvItemMgmtTxtList[i].TEXT;
							html += '</option>';
							
						}else{
							html += '<option value="'+gvItemMgmtTxtList[i].VALUE+'">';
							html += gvItemMgmtTxtList[i].TEXT;
							html += '</option>';
						}
					}
					
				}
				
				html += '</select>';
			html += '</div>';
		html += '</div>';
		
		html += '<div class="col-md-5" class="txtInputValue" id="divWrapTextInputVal_'+dsTabCd.CODE+'_'+meta.row+'">';
		
		if(row.INPUT_VAL0 === 'BETWEEN'){
			html += '<div class="form-group text-left" >';
				html += '<input type="text" ';
				html += ' ' + disabled + ' ';
				html += 'class="form-control input_text" ';
				html += 'name="txtTEX1_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="txtTEX1_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'maxlength="100" style="width:48%;" value="'+row.INPUT_VAL1+'">';

				html += ' ';
				
				html += '<input type="text" ';
				html += ' ' + disabled + ' ';
				html += 'class="form-control input_text" ';
				html += 'name="txtTEX2_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="txtTEX2_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'maxlength="100" style="width:48%;" value="'+row.INPUT_VAL2+'">';
			html += '</div>';
			
		}else if(row.INPUT_VAL0 === 'REGEXP_LIKE'){
			html += '<div class="form-group text-left">';
				html += '<input type="text" ';
				html += ' ' + disabled + ' ';
				html += 'class="form-control input_text" ';
				html += 'name="txtTEX1_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="txtTEX1_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'maxlength="100" style="width:48%;" value="'+row.INPUT_VAL1+'">';
	
				html += ' ';
				
				html += '<input type="text" ';
				html += ' ' + disabled + ' ';
				html += 'class="form-control input_text" ';
				html += 'name="txtTEX2_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="txtTEX2_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'onkeyup="this.value=regexp_filter(this.value);" ';
				html += 'maxlength="4" style="width:30%;" value="'+nvl(row.INPUT_VAL2,'im')+'">';
				
				html += '<button type="button" class="btn btn-xs btn-primary btn-primary btnRegexpHelp" style="margin-left:4px;" id="btnRegExpHelp">';
				html += '<i class="fa fa-info-circle" aria-hidden="true"></i></button>';
			html += '</div>';
			
		}else{
			if(row.TABLE.indexOf('TMPV') >= 0){
				row.INPUT_VAL1 = '%';
			}
			
			html += '<div class="form-group text-left" >';
				html += '<input type="text" ';
				html += ' ' + disabled + ' ';
				html += 'class="form-control input_text" ';
				html += 'name="txtTEX1_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="txtTEX1_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'maxlength="100" style="width:96%;" value="'+nvl(row.INPUT_VAL1,'')+'">';
			html += '</div>';
		}
		
		html += '</div>';
		
		if(gvIS_NULL_OR_BLANK_YN === 'Y'){
			html += '<div class="col-md-3" >';
				html += '<div class="row" style="display:;">';
					html += '<div class="checkbox" >';
						html += '<label>';
							if(row.IS_NULL_OR_BLANK === 'Y' || $('#chkIsNullOrBlank_'+dsTabCd.CODE+'_'+meta.row).prop('checked')){
								html += '<input type="checkbox" checked ';
								html += 'class="chkIsNullOrBlank" ';
								html += 'name="chkIsNullOrBlank" ';
								html += 'id="chkIsNullOrBlank_'+dsTabCd.CODE+'_'+meta.row+'" ';
								html += 'value="'+meta.row+'" ';
								html += 'onclick="onClickIsNullOrBlankCheck('+"'"+tabCd+"'"+','+meta.row+',this) ">';
								
								setNullOrBlank(tabCd,meta.row,row,true);
		
								
							}else{
								html += '<input type="checkbox" ';
								html += 'class="chkIsNullOrBlank" ';
								html += 'name="chkIsNullOrBlank" ';
								html += 'id="chkIsNullOrBlank_'+dsTabCd.CODE+'_'+meta.row+'" ';
								html += 'value="'+meta.row+'" ';
								html += 'onclick="onClickIsNullOrBlankCheck('+"'"+tabCd+"'"+','+meta.row+',this) ">';
								
								setNullOrBlank(tabCd,meta.row,row,false);
							}
							
	
							html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i>';
							html += '<span class="badge" style="margin-left:24px;margin-top:-4px;background-color: #3c8dbc;">blank</span>';
							html += '</span>';
						html += '</label>';
					html += '</div>';
				html += '</div>';
			html += '</div>';
		}
		
		
	html += ' </div>';	
	
	return html;
}





/**
 * 
 * @param elemId
 * @returns
 */
function templeteNumber(data,type,row,meta,tabCd){
	var html = '';
	var disabled = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}

	
	if(gvActiveTab === '02' && (dsTabCd.CODE === 'C' || dsTabCd.CODE === 'CA' || dsTabCd.CODE === 'CO')){
		disabled = 'disabled';
		
	}
	
	html = '<div class="row">';
		html += '<div class="col-md-4">';
			html += '<div class="form-group">';
				html += '<select class="default-select4 form-control input-sm" ';
				html += 'name="selNUM_LIST_'+dsTabCd.CODE+'_'+meta.row+'" ';
				html += 'id="selNUM_LIST_'+dsTabCd.CODE+'_'+meta.row+'" ';
				html += 'onchange="javascript:changeNumberValue(this,'+meta.row+','+"'"+dsTabCd.CODE+"'"+');" '+disabled+'>';
				for(var i=0 ; i < gvItemMgmtNumList.length; i++){
					if(gvItemMgmtNumList[i].VALUE == row.INPUT_VAL0){
						html += '<option value="'+gvItemMgmtNumList[i].VALUE+'" selected>';
						html += gvItemMgmtNumList[i].TEXT;
						html += '</option>';
						
					}else{
						html += '<option value="'+gvItemMgmtNumList[i].VALUE+'">';
						html += gvItemMgmtNumList[i].TEXT;
						html += '</option>';
					}
				}
				
				html += '</select>';
			html += '</div>';
		html += '</div>';
		
		html += '<div class="col-md-8" id="divWrapNUmberInputVal_' + dsTabCd.CODE + '_' + meta.row+'">';
			html += '<div class="form-group">';
				html += '<input type="text" ';
					html += 'class="form-control input_num" ';
					html += ' ' + disabled + ' ';
					html += 'style="width:40%;" ';
					html += 'name="txtNUM1_' + dsTabCd.CODE + '_' + meta.row + '" ';
					html += 'id="txtNUM1_' + dsTabCd.CODE + '_' + meta.row + '" ';
					html += 'value="' + nvl(row.INPUT_VAL1,0) + '" ';
					html += disabled;
					html += 'onkeyup="this.value=number_filter(this.value);" ';
					
				html += '>';
				
				if(row.INPUT_VAL0 === 'BETWEEN' || isNull(row.INPUT_VAL0)){
					html += '<span  style="margin-left:4px;margin-right:4px;">~</span>';
					
					html += '<input type="text" ';
						html += 'class="form-control input_num" ';
						html += ' ' + disabled + ' ';
						html += 'style="width:40%;" ';
						html += 'name="txtNUM2_' + dsTabCd.CODE + '_' + meta.row + '" ';
						html += 'id="txtNUM2_' + dsTabCd.CODE + '_' + meta.row + '" ';
						
						html += 'value="' + nvl(row.INPUT_VAL2,0) + '" ';
						html += disabled;
						html += 'onkeyup="this.value=number_filter(this.value);" ';
						
					html += '>';
				}
				
			html += '</div>';
		html += '</div>';
	html += ' </div>';	
	
	return html;
}



/**
 * Code set templete
 * @param elemId
 * @param data
 * @returns
 */
function templeteCode(data,type,row,meta,tabCd){
	var html = '';
	var disabled = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	if(gvActiveTab === '02' && (dsTabCd.CODE === 'C' || dsTabCd.CODE === 'CA' || dsTabCd.CODE === 'CO')){
		disabled = 'disabled';
		
	}
	

	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
			
	if(isNullOrEmpty(row.CODE_SET)){
		if(row.CODE_TYPE === 'NON'){
			html += '<input type="text" class="form-control input_text" ';
			html += 'name="txtPOPUP_VAL_' + dsTabCd.CODE + '_' + meta.row + '" ';
			html += 'id="txtPOPUP_VAL_' + dsTabCd.CODE + '_' + meta.row+'" ';
			html += 'value="'+nvl(row.INPUT_VAL1,'')+'" ';
			html += 'style="width:90%;margin-right:8px;" ';
			html += disabled;
			html += '>';
		}
		
	}else{
		var jObj = JSON.parse(row.CODE_SET)[0];
	
		html += '<select class="default-select4 form-control input-sm" ';
		html += 'name="selCODE_' + dsTabCd.CODE + '_' + meta.row + '" ';
		html += 'id="selCODE_' + dsTabCd.CODE + '_' + meta.row + '" ';
		html += disabled;
		html += ' >';
		
		$.each(jObj,function(key, value){
			if(key === row.INPUT_VAL0){
				html += '<option value="'+key+'" selected>';
				html += value;
				html += '</option>';
				
			}else{
				html += '<option value="'+key+'">';
				html += value;
				html += '</option>';
			}
			
		});
		html += '</select>';
				
				
	}
	
	
			html += '</div>';	//
		html += '</div>';		//col
	html += '</div>';			//row

	
	

	
	return html;
}



/**
 * 
 * @param data
 * @param type
 * @param row
 * @param meta
 * @param tabCd
 * @returns
 */
function templeteDate(data,type,row,meta,tabCd)
{
	var html = '';
	var disabled = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	if(gvActiveTab === '02' && (dsTabCd.CODE === 'C' || dsTabCd.CODE === 'CA' || dsTabCd.CODE === 'CO')){
		disabled = ' disabled ';
		
	}
	
	
	html = '<div class="row">';
		html += '<div class="col-md-6">';
			html += '<div class="form-group">';
				html += '<div class="input-group">';
					html += '<div class="input-group-addon">';
					
					if(disabled.trim() === 'disabled'){
						html += '<i class="fa fa-calendar"></i>';
					}else{
						html += '<i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'+"'txtFromDt_"+dsTabCd.CODE+'_' + meta.row + "'"+')"></i>';
						
					}
						
					html += '</div>';
					
					html += '<input class="form-control pull-right font-size-12 maskDateInput "';
					html += ' type="text" ';
					html += ' name="calFROM_DT_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += ' id="txtFromDt_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += ' value="' + nvl(row.INPUT_VAL1,gvDate) +'"';
					html += disabled;
					html += '>   ';
					
				html += '</div>';								//input date
			html += '</div>';									//form-group
		html += '</div>';										//col
		
		html += '<div class="col-md-6">';
			html += '<div class="form-group">';
				html += '<div class="input-group">';
					html += '<div class="input-group-addon">';
					
					if(disabled.trim() === 'disabled'){
						html += '<i class="fa fa-calendar"></i>';
						
					}else{
						html += '<i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'+"'txtToDt_"+dsTabCd.CODE+'_' + meta.row + "'"+')"></i>';
						
					}
						
					html += '</div>';
					
					html += '<input class="form-control pull-right font-size-12 maskDateInput"';
					html += ' type="text" ';
					html += ' name="calTO_DT_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += ' id="txtToDt_'+dsTabCd.CODE+'_'+meta.row+'" ';
					html += ' value="' + nvl(row.INPUT_VAL2,gvDate) +'"';
					html += disabled;
					
					html += '>';
				html += '</div>';								//input date
			html += '</div>';									//form-group
		html += '</div>';										//col
	html += ' </div>			';								//row
	

//	코호토연구 연구종료일	
	if(row.COLUMN === 'RSCH_TERM'){
		html = '<div class="row">';
			html += '<div class="col-md-12">';
				html += '<div class="form-group">';
					html += '<div class="input-group date">';
						html += '<div class="input-group-addon">';
							html += '<i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'+"'txtFromDt_"+dsTabCd.CODE+'_' + meta.row + "'"+')"></i>';
						html += '</div>';
						
						html += '<input class="form-control pull-right font-size-12 maskDateInput "';
						html += ' type="text" ';
						html += ' name="calFROM_DT_'+dsTabCd.CODE+'_'+meta.row+'" ';
						html += ' id="txtFromDt_'+dsTabCd.CODE+'_'+meta.row+'" ';
						html += ' value="' + nvl(row.INPUT_VAL1,gvDate) +'"';
						html += disabled;
						html += '>   ';
						
						
					html += '</div>';								//input date
				html += '</div>';									//form-group
			html += '</div>';										//col
		html += ' </div>			';	//row
	}	
	
	return html;
}



/**
 * 
 * @param elemId
 * @param codeSet : 코드셋(JSON, SQL)
 * @param popupId
 * @param input_val1 : 저장된 값
 * @param rowIdx
 * @param row : CC_ITEM_MGMT 항목 값
 * @returns
 */
function templetePopup(data,type,row,meta,tabCd){
	var html = '';
	
	var css = '';
	var disabled = '';
	var visable = '';
	
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	if(gvActiveTab === '02' && (dsTabCd.CODE === 'C' || dsTabCd.CODE === 'CA' || dsTabCd.CODE === 'CO')){
		if( meta.settings.sTableId === 'gridSearch_02' ||
			meta.settings.sTableId === 'gridCaseGroup_02' ||
			meta.settings.sTableId === 'gridControlGroup_02'){
			disabled = ' disabled ';
			visable = 'none';
		}
		
	}
	
	
	
		
	html = '<div class="row">';
		html += '<div class="col-md-6" id="divWrapPopupInputVal_'+dsTabCd.CODE+'_'+meta.row+'">';
		
		if(row.INPUT_VAL0 === 'Y'|| $('#chkIsRegExp_'+dsTabCd.CODE+'_'+meta.row).prop('checked')){
			html += '<div class="form-group" style="text-align:left;">';
			html += '<input type="text" ';
			html += 'class="form-control input_text" ';
			html += 'name="txtTEX1_' + tabCd + '_' + meta.row + '" ';
			html += 'id="txtTEX1_' + tabCd + '_' + meta.row + '" ';
			if(isNull(row)){
				html += 'maxlength="100" style="width:48%;" value=""'+disabled+'>';
			}
			else{
				html += 'maxlength="100" style="width:48%;" value="'+row.INPUT_VAL1+'"'+disabled+'>';			
			}

			
			html += '<input type="text" ';
			html += 'class="form-control input_text" ';
			html += 'name="txtTEX2_' + tabCd + '_' + meta.row + '" ';
			html += 'id="txtTEX2_' + tabCd + '_' + meta.row + '" ';
			html += 'onkeyup="this.value=regexp_filter(this.value);" ';
			if(isNull(row)){
				html += 'maxlength="4" style="width:30%;"  value="im"'+disabled+'>';
			}
			else{
				html += 'maxlength="4" style="width:30%;"  value="'+nvl(row.INPUT_VAL2,'im')+'"'+disabled+'>';
			}

			html += '<button type="button" class="btn btn-xs btn-primary btn-primary btnRegexpHelp" style="margin-left:4px;" id="btnRegExpHelp">';
			html += '<i class="fa fa-info-circle" aria-hidden="true"></i></button>';
			
			html += '</div>';
		}	
		else{
				html += '<div class="form-group">';
				html += '<input type="text" class="form-control input_text" ';
				html += 'name="txtPOPUP_VAL_' + dsTabCd.CODE + '_' + meta.row + '" ';
				html += 'id="txtPOPUP_VAL_' + dsTabCd.CODE + '_' + meta.row+'" ';
				html += 'value="'+nvl(row.INPUT_VAL1,'')+'" ';
				html += 'style="width:75%;margin-right:8px;" ';
				html += disabled;
				html += '>';
				
				var element = "'txtITEM_" + meta.row+"'";
				
				if(gvActiveTab === '02' && (dsTabCd.CODE === 'C' || dsTabCd.CODE === 'CA' || dsTabCd.CODE === 'CO')){
			//	if(gvActiveTab === '02' && (meta.settings.sTableId === 'gridSearch_02' || meta.settings.sTableId === 'gridCaseGroup_02' || meta.settings.sTableId === 'gridControlGroup_02')){
					if(!isNull(meta.settings)){
						if(meta.settings.sTableId === 'gridSearch_02' || meta.settings.sTableId === 'gridCaseGroup_02' || meta.settings.sTableId === 'gridControlGroup_02'){
							html += ' ';		
						}else{
							html += '<button class="btn btn-sm btn-primary" ';
							html += 'onclick="javascript:openPopup( ';
							html += "'" + row.POPUP_PROGRAM_ID + "',";
							html += "'" + row.INPUT_VAL1 + "',";
							html += meta.row + ',';
							html += row.ITEM_SEQ + ',';
							html += row.ITEM_CATE_SEQ + ',';
							html += row.ITEM_CATE_DETL_SEQ + ',';
							html += "'" + dsTabCd.CODE + "',";
							html += "'" + row.INSTCD_YN + "',";
							html += "'" + row.POPUP_COLUMN + "',";
							html += "'" + row.ITEM_NM + "'";
							html += ')" ';
							html += 'name="btnPopup_'+tabCd+'_'+meta.row+'" ';
							html += 'id="btnPopup_'+tabCd+'_'+meta.row+'">';
							html += '<i class="fa fa-search"></i>';
							html += '</button>';
						}
					}else{
						html += '<button class="btn btn-sm btn-primary" ';
						html += 'onclick="javascript:openPopup( ';
						html += "'" + row.POPUP_PROGRAM_ID + "',";
						html += "'" + row.INPUT_VAL1 + "',";
						html += meta.row + ',';
						html += row.ITEM_SEQ + ',';
						html += row.ITEM_CATE_SEQ + ',';
						html += row.ITEM_CATE_DETL_SEQ + ',';
						html += "'" + dsTabCd.CODE + "',";
						html += "'" + row.INSTCD_YN + "',";
						html += "'" + row.POPUP_COLUMN + "',";
						html += "'" + row.ITEM_NM + "'";
						html += ')" ';
						html += 'id="btnPopup_'+tabCd+'_'+meta.row+'">';
						html += '<i class="fa fa-search"></i>';
						html += '</button>';
					}
					
					html += '<input type="hidden" class="form-control"  ';
					html += 'name="txtCODE_SET" id="txtCODE_SET_' + tabCd + '_' + meta.row + '" value="'+encodeURIComponent(row.CODE_SET)+'" /> ';
					
				}else{
					if(disabled.trim() === 'disabled'){
						html += ' ';
					}else{
						html += '<button class="btn btn-sm btn-primary" ';
						html += 'onclick="javascript:openPopup( ';
						html += "'" + row.POPUP_PROGRAM_ID + "',";
						html += "'" + row.INPUT_VAL1 + "',";
						html += meta.row + ',';
						html += row.ITEM_SEQ + ',';
						html += row.ITEM_CATE_SEQ + ',';
						html += row.ITEM_CATE_DETL_SEQ + ',';
						html += "'" + dsTabCd.CODE + "',";
						html += "'" + row.INSTCD_YN + "',";
						html += "'" + row.POPUP_COLUMN + "',";
						html += "'" + row.ITEM_NM + "'";
						html += ')" ';
						html += 'id="btnPopup_'+tabCd+'_'+meta.row+'">';
						html += '<i class="fa fa-search"></i>';
						html += '</button>';
					}
					
					html += '<input type="hidden" class="form-control"  ';
					html += 'name="txtCODE_SET" id="txtCODE_SET_' + tabCd + '_' + meta.row + '" value="'+encodeURIComponent(row.CODE_SET)+'" /> ';	
					
				}
				html += '</div>';
			}
			
		html += '</div>';
		
	
		if(gvIS_NULL_OR_BLANK_YN === 'Y'){
			html += '<div class="col-md-3" >';
				html += '<div class="row" style="display:;">';
				
					html += '<div class="checkbox" >';
						html += '<label>';
							if(row.INPUT_VAL0 === 'Y' || $('#chkIsRegExp_'+dsTabCd.CODE+'_'+meta.row).prop('checked')){
								html += '<input type="checkbox" checked ';
								html += 'class="chkIsRegExp" ';
								html += 'name="chkIsRegExp" ';
								html += 'id="chkIsRegExp_'+dsTabCd.CODE+'_'+meta.row+'" ';
								html += 'value="'+meta.row+'" '+disabled;
								html += 'onclick="onClickIsRegExpCheck('+"'"+tabCd+"'"+','+meta.row+',this,'+"'"+disabled+"'"+') ">';
								
								//setRegExp(tabCd, meta.row, row, true, disabled);
							}else{
								html += '<input type="checkbox" ';
								html += 'class="chkIsRegExp" ';
								html += 'name="chkIsRegExp" ';
								html += 'id="chkIsRegExp_'+dsTabCd.CODE+'_'+meta.row+'" ';
								html += 'value="'+meta.row+'" '+disabled;
								html += 'onclick="onClickIsRegExpCheck('+"'"+tabCd+"'"+','+meta.row+',this,'+"'"+disabled+"'"+') ">';
								
								//setRegExp(tabCd, meta.row, row, false, disabled);
							}
							
							html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i>';
							html += '<span class="badge" style="margin-left:24px;margin-top:-4px;background-color:#3c8dbc;">REGEXP</span>';
							html += '</span>';
						html += '</label>';
					html += '</div>';
				html += '</div>';
			html += '</div>';
			
			html += '<div class="col-md-3" >';
			html += '<div class="row" style="display:;">';
			
				html += '<div class="checkbox" >';
					html += '<label>';
						if(row.IS_NULL_OR_BLANK === 'Y' || $('#chkIsNullOrBlank_'+dsTabCd.CODE+'_'+meta.row).prop('checked')){
							html += '<input type="checkbox" checked ';
							html += 'class="chkIsNullOrBlank" ';
							html += 'name="chkIsNullOrBlank" ';
							html += 'id="chkIsNullOrBlank_'+dsTabCd.CODE+'_'+meta.row+'" ';
							html += 'value="'+meta.row+'" ';
							html += 'onclick="onClickIsNullOrBlankCheck('+"'"+tabCd+"'"+','+meta.row+',this) ">';
							
							setNullOrBlank(tabCd,meta.row,row,true);

							
						}else{
							html += '<input type="checkbox" ';
							html += 'class="chkIsNullOrBlank" ';
							html += 'name="chkIsNullOrBlank" ';
							html += 'id="chkIsNullOrBlank_'+dsTabCd.CODE+'_'+meta.row+'" ';
							html += 'value="'+meta.row+'" ';
							html += 'onclick="onClickIsNullOrBlankCheck('+"'"+tabCd+"'"+','+meta.row+',this) ">';
							
							setNullOrBlank(tabCd,meta.row,row,false);
						}
						
						html += '<span class="cr" style="margin-top:6px;"><i class="cr-icon glyphicon glyphicon-ok"></i>';
						html += '<span class="badge" style="margin-left:24px;margin-top:-4px;background-color:#3c8dbc;">blank</span>';
						html += '</span>';
					html += '</label>';
				html += '</div>';
			html += '</div>';
		html += '</div>';
		}
		
		
	html += ' </div>';		//row
	
	
	return html;
}


function templeteTarget(data,type,row,meta)
{
	var html = '';
	
	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
				html += '<input type="text" class="form-control" ';
				html += 'id="txtCNT_'+meta.row+'"';
				html += 'name="txtCNT_'+meta.row+'" ';
				html += 'value="'+nvl(row.CNT,'')+'" ';
				html += 'readonly ';
				html += 'style="width:55%;text-align:right;" >';
				
				if(gvActiveTab === "01"){
					html += '<span  style="margin-left:4px;margin-right:2px;"> </span>';
					
					html += '<button type="button" class="btn btn-xs btn-primary btn-primary" onclick="getCount('+meta.row+')">';
					html += '<i class="fa fa-flash"></i>';
					html += '</button>';
				}
				
			html += '</div>';
		html += '</div>';
	html += '</div>';
	
//	코호트 연구의 연구등록기간, 종료기간	
	if(row.TABLE === 'COHORT' && (row.COLUMN === 'RSCH_TERM' || row.COLUMN === 'RGST_TERM')){
		html = '-';
	}
		
	return html;

}


function templeteTarget_CC(tableId, data, type, row, meta)
{
	var html 	= '';
	var param 	= '';
	var gbnTarget = '';
	
	param = "'" + tableId.replace('#','') + "'";
	
	if(tableId.indexOf('gridCaseGroup') >= 0){
		gbnTarget = 'CA';
		
	}else if(tableId.indexOf('gridControlGroup') >= 0){
		gbnTarget = 'CO';
		
	}

	html = '<div class="row">';
		html += '<div class="col-md-12">';
			html += '<div class="form-group">';
				html += '<input type="text" class="form-control" ';
				html += 'id="txtCNT_' + gbnTarget + '_' + meta.row + '"';
				html += 'name="txtCNT_' + gbnTarget + '_' + meta.row + '"';
				//html += 'name="txtCNT_' + meta.row + '" ';
				html += 'value="'+nvl(row.CNT,'')+'" ';
				html += 'readonly ';
				html += 'style="width:55%;text-align:right;" >';
				
				if(gvActiveTab === "01"){
					html += '<span  style="margin-left:4px;margin-right:2px;"> </span>';
					
					html += '<button type="button" class="btn btn-xs btn-primary btn-primary" ';
					html += 'onclick="javascript:getCountCaseControl('+param+','+meta.row+')">';
					html += '<i class="fa fa-flash"></i>';
					html += '</button>';
				}
			html += '</div>';
		html += '</div>';
	html += '</div>';
	
	return html;

}


function templeteRange(data,type,row,meta,tabCd){
	var html = '';
	
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	
	var table = $('#' + dsTabCd.TABLE_ID).DataTable();
	var node = table.row(meta.row).node();
	
	var cell5 = node.cells[5];
	
	if(gvMethCd === 'CS' || gvMethCd === 'CC'){
		html = '<select style="float:left;margin-right:5px;" ';
		html += 'name="selRANGE_CD" ';
		html += 'id="" ';
		html += 'class="default-select4 form-control input-sm selRANGE_CD">';
		
		for(var i=0; i < gvRangeCdList.length; i++){
			if(row.RANGE_CD === gvRangeCdList[i].VALUE){
				html += '<option value="'+gvRangeCdList[i].VALUE+'" selected>';
				html += gvRangeCdList[i].TEXT;
				html += '</option>';
			}else{
				html += '<option value="'+gvRangeCdList[i].VALUE+'">';
				html += gvRangeCdList[i].TEXT;
				html += '</option>';
			}
		}
		
		html += '</select>';
		
		if(row.RANGE_CD === 'R' || row.RANGE_CD === 'P' || row.RANGE_CD === 'A'){
			html += '<div class="divRANGE_CD" style="">';
			html += '<input type="text" name="txtRANGE_DN" class="form-control input-text" ';
			html += 'style="float:left;width:30%;height:34px;" ';
			html += 'value="'+row.RANGE_DN+'" ';
			html += 'onkeyup="this.value=number_filter(this.value);" ';
			html += '>';
			html += '일';
			html += '</div>';
		}
		
		$(cell5).html(html);
		
	}else{
		html = '<select style="float:left;margin-right:5px;" ';
		html += 'name="selAGG_CD" ';
		html += 'id="" ';
		html += 'onchange="javascript:changeAgg(this,'+meta.row+');"" ';
		html += 'class="default-select4 form-control input-sm selAGG_CD">';
		
		for(var i=0; i < gvAggCdList.length; i++){
			if(gvAggCdList[i].VALUE === row.AGG){
				html += '<option value="'+gvAggCdList[i].VALUE+'" selected>';
				html += gvAggCdList[i].TEXT;
				html += '</option>';
			}else{
				if(row.ITEM_TYPE === 'DAT' || row.ITEM_TYPE === 'NUM'){
					html += '<option value="'+gvAggCdList[i].VALUE+'">';
					html += gvAggCdList[i].TEXT;
					html += '</option>';
					
				}else{
					if( gvAggCdList[i].VALUE === 'MIN' || 
						gvAggCdList[i].VALUE === 'MAX' || 
						gvAggCdList[i].VALUE === 'AVG'){
						continue;
					}
					
					html += '<option value="'+gvAggCdList[i].VALUE+'">';
					html += gvAggCdList[i].TEXT;
					html += '</option>';
				}
			}
		}
		
		html += '</select>';	
		
	//	주기편차	
		var display = 'none';
		
		if(data.AGG === 'PER'){
			display = 'inline-block';
		}
		print_bigcenmed(display+"1");
		html += '<div id="divPeriodWrap_'+meta.row+'" style="display:'+display+';">';
			html += '<select id="selRANGE_CD_'+meta.row+'" name="selRANGE_CD" ';
			html += 'style="margin-left:5px;margin-right:5px;float:left;" ';
			html += 'class="default-select4 form-control input-sm selAGG_CD"';
			html += '>';
				for(var i=0; i < gvDeviationCdList.length; i++){
					if(row.RANGE_CD === gvDeviationCdList[i].VALUE){
						html += '<option value="'+gvDeviationCdList[i].VALUE+'" selected>';	
					}else{
						html += '<option value="'+gvDeviationCdList[i].VALUE+'">';
					}
					
					html += gvDeviationCdList[i].TEXT;
					html += '</option>';					
				}
			html += '</select>';
			
			html += '<span></span>';
			
			html += '<input type="text" name="txtRANGE_DN" id="txtRANGE_DN_'+meta.row+'" ';
			html += 'value="'+nvl(row.RANGE_DN,'')+'" class="form-control input-text" ';
			html += 'onkeyup="this.value=number_filter(this.value);" ';
			html += '> ';
			
			html += '&nbsp;일';
		html += '</div>';
		
		$(cell5).html(html);
	}
	
	return html;
}


/**
 * 오픈팝업
 * @param popupId
 * @param input_val1
 * @param rowIdx
 * @param item_seq
 * @param item_cate_seq
 * @param item_cate_detl_seq
 * @param tabCd
 * @param instcdYn : 사업장 적용 여부
 * @returns
 */
function openPopup(popupId, input_val1, rowIdx, item_seq, item_cate_seq, item_cate_detl_seq,tabCd,instcdYn,popupColumn,itemNm){	
	var modalId = "";
	
	gvCurrentRow = rowIdx;
	gvPopupTabCd = tabCd;
	
	switch(popupId){
		case "P_COMMON_CODE":
			modalId = "#popCSModal";
			break;
			
		case "P_COMMOM_CODE":
			modalId = "#popCSModal";
			break;
			
		case "P_COMMON_CODE_KEY":
			modalId = "#popCSModal";
			break;
			
		case "P_COMMOM_CODE_KEY":		//원본데이터 오타
			modalId = "#popCSModal";
			break;
			
		case "P_COMMON_CODE_1H":
			modalId = "#pop1HModal";
			break;
			
		case "P_COMMON_CODE_2H":
			modalId = "#pop2HModal";
			break;
			
		case "P_COMMON_CODE_3H":
			modalId = "#pop3HModal";
			break;
			
		case "P_COMMON_CODE_1HT":
			modalId = "#pop1HTModal";
			break;
			
		case "P_COMMON_CODE_2HT":
			modalId = "#pop2HTModal";
			break;
			
		case "P_COMMON_CODE_3HT":
			modalId = "#pop3HTModal";
			break;
			
		case "P_COMMON_CODE_1HT_MR":
			modalId = "#pop1HTMRModal";
			break;
			
		case "P_COMMON_CODE_2HT_MR":
			modalId = "#pop2HTMRModal";
			break;
			
		case "P_COMMON_CODE_3HT_MR":
			modalId = "#pop3HTMRModal";
			break;
			
		case "P_ORDR_CODE":
			modalId = "#popPModal";
			break;
			
		case "P_DISINX":
			modalId = "#popWModal";
			break;
			
		case "P_SYNONYM":
			modalId = "#popKWModal";
			break;
			
			
		default:
			break;
	}
	
	var args = {};
	
//	if(isNull(input_val1) || input_val1 === 'undefined'){
	if(isNull($('#txtPOPUP_VAL_' + tabCd + '_' + rowIdx).val())){
		args.CODE_SET 	= $('#txtCODE_SET_' + tabCd + '_' + rowIdx).val();
		args.VALUE 		= nvl($('#txtPOPUP_VAL_' + tabCd + '_' + rowIdx).val(),'');
		
		
		//id="txtCODE_SET_'+tabCd+'_'+meta.row+'" 
		
	}else{
		var paramVal = '';
		
		//args.CODE_SET = nvl($('#txtCODE_SET_' + rowIdx).val(),'');
		args.CODE_SET 	= $('#txtCODE_SET_' + tabCd + '_' + rowIdx).val();
		
		if(popupId.indexOf('3H') >= 0){
			paramVal = $('#txtPOPUP_VAL_' + tabCd + '_' + (rowIdx - 2)).val();
			paramVal += gvSplitChar;
			paramVal += $('#txtPOPUP_VAL_' + tabCd + '_' + (rowIdx - 1)).val();
			paramVal += gvSplitChar;
			paramVal += $('#txtPOPUP_VAL_' + tabCd + '_' + rowIdx).val();
			
		}else if(popupId.indexOf('2H') >= 0){
			paramVal = $('#txtPOPUP_VAL_' + tabCd + '_' + (rowIdx - 1)).val();
			paramVal += gvSplitChar;
			paramVal += $('#txtPOPUP_VAL_' + tabCd + '_' + rowIdx).val();
		//	paramVal += input_val1;	
			
			
		}else{
			paramVal += $('#txtPOPUP_VAL_' + tabCd + '_' + rowIdx).val();
		//	paramVal = input_val1;
			
		}
		args.VALUE = paramVal;
	}
	
	args.ITEM_SEQ = item_seq;
	args.ITEM_CATE_SEQ = item_cate_seq;
	args.ITEM_CATE_DETL_SEQ = item_cate_detl_seq;
	args.INSTCD_YN = instcdYn;
	
	if(!isNull(popupColumn)){
		args.POPUP_COLUMN = popupColumn;
	}
	
	
	print_bigcenmed(args);
	
	$('#args').val(JSON.stringify(args));
	
	//로딩 시작
	gvSpinnerOpen();
	
	var dlg = $(modalId).modal();
	dlg.find('.modal-title').text(itemNm + " 조회");
	dlg.modal('show');
	
	//$(modalId).modal('show');
	
	
}


/**
 * 
 * @param elemId
 * @returns
 */
function templeteCohortDate(data, elemId, input_val1, input_val2)
{
	
	var html = '';
	
	var id = "'txtFromDt_"+elemId+"'";
	
//	코호토연구 연구종료일	
	if(data.COLUMN === 'RSCH_TERM'){
		html = '<div class="row">';
			html += '<div class="col-md-12">';
				html += '<div class="form-group">';
					html += '<div class="input-group date">';
						html += '<div class="input-group-addon">';
							html += '<i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'+id+')"></i>';
						html += '</div>';
						
						html += '<input class="form-control pull-right font-size-12 maskDateInput "';
						html += ' type="text" ';
						html += ' name="calFROM_DT"';
						html += ' id="txtFromDt_'+elemId+'"';
						html += ' value="' + nvl(input_val1,gvDate) +'"';
						html += '>   ';
						
						
					html += '</div>';								//input date
				html += '</div>';									//form-group
			html += '</div>';										//col
		html += ' </div>			';	//row
	}	
	
	return html;
}

function changeTextValue(element,rowIdx, tabCd)
{
	var html = '';

	if($(element).val() === 'BETWEEN'){
		html += '<div class="form-group" style="text-align:left;">';
			html += '<input type="text" ';
			html += 'class="form-control input_text" ';
			html += 'name="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
			html += 'id="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
			html += 'maxlength="100" style="width:48%;" value="">';
	
			html += ' ';
			
			html += '<input type="text" ';
			html += 'class="form-control input_text" ';
			html += 'name="txtTEX2_' + tabCd + '_' + rowIdx + '" ';
			html += 'id="txtTEX2_' + tabCd + '_' + rowIdx + '" ';
			html += 'maxlength="100" style="width:48%;" value="">';
		html += '</div>';
		
	}else if($(element).val() === 'REGEXP_LIKE'){
		html += '<div class="form-group" style="text-align:left;">';
			html += '<input type="text" ';
			html += 'class="form-control input_text" ';
			html += 'name="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
			html += 'id="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
			html += 'style="width:48%;" value="">';
	
			html += ' ';
			
			html += '<input type="text" ';
			html += 'class="form-control input_text" ';
			html += 'name="txtTEX2_' + tabCd + '_' + rowIdx + '" ';
			html += 'id="txtTEX2_' + tabCd + '_' + rowIdx + '" ';
			html += 'onkeyup="this.value=regexp_filter(this.value);" ';
			html += 'maxlength="4" style="width:30%;"  value="im">';
			html += '<button type="button" class="btn btn-xs btn-primary btn-primary btnRegexpHelp" style="margin-left:4px;" id="btnRegExpHelp">';
			html += '<i class="fa fa-info-circle" aria-hidden="true"></i></button>';
			
		html += '</div>';
		
	}else{
		html += '<div class="form-group" style="text-align:left;">';
			html += '<input type="text input_text" ';
			html += 'class="form-control" ';
			html += 'name="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
			html += 'id="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
			html += 'style="width:96%;" value="">';
			
		html += '</div>';
		
	}
	
	$('#divWrapTextInputVal_' + tabCd + '_' + rowIdx).html(html);
	
}


/**
 * Num value type change
 * @param element
 * @param rowIdx
 * @param tabCd
 * @returns
 */
function changeNumberValue(element,rowIdx, tabCd)
{
	var html = '';
	var dsTabCd = {};
	
	for(key in gvTabCd){
		if(key == tabCd){
			dsTabCd = gvTabCd[key];
		}
	}
	
	var txtNum1 = 0;
	var txtNum2 = 0;
	
	txtNum1 = nvl($('#txtNUM1_' + dsTabCd.CODE + '_' + rowIdx + '').val(),'0');
	txtNum2 = nvl($('#txtNUM2_' + dsTabCd.CODE + '_' + rowIdx + '').val(),'0');
	
	
	if($(element).val() === 'BETWEEN'){
		html += '<div class="form-group">';
			html += '<input type="text" class="form-control" ';
			html += 'name="txtNUM1_'+dsTabCd.CODE+'_'+rowIdx+'" ';
			html += 'id="txtNUM1_'+dsTabCd.CODE+'_'+rowIdx+'" ';
			html += 'value="'+txtNum1+'" ';
			html += 'maxlength="100" style="width:40%;" onkeyup="this.value=number_filter(this.value);">';
			html += '<span  style="margin-left:4px;margin-right:4px;">~</span>';
			html += '<input type="text" class="form-control" ';
			html += 'name="txtNUM2_'+dsTabCd.CODE+'_'+rowIdx+'" ';
			html += 'id="txtNUM2_'+dsTabCd.CODE+'_'+rowIdx+'" ';
			html += 'value="'+txtNum2+'" ';
			html += 'maxlength="100" style="width:40%;" onkeyup="this.value=number_filter(this.value);">';
			
		html += '</div>';
		
	}else{
		html += '<div class="form-group text-left">';
			html += '<input type="text" class="form-control" ';
			html += 'name="txtNUM1_'+dsTabCd.CODE+'_'+rowIdx+'" ';
			html += 'id="txtNUM1_'+dsTabCd.CODE+'_'+rowIdx+'" ';
			html += 'value="'+txtNum1+'" ';
			html += 'maxlength="100" style="width:40%;" onkeyup="this.value=number_filter(this.value);">';
		html += '</div>';
		
	}
	
	$('#divWrapNUmberInputVal_' + dsTabCd.CODE + '_' + rowIdx).html(html);
	
}

/**
 * RANGE_CD 변경시 실행
 * @param element : SELECT BOX ELEMENT
 * @returns
 */
function changeRangeCd(element){
	var $element = $(element).parent();
	
	var html = '';
	
	$(element).val($(element).val());
	
	$element.children().remove('.divRANGE_CD');
	
	if($(element).val() === 'R'){
		html = '<div class="divRANGE_CD" style="">';
			html += '<input type="text" name="txtRANGE_DN" class="form-control input-text" style="float:left;width:30%;height:34px;" ';
			html += 'onkeyup="this.value=number_filter(this.value);" ';
			html += '>';
		html += '일';
		html += '</div>';
		
	}else{
		html = '<div class="txtRANCE_CD"></div>';
	}
	
	$element.append(html);
}


/**
 * is null or blank click Event
 * @param tabCd
 * @param rowIdx
 * @param elem
 * @returns
 */
function onClickIsNullOrBlankCheck(tabCd,rowIdx,elem){
	var isCONFIRM_YES = false;
	var strMsg = 'blank를 체크 하시면 기존에 설정된 값이 초기화 됩니다.<br>계속하시겠습니까?';
	
	if($(elem).prop('checked')){
		if(!isNull($('#txtTEX1_'+tabCd+'_' + rowIdx))){
			if(!isNull($('#txtTEX1_'+tabCd+'_' + rowIdx).val())){
				showConfirm('조회조건관리',strMsg,function(e){
					if(e){
						setNullOrBlank(tabCd, rowIdx, null, true);
						
					}else{
						$(elem).prop('checked',false);
					}
					
				});
				
			}else{
				setNullOrBlank(tabCd, rowIdx, null, true);
			}
		}
		
		else if(!isNull($('#txtTEX2_'+tabCd+'_' + rowIdx))){
			if(!isNull($('#txtTEX2_'+tabCd+'_' + rowIdx).val())){
				showConfirm('조회조건관리',strMsg,function(e){
					if(e){
						setNullOrBlank(tabCd, rowIdx, null, true);
						
					}else{
						$(elem).prop('checked',false);
					}
					
				});
				
			}else{
				setNullOrBlank(tabCd, rowIdx, null, true);
			}
		}
		
		else if(!isNull($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx))){
			if(!isNull($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val())){
				showConfirm('조회조건관리',strMsg,function(e){
					if(e){
						setNullOrBlank(tabCd, rowIdx, null, true);
						
					}else{
						$(elem).prop('checked',false);
						
					}
					
				});
				
			}else{
				setNullOrBlank(tabCd, rowIdx, null, true);
			}
		}
		
	}else{
		setNullOrBlank(tabCd, rowIdx, null, false);
		
	}
	
}

/**
 * Null Or Blank Set Element
 * @param tabCd
 * @param rowIdx
 * @param row
 * @param isNullOrBlank
 * @returns
 */
function setNullOrBlank(tabCd,rowIdx,row,isNullOrBlank){

	
	if(isNullOrBlank){
		$('#txtTEX1_'+tabCd+'_' + rowIdx).val('');
		$('#txtTEX2_'+tabCd+'_' + rowIdx).val('');
		$('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val('');
		$('#selTEX_LIST_'+tabCd+'_' + rowIdx).val($('#selTEX_LIST_'+tabCd+'_' + rowIdx).val());
		
		$('#txtTEX1_'+tabCd+'_' + rowIdx).attr('disabled',true);
		$('#txtTEX2_'+tabCd+'_' + rowIdx).attr('disabled',true);
		$('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).attr('disabled',true);
		$('#selTEX_LIST_'+tabCd+'_' + rowIdx).attr('disabled',true);
		$('#btnPopup_'+tabCd+'_' + rowIdx).attr('disabled',true);
		$('#chkIsRegExp_'+tabCd+'_' + rowIdx).attr('disabled',true);
	}else{
		
		if(isNull(row)){
			$('#txtTEX1_'+tabCd+'_' + rowIdx).val('');
			if(isNull($('#selTEX_LIST_'+tabCd+'_' + rowIdx))){
				$('#txtTEX2_'+tabCd+'_' + rowIdx).val('im');
			}else{
				$('#txtTEX2_'+tabCd+'_' + rowIdx).val('');
			}
			$('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val('');
			$('#selTEX_LIST_'+tabCd+'_' + rowIdx).val($('#selTEX_LIST_'+tabCd+'_' + rowIdx).val());
	
		}else{
			$('#txtTEX1_'+tabCd+'_' + rowIdx).val($('#txtTEX1_'+tabCd+'_' + rowIdx).val());
			$('#txtTEX2_'+tabCd+'_' + rowIdx).val($('#txtTEX2_'+tabCd+'_' + rowIdx).val());
			$('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val());
			$('#selTEX_LIST_'+tabCd+'_' + rowIdx).val($('#selTEX_LIST_'+tabCd+'_' + rowIdx).val());
			
			/*$('#txtTEX1_'+tabCd+'_' + rowIdx).val(row.INPUT_VAL1);
			$('#txtTEX2_'+tabCd+'_' + rowIdx).val(row.INPUT_VAL2);
			$('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val(row.INPUT_VAL1);
			$('#selTEX_LIST_'+tabCd+'_' + rowIdx).val(row.INPUT_VAL0);*/
			
		}
		
		$('#txtTEX1_'+tabCd+'_' + rowIdx).attr('disabled',false);
		$('#txtTEX2_'+tabCd+'_' + rowIdx).attr('disabled',false);
		$('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).attr('disabled',false);
		$('#selTEX_LIST_'+tabCd+'_' + rowIdx).attr('disabled',false);
		$('#chkIsRegExp_'+tabCd+'_' + rowIdx).attr('disabled',false);
		$('#btnPopup_'+tabCd+'_' + rowIdx).attr('disabled',false);
	}
}



function onClickIsRegExpCheck(tabCd,rowIdx,elem,disabled){
	var isCONFIRM_YES = false;
	var strMsg = 'REGEXP를 체크 하시면 기존에 설정된 값이 초기화 됩니다.<br>계속하시겠습니까?';
	var strMsg2 = 'REGEXP를 체크해제 하시면 기존에 설정된 값이 초기화 됩니다.<br>계속하시겠습니까?';
	if($(elem).prop('checked')){
		if(!isNull($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx))){
			if(!isNull($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val())){
				showConfirm('조회조건관리',strMsg,function(e){
					if(e){
						setRegExp(tabCd, rowIdx, null, true,disabled);
					}else{
						$(elem).prop('checked',false);
					}
				});
			}else{
				setRegExp(tabCd, rowIdx, null, true,disabled);
			}
		}
	}else{
		if(!isNull($('#txtTEX1_'+tabCd+'_' + rowIdx))){
			if(!isNull($('#txtTEX1_'+tabCd+'_' + rowIdx).val())){
				showConfirm('조회조건관리',strMsg2,function(e){
					if(e){
						setRegExp(tabCd, rowIdx, null, false,disabled);
						
					}else{
						$(elem).prop('checked',true);
					}
					
				});
				
			}else{
				setRegExp(tabCd, rowIdx, null, false,disabled);
			}
		}
	}
}

function setRegExp(tabCd,rowIdx,row,isRegExp,disabled){
	var html = '';
	
	if(isRegExp){
		html += '<div class="form-group" style="text-align:left;">';
		html += '<input type="text" ';
		html += 'class="form-control input_text" ';
		html += 'name="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
		html += 'id="txtTEX1_' + tabCd + '_' + rowIdx + '" ';
		if(isNull(row)){
			html += 'maxlength="100" style="width:48%;" value="">';
		}
		else{
			html += 'maxlength="100" style="width:48%;" value="'+nvl($('#txtTEX1_'+tabCd+'_' + rowIdx).val(),'')+'">';			
		}

		html += ' ';
		
		html += '<input type="text" ';
		html += 'class="form-control input_text" ';
		html += 'name="txtTEX2_' + tabCd + '_' + rowIdx + '" ';
		html += 'id="txtTEX2_' + tabCd + '_' + rowIdx + '" ';
		html += 'onkeyup="this.value=regexp_filter(this.value);" ';
		if(isNull(row)){
			html += 'maxlength="4" style="width:30%;"  value="im">';
		}
		else{
			html += 'maxlength="4" style="width:30%;"  value="'+nvl($('#txtTEX2_'+tabCd+'_' + rowIdx).val(),'im')+'">';
		}
		html += '<button type="button" class="btn btn-xs btn-primary btn-primary btnRegexpHelp" style="margin-left:4px;" id="btnRegExpHelp">';
		html += '<i class="fa fa-info-circle" aria-hidden="true"></i></button>';
		
		html += '</div>';
		
	}else{
		
		var tmpTable = $('#gridSearch_'+gvActiveTab).DataTable();
		var row = tmpTable.row(rowIdx).data();
		
		html += '<div class="form-group">';
			html += '<input type="text" class="form-control input_text" ';
			html += 'name="txtPOPUP_VAL_' + tabCd + '_' + rowIdx + '" ';
			html += 'id="txtPOPUP_VAL_' + tabCd + '_' + rowIdx+'" ';
			html += 'value="'+nvl($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val(),'')+'" ';
			html += 'style="width:75%;margin-right:8px;" ';
			html += disabled;
			html += '>';
			
			html += '<button class="btn btn-sm btn-primary" ';
			html += 'onclick="javascript:openPopup( ';
			html += "'" + row.POPUP_PROGRAM_ID + "',";
			html += "'" + nvl($('#txtPOPUP_VAL_'+tabCd+'_' + rowIdx).val(),'') + "',";
			html += rowIdx + ',';
			html += row.ITEM_SEQ + ',';
			html += row.ITEM_CATE_SEQ + ',';
			html += row.ITEM_CATE_DETL_SEQ + ',';
			html += "'" + tabCd + "',";
			html += "'" + row.INSTCD_YN + "',";
			html += "'" + row.POPUP_COLUMN + "',";
			html += "'" + row.ITEM_NM + "'";
			html += ')" ';
			html += 'id="btnPopup_'+tabCd+'_'+rowIdx+'">';
			html += '<i class="fa fa-search"></i>';
			html += '</button>';
				
			html += '<input type="hidden" class="form-control"  ';
			html += 'name="txtCODE_SET" id="txtCODE_SET_' + tabCd + '_' + rowIdx + '" value="'+encodeURIComponent(row.CODE_SET)+'" /> ';
		
		html += '</div>';
	}
	
	$('#divWrapPopupInputVal_' + tabCd + '_' + rowIdx).html(html);
}


