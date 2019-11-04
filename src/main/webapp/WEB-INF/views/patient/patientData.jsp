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

    <div class="container-fulid">
        <div class="row" id="row1">
            <div class="col-xs-3 col" style="background-color: white;">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" style="border:none" value="Cohort 선택 :" disabled/>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control"  />
                        <i class="form-control-feedback glyphicon glyphicon-remove"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control"  />
                        <i class="form-control-feedback glyphicon glyphicon-remove"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <%--<button class="btn btn-primary" type="submit" style="height:34px;">초기화</button>--%>
                        <button class="btn btn-primary btn-xs btn-block" style="width:auto;height:34px;">
                            초기화
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fulid">
        <div class="row" id="row1">
            <div class="col-xs-3 col" style="background-color: white;">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" style="border:none" value="필터 선택 Mutated Genes =" disabled/>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control"  />
                        <i class="form-control-feedback glyphicon glyphicon-remove"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            초기화
                        </button>
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            저장
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-xs-5 col" align="right">
                <div class="form-group">
                    <div class="form-group has-feedback" style="height:34px;">
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            Cohort Analysis
                        </button>
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            Mutation View
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fulid">
        <div class="row" id="row1">
            <div class="col-xs-3 col" style="background-color: white;">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" style="border:none" value="환자 선택 :" disabled/>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control"  />
                        <i class="form-control-feedback glyphicon glyphicon-remove"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control"  />
                        <i class="form-control-feedback glyphicon glyphicon-remove"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col">
                <div class="form-group">
                    <div class="form-group has-feedback">
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            초기화
                        </button>
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            저장
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-xs-3 col" align="right">
                <div class="form-group">
                    <div class="form-group has-feedback" style="height:34px;">
                        <button class="btn btn-primary btn-xs" style="width:auto;height:34px;">
                            Patient View
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="container" style="padding-left: 0px;">
        <br/>
        <%--<p class="h2">PATIENT VIEW</p>--%>

        <div class="col-sm-10">
            <div class="btn-toolbar" role="toolbar">
                <div class="btn-group btn-group-justified">
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" onClick="location.href='patientView'">

                            Summary
                        </button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-success">
                            <span class="glyphicon glyphicon-ok"></span>
                            Data
                        </button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" onClick="location.href='patientQuasi'">

                            유사환자
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="container-fluid">
        <h2>
            <strong>PATIENT</strong>
        </h2>
        <div class="container-fluid">
            <table class="table table table-bordered patient-table">
                <thead>
                <tr>
                    <th scope="col">Attribute</th>
                    <th scope="col">Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>

    <div class="container-fluid">
        <h2>
            <strong>SAMPLE</strong>
        </h2>
        <div class="container-fluid">
            <table class="table table table-bordered patient-table">
                <thead>
                <tr>
                    <th scope="col">Attribute</th>
                    <th scope="col">Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                <tr>
                    <td>Diagnosis</td>
                    <td>Acnar cell cati...</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>

</section>
<script src="<c:url value="/js/page/patient/patientData.js" />"></script>

