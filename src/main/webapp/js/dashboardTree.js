var currentDashboardTab = 1;

//------------------------------------------------------------------------------------------
// PAGE INIT	
//------------------------------------------------------------------------------------------
$(document).ready(function(){	
	//initTree()
	setTreeData();
	
	setMainPatientBarChart();
	
	//setMainPatientPieChart();
	
	initTreeEvent();
	//$(".js-range-slider").ionRangeSlider();
});




function setTreeData(){
	var dataTree;
	var promise = http('/dashboard/selCateOncotreeList', 'post', 'false', {});
		/*{$.ajax({
		type: 'get',
		url: 'http://oncotree.mskcc.org/api/tumorTypes',
		async:false,
		dataType: 'json',
		contentType: "application/json"
	});*/
	promise.then(function(result){
		var dataTree;
		console.log(result);
		dataTree =result.selCateOncotreeList;
		
		initTreeC(dataTree);
	
	});
	
}

function initTreeC(dataTree){

	var width = 1400;
	var height = 1000;
	var dx = 20;
	var dy = width/4;
	var margin = ({top: 10, right: 10, bottom: 10, left: 100});

	var diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

	var tree = d3.tree().nodeSize([dx, dy]);
	var radius = 6;
	/*var circleAttrs = {
	          cx: function(d) { return xScale(d.x); },
	          cy: function(d) { return yScale(d.y); },
	          r: radius
	      };

	var xScale = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);
	
	var yScale = d3.scaleLinear()
    .domain([0, height])
    .range([0, height]);*/


	

	const root = d3.stratify()
				.id(function(d){return d.ID})
				.parentId(function(d){return d.PARENTS_ID})(dataTree);
			root.x0 = dy / 2;
			root.y0 = 0;
			root.descendants().forEach((d, i) => {
		    d.id = i;
		    d._children = d.children;
		    d.checked = false;
		    if (d.depth && d.data.ID.length !== 1) d.children = null;
	 });

	const svg = d3.select(".cancer-tree").append("svg")
    .attr("viewBox", [-margin.left, -margin.top, width, dx])
    .style("font", "13px sans-serif")
    .style("user-select", "none")
    .style("min-height","500px");
    
	const gLink = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

	const gNode = svg.append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");
	
	
    svg.call(d3.zoom().scaleExtent([1/2,2]).on("zoom", function () {
       gNode.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.zoomTransform($('svg')[0]).k + ")")
       gLink.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.zoomTransform($('svg')[0]).k + ")")
       var rang = (d3.zoomTransform(this).k*100).toFixed(2)
       var rang_f = d3.zoomTransform(this).k*50;
       $('#customRange1').val(rang_f);
       $('#rangeScaleVal').text((d3.zoomTransform(this).k*100).toFixed(2)+"%");
    }))
	
	var div = d3.select("body").append("div")
		.attr("class", "treetooltip")
		.style("opacity", 0);

    $('#customRange1').on('change',function(){
    	var sz = $(this).val()/50;
    	d3.zoomTransform($('svg')[0]).k = sz;
    	gLink.attr("transform", "translate(" + d3.zoomTransform($('svg')[0]).x + "," + d3.zoomTransform($('svg')[0]).y + ") scale(" + sz + ")");
    	gNode.attr("transform", "translate(" + d3.zoomTransform($('svg')[0]).x + "," + d3.zoomTransform($('svg')[0]).y + ") scale(" + sz + ")");
    	
    	$('#rangeScaleVal').text((sz*100).toFixed(2)+"%")
    })
    
	/*	
	svg.selectAll("circle")
    .data(dataTree)
    .enter()
    .append("circle")
    //.attr(circleAttrs)  // Get attributes from circleAttrs var
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);*/

	  function mouseover() {
          div.transition()
          .duration(100)
          .style("opacity", 1);
      }

      function mousemove(d) {
          div
          .html( "Info </br>" + "Main Type : " + d.data.MAINTYPE + "</br>"
        		  + "Level : " + d.data.LEVEL + "</br>"
        		  + "NCI : " + d.data.NCI + "</br>"
        		  + "UMLS : " + d.data.UMLS + "</br>"
        		  + "Color : " + d.data.COLOR + "</br>")
          .style("left", (d3.event.pageX ) + "px")
          .style("top", (d3.event.pageY) + "px");
      }

      function mouseout() {
          div.transition()
          .duration(100)
          .style("opacity", 0);
      } 

	  
	  function update(source) {
		    const duration = d3.event && d3.event.altKey ? 2500 : 250;
		    const nodes = root.descendants().reverse();
		    const links = root.links();

		    // Compute the new tree layout.
		    tree(root);
		    //d3.tree().nodeSize([root.dx, root.dy]);
		    
		    let left = root;
		    let right = root;
		    root.eachBefore(node => {
		      if (node.x < left.x) left = node;
		      if (node.x > right.x) right = node;
		    });

		    const height = right.x - left.x + margin.top + margin.bottom;

		    const transition = svg.transition()
		        .duration(duration)
		        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
		        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

		    // Update the nodes…
		    const node = gNode.selectAll("g")
		      .data(nodes, d => d.id);
		    
		    // Enter any new nodes at the parent's previous position.
		    		    
		    const nodeEnter = node.enter().append("g")
		        .attr("transform", d => 'translate('+source.y0+','+source.x0+')')
		        .attr("fill-opacity", 0)
		        .attr("stroke-opacity", 0)
		        

		        
		    nodeEnter.on("mouseover", mouseover)
            .on("mousemove", function(d){mousemove(d);})
            .on("mouseout", mouseout)
            .attr("fill","black")
            .attr("r", 5.5);
		    
		    nodeEnter.append("circle")
		        .attr("r", 2.5)
		        .attr("fill", d => {	
		        	if(d.data.LEVEL == 1) return d.data.COLOR
		        	else return d._children ? "#555" : "#999"
		        	})
		        .attr("stroke-width", 10).on("click", d => {
			          d.children = d.children ? null : d._children;
			          update(d);
			        });;
		        
		    nodeEnter.append("text")
		        .attr("dy", "0.31em")
		        .attr("x", d => d._children ? -6 : 6)
		        .attr("text-anchor", d => d._children ? "end" : "start")
		        .text(d => d.data.NM)
		        .on("click", d => {
			          d.children = d.children ? null : d._children;
			          update(d);
			        })
		      .clone(true).lower()
		        //.attr("stroke-linejoin", "round")
		        //.attr("stroke-width", 3)
		        //.attr("stroke", "white");

		    nodeEnter.append("foreignObject")
		    	.attr("dy", "0.31em")
		    	.attr("x", d => d._children ? 4 : -12)
		    	.attr("y","-4")
	   			.attr("width","9px")
       			.attr("height", "9px")
		        .html(d=> '<input type="checkbox" class="input-check-tree" style="height:9px; width:9px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'">')
		        .on("click", d => {
			          d.checked = $('.input-check-tree').is(':checked');
			    });;
       			

		    
		   /* nodeEnter.on("mouseover", (d, i) => {
		    	console.log(d)
		    	console.log(i)
		    	//d3.select("#treeTooltip").attr("transform", d => 'translate('+source.y0+','+source.x0+')').classed('treehidden',false);
		    	
	        })
	        .on("mouseout", (d, i) => {
	        	//d3.select("#treeTooltip").classed('treehidden',false);
	        });*/
		    
		    // Transition nodes to their new position.
		    const nodeUpdate = node.merge(nodeEnter).transition(transition)
		        .attr("transform", d => 'translate('+d.y+','+d.x+')')
		        .attr("fill-opacity", 1)
		        .attr("stroke-opacity", 1);

		 // Transition exiting nodes to the parent's new position.
		    const nodeExit = node.exit().transition(transition).remove()
		        .attr("transform", d => 'translate('+source.y+','+source.x+')')
		        .attr("fill-opacity", 0)
		        .attr("stroke-opacity", 0);
		    

		    
		    // Update the links…
		    const link = gLink.selectAll("path")
		      .data(links, d => d.target.id);

		    // Enter any new links at the parent's previous position.
		    const linkEnter = link.enter().append("path")
		        .attr("d", d => {
		          const o = {x: source.x0, y: source.y0};
		          return diagonal({source: o, target: o});
		        });

		    // Transition links to their new position.
		    link.merge(linkEnter).transition(transition)
		        .attr("d", diagonal);

		    // Transition exiting nodes to the parent's new position.
		    link.exit().transition(transition).remove()
		        .attr("d", d => {
		          const o = {x: source.x, y: source.y};
		          return diagonal({source: o, target: o});
		        });

		    // Stash the old positions for transition.
		    root.eachBefore(d => {
		      d.x0 = d.x;
		      d.y0 = d.y;
		    });
		  }
	  
	  update(root);

	  
}
function cohortdetlList(){
	
	var dataSet = {};
	//dataSet.CATE_DETL_SEQ = detlSeq;
	
	var promise = http('cohort/selCohortContList', 'post', false , dataSet);
	
	promise.then(function(result){
		
		console.log("delList:::",result);
		var dataView = result.selCohortContList;
		
		return dataView;
		

	});
	
	
}

