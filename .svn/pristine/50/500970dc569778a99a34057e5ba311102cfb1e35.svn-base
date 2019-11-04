<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">
$(document).ready(function() {

    contSeq = "${contSeq}";
	dataSeq = "${dataSeq}";	

	$(document).ajaxStart(function(){
		$("#progressbar").css("display","");
	}).ajaxStop(function(){
		$("#progressbar").css("display","none");
	});

});
</script>

<style>
.spinnermodal{
	background-color:#a5a2a2;
	height:100%;
	left:0;
	opacity:0.5;
	position: fixed;
	top:0;
	width:100%;
	z-index:2e9;
}

path {
  stroke: #000;
  stroke-width: 1.5px;
  fill: none;
}
.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}
.itemBox {
	border: 1px solid #dddddd;
	background: #fff;
	max-height: 650px;
	min-height: 450px;
	cursor: pointer;
}

.itemBox ul li {
	line-height: 2em;
	margin-right: 5px;
	list-style:none;
}

.ui-state-highlight {
	/* display: -webkit-box; */
	border: 1px solid rgb(252, 239, 161);
	background: rgb(251, 249, 238) 50% 50% repeat-x;
	color: #363636;
	margin: 0px;
	font-size: 13px;
}

.boxTitle_Blue {
	width: 100%;
	height: 37px;
	background: url(/bigcenmed2/images/visual/boxTitleBgBlue.gif) repeat-x;
	border: 1px solid rgb(205, 205, 205);
	border-radius: 2px;
	border-botton-left-radius: 0px;
	border-botton-right-radius: 0px;
}

.conGrayBox {
	background: #f7f7f7;
	width: 100%;
	border: #cdcdcd solid 1px;
	border-top: #cdcdcd solid 0px;
	padding: 10px;
	/* min-height: 150px; */
}

.leSp-006 {
	letter-spacing: -0.06em;
}

.titleTabOn {
	color: #f26522;
}

.titleTabOff {
	color: gray;
}

.summarySelected {
	padding: 4px 8px 4px 14px;
	background: #cde69c;
	display: table-cell;
	vertical-align: middle;
	border: #a5d24a 1px solid;
	color: #526f17;
	margin-right: 5px;
	margin-bottom: 0px;
	margin-top: 0px;
	float: left;
}

.summaryFill {
	padding: 4px 8px 4px 14px;
	background: #cde69c;
	display: table-cell;
	vertical-align: middle;
	border: #a5d24a 1px solid;
	color: #526f17;
	margin-right: 5px;
	margin-bottom: 0px;
	margin-top: 0px;
	float: left;
}

.redBold {
	color: #FF0000;
	font-weight: bold;
	margin-left: 5px;
}

.colStyle {
	display: table-cell;
	vertical-align: middle;
	padding: 4px 8px 4px 8px;
	width: 70px;
	background: #707070;
	border: 1px solid #707070;
	float: left;
	text-align: center;
	color: #fff;
	margin: 0 0;
}

.groupBoxStyle {
	display: table-cell;
	vertical-align: middle;
	padding: 8px 8px 8px 8px;
	width: 100%;
	background: #e1e1e1;
	border: 1px solid #cccccc;
	float: left;
	text-align: center;
	border-radius: 5px;
	font-weight: bold;
}

.marR5 {
	margin-right: 5px;
}

/*a.disabled {
     pointer-events: none;
     opacity: 0.5;
 }*/
.highlight_red {
	background-color: lightsalmon;
}

.highlight_blue {
	background-color: lightskyblue
}

.conGrayBox {
	background: #ffffff;
	width: 100%;
	border: #cdcdcd solid 1px;
	border-top: #cdcdcd solid 0px;
	padding: 8px 10px;
	text-align: center;
}

.visual {
	border: 2px solid white;
	width: 72px;
	height: 51px;
	cursor: pointer;
}

 .viewborder {
	border: 2px solid #0072bc;
	height: 51px;
	width: 72px;
	cursor: pointer;
} 

 .selectvisual {
	border: 2px solid #0072bc;
	height: 51px;
	width: 72px;
	cursor: pointer;
} 

