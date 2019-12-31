function VAFPlot() {
    var self = this;
    var data = {};
    var order = {};
    var colors = {};
    var labels = {};
    var width = 200;
    var height = undefined;
    var margin_left = 50;
    var margin_top = 20;
    var margin_right = 30;
    var margin_bottom = undefined;
    var xticks = 3;
    var yticks = 8;
    var label_font_size = "11.5px";
    var nolegend = false;
    var init_show_histogram = true;
    var init_show_curve = true;
    var show_controls = false;

    self.init = function (props) {
        var label_dist_to_axis = (this.props.xticks === 0) ? 13 : 30;

        var options = {
            label_font_size: this.props.label_font_size,
            xticks: this.props.xticks,
            yticks: this.props.yticks,
            nolegend: this.props.nolegend,
            margin: {
                top: this.props.margin_top,
                left: this.props.margin_left,
                right: this.props.margin_right,
                bottom: this.props.margin_bottom
            },
            width: this.props.width,
            height: this.props.height
        };
        // margin bottom must be computed before height because height computation makes use of it
        if (options.margin.bottom === undefined)
            options.margin.bottom = 30 + (label_dist_to_axis / 2);
        if (options.height === undefined && options.margin.top !== undefined)
            options.height = ((500 + label_dist_to_axis) / 2) - options.margin.top - options.margin.bottom;
        var state = {
            show_histogram: !!props.init_show_histogram,
            show_curve: !!props.init_show_curve,
            options
        };
        render();
        AlleleFreqPlotMulti("vafplot", props.data, state.options, props.order, props.colors, props.labels);
    }


    var shouldUPdateHistorygramCheckbox = function (historygramcheckbox) {
        if (historygramcheckbox) {
            $('.viz_hist').show();
        } else {
            $('.viz_hist').hide();
        }
    }

    var shouldUPdateCurveCheckbox = function (curveCheckbox) {
        if (curveCheckbox) {
            $('.viz_curve').show();
        } else {
            $('.viz_curve').hide();
        }
    }

    var toggleShowCurve = function () {
        const new_show_curve = !this.state.show_curve;
        shouldCurveCheckbox(new_show_curve);
    }

    var histogramCheckbox = function () {
        var txt = '';
        txt += '<label\n' +
            '    key="histogram"   \n' +
            '    style="margin-right:10px;" > \n';
        txt += '<input id="histogram" type="checkbox" style="margin-right:3px;" onChange="toggleShowHistogram(\'histogram\')"> </label>';

        txt += '<label\n' +
            '    key="curve"   \n';
        txt += '<input type="checkbox" id="curve" style="margin-right:3px;" onChange="toggleShowCurve(\'histogram\')"> </label>';

    }


    var render = function () {
      var txt='';
      txt+='<div id="vafplot" style="display:inline;"> \n';
      txt+=histogramCheckbox();
    }
}

function toggleShowHistogram (id) {
    var histogram = $("#histogram");
    var new_show_histogram = !histogram.prop("checked");
    shouldUPdateHistorygramCheckbox(new_show_histogram);
}
function toggleShowCurve (id) {
    var curve = $("#curve");
    var new_show_histogram = !curve.prop("checked");
    shouldUPdateCurveCheckbox(new_show_histogram);
}