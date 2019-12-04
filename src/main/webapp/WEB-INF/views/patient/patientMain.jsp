<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>

	#grid:hover{
		cursor: pointer;
	}
</style>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			Patient List
			<small></small>
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li><a href="#">Patient</a></li>
			<li class="active">Patient select</li>
		</ol>
	</section>

	<!-- Main content -->
	<section class="content">

		<!-- Default box -->
		<div class="box">
			<div class="box-header with-border">
				<h3 class="box-title">patient select</h3>

				<div class="box-tools pull-right">
					<%--<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
							title="Collapse">
						<i class="fa fa-minus"></i></button>
					<button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
						<i class="fa fa-times"></i></button>--%>
				</div>
			</div>
			<div class="box-body">

				<div class="container-fulid" >
					<div class="row">
						<div class="col-xs-2" style="width:5%;">
							<h4><span class="label label-primary">chort</span></h4>
						</div>
						<div class="col-xs-4">
							<h4>
								<span class="label label-default">Chort1</span>
								<span class="label label-default">Chort1</span>
								<span class="label label-default">Chort1</span>
							</h4>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-2" style="width:5%;">
							<h4><span class="label label-success">gene</span></h4>
						</div>
						<div class="col-xs-4">
							<h4>
								<span class="label label-default">gene1</span>
								<span class="label label-default">gene1</span>
								<span class="label label-default">gene1</span>
							</h4>
						</div>
					</div>


					<div class="row">
						<div class="col-xs-2" style="width:5%;">
							<h4><span class="label label-success">ptient</span></h4>
						</div>
						<div class="col-xs-4">
							<ul class="nav nav-pills" role="tablist">
								<li role="presentation"><a href="#">Messages <span class="badge">X</span></a></li>
								<li role="presentation"><a href="#">Messages <span class="badge">X</span></a></li>
								<li role="presentation"><a href="#">Messages <span class="badge">X</span></a></li>
							</ul>
						</div>
					</div>
			</div>
		 </div>
			<!-- /.box-body -->
			<div class="box-footer">

			</div>
			<!-- /.box-footer-->
		</div>
		<!-- /.box -->



		<!-- Default box -->
		<div class="box">
			<div class="box-header with-border">
				<h3 class="box-title">Patient List</h3>

				<div class="box-tools pull-right">
					<%--<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
							title="Collapse">
						<i class="fa fa-minus"></i></button>
					<button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
						<i class="fa fa-times"></i></button>--%>
				</div>
			</div>
			<div class="box-body">

				<div class="container-fulid" >
					<div id="grid">
					</div>
				</div>
			</div>
			<!-- /.box-body -->
			<div class="box-footer">

			</div>
			<!-- /.box-footer-->
		</div>
		<!-- /.box -->


	</section>
	<!-- /.content -->
	<script src="<c:url value="/js/page/patient/patientMain.js" />"></script>
</div>
<!-- /.content-wrapper -->
