/**
 * @author 오세영
 */
function PatientAttr() {
    var self = this;
    var action;
    var util;

    self.init = function (id) {
        var label = id.split("_")[2];
        var title = id.split("_")[1]+'_'+id.split("_")[2];
        var color = (label==='1')?'black':(label==='2')?'orange':(label==='3')?'red':'blue';

        var txt = '<div id="'+id+'" class="rc-tooltip-inner" role="tooltip">\n' +
            '    <div style="max-height: 600px; max-width: 600px; overflow: auto;">\n' +
            '        <h5 style="margin-bottom: 1px;">\n' +
            '            <span class="sample-inline-tooltip-children">\n' +
            '                <svg width="12" height="12" class="case-label-header" data-test="sample-icon">\n' +
            '                    <g transform="translate(6,6)">\n' +
            '                        <circle r="6" fill="'+color+'" fill-opacity="1"></circle>\n' +
            '                    </g>\n' +
            '                    <g transform="translate(6,5.5)">\n' +
            '                        <text y="4" text-anchor="middle" font-size="10" fill="white" style="cursor: default;">'+label+'</text>\n' +
            '                    </g>\n' +
            '                </svg>\n' +
            '            </span>'+title+'  \n' +
            '        </h5>\n' +
            '        <div class="lazy-mobx-table" data-test="LazyMobXTable">\n' +
            '            <div>\n' +
            '                <div role="toolbar" class="tableMainToolbar btn-toolbar" style="margin-left: 0px;"></div>\n' +
            '            </div>\n' +
            '            <div style="overflow-x: visible;">\n' +
            '                <table class="table table table-bordered">\n' +
            '                    <thead>\n' +
            '                    <tr>\n' +
            '                        <th scope="col">Attribute</th>\n' +
            '                        <th scope="col" class="active">Value</th>\n' +
            '                    </tr>\n' +
            '                    </thead>\n' +
            '                    <tbody>\n' +
            '                    <tr class="success">\n' +
            '                        <td><span>Mutation Count</span></td>\n' +
            '                        <td><span>'+MUTATIOINCOUNT+'</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr class="info">\n' +
            '                        <td><span>Sample Type</span></td>\n' +
            '                        <td><span>'+label+'</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr class="warning">\n' +
            '                        <td><span>1p/19q Status</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td><span>Cancer Type</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td><span>Cancer Type Detailed</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td><span>IDH1 Mutation</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr><td><span>MGMT Status</span></td><td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td><span>Neoplasm Histologic Grade</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td><span>Non-silent mutations in TP53, ATRX, CIC, FUBP1</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td class="danger"><span>Oncotree Code</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td><span>Somatic Status</span></td>\n' +
            '                        <td><span>Unknown</span></td>\n' +
            '                    </tr>\n' +
            '                    </tbody>\n' +
            '                </table>\n' +
            '            </div>\n' +
            '            <div role="toolbar" class="tableMainToolbar center btn-toolbar" style="margin-left: 0px; float: none;"></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '  </div>\n';
        return txt;
    }
}