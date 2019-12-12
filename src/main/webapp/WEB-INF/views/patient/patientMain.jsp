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
			<li><a href="#"><i class="fa fa-home"></i> Home</a></li>
			<li><a href="#">Patient</a></li>
			<li class="active">Patient select</li>
		</ol>
	</section>

	<section class="content">
        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">선택</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                            title="Collapse">
                        <i class="fa fa-minus"></i></button>
                 <%--   <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                        <i class="fa fa-times"></i></button>--%>
                </div>
            </div>
            <div class="box-body">
				<div class="container-fulid" >
					<%--<div class="row">
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
					</div>--%>


					<div class="row">
						<div class="col-xs-2" style="width:5%;">
							<h4><span class="label label-success">ptient</span></h4>
						</div>
						<div class="col-xs-4" style="width: auto;">
							<ul id="patientList" class="nav nav-pills" role="tablist" style="width: auto;">
								<%--<li role="presentation"><a href="#">Messages <span class="badge">X</span></a></li>
								<li role="presentation"><a href="#">Messages <span class="badge">X</span></a></li>
								<li role="presentation"><a href="#">Messages <span class="badge">X</span></a></li>--%>
							</ul>
						</div>
					</div>
				</div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <%--Footer--%>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>


		<section class="content">

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
					<div class="row" style="width:60%;float:right;">
						<div class="col-md-10" style="width:80%;float:right;width:inherit;">
							<div class="btn-group" style="width:40%;">
								<button class="btn btn-success" type="button" id="movePatientView">
									Patient View
								</button>

								<form role="search" style="width:400px;">
									<div class="input-group">
										<input type="text" id="search_pat" class="form-control" style="margin-left:8px;" placeholder="Search...">
										<%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
									</div>
								</form>

							</div>
						</div>

					</div>

					<div class="row">
						<div class="col-xs-12 col">
					<table id="MUTATIONS_t" class="table table-bordered table-stripe">
						<thead>
						<tr style="color: #0d6aad">
                          <th>
							  Patient
						  </th>
							<th>
								Sample
							</th>
							<th>
								Age
							</th>
							<th>
								Cancer study
							</th>
							<th>
								Cancer Type
							</th>
							<th>
								Cancer Type Detail
							</th>
						</tr>
						</thead>
						<tbody id="pat_con">

						</tbody>
					</table>
						</div>
					</div>

				</div>
			</div>
			<!-- /.box-body -->
			<div class="box-footer">
				<div id="pat_pageview" class="com-paging">
			</div>
			<!-- /.box-footer-->
		</div>
		<!-- /.box -->

		</div>
	</section>

	<div id="spinner" style="zIndex:100;position:relative;display:none;">
		<div class="centered" >
			<div class="sk-spinner la-line-scale-pulse-out big">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
		<iframe id="ifr"
				style="width:100%;position:relative;zIndex:100;border:none;"
				src=""
		>
		</iframe>
	</div>

	<!-- /.content -->
	<script src="<c:url value="/js/page/patient/patientMain.js" />"></script>
	<script src="<c:url value="/js/page/patient/pagination.js" />"></script>
	<form name="pform" id="pform" method="post" action="/patient/patientView">
		<input type="hidden" name="patient" id="patient" />
	</form>
</div>
<!-- /.content-wrapper -->
