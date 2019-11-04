<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<style>

.content{
	background: #fff;
    border-top: 1px solid #ddd;
}


</style>
<head>

</head>
<!-- Main content -->
<section class="content">
	<div class="row">
		<div class="col-lg-12">
              	<div class="item" id="summaryArea"></div>
		</div>
	</div>

	<!-- Main row -->
	<div class="row" id="chartOuterBox">

	</div>
	<div class="row">
		<div class="col-12-lg" id="tmptime" style="margin:30px;">
			
		</div>
	</div>
	<div class="row">
		<ul id="item_1" class="sortable_area connectedSortable col-lg-3">
			<li class="list" id="box_item_1" num="1" graph="pie">
				<div class="box">
					<div class="box-header">
						<div class="box-title"><span>나의 연구활동<span></div>
						
							<div class="btn-group btn-group-sm up-right-side" role="group" id="btnDropdownMenu_1" style="">
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_1">
							     <i class="fa fa-fw fa-bars" aria-hidden="true"></i>
							    </button>
							   <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_1" id="dropdownli_1">
							     <li id="btnShowTable"><a href="#">Show Table</a></li>
							   </ul>
							 </div>
						 
					</div>
					
					<div class="box-body min-height-340">
						<!-- grid item -->
						<div class="item" id="graphTest1" name="ABCD">
							
						</div>
						<!-- /.grid item -->
					</div>
				</div>
			</li>
		    <li class="list" id="box_item_2" num="2" graph="bar">
		    	<div class="box">
					<div class="box-header">
						<h3 class="box-title"><span>나의 연구활동<span></h3>
						<div class="btn-group btn-group-sm up-right-side" role="group" id="btnDropdownMenu_2" style="">
							<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_2">
							     <i class="fa fa-fw fa-bars" aria-hidden="true"></i>
							    </button>
						   <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_2" id="dropdownli_2">
						     <li id="btnShowAAA"><a href="#">AAA</a></li>
						   </ul>
						 </div>
					</div>
					<div class="box-body min-height-340">
						<div class="item" id="graphTest2">
							
						</div>
					</div>
				</div>
		    </li>
		</ul>
		<ul id="item_2" class="sortable_area connectedSortable col-lg-3">
			<li class="list">
				<div class="box">
					<div class="box-header">
						
						<h3 class="box-title">나의 연구활동</h3>
					</div>
					<div class="box-body min-height-340">
						<!-- grid item -->
						<div class="item" id="graphTest3" name="EFGH">
							
						</div>
						<!-- /.grid item -->
					</div>
				</div>
			</li>
		    <li class="list">
		    	<div class="box">
					<div class="box-header">								
						<h3 class="box-title">나의 연구활동</h3>
					</div>
					<div class="box-body min-height-340">
						<div class="item" id="graphTest4">
							
						</div>
					</div>
				</div>
		    </li>
		</ul>
		<ul id="item_3" class="sortable_area connectedSortable col-lg-3">
			<li class="list dragItem" id="box_1">
				<div class="box">
					<div class="box-header"><i class="ion ion-university"></i>
						<h3 class="box-title">나의 연구활동</h3>
					</div>
					<div class="box-body min-height-340">
						<!-- grid item -->
						<div class="item" id="graphTest5">
							
						</div>
						<!-- /.grid item -->
					</div>
				</div>
			</li>
		    <li class="list dragItem" id="box_2">
		    	<div class="box">
					<div class="box-header">
						
						<h3 class="box-title">나의 연구활동</h3>
					</div>
					<div class="box-body min-height-340">
						<div class="item" id="graphTest6">
							
						</div>
					</div>
				</div>
		    </li>
		 </ul>
		 <ul id="item_4" class="sortable_area connectedSortable col-lg-3">
			<li class="list dragItem">
				<div class="box">
					<div class="box-header">
						
						<h3 class="box-title">나의 연구활동</h3>
					</div>
					<div class="box-body min-height-340">
						<!-- grid item -->
						<div class="item" id="graphTest7">
							
						</div>
						<!-- /.grid item -->
					</div>
				</div>
			</li>
		    <li class="list dragItem">
		    	<div class="box">
					<div class="box-header">
						
						<h3 class="box-title">나의 연구활동</h3>
					</div>
					<div class="box-body min-height-340">
						<div class="item" id="graphTest">
							
						</div>
					</div>
				</div>
		    </li>
		</ul>

	</div>
	
</section>
