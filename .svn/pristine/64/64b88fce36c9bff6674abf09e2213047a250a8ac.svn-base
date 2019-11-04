function 조회조건_setGrid(){};

/**
 * 조회조건 그리드 설정
 */
$.fn.setGrid = function()
{
	if($.fn.dataTable.isDataTable($(this))){
		return;
	}
	var tableId = this.selector;
	var dsTabCd = gvTabCd.C;
	var bReOrder = false;
	var reOrderTd = '';
	
	if(tableId.indexOf('gridSearch_01') >= 0){
		bReOrder = true;
		reOrderTd = 'td:nth-child(3),td:nth-child(4),td:nth-child(5)';
	}
	
	var table = $(this).DataTable({
		searching:false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		thema:'bootstrap',
		ordering: false,
		fixedHeader: true,
		paging: false,
	    autowidth:false,
	    rowReorder:{
			selector: reOrderTd
		},
		language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    data: null,
		columns: [
			{ 
				data:"GR_LV",
				defaultContent: "",
				"ordering": false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteGroup(data,type,row,meta,dsTabCd.CODE);
					
					return html;
					
				}
			},{ 
				data:"ANDOR_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					if(gvMethCd === 'CH' ){
						if(meta.row < 3){
							return html;
						}	
					}else{
						if(meta.row < 1){
							return html;
						}	
					}
					
					
					html = templeteAndOr(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 	
				data:"ITEM_CATE_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
						html = '연구';
					}else{
						html = row.ITEM_CATE_NM;
					}
					
					return html;
				}
				
			},{ 	
				data:"ITEM_CATE_DETL_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
						html = row.TABLE_COMMENT;
					}else{
						html = row.ITEM_CATE_DETL_NM;
					}
					return html;
				}
			},{ 
				data:"ITEM_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					console.log(row);
					var html = '';
					var data_type = '';
					var ITEM_TYPE = row['ITEM_TYPE'];
					
					if(ITEM_TYPE == "TEX"){
						data_type = ' <br/><img src="../../images/TEX.png" width="16" height="16">';
					}else if(ITEM_TYPE == "NUM"){
						data_type = ' <br/><img src="../../images/NUM.png" width="16" height="16">';
					}
					
					html = data + data_type;
					
					return html;
				}
			},{ 
				data:"ITEM_TYPE",
				defaultContent: "",
				orderable:false,
		    	render:function(data, type, row, meta){
		    		var html = '';
		    		
		    		if(typeof row === 'undefined' || type === 'type'){
		    			return false;
		    		}
		    		
		    		
//		    		팝업여부	
		    		if(row.POPUP_YN === 'Y'){
		    			html = templetePopup(data, type, row, meta, dsTabCd.CODE);
		    			
//		    		팝업이 아니면 일반 렌더		
		    		}else{
		    			switch(data){
		    				case "TEX":
		    					html = templeteText( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    		}
		    		return html;
		    	}
					
			},{ 
				data:"CNT",
				defaultContent: "",
				"ordering": false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteTarget(data,type,row,meta);
					
					return html;
				}
			},{ 
				data:"INCLUDE_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteIncExc(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 
				//data:"BASE_DT_COLUMN",
				data:"BASE_DT_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteBaseDtYn(data,type,row,meta,dsTabCd.CODE);
					
					
					return html;
				}
			},{ 
				data:"FIRST_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteFirstYn(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 
				data:"DELETE_YN",
				defaultContent: "",
				render : function (data,type,row,meta){
					var html = '';
					
					html = templeteDeleteYn(data,type,row,meta);
					
					return html;
				}
			}
		],
		"columnDefs": [
		    { /*width: 40,*/ targets: [0],	orderable: false, className: 'dt-left'	 },
		    { /*width: 60,*/ targets: [1],	orderable: false, className: 'dt-left' },
		    { /*width: 80,*/ targets: [2],	orderable: bReOrder,  className: 'reorder'},
		    { /*width: 150,*/	targets: [3],	orderable: bReOrder,  className: 'reorder' },
		    { /*width: 250,*/	targets: [4],	orderable: bReOrder,  className: 'reorder' },
		    { /*width: 300,*/	targets: [5],	orderable: false  },
		    { /*width: 120,*/	targets: [6],	orderable: false  },
		    { /*width: 80,*/ targets: [7],	orderable: false  },
		    { /*width: 40,*/ targets: [8],	orderable: false  },
		    { /*width: 40,*/ targets: [9],	orderable: false  },
		    { /*width: 40,*/ targets: [10],	orderable: false  }
		],
		rowCallback: function ( row, data ) {
			
			
        }
	});
	
	
	table.on('row-reorder.dt', function ( e, diff, nodes ) {
		//console.log("---------------------------");
		//console.log(diff.length);
		
		
		var endNodes = $.unique(table.rows( { page: 'current' } ).nodes().toArray() );
		var dsList = [];
		
		//190624 김지훈 그룹초기화
		var cellHtml = [];
		if(gvMethCd === 'CH') cellHtml = ["",""];
		for(var i=0; i < endNodes.length; i++){
			var dsItemMgmt = {};
			var node = endNodes[i];
			var cell9 = node.cells[9];
			

			dsItemMgmt = table.row(endNodes[i]._DT_RowIndex).data();
			
			
			/*$(node).find("td").each(function() {
				if( this.name.indexOf('txtGRP') >= 0){
					if(isNullOrEmpty($(this).children('span')) ){
						cellHtml.push('');
					}
					else{
						cellHtml.push($(this).children('span').html());
					}
				}
			});*/
			
			$(node).find("td select,input").each(function (){
				var cellData = this.value;
				
				if( this.name.indexOf('txtGRP') >= 0){
					dsItemMgmt.GR_LV = cellData;
					
					if(isNullOrEmpty($(this).parent().children('span')) ){
						cellHtml.push('');
					}
					else{
						cellHtml.push($(this).parent().children('span').html());
					}
				}
				
				if( this.name.indexOf('selCODE') >= 0 || this.name.indexOf('selNUM_LIST') >= 0 || this.name.indexOf('selTEX_LIST') >= 0 ){
					dsItemMgmt.INPUT_VAL0 = cellData;
					
				}
				
				if( this.name.indexOf('txtNUM1') >= 0 || 
					this.name.indexOf('txtTEX1') >= 0 || 
					this.name.indexOf('calFROM_DT') >= 0 || 
					this.name.indexOf('POPUP_VAL') >= 0)
				{
					dsItemMgmt.INPUT_VAL1 = nvl(cellData,' ');
				}
				
				if( this.name.indexOf('txtNUM2') >= 0 ||
					this.name.indexOf('txtTEX2') >= 0 || 
					this.name.indexOf('calTO_DT') >= 0){
					dsItemMgmt.INPUT_VAL2 = cellData;
				}
				
				if(this.name.indexOf('txtCNT') >= 0){
					dsItemMgmt.CNT = cellData;
				}
				
				if(this.name.indexOf('INCEXC') >= 0){
					dsItemMgmt.INC_EXC = cellData;
				}
				
				if(this.name.indexOf('ANDOR') >= 0){
					dsItemMgmt.AND_OR = cellData;
				}
				
				if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
					if($(this).prop('checked')){
						dsItemMgmt.BASE_DT_YN = cellData;
						
					}else{
						dsItemMgmt.BASE_DT_YN = 'N';
					}
					
				}
				
				if(this.name.indexOf('FIRST_YN') >= 0){
					if($(this).prop('checked')){
						dsItemMgmt.FIRST_YN = cellData;
						
					}else{
						dsItemMgmt.FIRST_YN = 'N';
					}
				}
			});
			
			dsList.push(dsItemMgmt);
		}
		
		var diffGroup = [];
		
		
	//	reorder행이 있으면 	
		if(diff.length > 0){
			
			var diffLength = diff.length-1;
			
			var nData = 0;
			var oData = 0;

			table.rows().remove().draw();
			table.rows.add(dsList).draw();
			//$(tableId).groupInit();	
			$(tableId).groupMove(cellHtml,nData,oData,diff);
			

			
		}
		
		
		
	});
	
}


/**
 * 조회조건 그리드 설정
 */
