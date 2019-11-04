<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<util:properties id="bigcen" location="/WEB-INF/classes/bigcen.properties" />
<!DOCTYPE html>
<html>
<head>
<tiles:insertAttribute name="head_css"/>
<tiles:insertAttribute name="js"/>

<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxcore.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxbuttons.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxscrollbar.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxmenu.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxgrid.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxgrid.selection.js"/> "></script> 
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxgrid.columnsresize.js"/> "></script> 
<script type="text/javascript" src="<c:url value="/js/plugins/jqwidgets/jqwidgets-ver4.5.0/jqwidgets/jqxdata.js"/> "></script> 

	
<script type="text/javascript">
	var gvSERVER = "http://localhost:8080";
	var gvCONTEXT = "bigcenmed2";

	$(document).ready(function(){
		setGrid();
		initEvent();
	
	});
	
	var dataAdapterGrid;
	var sourceGrid = [];
	
	
	
	var gvDataSet = [];
	
	function initEvent(){
		$('#btnSearch').on('click',function(e){
			var form = { 
				id: "123", 
				name: "123"
			}; 
			
			callService("getData","example/list",form,"callback");
		});
		
		$('#btnCreate').on('click',function(e){
			var dataSet = {};
			
			dataSet.ID = "test";
			dataSet.PWD = "1234!";
			dataSet.NAME = "테스트";
				
			callService("createData","example/insert",dataSet,"callback");
			
		});	
		
		$('#btnUpdate').on('click',function(e){
			var dataSet = {};
			
			dataSet.ID = "test";
			dataSet.PWD = "1234!";
			dataSet.NAME = "테스트 수정";
				
			callService("updateData","example/update",dataSet,"callback");
			
		});	
		
		$('#btnDelete').on('click',function(e){
			var dataSet = {};
			
			dataSet.ID = "test";
				
			callService("deleteData","example/delete",dataSet,"callback");
			
		});	
		
		
		$('#dialog').dialog({ 
			autoOpen: false,
			minHeight: 200,
			minWidth:200,
			modal: true,
			resizable:true,
			title:"Hi Hello",
			dialogClass: "alert"
			
			
		});
		
		$('#btnDialog').on('click',function(e) {
			$('#dialog').dialog( "open" );
			
		});
	}
	
	
	
	var gvExampleList = [
		{SEQ:"1","ID":"test","PWD":"*****","NAME":"테스트"}
	];
	
	
	var data =
	{
	    datatype: "json",
	    datafields: [
	    	{ name: 'SEQ'},
	        { name: 'ID'},
	        { name: 'PWD'},
	        { name: 'NAME'}
	        
	    ],
	    cache: false,
	    localdata: gvExampleList
	};
	
	
	var dataAdapter = new $.jqx.dataAdapter(data, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	function serviceCallback(svcId, result){
		
		switch(svcId){
			case "getData":
				alert(JSON.stringify(result));
				
				data.localdata = result.dsExampleList;
				
			//	grid clear	
				$("#gridUser").jqxGrid('clear');			
				$("#gridUser").jqxGrid('updatebounddata', 'cells');
				
				break;
				
			case "createData":
				alert("저장되었습니다.");
				break;
				
			case "updateData":
				alert("수정되었습니다.");
				break;
				
			case "deleteData":
				alert("삭제되었습니다.");
				break;
					
			default:
				break;
		
		}
	}
	
	function setGrid(){
		$("#gridUser").jqxGrid({
		    source: dataAdapter,
		    theme: 'bootstrap',
		    columns: [
		    	{ text: '일련번호', datafield: 'SEQ', width: 50},
		        { text: '아이디', datafield: 'ID', width: 150},
		        { text: '비밀번호', datafield: 'PWD', width: 150 },
		        { text: '이름', datafield: 'NAME', width: 300 }
		    ]
		}); 
	}
	
	
	
	

</script>
</head>
<body >
<div class="wrapper">
	
	
	<div class="container-fluid">
	  	<div class="row">
	    	<button class="btn btn-default" id="btnSearch" >조회</button>
			<button class="btn btn-default" id="btnCreate" >생성</button>
			<button class="btn btn-default" id="btnUpdate" >수정</button>
			<button class="btn btn-default" id="btnDelete" >삭제</button>
			
			<button class="btn btn-default" id="btnDialog" >Dialog</button>
	  	</div>
	</div>
	
	<div class="item" id="gridUser"></div>
	<div id="dialog" title="Dialog Title">I'm a dialog</div>
	
	
	<!-- 첨부파일 테스트 -->
	<form action="/bigcenmed2/attach/fileUpload" method="post" enctype="multipart/form-data">
		<input type="file" name="filename">
		<input type="submit" value="업로드">
	</form>
	
	<a href="/bigcenmed2/attach/fileDownload">다운로드</a>

	
</div>
</body>
</html>
