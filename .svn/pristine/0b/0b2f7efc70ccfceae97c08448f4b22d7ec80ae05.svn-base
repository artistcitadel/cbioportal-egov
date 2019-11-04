/**
 * 차트리뷰
 * @Page : chartReviewMain.jsp
 */
var metaDataList = {
        'TABLE_DATA' : [],
        'TABLE_ID' : ''
};

var gvResult = {
		"dsMySaveList": [],
		"dsRequestList": []
	};

//그리드번호 : column resize를 위해 번호를 담음 
var gridNum = 0;

//삭제여부 버튼과 column 수정 겹치는 이벤트 막음
var btnFlag = false;

/**
 * Application Ready
 */
$(document).ready(function(){
	//메뉴고정
	menuFix('research_chartReview_chartReviewMain');
	
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

function serviceCallback_chartReview(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getItemContDetlList":
			console.log(result);
			//DATA_SEQ저장 입력항목추가 & 입력항목 삭제 용
			$('#DATA_SEQ').val(result.dsMetaDataList[0].DATA_SEQ);
			
			drawStudyItemSavedResultApprove(result);
			
			break;
			
		case "setDataDel":
			
			break;
			
		case "setColumnAdd":
			console.log(result);
			
			$('#modalColumnAdd').modal('hide');

			$('#gridMySaveList > tbody > .info').find('.dt-body-center').trigger('click');
			
			break;
			
		case "setColumnDel":
			console.log(result);
			
			$('#modalColumnDel').modal('hide');

			$('#gridMySaveList > tbody > .info').find('.dt-body-center').trigger('click');
			
			break;
			
		case "setDataVal":
			
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
			
		case "getPatId":
			console.log(result);
			var pat_id = result.dsPatId[0].PAT_ID;
			var PER_CODE = $.session.get('PER_CODE');
			var PER_PASS = $.session.get('PER_PASS');
			
			var url = "uICECall: -V EMR -A "+pat_id+" -U "+PER_CODE+"|"+PER_PASS;
			//var url = "uICECall: -V EMR -A " + pat_id + " -U 9999999|1004";
			var win = window.open(url);

			setTimeout(function() {
				win.close();
			}, 5000);
			
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
				data:"UDT_DT"
			}
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [0,1,2,3] 
		    },
		    { width: 10, targets: [0,3] },
		    { width: 50, targets: [1,2] }
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
	});
	
	
}

//개인조건+데이터 loading
function getMySaveData(){
	var dataSet = {};
	dataSet.PER_CODE = $.session.get('PER_CODE');
	
	callService("getMySaveData", "/research/chartReview/getMySaveList", dataSet, "serviceCallback_chartReview");
};

//연구항목 데이터 가져오기
function getItemContDetlListApprove(dataSet)
{
	callService("getItemContDetlList"
			,"research/chartReview/getItemContDetlList"
			,dataSet
			,"serviceCallback_chartReview");
	
}



