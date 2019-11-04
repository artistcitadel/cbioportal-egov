var gvColumnList = [];
var ItemList = [];
var contSeq = '';
var dataSeq = '';
var tableId = '';
var d_test = [];
var b_test = [];
var itemx	= [];
var itemy	= [];
var currentTab = '#disnfre';
var plotly_options = {
		scrollZoom: true, // lets us scroll to zoom in and out - works
		showLink: false, // removes the link to edit on plotly - works
		modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
		//modeBarButtonsToAdd: ['lasso2d'],
		displaylogo: false, // this one also seems to not work
		displayModeBar: true //this one does work
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
			
			

			
});

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

function getFrequency(item) {
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
		
		
		Plotly.newPlot('area_frequency', data, layout, plotly_options);
	});
}

function getDistribution(item) {
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
		
		Plotly.newPlot('area_distribution', data, layout, plotly_options);
	});
}
	
// Missing Value Pattern 그리기
function drawMissingValue(data) {
	
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
	Plotly.newPlot('area_missing', drawData, layout, plotly_options);
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

var initEvent = function() {

	// 요약통계 항목리스트 클릭 이벤트
	$("#content-md ul li").click(function() {
		$(".highlight_blue").removeClass("highlight_blue");

		
		var selectedItem = $(this).data("item");
		if (selectedItem.DATA_PER == "0%") {
			console.log("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
			alert("해당 항목의 데이터가 존재하지 않습니다. 다른 항목을 선택하세요.");
			return;
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
				$("#area_missing").html("");
				drawMissingValue(result);	
			});
		}
		else if(currentTab == "#disnfre"){
			$("#area_frequency").html("");
			$("#area_distribution").html("");
	
			$("#imgItemClick").css('display', 'none');
	
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
	
				getDistribution(selectedItem);			
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
	
				getFrequency(selectedItem);
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
            ui.draggable.addClass("highlight_red");
            $(".itemCol .sortable_area").append("<div class='summarySelected' id='col_" + itemVal.ITEM_VALUE + "'>" + itemVal.ITEM_TEXT + "<div class='fr' style='margin-left:5px;'><a href='#' class='fr' ><img src='/bigcenmed2/images/visual/close.png' class='fr delete' style='width:13px;' /></a></div>");
            $("#col_" + itemVal.ITEM_VALUE).data("item", itemVal);
                       
            $(".delete").click(function () {
                var tmpId = $(this).parent().parent().parent().attr('id').toString();
                var tmp = $(".highlight_red");
                tmp.each(function (x, y) {                      
                    if (y.id.toString() == tmpId.substring(4))
                        $(y).removeClass("highlight_red");
                });
                $(this).parent().parent().parent().remove();
                activeVisualization();
            });
            activeVisualization();
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
            ui.draggable.addClass("highlight_red");
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
                var tmp = $(".highlight_red");
                tmp.each(function (x, y) {
                    if (y.id.toString() == tmpId.substring(4))
                        $(y).removeClass("highlight_red");
                });                     
                $(this).parent().parent().parent().remove();
                activeVisualization();
            });
            activeVisualization();
        }
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
				if(itemx.length == 2){
					if (itemx[1].item_type == "TEXT" || itemx[1].item_type == "DATE") {
    					$("#v2").removeClass("disabled");   				
    				}
    				else{
    					if($("#sel_row_" + itemx[1].id).val() != ""){
    						$("#v2").removeClass("disabled");
    					}
    					else{
    						$("#v2").addClass("disabled");
    					}  		
    				}
				}
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

function visualization(n){
	var numVal	= $('input[name="funProcess_number"]:checked').val();
	var txtVal	= $('input[name="funProcess_text"]:checked').val();
	var order	= $('input[name="odrProcess"]:checked').val();
	$(".selectvisual").removeClass("selectvisual");
	$("#c"+n).addClass("selectvisual");

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
	}
	
	console.log(dataSet);
	var promise = http('visualizepopup/visualizeAllGraph', 'post', true,dataSet);
	
	promise.then(function(result) {
		console.log(result);
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
			data = [ {
				x : x,
				y : y,
				type : result["type"],
				mode : result["mode"]
			} ];
			
			var xlength = [];
			$.each(result["xdata"],function(w,z){xlength.push(z.length)});
			var maxLength = arrMax(xlength);
			marb = (maxLength-1)*10;
			if(marb < 120)
				marb = 120;
		}
	}
	
	
	
	layout = {
		 //title : name,//'visualization ' + result["type"],
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
		  }
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
		if(type == "BOX" || type == "SCT"){
			
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
			gData = {		
				x : x,
				y : y,
				type : z["type"],
				name : z["name"],
				mode : z["mode"],
				connectgaps: true
			};
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
}