<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<style>

.content{
	background: #fff;
    border-top: 1px solid #ddd;
    padding-right: 20px;
    padding-left: 20px;
}
.modebar{
	left: 0;
	z-index:1 !important;;
}
</style>

<!-- Main content -->
<section class="content">
<!-- 	<div class="row">
		<div class="col-lg-12">
              	<div class="item" id="summaryArea"></div>
		</div>
	</div>

	Main row
	<div class="row" id="chartOuterBox">

	</div>
	 -->
	<div class="row">
		<ul id="item_1" class="sortable_area connectedSortable col-lg-3">
			<!-- <li class="list pie" id="box_item_1_1" num=1 idx=1 graph="pie">
				<div class="box" style="height:inherit; width:inherit;">
					<div class="box-header">
						<div class="box-title"><span>나의 연구활동<span></div>
						
							<div class="btn-group btn-group-sm up-right-side btn-drop-menu" role="group" id="btnDropdownMenu_1" style="">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_1">
							     <i class="fa fa-fw fa-bars" aria-hidden="true"></i>
							    </button>
							   <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_1" id="dropdownli_1">
							     <li id="btnShowTable" class="showTable"><a href="#">Show Table</a></li>
							   </ul>
							</div>
						 
					</div>
					
					<div class="box-body" style="height:inherit; width:inherit;">
						grid item
						<div class="item" id="boxChart1" name="ABCD">
							
						</div>
						<div class="item" id="boxChart1_jqx" name="ABCD">
							
						</div>
						/.grid item
					</div>
				</div>
			</li> -->
		   <!--  <li class="list bar" id="box_item_1_2" num=2 idx=1 graph="bar">
		    	<div class="box">
					<div class="box-header">
						<div class="box-title"><span>나의 연구활동<span></div>
						
							<div class="btn-group btn-group-sm up-right-side btn-drop-menu" role="group" id="btnDropdownMenu_2" style="">
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_1_2">
							     <i class="fa fa-fw fa-bars" aria-hidden="true"></i>
							    </button>
							   <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_1_2" id="dropdownli1__2">
							     <li id="btnShowTable" class="showTable"><a href="#">Show Table</a></li>
							   </ul>
							</div>
					</div>
					<div class="box-body">
						<div class="item" id="boxChart1_2" name="ABCD">
							
						</div>
						<div class="item" id="boxChart1_2_jqx" name="ABCD">
							
						</div>
					</div>
				</div>
		    </li> -->
		</ul>
		<ul id="item_2" class="sortable_area connectedSortable col-lg-3">
			<!-- <li class="list scatter" id="box_item_2_1" num=1 idx=2 graph="scatter">
				<div class="box">
					<div class="box-header">
						<div class="box-title"><span>나의 연구활동<span></div>
						
							<div class="btn-group btn-group-sm up-right-side btn-drop-menu" role="group" id="btnDropdownMenu_1" style="">
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_2_1">
							     <i class="fa fa-fw fa-bars" aria-hidden="true"></i>
							    </button>
							   <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_2_1" id="dropdownli_2_1">
							     <li id="btnShowTable" class="showTable"><a href="#">Show Table</a></li>
							   </ul>
							</div>
					</div>
					<div class="box-body">
						grid item
						<div class="item" id="boxChart2_1" name="ABCD">
							
						</div>
						<div class="item" id="boxChart2_1_jqx" name="ABCD">
							
						</div>
						/.grid item
					</div>
				</div>
			</li> -->
		  
		</ul>
		<ul id="item_3" class="sortable_area connectedSortable col-lg-3">
			
		    
		 </ul>
		 <ul id="item_4" class="sortable_area connectedSortable col-lg-3">
		
		 </ul>

	</div>
	
</section>


<script src="<c:url value="/js/asantab/summary.js" />"></script>

