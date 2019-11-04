/**
 * 시각화 사이드바
 * @Page : visualizeSideBar
 */



var gvItemContList = [];

//이름 중복체크
var gvkGraphNmList = [];

/**
 * Application Ready
 */
$(document).ready(function(){
	
	getItemContTreeList();
	initSidebar();	
	
	initSidebarEvent();
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
		
		case "getItemContTreeList":
			//gvItemContList = result.dsItemContTreeList;
			gvItemContList = [];
			console.log(result);
			if(!isNull(result.selGraphlist)){
				for(var i=0; i < result.selGraphlist.length; i++){
					var dsItemCont = result.selGraphlist[i];
					
					gvItemContList.push(dsItemCont);
				}
			}

			setTreeItemCont();
			
			break;
			
		case "saveQueryConditionsSharing":

			showAlert('조건공유저장', COM_0001, function(e){
				
				getItemContTreeList();
				$('#btnClose').trigger('click');
			});
			
			break;
			
		case "getItemContDetlList":
			
			console.log(result);
			$(".delete").trigger('click');
			
			var dataView;
			var dataView2;
	
			
			
			dataView = result.selViusalGraphDetlList;	
			dataView2 = result.selectVisualGraph;
			
			
			//항목 XY 설정
			$.each(dataView, function(key, value){
				console.log(value);
				if(value.PARAMXY === 'X'){
					itemdropX(value.ITEM_VALUE , value);
					$('#sel_row_'+value.ITEM_VALUE).val(value.ITEM_GROUP);
					
				}
				else { // value.PARAMXY 'Y'
					itemdropY(value.ITEM_VALUE, value);
				}
					
			});
			
			//그래프 설정
			$.each(dataView2,function(key,value){
				$('input:radio[name="funProcess_number"]:radio[value="'+value.PREPROCESS1+'"]').prop('checked',true);
				$('input:radio[name="funProcess_text"]:radio[value="'+value.PREPROCESS2+'"]').prop('checked',true);
				$('input:radio[name="odrProcess"]:radio[value="'+value.PREPROCESS3+'"]').prop('checked',true);
				//visualization
				
				currentGraph = value.GRAPHKIND;
				$('#btnFilterApply').trigger('click');
				/*
				if(value.GRAPHKIND === 'BOX'){
					visualization(1,true);
				}
				else if(value.GRAPHKIND === 'BAR'){
					visualization(2,true);
				}
				else if(value.GRAPHKIND === 'SCT'){
					visualization(3,true);
				}
				else if(value.GRAPHKIND === 'HEAT'){
					visualization(5,true);
				}
				else if(value.GRAPHKIND === 'BARSPOT'){
					visualization(6,true);
				}
				else if(value.GRAPHKIND === 'LINE'){
					visualization(7,true);
				}
				else if(value.GRAPHKIND === 'STACKBAR'){
					visualization(9,true);
				}
				else if(value.GRAPHKIND === 'PIE'){
					visualization(10,true);
				}*/	
			});
		
			break;		
		case "saveQueryConditions":	//"saveItemContDetl":
			showAlert('조건삭제', COM_0003, function(e){
				getItemContTreeList();
				
			});
			
			break;
			
		//그래프 저장 중복체크	
		case "chkGraphNmList":
			gvkGraphNmList = result.selGraph;
			
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
function initSidebar()
{	
	makeiCheck('.rdoITEM_SEL_TYPE');
	
	//$('#myRightBtn').trigger('click');
}

/**
 * 그래프 명 중복체크 메소드
 * @returns
 */
function chkGraphNmList(condNm){
	var dataSet = {};
	
	dataSet.GRAPHNM 	= condNm;
	dataSet.CONT_SEQ = $('#txtCONT_SEQ').val();
	dataSet.DATA_SEQ = $('#txtDATA_SEQ').val();
	callServiceSync("chkGraphNmList"
					,"visualizepopup/selGraph"
					,dataSet,"serviceCallbackSidebar");
	
	
}

function setTreeItemCont()
{
	var source = {
        datatype: "json",
        datafields: [
            { name: 'GRAPH_SEQ' },
            { name: 'CONT_SEQ'}, 
            { name: 'DATA_SEQ' },
            { name: 'GRAPHNM' },
            { name: 'GRAPHKIND' },
            { name: 'PREPROCESS1' },
            { name: 'PREPROCESS2' },
            { name: 'PREPROCESS3' },
            { name: 'PER_CODE'},
            { name: 'CRT_DT'},
            { name : 'icon'}
        ],
        id: 'GRAPH_SEQ',
        localdata: gvItemContList

    };
	
	var treeAdapter = new $.jqx.dataAdapter(source);
	
	treeAdapter.dataBind();
	
	var records = treeAdapter.getRecordsHierarchy('GRAPH_SEQ', '0' ,'0'
												 ,[{name : 'GRAPHNM',map : 'label'}, {name : 'GRAPH_SEQ',map : 'id'}, {name : 'GRAPHKIND',map : 'value'}]);
													
	$('#itemContTree').jqxTree({
		allowDrag : true,
		allowDrop : false,
		width : '100%',
		height : '400px',
		source : records,
		checkboxes : true,
		hasThreeStates : true,
		animationShowDuration : 0,
		animationHideDuration : 0
	});
	

	$("#itemContTree .jqx-checkbox").css("margin-top", "4.5px");
	
	$("#itemContTree").on('dragEnd', function(event) {
		var args  = event.args;
		var item = args.owner._dragItem;
		
		var dataSet = {};
		var strItemSelType = $(".rdoITEM_SEL_TYPE:checked").val();
		dataSet.CONT_SEQ = $('#txtCONT_SEQ').val();
		dataSet.DATA_SEQ = $('#txtDATA_SEQ').val();
		dataSet.GRAPH_SEQ = item.id;
		dataSet.GRAPHNM = item.label;
	//	조회조건	
		console.log("getItemContDetlList::::::",dataSet);
		getItemContDetlList(dataSet);
	});
};



function getItemContTreeList()
{
	var dataSet = {};
	dataSet.CONT_SEQ = $('#txtCONT_SEQ').val();
	dataSet.DATA_SEQ = $('#txtDATA_SEQ').val();
	
	console.log(dataSet);
	
	callServiceSync("getItemContTreeList"
					,"visualizepopup/selGraphlist"
					,dataSet
					,"serviceCallbackSidebar");
}

function getItemContDetlList(dataSet)
{
	
	
	callServiceSync("getItemContDetlList"
			,"visualizepopup/selViusalGraphDetlList"
			,dataSet
			,"serviceCallbackSidebar");
	
}
function itemdropY(tmpItem, item){
	var ui = $("#draggableItem>li#"+tmpItem);
	var itemVal = $("#" + ui.attr("id")).data("item");
    if (itemVal.DATA_PER == "0%") {
        alert("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
        return;
    }
    if(itemVal.ITEM_TYPE != "NUM"){
    	alert("수치형 데이터가 아닙니다. 수치형 항목을 선택하세요.");
        return;
    }
    if ($("#col_" + itemVal.ITEM_VALUE).length > 0) return;
    ui.addClass("highlight_blue");
    $(".itemCol .sortable_area").append("<div class='summarySelected' id='col_" + itemVal.ITEM_VALUE + "'>" + itemVal.ITEM_TEXT + "<div class='fr' style='margin-left:5px;'><a href='#' class='fr' ><img src='/bigcenmed2/images/visual/close.png' class='fr delete' style='width:13px;' /></a></div>");
    $("#col_" + itemVal.ITEM_VALUE).data("item", itemVal);
               
    $(".delete").click(function () {
        var tmpId = $(this).parent().parent().parent().attr('id').toString();
        var tmp = $(".highlight_blue");
        tmp.each(function (x, y) {                      
            if (y.id.toString() == tmpId.substring(4))
                $(y).removeClass("highlight_blue");
        });
        $(this).parent().parent().parent().remove();
        activeVisualization();
        $('#panely_'+tmpId).remove();
    });
    activeVisualization();
    
    var tmphtml = '';
    tmphtml += '<div class="panel panel-default" id="panely_col_'+itemVal.ITEM_VALUE+'">';
    tmphtml += '<div class="panel-heading" role="tab">';
    tmphtml += '<div class="panel-title">';
    tmphtml += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#cy_' + itemVal.ITEM_VALUE +'" aria-expanded="false" aria-controls="cy_'+itemVal.ITEM_VALUE +'" style="white-space:normal; font-size: 10pt; color: #000;">';
    tmphtml += '<div> Y - '+itemVal.ITEM_TEXT +'</div>';
    tmphtml += '</button></div></div>';
    tmphtml += ' <div id="cy_' + itemVal.ITEM_VALUE +'" class="panel-collapse collapse" role="tabpanel" aria-expanded="false" style="overflow: auto; max-height: 200px; padding-bottom: 15px;">';
    if(itemVal.ITEM_TYPE==='TEXT'){
    	tmphtml += '<div class="input-group input-group-sm" style="width: 90%; margin: 10px;"><input type="text" class="form-control font-size-14" name="'+itemVal.ITEM_VALUE+'" id="filterSearchVal'+rowIdx+'" placeholder="대소문자를 구분해서 입력해주십시오."></div>';	
    }
    tmphtml += '</div></div>';
    
    $('#filterList').append(tmphtml);
    var rowIdx = itemx.length.toString();
    
    $.each(ItemList,function(key,value){
    	if(value.ITEM_TEXT == itemVal.ITEM_TEXT && value.ITEM_VALUE == itemVal.ITEM_VALUE){
    		rowIdx = key;
    		return false;
    	}
    });

    filteringMaker('y', itemVal.ITEM_VALUE, itemVal.ITEM_TYPE,rowIdx,item.FILTER_VALUE1,item.FILTER_VALUE2);
    filteringMakerSet(itemVal,item.FILTER_VALUE1,item.FILTER_VALUE2,'y');

}


function itemdropX(tmpItem, item){
	var ui = $("#draggableItem>li#"+tmpItem);
	var itemVal = $("#" + ui.attr("id")).data("item");
    if (itemVal.DATA_PER == "0%") {
    	alert("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
        return;
    }
    if ($("#row_" + itemVal.ITEM_VALUE).length > 0) return;
    ui.addClass("highlight_blue");
    $(".itemRow .sortable_area").append("<div class='summarySelected' id='row_" + itemVal.ITEM_VALUE + "'>" + itemVal.ITEM_TEXT + "<div class='fr' style='margin-left:5px;'><a href='#' class='fr'><img src='/bigcenmed2/images/visual/close.png' class='fr delete' style='width:15px; margin-left:5px;' /></a><div id='sel_row_" + itemVal.ITEM_VALUE + "' class='fr'></div></div></div>");
    $("#row_" + itemVal.ITEM_VALUE).data("item", itemVal);
    
    if (itemVal.ITEM_TYPE == "DATE") {                       
        var source = {
            datatype: "json"
            , datafields: [
                { name: 'LABEL' },
                { name: 'VALUE' }
            ]
            , localdata: [
                { LABEL: '날짜', VALUE: '' },
                { LABEL: '주', VALUE: 'WEEK' },
                { LABEL: '월', VALUE: 'MONTH' },
                { LABEL: '분기', VALUE: 'QUARTER' },
                { LABEL: '년도', VALUE: 'YEAR' }
            ]
        };

        var adapter = new $.jqx.dataAdapter(source);                        
        $("#sel_row_" + itemVal.ITEM_VALUE).jqxDropDownList({
            selectedIndex: 0,
            source: adapter,
            displayMember: "LABEL", valueMember: "VALUE",
            width: 80, height: 15, itemHeight: 25,
            theme: 'energyblue', dropDownHeight: '80px'
        });
        // Default Value
        $("#sel_row_" + itemVal.ITEM_VALUE).jqxDropDownList('selectIndex', 4 ); 
        // Select Event
        $("#sel_row_" + itemVal.ITEM_VALUE).on('select', function (e) {
        	activeVisualization();
            /*if ($("#sel_row_" + itemVal.ITEM_VALUE).val() != "1") {                    	
                $("#v5").addClass("disabled");
            }*/
        });
    }
    else if (itemVal.ITEM_TYPE == "NUM") {               

            var source = {
                datatype: "json"
                , datafields: [
                    { name: 'LABEL' },
                    { name: 'VALUE' }
                ]
                , localdata: [
                    { LABEL: '1단위', VALUE: '' },
                    { LABEL: '5단위', VALUE: '5' },
                    { LABEL: '10단위', VALUE: '10' },
                    { LABEL: '15단위', VALUE: '15' },
                    { LABEL: '20단위', VALUE: '20' }
                ]
            };

            var adapter = new $.jqx.dataAdapter(source);
            $("#sel_row_" + itemVal.ITEM_VALUE).jqxDropDownList({
                selectedIndex: 0,
                source: adapter,
                displayMember: "LABEL", valueMember: "VALUE",
                width: 80, height: 15, itemHeight: 25,
                theme: 'energyblue', dropDownHeight: '100px'
            });
            // Default Value
            $("#sel_row_" + itemVal.ITEM_VALUE).jqxDropDownList('selectIndex', 2 );
            // Select Event
            $("#sel_row_" + itemVal.ITEM_VALUE).on('select', function () {                    	
                activeVisualization();
            });
        
    }           
    
    $(".delete").click(function () {
        var tmpId = $(this).parent().parent().parent().attr('id').toString();
        var tmp = $(".highlight_blue");
        tmp.each(function (x, y) {
            if (y.id.toString() == tmpId.substring(4))
                $(y).removeClass("highlight_blue");
        });                     
        $(this).parent().parent().parent().remove();
        activeVisualization();
        $('#panelx_'+tmpId).remove();
    });
    activeVisualization();
    
    var rowIdx = itemx.length;
    
    $.each(ItemList,function(key,value){
    	if(value.ITEM_TEXT == itemVal.ITEM_TEXT && value.ITEM_VALUE == itemVal.ITEM_VALUE){
    		rowIdx = key;
    		return false;
    	}
    });
    
    var tmphtml = '';
    tmphtml += '<div class="panel panel-default" id="panelx_row_'+itemVal.ITEM_VALUE+'">';
    tmphtml += '<div class="panel-heading" role="tab">';
    tmphtml += '<div class="panel-title">';
    tmphtml += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#cx_' + itemVal.ITEM_VALUE +'" aria-expanded="false" aria-controls="cx_'+itemVal.ITEM_VALUE +'" style="white-space:normal;  font-size: 10pt; color: #000;">';
    tmphtml += 'X - '+itemVal.ITEM_TEXT +'';
    tmphtml += '</button></div></div>';
    tmphtml += ' <div id="cx_' + itemVal.ITEM_VALUE +'" class="panel-collapse collapse" role="tabpanel" aria-expanded="false" style="overflow: auto; max-height: 300px; padding-bottom: 15px;">';
    if(itemVal.ITEM_TYPE==='TEXT'){
    	tmphtml += '<div class="input-group input-group-sm" style="width: 90%; margin: 10px;"><input type="text" class="form-control font-size-14" name="text_'+itemVal.ITEM_VALUE+'" id="filterSearchVal'+rowIdx+'"  placeholder="대소문자를 구분해 주십시오." value='+item.FILTER_VALUE1+'></div>';	
    }
    tmphtml += '</div></div>';
    
    $('#filterList').append(tmphtml);
    

    filteringMaker('x', itemVal.ITEM_VALUE, itemVal.ITEM_TYPE,rowIdx,item.FILTER_VALUE1,item.FILTER_VALUE2);
    filteringMakerSet(itemVal,item.FILTER_VALUE1,item.FILTER_VALUE2,'x');
}

function filteringMakerSet(item, filter1,filter2 , position){
	var type = item.ITEM_TYPE;
	if(type=="TEXT"){
		var tmpStr = filter1.split('|');
		if(filter1 == "") return;
		for(var i=0; i<tmpStr.length; i++){
			$("input[name="+item.ITEM_VALUE+"][value='" + tmpStr[i] + "']").attr("checked", true);
		}
	}
	else if(type == "NUM"){
		if(filter1 == "EQ" || filter1 == ">=" || filter1 == ">" || filter1 == "<=" || filter1 == "<"){

			$('#filterNUM_LIST_'+position+'_'+item.ITEM_VALUE).val(filter1);
			var html = '';
			html += '<div class="form-group text-left" style="margin-left: 10px; margin-bottom: 0px;" >';
			html += '<input type="text" class="form-control" style="width: 93%;"';
			html += 'name="txtNUM1_'+position+'_'+item.ITEM_VALUE+'"';
			html += 'id="txtNUM1_'+position+'_'+item.ITEM_VALUE+'"';
			html += 'value=""';
			html += 'maxlength="100" style="width:40%;" onkeyup="this.value=number_filter(this.value);">';
			html += '</div>';
	
			$('#divWrapFilterNumberInputVal_'+position+'_'+item.ITEM_VALUE).html(html);
			
			$('#txtNUM1_'+position+'_'+item.ITEM_VALUE).val(filter2);

		}
		else{
			
			$('#filterNUM_LIST_'+position+'_'+item.ITEM_VALUE).val("BETWEEN");
			$('#txtNUM1_'+position+'_'+item.ITEM_VALUE).val(filter1);
			$('#txtNUM2_'+position+'_'+item.ITEM_VALUE).val(filter2);
						
		}
	}
	else{
		$('#filterDate_1_'+item.ITEM_VALUE).val(filter1);
		$('#filterDate_2_'+item.ITEM_VALUE).val(filter2);
	}
	
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
	
	$('#itemCateTree').on('select', function (event) {
        var e = event.args.element;
        var children = $(e).find("li");
    });
	
	$('#btnItemSearch').on('click',function(e){
		getCategoryList();
		
	});
	
	$('#txtSearchVal').on('keypress',function(e){
		if(e.keyCode == 13){
			getCategoryList();
		}
	});	
	
	$('.rgContent').on('click', function(){
		//열려있을때만 사이드바 닫음
		if($('.control-sidebar-dark').hasClass('control-sidebar-open')){
			$('#myRightBtn').trigger('click');
		}
	});

//	탭변경
	$('#sideTab').on('click',function(e){
		var x = $(event.target).text();         // active tab
	    var y = $(event.relatedTarget).text();  // previous tab
	    
	    var $elem = $(event.target)[0];
	    
	    $('#treeDiv_SHARE').html('');
	    $('#treeDiv_SHARE').append('<div id="itemContTree" class="margin-top-5" style="padding-top: 10px; padding-bottom: 10px; height: 100% !important;" ></div>');
	    
	    if($elem.id === 'shareBtn'){
	    	$('#shareBtn').parent().addClass('active');

	    	$('#share').show();
	    	//조건공유
	    	getItemContTreeList();
	    }
		
	});
	
	//그래프 저장	
	$('#btnVisualGraphSave').on('click',function(e){
		if(isNull(currentGraph)){
			showAlert('그래프 저장',"그래프를 선택하셔야 합니다.",null);
			return;
		}
		var dlg = $('#visualGraphSaveModal').modal({
			handle: ".modal-header",
			backdrop:true
		});
		
		dlg.find('.modal-title').text('그래프 저장');
		dlg.modal('show');
	});
	
	
	
	//그래프 삭제버튼 이벤트
	$('#btnRGDeleteSc').on('click',function(e){
		var dsItems = $("#itemContTree").jqxTree('getCheckedItems');
		var dataSet = {};
		var dsList 	= [];
		showConfirm('그래프 삭제',COM_0005,function(e){		//삭제하시겠습니까?
			
			if(e){
				var bDeleteYn = true;
				var dataSet = {};
				
				for(var i=0; i < dsItems.length; i++){
					var dsItem = {};
					if(dsItems[i].value < 0){
						continue;
					}
					dsItem.GRAPH_SEQ = dsItems[i].id;
										
					dsList.push(dsItem);
					
				}
				
				dataSet.CONT_SEQ = $('#txtCONT_SEQ').val();
				dataSet.DATA_SEQ = $('#txtDATA_SEQ').val();
				dataSet.dsItemContList = dsList;
				
				console.log(dataSet);
				var promise = http('visualizepopup/deleteVisualGraph', 'post', true,dataSet);
				promise.then(function(result) {
						console.log(result);
						showAlert('그래프 저장', "삭제 되었습니다.", function(e){
						getItemContTreeList();
					});
				});
				
				
			}
			
		});

	});
	
	$('#btnVisualSave').on('click',function(e){
		if(isNull($('#visualGraphName').val())){
			showAlert(null, '그래프 명은 ' + COM_0010, null);	//필수항목입니다.
			return;
		}
		
		chkGraphNmList($('#visualGraphName').val());	// 중복체크
		
		//중복된 조건명이 있으면	
		if(gvkGraphNmList.length > 0){
			showAlert('그래프 저장', COM_0045, null);	//중복된 조건이 있습니다.다른 명칭으로 저장해 주시기 바랍니다.
			return;
			
		}else{
			
			var dataSet = {};
			dataSet.CONT_SEQ = $('#txtCONT_SEQ').val();
			dataSet.DATA_SEQ = $('#txtDATA_SEQ').val();
			dataSet.GRAPHNM = $('#visualGraphName').val();
			dataSet.GRAPHKIND = currentGraph;
			if(!isNullOrEmpty(filterDataSet)){

				dataSet.FILTERX = filterDataSet.FILTERX;
				dataSet.FILTERY = filterDataSet.FILTERY;
					
			}
			else{

				dataSet.FILTERX = [];
				dataSet.FILTERY = [];
				
			}
			dataSet.PREPROCESS1 = $('input[name="funProcess_number"]:checked').val();
			dataSet.PREPROCESS2 = $('input[name="funProcess_text"]:checked').val();
			dataSet.PREPROCESS3 = $('input[name="odrProcess"]:checked').val();
			dataSet.PER_CODE = $.session.get("PER_CODE");
			dataSet.ITEMX	= itemx;
			dataSet.ITEMY	= itemy;
			console.log(dataSet);
			
			var promise = http('visualizepopup/insertVisualGraph', 'post', true,dataSet);
			promise.then(function(result) {
					showAlert('그래프 저장', COM_0001, function(e){
					
					getItemContTreeList();
					$('#btnVisualClose').trigger('click');
				});
			});
		}
		
		
	});
	
	
}





