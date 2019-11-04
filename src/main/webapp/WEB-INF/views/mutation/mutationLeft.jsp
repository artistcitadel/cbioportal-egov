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
		<li class="treeview">
			<a href="#">					
				<i class="ion ion-erlenmeyer-flask"></i>
				<span>Breast</span>
				<span class="pull-right-container">
					<i class="fa fa-angle-left pull-right"></i>
				</span>
			</a>
		</li>
		

	</ul>
</section>
<!-- /.sidebar -->