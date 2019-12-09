var filterApplyYN = false;
var dataClinical = []; // chart data

var gvChartOpts = {
		lines: 13, // The number of lines to draw
		length: 11, // The length of each line
		width: 5, // The line thickness
		radius: 17, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#756969', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
};
var filterYN = false;

$(document).ready(function(){
	
	analysisInit();
	
	
	analysisInitEvent();
	
	
});
function setChartKindBox(rowData, seq, idx, result){
	 if(rowData.CHART_TYPE == 'PIE'){
		  makeTableChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
		  makePieChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
		  $('#boxChart'+seq+'_jqx').css('display','none');
		  
		  //$('#boxChart'+seq).css('display','none');
	  }
	  else if(rowData.CHART_TYPE == 'BAR'){
		  makeBarChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);	    		  
	  }
	  else if(rowData.CHART_TYPE == 'GRD'){
		  makeTableChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
	  }
	  else if(rowData.CHART_TYPE == 'GAO'){
		  makeTableGAOChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
	  }
}

function getSelectedChartList(){
	var selectedArr = [];
	var rows = $('#subClinical').jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		var rowData = rows[i];
		var chk = rows[i].DEFAULT_YN;
		if(chk == true){
			selectedArr.push(rowData);
		}
	}
	return selectedArr;
	//var rowData = $('#subClinical').jqxGrid('getrowdata',rowBoundIndex);
}

function getSelectedChartFilter(rowData, sb){
	
	//if(isNullOrEmpty(sb)) return;
	var seq = rowData.SEQ;
	
	var itemTarget = $('#box_item_'+seq).children('.box')[0];

	var spinner = new Spinner(gvChartOpts).spin(itemTarget);
	
	var dataSet = {};
	dataSet.ROW = rowData;
	dataSet.SUB_QUERY = sb;
	
	console.log(dataSet);
	var promise = http('dashboard/loadselectedChartFilter', 'post', true , dataSet);
    promise.then(function(result){
    	console.log(result);
    	spinner.stop();

    	var resultData = result.loadselectedChartFilter.CHART;
    	
    	if(rowData.CHART_TYPE == 'PIE'){
    		var $chart = $('#boxChart'+rowData.SEQ);
    		var data = setPieChartdataform(resultData);
    		Plotly.react('boxChart'+rowData.SEQ,data,pieLayout,config);
    		
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		$jqx.jqxGrid('source')._source.localdata = resultData;
    		$jqx.jqxGrid('updatebounddata','cells');
    	}
    	else if(rowData.CHART_TYPE == 'BAR'){
    		var $chart = $('#boxChart'+rowData.SEQ);
    		var data = setBarChartdataform(resultData);
    		Plotly.react('boxChart'+rowData.SEQ,data,barLayout,config);
    	}
    	else if(rowData.CHART_TYPE == 'GRD'){
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		var resultData = result.loadselectedChartFilter.CHART;
    		$jqx.jqxGrid('source')._source.localdata = resultData;
    		
    		$jqx.jqxGrid('updatebounddata','cells');
    		
    	}
    	else if(rowData.CHART_TYPE == 'GAO'){
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		var resultData = result.loadselectedChartFilter.CHART;
    		$jqx.jqxGrid('source')._source.localdata = resultData;
    		
    		$jqx.jqxGrid('updatebounddata','cells');
    		
    	}
    	
    	
    })
	
}

