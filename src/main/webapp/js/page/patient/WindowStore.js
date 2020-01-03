var size;
function setWindowSize() {
    size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    var overview = $('#genomicOverviewTracksContainer1').children(1);
    overview.css('width', size.width);
}

window.addEventListener("resize", setWindowSize);