function drawStudyItemSavedResultApprove(result)
{
	console.log(result);
//	저장데이터 	
	var $tabResult   = $('#tabResult');
	var $jqxGridResultWrap = $('#jqxGridResultWrap');
	
	var dsColumnList = [];			//jqxgrid 설정용
	var dsDataFieldList = [];		//jqxgrid 설정용
	
	var cellclass = function (row, columnfield, value) {
        var id = $("#jqxGridResultWrap .active > div").attr("id");
        var dataRecord = $("#" + id).jqxGrid('getrowdata', row);
		var del_yn = dataRecord.DEL_YN;
		if (del_yn == "Y") {
			return 'label-warning';
		}
    };
    
    metaDataList['TABLE_DATA'] = [];
    metaDataList.TABLE_ID = "";
    
    //TABLE_ID 따로 저장 for 입력항목삭제 modal
	metaDataList.TABLE_ID = result.dsDataResultList[0].dsList[0].TABLE_ID;
	
	//추가된 항목 만 edit가능
	var isEditable = function (row) {
        return false;
	}
	
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
				dsColumn.cellclassname = cellclass;
				
				//추가된 항목 만 따로 저장 for 입력항목삭제 modal
				if( dsMetaData.ADD_ITEM_YN == 'Y'){
					metaDataList['TABLE_DATA'].push(dsMetaData);
					
					if( dsMetaData.ITEM_TYPE == 'NUM'){
						dsColumn.columntype='numberinput';
					}
				}else{
					dsColumn.cellbeginedit=isEditable;
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
				
				if( dsMetaData.COLUMN_ID === 'DEL_YN'){
					dsColumn.width=100;
					dsColumn.cellsrenderer = function (row, column, value) {
						var html = '';
						var valText = '';
						var btnClass = '';
						
						if(value == "Y"){
							valText = "취소";
							btnClass = "btn-warning";
						}else{
							valText = "제외";
							btnClass = "btn-danger";
						}
						
						html = '<div class="row"> ';
							html += '<div class="col-md-12" style="text-align:center;">';
								html += '<div class="form-group">';
									html += '<button ';
									html += 'type="button" ';
									html += 'class="btnDel btn btn-xs btn-flat btn-labeled '+ btnClass +'" ';
									html += 'style="width:80%;margin-top:3px;" ';
									html += 'row='+ row +'> ';
									html += '</span>'+ valText;
									html += '</button>';
								html += '</div> ';
							html += '</div> ';
						html += '</div> ';
						
		                return html;
		            }
					
				}
				
				if( dsMetaData.COLUMN_ID === 'CHART_YN'){
					dsColumn.width=100;
					dsColumn.cellsrenderer = function (row, column, value) {
						var html = '';
						
						html = '<div class="row"> ';
							html += '<div class="col-md-12" style="text-align:center;">';
								html += '<div class="form-group">';
									html += '<button ';
									html += 'type="button" ';
									html += 'class="btnChart btn btn-xs btn-flat btn-labeled btn-success" ';
									html += 'style="width:80%;margin-top:3px;"> ';
									html += '</span>차트리뷰';
									html += '</button>';
								html += '</div> ';
							html += '</div> ';
						html += '</div> ';
						
		                return html;
		            }
					
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
				
				
				dsColumn.width = 100 / result.dsMetaDataList.length + "%";
				
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
/*	
	//TABLE_ID 추가
	var dsFieldAdd = {};
	var dsColumnAdd = {};
	
	dsFieldAdd.name='TABLE_ID';
	
	dsColumnAdd.datafield = 'TABLE_ID';
	dsColumnAdd.text = 'TABLE_ID';
	dsColumnAdd.hidden = true;
	
	dsDataFieldList.push(dsFieldAdd);
	dsColumnList.push(dsColumnAdd);
	*/
	
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
		    localdata: result.dsDataResultList[i].dsList,	//데이터
		    updaterow: function (rowid, newdata, commit) {
		    	var dataSet = {};
	    		
		    	if(btnFlag == true){
		    		dataSet.TABLE_ID	= newdata.TABLE_ID;
		    		dataSet.PERIOD_CD	= newdata.PERIOD_CD;
		    		dataSet.PAT_SBST_NO	= newdata[gvPAT_SBST_NO];
		    		dataSet.DEL_YN		= newdata.DEL_YN;
		    		
		    		btnFlag = false;
		    		
		    		callService("setDataDel"
	            			,"research/chartReview/setDataDel"
	            			,dataSet
	            			,"serviceCallback_chartReview");
		    		
			    	commit(true);
		    	}else{
			    	var fieldVal	= "";
			    	var TABLE_ID 	= newdata.TABLE_ID;
			    	var PAT_SBST_NO	= newdata[gvPAT_SBST_NO];
			    	var PERIOD_CD 	= newdata.PERIOD_CD;
			    	
		    		for(var i=0; i<metaDataList.TABLE_DATA.length; i++){
		    			
		    			if(newdata[metaDataList.TABLE_DATA[i].COLUMN_ID] == undefined){
		    				newdata[metaDataList.TABLE_DATA[i].COLUMN_ID] = "";
		    			}
		    			
		    			//update 필드=값
		    			if(fieldVal){
		    				fieldVal = fieldVal +','+ metaDataList.TABLE_DATA[i].COLUMN_ID+"= '"+ newdata[metaDataList.TABLE_DATA[i].COLUMN_ID] +"'";
		    			}else{
		    				fieldVal = metaDataList.TABLE_DATA[i].COLUMN_ID +"= '"+ newdata[metaDataList.TABLE_DATA[i].COLUMN_ID] +"'";
		    			}
		    			
		    		}
		    		
		    		dataSet.TABLE_ID	= TABLE_ID;
		    		dataSet.PERIOD_CD	= PERIOD_CD;
		    		dataSet.PAT_SBST_NO	= PAT_SBST_NO;
		    		dataSet.fieldVal	= fieldVal;
		    		
		    		callService("setDataVal"
	            			,"research/chartReview/setDataVal"
	            			,dataSet
	            			,"serviceCallback_chartReview");
		    		
		    	}
            }
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
		    height: '550',
		    columnsresize: true,
		    sortable: true,
		    columns: dsWrapColumnList[i],
		    editable : true,
			editmode : 'dblclick',
		    selectionmode: 'singlerow',
		    enabletooltips: true,
		    sortable: true,
		    ready: function () {
                
        		setTimeout(function(){ 
        			$('#jqxGridResult_'+gridNum).jqxGrid({ width: '100%' });
	        		$('#jqxGridResult_'+gridNum).jqxGrid('autoresizecolumns', 'column');
        		}, 500);
		    }
		});
		
		$('#' + jqxGridId).on('cellclick',function(event){
    		var args = event.args;
    		
    		var data = $(this).jqxGrid('getrowdata', args.rowindex);
    		
    		//제외 버튼
    		if(args.datafield === 'DEL_YN'){
	    		
	    		var args = event.args;
	    		
	    		var data = $(this).jqxGrid('getrowdata', args.rowindex);
	    		
	    		if(args.datafield === 'DEL_YN'){
	    			if( data.DEL_YN === 'Y'){
	    				data.DEL_YN	= 'N';
		    			
		    		}else{
		    			data.DEL_YN	= 'Y';
		    		}
	    			
	    			btnFlag = true;
	    			
	    			var id = $(this).jqxGrid('getrowid', args.rowindex);
	    			
	    			var commit = $(this).jqxGrid('updaterow', id, data);
	    			
	    		}
	    		
    		}
    		
    		//차트리뷰 버튼
    		if(args.datafield === 'CHART_YN'){
	    		
	    		var args = event.args;
	    		
	    		var item = args.row.bounddata;
				runChart(item[gvPAT_SBST_NO]);
				
	    		   		
    		}
    	});
		
	}
}


