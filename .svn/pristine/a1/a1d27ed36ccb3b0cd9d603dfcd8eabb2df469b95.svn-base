var gvColumnList = [];
var ItemList = [];
var contSeq = '';
var dataSeq = '';
var tableId = '';
var d_test = [];
var b_test = [];
var itemx	= [];
var itemy	= [];
var frequencyX = '';
var frequencyY = '';
var currentTab = '#disnfre';
var currentItem = '';
var currentList = '';
var currentGraph = '';
var prevTab = '';
var itemSelectYVal = '';
var itemSelectXVal = '';
var filterDataSet;
var gvVisualPopTitle = '';
var gvVisualPopSumData;
var filterItemValX = '';
var filterItemValY = '';
var dataChartType;
var plotly_options = {
		scrollZoom: true, // lets us scroll to zoom in and out - works
		showLink: false, // removes the link to edit on plotly - works
		modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
		//modeBarButtonsToAdd: ['lasso2d'],
		displaylogo: false, // this one also seems to not work
		//displayModeBar: true, //this one does work
		hovermode:'closest',
		responsive: true
	};
const arrMax = arr => Math.max(...arr);
/**
 * Application Ready
 */
$(document).ready(function() {

			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				if($(e.target).attr("id") == "mvpTab" || $(e.target).attr("id") == "disnfreTab"){
					currentTab = $(e.target).attr("href"); // activated tab	
					if($(".highlight_blue").length > 0)
						$("#"+$(".highlight_blue")[0].id).click();
				}								
			});
			
			var dataSet = {};

			dataSet.CONTSEQ = contSeq;
			dataSet.DATASEQ = dataSeq;			
			var promise = http('visualizepopup/selcolumnslist', 'post', true,
					dataSet);
			promise.then(function(result) {
				console.log(result);
				tableId = result.selTableList.TABLE_ID;
				gvColumnList = result;
				setColumList();
				gvVisualPopTitle = result.selTableList.DATA_NM;
				
				
				console.log("ITEMLIST::::::::::",ItemList)
				
				var NumItemList = [];
				var NumItemTextList = [];

				for(var i=0; i<ItemList.length;i++){
					if(ItemList[i].ITEM_TYPE=='NUM' && ItemList[i].DATA_PER != "0%"){
						NumItemList.push(ItemList[i].ITEM_VALUE);
						NumItemTextList.push(ItemList[i].ITEM_TEXT);
					}
				}
				
				var dataSet3 = {};
				
				dataSet3.NUMLIST = NumItemList;
				dataSet3.NUMTEXT = NumItemTextList;
				dataSet3.CONTSEQ = contSeq;
				dataSet3.DATASEQ = dataSeq;
				dataSet3.TABLEID = tableId;
				dataSet3.COLID = '';
				dataSet3.COLTYPE = '';

				var promise = http('visualizepopup/visualizeSummaryData', 'post', true, dataSet3);
				promise.then(function(result) {
					console.log("SUMMARY::::::::::",result);
					console.log(result.length);
					if(result != undefined){
						 $("#table_summary").children().remove();
		                 var thString = "<thead><tr><th>항목</th><th>Min</th><th>1st Qu.</th><th>Median</th><th>Mean</th><th>3rd Qu.</th><th>Max</th></tr></thead>";
		                 var trString = "<tbody>";                 
		                 $.each(result, function (key, value) {
		                     trString += "<tr>";
		                     $.each(value, function (key2, value2) {                     	
		                    	 if(key2 == "ITEM_TEXT"){
		                    		 trString += "<th>"+value2+"</th>";
		                    	 }
		                    	 
		                    	 if(key2 == "SummaryData"){
			                    	$.each(value2, function (key3, value3){
			                    		trString += "<td>" + value3 + "</td>";
			                    	});
		                    	 }                     	
		
		                     });
		                     trString += "</tr>";
		                 });
		                 trString += "</tbody>";
		                 
		                 $("#table_summary").append(thString+trString);
		                 $("#imgSummary").css('display', 'none');
					}
				});
				
				initSummaryTab();
				initEvent();
				$("#" + ItemList[0].ITEM_VALUE).click();
			});
			
			//word export start
			$('#wordMakeStart').unbind('click');
			
			$("#wordMakeStart").click(function(){ 
				$('.visualDisplay').show();
				$("#exprotPadding").css('display', 'block');
				$("#exprotPadding").css('padding-top', '500px');
				// word export modal open
				$('#modalWordAddPop').modal('show', {backdrop: 'static', keyboard: false});
				$('#btnWordExport').off()
				setStatsSummary();
				//Frequency cart load
				getWordDFChartLoad();
				
			});
			
			//word 모달 오픈
			wordMoadlOpen();
			//word 모달 초기화
			wordMoadlReset();
			
			//pdf export start
			$('#pdfMakeStart').unbind('click');
			
			$("#pdfMakeStart").click(function(){ 
				$('.visualDisplay').show();
				$("#exprotPadding").css('display', 'block');
				$("#exprotPadding").css('padding-top', '500px');
				// pdf export modal open
				$('#modalPdfAddPop').modal('show', {backdrop: 'static', keyboard: false});
				$('#btnPdfExport').off()
				setStatsSummary();
				//Frequency cart load
				getPdfDFChartLoad();
			});
			
			//pdf 모달 오픈
			pdfMoadlOpen();
			//pdf 모달 초기화
			pdfMoadlReset();
			
			//시각화분석 word export
			$("#wordMakeStartVisual").click(function(){ 
				$('.visualDisplay').show();
				gvSpinnerOpen();
				$("#chartVisualWordPdfTitleSub").css({"border": "1px solid #000", "margin-top": "30px", "font-size" : "11pt"});
				if($("#visualArea").is(':empty')){
					alert("그래프를 선택해 주세요.");
					gvSpinnerClose();
				}else{
					setVisualWordPdfTitle();
					setVisualWordPdfExport();
				}
			});
			
			//시각화분석 pdf export
			$("#pdfMakeStartVisual").click(function(){ 
				$('.visualDisplay').show();
				$("#chartVisualWordPdfTitleSub").css({"margin-left": "70px", "margin-right": "90px", "border": "1px solid #000", "margin-top": "30px", "font-size" : "11pt"});
				gvSpinnerOpen();
				if($("#visualArea").is(':empty')){
					alert("그래프를 선택해 주세요.");
					gvSpinnerClose();
				}else{
					setVisualWordPdfTitle();
					setVisualWordPdfExport();
				}
			});
			
			
});

function number_filter(str_value){
	return str_value.replace(/[^0-9.]-/gi, ""); 
}

function chkFiltering(element){
	var value = $(element).prop("name");

	var tmpChkValue = '';
	
	if ($(element).is(":checked") == true) {
        $('[name='+value+'].magic-check-filtering').each(function() {
        	$(this).prop('checked',true);
        	
        	if(tmpChkValue == ''){
        		tmpChkValue = $(this).val();			
    		}
    		else{
    			tmpChkValue += '|' + $(this).val(); 
    		}
        	$('input[name=text_'+value+']').val(tmpChkValue);
        });
    } else {
        $('[name='+value+'].magic-check-filtering').each(function() {
        	$(this).prop('checked',false);
        	$('input[name=text_'+value+']').val('');
        });
    }
}

function filteringMaker(position,value,type,row,filter1,filter2){
	var tmphtml = '';
	
	var rowid = ''
	if(type=="TEXT"){
		tmphtml += '<div style="width: 80%;border-bottom: solid 1px; border-color: #e2e2e2; display: inline-block;border-radius: 2px; text-align: left;"> ';
		tmphtml += '<input type="checkbox" class="magic-checkbox filtering" name='+value+' onclick="javascript:chkFiltering(this)" id="chkFilteringAll'+value+'">';
		tmphtml += '<label for="chkFilteringAll'+value+'" class="magic-check" name='+value+'  style="margin-left: 5px; font-weight: 300;" >All</label>';
		tmphtml += '</div>';
		var dataSet = {};
		dataSet.CONTSEQ = contSeq;
		dataSet.DATASEQ = dataSeq;
		dataSet.TABLEID = tableId;
		dataSet.GRAPH = "FRQ";
		dataSet.X = value;
		dataSet.ITEMTYPE = type;
		var promise = http('visualizepopup/visualizeFrequency', 'post', false,dataSet);
		promise.then(function(result) {
			console.log(result);
			var xCnt = result.xdata;
			var tmpChkValue = '';
			$.each(xCnt,function(xKey,xValue){

				tmphtml += '<div style="width: 80%;border-bottom: solid 1px; border-color: #e2e2e2; display: inline-block;border-radius: 2px; text-align: left; margin-top: 10px; "> ';
				tmphtml += '<input type="checkbox" name="'+value+'" class="magic-checkbox filtering magic-check-filtering" id="chkFiltering_'+value+xKey+'" value="'+xValue+'">';
				tmphtml += '<label for="chkFiltering_'+value+xKey+'" class="magic-check" style="margin-left: 5px; font-weight: 300;">'+xValue+'</label>';
				tmphtml += '</div>';
				if(tmpChkValue == ''){
	        		tmpChkValue = xValue;			
	    		}
	    		else{
	    			tmpChkValue += '|' + xValue; 
	    		}

			});
			$('#c'+position+'_'+value).append(tmphtml);
			
			
			if(isNull(filter1)){
				$('input[name='+value+'].magic-checkbox.filtering').prop('checked',true);
				$('input[name=text_'+value+']').val(tmpChkValue);
			}
			else{
				var tmpStr = filter1.split('|');
				var tmpChkValue2 = '';
				$.each(tmpStr, function(k1,v1){
					
					if(tmpChkValue2 == ''){
						tmpChkValue2 = v1;			
		    		}
		    		else{
		    			tmpChkValue2 += '|' + v1; 
		    		}
					
				});
				$('input[name=text_'+value+']').val(tmpChkValue2);
			}
			
		});
		
	}
	else if(type=="NUM"){
		tmphtml += '<div class="form-group" style="margin-bottom: 0px;">';
		tmphtml += '<select class="default-select4 form-control input-sm" style="margin: 10px; width: 90%;" ';
		tmphtml += 'name="filterNUM_LIST_'+position+'_'+value+'"';
		tmphtml += 'id="filterNUM_LIST_'+position+'_'+value+'"';
		tmphtml += 'onchange="javascript:changeFilterNumberValue(this,';
		tmphtml += "'"+position+"_"+value+"'";
		tmphtml += ');">';
		tmphtml += '<option value="BETWEEN" selected>';
		tmphtml += 'between';
		tmphtml += '</option>';
		tmphtml += '<option value=">" >';
		tmphtml += '>';
		tmphtml += '</option>';
		tmphtml += '<option value="<" >';
		tmphtml += '<';
		tmphtml += '</option>';
		tmphtml += '<option value=">=" >';
		tmphtml += '>=';
		tmphtml += '</option>';
		tmphtml += '<option value="<=" >';
		tmphtml += '<=';
		tmphtml += '</option>';
		tmphtml += '<option value="EQ" >';
		tmphtml += '=';
		tmphtml += '</option>';
		tmphtml += '</select>';
		tmphtml += '<div id="divWrapFilterNumberInputVal_'+position+'_'+value+'">'
		tmphtml += '<div class="form-group row" style="margin: 0px;">';
		tmphtml += '<div class="col-md-5" style="padding-left: 10px; padding-right: 0px;"><input type="text" class="form-control" ';
		tmphtml += 'name="txtNUM1_'+position+'_'+value+'"';
		tmphtml += 'id="txtNUM1_'+position+'_'+value+'"';
		tmphtml += 'value=""';
		tmphtml += 'maxlength="100" style="width: 100%;" onkeyup="this.value=number_filter(this.value);"></div>';
		tmphtml += '<div class="col-md-1" style="margin-top: 6px;"><span>~</span></div>';
		tmphtml += '<div class="col-md-5" style="padding-left: 10px; padding-right: 3px"><input type="text" class="form-control" ';
		tmphtml += 'name="txtNUM2_'+position+'_'+value+'"';
		tmphtml += 'id="txtNUM2_'+position+'_'+value+'"';
		tmphtml += 'value=""';
		tmphtml += 'maxlength="100" style="width:100%;" onkeyup="this.value=number_filter(this.value);"></div>';
		tmphtml += '</div></div>';
		$('#c'+position+'_'+value).append(tmphtml);
	}
	else{
		var tmphtml = "<div style='width: 90%; margin: 10px;'>";
		tmphtml = tmphtml +	"<div class='input-group width-100p'>";
		tmphtml = tmphtml +		"<div class='input-group-addon'>";
		tmphtml = tmphtml +			"<i class='fa fa-calendar calendar' style='cursor:pointer;' onclick=javascript:showDatePicker(this,'filterDate_1_"+value+"')></i>";
		tmphtml = tmphtml +		"</div>";
		tmphtml = tmphtml + 		"<input type='text' class='form-control maskDateInput table-size-sub' id='filterDate_1_"+value+"' name='filterDate_1_"+value+"' maxlength='10' placeholder='From'"
		tmphtml = tmphtml	+ 		 "value='' ></div>";
		tmphtml = tmphtml +	"<div class='input-group width-100p'>";
		tmphtml = tmphtml + 		"<span class='input-group-addon background-color-d2d6de'>~</span></div>"
		tmphtml = tmphtml +	"<div class='input-group width-100p'>";
		tmphtml = tmphtml +		"<div class='input-group-addon border-right-0'>";
		tmphtml = tmphtml +			"<i class='fa fa-calendar calendar' style='cursor:pointer;' onclick=javascript:showDatePicker(this,'filterDate_2_"+value+"')></i>";
		tmphtml = tmphtml +		"</div>";
		tmphtml = tmphtml + 		"<input type='text' class='form-control maskDateInput table-size-sub' id='filterDate_2_"+value+"' name='filterDate_2_"+value+"' maxlength='10' placeholder='To'"
		tmphtml = tmphtml +		"value=''>";
		tmphtml = tmphtml + 	"</div>"
		tmphtml = tmphtml + "</div>";
		
		
		//날짜형 mask적용
		$(document).on('focus','.maskDateInput',function(){
			$(this).mask('0000-00-00');
			$(this).select();
		});
		
		
		$('#c'+position+'_'+value).append(tmphtml);
	}
	

		
		
}


