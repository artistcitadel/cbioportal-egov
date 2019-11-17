<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
/*	.col {
		padding: 20px;
	}
	.row {
		margin-top: 16px;
	}*/
.spinner {
	margin: 100px auto 0;
	width: 70px;
	text-align: center;
}

.spinner > div {
	width: 18px;
	height: 18px;
	background-color: #525d9d;

	border-radius: 100%;
	display: inline-block;
	-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}

.spinner .bounce2 {
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
	0%, 80%, 100% { -webkit-transform: scale(0) }
	40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
	0%, 80%, 100% {
		-webkit-transform: scale(0);
		transform: scale(0);
	} 40% {
		  -webkit-transform: scale(1.0);
		  transform: scale(1.0);
	  }
}
.center {
	position: absolute; /* */
	left: 10%;
	top: 20%;
	transform: translate(-50%, -50%);
}

#grid:hover{
	cursor: pointer;
}
</style>
<style>
	.col {
		background-color: lightblue;
		padding: 8px;
		border: 1px solid darkgray;
	}
	.row {
		margin-top: 16px;
		background-color: aliceblue;
	}
</style>
<section class="content-header" style="background-color: white;">
	<h1>
		Patient 선택
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">Paient 선택</li>
	</ol>
</section>

<section class="contents">

	<div class="container-fulid" >
		<div class="row" style="height:34px;margin-top:6px;">
			<div class="col-xs-3 col" style="background-color: white; height:34px;padding:0px;padding-left:20px;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<input type="text" class="form-control input-sm" style="border:none" value="Cohort 선택 :" disabled/>
					</div>
				</div>
			</div>
			<div class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<input type="text" class="form-control input-sm"  />
						<i class="form-control-feedback glyphicon glyphicon-remove"></i>
					</div>
				</div>
			</div>
			<div class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<input type="text" class="form-control input-sm"  />
						<i class="form-control-feedback glyphicon glyphicon-remove"></i>
					</div>
				</div>
			</div>
			<div class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;width:auto;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<%--<button class="btn btn-primary" type="submit" style="height:34px;">초기화</button>--%>
						<button class="btn btn-success btn-xs btn-block" style="width:auto;height:34px;">
							초기화
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container-fulid">
		<div class="row" style="height:34px;margin-top:6px;">
			<div class="col-xs-3 col" style="background-color: white; height:34px;padding:0px;padding-left:20px;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<input type="text" class="form-control input-sm" style="border:none" value="필터 선택 Mutated Genes =" disabled/>
					</div>
				</div>
			</div>
			<div class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<input type="text" class="form-control input-sm"  />
						<i class="form-control-feedback glyphicon glyphicon-remove"></i>
					</div>
				</div>
			</div>
			<div class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;width:auto;">
			  <div class="form-group">
				<div class="form-group has-feedback">
					<button class="btn btn-success btn-xs" style="width:auto;height:34px;">
						초기화
					</button>
					<button class="btn btn-warning btn-xs" style="width:auto;height:34px;margin-right:3px;">
						저장
					</button>
			   	 </div>
			    </div>
		     </div>

		<div class="col-xs-5 col" align="right" style="background-color: white; height:34px;padding:0px;width:auto;">
			<div class="form-group">
				<div class="form-group has-feedback" style="height:34px;">
					<button class="btn btn-success btn-xs" style="width:auto;height:34px;">
						Cohort Analysis
					</button>
					<button class="btn btn-success btn-xs" style="width:auto;height:34px;">
						Mutation View
					</button>
				</div>
			</div>
		</div>

	  </div>
	</div>

	<%--<div class="container-fulid" id="scroll">
		<div class="row" id="row1" style="height:34px;margin-top:6px;margin-bottom:10px;">
			<div class="col-xs-3 col" style="background-color: white; height:34px;padding:0px;padding-left:20px;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<input type="text" class="form-control input-sm" style="border:none" value="환자 선택 :" disabled/>
					</div>
				</div>
			</div>


			<div class="col-xs-2 col" style="background-color: white; height:34px;padding:0px;width:auto;">
				<div class="form-group">
					<div class="form-group has-feedback">
						<button class="btn btn-success btn-xs" style="width:auto;height:30px;">
							초기화
						</button>
						<button class="btn btn-danger btn-xs" style="width:auto;height:30px;">
							저장
						</button>
					</div>
				</div>
			</div>

			<div class="col-xs-3 col" align="right" style="background-color: white; height:34px;padding:0px;width:auto;">
				<div class="form-group">
					<div class="form-group has-feedback" style="height:30px;">
						<button class="btn btn-primary btn-xs" style="width:auto;height:30px;">
							Patient View
						</button>
					</div>
				</div>
			</div>

		</div>
	</div>--%>
<hr/>
<div class="container-fluid" style="background-color: white">
	<p class="h4">PATIENT LIST</p>
	<%--<input class="form-control-inline input-sm" id="patientId" type="text" name="patientId" style="width:150px;"/>
	<input class="form-control-inline input-sm" id="sampleId" type="text" name="sampleId" style="width:140px;"/>
	<input class="form-control-inline input-sm" id="age" type="text" name="age" style="width:100px;"/>
	<input class="form-control-inline input-sm" id="cancerStudies" type="text" name="cancerStudies" style="width:150px;"/>
	<input class="form-control-inline input-sm" id="cancerType" type="text" name="cancerTypeDetails" style="width:140px;"/>
	<input class="form-control-inline input-sm" id="cancerTypeDetails" type="text" name="cancerTypeDetails" style="width:150px;"/>--%>

	<div id="grid">
	</div>

	<form name="pform" id="pform" method="post" action = "/patient/patientView" enctype="text/html;charset=utf-8">
		<input type="hidden" name="patientId" id="patientId" />
	</form>
</div>

	<div class="spinner center">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
	</div>
</section>
<script src="<c:url value="/js/page/patient/patientMain.js" />"></script>

