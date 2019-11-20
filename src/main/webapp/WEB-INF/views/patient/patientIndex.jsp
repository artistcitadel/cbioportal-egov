<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<% String docRoot = "/"; %>
<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<%--<tiles:insertAttribute name="patient_top"/>--%>
	<%--<link rel="stylesheet" href="docRoot%>css/ho.css" type="text/css" />
	<link rel="stylesheet" href="docRoot%>css/prefixed-bootstrap.min.css" type="text/css" />--%>
	<%--<link rel="stylesheet" href="docRoot%>css/page/patient/styles.css" type="text/css" />
	<link rel="stylesheet" href="docRoot%>css/page/patient/cbio-portal-styles.css" type="text/css" />
	<link rel="stylesheet" href="docRoot%>css/page/patient/patient.css" type="text/css" />
	<link rel="stylesheet" href="docRoot%>css/page/patient/react-table.css" type="text/css" />--%>
	<link rel="stylesheet" href="<%=docRoot%>css/page/patient/styles0.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>css/page/patient/styles4.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>css/page/patient/styles11.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>css/page/patient/styles16.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/raphael/jquery.qtip.min.css" type="text/css" />
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
		.font-small {
			font-size: xx-small;
			font-weight: bold;
		}
        .spinner {
            margin: 100px auto;
            width: 50px;
            height: 40px;
            text-align: center;
            font-size: 10px;
			z-index:999;
        }

        .spinner > div {
            background-color: #67989f;
            height: 100%;
            width: 6px;
            display: inline-block;

            -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
            animation: sk-stretchdelay 1.2s infinite ease-in-out;
        }

        .spinner .rect2 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }

        .spinner .rect3 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }

        .spinner .rect4 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }

        .spinner .rect5 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }

        @-webkit-keyframes sk-stretchdelay {
            0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
            20% { -webkit-transform: scaleY(1.0) }
        }

        @keyframes sk-stretchdelay {
            0%, 40%, 100% {
                transform: scaleY(0.4);
                -webkit-transform: scaleY(0.4);
            }  20% {
                   transform: scaleY(1.0);
                   -webkit-transform: scaleY(1.0);
               }
        }
        .center {
            position: absolute; /* */
            left: 5%;
            top: 20%;
            transform: translate(-50%, -50%);
        }

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
	<%--<div class="control-sidebar-bg"></div>--%>
	<%--<tiles:insertAttribute name="modal"/>--%>
</div>
<!-- ./wrapper -->
<script>
    $(document).ready(function () {
        $(".sidebar-toggle").trigger("click");
    });
</script>

<link rel="stylesheet" href="<%=docRoot%>jqwidgets/styles/jqx.base.css" type="text/css" />
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxmenu.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.selection.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.columnsresize.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.pager.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.sort.js"></script>
<%--<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.edit.js"></script>--%>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/jqxgrid.filter.js"></script>
<script type="text/javascript" src="<%=docRoot%>jqwidgets/scripts/demos.js"></script>
<script src="<%=docRoot%>js/lodash.min.js"></script>
<script src="<c:url value="/js/common_const.js" />"></script>
<script src="<c:url value="/js/page/patient/patientAction.js" />"></script>
<script src="<c:url value="/js/page/patient/patientUtil.js" />"></script>
<%--<script src="<c:url value="/js/jquery.tmpl.min.js" />"></script>
<script src="<c:url value="/js/jquery.tmplPlus.min.js" />"></script>--%>
<script type='text/javascript' src="<c:url value="/js/page/patient/moment-with-locales.min.js" />"></script>
<script type='text/javascript' src="<c:url value="/js/raphael/raphael.min.js" />"></script>
<script type='text/javascript' src="<c:url value="/js/raphael/raphaelscale.js" />"></script>
<script type='text/javascript' src="<c:url value="/js/raphael/jquery.qtip.min.js" />"></script>
</body>
</html>