.disabled {
	pointer-events: none;
	margin: 0px;
	background-color: #000000;
	border: 0px solid black;
	opacity: 0.3;
	filter: alpha(opacity = 60); /* For IE8 and earlier    */
	width: 72px;
	height: 51px;
}

.visualevent {
	width: 70px;
	height: 49px;
	display: block;
	float: left;
}

.pythonimg {
	width: 100%;
	height: 100%;
}

.textLayer01 {
	width: 262px;
	background: #fbfbfb;
	margin: 0px 0px 0px 5px;
	text-align: center;
	border-radius: 4px;
	border-radius: 8px;
	box-shadow: 0px 0px 0px #959595;
	float: left;
	border: 1px solid #dddddd;
}

.textLayer01 .textBox {
	word-break: keep-all;
	margin: 15px;
	padding: 0px 0px;
	margin: 10px 10px;
}

.vCenter {
	display: flex;
	align-items: center;
}

.fontstyle {
	font-size: 13px;
	font-style: normal;
	font-family: Verdana, Arial, sans-serif;
}

.fl {
	float: left;
}

.fr {
	float: right;
}

.marT5 {
	margin-top: 5px;
}

.marT10 {
	margin-top: 10px;
}

.marL10 {
	margin-left: 20px;
}

.marL20 {
	margin-left: 20px;
}

.marB30 {
	margin-bottom: 30px;
}

.tab-content-area {
	border-right: 1px solid #dddddd;
	background: #f3f3f3;
}

table.type09 {
    border-collapse: collapse;
    text-align: left;
    line-height: 1.5;

}
table.type09 thead th {
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: #369;
    border-bottom: 3px solid #036;
}
table.type09 tbody th {
   /*  width: 150px; */
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #f3f6f7;
}
table.type09 td {
    /* width: 350px; */
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
}

.ellipsis_text{
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  width:55%;
  overflow:hidden;
  text-align: left;
}
/*** PANEL PRIMARY ***/
.with-nav-tabs.panel-primary .nav-tabs > li > a,
.with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
    color: #fff;
}
.with-nav-tabs.panel-primary .nav-tabs > .open > a,
.with-nav-tabs.panel-primary .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
	color: #fff;
	background-color: #3071a9;
	border-color: transparent;
}
.with-nav-tabs.panel-primary .nav-tabs > li.active > a,
.with-nav-tabs.panel-primary .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.active > a:focus {
	color: #428bca;
	background-color: #fff;
	border-color: #428bca;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #428bca;
    border-color: #3071a9;
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #fff;   
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #3071a9;
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    background-color: #4a9fe9;
}
/********************************************************************/
/*** PANEL INFO ***/
.with-nav-tabs.panel-info .nav-tabs > li > a,
.with-nav-tabs.panel-info .nav-tabs > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li > a:focus {
	color: #31708f;
}
.with-nav-tabs.panel-info .nav-tabs > .open > a,
.with-nav-tabs.panel-info .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-info .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-info .nav-tabs > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li > a:focus {
	color: #31708f;
	background-color: #bce8f1;
	border-color: transparent;
}
.with-nav-tabs.panel-info .nav-tabs > li.active > a,
.with-nav-tabs.panel-info .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.active > a:focus {
	color: #31708f;
	background-color: #fff;
	border-color: #bce8f1;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #d9edf7;
    border-color: #bce8f1;
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #31708f;   
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #bce8f1;
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #31708f;
}
/********************************************************************/
</style>

