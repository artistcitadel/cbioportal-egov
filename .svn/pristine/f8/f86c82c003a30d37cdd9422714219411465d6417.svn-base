<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<script type="text/javascript">
function uiceCallOpen(){
	$(opener.location).attr("href","javascript:runUICECall('"+getQuerystring('pat_sbst_no')+"');");
	window.close();
}

function uiceCallDown(){
	//console.log("http://" + location.host + "/" + gvCONTEXT + "/research/chartReview/chartReviewMain");
	location.href = gvCONTEXT + "/js/uICECaller-2.0.exe";
	
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30 * 12); // 30일 * 12개월
	setCookie("uICECallDownload", "Y", expdate);
}

function setCookie(name, value, expires) {
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires.toGMTString();
}


$(function(){
	//차트뷰어 다운로드
	$('#btnUiceCallDown').on('click', function(){
		uiceCallDown();
	});
	
	$('#btnUiceCallOpen').on('click', function(){
		uiceCallOpen();
	});
});
</script>
<!-- Main content -->
<section class="content" style="padding-top:70px; ">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="row">
				<div>
					<div style="text-align:center">
						<div style="margin-bottom:20px;">
							<button type="button" class="btn btn-lg btn-primary" id="btnUiceCallOpen">차트뷰어 조회</button>
						</div>
						<div>
							<p>※ 차트뷰어가 실행되지 않는 경우 아래 파일을 다운받고 설치해 주세요.</p>
						</div>
						<div>
							<button type="button" class="btn btn-warning" id="btnUiceCallDown">차트뷰어 다운로드</button>
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
