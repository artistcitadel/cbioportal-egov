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
        <h5 style="margin-bottom: 1px;">
            <span class="sample-inline-tooltip-children">
                <svg width="12" height="12" class="case-label-header" data-test="sample-icon">
                    <g transform="translate(6,6)">
                        <circle r="6" fill="orange" fill-opacity="1"></circle>
                    </g>
                    <g transform="translate(6,5.5)">
                        <text y="4" text-anchor="middle" font-size="10" fill="white" style="cursor: default;">4</text>
                    </g>
                </svg>
            </span>P04_Rec3
        </h5>
        <div class="lazy-mobx-table" data-test="LazyMobXTable">
            <div>
                <div role="toolbar" class="tableMainToolbar btn-toolbar" style="margin-left: 0px;"></div>
            </div>
            <div style="overflow-x: visible;">
                <table class="table table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Attribute</th>
                        <th scope="col" class="active">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="success">
                        <td><span>Mutation Count</span></td>
                        <td><span>55</span></td>
                    </tr>
                    <tr class="info">
                        <td><span>Sample Type</span></td>
                        <td><span>Recurrent</span></td>
                    </tr>
                    <tr class="warning">
                        <td><span>1p/19q Status</span></td>
                        <td><span>Intact</span></td>
                    </tr>
                    <tr>
                        <td><span>Cancer Type</span></td>
                        <td><span>Glioma</span></td>
                    </tr>
                    <tr>
                        <td><span>Cancer Type Detailed</span></td>
                        <td><span>Anaplastic Astrocytoma</span></td>
                    </tr>
                    <tr>
                        <td><span>IDH1 Mutation</span></td>
                        <td><span>R132C</span></td>
                    </tr>
                    <tr><td><span>MGMT Status</span></td><td><span>Unknown</span></td>
                    </tr>
                    <tr>
                        <td><span>Neoplasm Histologic Grade</span></td>
                        <td><span>III</span></td>
                    </tr>
                    <tr>
                        <td><span>Non-silent mutations in TP53, ATRX, CIC, FUBP1</span></td>
                        <td><span>TP53</span></td>
                    </tr>
                    <tr>
                        <td><span>Oncotree Code</span></td>
                        <td class="danger"><span>AASTR</span></td>
                    </tr>
                    <tr>
                        <td><span>Somatic Status</span></td>
                        <td><span>Matched</span></td>
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