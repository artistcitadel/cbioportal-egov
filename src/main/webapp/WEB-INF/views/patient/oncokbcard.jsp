<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Content Wrapper. Contains page content -->
<head>
    <script>
    $(document).ready(function () {
        // $('.main-header').hide();
    });
    </script>
</head>
<div id="oncokbcard" class="content-wrapper">
    <!-- Content Header (Page header) -->
    <%--<section class="content-header">
        <h1>
            Patient List
            <small></small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Patient</a></li>
            <li class="active">Patient select</li>
        </ol>
    </section>--%>

   <section class="content">


       <%--<div class="rc-tooltip oncokb-tooltip rc-tooltip-placement-right">
    <div class="rc-tooltip-content">--%>

           <div class="rc-tooltip-inner" role="tooltip">
               <div class="oncokb-card">
                   <div>
                       <span>
                           <div class="tabs-wrapper">
                               <div class="title">KMT2A KMT2A-ATP5L Fusion in adrenocortical carcinoma</div>
                               <div class="tabs">
                                   <div class="tab enable-hover">
                                       <a class="oncogenicity tab-title-a enable-hover-a enable-hover-active">
                                           <span class="tab-title">clinical implications</span>
                                           <span class="tab-subtitle">Likely Oncogenic</span>
                                       </a>
        </div>
        <div class="tab enable-hover">
            <a class="mutation-effect tab-title-a enable-hover-a">
                <span class="tab-title">Biological Effect</span>
                <span class="tab-subtitle">Likely Gain-of-function</span>
            </a>
        </div>
        <div class="indicator"></div>
    </div>
    <div>
        <div class="tab-pane" style="background-color: white;">
            <p>KMT2A, a histone methyltransferase, is altered by mutation or deletion in various solid tumors, and by chromosomal rearrangement in various hematologic malignancies.</p>
            <p>The KMT2A-ATP5L fusion is likely oncogenic.</p>
            <p style="margin-bottom: 0px;">There are no FDA-approved or NCCN-compendium listed treatments specifically for patients with KMT2A-ATP5L fusion positive adrenocortical carcinoma.</p>
        </div>

        <div class="tab-pane" style="max-height: 200px; overflow-y: auto;background-color: white;display:none;">
        <ul class="no-style-ul">
        <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/23628958" target="_blank"><b>The MLL recombinome of acute leukemias in 2013.</b></a>
            <div class="list-group-item-content"><span>Meyer C et al. Leukemia. 2013</span><span>PMID: 23628958</span></div>
        </li>
        <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/8681380" target="_blank"><b>An Mll-AF9 fusion gene made by homologous recombination causes acute leukemia in chimeric mice: a method to create fusion oncogenes.</b></a>
            <div class="list-group-item-content"><span>Corral J et al. Cell. 1996</span><span>PMID: 8681380</span></div>
        </li>
        <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/25998713" target="_blank"><b>Hijacked in cancer: the KMT2 (MLL) family of methyltransferases.</b></a>
            <div class="list-group-item-content"><span>Rao RC et al. Nat Rev Cancer. 2015</span><span>PMID: 25998713</span></div>
        </li>
        <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/11265751" target="_blank"><b>Inter-chromosomal recombination of Mll and Af9 genes mediated by cre-loxP in mouse development.</b></a>
            <div class="list-group-item-content"><span>Collins EC et al. EMBO Rep. 2000</span><span>PMID: 11265751</span></div>
            </li>
            <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/18455126" target="_blank"><b>Malignant transformation initiated by Mll-AF9: gene dosage and critical target cells.</b></a>
                <div class="list-group-item-content"><span>Chen W et al. Cancer Cell. 2008</span><span>PMID: 18455126</span></div>
            </li>
        </ul>
        </div>


    </div>

</div>