$.fn.setGrid2 = function()
{
	if($.fn.dataTable.isDataTable($(this))){
		return;
	}
	var tableId = this.selector;
	var dsTabCd = gvTabCd.C;
	var bReOrder = false;
	var reOrderTd = '';
	
	if(tableId.indexOf('gridSearch_01') >= 0){
		bReOrder = true;
		reOrderTd = 'td:nth-child(3),td:nth-child(4),td:nth-child(5)';
	}
	
	var table = $(this).DataTable({
		searching:false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		thema:'bootstrap',
		ordering: false,
		fixedHeader: true,
		//fixedColumns:   true,
		//scrollX:        true,
	   // scrollCollapse: true,
	  //scrollY:        "300px",
	    paging:         false,
	    autowidth:false,
	    rowReorder:{
			selector: reOrderTd
		},
		language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    data: null,
		columns: [
			{ 
				data:"GR_LV",
				defaultContent: "",
				"ordering": false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteGroup(data,type,row,meta,dsTabCd.CODE);
					
					return html;
					
				}
			},{ 
				data:"ANDOR_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					if(gvMethCd === 'CH' ){
						if(meta.row < 3){
							return html;
						}	
					}else{
						if(meta.row < 1){
							return html;
						}	
					}
					
					
					html = templeteAndOr(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 	
				data:"ITEM_CATE_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
						html = '연구';
					}else{
						html = row.ITEM_CATE_NM;
					}
					
					return html;
				}
				
			},{ 	
				data:"ITEM_CATE_DETL_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
						html = row.TABLE_COMMENT;
					}else{
						html = row.ITEM_CATE_DETL_NM;
					}
					return html;
				}
			},{ 
				data:"ITEM_NM",
				defaultContent: ""
			},{ 
				data:"ITEM_TYPE",
				defaultContent: "",
				orderable:false,
		    	render:function(data, type, row, meta){
		    		var html = '';
		    		
		    		if(typeof row === 'undefined' || type === 'type'){
		    			return false;
		    		}
		    		
		    		
//		    		팝업여부	
		    		if(row.POPUP_YN === 'Y'){
		    			html = templetePopup(data, type, row, meta, dsTabCd.CODE);
		    			
//		    		팝업이 아니면 일반 렌더		
		    		}else{
		    			switch(data){
		    				case "TEX":
		    					html = templeteText( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    		}
		    		return html;
		    	}
					
			},{ 
				data:"CNT",
				defaultContent: "",
				"ordering": false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteTarget(data,type,row,meta);
					
					return html;
				}
			},{ 
				data:"INCLUDE_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteIncExc(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 
				//data:"BASE_DT_COLUMN",
				data:"BASE_DT_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteBaseDtYn(data,type,row,meta,dsTabCd.CODE);
					
					
					return html;
				}
			},{ 
				data:"FIRST_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteFirstYn(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 
				data:"DELETE_YN",
				defaultContent: "",
				render : function (data,type,row,meta){
					var html = '';
					
					html = templeteDeleteYn(data,type,row,meta);
					
					return html;
				}
			}
		],
		"columnDefs": [
		    { /*width: 40, */targets: [0],	orderable: false, className: 'dt-left'	 },
		    { /*width: 60, */targets: [1],	orderable: false, className: 'dt-left' },
		    { /*width: 80, */targets: [2],	orderable: bReOrder,  className: 'reorder'},
		    { /*width: 150,*/	targets: [3],	orderable: bReOrder,  className: 'reorder' },
		    { /*width: 250,*/	targets: [4],	orderable: bReOrder,  className: 'reorder' },
		    { /*width: 300,*/	targets: [5],	orderable: false  },
		    { /*width: 120,*/	targets: [6],	orderable: false  },
		    { /*width: 80, */targets: [7],	orderable: false  },
		    { /*width: 40, */targets: [8],	orderable: false  },
		    { /*width: 40, */targets: [9],	orderable: false  },
		    { /*width: 40, */targets: [10],	orderable: false  }
		],
		rowCallback: function ( row, data ) {
			
			
        }
	});
	
	table.on('row-reorder.dt', function ( e, diff, nodes ) {
		//console.log("---------------------------");
		//console.log(diff.length);
		
		
		var endNodes = $.unique(table.rows( { page: 'current' } ).nodes().toArray() );
		var dsList = [];
		
		for(var i=0; i < endNodes.length; i++){
			var dsItemMgmt = {};
			var node = endNodes[i];
			var cell9 = node.cells[9];
			
			dsItemMgmt = table.row(endNodes[i]._DT_RowIndex).data();
			
			$(node).find("td select,input").each(function (){
				var cellData = this.value;
				
				if( this.name.indexOf('txtGRP') >= 0){
					dsItemMgmt.GR_LV = cellData;
				}
				
				if( this.name.indexOf('selCODE') >= 0 || this.name.indexOf('selNUM_LIST') >= 0 || this.name.indexOf('selTEX_LIST') >= 0 ){
					dsItemMgmt.INPUT_VAL0 = cellData;
					
				}
				
				if( this.name.indexOf('txtNUM1') >= 0 || 
					this.name.indexOf('txtTEX1') >= 0 || 
					this.name.indexOf('calFROM_DT') >= 0 || 
					this.name.indexOf('POPUP_VAL') >= 0)
				{
					dsItemMgmt.INPUT_VAL1 = nvl(cellData,' ');
				}
				
				if( this.name.indexOf('txtNUM2') >= 0 ||
					this.name.indexOf('txtTEX2') >= 0 || 
					this.name.indexOf('calTO_DT') >= 0){
					dsItemMgmt.INPUT_VAL2 = cellData;
				}
				
				if(this.name.indexOf('txtCNT') >= 0){
					dsItemMgmt.CNT = cellData;
				}
				
				if(this.name.indexOf('INCEXC') >= 0){
					dsItemMgmt.INC_EXC = cellData;
				}
				
				if(this.name.indexOf('ANDOR') >= 0){
					dsItemMgmt.AND_OR = cellData;
				}
				
				if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
					if($(this).prop('checked')){
						dsItemMgmt.BASE_DT_YN = cellData;
						
					}else{
						dsItemMgmt.BASE_DT_YN = 'N';
					}
					
				}
				
				if(this.name.indexOf('FIRST_YN') >= 0){
					if($(this).prop('checked')){
						dsItemMgmt.FIRST_YN = cellData;
						
					}else{
						dsItemMgmt.FIRST_YN = 'N';
					}
				}
			});
			
			dsList.push(dsItemMgmt);
		}
		
	//	reorder행이 있으면 	
		if(diff.length > 0){
			table.rows().remove().draw();
			table.rows.add(dsList).draw();
			
			$(tableId).groupInit();	
		}
		
	});
	
}

function 조회조건_getData(){};

/**
 * 조회조건 데이터
 * @returns
 */
