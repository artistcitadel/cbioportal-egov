<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		연구항목 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">연구항목 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">연구항목 등록</h3>
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<table id="tblSearch" class="table table-responsive search ">
							    <colgroup>
							    	<col width="100px">
							    	<col width="200px">
							    	<col width="100px">
							    	<col width="250px">
							    	<col width="100px">
							    	<col width="*">
							    </colgroup>
							    
							    <tbody>
							    	<tr>
							    		<th style="">대분류</th>
							    		<td>
											<select class="default-select4 form-control input-sm" name="" id="selItemCateList">
												<option value="000">전체</option>
											</select>
							    		</td>
							    		<th><label>중분류</label></th>
							    		<td>
											<select class="default-select2 form-control input-sm" name="" id="selItemCateDetlList" >
												<option value="000">전체</option>
											</select>
							    		</td>
							    		<th><label>구분</label></th>
							    		<td>
											<label class="margin-right-15"><input type="checkbox" name="chkSEARCH_ALL_YN" id="chkSEARCH_ALL_YN" class="minimal chkSearchAll "> 전체</label>
											<label class="margin-right-15"><input type="checkbox" name="chkSEARCH_GBN_YN" id="chkSEARCH_SEARCH_YN" value="SEARCH_YN" class="minimal chkSearchYn "> 조회여부</label>
											<label class="margin-right-15"><input type="checkbox" name="chkSEARCH_GBN_YN" id="chkSEARCH_GMEC_YN" value="GMEC_YN" class="minimal chkGmecYn "> 중요여부</label>
											<label class="margin-right-15"><input type="checkbox" name="chkSEARCH_GBN_YN" id="chkSEARCH_HCC_YN" value="HCC_YN" class="minimal chkHccYn "> 다빈도여부</label>
											<label class="margin-right-15"><input type="checkbox" name="chkSEARCH_GBN_YN" id="chkSEARCH_SYNONYM_YN" value="SYNONYM_YN" class="minimal chkSynonymYn "> 동의어 사용여부</label>
										</td>
							    	</tr>
							    </tbody>
							</table>
						</div>
					</div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-orange btn-sm" id="btnInitSearch">초기화</button>&nbsp;
						<button type="button" class="btn bg-olive btn-sm" id="btnSearch">연구항목 조회</button>
					</div>
				</div>
			</div>
		</section>
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">연구항목 관리</h3>
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item" id="jqxResearchItemList"></div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-maroon btn-sm" id="btnDel">삭제</button>&nbsp;
						<button type="button" class="btn bg-orange btn-sm" id="btnUpd">수정</button>&nbsp;
						<button type="button" class="btn bg-olive btn-sm" id="btnAdd">신규</button>
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
<script src="<c:url value="/js/admin/researchItem.js" />"></script>

<div class="modal fade bs-example-modal-lg" id="itemMgmtAddModal" tabindex="-1" role="dialog" aria-labelledby="itemMgmtAddModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">연구항목등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="form-item-regist">
					<h4>▷ 연구항목분류</h4>
					<table id="tblItemRegist" class="table">
					    <colgroup>
					    	<col width="120px">
					    	<col width="*">
					    </colgroup>
					    <thead>
					    	
					    </thead>
					    <tbody>
					    	<tr>
					    		<th class="required"><label class="padding-top-5">대분류</label></th>
					    		<td >
					    			<select id="selItemCate" name="ITEM_CATE" class="default-select2 form-control input-sm" >
										<option value="">선택</option>
									</select>
					    		</td>
					    	</tr>
					    	<tr>
					    		<th class="required"><label class="padding-top-5">중분류</label></th>
					    		<td >
					    			<select id="selItemCateDetl" name="ITEM_CATE_DETL" class="default-select2 form-control input-sm" >
										<option value="">선택</option>
									</select>
					    		</td>
					    	</tr>
					    </tbody>
					 </table>
					 
					 <hr class="simple">
					 <h4>▷ 연구항목</h4>
					 <table id="tblItemRegist" class="table">
						<colgroup>
							<col width="120px">
							<col width="*">
						</colgroup>
						<thead>
							
						</thead>
						<tbody>
							<tr>
								<th class="required"><label class="padding-top-5">스키마</label></th>
								<td>
									<select id="selAddSchemaList" class="default-select2 form-control input-sm" >
										<option value="0000">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="required"><label class="padding-top-5">테이블</label></th>
								<td >
									<select id="selAddTableList" class="default-select2 form-control input-sm">
										<option value="0000">선택</option>
									</select>
								</td>
							</tr>
							
							
							<tr>
								<th class="required"><label class="padding-top-5">컬럼</label></th>
								<td >
									<select id="selColumnList" class="default-select2 form-control input-sm">
										<option value="0000">선택</option>
									</select>
								</td>
							</tr>
						</tbody>
					 </table>
				</form>
			</div>
			
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnItemMgmtClose">취소</button>
				<button type="button" class="btn btn-primary" id="btnRegistItemMgmt">저장</button>
			</div>
		</div>
	</div>
