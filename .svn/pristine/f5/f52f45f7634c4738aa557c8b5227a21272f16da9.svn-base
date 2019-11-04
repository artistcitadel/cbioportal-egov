/**
 * 기초분석 - 기초분석 메인
 * @Page : basicAnalysisMain.jsp
 */

/**
 * Application Ready
 */

function setHeightPercent(obj, percent) {
	if (percent == undefined || percent == null) {
		obj.style.height = parseInt(parseInt((new JsObject(obj)).autoHeight()) / 100 * (parseInt(percent) ? parseInt(percent) : 100));
	} else {
		if (obj != null) {
			obj.style.height = parseInt(parseInt((new JsObject(obj)).autoHeight()) / 100 * (parseInt(percent) ? parseInt(percent) : 100));
		}
	}
	return parseInt((obj.style.height).replace("px", ""));
}

/**
 * Object 정보를 얻기 위한 클래스
 */
function JsObject(obj) {

	this.xObject = obj;

	this.autoHeight = JsObject_autoHeight;
	this.offsetTop = JsObject_offsetTop;
	this.autoWidth = JsObject_autoWidth;
	this.offsetLeft = JsObject_offsetLeft;

}

/**
 * client window 영역에 맞추어 남은 길이 만큼 자동으로 height 를 설정한다
 */
function JsObject_autoHeight() {
	var cheight;
	if (navigator.userAgent.indexOf("MSIE 5.5") != -1) {
		cheight = document.body.clientHeight;
	} else {
		cheight = document.documentElement.clientHeight;
	}

	// 웹 표준을 위해 px 붙임
	this.xObject.style.height = (cheight - this.offsetTop()) + "px";

	return this.xObject.clientHeight;
}

function JsObject_autoWidth() {
	var cwidth;
	if (navigator.userAgent.indexOf("MSIE 5.5") != -1) {
		cwidth = document.body.clientWidth;
	} else {
		cwidth = document.documentElement.clientWidth;
	}

	// 웹 표준을 위해 px 붙임 
	this.xObject.style.width = (cwidth - this.offsetLeft()) + "px";

	return this.xObject.clientWidth;
}

/**
 * offset 값을 구한다
 */
function JsObject_offsetTop() {
	var offsetx = 0;

	obj = this.xObject;

	while (obj.offsetParent != null) {
		offsetx += obj.offsetTop;

		obj = obj.offsetParent;
	}

	return offsetx;
}

function JsObject_offsetLeft() {
	var offsetx = 0;

	obj = this.xObject;

	while (obj.offsetParent != null) {
		offsetx += obj.offsetLeft;

		obj = obj.offsetParent;
	}

	return offsetx;
}