<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<div class="row">
	<section class="col-lg-5">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">INPUT</h3>
			</div>
			<div class="box-body">
				<div class="item" id="">
					<div class="col-md-6">
						<div id="oneWayAnalysis_targetList">
						</div>
					</div>
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 p-b-10">
								<div class="form-group">
									<label for="environmentVariable"><img src='../images/NUM.png'><strong id="oneWayAnalysis_targetA_name"> 종속변수 : NUMBER </strong></label>
									<div id="oneWayAnalysis_targetA"></div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label for="groupVariable"><img src='../images/COD.png'><strong id="oneWayAnalysis_targetB_name"> 요인1 : CODE </strong></label>
									<div id="oneWayAnalysis_targetB"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="">
			<div class="pull-right">
				<a href="javascript:;" class="btn btn-danger btn-sm" id="btnoneWayAnalysis_Init">초기화</a> <a href="javascript:;" class="btn btn-success btn-sm" id="btnoneWayAnalysis_Execute">실행</a>
			</div>
		</div>
	</section>
	
	<section class="col-lg-7" id="result_panel">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">일원분산분석</h3>
			</div>
			<div class="" id="oneWayAnalysis_ResultPanel_1" style="overflow-y: auto;">
				<div class="row">
					<div class="col-md-12 margin-bottom-10">
						<label style="font-weight: bold;">기술통계</label>
						<div id="oneWayAnalysis_dataGridList_1"></div>
					</div>
					<div class="col-md-12">
						<label style="font-weight: bold;">분산분석</label>
						<div id="oneWayAnalysis_dataGridList_2"></div>
					</div>
				</div>
			</div>
			<div class="overlay" style="z-index:1000; display: none" id="oneWayAnalysis_loading_1">
				<i class="fa fa-refresh fa-spin"></i>
			</div>
		</div>
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">사후분석(Tukey)</h3>
			</div>
			<div class="panel-body" id="oneWayAnalysis_ResultPanel_2" style="overflow-y: auto;">
				<div class="row">
					<div class="col-md-12 margin-bottom-10">
						<label style="font-weight: bold;">다중비교</label>
						<div id="oneWayAnalysis_dataGridList_3"></div>
					</div>
					<div class="col-md-12">
						<label style="font-weight: bold;">동일진단군</label>
						<div id="oneWayAnalysis_dataGridList_4"></div>
					</div>
				</div>
			</div>
			<div class="overlay" style="z-index:1000; display: none" id="oneWayAnalysis_loading_2">
				<i class="fa fa-refresh fa-spin"></i>
			</div>
		</div>
	</section>
</div>
<script src="<c:url value="/js/page/research/basicAnalysis/oneWayAnalysis.js" />"></script>
