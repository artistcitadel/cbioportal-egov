<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Patient View</title>
</head>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Patient ID
            <small>Patient Description</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Patient</a></li>
            <li class="active">Patient View</li>
        </ol>
    </section>



    <section class="content">
        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Chart</h3>

                <div class="box-tools pull-right">
                    <%--<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                            title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                        <i class="fa fa-times"></i></button>--%>
                </div>
            </div>
            <div class="box-body">

                <div class="ontainer-fulid">
                    <div class="row" id="row1">
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col"></div>
                        <div class="col-xs-3 col text-align-right">
                            <label style="width: auto; text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                            <input id="cate" type="button" value="항목관리" class="btn btn-link" data-toggle="modal" data-target="#contactModal" style="margin-right:3px;">
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

            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <%--Footer--%>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>





    <section class="content">
        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Chromosome</h3>

                <div class="box-tools pull-right">
                    <%--<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                            title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                        <i class="fa fa-times"></i></button>--%>
                </div>
            </div>
            <div class="box-body">

                <div class="ontainer-fulid">
                    <div class="row">
                        <div class="col-xs-12 col">

                            <div style="overflow-x:auto;">
                                <div id="genomicOverviewTracksContainer1" style="overflow-x:auto;"/>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <%--Footer--%>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>






    <section class="content">
        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">MUT</h3>

                <div class="box-tools pull-right">
                    <%--<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                            title="Collapse">
                        <i class="fa fa-minus"></i></button>--%>
                </div>
            </div>
            <div class="box-body">

                <div class="container-fulid" align="right">
                    <div class="row" style="width:60%;float:right;">

                            <%--<div class="col-xs-2 col">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div class="col-xs-3 col">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div class="col-xs-3 col">&nbsp;&nbsp;&nbsp;&nbsp;</div>--%>
                        <div class="col-md-10" style="width:80%;float:right;margin-right:20px;">
                            <%--<div class="pull-right dropdown btn-group">
                            <button class="btn btn-success" type="button" data-toggle="dropdown">
                                Columns
                            </button>
                            <ul role="menu" class="dropdown-menu" style="padding-left: 10px; overflow: auto; max-height: 300px; white-space: nowrap;">
                                <ul class="list-unstyled">
                                    <li><label class="checkbox-inline" title=""><input id="geneNm" type="checkbox">Gene</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="geneExamMthNm" type="checkbox">methods</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="hgvspVal" type="checkbox">Protein Change</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="annotation" type="checkbox">Annotation</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="chrnNo" type="checkbox">Chromosome</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="geneVariStLocVal" type="checkbox">Start Pos</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="geneVariEndLocVal" type="checkbox">End Pos</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="refAlleleSqncVal" type="checkbox">Ref</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="variAlleleSqncVal" type="checkbox">Var</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="ms" type="checkbox">MS</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="geneVariClsfNm" type="checkbox">Mutation Type</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="variAlleleReadRt" type="checkbox" >Allele Freq</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="variAlleleReadCnt" type="checkbox">Varient Reads(N)</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="refAlleleReadCnt" type="checkbox">Ref Reads(N)</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="copy" type="checkbox">Copy #</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="chort" type="checkbox">Cohort</label></li>
                                    <li><label class="checkbox-inline" title=""><input id="cosmic" type="checkbox">COSMIC</label></li>
                                </ul>
                            </ul>
                          </div>--%>
                                <div class="btn-group" style="width:60%;">
                                    <button class="btn btn-success" type="button">
                                        Create a new column entry
                                    </button>
                                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdown1" data-toggle="dropdown">
                                        <span class="caret"></span>
                                        <span class="sr-only">Toggle dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown1">
                                        <li role="presentation"><input id="geneNm_MUTATIONS" type="checkbox">Gene</li>
                                        <li role="presentation"><input id="geneExamMthNm_MUTATIONS" type="checkbox">methods</li>
                                        <li role="presentation"><input id="hgvspVal_MUTATIONS" type="checkbox">Protein Change</li>
                                        <li role="presentation"><input id="annotation_MUTATIONS" type="checkbox">Annotation</li>
                                        <li role="presentation"><input id="chrnNo_MUTATIONS" type="checkbox">Chromosome</li>
                                        <li role="presentation"><input id="geneVariStLocVal_MUTATIONS" type="checkbox">Start Pos</li>
                                        <li role="presentation"><input id="geneVariEndLocVal_MUTATIONS" type="checkbox">End Pos</li>
                                        <li role="presentation"><input id="refAlleleSqncVal_MUTATIONS" type="checkbox">Ref</li>
                                        <li role="presentation"><input id="variAlleleSqncVal_MUTATIONS" type="checkbox">Var</li>
                                        <li role="presentation"><input id="ms_MUTATIONS" type="checkbox">MS</li>
                                        <li role="presentation"><input id="geneVariClsfNm_MUTATIONS" type="checkbox">Mutation Type</li>
                                        <li role="presentation"><input id="variAlleleReadRt_MUTATIONS" type="checkbox" >Allele Freq</li>
                                        <li role="presentation"><input id="variAlleleReadCnt_MUTATIONS" type="checkbox">Varient Reads(N)</li>
                                        <li role="presentation"><input id="refAlleleReadCnt_MUTATIONS" type="checkbox">Ref Reads(N)</li>
                                        <li role="presentation"><input id="copy_MUTATIONS" type="checkbox">Copy #</li>
                                        <li role="presentation"><input id="chort_MUTATIONS" type="checkbox">Cohort</li>
                                        <li role="presentation"><input id="cosmic_MUTATIONS" type="checkbox">COSMIC</li>
                                    </ul>

                                        <form id="search" role="search" style="width:400px;">
                                            <div class="input-group">
                                                <input type="text" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                                <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                            </div>
                                        </form>

                                </div>
                        </div>

                           <%-- <div class="col-md-5">
                                <form id="search" role="search">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search...">
                                        &lt;%&ndash;<span class="glyphicon glyphicon-search" aria-hidden="true"></span>&ndash;%&gt;
                                    </div>
                                </form>
                            </div>--%>

                    </div>
                    <div class="row">
                        <div class="col-xs-12 col">

                            <div style="overflow-x:auto;">

                                <table id="MUTATIONS_t" class="table table-bordered">
                                    <thead>
                                    <tr id='MUTATIONS' class="success">
                                        <%--<th data-sort='{"key":"geneNm"}' role="button"><span>Gene</span></th>
                                        <th data-sort='{"key":"geneExamMthNm"}' role="button"><span>methods</span></th>
                                        <th data-sort='{"key":"hgvspVal"}' role="button"><span>Protein Change</span></th>
                                        <th data-sort='{"key":"annotation"}'><span>Annotation</span></th>
                                        <th data-sort='{"key":"chrnNo"}' ><span>Chromosome</span></th>
                                        <th data-sort='{"key":"geneVariStLocVal"}'  role="button"><span>Start Pos</span></th>
                                        <th data-sort='{"key":"geneVariEndLocVal"}' role="button"><span>End Pos</span></th>
                                        <th data-sort='{"key":"refAlleleSqncVal"}'  role="button"><span>Ref</span></th>
                                        <th data-sort='{"key":"variAlleleSqncVal"}'  role="button"><span>Var</span></th>
                                        <th data-sort='{"key":"ms"}' role="button"><span>MS</span></th>
                                        <th data-sort='{"key":"geneVariClsfNm"}'  role="button"><span>Mutation Type</span></th>
                                        <th data-sort='{"key":"variAlleleReadRt"}' role="button"><span>Allele Freq</span></th>
                                        <th data-sort='{"key":"variAlleleReadCnt"}' role="button"><span>Varient Reads(N)</span></th>
                                        <th data-sort='{"key":"refAlleleReadCnt"}' role="button"><span>Ref Reads(N)</span></th>
                                        <th data-sort='{"key":"copy"}' role="button"><span>Copy #</span></th>
                                        <th data-sort='{"key":"cohort"}' role="button"><span>Cohort</span></th>
                                        <th data-sort='{"key":"cosmic"}' role="button" style="text-align: right;"><span>COSMIC</span></th>--%>
                                    </tr>
                                    </thead>
                                    <tbody id="MUTATIONS_con">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /.box-body -->
            <div class="box-footer text-align-center">
                <%--<ul class="pagination">
                    <li><a href="#">First</a></li>
                    <li><a href="#">&laquo</a></li>
                    <li class="active"><a href="#">1</a></li>
                    <li class="disabled"><a href="#">&raquo</a></li>
                    <li class="disabled"><a href="#">Last</a></li>
                </ul>--%>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>




    <section class="content">
        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">CNA</h3>

                <div class="box-tools pull-right">
                </div>
            </div>
            <div class="box-body">

                <div class="container-fulid" align="right">
                    <div class="row" style="width:60%;float:right;">
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
                                    <li role="presentation"><input id="geneNm_CNV" type="checkbox">Gene</li>
                                    <li role="presentation"><input id="geneExamMthNm_CNV" type="checkbox">methods</li>
                                    <li role="presentation"><input id="annotation_CNV" type="checkbox">Annotation</li>
                                    <li role="presentation"><input id="cytbNm_CNV" type="checkbox">Cytoband</li>
                                    <li role="presentation"><input id="cohort_CNV" type="checkbox">cohort</li>
                                </ul>

                                <form role="search" style="width:400px;">
                                    <div class="input-group">
                                        <input type="text" id="searchcna" class="form-control" style="margin-left:8px;" placeholder="Search...">
                                        <%--<span class="glyphicon glyphicon-search" aria-hidden="true"></span>--%>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-xs-12 col">

                            <div style="overflow-x:auto;">

                                <table id="CNV_t" class="table table-bordered">
                                    <thead>
                                    <tr id='CNV' class="warning">
                                    </tr>
                                    </thead>
                                    <tbody id="CNV_con">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /.box-body -->
            <div class="box-footer text-align-center">
                <%--<ul class="pagination">
                    <li><a href="#">First</a></li>
                    <li><a href="#">&laquo</a></li>
                    <li class="active"><a href="#">1</a></li>
                    <li class="disabled"><a href="#">&raquo</a></li>
                    <li class="disabled"><a href="#">Last</a></li>
                </ul>--%>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>



    <section class="content">
        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Title</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                            title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                        <i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
    <%--            Start creating your amazing application!--%>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <%--Footer--%>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>



