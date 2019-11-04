<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script>
	$(document).ready(function(){
		setTimeout(function() {
				$('#footerhidden').css('display','none');
			}, 1000);

	});
	

</script>

<div class="pull-right hidden-xs">
	<b>Version</b> 2.0.0
	<input type="text" id="footerhidden" value="" style="width:1px; height:1px; border:0; padding:0;">
	
</div>

<spring:message code="copyright" />