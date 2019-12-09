var config = {
		scrollZoom: true, // lets us scroll to zoom in and out - works
		showLink: false, // removes the link to edit on plotly - works
		modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
		//modeBarButtonsToAdd: ['lasso2d'],
		displaylogo: false // this one also seems to not work
		//displayModeBar: true //this one does work
};
var pieLayout = {
		autosize: true,
		  dragmode : 'select',
		  /*title : {
			  text : itemNM
		  },*/
		  showlegend: false,
		  margin: {
			    l: 0,
			    r: 0,
			    b: 0,
			    t: 0,
		  }
}
var barLayout = {
		autosize: true,
		  dragmode : 'select',
		  selectdirection : "h",
		  showlegend: false,
		  margin: {
			  	l: 40,
			    r: 0,
			    b: 20,
			    t: 0,
		  }
}



var makeChart = function(chartId, chartData, prChartType, measure, dimension, cDate){
	
	/*if(chartData == ""){
		chartData = [
		             {date : '2017-03-23', A : 200, B : 100, C: 50, D: 150}, 
		             {date : '2017-03-24', A : 150, B : 220, C: 200, D: 100}, 
		             {date : '2017-03-25', A : 350, B : 120, C: 100, D: 20},
		             {date : '2017-03-26', A : 50, B : 20, C: 20, D: 30},
		             {date : '2017-03-27', A : 250, B : 220, C: 80, D: 50},
		             {date : '2017-03-28', A : 10, B : 50, C: 70, D: 70},
		             {date : '2017-03-29', A : 100, B : 80, C: 150, D: 120},
		             {date : '2017-03-30', A : 20, B : 220, C: 30, D: 80},
		             {date : '2017-03-31', A : 80, B : 180, C: 100, D: 220}
		             ];
		//var keyData = ["A", "B", "C", "D"];
		var axisOption = { x: { type: 'timeseries', tick: { format: '%Y-%m-%d' } } };	//차트 axis option
	}*/
	var axisOption = "";
	//날짜 형식 체크
	if(cDate == true){			//날짜 형식 일 경우
		axisOption = { x: { type: 'timeseries', tick: { format: '%Y-%m-%d' } } };
	}else{							//날짜 형식 아닐 경우
		axisOption = {x: {type: 'category'}};
	}
	
	//c3 스크립트
	chart = c3.generate({
	    bindto: chartId,
	    padding: {
	        right: '4'
	    },
	    data: {
	    	x : 'x',
	    	json: chartData,
			keys: {
				x: dimension, // it's possible to specify 'x' when category axis
				value: measure,
			},
			type: prChartType		// 'line', 'spline', 'step', 'area', 'area-step', 'bar', 'pie', 'scatter', 'donut', 'gauge'
	    },
	    axis: axisOption
	});
}

function setOverayBox(){
	var html = '';
	html += '<div class="overlay">';
	html += '  <i class="fa fa-refresh fa-spin"></i>';
	html += '</div>';
	
	return html;
	
}

