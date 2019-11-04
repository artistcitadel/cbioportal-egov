<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 상병코드 popP 변경 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="popPModal" tabindex="-1" role="dialog" aria-labelledby="popPModalLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="popPModalLabel"></h4>
			</div>
			<div class="modal-body skin-black">
				<div class="row">
					<div class="col-lg-5">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">처방코드 조회/선택</h3>
							</div>
							<div class="box-body height-60vmin">
								<div class="nav-tabs-custom">
									<ul class="nav nav-tabs">
										<li class="active"><a href="#pTabA" class="btnTab" data-toggle="tab" code="A">전체</a></li>
										<li><a href="#pTabB" class="btnTab" data-toggle="tab" code="B">진단검사</a></li>
										<li><a href="#pTabC" class="btnTab" data-toggle="tab" code="C">영상검사</a></li>
										<li><a href="#pTabD" class="btnTab" data-toggle="tab" code="D">특수검사</a></li>
										<li><a href="#pTabE" class="btnTab" data-toggle="tab" code="E">병리검사</a></li>
										<li><a href="#pTabF" class="btnTab" data-toggle="tab" code="F">투약</a></li>
										<li><a href="#pTabG" class="btnTab" data-toggle="tab" code="G">수술</a></li>
						            </ul>
						            <div class="tab-content">
						            	<div class="tab-pane active" id="pTabA">
						            		<div class="row">
							            		<div class="col-lg-4">
							            			처방분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="ORD_KIND_AREA">
														<div id="ORD_KIND" name="ORD_KIND" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-4">
							            			슬립분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="ORD_SCLS_AREA">
														<div id="ORD_SCLS" name="ORD_SCLS" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionPA" id="searchConditionPA" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPA" class="form-control pull-right searchValP" placeholder="Search" id="searchValPA">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPA"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-39vmin keywordPCls" id="keywordP">
												<div id="searchPGridA"></div>
											</div>
										</div>
										<div class="tab-pane" id="pTabB">
											<div class="row">
							            		<div class="col-lg-4">
							            			검사분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="LB_SL_CODE_AREA">
														<div id="LB_SL_CODE" name="LB_SL_CODE" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionP" id="searchConditionPB" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPB" class="form-control pull-right searchValP" placeholder="Search" id="searchValPB">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPB"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-40vmin" id="keywordP">
												<div id="searchPGridB"></div>
											</div>
										</div>
										<div class="tab-pane" id="pTabC">
											<div class="row">
							            		<div class="col-lg-4">
							            			검사분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="RAD_PACSPECIALITY_AREA">
														<div id="RAD_PACSPECIALITY" name="RAD_PACSPECIALITY" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionP" id="searchConditionPC" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPC" class="form-control pull-right searchValP" placeholder="Search" id="searchValPC">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPC"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-40vmin" id="keywordP">
												<div id="searchPGridC"></div>
											</div>
										</div>
										<div class="tab-pane" id="pTabD">
											<div class="row">
							            		<div class="col-lg-4">
							            			검사분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="SP_SL_CODE_AREA">
														<div id="SP_SL_CODE" name="SP_SL_CODE" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionP" id="searchConditionPD" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPD" class="form-control pull-right searchValP" placeholder="Search" id="searchValPD">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPD"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-40vmin" id="keywordP">
												<div id="searchPGridD"></div>
											</div>
										</div>
										<div class="tab-pane" id="pTabE">
											<div class="row">
							            		<div class="col-lg-4">
							            			검사분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="PATH_SL_CODE_AREA">
														<div id="PATH_SL_CODE" name="PATH_SL_CODE" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionP" id="searchConditionPE" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPE" class="form-control pull-right searchValP" placeholder="Search" id="searchValPE">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPE"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-40vmin" id="keywordP">
												<div id="searchPGridE"></div>
											</div>
										</div>
										<div class="tab-pane" id="pTabF">
											<div class="row">
							            		<div class="col-lg-4">
							            			투여경로
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="MB_THRU_CHAN_AREA">
														<div id="MB_THRU_CHAN" name="MB_THRU_CHAN" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-4">
							            			약품분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="MB_CLSS_COED_AREA">
														<div id="MB_CLSS_COED" name="MB_CLSS_COED" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionP" id="searchConditionPF" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPF" class="form-control pull-right searchValP" placeholder="Search" id="searchValPF">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPF"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-39vmin" id="keywordP">
												<div id="searchPGridF"></div>
											</div>
										</div>
										<div class="tab-pane" id="pTabG">
											<div class="row">
												<div class="col-lg-4">
							            			검사분류
												</div>
												<div class="col-lg-8">
													<div class="form-group" id="OP_SL_CODE_AREA">
														<div id="OP_SL_CODE" name="OP_SL_CODE" class="jqxComboBox"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-5">
													<div class="form-group">
														<select class="default-select2 form-control input-sm" name="searchConditionP" id="searchConditionPG" style="height:30px;" title="검색유형">
															<option value="0">한글명 + 영문명</option>
															<option value="1">처방코드</option>
														</select>
													</div>
												</div>
												<div class="col-lg-5">
									                <div class="input-group input-group-sm">
														<input type="text" name="searchValPG" class="form-control pull-right searchValP" placeholder="Search" id="searchValPG">
														<div class="input-group-btn">
															<button class="btn btn-default btnSearchP" id="btnSearchPG"><i class="fa fa-search"></i></button>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane active height-40vmin" id="keywordP">
												<div id="searchPGridG"></div>
											</div>
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
										<i class="fa fa-3x fa-chevron-circle-right" style="cursor: pointer;" id="selectItemP"></i>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-12">
										<i class="fa fa-3x fa-chevron-circle-left" style="cursor: pointer;" id="cancelItemP"></i>
									</div>
								</div>
							</div>
							<div class="col-lg-11">
				                <div class="box">
									<div class="box-header">
										<h3 class="box-title">선택된 처방 코드</h3>
									</div>
									<div class="box-body height-60vmin">
										<div class="row">
											<div class="form-group">
												<div class="col-lg-12">
													<div class="pull-right">
														<button type="button" id="createPBtn" class="btn btn-success btn-sm">조건저장</button>
													</div>
												</div>
											</div>
										</div>
										<div class="margin-top-20 height-50vmin" id="searchSelectPGridArea">
											<div id="searchSelectPGrid"></div>
										</div>
									</div>
									<div class="box-footer">
										<div class="text-left pull-left">
											<button type="button" id="clearPBtn" class="btn btn-danger btn-sm">조건초기화</button>
										</div>
										<div class="text-right">
											<button type="button" id="submitPBtn" class="btn btn-primary btn-sm">조건등록</button>
										</div>
									</div>
								</div>
							</div>
						</div>
	                </div>
	                <div class="col-lg-2">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">처방코드 LOV(List of Value)</h3>
							</div>
							<div class="box-body height-60vmin">
								<!-- tree -->
						        <div id="diseaseCodeTreeP" class="margin-top-5" ></div>
						        <!-- ./tree -->
								<div class="margin-top-10">
									<button type="button" id="btnShareDeleteP" class="btn btn-block btn-danger btn-sm">삭제</button>
								</div>
								<div class="margin-top-5 text-align-center">
							        <button type="button" class="btn btn-success btn-sm btnShareP" insertModeCode="J" style="width:48.9%;">전체공유</button>
							        <button type="button" class="btn btn-success btn-sm btnShareP" insertModeCode="G" style="width:48.9%;">과공유</button>
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
<script src="<c:url value="/js/page/modals/modalP.js" />"></script>



<!-- 저장 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalPSave" tabindex="-1" role="dialog" aria-labelledby="modalPSaveLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalPSaveLabel">처방코드 조건 저장</h4>
			</div>
			<form class="form-horizontal">
				<div class="modal-body">
					<div class="form-group ">
						<div class="col-md-12" style="text-align: right">
							<label class="radio-inline"> <input type="radio" class="saveModeP" name="saveModeP" id="newSaveP" value="newSave" checked> 새 이름으로 저장
							</label> <label class="radio-inline"> <input type="radio" class="saveModeP" name="saveModeP" id="saveP" value="save"> 저장
							</label>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">LOV 분류</label>
						<div class="col-md-9">
							<select name="insertMode" class="form-control" id="insertModeP" disabled="disabled">
								<option value="K">개인조건</option>
								<option value="G">과공유조건</option>
								<option value="J">전체공유조건</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">처방코드 LOV 이름</label>
						<div class="col-md-9">
							<input type="hidden" id="saveNameP" value="">
							<input type="hidden" id="saveSeqP" value="">
							<input type="text" class="form-control" name="lovNmP" id="lovNmP" placeholder="연구자의 조건">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="codeSaveP">저장</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
				</div>
			</form>
		</div>
	</div>
</div>