<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
<style>
	.chartspinning.pie{
		height: 150px;
	}
	.chartspinning{
		height: 340px;
	}
	
	.connectedSortable {
	    min-height: 340px;
	    padding-bottom: 50px;
	    list-style-type: none;
	    margin: 0;
	    padding: 0;
		/* border:solid 1px black; */
	}

	.box {
		min-height: 100px;
		border: 1px solid #d3d3d3;
	    border-radius: 4px;
	    margin-bottom: 0px;
        height: 100%;
	}
	.box.pie{
		min-height: 100px;
		border: 1px solid #d3d3d3;
	    border-radius: 4px;
	    margin-bottom: 0px;
	    height: 100%;
	}
	.list {
		height : 380px;
	    width: calc(100% - 4px);
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
	}
	.list.pie{
	    /* font-size: 30px;*/
	    height : 188px;
	    width: calc((100% - 4px) / 2 - 2px);
	    /* width: calc(100% - 4px); */
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
		display : inline-block;
		
	}
	.list.bar{
	    /* font-size: 30px;*/
	    height : 188px;
	    width: calc(100% - 4px);
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
	}
	.list.scatter , .list.grd {
	    /* font-size: 30px;*/
	    height : 380px;
	    width: calc(100% - 4px);
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
	}
	#items .ui-selected {
	    background: red;
	    color: white;
	    font-weight: bold;
	}
	#items {
		margins-bottom : 100px;
		
	}
	.item {
		height: 100%;
	}
	.ui-sortable-helper : {
		/* display: none; */
	}
	.highlight {
	    background: #f4f4f4;
 		border: 1px dashed #401515;
 	  	height : 380px;
	    width: calc(100% - 4px);
	    margin-bottom: 2px;
	}
	
	.highlight.pie {
	    background: #f4f4f4;
 		border: 1px dashed #401515;
		height : 188px;
	    width: calc((100% - 4px) / 2 - 2px);
	    margin : 2px;
	    display : inline-block;
	}
	
	.highlight.bar {
	    background: #f4f4f4;
 		border: 1px dashed #401515;
 	    height : 188px;
	    width: calc(100% - 4px);
	    margin-bottom: 2px;
	    display : block;
	}
	.box-header{
/* 		background-color:#f5f5f5;
		color: #1b1b1b;
		font-weight: bold; */
/* 		padding-top: 5px;
	  	padding-bottom: 5px; */
	}
	.box-title{
		flex-grow: 1;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    text-align: center !important;
        vertical-align: middle;
    }
    .box-title span{
    	font-size: 13px;
        font-weight: bold;
    }
    .up-right-side{
		display:none;
		position:absolute;
		top: -1px;
		right: -1px;
    }
    .down-right-side{
    	display:none;
		position:absolute;
		bottom: 2px;
   		right: 2px;
    }
    .up-right-side-2{
    	position:absolute;
		top: -1px;
		right: -1px;
	    display: flex;
    }
    .filter-box{
    	background-color: #ececec;
	    border: 1px solid #ddd;
	    border-radius: 5px;
	    margin: 2px 5px 2px 0;
	    padding: 5px;
        float: left;
    }
    .chart-body-pie {
    	padding : 1px;
    	height: calc(100% - 30px);
    }
    .chart-body-bar {
    	padding : 1px;
    	height: calc(100% - 30px);

    }
    .chart-body-grd {
    	padding : 1px;
    	height: calc(100% - 30px);
    	
    }
    .and-group {
	    position: relative;
	    display: inline-block;
	    vertical-align: middle;
    }
</style>

<section class="content-header">
	<h1>
		Cohort Analysis
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">Cohort Analysis</li>
	</ol>
