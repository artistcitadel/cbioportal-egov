/**
 * dataDownload
 * @Page : dataDownloadMain.jsp
 */
var vDATA_SEQ;
var vCONT_SEQ;
var vTABLE_ID;

var gvResult = {
		"dsMySaveList": [],
		"dsRequestList": []
	};

//그리드번호 : column resize를 위해 번호를 담음 
var gridNum = 0;

/**
 * Application Ready
 */
$(document).ready(function(){
	//메뉴고정
	menuFix('research_dataDownload_dataDownloadMain');
	
	init_chartReview();
});


//------------------------------------------------------------------------------------------
// CALLBACK	
//------------------------------------------------------------------------------------------
/**
 * callback 함수
 * @param svcId
 * @param result
 * @returns
 */

function serviceCallback_dataDownload(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getItemContDetlList":
			console.log(result);
			
			drawStudyItemSavedResultApprove(result);
			
			break;
			
		case "dataDownload":
			console.log(result);
			
			break;
			
		case "getMySaveData":
			console.log(result);
			
			$('#gridMySaveList').dataTable().fnClearTable();
			
			if(result.dsMySaveList.length > 0){
				$('#gridMySaveList').dataTable().fnAddData(result.dsMySaveList);
			}
			
			gvResult['dsMySaveList'] = result.dsMySaveList;
			
			paramOnLoad(getQuerystring("DATA_SEQ"));
			
			break;
			
		default:
			break;
	}
}


//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init_chartReview()
{
	setGridMySave();
	getMySaveData();
	
	initEvent_chartReview();
}


//개인조건+데이터
function setGridMySave(){
	var gridMySaveList = $('#gridMySaveList').DataTable( {
		data: gvResult.dsMySaveList,
		paging:false,
		info:false,
		searching:true,
		pagingType: "full_numbers",
		deferLoading: 57,
		scrollX: '100%',
		scrollY: '200px',
        scrollCollapse: true,
        aaSorting : [[3,'DESC']],
        //dom: '<"top"i>flrt<"bottom"p><"clear">',
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
		columns: [
			{ 
				data:"METH_CD",
				render:function(data,type,row,meta){
					var html = gvStudyCode[data];
										 
					return html;
				}
			},
			{ 
				data:"CONDT_NM"
			},
			{ 
				data:"DATA_NM"
			},
			{ 
				data:"RSCH_DT"
			},
			{ 
				data:"APRV_PER_NAME"
			},
			{ 
				data:"APRV_DT"
			}
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [0,1,2,3,4,5] 
		    },
		    { width: 50, targets: [0,3,4,5] },
		    { width: 80, targets: [1,2] }
		]
	});
	
	//검색 박스 생성
	$('.gridMySaveListInput').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control mySaveInput" style="width:100%;" placeholder="'+title+'" />' );
    } );
	
	//검색 이벤트 추가
	$('.mySaveInput').on( 'keyup change', function () {
    	console.log($('.mySaveInput').index(this));
    	gridMySaveList.columns($('.mySaveInput').index(this)).search( this.value ).draw();
    } );
	
	$('#gridMySaveList').on('click', 'tr', function(event) {
		if(event.target.localName == "td" || event.target.localName == "tr"){
			gridNum = 0;
			var DATA_SEQ = $('#gridMySaveList').DataTable().row(this).data().DATA_SEQ;
			var CONT_SEQ = $('#gridMySaveList').DataTable().row(this).data().CONT_SEQ;
			var TABLE_ID = $('#gridMySaveList').DataTable().row(this).data().TABLE_ID;
			
			vDATA_SEQ = DATA_SEQ;
			vCONT_SEQ = CONT_SEQ;
			vTABLE_ID = TABLE_ID;
			
			var dataSet = {
					SEARCH_DATA_ID : DATA_SEQ,
					SEARCH_ITEM_CONT_SEQ : CONT_SEQ,
					TABLE_ID : TABLE_ID
			};
			getItemContDetlListApprove(dataSet);
			
			
			datatablesSelected(this, 'info');
			
			//조회조건 검색을 위해 필요한 파라미터 세팅
			$('#btnSearchView').removeClass('display-none');
			var METH_CD = $('#gridMySaveList').DataTable().row(this).data().METH_CD;
			var CONT_SEQ = $('#gridMySaveList').DataTable().row(this).data().CONT_SEQ;
			var SAVE_CD = $('#gridMySaveList').DataTable().row(this).data().SAVE_CD;
			var mainUrl;
			
			if(METH_CD == "CS"){			//단면연구
				mainUrl = "/research/crossSectionalStudy/crssecMain";
			}else if(METH_CD == "CH"){		//코호트연구
				mainUrl = "/research/cohort/cohortMain";
			}else if(METH_CD == "CC"){		//사례대조
				mainUrl = "/research/casctrl/casctrlMain";
			}	
			
			//선택된 meth_cd 종류
			gvMethCd = $('#gridMySaveList').DataTable().row(this).data().METH_CD;
			
			$('#btnSearchView').attr('SEQ', findMenuSeq(mainUrl));
			$('#btnSearchView').attr('UPPER_SEQ', findMenuUpperSeq(mainUrl));
			$('#btnSearchView').attr('LINK_TYPE', SAVE_CD);
			$('#btnSearchView').attr('CONT_SEQ', CONT_SEQ);
			$('#btnSearchView').attr('mainUrl', mainUrl);
		}
	});
	
	
	//PER_CODE = $.session.get('PER_CODE')
	//callServiceDataTablesWithJson('gridMySaveList', tableOption, tableColumns, tableColumnDef, '/research/dataDownload/getMyApplyList',jsonData);
	
	
}