function changeFilterNumberValue(element,row)
{
	var html = '';
	
	if($(element).val() === 'BETWEEN'){
		html += '<div class="form-group row" style="margin: 0px;">';
			html += '<div class="col-md-5" style="padding-left: 10px; padding-right: 0px;"><input type="text" class="form-control" ';
			html += 'name="txtNUM1_'+row+'"';
			html += 'id="txtNUM1_'+ row +'"';
			html += 'value=""';
			html += 'maxlength="100" style="width: 100%;" onkeyup="this.value=number_filter(this.value);"></div>';
			html += '<div class="col-md-1" style="margin-top: 6px;"><span>~</span></div>';
			html += '<div class="col-md-5" style="padding-left: 10px; padding-right: 3px"><input type="text" class="form-control" ';
			html += 'name="txtNUM2_'+row+'"';
			html += 'id="txtNUM2_'+row+'"';
			html += 'value=""';
			html += 'maxlength="100" style="width:100%;" onkeyup="this.value=number_filter(this.value);"></div>';
			
		html += '</div>';
		
	}else{
		html += '<div class="form-group text-left" style="margin-left: 10px; margin-bottom: 0px;" >';
			html += '<input type="text" class="form-control" style="width: 93%;"';
			html += 'name="txtNUM1_'+row+'"';
			html += 'id="txtNUM1_'+ row +'"';
			html += 'value=""';
			html += 'maxlength="100" style="width:40%;" onkeyup="this.value=number_filter(this.value);">';
		html += '</div>';
		
	}
	
	$('#divWrapFilterNumberInputVal_'+row).html(html);
	
}


// 시각화 항목리스트 뿌리기
function setColumList() {
	// gvColumnList
	ItemList = [];
	var tmpItemGroup = gvColumnList["selColumnsList"].filter(function(x) {
		return x.HIDDEN_YN = "N"
	});
	var totalCnt = gvColumnList["selTableList"]["TABLE_CNT"];
	tmpItemGroup.forEach(function(x, y) {
		var tmpType = "TEXT";
		if (x.ITEM_TYPE == "DAT")
			tmpType = "DATE"
		else if (x.ITEM_TYPE == "COD")
			tmpType = "TEXT"
		else if (x.ITEM_TYPE == "TEX")
			tmpType = "TEXT"
		else
			tmpType = x.ITEM_TYPE;
		
		var data_per = Math.round(x.CNT / totalCnt * 100); 
		if (data_per == 0) { 
			if(x.CNT != 0) {
				data_per = 1; 
			} 
		}
		 
		if(x.COLUMN_ID != "PAT_SBST_NO" && x.COLUMN_ID != "PERIOD_CD"){
			ItemList.push({
				"ITEM_VALUE" : x.COLUMN_ID,
				"ITEM_TEXT" : x.COLUMN_COMMENT,
				"ITEM_TYPE" : tmpType,
				"DATA_PER" : data_per + "%"
			})
		}		

	});
	for (var i = 0; i < ItemList.length; i++) {
		$(".itemBox ul")
				.append(
						"<li id='"
								+ ItemList[i].ITEM_VALUE
								+ "' class='ui-state-highlight' style='float:left; width:100%;'><p class='ellipsis_text' style='display:block; float:left; ' title='"+ItemList[i].ITEM_TEXT+"'>"
								+ ItemList[i].ITEM_TEXT
								+ "</p><div style='float:right; '><div class='fr' style='display:block; margin-Left:5px;'> "
								+ ItemList[i].DATA_PER
								+ "</div><div class='fr'  style='display:block;'>"
								+ ItemList[i].ITEM_TYPE + "</div></div></li>");
		$("#" + ItemList[i].ITEM_VALUE).data("item", ItemList[i]);
	}
}

function getFrequency(item, id) {
	var dataSet = {};
	dataSet.CONTSEQ = contSeq;
	dataSet.DATASEQ = dataSeq;
	dataSet.TABLEID = tableId;
	dataSet.GRAPH = "FRQ";
	dataSet.X = item.ITEM_VALUE;
	dataSet.ITEMTYPE = item.ITEM_TYPE;
	var promise = http('visualizepopup/visualizeFrequency', 'post', true,
			dataSet);
	promise.then(function(result) {
		console.log(result);
		frequencyX = result["xdata"];
		frequencyY = result["ydata"];
		//데이터 전체 건 수 구하기
		gvVisualPopSumData = result.ydata.reduce((a, b) => a + b, 0);
		console.log(numberWithCommas(gvVisualPopSumData));
		
		var data = [ {
			x : result["xdata"],
			y : result["ydata"],
			type : 'bar'
		} ];
		var layout = {
			title : "<b>" + item.ITEM_TEXT + "</b>",
			 xaxis: {}
		};

		if(item.ITEM_TYPE == "TEXT")
			layout["xaxis"]["type"]="category";
		
		dataChartType = data;
		Plotly.newPlot(id, data, layout, plotly_options);
	});
}

function getDistribution(item, id) {
	var dataSet = {};
	dataSet.CONTSEQ = contSeq;
	dataSet.DATASEQ = dataSeq;
	dataSet.TABLEID = tableId;
	dataSet.GRAPH = "DIST";
	dataSet.X = item.ITEM_VALUE;
	dataSet.ITEMTYPE = item.ITEM_TYPE;
	var promise = http('visualizepopup/visualizeFrequency', 'post', true,
			dataSet);
	promise.then(function(result) {
		console.log(result);
		frequencyX = result["xdata"];
		frequencyY = result["ydata"];
		//데이터 전체 건 수 구하기
		gvVisualPopSumData = result.ydata.reduce((a, b) => a + b, 0);
		console.log(gvVisualPopSumData)
		
		// Distribution Density 계산
		function kernelDensityEstimator(kernel, X) {
			  return function(V) {
			    return X.map(function(x) {
			      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
			    });
			  };
			}
		// Distribution Density 계산
		function kernelEpanechnikov(k) {
		  return function(v) {
		    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
		  };
		}
		var x = Plotly.d3.scale.linear() .domain([result["xdata"][0]-10, result["xdata"][result["xdata"].length-1]+10])
		, y = Plotly.d3.scale.linear().domain([0, 0.15])
		, density = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))(result["numdata"])
		, bins = d3.histogram().domain(x.domain()).thresholds(40)(result["numdata"]);
				
		var x_density = [], y_density = [];
		
		density.forEach(function(x){
			x.forEach(function(z,w){ 
				if ( w == 0 ) {
						x_density.push(z);
					} 
				else if ( w == 1 ){
					y_density.push(z);
				}
			});
		})
				
		var trace1 =  {
			x : x_density,
			y : y_density,
			type : 'scatter',
			name : 'Density'
		} ;		
		
		var trace2 =  {
			x : result["xdata"],
			y : result["ydata"],
			type : 'bar',
			yaxis: 'y2',
			name : 'Frequency'
		} ;
		
		var data = [trace1, trace2];
		var layout = {
			title : "<b>" + item.ITEM_TEXT + "</b>",
			yaxis : {
				rangemode: 'tozero',
				title: "<b>" + 'Density' + "</b>",
				overlaying: 'y2'
			    },
			yaxis2: {
				rangemode: 'tozero',
			    title: "<b>" + 'Frequency' + "</b>", 
			    titlefont: {color: 'rgb(148, 103, 189)'}, 
			    tickfont: {color: 'rgb(148, 103, 189)'}, 
			    side: 'right'
			  }
		};
		
		dataChartType = data;
		Plotly.newPlot(id, data, layout, plotly_options);
	});
}
	
function drawPieGraph(item, id){
	var data = [{
		  values: frequencyY,
		  labels: frequencyX,
		  type: 'pie'
		}];

	var layout = {
			title : "<b>" + currentItem.ITEM_TEXT + "</b>"
	};
	
	dataChartType = data ; 
	Plotly.newPlot(id, data, layout, plotly_options);
	
//	if(currentItem.ITEM_TYPE =='NUM'){
//		Plotly.newPlot('area_distribution', data, layout, plotly_options);
//	}
//	else{
//		Plotly.newPlot('area_frequency', data, layout, plotly_options);
//	}
}

function drawRadarGraph(item, id){
	var data = [{
		  type: 'scatterpolar',
		  r: frequencyY,
		  theta: frequencyX,
		  fill: 'toself'
		}]

	var layout = {
			title : "<b>" + currentItem.ITEM_TEXT + "</b>",
			polar: {
		    radialaxis: {
		      visible: true
		    }
		  },
		  showlegend: false	
		}
	
	dataChartType = data ; 
	console.log(dataChartType)
	Plotly.newPlot(id, data, layout, plotly_options);
	
//	if(currentItem.ITEM_TYPE =='NUM'){
//		Plotly.newPlot('area_distribution', data, layout, plotly_options);
//	}
//	else{
//		Plotly.newPlot('area_frequency', data, layout, plotly_options);
//	}
}

function drawLineGraph(item, id){
	if(currentItem.ITEM_TYPE =='NUM'){
		var trace = {
				  x: frequencyX,
				  y: frequencyY,
				  mode: 'lines',
				  type: 'scatter'
				};
		
		var data = [trace];
		var layout = {
				title : "<b>" + currentItem.ITEM_TEXT + "</b>"
			}
	
		dataChartType = data ; 
		Plotly.newPlot(id, data, layout, plotly_options);
		
//		Plotly.newPlot('area_distribution', data, layout, plotly_options);
	}
	else{
		var trace = {
				  x: frequencyX,
				  y: frequencyY,
				  mode: 'lines'
				};
		
		var data = [trace];
		var layout = {
				title : "<b>" + currentItem.ITEM_TEXT + "</b>"
			}
		
		dataChartType = data ; 
		Plotly.newPlot(id, data, layout, plotly_options);
		
//		Plotly.newPlot('area_frequency', data, layout, plotly_options);

	}
}
// Missing Value Pattern 그리기
function drawMissingValue(data, id) {
	
	// ColList 가져온 후 Missing Value 및 Summary
	/*var dataSet2 = {};
	dataSet2.CONTSEQ = contSeq;
	dataSet2.DATASEQ = dataSeq;
	dataSet2.TABLEID = tableId;
	dataSet2.COLID = '';
	dataSet2.COLTYPE = '';
	var promise = http('visualizepopup/visualizeMissingValue', 'post',
			true, dataSet2);
	promise.then(function(result) {
		console.log(result);
		drawMissingValue(result);		
	});*/
	
	var colorscaleValue = [ [ 0, '#FFFFFF' ], [ 1, '#000000' ] ];

	var drawData = [ {
		x : data["xdata"],
		y : data["ydata"],
		z : data["zdata"],
		type : 'heatmap',
		colorscale : colorscaleValue,
		showscale : false,
		hoverinfo : "x+y"
	} ]
	var layout = {
		hovermode : 'closest',
		title : "<b>" + "Missing Value Pattern" + "</b>"
	};
	Plotly.newPlot(id, drawData, layout, plotly_options);
}