$.fn.getData = function()
{
	var dsItemMgmtList = [];
	var table = $(this).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var dsItem = {};
		
		var data = this.data();
		var node = this.node();
		
		dsItem.SEQ 				= nvl(data.CONT_DTL_SEQ,'');
		dsItem.CONT_SEQ 		= nvl(data.CONT_SEQ,'');
		dsItem.ITEM_SEQ 		= data.ITEM_SEQ;
		
		dsItem.SCHEMA 			= data.SCHEMA;
		dsItem.TABLE 			= data.TABLE;
		dsItem.TABLE_COMMENT	= data.TABLE_COMMENT;
		dsItem.COLUMN 			= data.COLUMN;
		dsItem.COLUMN_COMMENT	= data.COLUMN_COMMENT;
		dsItem.ITEM_TYPE 		= data.ITEM_TYPE;
		dsItem.POPUP_YN			= data.POPUP_YN;
		dsItem.POPUP_PROGRAM_ID	= data.POPUP_PROGRAM_ID;
		dsItem.BASE_DT_COLUMN 	= data.BASE_DT_COLUMN;
		dsItem.BASE_DT_DATA_TYPE 	= data.BASE_DT_DATA_TYPE;
		
		dsItem.PER_CODE 		= $.session.get('PER_CODE');
		dsItem.ORDER 			= rowIdx + 1;
		dsItem.INSTCD			= nvl($.session.get('INSTCD'),'');
		
		dsItem.TAB_CD 			= 'C';
		
		$(node).find("td select,input").each(function (){
			var cellData = this.value;
			//txtGRP_C_1
			if( this.name.indexOf('txtGRP') >= 0){
				dsItem.GR_LV = cellData;
			}

		//chkIsRegExp
			if(this.name.indexOf('chkIsRegExp') >= 0){
				if($(this).prop('checked')){
					dsItem.CHK_IS_REGEXP = 'Y';
				}else{
					dsItem.CHK_IS_REGEXP = 'N';
				}
			}

		//	BLANK
			if(this.name.indexOf('chkIsNullOrBlank') >= 0){
				if($(this).prop('checked')){
					dsItem.IS_NULL_OR_BLANK = 'Y';
				}else{
					dsItem.IS_NULL_OR_BLANK = 'N';
				}
			}
			
			if( this.name.indexOf('selCODE') >= 0 || this.name.indexOf('selNUM_LIST') >= 0 || this.name.indexOf('selTEX_LIST') >= 0){
				dsItem.INPUT_VAL0 = cellData;
				
			}else if(this.name.indexOf('chkIsRegExp') >= 0){
				if($(this).prop('checked')){
					dsItem.INPUT_VAL0 = 'Y';
				}else{
					dsItem.INPUT_VAL0 = 'N';
				}
			}
			
			if( this.name.indexOf('txtNUM1') >= 0 || this.name.indexOf('txtTEX1') >= 0 || this.name.indexOf('calFROM_DT') >= 0 ||this.name.indexOf('POPUP_VAL_C') >= 0){
				dsItem.INPUT_VAL1 = cellData;
			}
			
			if( this.name.indexOf('txtNUM2') >= 0 || this.name.indexOf('txtTEX2') >= 0 || this.name.indexOf('calTO_DT') >= 0){
				dsItem.INPUT_VAL2 = cellData;
			}
			
			if(this.name.indexOf('txtCNT') >= 0){
				dsItem.CNT = cellData;
			}
			
			if(this.name.indexOf('INCEXC') >= 0){
				dsItem.INC_EXC = cellData;
			}
			
			if(this.name.indexOf('ANDOR') >= 0){
				dsItem.AND_OR = cellData;
			}
			
			if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
				if($('#BASE_DT_COLUMN_C_' + rowIdx).prop('checked')){
					dsItem.BASE_DT_YN = 'Y';
				}else{
					dsItem.BASE_DT_YN = 'N';
				}
			}
			
			
			if(this.name.indexOf('FIRST_YN') >= 0){
				if($(this).prop('checked')){
					dsItem.FIRST_YN = 'Y';
					
				}else{
					dsItem.FIRST_YN = 'N';
					
				}
			}
			
			
		});
		
		
		dsItem.AGG 			= 'first';
		dsItem.RANGE_CD 	= '';
		dsItem.RANGE_DN 	= '';
		dsItem.DELETE_YN 	= 'N';
		
//		display용
		//dsItemMgmt.ITEM_TYPE = data.ITEM_TYPE;
		dsItem.ITEM_CATE_NM = data.ITEM_CATE_NM;
		dsItem.ITEM_CATE_DETL_NM = data.ITEM_CATE_DETL_NM;
		dsItem.ITEM_NM = data.ITEM_NM;
		dsItem.DATA_TYPE = data.DATA_TYPE;
		dsItem.CODE_SET = data.CODE_SET;
		dsItem.CODE_TYPE = data.CODE_TYPE;
		dsItem.INSTCD_YN = data.INSTCD_YN;
		
		
	//	코호트조회조건
		if( data.TABLE === 'COHORT' && (data.COLUMN === 'RSCH_TERM' || data.COLUMN === 'RGST_TERM')){
			dsItem.GR_LV = '0';
			dsItem.POPUP_YN = 'N';
			dsItem.POPUP_PROGRAM_ID = '';
			dsItem.CNT = 0;
			dsItem.AGG = 'N';
			dsItem.INC_EXC = 'N';
			dsItem.AND_OR = 'N';
			dsItem.FIRST_YN = 'N';
			dsItem.BASE_DT_YN = 'N';
			dsItem.RANGE_CD = 'N';
			dsItem.RANGE_CD = '0';
			
		}
		
		dsItemMgmtList.push(dsItem);
	});
	
	return dsItemMgmtList;
}


function 반복데이터_관리_setGrid(){};

/**
 * 단면연구 주기 (반복데이터 관리)
 */
$.fn.setGridPeriod = function()
{
	if($.fn.dataTable.isDataTable($(this))){
		return;
	}
	
	var dsTabCd = gvTabCd.P;
	
	
	$(this).DataTable({
		searching:false,
		ordering: false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		thema:'bootstrap',
		fixedHeader: true,
		autowidth:false,
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    data: null,
	    orderable:false,
	   
		columns: [
			{ 
				data:"AND_OR",
				defaultContent: "",
				orderable:false
			},{ 	
				data:"ITEM_CATE_NM",
				defaultContent: ""			
			},{ 	
				data:"ITEM_CATE_DETL_NM",
				defaultContent: "" 		
			},{ 
				data:"ITEM_NM",
				defaultContent: ""
			},{ 
				data:"INPUT_VAL1",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					var id = "'txtPeriodFrom_"+gvActiveTab+"_"+meta.row+"'";
					
					html += '<div class="col-lg-10" style="padding-top:4px; padding-bottom:4px;">';
						html += '<div class="input-group date">';
							html += '<div class="input-group-addon">';
								html += '<i class="fa fa-calendar calendar" onclick="javascript:showDatePicker(this,'+id+')"></i>';
							html += '</div>';
							
							html += '<input class="form-control pull-right font-size-12 maskDateInput"';
							html += ' type="text" ';
							html += ' name="calPeriodFrom" ';
							html += ' value="'+nvl(row.INPUT_VAL1,gvDate)+'"';
							html += ' id="txtPeriodFrom_' + gvActiveTab + '_' + meta.row + '">';
						html += '</div>';								
					html += '</div>';									
					
					return html;
				}
				
			},{ 
				data:"INPUT_VAL2",
				defaultContent: "",
				render : function(data,type,row,meta){

					var id = "'txtPeriodTo_"+gvActiveTab+"_"+meta.row+"'";
					
					var html = '';
					
	    			
    				html += '<div class="col-lg-10" style="padding-top:4px; padding-bottom:4px;">';
						html += '<div class="input-group date">';
							html += '<div class="input-group-addon">';
								html += '<i class="fa fa-calendar" onclick="javascript:showDatePicker(this,'+id+')"></i>';
							html += '</div>';
							
							html += '<input class="form-control pull-right font-size-12 maskDateInput"';
							html += ' type="text" ';
							html += ' name="calPeriodTo" ';
							html += ' value="'+nvl(row.INPUT_VAL2,gvDate)+'"';
							html += ' id="txtPeriodTo_' + gvActiveTab + '_' + meta.row+'"> ';
						html += '</div>';							
    				html += '</div>';	
    				
	    			return html;
				}
			},{ 
				data:"DELETE_YN",
				defaultContent: "",
				render : function (data,type,row,meta){
					var html = '';
					
					html = templeteDeleteYn(data,type,row,meta);
					
					return html;
				}
			}
		],
		"columnDefs": [
			{ /*width: 60,*/ targets: [0] },
		    { /*width: 80,*/ targets: [1] },
		    { /*width: 250,*/ targets: [2] },
		    { 
		    	/*width: 300,*/
		    	targets: [3] 
		    },
		    { /*width: 150,*/ targets: [4,5] },
		    { /*width: 40,*/ targets: [6] }
		]
	});
	
}

function 반복데이터_관리_getGrid(){};
/**
 * 단면연구 주기반복 데이터
 */
