<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<% String docRoot = "/pmp/"; %>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<%=docRoot%>js/page/patient/patient.css" type="text/css" />
    <title>Patient View</title>
    <style>
        .Footer-module {
            width: 100%;
            padding: 10px 0;
            color: #fff;
            background-color: #737373;
            position: absolute;
            bottom: 0;
            font-weight: 400;
            font-size: 0.9rem;
        }
    </style>
</head>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="margin-left:0px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            &nbsp;
            <%--<small>Patient Description</small>--%>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-home"></i> </a></li>
            <li><a href="#">Patient</a></li>
            <li class="active">Patient View</li>
        </ol>
    </section>




    <%--<section class="content">--%>
        <!-- Default box -->
        <div class="box">
            <%--<div class="box-header with-border">
                <h3 class="box-title"></h3>
            </div>--%>
            <div class="box-body">
                <div id="container">
                    <%--<div class="team">
                        <div class="member">
                            <img class="avatar" src="/pmp/js/page/patient/images/user.png" alt="" class="img-circle" width="90" height="90">
                            <div class="name" id="patientage"></div>
                            <div class="location">&lt;%&ndash;Seoul&ndash;%&gt;</div>
                            <p class="bio">
                                &lt;%&ndash;kil dong is consultant in south seoul , specializing in bio application devlopmemnt Known for his passin for ....&ndash;%&gt;
                            </p>
                        </div>
                    </div>--%>

                        <div>
                            <div>
                                <i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                                <div style="display: inline-flex;">
                                    <table>
                                        <thead>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Patient ID:
                                              <span id="patientage"></span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="studyMetaBar"></div>
                                <div id="summary_pageview" class="com-paging"></div>
                            </div>
                        </div>
                    <hr />


                        <div class="container-fulid">
                            <div class="row" id="row1">
                                <div class="col-xs-3 col">
                                    <%--<input id="cate" type="button" value="항목관리" class="btn btn-link" data-toggle="modal" data-target="#contactModal" style="margin-right:3px;">--%>
                                    <span class="label label-success" data-toggle="modal" data-target="#contactModal" style="cursor:pointer">항목관리</span>
                                </div>
                                <div class="col-xs-3 col"></div>
                                <div class="col-xs-3 col"></div>
                                <div class="col-xs-3 col text-align-right">
                                    <label class="label-default" style="width: auto;text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                                    <input id="reset" type="button" value="Reset" class="btn btn-sm btn-warning" style="margin-right:3px;">
                                    <input id="xgrid" type="button" value="Grid on" class="btn btn-sm btn-success">
                                    <%--<label style="width: 50px; text-align: right; margin-right: 10px; margin-top: 7px;">Zoom</label>--%>
                                    <%--<input id="zoomin" type="button" value="+">--%>
                                    <%--<input id="zoomout" type="button" value="-">--%>
                                    <span id="zoomin" class="label label-success" style="cursor:pointer">+</span>
                                    <span id="zoomout" class="label label-success" style="cursor:pointer">-</span>
                                </div>
                            </div>
                            <div class="row" id="row2">
                                <div class="col-xs-12 col">

                                    <div id="timeline" style="overflow-x: auto;">
                                        <div id="genomicOverviewTracksContainer" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    <hr />

                        <div class="ontainer-fulid">
                            <div class="row">
                                <div class="col-xs-12 col">

                                    <div style="overflow-x:auto;">
                                        <div id="genomicOverviewTracksContainer1" style="overflow-x:auto;"/>
                                    </div>

                                </div>
                            </div>
                        </div>

                    <hr />



                        <div class="container-fulid" align="right">
                            <div class="row" style="width:60%;float:right;">
                                <div class="col-md-2">
                                    <div  id="mut_loader" class="la-line-scale-pulse-out la-sm" style="color: #9988cd">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="col-md-10" style="width:80%;float:right;margin-right:20px;">
                                    <div class="btn-group" style="width:60%;">
                                        <button class="btn btn-success" type="button">
                                            Create a new column entry
                                        </button>
                                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown">
                                            <span class="caret"></span>
                                            <span class="sr-only">Toggle dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown1">
                                            <li role="presentation"><input id="geneExamSpcnSeq_MUTATIONS" type="checkbox"> TUMORS</li>
                                            <li role="presentation"><input id="geneNm_MUTATIONS" type="checkbox"> Gene</li>
                                            <li role="presentation"><input id="geneExamMthNm_MUTATIONS" type="checkbox"> methods</li>
                                            <li role="presentation"><input id="hgvspVal_MUTATIONS" type="checkbox"> Protein Change</li>
                                            <li role="presentation"><input id="annotation_MUTATIONS" type="checkbox"> Annotation</li>
                                            <li role="presentation"><input id="chrnNo_MUTATIONS" type="checkbox"> Chromosome</li>
                                            <li role="presentation"><input id="geneVariStLocVal_MUTATIONS" type="checkbox"> Start Pos</li>
                                            <li role="presentation"><input id="geneVariEndLocVal_MUTATIONS" type="checkbox"> End Pos</li>
                                            <li role="presentation"><input id="refAlleleSqncVal_MUTATIONS" type="checkbox"> Ref</li>
                                            <li role="presentation"><input id="variAlleleSqncVal_MUTATIONS" type="checkbox"> Var</li>
                                            <li role="presentation"><input id="ms_MUTATIONS" type="checkbox"> MS</li>
                                            <li role="presentation"><input id="geneVariClsfNm_MUTATIONS" type="checkbox" >Mutation Type</li>
                                            <li role="presentation"><input id="variAlleleReadRt_MUTATIONS" type="checkbox" > Allele Freq</li>
                                            <li role="presentation"><input id="variAlleleReadCnt_MUTATIONS" type="checkbox"> Varient Reads(N)</li>
                                            <li role="presentation"><input id="refAlleleReadCnt_MUTATIONS" type="checkbox"> Ref Reads(N)</li>
                                            <li role="presentation"><input id="copy_MUTATIONS" type="checkbox"> Copy #</li>
                                            <li role="presentation"><input id="cohort_MUTATIONS" type="checkbox"> Cohort</li>
                                            <li role="presentation"><input id="cosmic_MUTATIONS" type="checkbox"> COSMIC</li>
                                        </ul>

                                        <form id="search" role="search" style="width:400px;">
                                            <div class="input-group">
                                                <input type="text" id="search_MUTATIONS" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                                <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xs-12 col">
                                    <div style="overflow-x:auto;">
                                        <table id="MUTATIONS_t" class="table table-bordered" style="display:none;">
                                            <thead>
                                            <tr id='MUTATIONS' class="success">

                                            </tr>
                                            </thead>
                                            <tbody id="MUTATIONS_con">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="MUTATIONS_pageview" class="com-paging"></div>
                        </div>


                    <hr />



                        <div class="container-fulid" align="right">
                            <div class="row" style="width:60%;float:right;">
                                <div class="col-md-2">
                                    <div id="cna_loader" class="la-line-scale-pulse-out la-sm" style="color: #9988cd">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>

                                <div class="col-md-10" style="width:80%;float:right;margin-right:20px;">
                                    <div class="btn-group" style="width:60%;">
                                        <button class="btn btn-success" type="button">
                                            Create a new column entry
                                        </button>
                                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown">
                                            <span class="caret"></span>
                                            <span class="sr-only">Toggle dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown1">
                                            <li role="presentation"><input id="geneExamSpcnSeq_CNV" type="checkbox"> TUMORS</li>
                                            <li role="presentation"><input id="geneNm_CNV" type="checkbox"> Gene</li>
                                            <li role="presentation"><input id="geneExamMthNm_CNV" type="checkbox"> methods</li>
                                            <li role="presentation"><input id="annotation_CNV" type="checkbox"> Annotation</li>
                                            <li role="presentation"><input id="cytbNm_CNV" type="checkbox"> Cytoband</li>
                                            <li role="presentation"><input id="cohort_CNV" type="checkbox"> cohort</li>
                                        </ul>

                                        <form role="search" style="width:400px;">
                                            <div class="input-group">
                                                <input type="text" id="search_CNV" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                                <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xs-12 col">

                                    <div style="overflow-x:auto;">

                                        <table id="CNV_t" class="table table-bordered" style="display:none;">
                                            <thead>
                                            <tr id='CNV' class="info">
                                            </tr>
                                            </thead>
                                            <tbody id="CNV_con">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="CNV_pageview" class="com-paging"></div>
                        </div>

                      <hr />



                        <div class="container-fulid" align="right">
                            <div class="row" style="width:60%;float:right;">
                                <%--<div class="col-md-2">
                                    <div id="exp_loader" class="la-line-scale-pulse-out la-sm" style="color: #9988cd">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>--%>
                                <div class="col-md-10" style="width:80%;float:right;margin-right:20px;">
                                    <div class="btn-group" style="width:60%;">
                                        <button class="btn btn-success" type="button">
                                            Create a new column entry
                                        </button>
                                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown">
                                            <span class="caret"></span>
                                            <span class="sr-only">Toggle dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown1">
                                            <li role="presentation"><input id="geneNm_EXPRESSION" type="checkbox"> Gene</li>
                                            <li role="presentation"><input id="geneExamMthNm_EXPRESSION" type="checkbox"> methods</li>
                                            <li role="presentation"><input id="ptegGeneReadRsltVal_EXPRESSION" type="checkbox"> Expression Result</li>
                                            <li role="presentation"><input id="gnex_EXPRESSION" type="checkbox"> Expression Value</li>
                                            <li role="presentation"><input id="gnexMsrVal_EXPRESSION" type="checkbox"> Expression Unit</li>
                                        </ul>

                                        <form role="search" style="width:400px;">
                                            <div class="input-group">
                                                <input type="text" id="search_EXPRESSION" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                                <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xs-12 col">

                                    <div style="overflow-x:auto;">

                                        <table id="EXPRESSION_t" class="table table-bordered">
                                            <thead>
                                            <tr id='EXPRESSION' class="warning">
                                            </tr>
                                            </thead>
                                            <tbody id="EXPRESSION_con">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="EXPRESSION_pageview" class="com-paging"></div>
                            </div>

                        <hr />



                                <div class="container-fulid" align="right">
                                    <div class="row" style="width:60%;float:right;">
                                        <div class="col-md-2">
                                            <div id="st_loader" class="la-line-scale-pulse-out la-sm" style="color: #9988cd">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                        <div class="col-md-10" style="width:80%;float:right;margin-right:20px;">
                                            <div class="btn-group" style="width:60%;">
                                                <button class="btn btn-success" type="button">
                                                    Create a new column entry
                                                </button>
                                                <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown">
                                                    <span class="caret"></span>
                                                    <span class="sr-only">Toggle dropdown</span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown1">
                                                    <li role="presentation"><input id="geneExamSpcnSeq_SV" type="checkbox"> Tumors</li>
                                                    <li role="presentation"><input id="geneNm_SV" type="checkbox"> Gene1</li>
                                                    <li role="presentation"><input id="geneNm1_SV" type="checkbox"> Gene2</li>
                                                    <li role="presentation"><input id="geneExamMthNm_SV" type="checkbox"> methods</li>
                                                    <li role="presentation"><input id="annotation_SV" type="checkbox"> Annotation</li>
                                                    <li role="presentation"><input id="cytbNm_SV" type="checkbox"> Cytoband1</li>
                                                    <li role="presentation"><input id="cytbNm1_SV" type="checkbox"> Cytoband2</li>
                                                    <li role="presentation"><input id="cohort_SV" type="checkbox"> Chort</li>
                                                </ul>

                                                <form role="search" style="width:400px;">
                                                    <div class="input-group">
                                                        <input type="text" id="search_SV" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                                        <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col">

                                            <div style="overflow-x:auto;">

                                                <table id="SV_t" class="table table-bordered" style="display:none;">
                                                    <thead>
                                                    <tr id='SV' class="danger">
                                                    </tr>
                                                    </thead>
                                                    <tbody id="SV_con">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="SV_pageview" class="com-paging">
                                    </div>
                                </div>

                   </div>
                </div>
