<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
    .patientSamples {
        display: inline-block;
        background-color: #ddd;
        padding: 1px 2px;
        margin-right: 3px;
        border-radius: 3px;
        margin-bottom: 3px;
        font-size: 11px;
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
    }

    .divider {
        height: 1px;
        width:100%;
        display:block; /* for use on default inline elements like span */
        margin: 9px 0;
        overflow: hidden;
        background-color: #e5e5e5;
    }


</style>
<section class="content-header" style="background-color: white;">
    <h1>
        aSAN cBioPortal
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
        <li class="active">PATIENT VIEW</li>
    </ol>


    <div class="contentWrapper" style="background-color: white; border-top:1px solid #ccc;">

        <div class="mainContainer">
            <div class="contentWidth noMargin">
                <div id="mainColumn">
                    <div>
                        <div class="patientViewPage">
                            <div class="headBlock" style="background-color: #f5f5f5;">
                                <div class="patientPageHeader"><i class="fa fa-user-circle-o patientIcon" aria-hidden="true"></i>
                                    <div class="patientDataTable">
                                        <table>
                                            <tr>
                                                <td>Patient:</td>
                                                <td>
                                                    <div>
                                                        <span class="clinical-spans" id="patient-attributes"><%--<a href="javascript:void(0)">patient ID</a>--%>

                                                        </span>


                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Samples:</td>
                                                <td>
                                                    <div class="patientSamples">

                                                       <!--main content-->
                                                       <span class="clinical-spans">
                                                          <%--<span>
                                                            <svg height="12" width="12">
                                                               <svg width="12" height="12" class="case-label-header">
                                                                  <g transform="translate(6,6)">
                                                                  <circle r="6" fill="black" fill-opacity="1"></circle>
                                                                   <text y="4" text-anchor="middle" font-size="10" fill="white">1
                                                                   </text>
                                                                  </g>
                                                                </svg>
                                                             </svg>
                                                         </span>--%>
                                                       <!--main content-->
                                                       <!--extra content-->
                                                        <span style="display: inline-flex;">
                                                          &nbsp;
                                                            EV-001-P
                                                          <%--<a href="https://www.cbioportal.org/patient?sampleId=EV-001-P&amp;studyId=coadread_mskcc" target="_blank">
                                                              EV-001-P</a>--%>
                                                            <span class="clinical-attribute" attr-id="DERIVED_NORMALIZED_CASE_TYPE" attr-value="Primary" study="coadread_mskcc">Primary</span>
                                                            <span class="clinical-attribute" attr-id="DERIVED_SAMPLE_LOCATION" attr-value="Right" study="coadread_mskcc">Right</span>
                                                        </span>
                                                      </span>
                                                     <!-- extra content -->

                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="studyMetaBar" style="margin-right:5px;"><a href="/study?id=acc_tcga_pan_can_atlas_2018">STUDY ID</a>
                                        <div class="paginationControls-module__paginationControls__MF0uG cohortNav"><span style="font-size: 12px; margin-right: 10px;"></span>
                                            <div class="btn-group" style="float: none;">
                                                <button disabled="" type="button" class="btn btn-sm btn-default"><i class="fa fa-angle-double-left"></i></button>
                                                <button disabled="" type="button" class="prevPageBtn btn btn-sm btn-default"><i class="fa fa-angle-left"></i></button><span class="btn btn-sm btn-default textBetweenButtons disabled paginationControls-module__default-cursor__3qNcu" style="cursor: default; color: black;"><span contenteditable="true" class="paginationControls-module__page-number-input__2DGhO">1</span> of 92 patients</span>
                                                <button type="button" class="nextPageBtn btn btn-sm btn-default"><i class="fa fa-angle-right"></i></button>
                                                <button type="button" class="btn btn-sm btn-default"><i class="fa fa-angle-double-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="patientViewPageTabs" class="msk-tabs mainTabs" style="background-color:white;">
                                <ul class="nav nav-tabs">
                                    <li style="margin-left:1px;" class="active" style="cursor: pointer;"><a>Summary</a></li>
                                    <li class="" style="cursor: pointer;"><a>Data</a></li>
                                    <li class="" style="cursor: pointer;"><a>유사환자</a></li>
                                </ul>
                                <br/>
                                <div class="tab-content">

                                    <div class="msk-tab">
                                        <div>
                                            <div id="timeline-container">
                                                <div id="timeline_btn" style="display: flex; margin-bottom: 1px; justify-content: flex-end;">
                                                    <%--<div id="swave" style="color: #67989f;display:none;" class="la-line-scale-pulse-out-rapid la-sm">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>--%>
                                                        <div id="swave" class="la-pacman" style="color: #9784ed;display:none;">
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                    &nbsp;&nbsp;
                                                    <label style="width: auto; text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                                                    <%--<input id="cate" type="button" value="항목관리" class="btn btn-sm" style="margin-right:3px;">--%>
                                                    <input id="reset" type="button" value="Reset" class="btn btn-sm btn-warning" style="margin-right:3px;">
                                                    <input id="xgrid" type="button" value="Grid off" class="btn btn-sm btn-success">
                                                    <label style="width: 50px; text-align: right; margin-right: 10px; margin-top: 7px;">Zoom</label>
                                                    <input id="zoomin" type="button" value="+">
                                                    <input id="zoomout" type="button" value="-">
                                                    &nbsp;&nbsp;
                                                </div>
                                                <br/>
                                                <div id="timeline" style="overflow-x: auto;">
                                                    <div id="genomicOverviewTracksContainer" />
                                                </div>
                                            </div>
                                            <hr class="divider"/>


                                            <div>
                                                <div style="overflow-x:auto;">
                                                    <div id="genomicOverviewTracksContainer1" style="overflow-x:auto;"/>
                                                </div>
                                                <hr class="divider"/>
                                        <!--------------------- table -------------------------------->
                                                <%--<div class="lazy-mobx-table">--%>
                                                <div>
                                                        <span style="float: left; color: black; font-size: 16px; font-weight: bold;">
                                                             Mutations
                                                        </span>
                                                       <%-- <span style="float: left; color: black; font-size: 16px; font-weight: bold;">
                                                            8 Mutations (page 1 of 1)
                                                        </span>--%>
                                                        <div role="toolbar" class="tableMainToolbar btn-toolbar" style="margin-left: 0px;">
                                                            <div class="pull-right form-group has-feedback input-group-sm tableFilter" style="display: inline-block; margin-left: 5px;">
                                                                <input placeholder="" type="text" class="form-control tableSearchInput" style="width: 200px;">
                                                                <span class="fa fa-search form-control-feedback" aria-hidden="true" style="z-index: 0;"></span>
                                                            </div>
                                                            <div class="pull-right dropdown btn-group">
                                                                <button id="mudrop" role="button" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false" type="button" class="btn-sm dropdown-toggle btn btn-default">Columns
                                                                    <span class="caret"></span>
                                                                </button>
                                                                <ul role="menu" id="colsmu" class="dropdown-menu" aria-labelledby="dropdown-custom-1" style="padding-left: 10px; overflow: auto; max-height: 300px; white-space: nowrap;">
                                                                    <ul class="list-unstyled">



                                                                        <li><label class="checkbox-inline" title=""><input data-id="geneNm" type="checkbox" checked="">Gene</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="geneExamMthNm" type="checkbox">methods</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="hgvspVal" type="checkbox">Protein Change</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="annotation" type="checkbox">Annotation</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="chrnNo" type="checkbox">Chromosome</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="geneVariStLocVal" type="checkbox">Start Pos</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="geneVariEndLocVal" type="checkbox">End Pos</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="refAlleleSqncVal" type="checkbox">Ref</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="variAlleleSqncVal" type="checkbox">Var</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="ms" type="checkbox" checked="">MS</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="geneVariClsfNm" type="checkbox">Mutation Type</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="variAlleleReadRt" type="checkbox" checked="">Allele Freq</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="variAlleleReadCnt" type="checkbox">Varient Reads(N)</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="refAlleleReadCnt" type="checkbox">Ref Reads(N)</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="copy" type="checkbox">Copy #</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="chort" type="checkbox">Cohort</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="cosmic" type="checkbox" checked="">COSMIC</label></li>
                                                                    </ul>
                                                                </ul>
                                                            </div>
                                                            <span>
                                                                <span class="pull-right">
                                                                <div class="pull-right btn-group">
                                                                    <button class="btn btn-sm btn-default" data-clipboard-text="NA" id="copyButton">
                                                                        <i class="fa fa-clipboard"></i>
                                                                    </button>
                                                                    <button type="button" class="btn-sm btn btn-default" id="downloadButton">
                                                                    <i class="fa fa-cloud-download"></i></button>
                                                                </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                              <%--<div id="dataTableMu">

                                                               </div>--%>
                                                           <div style="overflow-x:auto;">
                                                               <table id="t-1" class="simple-table table table-striped table-border-top sortable">
                                                                   <thead>
                                                                   <tr>
                                                                       <th data-sort='{"key":"geneNm"}' class="multilineHeader" role="button"><span>Gene</span></th>
                                                                       <th data-sort='{"key":"geneExamMthNm"}' class="multilineHeader" role="button"><span>methods</span></th>
                                                                       <th data-sort='{"key":"hgvspVal"}' class="multilineHeader" role="button"><span>Protein Change</span></th>
                                                                       <th data-sort='{"key":"annotation"}' class="multilineHeader"><span>Annotation</span></th>
                                                                       <th data-sort='{"key":"chrnNo"}' class="multilineHeader"><span>Chromosome</span></th>
                                                                       <th data-sort='{"key":"geneVariStLocVal"}' class="multilineHeader" role="button"><span>Start Pos</span></th>
                                                                       <th data-sort='{"key":"geneVariEndLocVal"}' class="multilineHeader" role="button"><span>End Pos</span></th>
                                                                       <th data-sort='{"key":"refAlleleSqncVal"}' class="multilineHeader" role="button"><span>Ref</span></th>
                                                                       <th data-sort='{"key":"variAlleleSqncVal"}' class="multilineHeader" role="button"><span>Var</span></th>
                                                                       <th data-sort='{"key":"ms"}' class="multilineHeader" role="button"><span>MS</span></th>
                                                                       <th data-sort='{"key":"geneVariClsfNm"}' class="multilineHeader" role="button"><span>Mutation Type</span></th>
                                                                       <th data-sort='{"key":"variAlleleReadRt"}' class="multilineHeader" role="button"><span>Allele Freq</span></th>
                                                                       <th data-sort='{"key":"variAlleleReadCnt"}' class="multilineHeader" role="button"><span>Varient Reads(N)</span></th>
                                                                       <th data-sort='{"key":"refAlleleReadCnt"}' class="multilineHeader" role="button"><span>Ref Reads(N)</span></th>
                                                                       <th data-sort='{"key":"copy"}' class="multilineHeader" role="button"><span>Copy #</span></th>
                                                                       <th data-sort='{"key":"cohort"}' class="multilineHeader" role="button"><span>Cohort</span></th>
                                                                       <th data-sort='{"key":"cosmic"}' class="multilineHeader" role="button" style="text-align: right;"><span>COSMIC</span></th>
                                                                   </tr>
                                                                   </thead>
                                                                   <tbody id="mutation_con">
                                                                   </tbody>
                                                               </table>
                                                           </div>


                                                </div>
                                   <!----------------------------table------------------------------------------>

                                            </div>


                                        </div>




                                    </div>
                                    <hr>



                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  <%--  <div class="spinner center">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>--%>
    <%--<div>
        <div style="position:relative;">
           <div class="center big" >
            <div style="color: #9988cd" class="la-line-scale-pulse-out la-3x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
           </div>
            <div className="progressUI">
            <iframe id="ifr"
                    style="width:100%;position:relative;zIndex:100;border:none;"
            src=""
            >
            </iframe>
            </div>
        </div>
    </div>--%>

    <div id="spinner" style="zIndex:100;position:relative;display:none;">
        <div class="centered" >
            <%--<div class="sk-spinner la-line-scale-pulse-out big">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>--%>
                <div class="la-pacman la-3x" style="color: #f3f60d">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        </div>
        <%--<iframe id="ifr" class="mdacc-heatmap-iframe"--%>
                <%--style="position:relative;zIndex:100;border:none;"--%>
                <%--src="/js/page/patient/loadingdata.html"--%>
        <%-->--%>
        <%--</iframe>--%>

    </div>

    <div id="spinner1" style="zIndex:100;position:relative;display:none;">
        <div class="centered" >
    <div class="la-square-jelly-box la-3x" style="color: #64d6e2">
        <div></div>
        <div></div>
    </div>
    </div>
    </div>


</section>

<script>
    var PATIENTID = '<%=request.getParameter("patientId")%>';
</script>
<script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>
<script src="<c:url value="/js/page/patient/Timeline.js" />"></script>
<script src="<c:url value="/js/page/patient/PatientViewMutationTable.js" />"></script>
<script src="<c:url value="/js/page/patient/GenomicOverview.js" />"></script>

