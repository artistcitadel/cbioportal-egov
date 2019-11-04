<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		연구분류 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">연구분류 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-4">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">대분류</h3>
				</div>
				<div class="box-body min-height-70vmin">
					<div class="item" id="jqxItemCateList"></div>
					
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-maroon btn-md" id="btnDel">삭제</button>&nbsp;
						<button type="button" class="btn bg-orange btn-md" id="btnUpd">수정</button>&nbsp;
						<button type="button" class="btn bg-olive btn-md" id="btnAdd">신규</button>
					</div>
				</div>
			</div>
		</section>
		<section class="col-lg-8">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">중분류</h3>
				</div>
				<div class="box-body min-height-70vmin">
					<!-- <div class="row">
						<div class="col-md-12 margin-bottom-10">
							<span class="pull-right">
								<button type="button" id="btnUpItemCateDetl" class="btn btn-default btn-sm">
									<span class="glyphicon glyphicon-arrow-up"></span> UP
								</button>
								<button type="button" id="btnDownItemCateDetl" class="btn btn-default btn-sm">
									<span class="glyphicon glyphicon-arrow-down"></span> DOWN
								</button>
							</span>
						</div>
					</div> -->
					
					<!-- item -->
					<div class="item" id="jqxItemCateDetlList"></div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-maroon btn-md" id="btnDetlDel">삭제</button>&nbsp;
						<button type="button" class="btn bg-orange btn-md" id="btnDetlUpd">수정</button>&nbsp;
						<button type="button" class="btn bg-olive btn-md" id="btnDetlAdd">신규</button>
					</div>
				</div>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/researchCategorize.js" />"></script>


<!-- 대분류 신규 -->
<!-- POPUP -->
<div class="modal fade" id="itemCateModal" tabindex="-1" role="dialog" aria-labelledby="itemCateModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">대분류등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="frmModal">
					<input type="hidden" id="txtSEQ">
					<div class="form-group">
						<label for="recipient-name" class="control-label">대분류명:</label>
						<input type="text" class="form-control" id="txtCATE_NM" maxlength="20">
						<input type="hidden" class="form-control" id="txtORDER" maxlength="10" disabled />
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">취소</button>
				<button type="button" class="btn btn-primary" id="btnSave">저장</button>
			</div>
		</div>
	</div>
</div>


<!-- 중분류 신규 -->
<div class="modal fade" id="itemCateDetlModal" tabindex="-1" role="dialog" aria-labelledby="itemCateModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">중분류등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="frmModal">
					<input type="hidden" id="txtSEARCH_SCHEMA">
					<input type="hidden" id="txtSEARCH_TABLE">
					<input type="hidden" id="txtDETL_SEQ">					
					<input type="hidden" id="txtITEM_CATE_SEQ">
					<div class="required padding-10">
						<label for="recipient-name" class="control-label" >스키마</label>
						<select id="selSchemaList" class="default-select2 form-control input-sm" >
							<option value="0000">선택</option>
						</select>
					</div>
					
					<div class="required padding-10">
						<label for="recipient-name" class="control-label">테이블</label>
						<select id="selTableList" class="default-select2 form-control input-sm">
							<option value="0000">선택</option>
						</select>
					</div>
					
					<div class="required padding-10">
						<label for="recipient-name" class="control-label">분류명</label>
						<input type="text" class="form-control" id="txtCATE_NM_DETL" maxlength="20">
					</div>
					
					<div class="required padding-10">
						<label for="recipient-name" class="control-label">기준일자</label>
						<select id="selBASE_DT_COLUMN" class="default-select2 form-control input-sm" >
							<option value="0000">선택</option>
						</select>
						<input type="hidden" class="form-control" id="txtORDER_DETL" maxlength="10" disabled />
					</div>
					
					<!-- 사업장적용여부
					<div class="padding-10" id="divINSTCD_YN" style="display:none;">
						<hr>
						<label for="recipient-name" class="control-label">사업장적용여부 : </label>
						<br>
						<p>
							<label class="margin-right-15">
								<input type="radio" name="INSTCD_YN" id="INSTCD_YN_Y" value="Y" class="minimal rdoInstCdYn" >
								&nbsp;적용
							</label>
							<label class="margin-right-15">
								<input type="radio" name="INSTCD_YN" id="INSTCD_YN_N" value="N" class="minimal rdoInstCdYn" checked>
								&nbsp;미적용
							</label>
						</p>
					</div> -->
					
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnDetlClose">취소</button>
				<button type="button" class="btn btn-primary" id="btnDetlSave">저장</button>
			</div>
		</div>
	</div>
</div>