$.fn.getGridPeriod = function()
{
	var dsPeriodList = [];
	
	var table = $(this).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		var dsPeriod = {};
		
		dsPeriod.SEQ 			= nvl(data.CONT_DTL_SEQ,'');
		dsPeriod.CONT_SEQ 		= nvl(data.CONT_SEQ,'');
		dsPeriod.ITEM_SEQ 		= data.ITEM_SEQ;
		
		dsPeriod.ITEM_CATE_NM = data.ITEM_CATE_NM;
		dsPeriod.ITEM_CATE_DETL_NM = data.ITEM_CATE_DETL_NM;
		dsPeriod.ITEM_NM = data.ITEM_NM;
		
		dsPeriod.SCHEMA 		= data.SCHEMA;
		dsPeriod.TABLE 			= data.TABLE;
		dsPeriod.TABLE_COMMENT 			= data.TABLE_COMMENT;
		dsPeriod.COLUMN 		= data.COLUMN;
		dsPeriod.COLUMN_COMMENT	= data.COLUMN_COMMENT;
		dsPeriod.ITEM_TYPE 	= data.ITEM_TYPE;
		dsPeriod.POPUP_YN	= data.POPUP_YN;
		dsPeriod.BASE_DT_COLUMN = data.BASE_DT_COLUMN;
		dsPeriod.PER_CODE = $.session.get('PER_CODE');
		dsPeriod.ORDER = rowIdx + 1;
		dsPeriod.TAB_CD = 'P';
		dsPeriod.GR_LV = '0';
		dsPeriod.INPUT_VAL0 = 'BETWEEN';
		
		$(node).find("td select,input").each(function (){
			var cellData = this.value;
			
			if( this.name.indexOf('calPeriodFrom') >= 0){
				dsPeriod.INPUT_VAL1 = cellData;
			}
			
			if(this.name.indexOf('calPeriodTo') >= 0){
				dsPeriod.INPUT_VAL2 = cellData;
				
			}
		});
		
		
		dsPeriod.INC_EXC = '';
		dsPeriod.AND_OR = data.AND_OR;
		dsPeriod.AGG = '';
		dsPeriod.RANGE_CD = '';
		dsPeriod.RANGE_DN = '';
		dsPeriod.BASE_DT_YN = 'N';
		dsPeriod.FIRST_YN = 'N';
		dsPeriod.DELETE_YN = 'N';
		
		
		dsPeriodList.push(dsPeriod);
		
	});
	
	return dsPeriodList;
	
}


function 연구항목_setGrid(){};

/**
 * 연구항목 그리드 설정
 */
$.fn.setGridStudyItem = function()
{
	
	if($.fn.dataTable.isDataTable($(this))){
		return;
	}
	
	var tableId = this.selector;	
	var dsTabCd = gvTabCd.R;
	
	var reOrderTd = 'td:nth-child(2),td:nth-child(3),td:nth-child(4)';
		
	var table = $(this).DataTable({
		searching:false,
		ordering: false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		ordering: false,
		thema:'bootstrap',
		fixedHeader: true,
		autowidth:false,
		rowReorder:{
			selector: reOrderTd,
			update:true
		},
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    data: null,
	    bRetrieve: true,
	    drawCallback:function(settings){
	    	//makeStudyNum('N');
	    },
		columns: [
			{ 
				data:"SEQ",
				defaultContent: "",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteGroup(data,type,row,meta,dsTabCd.CODE);
					
					return html;
					
				}
			},{ 	
				data:"ITEM_CATE_NM",
				defaultContent: ""			
			},{ 	
				data:"ITEM_CATE_DETL_NM",
				defaultContent: "" 		
			},{ 
				data:"ITEM_NM",
				defaultContent: ""
			},{ 
				data:"ITEM_TYPE",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = '';
					var idx = meta.row + 1;
					
					if(row.GR_LV == 0){
						html += '<span class="studyNum">';
							html += '<input type="text" class="form-control input_text" ';
							html += 'id="txtITEM_TEXT_'+idx+'" ';
							html += 'name="txtITEM_TEXT" ';
							
							if(isNull(row.ITEM_TEXT)){
								html += 'value="연구항목'+idx+'">';
								
							}else{
								html += 'value="'+row.ITEM_TEXT+'">';
								
							}
							
							
						html += '</span>';
						html += '<input type="'+hidden+'" class="form-control input_text margin-left-10" style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
						
					}else{
						var minGrpIdx = $(tableId).getMinGrpIdx(row.GR_LV);
						
						if( meta.row == minGrpIdx){
							html += '<span class="studyNum">';
								html += '<input type="text" class="form-control input_text" ';
								html += 'id="txtITEM_TEXT_'+idx+'" ';
								html += 'name="txtITEM_TEXT" ';
								
								if(isNull(row.ITEM_TEXT)){
									html += 'value="연구항목'+idx+'">';
									
								}else{
									html += 'value="'+row.ITEM_TEXT+'">';
									
								}
							html += '</span>';
							html += '<input type="'+hidden+'" class="form-control input_text margin-left-10" style="width:50;" name="txtITEM_TYPE" value="STUDY_ITEM">';
							
							return html;
						}
						
			    		
						//팝업렌더	
			    		if(row.POPUP_YN === 'Y'){
			    			html = templetePopup(data, type, row, meta, dsTabCd.CODE);
			    			
			    		//팝업이 아니면 일반 렌더		
			    		}else{
			    			switch(data){
			    				case "TEX":
			    					html = templeteText( data, type, row, meta, dsTabCd.CODE);
			    					break;
			    					
			    				case "NUM":
			    					html = templeteNumber( data, type, row, meta, dsTabCd.CODE);
			    					break;
			    					
			    				case "COD":
			    					html = templeteCode( data, type, row, meta, dsTabCd.CODE);
			    					break;
			    			
			    				case "DAT":
			    					html = templeteDate( data, type, row, meta, dsTabCd.CODE);
			    					
			    					break;
			    					
			    				default:
			    					break;
			    			}
			    		}
					}
					
		    		return html;
				}
			},{ 
				data:"RANGE_CD",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = '';
					
					if(isNull(row.BASE_DT_COLUMN)){
						return html;
						
					}
					
					
				//	단면연구/사례대조 연구항목	
					if(gvMethCd === 'CS' || gvMethCd === 'CC'){
						var firstrow = $('#gridStudyItem').getMinGrpIdx(row.GR_LV);
						
						if(row.GR_LV != "0" && firstrow != meta.row){
							html = '';
							
						}else{
							html = '<select style="float:left;margin-right:5px;" ';
							html += 'name="selRANGE_CD" ';
							html += 'id="" ';
							html += 'class="default-select4 form-control input-sm selRANGE_CD">';
							
							console.log(gvRangeCdList)
							
							for(var i=0; i < gvRangeCdList.length; i++){
								
								if(row.RANGE_CD === gvRangeCdList[i].VALUE){
									html += '<option value="'+gvRangeCdList[i].VALUE+'" selected>';
									html += gvRangeCdList[i].TEXT;
									html += '</option>';
								}else{
									html += '<option value="'+gvRangeCdList[i].VALUE+'">';
									html += gvRangeCdList[i].TEXT;
									html += '</option>';
								}
							}
							
							html += '</select>';
							
							//범위R, 당일이전P, 당일이후A --경북대
							if(row.RANGE_CD === 'R' || row.RANGE_CD === 'P' || row.RANGE_CD === 'A'){
								html += '<div class="divRANGE_CD" style="">';
								html += '<input type="text" name="txtRANGE_DN" class="form-control input-text" ';
								html += 'style="float:left;width:30%;height:34px;" ';
								html += 'value="'+row.RANGE_DN+'" ';
								html += 'onkeyup="this.value=number_filter(this.value);" ';
								html += '>';
								html += '일';
								html += '</div>';
							}
						}
						
						
					}else if(gvMethCd === 'CH'){
						var firstrow = $('#gridStudyItem').getMinGrpIdx(row.GR_LV);
						
						if(row.GR_LV != "0" && firstrow != meta.row){
							html = '';
							
						}else{
							html = '<select style="margin-right:5px;margin-bottom:1px;float:left;" ';
							html += 'name="selAGG_CD" ';
							html += 'id="" ';
							html += 'onchange="javascript:changeAgg(this,'+meta.row+');"" ';
							html += 'class="default-select4 form-control input-sm selAGG_CD">';
							
							for(var i=0; i < gvAggCdList.length; i++){
								if(gvAggCdList[i].VALUE === row.AGG){
									html += '<option value="'+gvAggCdList[i].VALUE+'" selected>';
									html += gvAggCdList[i].TEXT;
									html += '</option>';
								}else{
									/*html += '<option value="'+gvAggCdList[i].VALUE+'">';
									html += gvAggCdList[i].TEXT;
									html += '</option>';*/
									
									
									if(row.ITEM_TYPE === 'DAT' || row.ITEM_TYPE === 'NUM'){
										html += '<option value="'+gvAggCdList[i].VALUE+'">';
										html += gvAggCdList[i].TEXT;
										html += '</option>';
										
									}else{
										if( gvAggCdList[i].VALUE === 'MIN' || gvAggCdList[i].VALUE === 'MAX' || 
											gvAggCdList[i].VALUE === 'AVG' || gvAggCdList[i].VALUE === 'SUM' ){
											continue;
										}
										
										html += '<option value="'+gvAggCdList[i].VALUE+'">';
										html += gvAggCdList[i].TEXT;
										html += '</option>';
									}
								}
							}
							
							html += '</select>';	
							
							//범위R, 당일이전P, 당일이후A --경북대
							if(row.AGG === 'R' || row.AGG === 'P' || row.AGG === 'A'){
								html += '<div class="divRANGE_CD" style="">';
								html += '<input type="text" name="txtRANGE_DN" class="form-control input-text" ';
								html += 'style="float:left;width:30%;height:34px;" ';
								html += 'value="'+row.RANGE_DN+'" ';
								html += 'onkeyup="this.value=number_filter(this.value);" ';
								html += '>';
								html += '일';
								html += '</div>';
							}
							
						//	주기편차	
							var display = 'none';
							
							if(row.AGG === 'PER'){
								display = 'inline-block';
							}
							print_bigcenmed(display+"2");
							html += '<div id="divPeriodWrap_'+meta.row+'" style="display:'+display+';">';
								html += '<select id="selRANGE_CD_'+meta.row+'" name="selRANGE_CD" ';
								html += 'style="margin-left:5px;margin-right:5px;float:left;" ';
								html += 'class="default-select4 form-control input-sm selAGG_CD"';
								html += '>';
									for(var i=0; i < gvDeviationCdList.length; i++){
										if(row.RANGE_CD === gvDeviationCdList[i].VALUE){
											html += '<option value="'+gvDeviationCdList[i].VALUE+'" selected>';	
										}else{
											html += '<option value="'+gvDeviationCdList[i].VALUE+'">';
										}
										
										html += gvDeviationCdList[i].TEXT;
										html += '</option>';
										
									}
								html += '</select>';
								
								html += '<span></span>';
								
								html += '<input type="text" name="txtRANGE_DN" id="txtRANGE_DN_'+meta.row+'" ';
								html += 'value="'+nvl(row.RANGE_DN,'')+'" class="form-control width-150" ';
								html += 'onkeyup="this.value=number_period_filter(this.value, this);" ';
								html += '> ';
								html += '&nbsp;일';
							html += '</div>';
						}
					}
					return html;
				}
			},{ 
				data:"DELETE_YN",
				defaultContent: "",
				render : function (data,type,row,meta){
					var html = '';
					//html = '<span class="edit_delete" style="cursor:pointer"><i class="fa fa-trash"></i></span>';
					html = templeteDeleteYn(data,type,row,meta);
					
					return html;
				}
			}
		],
		"columnDefs": [
		    { /*width: 60,*/ targets: [0] },
		    { /*width: 80,*/ targets: [1] ,orderable: true,  className: 'reorder'},
		    { /*width: 80,*/ targets: [2] ,orderable: true,  className: 'reorder'},    
		    { /*width: 200,*/ 	targets: [3] ,orderable: true,  className: 'reorder'},  
		    { 
		    	targets: [4]
		    	/*,width: 300*/
		    }
		]
	});
	