<hr/>
                <div class="box-footer text-align-center Footer-module">
                    <span style="font-size:14px;">Inspired by and Kopied by</span> <%--Memorial Sloan Kettering CancerCenter--%>
                    <img src="/pmp/js/page/patient/images/msk-logo-fff-sm.png" style="height:50px"/>
                </div>


</div>


<%--<div id="spinner" style="zIndex:100;position:relative;display:none;">
    <div class="centered" >
        <div class="la-pacman la-3x" style="color: #79bbb5">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>--%>

<div id="spinner" style="zIndex:100;position:relative;display:none;">
    <div class="centered" >
        <div class="sk-spinner la-line-scale-pulse-out big">
            <%--<div class="la-line-scale-pulse-out la-2x" style="color: #3941ff">--%>
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


    <%--<div id="spinner" class="styles-module_centered styles-module_centered-with-children inlineBlock" style="zIndex:100;position:relative;display:none;">
      <div class="sk-spinner styles-module_color styles-module_big_ inlineBlock line-scale-pulse-out" style="display: inline-block;">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
     <div class="styles-module_progressUI">
       <div class="styles-module_container">
         <div class="styles-module_items-container">
           <span class="styles-module_item-row">Loading meta information
             <span style="margin-left: 7px;">
               <div class="sk-spinner styles-module_pulse-spinner sk-double-bounce">
                 <div></div>
                 <div></div>
               </div>
             </span>
           </span>
           <span class="styles-module_item-row">Loading clinical data
             <span style="margin-left: 7px;">
               <div class="sk-spinner styles-module_pulse-spinner sk-double-bounce">
                 <div></div>
                 <div></div>
              </div>
            </span>
          </span>
         </div>
        </div>
      </div>
    </div>--%>


