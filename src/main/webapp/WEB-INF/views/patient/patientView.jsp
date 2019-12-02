<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Patient View</title>
</head>

<body data-spy="scroll" data-target="#main-nav" id="home">
<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top" id="main-nav">
    <div class="container">
        <a href="index.html" class="navbar-brand">BioLAB</a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a href="#home" class="nav-link">Patient</a>
                </li>
                <li class="nav-item">
                    <a href="#explore-head-section" class="nav-link">Time Chart</a>
                </li>
                <li class="nav-item">
                    <a href="#create-section" class="nav-link">Chromsome</a>
                </li>
                <li class="nav-item">
                    <a href="#share-head-section" class="nav-link">Mutation</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- HOME SECTION -->
<header id="home-section">
    <div class="dark-overlay">
        <div class="home-inner container">
            <div class="row">


                    <div class="bg-primary text-center">
                        <div class="card-body">

                            <div class="d-flex">
                                <div class="p-4 align-self-start">
                                    <i class="fas fa-check fa-2x"></i>
                                </div>
                                <div class="p-4 align-self-end">
                                    <h3>Patient List</h3>
                                </div>
                            </div>


                            <div class="d-flex">
                                <div class="p-4 align-self-start">
                                    <div id="grid">
                                    </div>
                                </div>
                            </div>
                            <%--<div class="col text-center py-5">
                                        <ul class="pagination pagination-lg">
                                            <li class="disabled"><a class="btn btn-outline-light btn-block" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                                            <li class="active"><a class="btn btn-outline-light btn-block" href="#">1 <span class="sr-only">(current)</span></a></li>
                                            <li><a class="btn btn-outline-light btn-block" href="#">2</a></li>
                                            <li class="disabled"><a class="btn btn-outline-light btn-block" href="#">...</a></li>
                                            <li><a class="btn btn-outline-light btn-block" href="#">3</a></li>
                                            <li><a class="btn btn-outline-light btn-block" href="#">4</a></li>
                                            <li><a class="btn btn-outline-light btn-block" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                                       </ul>
                               </div>--%>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</header>

<!-- EXPLORE HEAD -->
<section id="explore-head-section">
    <div class="container">
        <div class="row">
            <div class="col text-center py-5">
                <h1 class="display-4">Patient ID</h1>
                <p class="lead">patient description</p>
                <a href="#" class="btn btn-outline-secondary">Attribute</a>
                <a href="#" class="btn btn-outline-secondary">유사환자</a>
            </div>
        </div>
    </div>
</section>

<!-- EXPLORE SECTION -->
<section id="explore-section" class="bg-light text-muted py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex">
                <div class="p-4 align-self-start">
                    <i class="fas fa-check fa-2x"></i>
                </div>
                    <div class="p-4 align-self-end">
                        <h3>Explore & diagnosis</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <%--<div id="swave" class="la-pacman" style="color: #9784ed;display:none;">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>--%>
                    </div>
                <div class="col-md-10 text-right">
                 <label style="width: auto; text-align: right; margin-right: 10px; margin-top: 7px;" id="dhead"></label>
                <%--<input id="cate" type="button" value="항목관리" class="btn btn-sm" style="margin-right:3px;">--%>
                <input id="reset" type="button" value="Reset" class="btn btn-sm btn-warning" style="margin-right:3px;">
                <input id="xgrid" type="button" value="Grid off" class="btn btn-sm btn-success">
                <%--<label style="width: 50px; text-align: right; margin-right: 10px; margin-top: 7px;">Zoom</label>--%>
                <%--<input id="zoomin" type="button" value="+">--%>
                <%--<input id="zoomout" type="button" value="-">--%>
                <span id="zoomin" class="label label-success" style="cursor:pointer">+</span>
                <span id="zoomout" class="label label-success" style="cursor:pointer">-</span>


               </div>
              </div>
                <div id="timeline" style="overflow-x: auto;">
                    <div id="genomicOverviewTracksContainer" />
                </div>

            </div>
        </div>
    </div>
</section>

<!-- CREATE SECTION -->
<section id="create-section" class="bg-light text-muted py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex">
                    <div class="p-4 align-self-start">
                        <i class="fas fa-check fa-2x"></i>
                    </div>
                    <div class="p-4 align-self-end">
                        <h3>Chromosome</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">

                    </div>
                    <div class="col-md-10 text-right">


                    </div>
                </div>
                <div style="overflow-x:auto;">
                    <div id="genomicOverviewTracksContainer1" style="overflow-x:auto;"/>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- SHARE HEAD -->
<section id="share-head-section" class="bg-primary">
    <div class="container">
        <div class="row">
            <div class="col text-center py-5">
                <h4 class="display-4">Mutation Table</h4>
                <p class="lead">MUT CNA EXP STR</p>
                <%--<a href="#" class="btn btn-outline-light">Find Out More</a>--%>
            </div>
        </div>
    </div>
</section>

<!-- SHARE SECTION -->
<section id="share-section" class="bg-light text-muted py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex">
                    <div class="p-4 align-self-start">
                        <i class="fas fa-check fa-2x"></i>
                    </div>
                    <div class="p-4 align-self-end">
                        <h3>MUT</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">

                    </div>
                    <div class="col-md-3">

                    </div>
                    <div class="col-md-3 text-right">

                        <form id="search" role="search">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </div>
                        </form>

                    </div>
                </div>
                <div style="overflow-x:auto;">

                    <table id="stats" class="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th data-sort='{"key":"geneNm"}' role="button"><span>Gene</span></th>
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
                            <th data-sort='{"key":"cosmic"}' role="button" style="text-align: right;"><span>COSMIC</span></th>
                        </tr>
                        </thead>
                        <tbody id="mutation_con">

                        </tbody>
                    </table>

                </div>

                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer id="main-footer" class="bg-dark">
    <div class="container">
        <div class="row">
            <div class="col text-center py-4">
                <h3>React KOREA</h3>
                <p>Copyright &copy;
                    <span id="year"></span>
                </p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#contactModal">Contact Us</button>
            </div>
        </div>
    </div>
</footer>

<!-- CONTACT MODAL -->
<div class="modal fade text-dark" id="contactModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Contact Us</h5>
                <button class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea class="form-control"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-block">Submit</button>
            </div>
        </div>
    </div>
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

<script>
    // Get the current year for the copyright
    $('#year').text(new Date().getFullYear());

    // Init Scrollspy
    $('body').scrollspy({ target: '#main-nav' });

    // Smooth Scrolling
    $("#main-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                window.location.hash = hash;
            });
        }
    });
</script>

<script>
    /*var PATIENTID = '//request.getParameter("patientId")';*/
    var PATIENTID;
</script>
<script src="<c:url value="/js/page/patient/patientMain.js" />"></script>
<script src="<c:url value="/js/page/patient/patientViewPage.js" />"></script>
<script src="<c:url value="/js/page/patient/Timeline.js" />"></script>
<script src="<c:url value="/js/page/patient/PatientViewMutationTable.js" />"></script>
<script src="<c:url value="/js/page/patient/GenomicOverview.js" />"></script>

</body>