function makePieEvent(data, name, x, y, chartId){
	
}
function makeBarEvent(data, name, x, y, chartId){
	if(data == undefined || data.points.length == 0) return;

	var barPlot2 = $('#'+chartId)[0];
	var name = barPlot2.getAttribute('name');
	
	if($('#filter_'+name).length > 0){
		$('#filter_'+name).remove();
	}
	
	var html = '';
	html += '<div class="filter-box" id="filter_'+name+'">';
	html += 	'<span>';
	html += 		name + ' : ';
	html += 	'</span>';
	html += 	'<div class="btn-group">';
	html += 		'<button type="button" class="btn bg-navy btn-flat" name="">';
	html +=  			data.range.x[0].toFixed(2)+ ' &le; x &le; ' + data.range.x[1].toFixed(2);
	html += 		'</button>';
	html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
	html += 		'<i class="fa fa-times"></i>';
	html += 		'</button>';
	html += 	'</div>';
	html += '</div>';
	
	$('#filter-group').append(html);
}
function makeScatterEvent(data, name, x, y, chartId){
	if(data == undefined || data.points.length == 0) return;

	var scatterPlot2 = $('#'+chartId)[0];
	var scatterLayout = scatterPlot2.layout;
	var name = scatterPlot2.getAttribute('name');
	
	var x;
	var y;
	
	if($('#filter_'+name).length > 0){
		$('#filter_'+name).remove();
	}
	
	var html = '';
	html += '<div class="filter-box" id="filter_'+name+'">';
	html += 	'<span>';
	html += 		name + ' : ';
	html += 	'</span>';
	html += 	'<div class="btn-group">';
	html += 		'<button type="button" class="btn bg-navy btn-flat" name="">';
	html +=  			data.range.x[0].toFixed(2)+ ' &le; ' +scatterLayout.yaxis.title +' &le; ' + data.range.x[1].toFixed(2);
	html +=  			' and '+ data.range.y[0].toFixed(2)+ ' &le; ' +scatterLayout.yaxis.title +' &le; ' + data.range.y[1].toFixed(2);
	html += 		'</button>';
	html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
	html += 		'<i class="fa fa-times"></i>';
	html += 		'</button>';
	html += 	'</div>';
	html += '</div>';
	
	$('#filter-group').append(html);
}


function makeChartBox(data, title, kind, seq, idx){
	var html = '';
	if(kind == 'PIE'){
		html += '<li class="list pie" id="box_item_'+seq+'" num='+seq+' idx='+idx+' graph="'+kind+'">';
	}
	else if(kind == 'BAR'){
		html += '<li class="list bar" id="box_item_'+seq+'" num='+seq+' idx='+idx+' graph="'+kind+'">';
	}
	else{
		html += '<li class="list" id="box_item_'+seq+'" num='+seq+' idx='+idx+' graph="'+kind+'">';
	}
	html += 	'<div class="box" >';
	html += 		'<div class="box-header">';
	html += 			'<div class="box-title"><span>'+title+'</span></div>'
	html += 			'<div class="btn-group btn-group-sm up-right-side btn-drop-menu" role="group" id="btnDropdownMenu_'+seq+'" style="">';
	html += 				'<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>';
	html += 				'<button type="button" class="btn btn-default box-delete"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>';
	html += 				'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_'+seq+'">';
	html += 					'<i class="fa fa-fw fa-bars" aria-hidden="true"></i>';
	html += 				'</button>';
	html += 				'<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_'+seq+'" id="dropdownli_'+seq+'">';
	if(kind == 'PIE'){
		html += 				'<li id="btnShowTable" class="showTable"><a href="#">Show Table</a></li>';
	}
	else{
		html += 				'<li id="btnShowTable" class=""><a href="#">Show</a></li>';
	}
	html += 				'</ul>';
	html += 			'</div>';
	html += 		'</div>';
	if(kind == 'PIE'){
		html += 		'<div class="box-body chart-body-pie">';
	}
	else if(kind == 'BAR'){
		html += 		'<div class="box-body chart-body-bar">';
	}
	else{
		html += 		'<div class="box-body chart-body-grd">';
	}
	if(kind == 'GRD'){
		html += 			'<div class="item" id="boxChart'+seq+'" style="display:none;">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" >';							
		html +=				'</div>';
	}
	else if(kind == 'GAO'){
		html += 			'<div class="item" id="boxChart'+seq+'" style="display:none;">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" >';			
		html +=				'</div>';
		html += 			'<div class="btn-group btn-group-sm down-right-side btn-or-select" id="btnOrSelecte_'+seq+'" style="">';
		html += 				'<button type="button" class="btn btn-primary">Select Samples</button>';
		html += 			'</div>';
	}
	else if(kind == 'BAR'){
		html += 			'<div class="item" id="boxChart'+seq+'">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" style="display:none;">';							
		html +=				'</div>';
	}
	else{
		html += 			'<div class="item" id="boxChart'+seq+'">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" >';							
		html +=				'</div>';
	}
	html += 		'</div>';
	html += 	'</div>';
	html += '</li>';
	
	return html;
}
function setBarChartdataform(resultData){
	
	var arrVal = [];
	var arrLabel = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].ITEM);
	}
	var data = [
		  {
		    x: arrLabel,
		    y: arrVal,
		    type: 'bar',
		    ids : arrLabel
		  }
		];
	return data;
	
}