//	연구항목 RowReorder	
	table.on('row-reorder.dt', function ( e, diff, nodes ) {
		var endNodes = $.unique(table.rows( { page: 'current' } ).nodes().toArray() );
		var dsList = [];
		
		//190624 김지훈 그룹초기화
		var cellHtml = [];
		
		for(var i=0; i < endNodes.length; i++){
			var dsItemMgmt = {};
			var node = endNodes[i];
			var cell9 = node.cells[9];
			
			dsItemMgmt = table.row(endNodes[i]._DT_RowIndex).data();
			
			$(node).find("td select,input").each(function (){
				if(this.name.indexOf('txtGRP') >= 0){
					dsItemMgmt.GR_LV = this.value;
					
					if(isNullOrEmpty($(this).parent().children('span')) ){
						cellHtml.push('');
					}
					else{
						cellHtml.push($(this).parent().children('span').html());
					}
				}
				
				if( this.name.indexOf('selAGG') >= 0){
					dsItemMgmt.AGG = this.value;
				}
				
				if( this.name.indexOf('selRANGE_CD') >= 0){
					dsItemMgmt.RANGE_CD = this.value;
				}
				
				if(this.name.indexOf('txtRANGE_DN') >= 0){
					dsItemMgmt.RANGE_DN = this.value;
				}
				
				if( this.name.indexOf('selCODE') >= 0 || 
					this.name.indexOf('selNUM_LIST') >= 0 || 
					this.name.indexOf('selTEX_LIST') >= 0 )
				{
					dsItemMgmt.INPUT_VAL0 = this.value;
				}
				
				if( this.name.indexOf('txtNUM1') >= 0 || 
					this.name.indexOf('txtTEX') >= 0 || 
					this.name.indexOf('calFROM_DT') >= 0 || 
					this.name.indexOf('POPUP_VAL') >= 0)
				{
					dsItemMgmt.INPUT_VAL1 = nvl(this.value,' ');
				}
				
				if( this.name.indexOf('txtNUM2') >= 0|| this.name.indexOf('calTO_DT') >= 0){
					dsItemMgmt.INPUT_VAL2 = this.value;
				}
				
				
				if(this.name.indexOf('txtITEM_TYPE') >= 0){
					dsItemMgmt.ITEM_TYPE_GUBUN = this.value;
				}
				
				if(this.name.indexOf('txtITEM_TEXT') >= 0){
					dsItemMgmt.ITEM_TEXT = this.value;
					
				}
			});
			
			dsList.push(dsItemMgmt);
		}
		
		if(diff.length > 0){
			var diffLength = diff.length-1;
			
			var nData = 0;
			var oData = 0;
			
			table.rows().remove().draw();
			table.rows.add(dsList).draw();
			//$(tableId).groupInit();	
			//190624 김지훈 그룹초기화
			$(tableId).groupMove(cellHtml,nData,oData, diff);
		}
		
	});
}


function 연구항목_getGrid(){};


$.fn.getGridStudyItem = function()
{
	var dsList = [];
	var table = $(this).DataTable();
	
	var table2 = $('#gridSearch_02').DataTable();
	var table2_cnt = table.rows().count();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		var dsItem = {};

		dsItem.SEQ 				= nvl(data.CONT_DTL_SEQ,'');
		dsItem.CONT_SEQ 		= nvl(data.CONT_SEQ,'');
		dsItem.ITEM_SEQ 		= data.ITEM_SEQ;

		dsItem.SCHEMA 			= data.SCHEMA;
		dsItem.TABLE 			= data.TABLE;
		dsItem.TABLE_COMMENT 	= data.TABLE_COMMENT;
		dsItem.COLUMN 			= data.COLUMN;
		dsItem.COLUMN_COMMENT	= data.COLUMN_COMMENT;
		dsItem.ITEM_TYPE 		= data.ITEM_TYPE;
		dsItem.DATA_TYPE 		= data.DATA_TYPE;
		dsItem.POPUP_YN			= data.POPUP_YN;
		dsItem.POPUP_PROGRAM_ID	= data.POPUP_PROGRAM_ID;
		dsItem.BASE_DT_COLUMN 	= data.BASE_DT_COLUMN;
		dsItem.PER_CODE 		= $.session.get('PER_CODE');
		dsItem.ORDER 			= rowIdx + 1;
		dsItem.TAB_CD 			= 'R';
		dsItem.GR_LV 			= '0';
		dsItem.INPUT_VAL0 		= '';
		dsItem.INPUT_VAL1	 	= '';
		dsItem.INPUT_VAL2 		= '';
		dsItem.INC_EXC 			= 'INC';
		dsItem.AND_OR = '';
		dsItem.BASE_DT_YN = 'N';
		dsItem.FIRST_YN = 'N';
		dsItem.DELETE_YN = 'N';
		dsItem.CODE_SET = data.CODE_SET;
		dsItem.CODE_TYPE = data.CODE_TYPE;
		dsItem.INSTCD_YN = data.INSTCD_YN;
		dsItem.INSTCD			= nvl($.session.get('INSTCD'),'');
		dsItem.BASE_DT_DATA_TYPE 	= data.BASE_DT_DATA_TYPE;

		$(node).find("td select,input").each(function (){
			var cellData = this.value;
			
			if( this.name.indexOf('selAGG') >= 0){
				dsItem.AGG = this.value;
			}
			
			if( this.name.indexOf('selRANGE_CD') >= 0){
				dsItem.RANGE_CD = this.value;
			}
			
			if(this.name.indexOf('txtRANGE_DN') >= 0){
				dsItem.RANGE_DN = this.value;
			}
			
			if(this.name.indexOf('txtGRP') >= 0){
				dsItem.GR_LV = this.value;
			}
			
			if( this.name.indexOf('selCODE') >= 0 || this.name.indexOf('selNUM_LIST') >= 0 || this.name.indexOf('selTEX_LIST') >= 0 ){
				dsItem.INPUT_VAL0 = cellData;
			}
			
			if( this.name.indexOf('txtNUM1') >= 0 || this.name.indexOf('txtTEX1') >= 0 || this.name.indexOf('calFROM_DT') >= 0 || this.name.indexOf('POPUP_VAL') >= 0)
			{
				dsItem.INPUT_VAL1 = nvl(cellData,' ');
			}
			
			if( this.name.indexOf('txtNUM2') >= 0||this.name.indexOf('txtTEX2') >= 0|| this.name.indexOf('calTO_DT') >= 0){
				dsItem.INPUT_VAL2 = nvl(cellData,' ');
			}
			
			
			if(this.name.indexOf('txtITEM_TYPE') >= 0){
				dsItem.ITEM_TYPE_GUBUN = cellData;
				
			}
			
			if(this.name.indexOf('txtITEM_TEXT') >= 0){
				dsItem.ITEM_TEXT = cellData;
				
			}
			

		//	IS BLANK
			if(this.name.indexOf('chkIsNullOrBlank') >= 0){
				if($(this).prop('checked')){
					dsItem.IS_NULL_OR_BLANK = 'Y';
				}else{
					dsItem.IS_NULL_OR_BLANK = 'N';
				}
			}

		});

		dsList.push(dsItem);
		
	});
	
	
	print_bigcenmed(dsList)
	
	return dsList;
	
	
}