function getFilterBoxGroup(){
	var filterArray = [];
	
	$('.filter-box').each(function(key,value){
		var $this = $(this);
		var itemId = this.getAttribute('name');
		var seq = this.id.replace('filter_','');
		var baseTable = this.getAttribute('table');
		var tmpArray = [];
		var tmpMap = {};
		var itemCol = '';

		
		var rowData = $('#subClinical').jqxGrid('getrowdatabyid',seq);
		var type = rowData.CHART_TYPE;
		if(!isNullOrEmpty(rowData.ITEM_LABEL)){
			itemCol = rowData.ITEM_COLUMN.split(',');
		}
		
		if(type == 'PIE'){
			$.each($(this).children('.btn-group'),function(){
				tmpArray.push(this.id); 	
			});
		}
		else if(type == 'BAR'){
			$.each($(this).children('input[type="hidden"]'),function(){
				tmpArray.push(this.value);
			});
		}
		else if(type == 'GRD'){
			$.each($(this).children('.btn-group'),function(){
				tmpArray.push(this.id); 	
			});
		}
		else if(type == 'GAO'){
			$.each($(this).children('.and-group'),function(){
				var tmpArr2 = [];
				var $this2 = $(this);
				$.each($(this).children('.btn-group'),function(){
					var tmpSet = {};
					//tmpSet["ID"] = this.id;
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpSet[this.name] = this.value;
					})
					tmpArr2.push(tmpSet);
				});
				
				tmpArray.push(tmpArr2);
			});
		}
		tmpMap.CHART_TYPE = type;
		tmpMap.CONDITION = tmpArray;
		tmpMap.ITEM_ID = itemId;
		tmpMap.BASE_TABLE = baseTable;
		tmpMap.SEQ = seq;
		filterArray.push(tmpMap);
	});
	
	return filterArray;
}

function setDrawChart(rowData){
	var dataSet = {};
	dataSet.DATAQUERY = rowData.EXEC_SQL;
	
	var tmpMap = boxListSearch();
	var len = tmpMap.len;
	var idx = tmpMap.idx + 1;
	var num = parseInt(tmpMap.num) + 1;
	var seq = rowData.SEQ;
	

	if(rowData.CHART_TYPE == 'PIE'){			 
	  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx); 
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'BAR'){
	  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx);
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'GRD'){
	  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx); 
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'GAO'){
		html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx); 
		$('#item_'+idx).append(html);
	}
	var itemTarget = $('#box_item_'+seq).children('.box')[0];
	var spinner = new Spinner(gvChartOpts).spin(itemTarget);

	
	var promise = http('dashboard/loadselectedChart', 'post', true , dataSet);
    promise.then(function(result){
    	spinner.stop();
    	
    	setChartKindBox(rowData, seq, idx, result);
    	
    });
}