function makeBarChart(resultData, item, seq, id, idx){
	//bar
	var myplot = $("#"+id);
	var myplot2 = document.getElementById(id);
	var itemNM = item.ITEM_NM;
/*	var arrVal = [];
	var arrLabel = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].NM);
	}*/
	
	var data = setBarChartdataform(resultData);
	/*var layout = {
			  autosize: false,
			  height : 140,
			  width : 390,
			  dragmode : 'select',
			  selectdirection : "h",
			  showlegend: false,
			  margin: {
				  	l: 40,
				    r: 0,
				    b: 0,
				    t: 10,
			  }
			};
	var config = {
			scrollZoom: true, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
			//modeBarButtonsToAdd: ['lasso2d'],
			displaylogo: false // this one also seems to not work
			//displayModeBar: true //this one does work
	};*/
	
	Plotly.newPlot(id, data, barLayout,config);
	
	myplot[0].on('plotly_selected',function(data){
		
		if(data == undefined || data.points.length == 0) return;

		var name = itemNM;
		
		if($('#filter_'+seq).length > 0){
			$('#filter_'+seq).remove();
		}
		
		var html = '';
		html += '<div class="filter-box" id="filter_'+seq+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
		html +=		'<input type="hidden" name="filterBar1" value='+data.range.x[0].toFixed(2)+'>';
		html +=		'<input type="hidden" name="filterBar2" value='+data.range.x[1].toFixed(2)+'>';
		html += 	'<span>';
		html += 		name + ' : ';
		html += 	'</span>';
		html += 	'<div class="btn-group" id="x">';
		html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+name+'">';
		html +=  			data.range.x[0].toFixed(2)+ ' &le; '+ name +' &le; ' + data.range.x[1].toFixed(2);
		html += 		'</button>';
		html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+name+'" grid="'+id+'">';
		html += 		'<i class="fa fa-times"></i>';
		html += 		'</button>';
		html += 	'</div>';
		html += '</div>';
		
		$('#filter-group').append(html);
		
	});
}

function setPieChartdataform(resultData){
	var arrVal = [];
	var arrLabel = [];
	var arrIds = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].NM);
		arrIds.push(resultData[i].ITEM);
	}
	
	var data = [{
		  values: arrVal,
		  labels: arrLabel,
		  type: 'pie',
		  ids : arrIds
		}];
	
	return data;
}

