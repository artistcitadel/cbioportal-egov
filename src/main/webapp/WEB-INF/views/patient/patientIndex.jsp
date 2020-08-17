<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<% String docRoot = "/"; %>
<!DOCTYPE html>
<html>
<head>
	<tiles:insertAttribute name="head_css"/>
	<tiles:insertAttribute name="js"/>
	<link href="https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/tooltipster/dist/css/tooltipster.bundle.min.css" type="text/css" />
    <link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-shadow.min.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/civic/civicCard.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/style.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/indicator.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/ballcircus.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/linepulse.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/squarejelly.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/ballclip.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/packman.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/linespin.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/spinfade.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/ballelastic.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/linescalepulseoutrapid.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/loader/stylesmodule.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/jqtip/jquery.qtip.min.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/jbox/jbox.all.min.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/oncob-styles/oncokb.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/main-module.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/tabs-module.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/collapsible-module.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/level-module.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/oncoKbTreatmentTable.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/annotationStyles.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/oncokb.css" type="text/css" />
	<link rel="stylesheet" href="<%=docRoot%>js/page/patient/chromasome/listGroupItem.css" type="text/css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<%--<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/bootstrap4/bootstrap.min.css" type="text/css" />--%>
	<%--<link rel="stylesheet" href="<%//docRoot%>js/page/patient/plugin/datatables/datatables.min.css" type="text/css" />--%>
	<%--<link rel="stylesheet" href="<%//docRoot%>js/page/patient/plugin/bootstrap4/fontawasome5.css" type="text/css" />--%>
	<%--<link rel="stylesheet" href="<%=docRoot%>js/page/patient/plugin/bootstrap4/style.css" type="text/css" />--%>
	<%--<link rel="stylesheet" href="<%=docRoot%>jqwidgets/styles/jqx.base.css" type="text/css" />--%>

	<style>
		.box-header {
			background-color: #79bbb5;
			color: #ffffff;
			display: block;
			padding: 10px;
			position: relative;
		}
		.box-title {
			display: inline-block;
			font-weight:bold;
			margin: 0;
			line-height: 1;
		}
		.font-small {
			font-size: xx-small;
			font-weight: bold;
		}
		.font-msmall {
			font-size: small;
			/*font-weight: bold;*/
		}
		.qtip-content {
			font-size:13px;
		}

		.qtip.my-qtip {
			max-width: none;
		}
		.tooltip-content{
			position: absolute;
			padding : 10px;
			border: 1px solid #dddddd;
			/*top: 0;
			left: 0;
			width: 100%;
			height: 100%;*/
			width: 600px;
			height: 474px;
			z-index: 999;
			background-color: white;
		}
	</style>

	<script type="text/javascript" src="<%=docRoot%>js/page/patient/plugin/jquery-ui-1.8.13.custom.min.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/popper.min.js"></script>
    <%--<script type="text/javascript" src="<%//docRoot%>js/page/patient/plugin/datatables/datatables.min.js"></script>--%>
	<script type="text/javascript" src="<%=docRoot%>js/page/patient/plugin/jbox/jbox.all.min.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/jqtip/jquery.qtip.min.js"></script>
    <script type="text/javascript" src="<%=docRoot%>js/page/patient/plugin/tooltipster/dist/js/tooltipster.bundle.min.js" ></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/lodash.min.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/const.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/patientAction.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/patientUtil.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/FrequencyBar.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/MutCohort.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/CnaCohort.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/svCohort.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/SampleLabel.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/ThumbnailExpandVAFPlot.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/patientAttr.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/patientInfo.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/d3/d3.min.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/VAPlot/VAFPlot.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/VAPlot/legacyVAFCode.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/blockUI.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/moment-with-locales.min.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/raphael/raphael.min.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/raphael/raphaelscale.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/hotspot.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/hotspotGenes.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/mycancergenome.js"></script>
	<script type='text/javascript' src="<%=docRoot%>js/page/patient/plugin/cancergenome.js"></script>
	<script type="text/javascript" src="<%=docRoot%>js/page/patient/plugin/tooltipster-scrollable.min.js"></script>
	<script type="text/javascript" src="<%=docRoot%>js/page/patient/plugin/notify.min.js"></script>

<script>
  var gvServer = '/';
</script>
</head>
<%--<body class="hold-transition skin-black sidebar-mini fixed ">--%>
<body>

<div class="wrapper">
	<header class="main-header">
		<tiles:insertAttribute name="top"/>
	</header>
	<!-- Left side column. contains the logo and sidebar -->
		<%--<aside class="main-sidebar">
            <tiles:insertAttribute name="adminLeft"/>
        </aside>--%>

	<!-- Content Wrapper. Contains page content -->
	<%--<div class="content-wrapper" data-toggle="control-sidebar">--%>

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
       /* $(document).ready(function () {
            $(".sidebar-toggle").trigger("click");
        });*/
       $("body").addClass("sidebar-collapse");
</script>

</body>
</html>