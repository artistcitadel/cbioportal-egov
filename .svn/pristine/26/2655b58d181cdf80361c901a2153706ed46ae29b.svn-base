<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="IRB_APRV_CD"><spring:message code="IRB_APRV_CD" /></c:set> 

<%
	String contextPath = "";
	contextPath = request.getContextPath();

	if(session.getAttribute("PERINX_JSON") == null){
		response.sendRedirect(contextPath + "/login/loginForm");
	}

%>

<!-- Common Setting -->
<script type="text/javascript">
	var gvTIME_OUT = 2400;	//아무동작없이 40분 
	var gvTIME_CHECK = null;


	gvSERVER	= '<%= session.getAttribute("SERVER") %>';
	gvCONTEXT 	= '<%= session.getAttribute("CONTEXT_PATH") %>';
	gvPERINX 	= '<%= session.getAttribute("PERINX_JSON") %>';
	gvPERINX	= JSON.parse(gvPERINX);
	gvAUT_CODE	= <%= session.getAttribute("AUT_CODE") %>;
	
	// 경북대 - 병원코드 - 추가
	$.session.set('HOSPITAL_CODE'	,'<%= session.getAttribute("HOSPITAL_CODE") %>');
	
	//환자대체번호
	gvPAT_SBST_NO = '<%= session.getAttribute("PAT_SBST_NO") %>';
	
	//사업장적용여부추가
	gvINSTCD_YN = '<%= session.getAttribute("INSTCD_YN") %>';	
	
	//검색여부
	gvSEARCH_YN = '<%= session.getAttribute("SEARCH_YN") %>';
	
	//경북대병원구분코드(연구항목조회용)
	gvINSTCD = '<%= session.getAttribute("INSTCD") %>';
	
	//환자대체번호 컬럼크기
	gvPAT_SBST_NO_SIZE = '<%= session.getAttribute("PAT_SBST_NO_SIZE") %>';
	
	//연구항목 기준일자 TimeStamp여부
	gvBASE_DT_TIMESTAMP_YN = '<%= session.getAttribute("BASE_DT_TIMESTAMP_YN") %>';
	
	//연구항목 조건 isnull blank 사용여부
	gvIS_NULL_OR_BLANK_YN =  '<%= session.getAttribute("IS_NULL_OR_BLANK_YN") %>';
	
	//레지스트리 사용여부
	gvREGISTRY_YN = '<%= session.getAttribute("REGISTRY_YN") %>';
	
	$.session.set('PER_CODE'	,gvPERINX.PER_CODE);
	$.session.set('PER_NAME'	,gvPERINX.PER_NAME);
	$.session.set('DEPT_CODE'	,gvPERINX.DEPT_CODE);
	$.session.set('DEPT_NAME'	,gvPERINX.DEPT_NAME);
	$.session.set('PER_PASS'	,gvPERINX.PER_PASS);
	$.session.set('INSTCD'		,gvINSTCD);
	
	
	//메뉴 권한용
	var vMNUINX = '<%= session.getAttribute("jsonMNUINX") %>';
	var vREPINX = '<%= session.getAttribute("jsonREPINX") %>'; 
	vMNUINX = JSON.parse(vMNUINX);
	vREPINX = JSON.parse(vREPINX);
	//console.log(vMNUINX);
	
	var adminURL = "";
	var userURL = "";
	var reportURL = "";

	//승인알림용
	var APVCOUT 	= '<%= session.getAttribute("APVCOUT") %>';
	var APVLIST 	= '<%= session.getAttribute("APVLIST") %>';
	APVLIST = JSON.parse(APVLIST);
	
	//자기권한 받아오기
	var AUTINX 	= '<%= session.getAttribute("jsonAuth") %>';
	AUTINX = JSON.parse(AUTINX);
	
	//처음로그인인지 체크
	var FIRST_FLAG = '<%= session.getAttribute("FIRST_FLAG") %>';
	//var PWD_PATTERN = '<spring:message code="PWD.PATTERN" />';
	
	var PWD_PATTERN = '${PWD_PATTERN}';//PWD_PATTERN
	
	//병원구분
	gvSITE_CODE = '<%= session.getAttribute("SITE_CODE") %>';

	
	$(document).ready(function(){
		
		if(FIRST_FLAG == "N"){
			$('#myFirstPasswordModal').modal('show');
		}
	
		var approveAuth = '${IRB_APRV_CD}';
		
		for(var i=0; i<AUTINX.length; i++){
			if(approveAuth == AUTINX[i].AUT_CODE){		//승인권한이 있음
				$('#approveDoor').show();
				//알림세팅
				makeApprove(APVCOUT, APVLIST);
				
				break;
			}else{									//승인권한이 없음
				$('#approveDoor').hide();
			}
		}
		
		//관리자 권한별 접속 첫페이지 세팅
		for(var i=0; i<vMNUINX.length; i++){
			//console.log(vMNUINX);
			
			if(vMNUINX[i].MENU_GBN_NM == "관리자" && vMNUINX[i].CHKVAL == "1" && vMNUINX[i].UPPER_SEQ == 0){
				if(vMNUINX[i].MENU_URL == "dir"){
					adminURL = vMNUINX[i].UPPER_MENU_URL + '?SEQ='+ vMNUINX[i].SEQ + '&UPPER_SEQ='+ vMNUINX[i].UPPER_SEQ;
				}else{
					adminURL = vMNUINX[i].MENU_URL + '?SEQ='+ vMNUINX[i].SEQ + '&UPPER_SEQ='+ vMNUINX[i].UPPER_SEQ;
				}
				
				$('#adminDoor').attr('href', gvCONTEXT + adminURL);
				$('#adminDoor').removeClass('no_permission');
				break;
			}else{
				$('#adminDoor').addClass('no_permission');
			}
		}
		
		//연구 권한별 접속 첫페이지 세팅
		for(var i=0; i<vMNUINX.length; i++){
			if(vMNUINX[i].MENU_GBN_NM == "연구" && vMNUINX[i].CHKVAL == "1"){
				userURL = vMNUINX[i].MENU_URL + '?SEQ='+ vMNUINX[i].SEQ + '&UPPER_SEQ='+ vMNUINX[i].UPPER_SEQ;	
				$('#studyDoor').attr('href', gvCONTEXT + userURL);
				break;
			}else{
				$('#studyDoor').attr('href', gvCONTEXT + '/research/chartReview/chartReviewMain');
			}
		}
	
		console.log('bb');
		console.log(vREPINX);
		//정형보고서 권한별 접속 첫페이지 세팅
		if(vREPINX.length > 0){
			//reportURL = '?url='+ vREPINX[0].URL +'&userId='+ vREPINX[0].USER_ID +'&targetId='+ vREPINX[0].TARGET_ID;
			reportURL = '?SEQ='+ vREPINX[0].SEQ;
			
			$('#reportDoor').attr('href', gvCONTEXT +'/report/reportMain'+ reportURL);
		}else{
			$('#reportDoor').addClass('no_permission');
		}
		
		//레지스트리 권한별 접속 첫페이지 세팅
		for(var i=0; i<vMNUINX.length; i++){
			if(vMNUINX[i].MENU_GBN_CD == "RG" && vMNUINX[i].CHKVAL == "1"){
				userURL = "/rg/rgMain";

				$('#registryDoor').attr('href', gvCONTEXT + userURL);
				$('#registryDoor').removeClass('no_permission');
				$('#registryDoor').attr('target', '');
				break;
			}else{
				if(gvSITE_CODE == "UUH"){
					$('#registryDoor').attr("href", "http://crdw.uuh.ulsan.kr/uuh/login.do");
					$('#registryDoor').attr('target', '_blank');
				}else{
					$('#registryDoor').addClass('no_permission');
				}
			}
		}
		
		userURL = "/cohort/cohortMain";
		$('#cohortDoor').attr('href', gvCONTEXT + userURL);
	//	로그인세션 체크
		clearTimer();
	    initTimer();
		
		
	});
		
	
	
	
	
	function serviceCallback_topForPage(svcId, result){
		if(result.ERR_CD == '-1'){
			showAlert('시스템오류',result.ERR_MSG,null);
			return;
		}
		
		
		switch(svcId){
			case "sessionExtend":
				clearTimer();
				$('#mySessionModal').modal('hide');
				//showAlert('로그인 연장',COM_0043,null);
				break;
			default:
				break;
		}
		
		
		
	}
	 
	
