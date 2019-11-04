/**
 * 승인요청
 * @Page : approveMain.jsp
 */
var gvResult = {
		"dsMySaveList": [],
		"dsRequestList": []
	};

//그리드번호 : column resize를 위해 번호를 담음 
var gridNum = 0;

//테이블체크
var dataFlag = true;

/**
 * Application Ready
 */
$(document).ready(function(){
	//메뉴고정
	menuFix('research_approve_approveMain');
	
	init_approve();
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

function serviceCallback_approve(svcId, result){
	if(result.ERR_CD == '-1'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "setPurposeData":
			BootstrapDialog.show({
				message : COM_0022,
				buttons : [
				           {
								label: 'OK',
								action: function(dialogItself){
									//승인요청/조회 grid update
									$('#gridRequestList').dataTable().fnDraw();
					                dialogItself.close();
								}
				           }
				          ]
			});		
			
			//개인조건+데이터 grid update
			//$('#gridMySaveList').dataTable().fnDraw();
			getMySaveData();
			getRequestData();
			
			//승인요청SNS연동 common_utils.js '조건seq', '데이터seq', '조건명', '데이터명', '추출목적', '사용자ID', '사용자명'
			callSNS_USER(result.CONT_SEQ, result.SEQ, result.CONDT_NM, result.DATA_NM, gvPURPOSE_CD[result.PURPOSE_CD], $.session.get('PER_CODE'), $.session.get('PER_NAME'));
			
			break;
			
		case "getItemContDetlList":
			console.log(result);
			drawStudyItemSavedResultApprove(result);
			
			break;
		
		case "getMySaveData":
			console.log(result);
			$('#gridMySaveList').dataTable().fnClearTable();
			
			if(result.dsMySaveList.length > 0){
				$('#gridMySaveList').dataTable().fnAddData(result.dsMySaveList);
			}
			
			gvResult['dsMySaveList'] = result.dsMySaveList;
			
			break;
			
		case "getRequestData":
			console.log(result);
			$('#gridRequestList').dataTable().fnClearTable();
			
			if(result.dsRequestList.length > 0){
				$('#gridRequestList').dataTable().fnAddData(result.dsRequestList);
			}
			
			gvResult['dsRequestList'] = result.dsRequestList;
			
			paramOnLoad(getQuerystring("DATA_SEQ"));
			
			break;
			
		case "delApproveData":
			console.log(result);
			showAlert('데이터삭제',COM_0003,null);
			
			getMySaveData();
			getRequestData();
			
			break;
			
		case "checkTable":
			console.log(result);
			if(result.ERR_CD == '-2'){
				showAlert('승인요청','해당 테이블이 존재하지 않습니다.<br/>해당 기록을 삭제하시기 바랍니다.',null);
				dataFlag = false;
			}else{
				dataFlag = true;
			}
			
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
function init_approve()
{
	//개인조건+데이터
	//그리드세팅
	setGridMySave();
	//데이터로딩
	getMySaveData();
	
	initEvent_approve();

	//승인요청/조회
	setGridRequest();
	getRequestData();
	
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
				data:"UDT_DT"
			},
			{ 
				data:"SEQ", 		
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<select id="extract'+ row['SEQ'] +'">'; 
					if(gvSITE_CODE == 'UUH'){
						$.each(gvPURPOSE_CD_UUH,function(key,value) {
							html = html + "<option value='" + key + "'>" + value + "</option>";
						});
					}else{
						$.each(gvPURPOSE_CD_KUH,function(key,value) {
							html = html + "<option value='" + key + "'>" + value + "</option>";
						});
					}
					html = html + '</select>';
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"SEQ",
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<button class="btn btn-flat btn-default btn-sm btnPurpose" seq="'+ row['SEQ'] +'" DATA_NM="'+ row['DATA_NM'] +'" CONT_SEQ="'+ row['CONT_SEQ'] +'" CONDT_NM="'+ row['CONDT_NM'] +'">승인요청</button>';
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"SEQ",
				render:function(data,type,row,meta){
					var html = '';
					console.log(row);
					
					html = '<button class="btn btn-flat btn-danger btn-sm btnDataDel" seq="'+ row['SEQ'] +'" TABLE_ID="'+ row['TABLE_ID'] +'" DATA_NM="'+ row['DATA_NM'] +'" CONT_SEQ="'+ row['CONT_SEQ'] +'" ><i class="fa fa-trash" aria-hidden="true"></i></button>';
										 
					return html;
				},
				orderable:false
			}
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5,6] 
		    },
		    { width: 50, targets: [0,3,4,5] },
		    { width: 10, targets: [6] },
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
			var SEQ = $('#gridMySaveList').DataTable().row(this).data().SEQ;
			var CONT_SEQ = $('#gridMySaveList').DataTable().row(this).data().CONT_SEQ;
			var TABLE_ID = $('#gridMySaveList').DataTable().row(this).data().TABLE_ID;
			var dataSet = {
					SEARCH_DATA_ID : SEQ,
					SEARCH_ITEM_CONT_SEQ : CONT_SEQ,
					TABLE_ID : TABLE_ID
			};
			
			callServiceSync("checkTable" ,"research/approve/checkTable" ,dataSet ,"serviceCallback_approve");
			
			if(dataFlag == true){
				getItemContDetlListApprove(dataSet);
				
				datatablesSelected(this, 'info');
				
				//조회조건 검색을 위해 필요한 파라미터 세팅
				$('#btnSearchView').removeClass('display-none');
				var METH_CD = $('#gridMySaveList').DataTable().row(this).data().METH_CD;
				var CONT_SEQ = $('#gridMySaveList').DataTable().row(this).data().CONT_SEQ;
				var SAVE_CD = $('#gridMySaveList').DataTable().row(this).data().SAVE_CD;
				var mainUrl;
				
				//선택된 meth_cd 종류
				gvMethCd = $('#gridMySaveList').DataTable().row(this).data().METH_CD;
				
				if(METH_CD == "CS"){			//단면연구
					mainUrl = "/research/crossSectionalStudy/crssecMain";
				}else if(METH_CD == "CH"){		//코호트연구
					mainUrl = "/research/cohort/cohortMain";
				}else if(METH_CD == "CC"){		//사례대조
					mainUrl = "/research/casctrl/casctrlMain";
				}	
				$('#btnSearchView').attr('SEQ', findMenuSeq(mainUrl));
				$('#btnSearchView').attr('UPPER_SEQ', findMenuUpperSeq(mainUrl));
				$('#btnSearchView').attr('LINK_TYPE', SAVE_CD);
				$('#btnSearchView').attr('CONT_SEQ', CONT_SEQ);
				$('#btnSearchView').attr('mainUrl', mainUrl);
			}
		}
	});
	

}

