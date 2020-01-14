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
<div class="content-wrapper" style="margin-left:0px;overflow-y: hidden;">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="background-color: aliceblue;">
        <h1>
            &nbsp;
            <a id="pview" href="#"><small style="color:#3786C2;">Summary</small></a>
            <small style="color:#000">Clinical Data</small>
            <a id="sview" href="#"><small style="color:#3786C2;">유사환자</small></a>
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
                <div>
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
                                    <td id="divsample"><%--Samples: primary--%>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="studyMetaBar"></div>

                    </div>
                </div>
                <hr />

                <div class="container-fulid">
                    <div class="col-xs-4 col " align="left" style="font-weight:bold;">
                        <span style="color:#3786C2">Patient</span>
                    </div>
                    <br/>
                    <table id="patient_t" class="table table-bordered">
                        <thead>
                        <tr class="success">
                            <th>Attribute</th>
                            <th width="500px">Value</th>
                        </tr>
                        </thead>
                        <tbody id="patient_con">
                          <tr>
                              <td>Overrall Survival Status</td>
                              <td>Unknown</td>
                          </tr>
                          <tr>
                              <td>Diagnosis Age</td>
                              <td id="age0">Unknown</td>
                          </tr>
                          <tr>
                              <td>Number of Sample Per Patient</td>
                              <td id="numberofsample">Unknown</td>
                          </tr>
                          <tr>
                              <td>Overrall Survival(Months)</td>
                              <td>Unknown</td>
                          </tr>
                          <tr>
                              <td>Sex</td>
                              <td id="sex0">Unknown</td>
                          </tr>
                        </tbody>
                    </table>
                </div>

                <hr />
                   <div class="col-xs-4 col" align="left" style="font-weight: bold;">
                       <span style="color:#3786C2">Samples</span>
                    </div>
                    <br/>
                    <table id="samples_t" class="table table-bordered">
                        <thead>
                        <tr class="success" id="th_con">
                            <%--<th>Attribute</th>
                            <th width="500px" id="sample1">Value</th>--%>
                        </tr>
                        </thead>
                        <tbody id="samples_con">
                        <tr id="mcount">
                            <%--<td>Mutation Count</td>
                            <td id="mcount1"></td>--%>
                        </tr>
                        <tr id="sampleType">
                            <%--<td>Sample Type</td>
                            <td id="sampletype1"></td>--%>
                        </tr>
                        <tr id="status">
                            <%--<td>1q/19q Status</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="cType">
                            <%--<td>Cancer Types</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="cTypeDetail">
                            <%--<td>Cancer Type Detailed</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="idh1">
                            <%--<td>IDH1 Mutation</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="mgmt">
                            <%--<td>MGMT Status</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="grade">
                            <%--<td>Neoplasm Histologic Grade</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="nonslilentmutation">
                            <%--<td>Non-slilent mutations in TP53, ATRX, CIC, FUBP1</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="ccode">
                            <%--<td>Oncotree Code</td>
                            <td>Unknown</td>--%>
                        </tr>
                        <tr id="samaticstatus">
                            <%--<td>Somatic Status</td>
                            <td>Unknown</td>--%>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <div class="box-footer text-align-center Footer-module ttt" style="display:none;">
                    <span style="font-size:14px;">
                        <strong>Asan Cancer Center</strong>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div id="spinner1" style="zIndex:100;position:relative;display:none;">
        <div class="centered" >
            <div class="la-ball-clip-rotate la-3x" style="color: #87c4a3">
                <div></div>
            </div>
        </div>
    </div>

    <form name="dform" id="dform" method="post" action="/pmp/patient/patientView">
        <input type="hidden" name="patients" value=""/>
        <input type="hidden" name="pages"  value=""/>
        <input type="hidden" name="patientId"  value=""/>
        <input type="hidden" name="resch_pat_id" value=""/>
    </form>

    <form name="pform" id="pform" method="post" action="/pmp/patient/patientResemble">

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
    <script src="<c:url value="/js/page/patient/patientSample.js" />"></script>
    <script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>
    <script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>

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
            SAMPLEPERMUTATIONZ.push(samplespermutation);
        }
        else {
            var s = samples.split(",");
            var s1 = samplenames.split(",");
            var samplespermutations = samplespermutation.split(",");
            numberofsample = s.length;

            /*mcount1 = samplespermutations[0];
            mcount2 = samplespermutations[1];
            if(numberofsample>2)mcount3 = samplespermutations[2];
            if(numberofsample>3)mcount4 = samplespermutations[3];*/

            for(var i=0; i<s.length;i++){
                SAMPLE.push(s[i])
                SAMPLENAMES.push(s1[i]);
                SAMPLEPERMUTATIONZ.push(samplespermutations[i]);
            }
        }

        var thtxt='';
        var mcounttxt='';
        var sampleTypetxt='';
        var statustxt='';
        var cTypetxt='';
        var cTypeDetailtxt='';
        var idh1txt='';
        var mgmttxt='';
        var gradetxt='';
        var nonslilentmutationtxt='';
        var ccodetxt='';
        var samaticstatustxt='';
        for(var i=0;i<SAMPLE.length;i++){

          thtxt+=' <th width="auto">Attribute</th>\n' +
                 ' <th width="auto">Value</th>';
          mcounttxt +='<td>Mutation Count</td>\n' +
                 ' <td>'+MUTATIOINCOUNT+'</td>';
          sampleTypetxt += '<td>Sample Count</td>\n' +
                 ' <td>'+SAMPLEPERMUTATIONZ[i]+'</td>'
          statustxt +='<td>1q/19q Status</td> \n' +
                          ' <td>Unknown</td>';
         cTypetxt +='<td>Cancer Types</td> \n' +
                ' <td>'+CANCERTYPE+'</td>';
         cTypeDetailtxt +='<td>Cancer Type Detailed</td> \n' +
                ' <td>'+CANCERTYPEDETAIL+'</td>';
         idh1txt+='<td>IDH1 Mutation</td>\n' +
                '                            <td>Unknown</td>';
         mgmttxt+='<td>MGMT Status</td>\n' +
             '                            <td>Unknown</td>';
         gradetxt+='<td>Neoplasm Histologic Grade</td>\n' +
             '                            <td>Unknown</td>';
         nonslilentmutationtxt+='<td>Non-slilent mutations in TP53, ATRX, CIC, FUBP1</td>\n' +
             '                            <td>Unknown</td>';
         ccodetxt+='<td>Oncotree Code</td>\n' +
                '                            <td>'+ONCOTREECODE+'</td>';
         samaticstatustxt+='<td>Somatic Status</td>\n' +
             '                            <td>Unknown</td>';
        }
        $("#th_con").append(thtxt);
        $("#mcount").append(mcounttxt);
        $("#sampleType").append(sampleTypetxt);
        $("#cType").append(cTypetxt);
        $("#cTypeDetail").append(cTypeDetailtxt);
        $("#idh1").append(idh1txt);
        $("#mgmt").append(mgmttxt);
        $("#grade").append(gradetxt);
        $("#nonslilentmutation").append(nonslilentmutationtxt);
        $("#ccode").append(ccodetxt);
        $("#samaticstatus").append(samaticstatustxt);

        // $("#numberofsample").text(numberofsample);
        // $("#mcount1").text(mcount1);
        // $("#mcount2").text(mcount2);
        // $("#mcount3").text(mcount3);
        // $("#mcount4").text(mcount4);
        //
        // $("#sampletype1").text(SAMPLE[0]);
        // $("#sampletype2").text(SAMPLE[1]);
        // $("#sampletype3").text(SAMPLE[2]);
        // $("#sampletype4").text(SAMPLE[3]);

        $("#sex0").text(sex);
        $("#age0").text(age);
        // $("#cancertype1").text(cancertype);
        // $("#cancertypedetail").text(cancertypedetail);
        // $("#oncotreecode1").text(oncotreecode);

        PATIENTID = patientId;
        var pv = new PatientView();
        pv.getPatientDescription();

        var txt='';
        for(var i=0;i<SAMPLE.length;i++){
            txt+='<label class="label-default" style="width: auto;">';
            // txt+=getDivSample((PATIENTID+"_"+SAMPLE[i]) , parseInt(SAMPLE[i])) +" ";
            txt+=getDivSample((SAMPLENAMES[i]) , parseInt(SAMPLE[i])) +" ";
            txt+=SAMPLENAMES[i];
            // txt+=PATIENTID+'_';
            // txt+=(i+1);
            // if(i===0)txt+=' Primary'
            txt+='</label>&nbsp;';
        }
        $("#divsample").append(txt);
    </script>

</div>
