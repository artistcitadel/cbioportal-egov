<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<tiles:insertAttribute name="head_css"/>
<tiles:insertAttribute name="js"/>
	
<script type="text/javascript">
</script>

<input type="hidden" id="txtSEARCH_VAL" value="${SEARCH_VAL }">
<input type="hidden" id="txtSEARCH_TABLE_ID" value="${SEARCH_TABLE_ID }">

<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="row">
				<div class="box">
					<div class="box-body">
						<div class="item">
							<!-- 1 line -->
							<div class="row margin-bottom-10">
								<div class="col-lg-6 col-sm-6">
									<div class="row">
										<div class="col-lg-8 col-sm-8">
											<div class="input-group input-group-sm" id="vSearchWordArea">
								                <input type="text" class="form-control typeahead" id="vSearchWord" value="${SEARCH_VAL}" data-provide="typeahead">
							                    <span class="input-group-btn">
													<button type="button" class="btn btn-primary btn-flat" id="btnSearchPlus">
														<i class="fa fa-plus"></i>
													</button>
							                    </span>
								            </div>
								        </div>
								        <div class="col-lg-4 col-sm-4">
											<label class="font-size-12"><input type="checkbox" class="chkSearchForm" id="chkExactMatchYN" value="Y">&nbsp;정확한 일치 검색</label>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-sm-6">
									<div class="row">
										<div class="col-lg-4 col-sm-4">
											<div class="input-group">
												<div class="input-group">
									                <span class="input-group-addon"><i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'vStartDate')"></i></span>
									                <input type="text" class="form-control maskDateInput" id="vStartDate">
		              							</div>
											</div>
										</div>
										<div class="col-lg-4 col-sm-4">
											<div class="input-group">
												<div class="input-group">
									                <span class="input-group-addon"><i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'vEndDate')"></i></span>
									                <input type="text" class="form-control maskDateInput" id="vEndDate">
		              							</div>
											</div>
										</div>
										<div class="col-lg-4 col-sm-4">
											<button class="btn btn-success btn-sm" id="btnSearch">검색</button>
											<button class="btn btn-danger btn-sm" id="btnReset">초기화</button>
										</div>
									</div>
								</div>
							</div>
							<!-- ./1 line -->
							<!-- 상세검색 collapsed-box -->
							<div class="row">
								<div class="col-lg-12 col-sm-12 box collapsed-box" id="detailSearchArea" style="border-top:solid #dcdcdc 1px;border-bottom:solid #dcdcdc 1px;background-color:#f7f7f7;padding:10px 0px;">
									<div style="height:1px;" class="text-align-center pointer" id="viewSearch" data-widget="collapse" data-toggle="tooltip" data-original-title="상세검색 보기"></div>
									<div class="box-body" id="detailSearchBody"></div>
								</div>
							</div>
							<!-- ./상세검색 -->
							<!-- 2 line -->
							<div class="row">
								<div class="col-lg-12 col-sm-12" id="searchWordArea">
									<!-- <label class="font-size-12 margin-right-15 searchWordLabel">
										<input type='checkbox' class='chkItem' value='동의어1'>&nbsp;&nbsp;동의어1
									</label>
									<label class="font-size-12 margin-right-15 searchWordLabel">
										<input type='checkbox' class='chkItem' value='동의어2'>&nbsp;&nbsp;동의어2
									</label> -->
								</div>
							</div>
							<!-- ./2 line -->
							<!-- 3 line -->
							<div class="row font-size-12" style="border-top:solid #dcdcdc 1px;border-bottom:solid #dcdcdc 1px;background-color:#f7f7f7;padding:10px 0px;">
								<div class="col-lg-12 col-sm-12">
									<div class="row">
										<div class="col-lg-4 col-sm-4 padding-top-5">
											<span>
												<label>검색:</label>
												<span id="lblSearchCount">6,386</span> (추출환자건: <span id="lblPatSbstCount">116</span>)
											</span>&nbsp;&nbsp;&nbsp;
											<span>
												<label>전체:</label>
												<span id="lblTotalCount">10,169,554</span>
											</span>
										</div>
										<div class="col-lg-6 col-sm-6 padding-top-5">
											<span>
												<a href="javascript:fn_searchSortSpec('RC_DATE');">최신일자 정렬</a>
											</span>&nbsp;&nbsp;|&nbsp;&nbsp;
											<span>
												<a href="javascript:fn_searchSortSpec('_score');">관련도순 정렬</a>
											</span>
										</div>
										<!-- <div class="col-lg-3 col-sm-3 padding-top-5">
											<label><input type="checkbox" class="chkColor">&nbsp;의무기록뷰어 검색어별 다중색상 적용</label>
										</div> -->
										<div class="col-lg-2 col-sm-2">
											<button class="btn btn-warning btn-sm" id="btnResultApply">연구항목 대상에 적용</button>
										</div>
									</div>
								</div>
							</div>
							<!-- ./3 line -->
							<!-- 4 line -->
							<div class="row font-size-12">
								<div class="col-lg-12 col-sm-12">
									<div class="row">
										<div class="col-lg-3 col-sm-3" >
											<div class="margin-5-0 font-color-primary" style="margin:auto;width:100%;overflow-x:scroll;height:600px; ">
												<div class="margin-5-0">
													<label><input type="checkbox" class="chkMenu chkAll" num="1">&nbsp;&nbsp;&nbsp;<i class="fa fa-user" aria-hidden="true"></i>&nbsp;병원구분</label>
													<ul id="aggGubnList" class="font-color-primary"></ul>
												</div>
												<div class="margin-5-0">
													<label>
														<input type="checkbox" class="chkMenu chkAll" num="2">&nbsp;&nbsp;&nbsp;<i class="fa fa-folder-open-o" aria-hidden="true"></i>&nbsp;기록지
													</label>
													<ul id="aggReportList" class="font-color-primary" style="width:300px;"></ul>
												</div>
												<div class="margin-5-0">
													<label><input type="checkbox" class="chkMenu chkAll" num="3">&nbsp;&nbsp;&nbsp;<i class="fa fa-stethoscope" aria-hidden="true"></i>&nbsp;진료과</label>
													<ul id="aggDeptNameList" class="font-color-primary"></ul>
												</div>
												<!-- <div class="margin-5-0">
													<label><input type="checkbox" class="chkMenu chkAll" num="4">&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;작성자</label>
													<ul id="aggEtprNameList" class="font-color-primary"></ul>
												</div> -->
											</div>
										</div>
										<div class="col-lg-9 col-sm-9" style="border-left:solid #dcdcdc 1px; height:600px; overflow-y:auto;" id="divSearchResult">
										</div>
									</div>
									
									<div class="row">
										<div class="col-lg-3 col-sm-3"></div>
										<div class="col-lg-9 col-sm-9 text-align-center" style="border-left:solid #dcdcdc 1px; overflow-y:auto;" id="divPagination">
										</div>
									</div>
								</div>
							</div>
							<!-- ./4 line -->
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<script src="<c:url value="/js/plugins/bootstrap-typeahead/bootstrap-typeahead.js" />"></script>
<script src="<c:url value="/js/page/popup/searchFormPopup.js" />"></script>