//테이블 체크
/*function checkTable(dataSet){
	callServiceSync("checkTable"
			,"research/approve/checkTable"
			,dataSet
			,"serviceCallback_approve");
}*/

//개인조건+데이터 loading
function getMySaveData(){
	var dataSet = {};
	dataSet.PER_CODE = $.session.get('PER_CODE');
	
	callService("getMySaveData", "/research/approve/getMySaveList", dataSet, "serviceCallback_approve");
};

//연구항목 데이터 가져오기
function getItemContDetlListApprove(dataSet)
{
	callService("getItemContDetlList"
			,"research/approve/getItemContDetlList"
			,dataSet
			,"serviceCallback_approve");
	
}

//승인요청/조회
function setGridRequest(){
	
	var gridRequestList = $('#gridRequestList').DataTable( {
		data: gvResult.dsRequest,
		paging:false,
		info:false,
		searching:true,
		pagingType: "full_numbers",
		deferLoading: 57,
		scrollX: '100%',
		scrollY: '200px',
        scrollCollapse: true,
        aaSorting : [[3,'DESC']],
		fnRowCallback: function( row, data, index ) {
			if ( data.APRV_YN == "Y" ){
				$( row ).addClass( "label-primary" );
			}else if ( data.APRV_YN == "N" ){
				$( row ).addClass( "label-danger" );
			}
		},
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
				data:"RSCH_DT",
				type: "date",
				dateFormat: "yy-mm-dd"
			},
			{ 
				data:"APRV_PER_NAME",
				defaultContent:""
			},
			{ 
				data:"APRV_YN",
				defaultContent:""
			},
			{ 
				data:"APRV_DT",
				defaultContent:"",
				"type": "date",
				"dateFormat": "yy-mm-dd",
				render:function(data,type,row,meta){
					var html = '';
					
					if(data == "0000-00-00 00:00"){
						html = '';
					}else{
						html = data;
					}
										 
					return html;
				}
			},
			{ 
				data:"SEQ",
				render:function(data,type,row,meta){
					var html = '';
					html = '<button class="btn btn-flat btn-danger btn-sm btnDataDel" seq="'+ row['DATA_SEQ'] +'" TABLE_ID="'+ row['TABLE_ID'] +'" DATA_NM="'+ row['DATA_NM'] +'" CONT_SEQ="'+ row['CONT_SEQ'] +'" ><i class="fa fa-trash" aria-hidden="true"></i></button>';
										 
					return html;
				},
				orderable:false
			}
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5,6,7] 
		    },
		    { width: 50, targets: [0,3,4,5,6,7] },
		    { width: 10, targets: [7] },
		    { width: 200, targets: [1,2] }
		]
	});

	//검색 박스 생성
	$('.gridRequestListInput').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control requestInput" style="width:100%;" placeholder="'+title+'" />' );
    } );
	
	//검색 이벤트 추가
	$('.requestInput').on( 'keyup change', function () {
    	console.log($('.requestInput').index(this));
    	gridRequestList.columns($('.requestInput').index(this)).search( this.value ).draw();
    } );
	
	//row 클릭 이벤트 추가
	$('#gridRequestList').on('click', 'tr', function(event) {
		var requestTable = $('#gridRequestList').DataTable().row(this).data();
		console.log(event.target.localName);
		
		if(event.target.localName == "td" || event.target.localName == "tr"){
			if(requestTable.APRV_YN == "N"){
				//BootstrapDialog.alert(COM_0024 +"<br/><br/>" + requestTable.REJT_REASON);
				BootstrapDialog.show({
					message : COM_0024 +"<br/><br/>" + requestTable.REJT_REASON,
					buttons : [
					           {
									label: 'OK',
									action: function(dialogItself){
						                dialogItself.close();
						                setTimeout(function(){ 
						        			$('#jqxGridResult_0').jqxGrid({ width: '100%' });
							        		$('#jqxGridResult_0').jqxGrid('autoresizecolumns', 'column');
						        		}, 500);
									}
					           }
					          ]
				});
			}else if(requestTable.APRV_YN == null || requestTable.APRV_YN == ""){
				//BootstrapDialog.alert(COM_0025);
				BootstrapDialog.show({
					message : COM_0025,
					buttons : [
					           {
									label: 'OK',
									action: function(dialogItself){
						                dialogItself.close();
						                setTimeout(function(){ 
						        			$('#jqxGridResult_0').jqxGrid({ width: '100%' });
							        		$('#jqxGridResult_0').jqxGrid('autoresizecolumns', 'column');
						        		}, 500);
									}
					           }
					          ]
				});
			}
			gridNum = 0;
			var SEQ = requestTable.DATA_SEQ;
			var CONT_SEQ = requestTable.CONT_SEQ;
			var TABLE_ID = requestTable.TABLE_ID;
			var dataSet = {
					SEARCH_DATA_ID : SEQ,
					SEARCH_ITEM_CONT_SEQ : CONT_SEQ,
					TABLE_ID : TABLE_ID
			};
			
			callServiceSync("checkTable" ,"research/approve/checkTable" ,dataSet ,"serviceCallback_approve");
			
			if(dataFlag == true){
				getItemContDetlListApprove(dataSet);
				
				datatablesSelected(this, 'info');
				
				//조회조건 검색을 위해 필요한 파라미터 세팅
				$('#btnSearchView').removeClass('display-none');
				var METH_CD = $('#gridRequestList').DataTable().row(this).data().METH_CD;
				var CONT_SEQ = $('#gridRequestList').DataTable().row(this).data().CONT_SEQ;
				var SAVE_CD = $('#gridRequestList').DataTable().row(this).data().SAVE_CD;
				var mainUrl;
				
				if(METH_CD == "CS"){			//단면연구
					mainUrl = "/research/crossSectionalStudy/crssecMain";
				}else if(METH_CD == "CH"){		//코호트연구
					mainUrl = "/research/cohort/cohortMain";
				}else if(METH_CD == "CC"){		//사례대조
					mainUrl = "/research/casctrl/casctrlMain";
				}	
				
				//선택된 meth_cd 종류
				gvMethCd = $('#gridRequestList').DataTable().row(this).data().METH_CD;
				
				$('#btnSearchView').attr('SEQ', findMenuSeq(mainUrl));
				$('#btnSearchView').attr('UPPER_SEQ', findMenuUpperSeq(mainUrl));
				$('#btnSearchView').attr('LINK_TYPE', SAVE_CD);
				$('#btnSearchView').attr('CONT_SEQ', CONT_SEQ);
				$('#btnSearchView').attr('mainUrl', mainUrl);
			}
		}
	});
	
	
}

