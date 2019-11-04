<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
		#subContentArea button {
			display:none;
		}
		
		#subContentArea button[data-toggle="tooltip"] {
			display:block;
		}
		
		#subContentArea input {
			pointer-events: none;
		    background-color: #eee;
		    color: #555;
		    opacity: 1;
		}
		
		#subContentArea .checkbox {
			pointer-events: none;
		    opacity: 1;
		}
		
		#subContentArea select {
			pointer-events: none;
		    background-color: #eee;
		    color: #555;
		    opacity: 1;
		}
		
		#sub01DataArea, #sub02DataArea, .grouping, .input-group-addon, .edit_delete {
			display:none;
		}
		
		.instcdDataView {
			display:none;
		}
	</style>

	<script src="<c:url value="/js/page/research/researchCommon.js" />"></script>
	<script src="<c:url value="/js/page/research/researchRenderers.js" />"></script>
	<script src="<c:url value="/js/page/research/researchResult.js" />"></script>
	
</head>
<body class="hold-transition skin-black sidebar-mini fixed">

<div class="wrapper">

	<!-- Content Wrapper. Contains page content -->
	<div id="subContentArea" class="content-wrapper height-80vmin" data-toggle="control-sidebar" style="margin-left:0px; padding-top:0px;overflow:scroll;">
	<br>
		<input type="hidden" id="txtFROM_MAIN_YN" value="${FROM_MAIN_YN}">
		<input type="hidden" id="txtLINK_TYPE" value="${LINK_TYPE}">
		<input type="hidden" id="txtMAIN_CONT_SEQ" value="${CONT_SEQ}">
		<input type="hidden" id="txtMAIN_DATA_SEQ" value="${DATA_SEQ}">
		<input type="hidden" id="txtCONT_SEQ" value="">
		<input type="hidden" id="txtDATA_SEQ" value="">
		<input type="hidden" id="txtSHARE_CODE" value="">
		
		<input type="hidden" value="" id="grpIdx" >
		<input type="hidden" value="" id="grpStudyItemIdx" >
		<input type="hidden" value="" id="grpEventIdx" >
		<input type="hidden" value="" id="grpCensoredDataIdx" >
		<input type="hidden" value="" id="grpCaseIdx" >			<!-- 사례군 -->
		<input type="hidden" value="" id="grpControlIdx" >			<!-- 대조군 -->
		<tiles:insertAttribute name="content"/>
	</div>
	
	<!-- Control Sidebar -->
	<aside class="control-sidebar control-sidebar-dark" style="display:none;">
		<tiles:insertAttribute name="researchSideBar"/>
	</aside>
</div>
<!-- ./wrapper -->


</body>
</html>
