<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<input type="hidden" id="args" value="" style="float:right;" placeholder="args">
<input type="hidden" id="result" value="" style="float:right;" placeholder="result">

<!-- 상병코드 popW 변경 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="popWModal" tabindex="-1" role="dialog" aria-labelledby="popWModalLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="popWModalLabel"></h4>
			</div>
			<div class="modal-body skin-black">
				<div class="row">
					<div class="col-lg-5">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">상병코드 조회/선택</h3>
							</div>
							<div class="box-body height-60vmin">
								<div class="nav-tabs-custom">
						            <div class="tab-content">
						            	<div class="row">
											<div class="col-lg-5">
												<div class="form-group">
													<select class="default-select2 form-control input-sm" name="searchConditionW" id="searchConditionW" title="검색유형">
														<option value="1">한글명 + 영문명</option>
														<option value="0">상병코드</option>
													</select>
												</div>
											</div>
											<div class="col-lg-5">
								                <div class="input-group input-group-sm">
													<input type="text" name="searchValW" class="form-control pull-right" placeholder="Search" id="searchValW">
													<div class="input-group-btn">
														<button class="btn btn-default" id="btnSearchW"><i class="fa fa-search"></i></button>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane active height-50vmin" id="keywordW">
											<div id="searchWGrid"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="box-footer height-51">
								&nbsp;
							</div>
						</div>
	                </div>
	                <div class="col-lg-5">
	                	<div class="row">
	                		<div class="col-lg-1 text-center min-height-70vmin" style="padding: 250px 0px;">
								<div class="row">
									<div class="col-lg-12">
										<i class="fa fa-3x fa-chevron-circle-right" style="cursor: pointer;" id="selectItemW"></i>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-12">
										<i class="fa fa-3x fa-chevron-circle-left" style="cursor: pointer;" id="cancelItemW"></i>
									</div>
								</div>
							</div>
							<div class="col-lg-11">
				                <div class="box">
									<div class="box-header">
										<h3 class="box-title">선택된 상병 코드</h3>
									</div>
									<div class="box-body height-60vmin">
										<div class="row">
											<div class="form-group">
												<div class="col-lg-12">
													<div class="pull-right">
														<button type="button" id="createWBtn" class="btn btn-success btn-sm">조건저장</button>
													</div>
												</div>
											</div>
										</div>
										<div class="margin-top-20 height-50vmin" id="searchSelectWGridArea">
											<div id="searchSelectWGrid"></div>
										</div>
									</div>
									<div class="box-footer">
										<div class="text-left pull-left">
											<button type="button" id="clearWBtn" class="btn btn-danger btn-sm">조건초기화</button>
										</div>
										<div class="text-right">
											<button type="button" id="submitWBtn" class="btn btn-primary btn-sm">조건등록</button>
										</div>
									</div>
								</div>
							</div>
						</div>
	                </div>
	                <div class="col-lg-2">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">상병코드 LOV(List of Value)</h3>
							</div>
							<div class="box-body height-60vmin">
								<!-- tree -->
						        <div id="diseaseCodeTreeW" class="margin-top-5" ></div>
						        <!-- ./tree -->
								<div class="margin-top-10">
									<button type="button" id="btnShareDeleteW" class="btn btn-block btn-danger btn-sm">삭제</button>
								</div>
								<div class="margin-top-5">
							        <button type="button" id="btnShareWAll" class="btn btn-success btn-sm btnShareW" insertModeCode="A" style="width:47%;">전체공유</button>
							        <button type="button" id="btnShareWDept" class="btn btn-success btn-sm btnShareW pull-right" insertModeCode="D" style="width:47%;">과공유</button>
								</div>
							</div>
							<div class="box-footer height-51">
								&nbsp;
							</div>
						</div>
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>

<!-- 페이지용 js -->
<script src="<c:url value="/js/page/modals/modalW.js" />"></script>




<!-- 저장 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalWSave" tabindex="-1" role="dialog" aria-labelledby="modalWSaveLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalWSaveLabel">상병코드 조건 저장</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group ">
						<div class="col-md-12" style="text-align: right">
							<label class="radio-inline"> <input type="radio" class="saveModeW" name="saveModeW" id="newSaveW" value="newSave" checked> 새 이름으로 저장
							</label> <label class="radio-inline"> <input type="radio" class="saveModeW" name="saveModeW" id="saveW" value="save"> 저장
							</label>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">LOV 분류</label>
						<div class="col-md-9">
							<select name="insertMode" class="form-control" id="insertModeW" disabled="disabled">
								<option value="P">개인조건</option>
								<option value="D">과공유조건</option>
								<option value="A">전체공유조건</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">상병코드 LOV 이름</label>
						<div class="col-md-9">
							<input type="hidden" id="saveNameW" value="">
							<input type="hidden" id="saveSeqW" value="">
							<input type="text" class="form-control" name="lovNmW" id="lovNmW" placeholder="연구자의 조건">
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id="codeSaveW">저장</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>