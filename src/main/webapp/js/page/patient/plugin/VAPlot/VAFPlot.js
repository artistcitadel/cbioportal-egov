
var VAPlot_PROPS;
var show_histogram=true;
var show_curve=true;

function VAFPlot() {
    var self = this;

    var state;

    self.init = function (props) {

        var label_dist_to_axis = (props.options.xticks === 0) ? 13 : 30;

        var options = {
            label_font_size: props.label_font_size,
            xticks: props.xticks,
            yticks: props.yticks,
            nolegend: props.nolegend,
            margin: {
                top: props.margin_top,
                left: props.margin_left,
                right: props.margin_right,
                bottom: props.margin_bottom
            },
            width: props.width,
            height: props.height
        };
        // margin bottom must be computed before height because height computation makes use of it
        if (options.margin.bottom === undefined)
            options.margin.bottom = 30 + (label_dist_to_axis / 2);
        if (options.height === undefined && options.margin.top !== undefined)
            options.height = ((500 + label_dist_to_axis) / 2) - options.margin.top - options.margin.bottom;
        state = {
            show_histogram: !!show_histogram,
            show_curve: !!show_curve,
            options: props.options,
        };
        // VAPlot_PROPS = props;
        render(props);
    }


    var histogramCheckbox = function () {
        var txt = '<div id="miniature"><div id="vafdiv" style="display:inline;">';
        txt += '<label\n' +
            '    key="histogram"   \n' +
            '    data-test="histogram"   \n' +
            '    style="margin-right:10px;" > \n';
        txt += '<input id="histogram" type="checkbox" style="margin-right:3px;" onChange="toggleShowHistogram(\'histogram\')" checked/>histogram </label>';

        txt += '<label' +
            '    data-test="curve"   \n' +
            '    key="curve">   \n';
        txt += '<input id="curve" type="checkbox" style="margin-right:3px;" onChange="toggleShowCurve(\'curve\')" checked/> density estimation</label>';
        txt+='<br/></div></div>';
        return txt;
    }
    var initdiv = function(){
        return '<div id="vafdiv" style="display:inline;"></div>';
    }


    var render = function (props) {
      // $('svg[data-test="vaf-plot"]').remove();
      // var txt='';
      // txt+='<div id="vafplot" style="display:inline;"> \n';
      // txt+=histogramCheckbox();
        var component={};
        component.state = state;
        component.div = '#vafdiv';
        var id = '#vafplot1';
        if(props.options.show_controls) {
            $("#vafplot1").append(histogramCheckbox());
        }else {
            $("#vafplot").append(initdiv());
            id='#vafplot';
        }
        // console.log('props.data',props.data);

        AlleleFreqPlotMulti(component, id, props.data, props.options, props.orders, props.colors, props.labels,{});
    }
}

function toggleShowHistogram (id) {
    var histogram = $("#histogram");
    var new_show_histogram = histogram.prop("checked");
    shouldUPdateHistorygramCheckbox(new_show_histogram);
}
function toggleShowCurve (id) {
    var curve = $("#curve");
    var new_show_histogram = curve.prop("checked");
    shouldUPdateCurveCheckbox(new_show_histogram);
}

var shouldUPdateHistorygramCheckbox = function (historygramcheckbox) {
    if (historygramcheckbox) {
        $("#vafdiv").find('.viz_hist').show();
    } else {
        $("#vafdiv").find('.viz_hist').hide();
    }
    // var vAFPlot = new VAFPlot();
    // vAFPlot.init(VAPlot_PROPS);
}

var shouldUPdateCurveCheckbox = function (curveCheckbox) {
    if (curveCheckbox) {
        $("#vafdiv").find('.viz_curve').show();
    } else {
        $("#vafdiv").find('.viz_curve').hide();
    }
    // var vAFPlot = new VAFPlot();
    // vAFPlot.init(VAPlot_PROPS);
}