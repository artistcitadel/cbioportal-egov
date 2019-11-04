
/**
 * Application Ready
 */
$(document).ready(function(){
	init_casctrlMain();
	initEvent_casctrlMain();
	
	menuFix('research_casctrl_casctrlMain');
	
    
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

function serviceCallback_casctrlMain(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}	
}


//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init_casctrlMain()
{
	gvMethCd = 'CC';
	
	$('#gridCaseGroup_01').setGridCaseControl();
	$('#gridControlGroup_01').setGridCaseControl();
	
	$('#gridCaseGroup_02').setGridCaseControl();
	$('#gridControlGroup_02').setGridCaseControl();
	
	
	setComboList('selCC_CONT_CD',gvContCdList	,'VALUE'	,'TEXT'		,'','');	//항목선택
	setComboList('selCC_MAT_CD'	,gvMatCdList	,'VALUE'	,'TEXT'		,'','');	//항목선택
	
	if(!isNull($('#txtLINK_TYPE').val())){
		if($('#txtLINK_TYPE').val() === 'SI'){
			gvActiveTab = '02';
				
			$('.nav-tabs a[href="#study"]').tab('show');	
			 
			$('#patient').removeClass();
			$('#study').removeClass();
			 
			$('#patient').addClass('tab-pane');
			$('#study').addClass('tab-pane active');
		}
	}
	
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
* 이벤트 초기화
* @returns
*/
function initEvent_casctrlMain()
{
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var href = $(this).attr('href');
		
		if(isNull(href) || href === '#patient'){
			gvActiveTab = '01';
			
		}else if(href === '#study'){
			gvActiveTab = '02';
			
			
		}
		
		

//		소스테이블 복사 (조회조건 -> 연구항목)
		var dsList = $('#gridSearch_01').getData();
		var table1 = $('#gridSearch_01').DataTable();
		var table2 = $('#gridSearch_02').DataTable();

	//	탭이동시 연구항목	
		if(gvActiveTab == "01"){
			table2.rows().remove().draw();

			table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data1 = this.data();
				var node1 = this.node();
				
				var cell5 = node1.cells[5];
				var cell6 = node1.cells[6];
				var cell8 = node1.cells[8];
				var cell9 = node1.cells[9];
				
				
				$(node1).find("td select,input").each(function (){
					var html = '';
					var meta = {row:rowIdx};

		    		if(data1.POPUP_YN === 'Y'){
		    			html = templetePopup('', '', data1, meta, 'C');
		    			
		    		}else{
		    			switch(data1.ITEM_TYPE){
		    				case "TEX":
		    					html = templeteText('', '', data1, meta, 'C');
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber('', '', data1, meta, 'C');
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode('', '', data1, meta, 'C');
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate('', '', data1, meta, 'C');
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    		}
					
					if(this.name.indexOf('txtCNT') >= 0){
						html = templeteTarget('','',data1,meta);
						$(cell6).html(html);
					}
					
					$(this).attr('disabled',false);
					
					
					if(this.name.indexOf('BASE_DT_COLUMN_C') >= 0){
						html = templeteBaseDtYn('', '', data1, meta, 'C');
						$(cell8).html(html);
						
					}
					
					if(this.name.indexOf('FIRST_YN_C') >= 0){
						html = templeteFirstYn('', '', data1, meta, 'C');
						$(cell9).html(html);
						
					}
					
					
					
				});
			});
			
			
			
			var table2_01 = $('#gridCaseGroup_01').DataTable();
			
			table2_01.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				
				var data1 = this.data();
				var node1 = this.node();
				
				var cell5 = node1.cells[5];
				var cell6 = node1.cells[6];
				
				
				$(node1).find("td select,input").each(function (){
					var html = '';
					var meta = {row:rowIdx};

		    		if(data1.POPUP_YN === 'Y'){
		    			html = templetePopup('', '', data1, meta, 'CA');
		    			
		    		}else{
		    			switch(data1.ITEM_TYPE){
		    				case "TEX":
		    					html = templeteText('', '', data1, meta, 'CA');
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber('', '', data1, meta, 'CA');
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode('', '', data1, meta, 'CA');
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate('', '', data1, meta, 'CA');
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    		}
					
					if(this.name.indexOf('txtCNT') >= 0){
						html = templeteTarget('','',data1,meta);
						$(cell6).html(html);
					}
					
					$(this).attr('disabled',false);
					
				});
			});
			
			var table3_01 = $('#gridControlGroup_01').DataTable();
			
			table3_01.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data1 = this.data();
				var node1 = this.node();
				
				var cell5 = node1.cells[5];
				var cell6 = node1.cells[6];
				
				
				$(node1).find("td select,input").each(function (){
					var html = '';
					var meta = {row:rowIdx};

		    		if(data1.POPUP_YN === 'Y'){
		    			html = templetePopup('', '', data1, meta, 'CO');
		    			
		    		}else{
		    			switch(data1.ITEM_TYPE){
		    				case "TEX":
		    					html = templeteText('', '', data1, meta, 'CO');
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber('', '', data1, meta, 'CO');
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode('', '', data1, meta, 'CO');
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate('', '', data1, meta, 'CO');
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    		}
					
					if(this.name.indexOf('txtCNT') >= 0){
						html = templeteTarget('','',data1,meta);
						$(cell6).html(html);
					}
					
					$(this).attr('disabled',false);
					
				});
			});
			
			
	//	환자선택 -> 연구항목		
		}else if(gvActiveTab == "02"){
			table2.rows().remove().draw();
			table2.rows.add(dsList).draw();
			
		//	조회조건
			
			
			
		//	사례대조 복사	
			var dsList3_1 = $('#gridCaseGroup_01').getGridCaseControl();
			var dsList3_2 = [];
			var dsList3_3 = [];
			
			var table3_1 = $('#gridCaseGroup_01').DataTable();
			var table3_2 = $('#gridCaseGroup_02').DataTable();
			
			dsList3_2 = table3_1.rows().data();
			
			for(var i=0; i < dsList3_2.length; i++){
				var ds = $.extend({},dsList3_1[i],dsList3_2[i]);
				dsList3_3.push(ds);
				
			}
			
			
			table3_2.rows().remove().draw();
			table3_2.rows.add(dsList3_1).draw();
		//	table3_2.rows.add(dsList3_3).draw();
			
			
			
			
		//	대조군	
			var dsList4_1 = $('#gridControlGroup_01').getGridCaseControl();
			var dsList4_2 = [];
			var dsList4_3 = [];
			
			var table4_1 = $('#gridControlGroup_01').DataTable();
			var table4_2 = $('#gridControlGroup_02').DataTable();
			
			dsList4_2 = table4_1.rows().data();
			
			for(var i=0; i < dsList4_2.length; i++){
				var ds = $.extend({},dsList4_1[i],dsList4_2[i]);
				dsList4_3.push(ds);
				
			}
			table4_2.rows().remove().draw();
			table4_2.rows.add(dsList4_1).draw();
		//	table4_2.rows.add(dsList4_3).draw();
			
			
			
		//	조회조건 그룹정보 설정
			table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data1 = this.data();
				var node1 = this.node();
				
				var node2 = table2.row(rowIdx).node();
				
				var cell_1_0 = node1.cells[0];
				var cell_1_1 = node1.cells[1];
				
				var grpVal = $('#txtGRP_C_' + rowIdx).val();
				
				var cell_2_0 = node2.cells[0];
				var cell_2_1 = node2.cells[1];
				
				$(cell_2_0).html($(cell_1_0).html());
				
				$(node2).find("td select,input").each(function (){
					if(this.name.indexOf('txtGRP') >= 0){
						$(this).val(grpVal);
					}
					
					if(this.name.indexOf('ANDOR') >= 0){
						$(this).attr('disabled',true);
						
						var firstRow = $('#gridSearch_02').getMinGrpIdx(grpVal);
						
						if(rowIdx == firstRow){
							$(this).css('border','3px dotted #74DF00');
						}
					}
				});
			});
			
			
		//	사례군 그룹정보 설정
			table3_1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data1 = this.data();
				var node1 = this.node();
				
				var node2 = table3_2.row(rowIdx).node();
				
				var cell_1_0 = node1.cells[0];
				var cell_2_0 = node2.cells[0];
				
				var grpVal = $('#txtGRP_CA_' + rowIdx).val();
				
				
				var cell_1_1 = node1.cells[1];
				var cell_2_1 = node2.cells[1];
				
				
				
				$(cell_2_0).html($(cell_1_0).html());
			//	$(cell_2_1).html($(cell_1_1).html());
				
				$(node2).find("td select,input").each(function (){
					if(this.name.indexOf('txtGRP_CA') >= 0){
						$(this).val(grpVal);
					}
					
					if(this.name.indexOf('ANDOR') >= 0){
						$(this).attr('disabled',true);
						
						var firstRow = $('#gridCaseGroup_02').getMinGrpIdx(grpVal);
						
						if(rowIdx == firstRow){
							$(this).css('border','3px dotted #74DF00');
						}
					}
				});
			});
			
			
