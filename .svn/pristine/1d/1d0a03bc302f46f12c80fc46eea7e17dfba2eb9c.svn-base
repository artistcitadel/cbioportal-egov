<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 좌측 네비게이션에 현재 페이지에 해당하는 항목 표시 -->
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
	<ul class="sidebar-menu tree" data-widget="tree" >
		<li class="header">MAIN NAVIGATION</li>

			<!--  항목 리스트를 받아와 뿌리기 -->
			<c:forEach items="${reptMenuList}" var="reptMenu">
				<c:if test="${reptMenu.PAGE_COUNT > 0}"> <!-- 세부항목 리스트가 없을 경우 출력되지 않는다 -->
					<li class="treeview"><a href="#"><i class="ion ion-funnel"></i>
						<span> ${reptMenu.NAME}
						</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
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
										<a href="javascript:goPage('${reptSubMenu.SEQ}')" >
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
</section>
<!-- /.sidebar -->