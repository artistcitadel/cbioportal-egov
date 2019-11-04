<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="row">
	<section class="col-lg-12">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">모집단 정의</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			<div class="box-body">
				<!-- chat item -->
				<div class="item dataTableDiv" id="patientSearchDiv">
					<table  width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
							id="gridSearch_01" cellspacing="0">
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
				
				
			</div>
			<div class="box-footer">
				<div class="row">
					<div class="col-lg-4" style="text-align:left">
						<button type="button" id="btnGroupInit" class="btn btn-warning btn-sm">그룹 초기화</button>
						<button type="button" id="btnInit" class="btn btn-danger btn-sm">초기화</button>
					</div>
					
					<div class="col-lg-8" style="text-align:right">
						<span style="margin-right:20px;color:#2e6da4;">※ 기준일 항목이 두개 이상일경우 내부적으로 큰일자가 선택되어 동작합니다. </span>
						<button type="button" id="btnAutoItem" class="btn btn-success btn-sm">모집단 자동입력</button>
						<button type="button" id="btnControlModal" class="btn btn-success btn-sm">대조군 관리</button>
						<button type="button" id="btnSearchConditionModal" class="btn btn-success btn-sm">조회조건 저장</button>
						<button type="button" id="btnSearch" class="btn btn-primary btn-sm">조회</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>





<div class="row">
	<section class="col-lg-12">
		<!-- collapsed-box -->
		<div class="box ">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">사례군 정의</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			<div class="box-body">
				<div class="item dataTableDiv" id="caseDiv">
					<table 	width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
							id="gridCaseGroup_01" cellspacing="0">
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
			<div class="box-footer">
				<div class="col-lg-6" style="text-align:left">
					<button type="button" id="btnGroupInitCase" class="btn btn-warning btn-sm">그룹 초기화</button>
					<button type="button" id="btnInitCase" class="btn btn-danger btn-sm">초기화</button>
				</div>
			</div>
		</div>
	</section>
</div>

<div class="row">
	<section class="col-lg-12">
	<!-- collapsed-box -->
		<div class="box ">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">대조군 정의</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			<div class="box-body">
				<div class="item dataTableDiv" id="controlDiv">
					<table 	width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
							id="gridControlGroup_01" cellspacing="0" readonly>
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
			<div class="box-footer">
			</div>
		</div>
	</section>
</div>


<div class="row" id="sub01DataArea">
	<section class="col-lg-12">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">
					환자선택 검색결과
					<label id="lblResultInfo_01" style="margin-left:10px;"></label>
				</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" 
							data-widget="collapse" 
							data-toggle="tooltip" 
							title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
					<button type="button" class='btn btn-warning btn-xs pull-right margin-right-5' id="btnAutoColumns_01" tabNum='0'>열맞춤</button>
					<button type="button" class='btn btn-info btn-xs pull-right margin-right-5' id="btnWidthColumns_01" tabNum='0'>열너비 설정</button>
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


<script src="<c:url value="/js/page/research/casctrl/sub_01.js" />"></script>
