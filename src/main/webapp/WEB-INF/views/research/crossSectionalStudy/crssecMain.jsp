<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style type="text/css">
	.checkbox label:after, 
	.radio label:after {
	    content: '';
	    display: table;
	    clear: both;
	}
	
	.checkbox .cr,
	.radio .cr {
	    position: relative;
	    display: inline-block;
	    border: 1px solid #a9a9a9;
	    border-radius: .25em;
	    width: 1.3em;
	    height: 1.3em;
	    float: left;
	    margin-right: .5em;
	}
	
	.radio .cr {
	    border-radius: 50%;
	}
	
	.checkbox .cr .cr-icon,
	.radio .cr .cr-icon {
	    position: absolute;
	    font-size: .8em;
	    line-height: 0;
	    top: 50%;
	    left: 20%;
	}
	
	.radio .cr .cr-icon {
	    margin-left: 0.04em;
	}
	
	.checkbox label input[type="checkbox"],
	.radio label input[type="radio"] {
	    display: none;
	}
	
	.checkbox label input[type="checkbox"] + .cr > .cr-icon,
	.radio label input[type="radio"] + .cr > .cr-icon {
	    transform: scale(3) rotateZ(-20deg);
	    opacity: 0;
	    transition: all .3s ease-in;
	}
	
	.checkbox label input[type="checkbox"]:checked + .cr > .cr-icon,
	.radio label input[type="radio"]:checked + .cr > .cr-icon {
	    transform: scale(1) rotateZ(0deg);
	    opacity: 1;
	}
	
	.checkbox label input[type="checkbox"]:disabled + .cr,
	.radio label input[type="radio"]:disabled + .cr {
	    opacity: .5;
	}
	
	
	.progress-bar.animate {
		   width: 50%;
	}
</style>

<!-- Content Header (Page header) -->

<section class="content-header">
	<h1>
		단면연구
		<small>Cross-sectional studies</small>
		<c:if test="${INSTCD_YN == 'Y' }">
			<label style="font-size:11pt;font-weight:normal;margin-left:20px;" class="instcdDataView">
				※ 현재선택하신 연구데이터는
				<span>
					<c:choose>
						<c:when test="${INSTCD == '031' }"><b>본원</b></c:when>
						<c:when test="${INSTCD == '032' }"><b>칠곡</b></c:when>
						<c:otherwise><b>전체(본원,칠곡)</b></c:otherwise>
					</c:choose>
				</span>
				입니다.
			</label>
		</c:if> 
		<label style="font-size:12pt;font-weight:normal;margin-left:20px;" id="lblCondtNm"></label>
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 연구</a></li>
		<li class="active">단면연구</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="nav-tabs-custom">
	            <ul class="nav nav-tabs">
	            	<c:choose>
	            		<c:when test="${LINK_TYPE == 'SI'}">
	            			<li><a href="#patient" data-toggle="tab" class="padding-left-50 padding-right-50">환자선택</a></li>
							<li class="active"><a href="#study" data-toggle="tab" class="padding-left-50 padding-right-50">연구항목</a></li>
	            		</c:when>
	            		
	            		<c:otherwise>
	            			<li class="active"><a href="#patient" data-toggle="tab" class="padding-left-50 padding-right-50">환자선택</a></li>
							<li><a href="#study" data-toggle="tab" class="padding-left-50 padding-right-50">연구항목</a></li>
	            		</c:otherwise>
	            	</c:choose>
	            </ul>
	            <div class="tab-content">
					<div class="tab-pane active" id="patient">
						<jsp:include page="sub_01.jsp" flush="false" />
					</div>
					<div class="tab-pane" id="study">
						<jsp:include page="sub_02.jsp" flush="false" />
					</div>
					
				</div>
	            <!-- /.tab-content -->
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->


<!-- 페이지용 js -->
<script src="<c:url value="/js/page/research/crossSectionalStudy/crssecMain.js" />"></script>