<div class="oncokb-treatment-table" style="font-size: 1.2rem;">
      <table class="table table table-bordered" style="margin-top:1px;margin-bottom:1px;">
            <thead>
                <tr>
                    <th scope="col" style="background-color:white;">Level</th>
                    <th scope="col" style="background-color:white;">Alteration(s)</th>
                    <th scope="col" style="background-color:white;">Drug(s)</th>
                    <th scope="col" style="background-color:white;">Level-associated<br/>cancer Type(s)</th>
                    <th scope="col" style="background-color:white;"></th>
                </tr>
            </thead>
            <tbody style="background-color:white;">
               <tr>
                   <td><i class="oncokb level-icon level-3B" style="margin:auto;" /></td>
                   <td>
                       <div style="whiteSpace: normal;lineHeight:1rem;">Oncogenic Mutations</div>
                   </td>
                   <td>
                      <div style="whiteSpace: normal;lineHeight:1rem;">
                       Cobimetinib, Trametinib
                      </div>
                   </td>
                   <td>
                      <div style="whiteSpace: normal;lineHeight:1rem;">
                       Melanoma
                      </div>
                   </td>
                   <td>
                    <div style="whiteSpace: normal;lineHeight:1rem;">
                      <i class="fa fa-book"></i>
                    </div>
                   </td>
               </tr>
            </tbody>
      </table>

</div>





<div class="disclaimer" style="background-color: white;"><span>The information above is intended for research purposes only and should not be used as a substitute for professional diagnosis and treatment.</span></div>


   <%-- <div data-toggle="collapse" data-target="#secret1" class="collapsible-header">Levels<span style="float: right;">
        <i class="fa fa-chevron-down orange-icon"></i></span></div>
    <div id="secret1"  style="overflow: hidden; height: 0px;">
        &lt;%&ndash;<div class="ReactCollapse--content">&ndash;%&gt;
            &lt;%&ndash;<div id="secret1" class="levels levels-collapse">&ndash;%&gt;
            <div class="levels">
                <ul style="line-height: 8; padding: 0px;">
                    <li class="levels-li"><i class="oncokb level-icon level-1"></i><span><b>FDA-recognized</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-2A"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-2B"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in another indication</b>, but not standard care for this indication</span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-3A"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in this indication</b></span></li>
                    <li class="evels-li"><i class="oncokb level-icon level-3B"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in another indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-4"></i><span><b>Compelling biological evidence</b> supports the biomarker as being predictive of response to a drug</span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-R1"></i><span><b>Standard care</b> biomarker predictive of <b>resistance</b> to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-R2"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of <b>resistance</b> to a drug</span></li>
                </ul>
            </div>
        &lt;%&ndash;</div>&ndash;%&gt;
    </div>--%>

    <div>
    <div data-toggle="collapse" data-target="#secret1" class="collapsible-header">Levels<span style="float: right;">
        <i class="fa fa-chevron-down orange-icon"></i></span></div>
    <div id="secret1" data-toggle="collapse" data-target="#topDives" class="ReactCollapse--collapse" style="overflow: hidden; height: 0px;">
        <div id="topDives" class="ReactCollapse--content" style="background-color: white;">
            <div class="levels levels-collapse">
                <ul style="line-height: 8; padding: 0px;">
                    <li class="levels-li"><i class="oncokb level-icon level-1"></i><span><b>FDA-recognized</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-2A"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-2B"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in another indication</b>, but not standard care for this indication</span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-3A"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in this indication</b></span></li>
                    <li class="evels-li"><i class="oncokb level-icon level-3B"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in another indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-4"></i><span><b>Compelling biological evidence</b> supports the biomarker as being predictive of response to a drug</span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-R1"></i><span><b>Standard care</b> biomarker predictive of <b>resistance</b> to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>
                    <li class="levels-li"><i class="oncokb level-icon level-R2"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of <b>resistance</b> to a drug</span></li>
                </ul>
                </div>
            </div>
        </div>
    </div>

    </span>
      <div class="footer" style="background-color: white;">
        <a href="https://oncokb.org/gene/TSC2/KCTD5-TSC2 Fusion" target="_blank">
          <img src="/pmp/js/page/patient/images/oncokb_logo.png" class="oncokb-logo" alt="OncoKB">
       </a>
       <span class="pull-right feedback">
       <%--<button class="btn btn-default btn-sm btn-xs">Feedback</button>--%>
      </span>
    </div>
   </div>
   </div>
  </div>
<%--</div>
</div>--%>

</section>
</div>