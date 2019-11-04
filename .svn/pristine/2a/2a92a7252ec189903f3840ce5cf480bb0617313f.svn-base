
//삭제여부 버튼클릭 flag true=버튼클릭 시, false=그 이외 이벤트
var delFlag = false;

//열너비용 column명 array
var fieldListForWidthChange = '';

/**
 * date format (timestamp + date type) 랜더러
 */
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
	var date = new Date(value); 
	var dateFormat = 'YYYY-MM-DD';
	var html = '';
	
	html = '<div class="jqx-grid-cell-left-align" style="margin-top: 4px;">';
	
	dateFormat = 'YYYY-MM-DD';
	
	html += moment(date).format(dateFormat);
	html += '</div>';
	
	return html;
}

/**
 * 환자선택 결과조회
 * @param result
 * @returns
 */
function drawPatientResult(result)
{
	console.log(result);
	
	var $tabResult   = $('#tabResult');
	var $jqxGridResultWrap = $('#jqxGridResultWrap');
	var jqxGridId;
	
	var dsColumnList = [];			//jqxgrid 설정용
	var dsDataFieldList = [];		//jqxgrid 설정용
	
	var dsColumnWrap = [];			//주기 jqxgrid
	var dsDateFieldsWrap = [];		//주기 jqxgrid
	
	$tabResult.html('');
	$jqxGridResultWrap.html('');
	
	gvResult = result.DATA;
	
	if(isNullOrEmpty(gvResult)){
		return;
	}
	
	print_bigcenmed("[--- 환자선택 조회 결과 ");
	print_bigcenmed(gvResult[0].dsQuery);

//	JqxGrid컬럼 설정	 (3
	for(var i=0; i < gvResult.length; i++){
		
		if(((i+1) + "주기") === gvResult[i].dsPeriodNm){
			var dsMetaDataList = gvResult[i].dsMetaDataList;
			
			dsDataFieldList = new Array();
			dsColumnList = [];
			
			for(var j=0; j < dsMetaDataList.length; j++){
				var dsMetaData = dsMetaDataList[j];
				
				print_bigcenmed(gvResult[i].dsPeriodNm + "==>" + dsMetaData.dataField);
				
				var dsField = {};
				var dsColumn = {};
				
				dsField.name		= dsMetaData.dataField;
				dsColumn.datafield 	= dsMetaData.dataField;
				dsColumn.text 		= dsMetaData.text;
				
				if( dsMetaData.ITEM_TYPE === 'DAT'){
					dsField.type = 'date';
					
					if(dsMetaData.dataField == 'BASE_DT'){
						dsColumn.cellsrenderer=cellsrenderer;
					}else{
						if(dsMetaData.DATA_TYPE.indexOf('timestamp') >= 0){
							dsColumn.cellsformat='yyyy-MM-dd HH:mm:ss';
						}else{
							dsColumn.cellsformat='yyyy-MM-dd';
						}
					}
						
				}else if( dsMetaData.ITEM_TYPE === 'COD'){	//코드이면서 날짜 타입
					if(dsMetaData.DATA_TYPE.indexOf('date') >= 0){
						dsField.type = 'date';
						dsColumn.cellsformat='yyyy-MM-dd';
					}
				}
				
				if( dsMetaData.dataField === 'PERIOD_CD'){
					dsColumn.hidden = true;
				}
				
				dsColumn.width = 100 / dsMetaDataList.length + "%";
				
				dsDataFieldList.push(dsField);
				dsColumnList.push(dsColumn);
				
				
			}
			
			dsDateFieldsWrap.push(dsDataFieldList);
			dsColumnWrap.push(dsColumnList);
		}
	}
	
	
	
//	JqxGrid 탭,그리드 설정	
	for(var i=0; i < gvResult.length; i++){
		var tabhtml = '';
		var tabInnerHtml = '';
		
		jqxGridId = 'jqxGridResult_' + i;
		
		if(gvMethCd === 'CS'){
			if(i == 0){
				tabhtml = '<li class="active">';	
				
				tabInnerHtml = '<div class="tab-pane active" id="tabResult_'+i+'">';
					tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '</div>';
			
			
			}else{
				tabhtml = '<li>';
				
				tabInnerHtml = '<div class="tab-pane" id="tabResult_'+i+'">';
					tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '</div>';
			}
			
			tabhtml += '<a href="#tabResult_'+i+'" data-toggle="tab">';
			tabhtml += gvResult[i].dsPeriodNm ;
			tabhtml += '(' + gvResult[i].dsCount + ')';
			tabhtml += '</a>';
			tabhtml += '</li>';
			
		//	tab append	
			$tabResult.append(tabhtml);
			$jqxGridResultWrap.append(tabInnerHtml);
			
			
		}else if(gvMethCd === 'CH'){
			tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			$jqxGridResultWrap.append(tabInnerHtml);
			$('#lblResultInfo_01').html('('+gvResult[i].dsCount+')');
			
		}else if(gvMethCd === 'CC'){
			tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			$jqxGridResultWrap.append(tabInnerHtml);
			$('#lblResultInfo_01').html('('+gvResult[i].dsCount+')');
		}
		
		
	//	--------------------------------------------------------------	
	//	JqxGrid설정	
		var dataSource = {
		    datatype: "json",
		    datafields: dsDateFieldsWrap[i],		//dsDataFieldList,
		    cache: false,
		    localdata: gvResult[i].dsList
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
		    height: '600',
		    sortable: true,
		    columnsresize: true,
		    columns: dsColumnWrap[i],
		    selectionmode: 'multiplecellsadvanced',
		    enabletooltips: true,
		    ready: function () {
	            setTimeout(function(){ 
	    			$('#jqxGridResult_'+gridNum).jqxGrid({ width: '100%' });
	        		$('#jqxGridResult_'+gridNum).jqxGrid('autoresizecolumns', 'column');
	    		}, 500);
		    }
		});
	}
	
	//열너비용 컬럼id 담기
	fieldListForWidthChange = dsDateFieldsWrap;
}



