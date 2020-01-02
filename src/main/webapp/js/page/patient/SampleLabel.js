function getSampleLabel(label){
    var txt = ' <svg width="12" height="12" className="case-label-header" data-test="sample-icon">\n' +
        '                <g transform="translate(6,6)">\n' +
        '                    <circle r="6" fill="#f50505" fillOpacity="1" />\n' +
        '                </g>\n' +
        '                <g transform="translate(2.5,5.0)">\n' +
        '                    <text y="6" textAnchor="middle" fontSize="9" fill="white" style="cursor:default;font-size: small;" >'+label+'</text>\n' +
        '                </g>\n' +
        '            </svg>';
    return txt;
}