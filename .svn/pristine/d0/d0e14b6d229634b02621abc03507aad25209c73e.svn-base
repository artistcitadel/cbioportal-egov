<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 개인자료조건 modal -->
<div class="modal fade bs-example-modal-lg" id="perDataListModal" tabindex="-1" role="dialog" aria-labelledby="perDataListModalLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="perDataListModalLabel"> 개인자료 조건</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<div class="row">
							<div class="col-lg-7 col-sm-7">
								<div class="box">
									<form id="form_personalData" name="" method="POST" enctype="multipart/form-data">
									<div class="box-body">
										<div class="form-group height-40 required">
											<label class="col-sm-2 control-label margin-top-5">데이터명</label>
											<div class="col-sm-6">
												<input type="text" class="form-control" name="TABLE_COMMENT" id="txtTABLE_COMMENT">
											</div>
											<div class="col-sm-4" style="margin-top:3px;">
												<button type="button" class="btn btn-primary btn-sm" id="btnDataNmDuplicate" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> 중복체크중입니다.">
												Duplicate check</button>
												<span id="dataNmCheckresult" class="label label-default" style="margin-left:10px;"></span>
											</div>
						                </div>
						                <div class="form-group height-40 required">
											<label class="col-sm-2 control-label margin-top-5">파일선택</label>
											<div class="col-sm-10">
												<div class="input-group image-preview">
									                <input type="text" class="form-control image-preview-filename" disabled="disabled" id="txtExcelFile"> <!-- don't give a name === doesn't send on POST/GET -->
									                <span class="input-group-btn">
									                    <!-- image-preview-clear button -->
									                    <button type="button" class="btn btn-default image-preview-clear" style="display:none;">
									                        <span class="glyphicon glyphicon-remove"></span> Clear
									                    </button>
									                    <!-- image-preview-input -->
									                    <div class="btn btn-default image-preview-input">
									                        <span class="glyphicon glyphicon-folder-open"></span>&nbsp;
									                        <span class="image-preview-input-title">Browse</span>
									                        <input type="file" name="input-file-preview" id="excelFile" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/> <!-- rename it -->
									                    </div>
									                </span>
									            </div><!-- /input-group image-preview [TO HERE]--> 
											</div>
						                </div>
						                <div class="form-group height-40 required">
											<label class="col-sm-2 control-label margin-top-5">시트선택</label>
											<div class="col-sm-4">
												<select class="form-control" id="selSheetList">
													<option>엑셀을 업로드 해 주세요.</option>
												</select>
											</div>
											
											<label class="col-sm-2 control-label padding-top-5">머릿글사용</label>
												<div class="col-sm-4 padding-top-5">
													<input type="checkbox" class="headerChk" id="chkHeaderUserYn" name="chkHeaderUserYn" checked value="Y">
												</div>
						                </div>
						                <div class="form-group height-40 required">
											<label class="col-sm-2 control-label margin-top-5">환자번호컬럼</label>
											<div class="col-sm-4">
												<select class="form-control" id="selPatSbstNoColumnList">
													<option>선택</option>
												</select>
											</div>
											<label class="col-sm-2 control-label margin-top-5">환자번호구분</label>
											<div class="col-sm-3">
												<select class="form-control" id="selPatSbstNoSpecList">
													<option>선택</option>
												</select>
											</div>
											<div class="col-sm-1 control-label ">
												<button type="button" class="btn btn-primary btn-sm" id="btnPerDataRegPreview">점검하기</button>
											</div>
											
						                </div>
						                <div class="form-group height-40">
											<label class="col-sm-2 control-label margin-top-5">연구항목명</label>
											<div class="col-sm-4">
												<input type="text" class="form-control" id="txtPAT_SBST_NO" name="txtPAT_SBST_NO" disabled value="">
											</div>
											<div class="col-sm-6 padding-top-5">
												<input type="checkbox" class="itemNmChk" id="chkITEM_NM" name="chkITEM_NM" value="Y">
												직접입력
											</div>
											
											
						                </div>
						                <div class="form-group height-40">
											<label class="col-sm-2 control-label margin-top-5">기준일자컬럼</label>
											<div class="col-sm-4">
												<select class="form-control" id="selBaseDtColumnList">
													<option>선택</option>
												</select>
											</div>
											<div class="col-sm-6 padding-top-5">
												<input type="checkbox" class="baseDtChk" id="chkBASE_DT" name="chkBASE_DT" value="Y">
												기준일자사용안함
											</div>
											
						                </div>
						                
						                <div class="form-group height-40">
											<label class="col-sm-2 control-label margin-top-5">관리코드</label>
											<div class="col-sm-4">
												<select class="form-control" id="selMgmtColumnList">
													<option>선택</option>
												</select>
											</div>
											<div class="col-sm-6 padding-top-5">
												<input type="checkbox" class="baseDtChk" id="chkMGMT" name="chkMGMT" value="Y">
												관리코드사용
											</div>
											
						                </div>
									</div>
									</form>
								</div>
							</div>
							<div class="col-lg-5 col-sm-5">
								<div class="item">
									<h4>주의사항</h4>
									<h5>1. 환자번호로 사용할 컬럼과(필수), 기준일자 컬럼(선택)을 선택하시기 바랍니다.</h5>
									<h5>2. 환자번호구분 : 주민번호(13자리), 환자번호(7자리)는 환자대체번호로 변환되어 저장됩니다.</h5>
									<h5>3. 연구항목명은 기본적으로 환자번호컬럼을 사용하고 직접입력을 통해 연구항목명을 따로 설정할 수 있습니다.</h5>
									<h5>4. 환자대체번호와 기준일자컬럼 이외 다른 컬럼은 저장되지 않습니다.</h5>
									<h5>5. 기준일자는 YYYY-MM-DD(예:2017-08-01)로 되어 있어야 합니다.</h5>
									<h5>6. 확장자가 xls 또는 xlsx인 파일만 사용 가능합니다.</h5>
									<h5>7. 데이터가 클수록 저장에 오래 걸리며, 도중에 강제종료 하지마세요.</h5>
									<h5>8. 환자개인정보 업로드 시 책임은 사용자에게 있습니다.</h5>
									<hr class="simple">
									<h5>※ 기준일자컬럼은 "항목선택"에서 표시되지 않습니다.</h5>
									<h5>※ "기준일자사용안함"을 체크하면 업로드일자로 저장됩니다.</h5>
									
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-lg-12 height-40vmin" style="min-height:200px;overflow-y:scroll;">
								<div class="item perDataListTableArea" >
									<table id="perDataListTable" class="table table-bordered table-striped" width="100%">
										<thead id="perDataListTableHeader"></thead>
									</table>
								</div>
							</div>
						</div>
						
						<!-- <div class="row">
						<div id="jqxLoader_personalDataMask"></div>
							<div class="col-lg-12" id="widthApply" style="overflow: auto;min-height: 520px">
								<table id="table_Modal" class="table table-striped table-bordered tableSearch">
									<thead id="personalTableHead">
									</thead>
								</table>
							</div>
						</div> -->
	                </div>
	            </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default btn-sm" id="btnPerDataCancel" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-warning btn-sm" id="btnPerDataRefresh">초기화</button>
				<button type="button" class="btn btn-success btn-sm" id="btnPerDataReg">저장</button>
			</div>
		</div>
	</div>
</div>
<!-- 페이지용 js -->
<script src="<c:url value="/js/page/modals/modalPerDataList.js" />"></script>