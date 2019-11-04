/**
 * ETL로그관리
 * @Page : etlLog.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var dataSet = {};
var dateVal;
var dateValSplit;

//전체기간용 타입
var myType = false;

var gvResult = {
		"dsEtlLogList": []
	};

var start = moment().subtract(7, 'days');
var end = moment();


/**
 * Application Ready
 */
$(document).ready(function(){
	setDatePicker();
	
	setGrid();
	
	initEvent();
	
	//getData();
	
	//메뉴고정
	menuFix('admin_log_etlLog');
	
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
function serviceCallback(svcId, result){
	switch(svcId){
		case "getData":
			console.log(JSON.stringify(result.dsEtlLogList.length));
			
			$('#gridEtlLogList').dataTable().fnClearTable();
			
			if(result.dsEtlLogList.length > 0){
				$('#gridEtlLogList').dataTable().fnAddData(result.dsEtlLogList);
			}
			
			break;
				
		default:
			break;
	
	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 
 * @returns
 */
function getData(){
	
	dataSet.SEARCH_KEY = $('#searchKey').val();
	dataSet.SEARCH_VAL = $('#searchVal').val();

	dateVal = $('#dateVal').text();
	if(dateVal){
		dateValSplit = dateVal.split('~');
		dataSet.SEARCH_START_DATE = dateValSplit[0]+" 00:00:00";
		dataSet.SEARCH_END_DATE = dateValSplit[1]+" 23:59:59";
	}
	
	console.log(JSON.stringify(dataSet));
	
	callService("getData", "admin/log/etlLogList", dataSet, "serviceCallback");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function setGrid()
{
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true
	};
	
	var tableColumns = [
	        			{ 
	        				data:"TRANSNAME"
	        			},
	        			{ 
	        				data:"LINES_OUTPUT", 		
	        				render:function(data,type,row,meta){
	        					var html = '';
	        					
	        					html = numberWithCommas(data);
	        										 
	        					return html;
	        				}			
	        			},
	        			{ 
	        				data:"ERRORS", 		
	        				render:function(data,type,row,meta){
	        					var html = '';
	        					
	        					if(data == 0){
	        						html = '정상';
	        					}else{
	        						html = 'Error';
	        					}
	        										 
	        					return html;
	        				}				
	        			},
	        			{ data:"LOG_DATE" 	},
	        			{ data:"STEPNAME"		}
	        		];	
	
	var tableColumnDef = [
	          		    { 
	        		    	className: "dt-body-center pointer", 
	        		    	targets: [ 0,1,2,3,4 ] 
	        		    },
	        		    { width: 80, targets: [0,1,2,3] },
	        		    { width: 150, targets: [4] }
	        		];
	
	callServiceDataTables('gridEtlLogList', tableOption, tableColumns, tableColumnDef, '/admin/log/etlLogList');
	
	$('#gridEtlLogList').on('click', 'tr', function(event) {
        var ERRORS		 = $('#gridEtlLogList').DataTable().row(this).data().ERRORS;
        var LINES_OUTPUT = $('#gridEtlLogList').DataTable().row(this).data().LINES_OUTPUT;
        var LOG_DATE	 = $('#gridEtlLogList').DataTable().row(this).data().LOG_DATE;
        var STEPNAME	 = $('#gridEtlLogList').DataTable().row(this).data().STEPNAME;
        var TRANSNAME	 = $('#gridEtlLogList').DataTable().row(this).data().TRANSNAME;
        if(ERRORS == 0){
        	ERRORS = '정상';
		}else{
			ERRORS = 'Error';
		}
        
        $('#bJobId').text(TRANSNAME);
        $('#bCount').text(numberWithCommas(LINES_OUTPUT));
		$('#bStatus').text(ERRORS);
		$('#bDate').text(LOG_DATE);
		$('#bContent').text(STEPNAME);
        
        $('#modalEtlView').modal('show');
    } );
	
}

function setDatePicker(){
	$('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        "autoApply": true,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
		"locale": {
	        "format": "YYYY/MM/DD",
	        "separator": " - ",
	        "applyLabel": "Apply",
	        "cancelLabel": "Cancel",
	        "fromLabel": "From",
	        "toLabel": "To",
	        "customRangeLabel": "Custom",
	        "weekLabel": "W",
	        "daysOfWeek": [
	            "Su",
	            "Mo",
	            "Tu",
	            "We",
	            "Th",
	            "Fr",
	            "Sa"
	        ],
	        "monthNames": [
	            "January",
	            "February",
	            "March",
	            "April",
	            "May",
	            "June",
	            "July",
	            "August",
	            "September",
	            "October",
	            "November",
	            "December"
	        ],
	        "firstDay": 1
	    }
    }, cb);
	
	cb(start, end);
}

function cb(start, end) {
    $('#reportrange span').html(start.format('YYYY-MM-DD') + '~' + end.format('YYYY-MM-DD'));
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	makeiCheck('.dateChk');
	
	var table = $('#gridEtlLogList').DataTable();
	
	$('#btnSearch').on('click',function(e){
		/*if(isNullOrEmpty($('#searchVal').val())){
			alert('검색어를 입력하세요.');
			return;
			
		}*/
		table.search('').draw();
		
		
	});
	
	$('#searchVal').on('keypress',function(e){
		if(e.keyCode === 13){
			/*if(isNullOrEmpty($('#searchVal').val())){
				alert('검색어를 입력하세요.');
				return;
				
			}*/
			
			table.search('').draw();
			
		}
	});
	
	$('#btnWebSearch').on('click', function(){
		table.search('').draw();
	});
	
	$("input:checkbox[name=dateType]").on('ifClicked', function(){
		if($(this).prop("checked")){
			$('#reportrangeArea').show();
			$('#btnWebSearch').show();
			myType = false;
		}else{
			$('#reportrangeArea').hide();
			$('#btnWebSearch').hide();
			myType = true;
		}
		
		table.search('').draw();
	});
	
	
	$('#modalEtlView').on('hide.bs.modal', function(event){
		$('#bJobId').text('');
		$('#bCount').text('');
		$('#bStatus').text('');
		$('#bDate').text('');
		$('#bContent').text('');
	});
}
