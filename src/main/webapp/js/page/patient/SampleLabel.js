function getSampleLabel(label){
    var txt = ' <svg width="12" height="12" className="case-label-header" data-test="sample-icon">\n' +
        '                <g transform="translate(6,6)">\n' +
        '                    <circle r="6" fill="#000" fillOpacity="1" />\n' +
        '                </g>\n' +
        '                <g transform="translate(2.5,5.0)">\n' +
        '                    <text y="6" textAnchor="middle" fontSize="9" fill="white" style="cursor:default;font-size: small;" >'+label+'</text>\n' +
        '                </g>\n' +
        '            </svg>';
    return txt;
}

function getCNAColor(dat){
    if(dat==='AMPLIFICATION')return 'red';
    else if(dat==='LOSS')return 'blue';
    else return 'black';

}

function getDivSample(label){
    return '<span>\n' +
        '     <svg height="12" width="12">\n' +
        '       <svg width="12" height="12" class="case-label-header" data-test="sample-icon">\n' +
        '         <g transform="translate(6,6)">\n' +
        '           <circle r="6" fill="black" fill-opacity="1">\n' +
        '           </circle>\n' +
        '           </g>\n' +
        '            <g transform="translate(6,5.5)">\n' +
        '            <text y="4" text-anchor="middle" font-size="10" fill="white" style="cursor: default;">'+label+'</text>\n' +
        '           </g>\n' +
        '         </svg>\n' +
        '       </svg>\n' +
        '   </span>';
}