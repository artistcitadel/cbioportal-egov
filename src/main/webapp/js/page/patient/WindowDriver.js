var size;
function setWindowSize() {
    size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    if(document.readyState !== "complete")return false;
    if(_.isUndefined(size))return false;
    console.log('setWindowSize ',size);

    $("#timeLineContainer").find('svg').remove();
    var timeline = new TimeLine();
    timeline.redrawing();
}
jQuery(window).on('resize', _.debounce(setWindowSize, 500));
