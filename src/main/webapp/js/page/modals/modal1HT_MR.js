/**
 * 모달창 1HTMR
 * @Page : modal1HTMR
 */
var gv1HTMRList = [];

var gvDiseaseCodeTree1HTMR;

var objVal1HTMR;

var $args;
var jObj;

var strINSTCD;
var strINSTCD2;


/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent1HTMR();
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
function serviceCallback1HTMR(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeList":
			console.log(result);	
			gv1HTMRList = result.dsCodeList;
			
			setTree1HTMR();
			
			break;
		
		default:
			break;
	}
		
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 키워드검색조회
 * @returns
 */
function getData1HTMR(){
	$args = $('#args');
	
	jObj = JSON.parse($args.val());
	
	var query = decodeURIComponent(jObj.CODE_SET);
	console.log(query);
	
	if(gvINSTCD == '030'){
		strINSTCD = gvINSTCDTemp1;
		strINSTCD2 = gvINSTCDTemp2;
	}else{
		strINSTCD = "'"+ gvINSTCD +"'";
		strINSTCD2 = "'"+ gvINSTCD +"'";
	}
	
	var searchWrd = $('#searchWrd1HTMR').val();
	
	if(searchWrd){
		query = query.replace(/#{CODE_NM}/gi,"'"+ searchWrd +"'");
	}else{
		query = query.replace(/#{CODE_NM}/gi,"''");
	}
	
	var selQuery = query;
	//사업장 코드가 있을때
	if(jObj.INSTCD_YN == "Y"){
		selQuery = replaceAll(selQuery, "#{INSTCD}", strINSTCD);
		selQuery = replaceAll(selQuery, "#{INSTCD2}", strINSTCD2);
		selQuery = replaceAll(selQuery, '${INSTCD}', '');
		/*dataSet.INSTCD = ", A.INSTCD";
		selQuery = selQuery.replace(/\${INSTCD}/gi,", A.INSTCD");*/
	}else{
		selQuery = replaceAll(selQuery, "#{INSTCD}",  '');
		selQuery = replaceAll(selQuery, "#{INSTCD2}",  '');
		selQuery = replaceAll(selQuery, '${INSTCD}', '');
		//selQuery = selQuery.replace(/\${INSTCD}/gi,"");
	}
	
	
	//폴더 이미지변경
	selQuery = selQuery.replace(/\/resource\/jqwidgets\/images\/folderOpen.png/gi, "../../images/folder.png");
	
	var dataSet = {};
	
	dataSet.QUERY = selQuery;
	
	callServiceSpinnerClose("getCommonCodeList"
			,"common/modal/getCommonCodeList"
			,dataSet
			,"serviceCallback1HTMR");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init1HTMR()
{
	
	$('#searchWrd1HTMR').val('');
	
	//initEvent1HTMR();
	
	getData1HTMR();
	
}

/**
 * grid setting
 * @returns
 */
function setTree1HTMR()
{	
	console.log(gv1HTMRList);
	var source1HTMR = {
			datatype: "json",
            datafields: [
                { name: 'ID' },
                { name: 'ICON'}, 
                { name: 'PARENTID' },
                { name: 'text' },
                { name: 'VALUE' }
            ],
            id: 'ID',
            localdata: gv1HTMRList

    };
	
	var treeAdapter1HTMR = new $.jqx.dataAdapter(source1HTMR);
	
	treeAdapter1HTMR.dataBind();
	
	var records1HTMR = treeAdapter1HTMR.getRecordsHierarchy('ID', 'PARENTID', 'items', [{ name: 'text', map: 'label'},{ name: 'ICON', map: 'icon'},{ name: 'VALUE', map: 'value'}]);
	
	$('#codeTree1HTMR').jqxTree({
		allowDrag : false,
		allowDrop : false,
		height : '550',
		width:'100%',
		source : records1HTMR,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#codeTree1HTMR').on('expand', function(event) {
		var args = event.args;
		var item = $('#codeTree1HTMR').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree1HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#codeTree1HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$('#codeTree1HTMR').on('collapse', function(event) {
		var item = $('#codeTree1HTMR').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree1HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#codeTree1HTMR div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	selectTree1HTMR();
}

//트리선택
function selectTree1HTMR()
{
	/*var $args = $('#args');		
	var jObj = JSON.parse($args.val());	*/	
	var query = decodeURIComponent(jObj.CODE_SET);
	//넘어온값 받음
	objVal1HTMR = jObj.VALUE;
	
	//트리선택
	if(objVal1HTMR){
		var items = $('#codeTree1HTMR').jqxTree('getItems');

		$.each(items, function () {
			if(this.value == objVal1HTMR) {
				console.log(this);
				$('#codeTree1HTMR').jqxTree('expandItem', this.parentElement);
				$('#codeTree1HTMR').jqxTree('selectItem', this.element);
				$("#codeTree1HTMR").jqxTree('ensureVisible', this.element);

				return false;
			}
		});
	}
}



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent1HTMR(){	
	//조건 등록
	$('#submit1HTMRBtn').on('click',function(e){
		var retObj = $('#codeTree1HTMR').jqxTree('getSelectedItem').value.replace(/ /gi,"");
		
		//넘길 값이 없을때 clear 넘김
		/*if(retObj == ""){
			retObj = "clear";
		}*/
		
		if(retObj){
			$("#result").val(retObj);
			
			$('#pop1HTMRModal').modal('hide');			
		}else{
			BootstrapDialog.alert(COM_0019);
			return;
		}		
	});
	
	//검색버튼
	$('#btn1HTMRSearch').on('click',function(e){
		if(isNullOrEmpty($('#searchWrd1HTMR').val())){
			/*BootstrapDialog.alert(COM_0006);
			return;*/
		}
		
		getData1HTMR();
		
		
	});
	
	$('#searchWrd1HTMR').on('keypress',function(e){
		if(e.keyCode === 13){
			if(isNullOrEmpty($('#searchWrd1HTMR').val())){
				/*BootstrapDialog.alert(COM_0006);
				return;*/
				
			}
			
			getData1HTMR();
			
		}
	});
}




