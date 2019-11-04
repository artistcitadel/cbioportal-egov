<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<section class="content-header">
	<h1>
		Data Download
		<!-- <small>Chart review</small> -->
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 연구</a></li>
		<li class="active">Data Download</li>
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
							<h3 class="box-title">승인목록</h3>
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
										<th class="text-center">요청일자</th>
										<th class="text-center">승인자</th>
										<th class="text-center">승인일자</th>
									</tr>
								</thead>
								<thead>
									<tr>
										<th class="text-center gridMySaveListInput">연구구분</th>
										<th class="text-center gridMySaveListInput">조건명</th>
										<th class="text-center gridMySaveListInput">데이터명</th>
										<th class="text-center gridMySaveListInput">요청일자</th>
										<th class="text-center gridMySaveListInput">승인자</th>
										<th class="text-center gridMySaveListInput">승인일자</th>
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
							<h3 class="box-title">Data Download</h3>
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
<!-- 모달영역 -->
<!-- 게시판 등록/수정 -->										
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalDataDownload" tabindex="-1" role="dialog" aria-labelledby="modalDataDownloadLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalDataDownloadLabel">Data Download</h4>
			</div>
			<div class="modal-body">
			
					<div class="box-body">
						<div class="row">
							<div class="col-xs-12" style="line-height:2.5; font-size:18px;">
									 임상데이터웨어하우스(CDW)를 이용하면서  <br /> 
									제공받은 임상자료를 통해 <span style="font-weight:bold; font-size:22px; color:red;">개인정보 유출, 침해</span>가 일어날 경우 <br /> 
									모든 책임은 <span style="font-weight:bold; font-size:22px; color:red;">사용자 본인(ID)</span>에게 있음을 알려드립니다.
							</div>
						</div>
					</div>
			
			</div>
			<div class="modal-footer">
				<div class="row">
					<div class="col-xs-12">
						<button type="button" class="btn btn-primary pull-right" id="btnDataDownload">엑셀 다운로드</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 페이지용 js -->
<script src="<c:url value="/js/page/research/dataDownload/dataDownload.js" />"></script>




