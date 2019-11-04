<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<section class="content-header">
	<h1>
		승인요청
		<small>Approve request</small>
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 연구</a></li>
		<li class="active">승인요청</li>
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
								<colgroup>
									<col style="width:10%;"></col>
									<col style="width:20%;"></col>
									<col style="width:20%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:5%;"></col>
								</colgroup>
								<thead>
									<tr>
										<th class="text-center">연구구분</th>
										<th class="text-center">조건명</th>
										<th class="text-center">데이터명</th>
										<th class="text-center">저장일</th>
										<th class="text-center">추출목적</th>
										<th class="text-center">승인요청</th>
										<th class="text-center">삭제</th>
									</tr>
								</thead>
								<thead>
									<tr>
										<th class="text-center gridMySaveListInput">연구구분</th>
										<th class="text-center gridMySaveListInput">조건명</th>
										<th class="text-center gridMySaveListInput">데이터명</th>
										<th class="text-center gridMySaveListInput">저장일</th>
										<th class="text-center"></th>
										<th class="text-center"></th>
										<th class="text-center"></th>
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
							<h3 class="box-title">승인요청/조회</h3>
							<div class="pull-right box-tools">
								<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
								<i class="fa fa-minus"></i></button>
							</div>
						</div>
						<div class="box-body">
							<table width="100%" class="table table-bordered table-striped" id="gridRequestList" cellspacing="0">
								<colgroup>
									<col style="width:10%;"></col>
									<col style="width:20%;"></col>
									<col style="width:20%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:5%;"></col>
								</colgroup>
								<thead>
									<tr>
										<th class="text-center">연구구분</th>
										<th class="text-center">조건명</th>
										<th class="text-center">데이터명</th>
										<th class="text-center">요청일</th>
										<th class="text-center">승인자</th>
										<th class="text-center">승인여부</th>
										<th class="text-center">승인/반려일자</th>
										<th class="text-center">삭제</th>
									</tr>
								</thead>
								<thead>
									<tr>
										<th class="text-center gridRequestListInput">연구구분</th>
										<th class="text-center gridRequestListInput">조건명</th>
										<th class="text-center gridRequestListInput">데이터명</th>
										<th class="text-center gridRequestListInput">요청일</th>
										<th class="text-center gridRequestListInput">승인자</th>
										<th class="text-center gridRequestListInput">승인여부</th>
										<th class="text-center gridRequestListInput">승인/반려일자</th>
										<th class="text-center"></th>
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
							<h3 class="box-title">연구항목 데이터</h3>
							<div class="pull-right box-tools">
								<button type="button" class="btn btn-default btn-xs pull-right margin-left-5" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
								<i class="fa fa-minus"></i></button>
								<button type="button" class='btn btn-warning btn-xs pull-right margin-left-5' id="btnAutoColumns" tabNum='0'>열맞춤</button>
								<button type="button" class='btn btn-info btn-xs pull-right margin-left-5 display-none' id="btnSearchView" tabNum='0'>조건확인</button>
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
<script src="<c:url value="/js/page/research/researchCommon.js" />"></script>
<script src="<c:url value="/js/page/research/approve/approve.js" />"></script>