</div>


<div id="spinner" style="zIndex:100;position:relative;display:none;">
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
</div>

<div id="spinner1" style="zIndex:100;position:relative;display:none;">
    <div class="centered" >
        <div class="la-ball-clip-rotate la-3x" style="color: #87c4a3">
            <div></div>
        </div>
    </div>
</div>
<!-- CONTACT MODAL -->
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
                <div id="category"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-block">Apply</button>
            </div>
        </div>
    </div>
</div>


<%--<script src="<c:url value="/js/page/patient/patientMain.js" />"></script>
<script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>--%>
<script src="<c:url value="/js/page/patient/Timeline.js" />"></script>
<script src="<c:url value="/js/page/patient/PatientViewMutationTable.js" />"></script>
<script src="<c:url value="/js/page/patient/GenomicOverview.js" />"></script>
<script>
    /*var PATIENTID = '//request.getParameter("patientId")';*/
    var PATIENTID;
    var patientView = new TimeLine();
    patientView.init();

    $(document).ready(function () {

        var action = new Action();
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientCategory"};
        ds_cond.callback = setCategory;
        action.selectList(ds_cond);

        function setCategory(data){
            var source1 =
                {
                    localdata: data,
                    datafields: [
                        {name: 'subject', type: 'string'},
                        {name: 'id', type: 'string'},
                        {name: 'name', type: 'string'},
                    ],
                    datatype: "array"
                };
            var dataAdapter = new $.jqx.dataAdapter(source1);
            console.log(dataAdapter);
            $("#category").jqxGrid(
                {
                    source: dataAdapter,
                    altRows: true,
                    //width:  getWidth("TreeGrid"),
                    width:  500,
                    selectionmode: 'checkbox',
                    columns: [
                        { text: "subject", align: "center", dataField: "subject", width: 150 },
                        { text: "id", cellsAlign: "center", align: "center", dataField: "id", width: 150 },
                        { text: "name", dataField: "name", cellsAlign: "center", align: "center", width: 150 }
                    ]
                });
       }
    });

</script>

</body>