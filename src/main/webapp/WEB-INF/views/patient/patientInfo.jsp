<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Content Wrapper. Contains page content -->
<html>
<head>
    <script>
        $(document).ready(function () {
            // $('.main-header').hide();
        });
    </script>
    <style>
        /*        .rc-tooltip-inner {
                    min-height: initial;
                    word-wrap: break-word;
                }*/
        .rc-tooltip-inner {
            padding: 8px 10px;
            color: #333333;
            text-align: left;
            text-decoration: none;
            background-color: #ffffff;
            border-radius: 3px;
            min-height: 34px;
            border: 1px solid #b1b1b1;
        }

    </style>
</head>
<body>
<div class="rc-tooltip-inner" role="tooltip">
    <div style="max-height: 600px; max-width: 600px; overflow: auto;">
        <div class="lazy-mobx-table" data-test="LazyMobXTable">
            <div>
                <div role="toolbar" class="tableMainToolbar btn-toolbar" style="margin-left: 0px;"></div>
            </div>
            <div style="overflow-x: visible;">
                <table id="patient_t" class="table table-bordered">
                    <thead>
                    <tr class="success">
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody id="patient_con">
                    <tr>
                        <td>Overrall Survival Status</td>
                        <td>Unknown</td>
                    </tr>
                    <tr>
                        <td>Diagnosis Age</td>
                        <td id="age">Unknown</td>
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
                        <td id="sex">Unknown</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div role="toolbar" class="tableMainToolbar center btn-toolbar" style="margin-left: 0px; float: none;"></div>
        </div>
    </div>
</div>
</body>
</html>