<%--<div id="spinner" style="zIndex:100;position:relative;display:none;">
    <div class="centered" >
        <div class="la-line-spin-fade-rotating la-dark la-3x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        &lt;%&ndash;<div class="sk-spinner1 la-line-spin-fade la-3x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>&ndash;%&gt;
    </div>
</div>--%>


<div id="spinner1" style="zIndex:100;position:relative;display:none;">
    <div class="centered" >
        <div class="la-ball-clip-rotate la-3x" style="color: #87c4a3">
            <div></div>
        </div>
    </div>
</div>
<!-- CATE MODAL -->
<div class="modal fade text-dark" id="contactModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <%--<div id="treegrid"></div>--%>

                <table class="table table-bordered">
                    <thead>
                    <tr class="success">
                        <th></th>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                    </thead>
                    <tbody id="cate_con">

                    </tbody>
                </table>

            </div>
            <div class="modal-footer">
                <button id="cateApply" class="btn btn-primary btn-block">Apply</button>
            </div>
        </div>
    </div>
</div>

</div>

<form name="pform" id="pform" method="post" action="/pmp/patient/patientView">
    <input type="hidden" name="patient" id="patient" value=""/>
    <input type="hidden" name="pages" id="pages" value="1" />
    <input type="hidden" name="patientId" id="patientId" value="" />
    <input type="hidden" name="QUERY" id="QUERY" value="${QUERY}"/>
    <input type="hidden" name="RESCH_PAT_ID" id="RESCH_PAT_ID" value="${RESCH_PAT_ID}"/>
