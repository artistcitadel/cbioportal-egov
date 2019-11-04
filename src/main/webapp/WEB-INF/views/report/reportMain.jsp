<%@page import="java.util.HashMap"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.softcen.bigcen.med.tableau.TableauServlet"%>


<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		정형보고서
		<small>Cross-sectional studies</small>
	</h1>
	
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="row">
				<section class="col-lg-12">
					<div class="box">
						<div class="box-header">
							<i class="fa fa-comments-o"></i>
							<h3 class="box-title">Graph</h3>
						</div>
						<div class="box-body" style="overflow: hidden;">
							<iframe id="iframeId" src="${tableauUrl}" width="100%" height="840" frameborder="0"></iframe>
						</div>
					</div>
				</section>
			</div>
			
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->


<!-- 페이지용 js -->
<script src="<c:url value="/js/page/report/reportMain.js" />"></script>