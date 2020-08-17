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
    </style>
</head>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="margin-left:0px;overflow-y: hidden;">
    <!-- Content Header (Page header) -->
    <section class="content-header ttt" style="background-color: aliceblue;display:none;">
        <h1>
            &nbsp;
            <a id="pview" href="#"><small style="color:#3786C2;">Summary</small></a>
            <a id="cview" href="#"><small style="color:#3786C2;">Clinical Data</small></a>
            <small style="color:#000;">유사환자</small>
        </h1>
        <%--<ol class="breadcrumb">--%>
            <%--<li><a href="#"><i class="fa fa-home"></i> </a></li>--%>
            <%--<li><a href="#">Patient</a></li>--%>
            <%--<li class="active">Patient View</li>--%>
        <%--</ol>--%>
    </section>


    <div class="box">
        <div class="box-body">
            <div id="container">

                <div class="ttt" style="display:none;">
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
                                    <td id="divsample">
                                        <div id="sample_loader" class="sk-spinner styles-module_color styles-module_small la-line-scale-pulse-out" style="display:none;">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="studyMetaBar"></div>
                    </div>
                </div>
                <hr />

                <div class="container-fulid ttt" style="display:none;">
                    <table id="tresemble" class="table table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col" class="active">Patient</th>
                            <th scope="col">Overrall Survival Status</th>
                            <th scope="col">Diagnosis Age</th>
                            <th scope="col">Number of Sample Per Patient</th>
                            <th scope="col">Overrall Survival(Months)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                        </tr>
                        <tr>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                        </tr>
                        <tr>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                        </tr>
                        <tr>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                        </tr>
                        <tr>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                            <td>UnKnown</td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="resemble_pageview" class="com-paging">
                    </div>
                </div>

                <hr/>

                <div class="container-fulid">
                    <div class="row" id="row1">
                        <div class="col-xs-3 col">
                        </div>
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col text-align-right">
                            <label class="label-default" style="width: auto;text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                            <input id="reset" type="button" value="Reset" class="btn btn-sm btn-default" style="display:none;margin-right:3px;">
                            <input id="xgrid" type="button" value="Grid on" class="btn btn-sm btn-success" style="display:none;">
                        </div>
                    </div>
                </div>

                <hr />
                <div class="container-fulid">
                    <div id="timeline" style="display:flex;">
                        <div id="timeLineContainer"></div>
                    </div>
                </div>
                <hr />

                <div>
                    <div id="grch137" style="display:flex;">
                        <div id="genomicOverviewTracksContainer1"></div>
                    </div>
                </div>

                <hr />

                <%--<div class="box-footer text-align-center Footer-module ttt" style="display:none;">--%>
                    <%--<span style="font-size:14px;">--%>
                        <%--<strong>Asan Cancer Center</strong>--%>
                    <%--</span>--%>
                <%--</div>--%>
            </div>
        </div>
    </div>
    <div id="spinner" style="zIndex:100;position:relative;display:none;">
        <div class="centered" >
            <div style="color: #9784ed" class="la-ball-circus la-2x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #9784ed" class="la-ball-circus la-2x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style="color: #9784ed" class="la-ball-circus la-2x">
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
            <div class="la-ball-clip-rotate la-3x" style="color: #87c4a3">
                <div></div>
            </div>
        </div>
    </div>

    <form name="dform" id="dform" method="post" action="/patient/patientView">
        <input type="hidden" name="patients" value=""/>
        <input type="hidden" name="pages"  value=""/>
        <input type="hidden" name="patientId"  value=""/>
        <input type="hidden" name="resch_pat_id" value=""/>
    </form>

    <form name="pform" id="pform" method="post" action="/patient/patientSample">
        <input type="hidden" name="patients" id="patients" value=""/>
        <input type="hidden" name="pages" id="pages" value=""/>
        <input type="hidden" name="patientId" id="patientId" value=""/>
        <input type="hidden" name="resch_pat_id" id="RESCH_PAT_ID" value=""/>

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

    <script src="<c:url value="/js/page/patient/WindowDriver.js" />"></script>
    <script src="<c:url value="/js/page/patient/const.js" />"></script>
    <script src="<c:url value="/js/page/patient/pagination.js" />"></script>
    <script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>
    <script src="<c:url value="/js/page/patient/Timeline.js" />"></script>
    <script src="<c:url value="/js/page/patient/diagnosis/pathology.js" />"></script>
    <script src="<c:url value="/js/page/patient/diagnosis/specimen.js" />"></script>
    <script src="<c:url value="/js/page/patient/diagnosis/image.js" />"></script>
    <script src="<c:url value="/js/page/patient/diagnosis/sugery.js" />"></script>
    <script src="<c:url value="/js/page/patient/diagnosis/biopsy.js" />"></script>
    <script src="<c:url value="/js/page/patient/plotFilter.js" />"></script>
    <script src="<c:url value="/js/page/patient/event.js" />"></script>
    <script src="<c:url value="/js/page/patient/patientResemble.js" />"></script>

    <script>
        var MUTATIOINCOUNT  = '<%=(request.getParameter("mutationcount") == null) ? "" : request.getParameter("mutationcount")%>';
        var AGE  = '<%=(request.getParameter("age") == null) ? "" : request.getParameter("age")%>';
        var SEX  = '<%=(request.getParameter("sex") == null) ? "" : request.getParameter("sex")%>';
        var CANCERTYPE  = '<%=(request.getParameter("cancertype") == null) ? "" : request.getParameter("cancertype")%>';
        var CANCERTYPEDETAIL  = '<%=(request.getParameter("cancertypedetail") == null) ? "" : request.getParameter("cancertypedetail")%>';
        var ONCOTREECODE  = '<%=(request.getParameter("oncotreecode") == null) ? "" : request.getParameter("oncotreecode")%>';

        var PATIENTID;
        var patients  = '<%=(request.getParameter("patients") == null) ? "" : request.getParameter("patients")%>';
        var resch_pat_id = '<%=(request.getParameter("RESCH_PAT_ID") == null) ? "" : request.getParameter("RESCH_PAT_ID")%>';
        var patientId = '<%=(request.getParameter("patientId") == null) ? "" : request.getParameter("patientId")%>';
        var pages     = '<%=(request.getParameter("pages") == null) ? "1" : request.getParameter("pages")%>';

        var samplespermutation     = '<%=(request.getParameter("samplespermutation") == null) ? "" : request.getParameter("samplespermutation")%>';
        var samples     = '<%=(request.getParameter("samples") == null) ? "" : request.getParameter("samples")%>';
        var samplenames     = '<%=(request.getParameter("samples") == null) ? "" : request.getParameter("samplenames")%>';

        var sex     = '<%=(request.getParameter("sex") == null) ? "" : request.getParameter("sex")%>';
        var age     = '<%=(request.getParameter("age") == null) ? "" : request.getParameter("age")%>';
        <%--var cancertype     = '<%=(request.getParameter("cancertype") == null) ? "" : request.getParameter("cancertype")%>';--%>
        <%--var cancertypedetail     = '<%=(request.getParameter("cancertypedetail") == null) ? "" : request.getParameter("cancertypedetail")%>';--%>
        <%--var oncotreecode     = '<%=(request.getParameter("oncotreecode") == null) ? "" : request.getParameter("oncotreecode")%>';--%>

        document.pform.patients.value = patients;
        document.pform.patientId.value = patientId;
        document.pform.pages.value = pages;
        document.pform.resch_pat_id.value = resch_pat_id;

        console.log('resch_pat_id ', resch_pat_id);
        console.log("cancerType", CANCERTYPE);
        console.log('cancerTypeDetail ', CANCERTYPEDETAIL);
        console.log('pages ', pages);
        console.log('patientId ', patientId);
        // console.log('patients ' , patients);
        console.log('samples ',samples);
        console.log('samplespermutation ', samplespermutation);

        var numberofsample=0;

        var SAMPLE=[];
        var SAMPLENAMES=[];
        var SAMPLEPERMUTATIONZ = [];

        if(samples.indexOf(",") === -1) {
            numberofsample = 1;

            SAMPLE.push(samples);
            SAMPLENAMES.push(samplenames);
        }
        else {
            var s = samples.split(",");
            var s1 = samplenames.split(",");
            var samplespermutations = samplespermutation.split(",");
            numberofsample = s.length;

            for(var i=0; i<s.length;i++){
                SAMPLE.push(s[i])
                SAMPLENAMES.push(s1[i]);
            }
        }



        PATIENTID = patientId;
        var pv = new PatientView();
        pv.getPatientDescription();

        if(SAMPLE[0]!="") {
            var txt = '';
            for (var i = 0; i < SAMPLE.length; i++) {
                txt += '<label class="label-default" style="width: auto;">';
                // txt+=getDivSample((PATIENTID+"_"+SAMPLE[i]) , parseInt(SAMPLE[i])) +" ";
                txt += getDivSample("head_" + SAMPLE[i], parseInt(SAMPLE[i])) + " ";
                // txt+=PATIENTID+'_';
                txt += SAMPLENAMES[i];
                // txt+=(i+1);
                // if(i===0)txt+=' Primary'
                txt += '</label>&nbsp;';
            }
            $("#divsample").append(txt);
        }

        var hasgenomicoverview=false;
        var timeLine = new TimeLine();
        timeLine.init(hasgenomicoverview);
        setTimeout(function() {
            $(".ttt").show();
        }, 2000);
    </script>

</div>
