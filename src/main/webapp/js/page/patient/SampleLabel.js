function getSampleLabel(label,x, y){
    var txt = ' <svg x="'+x+'" y="'+y+'" width="12" height="12" className="case-label-header" data-test="sample-icon">\n' +
        '                <g transform="translate(6,6)">\n' +
        '                    <circle r="6" fill="#cccccc" fillOpacity="1" />\n' +
        '                </g>\n' +
        '                <g transform="translate(6,5.5)">\n' +
        '                    <text y="4" textAnchor="middle" fontSize="10" fill="white" style="cursor:default;" >'+label+'</text>\n' +
        '                </g>\n' +
        '            </svg>';
    //console.log(txt);
    // txt='<svg height="12" width="12"><svg width="12" height="12" class="case-label-header" data-test="sample-icon"><g transform="translate(6,6)"><circle r="6" fill="red" fill-opacity="1"></circle></g><g transform="translate(6,5.5)"><text y="4" text-anchor="middle" font-size="10" fill="white" style="cursor: default;">1</text></g></svg></svg>';
    return txt;
}