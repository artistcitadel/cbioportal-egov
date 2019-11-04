/**
 * 연구분류관리
 * @Page : studySideBar
 */

var gvCategoryList = [];		
var gvItemMgmtList = [];
var gvItemContList = [];
var gvItemConditionList = [];
var gvItemPeriodList = [];
var gvItemStudyList = [];

var gvItemData = {};



//개인공유 추가
var gvUserList 	= [
	{	'INSTCD'	:''	},
	{	'INSTNM'	:''	},
	{	'PER_CODE'	:''},
	{	'PER_NAME'	:''},
	{	'DEPT_NAME'	:''}, 
	{	'LOCT_NAME'	:''}
];
var gvDataSourceUserList;
var gvDataAdapterUserList;

var gvUserSahredList 	= [];
var gvDataSourceUserSahredList;
var gvDataAdapterUserSahredList;

/**
 * Application Ready
 */
$(document).ready(function(){
	getCategoryList();
	
	initSidebar();	
	
	initSidebarEvent();
	
	setJqxUserList();

	setJqxUserSharedList();
	
	
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
function serviceCallbackSidebar(svcId, result){
	switch(svcId){
		case "getCategoryList":
			if(typeof result.dsCategoryList === 'undefined'){
				return;
				
			}
			gvCategoryList = [];
			
			gvCategoryList = result.dsCategoryList;
						
			setTreeItemMgmt();
			
			if(!isNull($('#txtSearchVal').val())){
				$('#itemCateTree').jqxTree('expandAll');
			}
			
			
			break;
			
	//	트리에서 드래그후 데이터테이블 값설정		
		case "getItemMgmtList":
			if(gvItemCont){
				//조건저장 체크박스 초기세팅 20170901 by 최종호
				if(gvItemCont.SHARE_CD == "P"){
				}else{
					gvItemCont = "";
				}
			}
			gvItemMgmtList = result.dsItemMgmtList;
			break;
			
		case "getItemContTreeList":
			//gvItemContList = result.dsItemContTreeList;
			gvItemContList = [];
			if(!isNull(result.dsItemContTreeList)){
				for(var i=0; i < result.dsItemContTreeList.length; i++){
					var dsItemCont = result.dsItemContTreeList[i];
					
					//CDW_PERSONAL_SHARE_YN_CD == 'N'이면 개인공유기능 숨김
					if(gvPersonalShareYnList[0].VALUE === 'N'){
						if(dsItemCont.parentid === 'S' || dsItemCont.id === 'S'){
							continue;
							
						}
					}
					gvItemContList.push(dsItemCont);
				}
			}

			setTreeItemCont();
			
			break;
			
		case "getItemContDetlList":
			console.log(result);
			gvItemCont = result.dsItemCont;
			gvItemContDetlList = result.dsItemContDetlList;
			
			printJSON(gvItemCont);
			
			gvItemConditionList = [];
			gvItemPeriodList = [];
			gvItemStudyList = [];
			
			var dsEventList 		= [];
			var dsCensoredDataList 	= [];
			
			var dsCaseGroupList 	= [];
			var dsControlGroupList 	= [];
			
			
		//	연구항목 TAB_CD별 설정(C:조건, P:주기, R:연구항목)	
			for(var i=0; i < gvItemContDetlList.length; i++){
				var ds = gvItemContDetlList[i];
				
				if(ds.TAB_CD === 'C'){
					gvItemConditionList.push(ds);
					
				}else if(ds.TAB_CD === 'P'){
					gvItemPeriodList.push(ds);
					
				}else if(ds.TAB_CD === 'R'){
					gvItemStudyList.push(ds);
					
				}else if(ds.TAB_CD === 'RE'){
					dsEventList.push(ds);
					
				}else if(ds.TAB_CD === 'RQ'){
					dsCensoredDataList.push(ds);
					
				}else if(ds.TAB_CD === 'CA'){
					dsCaseGroupList.push(ds);
					
				}else if(ds.TAB_CD === 'CO'){
					dsControlGroupList.push(ds);
					
				}
			}
			
			
		//	조회조건설정	
			if(!isNull(gvItemConditionList)){
				var table1 = $('#gridSearch_01').DataTable();
				var table2 = $('#gridSearch_02').DataTable();
				
				table1.rows().remove().draw();
				table2.rows().remove().draw();
				
				table1.rows.add(gvItemConditionList).draw();
				table2.rows.add(gvItemConditionList).draw();
				
				setGroupIdx('C',gvItemConditionList);
				
				table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_C_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});
				
				table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					$(node).find("td select,input").each(function (){
						if(this.name.indexOf('ANDOR') >= 0){
							$(this).attr('disabled',true);
							
							var firstRow = $('#gridSearch_02').getMinGrpIdx(data.GR_LV);
							
							if(rowIdx == firstRow){
								$(this).css('border','3px dotted #74DF00');
							}
						}
					});
				});
				
								
			//	연구항목 clear
				var table3 = $('#gridStudyItem').DataTable();
				
				if(table3.data().count() > 0){
					table3.rows().remove().draw();	
				}
				
				
				
				
			}
			
		//	반복데이터(주기)설정	
			if(!isNull(gvItemPeriodList)){
				var dsList = [];
				
				for(var i=0; i < gvItemPeriodList.length; i++){
					var ds = $.extend({},gvItemPeriodList[i]);
					
					ds.AND_OR = (i+1) + '주기';
					ds.TAB_CD = 'P';
					ds.INPUT_VAL0 = 'DAY';
					
					dsList.push(ds);
					
				}
				
				var table3 = $('#gridPeriod_01').DataTable();
				var table4 = $('#gridPeriod_02').DataTable();
				
				table3.rows().remove().draw();
				table4.rows().remove().draw();
				
				table3.rows.add(dsList).draw();
				table4.rows.add(dsList).draw();
				
				$('#divPeriodWrap_01').css('display','block');
				$('#divPeriodWrap_02').css('display','block');
				
				$('#btnRepeatDataInit').attr('disabled',false);
				
			}
			else{ // 반복데이터 비었을 때 초기화 190327
				var table3 = $('#gridPeriod_01').DataTable();
				var table4 = $('#gridPeriod_02').DataTable();
				
				table3.rows().remove().draw();
				table4.rows().remove().draw();
				
				$('#divPeriodWrap_01').css('display','none');
				$('#divPeriodWrap_02').css('display','none');
				
				$('#btnRepeatDataInit').attr('disabled',true);
			}
			
			
		//	연구항목	
			if(!isNull(gvItemStudyList)){
				var dsList = [];
				
				for(var i=0; i < gvItemStudyList.length; i++){
					var ds = $.extend({},gvItemStudyList[i]);
					dsList.push(ds);
				}
				
				var table = $('#gridStudyItem').DataTable();
				
				if(table.data().count() > 0){
					table.rows().remove().draw();
				}
				
				
				table.rows.add(dsList).draw();
				
				setGroupIdx('R',gvItemStudyList);
				
				table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					$(node).find("td select,input").each(function (){
						if(this.name.indexOf('selNUM_LIST') >= 0){
							changeNumberValue('selNUM_LIST_R_' + rowIdx,rowIdx, 'R');
							
						}
						
						if(this.name.indexOf('selTEX_LIST') >= 0){
							changeNumberValue('selTEX_LIST_R_' + rowIdx,rowIdx, 'R');
						}
					});					
				});
			}
			
		//	생존분석-사건정의
			if(!isNull(dsEventList)){
				var table = $('#gridEventList').DataTable();
				table.rows().remove().draw();
				table.rows.add(dsEventList).draw();
				
				setGroupIdx('RE',dsEventList);
				
				table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_RE_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});
			}
			
		//	생존분석-중도절단	
			if(!isNull(dsCensoredDataList)){
				var table = $('#gridCensoredDataList').DataTable();
				table.rows().remove().draw();
				table.rows.add(dsCensoredDataList).draw();
				
				setGroupIdx('RQ',dsCensoredDataList);
				
				table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_RQ_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});
			}
			
		//	사례군
			if(!isNull(dsCaseGroupList)){
				var table1 = $('#gridCaseGroup_01').DataTable();
				var table2 = $('#gridCaseGroup_02').DataTable();
				
				table1.rows().remove().draw();
				table2.rows().remove().draw();
				
				table1.rows.add(dsCaseGroupList).draw();
				table2.rows.add(dsCaseGroupList).draw();
				
				setGroupIdx('CA',dsCaseGroupList);
				
				table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_CA_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});
				
				table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					$(node).find("td select,input").each(function (){
						if(this.name.indexOf('ANDOR') >= 0){
							$(this).attr('disabled',true);
							
							var firstRow = $('#gridCaseGroup_02').getMinGrpIdx(data.GR_LV);
							
							if(rowIdx == firstRow){
								$(this).css('border','3px dotted #74DF00');
							}
						}
					});
				});
				
				/*table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_CA_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});*/
				
			}
			
		//	대조군	
			if(!isNull(dsControlGroupList)){
				var table1 = $('#gridControlGroup_01').DataTable();
				var table2 = $('#gridControlGroup_02').DataTable();
				
				table1.rows().remove().draw();
				table2.rows().remove().draw();
				
				table1.rows.add(dsControlGroupList).draw();
				table2.rows.add(dsControlGroupList).draw();
				
				setGroupIdx('CO',dsControlGroupList);
				
				table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_CO_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});
				
				table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					$(node).find("td select,input").each(function (){
						if(this.name.indexOf('ANDOR') >= 0){
							$(this).attr('disabled',true);
							
							var firstRow = $('#gridControlGroup_02').getMinGrpIdx(data.GR_LV);
							
							if(rowIdx == firstRow){
								$(this).css('border','3px dotted #74DF00');
							}
						}
					});
				});
				
				/*table2.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					var data = this.data();
					var node = this.node();
					
					if(data.GR_LV != '0'){
						if(data.GR_LV_START === 'S'){
							$('#txtANDOR_CO_' + rowIdx).css('border','3px dotted #74DF00');
						}
					}
				});*/
				
			}
			
			
		//	대조군 관리
			if(gvMethCd === 'CC'){
				$('#frmCcMgmt').JsonToForm(result.dsItemCont);
				$('#selCC_CONT_CD').val(result.dsItemCont.CC_CONT_CD);
				$('#selCC_MAT_CD').val(result.dsItemCont.CC_MAT_CD);
				
			}
						
			
		//	데이터결과목록
			drawStudyItemSavedResult(result);
			
		//	시각화, 기초자료분석 변수 설정
			$('#txtCONT_SEQ').val(result.dsItemCont.SEQ);
			$('#txtSHARE_CODE').val(result.dsItemCont.SHARE_CD);
			
			if(!isNull(result.dsItemData)){
				$('#txtDATA_SEQ').val(nvl(result.dsItemData.SEQ,''));
				$('#txtSEARCH_DATA_SEQ').val(nvl(result.dsItemData.SEQ,''));
				$('#txtSEARCH_TABLE_ID').val(nvl(result.dsItemData.TABLE_ID,''));
			}
			
			//생존분석 설정
			if(!isNull(dsEventList) || !isNull(dsCensoredDataList)){
				$('#btnCohortSurvive').html('생존분석 취소');
				$('#divSurvival').removeClass();
				$('#iFaPlus').removeClass();
				
				$('#divSurvival').addClass('box');
				$('#iFaPlus').addClass('fa fa-minus');
				
				gvSurviveFlagYN = 'Y';	
				
			}else{
				$('#btnCohortSurvive').html('생존분석 설정');
				$('#divSurvival').removeClass();
				$('#iFaPlus').removeClass();
				
				$('#divSurvival').addClass('box collapsed-box');
				$('#iFaPlus').addClass('fa fa-plus');
				
				gvSurviveFlagYN = 'N';	
			}
			
			updateGroupIdx();
			
			//set 조건명
			$('#lblCondtNm').html(gvItemCont.SHARE_NM + '&nbsp;>&nbsp;' + gvItemCont.CONDT_NM);
			
			break;
			
		case "saveQueryConditions":	//"saveItemContDetl":
			showAlert('조건삭제', COM_0003, function(e){
				getItemContTreeList();
				
			});
			
			break;
			
			
		case "saveQueryConditionsSharing":
			showAlert('조건공유저장', COM_0001, function(e){
				$('#btnClose').trigger('click');
				getItemContTreeList();
				
			});
			break;
			
		case "deletePersonalData":
			showAlert('개인자료 삭제', COM_0003, function(e){
				$('#btnClose').trigger('click');
				getCategoryList();
				
			});
			break;
			
			
		case "getUserList":
			gvDataSourceUserList.localdata = result.data;
			$("#jqxUserList").jqxGrid('clear');
			$("#jqxUserList").jqxGrid('updatebounddata','cells');
			$("#jqxUserList").jqxGrid('clearselection');
			
			break;
			
		default:
			break;
	}
		
}


