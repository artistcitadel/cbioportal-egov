

$(document).ready(function(){
	//차트그리기
	makeChart('#chart1','','spline');
	makeChart('#chart2','','bar');
	
	
	tableInit('#jqxgrid');
	
	//게시판 그리기
	makeBoard('#board1');		//공지사항
	makeBoard('#board2');		//자료실
	
	if($('#pageType').val() == "index"){
		$('#btnFold').css('display', 'none');
	}
});

//테이블 그리기
var tableInit = function(myId){
	//테이블 그리기
	var dataGrid = generatedata(20);
	
	var sourceGrid =
	{
		localdata: dataGrid,
		datafields:			//데이터 형태 정의
		[
			{ name: 'section', type: 'string' },
			{ name: 'qualification', type: 'string' },
			{ name: 'item', type: 'string' },
			{ name: 'save', type: 'string'},
			{ name: 'review', type: 'string' },
			{ name: 'req', type: 'string' },
			{ name: 'yn', type: 'string' }
		],
		datatype: "json",
		root: 'Rows',
		beforeprocessing: function(data)
		{		
			sourceGrid.totalrecords = data[0].TotalRows;
		}
	};

	var columns = [			//컬럼 형태 정의
			{ text: '연구구분', datafield: 'section', width: '10%', align: 'center', cellsalign: 'center' },
			{ text: '개인조건', datafield: 'qualification', width: '40%', align: 'center', cellsalign: 'center' },
			{ text: '연구항목', datafield: 'item', width: '10%', align: 'center', cellsalign: 'center', columngroup: 'studyItem'},
			{ text: '데이터 저장', datafield: 'save', width: '10%', align: 'center', cellsalign: 'center', columngroup: 'studyItem' },
			{ text: '차트리뷰', datafield: 'review', width: '10%', align: 'center', cellsalign: 'center' },
			{ text: '승인요청', datafield: 'req', width: '10%', align: 'center', cellsalign: 'center', columngroup: 'approve' },
			{ text: '승인여부', datafield: 'yn', width: '10%', align: 'center', cellsalign: 'center', columngroup: 'approve' }
		];
	
	var columngroups = [
	        { text: '연구항목', align: 'center', name: 'studyItem' },
	        { text: '승인', align: 'center', name: 'approve' }
       ];
	
	var tableOptions = {
			width: '100%',
			height: '100%',
			showfilterrow: true,
			filterable: true,
			sortable: true,
			columnsresize: true,
			columns: columns,
			altrows: true,
			columngroups: columngroups,
			//pageable: true,
			virtualmode: true,
			rendergridrows: function()
			{
				  return dataAdapterGrid.records;     
			},
			theme: 'bootstrap'
		};

	
	
	
	makeTable(myId, sourceGrid, tableOptions);
}

