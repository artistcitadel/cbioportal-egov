<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Tab panes -->
<!-- sidebar 버튼 -->
<div id="myRightBtn" class="rightBar pointer" data-toggle="control-sidebar">
	<i id="myRightIconBtn" class="fa fa-sitemap"></i>
</div>

<div>
	<input type="hidden" id="txtFROM_MAIN_YN" value="${FROM_MAIN_YN}">
	<input type="hidden" id="txtLINK_TYPE" value="${LINK_TYPE}">
	<input type="hidden" id="txtMAIN_CONT_SEQ" value="${CONT_SEQ}">
	<input type="hidden" id="txtMAIN_DATA_SEQ" value="${DATA_SEQ}">
	<input type="hidden" id="txtCONT_SEQ" value="">
	<input type="hidden" id="txtDATA_SEQ" value="">
	<input type="hidden" id="txtSHARE_CODE" value="">
</div>
<!-- Create the tabs -->
<ul class="nav nav-tabs nav-justified control-sidebar-tabs font-size-16" id="sideTab">
	<li class="active"> 
		<a href="#" id="itemSelectBtn" style="height:41px;"><!-- href="#itemSelect" data-toggle="tab" -->
			<i class="ion ion-magnet"></i> 항목선택
		</a>
	</li>
	<li>
		<a href="#" id="shareBtn" style="height:41px;"><!-- href="#share" data-toggle="tab"  -->
			<i class="ion ion-android-share-alt"></i> 조건공유
		</a>
	</li>
</ul>
<div class="tab-content text-color-black font-size-14">
	<!-- 항목선택-->
	<div class="tab-pane active" id="itemSelect">
		<div class="row">
			<section class="col-lg-12">
				<div class="padding-5">
					<div class="form-group text-align-center margin-bottom-0">
						<label class="font-weight-100 margin-right-15">
							<input type="radio" name="rdoITEM_SEL_TYPE" value="ALL" class="minimal rdoITEM_SEL_TYPE">
							전체
						</label>
						<label class="font-weight-100 margin-right-15">
							<input type="radio" name="rdoITEM_SEL_TYPE" value="GMEC" class="minimal rdoITEM_SEL_TYPE"  checked>
							중요
						</label>
						<label class="font-weight-100">
							<input type="radio" name="rdoITEM_SEL_TYPE" value="HCC" class="minimal rdoITEM_SEL_TYPE">
							다빈도
		                </label>
		                <div class="input-group input-group-sm">
		                	<form>
								<!-- 크롬 autocomplete 기능 적용안되므로 트릭으로 처리 -->
								<div style="position: absolute;left:-999px;">
									<input type="text" id="tricId" name="tricId" style="display:none;">
								</div>
								<input type="text" class="form-control font-size-14" id="txtSearchVal">
							</form>
							<span class="input-group-btn">
								<button type="button" class="btn btn-success btn-flat font-size-14 padding-top-7 padding-bottom-3" id="btnItemSearch"><i class="fa fa-search" aria-hidden="true"></i></button>
							</span>
						</div>
						<div class="btn-group margin-top-5 width-100p">
							<button type="button" id="itemExpandAll" class="btn btn-default btn-flat btn-sm width-40p font-size-14">Expand All</button>
							<button type="button" id="itemCollapseAll" class="btn btn-default btn-flat btn-sm width-40p font-size-14">Collapse All</button>
							<button type="button" id="itemCollapseAll" class="btn btn-default btn-flat btn-sm width-20p font-size-14"><i class="ion ion-android-refresh"></i></button>
                    	</div>
					</div>
		        </div>
		        
		        <!-- tree -->
		        <div class="panel-body p-0 m-0" id="treeDiv_SEARCH">
					<div id="itemCateTree" class="margin-top-5" ></div>
				</div>
		        
		        <div class="margin-top-5 text-align-center">
		        	<button type="button" class="btn btn-primary btn-flat" id="btnPerDataList" data-toggle="modal" style="width:49.4%;">개인자료업로드</button>
					<button type="button" class="btn btn-danger btn-flat" id="btnDelPerData" style="width:49.4%;">개인자료삭제</button>
				</div>
				
	        </section>
        </div>
	</div>
	<div class="tab-pane" id="share">
		<div class="row">
			<section class="col-lg-12">
				
		        <!-- tree -->
		        <div class="panel-body p-0 m-0" id="treeDiv_SHARE">
					<!-- <div id="itemContTree" class="margin-top-5" style="visibility: hidden;overflow:hidden;"></div> -->
					<div id="itemContTree" class="margin-top-5" ></div>
				</div>
		        
		        <!-- ./tree -->
		        
		        <div class="margin-top-5">
			        <button type="button" id="btnDeleteSc" class="btn btn-block btn-danger btn-flat">삭제</button>
			        
				</div>
				
				<div class="margin-top-5 text-align-center">
			        <button type="button" id="btnShareAllSave" class="btn btn-primary btn-flat" style="width:32%;">전체공유</button>
			        <button type="button" id="btnShareDeptSave" class="btn btn-primary btn-flat" style="width:32%;">과공유</button>
			        <button type="button" id="btnSharePersonalSave" class="btn btn-primary btn-flat" style="width:32%;">개인공유</button>
				</div>
	        </section>
        </div>
	</div>
	<!-- /.tab-pane -->
</div>


<script src="<c:url value="/js/page/research/researchSideBar.js" />"></script>