function makePieChart(resultData, item, seq, id, idx){
	var myplot = $("#"+id);
	var myplot2 = document.getElementById(id);
	
	var itemNM = item.ITEM_NM;
	/*var arrVal = [];
	var arrLabel = [];
	var arrIds = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].NM);
		arrIds.push(resultData[i].ITEM);
	}
	
	var data = [{
		  values: arrVal,
		  labels: arrLabel,
		  type: 'pie',
		  ids : arrIds
		}];*/
	var data = setPieChartdataform(resultData);
	
	/*var layout = {
		  autosize: false,
		  height : 150,
		  width : 199,
		  dragmode : 'select',
		  title : {
			  text : itemNM
		  },
		  showlegend: false,
		  margin: {
			    l: 0,
			    r: 0,
			    b: 0,
			    t: 0,
		  }
	};
	
	var config = {
			scrollZoom: true, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
			//modeBarButtonsToAdd: ['lasso2d'],
			displaylogo: false // this one also seems to not work
			//displayModeBar: true //this one does work
	};*/
	
	Plotly.newPlot(id, data, pieLayout, config);
	myplot[0].on('plotly_click',function(data){
		
		var name = itemNM;
		
		if($('button[name="'+seq+'_'+data.points[0].id[0]+'"]').length != 0) return ;
	
		var html = '';
		if($('#filter_'+seq).length == 0){
			html += '<div class="filter-box" id="filter_'+seq+'" name="'+item.ITEM_ID+'" table="'+item.BASE_DT_TABLE+'">';
			html += 	'<span>';
			html += 		name + ' : ';
			html += 	'</span>';
			html += 	'<div class="btn-group" id="'+data.points[0].id[0]+'">';
			html +=			'<input type="hidden" name="filterId" value='+data.points[0].id[0]+'>';
			html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+data.points[0].id[0]+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+data.points[0].id[0]+'" grid="'+id+'">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			html += '</div>';
			
			$('#filter-group').append(html);
		}
		else{
			html += 	' ';
			html += 	'<div class="btn-group" id="'+data.points[0].id[0]+'">';
			html +=			'<input type="hidden" name="filterId" value='+data.points[0].id[0]+'>';
			html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+data.points[0].id[0]+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+data.points[0].id[0]+'" grid="'+id+'">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			
			$('#filter_'+seq).append(html);
		}

		var graphNM = id+'_jqx';
		var idx = $("#"+graphNM).jqxGrid('getrowboundindexbyid',data.points[0].id[0]);
		$("#"+graphNM).jqxGrid('setcellvaluebyid', data.points[0].id[0], "CHK", true);
		//$("#"+graphNM).jqxGrid('selectrow', idx);
		
		
	});
}

function makeTableChart(resultData, item, seq, divId, idx){

	
	var graphNM = divId+'_jqx';
	var graph = eval(graphNM);
	var itemNM = item.ITEM_NM;

	
	var source =
    {
        localdata: resultData,
        datatype: "json",
        id: "ITEM"
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    $("#"+graphNM).jqxGrid(
    {
    	height : 340,
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	showfilterrow : true,
    	selectionmode: 'none',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
          { text: itemNM, datafield: 'NM' , editable: false},
          { text: '#', datafield: 'CNT', width: '15%', editable: false},
          { text: '#', datafield: 'CHK' , columntype:'checkbox', width: '5%', editable: true},
          { text: 'Freq' , datafield: 'total', width: '10%', editable: false , cellsformat : 'p2'}
        ]
    });
	

    $("#"+graphNM).on('cellvaluechanged', function (event) {
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
	      var rowData = $("#"+graphNM).jqxGrid('getrowdata',rowBoundIndex);
	      var name = itemNM;
	   		
	      if(value == true){
	    	if($('button[name="'+seq+'_'+rowData.ITEM+'"]').length != 0) return ;
	   	
	    	$('#'+graphNM).jqxGrid('selectrow',rowBoundIndex);
	   		var html = '';
	   		if($('#filter_'+seq).length == 0){
	   			html += '<div class="filter-box" id="filter_'+seq+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
	   			html += 	'<span>';
	   			html += 		name + ' : ';
	   			html += 	'</span>';
	   			html += 	'<div class="btn-group" id="'+rowData.ITEM+'">'; 
	   			html +=			'<input type="hidden" name="filterId" value='+ rowData.ITEM +'>';
	   			html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+rowData.ITEM+'">';
	   			html +=  			rowData.NM;
	   			html += 		'</button>';
	   			html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+rowData.ITEM+'" grid="'+divId+'">';
	   			html += 		'<i class="fa fa-times"></i>';
	   			html += 		'</button>';
	   			html += 	'</div>';
	   			html += '</div>';
	   			
	   			$('#filter-group').append(html);
	   		}
	   		else{
	   			html += 	' ';
	   			html += 	'<div class="btn-group" id="'+rowData.ITEM+'">';
	   			html +=			'<input type="hidden" name="filterId" value='+ rowData.ITEM+'>';
	   			html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+seq+'_'+rowData.ITEM+'">';
	   			html +=  			rowData.NM;
	   			html += 		'</button>';
	   			html +=			'<button type="button" class="btn bg-blue btn-flat delete" name="'+rowData.ITEM+'" grid="'+divId+'">';
	   			html += 		'<i class="fa fa-times"></i>';
	   			html += 		'</button>';
	   			html += 	'</div>';
	   			
	   			$('#filter_'+seq).append(html);
	   		}
	    	  
	      }
	      else{
	    	  $('#'+graphNM).jqxGrid('unselectrow',rowBoundIndex);  
	    	if($('#filter_'+seq).children('div').length <= 1){
	    	  	$('#filter_'+seq).remove();
			}
			else{
				$('#'+rowData.ITEM).remove();
			}
	      }
	
	});
    
}