function setMainPatientBarChart(){
	
	var promise = http('/dashboard/selMainPatientChart', 'post', 'true', {});
	promise.then(function(result){
		console.log(result);
		
		var arrVal = [];
		var arrLabel = [];
		var resultData = result.selMainPatientChart;
		
		for(var i=0; i<resultData.length; i++){
			arrVal.push(resultData[i].CNT);
			arrLabel.push(resultData[i].COMM_CD_NM.replace("Cancer",""));
		}
		
		var barData = [{
			  type: 'bar',
			  x: arrVal.slice(0,25).reverse(),
			  y: arrLabel.slice(0,25).reverse(),
			  orientation: 'h',
			  marker:{
				color: ['Black','Blue','Cyan','DarkRed','Gainsboro','Gray','Green','HotPink','LightBlue'
					,'LightSalmon','LightSkyblue','LightYellow','LimeGreen','MediumSeaGreen','Orange','PeachPuff'
					,'Purple','Red','SaddleBrown','Teal','Yellow','MediumOrchid','OrangeRed','RoyalBlue','DarkRed']
			  }
			}];

		var barlayout = {
				 	font:{
					    family: 'Raleway, sans-serif'
					  },
					yaxis: {
					    automargin: true
					},
					xaxis: {
						automargin: true
					},
					margin: {
						l: 100,
					    r: 0,
					    t: 0,
					    b: 0
					},
					height : "600",
					width : "250"
			};

		Plotly.newPlot('mainPatientbarChart', barData, barlayout, {displayModeBar: false});
		
		var pieData = [{
			  values: arrVal,
			  labels: arrLabel,
			  hoverinfo: 'label+percent',
			  hole: .4,
			  type: 'pie',
			  textinfo: 'none'
			}];
		
		var pielayout = {
				 height : "250",
				 showlegend: false,
				 margin: {
					    l: 20,
					    r: 20,
					    b: 0,
					    t: 30,
				  }
				};

		Plotly.newPlot('mainPatientpieChart', pieData, pielayout);
	
	});
	
	
	
}
function setMainPatientPieChart(){
	var data = [{
		  values: [16, 15, 12, 6, 5, 4, 42],
		  labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
		  domain: {column: 0},
		  hoverinfo: 'label+percent+name',
		  hole: .4,
		  type: 'pie'
		}];
	
	var layout = {
			 height : "250",
			 showlegend: false,
			 margin: {
				    l: 20,
				    r: 20,
				    b: 20,
				    t: 20,
			  }
			};

	Plotly.newPlot('mainPatientpieChart', data, layout);
}