//개인조건+데이터 loading
function getMySaveData(){
	var dataSet = {};
	dataSet.PER_CODE = $.session.get('PER_CODE');
	dataSet.SITE_CODE = gvSITE_CODE;
	callService("getMySaveData", "/research/dataDownload/getMyApplyList", dataSet, "serviceCallback_dataDownload");
};

//연구항목 데이터 가져오기
function getItemContDetlListApprove(dataSet)
{
	callService("getItemContDetlList"
			,"research/dataDownload/getItemContDetlList"
			,dataSet
			,"serviceCallback_dataDownload");
	
}



function drawStudyItemSavedResultApprove(result)
{
//	저장데이터 	
	var $tabResult   = $('#tabResult');
	var $jqxGridResultWrap = $('#jqxGridResultWrap');
	
	var dsColumnList = [];			//jqxgrid 설정용
	var dsDataFieldList = [];		//jqxgrid 설정용
	
	var dsWrapColumnList = [];		
	var dsWrapDataFieldList = [];
	
//	메타설정	
	 for(var j=0; j < result.dsDataResultList.length; j++){
	    	dsDataFieldList = [];
			dsColumnList = [];	
			for(var i=0; i < result.dsMetaDataList.length; i++){
				var dsMetaData = result.dsMetaDataList[i];
		
				var dsField = {};
				var dsColumn = {};
				
				dsField.name=dsMetaData.COLUMN_ID;
				
				dsColumn.datafield = dsMetaData.COLUMN_ID;
				dsColumn.text = dsMetaData.COLUMN_COMMENT;
				
				dsColumn.width = 100 / result.dsMetaDataList.length + "%";
				
				
				if( dsMetaData.COLUMN_ID === 'CRT_DT'){
					dsField.type='date';
					dsColumn.cellsalign='center';
					dsColumn.cellsformat='yyyy-MM-dd';
					dsColumn.width=100;
				}
				
				if( dsMetaData.ITEM_TYPE === 'DAT'){
					dsField.type='date';
					dsColumn.width=100;
					if(dsMetaData.dataField == 'BASE_DT'){
						dsColumn.cellsrenderer=cellsrenderer;
						
					}else{
						dsField.type = 'date';
						
						if(!isNull(dsMetaData.DATA_TYPE)){
			               if(dsMetaData.DATA_TYPE.indexOf('timestamp') >= 0){
			                  dsColumn.cellsformat='yyyy-MM-dd';
			               }else{
			                  dsColumn.cellsformat='yyyy-MM-dd';
			               }
			            }else{
			               dsColumn.cellsformat='yyyy-MM-dd';
			            }
					}
				}
				
				if( dsMetaData.COLUMN_ID === 'DEL_YN'){
					dsColumn.hidden = true;
					
				}
				
				if( dsMetaData.COLUMN_ID === 'CHART_YN'){
					dsColumn.hidden = true;
					
				}
				
				if( dsMetaData.COLUMN_ID === 'CHART_DT'){
					dsColumn.hidden = true;
				}
				
				if(isNull(dsMetaData.HIDDEN_YN)){
	    			dsColumn.hidden = false;
				}else{
	    			var strHiddenYn = dsMetaData.HIDDEN_YN;
	    			var arrHiddenYn = strHiddenYn.split(',');
	    			
	    			if(arrHiddenYn[j] === 'Y'){
	    				dsColumn.hidden = true;
	    			}else{
	    				dsColumn.hidden = false;
	    			}
	    		}
				
				dsDataFieldList.push(dsField);
				dsColumnList.push(dsColumn);
				
			}
			dsDataFieldList.push({name:'TABLE_ID'});
			dsColumnList.push({datafield:'TABLE_ID',text:'테이블',hidden:true});
			
			dsWrapColumnList.push(dsColumnList);		
	    	dsWrapDataFieldList.push(dsDataFieldList);
			
	 }
	
	   console.log("dsDta::::::::",dsWrapColumnList);
	   console.log("dsCta::::::::",dsWrapDataFieldList);
	 
	/*//TABLE_ID 추가
	var dsFieldAdd = {};
	var dsColumnAdd = {};
	
	dsFieldAdd.name='TABLE_ID';
	
	dsColumnAdd.datafield = 'TABLE_ID';
	dsColumnAdd.text = 'TABLE_ID';
	dsColumnAdd.hidden = true;
	
	dsDataFieldList.push(dsFieldAdd);
	dsColumnList.push(dsColumnAdd);*/
	
	
	$tabResult.html('');
	$jqxGridResultWrap.html('');
	
	gvItemPeriodList = result.dsDataResultPeriodList;
	
	for(var i=0; i < result.dsDataResultList.length; i++){
		var tabhtml = '';			//tab
		var tabInnerHtml = '';		//tab div
		var $jqxGridHtml = '';		//jqxgrid wrap
		var jqxGridId = '';

		
		jqxGridId = 'jqxGridResult_' + i;
		
		if(i == 0){
			tabhtml = '<li class="active">';	
			
			tabInnerHtml = '<div class="tab-pane active" id="tabResult_' + i + '">';
				tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '<button class="btnExcelDown btn btn-flat btn-success pull-right margin-top-10" PERIOD_CD='+ result.dsDataResultList[i].dsPeriodNm +' >'+result.dsDataResultList[i].dsPeriodNm+'주기 Download</button>';
			tabInnerHtml += '</div>';
		
		
		}else{
			tabhtml = '<li>';
			
			tabInnerHtml = '<div class="tab-pane" id="tabResult_' + i +'">';
				tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '<button class="btnExcelDown btn btn-flat btn-success pull-right margin-top-10" PERIOD_CD='+ result.dsDataResultList[i].dsPeriodNm +' >'+result.dsDataResultList[i].dsPeriodNm+'주기 Download</button>';
			tabInnerHtml += '</div>';
		}
		
		/*		tabhtml += '<a href="#tabResult_' + i + '" data-toggle="tab">'+result.dsDataResultList[i].dsPeriodNm + '주기 ('+result.dsDataResultList[i].dsCount+')' + '</a>';
		tabhtml += '</li>';*/
		
		
		
		if(gvMethCd === 'CS'){
			tabhtml += '<a href="#tabResult_'+ i + '" data-toggle="tab">'+result.dsDataResultList[i].dsPeriodNm + '주기 ('+result.dsDataResultList[i].dsCount+')' + '</a>';
			tabhtml += '</li>';	
		}else if(gvMethCd === 'CH'){
			if(i == 0){
				tabhtml += '<a href="#tabResult_'+ i + '" data-toggle="tab">연구항목('+result.dsDataResultList[i].dsCount+')' + '</a>';
				tabhtml += '</li>';
			}else{
				tabhtml += '<a href="#tabResult_'+ i + '" data-toggle="tab">전체-'+i + ' ('+result.dsDataResultList[i].dsCount+')' + '</a>';
				tabhtml += '</li>';
			}
			
		}else{
			tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			$jqxGridResultWrap.append(tabInnerHtml);
			$('#lblResultInfo_').html('('+result.dsDataResultList[i].dsCount+')');
			
		}
		
		$tabResult.append(tabhtml);
		$jqxGridResultWrap.append(tabInnerHtml);
		
		var dataSource = {
		    datatype: "json",
		    datafields: dsWrapDataFieldList[i],
		    cache: false,
		    localdata: result.dsDataResultList[i].dsList	//데이터
		    
		};
		
		var dataAdapter = new $.jqx.dataAdapter(dataSource, {
			loadError: function(xhr, status, error){
				alert(error);
			}
		});
		
		console.log(jqxGridId);
		
		$('#' + jqxGridId).jqxGrid({
		    source: dataAdapter,
		    theme: 'bootstrap',
		    width: '100%',
		    height: '600',
		    columnsresize: true,
		    columns: dsWrapColumnList[i],
		    selectionmode: 'multiplecellsadvanced',
		    enabletooltips: true,
		    sortable: true,
		    ready: function () {
                
        		setTimeout(function(){ 
        			$('#jqxGridResult_'+gridNum).jqxGrid({ width: '100%' });
	        		$('#jqxGridResult_'+gridNum).jqxGrid('autoresizecolumns', 'column');
        		}, 500);
		    }
		});
		
		
	}
}