//승인요청/조회 데이터 로딩
function getRequestData(){
	var dataSet = {};
	dataSet.PER_CODE = $.session.get('PER_CODE');
	
	callService("getRequestData", "/research/approve/getRequestList", dataSet, "serviceCallback_approve");
};

function drawStudyItemSavedResultApprove(result)
{
	//그리드번호 초기화
	gridNum = 0;
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
				
				if( dsMetaData.COLUMN_ID === 'CHART_YN' || dsMetaData.COLUMN_ID === 'CHART_DT' || dsMetaData.COLUMN_ID === 'DEL_YN'){
					dsColumn.hidden = true;
				}
				
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
	
	$tabResult.html('');
	$jqxGridResultWrap.html('');
	
    console.log("dsDta::::::::",dsWrapColumnList);
    console.log("dsCta::::::::",dsWrapDataFieldList);
    
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
			tabInnerHtml += '</div>';
		
		
		}else{
			tabhtml = '<li>';
			
			tabInnerHtml = '<div class="tab-pane" id="tabResult_' + i +'">';
				tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
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
		
		$('#' + jqxGridId).jqxGrid({
		    source: dataAdapter,
		    theme: 'bootstrap',
		    width: '100%',
		    height: '500',
		    columnsresize: true,
			sortable: true,
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



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
* 이벤트 초기화
* @returns
*/
function initEvent_approve()
{
	$(document).on('click', '.btnPurpose', function(){
    	var seq = $(this).attr('seq');
    	var cont_seq = $(this).attr('cont_seq');
    	var purpose_cd = $('#extract'+$(this).attr('seq')+' option:selected').val();
    	var data_nm = $(this).attr('data_nm');
    	var condt_nm = $(this).attr('condt_nm');
    	var aprv_yn;
    	var aprv_per_code;
    	data_nm = data_nm.bold();
    	
    	var boldsize_first = "의료정보팀 담당자";
    	var boldsize_second = "내선번호 8493";
    	
    	boldsize_first = boldsize_first.fontsize(4).bold();
    	boldsize_second = boldsize_second.fontsize(4).bold();
		//COM_0021

    	var ConfirmMSG;
    	if(gvSITE_CODE == 'UUH'){
    		ConfirmMSG = '['+ data_nm +']\n' + '선택하신 연구자료를 승인요청합니다.\n 승인은 오전 또는 오후 한차례 '+boldsize_first+'가 확인합니다. \n 특별한 회신없이 승인이 지연되는 경우 의료정보팀 담당자 '+boldsize_second+'으로 전화를 주시기 바랍니다.';	
    	}
    	else if(gvSITE_CODE == 'KUH'){
    		ConfirmMSG = '['+ data_nm +']\n' +COM_0021;
    		aprv_yn = "Y";
    		aprv_per_code = "0000000";
    	}
    	else{
    		ConfirmMSG = '['+ data_nm +']\n' +COM_0021;
    	}
		showConfirm('승인요청',ConfirmMSG, function(result){
			if(!result){
				return;
			}
			var dataSet = {
    				SEQ			: seq,
        			PER_CODE	: $.session.get('PER_CODE'),
        			CONT_SEQ	: cont_seq,
        			PURPOSE_CD	: purpose_cd,
        			DATA_NM		: data_nm,
        			CONDT_NM	: condt_nm,
        			APRV_YN		: aprv_yn,
        			APRV_PER_CODE: aprv_per_code
    		};
    		
    		callService("setPurposeData", "/research/approve/setPurposeData", dataSet, "serviceCallback_approve");
		});
	});
	
	//데이터 삭제
	$(document).on('click', '.btnDataDel', function(){
    	var seq = $(this).attr('seq');
    	var cont_seq = $(this).attr('cont_seq');
    	var table_id = $(this).attr('table_id');
    	var data_nm = $(this).attr('data_nm');
		
		showConfirm('데이터삭제','['+ data_nm +']' + COM_0047, function(result){
			if(!result){
				return;
			}
			var dataSet = {
    				SEQ			: seq,
        			PER_CODE	: $.session.get('PER_CODE'),
        			CONT_SEQ	: cont_seq,
        			TABLE_ID	: table_id
    		};
    		console.log(dataSet);
    		
    		callService("delApproveData", "/research/approve/delApproveData", dataSet, "serviceCallback_approve");
		});
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