function treeChart(){
	
}
//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initTreeEvent(){
	//
	$('.patientViewTab').on('click',function(){
		currentDashboardTab = $(this).attr("pageNum");
	})
	$('#txtareaPatnoResultCheck').on('keyup',function(e){
		regexp = /[^0-9,|/]/gi;

        v = $(this).val();

        
        $(this).val(v.replace(regexp, ''));
        
	})
	
	$('#btnPatnoResultCheck').on('click',function(){
		var dataSet = {};
		var regexp = /[,|/]/gi;
		var numregexp = /[^0-9]/gi;
		
		var txtareaVal = $('#txtareaPatnoResultCheck').val();
		var txtArr = txtareaVal.split(regexp);
	
		
		dataSet.KIND = $('input[name="patnoRadios"]:checked').val();
		dataSet.TXTARR = txtArr;
		
		var promise = http('dashboard/selPatnoResultCheck', 'post', false , dataSet);
		promise.then(function(result){
			
			console.log(result);
			var dataView = result.selPatnoResultCheck;
			var failArr = [];
			for(var i=0; i<txtArr.length; i++){
				if(dataView.indexOf(txtArr[i]) == -1 ) failArr.push(txtArr[i]);
			}
			
			
			var html = '';
			html += '<div class="row" style="margin:0px;">';
			html += 	'<div class="col-lg-6">';
			html += 		'<label class="pull-right-container">';
			html += 			'Success : <small class="label bg-blue">'+dataView.length+'</small>';
			html += 		'</label>';
			html += 		'<div>'+dataView.toString();
			html += 		'</div>';
			html += 	'</div>';
			html += 	'<div class="col-lg-6" style="min-height:290px; border-left:1px solid;">';
			html += 		'<label class="pull-right-container">';
			html += 			'Fail : <small class="label bg-red">'+failArr.length+'</small>';
			html += 		'</label>';
			html += 		'<div>'+failArr.toString();
			html += 		'</div>';
			html += 	'</div>';
			html += '';
			html += '';
			
			$('#divPatnoResult').html(html);
		});
		
	});
	
	$('#btnMutationViewMove').on('click',function(){
		$.each($('.input-check-tree:checked'),function(key,value){
			console.log($(this).val())
		})
	});
	$('#mycohort-tab').on('click',function(){
		var dataSet = {};
		var cohortdetlArr;
		var detlSeqArr = [];
		//dataSet.CATE_MID_SEQ = $this.val();
		console.log(dataSet);		
		var promise = http('cohort/selCohortContList', 'post', false , dataSet);
		
		promise.then(function(result){
			
			console.log("delList:::",result);
			cohortdetlArr = result.selCohortContList;
			
			for(var i=0; i<cohortdetlArr.length; i++){
				var tmpMap = cohortdetlArr[i];
				if(detlSeqArr.indexOf(tmpMap.CATE_DETL_SEQ) == -1){
					detlSeqArr.push(tmpMap.CATE_DETL_SEQ);
				}
			}
		});
		
		var promise2 = http('dashboard/selectCohortDetlList', 'post', true , dataSet);
		
		promise2.then(function(result){
			console.log(result);
			var html = '';
			var dataView = result.selectCohortDetlList;
			var dataView2 = cohortdetlArr;
			
			if(isNullOrEmpty(dataView)){
				$('#jqxCohortList').empty();

				$('#jqxCohortList').append(html);
				return;
			}
			else{
				$('#jqxCohortList').empty();
				
				for(var i=0; i<dataView.length; i++){
					var tmpMap = dataView[i];
					if(detlSeqArr.indexOf(tmpMap.CATE_DETL_SEQ) != -1){
						html = '';
						html += '<div class="treeview" id="cohortList_'+tmpMap.CATE_DETL_SEQ+'">';
						html += '<a data-toggle="collapse" data-parent="#cohortTree" href="#cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" aria-expanded="true"><h3>'+tmpMap.CATE_DETL_NM+'</h3></a>';
						html += '<ul class="treeview-menu collapse in" id="cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" style="padding-left: 10px;">';
						/*
						html += '<div class="treeview"><div class="checkbox" href="#"><label for="itemCateDetl_tree_">';
						html += '<input type="checkbox" name="itemCate_tree" detlseq="1" value="2" id="itemCateDetl_tree_" style="margin-top:5px;">';
						html += 'breacMSKSKSK'+'</label>';
						html += '<div class="pull-right">';
						html += '1919 samples';
						html += '</div></div></div>';
						*/
						html += '</ul>';
						html += '</div>';
						$('#jqxCohortList').append(html);
						
					}
					
				}

				for(var i=0; i<dataView2.length; i++){
					var tmpMap = dataView2[i];
					var html = '';
					//html += '<ul class="treeview-menu collapse in" id="cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" style="padding-left: 10px;">';
					
					html += '<div class="treeview"><div class="checkbox" href="#"><label for="itemCateDetl_tree_'+tmpMap.SEQ+'">';
					html += '<input type="checkbox" class="cohort-cate-list" name="itemCate_tree" detlseq="'+tmpMap.CATE_DETL_SEQ+'" value="'+tmpMap.SEQ+'" id="itemCateDetl_tree_'+tmpMap.SEQ+'" style="margin-top:5px;">';
					html += tmpMap.CONT_NM+'</label>';
					html += '<div class="pull-right">';
					html += '1919 samples';
					html += '</div></div>';
					html += '<input type="hidden" id="itemCate_tree_'+tmpMap.SEQ+'" value="'+tmpMap.CONT_NM+'"></div>';
					
					//html += '</ul>';
					
					$('#cohortList_tree'+tmpMap.CATE_DETL_SEQ).append(html);
				}

			}
		});
	})
	
	
}