/*
function runChart(pat_sbst_no) {
	//뷰어프로그램이 설치되어 있는지 확인 필요
	var flag = "Y";		//Y 설치됨

	if(flag=="Y"){
		console.log(pat_sbst_no);
	}else{
		window.open(gvCONTEXT + "/research/chartReview/chartReviewDownloadPopup?pat_sbst_no="+pat_sbst_no,"viewerDownload","width=500,height=300");
	}
}
*/



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
* 이벤트 초기화
* @returns
*/
function initEvent_chartReview()
{
	
	$(document).on('click', '.btnExcelDown', function(){
		console.log(vDATA_SEQ);
		console.log(vCONT_SEQ);
		console.log(vTABLE_ID);
		console.log($(this).attr('PERIOD_CD'));
		if(gvSITE_CODE=='KUH'){
			$("#modalDataDownload").modal('show');
			$('#btnDataDownload').attr('PERIOD_CD', $(this).attr('PERIOD_CD'));
		}
		else if(gvSITE_CODE=='UUH'){
			location.href=gvCONTEXT + "/research/dataDownload/dataDownload?TABLE_ID="+vTABLE_ID+"&PERIOD_CD="+$(this).attr('PERIOD_CD')+"&DATA_SEQ="+vDATA_SEQ+"&CONT_SEQ="+vCONT_SEQ;
		}
		
	});
	
	$(document).on('click','#btnDataDownload',function(){
		location.href=gvCONTEXT + "/research/dataDownload/dataDownload?TABLE_ID="+vTABLE_ID+"&PERIOD_CD="+$(this).attr('PERIOD_CD')+"&DATA_SEQ="+vDATA_SEQ+"&CONT_SEQ="+vCONT_SEQ;
		$("#modalDataDownload").modal('hide');
	});
	
	$(document).on('click', '#btnAutoColumns', function(){
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid({ width: '100%' });
		$('#jqxGridResult_'+$(this).attr('tabNum')).jqxGrid('autoresizecolumns', 'all');
	});
	
	$(document).on('click', '#tabResult > li > a', function(){
		var numSplit = $(this).attr('href').split('_');
		
		gridNum = numSplit[1];
		
		$('#btnAutoColumns').attr('tabNum', gridNum);
		
	});
	
	//조회조건 확인 modal
	$('#btnSearchView').on('click', function(){
		var mainurl = $(this).attr('mainurl');
		var SEQ = $(this).attr('seq');
		var UPPER_SEQ = $(this).attr('upper_seq');
		var LINK_TYPE = $(this).attr('link_type');
		var CONT_SEQ = $(this).attr('cont_seq');
		
		BootstrapDialog.show({
			title: '조회조건',
			type: BootstrapDialog.TYPE_DEFAULT,
			size: BootstrapDialog.SIZE_WIDE,
            message: $('<div></div>').load(gvCONTEXT + mainurl + '/pop' +'?SEQ='+ SEQ +'&UPPER_SEQ='+ UPPER_SEQ +'&FROM_MAIN_YN=Y&FROM_MAIN_YN=Y&LINK_TYPE='+ LINK_TYPE +'&CONT_SEQ='+ CONT_SEQ +'&DATA_SEQ=')
        });
	});
	
}


