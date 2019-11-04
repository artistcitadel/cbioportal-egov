<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		승인요청 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">승인요청 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-6">					
			<div class="box">
				<div class="box-header">
					<h3 class="box-title">승인요청현황</h3>
				</div>
				<div class="box-body" style="min-height:470px;">
					<!-- item -->
					<div class="item">
						<label class="font-weight-100 margin-bottom-10">
							<input type="checkbox" class="minimal approveNonChk"> 미승인 내역 만 보기
						</label>
						<div id="gridRequestListArea">
							<table width="100%" class="table table-bordered table-striped" id="gridRequestList" cellspacing="0">
								<thead>
									<tr>
										<th class="text-center">연구과제</th>
										<th class="text-center">요청일자</th>
										<th class="text-center">요청자</th>
										<th class="text-center">승인자</th>
										<th class="text-center">승인여부</th>
										<th class="text-center">승인/반려일자</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<!-- /.item -->
				</div>
			</div>
		</section>
		<section class="col-lg-6">					
			<div class="box">
				<div class="box-header">
					<h3 class="box-title">승인요청 확인 및 승인</h3>
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item">
						<input type="hidden" id="seq">
						<input type="hidden" id="CONT_SEQ">
						<input type="hidden" id="DATA_SEQ">
						<input type="hidden" id="USER_PER_CODE">
						<b><요청내용></b>
						<table width="100%" class="table table-bordered table-striped text-align-center" id="" cellspacing="0">
							<colgroup>
								<col width="30%" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<td>구분</td>
									<td id="approveDivision"></td>
								</tr>
								<tr>
									<td>조건명 > 데이터명</td>
									<td><span id="approveName"></span> <span id="approveAnd"></span> <span id="approveDataName"></span></td>
								</tr>
								<tr>
									<td>요청자</td>
									<td id="approveRequestNm"></td>
								</tr>
								<tr>
									<td>소속</td>
									<td id="approveGroup"></td>
								</tr>
								<tr>
									<td>요청일시</td>
									<td id="approveRequestDate"></td>
								</tr>
								<tr>
									<td>추출목적</td>
									<td id="approveRequestPurpose"></td>
								</tr>
							</tbody>
						</table>
						
						<b><심사결과></b>
						<table width="100%" class="table table-bordered table-striped" id="" cellspacing="0">
							<colgroup>
								<col width="30%" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<td class="text-align-center">심사결과</td>
									<td>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="approveType" value="Y" class="minimal approveChk" checked="" style="position: absolute; opacity: 0;">
											&nbsp;승인
										</label>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="approveType" value="N" class="minimal approveChk" style="position: absolute; opacity: 0;">
											&nbsp;거부
										</label>
									</td>
								</tr>
								<tr>
									<td class="text-align-center">사유</td>
									<td>
										<input type="text" class="form-control" id="approveReason" name="approveReason" placeholder="사유" style="height:25px;" disabled>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<button class="btn btn-flat btn-success pull-right btn-sm" id="btnApprove">완료</button>
				</div>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<div class="row">
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<h3 class="box-title">연구데이터</h3>
					<button type="button" class='btn btn-warning btn-xs pull-right margin-left-5' id="btnAutoColumns" tabNum='0'>열맞춤</button>
					<button class="btn btn-danger btnApproveSearch btn-xs pull-right margin-left-5" num="" data-toggle="modal" id="btnApproveSearch">검색</button>
		<!--		<button type="button" class='btn btn-danger btn-xs pull-right margin-left-5' id="btnSearchColumns">검색</button>  -->	
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item">
						<ul class="nav nav-tabs" id="tabResult">
						</ul>
						<div class="tab-content" id="jqxGridResultWrap" style="margin:10px;">
						</div>
					</div>
					<!-- /.item -->
				</div>
			</div>
		</section>
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->


<!-- 모달영역 -->
<!-- 게시판 등록/수정 -->										
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalApproveSearch" tabindex="-1" role="dialog" aria-labelledby="modalApproveSearchLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" id="modalApproveClose" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalApproveSearchLabel">정규식 검색</h4>
			</div>
			<div class="modal-body">
				<div class="box">
					<div class="box-body">
						<div class="row">
							<div class="col-xs-6">
								<div class="col-xs-3" style="text-align:center;">
									<h5 style="font-weight:bold;"> 컬럼 : </h5>
								</div>						
								<div class="col-xs-8">
									<select class="form-control pull-right" id="ColumnSearch" style="width:100%;">
										
									</select>
								</div>
							</div>
							
							<div class="col-xs-6">
								<div class="input-group">
									<div class="col-xs-8" style="padding-right:0px;">
									<input type="text" class="form-control pull-left " id="RegexSearch" name="RegexSearch" placeholder="정규식 검색" style="width:100%;">
									</div>
									<div class="col-xs-2" style="padding-right:0px; padding-left:0px; " >
									<input type="text" class="form-control pull-left" id="RegexSearchtxt" name="RegexSearchtxt" onkeyup="this.value=AprvRegexp_filter(this.value);" maxlength="4" style="width:100%;"  value="im">
									</div>
									<button class="btn btn-default pull-left" id="btnRegexSearch" style="padding-top:5px; padding-bottom:5px;"><i class="fa fa-search"></i></button>			
									<button type="button" class="btn btn-xs btn-primary pull-right" id="btnRegExpHelp"><i class="fa fa-info-circle" aria-hidden="true"></i></button>
									
									<input type="hidden" id="RegexColumnType" name="RegexColumnType">
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="row">
					 				<div id="gridRegexSearch"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				
			</div>
		</div>
	</div>
</div>
<script src="<c:url value="/js/admin/approveMgmt.js" />"></script>
