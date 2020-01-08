var currentDashboardTab = 1;
var checkedPatnoResult = [];
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
	var dx = 24;
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
    
/*    $(document).on('change','.input-check-tree',function(){
		console.log(this);
		var d = d3.select($(this).parent()[0]).data()[0];
		
	});*/
    
	/*	
	svg.selectAll("circle")
    .data(dataTree)
    .enter()
    .append("circle")
    //.attr(circleAttrs)  // Get attributes from circleAttrs var
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);*/

    function checkupdate(d){
    	d.checked = $('input[value='+d.data.ID+']').is(':checked');
        
        if(d.checked == false){
			if(d.parent == null) return;
			  
			if(d.parent.checked == true){
				d.parent.checked = false;
				  
				$('input[value='+d.parent.data.ID+']').prop('checked',false);
				checkParentupdate(d.parent);
			}
      	  
	      	if(!isNullOrEmpty(d.children)){
	    		for(var i=0; i<d.children.length; i++){
	    			d.children[i].checked = false;
	    			$('input[value='+d.children[i].data.ID+']').prop('checked',false);
	    			checkChildernupdate(d.children[i]);
	    		}
	    	}
      	  
        }
        else{
        	if(!isNullOrEmpty(d.children)){
        		for(var i=0; i<d.children.length; i++){
        			d.children[i].checked = true;
        			$('input[value='+d.children[i].data.ID+']').prop('checked',true);
        			checkChildernupdate(d.children[i]);
        		}
        	}
        	
        }
    }
    
    function checkParentupdate(d){
    	d.checked = $('input[value='+d.data.ID+']').is(':checked');
        
        if(d.checked == false){
			if(d.parent == null) return;
			  
			if(d.parent.checked == true){
				d.parent.checked = false;
				  
				$('input[value='+d.parent.data.ID+']').prop('checked',false);
				checkParentupdate(d.parent);
			}
      	  
        }
    }
    
    function checkChildernupdate(d){
    	d.checked = $('input[value='+d.data.ID+']').is(':checked');
        
        if(d.checked == false){
        	
	      	if(!isNullOrEmpty(d.children)){
	    		for(var i=0; i<d.children.length; i++){
	    			d.children[i].checked = false;
	    			$('input[value='+d.children[i].data.ID+']').prop('checked',false);
	    			checkupdate(d.children[i]);
	    		}
	    	}
      	  
        }
        else{
        	if(!isNullOrEmpty(d.children)){
        		for(var i=0; i<d.children.length; i++){
        			d.children[i].checked = true;
        			$('input[value='+d.children[i].data.ID+']').prop('checked',true);
        			checkupdate(d.children[i]);
        		}
        	}
        	
        }
    }
    
    
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
        		  + "Color : " + d.data.COLOR + "</br>"
        		  + "Checked " + d.checked)
          .style("left", (d3.event.pageX+15 ) + "px")
          .style("top", (d3.event.pageY+20) + "px");
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
		        .attr("r", 5)
		        .attr("fill", d => {	
		        	if(d.data.LEVEL == 1) return d.data.COLOR
		        	else return d._children ? "#555" : "rgb(255, 255, 255)"
		        	})
	        	.attr("stroke", d => {	
		        	if(d.data.LEVEL == 1) return d.data.COLOR
		        	else return d._children ? "#555" : "#999"
		        	})
		        .attr("stroke-width", 1)
		        .on("click", d => {
			          d.children = d.children ? null : d._children;
			          update(d);
			        });
		        
		    nodeEnter.append("text")
		        .attr("dy", "0.31em")
		        .attr("x", d => d._children ? -9 : 9)
		        .attr("text-anchor", d => d._children ? "end" : "start")
		        .text(d => d.data.NM)
		        .on("click", d => {
			          d.children = d.children ? null : d._children;
			          update(d);
			        })
		      .clone(true).lower();
		    
		    const checkNode = nodeEnter.append("foreignObject")
		    	.attr("dy", "0.31em")
		    	.attr("x", d => d._children ? 7 : -19)
		    	.attr("y","-6")
	   			.attr("width","13px")
       			.attr("height", "13px")
		        .html(d=> {
		        	if (!isNullOrEmpty(d.parent) && d.parent.checked == true){
		        		d.checked = true;
		        		return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'" checked>';
		        	}
		        	else{
		        		d.checked = false;
		        		return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'">';
		        	}
		        })
		        .on("change", d => {
		        	checkupdate(d)
			          
			    });
       			
		    	/*		  checkNode.attr("checked",d=>{ 
			  if (d.checked == true)
				return true;
			  else 
				return false;
			});*/
		    
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
		    
		    //treeRoot = root;
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
function parentCheckChange(d){
	d.checked = false;
	
}

function getParentData(d, selectedTreeArr){
	
	if(selectedTreeArr.indexOf(d.data) == -1 ){
		
		d.data.checked = d.checked;
		selectedTreeArr.push(d.data);
		
		if(!isNullOrEmpty(d.parent)){
			selectedTreeArr = getParentData(d.parent, selectedTreeArr);						
		}
	}
	
	return selectedTreeArr;
}