/**
 * 연구항목대상 결과목록 
 * @param result
 * @returns
 */
function drawStudyItemResult(result)
{
	var $tabResult   		= $('#tabResult_02');
	var $jqxGridResultWrap 	= $('#jqxGridResultWrap_02');
	var jqxGridId = '';
	
	var dsColumnWrap = [];			//주기 jqxgrid
	var dsDateFieldsWrap = [];		//주기 jqxgrid
	
	var dsColumnList 		= [];		//jqxgrid 설정용
	var dsDataFieldList 	= [];		//jqxgrid 설정용
	
	$tabResult.html('');
	$jqxGridResultWrap.html('');
	
	gvResult = result.DATA;
	
	
	
	if(isNullOrEmpty(gvResult)){
		return;
	}
	
	
//	JqxGrid컬럼 설정	 (3
	for(var i=0; i < gvResult.length; i++){
		print_bigcenmed("[--- 연구항목 조회 결과 ");
		print_bigcenmed(gvResult[i].dsQuery);
		
		if(((i+1) + "주기") === gvResult[i].dsPeriodNm){
			var dsMetaDataList = gvResult[i].dsMetaDataList;
			
			dsDataFieldList = new Array();
			dsColumnList = [];
			
			for(var j=0; j < dsMetaDataList.length; j++){
				var dsMetaData = dsMetaDataList[j];
				
				console.log(dsMetaData);
				
				var dsField = {};
				var dsColumn = {};
				
				dsField.name		= dsMetaData.dataField;
				dsColumn.datafield 	= dsMetaData.dataField;
				dsColumn.text 		= dsMetaData.text;
				
				if( dsMetaData.ITEM_TYPE === 'DAT'){
					//2018-09-12 추가
					dsField.type = 'date';
					
					if(dsMetaData.dataField == 'BASE_DT'){
						dsColumn.cellsrenderer=cellsrenderer;
					}else{
						if(dsMetaData.DATA_TYPE.indexOf('timestamp') >= 0){
							dsColumn.cellsformat='yyyy-MM-dd HH:mm:ss';
						}else{
							dsColumn.cellsformat='yyyy-MM-dd';
						}
					}
						
				}else if( dsMetaData.ITEM_TYPE === 'COD'){	//코드이면서 날짜 타입
					if(dsMetaData.DATA_TYPE.indexOf('date') >= 0){
						dsField.type = 'date';
						dsColumn.cellsformat='yyyy-MM-dd';
					}
				}
				
				
				
				if( dsMetaData.dataField === 'PERIOD_CD'){
					dsColumn.hidden = true;
				}
				
				if( dsMetaData.HIDDEN_YN === 'Y'){
					dsColumn.hidden = true;
				}
				
				dsColumn.width = 100 / dsMetaDataList.length + "%";
				
				dsDataFieldList.push(dsField);
				dsColumnList.push(dsColumn);
			}
			
			dsDateFieldsWrap.push(dsDataFieldList);
			dsColumnWrap.push(dsColumnList);
		}
		
		
	}
	
	
	for(var i=0; i < gvResult.length; i++){
		var tabhtml = '';
		var tabInnerHtml = '';
		
		jqxGridId = 'jqxGridResult_' + gvActiveTab + '_' + i;
		
		if(gvMethCd === 'CS'){
			if(i == 0){
				tabhtml = '<li class="active">';	
				
				tabInnerHtml = '<div class="tab-pane active" id="tabResult_02_'+i+'">';
					tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '</div>';
			
			
			}else{
				tabhtml = '<li>';
				
				tabInnerHtml = '<div class="tab-pane" id="tabResult_02_'+i+'">';
					tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '</div>';
			}
			
			
			tabhtml += '<a href="#tabResult_02_'+i+'" data-toggle="tab">';
			tabhtml += gvResult[i].dsPeriodNm ;
			tabhtml += '(' + gvResult[i].dsCount + ')';
			tabhtml += '</a>';
			tabhtml += '</li>';
			
		//	tab append	
			$tabResult.append(tabhtml);
			$jqxGridResultWrap.append(tabInnerHtml);
			
		}if(gvMethCd === 'CH'){
			if(i == 0){
				tabhtml = '<li class="active">';	
				
				tabInnerHtml = '<div class="tab-pane active" id="tabResult_02_'+i+'">';
					tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '</div>';
			
			
			}else{
				tabhtml = '<li>';
				
				tabInnerHtml = '<div class="tab-pane" id="tabResult_02_'+i+'">';
					tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
				tabInnerHtml += '</div>';
			}
			
			
			tabhtml += '<a href="#tabResult_02_'+i+'" data-toggle="tab">';
			
			if(i == 0){
				tabhtml += '연구항목';
				tabhtml += '(' + gvResult[i].dsCount + ')';
				tabhtml += '</a>';
			}else{
				tabhtml += '전체-' + i;
				tabhtml += '(' + gvResult[i].dsCount + ')';
				tabhtml += '</a>';
			}
			
			
			tabhtml += '</li>';
			
		//	tab append	
			$tabResult.append(tabhtml);
			$jqxGridResultWrap.append(tabInnerHtml);
			
		}else if(gvMethCd === 'CC'){
			tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			$jqxGridResultWrap.append(tabInnerHtml);
			
			$('#lblResultInfo_' + gvActiveTab).html('('+gvResult[i].dsCount+')');
			
			
		}
		
		
		
		var dataSource = {
			    datatype: "json",
			    datafields: dsDateFieldsWrap[i], //dsDataFieldList,
			    cache: false,
			    localdata: gvResult[i].dsList
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
			    height: '600',
			    columnsresize: true,
			    columns: dsColumnWrap[i], //dsColumnList,
			    sortable: true,
			    selectionmode: 'multiplecellsadvanced',
			    enabletooltips: true,
			    ready: function () {
		            setTimeout(function(){ 
		    			$('#jqxGridResult_' + gvActiveTab + '_' + gridNum).jqxGrid({ width: '100%' });
		        		$('#jqxGridResult_' + gvActiveTab + '_' + gridNum).jqxGrid('autoresizecolumns', 'column');
		    		}, 500);
			    }
			});
	}

	//열너비용 컬럼id 담기
	fieldListForWidthChange = dsDateFieldsWrap;
}

