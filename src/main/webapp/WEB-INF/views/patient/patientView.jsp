<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--
<style>
	.col {
		padding: 20px;
	}
	.row {
		margin-top: 16px;
	}
</style>
--%>
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
</style>
<section class="content-header">
    <h1>
        PATIENT VIEW
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
        <li class="active">PATIENT VIEW</li>
    </ol>
</section>

<section class="contents">
    <div class="container-fulid" style="margin-top:10px;">
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#" style="font-size: small;">Maie, 69 years old, Colorectal Cancer, LIVING(40 months)</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="#">Summary</a>
                    </li>
                    <li><a href="#">Data</a></li>
                    <li><a href="#">유사환자</a></li>
                </ul>
                <form class="navbar-form navbar-right" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search" />
                    </div>
                    <button type="submit" class="btn btn-default">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                </form>
            </div>
            <ul class="pagination pull-right" >
                <li><a href="#">First</a></li>
                <li><a href="#">&laquo</a></li>
                <li class="disabled">
                    <span style="height:34px;width:40px;">1
                        <%--<input value="1" style="border:none;height:34px;width:40px;">--%>
                    </span>
                </li>
                <%--<li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li class="active"><a href="#">5</a></li>--%>
                <li class="disabled"><a href="#">&raquo</a></li>
                <li class="disabled"><a href="#">Last</a></li>
            </ul>
        </nav>
    </div>

    <div class="container-fluid" >
        <div id="genomicOverviewTracksContainer" style="width:500px;height: 200px;"/>
    </div>
<div id="svg"></div>
</section>
<script src="<c:url value="/js/page/patient/patientView.js" />"></script>