function getPatnoResultCheck(dataSet, txtArr, last){
	
	var promise = http('dashboard/selPatnoResultCheck', 'post', true , dataSet);
	promise.then(function(result){
		
		//console.log(result);
		var dataView = result.selPatnoResultCheck;
		checkedPatnoResult = checkedPatnoResult.concat(dataView);
		var failArr = [];
		
		for(var i=0; i<txtArr.length; i++){
			if(dataView.indexOf(txtArr[i]) == -1 ) failArr.push(txtArr[i]);
		}

		var html = '';

		var succLen = $('#divPatnoResultSuccess').html()*1 + dataView.length;
		var failLen = $('#divPatnoResultFail').html()*1 + failArr.length;
		
		$('#divPatnoResultSuccess').html(succLen);
		if($('#divPatnoResultSuccesstxt').html() != "") $('#divPatnoResultSuccesstxt').append(",");
		$('#divPatnoResultSuccesstxt').append(dataView.toString());
		
		$('#divPatnoResultFail').html(failLen);
		if($('#divPatnoResultFailtxt').html() != "") $('#divPatnoResultFailtxt').append(",");
		$('#divPatnoResultFailtxt').append(failArr.toString());
		
		if(last == true) {
			showAlert('알림','완료 되었습니다.',null);
			gvSpinnerClose();
		}
		
	});
	promise.fail(function(e){
		console.log(e);
	})
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
	$('#btnCohortAnalysis').on('click',function(){
		gvSpinnerOpen();
		if(currentDashboardTab == "1"){
			var tmpArr = [];
			var treeArr = [];
			var selectedTreeArr = [];
			
			$.each($('.input-check-tree:checked'),function(key,value){
				$this = $(this).parent()[0];
				var d = d3.select($this).data()[0];
				
				if(d.parent != null && d.parent.checked == true){
					return true;
				}
				
				var tmpMap = {};
				
				tmpMap.CNMN_CRCN_CD = d.data.CNMN_CRCN_CD;
				tmpMap.CNMN_PRMR_ORGAN_CD = d.data.CNMN_PRMR_ORGAN_CD;
				tmpMap.CNMN_MRPH_DIAG_CD = d.data.CNMN_MRPH_DIAG_CD;
				
				tmpArr.push(tmpMap);
				
				treeArr.push(d);
			})
			console.log(treeArr);
			
			console.log(selectedTreeArr);
			
			for(var i=0; i<treeArr.length; i++){
				var d = treeArr[i];
				
				if(selectedTreeArr.indexOf(d.data) == -1 ){
					
					d.data.checked = d.checked;
					selectedTreeArr.push(d.data);
					
					if(!isNullOrEmpty(d.parent)){
						selectedTreeArr = getParentData(d.parent, selectedTreeArr);						
					}

				}
			}

			
			var dataSet = {};
			dataSet.codelist = tmpArr;
			dataSet.currentTab = currentDashboardTab;
			dataSet.PER_CODE = $.session.get('PER_CODE');
			
/*			$('#hiddenDashboardTab').val('');
			$('#hiddenDashboardTab').val(currentDashboardTab);
			$('#hiddenSelectedCancer').val('');
			$('#hiddenSelectedCancer').val(nvl(JSON.stringify(selectedTreeArr),""));
			$('#hiddenSelectedCohort').val('null');
		
			$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
			$('#frmCohortAnalysis').method = 'POST';
			$('#frmCohortAnalysis').submit();
			gvSpinnerClose();*/
			
			var promise = http('dashboard/selCohortAnalysisPatno', 'post', true , dataSet);
			promise.then(function(result){
				$('#hiddenDashboardTab').val('');
				$('#hiddenDashboardTab').val(currentDashboardTab);
				$('#hiddenSelectedCancer').val('');
				$('#hiddenSelectedCancer').val(nvl(JSON.stringify(selectedTreeArr),""));
				$('#hiddenSelectedCohort').val('null');
			
				$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
				$('#frmCohortAnalysis').method = 'POST';
				$('#frmCohortAnalysis').submit();
				gvSpinnerClose();
				
			});
			promise.fail(function(e){
				console.log(e);
				gvSpinnerClose();
			});
		}
		else if(currentDashboardTab == "2"){
			var dataSet = {};
			dataSet.TXTARR = checkedPatnoResult.toString();
			dataSet.PER_CODE = $.session.get('PER_CODE');
			dataSet.KIND = $('input[name="patnoRadios"]:checked').val();
			var promise = http('dashboard/selCohortAnalysisPatnoByNo', 'post', true , dataSet);
			
			promise.then(function(result){
				
				console.log(result);
			
				$('#hiddenDashboardTab').val('');
				$('#hiddenSelectedCancer').val('null');
				$('#hiddenSelectedCohort').val('null');
				//$('#hiddenDashboardTab').val(JSON.stringify(tmpArr));
			
				$('#hiddenDashboardTab').val(currentDashboardTab);
				$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
				$('#frmCohortAnalysis').method = 'POST';
				$('#frmCohortAnalysis').submit();
				gvSpinnerClose();
			});
			promise.fail(function(e){
				console.log(e);
				gvSpinnerClose();
			});
		}
		else if(currentDashboardTab == "3"){
		
			var chkCohort = $('input[name="itemCate_tree"]:checked');
			var contSeq = [];
			for(var i=0; i<chkCohort.length; i++) contSeq.push(chkCohort[i].value);
			var dataSet = {};
			dataSet.PER_CODE = $.session.get('PER_CODE');
			dataSet.CONT_SEQ = contSeq;
			var promise = http('dashboard/selSavedCohortList', 'post', true , dataSet);
			
			promise.then(function(result){
				
				console.log(result);
				var tmpArr = result.selSavedCohortList;
				$('#hiddenDashboardTab').val('');
				$('#hiddenSelectedCohort').val('');
				$('#hiddenSelectedCancer').val('null');

				$('#hiddenDashboardTab').val(currentDashboardTab);
				$('#hiddenSelectedCohort').val(JSON.stringify(tmpArr));
				

				$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
				$('#frmCohortAnalysis').method = 'POST';
				$('#frmCohortAnalysis').submit();
				gvSpinnerClose();
			});
			promise.fail(function(e){
				console.log(e);
				gvSpinnerClose();
			});
			
			
			
		}
		
		
	})
	
	$('.input-check-tree').on('change',function(){
		console.log(this);
		
	});

	
	$('.patientViewTab').on('click',function(){
		currentDashboardTab = $(this).attr("pageNum");
	})
	$('#txtareaPatnoResultCheck').on('keyup',function(e){
		regexp = /[^0-9,|/\n]/gi;

        v = $(this).val();

        
        $(this).val(v.replace(regexp, ''));
        
	})
	
	$('#btnPatnoResultCheck').on('click',function(){
		gvSpinnerOpen();
		
		var regexp = /[,|/]/gi;
		var numregexp = /[^0-9]/gi;
		var lastCnt = 0;
		var txtareaVal = $('#txtareaPatnoResultCheck').val();
		txtareaVal = txtareaVal.replace(/\n/gi,'');
		var txtArr = txtareaVal.split(regexp);
		
		var dataSet = {};
		dataSet.KIND = $('input[name="patnoRadios"]:checked').val();
		
		//초기화
		$('#divPatnoResultSuccess').html('0');
		$('#divPatnoResultSuccesstxt').html('');
		$('#divPatnoResultFail').html('0');
		$('#divPatnoResultFailtxt').html('');
		
		
		//var tmpTxtArr = [];
		for(var i=0; i<txtArr.length; i++){
			if(i == txtArr.length-1){
				dataSet.TXTARR = txtArr.slice(lastCnt, txtArr.length).toString();
				getPatnoResultCheck(dataSet , txtArr.slice(lastCnt, txtArr.length),true);	
			}
			else{
				if(i%100 == 0){
					dataSet.TXTARR = txtArr.slice(lastCnt, i+1).toString();
					
					getPatnoResultCheck(dataSet, txtArr.slice(lastCnt, i+1),false);
					
					lastCnt = i+1;
				}
			}
			

			
		}
		
		
		
		
	});
	
	$('#btnMutationViewMove').on('click',function(){
		$.each($('.input-check-tree:checked'),function(key,value){
			console.log($(this).val())
		})
	});
	$('#mycohort-tab').on('click',function(){
		var dataSet = {};
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.SHARE_CD = 	"CO";
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
						html += '</ul>';
						html += '</div>';
						
					}
					
				}
				
				$('#jqxCohortList').append("<h3>Cohort List</h3>");

					var html = '';
					
					html += '<table width="100%" class="table table-bordered table-striped dataTable no-footer">';
					html += '	<th style="text-align: center;">#</th>';
					html += '	<th>Cohort Name</th>';
					html += '	<th>Desc</th>';
					html += '	<th>Date</th>';
			
					for(var i=0; i<dataView2.length; i++){
						var tmpMap = dataView2[i];
					
						html += '	<tr>';
						html += '		<td width="5%" style="text-align: center;"><input type="checkbox" name="itemCate_tree" detlseq="'+tmpMap.CATE_DETL_SEQ+'" value="'+tmpMap.SEQ+'" id="itemCateDetl_tree_'+tmpMap.SEQ+'" style=""></td>';
						html += '		<td width="30%"><label for="itemCateDetl_tree_'+tmpMap.SEQ+'" style="margin-bottom:0px;  font-weight: normal; width:100%; cursor:pointer;">'+tmpMap.CONT_NM+'</label></td>';
						html += '		<td width="40%">'+tmpMap.CONT_DESC+'</td>';
						html += '		<td width="20%">'+tmpMap.CRT_DT+'</td>';
						html += '	</tr>';

					}
					html += '</table>';
					
					
					$('#jqxCohortList').append(html);
				

			}
		});
	})
	
	
}

