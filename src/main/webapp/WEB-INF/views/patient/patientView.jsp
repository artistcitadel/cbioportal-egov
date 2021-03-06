<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<% String docRoot = "/"; %>
<head>
    <meta charset="UTF-8">
    <jsp:include page="/WEB-INF/views/inc_head_top.jsp" />
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
        .label-default{background-color:#d2d6de;color:#444}
    </style>
</head>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="margin-left:0px;overflow-y: hidden;background-color: white;width: fit-content;">
    <!-- Content Header (Page header) -->
    <section class="content-header ttt" style="background-color: aliceblue;display:none;">
        <h1>
            &nbsp;
            <%--<small class="tsmall">Loading...</small>--%>
            <small class="tsmall">
            <div style="color: #98bff6" class="la-ball-circus">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            </small>
            <small class="thead"  style="color:#000;display:none;">Summary</small>
            <a id="cview" href="#" class="thead" style="display:none;"><small style="color:#3786C2;">Clinical Data</small></a>
            <a id="sview" href="#" class="thead" style="display:none;"><small style="color:#3786C2;">유사환자</small></a>
        </h1>
        <%--<ol class="breadcrumb">--%>
            <%--<li><a href="#"><i class="fa fa-home"></i> </a></li>--%>
            <%--<li><a href="#">Patient</a></li>--%>
            <%--<li class="active">Patient View</li>--%>
        <%--</ol>--%>
    </section>




    <%--<section class="content">--%>
    <!-- Default box -->
    <div <%--class="box"--%>>
        <%--<div class="box-header with-border">
            <h3 class="box-title"></h3>
        </div>--%>
        <div <%--class="box-body"--%>>
            <div id="container-fluid">
                <%--<div class="team">
                    <div class="member">
                        <img class="avatar" src="/js/page/patient/images/user.png" alt="" class="img-circle" width="90" height="90">
                        <div class="name" id="patientage"></div>
                        <div class="location">&lt;%&ndash;Seoul&ndash;%&gt;</div>
                        <p class="bio">
                            &lt;%&ndash;kil dong is consultant in south seoul , specializing in bio application devlopmemnt Known for his passin for ....&ndash;%&gt;
                        </p>
                    </div>
                </div>--%>
                    <%--<div class="row" id="row1">--%>
                    <div class="row ttt" style="display:none;">
                       <div class="col-xs-8 col">

                <div>
                    <%--<div style="background-color: #fcf8e3;">--%>
                    <div>
                        <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                        <div style="display: inline-flex;">
                            <table>
                                <thead>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Patient :
                                        <span id="patientage"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ttt" id="divsample"><%--Samples: primary--%>
                                        <%--<div id="sample_loader" class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="display:none;">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>--%>
                                        <%--<div id="sample_loader"></div>--%>
                                        <%--<span>
                                          <svg height="12" width="12">
                                            <svg width="12" height="12" class="case-label-header" data-test="sample-icon">
                                              <g transform="translate(6,6)">
                                                <circle r="6" fill="black" fill-opacity="1">
                                                 </circle>
                                               </g>
                                               <g transform="translate(6,5.5)">
                                                <text y="4" text-anchor="middle" font-size="10" fill="white" style="cursor: default;">1</text>
                                              </g>
                                            </svg>
                                          </svg>
                                        </span>--%>

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="studyMetaBar"></div>
                        <%--<div id="summary_pageview" class="com-paging"></div>--%>
                    </div>
                </div>

               </div>
              <br/>
              <div class="col-xs-3 col" style="float:right;">
                  <div class="btn-group" style="width:auto;">
                  <button id='pat_inquiry' class="btn btn-success" type="button" style="width:auto;">
                      Search
                  </button>
                  <form name="patientsearchform" role="search" style="width:auto;">
                      <div class="input-group">
                          <input type="text" name="search1_PAT" id="search1_PAT" class="form-control" style="margin-left:8px;" placeholder="Search...">
                          <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                      </div>
                  </form>
                </div>
              </div>

             </div>
                    <div id="noclinical" class="row" style="display:none;">
                        <div class="col-3" style="margin-left: 30px;">
                            There are no Clinical Data
                        </div>
                    </div>

              <%--<br/>--%>
                    <div class="container-fulid page-center ttt" style="display:none;">
                        <%--<div class="row page-center">
                            <div class="col-xs-10 col">--%>
                                <div id="summary_pageview" class="com-paging"></div>
                            <%--</div>
                        </div>--%>
                    </div>

               <hr calss="ttt" style="display:none;" />

                <div class="container-fulid crinacalsection">
                    <div class="row" id="row1">
                        <div class="col-xs-3 col">
                            <%--<input id="cate" type="button" value="항목관리" class="btn btn-link" data-toggle="modal" data-target="#contactModal" style="margin-right:3px;">--%>
                            <%--<span class="label label-success ttt" data-toggle="modal" data-target="#contactModal" style="display:none;cursor:pointer">항목관리</span>--%>
                        </div>
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col text-align-right">
                            <label class="label-default" style="width: auto;text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                            <input id="xgrid" type="button" value="Grid on" class="btn btn-sm btn-success ttt" style="display:none;">
                            <input id="reset" type="button" value="Reset" class="btn btn-sm btn-default ttt" style="display:none;margin-right:3px;float:right">
                            <%--<label style="width: 50px; text-align: right; margin-right: 10px; margin-top: 7px;">Zoom</label>--%>
                            <%--<input id="zoomin" type="button" value="+">--%>
                            <%--<input id="zoomout" type="button" value="-">--%>
                            <%--<span id="zoomin" class="label label-success ttt" style="display:none;cursor:pointer">+</span>
                            <span id="zoomout" class="label label-success ttt" style="display:none;cursor:pointer">-</span>--%>
                        </div>
                    </div>
                    <%--<div class="row" id="row2">
                        <div class="col-xs-12 col">

                            &lt;%&ndash;<div id="timeline" style="overflow-x: auto;">&ndash;%&gt;
                            <div id="timeline" style="display:flex;">
                                <div id="genomicOverviewTracksContainer" />
                            </div>

                        </div>
                    </div>--%>
                </div>
                <p/>
                    <hr calss="ttt" style="display:none;" />
                    <%--<div class="container-fulid">
                        <div class="row" id="row2">
                            <div class="col-xs-12 col">
                               <div id="timeline" style="overflow-x: auto;">
                                    <div id="timeLineContainer" />
                                </div>

                            </div>
                        </div>
                    </div>--%>
                    <%--<div class="container-fulid">--%>
                    <div id="timeline" class="crinacalsection" style="display:flex;">
                        <div id="timeLineContainer"></div>
                    </div>
                <%--</div>--%>
                <hr />

                <div>
                    <div id="grch137" style="display:flex;">
                        <div id="genomicOverviewTracksContainer1"></div>
                        <div id="vafplot1" class="tooltip-content" style="display:none;"></div>
                        <%--<span>Gene panel information not found. Sample is presumed to be whole exome/genome sequenced.</span>--%>
                        <div id="vafplot"></div>
                    </div>
                </div>

                <hr />
                <%--<div class="ontainer-fulid">
                    <div class="row">
                        <div class="col-xs-12 col">

                            <div style="display:flex;">
                                <div style="display:inline;">
                                    <div id="vafplot"></div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <hr />--%>

                    <div id="mut_loader" class="container-fluid" align="center" style="display:none;">
                        <%--<div class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="margin:20px;">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>--%>
                            <div style="color: #98bff6" class="la-ball-circus">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div style="color: #98bff6" class="la-ball-circus">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div style="color: #98bff6" class="la-ball-circus">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div style="color: #98bff6" class="la-ball-circus">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                    </div>

                <div class="container-fluid">
                    <div class="row" style="width:100%;float:right;">
                        <div class="col-md-2">
                            <%--<div id="mut_loader" class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="display:inline-block;">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>--%>
                        </div>
                        <div class="col-md-5" align="right" id="mutcolcontainer" style="float:right;margin-right:20px;display:none;">
                            <div class="btn-group" style="width:auto;">
                                <button class="btn btn-success" type="button" style="width:auto;">
                                    Columns
                                </button>
                                <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown" style="height:36px">
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
                                <form role="search" style="width:210px;">
                                    <div class="input-group">
                                        <input type="text" id="search_MUTATIONS" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                        <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div class="col-md-3" align="right">

                        </div>
                    </div>
                </div>

                    <div class="container-fulid">
                        <%--<div id="mut_loader" class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="margin:20px;display:none;">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>--%>
                        <div class="col-xs-4 col ttt" align="left" style="font-weight: normal;display:none;">
                            <span id="mutcount"></span> <span id="txtmutations" style="display:none;">Mutations</span>
                        </div>
                        <br/>
                        <table id="MUTATIONS_t" class="table table-bordered" style="display:none;">
                            <thead>
                            <tr id='MUTATIONS' class="success">
                            </tr>
                            </thead>
                            <tbody id="MUTATIONS_con">
                            </tbody>
                        </table>
                        <div id="MUTATIONS_pageview" class="com-paging">
                        </div>
                    </div>




                <hr calss="ttt" style="display:none;" />

                <div class="container-fluid">
                    <div class="row" style="width:100%;float:right;">
                        <div class="col-md-2">
                            <div id="cna_loader" class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="display:none;">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                        <div class="col-md-5" align="right" id="cnacolcontainer" style="float:right;margin-right:20px;display:none;">
                            <div class="btn-group" style="width:auto;">
                                <button class="btn btn-success" type="button" style="width:auto;">
                                    Columns
                                </button>
                                <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown" style="height:36px">
                                    <span class="caret"></span>
                                    <span class="sr-only">Toggle dropdown</span>
                                </button>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown1">
                                    <li role="presentation"><input id="geneExamSpcnSeq_CNV" type="checkbox"> TUMORS</li>
                                    <li role="presentation"><input id="geneNm_CNV" type="checkbox"> Gene</li>
                                    <li role="presentation"><input id="hgvspVal_CNV" type="checkbox"> CNA</li>
                                    <li role="presentation"><input id="geneExamMthNm_CNV" type="checkbox"> methods</li>
                                    <li role="presentation"><input id="annotation_CNV" type="checkbox"> Annotation</li>
                                    <li role="presentation"><input id="cytbNm_CNV" type="checkbox"> Cytoband</li>
                                    <li role="presentation"><input id="cohort_CNV" type="checkbox"> cohort</li>
                                </ul>
                                <form role="search" style="width:210px;">
                                    <div class="input-group">
                                        <input type="text" id="search_CNV" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                        <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-3" align="right">

                        </div>
                    </div>
                </div>
                <div class="container-fulid">
                    <div class="col-xs-4 col ttt" align="left" style="font-weight: normal;display:none;">
                        <span id="cnacount"></span> <span id="txtcna" style="display:none;">Copy Number Alterlations</span>
                    </div>
                    <br/>
                    <table id="CNV_t" class="table table-bordered" style="display:none;">
                        <thead>
                        <tr id='CNV' class="success">
                        </tr>
                        </thead>
                        <tbody id="CNV_con">

                        </tbody>
                    </table>
                    <div id="CNV_pageview" class="com-paging"></div>
                </div>

                <hr calss="ttt" style="display:none;" />

                <div class="container-fluid">
                    <div class="row" style="width:100%;float:right;">
                        <div class="col-md-2">
                            <div id="st_loader" class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="display:none;">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="col-md-5" id="svcolcontainer" align="right" style="float:right;margin-right:20px;display:none;">
                            <div class="btn-group" style="width:auto;">
                                <button class="btn btn-success" type="button" style="width:auto;">
                                    Columns
                                </button>
                                <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown" style="height:36px">
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
                                <form role="search" style="width:210px;">
                                    <div class="input-group">
                                        <input type="text" id="search_SV" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                        <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                    <hr calss="ttt" style="display:none;" />

                <div class="container-fulid">
                    <div class="col-xs-4 col ttt" align="left" style="font-weight: normal;display:none;">
                        <span id="svcount"></span> <span id="txtsvs" style="display:none;">Svs</span>
                    </div>
                    <br/>
                    <table id="SV_t" class="table table-bordered" style="display:none;">
                        <thead>
                        <tr id='SV' class="success">
                        </tr>
                        </thead>
                        <tbody id="SV_con">
                        </tbody>
                    </table>
                    <div id="SV_pageview" class="com-paging">
                    </div>
                </div>

                    <hr calss="ttt" style="display:none;" />

                    <div class="container-fluid">
                        <div class="row" style="width:100%;float:right;">
                            <div class="col-md-7" id="expcolcontainer" align="right" style="float:right;display:none;">
                                <div class="btn-group" style="width:auto;">
                                    <button class="btn btn-success" type="button" style="width:auto;">
                                        Columns
                                    </button>
                                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown" style="height:36px">
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
                                    <form role="search" style="width:210px;">
                                        <div class="input-group">
                                            <input type="text" id="search_EXPRESSION" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                            <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fulid">


                        <div class="col-xs-4 col ttt" align="left" style="font-weight: normal;display:none;">
                            <span id="expcount"></span> <span id="txtexpressions" style="display:none;">Expressions</span>
                        </div>
                        <br/>
                        <table id="EXPRESSION_t" class="table table-bordered" style="display:none;">
                            <thead>
                            <tr id='EXPRESSION' class="success">
                            </tr>
                            </thead>
                            <tbody id="EXPRESSION_con">
                            </tbody>
                        </table>
                        <div id="EXPRESSION_pageview" class="com-paging"></div>
                    </div>

                    <hr/>

                <%--<div class="box-footer text-align-center Footer-module ttt" style="display:none;">--%>
                    <%--<span style="font-size:14px;">&lt;%&ndash;Inspired by and Kopied by</span> &lt;%&ndash;Memorial Sloan Kettering CancerCenter&ndash;%&gt;&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<img src="/js/page/patient/images/msk-logo-fff-sm.png" style="height:50px"/>&ndash;%&gt;--%>
                        <%--<strong>Asan Cancer Center</strong>--%>
                    <%--</span>--%>
                <%--</div>--%>
            </div>
        </div>
    </div>

    <div id="spinner" style="zIndex:100;position:relative;display:none;">
        <div class="centered" >
            <div style="color: #98bff6" class="la-ball-circus la-2x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #98bff6" class="la-ball-circus la-2x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #98bff6" class="la-ball-circus la-2x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <%--<div class="sk-spinner la-line-scale-pulse-out big">
                &lt;%&ndash;<div class="la-line-scale-pulse-out la-2x" style="color: #3941ff">&ndash;%&gt;
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>--%>
        </div>
        <iframe id="ifr"
                style="width:100%;position:relative;zIndex:100;border:none;"
                src=""
        >
        </iframe>
    </div>


    <div id="spinner1" style="zIndex:100;position:relative;display:none;">
        <div class="centered" >
            <div style="color: #98bff6" class="la-ball-circus">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #98bff6" class="la-ball-circus">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #98bff6" class="la-ball-circus">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #98bff6" class="la-ball-circus">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <%--<div class="la-ball-clip-rotate la-3x" style="color: #98bff6">
                <div></div>
            </div>--%>
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

<form name="pform" id="pform" method="post" action="/patient/patientView">
    <input type="hidden" name="patients" id="patients" value="${patients}"/>
    <input type="hidden" name="query" id="QUERY" value="${QUERY}"/>
    <input type="hidden" name="RESCH_PAT_ID" id="RESCH_PAT_ID" value="${RESCH_PAT_ID}"/>
    <input type="hidden" name="pages" id="pages" value="${pages}"/>
    <input type="hidden" name="patientId" id="patientId" value="${patientId}"/>

    <input type="hidden" name="sampleId" id="sampleId" value="" />

    <input type="hidden" name="mutationcount" id="mutationcount" value="" />
    <input type="hidden" name="samplespermutation" id="samplespermutation" value="" />
    <input type="hidden" name="samples" id="samples" value="" />
    <input type="hidden" name="samplenames" id="samplenames" value="" />
    <input type="hidden" name="age" id="age" value="" />
    <input type="hidden" name="sex" id="sex" value="" />
    <input type="hidden" name="cancertype" id="cancertype" value="" />
    <input type="hidden" name="cancertypedetail" id="cancertypedetail" value="" />
    <input type="hidden" name="oncotreecode" id="oncotreecode" value="" />

</form>
<script src="<c:url value="/js/page/patient/WindowStore.js" />"></script>
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
<script src="<c:url value="/js/page/patient/patientEtc.js" />"></script>
<script src="<c:url value="/js/page/patient/Timeline.js" />"></script>
<script src="<c:url value="/js/page/patient/annotation.js" />"></script>
<script src="<c:url value="/js/page/patient/civic.js" />"></script>
<script src="<c:url value="/js/page/patient/PatientViewMutationTable.js" />"></script>
<script src="<c:url value="/js/page/patient/GenomicOverview.js" />"></script>
<script>
    var TOOLTIPINSTANCE=false;
    var perCode = '<%=(request.getSession().getAttribute("PER_CODE") == null) ? "0000" : request.getSession().getAttribute("PER_CODE")%>';
    var MUTATIONCOUNT;
    var AGE;
    var SEX;
    var CANCERTYPE;
    var CANCERTYPEDETAIL;
    var ONCOTREECODE;

    var SAMPLEPERMUTATION = {};
    // SAMPLEPERMUTATION["1"]=0;SAMPLEPERMUTATION["2"]=0;SAMPLEPERMUTATION["3"]=0;SAMPLEPERMUTATION["4"]=0;
    var SAMPLETEXT;

    var SAMPLECOUNT;
    var SAMPLES=[];
    var SAMPLENAMES=[];
    var PATIENTID;
    var QUERY;
    var resch_pat_id = '<%=(request.getParameter("RESCH_PAT_ID") == null) ? "48321932" : request.getParameter("RESCH_PAT_ID")%>';
    var patients  = '<%=(request.getParameter("patients") == null) ? "" : request.getParameter("patients")%>';
    var patientId = '<%=(request.getParameter("patientId") == null) ? "" : request.getParameter("patientId")%>';
    var pages     = '<%=(request.getParameter("pages") == null) ? "1" : request.getParameter("pages")%>'
    var SAMPLEID     = '<%=(request.getParameter("sampleId") == null) ? "" : request.getParameter("sampleId")%>'
    document.pform.sampleId.value = SAMPLEID;
    document.pform.patients.value = patients;
    document.pform.patientId.value = patientId;
    document.pform.pages.value = pages;
    document.pform.RESCH_PAT_ID.value = resch_pat_id;

    console.log('pages ', pages);
    console.log('resch_pat_id ', resch_pat_id);
    console.log('patientId ', patientId);
    // console.log('patients ' , patients);

    if(patients=='') {
        getPatients();
    }
    else {
        buildPatient();
    }

    var isSelectPatient=false;
    function buildPatient(){
        var patients = document.pform.patients.value;
        resch_pat_id = convrtpad(resch_pat_id);
        if( (pages==='1' && resch_pat_id.length>7 && resch_pat_id.length<15 ) && patientId.length!=10){
            // alert(patients.indexOf(resch_pat_id));
            isSelectPatient = true;
            patientId = resch_pat_id;
        }
        console.log('patientId ', patientId);
        if(patientId =="" || patientId =="000000null"){
            patientId = patients.split(",")[0];
        }
        console.log('patientId ', patientId);
        if(patientId.length<1)return;
        PATIENTID = patientId;
        QUERY = document.pform.query.value;

        document.pform.patientId.value = patientId;

        $("#patientname").text(patientId);
        var pager = new Pager();
        var sel = $("#summary_pageview");
        var udata = [];
        if(isSelectPatient)udata.push(PATIENTID);
        // console.log('udata ', udata[0]);
        if(patients.indexOf(",")!==-1){
            var ps = patients.split(",");
            for(var i=0;i<ps.length;i++){
                if(isSelectPatient && ps[i]===PATIENTID)continue;
                else udata.push(ps[i]);
            }
        }else{
            udata.push(patients);
        }
        if(isSelectPatient)document.pform.patients.value=udata.join(',');
        // console.log('udata ', udata[0]);

        var patientView = new PatientView();
        patientView.getPatientDescription();

        var hasgenomicoverview = true;
        var timeLine = new TimeLine();
        timeLine.init(hasgenomicoverview);
        // var pt = new PatientViewMutationTable();
        // pt.init();

        var tpage = udata.length;
        var page = parseInt(pages);
        pager.buildPage(page, tpage, sel, new Noop, udata, 'simple');
        buildSample();
    }


    function getPatients(){
        // alert('getPatients');
        console.log('getPatients called');
        var action = new Action();
        var ds_cond = {};
        //console.log('document.pform.QUERY.value',document.pform.QUERY.value);
        var query = document.pform.query.value;
        ds_cond.data = {"queryId": "patient.selectPatientzz",'query':query};
        ds_cond.callback = setPatients;
        action.selectPatientz(ds_cond);

    }
    function setPatients(json){
        console.log('setPatients called');
        //console.log(json);
        var temp = [];
        for(var i=0;i<json.length;i++){
            temp.push(json[i].RESCH_PAT_ID);
        }
        document.pform.patients.value = temp.join(",");
        buildPatient();
    }

    function buildSample(){
        var action = new Action();
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientMutSample", "patientId": PATIENTID, "sampleId":SAMPLEID};
        ds_cond.callback = sampleTitleDisposer;
        action.selectPatientMuList(ds_cond);
    }

    function sampleTitleDisposer(samples) {
        if(samples.length<1)return;
        var txt='Samples : ';
        var pid = '<span style="color:#3786C2">'+PATIENTID+'</span>';
        // console.log("sampleTitleDisposer ", samples);
        for(var i=0;i<samples.length;i++){
            SAMPLES.push(samples[i].geneExamSpcnSeq);
            SAMPLENAMES.push(samples[i].geneExamSpcnNm);
            txt+='<label id="samplespan_'+samples[i].geneExamSpcnSeq+'" class="label-default" style="width:auto;cursor:pointer;">';
            // txt+=getDivSample((PATIENTID+"_"+SAMPLES[i]) , SAMPLES[i]) +" ";
            txt+=getDivSample("head_"+samples[i].geneExamSpcnSeq, parseInt(samples[i].geneExamSpcnSeq) ) +" ";
            txt+=samples[i].geneExamSpcnNm;
            // txt+=pid+'_';
            // txt+=(i+1);
            // if(i===0)txt+=' Primary'
            txt+='</label>&nbsp;';
        }
        // $("#divsample").html(txt);
        SAMPLETEXT = txt;
    }

    function Noop(){
        var self = this;
        self.movePage = function(page){
            document.pform.pages.value = page;
            var patients = document.pform.patients.value;
            document.pform.patientId.value=patients.split(",")[parseInt(page)-1];
            // console.log(patients);
            // alert(document.pform.patientId.value);
            document.pform.action='<%=docRoot%>patient/patientView';
            document.pform.target="_self";
            document.pform.submit();
        }
    }

     function convrtpad(dat){
        if(_.isUndefined(dat) || dat===null)dat="";
        var len = 10-dat.length;
        var pad = "";
        for(var i=0;i<len;i++){
            pad+="0";
        }
        dat = pad+dat;
        return dat;
    }

    // $('#confirm').modal({
    //     show: false,
    //     backdrop: 'static',
    //     keyboard: true
    // });

</script>

</div>
