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
		/* .dataTables_scrollHeadInner {width : 100% !important;}
		.dataTables_scrollHeadInner > table {width : 100% !important;} */

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
        height: inherit;
	}
	.box.pie{
		min-height: 100px;
		border: 1px solid #d3d3d3;
	    border-radius: 4px;
	    margin-bottom: 0px;
	    height: inherit;
	}
	.list {
		height : 380px;
	    width: 410px;
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
	}
	.list.pie{
	    /* font-size: 30px;*/
	    height : 188px;
	    width: 203px;
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
		display : inline-block;
		
	}
	.list.bar{
	    /* font-size: 30px;*/
	    height : 188px;
	    width: 410px;
	    text-align: center; 
	    cursor: pointer;
	    font-family: Geneva,Arial,Helvetica,sans-serif;
		margin : 2px;
	}
	.list.scatter , .list.grd {
	    /* font-size: 30px;*/
	    height : 380px;
	    width: 410px;
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
	.ui-sortable-helper : {
		/* display: none; */
	}
	.highlight {
	    background: #f4f4f4;
 		border: 1px dashed #401515;
 	  	height : 380px;
	    width: 410px;
	    margin-bottom: 2px;
	}
	
	.highlight.pie {
	    background: #f4f4f4;
 		border: 1px dashed #401515;
		height : 188px;
	    width: 203px;
	    margin : 2px;
	    display : inline-block;
	}
	
	.highlight.bar {
	    background: #f4f4f4;
 		border: 1px dashed #401515;
 	    height : 188px;
	    width: 410px;
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
    }
    .chart-body-bar {
    	padding : 1px;

    }
    .chart-body-grd {
    	padding : 1px;
    	
    }
    .and-group {
	    position: relative;
	    display: inline-block;
	    vertical-align: middle;
    }
	</style>
</head>
<body class="hold-transition skin-black sidebar-mini fixed" style="padding-right:0px !important; min-width: 1800px; overflow-x:auto;">
<div class="wrapper">
	<header class="main-header">
		<input type="hidden" id="pageType" value="index">
		<tiles:insertAttribute name="top"/>
	</header>

	<!-- Content Wrapper. Contains page content -->
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
				<%-- <c:choose>
					<c:when test="${SERVICE_STAT.CODE == '원활'}">
						<li>
							<small class="btn bg-olive btn-xs btn-flat">
								<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
							</small>
							${SERVICE_STAT.MESSAGE}
						</li>
					</c:when>
					<c:when test="${SERVICE_STAT.CODE == '보통'}">
						<li>
							<small class="btn bg-olive btn-xs btn-flat">
								<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
							</small>
							${SERVICE_STAT.MESSAGE}
						</li>
					</c:when>
					<c:when test="${SERVICE_STAT.CODE == '다소복잡'}">
						<li>
							<small class="btn bg-maroon btn-xs btn-flat">
								<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
							</small> 
							${SERVICE_STAT.MESSAGE}
						</li>
					</c:when>
					<c:otherwise>
						<li>
							<small class="btn bg-maroon btn-xs btn-flat">
								<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
							</small> 
							${SERVICE_STAT.MESSAGE}
						</li>
					</c:otherwise>
				</c:choose> --%>
			</ol>
		</section>

		<div class="row" id="stateBoxList">
			
		</div>
		<div class="box-body">
			<div class="btn-group pull-right open">
				
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
			</div>
		</section>
		
		<jsp:include page="asantab/summary.jsp" flush="true"></jsp:include>
		
<%-- 		<nav class="navbar navbar-light navbar-background-color margin-top-10" >
			<div class="row" >
				<div class="col-lg-12">
				
					<ul class="nav nav-tabs" id="myTab">
						<li class="active">
							<a href="#summary" id="summary-tab" class="patientViewTab" pageNum="1" page="tabSummary" data-toggle="tab" aria-controls="summary" aria-selected="true"><b>Summary</b></a>
						</li>
						<li>
							<a href="#clinical" id="clinical-tab" class="patientViewTab" pageNum="2" page="tabClinicalData" data-toggle="tab" aria-controls="clinical" aria-selected="false"><b>Clinical Data</b></a>
						</li>
						<li>
							<a href="#tab_3" id="3-tab" class="patientViewTab" pageNum="3" page="tabMutatedGenes" data-toggle="tab"><b>Mutated Genes</b></a>
						</li>
						<li>
							<a href="#tab_4" id="4-tab" class="patientViewTab" pageNum="4" page="tabCopyNumberAlterations" data-toggle="tab"><b>Copy Number Alterations</b></a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="summary" role="tabpanel" aria-labelledby="summary-tab">
							<jsp:include page="asantab/summary.jsp" flush="true"></jsp:include>
						</div>
						<div class="tab-pane" id="clinical" role="tabpanel" aria-labelledby="clinical-tab">
							<jsp:include page="asantab/clinicalData.jsp" flush="true"></jsp:include>
						</div>		
					</div>
				</div>
				<div class="row up-right-side-2" style="margin-right:10px;">
					<div class="col-12-lg">
						<button type="button" class="btn btn-default btn-sm" style="margin-left:10px;"> Groups </button>
						<button type="button" class="btn btn-primary btn-sm" style="margin-left:10px;"> A Button </button>
						<button type="button" class="btn btn-primary btn-sm" style="margin-left:10px;"> B Button </button>
					</div>
				</div>
				
				
			</div>
		</nav> --%>
		
		
		
		<!-- modal area -->
		<!-- board list -->
		<div class="modal fade bs-example-modal-lg" id="modalBoardList" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="modalBoardListLabel">
			<div class="modal-dialog modal-lg width-90p" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title" id="modalBoardListLabel"></h3>
					</div>
					<div class="modal-body">
		                <div class="row margin-bottom-10">
							<div class="col-lg-12">
				                <div class="row" id="boardArea">
				                	<div class="col-lg-12">
				                		<div class="box-tools">
											<div class="row">
												<div class="col-lg-2">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
															<option value="1">제목</option>
															<option value="2">작성자</option>
														</select>
													</div>
												</div>
												<div class="col-lg-3">
													<div class="input-group input-group-sm">
														<input type="text" name="table_search" class="form-control pull-right" placeholder="Search" id="searchVal">
														<div class="input-group-btn">
															<button class="btn btn-default" id="btnSearch"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
										</div>
					                	<div class="item dataTableDiv" id="boardDiv">
											<table id="gridBoardList" style="width:100%;" class="table table-bordered table-striped table-hover">
												<colgroup>
													<col width="10%" />
													<col width="50%" />
													<col width="15%" />
													<col width="15%" />
													<col width="10%" />
												</colgroup>
												<thead>
													<tr>
														<th class="text-center">#</th>
														<th class="text-center">제목</th>
														<th class="text-center">작성자</th>
														<th class="text-center">작성일</th>
														<th class="text-center">조회수</th>
													</tr>
												</thead>
												<tbody>
													<tr class="boardEmpty">
														<td scope="row" class="text-center" colspan="5">등록된 글이 없습니다.</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
				                </div>
			                </div>
		                </div>
					</div>
					<div class="modal-footer">
						<div style="position: absolute;left:-999px;">
								<input type="text" id="dashboardhidden" class="">
						</div>
						<button type="button" class="btn btn-default" id="btnCloseModalBoard" data-dismiss="modal">닫기</button>
						<button type="button" class="btn btn-success btnAuth" id="btnRegModalBoard" data-toggle="modal" data-target="#modalBoardModalReg" data-dismiss="modal">등록</button>
					</div>
				</div>
			</div>
		</div>
		<!-- ./board list -->
		
		
		<!-- board write -->
		<div class="modal fade bs-example-modal-lg" id="modalBoardModalReg" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="modalBoardModalRegLabel">
			<div class="modal-dialog modal-lg width-90p" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title" id="modalBoardModalRegLabel"></h3>
					</div>
					<div class="modal-body">
		                <div class="row margin-bottom-10">
							<div class="col-lg-12">
				                <div class="row" id="boardRegArea">
				                	<div class="col-lg-12">
				                		<form id="frmBoard" name="frmBoard" method="post" enctype="multipart/form-data">
											<input type="hidden" id="boardSeq" name="boardSeq" value="">
				                			<input type="hidden" id="vSEQ" name="vSEQ" value="">
							                <div class="row margin-bottom-10">
												<div class="col-lg-12">
									                <div class="form-group">
														<label class="col-sm-1 control-label padding-top-5">Title</label>
														<div class="col-sm-10">
															<input type="text" class="form-control" name="vBoardTitle" id="vBoardTitle">
														</div> 
									                </div>
								                </div>
							                </div>
							                <div class="row margin-bottom-10">
												<div class="col-lg-12">
									                <div class="form-group">
														<div class="col-sm-12">
															<textarea class="form-control" name="vBoardContent" id="vBoardContent" rows="10"></textarea>
														</div> 
									                </div>
								                </div>
							                </div>
							                <div class="row margin-bottom-10" id="fileUploadArea">
												<div class="col-lg-12">
									                <div class="form-group">
														<label class="col-sm-1 control-label padding-top-5">File</label>
														<div class="col-sm-10">
															<input type="file" class="form-control filename" name="filename1" id="filename">
															<!-- <input type="file" class="form-control filename" name="filename2"> name에 번호를 주면 다중 업로드 가능 -->
														</div>
									                </div>
								                </div>
							                </div>
				                		</form>
				                		<div class="row margin-bottom-10">
											<div class="col-lg-12">
								                <div class="form-group">
													<div class="col-sm-10 col-sm-offset-1 margin-top-10" id="fileArea"></div> 
								                </div>
							                </div>
						                </div>
									</div>
				                </div>
			                </div>
		                </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
						<button type="button" class="btn btn-warning btnListBoard" data-dismiss="modal">목록</button>
						<button type="button" class="btn btn-success" id="btnRegBoard">등록</button>
					</div>
				</div>
			</div>
		</div>
		<!-- ./board write -->
		
		<!-- board view -->
		<div class="modal fade bs-example-modal-lg" id="modalBoardModalView" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="modalBoardModalViewLabel">
			<div class="modal-dialog modal-lg width-90p" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title" id="bViewTitle"></h3>
					</div>
					<div class="modal-body">
						<form id="formFile" name="formFile" method="POST">
							<input type="hidden" name="path" value="" />
							<input type="hidden" name="SAVE_FILE_NAME" value="" />
							<input type="hidden" name="FILE_NAME" value="" />
						</form>
		                <div class="row margin-bottom-10">
							<div class="col-lg-12">
				                <div class="row" id="boardViewArea">
				                	<div class="col-lg-12 table-responsive">
				                		<table class="table table-bordered ho-table-border">
											<tr>
												<th class="font-size-20" id="bTitle" colspan="6"></th>
											</tr>
											<tr>
												<th width="10%">작성자</th>
												<td id="bWriter" width="30%"></td>
												<th width="10%">작성일</th>
												<td id="bDate" width="20%"></td>
												<th width="10%">조회수</th>
												<td id="bVisit" width="20%"></td>
											</tr>
											<tr>
												<th>File</th>
												<td id="bFile" colspan="5"></td>
											</tr>
											<tr>
												<td colspan="6">
													<div class="max-height-500" id="bContent" style="overflow:scroll; height:500px; padding:10px;"></div>
												</td>
											</tr>
										</table>
									</div>
				                </div>
			                </div>
		                </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btnClose" data-dismiss="modal">닫기</button>
						<button type="button" class="btn btn-warning btnListBoard" data-dismiss="modal">목록</button>
						<button type="button" class="btn btn-success btnAuth btnMyData" data-dismiss="modal" id="btnModBoard" data-toggle="modal" data-target="#modalBoardModalReg">수정</button>
						<button type="button" class="btn btn-danger btnAuth btnMyData" id="btnDelBoard">삭제</button>
					</div>
				</div>
			</div>
		</div>
		<!-- ./board view -->
		<!-- ./modal area -->
				
				
				
	</div>
	<!-- /.content-wrapper -->
	 <footer class="main-footer margin-left-0">
	 	<tiles:insertAttribute name="footer"/>
	</footer>
	<aside class="control-sidebar control-sidebar-dark" style="display: none;">
	    <!-- Create the tabs -->
	    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
	      <li class=""><a href="#control-sidebar-theme-demo-options-tab" data-toggle="tab" aria-expanded="false"><i class="fa fa-wrench"></i></a></li><li class=""><a href="#control-sidebar-home-tab" data-toggle="tab" aria-expanded="false"><i class="fa fa-home"></i></a></li>
	      <li class="active"><a href="#control-sidebar-settings-tab" data-toggle="tab" aria-expanded="true"><i class="fa fa-gears"></i></a></li>
	    </ul>
	    <!-- Tab panes -->
	    <div class="tab-content">
	      <!-- Home tab content -->
	      <div class="tab-pane" id="control-sidebar-home-tab"></div>

	      <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>

	      <div class="tab-pane active" id="control-sidebar-settings-tab">
	        
	      </div>
	      <!-- /.tab-pane -->
	    </div>
	  </aside>
	<!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
	<div class="control-sidebar-bg"></div>
	<tiles:insertAttribute name="modal"/>
</div>
<!-- ./wrapper -->
<script src="<c:url value="/js/plugins/plotly-latest-1.51.min.js" />"></script>
<!-- <script src="https://cdn.plot.ly/plotly-latest.min.js" /> -->
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-hierarchy.v1.min.js"></script>
<script src="<c:url value="/js/dashboard.js" />"></script>
</body>
</html>
