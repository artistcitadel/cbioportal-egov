<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script language="JavaScript">
	var message = "${message}";
	if(message != null && message != ""){
		alert(message);
		window.close(); // alert에서 확인 버튼 클릭 시 window 종료
	}
</script>