<!-- Main content -->
<section class="content" style="padding-top: 20px;">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">
			<div class="row">
				<section class="col-lg-12">
					<div class="panel with-nav-tabs panel-primary" style="text-align: center; float: left;">
						<div class="panel-heading">
							<ul class="nav nav-tabs" role="tablist">
								<li role="presentation" class="active"><a
									data-target="#summary" id="summaryTab" role="tab"
									data-toggle="tab" aria-controls="summary" aria-expanded="true">요약통계</a></li>
								<li role="presentation"><a data-target="#visual" role="tab"
									id="visualTab" data-toggle="tab" aria-controls="visual"
									aria-expanded="false">시각화분석</a></li>
							</ul>
						</div>
						<div class="panel-body">
							<div id="tabContent" class="tab-content marT10">
								<div role="tabpanel" class="tab-pane fade active in fontstyle" style="overflow: auto;"
									id="summary" aria-labelledby="summaryTab">
	
									<!-- S: 항목리스트 -->
									<div id="itemList" style="float: left;" class="col-lg-2">
										<img src="/bigcenmed2/images/visual/leftTitleItemList.png"
											width="100%" height="auto">
										<div id="content-md" class="light itemBox"
											style="overflow: auto; margin-top: 10px;">
											<ul style="padding: 0px;">											
											</ul>
										</div>
									</div>
									<!-- E: 항목리스트 -->
	
									<!-- S : 콘텐츠 -->
									<div class="col-lg-10 tab-content-area"
										style="height: 100%; overflow: auto;">
	
										<!-- S : Summary -->
										<!-- S : 타이틀 -->
										<div class="boxTitle_Blue fl vCenter leSp-006 marT10" style="cursor: pointer;" 
											onclick="if(summaryContent.style.display=='none') {summaryContent.style.display=''; collapse.src ='/bigcenmed2/images/visual/minimize.png';} else {summaryContent.style.display='none'; collapse.src ='/bigcenmed2/images/visual/maximize.png';}">
											<div class=" vCenter fBold marL10" style="width:10%;">
												<span>Summary</span>
											</div>
											<div class=" vCenter marL20" style="color: gray; width:20%;">
												<span>숫자(num) 항목에 대한 '기초 통계'</span>
											</div>
											<div class="marL20 fl "  style="width:30%;">
												<div class="fl  ">
													<span class="label label-success"> 사용법 </span><span
														class="marL10">데이터셋에 숫자(num) 항목이 있을 때 자동 표시</span>
												</div>
												
											</div>
											<div class="marL20 fr "  style="width:40%; margin-right:10px;">
												<div class="fr ">
													<img id="collapse" src="/bigcenmed2/images/visual/minimize.png" width="25px;" height="auto">
												</div>
											</div>
										</div>
										<!-- E : 타이틀 -->
	
										<!-- S : 결과 -->
										<div id="summaryContent" class="fl conGrayBox" >
											<div>
												<img src="/bigcenmed2/images/visual/textInfo0002.png"
													class="" id="imgSummary">
											</div>
											<div class="" id="area_summary">
												<table class="display type09" id="table_summary" style="width:100%;"></table>
											</div>										
										</div>
										<!-- E : 결과 -->
										<!-- E : Summary -->
	
	
										<!-- S : 시각화 TAB  -->									
										<ul class="nav nav-tabs a" role="tablist" id="tabList_summary"  >
											<li role="presentation" class="active"><a href="#disnfre" 
												data-target="#disnfre" id="disnfreTab" role="tab" style="color:black; margin-top:30px;"
												data-toggle="tab" aria-controls="disnfre" aria-expanded="true">Distribution|Frequency</a></li>
											<li role="presentation"><a data-target="#mvp" role="tab" href="#mvp" 
												id="mvpTab" data-toggle="tab" aria-controls="#mvp" style="color:black; margin-top:30px;"
												aria-expanded="false">Missing Value Pattern</a></li>
										</ul>								
										<div id="tabContent_summary" class="tab-content">
											<div role="tabpanel" class="tab-pane fade active in fontstyle" style="overflow: auto;"
												id="disnfre" aria-labelledby="disnfreTab">
												<!-- S : Distribution|Frequency -->
												<!-- S : 타이틀 -->
												<div class="boxTitle_Blue fl vCenter leSp-006">
													<div class=" vCenter fBold marL10">
														<span class="titleTabOff" id="tl_distribution">Distribution</span>
														<span class="marR10 marL10" style="color: #959595">|</span><span
															class="titleTabOff" id="tl_frequency"> Frequency</span>
													</div>
													<div class=" vCenter marL20" style="color: gray;">
														<span>선택한 항목에 대한 분포 및 빈도</span>
													</div>
													<div class="marL20 fl ">
														<div class="fl marT10 " style="margin-top: 0;">
															<span class="label label-success"> 사용법 </span><span
																class="marL10">'항목 리스트'에서 확인하고자 하는 항목을 선택													
																</span>
														</div>
													</div>
												</div>
												<!-- E : 타이틀 -->
												<!-- S : 결과 -->
												<div class="fl marB30 conGrayBox text-center"
													style="overflow: auto;">
													<div class="">
														<div id="area_distribution" class="graph_area"></div>
														<div id="area_frequency" class="graph_area"></div>
														<div>
															<img src="/bigcenmed2/images/visual/textInfo0001.png"
																class="marT10" id="imgItemClick">
														</div>
													</div>
												</div>
												<!-- E : 결과 -->
												<!-- E : Distribution|Frequency -->
												<!-- E : 시각화 TAB  -->	
											</div>
											<div role="tabpanel" class="tab-pane fade fontstyle" style="overflow: auto;"
												id="mvp" aria-labelledby="mvpTab">
												<!-- S : Missing Value Patterns -->
												<!-- S : 타이틀 -->
												<div class="boxTitle_Blue fl   leSp-006" style="width: 100%;">
			
													<div class=" vCenter fBold marL10 fl marT10">
														<span> Missing Value Patterns</span>
													</div>
													<div class=" vCenter marL20 fl marT10" style="color: gray;">
														<span>숫자(num) 항목에 대한 '기초 통계'</span>
													</div>
													<div class="marL20 fl ">
														<div class="fl marT10 ">
															<span class="label label-success"> 사용법 </span><span
																class="marL10">데이터셋 변경 시, 자동 표시 (항목 변경 시, 선택된 항목
																기준(오름차순)으로 Pattern 변경)</span>
														</div>
													</div>
												</div>
												<!-- E : 타이틀 -->
												<!-- S : 결과 -->
												<div class="fl marB30 conGrayBox text-center"
													style="overflow: auto; text-align: center; min-height: 200px;">
													<div class="">
														<div id="area_missing" class="graph_area"></div>
													</div>
												</div>
												<!-- E : 결과 -->
												<!-- E : Missing Value Patterns -->
											</div>
										</div>									
										<!-- E : 시각화 TAB  -->
									</div>
									
									<!-- E : 콘텐츠 -->
	
								</div>
								<div role="tabpanel" class="tab-pane fade fontstyle" style="overflow: auto;"
									 id="visual" aria-labelledby="visualTab">
	
									<!-- S: 항목리스트 -->
									<div id="itemList2" style="float: left; z-index:100;" class="col-lg-2">
										<img src="/bigcenmed2/images/visual/leftTitleItemList.png"
											width="100%" height="auto">
										<div id="content-md2" class="light itemBox"
											style="overflow: auto; margin-top: 10px;">
											<ul style="padding: 0px;" id="draggableItem">
												
											</ul>
										</div>
									</div>
									<!-- E: 항목리스트 -->
	
	
									<div class="col-lg-10 tab-content-area"
										style="height: 100%; overflow: auto;">
										<div class="col-lg-5" style="float: left; min-height:235px;">
											<!-- S : Data Selection -->
											<!-- S : 타이틀 -->
											<div class="boxTitle_Blue fl vCenter leSp-006 marT10">
												<div class=" vCenter fBold marL10">
													<span>Data Selection</span>
												</div>
												<div class=" vCenter marL20" style="color: gray;">
													<span>항목이 채워지면 사용 가능한 그래프 버튼이 활성화 됩니다.</span>
												</div>
	
											</div>
											<!-- E : 타이틀 -->
											<!-- S : 결과 -->
											<div class="fl conGrayBox" style="min-height:188px;">
	
												<!-- S : 열 -->
												<div class="fl itemCol"
													style="width: 100%; border-top: 1px dashed #cccccc; border-bottom: 1px dashed #cccccc; padding: 5px 0;">
													<div class="colStyle">Y</div>
													<div style="margin-left: 100px;" id="sortable_Col"
														class="sortable_area graph_area"></div>
												</div>
												<!-- E : 열 -->
												<!-- S : 행 -->
												<div class="fl  itemRow"
													style="width: 100%; border-bottom: 1px dashed #cccccc; padding: 5px 0;">
													<div class="colStyle">X</div>
													<div style="margin-left: 100px;" id="sortable_Row"
														class="sortable_area graph_area"></div>
												</div>
												<!-- E : 행 -->
												<div>
												<div class="fl" style="position:absolute;bottom:20px;">
													<span class="label label-success"> 사용법 </span><span
														class="marL10">Y : Measure 항목만 가능, X : 모든 항목 가능.</span>
												</div>
											</div>
											</div>
											
											<!-- E : 결과 -->
											<!-- E : Data Selection -->
										</div>
										<div class="col-lg-7" style="float: left; height:20%;">
											<!-- S : Visualization -->
											<!-- S : 타이틀 -->
											<div class="boxTitle_Blue fl vCenter leSp-006 marT10">
												<div class=" vCenter fBold marL10">
													<span>Visualization</span>
												</div>
												<div class=" vCenter marL20" style="color: gray;">
													<span>아이콘에 마우스를 올리면 설명 표시됩니다.</span>
												</div>
											</div>
											<!-- E : 타이틀 -->
											<!-- S : 결과 -->
											<div class="fl marB20 conGrayBox">
												<!-- S : 버튼 -->
												<div class="fl"
													style="right: 0; margin-right: 25px; width: 100%">
	
													<div id="c1" class='fl marR5 visual'
														style="letter-spacing: -0.05em; background: url(/bigcenmed2/images/visual/Visualization1.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(1)" id="v1"
															class="visualevent disabled" title="속성별분포 Box Plot"></a>
													</div>
													<div id="c2" class='fl marR5 visual'
														style="letter-spacing: -0.05em; margin-left: 3px; background: url(/bigcenmed2/images/visual/Visualization2.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(2)" id="v2"
															class="visualevent disabled" title="속성별크기 막대그래프"></a>
													</div>
													<div id="c9" class='fl marR5 visual'
														style="letter-spacing: -0.05em; margin-left: 3px; background: url(/bigcenmed2/images/visual/Visualization9.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(9)" id="v9"
															class="visualevent disabled" title="속성별크기 막대그래프"></a>
													</div>
													<div id="c6" class='fl marR5 visual'
														style="letter-spacing: -0.05em; margin-left: 3px; background: url(/bigcenmed2/images/visual/Visualization6.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(6)" id="v6"
															class="visualevent disabled" title="Barchar + Spot"></a>
													</div>
													<div id="c7" class='fl marR5 visual'
														style="letter-spacing: -0.05em; margin-left: 3px; background: url(/bigcenmed2/images/visual/Visualization7.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(7)" id="v7"
															class="visualevent disabled" title="Line"></a>
													</div>
													<div id="c3" class='fl marR5 visual'
														style="letter-spacing: -0.05em; margin-left: 3px; background: url(/bigcenmed2/images/visual/Visualization3.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(3)" id="v3"
															class="visualevent disabled" title="Scatter"></a>
													</div>
													<div id="c5" class='fl marR5 visual'
														style="letter-spacing: -0.05em; margin-left: 3px; background: url(/bigcenmed2/images/visual/Visualization5.png) no-repeat; margin-top:3px;">
														<a href="javascript: visualization(5)" id="v5"
															class="visualevent disabled" title="Heatmap"></a>
													</div>
	
												</div>
												<!-- E : 버튼 -->
												<div id="visualization_desc"
													style="float: left; background: #f7f7f7; width: 100%; min-height: 107px; height: 107px; text-align: left; padding: 5px; overflow-y: scroll;"
													class="marT10">
													위 아이콘에 마우스 이동 시 사용방법<br> (필요한 항목 조건등 설명) 표시
												</div>
											</div>
										</div>
										<div class="col-lg-12" style="float: left;">
											<!-- S : Data Preprocessing -->
											<!-- S : 타이틀 -->
											<div class="boxTitle_Blue fl vCenter leSp-006 marT10" style="width:20%; height:45px;">
												<div class=" vCenter fB old marL10">
													<span>Data Preprocessing</span>
												</div>
											</div>
											<!-- E : 타이틀 -->
											<!-- S : 결과 -->
											<div class="fl conGrayBox marT10" style="width:80%; height:45px;">
												<div>
													<div class="fl "
														style="width: 33%; /* border-bottom: 1px dashed #cccccc; padding: 5px 0;*/" >													
														<div class="colStyle" style="margin-top: 0px;">수치형</div>
														<div style="margin-left: 80px;"
															id="funData" class="marT5">
															<label class="radio-inline fl"> <input
																type="radio" id="funProcess_1" name="funProcess_number" value="MEAN" checked>평균
															</label> <label class="radio-inline fl"> <input
																type="radio" id="funProcess_2" name="funProcess_number" value="SUM">합
															</label>
														</div>
													</div>
													<div class="fl "
														style="width: 33%; /* border-bottom: 1px dashed #cccccc; padding: 5px 0;*/" >													
														<div class="colStyle" style="margin-top: 0px;">범주형</div>
														<div style="margin-left: 80px;"
															id="funData" class="marT5">
															<label class="radio-inline fl"> <input
																type="radio" id="funProcess_3" name="funProcess_text" value="CNT" checked>빈도
															</label> <label class="radio-inline fl" ><input
																type="radio" id="funProcess_4" name="funProcess_text" value="RATIO">비율
															</label>
														</div>
													</div>
													<div class="fl "
														style="width: 33%; /* border-bottom: 1px dashed #cccccc; padding: 5px 0;*/" >
														<div class="colStyle" style="margin-top: 0px;">순서</div>
														<div style="margin-left: 80px;" id="odrData" class="marT5">
															<label class="radio-inline fl"> <input
																type="radio" id="odrProcess_0" name="odrProcess" value="" checked>없음
															</label> <label class="radio-inline fl"> <input
																type="radio" id="odrProcess_1" name="odrProcess" value="DESC">내림차순
															</label> <label class="radio-inline fl"> <input
																type="radio" id="odrProcess_2" name="odrProcess" value="ASC">올림차순
															</label>
														</div>
													</div>
												</div>
											</div>
											<!-- E : 결과 -->
											<!-- E : Data Preprocessing -->
										</div>
										<!-- S : Visualization -->
										<!-- S : 타이틀 -->
	
										<!-- E : 타이틀 -->
										<!-- S : 결과 -->
										<!-- <div id="visualArea" class="fl marB30 conGrayBox graph_area"
											style="overflow: auto; border-top: solid 1px #cdcdcd; height:500px;">
	
										</div> -->
										<div class="col-lg-12">
											<div class="fl marB30 marT10 conGrayBox text-center"
												style="overflow: auto; min-height: 200px;">
												<div class="">
													<div id="visualArea" class="graph_area" style="width:100%; height:100%;"></div>											
												</div>
											</div>
										</div>
										<!-- E : 결과 -->
										<!-- E : Visualization -->
	
	
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</section>
	</div>
	<!-- /.Left col -->
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<div class="spinnermodal" id="progressbar" style="display:none; z-index:200000"></div>

<script src="<c:url value="/js/page/popup/visualPopup.js" />"></script>
<script src="<c:url value="/js/plugins/plotly-latest.min.js" />"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>