//			대조군 그룹정보 설정
			table4_1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data1 = this.data();
				var node1 = this.node();
				
				var node2 = table4_2.row(rowIdx).node();
				
				var cell_1_0 = node1.cells[0];
				var cell_2_0 = node2.cells[0];
				
				var cell_1_1 = node1.cells[1];
				var cell_2_1 = node2.cells[1];
				
				$(cell_2_0).html($(cell_1_0).html());
			//	$(cell_2_1).html($(cell_1_1).html());
				
				var grpVal = $('#txtGRP_CO_' + rowIdx).val();
				
				$(node2).find("td select,input").each(function (){
					if(this.name.indexOf('txtGRP_CO') >= 0){
						$(this).val(grpVal);
					}
					
					if(this.name.indexOf('ANDOR') >= 0){
						$(this).attr('disabled',true);
						
						var firstRow = $('#gridControlGroup_02').getMinGrpIdx(grpVal);
						
						if(rowIdx == firstRow){
							$(this).css('border','3px dotted #74DF00');
						}
					}
				});
				
			});
		}
	});
	
	
	$('#selCC_MAT_CD').on('change', function(e){
		if($(this).val() === 'AM' || $(this).val() === 'ASM'){
			$('#txtCC_AGE_NUM').prop('disabled',false);
			$('#txtCC_AGE_NUM').val('0');
			
		}else{
			$('#txtCC_AGE_NUM').prop('disabled',true);
			$('#txtCC_AGE_NUM').val('');
		}
		
	});

	
}


