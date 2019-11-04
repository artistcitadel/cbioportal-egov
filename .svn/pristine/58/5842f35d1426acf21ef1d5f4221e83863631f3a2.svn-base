<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- Common Setting -->
<script type="text/javascript">
	gvSERVER	= '<%= session.getAttribute("SERVER") %>';
	gvCONTEXT 	= '<%= session.getAttribute("CONTEXT_PATH") %>';
	gvPERINX 	= '<%= session.getAttribute("PERINX_JSON") %>';
	gvPERINX	= JSON.parse(gvPERINX);
	
	$.session.set('PER_CODE'	,gvPERINX.PER_CODE);
	$.session.set('PER_NAME'	,gvPERINX.PER_NAME);
	$.session.set('DEPT_CODE'	,gvPERINX.DEPT_CODE);
	$.session.set('DEPT_NAME'	,gvPERINX.DEPT_NAME);
</script>

<script type="text/javascript">
	$(document).ready(function(){
		// setHeightPercent() > basicAnalysisMain.js 에서 호출
		//varHeight = setHeightPercent(document.getElementById("contentPanel"), "100") - 40;
		//$("#contentPanel").css("height", varHeight);
		//$("body").css("overflow", "hidden");
		$("body").css("font-size", "12px");
//		$(".panel-body").css("height", (varHeight - 135));
		
		/* $(window).resize(function() {
			location.reload();
		}); */
	});
</script>
<input type="hidden" id="CONT_SEQ" value="${CONT_SEQ }" />
<input type="hidden" id="DATA_SEQ" value="${DATA_SEQ }" />
<!-- Main content -->
<section class="content tab-content-area" style="max-width: 1530px; width: 1500px; min-width: 1100px;">
	<!-- Main row -->
	<div class="row ">
		<!-- Left col -->
		<section class="col-lg-12">
			<!-- <div class="box-header">
				<i class="fa fa-comments-o"></i>
				<h3 class="box-title">기초분석</h3>
			</div> -->					
			<div class="nav-tabs-custom">
	            <ul class="nav nav-tabs" id="tabList">
					<li class="active"><a href="#tab1" id="indeSampleTTest_Tab" data-toggle="tab" aria-expanded="true">독립표본 T검정</a></li>
					<li><a href="#tab2" id="actionSampleTTest_Tab" data-toggle="tab" aria-expanded="false">대응표본 T검정</a></li>
					<li><a href="#tab3" id="oneWayAnalysis_Tab" data-toggle="tab">일원분산분석</a></li>
					<li><a href="#tab4" id="indeSample2_Tab" data-toggle="tab">비모수 독립 2표본검정</a></li>
					<li><a href="#tab5" id="indeSampleK_Tab" data-toggle="tab">비모수 독립 K표본검정</a></li>
					<li><a href="#tab6" id="crossAnalysisTable_Tab" data-toggle="tab">교차분석</a></li>
					<li><a href="#tab7" id="careCalculation_Tab" data-toggle="tab">상관분석</a></li>
	            </ul>
	            <div class="tab-content" id="contentPanel">
	            	<!-- 독립표본T검점 -->
					<div class="tab-pane active" id="tab1">
						<jsp:include page="indeSampleTTest.jsp" flush="false" />
					</div>
					<!-- 대응표본T검정 -->
					<div class="tab-pane" id="tab2">
						<jsp:include page="actionSampleTTest.jsp" flush="false" />
					</div>
					<!-- 일원분산분석 -->
					<div class="tab-pane" id="tab3">
						<jsp:include page="oneWayAnalysis.jsp" flush="false" />
					</div>
					<!-- 비모수 독립 2-표본 -->
					<div class="tab-pane" id="tab4">
						<jsp:include page="indeSample2.jsp" flush="false" />
					</div>
					<!-- 비모수 독립 k-표본 -->
					<div class="tab-pane" id="tab5">
						<jsp:include page="indeSampleK.jsp" flush="false" />
					</div>
					<!-- 교차분석표 -->
					<div class="tab-pane" id="tab6">
						<jsp:include page="crossAnalysisTable.jsp" flush="false" />
					</div>
					<!-- 이변량상관계수 -->
					<div class="tab-pane" id="tab7">
						<jsp:include page="careCalculation.jsp" flush="false" />
					</div>
				</div>
	            <!-- /.tab-content -->
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<script src="<c:url value="/js/page/research/basicAnalysis/basicAnalysisMain.js" />"></script>