var initSummaryTab = function() {
	// 기초분석 Visualize 이미지 설명
	$("#c1").mouseover(function() {
		$("#visualization_desc").html("<b>Box Plot : 수치형 항목에 대한 요약통계 값</b> <br>Y:수치(1개) X:범주(0~2개)<br>Data Preprocessing : 없음");
	});
	$("#c2")
			.mouseover(
					function() {
						$("#visualization_desc")
								.html("<b>Bar Graph : 범주형 항목에 대한 수치형 항목의 평균 또는 합계 | 범주형 항목의 빈도 또는 비율</b><br>Y:수치(1개) X:범주(0~1개) <br>Data Preprocessing : 수치형, 순서<br>Y:수치(0개) X:범주(1~2개) : 범주별 (교차)빈도 및 비율<br>Data Preprocessing : 범주형, 순서");
					});
	$("#c3").mouseover(
			function() {
				$("#visualization_desc").html(
						"<b>Scatter Plot : 두개의 수치형 항목의 상관 관계를 확인</b><br>Y:수치(1개) X1:수치(1개) X2:범주(0~1개)<br>Data Preprocessing : 없음");
			});
	// $("#c4").mouseover(function () {
	// $("#visualization_desc").html("Bubble Chart <br>y:Measure(1개)
	// <br>x:Measure(1개) <br>Fill:Measure(1개)");
	// });
	$("#c5").mouseover(function() {
		$("#visualization_desc").html("<b>Heatmap : 수치형 데이터의 평균을 연, 월로 분할하여 비교 </b><br>Y:수치(1개) X:날짜(1개)<br>Data Preprocessing : 없음");
	});
	$("#c6").mouseover(
			function() {
				$("#visualization_desc").html(
						"<b>Bar + Spot Graph : 범주형 항목에 대한 두개의 수치형 항목의 평균 또는 합계를 비교</b><br>Y:수치(2개) X:범주 또는 날짜(1개)<br>Data Preprocessing : 수치형, 정렬");
			});
	$("#c7").mouseover(
			function() {
				$("#visualization_desc").html(
						"<b>Line Graph : 날짜 항목에 대한 수치형 항목의 평균 또는 항목, 날짜별 추이 확인</b><br>Y:수치(1개) X1:날짜(1개) X2:범주(0~1개)<br>Data Preprocessing : 수치형, 정렬");
			});
	// $("#c8").mouseover(function () {
	// $("#visualization_desc").html("지도 <br>...");
	// });
	$("#c9").mouseover(function() {
		$("#visualization_desc").html("<b>Stack Bar Graph : 범주형 항목에 대한 수치형 항목의 평균 또는 합계</b><br>Y:수치(1개) X:범주(2개)<br>Data Preprocessing : 수치형, 정렬");
	});
	$("#c10").mouseover(function() {
		$("#visualization_desc").html("<b>Pie Chart : 범주형 항목의 빈도 또는 비율 </b><br>Y:수치(0개) X:범주(0~2개)<br>Data Preprocessing : 범주형, 정렬");
	});
	$(".visual").mouseover(function() {
		$(this).addClass("viewborder");
		$(this).removeClass("visual");
	})
	$(".visual").mouseout(
			function() {
				$(this).removeClass("viewborder");
				$(this).addClass("visual");
				$("#visualization_desc").html(
						"위 아이콘에 마우스 이동 시 사용방법<br> (필요한 항목 조건등 설명) 표시");
			});
}




function activeVisualization() {
    var selectItems = $(".summarySelected");
    itemx = []; 
    itemy = []; 

    $.each(selectItems, function (x, y) {
        var tmp = y.id.toString();
        var item_type = $("#" + tmp.substring(4)).data("item").ITEM_TYPE
        if (tmp.split('_')[0] == "col") {
            itemy.push({ id: tmp.substring(4), text: y.innerText, grouping: grouping, item_type: item_type });            
        }
        else if (tmp.split('_')[0] == "row") {
            var grouping = [];
            if (item_type == "NUM") {                
                //if (tmp.match(/AGE/gi) != null) {
                    var groupValue = "1";
                    groupValue = $("#sel_" + tmp).val();    
                    grouping.push({ type: "AGE", value: groupValue });
                //}
            }
            // 날짜
            else if (item_type == "DATE") {
                var groupValue = "1";
                groupValue = $("#sel_" + tmp).val();  
                grouping.push({ type: "DATE", value: groupValue });
            }
            itemx.push({ id: tmp.substring(4), text: y.innerText, grouping: grouping, item_type: item_type });
                                   
        }
    });

    allDisabled();
    console.log("x 값")
    console.log(itemx)
    console.log("y 값")
    console.log(itemy)
    
    if (itemx.length > 2 || itemy.length > 2){
    	allDisabled();
    }
    else{    
    	// 새로 Visualization -> 그래프 당 하나씩 처리 하기
    	//Boxplot
    	if(itemy.length == 1){
    		if (itemy[0].item_type == "NUM") {
    			$("#v1").removeClass("disabled");
    			if(itemx.length == 1){
    				if (itemx[0].item_type == "TEXT" || itemx[0].item_type == "DATE") {
    					$("#v1").removeClass("disabled");   				
    				}
    				else{
    					if($("#sel_row_" + itemx[0].id).val() != ""){
    						$("#v1").removeClass("disabled");
    					}
    					else{
    						$("#v1").addClass("disabled");
    					}    					   	
    				}
    			}
    			else if(itemx.length == 2){
    				if (itemx[0].item_type == "TEXT" || itemx[0].item_type == "DATE") {
    					if (itemx[1].item_type == "TEXT") {
        					$("#v1").removeClass("disabled");   				
        				}
        				else{
        					if(itemx[1].item_type == "NUM"){
        						if($("#sel_row_" + itemx[1].id).val() != ""){
            						$("#v1").removeClass("disabled");
            					}
            					else{
            						$("#v1").addClass("disabled");
            					}   	
        					}        					
        				}				
    				}
    				else{
    					if($("#sel_row_" + itemx[0].id).val() != ""){
    						$("#v1").removeClass("disabled");
    					}
    					else{
    						$("#v1").addClass("disabled");
    					}   	
    				}
    			}
    		}    		
    	}
    	
    	//BarChart && Stack BarChart
    	if(itemy.length == 1){
    		if (itemy[0].item_type == "NUM") {
    			$("#v2").removeClass("disabled");
    			if(itemx.length == 1){
    				if (itemx[0].item_type == "TEXT" || itemx[0].item_type == "DATE") {
    					$("#v2").removeClass("disabled");
    				}
    				else{
    					if($("#sel_row_" + itemx[0].id).val() != ""){
    						$("#v2").removeClass("disabled");
    					}
    					else{
    						$("#v2").addClass("disabled");
    					}  
    				}
    			}
    			else if(itemx.length == 2){
    				$("#v2").addClass("disabled");  
    				if (itemx[0].item_type == "TEXT" || itemx[0].item_type == "DATE") {
    					if (itemx[1].item_type == "TEXT") {
        					$("#v9").removeClass("disabled");   				
        				}
        				else{
        					if(itemx[1].item_type == "NUM"){
	        					if($("#sel_row_" + itemx[1].id).val() != ""){
	        						$("#v9").removeClass("disabled");
	        					}
	        					else{
	        						$("#v9").addClass("disabled");   	
	        					}
        					}
        				}				
    				}
    				else{
    					if($("#sel_row_" + itemx[0].id).val() != ""){
    						if (itemx[1].item_type == "TEXT") {
            					$("#v9").removeClass("disabled");   				
            				}
            				else{
            					if(itemx[1].item_type == "NUM"){
    	        					if($("#sel_row_" + itemx[1].id).val() != ""){
    	        						$("#v9").removeClass("disabled");
    	        					}
    	        					else{
    	        						$("#v9").addClass("disabled");   	
    	        					}
            					}
            				}			
    					}
    					else{
    						$("#v2").addClass("disabled");
    					}  
    				}
    			}
    		}    		
    	}
    	else if(itemy.length == 0 && itemx.length > 0 ){
    		if (itemx[0].item_type == "TEXT" || itemx[0].item_type == "DATE") {
				$("#v2").removeClass("disabled");  
				$("#v10").removeClass("disabled");  
				if(itemx.length == 2){
					if (itemx[1].item_type == "TEXT" || itemx[1].item_type == "DATE") {
    					$("#v2").removeClass("disabled");  
    					$("#v10").removeClass("disabled");
    				}
    				else{
    					if($("#sel_row_" + itemx[1].id).val() != ""){
    						$("#v2").removeClass("disabled");
    						$("#v10").removeClass("disabled");
    					}
    					else{
    						$("#v2").addClass("disabled");
    						$("#v10").addClass("disabled");
    					}  		
    				}
				}
			}
			else{
				if($("#sel_row_" + itemx[0].id).val() != ""){
					$("#v2").removeClass("disabled");
					$("#v10").removeClass("disabled");

				}
				else{
					$("#v2").addClass("disabled");
					$("#v10").addClass("disabled");
				}  	
			}
    	}
    	
    	// BarChart + Spot
    	if(itemy.length == 2 && itemx.length == 1 ){
    		if(itemy[0].item_type == "NUM" && itemy[1].item_type == "NUM"){
    			if (itemx[0].item_type == "TEXT" || itemx[0].item_type == "DATE") {
					$("#v6").removeClass("disabled");   				
				}
				else{
					if($("#sel_row_" + itemx[0].id).val() != ""){
						$("#v6").removeClass("disabled");
					}
					else{
						$("#v6").addClass("disabled");
					}
				}
    		}
    	}
    	
    	// Line Graph
    	if(itemy.length == 1 && itemx.length > 0){
    		if(itemy[0].item_type == "NUM" ){
    			if (itemx[0].item_type == "DATE") {
					$("#v7").removeClass("disabled");   		
					if(itemx.length == 2){
						if (itemx[1].item_type == "TEXT" || itemx[1].item_type == "DATE") {
							$("#v7").removeClass("disabled");  
						}
						else {
							if($("#sel_row_" + itemx[1].id).val() != ""){
								$("#v7").removeClass("disabled");
							}
							else{
								$("#v7").addClass("disabled");
							}
						}
					}
				}
				else{
					$("#v7").addClass("disabled");   	
				}
    		}
    	}
    	
    	// Scatter
    	if(itemy.length == 1 && itemx.length > 0){
    		if(itemy[0].item_type == "NUM" ){
    			if (itemx[0].item_type == "NUM") {
    				if($("#sel_row_" + itemx[0].id).val() == ""){
						$("#v3").removeClass("disabled");
						if(itemx.length == 2){
							if (itemx[1].item_type == "TEXT" || itemx[1].item_type == "DATE") {
								$("#v3").removeClass("disabled");  
							}
							else {
								if($("#sel_row_" + itemx[1].id).val() != ""){
									$("#v3").removeClass("disabled");
								}
								else{
									$("#v3").addClass("disabled");
								}
							}
						}
					}
					else{
						$("#v3").addClass("disabled");
					}	
					
				}
				else{
					$("#v3").addClass("disabled");   	
				}
    		}
    	}
    	
    	// Heatmap
    	if(itemy.length == 1 && itemx.length == 1){
    		if(itemy[0].item_type == "NUM" ){    			
    			if (itemx[0].item_type == "DATE") {		
					if ($("#sel_row_" + itemx[0].id).val() == "") {                    	
			            $("#v5").removeClass("disabled");
			        }
					else {
						$("#v5").addClass("disabled");   
					}
				}
				else{
					$("#v5").addClass("disabled");   	
				}
    		}
    	}    	
    	
    }
    
}

function setfilterDataList(){
	var dataSet = {};
	var dataXArray = [];
	var dataYArray = [];
	$.each(itemx,function(index,value){
		var tmpSet = {};
		tmpSet.VALUE = '';
		if(value.item_type==='TEXT'){
			tmpSet.VALUE = $('input[name=text_'+value.id+']').val();
		}
		else if(value.item_type==='NUM'){
			console.log($('#filterNUM_LIST_x_'+value.id).val());
			tmpSet.NUMVALUE = $('#filterNUM_LIST_x_'+value.id).val();
			if($('#filterNUM_LIST_x_'+value.id).val()==='BETWEEN'){			
				if(!isNull($('input[name=txtNUM1_x_'+value.id+']').val()) && !isNull($('input[name=txtNUM2_x_'+value.id+']').val())){
					tmpSet.VALUE = $('input[name=txtNUM1_x_'+value.id+']').val();
					tmpSet.VALUE += "~";
					tmpSet.VALUE += $('input[name=txtNUM2_x_'+value.id+']').val();
				}
				else if(isNull($('input[name=txtNUM1_x_'+value.id+']').val()) && isNull($('input[name=txtNUM2_x_'+value.id+']').val())){
					tmpSet.VALUE = $('input[name=txtNUM1_x_'+value.id+']').val();
					tmpSet.VALUE += "~";
					tmpSet.VALUE += $('input[name=txtNUM2_x_'+value.id+']').val();
				}
				else{
					alert("빈칸에 값을 넣어 주십시오.")
					return true;
				}
			}
			else{
				tmpSet.VALUE = $('input[name=txtNUM1_x_'+value.id+']').val();
			}
		}
		else{
			console.log($('#filterDate_1_'+value.id).val());
			var tmpDate1 = $('input[name=filterDate_1_'+value.id+']').val();
			var tmpDate2 = $('input[name=filterDate_2_'+value.id+']').val();
			
			if(isNull(tmpDate1) && !isNull(tmpDate2)){
				tmpDate1 = 'n';
			}
			if(!isNull(tmpDate1) && isNull(tmpDate2)){
				tmpDate2 = 'n';
			}
			tmpSet.VALUE = tmpDate1;
			tmpSet.VALUE += "~";
			tmpSet.VALUE += tmpDate2;
		}
		
		tmpSet.ITEM_TEXT = value.text;
		tmpSet.ITEM_VALUE = value.id;
		tmpSet.ITEM_TYPE = value.item_type;
	
		dataXArray.push(tmpSet);
	
	});
	dataSet.FILTERX = dataXArray;
	$.each(itemy,function(index,value){
		var tmpSet = {};
		tmpSet.NUMVALUE = $('#filterNUM_LIST_y_'+value.id).val();
		if($('#filterNUM_LIST_y_'+value.id).val()==='BETWEEN'){			
			if(!isNull($('input[name=txtNUM1_y_'+value.id+']').val()) && !isNull($('input[name=txtNUM2_y_'+value.id+']').val())){
				tmpSet.VALUE = $('input[name=txtNUM1_y_'+value.id+']').val();
				tmpSet.VALUE += "~";
				tmpSet.VALUE += $('input[name=txtNUM2_y_'+value.id+']').val();
			}
			else if(isNull($('input[name=txtNUM1_y_'+value.id+']').val()) && isNull($('input[name=txtNUM2_y_'+value.id+']').val())){
				tmpSet.VALUE = $('input[name=txtNUM1_y_'+value.id+']').val();
				tmpSet.VALUE += "~";
				tmpSet.VALUE += $('input[name=txtNUM2_y_'+value.id+']').val();
			}
			else{
				alert("빈칸에 값을 넣어 주십시오.")
				return true;
			}
		}
		else{
			tmpSet.VALUE = $('input[name=txtNUM1_y_'+value.id+']').val();
		}
		tmpSet.ITEM_TEXT = value.text;
		tmpSet.ITEM_VALUE = value.id;
		tmpSet.ITEM_TYPE = value.item_type;
	
		dataYArray.push(tmpSet);
		
	});
	dataSet.FILTERY = dataYArray;
	
	filterDataSet = dataSet;
}

