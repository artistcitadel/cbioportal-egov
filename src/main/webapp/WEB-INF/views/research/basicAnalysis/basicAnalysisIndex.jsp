<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	
</head>
<body class="hold-transition skin-black sidebar-mini fixed">

<div class="">

	<!-- Content Wrapper. Contains page content -->
	<div class="content" style="padding:2px;">
		<tiles:insertAttribute name="content"/>
	</div>
</div>
<!-- ./wrapper -->


</body>
</html>
