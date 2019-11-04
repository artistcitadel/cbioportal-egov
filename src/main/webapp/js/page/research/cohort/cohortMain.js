var gvCommand = 'C';

var gvDatatable;
var gvItemCont;
var gvItemMgmtList = [];		//조건연구항목
var gvItemContDetlList = [];	//조건공유 목록
var gvItemMgmtTxtList;
var gvItemMgmtNumList;


//조회조건
var gvActiveTab = '01';

//	조회조건
var gvItemSearchCondition = [];

//	반복관리
var gvItemPeriod = [];

var gvTargetIdx = 0;		//타겟 조회시 설정(datatable의 현재 row)
var gvCurrentRow = -1;		//모달창 출력시 설정(datatable의 현재 row) 

var gvDataSourcePeriod;
var gvDataSourcePeriod_01;
var gvDataSourcePeriod_02;

var gvStudyItem = [];
/**
 * Application Ready
 */
$(document).ready(function(){
	init_cohortMain();
	initEvent_cohortMain();
	
	getItemMgmtDatatableList();
	
	
	//메뉴고정
	menuFix('research_cohort_cohortMain');
    
});



$(document).on('focus','.calendar',function(){
	setCalDate(this);
	
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

function serviceCallback_cohortmain(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}
	
	switch(svcId){
		case "getItemMgmtTreeList":
			gvItemMgmtList = result.dsItemMgmtList;
			
			break;
		
		case "getItemMgmtList":
			gvItemMgmtList = result.dsItemMgmtList;
			
			break;
			
			
		case "insertSearchCondition":
			alert('save');
			break;
			
		
		default:
			break;
	}
		
}


//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
function getItemMgmtDatatableList()
{
	var dataSet = {};
	
	dataSet.SEARCH_SCHEMA = 'CRDW';
	dataSet.SEARCH_TABLE = 'COHORT';
	
	callServiceSync("getItemMgmtList"
			,"common/sys/getItemMgmtList"
			,dataSet
			,"serviceCallback_cohortmain");
	
	if(typeof gvItemMgmtList === 'undefined'){
		return;
	}
	
	printJSON(gvItemMgmtList);
	
	if(gvActiveTab === '01'){
		$('#gridSearch_' + gvActiveTab).dataTable().fnAddData(gvItemMgmtList);
		
	}else if(gvActiveTab === '02'){
		$.extend(gvStudyItem, gvItemMgmtList);
		$('#gridStudyItem').dataTable().fnAddData(gvStudyItem);
		
	} 
	
}

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init_cohortMain()
{
	gvMethCd = "CH";
	
	$('#gridEventList').setGridSurvivalAnalysis();
	$('#gridCensoredDataList').setGridSurvivalAnalysis();
	
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
function initEvent_cohortMain()
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
					
				//	$(cell5).html(html);
					
					
					if(this.name.indexOf('txtCNT') >= 0){
						html = templeteTarget('','',data1,meta);
						$(cell6).html(html);
					}
					
					if(this.name.indexOf('BASE_DT_COLUMN_C') >= 0){
						html = templeteBaseDtYn('', '', data1, meta, 'C');
						$(cell8).html(html);
						
					}
					
					if(this.name.indexOf('FIRST_YN_C') >= 0){
						html = templeteFirstYn('', '', data1, meta, 'C');
						$(cell9).html(html);
						
					}
					
					$(this).attr('disabled',false);
					
				});
			});
			
			
	//	환자선택 -> 연구항목		
		}else if(gvActiveTab == "02"){
			table2.rows().remove().draw();
			table2.rows.add(dsList).draw();
			
			
//			그룹정보 설정
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
		}
	});
	
}