function makeTableGAOChart(resultData, item, seq, divId, idx){

	
	var graphNM = divId+'_jqx';
	var graph = eval(graphNM);
	var itemNM = item.ITEM_NM;
	var itemLabel = item.ITEM_LABEL.split(',');

	//console.log(resultData)
	
	var fieldCol = [];
	var dataCol = [];
	var selectedRowCol = [];
	
	var isEditable = function (row, datafield, columntype, value) {
		var rowData = $("#"+graphNM).jqxGrid('getrowdata',row);
		if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0){
	    	return false;
	    }
	}
	
	for(var i=0; i<itemLabel.length; i++){
		var tmpSet = {};
		tmpSet = {text : itemLabel[i], datafield : 'C'+(i+1), editable: false}
		dataCol.push(tmpSet);
	}
	
	dataCol.push(
			{text : '#' , datafield : 'CNT', width: '10%', editable: false},
			{text : '<i class="fa fa-fw fa-caret-down"></i>', datafield : 'CHK', width: '5%' , editable: true, columntype:'checkbox', cellbeginedit: isEditable},
			{text : 'Freq' , datafield : 'FREQ' , cellsformat : 'p2', width: '15%', editable: false}
	)
	
	var source =
    {
        localdata: resultData,
        datatype: "json",
        id: "CKEY"/*,
        updaterow: function (rowid, rowdata, commit) {
            // synchronize with the server - send update command   
            commit(true);
        }*/
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    $("#"+graphNM).jqxGrid(
    {
    	height : 310,
    	/*width : 465,*/
    	width: '100%',
    	editable: true,
    	theme: 'bootstrap',
    	showfilterrow : true,
    	selectionmode: 'none',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: dataCol
    });
	
    $("#"+graphNM).on('cellvaluechanged', function (event) 
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
    		      var rowData = $("#"+graphNM).jqxGrid('getrowdata',rowBoundIndex);
    		      
    		      if(value == false){
    		    	  
    			    if($('#filter_'+seq).children('div').children('.or-group').length <= 1){
			    	  	$('#filter_'+seq).remove();
					}
					else{
						if($('#'+rowData.uid).parent().children('div').length <= 1){
							if($('#'+rowData.uid).parent().prev('label').text() == 'and'){
								$('#'+rowData.uid).parent().prev('label').remove();
							}
							else{
								$('#'+rowData.uid).parent().next('label').remove();
							}
							$('#'+rowData.uid).parent().remove();
						}
						else{
							if($('#'+rowData.uid).prev('label').text() == 'or'){
								$('#'+rowData.uid).prev('label').remove();
							}
							else{
								$('#'+rowData.uid).next('label').remove();
							}
							$('#'+rowData.uid).remove();
						}
						
					}
    		    	  
    		      }
    		      

    		  });
    

}

function makeScatterChart(data, name, x, y){
	
}

function boxListSearch(){
	var tmpArr = [];
	for(var i=0; i<$('.sortable_area').length; i++){
		tmpArr.push($('.sortable_area').eq(i).children().length);
	}
	var len = Math.min.apply(null,tmpArr);
	var idx = tmpArr.indexOf(len);
	var num;
	if($('.sortable_area').eq(idx).children().length == 0){
		num = 0;
	}
	else{
		num = $('.sortable_area').eq(idx).children().last()[0].getAttribute('num');
	}
	
	var resultMap = {};
	resultMap.len = len;
	resultMap.idx = idx;
	resultMap.num = num;
	return resultMap;
}