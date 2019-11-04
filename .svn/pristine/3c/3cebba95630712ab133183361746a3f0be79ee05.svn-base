<%@page import="java.io.PrintWriter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>500 Error Page</h1>
    <ol class="breadcrumb">
		<li><a href="../../bigcenmed2/"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">500 error</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
		<div class="error-page">
        <h2 class="headline text-red">500</h2>

        <div class="error-content">
        	<h3><i class="fa fa-warning text-red"></i> Server Error!!</h3>

          	<p>
            	<c:out value="${status_code}"></c:out><br>
            	<c:out value="${msg}"></c:out><br>
            	
            	<textarea rows="30" cols="100">
            	
            	<c:out value="${trace}"></c:out>
            	</textarea>
            	
            </p>   
            
            
            
        </div>
      </div>
      <!-- /.error-page -->

    </section>
    <!-- /.content -->