</script>

<!-- Logo -->
<%-- <a href="<c:url value="/index.do" />" class="logo"> --%>
<a href="<c:url value="/dashboard/main" />" class="logo">
	<!-- mini logo for sidebar mini 50x50 pixels -->
	<span class="logo-mini">
		<c:set var="slogo"><spring:message code="main.slogo" /></c:set> 
		<img src="<c:url value='${slogo}' />" width="36px" height="auto"/>
	</span>
	<!-- logo for regular state and mobile devices -->
	<span class="logo-lg">
		<c:set var="logo"><spring:message code="main.logo" /></c:set> 
		<img src="<c:url value='${logo}' />" width="150px" height="auto"/>
	</span>
</a>
<!-- Header Navbar: style can be found in header.less -->
<nav class="navbar navbar-static-top" role="navigation">
	<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button" id="btnFold">
		<i class="fa fa-map-o" aria-hidden="true"></i>
	</a>
	<a class="sidebar-toggle pointer" role="button" id="cohortDoor">
		<i class="ion ion-erlenmeyer-flask"></i> Cohort
	</a>
	<a class="sidebar-toggle pointer" role="button" id="patientDoor">
		<i class="ion ion-stats-bars"></i> Patient
	</a>
	<a class="sidebar-toggle pointer" role="button" id="mutationDoor">
		<i class="ion ion-stats-bars"></i> Mutation
	</a>
	
