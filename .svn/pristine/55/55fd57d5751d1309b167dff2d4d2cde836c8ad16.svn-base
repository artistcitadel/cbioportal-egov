/**
 * 모달창 1HT
 * @Page : modal1HT
 */
var gv1HTList = [];

var gvDiseaseCodeTree1HT;

var objVal1HT;


/**
 * Application Ready
 */
$(document).ready(function(){
	initEvent1HT();
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
function serviceCallback1HT(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getCommonCodeList":
			console.log(result);	
			gv1HTList = result.dsCodeList;
			
			setTree1HT();
			
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
function getData1HT(){
	var $args = $('#args');
	
	var jObj = JSON.parse($args.val());
	
	var query = decodeURIComponent(jObj.CODE_SET);
	console.log(query);
	
	query = query.replace('#{CODE_NM}',"''");
	
	//폴더 이미지변경
	query = query.replace(/\/resource\/jqwidgets\/images\/folderOpen.png/gi, "../../images/folder.png");
	
	var dataSet = {};
	
	dataSet.QUERY = query;
	
	callServiceSpinnerClose("getCommonCodeList"
			,"common/modal/getCommonCodeList"
			,dataSet
			,"serviceCallback1HT");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init1HT()
{
	//initEvent1HT();
	
	getData1HT();
}

/**
 * grid setting
 * @returns
 */
function setTree1HT()
{	
	console.log(gv1HTList);
	var source1HT = {
		datatype: "json",
        datafields: [
            { name: 'ID' },
            { name: 'ICON'}, 
            { name: 'PARENTID' },
            { name: 'text' },
            { name: 'VALUE' }
        ],
        id: 'ID',
        localdata: gv1HTList

    };
	
	var treeAdapter1HT = new $.jqx.dataAdapter(source1HT);
	
	treeAdapter1HT.dataBind();
	
	var records1HT = treeAdapter1HT.getRecordsHierarchy('ID', 'PARENTID', 'items', [{ name: 'text', map: 'label'},{ name: 'ICON', map: 'icon'},{ name: 'VALUE', map: 'value'}]);
	
	$('#codeTree1HT').jqxTree({
		allowDrag : false,
		allowDrop : false,
		height : '550',
		width:'100%',
		source : records1HT,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	
	
	$('#codeTree1HT').on('expand', function(event) {
		var args = event.args;
		var item = $('#codeTree1HT').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree1HT div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder.png") > -1;
			if (boo) {
				$("#codeTree1HT div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folderOpen.png");
			}
		}
	});

	$('#codeTree1HT').on('collapse', function(event) {
		var item = $('#codeTree1HT').jqxTree('getItem', args.element);
		var label = item.label;
		var icon = item.icon;
		var id = item.id;
		var parentId = item.parentId;
		var boo = false;
		
		var isIcon = $("#codeTree1HT div div div ul #" + id + " > div:eq(1) > img").attr("src");
		
		if (isIcon != undefined && isIcon != "undefined") {
			// 현재 tree의 icon이 폴더일 경우만 변경
			boo = isIcon.indexOf("folder") > -1;
			if (boo) {
				$("#codeTree1HT div div div ul #" + id + " > div:eq(1) > img").attr("src", "../../images/folder.png");
			}
		}
	});
	
	selectTree1HT();
}

//트리선택
function selectTree1HT()
{
	var $args = $('#args');		
	var jObj = JSON.parse($args.val());		
	var query = decodeURIComponent(jObj.CODE_SET);
	//넘어온값 받음
	objVal1HT = jObj.VALUE;
	
	//선택값 체크
	var $args = $('#args');	
	var jObj = JSON.parse($args.val());	
	
	//트리선택
	if(objVal1HT){
		var items = $('#codeTree1HT').jqxTree('getItems');
		$.each(items, function () {
			if(this.value == objVal1HT) {
				$("#codeTree1HT").jqxTree('expandItem', this.element);
				$('#codeTree1HT').jqxTree('selectItem', this.element);
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
function initEvent1HT(){	
	//조건 등록
	$('#submit1HTBtn').on('click',function(e){
		var rows = $('#codeTree1HT').jqxTree('getSelectedItem').value.replace(/ /gi,"");
		
		if(rows){
			$("#result").val(rows);
			
			$('#pop1HTModal').modal('hide');			
		}else{
			BootstrapDialog.alert(COM_0019);
			return;
		}		
	});
	
	
}