function 생존분석_setGrid(){};

/**
 * 생존분석 테이블 설정
 */
$.fn.setGridSurvivalAnalysis = function()
{
	if($.fn.dataTable.isDataTable($(this))){
		return;
	}
	
	var tableId = this.selector;
	
	var dsTabCd = gvTabCd.RE;
	
	if(tableId === '#gridEventList'){
		dsTabCd = gvTabCd.RE;
		
	}else if(tableId === '#gridCensoredDataList'){
		dsTabCd = gvTabCd.RQ;
	}
	
	var table = $(this).DataTable({
		searching:false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		thema:'bootstrap',
		ordering: false,
		fixedHeader: true,
		autowidth:false,
		rowReorder:{
			selector:'td:nth-child(2),td:nth-child(3),td:nth-child(4)',
			update:true
		},
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    data: null,
		columns: [
			{ 
				data:"GR_LV",
				defaultContent: "",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteGroup(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 
				data:"ANDOR_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					if(meta.row == 0){
						return html;
					}
					
					
					html = templeteAndOr(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 	
				data:"ITEM_CATE_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
						html = '연구';
					}else{
						html = row.ITEM_CATE_NM;
					}
					
					return html;
				}
				
			},{ 	
				data:"ITEM_CATE_DETL_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					if(row.COLUMN === 'RGST_TERM' || row.COLUMN === 'RSCH_TERM'){
						html = row.TABLE_COMMENT;
					}else{
						html = row.ITEM_CATE_DETL_NM;
					}
					return html;
				}
			},{ 
				data:"ITEM_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					console.log(row);
					var html = '';
					var data_type = '';
					var ITEM_TYPE = row['ITEM_TYPE'];
					
					if(ITEM_TYPE == "TEX"){
						data_type = ' <br/><img src="../../images/TEX.png" width="16" height="16">';
					}else if(ITEM_TYPE == "NUM"){
						data_type = ' <br/><img src="../../images/NUM.png" width="16" height="16">';
					}
					
					html = data + data_type;
					
					return html;
				}
			},{ 
				data:"ITEM_TYPE",
				defaultContent: "",
				orderable:false,
		    	render:function(data, type, row, meta){
		    		var html = '';
		    		
		    		if(typeof row === 'undefined' || type === 'type'){
		    			return false;
		    		}
		    		
		    		
//		    		팝업여부	
		    		if(row.POPUP_YN === 'Y'){
		    			html = html = templetePopup(data, type, row, meta, dsTabCd.CODE);
		    			
//		    		팝업이 아니면 일반 렌더		
		    		}else{
		    			switch(data){
			    			case "TEX":
		    					html = templeteText( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    			
		    		}
		    		return html;
		    	}
					
			},{ 
				data:"DELETE_YN",
				defaultContent: "",
				render : function (data,type,row,meta){
					var html = '';
					html =templeteDeleteYn(data,type,row,meta);
					return html;
				}
			}
		],
		"columnDefs": [
		    { /*width: 60,*/ 	targets: [0] },	 /* 그룹 */
		    { /*width: 80,*/ 	targets: [1] },  /* And/or */
		    { /*width: 80,*/ 	targets: [2] ,orderable: true,  className: 'reorder'},  /* 대분류 */
		    { /*width: 200,*/ 	targets: [3] ,orderable: true,  className: 'reorder'},  /* 중분류 */
		    { /*width: 250,*/ 	targets: [4] ,orderable: true,  className: 'reorder'},  /* 항목명 */
		    { /*width: 300,*/ 	targets: [5] },  /* 조건 */
		    { /*width: 60,*/ 	targets: [6] }
		]
	});
	


//	RowReorder	
	table.on('row-reorder.dt', function ( e, diff, nodes ) {
		var endNodes = $.unique(table.rows( { page: 'current' } ).nodes().toArray() );
		var dsList = [];
		
		//190710  김지훈 그룹초기화
		var cellHtml = [];
		
		for(var i=0; i < endNodes.length; i++){
			var dsItemMgmt = {};
			var node = endNodes[i];
			var cell9 = node.cells[9];
			
			
			dsItemMgmt = table.row(endNodes[i]._DT_RowIndex).data();
			
			$(node).find("td select,input").each(function (){
				var cellData = this.value;
				
				if( this.name.indexOf('txtGRP') >= 0){
					dsItemMgmt.GR_LV = cellData;
					
					if(isNullOrEmpty($(this).parent().children('span')) ){
						cellHtml.push('');
					}
					else{
						cellHtml.push($(this).parent().children('span').html());
					}
				}
				
				if( this.name.indexOf('selCODE') >= 0 || 
					this.name.indexOf('selNUM_LIST') >= 0 || 
					this.name.indexOf('selTEX_LIST') >= 0 )
				{
					dsItemMgmt.INPUT_VAL0 = cellData;
				}
				
				
				if( this.name.indexOf('txtNUM1') >= 0 || 
					this.name.indexOf('txtTEX1') >= 0 || 
					this.name.indexOf('calFROM_DT') >= 0 || 
					this.name.indexOf('POPUP_VAL') >= 0)
				{
					dsItemMgmt.INPUT_VAL1 = nvl(cellData,' ');
				}
				
				
				if( this.name.indexOf('txtNUM2') >= 0 || 
					this.name.indexOf('txtTEX2') >= 0 || 
					this.name.indexOf('calTO_DT') >= 0)
				{
					dsItemMgmt.INPUT_VAL2 = nvl(cellData,' ');
				}
				
				if(this.name.indexOf('ANDOR') >= 0){
					dsItemMgmt.AND_OR = cellData;
					
				}
			});
			
			dsList.push(dsItemMgmt);
		}
		
		if(diff.length > 0){
			
			var diffLength = diff.length-1;
			
			var nData = 0;
			var oData = 0;
			
			table.rows().remove().draw();
			table.rows.add(dsList).draw();
			
			$(tableId).groupMove(cellHtml,nData,oData,diff);
		}
		
	});
}




function 생존분석_getGrid(){};

/**
 * 코호트연구-생존분석 사건정의, 데이터 get
 * @returns
 */


