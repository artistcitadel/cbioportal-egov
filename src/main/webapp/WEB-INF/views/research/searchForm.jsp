<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>


<script type="text/javascript">
	$(document).ready(function(){
		$('#btnSearchForm').on('click', function(){
			if(isNull($('#txtDATA_SEQ').val())){
				showAlert(null,'공유조건 > 개인 + 데이터 조건에서 데이터를 불러온 후 시도해 주세요.',null);
				return;
				
			}
			
			if(isNull($('#txtSEARCH_FORM_VAL').val())){
				showAlert(null,'검색어를 입력시기 바랍니다.',null);
				return;
				
			}
			
			var frm = document.form_search;
			var url = gvCONTEXT + "/search/searchFormPopup";
			var popupOption = 'directories=no, toolbar=no, location=no, menubar=no, status=no, scrollbars=yes, resizable=yes, width=1100, height=900';
			var w = 1100;
			var h = 900;
			var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
			
		    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		
		    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		    var top = ((height / 2) - (h / 2)) + dualScreenTop;
		
		    popupOption += ',left='+left+', top='+top+'';
		    
			window.open('','searchForm',popupOption);
			
			frm.action = url;
			frm.target = 'searchForm';
			frm.SEARCH_VAL.value = $('#txtSEARCH_FORM_VAL').val();
			frm.submit();
		});
	});


</script>


<div class="pull-right form-group margin-bottom-5">
	<input type="text" class="form-control" placeholder="서식지 검색" style="width:75%;margin-right:8px;display:inline-block;" id="txtSEARCH_FORM_VAL" >
	<button class="btn btn-sm btn-primary" id="btnSearchForm">
		<i class="fa fa-search"></i>
	</button>
</div>
<button class="btn btn-sm btn-primary btnSearchModal" style="display:none;">
	서식지modal
</button>

<button class="btn btn-sm btn-primary btnTest" style="display:none;">
	연구항목대상
</button>