function visualization(n, filter){
	var numVal	= $('input[name="funProcess_number"]:checked').val();
	var txtVal	= $('input[name="funProcess_text"]:checked').val();
	var order	= $('input[name="odrProcess"]:checked').val();
	$(".selectvisual").removeClass("selectvisual");
	$("#c"+n).addClass("selectvisual");
	setfilterDataList();
	
	var dataSet = {};
	dataSet.CONTSEQ = contSeq;
	dataSet.DATASEQ = dataSeq;
	dataSet.TABLEID = tableId;
	dataSet.P1		= numVal;
	dataSet.P2		= txtVal;
	dataSet.P3		= order;
	dataSet.X		= '';
	dataSet.X2		= '';
	dataSet.Y		= '';
	dataSet.Y2		= '';
	dataSet.GRDT	= '';
	dataSet.GRDT2	= '';
	dataSet.GRNUM	= '';
	dataSet.GRNUM2	= '';
	dataSet.ITEM_TYPE = '';
	dataSet.ITEM_TYPE2 = '';
	dataSet.FILTERX = [];
	dataSet.FILTERY = [];
	
	var emptyChk = false;
	if(!isNullOrEmpty(filterDataSet)){
		$.each(filterDataSet.FILTERX,function(key,value){
			if(value.ITEM_TYPE == 'TEXT' && isNull(value.VALUE)){
				emptyChk = true;
				alert("TEXT " + value.ITEM_TEXT+" 항목 선택을 해주시기 바랍니다.")
			}				
		});
		if(emptyChk == true) return;
		else{

			dataSet.FILTERX = filterDataSet.FILTERX;
			dataSet.FILTERY = filterDataSet.FILTERY;
		}
		
	}
	else{
		dataSet.FILTERX = [];
		dataSet.FILTERY = [];
	}


	
	if(itemx.length==1){
		dataSet.X = itemx[0].id;
		dataSet.ITEM_TYPE = itemx[0].item_type;
		if(itemx[0].grouping.length != 0){
			if(itemx[0].grouping[0].type=='DATE'){
				dataSet.GRDT = itemx[0].grouping[0].value;
			}
			else if(itemx[0].grouping[0].type=='AGE'){
				dataSet.GRNUM = itemx[0].grouping[0].value;
			}

		}
	}
	else if(itemx.length==2){
		dataSet.X = itemx[0].id;
		dataSet.X2 = itemx[1].id;
		dataSet.ITEM_TYPE = itemx[0].item_type;
		dataSet.ITEM_TYPE2 = itemx[1].item_type;
		if(itemx[0].grouping.length != 0){	
			if(itemx[0].grouping[0].type=='DATE'){
				dataSet.GRDT = itemx[0].grouping[0].value;
			}
			else if(itemx[0].grouping[0].type=='AGE'){
				dataSet.GRNUM = itemx[0].grouping[0].value;
			}
		}
		if(itemx[1].grouping.length != 0){
			if(itemx[1].grouping[0].type=='DATE'){
				dataSet.GRDT2 = itemx[1].grouping[0].value;
			}
			else if(itemx[1].grouping[0].type=='AGE'){
				dataSet.GRNUM2 = itemx[1].grouping[0].value;
			}

		}
	}

	if(itemy.length==1){
		dataSet.Y = itemy[0].id;
	}
	else if(itemy.length==2){
		dataSet.Y = itemy[0].id;
		dataSet.Y2 = itemy[1].id;
	}

	
	console.log(n);
	
	switch(n){
	case 1:
		dataSet.GRAPH	= 'BOX';
		break;
	case 2:
		dataSet.GRAPH	= 'BAR';
		break;
	case 3:
		dataSet.GRAPH	= 'SCT';
		break;
	case 5:
		dataSet.GRAPH = 'HEAT';
		break;
	case 6:
		dataSet.GRAPH	= 'BARSPOT';
		break;
	case 7:
		dataSet.GRAPH = 'LINE';
		break;
	case 9:
		dataSet.GRAPH	= 'STACKBAR';
		break;
	case 10:
		dataSet.GRAPH	= 'PIE';  //Pichart가 Bar 데이터셋과 같음 20181012
		break;
	}
	
	console.log(dataSet);
	var promise = http('visualizepopup/visualizeAllGraph', 'post', true,dataSet);
	
	promise.then(function(result) {
		console.log(result);
		currentGraph = dataSet.GRAPH;
		console.log(currentGraph)
		console.log(result.type)
		
		if(result["ERROR"] != undefined){
			alert("선택하신 항목의 수가 많습니다. \n다른 항목을 선택하세요.\n항목 수 : "+result["ERROR"]+"개");
		}
		else if(result["total"] == undefined) {
			drawVisualization(result, dataSet.GRAPH);
		}
		else {
			drawVisualizationMulti(result, dataSet.GRAPH);
		}
		
	});
}

function drawVisualization(result, type){
	var numVal	= $('input[name="funProcess_number"]:checked').val();
	var txtVal	= $('input[name="funProcess_text"]:checked').val();
	var order	= $('input[name="odrProcess"]:checked').val();
	var data = [], layout = {}, x = result["xdata"], y = result["ydata"], name = "", xname = "", yname = "", marb = 0;
	
	if(result["type"] == "heatmap"){
		//var colorscaleValue = [ [ 0, 'rgb(000,000,255)' ], [ 0.5, 'rgb(204, 204, 204)' ], [ 1, 'rgb(255, 102, 102)' ] ];
		var colorscaleValue = [ [ 0, 'rgb(255,255,255)' ], [ 1, 'rgb(0, 102, 255)' ] ];
		
		data = [ {
			x : x,
			y : y,
			z : result["zdata"],
			type : result["type"],
			colorscale : colorscaleValue
		} ];
	}
	else if(result["type"] == "pie"){
		data = [ {
			values : result["ydata"],
			labels : result["xdata"],
			type : result["type"]
		} ];
	}
	else{
		if(result["type"] == "box"){
			yname = "";
		}
		else if (itemx.length == 0 && itemy.length > 0 && result["type"] != "box"){
			name = itemy[0].text;
			if(numVal == "SUM"){
				y = result["sdata"];
				yname = "합";
			}					
			else {
				yname = "평균"
			}		
		}
		else if(itemx.length > 0 && itemy.length > 0 && result["type"] != "box"){
			name = "(" + itemx[0].text + ", " + itemy[0].text + ")";
			xname = itemx[0].text;
			if(numVal == "SUM"){
				y = result["sdata"];
				yname = itemy[0].text + " 합";
			}					
			else {
				yname = itemy[0].text + " 평균"
			}	
		}		
		else if (itemy.length == 0){
			name = itemx[0].text;		
			if(itemx.length == 2){
				name = "(" + itemx[0].text + ", " + itemx[1].text + ")";
			}
			xname = name;
			
			if(txtVal == "RATIO"){
				y = result["rdata"];
				yname = "비율";
			}
			else {
				yname = "빈도";
			}	
		}		
		
		if(x == undefined){
			data = [ {
				y : y,
				type : result["type"],			
				name : name
			} ];
		}
		else{
			if(type == "SCT"){
				data = [ {
					x : x,
					y : y,
					mode: 'markers', 
					  marker: {
					    size: 9
					  }
				} ];
			}else{
				data = [ {
					x : x,
					y : y,
					type : result["type"],
					mode : result["mode"]
				} ];
			}
			
			var xlength = [];
			$.each(result["xdata"],function(w,z){xlength.push(z.length)});
			var maxLength = arrMax(xlength);
			marb = (maxLength-1)*10;
			if(marb < 120)
				marb = 120;
		}
	}
	
	
	
	layout = {
			autosize: true,
		 title : name,//'visualization ' + result["type"],
		 xaxis: {
		    title: "<b style='background:white;'>" + xname + "</b>",
		    titlefont: {
		      family: 'Courier New, monospace',
		      size: 18,
		      color: '#7f7f7f'
		    },
		    tickfont:{		        
		    	size: 12
		      }
		  },
		  yaxis: {
		    title: "<b>" + yname + "</b>",
		    titlefont: {
		      family: 'Courier New, monospace',
		      size: 18,
		      color: '#7f7f7f'
		    },
		    tickfont:{		        
		    	size: 12
		      }
		  },
		  
	};
	if(result["type"] != "heatmap")
		layout["margin"] = {t:50, b:marb};
	
	if(itemx.length > 0){
		if(itemx[0].item_type == "TEXT")
			layout["xaxis"]["type"]="category";
	}
	
	
	Plotly.newPlot('visualArea', data, layout, plotly_options);
	
}

function drawVisualizationMulti(result, type){
	var numVal	= $('input[name="funProcess_number"]:checked').val();
	var txtVal	= $('input[name="funProcess_text"]:checked').val();
	var order	= $('input[name="odrProcess"]:checked').val();
	var data = [], layout = {}, name = "", xname = "", yname = "", yname2 = "";
	
	xname = itemx[0].text;
	yname = itemy[0].text;		
	
	$.each(result["total"], function(w,z){
		var x = z["xdata"], y = z["ydata"], gData = [];
		if(type == "BOX"){
			
		}
		else if(numVal == "SUM"){
			y = z["sdata"];
			yname = "합";
		}
		
		if(x.length == 0){
			gData = {		
				y : y,
				type : z["type"],
				name : z["name"],
				mode : z["mode"]
			};
		}
		else {
			if(type == "SCT"){
				gData = {		
					x : x,
					y : y,
					name : z["name"],
					mode: 'markers', 
					  marker: {
					    size: 9
					  },
					connectgaps: true
				};
			}else{
				gData = {		
					x : x,
					y : y,
					type : z["type"],
					name : z["name"],
					mode : z["mode"],
					connectgaps: true
				};
			}
			if(itemy.length == 2 && z["type"] == "scatter"){
				gData["yaxis"] = "y2";
				gData["name"] = itemy[1].text;
			}
			else if(itemy.length == 2 && z["type"] == "bar"){
				gData["name"] = itemy[0].text;
			}
				
		}
		data.push(gData);		
	});
	
	if(itemy.length == 2){
		yname2 = itemy[1].text;
		layout = {
			//title : 'visualization multi ' + result["type"],		
			xaxis: {
			    title: "<b>" + xname + "</b>",
			    titlefont: {
			      family: 'Courier New, monospace',
			      size: 18,
			      color: '#7f7f7f'
			    },
			    tickfont:{		        
			    	size: 12
			      }
			  },
			  yaxis: {
				rangemode: 'tozero',
			    title: "<b>" + yname + "</b>",
			    titlefont: {
			      family: 'Courier New, monospace',
			      size: 18,
			      color: '#7f7f7f'
			    },
			    tickfont:{		        
			    	size: 12
			      }
			      
			  },
			  yaxis2: {
				rangemode: 'tozero',
			    title: "<b>" + yname2 + "</b>", 
			    titlefont: {color: 'rgb(148, 103, 189)'}, 
			    tickfont: {color: 'rgb(148, 103, 189)', size:12}, 
			    side: 'right',
			    overlaying: 'y'
			  }			  
		};		
	}
	else{
		layout = {
			//title : 'visualization multi ' + result["type"],		
			xaxis: {
			    title: "<b>" + xname + "</b>",
			    titlefont: {
			      family: 'Courier New, monospace',
			      size: 18,
			      color: '#7f7f7f'
			    },
			    tickfont:{		        
			    	size: 12
			      }		
			  },
			  yaxis: {
			    title: "<b>" + yname + "</b>",
			    titlefont: {
			      family: 'Courier New, monospace',
			      size: 18,
			      color: '#7f7f7f'
			    },
			    tickfont:{		        
			    	size: 12
			      }
			  }
			};
		if(type == "STACKBAR")
			layout["barmode"] = 'stack';
		else if(type == "BOX")
			layout["boxmode"] = 'group';
	}
	layout["xaxis"]["type"]="category";
	
	var xlength = [];
	$.each(result["xdata"],function(w,z){xlength.push(z.length)});
	var maxLength = arrMax(xlength);
	marb = (maxLength-1)*10;
	if(marb < 120)
		marb = 120;
	layout["margin"] = {t:50, b:marb};
	
	Plotly.newPlot('visualArea', data, layout, plotly_options);
}

