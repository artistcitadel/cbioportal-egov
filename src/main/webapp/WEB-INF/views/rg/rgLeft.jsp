<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script>
$(document).ready(function() {
    var url = window.location;
    /* var element = $('ul.treeview-menu a').filter(function() {
    	return this.href == url || url.href.indexOf(this.href) == 0;
	}).parent().addClass('active'); */
    

    /* if (element.is('li')) { 
         element.addClass('active').parent().parent('li').addClass('active');
         $().removeClass()
    }  */
    //$("#configuration_sidebar_content li.active").attr('id')
    
    var element = $('ul.treeview-menu li.active')
    
    if (element.is('li')) { 
        element.addClass('active').parent().parent('li').addClass('active');
        $().removeClass()
   }
    
    if(!isNull("${reptSeq}")){
    	//var scrollPosition = $('#reportList_${reptSeq}').offset().top;
    	var scrollPosition = "${reptSp}";
    	console.log(scrollPosition);
    	$('.sidebar').slimScroll({ scrollTo : scrollPosition + 'px' });
    }
    
});

var goPage = function(seq){
	var scrollPosition = $('.sidebar').scrollTop();
	console.log(scrollPosition);
	location.href = "reportMain?SEQ=" + seq + "&SP=" + scrollPosition;
}


</script>
<!-- sidebar: style can be found in sidebar.less -->
<section class="sidebar">
	<!-- Sidebar user panel -->
	<div class="user-panel padding-top-20 padding-bottom-20">
		<div class="info text-align-center" style="left:0px;padding:0px;">
			<p><i class="fa fa-user-circle text-aqua"></i>&nbsp;&nbsp;${PER_NAME}</p>
			<a><i class="fa fa-id-card"></i> ${DEPT_NAME}</a>
		</div>
	</div>
	<!-- sidebar menu: : style can be found in sidebar.less -->
	
	<form name="frmRgContent" method="post" >
		<input type="hidden" name="contextPath" id="contextPath" value="${CONTEXT_PATH }"/>
		<input type="hidden" name="menuSeq" id="menuSeq" value="${dsStartMenuMap.ACTIVE_SEQ }"/> 
		<input type="hidden" name="menuNm" id="menuNm" value="${dsStartMenuMap.ACTIVE_NM }"/>
		<input type="hidden" name="menuUrl" id="menuUrl" value="${dsStartMenuMap.ACTIVE_URL }"/>
		<input type="hidden" name="TARGET_ID" id="TARGET_ID" value=""/>
		<input type="hidden" name="USER_ID" id="USER_ID" value=""/>
		<input type="hidden" name="URL" id="URL" value=""/>
	</form>
	
	
	<ul class="sidebar-menu"  >
		<li class="header">MAIN NAVIGATION</li>
		<c:forEach var="item" items="${dsRgMenuList }" varStatus="status">
			<c:if test="${item.UPPER_SEQ == '0' }">
				<li class="treeview  ${item.ACTIVE }">
					<a href="#">
						<i class="fa fa-heartbeat"></i>
						<%-- <img src='<c:url value="/images/icon_trauma.png" ></c:url>' width="20" height="20"/> --%>
						${item.MENU_NM }
					</a>
					<ul class="treeview-menu">
						<c:forEach var="subItem" items="${dsRgMenuList }" varStatus="status2">
							<c:if test="${item.SEQ == subItem.UPPER_SEQ }">
								<c:choose>
									<c:when test="${subItem.CHKVAL == '1' }">
										<c:if test="${subItem.MENU_NM ne 'Report' }">
											<li id="${subItem.SEQ }">
												<a href="javascript:goMenu('${subItem.SEQ }','${item.MENU_NM }', '${subItem.MENU_NM }','${subItem.MENU_URL }')" >
												<i class="fa fa-circle-o"></i><span style="vertical-align:middle; width: 180px; display: inline-block; white-space: normal;">
												${subItem.MENU_NM }</span></a>
											</li>
										</c:if>
									</c:when>
									
									<c:otherwise>
										<li id="${subItem.SEQ }">
											<a href="#" class="no_permission">
											<i class="fa fa-circle-o"></i><span style="vertical-align:middle; width: 180px; display: inline-block; white-space: normal;">
											${subItem.MENU_NM }</span></a>
										</li>
									</c:otherwise>
								</c:choose>
							</c:if>					
						</c:forEach>
					</ul>
				
				</li>
				
			</c:if>
			
		</c:forEach>
		
		<!-- 정형보고서 -->
		<c:set var="SITE_CODE" value="${SITE_CODE}" />
			<c:choose>
			<c:when test="${SITE_CODE eq 'UUH'}">
			
				<c:forEach var="item" items="${dsRgMenuList}" varStatus="status">
					<c:if test="${item.CHKVAL == '1' }">
						<c:choose>
						<c:when test="${item.MENU_NM == 'Report' }">
							<li class="treeview ${item.ACTIVE }">
								<a href="#">
									<i class="ion ion-stats-bars"></i>
									<span> 정형보고서</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								
								<ul class="treeview-menu">
								<!--  항목 리스트를 받아와 뿌리기 -->
								<c:forEach items="${reptMenuList}" var="reptMenu">
									<c:if test="${reptMenu.PAGE_COUNT > 0}"> <!-- 세부항목 리스트가 없을 경우 출력되지 않는다 -->
										<li class="treeview">
											<a href="#"><i class="ion ion-funnel"></i>
												<span> ${reptMenu.NAME}</span>
												<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
											</a>
									</c:if>
											<!--  각 항목 리스트에 해당하는 세부 항목 리스트 받아와 뿌리기 -->
											<ul class="treeview-menu">
												<c:forEach items="${reptSubMenuList}" var="reptSubMenu">
													<c:if test="${reptMenu.SEQ == reptSubMenu.CATE_CODE}">
														<c:set var="isPermission" value = "0"/>
														<c:set var="seq" value = "${reptSeq }"/>
														<c:choose>
															<c:when test="${reptSubMenu.SEQ == reptSeq}">
																<li class="active" >
															</c:when>
															<c:otherwise>
																<li>
															</c:otherwise>
														</c:choose>
														
														<!-- 권한 부여 받은 리스트만 도표 볼 수 있음 -->
														<c:forEach items="${reptMnuINK}" var="reptSubINK">
															<c:if test="${reptSubINK.SEQ == reptSubMenu.SEQ}">
																<a href="javascript:goReport('${reptSubMenu.SEQ}', '${reptSubMenu.TARGET_ID}', '${reptSubMenu.USER_ID}', '${reptSubMenu.TITLE}', '${reptSubMenu.URL}')" >
																<%-- <a href="reportMain?SEQ=${reptSubMenu.SEQ}"> --%>
																<c:set var="isPermission" value = "1"/>
															</c:if>
														</c:forEach>
														<!-- 권한이 없는 리스트 클릭 시 no permission alert 띄움 -->
														<c:if test="${isPermission == 0}"> 
															<a href="#" class="no_permission">
														</c:if>
														
														<i class="fa fa-circle-o"></i><span style="vertical-align:middle; width: 180px; display: inline-block; white-space: normal;"> 
																							${reptSubMenu.TITLE} </span></a>
														</li>
													</c:if>			
												</c:forEach>
											</ul>
											
										</li>		
								</c:forEach>
								</ul>	
							</li>	
							
						</c:when>
						</c:choose>
						
					</c:if>
				</c:forEach>
				
		</c:when>
		</c:choose>
	</ul>
</section>
<!-- /.sidebar -->

<!-- 페이지용 js -->
<script src="<c:url value="/js/page/rg/rgLeft.js" />"></script>
