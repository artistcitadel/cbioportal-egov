<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<div class="row">
	<section class="col-lg-12">
		<div class="box">
			<div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">조회조건 관리</h3>
				<div class="pull-right box-tools">
					<button type="button" class="btn btn-default btn-xs pull-right" data-widget="collapse" data-toggle="tooltip" title="" style="margin-right: 5px;" data-original-title="Collapse">
					<i class="fa fa-minus"></i></button>
				</div>
			</div>
			<div class="box-body">
				<!-- chat item -->
				<div class="item dataTableDiv" id="patientSearchDiv">
					<table width="100%" class="table table-bordered table-striped text-align-center font-size-datatabls" id="gridSearch_01" cellspacing="0">
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
				<ul class="nav nav-tabs" id="tabResult">
				</ul>
				
				<div class="tab-content" id="jqxGridResultWrap" style="margin:10px;">
				</div>
			</div>
		</div>
	</section>
</div>

<!-- modal popup
<div class="modal fade" id="searchConditionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog vertical-align-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">조회조건 저장</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" onsubmit="return false;" id="frmSearchCondition">
						<div class="form-group ">
							<div class="col-md-12" style="text-align: right">
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoSaveSc" id="rdoNewSaveSc" value="C" class="minimal rdoSaveSc" checked>
									&nbsp;새 이름으로 저장
								</label>
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoSaveSc" id="rdoSaveSc" value="U" class="minimal rdoSaveSc">
									&nbsp;저장
								</label>
								
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label">조회조건 분류</label>
							<div class="col-md-9">
								<select name="SHARE_CD" class="form-control" id="selSHARE_CD" disabled="disabled">
									<option value="P">개인조건</option>
									<option value="D">과공유조건</option>
									<option value="A">전체공유조건</option>
								</select>
							</div>
						</div>
						<div class="form-group required">
							<label class="col-md-3 control-label">조건 이름</label>
							<div class="col-md-9">
								<input type="text" class="form-control" name="CONDT_NM" id="txtCONDT_NM" placeholder="${PER_NAME}의 검색조건">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" id="btnSave" class="btn btn-primary btn-sm">저장</button>
					<button type="button" id="btnClose" class="btn btn-default btn-sm" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
</div>
 -->

<script src="<c:url value="/js/page/research/cohort/sub_01.js" />"></script>