function allDisabled() {
    // Final S
    $("#v1").addClass("disabled");  //Boxplot       # 범주(텍스트)[x], 수치[y]
    $("#v2").addClass("disabled");  //Barchart      # 범주(텍스트)[x], 수치[y]
    $("#v3").addClass("disabled");  //Scatter       # 범주(텍스트)[x], 수치[y], Fill[z]
    //$("#v4").addClass("disabled");  //Bubble      # 수치(x1,x2), 수치(y)
    $("#v5").addClass("disabled");  //Heatmap       # 수치(x1,x2)
    $("#v6").addClass("disabled");  //Bar + Line    # 수치(y1,y2, x1)
    $("#v7").addClass("disabled");  //Line          # 날짜(x1), 수치(y1)
    $("#v9").addClass("disabled");  //Barchart      # 범주(x1,x2), 수치(y)   
    $("#v10").addClass("disabled");  //Piechart      # 범주(텍스트)[x], 수치[y]   
}

var initEvent = function() {
	$('#btnFilterApply').on('click',function(){
		var dataSet = {};
		var dataXArray = [];
		var dataYArray = [];
		$.each(itemx,function(index,value){
			var tmpSet = {};
			tmpSet.VALUE = '';
			if(value.item_type==='TEXT'){
				tmpSet.VALUE = $('input[name=text_'+value.id+']').val();
			}
			else if(value.item_type==='NUM'){
				console.log($('#filterNUM_LIST_x_'+value.id).val());
				tmpSet.NUMVALUE = $('#filterNUM_LIST_x_'+value.id).val();
				if($('#filterNUM_LIST_x_'+value.id).val()==='BETWEEN'){			
					if(!isNull($('input[name=txtNUM1_x_'+value.id+']').val()) && !isNull($('input[name=txtNUM2_x_'+value.id+']').val())){
						tmpSet.VALUE = $('input[name=txtNUM1_x_'+value.id+']').val();
						tmpSet.VALUE += "~";
						tmpSet.VALUE += $('input[name=txtNUM2_x_'+value.id+']').val();
					}
					else if(isNull($('input[name=txtNUM1_x_'+value.id+']').val()) && isNull($('input[name=txtNUM2_x_'+value.id+']').val())){
						tmpSet.VALUE = $('input[name=txtNUM1_x_'+value.id+']').val();
						tmpSet.VALUE += "~";
						tmpSet.VALUE += $('input[name=txtNUM2_x_'+value.id+']').val();
					}
					else{
						alert("빈칸에 값을 넣어 주십시오.")
						return true;
					}
				}
				else{
					tmpSet.VALUE = $('input[name=txtNUM1_x_'+value.id+']').val();
				}
			}
			else{
				console.log($('#filterDate_1_'+value.id).val());
				var tmpDate1 = $('input[name=filterDate_1_'+value.id+']').val();
				var tmpDate2 = $('input[name=filterDate_2_'+value.id+']').val();
				
				if(isNull(tmpDate1) && !isNull(tmpDate2)){
					tmpDate1 = 'n';
				}
				if(!isNull(tmpDate1) && isNull(tmpDate2)){
					tmpDate2 = 'n';
				}
				tmpSet.VALUE = tmpDate1;
				tmpSet.VALUE += "~";
				tmpSet.VALUE += tmpDate2;
			}
			
			tmpSet.ITEM_TEXT = value.text;
			tmpSet.ITEM_VALUE = value.id;
			tmpSet.ITEM_TYPE = value.item_type;
		
			dataXArray.push(tmpSet);
		
		});
		dataSet.FILTERX = dataXArray;
		$.each(itemy,function(index,value){
			var tmpSet = {};
			tmpSet.NUMVALUE = $('#filterNUM_LIST_y_'+value.id).val();
			if($('#filterNUM_LIST_y_'+value.id).val()==='BETWEEN'){			
				if(!isNull($('input[name=txtNUM1_y_'+value.id+']').val()) && !isNull($('input[name=txtNUM2_y_'+value.id+']').val())){
					tmpSet.VALUE = $('input[name=txtNUM1_y_'+value.id+']').val();
					tmpSet.VALUE += "~";
					tmpSet.VALUE += $('input[name=txtNUM2_y_'+value.id+']').val();
				}
				else if(isNull($('input[name=txtNUM1_y_'+value.id+']').val()) && isNull($('input[name=txtNUM2_y_'+value.id+']').val())){
					tmpSet.VALUE = $('input[name=txtNUM1_y_'+value.id+']').val();
					tmpSet.VALUE += "~";
					tmpSet.VALUE += $('input[name=txtNUM2_y_'+value.id+']').val();
				}
				else{
					alert("빈칸에 값을 넣어 주십시오.")
					return true;
				}
			}
			else{
				tmpSet.VALUE = $('input[name=txtNUM1_y_'+value.id+']').val();
			}
			tmpSet.ITEM_TEXT = value.text;
			tmpSet.ITEM_VALUE = value.id;
			tmpSet.ITEM_TYPE = value.item_type;
		
			dataYArray.push(tmpSet);
			
		});
		dataSet.FILTERY = dataYArray;
		
		filterDataSet = dataSet;
		console.log(dataSet);
		
		var graphNum;
    	
    	
    	if(currentGraph === 'BOX'){
    		graphNum = 1;
		}
		else if(currentGraph === 'BAR'){
			graphNum = 2;
		}
		else if(currentGraph === 'SCT'){
			graphNum = 3;
		}
		else if(currentGraph === 'HEAT'){
			graphNum = 5;
		}
		else if(currentGraph === 'BARSPOT'){
			graphNum = 6;
		}
		else if(currentGraph === 'LINE'){
			graphNum = 7;
		}
		else if(currentGraph === 'STACKBAR'){
			graphNum = 9;
		}
		else if(currentGraph === 'PIE'){
			graphNum = 10;
		}
		else{
			graphNum = '';
			alert("그래프를 선택해 주시길 바랍니다.");
			return ;
		}
    	
    	if($("#v"+graphNum).attr("class") == 'visualevent disabled'){
    		alert("활성화 되어있는 그래프를 클릭해 주시길 바랍니다.")
    		return ;
    	}
    	else{
    		visualization(graphNum,true);
    	}

		
	});
	
	/*$(document).on('click','#chkFilteringAll',function(){
		var value = $(this).prop("name");

    	var tmpChkValue = '';
		
		if ($(this).is(":checked") == true) {
	        $('[name='+value+'].magic-check-filtering').each(function() {
	        	$(this).prop('checked',true);
	        	
	        	if(tmpChkValue == ''){
	        		tmpChkValue = $(this).val();			
	    		}
	    		else{
	    			tmpChkValue += '|' + $(this).val(); 
	    		}
	        	$('input[name=text_'+value+']').val(tmpChkValue);
	        });
	    } else {
	        $('[name='+value+'].magic-check-filtering').each(function() {
	        	$(this).prop('checked',false);
	        	$('input[name=text_'+value+']').val('');
	        });
	    }
	});*/
	
	$(document).on('click','.magic-check-filtering',function(){
		var value = $(this).prop("name");
		
		var tmpChkValue = '';

		
		var totalCount = $('[name='+value+'].magic-check-filtering').length;
		var checkedCount = $('[name='+value+'].magic-check-filtering:checkbox:checked').length;
		if(totalCount == checkedCount){
			$('#chkFilteringAll'+value).prop('checked',true);
		}else{
			$('#chkFilteringAll'+value).prop('checked',false);
		}
		
		$.each($('[name='+value+'].magic-check-filtering:checkbox:checked'),function(){
			if(tmpChkValue==''){
				tmpChkValue += $(this).val();
			}
			else{
				tmpChkValue += '|'+$(this).val();
			}
		});
		$('input[name=text_'+value+']').val(tmpChkValue);			

		 
	});
	
	//filter 클릭 이벤트
	$("#btnGraphFilter").on("click",function(){
		if($('#filterArea').is(":visible")){
			$('#filterArea').hide();
			$('#graphArea').attr("class","col-lg-12");
			Plotly.Plots.resize('visualArea')

			
		}
		else{
			$('#graphArea').attr("class","col-lg-9");
			$('#filterArea').show();
			Plotly.Plots.resize('visualArea')

		}
	});
	
	
	//distribution , frequency 그래프 변경 이벤트
	$("#disnfreBar").on("click",function() {

		$("#area_all").css("display","none");
		$("#wordMakeStart").show();
		$("#pdfMakeStart").show();
		
		if(currentItem.ITEM_TYPE == 'NUM'){

			$("#area_distribution").css("display","block");
			getDistribution(currentItem, "area_distribution");
		}
		else{
			$("#area_frequency").css("display","block");
			getFrequency(currentItem, "area_frequency");
		}

		
	});
	
	$("#disnfrePie").on("click",function() {
		$("#area_frequency").css("display","block");
		$("#area_distribution").css("display","block");
		$("#area_all").css("display","none");
		
		if(currentItem.ITEM_TYPE =='NUM'){
			$("#area_distribution").css("display","block");
			drawPieGraph(currentItem, "area_distribution");
		}
		else{
			$("#area_frequency").css("display","block");
			drawPieGraph(currentItem, "area_frequency");
		}
		
//		drawPieGraph();
	});
	
	$("#disnfreRadar").on("click",function() {
		$("#area_frequency").css("display","block");
		$("#area_distribution").css("display","block");
		$("#area_all").css("display","none");
		
		if(currentItem.ITEM_TYPE == 'NUM'){

			$("#area_distribution").css("display","block");
			drawRadarGraph(currentItem, "area_distribution");
		}
		else{
			$("#area_frequency").css("display","block");
			drawRadarGraph(currentItem, "area_frequency");
		}
		
//		drawRadarGraph();
	});
	
	$("#disnfreLine").on("click",function() {
		$("#area_frequency").css("display","block");
		$("#area_distribution").css("display","block");
		$("#area_all").css("display","none");
		
		if(currentItem.ITEM_TYPE =='NUM'){
			drawLineGraph(currentItem, "area_distribution")
		}else{
			drawLineGraph(currentItem, "area_frequency")
		}
//		drawLineGraph();
//		$("#wordMakeStart").hide();
//		$("#pdfMakeStart").hide();
	});
	
	$("#disnfreAll").on("click",function() {
		$("#area_frequency").css("display","none");
		$("#area_distribution").css("display","none");
		$("#area_all").css("display","block");
		$("#area_all").html('');
		
		var tmp_html = ''
		

		var trace1 =  [{
			x : frequencyX,
			y : frequencyY,
			type : 'bar'
		}];
		
		var trace2 = [{
			  values: frequencyY,
			  labels: frequencyX,
			  type: 'pie',
			}];
		
		var trace3 = {
				  x: frequencyX,
				  y: frequencyY,
				  mode: 'lines',

				};
		
		var trace4 = [{
			  type: 'scatterpolar',
			  r: frequencyY,
			  theta: frequencyX,
			  fill: 'toself',

			}];

		var data = [trace3];
		var layout = {
				title : "<b>" + currentItem.ITEM_TEXT + "</b>",			

		}
		
		if(currentItem.ITEM_TYPE == 'TEXT'){
			
			tmp_html += '<div class="row">';
			tmp_html += '<div class="col-lg-12"><div class="graph_area"  id="area_bar" ></div></div>';
			
			tmp_html += '</div>';
			tmp_html += '<div class="row">';
			//tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_line" ></div></div>';
			tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_pie" ></div></div>';
			tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_radar" ></div></div>';
			tmp_html += '</div>';
			
			$("#area_all").html(tmp_html);
			getFrequency(currentItem, "area_bar");
			drawPieGraph(currentItem, "area_pie");
			drawRadarGraph(currentItem, "area_radar");
			
//			Plotly.newPlot('area_pie', trace2, layout, plotly_options);
			//Plotly.newPlot('area_line', data, layout, plotly_options);
//			Plotly.newPlot('area_radar', trace4, layout, plotly_options);
		}
		else if(currentItem.ITEM_TYPE == 'DATE'){
			
			tmp_html += '<div class="row">';
			tmp_html += '<div class="col-lg-12"><div class="graph_area"  id="area_bar" ></div></div>';
			
			tmp_html += '</div>';
			tmp_html += '<div class="row">';
			tmp_html += '<div class="col-lg-12"><div class="graph_area"  id="area_line" ></div></div>';
			//tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_pie" ></div></div>';
			//tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_radar" ></div></div>';
			tmp_html += '</div>';
			
			$("#area_all").html(tmp_html);
			
			getFrequency(currentItem, "area_bar");
			//Plotly.newPlot('area_pie', trace2, layout, plotly_options);

			Plotly.newPlot('area_line', data, layout, plotly_options);
			//Plotly.newPlot('area_radar', trace4, layout, plotly_options);
		}
		else{
			
			tmp_html += '<div class="row">';
			tmp_html += '<div class="col-lg-12"><div class="graph_area"  id="area_bar" ></div></div>';
			
			tmp_html += '</div>';
			tmp_html += '<div class="row">';
			tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_line" ></div></div>';
			tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_pie" ></div></div>';
			//tmp_html += '<div class="col-lg-6"><div class="graph_area"  id="area_radar" ></div></div>';
			tmp_html += '</div>';
			
			$("#area_all").html(tmp_html);
			getDistribution(currentItem, "area_bar");
			Plotly.newPlot('area_pie', trace2, layout, plotly_options);

			Plotly.newPlot('area_line', data, layout, plotly_options);
			//Plotly.newPlot('area_radar', trace4, layout, plotly_options);
		}
		
		
		/*Plotly.newPlot('area_bar', trace1, layout, plotly_options);
		Plotly.newPlot('area_pie', trace2, layout, plotly_options);

		Plotly.newPlot('area_line', data, layout, plotly_options);
		Plotly.newPlot('area_radar', trace4, layout, plotly_options);*/
	});
	
	
	// 요약통계 항목리스트 클릭 이벤트
	$("#content-md ul li").click(function() {
		$(".highlight_blue").removeClass("highlight_blue");
		//word / pdf 버튼 나타내기
		$("#wordMakeStart").show();
		$("#pdfMakeStart").show();
		
		var selectedItem = $(this).data("item");
		if (selectedItem.DATA_PER == "0%") {
			console.log("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
			alert("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
			return;
		}
		
		//선택된 아이템 전역변수에 넣기
		currentItem = selectedItem;
		
		if(currentItem.ITEM_TYPE == 'TEXT'){
			$("#disnfreBar").css("display","");
			$("#disnfreRadar").css("display","");
			$("#disnfreLine").css("display","none");
			$("#disnfrePie").css("display","");
		}
		else if(currentItem.ITEM_TYPE == 'DATE'){
			$("#disnfreBar").css("display","");
			$("#disnfreRadar").css("display","none");
			$("#disnfreLine").css("display","");
			$("#disnfrePie").css("display","none");
		}
		else{
			$("#disnfreBar").css("display","");
			$("#disnfreRadar").css("display","none");
			$("#disnfreLine").css("display","");
			$("#disnfrePie").css("display","");
		}
		
		
		$(this).addClass("highlight_blue");
		
		if(currentTab == "#mvp"){		
		
			var dataSet2 = {};
			dataSet2.CONTSEQ = contSeq;
			dataSet2.DATASEQ = dataSeq;
			dataSet2.TABLEID = tableId;
			dataSet2.COLID = selectedItem.ITEM_VALUE;
			dataSet2.COLTYPE = selectedItem.ITEM_TYPE;
			var promise = http('visualizepopup/visualizeMissingValue', 'post',
					true, dataSet2);
			promise.then(function(result) {
				console.log(result);
				currentList = result;
				$("#area_missing").html("");
				drawMissingValue(result, "area_missing");	
			});
		}
		else if(currentTab == "#disnfre"){
			$("#area_frequency").html("");
			$("#area_distribution").html("");
	
			$("#imgItemClick").css('display', 'none');
			$("#area_all").css("display","none");
			// 클릭한 항목 정보 selectedItem
			console.log(selectedItem);
			// 클릭한 Item이 숫자일 경우 (Distribution)
			if (selectedItem.ITEM_TYPE == "NUM") {
				$("#tl_distribution").removeClass("titleTabOff");
				$("#tl_distribution").addClass("titleTabOn");
	
				$("#tl_frequency").removeClass("titleTabOn");
				$("#tl_frequency").addClass("titleTabOff");
	
				$("#area_distribution").css("display", "");
				$("#area_frequency").css("display", "none");
				$("#area_frequency").html("");
	
				getDistribution(selectedItem, "area_distribution");			
			}
			// 클릭한 Item이 숫자가 아닐 경우 (Frequency)
			else {
				$("#tl_frequency").removeClass("titleTabOff");
				$("#tl_frequency").addClass("titleTabOn");
	
				$("#tl_distribution").removeClass("titleTabOn");
				$("#tl_distribution").addClass("titleTabOff");
	
				$("#area_frequency").css("display", "");
				$("#area_distribution").css("display", "none");
				$("#area_distribution").html("");
	
				getFrequency(selectedItem, "area_frequency");
			}
		}
	});
	
	// 시각화 분석 Drag & Drop
	$("#draggableItem > li").draggable({
	    helper: "clone",
	    revert: false,
	    cursor: "move"
	});
	// 시각화 분석 Drag & Drop
    $(".sortable_area").sortable({
        revert: true,
        stop : function (event, ui){
        	activeVisualization();
        }
    });
     
	// 시각화 분석 Drag & Drop
	$(".itemCol").droppable({
        accept: "#draggableItem > li",
        drop: function (event, ui) {  
            var itemVal = $("#" + ui.draggable.attr("id")).data("item");
            if (itemVal.DATA_PER == "0%") {
                alert("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
                return;
            }
            if(itemVal.ITEM_TYPE != "NUM"){
            	alert("수치형 데이터가 아닙니다. 수치형 항목을 선택하세요.");
                return;
            }
            if ($("#col_" + itemVal.ITEM_VALUE).length > 0) return;
            ui.draggable.addClass("highlight_blue");
            $(".itemCol .sortable_area").append("<div class='summarySelected' id='col_" + itemVal.ITEM_VALUE + "'>" + itemVal.ITEM_TEXT + "<div class='fr' style='margin-left:5px;'><a href='#' class='fr' style='margin-top: 2px;' ><img src='../images/visual/close.png' class='fr delete' style='width:10px; margin-top: 3px;' /></a></div>");
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

            filteringMaker('y', itemVal.ITEM_VALUE, itemVal.ITEM_TYPE,rowIdx,"","");
        }
    });
	
	// 시각화 분석 Drag & Drop
    $(".itemRow").droppable({
        accept: "#draggableItem > li",
        drop: function (event, ui) {                   
            var itemVal = $("#" + ui.draggable.attr("id")).data("item");
            if (itemVal.DATA_PER == "0%") {
            	alert("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
                return;
            }
            if ($("#row_" + itemVal.ITEM_VALUE).length > 0) return;
            ui.draggable.addClass("highlight_blue");
            $(".itemRow .sortable_area").append("<div class='summarySelected' id='row_" + itemVal.ITEM_VALUE + "'>" + itemVal.ITEM_TEXT + "<div class='fr' style='margin-left:5px;'><a href='#' class='fr' style='margin-top: 1px;'><img src='../images/visual/close.png' class='fr delete' style='width:10px; margin-left:5px; margin-top: 3px;' /></a><div id='sel_row_" + itemVal.ITEM_VALUE + "' class='fr' style='font-size: 9pt;'></div></div></div>");
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
                //if (itemVal.ITEM_VALUE.match(/AGE/gi) != null) {
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
                //}
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
            	tmphtml += '<div class="input-group input-group-sm" style="width: 90%; margin: 10px;"><input type="text" class="form-control font-size-14" name="text_'+itemVal.ITEM_VALUE+'" id="filterSearchVal'+rowIdx+'"  placeholder="대소문자를 구분해 주십시오."></div>';	
            }
            tmphtml += '</div></div>';
            
          
            $('#filterList').append(tmphtml);
            
            filteringMaker('x', itemVal.ITEM_VALUE, itemVal.ITEM_TYPE,rowIdx,"","");
            
        }
    });

    $(".radiopreprocess").on('change',function(){
    	var graphNum;
    	
    	
    	if(currentGraph === 'BOX'){
    		graphNum = 1;
		}
		else if(currentGraph === 'BAR'){
			graphNum = 2;
		}
		else if(currentGraph === 'SCT'){
			graphNum = 3;
		}
		else if(currentGraph === 'HEAT'){
			graphNum = 5;
		}
		else if(currentGraph === 'BARSPOT'){
			graphNum = 6;
		}
		else if(currentGraph === 'LINE'){
			graphNum = 7;
		}
		else if(currentGraph === 'STACKBAR'){
			graphNum = 9;
		}
		else if(currentGraph === 'PIE'){
			graphNum = 10;
		}
		else{
			graphNum = '';
			return ;
		}
    	
    	if($("#v"+graphNum).attr("class") == 'visualevent disabled'){
    		alert("활성화 되어있는 그래프를 클릭해 주시길 바랍니다.")
    		return ;
    	}
    	else{
    		visualization(graphNum,true);
    	}
   
    	
    	
    });
    
    
    $("#tableauTab").on('click',function(){
    		var dataSet = {};
    		dataSet.CONT_SEQ = contSeq;
    		dataSet.DATA_SEQ = dataSeq;
    		
    		var promise = http('visualize/main2', 'post', false, dataSet);
			promise.then(function(result) {
				if(isNullOrEmpty(result.tableauUrl)){
					alert(result.message);
					//$('#'+prevTab).trigger('click');
				}
				else{
					$('#iframeId').attr('src',result.tableauUrl);
				}

			});
			promise.fail(function(error) {
				console.log(error);
			});
			$('#myRightBtn').css('display','none');	
    });
    
    
    $('#summaryTab').on('click',function(){
    	$('#myRightBtn').css('display','none');
    });
    $('#visualTab').on('click',function(){
    	$('#myRightBtn').css('display','block');
    });
    $('#basicAnalysisTab').on('click',function(){
    	$('#myRightBtn').css('display','none');
    });
    
    

}


//word / pdf 시작!!!!!!!!!!!
//word 모달 오픈
function wordMoadlOpen(){
	// word export modal open
	$('#modalWordAddPop').on('shown.bs.modal', function () {
		
		if($("#area_all").css("display") == 'none'){
			setWordDFChartBase();
		}
		
		$(".chartMVWordImg").show();
		
		$('#btnWordExport').unbind();
		$('#btnWordExport').click(function(){
			var wordRadioVal = $('input[name="wordOptionsRadios"]:checked').val();
			
			if(wordRadioVal == "wordVal1"){
				$(".chartMVWordImg").hide();
				gvSpinnerOpen();
				setWordExport();
				
			  	$("#chartDFWordImg").ready(function() { 
		    		$("#wordPageSetting").wordExport();
			        $('#modalWordAddPop').modal('hide');
		    		gvSpinnerClose();
			  	});
		        
		        $('#optionsRadios1').prop("disabled", true);
		        $('#optionsRadios2').prop("disabled", true);
		        $('#btnWordDownCancel').prop("disabled", true);
		        $('#btnWordExport').prop("disabled", true);
			}else if(wordRadioVal == "wordVal2"){
				getWordMVChartLoad();
				
				$('#optionsRadios1').prop("disabled", true);
		        $('#optionsRadios2').prop("disabled", true);
				$('#btnWordDownCancel').prop("disabled", true);
				$('#btnWordExport').prop("disabled", true);
			}
		});
		
	});
}

//pdf 모달 오픈
function pdfMoadlOpen(){
	// PDF export modal open
	$('#modalPdfAddPop').on('shown.bs.modal', function () {
		
		if($("#area_all").css("display") == 'none'){
			setPdfDFChartBase();
		}

		$(".chartMVWordImg").show();
		
		$('#btnPdfExport').unbind();
		$('#btnPdfExport').click(function(){
			var pdfRadioVal = $('input[name="pdfOptionsRadios"]:checked').val();
			
			if(pdfRadioVal == "pdfVal1"){
				$(".chartMVWordImg").hide();
				gvSpinnerOpen();
				
				$("#chartDFWordImg").ready(function() { 
					setPdfExport();
					setTimeout(function(){
						$('#modalPdfAddPop').modal('hide');
				        gvSpinnerClose();
					},3000);
				});
		        
		        $('#pdfOptionsRadios1').prop("disabled", true);
		        $('#pdfOptionsRadios2').prop("disabled", true);
		        $('#btnPdfDownCancel').prop("disabled", true);
		        $('#btnPdfExport').prop("disabled", true);
			}else if(pdfRadioVal == "pdfVal2"){
				gvSpinnerOpen();
				getPdfMVChartLoad();
				
				$('#pdfOptionsRadios1').prop("disabled", true);
		        $('#pdfOptionsRadios2').prop("disabled", true);
				$('#btnPdfDownCancel').prop("disabled", true);
				$('#btnPdfExport').prop("disabled", true);
			}
		});
		
	});
}

//모달 초기화
//word 모달 초기화
function wordMoadlReset(){
	$('#modalWordAddPop').on('hidden.bs.modal', function (e) { 
	    $(this).find('form')[0].reset(); 
	    $(this).removeData();
	    $('.visualDisplay').hide();
	    
	    $("#visualPopTitle").html("");
	    $("#visualPopSubTitle").html("");
	    $("#summaryTable").html("");
	    
	    $("#chartDFWordTitle").html("");
	    $('#chartDFWordImg').attr("src", "");
	    $('#chartDFWordImgAll_Bar').attr("src", "");
	    $('#chartDFWordImgAll_Pie').attr("src", "");
	    $('#chartDFWordImgAll_Radar').attr("src", "");
	    $('#chartDFWordImgAll_Line').attr("src", "");
	    
	    $("#chartMVWordTitle").empty();
	    $('#chartMVWordImg').attr("src", "");
	    
	    $("#statsDFChartload").html("");
	    $("#statsMVChartload").html("");
	    
	    $('#optionsRadios1').prop("disabled", false);
	    $('#optionsRadios2').prop("disabled", false);
	    $('#btnWordDownCancel').prop("disabled", false);
	    $('#btnWordExport').prop("disabled", false);
	    
	    $("#exprotPadding").css('display', 'none');
		$("#exprotPadding").css('padding-top', '0px');
	});
}

//pdf 모달 초기화
function pdfMoadlReset(){
	$('#modalPdfAddPop').on('hidden.bs.modal', function (e) { 
	    $(this).find('form')[0].reset(); 
	    $(this).removeData();
	    $('.visualDisplay').hide();
	    
	    $("#visualPopTitle").html("");
	    $("#visualPopSubTitle").html("");
	    $("#summaryTable").html("");
	    
	    $("#chartDFWordTitle").html("");
	    $('#chartDFWordImg').attr("src", "");
	    $('#chartDFWordImgAll_Bar').attr("src", "");
	    $('#chartDFWordImgAll_Pie').attr("src", "");
	    $('#chartDFWordImgAll_Radar').attr("src", "");
	    $('#chartDFWordImgAll_Line').attr("src", "");
	    
	    $("#chartMVWordTitle").empty();
	    $('#chartMVWordImg').attr("src", "");
	    
	    $("#statsDFChartload").html("");
	    $("#statsMVChartload").html("");
	    
	    $('#pdfOptionsRadios1').prop("disabled", false);
	    $('#pdfOptionsRadios2').prop("disabled", false);
	    $('#btnPdfDownCancel').prop("disabled", false);
	    $('#btnPdfExport').prop("disabled", false);
	    
	    $("#exprotPadding").css('display', 'none');
		$("#exprotPadding").css('padding-top', '0px');
	});
}

//요약통계 > summary table 로드
function setStatsSummary(){
	var css = (
		'<style>' +
		'@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
		'div.WordSection1 div.WordSection2 div.WordSection3 div.WordSection4 {page: WordSection1;}' +
		'.imgSummary {display: none; }' +
		'table {border-collapse:collapse; } th, td{border: 1px gray solid !important}' + 
		'</style>'
	);
      
	var summaryHtml = window.summaryHtml.innerHTML ;
	$('#visualPopTitle').append(css +  "<div style='padding-top: 100px;'><b>" +gvVisualPopTitle + "</b><div>");
	$('#visualPopSubTitle').append("<span style='display:inline-block; margin-left: 20px;'> <br>[요약통계] </br>   * 데이터 전체 건 수: " 
			+ numberWithCommas(gvVisualPopSumData) +"</br> ●  Summary (숫자-num- 항목에 대한 '기초통계') <br> </span>");
	$('#summaryTable').append(summaryHtml);
}

//word DF 차트 로드
function getWordDFChartLoad(){
	$("#chartDFWordTitle").empty();
	
	$(".chartDFWordImg").show();
	$(".chartDFWordImgAll").show();
	
	if($("#area_all").css("display") == 'none'){
		console.log(dataChartType)
		$(".chartDFWordImgAll").hide();
		
		if(currentItem.ITEM_TYPE =='NUM'){
			
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
										+ currentItem.ITEM_TEXT + "</br></br> </span>");
			if(dataChartType[0].mode == 'lines'){
				drawLineGraph(currentItem, 'statsDFChartload');
			}else if(dataChartType[0].type == 'pie'){
				drawPieGraph(currentItem, 'statsDFChartload');
			}else{
				getDistribution(currentItem, 'statsDFChartload');
			}
			
		}else{
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Frequency <br />  <br />- 항목명: " 
										+ currentItem.ITEM_TEXT + "</br></br> </span>");
			if(dataChartType[0].type == 'bar'){
				getFrequency(currentItem, 'statsDFChartload');
			}else if(dataChartType[0].type == 'scatterpolar'){
				drawRadarGraph(currentItem, 'statsDFChartload');
			}else if(dataChartType[0].type == 'pie'){
				drawPieGraph(currentItem, 'statsDFChartload');
			}else if(dataChartType[0].mode == 'lines'){
				drawLineGraph(currentItem, 'statsDFChartload');
			}
		}
		
	}else{
		//전체 그래프(All) 출력
		$(".chartDFWordImg").hide();
		$("#chartDFWordImgAllTextDate").show();
		$("#chartDFWordImgAllNum").show();
		$("#chartDFWordImgAllTextPie").show();
		
		setWordDFBarChartBase();
		
		if(currentItem.ITEM_TYPE =='NUM'){
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
					+ currentItem.ITEM_TEXT + "</br></br> </span>");
			
			$("#chartDFWordImgAllTextDate").hide();
			setWordDFPieChartBase();
			setWordDFLineChartBase();
		}else{
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
					+ currentItem.ITEM_TEXT + "</br></br> </span>");
			
			if(currentItem.ITEM_TYPE =='DATE'){
				$("#chartDFWordImgAllTextPie").hide();
				$("#chartDFWordImgAllTextDate").hide();
				$("#chartDFWordImgAllNum").css("text-align", "center");
				setWordDFLineChartBase();
			}else{
				$("#chartDFWordImgAllNum").hide();
				setWordDFRadarChartBase();
				setWordDFPieChartBase();
			}
		}
	}
}


