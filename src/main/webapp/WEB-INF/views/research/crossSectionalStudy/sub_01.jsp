<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<div class="row">
	<section class="col-lg-12">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">
					조회조건 관리
				</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			<div class="box-body">
				<!-- chat item -->
				<div class="item dataTableDiv" id="patientSearchDiv_01" style="" >
					<table width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls " id="gridSearch_01" cellspacing="0">
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
						<div id="divPeriodWrap_01" style="display:none;">
							<h5 class="box-title" style="font-weight:bold;">
								▷ 반복데이터 관리
							</h5>
							
							<table width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" 
								id="gridPeriod_01" cellspacing="0">
								<colgroup>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:10%;"></col>
									<col style="width:28%;"></col>
									<col style="width:28%;"></col>
									<col style="width:5%;"></col>
								</colgroup>
								<thead>
									<tr>
										<th class="text-center">주기명</th>
										<th class="text-center">대분류</th>
										<th class="text-center">중분류</th>
										<th class="text-center">항목명</th>
										<th class="text-center">시작일자</th>
										<th class="text-center">종료일자</th>
										<th class="text-center">삭제</th>
									</tr>
								</thead>
							</table>
						</div>
						<div id="jqxGridPeriod_01" style="display:none;"></div>
						
					</div>
				</div>
				
			</div>
			<div class="box-footer">
				<div class="row">
					<div class="col-lg-5" style="text-align:left">
						<button type="button" id="btnGroupInit" class="btn btn-warning btn-sm">그룹 초기화</button>
						<button type="button" id="btnInit" class="btn btn-danger btn-sm">초기화</button>
						<button type="button" id="btnRepeatData" class="btn btn-primary btn-sm">반복데이터관리</button>
						<button type="button" id="btnRepeatDataInit" class="btn btn-danger btn-sm" disabled>반복데이터초기화</button>
					</div>
					
					<div class="col-lg-7" style="text-align:right">
						<!-- <span style="margin-right:20px;color:#2e6da4;">※ 기준일 항목이 두개 이상일경우 내부적으로 큰일자가 선택되어 동작합니다.</span> -->
						
						<button type="button" id="btnSavePatientData" class="btn btn-success btn-sm" >데이터 저장</button>
						<button type="button" id="btnSearchConditionModal" class="btn btn-success btn-sm">조회조건 저장</button>
						<button type="button" id="btnSearch" class="btn btn-primary btn-sm">조회</button>
						
					</div>
				</div>
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
				<%-- <c:if test="${SEARCH_YN == 'Y' }">
					<div class="pull-right form-group margin-bottom-5">
						<input type="text" class="form-control" placeholder="서식지 검색" style="width:75%;margin-right:8px;display:inline-block;" id="txtSEARCH_FORM_VAL" >
						<button class="btn btn-sm btn-primary" id="btnSearchForm">
							<i class="fa fa-search"></i>
						</button>
					</div>
					<button class="btn btn-sm btn-primary btnSearchModal">
						서식지modal
					</button>
				</c:if> --%>
				
				
				<ul class="nav nav-tabs" id="tabResult">
				</ul>
				
				<div class="tab-content" id="jqxGridResultWrap" style="margin:10px;">
				</div>
			</div>
		</div>
	</section>
</div>



<div class="modal fade" id="patientSelectDataModal" tabindex="-1" role="dialog" aria-labelledby="patientSelectDataModal">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog vertical-align-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">환자선택 검색결과 저장</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" onsubmit="return false;" id="frmSearchCondition_cs01">
						<div class="form-group">
							<label class="col-md-2 control-label">연구이름</label>
							<div class="col-md-10">
								<input type="text" class="form-control" name="txtPAT_DATA_NM" id="txtPAT_DATA_NM" onkeydown="OnlyInput(event)" placeholder="${PER_NAME}의 데이터">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" id="btnSavePatientSelectResult" class="btn btn-primary btn-sm">저장</button>
					<button type="button" id="btnClosePatientSelectResult" class="btn btn-default btn-sm" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 반복데이터 Modal-->
<div class="modal fade" id="modalRepeat" tabindex="-1" role="dialog" aria-labelledby="modalRepeat">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog vertical-align-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">반복데이터 관리</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-md-2 control-label">반복대상</label>
							<div class="col-md-10">
								<select name="selRepeatTarget" class="form-control" id="selRepeatTarget">
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">반복횟수</label>
							<div class="col-md-10">
								<select name="selRepeateCount" class="form-control" id="selRepeateCount">
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				
				
				<div class="modal-footer">
					<button type="button" id="btnRepeatCreate" class="btn btn-success">
						<span class="glyphicon glyphicon-ok"></span>생성
					</button>
					
					<button type="button" id="btnRepeatClose"  class="btn btn-default" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>닫기
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end theme-panel -->
<!-- end #content -->


<script src="<c:url value="/js/page/research/crossSectionalStudy/sub_01.js" />"></script>