$.fn.getGridSurvivalAnalysis = function()
{
	
	var dsList 	= [];
	var element = this.selector;
	var table 	= $(this).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();

		var dsItem = {};
		
		dsItem.SEQ 				= nvl(data.ITEM_CONT_DETL_SEQ,'');
		dsItem.CONT_SEQ 		= nvl(data.ITEM_CONT_SEQ,'');
		dsItem.ITEM_SEQ 		= data.ITEM_SEQ;

		dsItem.SCHEMA 		= data.SCHEMA;
		dsItem.TABLE 		= data.TABLE;
		dsItem.TABLE_COMMENT 		= data.TABLE_COMMENT;
		dsItem.COLUMN 		= data.COLUMN;
		dsItem.COLUMN_COMMENT	= data.COLUMN_COMMENT;
		dsItem.ITEM_TYPE 	= data.ITEM_TYPE;
		dsItem.POPUP_YN		= data.POPUP_YN;
		dsItem.POPUP_PROGRAM_ID	= data.POPUP_PROGRAM_ID;
		dsItem.BASE_DT_COLUMN = data.BASE_DT_COLUMN;
		dsItem.PER_CODE 	= $.session.get('PER_CODE');
		dsItem.ORDER 		= rowIdx + 1;
		dsItem.GR_LV  		= '0';
		dsItem.INPUT_VAL0 	= 'between';
		dsItem.INPUT_VAL1 	= '0';
		dsItem.INPUT_VAL2 	= '0';
		dsItem.INC_EXC 		= 'INC';
		dsItem.AND_OR 		= '';
		dsItem.BASE_DT_YN 	= 'N';
		dsItem.FIRST_YN 	= 'N';
		dsItem.DELETE_YN 	= 'N';
		dsItem.ITEM_CATE_NM = data.ITEM_CATE_NM;
		dsItem.ITEM_CATE_DETL_NM = data.ITEM_CATE_DETL_NM;
		dsItem.ITEM_NM 		= data.ITEM_NM;
		dsItem.DATA_TYPE 	= data.DATA_TYPE;
		dsItem.CODE_SET 	= data.CODE_SET;
		dsItem.CODE_TYPE 	= data.CODE_TYPE;
		dsItem.INSTCD_YN 	= data.INSTCD_YN;
		dsItem.INSTCD		= nvl($.session.get('INSTCD'),'');
		dsItem.BASE_DT_DATA_TYPE 	= data.BASE_DT_DATA_TYPE;
		

		if(element.indexOf('gridEventList') >= 0){
			dsItem.TAB_CD = 'RE';
		}else{
			dsItem.TAB_CD = 'RQ';
		}

		$(node).find("td select,input").each(function (){
			var cellData = this.value;
			
			if( this.name.indexOf('txtGRP') >= 0){
				dsItem.GR_LV = cellData;
			}
			
			if( this.name.indexOf('selCODE') >= 0 || this.name.indexOf('selNUM_LIST') >= 0 || this.name.indexOf('selTEX_LIST') >= 0 ){
				dsItem.INPUT_VAL0 = cellData;
			}
			
			
			if( this.name.indexOf('txtNUM1') >= 0 || this.name.indexOf('txtTEX1') >= 0 || this.name.indexOf('calFROM_DT') >= 0 ||	this.name.indexOf('POPUP_VAL') >= 0){
				dsItem.INPUT_VAL1 = nvl(cellData,' ');
			}
			
			
			if( this.name.indexOf('txtNUM2') >= 0 || this.name.indexOf('txtTEX2') >= 0 || this.name.indexOf('calTO_DT') >= 0){
				dsItem.INPUT_VAL2 = nvl(cellData,' ');
			}
			
			if(this.name.indexOf('ANDOR') >= 0){
				dsItem.AND_OR = cellData;
				
			}
			

		//	IS BLANK
			if(this.name.indexOf('chkIsNullOrBlank') >= 0){
				if($(this).prop('checked')){
					dsItem.IS_NULL_OR_BLANK = 'Y';
				}else{
					dsItem.IS_NULL_OR_BLANK = 'N';
				}
			}
	
		});

		dsList.push(dsItem);
		
	});
	
	return dsList;
}




function 사례대조_setGrid(){};

/**
 * 조회조건 그리드 설정
 */
$.fn.setGridCaseControl = function()
{
	if($.fn.dataTable.isDataTable($(this))){
		return;
	}
	
	var tabCd = '';
	var element = this.selector;
	var dsTabCd = gvTabCd.CA;
	var bReOrder = false;
	var tableId = this.selector;
	
	
	if(element.indexOf('gridCaseGroup') >= 0){
		dsTabCd = gvTabCd.CA;
		bReOrder = true;
		
	}else{
		dsTabCd = gvTabCd.CO;
		bReOrder = false;
	}
	
	var table = $(this).DataTable({
		searching:false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		thema:'bootstrap',
		ordering: false,
		rowReorder:bReOrder,
		fixedHeader: true,
		autowidth:false,
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    data: null,
		columns: [
			{ 
				data:"GR_LV",
				defaultContent: "",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteGroup(data,type,row,meta,dsTabCd.CODE);
					
					return html;
					
				}
			},{ 
				data:"ANDOR_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					if(meta.row == 0){
						return html;
						
					}
					
					html = templeteAndOr(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 	
				data:"ITEM_CATE_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					html = row.ITEM_CATE_NM;
					
					return html;
				}
				
			},{ 	
				data:"ITEM_CATE_DETL_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					var html = "";
					
					html = row.ITEM_CATE_DETL_NM;
					
					return html;
				}
			},{ 
				data:"ITEM_NM",
				defaultContent: "",
				render:function(data, type, row, meta){
					console.log(row);
					var html = '';
					var data_type = '';
					var ITEM_TYPE = row['ITEM_TYPE'];
					
					if(ITEM_TYPE == "TEX"){
						data_type = ' <br/><img src="../../images/TEX.png" width="16" height="16">';
					}else if(ITEM_TYPE == "NUM"){
						data_type = ' <br/><img src="../../images/NUM.png" width="16" height="16">';
					}
					
					html = data + data_type;
					
					return html;
				}
			},{ 
				data:"ITEM_TYPE",
				defaultContent: "",
				orderable:false,
		    	render:function(data, type, row, meta){
		    		var html = '';
		    		
		    		if(typeof row === 'undefined' || type === 'type'){
		    			return false;
		    		}
		    		
		    		
//		    		팝업여부	
		    		if(row.POPUP_YN === 'Y'){
		    			html = templetePopup(data, type, row, meta, dsTabCd.CODE);
		    			
//		    		팝업이 아니면 일반 렌더		
		    		}else{
		    			switch(data){
			    			case "TEX":
		    					html = templeteText( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "NUM":
		    					html = templeteNumber( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				case "COD":
		    					html = templeteCode( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    			
		    				case "DAT":
		    					html = templeteDate( data, type, row, meta, dsTabCd.CODE);
		    					break;
		    					
		    				default:
		    					break;
		    			}
		    			
		    		}
		    		return html;
		    	}
					
			},{ 
				data:"TARGET",
				defaultContent: "",
				"ordering": false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteTarget_CC(element,data,type,row,meta);
					
					return html;
				}
			},{ 
				data:"INCLUDE_YN",
				defaultContent: "",
				render:function(data,type,row,meta){
					var html = '';
					
					html = templeteIncExc(data,type,row,meta,dsTabCd.CODE);
					
					return html;
				}
			},{ 
				data:"DELETE_YN",
				defaultContent: "",
				render : function (data,type,row,meta){
					var html = '-';
					
					if(element.indexOf("gridCaseGroup") >= 0){
						html = templeteDeleteYn(data,type,row,meta);
					}
					
					//
					
					return html;
				}
			}
		],
		"columnDefs": [
		    { /*width: 60,*/ 	targets: [0] ,orderable: false, className: 'dt-left'},	 /* 그룹 */
		    { /*width: 80,*/ 	targets: [1] ,orderable: false, className: 'dt-left'},  /* And/or */
		    { /*width: 80,*/ 	targets: [2] ,orderable: bReOrder,  className: 'reorder'},  /* 대분류 */
		    { /*width: 200,*/ 	targets: [3] ,orderable: bReOrder,  className: 'reorder'},  /* 중분류 */
		    { /*width: 250,*/ 	targets: [4] ,orderable: bReOrder,  className: 'reorder'},  /* 항목명 */
		    { /*width: 300,*/ 	targets: [5] ,orderable: false },  /* 조건 */
		    { /*width: 80,*/ 	targets: [6] ,orderable: false },    
		    { /*width: 80,*/ 	targets: [7] ,orderable: false },    
		    { /*width: 60,*/ 	targets: [8] ,orderable: false }
		],
		rowCallback: function ( row, data ) {
        }
	});
	
