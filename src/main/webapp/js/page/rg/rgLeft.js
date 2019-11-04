
/**
 * Application Ready
 */
$(document).ready(function(){
	var frm = document.frmRgContent;
	var menuUrl = frm.menuUrl.value;
	
	if(menuUrl.match('RG_TYPE_CD=UUH')==null){			//울산대 기존레지스트리가 아닐 경우
		frm.menuUrl.value = "/bigcenmed2rg" + frm.menuUrl.value;
	}else{												//울산대 기존레지스트리일 경우
		frm.menuUrl.value = frm.menuUrl.value;
	}
	
	var html = '';
	
	html += '<h1>';
		html += frm.menuNm.value;
	html += '</h1>';
	
	html += '<ol class="breadcrumb pull-right">';
	
	html += '</ol>';
	
	$('.content-header').html(html);
		
	frm.target = "iframeRgContent";
	frm.action = "/bigcenmed2rg/";
	frm.submit();
    
});


/**
 * 레지스트리 화면 이동 
 * @param menuSeq
 * @param menuNm
 * @param menuUrl
 * @returns
 */
function goMenu( menuSeq, menuUpperNm, menuNm,  menuUrl){
	$('.treeview-menu').each(function(index1){
		$(this).children().each(function(index2){
			if($(this).attr('id') == menuSeq){
				$(this).attr('class','active');
				
			}else{
				$(this).attr('class','');
			}	
		});
	});
	
	var html = '';
	
	html += '<h1>';
		html += menuNm;
	html += '</h1>';
	
	html += '<ol class="breadcrumb pull-right">';
		html += '<li><a href="javascript:;">레지스트리</a></li>';
		html += '<li><a href="javascript:;">'+menuUpperNm+'</a></li>';
		html += '<li><a href="javascript:;">'+menuNm+'</a></li>';
	
	html += '</ol>';
	
	$('.content-header').html(html);
	
	var frm = document.frmRgContent;
	
	frm.menuSeq.value = menuSeq;
	frm.menuNm.value = menuNm;
	
	if(menuUrl.match('RG_TYPE_CD=UUH')==null){			//울산대 기존레지스트리가 아닐 경우
		frm.menuUrl.value = "/bigcenmed2rg" + menuUrl;
	}else{												//울산대 기존레지스트리일 경우
		frm.menuUrl.value = menuUrl;
	}

	frm.target = "iframeRgContent";
	frm.action = "/bigcenmed2rg/";
	frm.submit();
	
	
}

function goReport( SEQ, TARGET_ID, USER_ID,  TITLE, URL){
	$('.treeview-menu').each(function(index1){
		$(this).children().each(function(index2){
			if($(this).attr('id') == SEQ){
				$(this).attr('class','active');
				
			}else{
				$(this).attr('class','');
			}	
		});
	});
	
	var html = '';
	
	html += '<h1>';
		html += TITLE;
	html += '</h1>';
	
	html += '<ol class="breadcrumb pull-right">';
		html += '<li><a href="javascript:;">레지스트리</a></li>';
		html += '<li><a href="javascript:;">정형보고서</a></li>';
		html += '<li><a href="javascript:;">'+TITLE+'</a></li>';
	
	html += '</ol>';
	
	$('.content-header').html(html);
	
	var frm = document.frmRgContent;
	
	frm.menuSeq.value = SEQ;
	frm.menuNm.value = TITLE;
	frm.menuUrl.value = "/bigcenmed2rg/report/main?RG_TYPE_CD=TRAUMA";
	frm.TARGET_ID.value = TARGET_ID;
	frm.USER_ID.value = USER_ID;
	frm.URL.value = URL;

	frm.target = "iframeRgContent";
	frm.action = "/bigcenmed2rg/report/main?RG_TYPE_CD=TRAUMA";
	frm.submit();
	
	
}