function setGroupIdx(tabCd, dsItemList)
{
	var dsList = [];
	var max=0;
	
	for(var i=0; i < dsItemList.length; i++){
		dsList.push(dsItemList[i].GR_LV);
	}
	
	max = Math.max.apply(null,dsList);
	
	if(tabCd === 'C'){
		gvGrpIdx = max;
		
	}else if(tabCd === 'R'){
		gvGrpStudyItemIdx = max;
		
	}else if(tabCd === 'RE'){
		gvGrpEventIdx = max;
		
	}else if(tabCd === 'RQ'){
		gvGrpCensoredIdx = max;
		
	}else if(tabCd === 'CA'){
		gvGrpCaseIdx = max;
		
	}else if(tabCd === 'CO'){
		gvGrpControlIdx = max;
		
	}
	
	
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
function getCategoryList()
{
	var dataSet = {};
	
	dataSet.SEARCH_LVL = '1';
	dataSet.SEARCH_PER_CODE = $.session.get('PER_CODE');
	dataSet.SEARCH_DEPT_CODE = $.session.get('DEPT_CODE');
	
	var strItemSelType = $(".rdoITEM_SEL_TYPE:checked").val();
	
	if(typeof strItemSelType === 'undefined'){
		return;
	}
	
	dataSet.SEARCH_ITEM_SEL_TYPE = strItemSelType;
	
	callServiceSync("getCategoryList"
					,"common/sys/getItemCateTree"
					,dataSet
					,"serviceCallbackSidebar");

	
}





function getItemContTreeList()
{
	var dataSet = {};
	
	dataSet.SEARCH_METH_CD = gvMethCd;		
	dataSet.SEARCH_PER_CODE = $.session.get('PER_CODE');		
	dataSet.SEARCH_DEPT_CODE = $.session.get('DEPT_CODE');
	
	
	callServiceSync("getItemContTreeList"
					,"common/sys/getItemContTreeList"
					,dataSet
					,"serviceCallbackSidebar");
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function initSidebar()
{	
	makeiCheck('.rdoITEM_SEL_TYPE');
	
	$('#myRightBtn').trigger('click');
	
	if(!isNull(gvPersonalShareYnList)){
		if(gvPersonalShareYnList[0].VALUE === 'N'){
			$('#btnSharePersonalSave').css('display','none');
			$('#btnShareAllSave').css('width','49%');
			$('#btnShareDeptSave').css('width','49%');
			
		}
		
	}
	
	if(!isNull(gvShareCdList)){
		setComboList('selSHARE_CD',gvShareCdList,'VALUE','TEXT','','선택');
	}
	
	
	if(!isNull($('#txtLINK_TYPE').val())){
		$('.nav-tabs a[href="#share"]').tab('show');
		
		getItemContTreeList();
		
		var dataSet = {};
		
		dataSet.SEARCH_ITEM_SEL_TYPE = $(".rdoITEM_SEL_TYPE:checked").val();
		dataSet.SEARCH_ITEM_CONT_SEQ = $('#txtMAIN_CONT_SEQ').val();
		
		if(!isNull($('#txtMAIN_DATA_SEQ').val())){
			dataSet.PARENT_ID = 'E';
			dataSet.SEARCH_DATA_ID = $('#txtMAIN_DATA_SEQ').val();
		}
		
		getItemContDetlList(dataSet);
	}
	
	
}



/**
 * 트리 초기화
 */
function setTreeItemMgmt()
{
	$('#itemCateTree').jqxTree('destroy')
	$("#treeDiv_SEARCH").html('<div id="itemCateTree"></div>');
	
	
	
	var jqxItemTree = null;
	
	jqxItemTree = $('#itemCateTree');
	
	jqxItemTree.jqxTree();
	
	jqxItemTree.jqxTree({
		allowDrag : true,
		allowDrop : false,
		width : '100%',
		height : '400',
		//source : tree_source,
		source:gvCategoryList,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	jqxItemTree.jqxTree('collapseAll');
	
	
	jqxItemTree.on('expand', function(event) {
		var args  = event.args;
		var item  = jqxItemTree.jqxTree('getItem', args.element);
		var label = item.label;
		var value = item.value;
		var $element = $(event.args.element);
		//var children = $element.find('ul').children();
		
		var children = $element.find('ul:first').children();
		
		var loader = false;
        var loaderItem = null;
		
		var $parentElement = item.parentElement;
		var parentItem = jqxItemTree.jqxTree('getItem', $parentElement);
		
		//if(item.level == 1 || !isNull($('#txtSearchVal').val())){
		if(item.level == 1){
			$.each(children, function () {
				var item = jqxItemTree.jqxTree('getItem', this);
				
				if (item && item.label == 'Loading...') {
	                  loaderItem = item;
	                  loader = true;
	                  return false
	            };
				
			});
			
			
			
			if(loader){
				var dataSet = {};
				var strItemSelType = $(".rdoITEM_SEL_TYPE:checked").val();
				
				dataSet.SEARCH_ITEM_CATE_SEQ 		= parentItem.value;
				dataSet.SEARCH_ITEM_CATE_DETL_SEQ 	= item.value;
				dataSet.SEARCH_ITEM_SEL_TYPE 		= strItemSelType;
				dataSet.SEARCH_VAL 					= nvl($('#txtSearchVal').val(),'');
				
				$.ajax({
					type: 'POST',
					url : gvSERVER + gvCONTEXT + '/common/sys/getItemMgmtTreeList',
					dataType: 'json',
					contentType: "application/json", 
					data: JSON.stringify(dataSet), 
					beforeSend : function(xhr){
						xhr.setRequestHeader("isAjax", "true");
						xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
						
					},
					success : function(data, status, xhr) {
						jqxItemTree.jqxTree('addTo', data.dsItemMgmtList, $element[0]);
						jqxItemTree.jqxTree('removeItem', loaderItem.element);
					}
				});
			}
		}
	});
	
	jqxItemTree.on('collapse', function(event) {
		var item = jqxItemTree.jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		/*var isIcon = $("#jqxItemTree div div div ul #" + id + " > div:eq(0) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#jqxItemTree div div div ul #" + id + " > div:eq(0) > img").attr("src", "/resource/jqwidgets/images/folder.png");
			}
		}*/
	});
	
	
	jqxItemTree.on('dragStart', function (event) {
		
	});
	
	
//	연구항목 Item 드래그 앤드	
	jqxItemTree.on('dragEnd', function (event) {
		var args  = event.args;
		var level = args.owner._dragItem == null ? "" : args.owner._dragItem.level;
		var item = args.owner._dragItem;
		var itemParents = args.owner._dragItem.parentItem;
		
		var pageX = event.args.originalEvent.pageX;
		var pageY = event.args.originalEvent.pageY;
				
		if(level === 0){
			return;
		}
		var dataSet = {};
		
		if(level === 1){
			dataSet.SEARCH_ITEM_CATE_DETL_SEQ = item.value;
			
		}else if(level === 2){
			dataSet.SEARCH_SEQ = item.value;
		}
		
		var strItemSelType = $(".rdoITEM_SEL_TYPE:checked").val();
		
		dataSet.SEARCH_YN = 'Y';
		dataSet.SEARCH_ITEM_SEL_TYPE = strItemSelType;
		dataSet.LEVEL = level;
		dataSet.METH_CD = gvActiveTab;
		
		gvItemMgmtList = [];
		
		
		callServiceSync( "getItemMgmtList"
						,"common/sys/getItemMgmtList"
						,dataSet
						,"serviceCallbackSidebar");
		
//		환자선택 탭
		if(gvActiveTab === '01'){
			var dsRactSearch = $('#gridSearch_' + gvActiveTab).getGridRactangle();
			
			if(pageX >= dsRactSearch.x && pageX <= dsRactSearch.w){
				var vert = dsRactSearch.y + dsRactSearch.h;
				
				if(pageY >= dsRactSearch.y && pageY <= vert){
					printJSON(gvItemMgmtList);
					var table = $('#gridSearch_' + gvActiveTab).DataTable();
					table.rows.add(gvItemMgmtList).draw();
					
					if(gvItemMgmtList.length > 1){
						setGroupIdxUpper('C');
					}
				}
			}
			
		//	사례대조	
			if(gvMethCd === 'CC'){
				var dsRact = $('#gridCaseGroup_01').getGridRactangle();
				
				if(pageX >= dsRact.x && pageX <= dsRact.w){
					var vert = dsRact.y + dsRact.h;
					
					if(pageY >= dsRact.y && pageY <= vert){
						var table1 = $('#gridCaseGroup_01').DataTable();
						var table2 = $('#gridControlGroup_01').DataTable();
						table1.rows.add(gvItemMgmtList).draw();
						
						var dsList = table1.rows().data();
						table2.rows().remove().draw();
						table2.rows.add(dsList).draw();
						
						//대조군 그룹 표시
						table1.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
							var grpSign = $('#gridCaseGroup_01 > tbody > tr:eq('+rowIdx+') > td:eq(0) > .text-danger').html();
							
							if(grpSign != undefined){
								$('#gridControlGroup_01 > tbody > tr:eq('+rowIdx+') > td:eq(0)').append('<span class="text-danger">'+grpSign+'</span>');
								if(grpSign == ' ┌'){	//첫번째 그룹일 때
									//셀렉트박스 css변경
									$('#gridControlGroup_01 > tbody > tr:eq('+rowIdx+') > td:eq(1)').find('.default-select4').css('border','3px dotted #74DF00');
								}
							}
						});
						
						if(gvItemMgmtList.length > 1){
							setGroupIdxUpper('CA');
						}
						
						if(gvItemMgmtList.length > 1){
							setGroupIdxUpper('CO');
						}
					}
				}
			}
		}
		
	//	연구항목탭	
		else if(gvActiveTab === '02'){
			var dsRactItem = $('#gridStudyItem').getGridRactangle();
			
			if(pageX >= dsRactItem.x && pageX <= dsRactItem.w){
				var vert = dsRactItem.y + dsRactItem.h;
				
				if(pageX >= dsRactItem.x && pageX <= dsRactItem.w){
					var vert = dsRactItem.y + dsRactItem.h;
					
					if(pageY >= dsRactItem.y && pageY <= vert){
						//getOrgItemNmList();
						
						var table = $('#gridStudyItem').DataTable();
						
						for(var i=0; i < gvItemMgmtList.length; i++){
							var item = gvItemMgmtList[i];
							table.row.add(item).draw();
						}
						//table.rows.add(gvItemMgmtList).draw();
						
						setGroupIdxUpper('R');
					}
				}
			}
			
		//	코호트	
			if(gvMethCd === 'CH'){
				var dsRactEvent = $('#gridEventList').getGridRactangle();
				var dsRactCensoredData = $('#gridCensoredDataList').getGridRactangle();

			//	생존분석 - 사건정의	
				if(pageX >= dsRactEvent.x && pageX <= dsRactEvent.w){
					var vert = dsRactEvent.y + dsRactEvent.h;
					
					if(pageY >= dsRactEvent.y && pageY <= vert){
						var table = $('#gridEventList').DataTable();
						table.rows.add(gvItemMgmtList).draw();
						
						if(gvItemMgmtList.length > 1){
							setGroupIdxUpper('RE');
						}
					}
				}
				
			//	생존분석 - 중도절단	
				if(pageX >= dsRactCensoredData.x && pageX <= dsRactCensoredData.w){
					var vert = dsRactCensoredData.y + dsRactCensoredData.h;
					
					if(pageY >= dsRactCensoredData.y && pageY <= vert){
						var table = $('#gridCensoredDataList').DataTable();
						table.rows.add(gvItemMgmtList).draw();
						
						if(gvItemMgmtList.length > 1){
							setGroupIdxUpper('RQ');
						}
					}
				}
			}
		}
	});
};




function setTreeItemCont()
{
	var source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            {name : 'icon'}, 
            { name: 'parentid' },
            { name: 'text' },
            { name: 'value' },
            { name: 'PER_CODE'},
            { name: 'DEPT_CODE'}
        ],
        id: 'id',
        localdata: gvItemContList

    };
	
	var treeAdapter = new $.jqx.dataAdapter(source);
	
	treeAdapter.dataBind();
	
	var records = treeAdapter.getRecordsHierarchy('id', 'parentid'
												 ,'items'
												 ,[{name : 'text',map : 'label'}, {name : 'value',map : 'value'}]);
													
	$('#itemContTree').jqxTree({
		allowDrag : true,
		allowDrop : false,
		width : '100%',
		height : '400',
		source : records,
		checkboxes : true,
		hasThreeStates : true,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#itemContTree').on('expand', function(event) {
		var args = event.args;
		var item = $('#itemContTree').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#itemContTree div div div ul #" + id + " > div:eq(0) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#itemContTree > div:eq(0) .itemicon").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$("#itemContTree .jqx-checkbox").css("margin-top", "4.5px");

	$('#itemContTree').on('collapse', function(event) {
		var item = $('#itemContTree').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#itemContTree > div:eq(0) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#itemContTree > div:eq(0) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	
	 
	$("#itemContTree").on('dragEnd', function(event) {
		var args  = event.args;
		var level = args.owner._dragItem == null ? "" : args.owner._dragItem.level;
		var item = args.owner._dragItem;
		var itemParents = args.owner._dragItem.parentItem;
		
		if(level === 0){
			return;
		}
		var dataSet = {};
		var strItemSelType = $(".rdoITEM_SEL_TYPE:checked").val();
		
		
		if(level === 1){
			dataSet.SEARCH_ITEM_CONT_SEQ = item.value;
			
		}else if(level === 2){
			dataSet.SEARCH_SEQ = item.value;
		}
		
		dataSet.SEARCH_ITEM_SEL_TYPE = strItemSelType;
		dataSet.PARENT_ID = item.parentId;
		dataSet.SEARCH_DATA_ID = item.id;
		
	//	조회조건	
		getItemContDetlList(dataSet);
	});
};


function setJqxUserList()
{	
	var bInstcd = true;
	
	if(gvINSTCD_YN==='Y'){
		bInstcd = false;
	}
		
	gvDataSourceUserList = {
	    datatype: "json",
	    datafields : [
			{	name : 'INSTCD',type : 'string'	},
			{	name : 'PER_CODE',type : 'string'},
			{	name : 'INSTNM',type : 'string'	},
			{	name : 'PER_NAME',type : 'string'},
			{	name : 'DEPT_NAME',type : 'string'}, 
			{	name : 'LOCT_NAME',type : 'string'}
		],
		cache: false,
	    localdata: gvUserList	//gvUserList
	};
	
	gvDataAdapterUserList = new $.jqx.dataAdapter(gvDataSourceUserList, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#jqxUserList").jqxGrid({
		width : '100%',
		height : 600,
		source : gvDataAdapterUserList,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		showfilterrow : true,
		filterable : true,
		selectionmode: 'checkbox',
		columnsresize: true,
		theme: 'bootstrap',
		pageable: true,
		pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50'], 
		columns : [
			{ 	text : '병원', 	datafield : 'INSTNM', 		cellsalign:'center', align:'center',  width : '12%', hidden:bInstcd},
			{ 	text : '부서', 	datafield : 'DEPT_NAME', 	cellsalign:'center', align:'center', width : '30%'},
			{ 	text : '아이디', datafield : 'PER_CODE', 	cellsalign:'center', align:'center', width : '15%' , hidden:false},
			{ 	text : '이름', 	datafield : 'PER_NAME', 	cellsalign:'center', align:'center', width : '20%' },
			{ 	text : '직급', 	datafield : 'LOCT_NAME', 	cellsalign:'center', align:'center', width : '20%'}
		]
	});
}




function setJqxUserSharedList(){
	var bInstcd = true;
	
	if(gvINSTCD_YN==='Y'){
		bInstcd = false;
		
	}
	
	gvDataSourceUserSahredList = {
	    datatype: "json",
	    datafields : [ 
	    	{
				name : 'INSTCD',
				type : 'string'
			},{
				name : 'INSTNM',
				type : 'string'
			},{
				name : 'DEPT_NAME',
				type : 'string'
			},{
				name : 'PER_CODE',
				type : 'string'
					
			},{
				name : 'PER_NAME',
				type : 'string'
			}
		],
	    cache: false,
	    localdata: gvUserSahredList
	};
	
	gvDataAdapterUserSahredList = new $.jqx.dataAdapter(gvDataSourceUserSahredList, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#jqxGridUserSharedList").jqxGrid({
		width : '100%',
		height : 200,
		source : gvDataAdapterUserSahredList,
		autoheight : false,
		sortable : false,
		altrows : true,
		enabletooltips : false,
		editable : false,
		showfilterrow : false,
		filterable : false,
		selectionmode: 'checkbox',
		columnsresize: true,
		theme: 'bootstrap',
		pageable: false,
		pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50'], 
		columns : [
			{ 	text : '병원', 		datafield : 'INSTNM', 		align:'center', width : '15%', 	hidden:bInstcd},
			{ 	text : '부서', 		datafield : 'DEPT_NAME', 	align:'center', width : '30%'},
			{ 	text : '아이디', 	datafield : 'PER_CODE', 	align:'center', width : '15%',	hidden:false},
			{ 	text : '이름', 		datafield : 'PER_NAME', 	align:'center', width : '30%'}
			
		]
	});
	
}


function getItemContDetlList(dataSet)
{
	
	callServiceSync("getItemContDetlList"
			,"common/sys/getItemContDetlList"
			,dataSet
			,"serviceCallbackSidebar");
	
}


function isPerCode(seq)
{
	var bRet = false;
	
	for(var i=0; i < gvItemContList.length; i++){
		var ds = gvItemContList[i];
		
		if(ds.value == seq){
			if($.session.get('PER_CODE') === ds.PER_CODE){
				bRet = true;
				break;
			}	
		}
	}
	
	return bRet;
	
}



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initSidebarEvent(){
	
// 	Expand All
	$('#itemExpandAll').click(function () {
		$('#itemCateTree').jqxTree('expandAll');
		
		$('.itemicon').each(function(){
			if($(this).attr('src') == "/images/folder.png"){
				$(this).attr('src', '/images/folderOpen.png');
			}
		});
	});
	
// 	Collapse All
	$('#itemCollapseAll').click(function () {
		$('#itemCateTree').jqxTree('collapseAll');
		
		$('.itemicon').each(function(){
			if($(this).attr('src') == "/images/folderOpen.png"){
				$(this).attr('src', '/images/folder.png');
			}
		});
	});
	
	
//	항목선택 타입	 
	$('.rdoITEM_SEL_TYPE').on('ifChecked ifUnchecked', function(event){ 
		getCategoryList();
		
	
	});
	
	
	$('#itemCateTree').on('select', function (event) {
        var e = event.args.element;
        var children = $(e).find("li");
        
    });
	
	
//	탭변경
	$('#sideTab').on('click',function(e){
		var x = $(event.target).text();         // active tab
	    var y = $(event.relatedTarget).text();  // previous tab
	    
	    var $elem = $(event.target)[0];
	    
	    //탭변경시 html초기화
	    $('#treeDiv_SEARCH').html('');
	    $('#treeDiv_SEARCH').append('<div id="itemCateTree" class="margin-top-5" ></div>');
	    $('#treeDiv_SHARE').html('');
	    $('#treeDiv_SHARE').append('<div id="itemContTree" class="margin-top-5" ></div>');
	    
	    if($elem.id === 'itemSelectBtn'){
	    	$('#itemSelectBtn').parent().addClass('active');
	    	$('#shareBtn').parent().removeClass('active');
	    	$('#itemSelect').show();
	    	$('#share').hide();
	    	//항목선택
	    	getCategoryList();
	    	
	    }else{
	    	$('#shareBtn').parent().addClass('active');
	    	$('#itemSelectBtn').parent().removeClass('active');
	    	$('#itemSelect').hide();
	    	$('#share').show();
	    	//조건공유
	    	getItemContTreeList();
	    	
	    	
	    }
		
	});
	
//	전체공유
	$('#btnShareAllSave').on('click',function(e){
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
		
		
		
		var dsItems = $("#itemContTree").jqxTree('getCheckedItems');
		var validCnt = 0;
		var isDataCond = false;
		
		
		for(var i=0; i < dsItems.length; i++){
			if(dsItems[i].level > 0){
				validCnt++;
				
			}
			
		//	개인+데이터조건 여부	
			if(dsItems[i].parentId === 'E'){
				isDataCond = true;
			}
		}
		
		
		if(isDataCond){
			showAlert('전체공유조건 저장','개인+데이터조건은 공유할 수 없습니다.',null);
			return;
		}
		
		if(dsItems.length <= 0){
			showAlert('전체공유조건 저장',COM_0015,null);
			return;
		}
		
		if(validCnt > 1){
			showAlert('전체공유조건 저장',COM_0018,null);
			return;
		}
		
		$('#selSHARE_CD').val('A');
		$('#rdoSaveSc').iCheck('disable');
		$('#rdoNewSaveSc').iCheck('enable');
		$('#txtCONDT_NM').val('');
				
		var dlg = $('#searchConditionModal').modal({
			handle: ".modal-header",
			backdrop:true
		});
		
		dlg.find('.modal-title').text('전체공유조건 저장');
		dlg.modal('show');
		
		
	});
	
//	과공유
	$('#btnShareDeptSave').on('click',function(e){
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
		
		
		var dsItems = $("#itemContTree").jqxTree('getCheckedItems');
		var validCnt = 0;
		var isDataCond = false;
		
		for(var i=0; i < dsItems.length; i++){
			if(dsItems[i].level > 0){
				validCnt++;
				
			}

		//	개인+데이터조건 여부	
			if(dsItems[i].parentId === 'E'){
				isDataCond = true;
			}
		}
		
		if(isDataCond){
			showAlert('과공유조건 저장','개인+데이터조건은 공유할 수 없습니다.',null);
			return;
		}
		
		
		if(dsItems.length <= 0){
			showAlert('과공유조건 저장',COM_0015,null);
			return;
		}
		
		if(validCnt > 1){
			showAlert('과공유조건 저장',COM_0018,null);
			return;
		}
		
		$('#selSHARE_CD').val('D');
		$('#rdoSaveSc').iCheck('disable');
		$('#rdoNewSaveSc').iCheck('enable');
		$('#txtCONDT_NM').val('');
		
		var dlg = $('#searchConditionModal').modal({
			handle: ".modal-header",
			backdrop:true
		});
		dlg.find('.modal-title').text('과공유조건 저장');
		dlg.modal('show');
		
	});
	
	
	//개인공유
	$('#btnSharePersonalSave').on('click',function(e){
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
		
		
		var dsItems = $("#itemContTree").jqxTree('getCheckedItems');
		var validCnt = 0;
		var isDataCond = false;
		
		for(var i=0; i < dsItems.length; i++){
			if(dsItems[i].level > 0){
				validCnt++;
				
			}

		//	개인+데이터조건 여부	
			if(dsItems[i].parentId === 'E'){
				isDataCond = true;
			}
		}
		
		if(isDataCond){
			showAlert('개인공유조건 저장','개인+데이터조건은 공유할 수 없습니다.',null);
			return;
		}
		
		
		if(dsItems.length <= 0){
			showAlert('개인공유조건 저장',COM_0015,null);
			return;
		}
		
		if(validCnt > 1){
			showAlert('개인공유조건 저장',COM_0018,null);
			return;
		}
		
		$('#selSHARE_CD').val('S');
		$('#rdoSaveSc').iCheck('disable');
		$('#rdoNewSaveSc').iCheck('enable');
		$('#txtCONDT_NM').val('');
		$("#jqxGridUserSharedList").jqxGrid('clear');
		
		var dlg = $('#searchConditionModal').modal({
			handle: ".modal-header",
			backdrop:true
		});
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.find('.modal-title').text('개인공유조건 저장');
		dlg.modal('show');
		
		
	});
	
	//사용자목록조회
	$('#btnAdd').on('click',function(e){
		var dataSet = {};
		
		//사용자목록 조회시 자신은 제외
		dataSet.SEARCH_NOT_PER_CODE = $.session.get('PER_CODE');
		
		callServiceSync("getUserList","admin/user/userList",dataSet,"serviceCallbackSidebar");
		
		
		
		var dlg = $('#shareUserListModal').modal({
			handle: ".modal-header",
			backdrop:true
		});
		
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		
		dlg.find('.modal-title').text('개인공유 사용자 목록 조회');
		dlg.modal('show');
		
		
	});
	
	//추가된 사용자 삭제
	$('#btnDel').on('click',function(e){
		var rows = $('#jqxGridUserSharedList').jqxGrid('selectedrowindexes');		//사용자목록
		
		for(var i = (rows.length) - 1; i >= 0; i--){
			var row = $("#jqxGridUserSharedList").jqxGrid('getrowdata', rows[i]);
            $("#jqxGridUserSharedList").jqxGrid('deleterow', row.uid);
        }
		
	});
	
	//사용자목록조회
	$('#btnOk').on('click',function(e){
		var userList = $('#jqxUserList').jqxGrid('getselectedrowindexes');		//사용자목록
		var dsList = [];
		
		for(var i=0; i< userList.length; i++){
			var dsUser = $('#jqxUserList').jqxGrid('getrowdata', userList[i]);
			$("#jqxGridUserSharedList").jqxGrid("addrow", null, dsUser, "last");
			
		}
		
		var dlg = $('#shareUserListModal').modal();
		dlg.modal('hide');
		
		
	});
	
	
	//조건저장	
	$('#btnSave').on('click',function(e){
		if($('#txtCONDT_NM').val().indexOf('#') != -1){			
			alert("조건 이름에는 #이 입력되지 않습니다.");
			return ;
		}

		
		
		if($('#selSHARE_CD').val() === 'P'){	//개인조건 저장
			if( gvMethCd === 'CS'){
				onBtnSaveCrssec();	
				
			}else if(gvMethCd === 'CH'){
				onBtnSaveCohort();
				
			}else if(gvMethCd === 'CC'){
				onBtnSaveCasctrl();
				
			}
			
		}else{									//공유조건 저장
			var dsItems = $("#itemContTree").jqxTree('getCheckedItems');
			var dataSet = {};
			
			if(isNull($('#txtCONDT_NM').val())){
				showAlert(null, '조회조건명은 ' + COM_0010, null);	//필수항목입니다.
				return;
			}
			var seq = 0;
			
			for(var i=0; i < dsItems.length; i++){
				if(dsItems[i].level > 0){
					seq = dsItems[i].id;
				}
			}
			
			dataSet.CONT_SEQ 	= seq;
			dataSet.SHARE_CD 	= $('#selSHARE_CD').val();		//공유조건(A:전체, D:과)
			dataSet.CONDT_NM 	= $('#txtCONDT_NM').val();		//연구조건명
			dataSet.PER_CODE	= $.session.get('PER_CODE');	//사용자ID
			dataSet.DEPT_CODE	= $.session.get('DEPT_CODE');	//부서코드
			dataSet.CONDT_NM 	= $('#txtCONDT_NM').val();
			
			dataSet.SHARED_USER_LIST = [];
			
			if($('#selSHARE_CD').val() === 'S'){
				dataSet.SHARED_USER_LIST = $("#jqxGridUserSharedList").jqxGrid('getrows');
				
				if(dataSet.SHARED_USER_LIST.length < 1){
					showAlert('개인공유조건저장','공유할 사용자는 ' + COM_0031,null);
					return;
				}				
			}
			
			callService("saveQueryConditionsSharing"
						,"research/sharingconditions/saveQueryConditionsSharing"
						,dataSet
						,"serviceCallbackSidebar");
			
		}
		
	});
	
	
	//조건 삭제버튼 이벤트
	$('#btnDeleteSc').on('click',function(e){
		
		var dataSet = {};
		var dsList 	= [];
		var dsItems = $("#itemContTree").jqxTree('getCheckedItems');
		
		
	//	본인여부체크,
		var bDeleteYn = true;
			
		for(var i=0; i < dsItems.length; i++){
			var dsItem = {};

		//	디렉토리는 Skip	
			if(dsItems[i].value < 0){
				continue;
			}
			
		//	조건과 로그인 ID를 비교	
			if(!isPerCode(dsItems[i].value)){
				bDeleteYn = false;
			}
		}
		
	//	관리자여부체크해서 관리자면 삭제 가능하도록 추가	
		if(isAdmin()){
			bDeleteYn = true;
		}
		
		
	//	삭제여부가 true면 삭제	
		if(!bDeleteYn){
			showAlert('조건삭제','관리자 또는 본인이 작성한 조건만 삭제 가능합니다.', function(e){
				return;				
			});
			
		}else{
			showConfirm('조건삭제',COM_0005,function(e){		//삭제하시겠습니까?
				if(e){
					var bDeleteYn = true;
					
					gvCommand = 'D';
					
					dataSet.MODE = gvCommand;
					dataSet.SHARE_CD = '';
					
					for(var i=0; i < dsItems.length; i++){
						var dsItem = {};
						
						if(dsItems[i].value < 0){
							continue;
						}
						dsItem.SEQ 			= dsItems[i].value;
						dsItem.DATA_SEQ 	= iif((dsItems[i].parentId === 'E'),dsItems[i].id,'');
						dsItem.DATA_DEL_YN 	= iif((dsItems[i].parentId === 'E'),'Y','N');
						
						dsList.push(dsItem);
						
					}
					
					dataSet.dsItemContList = dsList;
					
					callService( "saveQueryConditions"
								,"research/sharingconditions/saveQueryConditions"
								,dataSet,"serviceCallbackSidebar");
				}
			});
		}
	});
	
	
	$('#btnItemSearch').on('click',function(e){
		getCategoryList();
		
	});
	
	
	$('#txtSearchVal').on('keypress',function(e){
		if(e.keyCode == 13){
			getCategoryList();
			
		}
	});	
	
	
//	개인자료업로드
	$('#btnPerDataList').on('click',function(e){
		var dlg = $('#perDataListModal').modal({
			handle: ".modal-header",
			backdrop:'static'
		});
		dlg.find('.modal-title').text('개인자료 업로드');
		dlg.modal('show');
	});
	
	$('#perDataListModal').on('show.bs.modal', function(event){
		initPsnlDataModal();
	});
	
//	개인자료삭제	
	$('#btnDelPerData').on('click',function(e){
		var item = $('#itemCateTree').jqxTree('getSelectedItem');
		
		if(item.parentId != '개인자료'){
			showAlert(null,"개인자료만 삭제가 가능합니다.",null);
			return;
		}
		
		showConfirm('개인자료삭제','개인자료를 삭제하시면 기존 조회조건, 연구항목조건을 사용할 수 없습니다.<br>계속하시겠습니까?',function(e){
			if(e){
				var dataSet = {};
				
				dataSet.SEARCH_ITEM_CATE_SEQ 	= '999';
				dataSet.SEARCH_ITEM_CATE_DETL_SEQ 	= item.value;
				
				callService("deletePersonalData"
						,"psnldta/deletePersonalData"
						,dataSet
						,"serviceCallbackSidebar");
			}
			
		});
		
	});
	
	
	$('#searchConditionModal').on('shown.bs.modal', function(event){
		if($('#selSHARE_CD').val() === 'S'){
			$('#divPersonalShared').css('display','block');
			
		}else{
			$('#divPersonalShared').css('display','none');
			
		}
	});
	
}