function checkDefaultChart(){
	
	for(var i=0; i<dataClinical.length; i++){
		
		var rowData = dataClinical[i];
		
		
		if(rowData.DEFAULT_YN == 'Y' || rowData.DEFAULT_YN == true){
			
			setDrawChart(rowData);
		}
		
	}
	
}
function setChartAddList(){
	
	dataClinical = [];
	
	var dataSet = {};
	
	dataSet.CATE_ID_CLINICAL = "CLINICAL";
	dataSet.CATE_ID_GENOMIC = "GENOMIC";
	dataSet.CATE_ID_ETC = "ETC";
	var promise = http('dashboard/selectChartList', 'post', false , dataSet);
	
	promise.then(function(result){
		var dataView = result.CATE_ID_CLINICAL;
		
		dataClinical = dataView;
		
	});

	console.log(dataClinical)
	
	
	 var source =
	   {
	       localdata: dataClinical,
	       datafields:
	       [
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'SEQ', type: 'string' },
	           { name: 'ITEM_CATE_NM', type: 'string' },
	           { name: 'ITEM_ID', type: 'string' },
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'ORDER', type: 'int' },
	           { name: 'SEARCH_YN', type: 'string' },
	           { name: 'DEFAULT_YN', type: 'string' },
	           { name: 'ITEM_TYPE', type: 'string' },
	           { name: 'CHART_TYPE', type: 'string' },
	           { name: 'EXEC_SQL', type: 'string' },
	           { name: 'BASE_DT_TABLE', type: 'string' },
	           { name: 'BASE_DT_COLUMN', type: 'string' },
	           { name: 'FREQ', type: 'int' },
	           { name: 'ITEM_COLUMN', type: 'string' },
	           { name: 'ITEM_LABEL', type: 'string' },
	           { name: 'ORIGIN_SQL', type: 'string' }
	        ],
	       datatype: "json",
	       id : 'SEQ',
	       updaterow: function (rowid, rowdata) {
	           // synchronize with the server - send update command   
	       }
	       
	   };
	  

	  $("#subClinical").on("bindingcomplete", function (event){
		
	  });
	  
	 var dataAdapter = new $.jqx.dataAdapter(source, {
		 beforeLoadComplete: function (records) {
		        var data = new Array();
		        // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
		        for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(tmp.DEFAULT_YN == 'Y'){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
		        }
		        return data;
	     },
	     loadComplete: function (data) 
	     {
	     }
	 });
	  // Create jqxGrid
	  $("#subClinical").jqxGrid(
	  {
		  width: '100%',
	      source: dataAdapter,
	      editable: true,
	      theme: 'bootstrap',
	      showfilterrow : true,
	      filterable: true,
	      //selectionmode: 'checkbox',
	      sortable : true,
	      columnsresize: true,
	      columnsautoresize : true,
	      ready: function(){
	    	  
	      },
	      columns: [
	    	{ 
	    		text: '#', datafield: 'DEFAULT_YN' , editable: true, columntype:'checkbox'
	    	},  
	        { 
	    		text: 'Name', datafield: 'ITEM_NM', width: '80%' , editable: false
	    	},
	        { 
	        	text: 'Freq', datafield: 'FREQ' , editable: false,
	        	cellsrenderer : function(row, column, value){
	        		
	        	}, cellsformat : 'p1'
	        }
	      ]
	  });

	  $("#subClinical").jqxGrid('sortby', 'FREQ', 'desc');

	  $("#subClinical").on('cellvaluechanged', function (event) 
	  {
	      // event arguments.
	      var args = event.args;
	      // column data field.
	      var datafield = event.args.datafield;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // new cell value.
	      var value = args.newvalue;
	      // old cell value.
	      var oldvalue = args.oldvalue;
	      var rowData = $('#subClinical').jqxGrid('getrowdata',rowBoundIndex);
	      
	      if(value == true){
	    	  console.log("true");
	    	  var query = rowData.EXEC_SQL;

		      var dataSet = {};
		      dataSet.DATAQUERY = query;
		      
		      var tmpMap = boxListSearch();
    		  var len = tmpMap.len;
    		  var idx = tmpMap.idx + 1;
    		  var num = parseInt(tmpMap.num) + 1;
    		  var seq = rowData.SEQ;
    		  var html = '';
    		  if(rowData.CHART_TYPE == 'PIE'){			 
    			  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx);    			  
    		  }
    		  else if(rowData.CHART_TYPE == 'BAR'){
    			  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx);   			  
    		  }
    		  else if(rowData.CHART_TYPE == 'GRD'){
    			  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx);   			  
    		  }
    		  else if(rowData.CHART_TYPE == 'GAO'){
    			  html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx); 
			  }
			  $('#item_'+idx).append(html);

			  var itemTarget = $('#box_item_'+seq).children('.box')[0];
			  var spinner = new Spinner(gvChartOpts).spin(itemTarget);
			  
		      var promise = http('dashboard/loadselectedChart', 'post', true , dataSet);
		      promise.then(function(result){
		    	  spinner.stop();
	    		  setChartKindBox(rowData,seq,idx,result);

		      });
	      }
	      else{
	    	  console.log("false");
	    	  if($('#filter_'+rowData.SEQ).length != 0 ){
	    		  $('#filter_'+rowData.SEQ).remove();
	    	  }
	    	  $('#box_item_'+rowData.SEQ).remove();
	    	  
	      }

	  });
	  

	
}

function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
}

function analysisInit(){
	
	//차트추가 목록
	setChartAddList();
	
	
	checkDefaultChart();
	
	
	
}