<%-- 	<!-- 레지스트리 메뉴여부 -->
	<c:if test="${REGISTRY_YN  == 'Y'}">
		<a class="sidebar-toggle" role="button" id="registryDoor">
			<i class="fa fa-cubes" aria-hidden="true"></i> 레지스트리
		</a>
	</c:if>
	
	<a class="sidebar-toggle pointer" role="button" id="reportDoor">
		<i class="ion ion-stats-bars"></i> 정형보고서
	</a>
 --%>	
    <div class="navbar-custom-menu">
		<ul class="nav navbar-nav">
			<li class="dropdown notifications-menu">
				<div class="padding-top-17 btn_bgtd_timeout">
					<label id="timer2"></label>
	             	&nbsp;&nbsp;&nbsp;
	         	</div>
			</li>
			
			<!-- 관리자매뉴얼(관리자만 노출) -->
			<c:if test="${fn:indexOf(AUT_CODE,'ADMIN') >= 0}">
				<li class="dropdown notifications-menu">
					<a href='<c:url value="/resources/bigcenmed2_admin_manual.pdf"></c:url>' 
						class="padding-top-18 padding-bottom-17 pointer" download>
						<i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;
						<span class="hidden-xs">관리자매뉴얼</span>
					</a>
				</li>
			</c:if>
        	        	
        	<!-- 사용자매뉴얼 -->
        	<li class="dropdown notifications-menu">
				<a href='<c:url value="/resources/bigcenmed2_user_manual.pdf"></c:url>' 
					class="padding-top-18 padding-bottom-17 pointer" download>
					<i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;
					<span class="hidden-xs">사용자매뉴얼</span>
				</a>
			</li>
			
        	 <!-- 관리자버튼 -->
			<li class="dropdown notifications-menu">
				<a class="padding-top-18 padding-bottom-17 pointer" id="adminDoor">
					<i class="ion ion-wrench"></i>&nbsp;
					<span class="hidden-xs">관리자</span>
				</a>
			</li>
			<!-- Notifications: style can be found in dropdown.less -->
			<li class="dropdown notifications-menu" id="approveDoor" style="display:none;">
				<a href="#" class="dropdown-toggle padding-top-18 padding-bottom-17" data-toggle="dropdown">
					<i class="fa fa-bell-o"></i>
					<span class="label label-warning" id="approveCount">&nbsp;</span>
				</a>
				<ul class="dropdown-menu" id="approveArea" >
					<li class="header">You have <span id="approveCount2"></span> notifications</li>
				</ul>
			</li>
			<!-- User Account: style can be found in dropdown.less -->
			<li class="dropdown user user-menu">
				<a class="dropdown-toggle padding-top-18 padding-bottom-17 pointer" data-toggle="dropdown">
					<i class="ion ion-ios-person"></i>
					<span class="hidden-xs">사용자정보</span>
				</a>
				<ul class="dropdown-menu">
					<!-- User image -->
					<li class="user-header">
						<p>
							${PER_NAME} - ${PER_CODE}
							<small>${DEPT_NAME}</small>
						</p>
					</li>
					<!-- Menu Footer-->
					<li class="user-footer">
						<c:choose>
							<c:when test="${INSTCD_YN == 'Y'}">
								<div class="padding-bottom-3">
									<button style="width:100%" class="btn btn-default" data-toggle="modal" data-target="#myPasswordModal" >Password Change</button>
								</div>
								<div class="padding-bottom-3">
									<a href="<c:url value='/login/regeditDown' />" style="width:100%" class="btn btn-default">필수설치 파일다운</a>
								</div>
								<div class="">
									<a href="<c:url value='/login/logout' />" style="width:100%" class="btn btn-default">Sign Out</a>
								</div>
							</c:when>
							
							<c:otherwise>
								<div class="pull-left">
									<button class="btn btn-default btn-flat" data-toggle="modal" data-target="#myPasswordModal" >Password Change</button>
								</div>
								
								<div class="pull-right">
									<a href="<c:url value='/login/logout' />" class="btn btn-default btn-flat">Sign Out</a>
								</div>
							</c:otherwise>
						</c:choose>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</nav>

