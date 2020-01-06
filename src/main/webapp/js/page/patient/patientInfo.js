/**
 * @author 오세영
 */
function PatientInfo() {
    var self = this;
    var action;
    var util;

    self.init = function (props) {
      var txt='';
      txt+='<div class="rc-tooltip-inner" role="tooltip">\n' +
          '    <div style="max-height: 600px; max-width: 600px; overflow: auto;">\n' +
          '        <div class="lazy-mobx-table" data-test="LazyMobXTable">\n' +
          '            <div>\n' +
          '                <div role="toolbar" class="tableMainToolbar btn-toolbar" style="margin-left: 0px;"></div>\n' +
          '            </div>\n' +
          '            <div style="overflow-x: visible;">\n' +
          '                <table id="patient_t" class="table table-bordered">\n' +
          '                    <thead>\n' +
          '                    <tr class="success">\n' +
          '                        <th>Attribute</th>\n' +
          '                        <th>Value</th>\n' +
          '                    </tr>\n' +
          '                    </thead>\n' +
          '                    <tbody id="patient_con">\n' +
          '                    <tr>\n' +
          '                        <td>Overrall Survival Status</td>\n' +
          '                        <td>Unknown</td>\n' +
          '                    </tr>\n' +
          '                    <tr>\n' +
          '                        <td>Diagnosis Age</td>\n' +
          '                        <td id="age">'+props.age+'</td>\n' +
          '                    </tr>\n' +
          '                    <tr>\n' +
          '                        <td>Number of Sample Per Patient</td>\n' +
          '                        <td id="numberofsample">'+props.samplecount+'</td>\n' +
          '                    </tr>\n' +
          '                    <tr>\n' +
          '                        <td>Overrall Survival(Months)</td>\n' +
          '                        <td>Unknown</td>\n' +
          '                    </tr>\n' +
          '                    <tr>\n' +
          '                        <td>Sex</td>\n' +
          '                        <td id="sex">'+props.sex+'</td>\n' +
          '                    </tr>\n' +
          '                    </tbody>\n' +
          '                </table>\n' +
          '            </div>\n' +
          '            <div role="toolbar" class="tableMainToolbar center btn-toolbar" style="margin-left: 0px; float: none;"></div>\n' +
          '        </div>\n' +
          '    </div>\n' +
          '</div>';
      return txt;
    }
}