function analysisInitEvent(){
	$('#filter-group').eq(0).on('DOMSubtreeModified', function(){
		$('#filterApplyAfter').css('display','none');
		$('#filterApplyBefore').css('display','inline-block');
		filterApplyYN = false;
	});
	
	$('#btnDashboardFilterApply').on('click',function(){
		
		var filterArray = [];
		
		if($('.filter-box').length != 0){
			$('.filter-box').each(function(key,value){
				var $this = $(this);
				var itemId = this.getAttribute('name');
				var seq = this.id.replace('filter_','');
				var baseTable = this.getAttribute('table');
				var tmpArray = [];
				var tmpMap = {};
				
				var rowData = $('#subClinical').jqxGrid('getrowdatabyid',seq);
				var type = rowData.CHART_TYPE;
				var itemCol = '';
				if(!isNullOrEmpty(rowData.ITEM_LABEL)){
					itemCol = rowData.ITEM_COLUMN.split(',');
				}
				
				if(type == 'PIE'){
					$.each($(this).children('.btn-group'),function(){
						tmpArray.push(this.id); 	
					});
				}
				else if(type == 'BAR'){
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpArray.push(this.value);
					});
				}
				else if(type == 'GRD'){
					$.each($(this).children('.btn-group'),function(){
						tmpArray.push(this.id); 	
					});
				}
				else if(type == 'GAO'){
					$.each($(this).children('.and-group'),function(){
						var tmpArr2 = [];
						var $this2 = $(this);
						$.each($(this).children('.btn-group'),function(){
							var tmpSet = {};
							//tmpSet["ID"] = this.id;
							$.each($(this).children('input[type="hidden"]'),function(){
								tmpSet[this.name] = this.value;
							})
							tmpArr2.push(tmpSet);
						});
						
						tmpArray.push(tmpArr2);
					});
				}
				tmpMap.CONDITION = tmpArray;
				tmpMap.ITEM_ID = itemId;
				tmpMap.BASE_TABLE = baseTable;
				tmpMap.SEQ = seq;
				filterArray.push(tmpMap);
			});
		}
		var dataSet = {};
		console.log(filterArray);
		dataSet.FILTER = filterArray;
		var promise = http('dashboard/filterApply', 'post', true, dataSet);
		promise.then(function(result){

			console.log(result);
			
			var selectedArr = [];
			selectedArr = getSelectedChartList();
			var dataView = result.filterApply;
			var resultKeys = Object.keys(dataView);
			var resultVals = Object.values(dataView);
			
			for(var i=0; i<selectedArr.length; i++){
				
				var row = selectedArr[i];
				var idx = resultKeys.indexOf(row.SEQ.toString());
				if( idx != -1 ){
					if(isNullOrEmpty(resultVals[idx])) continue;
					getSelectedChartFilter(row, resultVals[idx]);
				}
				else{
					getSelectedChartFilter(row, dataView.all);
				}
			}
			$('#filterApplyBefore').css('display','none');
			$('#filterApplyAfter').css('display','inline-block');
			filterApplyYN = true;
			
			
		});
		
	});
	
	
	$('#btnDashboardCohortClear').on('click',function(){
		$('#filter-group').empty();
		
	});
	
	$(document).on('change','input[name="itemCate_tree"]',function(){
		var dataSet = {};

		dataSet.CATE_MID_SEQ = $(this).val();
		console.log(dataSet);
		
		var promise = http('dashboard/selectCohortDetlList', 'post', true , dataSet);
		
		promise.then(function(result){
			//console.log(result);
			var html = '';
			var dataView = result.selectCohortDetlList;
			
			if(isNullOrEmpty(dataView)){
				$('#selDashboardCohortList').empty();
				$('#selDashboardCohortList').attr('disabled',true);

				html += '<option value="">';
				html += '없음';
				html += '</option>';
				$('#selDashboardCohortList').append(html);
				return;
			}
			else{
				$('#selDashboardCohortList').empty();
				$('#selDashboardCohortList').attr('disabled',false);

				for(var i=0; i<dataView.length; i++){
					var tmpMap = dataView[i];
					html += '<option value="'+tmpMap.CATE_DETL_SEQ+'">';
					html += tmpMap.CATE_DETL_NM;
					html += '</option>';
				}
				$('#selDashboardCohortList').append(html);

			}
		});
		
		
	});
	
	
	$('#btnDashboardCohortAdd').on('click',function(){
		if(filterApplyYN == false){
			showAlert('알림','필터 적용후, 저장 해주십시오.',null);
			return ;
		}
		
		if(isNullOrEmpty($('input[name="itemCate_tree"]:checked').val())){
			showAlert('알림','코호트를 선택해주십시오.',null);
			return ;
		}
		if(isNullOrEmpty($('#txtDashboardCohortNM').val())){
			showAlert('알림','코호트 명을 입력해주십시오.',null);
			return ;
		}
		
		var dataSet = {};
		//dataSet.SEQ = $('input[name="itemCate_tree"]:checked').attr('seq');
		//dataSet.MID_SEQ = $('input[name="itemCate_tree"]:checked').val();
		dataSet.CATE_DETL_SEQ = $('#selDashboardCohortList').val();
		dataSet.CONT_NM = $('#txtDashboardCohortNM').val();
		dataSet.CONT_DESC = $('#txtDashboardCohortSub').val();
		dataSet.UDT_ID = $.session.get('PER_CODE');
		dataSet.CRT_ID = $.session.get('PER_CODE');
		
		var selectedArr = getSelectedChartList();
		dataSet.SELECTED_CHART = selectedArr;
		
		var filterArr = getFilterBoxGroup();
		dataSet.FILTER = filterArr;
		
		console.log(dataSet);
		var promise = http('/dashboard/insertCohortItemCont', 'post' ,true, dataSet);
		promise.then(function(result){
			showAlert('알림','저장 되었습니다.',null);
			
			console.log(result);
		});
		
	});
	

	$(document).on('click','.delete',function(){
		
		var grid = $(this).attr('grid');
		var id = $(this).attr('name');
		var chart = $(this).attr('table');
		
		if($("#"+grid+'_jqx').jqxGrid('getstate')==undefined){
			if($(this).parent().parent().children('div').length <= 1){
				$(this).parent().parent().remove();
			}
			else{
				$(this).parent().remove();
			}
		}
		else{
			var graphNM = grid+'_jqx';
			var idx = $("#"+graphNM).jqxGrid('getrowboundindexbyid',id);
			$("#"+graphNM).jqxGrid('unselectrow', idx);
			$("#"+graphNM).jqxGrid('setcellvaluebyid', id, "CHK", false);

		}
		
		
	});
	
	$(document).on('click','.box-delete',function(){
		
		var gridId = $(this).parents('li').attr('num');
		var gridIdx = $('#subClinical').jqxGrid('getrowboundindexbyid',gridId);
		$("#subClinical").jqxGrid('setcellvaluebyid',gridId,'DEFAULT_YN',false);
		//$('#subClinical').jqxGrid('unselectrow',gridIdx);
		//$(this).parents('li').remove();
		//$("#subClinical").jqxGrid('refresh');
		
	});
	
	$('#mainChartAdd,#mainSaveAdd').click(function(){
		
		
		var $this = $(this);
		var $divthis = $('#div'+$this[0].id);
		
	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	    var isZindex = $divthis.css('z-index');
	    
	    if (isZindex == "-1" ) {
	    	 
	     /* var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      
	
	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))*/
	    	$this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')
	        
	        $divthis.css('z-index',1000);
	    	
	        if('mainChartAdd' == $this[0].id && $('#mainSaveAdd').attr('aria-expanded') == 'true'){
				$('#mainSaveAdd').attr('aria-expanded','false');
				$('#divmainSaveAdd').css('z-index',-1);
				
				/*var $parent2  = getParent($('#mainSaveAdd'));
				$parent2.removeClass('open');*/
			}
			else if('mainSaveAdd' ==  $this[0].id && $('#mainChartAdd').attr('aria-expanded') == 'true'){
				$('#mainChartAdd').attr('aria-expanded','false');
				$('#divmainChartAdd').css('z-index',-1);
				/*var $parent2  = getParent($('#mainChartAdd'));
				$parent2.removeClass('open');*/
			}
	    }
	    else{
	    	$this.attr('aria-expanded', 'false')
	    	$divthis.css('z-index',-1);
	    	/* $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))*/
	    }
		
	});
