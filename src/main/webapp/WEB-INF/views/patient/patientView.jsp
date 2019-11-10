<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
    .col {
        background-color: lightblue;
        padding: 8px;
        border: 1px solid darkgray;
    }
    .row {
        margin-top: 16px;
        background-color: lightgray;
    }

    .headBlock {
        box-sizing: border-box;
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

</section>
    <div class="contentWrapper" style="background-color: white; border-top:1px solid #ccc;">

        <div class="mainContainer">
            <div class="contentWidth noMargin">
                <div id="mainColumn">
                    <div>
                        <div class="patientViewPage">
                            <div class="headBlock">
                                <div class="patientPageHeader"><i class="fa fa-user-circle-o patientIcon" aria-hidden="true"></i>
                                    <div class="patientDataTable">
                                        <table>
                                            <tr>
                                                <td>Patient:</td>
                                                <td>
                                                    <div><span class="clinical-spans" id="patient-attributes"><a href="javascript:void(0)">TCGA-OR-A5J1</a><span class="clinical-attribute" attr-id="AGE" attr-value="58" study="acc_tcga_pan_can_atlas_2018">58</span><span class="clinical-attribute" attr-id="AJCC_PATHOLOGIC_TUMOR_STAGE" attr-value="STAGE II" study="acc_tcga_pan_can_atlas_2018">STAGE II</span><span class="clinical-attribute" attr-id="CANCER_TYPE_ACRONYM" attr-value="ACC" study="acc_tcga_pan_can_atlas_2018">ACC</span><span class="clinical-attribute" attr-id="CENTER" attr-value="University of Michigan" study="acc_tcga_pan_can_atlas_2018">University of Michigan</span><span class="clinical-attribute" attr-id="DAYS_TO_BIRTH" attr-value="-21496" study="acc_tcga_pan_can_atlas_2018">-21496</span><span class="clinical-attribute" attr-id="DAYS_TO_INITIAL_PATHOLOGIC_DIAGNOSIS" attr-value="0" study="acc_tcga_pan_can_atlas_2018">0</span><span class="clinical-attribute" attr-id="DFS_MONTHS" attr-value="24" study="acc_tcga_pan_can_atlas_2018">24</span><span class="clinical-attribute" attr-id="DFS_STATUS" attr-value="Recurred/Progressed" study="acc_tcga_pan_can_atlas_2018">Recurred/Progressed</span><span class="clinical-attribute" attr-id="DSS_MONTHS" attr-value="44.547457014" study="acc_tcga_pan_can_atlas_2018">44.547457014</span><span class="clinical-attribute" attr-id="DSS_STATUS" attr-value="DEAD WITH TUMOR" study="acc_tcga_pan_can_atlas_2018">DEAD WITH TUMOR</span><span class="clinical-attribute" attr-id="FORM_COMPLETION_DATE" attr-value="4/2/14" study="acc_tcga_pan_can_atlas_2018">4/2/14</span><span class="clinical-attribute" attr-id="HISTORY_NEOADJUVANT_TRTYN" attr-value="No" study="acc_tcga_pan_can_atlas_2018">No</span><span class="clinical-attribute" attr-id="ICD_10" attr-value="C74.0" study="acc_tcga_pan_can_atlas_2018">C74.0</span><span class="clinical-attribute" attr-id="ICD_O_3_HISTOLOGY" attr-value="8370/1" study="acc_tcga_pan_can_atlas_2018">8370/1</span><span class="clinical-attribute" attr-id="ICD_O_3_SITE" attr-value="C74.0" study="acc_tcga_pan_can_atlas_2018">C74.0</span><span class="clinical-attribute" attr-id="INFORMED_CONSENT_VERIFIED" attr-value="Yes" study="acc_tcga_pan_can_atlas_2018">Yes</span><span class="clinical-attribute" attr-id="IN_PANCANPATHWAYS_FREEZE" attr-value="Yes" study="acc_tcga_pan_can_atlas_2018">Yes</span><span class="clinical-attribute" attr-id="NEW_TUMOR_EVENT_AFTER_INITIAL_TREATMENT" attr-value="Yes" study="acc_tcga_pan_can_atlas_2018">Yes</span><span class="clinical-attribute" attr-id="OS_MONTHS" attr-value="44" study="acc_tcga_pan_can_atlas_2018">44</span><span class="clinical-attribute" attr-id="OS_STATUS" attr-value="DECEASED" study="acc_tcga_pan_can_atlas_2018">DECEASED</span><span class="clinical-attribute" attr-id="OTHER_PATIENT_ID" attr-value="B3164F7B-C826-4E08-9EE6-8FF96D29B913" study="acc_tcga_pan_can_atlas_2018">B3164F7B-C826-4E08-9EE6-8FF96D29B913</span><span class="clinical-attribute" attr-id="PATH_N_STAGE" attr-value="N0" study="acc_tcga_pan_can_atlas_2018">N0</span><span class="clinical-attribute" attr-id="PATH_T_STAGE" attr-value="T2" study="acc_tcga_pan_can_atlas_2018">T2</span><span class="clinical-attribute" attr-id="PERSON_NEOPLASM_CANCER_STATUS" attr-value="With Tumor" study="acc_tcga_pan_can_atlas_2018">With Tumor</span><span class="clinical-attribute" attr-id="PFS_MONTHS" attr-value="24.788769438" study="acc_tcga_pan_can_atlas_2018">24.788769438</span><span class="clinical-attribute" attr-id="PFS_STATUS" attr-value="PROGRESSION" study="acc_tcga_pan_can_atlas_2018">PROGRESSION</span><span class="clinical-attribute" attr-id="PRIOR_DX" attr-value="No" study="acc_tcga_pan_can_atlas_2018">No</span><span class="clinical-attribute" attr-id="RACE" attr-value="White" study="acc_tcga_pan_can_atlas_2018">White</span><span class="clinical-attribute" attr-id="RADIATION_THERAPY" attr-value="No" study="acc_tcga_pan_can_atlas_2018">No</span><span class="clinical-attribute" attr-id="SAMPLE_COUNT" attr-value="1" study="acc_tcga_pan_can_atlas_2018">1</span><span class="clinical-attribute" attr-id="SEX" attr-value="Male" study="acc_tcga_pan_can_atlas_2018">Male</span><span class="clinical-attribute" attr-id="SUBTYPE" attr-value="ACC" study="acc_tcga_pan_can_atlas_2018">ACC</span><span class="clinical-attribute" attr-id="CANCER_TYPE" attr-value="Adrenocortical Carcinoma" study="acc_tcga_pan_can_atlas_2018">Adrenocortical Carcinoma</span><span class="clinical-attribute" attr-id="CANCER_TYPE_DETAILED" attr-value="Adrenocortical Carcinoma" study="acc_tcga_pan_can_atlas_2018">Adrenocortical Carcinoma</span></span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Samples:</td>
                                                <td>
                                                    <div class="patientSamples">
                                                        <div class="patientSample"><span class="clinical-spans"><span><svg height="12" width="12"><svg width="12" height="12" class="case-label-header"><g transform="translate(6,6)"><circle r="6" fill="black" fill-opacity="1"></circle><text y="4" text-anchor="middle" font-size="10" fill="white">1</text></g></svg></svg><span style="display: inline-flex;">&nbsp;<a href="http:patient?sampleId=TCGA-OR-A5J1-01&amp;studyId=acc_tcga_pan_can_atlas_2018" target="_blank">TCGA-OR-A5J1-01</a><span class="clinical-attribute" attr-id="ANEUPLOIDY_SCORE" attr-value="2" study="acc_tcga_pan_can_atlas_2018">2</span><span class="clinical-attribute" attr-id="FRACTION_GENOME_ALTERED" attr-value="0.0585" study="acc_tcga_pan_can_atlas_2018">0.0585</span><span class="clinical-attribute" attr-id="MUTATION_COUNT" attr-value="24" study="acc_tcga_pan_can_atlas_2018">24</span><span class="clinical-attribute" attr-id="ONCOTREE_CODE" attr-value="ACC" study="acc_tcga_pan_can_atlas_2018">ACC</span><span class="clinical-attribute" attr-id="SAMPLE_TYPE" attr-value="Primary" study="acc_tcga_pan_can_atlas_2018">Primary</span><span class="clinical-attribute" attr-id="STATUS_10P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_10Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_11P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_11Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_12P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_12Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_13_13Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_14_14Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_15_15Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_16P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_16Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_17P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_17Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_18P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_18Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_19P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_19Q" attr-value="Lost" study="acc_tcga_pan_can_atlas_2018">Lost</span><span class="clinical-attribute" attr-id="STATUS_1P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_1Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_20P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_20Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_21_21Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_2P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_2Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_3P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_3Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_4P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_4Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_5P" attr-value="Lost" study="acc_tcga_pan_can_atlas_2018">Lost</span><span class="clinical-attribute" attr-id="STATUS_5Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_6P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_6Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_7P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_7Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_8P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_8Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_9P" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="STATUS_9Q" attr-value="Not Called" study="acc_tcga_pan_can_atlas_2018">Not Called</span><span class="clinical-attribute" attr-id="TISSUE_PROSPECTIVE_COLLECTION_INDICATOR" attr-value="No" study="acc_tcga_pan_can_atlas_2018">No</span><span class="clinical-attribute" attr-id="TISSUE_RETROSPECTIVE_COLLECTION_INDICATOR" attr-value="Yes" study="acc_tcga_pan_can_atlas_2018">Yes</span><span class="clinical-attribute" attr-id="TISSUE_SOURCE_SITE" attr-value="OR" study="acc_tcga_pan_can_atlas_2018">OR</span><span class="clinical-attribute" attr-id="TUMOR_TISSUE_SITE" attr-value="Adrenal Gland" study="acc_tcga_pan_can_atlas_2018">Adrenal Gland</span><span class="clinical-attribute" attr-id="TUMOR_TYPE" attr-value="Adrenocortical Carcinoma, Usual Type" study="acc_tcga_pan_can_atlas_2018">Adrenocortical Carcinoma, Usual Type</span><span class="clinical-attribute" attr-id="DERIVED_NORMALIZED_CASE_TYPE" attr-value="Primary" study="acc_tcga_pan_can_atlas_2018">Primary</span></span>
                                                                    </span>
                                                                    </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="studyMetaBar" style="margin-right:5px;"><a href="/study?id=acc_tcga_pan_can_atlas_2018">Adrenocortical Carcinoma (TCGA, PanCancer Atlas)</a>
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

                                        </div>
                                    </div>
                                    <hr>
                                    <div>
                                        <div class="lazy-mobx-table" >
                                            <div>
                                                         <span style="float: left; color: black; font-size: 16px; font-weight: bold;">
                                                            64 Mutations (page 1 of 7)
                                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="<c:url value="/js/page/patient/patientView.js" />"></script>
<script src="<c:url value="/js/page/patient/patientChart.js" />"></script>