var gvDataAdapterSavedResult = [];


/**
 * 연구항목대상 결과목록 (저장된 데이터)
 * @param result
 * @returns
 */
function drawStudyItemSavedResult(result)
{
	gvDataSource = [];
	
	$('#tabResult').html('');
	$('#jqxGridResultWrap').html('');
	$('#lblResultInfo_01').html('');
	$('#tabResult_02').html('');
	$('#jqxGridResultWrap_02').html('');
	$('#lblResultInfo_02').html('');
	
	if(result.dsMetaDataList.length == 0){
		return;
	}
	
	var resultSaveTab = result.dsItemData.TAB_CD;
	var gvSaveTab ='';
//	저장데이터 	
	if(resultSaveTab === 'C'){
		var $tabResult   = $('#tabResult');
		var $jqxGridResultWrap = $('#jqxGridResultWrap');
		
		var dsColumnList = [];		
		var dsDataFieldList = [];
		
		var cellclass = function (row, columnfield, value) {
	        var id = $("#jqxGridResultWrap .active > div").attr("id");
	        var dataRecord = $("#" + id).jqxGrid('getrowdata', row);
			var del_yn = dataRecord.DEL_YN;
			if (del_yn == "Y") {
				return 'label-warning';
			}
	    };
	    gvSaveTab = '01';
	    
	}
	else{
		var $tabResult   = $('#tabResult_02');
		var $jqxGridResultWrap = $('#jqxGridResultWrap_02');
		
		var dsColumnList = [];		
		var dsDataFieldList = [];
		
		var cellclass = function (row, columnfield, value) {
	        var id = $("#jqxGridResultWrap_02 .active > div").attr("id");
	        var dataRecord = $("#" + id).jqxGrid('getrowdata', row);
			var del_yn = dataRecord.DEL_YN;
			if (del_yn == "Y") {
				return 'label-warning';
			}
	    };
	    gvSaveTab = '02';
	}
	
	
    var dsWrapColumnList = [];		
	var dsWrapDataFieldList = [];
	
	dsDataResultList = result.dsDataResultList;
	print_bigcenmed(dsDataResultList);
	
//	------------------------------------------------------------    
//	메타설정	
    for(var i=0; i < dsDataResultList.length; i++){
    	dsDataFieldList = [];
		dsColumnList = [];
		
    	for(var j=0; j < result.dsMetaDataList.length; j++){
    		var dsMetaData = result.dsMetaDataList[j];
    		
    		var dsField = {};
    		var dsColumn = {};
    		
    		dsField.name=dsMetaData.COLUMN_ID;
    		
    		dsColumn.datafield = dsMetaData.COLUMN_ID;
    		dsColumn.text = dsMetaData.COLUMN_COMMENT;
    		dsColumn.cellclassname = cellclass;
    		
    		console.log(dsMetaData)
    		
    		/*if( dsMetaData.ITEM_TYPE === 'DAT'){
				if(dsMetaData.dataField == 'BASE_DT'){
					dsColumn.cellsrenderer=cellsrenderer;
					
				}else{
					dsField.type = 'date';
					if(dsMetaData.DATA_TYPE.indexOf('timestamp') >= 0){
						dsColumn.cellsformat='yyyy-MM-dd';
					}else{
						dsColumn.cellsformat='yyyy-MM-dd';
					}
				}
			}
			*/
    		
    		if( dsMetaData.ITEM_TYPE === 'DAT'){
				
				dsField.type = 'date';
				dsColumn.cellsformat='yyyy-MM-dd';
					
			}else if( dsMetaData.ITEM_TYPE === 'COD'){	//코드이면서 날짜 타입
				if(dsMetaData.DATA_TYPE.indexOf('date') >= 0){
					dsField.type = 'date';
					dsColumn.cellsformat='yyyy-MM-dd';
				}
			}
    		
    		if( dsMetaData.COLUMN_ID === 'PERIOD_CD'){
    			dsColumn.hidden = true;
    		}
    		
    		if( dsMetaData.COLUMN_ID === 'CRT_DT'){
    			dsField.type='date';
    			dsColumn.cellsalign='center';
    			dsColumn.cellsformat='yyyy-MM-dd';
    			dsColumn.width=100;
    		}
    		
    		if( dsMetaData.COLUMN_ID === 'DEL_YN'){
    			dsColumn.width=100;
    			dsColumn.cellsrenderer = function (row, column, value) {
    				var html = '';
    				
    				html = '<div class="row"> ';
    					
    					html += '<div class="col-md-12" style="text-align:center;">';
    						html += '<div class="form-group">';
    							if(value === 'Y'){
    								html += '<button ';
    								html += 'type="button" ';
    								html += 'class="btn btn-xs btn-labeled btn-danger btnDelYn" ';
    								html += 'style="width:80%;margin-top:3px;"> ';
    								
    								html += '취소';
    								html += '</button>';	
    							}else{
    								html += '<button ';
    								html += 'type="button" ';
    								html += 'class="btn btn-xs btn-labeled btn-primary btnDelYn" ';
    								html += 'style="width:80%;margin-top:3px;"> ';
    								html += '제외';
    								html += '</button>';	
    								
    							}
    							
    							
    						html += '</div> ';
    					html += '</div> ';
    				html += '</div> ';
    				
                    return html;
                }
    		}
    		
    	//	검색여부가 Y면	
    		
    		if(gvSEARCH_YN === 'Y'){
    			if( dsMetaData.COLUMN_ID === 'SEARCH_YN'){
    				
    				dsColumn.width=100;
    				dsColumn.cellsrenderer = function (row, column, value) {
    					var html = '';
        				
        				html = '<div class="row"> ';    					
        					html += '<div class="col-md-12" style="text-align:center;">';
        						html += '<div class="form-group">';
        							if(value === 'Y'){
        								html += '<button ';
        								html += 'type="button" ';
        								html += 'class="btn btn-xs btn-labeled btn-success btnSearchYn btnSearchModal" ';
        								html += 'style="width:80%;margin-top:3px;"> ';
        								html += '검색';
        								html += '</button>';	
        							}else{
        								html += '';	
        							}
        							
        							
        						html += '</div> ';
        					html += '</div> ';
        				html += '</div> ';
        				
                        return html;
    				}
    			}
    		}else if(gvSEARCH_YN === 'N'){
    			if( dsMetaData.COLUMN_ID === 'SEARCH_YN'){
    				var html = '';
        			return html;
    			}
    		}
    		
    		
    		if( dsMetaData.COLUMN_ID === 'DEL_YN'){
    			dsColumn.width=100;
    			dsColumn.cellsrenderer = function (row, column, value) {
    				var html = '';
    				
    				html = '<div class="row"> ';
    					
    					html += '<div class="col-md-12" style="text-align:center;">';
    						html += '<div class="form-group">';
    							if(value === 'Y'){
    								html += '<button ';
    								html += 'type="button" ';
    								html += 'class="btn btn-xs btn-labeled btn-danger btnDelYn" ';
    								html += 'style="width:80%;margin-top:3px;"> ';
    								
    								html += '취소';
    								html += '</button>';	
    							}else{
    								html += '<button ';
    								html += 'type="button" ';
    								html += 'class="btn btn-xs btn-labeled btn-primary btnDelYn" ';
    								html += 'style="width:80%;margin-top:3px;"> ';
    								html += '제외';
    								html += '</button>';	
    								
    							}
    							
    							
    						html += '</div> ';
    					html += '</div> ';
    				html += '</div> ';
    				
                    return html;
                }
    		}
    		
    		if( dsMetaData.COLUMN_ID === 'CHART_YN' || dsMetaData.COLUMN_ID === 'CHART_DT'){
    			dsColumn.hidden = true;
    		}
    		
    		if(isNull(dsMetaData.HIDDEN_YN)){
    			dsColumn.hidden = false;
    			
    		}else{
    			var strHiddenYn = dsMetaData.HIDDEN_YN;
    			var arrHiddenYn = strHiddenYn.split(',');
    			
    			if(arrHiddenYn[i] === 'Y'){
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
    	
    	
    	print_bigcenmed(dsWrapDataFieldList)
    	
    }
	
    console.log("dsDta::::::::",dsWrapColumnList);
    console.log("dsCta::::::::",dsWrapDataFieldList);
	
	//$tabResult.html('');
	//$jqxGridResultWrap.html('');
	 
    $('#tabResult').html('');
    $('#jqxGridResultWrap').html('');
    $('#tabResult_02').html('');
    $('#jqxGridResultWrap_02').html('');
    
	var dataSourceList = [];
	var dataAdapterList = [];
	
	for(var i=0; i < dsDataResultList.length; i++){
		var tabhtml = '';			//tab
		var tabInnerHtml = '';		//tab div
		var $jqxGridHtml = '';		//jqxgrid wrap
		var jqxGridId = '';
		
		jqxGridId = 'jqxGridResult_' + gvSaveTab + '_' + i;
		
		if(i == 0){
			tabhtml = '<li class="active">';	
			
			tabInnerHtml = '<div class="tab-pane active" id="tabResult_' + gvSaveTab + '_' + i + '">';
				tabInnerHtml += '<div class="jqxgridResult" id="'+jqxGridId+'" ></div>';
			tabInnerHtml += '</div>';
		
		
		}else{
			tabhtml = '<li>';
			
			tabInnerHtml = '<div class="tab-pane" id="tabResult_' + gvSaveTab + '_' + i +'">';
				tabInnerHtml += '<div class="jqxgridResult" id="'+jqxGridId+'" ></div>';
			tabInnerHtml += '</div>';
		}
		
		
		if(gvMethCd === 'CS'){
			tabhtml += '<a href="#tabResult_' + gvSaveTab + '_' + i + '" data-toggle="tab">'+dsDataResultList[i].dsPeriodNm + '주기 ('+result.dsDataResultList[i].dsCount+')' + '</a>';
			tabhtml += '</li>';	
		}else if(gvMethCd === 'CH'){
			if(i == 0){
				tabhtml += '<a href="#tabResult_' + gvSaveTab + '_' + i + '" data-toggle="tab">연구항목('+result.dsDataResultList[i].dsCount+')' + '</a>';
				tabhtml += '</li>';
			}else{
				tabhtml += '<a href="#tabResult_' + gvSaveTab + '_' + i + '" data-toggle="tab">전체-'+i + ' ('+result.dsDataResultList[i].dsCount+')' + '</a>';
				tabhtml += '</li>';
			}
			
		}else{
			tabInnerHtml += '<div id="'+jqxGridId+'" ></div>';
			$jqxGridResultWrap.append(tabInnerHtml);
			$('#lblResultInfo_' + gvSaveTab).html('('+result.dsDataResultList[i].dsCount+')');
			
		}
		
		$tabResult.append(tabhtml);
		$jqxGridResultWrap.append(tabInnerHtml);
		
		var dataSource = {
		    datatype: "json",
		    //datafields: dsDataFieldList,
		    datafields:dsWrapDataFieldList[i],
		    cache: false,
		    localdata: dsDataResultList[i].dsList,
		    updaterow: function (rowid, newdata, commit) {
		    	if(delFlag == true){
			    	var dataSet = {};
		    		dataSet.TABLE_ID	= newdata.TABLE_ID;
		    		dataSet.PERIOD_CD	= newdata.PERIOD_CD;
		    		dataSet[gvPAT_SBST_NO]	= newdata[gvPAT_SBST_NO];
		    		dataSet.DEL_YN	= newdata.DEL_YN;
		    		
		    		
		    		callService("updateDelYn"
		    				,"research/query/updateResultTable"
		    				,dataSet
		    				,"serviceCallback_research_result");
		    		
			    	delFlag = false;
		    	}
		    	commit(true);
            }
		};
		
		gvDataSource.push(dataSource);
		
		var dataAdapter = new $.jqx.dataAdapter(dataSource, {
			loadError: function(xhr, status, error){
				alert(error);
			}
		});
		
		gvDataAdapterSavedResult.push(dataAdapter);
		
		$('#' + jqxGridId).jqxGrid({
			source: dataAdapter,
		    theme: 'bootstrap',
		    width: '100%',
		    height: '600',
		    columnsresize: true,
		 //	columns: dsColumnList,
		    columns: dsWrapColumnList[i],
		    sortable: true,
		    selectionmode: 'multiplecellsadvanced',
		    enabletooltips: true,
		    ready: function () {
	            /*setTimeout(function(){ 
	    			$('jqxGridResult_' + gvActiveTab + '_0').jqxGrid({ width: '100%' });
	    			$('jqxGridResult_' + gvActiveTab + '_0').jqxGrid('autoresizecolumns', 'column');
	    		}, 500);*/
		    }
			
		});
		
		
    	$('#' + jqxGridId).on('cellclick',function(event){
    		var args = event.args;
    		
    		var data = $(this).jqxGrid('getrowdata', args.rowindex);
    		
    		if(args.datafield === 'DEL_YN'){
    			if( data.DEL_YN === 'Y'){
    				data.DEL_YN	= 'N';
	    			
	    		}else{
	    			data.DEL_YN	= 'Y';
	    		}
    			
    			delFlag = true;
    			
    			var id = $(this).jqxGrid('getrowid', args.rowindex);
    			var commit = $(this).jqxGrid('updaterow', id, data);
    			
    		}
    		
    		if(args.datafield === 'SEARCH_YN'){
    			print_bigcenmed(data[result['dsItemData']['GV_PAT_SBST_NO']]);		//환자대체번호
    			$('#txtPatSbstNo').val(data[result['dsItemData']['GV_PAT_SBST_NO']]);
    			if(data.SEARCH_YN == 'Y'){
        			$('#popSearchModal').modal('show');
    			}
    		}
    	});
    	
    	//$('#' + jqxGridId).jqxGrid('autoresizecolumns');
    	
    	//열너비용 컬럼아이디 담기
    	fieldListForWidthChange = dsWrapDataFieldList;
	    
	}
}


var gvDataSource = [];

function serviceCallback_research_result(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}
	
	switch(svcId){
		case "updateDelYn":
			break;
			
		default:
			break;
	}
	
}


/**
 * 결과목록 검색 연구항목 대상 적용
 * @param obj
 * @returns
 */
function setPatientList(obj)
{
	var jqxGridResult = $('.jqxgridResult');
	
	for(var i=0; i < jqxGridResult.length; i++){
		var jqxGrid = jqxGridResult[i];
		
		var dsUpdateList = [];
		
		var dsNormalList = $('#jqxGridResult_02_' + i).jqxGrid('getrows');
		
		for(var j=0; j < dsNormalList.length; j++){
			var dsRow = dsNormalList[j];
			
			var isMatch = false;	//검색일치환자 여부
			
			for(var k=0; k < obj.length; k++){
			//	공통화작업 (dsRow.PAT_SBST_NO --> dsRow[gvPAT_SBST_NO])
				if(dsRow[gvPAT_SBST_NO] === obj[k]){
					isMatch = true;
					break;
				}
			}
			if(isMatch){
				dsRow.SEARCH_YN = 'Y';
				dsUpdateList.push(dsRow);
			}else{
				dsRow.SEARCH_YN = 'N';
				dsUpdateList.push(dsRow);
			}
		}
		gvDataSource[i].localdata = dsUpdateList;
		$('#jqxGridResult_02_' + i).jqxGrid('clear');
		$('#jqxGridResult_02_' + i).jqxGrid('updatebounddata');

	}
}

