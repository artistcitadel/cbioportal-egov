<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<script type="text/javascript">
	function initSearchModal(){
		var dataSet = {};
		var dsPatSbstNoList = [];
		
		dsPatSbstNoList.push($('#txtPatSbstNo').val());
		
		dataSet.SEARCH_VAL 				= $('#txtSEARCH_FORM_VAL').val();
		dataSet.SEARCH_PAT_SBST_NO_LIST = dsPatSbstNoList;
		
		callService("searchRequestByPatSbstNo"
					,"search/searchRequestByPatSbstNo"
					,dataSet
					,"serviceCallback_searchModal");
	}
	
	function serviceCallback_searchModal(svcId, result){
		if(result.ERR_CD != '0'){
			return;
		}
		
		
		switch(svcId){
			case "searchRequestByPatSbstNo":
				var html = '';
				
				for(var i=0; i < result.RESULT_LIST.length; i++){
					var dsResult = result.RESULT_LIST[i];
					
					html += '<div class="margin-bottom-40 word-break-break-all">';
						html += '<div class="text-bold">';
							html += (i+1)+".&nbsp;";
							html += '<span class="font-color-primary">'+dsResult.FRM_NM+'&nbsp;&nbsp;&nbsp;</span>';
							html += dsResult.REC_DATE + '&nbsp;&nbsp;&nbsp;';
							html += dsResult.FRM_DISP_USER_INFO;
						
						html += '</div>';
						
						html += '<div>';
							html += dsResult.HIGHLIGHT;
						html += '</div>';
					
					html += '</div>'
					
				}
				
				$('#formList').html(html);
				
				break;
				
			default:
				break;
		}
		
	}
	
	function renderRow(){
		
	}


</script>

<!-- 서식지검색 modal -->
<div class="modal fade bs-example-modal-lg" id="popSearchModal" tabindex="-1" role="dialog" aria-labelledby="popSearchModalLabel">
	<input type="hidden" id="txtPatSbstNo">
	<div class="modal-dialog modal-lg" style="height:800px;" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="popSearchModalLabel">비정형 기록지 검색 SUMMARY</h4>
			</div>
			<div class="modal-body skin-black">
				<div class="row">
					<div class="col-lg-12">
		                <div class="box">
							<div class="box-body padding-20-30" id="formList" style="margin:auto;width:100%;overflow-x:hidden;overflow-y:scroll;height:600px; ">
								<!-- <div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div>
								<div class="margin-bottom-40 word-break-break-all">
									<div class="text-bold">
										1. <span class="font-color-primary">수술기록 > 수술기록지 OCS DM : 비뇨기종양클리닉</span> 2015/05/25 작성자:전재영(비뇨기과)
									</div>
									<div>
										aaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaaaaaaaaaaaaaaaaa<span class="font-color-red background-color-yellow">aaaaaa</span>aaaaaaaabb
									</div>
								</div> -->
							</div>
						</div>
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>
