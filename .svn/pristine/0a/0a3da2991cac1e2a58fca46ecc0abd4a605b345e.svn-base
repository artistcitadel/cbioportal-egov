<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<section class="content-header">
	<h1>
		Chart Review
		<!-- <small>Chart review</small> -->
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 연구</a></li>
		<li class="active">Chart Review</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="row">
				<section class="col-lg-12">
					<div class="box">
						<div class="box-header">
							<i class="fa fa-comments-o"></i>
							<h3 class="box-title">개인조건 + 데이터</h3>
							<div class="pull-right box-tools">
								<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
								<i class="fa fa-minus"></i></button>
							</div>
						</div>
						<div class="box-body">
							<table width="100%" class="table table-bordered table-striped" id="gridMySaveList" cellspacing="0">
								<thead>
									<tr>
										<th class="text-center">연구구분</th>
										<th class="text-center">조건명</th>
										<th class="text-center">데이터명</th>
										<th class="text-center">등록일</th>
									</tr>
								</thead>
								<thead>
									<tr>
										<th class="text-center gridMySaveListInput">연구구분</th>
										<th class="text-center gridMySaveListInput">조건명</th>
										<th class="text-center gridMySaveListInput">데이터명</th>
										<th class="text-center gridMySaveListInput">등록일</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</section>
			</div>
			<div class="row">
				<section class="col-lg-12">
					<div class="box">
						<div class="box-header">
							<i class="fa fa-comments-o"></i>
							<h3 class="box-title">Chart Review 대상</h3>
							<div class="pull-right box-tools">
								<button type="button" class="btn btn-default btn-xs pull-right margin-left-5" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
								<i class="fa fa-minus"></i></button>
								<button type="button" class="btn btn-danger btn-xs pull-right margin-left-5" data-toggle="modal" data-target="#modalColumnDel">
								입력항목삭제</button>
								<button type="button" class="btn btn-primary btn-xs pull-right margin-left-5" data-toggle="modal" data-target="#modalColumnAdd">
								입력항목추가</button>

								<button type="button" class='btn btn-warning btn-xs pull-right margin-left-5' id="btnAutoColumns" tabNum='0'>열맞춤</button>
								<button type="button" class='btn btn-info btn-xs pull-right margin-left-5 display-none' id="btnSearchView" tabNum='0'>조건확인</button>
								<c:if test="${SITE_CODE == 'UUH'}"> 
								<button type="button" class='btn btn-success btn-xs pull-right margin-left-5' id="btnChartDownload">뷰어수동설치</button>
								</c:if>
							</div>
						</div>
						<div class="box-body">
							<ul class="nav nav-tabs" id="tabResult">
							</ul>
							<div class="tab-content" id="jqxGridResultWrap" style="margin:10px;">
							</div>
						</div>
					</div>
				</section>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->


<!-- 페이지용 js -->
<script src="<c:url value="/js/page/research/chartReview/chartReview.js" />"></script>






<!-- 모달영역 -->
<!-- 입력항목 추가 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalColumnAdd" tabindex="-1" role="dialog" aria-labelledby="modalColumnAddLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalColumnAddLabel">입력항목 추가</h4>
			</div>
			<div class="modal-body">
		        <input type="hidden" id="DATA_SEQ" name="DATA_SEQ" >
				<!-- <div class="row">
					<div class="col-lg-12 height-40">
		                <div class="form-group">
							<label class="col-sm-4 control-label padding-top-5">DB용 컬럼명</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" name="vColumnDB" id="vColumnDB">
							</div> 
		                </div>
	                </div>
                </div> -->
                <div class="row">
					<div class="col-lg-12 height-40">
		                <div class="form-group">
							<label class="col-sm-4 control-label padding-top-5">테이블용 컬럼명</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" name="vColumnTable" id="vColumnTable">
							</div> 
		                </div>
	                </div>
                </div>
                <div class="row">
					<div class="col-lg-12 height-40">
		                <div class="form-group">
							<label class="col-sm-4 control-label padding-top-5">타입</label>
							<div class="col-sm-8">
								<select class="form-control" name="vColumnType" id="vColumnType">
									<option value="varchar(65000)">문자</option>
									<option value="Int">숫자</option>
								</select>
							</div> 
		                </div>
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-success" id="btnColumnAdd">저장</button>
			</div>
		</div>
	</div>
</div>

<!-- 입력항목 삭제 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalColumnDel" tabindex="-1" role="dialog" aria-labelledby="modalColumnDelLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalColumnDelLabel">입력항목 삭제</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<input type="hidden" id="vTable_id" value="">
					<div class="col-lg-12" id="editColumnArea">
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-success" id="btnColumnDel">저장</button>
			</div>
		</div>
	</div>
</div>