//	RowReorder	
	table.on('row-reorder.dt', function ( e, diff, nodes ) {
		var endNodes = $.unique(table.rows( { page: 'current' } ).nodes().toArray() );
		var dsList = [];
		
		//190710  김지훈 그룹초기화
		var cellHtml = [];
		
		for(var i=0; i < endNodes.length; i++){
			var dsItemMgmt = {};
			var node = endNodes[i];
			var cell9 = node.cells[9];
			
			dsItemMgmt = table.row(endNodes[i]._DT_RowIndex).data();
			
			$(node).find("td select,input").each(function (){
				var cellData = this.value;
				
				if( this.name.indexOf('txtGRP') >= 0){
					dsItemMgmt.GR_LV = cellData;
					
					if(isNullOrEmpty($(this).parent().children('span')) ){
						cellHtml.push('');
					}
					else{
						cellHtml.push($(this).parent().children('span').html());
					}
				}
				
				if( this.name.indexOf('selCODE') >= 0 || 
					this.name.indexOf('selNUM_LIST') >= 0 || 
					this.name.indexOf('selTEX_LIST') >= 0 )
				{
					dsItemMgmt.INPUT_VAL0 = cellData;
				}
				
				if( this.name.indexOf('txtNUM1') >= 0 || 
					this.name.indexOf('txtTEX1') >= 0 || 
					this.name.indexOf('calFROM_DT') >= 0 || 
					this.name.indexOf('POPUP_VAL') >= 0)
				{
					dsItemMgmt.INPUT_VAL1 = nvl(cellData,' ');
				}
				
				if( this.name.indexOf('txtNUM2') >= 0|| this.name.indexOf('txtTEX2') >= 0|| this.name.indexOf('calTO_DT') >= 0){
					dsItemMgmt.INPUT_VAL2 = nvl(cellData,' ');
				}
				
				
				if(this.name.indexOf('INCEXC') >= 0){
					dsItemMgmt.INC_EXC = cellData;
				}
				
				if(this.name.indexOf('ANDOR') >= 0){
					dsItemMgmt.AND_OR = cellData;
				}
				
				if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
					dsItemMgmt.BASE_DT_YN = this.value;
				}
				
				if(this.name.indexOf('FIRST_YN') >= 0){
					dsItemMgmt.FIRST_YN = this.value;
				}
				
				if(this.name.indexOf('CNT') >= 0){
					dsItemMgmt.CNT 	= this.value;
				}
			});
			
			dsList.push(dsItemMgmt);
		}
		
		
		if(diff.length > 0){
			
			var diffLength = diff.length-1;
			
			var nData = 0;
			var oData = 0;
			var table2 = $('#gridControlGroup_01').DataTable();
			
			
			table.rows().remove().draw();
			table.rows.add(dsList).draw();
			
			table2.rows().remove().draw();
			table2.rows.add(dsList).draw();
			//$(tableId).groupInit();	
			$(tableId).groupMove(cellHtml,nData,oData,diff);
			
			
			//table2.rows.add(dsList).draw();
			$('#gridControlGroup_01').groupMove(cellHtml,nData,oData,diff);
		}
		
		/*table.rows().remove().draw();
		table.rows.add(dsList).draw();
		
		
		var table2 = $('#gridControlGroup_01').DataTable();
		table2.rows().remove().draw();
		table2.rows.add(dsList).draw();
		
		$(this.selector).groupInit();
		$('#gridControlGroup_01').groupInit();*/
	});
	
	
	
}



function 사례대조_getData(){};

/**
 * 조회조건 데이터
 * @returns
 */
$.fn.getGridCaseControl = function()
{
	var dsList = [];
	var tableId = this.selector;
	var table = $(this).DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var dsItem = {};

		var data = this.data();
		var node = this.node();

		dsItem.SEQ 				= nvl(data.ITEM_CONT_DETL_SEQ,'');
		dsItem.CONT_SEQ 		= nvl(data.ITEM_CONT_SEQ,'');
		dsItem.ITEM_SEQ 		= data.ITEM_SEQ;

		dsItem.SCHEMA 			= data.SCHEMA;
		dsItem.TABLE 			= data.TABLE;
		dsItem.TABLE_COMMENT	= data.TABLE_COMMENT;
		dsItem.COLUMN 			= data.COLUMN;
		dsItem.COLUMN_COMMENT	= data.COLUMN_COMMENT;
		dsItem.ITEM_TYPE 		= data.ITEM_TYPE;
		dsItem.POPUP_YN			= data.POPUP_YN;
		dsItem.POPUP_PROGRAM_ID	= data.POPUP_PROGRAM_ID;
		dsItem.BASE_DT_COLUMN 	= data.BASE_DT_COLUMN;
		dsItem.PER_CODE 		= $.session.get('PER_CODE');
		dsItem.ORDER 			= rowIdx + 1;
		dsItem.INSTCD_YN 		= data.INSTCD_YN;
		dsItem.INSTCD			= nvl($.session.get('INSTCD'),'');
		dsItem.BASE_DT_DATA_TYPE 	= data.BASE_DT_DATA_TYPE;

		if(tableId.indexOf('gridCaseGroup') >= 0){
			dsItem.TAB_CD = 'CA';
			
		}else{
			dsItem.TAB_CD = 'CO';
			
		}


		$(node).find("td select,input").each(function (){
			var cellData = this.value;
			
			if( this.name.indexOf('txtGRP') >= 0){
				dsItem.GR_LV = cellData;
			}
			
			//chkIsRegExp
			if(this.name.indexOf('chkIsRegExp') >= 0){
				if($(this).prop('checked')){
					dsItem.CHK_IS_REGEXP = 'Y';
				}else{
					dsItem.CHK_IS_REGEXP = 'N';
				}
			}
			if( this.name.indexOf('selCODE') >= 0 || this.name.indexOf('selNUM_LIST') >= 0 || this.name.indexOf('selTEX_LIST') >= 0 ){
				dsItem.INPUT_VAL0 = cellData;
			}else if(this.name.indexOf('chkIsRegExp') >= 0){
				if($(this).prop('checked')){
					dsItem.INPUT_VAL0 = 'Y';
				}else{
					dsItem.INPUT_VAL0 = 'N';
				}
			}
			
			if( this.name.indexOf('txtNUM1') >= 0 || this.name.indexOf('txtTEX1') >= 0 || this.name.indexOf('calFROM_DT') >= 0 || this.name.indexOf('POPUP_VAL') >= 0){
				dsItem.INPUT_VAL1 = nvl(cellData,' ');
			}
			
			if( this.name.indexOf('txtNUM2') >= 0 || this.name.indexOf('txtTEX2') >= 0 || this.name.indexOf('calTO_DT') >= 0){
				dsItem.INPUT_VAL2 = nvl(cellData,' ');
			}
			
			
			if(this.name.indexOf('INCEXC') >= 0){
				dsItem.INC_EXC = cellData;
			}
			
			if(this.name.indexOf('ANDOR') >= 0){
				dsItem.AND_OR = cellData;
			}
			
			if(this.name.indexOf('BASE_DT_COLUMN') >= 0){
				dsItem.BASE_DT_YN = this.value;
			}
			
			if(this.name.indexOf('FIRST_YN') >= 0){
				dsItem.FIRST_YN = this.value;
			}
			
			if(this.name.indexOf('CNT') >= 0){
				dsItem.CNT 	= this.value;
			}
			
		//	IS BLANK
			if(this.name.indexOf('chkIsNullOrBlank') >= 0){
				if($(this).prop('checked')){
					dsItem.IS_NULL_OR_BLANK = 'Y';
				}else{
					dsItem.IS_NULL_OR_BLANK = 'N';
				}
			}
	
		});

		dsItem.BASE_DT_YN 	= '';
		dsItem.FIRST_YN 	= '';
		
		dsItem.AGG 			= 'first';
		dsItem.RANGE_CD 	= '';
		dsItem.RANGE_DN 	= '';
		dsItem.DELETE_YN 	= 'N';

	//	display용
		dsItem.ITEM_TYPE = data.ITEM_TYPE;
		dsItem.ITEM_CATE_NM = data.ITEM_CATE_NM;
		dsItem.ITEM_CATE_DETL_NM = data.ITEM_CATE_DETL_NM;
		dsItem.ITEM_NM = data.ITEM_NM;
		dsItem.DATA_TYPE = data.DATA_TYPE;
		dsItem.CODE_SET = data.CODE_SET;
		dsItem.CODE_TYPE = data.CODE_TYPE;
		


		dsList.push(dsItem);
	});
	
	return dsList;
}




/**
 * 데이터테이블 초기화
 */
$.fn.initGrid = function()
{
	var table = $(this).DataTable();
	
	table.rows().remove().draw();
}


/**
 * 데이터테이블의 레코드 카운트를 구한다.
 */
$.fn.getRowCount = function()
{
	var table = $(this).DataTable();
	return table.data().count();
}