function runChart(pat_sbst_no) {
	//뷰어프로그램이 설치되어 있는지 확인 필요
	var getCookiePopVal = getCookiePop("uICECallDownload");
	
	var flag = "N";		//Y 설치됨
	
	if(getCookiePopVal){
		flag = "Y";
	}
	
	if(flag=="Y"){
		runUICECall(pat_sbst_no);
	}else{
		window.open(gvCONTEXT + "/research/chartReview/chartReviewDownloadPopup?pat_sbst_no="+pat_sbst_no,"viewerDownload","width=500,height=300");
	}
}


//[devson]uICECallPop여부를 확인하기 위한 쿠키값 함수
function getCookiePop(Name) {
	var search = Name + "=";
	if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
		offset = document.cookie.indexOf(search);
		if (offset != -1) { // 쿠키가 존재하면
			offset += search.length;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			// 쿠키 값의 마지막 위치 인덱스 번호 설정
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		}
	}
	return "";
}

function runUICECall(pat_sbst_no){
	var dataSet = {};
	dataSet.pat_sbst_no = pat_sbst_no;
	
	callService("getPatId"
			,"research/chartReview/getPatId"
			,dataSet
			,"serviceCallback_chartReview");
	
}




//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
* 이벤트 초기화
* @returns
*/
function initEvent_chartReview()
{
	
	//입력항목 추가 모달
	$('#modalColumnAdd').on('show.bs.modal', function(event){
		if($('#jqxGridResult_0').html() == undefined){
			BootstrapDialog.show({
				message : "개인조건+데이터를 " + COM_0023,
				buttons : [
				           {
								label: 'OK',
								action: function(dialogItself){
									$('#modalColumnAdd').modal('hide');
									dialogItself.close();
								}
				           }
				          ]
			});	
			return;
		}
		
		/*$('#vColumnDB').val('');*/
		$('#vColumnTable').val('');
		$('#vColumnType option:eq(0)').prop('selected', true);
	});
	
	//입력항목추가 submit btn
	$('#btnColumnAdd').on('click', function(){	
			
		
		/*if($('#vColumnDB').val() == ""){
			BootstrapDialog.alert("DB용 컬럼명을 " + COM_0014);
			return;
		}*/
		
		if($('#vColumnTable').val() == ""){
			BootstrapDialog.alert("테이블용 컬럼명을 " + COM_0014);
			return;
		}
		var TABLE_ID 		= $('#jqxGridResult_0').jqxGrid('getrowdata', 0).TABLE_ID;
		/*var vColumnDB 		= $('#vColumnDB').val();*/
		var vColumnTable 	= $('#vColumnTable').val();		
		var columnType 		= $("#vColumnType option:selected").val();
		var DATA_SET 		= $('#DATA_SEQ').val();
		var columnTypeCode;
		
		if(columnType == "Int"){
			columnTypeCode = "NUM";
		}else{
			columnTypeCode = "TEX";
		}
		
		var dataSet = {};
		dataSet.TABLE_ID 			= TABLE_ID;
		/*dataSet.ColumnDB 			= vColumnDB;*/
		dataSet.ColumnTable 		= vColumnTable;
		dataSet.ColumnType 			= columnType;
		dataSet.DATA_SET 			= DATA_SET;
		dataSet.ColumnTypeCode 		= columnTypeCode;
		
		callService("setColumnAdd"
    			,"research/chartReview/setColumnAdd"
    			,dataSet
    			,"serviceCallback_chartReview");
	});
	
	//입력항목 삭제 모달
	$('#modalColumnDel').on('show.bs.modal', function(event){
		
		if($('#jqxGridResult_0').html() == undefined){
			BootstrapDialog.show({
				message : "개인조건+데이터를 " + COM_0023,
				buttons : [
				           {
								label: 'OK',
								action: function(dialogItself){
									$('#modalColumnDel').modal('hide');
									dialogItself.close();
								}
				           }
				          ]
			});	
			return;
		}
		
		
		$('#editColumnArea').html('');
		console.log(metaDataList);
		
		$('#vTable_id').val(metaDataList['TABLE_ID']);
		for(var i=0; i<metaDataList['TABLE_DATA'].length; i++){
			var chkHtml = "";
			
			chkHtml = chkHtml + "<div class='col-lg-3 margin-bottom-10'>";
			chkHtml = chkHtml + "<label><input type='checkbox' name='editColumn' class='editColumn margin-left-5' columnId='"+ metaDataList['TABLE_DATA'][i].COLUMN_ID +"' value='"+ metaDataList['TABLE_DATA'][i].SEQ +"'>"+ metaDataList['TABLE_DATA'][i].COLUMN_COMMENT +"<label>";
			chkHtml = chkHtml + "</div>";
			
			$('#editColumnArea').append(chkHtml);
		}
		
		makeiCheck('.editColumn');
    
	});
	
	//입력항목삭제 submit btn
	$('#btnColumnDel').on('click', function(){
		BootstrapDialog.confirm('해당Column의 모든데이터가 삭제 됩니다.<br>정말 삭제하시겠습니까?', function(result){
            if(result) {
            	var chkVal = '';
        		var chkId = [];
        		$("input[name=editColumn]:checked").each(function() {
        			if(chkVal){
        				chkVal = chkVal + ',' + $(this).val();
        			}else{
        				chkVal = $(this).val();
        			}
        			chkId.push($(this).attr('columnId'));
        		});
        		
        		var TABLE_ID = $('#vTable_id').val();
        		var dataSet = {};
        		dataSet.TABLE_ID 	= TABLE_ID;
        		dataSet.chkVal 		= chkVal;
        		dataSet.columnId 	= chkId;
        		
        		callService("setColumnDel"
            			,"research/chartReview/setColumnDel"
            			,dataSet
            			,"serviceCallback_chartReview");
            }
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
	
	$('#btnChartDownload').on('click', function() {
		location.href = gvCONTEXT + "/js/uICECaller-2.0.exe";
		
		var expdate = new Date();
		expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30 * 12); // 30일 * 12개월
		setCookie("uICECallDownload", "Y", expdate);
	});
}

function setCookie(name, value, expires) {
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires.toGMTString();
}