/*	  $(".connectedSortable").sortable({
		    placeholder: "sort-highlight",
		    connectWith: ".connectedSortable",
		    handle: ".box-header, .nav-tabs",
		    forcePlaceholderSize: true,
		    zIndex: 999999
		  });
		  $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");*/
	$("#item_1,#item_2,#item_3,#item_4").sortable({
        opacity: 0.5,
        cursor: "move",
        connectWith: "#item_1,#item_2,#item_3,#item_4",
        placeholder: "highlight",
        zIndex: 999999,
        distance: 20,
        dropOnEmpty: true,
        sort:true,
        helper:  "clone",
        forcePlaceholderSize: true,
        start: function (event, ui) {
        		//ui.item.toggleClass("");
        		var $this = $(this);
        		if(ui.item.hasClass('pie')){
        			ui.placeholder.addClass('pie');
        			ui.placeholder.html('<div style="display:inherit"></div>');
        		}
        		else if(ui.item.hasClass('bar')){
        			ui.placeholder.addClass('bar');
        		}
        		else{
        			
        		}
        		
        },
        stop: function (event, ui) {
                //ui.item.toggleClass("");
                
        },
        cancel: "#graphTest,#graphTest1,#graphTest2,#graphTest3,#graphTest4,#graphTest5"
    });

	$("#item_1,#item_2,#item_3,#item_4").disableSelection();
	 
	$(document).on('mouseenter','.list',function(){
			/*$("#btnShowTable").css("display","inline-block");
			$("#btnShowPie").css("display","inline-block");*/
			var num = $(this).attr('num');
			var idx = $(this).attr('idx');
			/*$("#btnDropdownMenu_"+num).css("display","inline-block");*/
			$(this).children().children().children('.btn-drop-menu').css("display","inline-block");
			$(this).children().children().children('.btn-or-select').css("display","inline-block");
	});
	$(document).on('mouseleave','.list',function(){
			var num = $(this).attr('num');
			var idx = $(this).attr('idx');
			$(this).children().children().children('.btn-drop-menu').css("display","none");
/*			$("#btnShowTable").css("display","none");
			$("#btnShowPie").css("display","none");*/
			$(this).children().children().children('.btn-or-select').css("display","none");
	});	
	
	$(document).on('click','.btn-or-select',function(){
		var seq = $(this).parents('li').attr('num');
		var graphNM = 'boxChart'+seq;
		var divId = 'boxChart'+seq;
		var item = $('#subClinical').jqxGrid('getrowdatabyid',seq);
		var rowLen = $('#'+graphNM+'_jqx').jqxGrid('getrows').length;
		var itemLabel = item.ITEM_LABEL.split(',');
		var itemCol = item.ITEM_COLUMN.split(',');
		var name = item.ITEM_NM;;
		
		var selectedGAOArr = [];
		var selectedRowArr = [];
		
		for(var i=0; i<rowLen; i++){
			if($('#'+graphNM+'_jqx').jqxGrid('getcellvalue',i,'CHK')){
				selectedGAOArr.push($('#'+graphNM+'_jqx').jqxGrid('getrowdata',i));
				selectedRowArr.push($('#'+graphNM+'_jqx').jqxGrid('getrowboundindex',i));
			}
		}
		
		for(var i=0; i<selectedRowArr.length; i++){
			$('#'+graphNM+'_jqx').jqxGrid('selectrow',selectedRowArr[i]);
			
		}
		console.log(selectedGAOArr);
	
		if($('#filter_'+seq).length == 0){
			var htmlf = '';
			htmlf += '<div class="filter-box" id="filter_'+seq+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
			htmlf += 	'<span>';
			htmlf += 		name + ' : ';
			htmlf += 	'</span>';
			htmlf += '</div>';
			$('#filter-group').append(htmlf);
			
			
			var html = '';
			
			for(var i=0; i<selectedGAOArr.length; i++){
				//var html2 = '';
				var rowData = selectedGAOArr[i];
				var rowDataIdCol = rowData.CKEY.split(',');
				
				if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0) continue ;
				
				if(!isNullOrEmpty(html)) html += '<label>or</label>';
				
				html += 	'<div class="btn-group or-group" id="'+rowData.uid+'">';
				for(var j=0; j<itemCol.length; j++){
					html +=			'<input type="hidden" name="'+itemCol[j]+'" value='+ rowDataIdCol[j] +'>';	
				}
				html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+rowData.uid+'">';
				html +=  			rowData.CKEY;
				html += 		'</button>';
				html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+rowData.uid+'" grid="'+divId+'">';
				html += 		'<i class="fa fa-times"></i>';
				html += 		'</button>';
				html += 	'</div>';
				
				//$('#'+seq+'_and_'+'1 > .and-group-label').append(html2);
			}
			
			var htmlsub = '';
			htmlsub += 	'<div class="and-group" seq="'+seq+'">';
			htmlsub +=  '<label class="and-group-label">(</label>';
			
			htmlsub += html;
			
			htmlsub +=  '<label>)</label>';
			htmlsub += 	'</div>'
				
			$('#filter_'+seq).append(htmlsub);

			
			
		}
		else{
			var html = '';
			
			//var andLen = $('.btn-group.and-group').length;
			
			for(var i=0; i<selectedGAOArr.length; i++){
				//var html2 = '';
				var rowData = selectedGAOArr[i];
				var rowDataIdCol = rowData.CKEY.split(',');
				if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0) continue ;
				
				if(!isNullOrEmpty(html)) html += '<label>or</label>';
				
				html += 	'<div class="btn-group or-group" id="'+rowData.uid+'">';
				for(var j=0; j<itemCol.length; j++){
					html +=			'<input type="hidden" name="'+itemCol[j]+'" value='+ rowDataIdCol[j] +'>';	
				}
				html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+rowData.uid+'">';
				html +=  			rowData.CKEY;
				html += 		'</button>';
				html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+rowData.uid+'" grid="'+divId+'">';
				html += 		'<i class="fa fa-times"></i>';
				html += 		'</button>';
				html += 	'</div>';
				
				//$('#'+seq+'_and_'+(andLen+1)+' > .and-group-label').append(html2);
			}
			
			var htmlsub = '';
			htmlsub +=  '<label>and</label>';
			htmlsub += 	'<div class="and-group" seq="'+seq+'">';
			htmlsub +=  '<label class="and-group-label">(</label>';
			
			htmlsub += html;
			
			htmlsub +=  '<label>)</label>';
			htmlsub += 	'</div>'
				
			if(!isNullOrEmpty(html)){
				$('#filter_'+seq).append(htmlsub);
			}
			
			
		}
	
	

	});
	
	$(document).on('click','#btnShowTable',function(){
		var graphNM = "boxChart" + $(this).parents('li').attr('num');
		var graphkind = $(this).parents('li').attr('graph');
		var graph = eval(graphNM);
		
		$("#"+graphNM).css("display","none");
		$("#"+graphNM+"_jqx").css("display","block");
		$(this).parents('li').removeClass('pie');
		$("#"+graphNM+"_jqx").jqxGrid('refresh');
		

		var dropli = "dropdownli_" + $(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowPie"><a href="#">Show Pie</a></li>';
		$("#"+dropli).html(html2);
		
	});
	
	$(document).on('click','#btnShowPie',function(){
		var graphNM = "boxChart" + $(this).parents('li').attr('num');
		var graph = eval(graphNM);
		
		$("#"+graphNM).css("display","block");
		$("#"+graphNM+"_jqx").css("display","none");
		$(this).parents('li').addClass('pie');
		
		
		var dropli = "dropdownli_" + $(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowTable"><a href="#">Show Table</a></li>';
		$("#"+dropli).html(html2);
	});
}