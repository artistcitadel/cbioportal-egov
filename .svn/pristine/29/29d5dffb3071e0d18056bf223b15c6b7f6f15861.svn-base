<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 상병코드 popCodeSet 변경 -->
<div class="modal fade bs-example-modal-lg modalCodeSet" data-backdrop="static" id="popCSModal" tabindex="-1" role="dialog" aria-labelledby="popCSModalLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="popCSModalLabel"></h4>
			</div>
			<div class="modal-body skin-black">
				<div class="row">
					<div class="col-lg-6">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">코드 조회/선택</h3>
								<input type="hidden" id="searchWrd" name="searchWrd" value='' />
							</div>
							<div class="box-body height-60vmin" id="jqxCodeSetListCSArea">
								<div class="item" id="jqxCodeSetListCS"></div>
							</div>
							<div class="box-footer height-51">
								&nbsp;
							</div>
						</div>
	                </div>
	                <div class="col-lg-6">
	                	<div class="row">
	                		<div class="col-lg-1 text-center min-height-70vmin" style="padding: 250px 0px;">
								<div class="row">
									<div class="col-lg-12">
										<i class="fa fa-3x fa-chevron-circle-right" style="cursor: pointer;" id="selectItemCS"></i>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-12">
										<i class="fa fa-3x fa-chevron-circle-left" style="cursor: pointer;" id="cancelItemCS"></i>
									</div>
								</div>
							</div>
							<div class="col-lg-11">
				                <div class="box">
									<div class="box-header">
										<h3 class="box-title">선택된 코드</h3>
									</div>
									<div class="box-body height-60vmin" id="jqxCodeSetSelectedListArea">
										<div class="item" id="jqxCodeSetSelectedList"></div>
									</div>
									<div class="box-footer">
										<div class="text-right">
											<button type="button" id="submitCSBtn" class="btn btn-primary btn-sm">조건등록</button>
										</div>
									</div>
								</div>
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
<script src="<c:url value="/js/page/modals/modalCodeSet.js" />"></script>