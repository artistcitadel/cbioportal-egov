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
                                                    <div id="swave" style="color: #67989f;display:none;" class="la-line-scale-pulse-out-rapid la-sm">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                    &nbsp;&nbsp;
                                                    <label style="width: auto; text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                                                    <input id="cate" type="button" value="항목관리" class="btn btn-sm" style="margin-right:3px;">
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
                                            <div>

                                        <!--------------------- table -------------------------------->
                                                <div class="lazy-mobx-table">
                                                    <div>
                                                        <span style="float: left; color: black; font-size: 16px; font-weight: bold;">
                                                            8 Mutations (page 1 of 1)
                                                        </span>
                                                        <div role="toolbar" class="tableMainToolbar btn-toolbar" style="margin-left: 0px;">
                                                            <div class="pull-right form-group has-feedback input-group-sm tableFilter" style="display: inline-block; margin-left: 5px;">
                                                                <input placeholder="" type="text" class="form-control tableSearchInput" style="width: 200px;">
                                                                <span class="fa fa-search form-control-feedback" aria-hidden="true" style="z-index: 0;"></span>
                                                            </div>
                                                            <div class="pull-right dropdown btn-group">
                                                                <button id="mudrop" role="button" aria-haspopup="true" aria-expanded="false" type="button" class="btn-sm dropdown-toggle btn btn-default">Columns
                                                                    <span class="caret"></span>
                                                                </button>
                                                                <ul role="menu" id="colsmu" class="dropdown-menu" aria-labelledby="dropdown-custom-1" style="padding-left: 10px; overflow: auto; max-height: 300px; white-space: nowrap;">
                                                                    <ul class="list-unstyled">
                                                                        <li>
                                                                            <label class="checkbox-inline" title="">
                                                                                <input data-id="Samples" type="checkbox" checked="">Samples</label>
                                                                        </li>
                                                                        <li>
                                                                            <label class="checkbox-inline" title=""><input data-id="Gene" type="checkbox" checked="">Gene</label>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" class="checkbox-inline" data-value="Protein Change" tabIndex="-1">
                                                                            <input id="Protein Change" type="checkbox"/>Protein Change</a></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Annotation" type="checkbox" checked="">Annotation</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Functional Impact" type="checkbox">Functional Impact</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Chromosome" type="checkbox">Chromosome</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Start Pos" type="checkbox">Start Pos</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="End Pos" type="checkbox">End Pos</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Ref" type="checkbox">Ref</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Var" type="checkbox">Var</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="MS" type="checkbox">MS</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="VS" type="checkbox">VS</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Mutation Type" type="checkbox" checked="">Mutation Type</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Center" type="checkbox">Center</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Allele Freq" type="checkbox" checked="">Allele Freq</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Variant Reads" type="checkbox">Variant Reads</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Ref Reads" type="checkbox">Ref Reads</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Variant Reads (Normal)" type="checkbox">Variant Reads (Normal)</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Ref Reads (Normal)" type="checkbox">Ref Reads (Normal)</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Cohort" type="checkbox" checked="">Cohort</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="COSMIC" type="checkbox" checked="">COSMIC</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="Exon" type="checkbox">Exon</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="HGVSc" type="checkbox">HGVSc</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="gnomAD" type="checkbox">gnomAD</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="ClinVar ID" type="checkbox">ClinVar ID</label></li>
                                                                        <li><label class="checkbox-inline" title=""><input data-id="dbSNP" type="checkbox">dbSNP</label></li>
                                                                    </ul>
                                                                </ul>
                                                            </div>
                                                            <span>
                                                                <span class="pull-right">
                                                                <div class="pull-right btn-group">
                                                                    <button class="btn btn-sm btn-default" data-clipboard-text="NA" id="copyButton"> <i class="fa fa-clipboard"></i>
                                                                    </button><button type="button" class="btn-sm btn btn-default">
                                                                    <i class="fa fa-cloud-download"></i></button>
                                                                </div>
                                                                </span>
                                                            </span>
                                                        </div>


                                                        <div style="overflow-x: visible;">
                                                            <table class="simple-table table table-striped table-border-top">
                                                                <thead>
                                                                <tr>
                                                                    <th class="multilineHeader" role="button"><span style="margin-right: 5px;">Gene</span></th>
                                                                    <th class="multilineHeader" role="button"><span>Protein Change</span></th>
                                                                    <th class="multilineHeader sort-des" role="button"><span>Annotation</span></th>
                                                                    <th class="multilineHeader" role="button"><span>Mutation Type</span></th>
                                                                    <th class="multilineHeader" role="button"><span>Copy #</span></th>
                                                                    <th class="multilineHeader"><span>mRNA Expr.</span></th>
                                                                    <th class="multilineHeader" role="button"><span>Cohort</span></th>
                                                                    <th class="multilineHeader" role="button" style="text-align: right;"><span>COSMIC</span></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">NRAS</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">Q61K</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon oncogenic level-3A" data-test="oncogenic-icon-image" data-test2="NRAS"></i></span><span class="annotation-module__annotation-item__1YzCz"><img width="14" height="14" src="data:image/png;base64,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" alt="Civic Variant Entry"></span><span class="annotation-module__annotation-item__1YzCz mcg"><img width="14" height="14" src="data:image/png;base64,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" alt="My Cancer Genome Symbol"></span><span class="annotation-module_annotation-item__2EgnB chang_hotspot"><img width="14" height="14" src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%201024%201024%22%3E%20%20%20%20%3Cg%20id%3D%22icomoon-ignore%22%3E%20%20%20%20%3C%2Fg%3E%20%20%20%20%3Cpath%20fill%3D%22%23ff9900%22%20d%3D%22M321.008%201045.333c-68.245-142.008-31.901-223.379%2020.551-300.044%2057.44-83.956%2072.244-167.065%2072.244-167.065s45.153%2058.7%2027.092%20150.508c79.772-88.8%2094.824-230.28%2082.783-284.464%20180.315%20126.012%20257.376%20398.856%20153.523%20601.065%20552.372-312.532%20137.399-780.172%2065.155-832.851%2024.081%2052.676%2028.648%20141.851-20%20185.127-82.352-312.276-285.972-376.276-285.972-376.276%2024.083%20161.044-87.296%20337.144-194.696%20468.731-3.775-64.216-7.783-108.528-41.549-169.98-7.58%20116.656-96.732%20211.748-120.873%20328.628-32.701%20158.287%2024.496%20274.18%20241.748%20396.623z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="Recurrent Hotspot Symbol"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__missense-mutation__2vEO9">Missense</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">86%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="23.6664" cy="8" r="3" fill="red"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">10.5%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="3.1578947368421053" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="2.3684210526315788" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H">2297</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">MECOM</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">H812R</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="MECOM"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__missense-mutation__2vEO9">Missense</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">81%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="22.334400000000002" cy="8" r="3" fill="red"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">5.3%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="1.5789473684210527" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H"></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">CD93</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">L15del</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="CD93"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__inframe-mutation__3PeGf">IF del</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">47%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="14.332799999999999" cy="8" r="3" fill="gray"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">7.9%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="2.3684210526315788" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="1.5789473684210527" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H">1</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">BIRC7</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">R90H</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="BIRC7"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__missense-mutation__2vEO9">Missense</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">3%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="3.6672" cy="8" r="3" fill="blue"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">2.6%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H"></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">RRP9</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">E70del</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="RRP9"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__inframe-mutation__3PeGf">IF del</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">14%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="6.3336" cy="8" r="3" fill="blue"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">5.3%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="1.5789473684210527" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H">1</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">MRS2</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">Q121*</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="MRS2"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__trunc-mutation__1fMqq">Nonsense</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">19%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="7.6655999999999995" cy="8" r="3" fill="blue"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">2.6%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H">1</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">ANKMY2</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">X23_splice</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="ANKMY2"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__trunc-mutation__1fMqq">Splice</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">33%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="10.9992" cy="8" r="3" fill="gray"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">2.6%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="lightgreen"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H"></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">ANO10</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">R430H</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="ANO10"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__missense-mutation__2vEO9">Missense</span></td>
                                                                    <td><span style="color: gray; font-size: xx-small; text-align: center;"></span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">89%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="24.3336" cy="8" r="3" fill="red"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">5.3%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="1.5789473684210527" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H">1</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">PIP5KL1</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">R192W</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="PIP5KL1"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__missense-mutation__2vEO9">Missense</span></td>
                                                                    <td><span style="color: gray; font-size: xx-small; text-align: center;"></span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">67%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="19.0008" cy="8" r="3" fill="gray"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">2.6%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H"></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span data-test="mutation-table-gene-column">LGALS3</span></td>
                                                                    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">P64H</span></td>
                                                                    <td><span style="display: flex; min-width: 100px;"><span class="annotation-module_annotation-item__2EgnB"><i class="oncokb annotation-icon unknown no-level" data-test="oncogenic-icon-image" data-test2="LGALS3"></i></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module__annotation-item__1YzCz"></span><span class="annotation-module_annotation-item__2EgnB"></span></span>
                                                                    </td>
                                                                    <td><span class="mutationType-module__missense-mutation__2vEO9">Missense</span></td>
                                                                    <td><span style="color: black; text-align: center; font-size: xx-small;">Diploid</span></td>
                                                                    <td>
                                                                        <svg width="63" height="12">
                                                                            <text x="33" y="11" text-anchor="start" font-size="10">64%</text>
                                                                            <g>
                                                                                <line x1="0" y1="8" x2="30" y2="8" style="stroke: gray; stroke-width: 2;"></line>
                                                                                <circle cx="18.3336" cy="8" r="3" fill="gray"></circle>
                                                                            </g>
                                                                        </svg>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <svg width="71" height="12">
                                                                                <text x="36" y="9.5" text-anchor="start" font-size="10">2.6%</text>
                                                                                <rect y="2" width="30" height="8" fill="#ccc"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="lightgreen"></rect>
                                                                                <rect y="2" width="0.7894736842105263" height="8" fill="green"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="styles-module__integer-data__1Bn0H"></div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>


                                                    </div>
                                                </div>
                                   <!----------------------------table------------------------------------------>

                                            </div>

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
            <div class="sk-spinner la-line-scale-pulse-out big">
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

</section>
<script>
    var PATIENTID = '<%=request.getParameter("patientId")%>';
</script>
<script src="<c:url value="/js/page/patient/patientView.js" />"></script>
<script src="<c:url value="/js/page/patient/patientChart.js" />"></script>
<script src="<c:url value="/js/page/patient/patientViewMutation.js" />"></script>

