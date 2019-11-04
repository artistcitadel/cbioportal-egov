<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<script>
	gvSERVER	= '<%= session.getAttribute("SERVER") %>';
	gvCONTEXT 	= '<%= session.getAttribute("CONTEXT_PATH") %>';
	
	</script>
	
</head>
<body class="hold-transition skin-black sidebar-mini fixed">

<div class="wrapper">
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper" data-toggle="control-sidebar" style="padding-top:0px; margin-left:0px;">
		<tiles:insertAttribute name="content"/>
	</div>
</div>
<!-- ./wrapper -->
		<!-- Control Sidebar -->
	<aside class="control-sidebar control-sidebar-dark" style="bottom:0; padding-top:0px;">
			<tiles:insertAttribute name="visualizeSideBar"/>
	</aside>
</body>
</html>