//word DF 차트 base64로 변환
function setWordDFChartBase(){
	var svg = document.querySelector( "#statsDFChartload svg" );
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	var svgSize = svg.getBoundingClientRect();
	canvas.width = svgSize.width;
	canvas.height = svgSize.height;

  
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
	  	ctx.drawImage( img, 0, 0 );
	    
	  	// Now is done
	  	console.log( canvas.toDataURL( "image/png" ) );
	  	$('#chartDFWordImg').prop('src', canvas.toDataURL( "image/png", 1.0 ));
	  	
	};
}

//word Bar 차트 base64로 변환
function setWordDFBarChartBase(){
	var svg = document.querySelector( "#area_bar svg" );
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	var svgSize = svg.getBoundingClientRect();
	canvas.width = svgSize.width;
	canvas.height = svgSize.height;

  
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
	  	ctx.drawImage( img, 0, 0 );
	    
	  	// Now is done
	  	console.log( canvas.toDataURL( "image/png" ) );
	  	$('#chartDFWordImgAll_Bar').prop('src', canvas.toDataURL( "image/png", 1.0 ));
	  	
	};
}

//word pie 차트 base64로 변환
function setWordDFPieChartBase(){
	var svg = document.querySelector( "#area_pie svg" );
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	var svgSize = svg.getBoundingClientRect();
	canvas.width = svgSize.width;
	canvas.height = svgSize.height;

  
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
	  	ctx.drawImage( img, 0, 0 );
	    
	  	// Now is done
	  	console.log( canvas.toDataURL( "image/png" ) );
	  	$('#chartDFWordImgAll_Pie').prop('src', canvas.toDataURL( "image/png", 1.0 ));
	  	
	};
}

