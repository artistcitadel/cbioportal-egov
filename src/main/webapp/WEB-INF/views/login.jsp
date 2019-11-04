<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%> 
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%
	String url = request.getRequestURL().toString();
	
	System.out.println(url);
	
	if(url.startsWith("http://") && url.indexOf("localhost") < 0 && url.indexOf("test") < 0){
	//	url = url.replaceAll("http://","https://");
	//	response.sendRedirect(url);
	}

	if(session.getAttribute("PER_CODE") != null){
		response.sendRedirect("dashboard/main");
	}
	System.out.println(url);
	
%>
<!DOCTYPE html>
<html>
<head>
<tiles:insertAttribute name="head_css"/>
<!-- /.login-box -->
<tiles:insertAttribute name="js"/>
<!-- 페이지용 js -->
<script src="<c:url value="/js/login.js" />"></script>
<script type="text/javascript">
	var gvErrCode 	= '';
	var gvErrMsg 	= '';
	
	/**
	 * init
	 */
	$(document).ready(function(){
		
		
		if("${ERR_CD}" != null){
			gvErrCode = "${ERR_CD}";
			gvErrMsg  = "${ERR_MSG}";
			
			if(!isNullOrEmpty(gvErrCode) && gvErrCode != '0'){
				showAlert('사용자인증',gvErrMsg,null);
			}
			
			gvErrCode = '';
			gvErrMsg  = '';
		}
		
		initEvent();
		
		//loginRequest();
	});
	
	
	/**
	 * 로그인 요청
	 */
	function loginRequest(){
		if(isNullOrEmpty($('#txtPerCode').val())){
			showAlert('사용자인증','사용자 ID를 입력하세요.',function(e){
				$('#txtPerCode').focus();	
			});
			
			return false;
		}
	
		if(isNullOrEmpty($('#txtPerPass').val())){
			showAlert('사용자인증','사용자 비밀번호를 입력하세요.',function(e){
				$('#txtPerPass').focus();	
			});
			return false;
		}
		
		//$('#instcd').attr('disabled',false);
		$('#frmLogin').attr('action','<c:url value="/login/loginRequest"/>');
		$('#frmLogin').method = 'POST';
		$('#frmLogin').submit();
	}
	
	/**
	 * 이벤트 초기화
	 */
	function initEvent(){
		$('#btnLogin').on('click', function(e){
			loginRequest();
			
		});
		
		
		$('#txtPerPass').on('keypress',function(e){
			if(e.keyCode >= 65 && e.keyCode <= 90){
				console.log("upper : " + e.keyCode);
				$('#divCapsLock').css('display','block');
			}else{
				$('#divCapsLock').css('display','none');
			}
			
			if(e.keyCode == 13){
				loginRequest();
			}
		});
		
		
		
	}
	
	
</script>
</head>
<body class="hold-transition login-page">
	<div class="margin-top-7p">
		<div class="login-logo">
			<c:set var="title"><spring:message code="login.title" /></c:set> 
			<img src="<c:url value='${title}' />" width="205" />
		</div>
	</div>
<div class="padding-top-10 padding-bottom-10 bg-black">
	<div class="login-box">
		<!-- /.login-logo -->
		<div class="login-box-body bg-black">
			<p class="login-box-msg">Sign in to start your session</p>
			
			<!-- action="../../index2.html"  -->
			<form id="frmLogin" name="frmLogin" method="post">
				<!-- 경북대 추가 -->
<%-- 				<c:if test="${INSTCD_YN == 'Y' }">
					<div class="form-group has-feedback">
						<select class="form-control" id="hospitalCode" name="hospitalCode">
							<option value="031" selected>본원</option>
							<option value="032">칠곡</option>
						</select>
					</div>
				</c:if> --%>
				<!-- 경북대 끝 -->
				<div class="form-group has-feedback">
					<input class="form-control" type="email" id="txtPerCode" name="userId" placeholder="ID">
				</div>
				<div class="form-group has-feedback">
					<input class="form-control" type="password" id="txtPerPass" name="userPwd" placeholder="Password">
				</div>
				
				<div class="form-group" style="height:100%;">
					<span style="display:none;" id="divCapsLock">
						<b><span style="color:yellow;">Caps Lock</span></b>이 켜져 있습니다.
					</span>
				</div>
				
				
				<!-- 2017-09-05추가 -->
				<c:if test="${INSTCD_YN == 'Y' }">
					<div class="form-group has-feedback">
						<select class="form-control" id="instcd" name="instcd" placeholder="연구데이터선택" >
							<option value="030" selected>전체 데이터(본원,칠곡)</option>
							<option value="031">본원 데이터</option>
							<option value="032">칠곡 데이터</option>
						</select>
					</div>
				</c:if>
			</form>
			<div class="social-auth-links text-center">
				<button id="btnLogin" type="submit" class="btn btn-primary btn-block btn-flat btn-lg">Sign In</button>
			</div>
			<hr>
			<p class="text-center">
				<spring:message code="copyright" />
			</p>
	
		</div>
		<!-- /.login-box-body -->
	</div>
</div>

</body>
</html>
