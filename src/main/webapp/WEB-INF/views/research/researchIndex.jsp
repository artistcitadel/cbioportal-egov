<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<script src="<c:url value="/js/page/research/researchCommon.js" />"></script>
	<script src="<c:url value="/js/page/research/researchGrid.js" />"></script>
	<script src="<c:url value="/js/page/research/researchGroup.js" />"></script>
	<script src="<c:url value="/js/page/research/researchRenderers.js" />"></script>
	<script src="<c:url value="/js/page/research/researchResult.js" />"></script>
	
</head>
<body class="hold-transition skin-black sidebar-mini fixed">

<div class="wrapper">
	<header class="main-header">
		<tiles:insertAttribute name="top"/>
	</header>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="main-sidebar">
		<tiles:insertAttribute name="studyLeft"/>
	</aside>

	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper" data-toggle="control-sidebar">
	<br>
		<input type="hidden" value="" id="grpIdx" >
		<input type="hidden" value="" id="grpStudyItemIdx" >
		<input type="hidden" value="" id="grpEventIdx" >
		<input type="hidden" value="" id="grpCensoredDataIdx" >
		<input type="hidden" value="" id="grpCaseIdx" >			<!-- 사례군 -->
		<input type="hidden" value="" id="grpControlIdx" >			<!-- 대조군 -->
		<tiles:insertAttribute name="content"/>
		
		<!-- 검색 -->
		<form name="form_search" id="form_search" method="POST">
			<input type="hidden" name="SEARCH_VAL" id="txtSEARCH_VAL">
			<input type="hidden" name="SEARCH_DATA_SEQ" id="txtSEARCH_DATA_SEQ">
			<input type="hidden" name="SEARCH_TABLE_ID" id="txtSEARCH_TABLE_ID">
			<input type="hidden" name="SEARCH_PAT_SBST_ID" id="txtSEARCH_PAT_SBST_ID">
			<select id="selPatSbstNoList" name="selPatSbstNoList" multiple style="width:100px;display:none;"></select>
		</form>
	</div>
	<!-- /.content-wrapper -->
	<footer class="main-footer">
		<tiles:insertAttribute name="footer"/>
	</footer>

	<!-- Control Sidebar -->
	<aside class="control-sidebar control-sidebar-dark">
		<tiles:insertAttribute name="researchSideBar"/>
	</aside>
	<!-- /.control-sidebar -->
	<!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
	<div class="control-sidebar-bg"></div>
	<tiles:insertAttribute name="modal"/>
</div>
<!-- ./wrapper -->

<!-- modal popup -->
<div class="modal fade" id="searchConditionModal" tabindex="99999" role="dialog" aria-labelledby="myModalLabel">
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
						<input type="hidden" name="txtITEM_CONT_SEQ" id="txtITEM_CONT_SEQ" />
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
							<label class="col-md-2 control-label">조건 분류</label>
							<div class="col-md-10">
								<select name="SHARE_CD" class="form-control" id="selSHARE_CD" disabled>
									<!-- 
									<option value="P">개인조건</option>
									<option value="S">개인공유</option>
									<option value="D">과공유</option>
									<option value="A">전체공유</option>
									-->
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">조건 이름</label>
							<div class="col-md-10">
								<input type="text" class="form-control" name="CONDT_NM" id="txtCONDT_NM" placeholder="${PER_NAME}의 검색조건" onkeydown="OnlyInput(event)">
							</div>
						</div>
						
						
						<!-- 개인공유 선택된 사용자 목록 -->
						<div class="form-group" id="divPersonalShared" style="display:none;">
							<label class="col-md-2 control-label">개인공유</label>
							<div class="col-md-10">
								<button type="button" id="btnAdd" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span>추가</button>
								<button type="button" id="btnDel" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-minus"></span>삭제</button>
								<br>
								<div id="jqxUserSharedList" style="margin-top:10px;"></div>
								<div id="jqxGridUserSharedList" style="margin-top:10px;"></div>
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

<!-- modal popup -->
<div class="modal fade" id="shareUserListModal" tabindex="99999" role="dialog" aria-labelledby="myModalLabel">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog vertical-align-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">사용자 조회</h5>
				</div>
				<div class="modal-body" id="modalUserList">
					<!-- setUserList -->
					<div id="jqxUserList"></div>
					
				</div>
				<div class="modal-footer">
					<button type="button" id="btnOk" class="btn btn-primary btn-sm">적용</button>
					<button type="button" id="btnCancel" class="btn btn-default btn-sm" data-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>


</body>
</html>