//word radar 차트 base64로 변환
function setWordDFRadarChartBase(){
	var svg = document.querySelector( "#area_radar svg" );
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	var svgSize = svg.getBoundingClientRect();
	canvas.width = svgSize.width;
	canvas.height = svgSize.height;

  
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
	  	ctx.drawImage( img, 0, 0 );
	    
	  	// Now is done
	  	console.log( canvas.toDataURL( "image/png" ) );
	  	$('#chartDFWordImgAll_Radar').prop('src', canvas.toDataURL( "image/png", 1.0 ));
	  	
	};
}

//word Line 차트 base64로 변환
function setWordDFLineChartBase(){
	var svg = document.querySelector( "#area_line svg" );
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	var svgSize = svg.getBoundingClientRect();
	canvas.width = svgSize.width;
	canvas.height = svgSize.height;

  
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
	  	ctx.drawImage( img, 0, 0 );
	    
	  	// Now is done
	  	console.log( canvas.toDataURL( "image/png" ) );
	  	$('#chartDFWordImgAll_Line').prop('src', canvas.toDataURL( "image/png", 1.0 ));
	  	
	};
}

//pdf DF 차트 로드
function getPdfDFChartLoad(){
	$("#chartDFWordTitle").empty();
	console.log(dataChartType)
	
	$(".chartDFWordImg").show();
	$(".chartDFWordImgAll").show();
	
	if($("#area_all").css("display") == 'none'){
		$(".chartDFWordImgAll").hide();
		
		if(currentItem.ITEM_TYPE =='NUM'){
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
					+ currentItem.ITEM_TEXT + "</br></br> </span>");
			
			if(dataChartType[0].mode == 'lines'){
				drawLineGraph(currentItem, 'statsDFChartloadPdf');
			}else if(dataChartType[0].type == 'pie'){
				drawPieGraph(currentItem, 'statsDFChartloadPdf');
			}else{
				getDistribution(currentItem, 'statsDFChartloadPdf');
			}
			
		}else{
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
					+ currentItem.ITEM_TEXT + "</br></br> </span>");
			
			if(dataChartType[0].type == 'bar'){
				getFrequency(currentItem, 'statsDFChartloadPdf');
			}if(dataChartType[0].type == 'scatterpolar'){
				drawRadarGraph(currentItem, 'statsDFChartloadPdf');
			}else if(dataChartType[0].type == 'pie'){
				drawPieGraph(currentItem, 'statsDFChartloadPdf');
			}else if(dataChartType[0].mode == 'lines'){
				drawLineGraph(currentItem, 'statsDFChartloadPdf');
			}
		}
	}else{
		//전체 그래프(All) 출력
		$(".chartDFWordImg").hide();
		$("#chartDFWordImgAllTextDate").show();
		$("#chartDFWordImgAllNum").show();
		$("#chartDFWordImgAllTextPie").show();
		
		setWordDFBarChartBase();
		
		if(currentItem.ITEM_TYPE =='NUM'){
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
					+ currentItem.ITEM_TEXT + "</br></br> </span>");
			
			$("#chartDFWordImgAllTextDate").hide();
			$("#chartDFWordImgAllNum").css("text-align", "right");
			$("#chartDFWordImgAllTextPie").css("text-align", "left");
			setWordDFPieChartBase();
			setWordDFLineChartBase();
		}else{
			$("#chartDFWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Distribution | Frequency > Distribution <br /> <br />- 항목명: " 
					+ currentItem.ITEM_TEXT + "</br></br> </span>");
			
			if(currentItem.ITEM_TYPE =='DATE'){
				$("#chartDFWordImgAllTextPie").hide();
				$("#chartDFWordImgAllTextDate").hide();
				$("#chartDFWordImgAllNum").css("margin-left", "178px");
				setWordDFLineChartBase();
			}else{
				$("#chartDFWordImgAllNum").hide();
				$("#chartDFWordImgAllTextPie").css("text-align", "right");
				setWordDFRadarChartBase();
				setWordDFPieChartBase();
			}
		}
	}
}


//pdf DF 차트 base64로 변환
function setPdfDFChartBase(){
	var svg = document.querySelector( "#statsDFChartloadPdf svg" );
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	var svgSize = svg.getBoundingClientRect();
	canvas.width = svgSize.width;
	canvas.height = svgSize.height;

  
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
	  	ctx.drawImage( img, 0, 0 );
	    
	  	// Now is done
	  	console.log( canvas.toDataURL( "image/png" ) );
	  	$('#chartDFWordImg').prop('src', canvas.toDataURL( "image/png", 1.0 ));
	  	
	};
}

//word mv 차트 로드
function getWordMVChartLoad(){
	var dataSet2 = {};
	dataSet2.CONTSEQ = contSeq;
	dataSet2.DATASEQ = dataSeq;
	dataSet2.TABLEID = tableId;
	dataSet2.COLID = currentItem.ITEM_VALUE;
	dataSet2.COLTYPE = currentItem.ITEM_TYPE;
	var promise = http('visualizepopup/visualizeMissingValue', 'post',
			true, dataSet2);
	promise.then(function(result) {
//		console.log(result);
		currentList = result;
		$("#chartMVWordTitle").empty();
		$("#chartMVWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Missing Value Patterns > Missing Value Patterns </br> </span>");
		
		drawMissingValue(currentList, 'statsMVChartload');
		setWordMVChartBase();
	});
}

//mv 차트 base64로 변환
function setWordMVChartBase(){
	var svg = document.querySelector( "#statsMVChartload svg" );
	var svgData = new XMLSerializer().serializeToString( svg );
 
	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );
 
	var svgSize = svg.getBoundingClientRect();
		canvas.width = svgSize.width;
		canvas.height = svgSize.height;

	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
		ctx.drawImage( img, 0, 0 );
     
		// Now is done
		console.log( canvas.toDataURL( "image/png" ) );
		$('#chartMVWordImg').prop('src', canvas.toDataURL( "image/png", 1.0  ));
		gvSpinnerOpen();
		
		$("#chartMVWordImg").ready(function() {
			setWordExport();
			setTimeout(function(){
  				$("#wordPageSetting").wordExport();
  				$('#modalWordAddPop').modal('hide');
  				gvSpinnerClose();
			},2000);
		});
	};
}