</section>
<section  class="col-lg-12">
	<section class="box box-solid">
		<div class="box-header">
			<i class="ion ion-ios-list-outline"></i>
			<div class="box-title">Cohort 선택</div>
			<div class="box-tools pull-right">
		      <!-- Collapse Button -->
		      <button type="button" class="btn btn-box-tool" data-widget="collapse">
		        <i class="fa fa-minus"></i>
		      </button>
		    </div>
		</div>
		<div class="box-body" style="height: 100px; overflow: auto;  overflow-x: hidden; text-align: center;">
	        
		    <div class="row">
		    	<div class="col-lg-12">
		    		
		    	</div>
		    </div>
	    
		</div>			    
    </section>
	<section class="box" style="margin-bottom: 5px; border: none;">
		<div class="box-header with-border">
			<h3 class="box-title"><i class="ion ion-ios-speedometer-outline"></i>&nbsp;Filter</h3>
			<div class="btn-group pull-right" style="margin-left:10px; display:none;" id="filterApplyAfter">
				
				<small class="label bg-yellow">적용 완료</small>
			</div>
			<div class="btn-group pull-right" style="margin-left:10px;" id="filterApplyBefore">
				<small class="label bg-maroon">적용 전</small>
			</div>
			
		</div>
		<div class="box-body">
				<div id="filter-group" style="">
					<!-- <div class="filter-box" id="filter_cancer">
						<span>
							Cancer : 
						</span>
						<div class="btn-group">
							<button type="button" class="btn bg-navy btn-flat" style="">
							    Removable Box Example
						    </button>
						    <button type="button" class="btn bg-navy btn-flat delete">
							    <i class="fa fa-times"></i>
							</button>
							
						</div>
						<div class="btn-group">
							<button type="button" class="btn bg-navy btn-flat" style="">
							    Removable Box Example
						    </button>
						    <button type="button" class="btn bg-navy btn-flat delete">
							    <i class="fa fa-times"></i>
							</button>
							
						</div>
					</div> -->
					
					
				</div>
			
			
		     <div class="btn-group pull-right">
			 	<button type="button" class="btn btn-default btn-sm pull-right" style="margin-left:10px;" id="btnDashboardCohortClear"> 초기화 </button>
			 </div>
			 <div class="btn-group pull-right">
			 	<button type="button" class="btn btn-indigo btn-sm pull-right" style="margin-left:10px;" id="btnDashboardFilterApply"> 필터 적용 </button>
			 </div>
			 <div class="btn-group pull-right open">
					<button type="button" class="btn btn-danger btn-sm" style="margin-left:10px;" id="mainSaveAdd"> 저장 </button>
					<div class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="mainSaveAdd" id="divmainSaveAdd" style="width:800px; z-index:-1;">
						<div class="box-body">
							<div class="col-lg-5 panel"  data-widget="tree" id="divDashboardCohortList" style="height:500px; overflow:auto;">
								
							</div>
							<div class="col-lg-7">
								<div class="form-group">
									<label> 상세 분류 </label>
									<select class="form-control" id="selDashboardCohortList" disabled>
					                  <option value="">없음</option>
					                </select>
								</div>
								<div class="form-group">
									<label> 코호트 명 </label>
									<input type="text" class="form-control" placeholder="Enter ..." id="txtDashboardCohortNM">
								</div>
								<div class="form-group">
									<label> 설명 </label>
									<textarea class="form-control" rows="3" placeholder="Enter ..." id="txtDashboardCohortSub" style="margin: 0px 59.5px 0px 0px; height: 300px;"></textarea>
								</div>
							</div>
						</div>
					
						<div class="text-center">
							<button type="button" class="btn btn-danger btn-sm" style="margin-bottom: 20px;" id="btnDashboardCohortAdd"> 저장 </button>
						</div>
				     </div>
			     </div>
		</div>
	</section>
	
	<div class="row" style="margin-right:10px; margin-bottom: 10px;">
		<div class="btn-group pull-right">
			<button type="button" class="btn btn-default btn-sm" style="margin-left:10px;"><a href="<c:url value="/cohort/cohortAnalysis" />">Patient View </a>  </button>
			<button type="button" class="btn btn-default btn-sm" style="margin-left:10px;"><a href="<c:url value="/cohort/cohortAnalysis" />">Mutation View </a>  </button>
		</div>
	</div>
</section>
<section  class="col-lg-12">
	<nav class="navbar navbar-light navbar-background-color margin-top-10" >
		<div class="row" >
			<div class="col-lg-12">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs" id="myTab">
						<li class="active">
							<a href="#cohortSummary" id="cohortSummary-tab" class="patientViewTab" pageNum="1" page="tabCohortSummary" data-toggle="tab" aria-controls="cohortSummary" aria-selected="true"><b>Summary</b></a>
						</li>
						<li>
							<a href="#cohortData" id="cohortData-tab" class="patientViewTab" pageNum="2" page="tabCohortData" data-toggle="tab" aria-controls="cohortData" aria-selected="false"><b>Clinical Data</b></a>
						</li>
						<div class="btn-group pull-right open" style="margin-right:10px; margin-top: 10px;">
				
							<button type="button" class="btn bg-navy btn-sm" style="margin-left:10px;" id="mainChartAdd"> 차트 추가 </button>
							<div class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="mainChartAdd" id="divmainChartAdd" style="width:600px; z-index:-1;"> 
						     	<div class="box-body">
						     		<nav class="navbar navbar-light navbar-background-color margin-top-10" >
										<div class="row" >
											<div class="col-lg-12">
												<div class="nav-tabs-custom">
													<ul class="nav nav-tabs" id="myTab">
														<li class="active">
															<a href="#subClinical" id="clinical-subtab" class="patientViewTab" pageNum="1" page="tabClinical" data-toggle="tab" aria-controls="subClinical" aria-selected="true"><b>Clinical</b></a>
														</li>
														<li>
															<a href="#subGenomic" id="genomic-subtab" class="patientViewTab" pageNum="2" page="tabGenomic" data-toggle="tab" aria-controls="subGenomic" aria-selected="false"><b>Genomic</b></a>
														</li>
														<li>
															<a href="#subETC" id="etc-tab" class="patientViewTab" pageNum="3" page="tabETC" data-toggle="tab"><b>ETC</b></a>
														</li>
														
													</ul>
													<div class="tab-content">
														<div class="tab-pane active" id="subClinical" role="tabpanel" aria-labelledby="clinical-subtab">
															
														</div>
														<div class="tab-pane" id="subGenomic" role="tabpanel" aria-labelledby="genomic-subtab">
															
														</div>
														<div class="tab-pane" id="subETC" role="tabpanel" aria-labelledby="etc-subtab">
															
														</div>	
													</div>
												</div>
											</div>	
										</div>
									</nav>
						     	</div>
						    </div>
						    
					    </div>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="cohortSummary" role="tabpanel" aria-labelledby="cohortSummary-tab">
							<jsp:include page="cohortAnalysisSummary.jsp" flush="true"></jsp:include>
						</div>
						<div class="tab-pane" id="cohortData" role="tabpanel" aria-labelledby="cohortData-tab">
							<jsp:include page="cohortAnalysisData.jsp" flush="true"></jsp:include>
						</div>		
					</div>
				</div>
			</div>			
		</div>
	</nav>
</section>

<script src="<c:url value="/js/plugins/plotly-latest-1.51.min.js" />"></script>
<script src="<c:url value="/js/cohort/cohortAnalysis.js" />"></script>

