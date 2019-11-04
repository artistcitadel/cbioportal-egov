<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<!-- 페이지용 js -->
	<script src="<c:url value="/js/index.js" />"></script>
</head>
<body class="hold-transition skin-black sidebar-mini fixed">
<div class="wrapper">
	<header class="main-header">
		<input type="hidden" id="pageType" value="index">
		<tiles:insertAttribute name="top"/>
	</header>

	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper margin-left-0">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
				<i class="ion ion-ios-speedometer-outline"></i>&nbsp;
				연구현황
				<small>Research Dashboard</small>
			</h1>
			<ol class="breadcrumb">
				<li><small class="btn bg-olive btn-xs btn-flat"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></small><small class="btn bg-maroon btn-xs btn-flat"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></small> 서비스 원활 (기준일시:2017-03-22 :10:00:00)</li>
			</ol>
		</section>
		<!-- Main content -->
		<section class="content">
			<!-- Small boxes (Stat box) -->
			<div class="row">
				<div class="col-lg-3 col-xs-6">
					<!-- small box -->
					<div class="widget widget-stats bg-green">
						<div class="stats-icon stats-icon-lg icon">
							<i class="fa fa-bed" aria-hidden="true"></i>
						</div>
						<div class="stats-title">연구대상 환자</div>
						<div class="stats-number">
							1,062,498
						</div>
						<div class="stats-progress progress">
							<div class="progress-bar" style="width: 101.0%;"></div>
						</div>
						<div class="stats-desc">Bigger than yesterday (101 Patients)</div>
					</div>
				</div>
				<!-- ./col -->
				<div class="col-lg-3 col-xs-6">
					<div class="widget widget-stats bg-blue">
						<div class="stats-icon stats-icon-lg icon">
							<i class="fa fa-stethoscope" aria-hidden="true"></i>
						</div>
						<div class="stats-title">연구대상 진단</div>
						<div class="stats-number">
							11,994,822
						</div>
						<div class="stats-progress progress">
							<div class="progress-bar" style="width: 3960.0%;"></div>
						</div>
						<div class="stats-desc">Bigger than yesterday (3,960 Diagnoses)</div>
					</div>
				</div>
				<!-- ./col -->
				<div class="col-lg-3 col-xs-6">
					<div class="widget widget-stats bg-purple">
						<div class="stats-icon stats-icon-lg icon">
							<i class="ion ion-android-bulb" aria-hidden="true"></i>
						</div>
						<div class="stats-title">연구대상 처방</div>
						<div class="stats-number">
							180,891,601
						</div>
						<div class="stats-progress progress">
							<div class="progress-bar" style="width: 66229.0%;"></div>
						</div>
						<div class="stats-desc">Bigger than yesterday (66,229 Orders)</div>
					</div>
				</div>
				<!-- ./col -->
				<div class="col-lg-3 col-xs-6">
					<div class="widget widget-stats bg-black">
						<div class="stats-icon stats-icon-lg icon">
							<i class="ion ion-clipboard"></i>
						</div>
						<div class="stats-title">연구대상 의무기록</div>
						<div class="stats-number">
							356,731,499
						</div>
						<div class="stats-progress progress">
							<div class="progress-bar" style="width: 226022.0%;"></div>
						</div>
						<div class="stats-desc">Bigger than yesterday (226,022 Records)</div>
					</div>
				</div>
				<!-- ./col -->
			</div>
			<!-- /.row -->
			<!-- Main row -->
			<div class="row">
				<section class="col-lg-6">
					<!-- 연구진행 현황 box -->
					<div class="box">
						<div class="box-header">
							<i class="ion ion-search"></i>
							<h3 class="box-title">연구진행 현황</h3>
						</div>
						<div class="box-body min-height-340">
							<!-- chart item -->
							<div class="item" id="chart1"></div>
							<!-- /.item -->
						</div>
					</div>
					<!-- /.box (연구진행 현황 box) -->
				</section>
				<section class="col-lg-6">
					<!-- 암레지스트리 등록환자 현황 box -->
					<div class="box">
						<div class="box-header">
							<i class="ion ion-search"></i>
							<h3 class="box-title">암레지스트리 등록환자 현황</h3>
						</div>
						<div class="box-body min-height-340">
							<!-- chat item -->
							<div class="item" id="chart2"></div>
							<!-- /.item -->
						</div>
					</div>
					<!-- /.box (암레지스트리 등록환자 현황 box) -->
				</section>
			</div>
			<div class="row">
				<section class="col-lg-12">
					<!-- 나의 연구활동 box -->
					<div class="box">
						<div class="box-header">
							<i class="ion ion-university"></i>
							<h3 class="box-title">나의 연구활동</h3>
						</div>
						<div class="box-body min-height-340">
							<!-- grid item -->
							<div class="item" id="jqxgrid"></div>
							<!-- /.grid item -->
						</div>
					</div>
					<!-- /.box (나의 연구활동 box) -->
				</section>
			</div>
			<div class="row">
				<section class="col-lg-6">
					<!-- 공지사항 box -->
					<div class="box">
						<div class="box-header">
							<i class="ion ion-ios-list-outline"></i>
							<h3 class="box-title">공지사항</h3>
						</div>
						<div class="box-body min-height-294">
							<!-- chat item -->
							<div class="item">
								<table id="board1" class="table table-bordered table-striped">
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
							<!-- /.item -->
						</div>
					</div>
					<!-- /.box (공지사항 box) -->
				</section>
				<section class="col-lg-6">
					<!-- 자료실 box -->
					<div class="box">
						<div class="box-header">
							<i class="ion ion-ios-list-outline"></i>
							<h3 class="box-title">자료실</h3>
						</div>
						<div class="box-body min-height-294">
							<!-- chat item -->
							<div class="item">
								<table id="board2" class="table table-bordered table-striped">
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
							<!-- /.item -->
						</div>
					</div>
					<!-- /.box (자료실 box) -->
				</section>
			</div>
			<!-- /.row (main row) -->
		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->
	 <footer class="main-footer margin-left-0">
	 	<tiles:insertAttribute name="footer"/>
	</footer>

	<!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
	<div class="control-sidebar-bg"></div>
	<tiles:insertAttribute name="modal"/>
</div>
<!-- ./wrapper -->

</body>
</html>
