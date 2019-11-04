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



<div class="row">
	<section class="col-lg-12">
		<input type="hidden" id="txtCC_POP_NUM_SEARCH" value="">
		<input type="hidden" id="txtCC_CASE_NUM_SEARCH" value="">
		<input type="hidden" id="txtCC_SAM_NUM_SEARCH" value="">
		<input type="hidden" id="txtCC_CONT_CD_SEARCH" value="">
		<input type="hidden" id="txtCC_MAT_CD_SEARCH" value="">
		<input type="hidden" id="txtCC_AGE_NUM_SEARCH" value="">
	</section>
</div>

<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		사례-대조연구
		<small>Case-control studies</small>
		
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
		<li class="active">사례-대조연구</li>
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
					<li class="active"><a href="#patient" data-toggle="tab" class="padding-left-50 padding-right-50">환자선택</a></li>
					<li><a href="#study" data-toggle="tab" class="padding-left-50 padding-right-50">연구항목</a></li>
					
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


<!-- modal popup -->
<div class="modal fade bs-example-modal-lg" id="controlGroupModal" tabindex="-1" role="dialog" aria-labelledby="controlGroupModal">
	<div class="vertical-alignment-helper">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="myModalLabel">대조군 관리</h5>
				</div>
				<div class="modal-body">
					<form id="frmCcMgmt" >
						<table class="table table-responsive search">
							<colgroup>
						    	<col width="120px">
						    	<col width="*">
						    	<col width="120px">
						    	<col width="*">
						    </colgroup>
						    <tbody>
						    	<tr>
						    		<th class="required">
						    			<label class="control-label padding-top-5">1.모집단 숫자</label>
						    		</th>
						    		<td colspan="3">
						    			<div class="row">
						    				<div class="col-md-10" style="">
						    					<input type="text" id="txtCC_POP_NUM" name="CC_POP_NUM" class="form-control" disabled>
						    				</div>
						    				
						    				<div class="col-md-2" style="">
						    					<button type="button" id="btnCcPopNumSearch" class="btn btn-primary btn-sm">조회</button>
						    				</div>
										</div> 				
						    		</td>
						    	</tr>
						    	
						    	<tr>
						    		<th class="required">
						    			<label class="control-label padding-top-5">2.사례군 숫자</label>
						    		</th>
						    		<td>
						    			<div class="row">
						    				<div class="col-md-10" style="">
						    					<input type="text" id="txtCC_CASE_NUM" name="CC_CASE_NUM" class="form-control" disabled>
						    				</div>
						    				
						    				<div class="col-md-2" style="">
						    					<button type="button" id="btnCaseNumSearch" class="btn btn-primary btn-sm">조회</button>
						    				</div>
										</div>
						    		</td>
						    		
						    		<th class="required">
						    			<label class="control-label padding-top-5">샘플링수</label>
						    		</th>
						    		<td >
						    			<input type="text" id="txtCC_SAM_NUM" name="CC_SAM_NUM" class="form-control" > 
						    		</td>
						    	</tr>
						    	
						    	<tr>
						    		<th class="">
						    			<label>3.대조군배수</label>
						    		</th>
						    		<td colspan="3">
						    			<select class="default-select2 form-control input-sm" id="selCC_CONT_CD" name="CC_CONT_CD">
						    			</select>
						    		</td>
						    	</tr>
						    	
						    	<tr>
						    		<th class=""><label>4.대조군 매칭</label></th>
						    		<td>
						    			<select class="default-select2 form-control input-sm" id="selCC_MAT_CD" name="CC_MAT_CD">
						    			</select>
						    		</td>
						    		
						    		<th class="ageNum"><label>나이편차</label></th>
						    		<td class="ageNum">
						    			<input 	type="text" id="txtCC_AGE_NUM" name="CC_AGE_NUM"
						    					onkeyup="this.value=number_filter(this.value);" 
						    					class="form-control" style="width:100px;" >
						    		</td>
						    	</tr>
						    	
						    </tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCancelControlGroup">취소</button>
					<button type="button" id="btnSaveControlGroup" class="btn btn-primary ">적용</button>
				</div>
			</div>
		</div>
	</div>
</div>



<!-- 페이지용 js -->
<script src="<c:url value="/js/page/research/casctrl/casctrlMain.js" />"></script>