</div>
		

<!-- 항목수정 -->
<div class="modal fade" id="itemMgmtUpdModal" tabindex="-1" role="dialog" aria-labelledby="itemMgmtUpdModal">
	<div class="modal-dialog" role="document" >
	<!-- modal-wide -->
		<div class="modal-content" style="width:800px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">연구항목수정</h4>
			</div>
			
			<div class="modal-body">
				<div class="box margin-bottom-5">
					<div class="box-header height-28" style="padding:4px 10px;">기본설정</div>
					<div class="box-body">
						<table id="frmItemMgmt" class="table table-responsive">
						    <colgroup>
						    	<col width="20%">
						    	<col width="30%">
						    	<col width="20%">
						    	<col width="30%">
						    </colgroup>
						    
						    <tbody>
						    	<tr>
						    		<th class="required vertical-align-middle"><label>연구항목명</label></th>
						    		<td class="padding-5" colspan="3">
						    			<input type="hidden" id="txtSCHEMA"/>
						    			<input type="hidden" id="txtTABLE"/>
						    			<input type="hidden" id="txtSEQ"/>
						    			<input type="text" class="form-control" id="txtITEM_NM" maxlength="100"/>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="vertical-align-middle"><label>컬럼명</label></th>
						    		<td class="padding-5" colspan="3">
						    			<input type="text" class="form-control" id="txtColumn_NM" maxlength="100"/>
						    		</td>
						    	</tr>
						    	
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label>연구항목설명</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<textarea class="form-control input-sm" name="txtITEM_NM" id="txtITEM_DESC" rows="2" cols="60" title="연구설명"></textarea>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label class="control-label padding-top-5">기준일자</label>
						    		</th>
						    		<td class="padding-5">
						    			<select class="default-select2 form-control input-sm" name="selBASE_DT_COLUMN" id="selBASE_DT_COLUMN">
						    			</select>
						    		</td>
						    		<th class="vertical-align-middle">
						    			<label class="control-label padding-top-5">최초적용여부</label>
						    		</th>
						    		<td>
					    				<input type="checkbox" name="chkITEM_FIRST_YN" id="chkITEM_FIRST_YN" class="minimal itemFirstYnChk ">
						    		</td>
						    	</tr>
						    </tbody>
						</table>
					</div>
				</div>
				<div class="box margin-bottom-5">
					<div class="box-header height-28" style="padding:4px 10px;">조회설정</div>
					<div class="box-body">
						<table class="table table-responsive">
						    <colgroup>
						    	<col width="20%">
						    	<col width="30%">
						    	<col width="20%">
						    	<col width="30%">
						    </colgroup>
						    
						    <tbody>
						    	<tr>
						    		<th class="padding-5">
						    			<label class="control-label padding-top-5">조회여부</label>
						    		</th>
						    		<td class="padding-5">
						    			<input type="checkbox" name="chkSEARCH_YN" id="chkSEARCH_YN" class="minimal searchChk">
						    		</td>
						    		
						    		<th class="padding-5">
						    			<label class="control-label padding-top-5">중요여부</label>
						    		</th>
						    		<td class="padding-5">
						    			<input type="checkbox" name="chkGMEC_YN" id="chkGMEC_YN" class="minimal importantUpChk">
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="padding-5">
						    			<label class="control-label padding-top-5">다빈도여부</label>
						    		</th>
						    		<td class="padding-5">
					    				<input type="checkbox" name="chkHCC_YN" id="chkHCC_YN" class="minimal manyUpChk">
						    		</td>
						    		
						    		<th class="padding-5">
						    			<label class="control-label padding-top-5">유사어여부</label>
						    		</th>
						    		<td class="padding-5">
					    				<input type="checkbox" name="chkSYNONYM_YN" id="chkSYNONYM_YN" class="minimal analogueUpChk">
						    		</td>
						    	</tr>
						    </tbody>
						</table>
					</div>
				</div>
				<div class="box margin-bottom-0">
					<div class="box-header height-28" style="padding:4px 10px;">옵션설정</div>
					<div class="box-body">
						<table id="frmItemMgmt" class="table table-responsive">
						    <colgroup>
						    	<col width="20%">
						    	<col width="30%">
						    	<col width="20%">
						    	<col width="30%">
						    </colgroup>
						    
						    <tbody>
						    	<tr>
						    		<th class="required padding-top-5 vertical-align-middle">
						    			<label class="control-label">데이터타입</label>
						    		</th>
						    		<td colspan="3" class="padding-5">
						    			<select class="default-select2 form-control input-sm" name="selITEM_TYPE" id="selITEM_TYPE">
						    			</select>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="padding-top-5 vertical-align-middle">
						    			<label class="control-label">팝업여부</label>
						    		</th>
						    		<td class="padding-5">
					    				<input type="checkbox" name="chkPOPUP_YN" id="chkPOPUP_YN" class="minimal popupChk">
						    		</td>
						    		
						    		<th class="padding-top-5 vertical-align-middle">
						    			<label class="control-label">팝업선택</label>
						    		</th>
						    		<td class="padding-5">
					    				<select class="default-select2 form-control input-sm" name="selPOPUP_PROGRAM_ID" id="selPOPUP_PROGRAM_ID">
											<option>1</option>
										</select>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="padding-top-5 vertical-align-middle">
						    			<label class="control-label">상위테이블</label>
						    		</th>
						    		<td class="padding-5">
						    			<select class="default-select2 form-control input-sm" name="selUPPER_TABLE" id="selUPPER_TABLE">
											<option>1</option>
										</select>			    				
						    		</td>
						    		
						    		<th class="padding-top-5 vertical-align-middle">
						    			<label class="control-label">상위컬럼</label>
						    		</th>
						    		<td class="padding-5">
						    			<select class="default-select2 form-control input-sm" name="selUPPER_COLUMN" id="selUPPER_COLUMN">
											<option>1</option>
										</select>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th rowspan="2" class="padding-5 padding-top-5 vertical-align-middle">
						    			<label class="control-label">코드관리</label>
						    		</th>
						    		<td colspan="3" class="padding-5">
					    				<label class="font-weight-100 margin-right-15">
											<input type="radio" name="rdoCODE_TYPE" id="rdoCODE_TYPE_SQL" value="SQL" class="minimal codeChk" checked>
											&nbsp;기준코드(SQL)
										</label>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="rdoCODE_TYPE" id="rdoCODE_TYPE_JSN" value="JSN" class="minimal codeChk">
											&nbsp;기준코드(JSON)
										</label>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="rdoCODE_TYPE" id="rdoCODE_TYPE_NON" value="NON" class="minimal codeChk">
											&nbsp;기준코드(직접입력)
										</label>
										
						    		</td>
						    	</tr>
						    	
						    	<tr>
						    		<td colspan="3" class="padding-5">
					    				<textarea class="form-control input-sm" name="txtCODE_SET" id="txtCODE_SET" rows="3" cols="60" title="코드관리" placeholder=""></textarea>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="padding-5 vertical-align-middle"><label>코드컬럼</label></th>
						    		<td colspan="3" class="padding-5">
						    			<input type="text" class="form-control" id="txtPOPUP_COLUMN" maxlength="100" placeholder="SQL내에서 Select절 다음에 코드 컬럼의 실제 컬럼명(Alias아님)"/>
						    		</td>
						    	</tr>
						    	<c:if test="${INSTCD_YN == 'Y'}">
							    	<tr>
							    		<th class="padding-5 vertical-align-middle">
							    			<label class="control-label padding-top-5">사업장여부</label>
							    		</th>
							    		<td colspan="3" class="padding-5">
							    			<label class="margin-right-15 margin-top-5">
												<input type="radio" name="INSTCD_YN" id="INSTCD_YN_Y" value="Y" class="minimal rdoInstCdYn" >
												&nbsp;적용
											</label>
											<label class="margin-right-15 margin-top-5">
												<input type="radio" name="INSTCD_YN" id="INSTCD_YN_N" value="N" class="minimal rdoInstCdYn" checked>
												&nbsp;미적용
											</label>		    				
							    		</td >
							    	</tr>
						    	</c:if>
						    </tbody>
						</table>
					</div>
				</div>
				<%-- <table id="frmItemMgmt" class="table table-responsive">
				    <colgroup>
				    	<col width="120px">
				    	<col width="*">
				    	<col width="120px">
				    	<col width="*">
				    </colgroup>
				    
				    <tbody>
				    	<tr>
				    		<th class="required"><label>연구항목명</label></th>
				    		<td colspan="3">
				    			<input type="hidden" id="txtSCHEMA"/>
				    			<input type="hidden" id="txtTABLE"/>
				    			<input type="hidden" id="txtSEQ"/>
				    			<input type="text" class="form-control" id="txtITEM_NM" maxlength="100"/>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th>
				    			<label>연구항목설명</label>
				    		</th>
				    		<td colspan="3">
				    			<textarea class="form-control input-sm" name="txtITEM_NM" id="txtITEM_DESC" rows="3" cols="60" title="연구설명"></textarea>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th>
				    			<label class="control-label padding-top-5">조회여부</label>
				    		</th>
				    		<td colspan="3">
				    			<input type="checkbox" name="chkSEARCH_YN" id="chkSEARCH_YN" class="minimal searchChk">
				    		</td>
				    	</tr>
				    	
				    	
				    	
				    	<tr>
				    		<th>
				    			<label class="control-label padding-top-5">팝업여부</label>
				    		</th>
				    		<td>
			    				<input type="checkbox" name="chkPOPUP_YN" id="chkPOPUP_YN" class="minimal popupChk">
				    		</td>
				    		
				    		<th>
				    			<label class="control-label padding-top-5">팝업선택</label>
				    		</th>
				    		<td>
			    				<select class="default-select2 form-control input-sm" name="selPOPUP_PROGRAM_ID" id="selPOPUP_PROGRAM_ID">
									<option>1</option>
								</select>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th>
				    			<label class="control-label padding-top-5">데이터타입</label>
				    		</th>
				    		<td colspan="3">
				    			<select class="default-select2 form-control input-sm" name="selITEM_TYPE" id="selITEM_TYPE">
				    			</select>
				    		</td>
				    	</tr>
				    	
				    	<tr style="display:none;">
				    		<th>
				    			<label class="control-label padding-top-5">표시순서</label>
				    		</th>
				    		<td colspan="3">
				    			<input type="text" class="form-control" id="txtORDER" maxlength="100"/>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th rowspan="2">
				    			<label class="control-label padding-top-5">코드관리</label>
				    		</th>
				    		<td colspan="3">
			    				<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoCODE_TYPE" id="rdoCODE_TYPE_SQL" value="SQL" class="minimal codeChk" checked>
									&nbsp;기준코드(SQL)
								</label>
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoCODE_TYPE" id="rdoCODE_TYPE_JSN" value="JSN" class="minimal codeChk">
									&nbsp;기준코드(JSON)
								</label>
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="rdoCODE_TYPE" id="rdoCODE_TYPE_NON" value="NON" class="minimal codeChk">
									&nbsp;기준코드(직접입력)
								</label>
								
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<td colspan="3">
			    				<textarea class="form-control input-sm" name="txtCODE_SET" id="txtCODE_SET" rows="3" cols="60" title="코드관리" placeholder=""></textarea>
				    		</td>
				    	</tr>
				    	<tr>
				    		<th><label>코드컬럼</label></th>
				    		<td colspan="3">
				    			<input type="text" class="form-control" id="txtPOPUP_COLUMN" maxlength="100" placeholder="쿼리의 코드컬럼을 입력합니다"/>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th><label class="control-label padding-top-5">중요여부</label></th>
				    		<td>
				    			<input type="checkbox" name="chkGMEC_YN" id="chkGMEC_YN" class="minimal importantUpChk">
				    		</td>
				    		
				    		<th><label class="control-label padding-top-5">다빈도여부</label></th>
				    		<td>
			    				<input type="checkbox" name="chkHCC_YN" id="chkHCC_YN" class="minimal manyUpChk">
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th>
				    			<label class="control-label padding-top-5">유사어여부</label>
				    		</th>
				    		<td>
			    				<input type="checkbox" name="chkSYNONYM_YN" id="chkSYNONYM_YN" class="minimal analogueUpChk">
				    		</td>
				    		<th></th>
				    		<td></td>
				    	</tr>
				    	
				    	
				    	<tr>
				    		<th>
				    			<label class="control-label padding-top-5">상위테이블</label>
				    		</th>
				    		<td>
				    			<select class="default-select2 form-control input-sm" name="selUPPER_TABLE" id="selUPPER_TABLE">
									<option>1</option>
								</select>			    				
				    		</td>
				    		
				    		<th>
				    			<label class="control-label padding-top-5">상위컬럼</label>
				    		</th>
				    		<td>
				    			<select class="default-select2 form-control input-sm" name="selUPPER_COLUMN" id="selUPPER_COLUMN">
									<option>1</option>
								</select>
				    		</td>
				    	</tr>
				    	
				    	<c:if test="${INSTCD_YN == 'Y'}">
					    	<tr>
					    		<th>
					    			<label class="control-label padding-top-5">사업장여부</label>
					    		</th>
					    		<td colspan="3">
					    			<label class="margin-right-15 margin-top-5">
										<input type="radio" name="INSTCD_YN" id="INSTCD_YN_Y" value="Y" class="minimal rdoInstCdYn" >
										&nbsp;적용
									</label>
									<label class="margin-right-15 margin-top-5">
										<input type="radio" name="INSTCD_YN" id="INSTCD_YN_N" value="N" class="minimal rdoInstCdYn" checked>
										&nbsp;미적용
									</label>		    				
					    		</td >
					    	</tr>
				    	</c:if>
				    </tbody>
				  </table> --%>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseItemMgmt">취소</button>
				<button type="button" class="btn btn-primary" id="btnUpdateItemMgmt">저장</button>
			</div>
		</div>
	</div>
</div>



