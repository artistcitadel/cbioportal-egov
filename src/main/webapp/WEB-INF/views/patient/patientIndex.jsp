<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<tiles:insertAttribute name="patient_top"/>

	<style>
		.patient-table {
			font-family: "Segoe UI", Arial, sans-serif;
			border: 2px solid #07093D;
			border-spacing: 0;
			border-collapse: collapse;
		}
		.patient-table td {
			border: 1px solid #07093D;
			border-left: 0;
			border-right: 0;
			padding: 0.25em 0.5em
		}
		.patient-table th {
			font-size: 1.1em;
			text-align: left;
			background-color: #07093D;
			color: white;
			padding: 4px 0 8px 8px;
		}

		.patient-table tr:nth-child(even) {
			background-color: #9CC4E4;
		}
		.patient-table tr:nth-child(odd) {
			background-color: #E9F2F9;
		}

		#scroll {
			overflow-y:auto;
			overflow-x:hidden;
			height:auto;
			max-height:400px;
			border:1px solid black;
			width:100%;
		}
		/*.form-control-inline {
			width:150px;
		}*/
		/*.col {
			background-color: white;
			height: 35px;
			padding: 0px;
		}
		.row {
		    height:25px;
			margin-top:6px;
		  }*/
	</style>
</head>
<body class="hold-transition skin-black sidebar-mini fixed">
<div class="wrapper">
	<header class="main-header">
		<tiles:insertAttribute name="top"/>
	</header>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="main-sidebar">
		<tiles:insertAttribute name="adminLeft"/>
	</aside>

	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper" data-toggle="control-sidebar">
		<tiles:insertAttribute name="content"/>
		<div style="position: absolute;left:-999px;">
				<input type="text" class="">
		</div>
	</div>
	<!-- /.content-wrapper -->
	<!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
	<div class="control-sidebar-bg"></div>
	<tiles:insertAttribute name="modal"/>
</div>
<!-- ./wrapper -->
<script src="<c:url value="/js/page/patient/patientAction.js" />"></script>
<script src="<c:url value="/js/jquery.tmpl.min.js" />"></script>
<script src="<c:url value="/js/jquery.tmplPlus.min.js" />"></script>
<script src="<c:url value="/js/raphael.min.js" />"></script>
</body>
</html>
