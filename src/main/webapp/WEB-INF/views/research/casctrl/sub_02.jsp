<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="row">
	<section class="col-lg-12">
		<!-- <div class="box collapsed-box"> -->
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">조회조건</h3>
				<div class="pull-right box-tools">
					<!-- <button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse"> -->
					<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			
			<div class="box-body">
				<div class="item dataTableDiv" id="patientSearchDiv">
					<table  width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
							id="gridSearch_02" cellspacing="0">
						<colgroup>
							<col style="width:3%;"></col>
							<col style="width:8%;"></col>
							<col style="width:8%;"></col>
							<col style="width:8%;"></col>
							<col style="width:8%;"></col>
							<col style="width:35%;"></col>
							<col style="width:18%;"></col>
							<col style="width:10%;"></col>
							<col style="width:4%;"></col>
							<col style="width:4%;"></col>
							<col style="width:3%;"></col>
						</colgroup>
						<thead>
							<tr>
								<th class="text-center">그룹</th>
								<th class="text-center">And/Or</th>
								<th class="text-center">대분류</th>
								<th class="text-center">중분류</th>
								<th class="text-center">항목명</th>
								<th class="text-center">조건</th>
								<th class="text-center">대상</th>
								<th class="text-center">포함</th>
								<th class="text-center">기준일</th>
								<th class="text-center">최초</th>
								<th class="text-center">삭제</th>
							</tr>
						</thead>
					</table>
				</div>
				<!-- /.item -->
				
				<div class="row">
					<div class="col-lg-12" style="text-align:left">
						<div id="" style="">
							<h5 class="box-title" style="font-weight:bold;">
								▷ 사례군 정의
							</h5>
							
							<table 	width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
								id="gridCaseGroup_02" cellspacing="0">
								<colgroup>
									<col style="width:3%;"></col>
									<col style="width:8%;"></col>
									<col style="width:8%;"></col>
									<col style="width:8%;"></col>
									<col style="width:8%;"></col>
									<col style="width:35%;"></col>
									<col style="width:18%;"></col>
									<col style="width:10%;"></col>
									<col style="width:4%;"></col>
								</colgroup>
								<thead>
									<tr>
										<th class="text-center">그룹</th>
										<th class="text-center">And/Or</th>
										<th class="text-center">대분류</th>
										<th class="text-center">중분류</th>
										<th class="text-center">항목명</th>
										<th class="text-center">조건</th>
										<th class="text-center">대상</th>
										<th class="text-center">포함</th>
										<th class="text-center">삭제</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-lg-12" style="text-align:left">
						<div id="" >
							<h5 class="box-title" style="font-weight:bold;">
								▷ 대조군 정의
							</h5>
							<table 	width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
									id="gridControlGroup_02" cellspacing="0">
								<colgroup>
									<col style="width:3%;"></col>
									<col style="width:8%;"></col>
									<col style="width:8%;"></col>
									<col style="width:8%;"></col>
									<col style="width:8%;"></col>
									<col style="width:35%;"></col>
									<col style="width:18%;"></col>
									<col style="width:10%;"></col>
									<col style="width:4%;"></col>
								</colgroup>
								<thead>
									<tr>
										<th class="text-center">그룹</th>
										<th class="text-center">And/Or</th>
										<th class="text-center">대분류</th>
										<th class="text-center">중분류</th>
										<th class="text-center">항목명</th>
										<th class="text-center">조건</th>
										<th class="text-center">대상</th>
										<th class="text-center">포함</th>
										<th class="text-center">삭제</th>
									</tr>
								</thead>
							</table>
						</div>
						<div id="jqxGridPeriod_01" style="display:none;"></div>
						
					</div>
				</div>
				
			</div>
		</div>
	</section>
</div>


<div class="row">
	<section class="col-lg-12">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">연구항목</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" 
							data-widget="collapse" 
							data-toggle="tooltip" 
							title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			<div class="box-body">
				<div class="item" id="">
					<!-- class="table table-bordered table-striped"  -->
					<!-- <table id="gridSearch" class="table table-bordered table-striped text-align-center font-size-14"> -->
					<!-- <table width="100%" id="gridSearch" class="table table-bordered table-striped text-align-center font-size-14"> -->
					<table width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
						id="gridStudyItem" cellspacing="0">
						<colgroup>
							<col style="width:5%;"></col>
							<col style="width:10%;"></col>
							<col style="width:10%;"></col>
							<col style="width:10%;"></col>
							<col style="width:35%;"></col>
							<col style="width:25%;"></col>
							<col style="width:5%;"></col>
						</colgroup>
						<thead>
							<tr>
								<th class="text-center">그룹</th>
								<th class="text-center">대분류</th>
								<th class="text-center">중분류</th>
								<th class="text-center">항목명</th>
								<th class="text-center">조건</th>
								<th class="text-center">기준</th>
								<th class="text-center">삭제</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</section>
