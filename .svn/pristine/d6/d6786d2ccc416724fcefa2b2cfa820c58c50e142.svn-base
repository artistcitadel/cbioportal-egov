<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.Map"%>

<script type="text/javascript">

$(document).ready(function(){
	var path = $("#iframeId").attr("src");
	// 처음 페이지 호출했을 때
	if(path == ""){
		// loading show
		var strMsg = 'Loading....';
		var spinner = new Spinner(gvOpts).spin(gvTarget);
			
		if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
			gvOverlay = iosOverlay({
				text: strMsg,
				spinner: spinner
			});
		}
 		/* $(window).resize(function() {
			location.reload();
		}); */
		//window.location="main2?contSeq=${contSeq}&dataSeq=${dataSeq}";
		//window.location="../visualize/main2?contSeq=${contSeq}&dataSeq=${dataSeq}";
		

			
	}
});

</script>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">				
			<div class="row">
				<section class="col-lg-12">
					<div class="box">
						<div class="box-body" style="overflow: hidden;">
							<iframe id="iframeId" src="${tableauUrl}" width="100%" height="840" frameborder="0"></iframe>
						</div>
						
					</div>
				</section>
			</div>
			
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
