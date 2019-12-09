$(document).ready(function(){
	
	chartInit();
	
	
	chartInitEvent();
	
	
});

function chartInit(){
	
	var config = {
			scrollZoom: true, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
			//modeBarButtonsToAdd: ['lasso2d'],
			displaylogo: false // this one also seems to not work
			//displayModeBar: true //this one does work
		};
/*	
	var data = [
		  {
		    x: [1.5,2.5,3.5],
		    y: [20, 14, 23],
		    text : [{a : 1, b: 2},{a : 3, b: 4},{a : 5, b: 6}],
		    type: 'bar',
		    hovertemplate: '<i>Price</i>: $%{y:.2f}' +
		    				'<br><b>X</b>: %{x}<br>' + '%{text.a}<br>' + '%{text.b}' 
		  }
		];
	var layout = {
			  autosize: false,
			  height : 140,
			  width : 450,
			  dragmode : 'select',
			  selectdirection : "h",
			  showlegend: false,
			  margin: {
				    l: 0,
				    r: 0,
				    b: 0,
				    t: 0,
			  }
			};
	
	Plotly.newPlot('boxChart3_1', data, layout,config);*/

	
// pie
	
	var myplot = $("#boxChart1");
	var myplot2 = document.getElementById('boxChart1');
	
	var layout = {
			autosize: false,
			  height : 140,
			  width : 200,
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
	var data = [{
		  values: [19, 26, 55],
		  labels: ['Residential', 'Non-Residential', 'Utility'],
		  type: 'pie'
		}];

	
	/*Plotly.newPlot('boxChart1', data, layout,config);
	myplot[0].on('plotly_click',function(data){
		console.log(myplot2.getAttribute('name'));
		console.log(data.points[0].label, data.points[0].value);
		var name = myplot2.getAttribute('name');
		
		if($('button[name="'+data.points[0].label+'"]').length != 0) return ;
	
		var html = '';
		if($('#filter_'+name).length == 0){
			html += '<div class="filter-box" id="filter_'+myplot2.getAttribute('name')+'">';
			html += 	'<span>';
			html += 		myplot2.getAttribute('name') + ' : ';
			html += 	'</span>';
			html += 	'<div class="btn-group">';
			html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+data.points[0].label+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-blue btn-flat delete">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			html += '</div>';
			
			$('#filter-group').append(html);
		}
		else{
			html += 	' ';
			html += 	'<div class="btn-group">';
			html += 		'<button type="button" class="btn bg-blue btn-flat" name="'+data.points[0].label+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-blue btn-flat delete">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			
			$('#filter_'+name).append(html);
		}

		
	});*/
    
    var html = '';
    html +='<div>';
    html += '<h3>1111111111111</h3>'
    html += '</div>';
    
    var option = {
//    		template : '<div class="tooltip" role="tooltip"><div class="arrow">444</div><h3 class="tooltip-inner">333</h3></div>',
    		html : true,
    		title : html,
    		placement : 'auto',
    		trigger : 'hover',
    		container: 'body'
    };
    $('[data-toggle="popover"]').popover(option);
}


function chartInitEvent(){
	
	
	
}