</div>

<div class="row margin-bottom-10">
	<div class="col-lg-6" style="text-align:left">
		<button type="button" id="btnInitGroupStudyItem" class="btn btn-warning btn-sm">그룹 초기화</button>
		<button type="button" id="btnInitStudyItem" class="btn btn-danger btn-sm">초기화</button>
	</div>
	
	<div class="col-lg-6" style="text-align:right">
		<button type="button" id="btnStudyItemModal" class="btn btn-success btn-sm">연구항목 저장</button>
		<button type="button" id="btnSearch_Tab02" class="btn btn-primary btn-sm">조회</button>
	</div>
</div>


<div class="row" id="sub02DataArea">
	<section class="col-lg-12">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">
					연구항목 대상
					<label id="lblResultInfo_02" style="margin-left:10px;"></label>
				</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" 
							data-widget="collapse" 
							data-toggle="tooltip" 
							title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
					<button type="button" class="btn btn-danger btn-xs pull-right" id="btnVisualization3" title="" style="margin-right: 5px;">시각화</button>					
					
					<!-- <button type="button" class="btn btn-danger btn-xs pull-right" id="btnVisualization" title="" style="margin-right: 5px;">Tableau 시각화</button>
					<button type="button" class="btn btn-danger btn-xs pull-right" id="btnVisualization2" title="" style="margin-right: 5px;">시각화</button>
					<button type="button" class="btn btn-primary btn-xs pull-right" id="btnAnalysis" title="" style="margin-right: 5px;">기초분석</button> -->
					<button type="button" class='btn btn-warning btn-xs pull-right margin-right-5' id="btnAutoColumns_02" tabNum='0'>열맞춤</button>
					<button type="button" class='btn btn-info btn-xs pull-right margin-right-5' id="btnWidthColumns_02" tabNum='0'>열너비 설정</button>
				</div>
			</div>
			<div class="box-body">
				<c:if test="${SEARCH_YN == 'Y' }">
					<jsp:include page="../searchForm.jsp"></jsp:include>
				</c:if>
				
				
				<ul class="nav nav-tabs" id="tabResult_02">
				</ul>
				
				<div class="tab-content" id="jqxGridResultWrap_02" style="margin:10px;">
				</div>
			</div>
			
			<div class="box-footer">
				<button type="button" class="btn btn-success btn-sm pull-right" id="btnSaveData">
					데이터 저장
				</button>
			</div>
		</div>
	</section>
</div>
<!-- end theme-panel -->
<!-- end #content -->




<!-- Modal -->

<!-- modal popup -->
<div class="modal fade" id="studyItemModal" tabindex="-1" role="dialog" aria-labelledby="studyItemModal">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog vertical-align-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">연구항목 저장</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" onsubmit="return false;" id="frmSearchCondition_cc02-1">
						<div class="form-group ">
							<div class="col-md-12" style="text-align: right">
								
								
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoSaveStudyItem" id="rdoNewSaveSi" value="C" class="minimal rdoSaveStudyItem" checked>
									&nbsp;새 이름으로 저장
								</label>
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoSaveStudyItem" id="rdoSaveSi" value="U" class="minimal rdoSaveStudyItem">
									&nbsp;저장
								</label>
								
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">연구이름</label>
							<div class="col-md-10">
								<input type="text" class="form-control" name="CONDT_NM" id="txtCONDT_NM_STUDY_ITEM" onkeydown="OnlyInput(event)" placeholder="${PER_NAME}의 검색조건">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" id="btnSaveStudyItem" class="btn btn-primary btn-sm">저장</button>
					<button type="button" id="btnCloseStudyItem" class="btn btn-default btn-sm" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
</div>



<div class="modal fade" id="studyItemTargetModal" tabindex="-1" role="dialog" aria-labelledby="studyItemTargetModal">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog vertical-align-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">
						연구항목 검색결과 저장
					</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" onsubmit="return false;" id="frmSearchCondition_cc02-2">
						<div class="form-group">
							<label class="col-md-2 control-label">연구이름</label>
							<div class="col-md-10">
								<input type="text" class="form-control" name="txtDATA_NM" id="txtDATA_NM"  onkeydown="OnlyInput(event)" placeholder="${PER_NAME}의 데이터">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" id="btnSaveStudyItemTarget" class="btn btn-primary btn-sm">저장</button>
					<button type="button" id="btnCloseStudyItemTarget" class="btn btn-default btn-sm" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
</div>



<div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1>Processing...</h1>
      </div>
      <div class="modal-body">
        <div class="progress">
          <div 	class="progress-bar progress-bar-success progress-bar-striped" 
          		role="progressbar" 
          		aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
            <span class="sr-only">40% Complete (success)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<script src="<c:url value="/js/page/research/casctrl/sub_02.js" />"></script>