</form>

<script src="<c:url value="/js/page/patient/const.js" />"></script>
<script src="<c:url value="/js/page/patient/oncokbUtil.js" />"></script>
<script src="<c:url value="/js/page/patient/pagination.js" />"></script>
<script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>
<script src="<c:url value="/js/page/patient/diagnosis/pathology.js" />"></script>
<script src="<c:url value="/js/page/patient/diagnosis/specimen.js" />"></script>
<script src="<c:url value="/js/page/patient/diagnosis/image.js" />"></script>
<script src="<c:url value="/js/page/patient/diagnosis/sugery.js" />"></script>
<script src="<c:url value="/js/page/patient/diagnosis/biopsy.js" />"></script>
<script src="<c:url value="/js/page/patient/plotFilter.js" />"></script>
<script src="<c:url value="/js/page/patient/event.js" />"></script>
<script src="<c:url value="/js/page/patient/Timeline.js" />"></script>
<script src="<c:url value="/js/page/patient/annotation.js" />"></script>
<script src="<c:url value="/js/page/patient/plugin/civic/civic.js" />"></script>
<script src="<c:url value="/js/page/patient/PatientViewMutationTable.js" />"></script>
<script src="<c:url value="/js/page/patient/GenomicOverview.js" />"></script>

<script>
    var PATIENTID;
    var patients1 = document.pform.RESCH_PAT_ID.value;
    var patients = document.pform.QUERY.value;
    console.log('RESCH_PAT_ID ', patients1);
    console.log('QUERY ' , patients);

    /*if(patients.indexOf(",")===-1){
        patients = patients1;
        console.log('*************************');
        console.log('pattients is ', patients);
        console.log('*************************');
    }*/
    if(patients1.length>3)patients=patients1;
    var pages = '<%=request.getParameter("pages")%>';
    var patientId = '<%=request.getParameter("patientId")%>';
    PATIENTID = patientId;

    if(pages==='null')pages='1';
    document.pform.patient.value = patients;
    document.pform.pages.value = pages;

    if(patientId==="null") {
        PATIENTID = patients;
        if (patients.indexOf(",") !== -1)
            PATIENTID = patients.split(",")[0];
        document.pform.patientId.value = PATIENTID;
    }

    $(document).ready(function () {
        $(window).keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });

        //console.log('localStorage["digcategory"]) ',localStorage["digcategory"]);
        var digcategory=[];
        if(!_.isUndefined(localStorage["digcategory"]))
            digcategory = JSON.parse(localStorage.getItem("digcategory"));
        else{
            var item = {};
            item.idd = 'TISSUE';item.pid='SPECIMEN';digcategory.push(item);item = {};
            item.idd = 'BRC';item.pid='SPECIMEN';digcategory.push(item);item = {};
            item.idd = 'IHC';item.pid='PATHOLOGY_EXAM';digcategory.push(item);item = {};
            item.idd = 'ISH';item.pid='PATHOLOGY_EXAM';digcategory.push(item);item = {};
            item.idd = 'PCR';item.pid='PATHOLOGY_EXAM';digcategory.push(item);item = {};
            item.idd = 'SURGERY';item.pid='SURGERY';digcategory.push(item);item = {};
            item.idd = 'BIOPSY';item.pid='BIOPSY';digcategory.push(item);item = {};
            item.idd = 'CT';item.pid='IMAGING';digcategory.push(item);item = {};
            item.idd = 'MRI';item.pid='IMAGING';digcategory.push(item);item = {};
            item.idd = 'PET-CT';item.pid='IMAGING';digcategory.push(item);item = {};
            item.idd = 'UTRASONO';item.pid='IMAGING';digcategory.push(item);item = {};
            localStorage.setItem("digcategory",JSON.stringify(digcategory));
        }
        console.log('digcategory ', digcategory);
        var cindex = [];
        var action = new Action();
        var util = new Util();
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientCategory"};
        ds_cond.callback = setCategory;
        action.selectList(ds_cond);
        var CATE_TREE=[];

        function setCategory(json){
            CATE_TREE = json;
            var txt = '';
            // console.log(" category rawdata is ", json);
            var data  = util.arrayToTree(json);
            // console.log('category tree data ',data);

            for (var i=0; i<data.length; i++) {
                var checked = '';
                if( _.findIndex(digcategory, function(o) {return o.idd === data[i].id;} ) !== -1){
                    checked = 'checked';
                }
                txt += '<tr>' ;
                if(data[i].data.length==0) txt +='<td><input type="checkbox" id="catechk_' + data[i].id + '" ' + checked + '/></td>' ;
                else txt += '<td class="active">+</td>';
                txt+=  '<td>' + data[i].id + '</td>' +
                    '<td>' + data[i].name + '</td>' +
                    '</tr>';
                if(data[i].data.length>0){
                    for(var j=0; j< data[i].data.length;j++){
                        checked='';
                        if( _.findIndex(digcategory, function(o) {return o.idd === data[i].data[j].id;} ) !== -1){
                            checked = 'checked';
                        }
                        txt += '<tr>' +
                            '<td><input type="checkbox" id="catechk_' + data[i].data[j].id + '" ' + checked + '/></td>' +
                            '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].data[j].id + '</td>' +
                            '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].data[j].name + '</td>' +
                            '</tr>';
                    }
                }

            }

            //console.log('txt is ', txt);
            $("#cate_con").empty();
            $("#cate_con").append(txt);
        }

        $("#cate_con").on("click", "[id^='catechk_']",function (e) {
            //alert($(this).prop("checked"));
            var idd = this.id.split("_")[1];
            var idx = _.findIndex(digcategory, function(o) {return o.idd === idd;} );
            var pid = _.find(CATE_TREE, function(o){return o.id === idd;}).pid;
            if(idx===-1 && $(this).prop("checked")){
                var item = {};
                item.idd=idd;
                item.pid = pid;
                digcategory.push(item);
            }
            if(idx !==-1 && !$(this).prop("checked")){
                digcategory.splice(idx,1);
            }
        });

        $("#cateApply").on("click", function(e){
            localStorage.setItem("digcategory",JSON.stringify(digcategory));
            $("#contactModal .close").click();
            //console.log(digcategory);
            location.reload();
        });

        var patientView = new TimeLine();
        patientView.init();
        // var pt = new PatientViewMutationTable();
        // pt.init();

    });

    function tabToggle(seq,id){
        if(seq===1){
            $(".oncogenicity").addClass("enable-hover-active");
            $(".mutation-effect").removeClass("enable-hover-active");
            $("#tab1_"+id+"").show();
            $("#tab2_"+id+"").hide();
            $('.oncokb-treatment-table').show();
        }
        if(seq===2){
            $(".mutation-effect").addClass("enable-hover-active");
            $(".oncogenicity").removeClass("enable-hover-active");
            $("#tab1_"+id+"").hide();
            $("#tab2_"+id+"").show();
            $('.oncokb-treatment-table').hide();
        }
    }
    var toggle=false;
    function levelToggle(id){
     console.log(id, toggle);
     (!toggle) ? ($("#secret1_"+id+"").show(),toggle=true, $("#ardown_"+id+"").show(),$("#arup_"+id+"").hide() ) :
         ( $("#secret1_"+id+"").hide(),toggle=false, $("#arup_"+id+"").show(),$("#ardown_"+id+"").hide() )
    }

    var EVA;
    function pmidtooltip(id){

        console.log('id is ', id);
        console.log('EVA is ', EVA);
        var cache;
        for(var i=0;i<EVA.length;i++) {
            _.map(EVA[i], function (v, k) {
                console.log(k, id);
                if ($.trim(k) === id) {
                    console.log('bingo');
                    cache = v.data.treatments.sensitivity;
                }
            });
        }
        var data = cache[0];
        console.log(' datais ', data);
        var abstracts = data.abstracts;
        var articles = data.articles;
        var pmids = data.pmids;
        var description = data.description;
        var content = '<ul class="no-style-ul">';
        var abstract = '';
        var article = '';
        console.log('abstracts is ', abstracts);
        console.log('articles is ' , articles);
        if(!_.isUndefined(abstracts) && abstracts.length>0) {
            for(var i=0;i<abstracts.length;i++) {
                abstract +=
                    '   <li class="list-group-item">\n' +
                    '    <span className="list-group-item-title"><a href="' + abstracts[i].link + '" target="_blank">' + abstracts[i].abstract + '</a></span>\n' +
                    '  </li>';
            }

        }
        if(!_.isUndefined(articles) && articles.length>0){
            for(var i=0;i<articles.length;i++){
                if(articles[i].pmid==null)continue;
                article +=
                    ' <li key='+articles[i].pmid+' class="list-group-item">\n' +
                    '                <a\n' +
                    '                    class="list-group-item-title"\n' +
                    '                    href="getNCBIlink(/pubmed/'+articles[i].pmid+')" \n' +
                    '                    target="_blank"\n>' +
                    '                    <b>'+articles[i].title+'</b>\n' +
                    '                </a>\n' +
                    '                <div class="list-group-item-content">\n' +
                    '                    <span>'+articles[i].authors+''+ articles[i].reference +'.'+ articles[i].pubDate+'</span>\n' +
                    // '                    <span>PMID: '+articles[i].pmid+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="list-group-item-content">\n' +
                    '                    <span>PMID: '+articles[i].pmid+'</span>\n' +
                    '                </div>\n' +
                    '            </li>';
            }
        }

        content+=abstract+article+'</ul>';

        console.log(id);
        //console.log(content);

        // $('#article_'+id+'').trigger('hover');
        $('#article_'+id+'').tooltipster({
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
            content : content
        });
        $('#article_'+id+'').tooltipster('open');

        // new jBox('Tooltip', {
        //     //$(this).jBox('Tooltip', {
        //     attach: '#article_' + id + '',
        //     width: 350,
        //     closeOnMouseleave: true,
        //     animation: 'move',
        //     content: content,
        // });

        // $('#article_'+id+'').trigger('mouseover');
        // $('#article_'+id+'').trigger('mouseout');
        // addpmidToolTip(id, content, 100, '','qtip-light');
    }
    function addpmidToolTip(node, tip, showDelay, position, theme) {
        var theme = theme;
        if(_.isUndefined(theme)) theme = 'qtip-dark';
        var param = {
            content: {text: tip},
            show: {event: "mouseover"},
            hide: {fixed: true, delay: 100, event: "mouseout"},
            //style: {classes: ''+theme+' qtip-rounded'},
            style: {classes: ''+theme+' qtip-bootstrap'},
            position: {
                my: "bottom right",
                at: "top left",
                viewport: $("body")
            }
        };
        $('#'+node+'').qtip(param);
    }

</script>

</body>
