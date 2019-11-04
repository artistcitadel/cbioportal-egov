<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<script type="text/javascript">
	

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
		
	<ul class="sidebar-menu">
		<li class="header">MAIN NAVIGATION</li>
		
		<c:forEach var="menuList" items="${MNUINX}" varStatus="status" >
			<c:if test="${menuList.MENU_NM == '리소스 모니터링' and menuList.MENU_NM != '로그관리'}">
					<c:if test="${VISUAL_USER_ID == 'SOFTCEN'}">
						<c:set var="seq" value = "${menuList.SEQ} }"/>
						<c:set var="upperSeq" value = "${menuList.UPPER_SEQ} }"/>
							
							<c:if test="${menuList.UPPER_SEQ == 0 and menuList.MENU_GBN_CD == '01000001'}">
							
								<c:if test="${menuList.SEQ == SEQ}">
									<li class="treeview active">
								</c:if>
								
								<c:if test="${menuList.SEQ != SEQ}">
									<li class="treeview">
								</c:if>
									<c:if test="${ menuList.CHKVAL == '1'}">
										<a href="<c:url value="${menuList.MENU_URL}?SEQ=${menuList.SEQ}&UPPER_SEQ=${menuList.UPPER_SEQ}" />">
										
											<i class="ion ion-erlenmeyer-flask"></i>
											<span>${ menuList.MENU_NM }</span>
											<span class="pull-right-container">
												<i class="fa fa-angle-left pull-right"></i>
											</span>
										</a>
										
										<c:forEach var="menuSubList" items="${MNUINX}" varStatus="status" >
											<c:if test="${menuList.SEQ == menuSubList.UPPER_SEQ}">
												<ul class="treeview-menu">
													<li class="padding-top-7 admin_log_webLog">
														<a href="<c:url value="${menuSubList.MENU_URL}?SEQ=${menuList.SEQ}&UPPER_SEQ=${menuList.UPPER_SEQ}" />">
														
														<%-- <a href="<c:url value="/admin/log/webLog" />"> --%>
															<i class="fa fa-circle-o"></i> ${menuSubList.MENU_NM }
														</a>
													</li>
												</ul>
											</c:if>
										</c:forEach>
									</c:if>
									
									<c:if test="${ menuList.CHKVAL == '0'}">
										<a href="#" class="no_permission">
											<i class="ion ion-erlenmeyer-flask"></i>
											<span style="color:#848484;">${ menuList.MENU_NM }</span>
											<span class="pull-right-container">
												<i class="fa fa-angle-left pull-right"></i> 
											</span>
										</a>
									</c:if>
			
				
																
								</li>
								
							</c:if>

					 </c:if> 
			</c:if>
			<c:if test="${menuList.MENU_NM != '리소스 모니터링' and menuList.MENU_NM != '로그관리'}">
				<c:if test="${menuList.MENU_NM == '유래물 비코드 업로드'}"> 
					<c:if test="${SITE_CODE == 'UUH'}"> 
						<c:set var="seq" value = "${menuList.SEQ} }"/>
						<c:set var="upperSeq" value = "${menuList.UPPER_SEQ} }"/>
							
							
							
							<c:if test="${menuList.UPPER_SEQ == 0 and menuList.MENU_GBN_CD == '01000001'}">
							
								<c:if test="${menuList.SEQ == SEQ}">
									<li class="treeview active">
								</c:if>
								
								<c:if test="${menuList.SEQ != SEQ}">
									<li class="treeview">
								</c:if>
									<c:if test="${ menuList.CHKVAL == '1'}">
										<a href="<c:url value="${menuList.MENU_URL}?SEQ=${menuList.SEQ}&UPPER_SEQ=${menuList.UPPER_SEQ}" />">
										
											<i class="ion ion-erlenmeyer-flask"></i>
											<span>${ menuList.MENU_NM }</span>
											<span class="pull-right-container">
												<i class="fa fa-angle-left pull-right"></i>
											</span>
										</a>
										
										<c:forEach var="menuSubList" items="${MNUINX}" varStatus="status" >
											<c:if test="${menuList.SEQ == menuSubList.UPPER_SEQ}">
												<ul class="treeview-menu">
													<li class="padding-top-7 admin_log_webLog">
														<a href="<c:url value="${menuSubList.MENU_URL}?SEQ=${menuList.SEQ}&UPPER_SEQ=${menuList.UPPER_SEQ}" />">
														
														<%-- <a href="<c:url value="/admin/log/webLog" />"> --%>
															<i class="fa fa-circle-o"></i> ${menuSubList.MENU_NM }
														</a>
													</li>
												</ul>
											</c:if>
										</c:forEach>
									</c:if>
									
									<c:if test="${ menuList.CHKVAL == '0'}">
										<a href="#" class="no_permission">
											<i class="ion ion-erlenmeyer-flask"></i>
											<span style="color:#848484;">${ menuList.MENU_NM }</span>
											<span class="pull-right-container">
												<i class="fa fa-angle-left pull-right"></i> 
											</span>
										</a>
									</c:if>
			
				
																
								</li>
								
							</c:if>
					</c:if>
				</c:if>
				<c:if test="${menuList.MENU_NM != '유래물 비코드 업로드'}">
					<c:set var="seq" value = "${menuList.SEQ} }"/>
					<c:set var="upperSeq" value = "${menuList.UPPER_SEQ} }"/>
						
						
						
						<c:if test="${menuList.UPPER_SEQ == 0 and menuList.MENU_GBN_CD == '01000001'}">
						
							<c:if test="${menuList.SEQ == SEQ}">
								<li class="treeview active">
							</c:if>
							
							<c:if test="${menuList.SEQ != SEQ}">
								<li class="treeview">
							</c:if>
								<c:if test="${ menuList.CHKVAL == '1'}">
									<a href="<c:url value="${menuList.MENU_URL}?SEQ=${menuList.SEQ}&UPPER_SEQ=${menuList.UPPER_SEQ}" />">
									
										<i class="ion ion-erlenmeyer-flask"></i>
										<span>${ menuList.MENU_NM }</span>
										<span class="pull-right-container">
											<i class="fa fa-angle-left pull-right"></i>
										</span>
									</a>
									
									<c:forEach var="menuSubList" items="${MNUINX}" varStatus="status" >
										<c:if test="${menuList.SEQ == menuSubList.UPPER_SEQ}">
											<ul class="treeview-menu">
												<li class="padding-top-7 admin_log_webLog">
													<a href="<c:url value="${menuSubList.MENU_URL}?SEQ=${menuList.SEQ}&UPPER_SEQ=${menuList.UPPER_SEQ}" />">
													
													<%-- <a href="<c:url value="/admin/log/webLog" />"> --%>
														<i class="fa fa-circle-o"></i> ${menuSubList.MENU_NM }
													</a>
												</li>
											</ul>
										</c:if>
									</c:forEach>
								</c:if>
								
								<c:if test="${ menuList.CHKVAL == '0'}">
									<a href="#" class="no_permission">
										<i class="ion ion-erlenmeyer-flask"></i>
										<span style="color:#848484;">${ menuList.MENU_NM }</span>
										<span class="pull-right-container">
											<i class="fa fa-angle-left pull-right"></i> 
										</span>
									</a>
								</c:if>
		
			
															
							</li>
							
						</c:if>
				</c:if>
				
			</c:if>
		</c:forEach>

	</ul>
</section>
<!-- /.sidebar -->