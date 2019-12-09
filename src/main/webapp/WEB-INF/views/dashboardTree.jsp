<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<!-- 페이지용 js -->
	
	<style>
		#treeTooltip {
			position : absolute;
			height : auto;
			padding : 10px;
			background-color : white;
			
		}
		.treehidden{
			display : none;
		}

		.treetooltip {
             position: absolute;
             text-align: center;
             height: auto;
             padding: 8px;
             font: 10px sans-serif;
             background: white;
             border: solid 1px #aaa;
             border-radius: 2px;
             pointer-events: none;
         }
		
	</style>
	<script>
	
	</script>
</head>
<body class="hold-transition skin-black sidebar-mini fixed" style="padding-right:0px !important; min-width: 1800px; overflow-x:auto;">
<div class="wrapper">
	<header class="main-header">
		<input type="hidden" id="pageType" value="index">
		<tiles:insertAttribute name="top"/>
	</header>
	
	<!-- Content Wrapper. Contains page content -->
	<div class="row">
		<div class="col-lg-12">
		
			<div class="content-wrapper margin-left-0" data-toggle="control-sidebar" style="padding-left: 40px; padding-right: 40px;">
				<!-- Content Header (Page header) -->
						<section class="content-header">
							<h1 style="margin-bottom:15px;     font-weight: bold;">
								<i class="ion ion-ios-speedometer-outline"></i>&nbsp;
								<spring:message code="dashboard.summary.title_kor" />
							</h1>
							<!--  -->
							<ol class="breadcrumb">
								<li>
									<small class="label bg-olive btn-flat">
										${SERVICE_STAT.CODE}
									</small>
									${SERVICE_STAT.MESSAGE}
								</li>
								
						</section>
						
			     		<nav class="navbar navbar-light navbar-background-color margin-top-10" style="margin-bottom: 0px;">
							<div class="row" >
								<div class="col-lg-10" style="padding-right:15px;padding-left:0;">
									<div class="nav-tabs-custom">
										<ul class="nav nav-tabs" id="myTab">
											<li class="active">
												<a href="#subNewCohort" id="newcohort-subtab" class="patientViewTab" pageNum="1" page="tabNewCohort" data-toggle="tab" aria-controls="subNewCohort" aria-selected="true"><b>New Cohort(by Cancer)</b></a>
											</li>
											<li>
												<a href="#subNewCohortbyPatno" id="newcohortbypatno-subtab" class="patientViewTab" pageNum="2" page="tabNewCohortbyPatno" data-toggle="tab" aria-controls="subNewCohortbyPatno" aria-selected="false"><b>New Cohort(by Patient)</b></a>
											</li>
											<li>
												<a href="#subMyCohort" id="mycohort-tab" class="patientViewTab" pageNum="3" page="tabMyCohort" data-toggle="tab"><b>My Cohort</b></a>
											</li>
											
											<div class="btn-group pull-right" style="margin-right:10px; margin-top: 10px;">
												<button type="button" class="btn btn-default btn-sm" style="margin-left:10px;"><a href="<c:url value="/cohort/cohortAnalysis" />">Cohort Analysis </a> </button>
												<button type="button" class="btn btn-primary btn-sm" style="margin-left:10px;"><a href="<c:url value="/dashboard/main2" />"> Patient View </a> </button>
												<button type="button" class="btn btn-primary btn-sm" style="margin-left:10px;" id="btnMutationViewMove"> Mutation View </button>
											</div>
		
										</ul>
										<div class="tab-content">
											<div class="tab-pane active" id="subNewCohort" role="tabpanel" aria-labelledby="newcohort-subtab">
												<div class="col-lg-12" style="z-index:1; height: 30px;">
													<div class="form-group pull-right">
														<input type="range" class="custom-range" id="customRange1" min="25" max="100" value="50">
														<label class="pull-right" id="rangeScaleVal">100%</label>
													</div>
												</div>
												<div class="box" style="background:#f9f9f9;">
													<div class="box-body cancer-tree"></div>
												</div>
											</div>
											<div class="tab-pane" id="subNewCohortbyPatno" role="tabpanel" aria-labelledby="newcohortbypatno-subtab">
												<div class="box" style="background:#f9f9f9;">
													<div class="box-body">
														<div class="form-group pull-right">
										                  <div class="btn-group">
										                    <label>
										                      <input type="radio" name="patnoRadios" id="optionsRadiosA" value="patnoA" checked="">
										                      	진료용 환자
										                    </label>
										                  </div>
										                  <div class="btn-group">
										                    <label>
										                      <input type="radio" name="patnoRadios" id="optionsRadiosb" value="patnoB">
										                      	연구용 환자
										                    </label>
										                  </div>
										                </div>
														<div class="form-group">
										                  <label><i class="fa fa-circle-o text-aqua"></i> 입력 (숫자,|/)</label>
										                  <textarea class="form-control" id="txtareaPatnoResultCheck" rows="3" style="min-height: 300px;"
										                   placeholder="환자번호를 입력하세요. &#13;&#10 ex) &#13;&#10 1234567890,0987654321 &#13;&#10 1234567890/0987654321 &#13;&#10 1234567890|0987654321"></textarea>
										                </div>
										                <div class="form-group">
										                  <label><i class="fa fa-circle-o text-red"></i> 결과 </label>
										                  <div id="divPatnoResult" style="height:300px; background:white; border: 1px solid #ccc; overflow-y:auto;"></div>
										                </div>
										                <button type="button" class="btn btn-default btn-sm" style="" id="btnPatnoResultCheck"> Check </button>
													</div>
													
												</div>
											</div>
											<div class="tab-pane" id="subMyCohort" role="tabpanel" aria-labelledby="mycohort-subtab">
												<div class="" id="jqxCohortList" style="text-align: left; overflow-y: auto; max-height:760px;">
												</div>
											</div>	
										</div>
									</div>
								</div>	
								<div class="col-lg-2" style="padding:0px;">
									<div class="box">
										<div class="box-body">
											<div id="mainPatientbarChart" style="max-height:600px; overflow-y: auto;"></div>
											<div id="mainPatientpieChart" style=""></div>
										</div>
									</div>
								</div>
							</div>
						</nav>
				
			</div>
			
		</div>
	</div>
	<!-- /.content-wrapper -->
	 <footer class="main-footer margin-left-0">
	 	<tiles:insertAttribute name="footer"/>
	</footer>
	
</div>
<!-- ./wrapper -->
<script src="<c:url value="/js/plugins/plotly-latest-1.51.min.js" />"></script>
<!-- <script src="https://cdn.plot.ly/plotly-latest.min.js" /> -->
<!-- <script type="text/javascript" src="https://mbostock.github.com/d3/d3.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script> -->
<script src="https://d3js.org/d3.v5.js"></script>
<script src="https://d3js.org/d3-hierarchy.v1.min.js"></script>
<!-- <script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script> -->
<script src="<c:url value="/js/dashboardTree.js" />"></script>
</body>
</html>