//pdf mv 차트 로드
function getPdfMVChartLoad(){
	var dataSet2 = {};
	dataSet2.CONTSEQ = contSeq;
	dataSet2.DATASEQ = dataSeq;
	dataSet2.TABLEID = tableId;
	dataSet2.COLID = currentItem.ITEM_VALUE;
	dataSet2.COLTYPE = currentItem.ITEM_TYPE;
	var promise = http('visualizepopup/visualizeMissingValue', 'post',
			true, dataSet2);
	promise.then(function(result) {
//		console.log(result);
		currentList = result;
		$("#chartMVWordTitle").empty();
		$("#chartMVWordTitle").append("<span style='display:inline-block; margin-left: 20px;'>●  Missing Value Patterns > Missing Value Patterns </br> </span>");
		
		drawMissingValue(currentList, 'statsMVChartloadPdf');
		setPdfMVChartBase();
	});
}

//mv pdf용 차트 base64로 변환
function setPdfMVChartBase(){
	var svg = document.querySelector( "#statsMVChartloadPdf svg" );
	var svgData = new XMLSerializer().serializeToString( svg );
 
	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );
 
	var svgSize = svg.getBoundingClientRect();
		canvas.width = svgSize.width;
		canvas.height = svgSize.height;

	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData))  ) );

	img.onload = function() {
		ctx.drawImage( img, 0, 0 );
     
		// Now is done
		console.log( canvas.toDataURL( "image/png" ) );
		$('#chartMVWordImg').prop('src', canvas.toDataURL( "image/png", 1.0 ));
		$("#chartMVWordImg").ready(function() {
			setTimeout(function(){
				setPdfExport();
  				$('#modalPdfAddPop').modal('hide');
  				gvSpinnerClose();
			},2000);
		});
	};
}

//요약통계 PDF 다운로드
function setPdfExport(){
    var doc = new jsPDF('p', 'mm', "a4");
  
    html2canvas($("#wordPageSetting"), {
    	onrendered: function (canvas) {    
			var imgData = canvas.toDataURL( "image/png" );
			var imgWidth = 210;
			var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
			var imgHeight = canvas.height * imgWidth / canvas.width;
			var heightLeft = imgHeight;
			var position = 0;

			// 첫 페이지 출력
			doc.addImage(imgData, 'PNG', 3, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;
			 
			// 한 페이지 이상일 경우 루프 돌면서 출력
			while (heightLeft >= 20) {
			  position = heightLeft - imgHeight;
			  doc.addPage();
			  doc.addImage(imgData, 'PNG', 3, position, imgWidth, imgHeight);
			  heightLeft -= pageHeight;
			}

			//파일이름
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var hour = today.getHours(); 
			var minute = today.getMinutes(); 
			var second = today.getSeconds(); 
			  
			if(dd<10) { dd='0'+dd; } 
			if(mm<10) { mm='0'+mm;} 
			if (hour<10) { hour = "0" + hour; }
			if (minute<10) { minute = "0" + minute; }
			if (second<10) { second = "0" + second; }
			
			today = yyyy+'-'+mm+'-'+dd+'_'+hour+minute+second;
	 		  
			var pdfFileName = '[CDW]visualize_' + today;
  		  	doc.save(pdfFileName + '.pdf');
    	}
	});
}


//시각화 분석 Word / Pdf Export
function setVisualWordPdfTitle(){
	for(var i=0; i<itemy.length; i++){
  	  itemSelectYVal += itemy[i].text + " </br>";
  	
  	  if(itemy[i].item_type == "NUM"){
		  if(filterDataSet.FILTERY[i].VALUE == "~" || filterDataSet.FILTERY[i].VALUE == "" ){
			  filterItemValY += "- " +itemy[i].text + ": All </br>";
		  }else{
			  filterItemValY += "- " +itemy[i].text + ": " + filterDataSet.FILTERY[i].VALUE + " </br>";
		  }
	  }
	}
	for(var i=0; i<itemx.length; i++){
  	  itemSelectXVal += itemx[i].text + " </br>";
  	  
  	  if(itemx[i].item_type == "TEXT"){
  		  if($('#chkFilteringAll'+filterDataSet.FILTERX[i].ITEM_VALUE).prop('checked') == true){
  			filterItemValX += "- " +itemx[i].text + ": All </br>";
  		  }else{
  			filterItemValX += "- " +itemx[i].text + ": " + filterDataSet.FILTERX[i].VALUE + " </br>";
  		  }
  		
  	  }else if(itemx[i].item_type == "NUM"){
  		  if(filterDataSet.FILTERX[i].VALUE == "~" || filterDataSet.FILTERX[i].VALUE == "" ){
  			filterItemValX += "- " +itemx[i].text + ": All </br>";
  		  }else{
  			filterItemValX += "- " +itemx[i].text + ": " + filterDataSet.FILTERX[i].VALUE + " </br>";
  		  }
  	  }else if(itemx[i].item_type == "DATE"){
  		  if(filterDataSet.FILTERX[i].VALUE == "~"){
  			filterItemValX += "- " +itemx[i].text + ": All </br>";
  		  }else{
  			filterItemValX += "- " +itemx[i].text + ": " + filterDataSet.FILTERX[i].VALUE + " </br>";
  		  }
  	  }
  	  
	}

	$("#chartVisualWordPdfTitle").empty();
	$("#chartVisualWordPdfTitleSub").empty();
	$("#chartVisualWordPdfTitle").append(gvVisualPopTitle +" </br>")
	$("#chartVisualWordPdfTitleSub").append("<span style='display:inline-block; margin-left: 20px;'></br> <b>[시각화 분석]</b> </br> * 데이터 전체 건 수: " + numberWithCommas(gvVisualPopSumData) 
			+ "</br></br> - Y축 : " + itemSelectYVal +" - X축 : " + itemSelectXVal + "</br> * Y : Measure 항목만 가능, X : 모든 항목 가능."
			+ "</br></br> <b> [Filter Y] </b> </br> "+ filterItemValY + "</br> <b> [Filter X] </b> </br>" + filterItemValX +"</span>");
}

function setVisualWordPdfExport(btnVal){
	var svg = document.querySelector( "#visualArea svg" );
	var svgData = new XMLSerializer().serializeToString( svg );
	
	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );
	
	var svgSize = svg.getBoundingClientRect();
	  canvas.width = svgSize.width;
	  canvas.height = svgSize.height;
	
	var img = document.createElement( "img" );
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))) );
	
	img.onload = function() {
	    ctx.drawImage( img, 0, 0 );
	    
	    // Now is done
	    console.log( canvas.toDataURL( "image/png" ) );
	    $('#chartVisualWordPdfImg').prop('src', canvas.toDataURL( "image/png" ));
	    
	    if(btnVal == "makeWord"){
	  	  setWordExport();
	  	
	  	  
	  	  $("#chartVisualWordPdfImg").ready(function() { 
	  		  
		      	setTimeout(function(){
		         	 $("#wordPdfPageSettingVisual").wordExport();
		         	 
		         	 //초기화
		         	 setVisualWordPdfExportReset();
		         },2000);
		      	
		      });
	  	  
	    }else if(btnVal == "makePdf"){
	    	
	    	var doc = new jsPDF('p', 'mm', "a4");
	    	$("#chartVisualWordPdfImg").ready(function() { 
	  		  	setTimeout(function(){
	  	    	  html2canvas($("#wordPdfPageSettingVisual"), {
	  		    	  onrendered: function (canvas) {    
							var imgData = canvas.toDataURL( "image/png" );
							var imgWidth = 210;
							var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
							var imgHeight = canvas.height * imgWidth / canvas.width;
							var heightLeft = imgHeight;
							var position = 0;
	  		    		  
							// 첫 페이지 출력
							doc.addImage(imgData, 'PNG', 3, 3, imgWidth, imgHeight);
							heightLeft -= pageHeight;
							 
							// 한 페이지 이상일 경우 루프 돌면서 출력
							while (heightLeft >= 20) {
							  position = heightLeft - imgHeight;
							  doc.addPage();
							  doc.addImage(imgData, 'PNG', 3, 3, imgWidth, imgHeight);
							  heightLeft -= pageHeight;
							}
							
							//파일이름
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth()+1; //January is 0!
							var yyyy = today.getFullYear();
							var hour = today.getHours(); 
							var minute = today.getMinutes(); 
							var second = today.getSeconds(); 
							  
							if(dd<10) { dd='0'+dd; } 
							if(mm<10) { mm='0'+mm;} 
							if (hour<10) { hour = "0" + hour; }
							if (minute<10) { minute = "0" + minute; }
							if (second<10) { second = "0" + second; }
							
							today = yyyy+'-'+mm+'-'+dd+'_'+hour+minute+second;
					 		  
							var pdfFileName = '[CDW]visualize_' + today;
	  		    		  	doc.save(pdfFileName + '.pdf');
	  		    	  }
	  		      });
	  	    	  //초기화
	  	    	  setVisualWordPdfExportReset();
	  	   	   },2000);
	  	  });
	    }
	};
}

//시각화분석 초기화
function setVisualWordPdfExportReset(){
	gvSpinnerClose();
	//초기화
	$("#chartVisualWordPdfTitle").empty();
	$("#chartVisualWordPdfTitleSub").empty();
	 itemSelectYVal = '';
	 itemSelectXVal = '';
	 filterItemValY = '';
	 filterItemValX = '';
	$('#chartVisualWordPdfImg').attr("src", "");
	$('.visualDisplay').hide();
}

//(공통) 워드 export js
function setWordExport(){
	if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
	    (function($) {
	        $.fn.wordExport = function() {
//	            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
	            var staticA = {
	                mhtml: {
	                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
	                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
	                    body: "<body>_body_</body>"
	                }
	            };
	            
	            var css = (
	       		     '<style>' +
	       		     '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
	       		     'div.WordSection1 div.WordSection2 div.WordSection3 div.WordSection4 {page: WordSection1;}' +
	       		     '.imgSummary { display: none; }' +
	       		     'table{border-collapse:collapse;}th, td{border:1px gray solid;width:5em;padding:2px;}'+
	       		     '</style>'
	       		   );
	 		   	
	            var options = {
	                maxWidth: 624
	            };
	            // Clone selected element before manipulating it
	            var markup = $(this).clone();

	            // Remove hidden elements from the output
	            markup.each(function() {
	                var self = $(this);
	                if (self.is(':hidden'))
	                    self.remove();
	            });

	            // Embed all images using Data URLs
	            var images = Array();
	            var img = markup.find('img');
	            for (var i = 0; i < img.length; i++) {
	                // Calculate dimensions of output image
	                var w = Math.min(img[i].width, options.maxWidth);
	                var h = img[i].height * (w / img[i].width);
	                // Create canvas for converting image to data URL
	                var canvas = document.createElement("CANVAS");
	                canvas.width = w;
	                canvas.height = h;
	                // Draw image to canvas
	                var context = canvas.getContext('2d');
	                context.drawImage(img[i], 0, 0, w, h);
	                // Get data URL encoding of image
	                var uri = canvas.toDataURL("image/png");
	                $(img[i]).attr("src", img[i].src);
	                img[i].width = w;
	                img[i].height = h;
	                // Save encoded image to array
	                images[i] = {
	                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
	                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
	                    location: $(img[i]).attr("src"),
	                    data: uri.substring(uri.indexOf(",") + 1)
	                };
	            }

	            // Prepare bottom of mhtml file with image data
	            var mhtmlBottom = "\n";
	            for (var i = 0; i < images.length; i++) {
	                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
	                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
	                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
	                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
	                mhtmlBottom += images[i].data + "\n\n";
	            }
	            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

	            //TODO: load css from included stylesheet
	            var styles = "";

	            // Aggregate parts of the file together
	            var fileContent = staticA.mhtml.top.replace("_html_", staticA.mhtml.head.replace("_styles_", styles) + staticA.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;
	            
	            // Create a Blob with the file contents
	            var blob = new Blob(['\ufeff', fileContent], {
	                type: "application/msword;charset=utf-8"
	            });
	            
	            url = URL.createObjectURL(blob);
	 		   link = document.createElement('A');
	 		   link.href = url;
	 		   // Set default file name. 
	 		   // Word will append file extension - do not add an extension here.
	 		   
	 		   //파일이름
	 		   var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				var hour = today.getHours(); 
				var minute = today.getMinutes(); 
				var second = today.getSeconds(); 
				  
				if(dd<10) { dd='0'+dd; } 
				if(mm<10) { mm='0'+mm;} 
				if (hour<10) { hour = "0" + hour; }
				if (minute<10) { minute = "0" + minute; }
				if (second<10) { second = "0" + second; }
				
				today = yyyy+'-'+mm+'-'+dd+'_'+hour+minute+second;
	 		
				var wordFileName = '[CDW]visualize_' + today;
		 		  
				link.download = wordFileName + ".doc";  
				document.body.appendChild(link);
	 		  
	 		  
	 		 	if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, 'Document'); // IE10-11
		   		else link.click();  // other browsers
	 		 	document.body.removeChild(link);
	            saveAs(blob, wordFileName);
	        };
	    })(jQuery);
	} else {
	    if (typeof jQuery === "undefined") {
	        console.error("jQuery Word Export: missing dependency (jQuery)");
	    }
	    if (typeof saveAs === "undefined") {
	        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
	    }
	}
}
//word 끝!! 