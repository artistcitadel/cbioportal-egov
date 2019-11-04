<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 1HTMR 변경 -->
<div class="modal fade bs-example-modal" data-backdrop="static" id="pop1HTModal" tabindex="-1" role="dialog" aria-labelledby="pop1HTModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="pop1HTModalLabel"></h4>
			</div>
			<div class="modal-body skin-black">
				<div class="row">
					<div class="col-lg-12">
		                <div class="box">
							<div class="box-header">
								<h3 class="box-title">상위코드 입력</h3>
							</div>
							<div class="box-body height-60vmin">
								<div class="row">
									<div class="col-lg-12 height-60vmin">
										<!-- tree -->
								        <div id="codeTree1HT" class="margin-top-5" ></div>
								        <!-- ./tree -->
									</div>
								</div>
							</div>
							<div class="box-footer">
								<div class="text-right">
									<button type="button" id="submit1HTBtn" class="btn btn-primary btn-sm">조건등록</button>
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
<script src="<c:url value="/js/page/modals/modal1HT.js" />"></script>