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