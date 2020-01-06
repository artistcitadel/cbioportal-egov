var size;
function setWindowSize() {
    size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    if(document.readyState !== "complete")return false;
    if(_.isUndefined(size))return false;
    console.log('setWindowSize ',size);

    $("#genomicOverviewTracksContainer1").empty();
    $("#vafplot1").empty();
    $("#vafplot").empty();
    var genomicoverview = new GenomicOverview();
    genomicoverview.redraw(GENOMICOVERVIEWDATA);

    $("#timeLineContainer").find('svg').remove();
    var timeline = new TimeLine();
    timeline.redrawing();


    // var overview = $('#genomicOverviewTracksContainer1').children(1);
    // overview.css('width', size.width-140);
}
 jQuery(window).on('resize', _.debounce(setWindowSize, 500));
