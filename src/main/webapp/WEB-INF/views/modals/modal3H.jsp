<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 3H 변경 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="pop3HModal" tabindex="-1" role="dialog" aria-labelledby="pop3HModalLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="pop3HModalLabel"></h4>
			</div>
			<div class="modal-body skin-black">
				<div class="row">
					<div class="col-lg-4">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">상위코드 입력</h3>
								<input type="hidden" id="searchWrd" name="searchWrd" value='' />
							</div>
							<div class="box-body height-60vmin" id="searchTop3HGridArea">
								<div id="searchTop3HGrid"></div>
							</div>
							<div class="box-footer height-51">
								&nbsp;
							</div>
						</div>
	                </div>
	                <div class="col-lg-4">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">중위코드 입력</h3>
							</div>
							<div class="box-body height-60vmin" id="searchMiddle3HGridArea">
								<div id="searchMiddle3HGrid"></div>
							</div>
							<div class="box-footer height-51">
								&nbsp;
							</div>
						</div>
	                </div>
	                <div class="col-lg-4">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">하위코드 입력</h3>
							</div>
							<div class="box-body height-60vmin" id="searchBottom3HGridArea">
								<div id="searchBottom3HGrid"></div>
							</div>
							<div class="box-footer">
								<div class="text-right">
									<button type="button" id="submit3HBtn" class="btn btn-primary btn-sm">조건등록</button>
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
<script src="<c:url value="/js/page/modals/modal3H.js" />"></script>