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
    var state;

    self.init = function (props) {
        var options = {
            label_font_size: "6.5px",
            xticks: 0,
            yticks: 0,
            nolegend: true,
            margin:{
                top: 20,
                left: 50,
                right: 30,
                bottom: 15
            },
            width: 64,
            height: 64
        };
        var label_dist_to_axis = (options.xticks === 0) ? 13 : 30;

        // margin bottom must be computed before height because height computation makes use of it
        if (options.margin.bottom === undefined)
            options.margin.bottom = 30 + (label_dist_to_axis / 2);
        if (options.height === undefined && options.margin.top !== undefined)
            options.height = ((500 + label_dist_to_axis) / 2) - options.margin.top - options.margin.bottom;
        state = {
            show_histogram: !!props.init_show_histogram,
            show_curve: !!props.init_show_curve,
            options
        };
        render(props,options);
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


    var render = function (props,options) {
      // var txt='';
      // txt+='<div id="vafplot" style="display:inline;"> \n';
      // txt+=histogramCheckbox();
        $("#vafplot").html(histogramCheckbox());
        AlleleFreqPlotMulti("vafplot", props.data, options, {}, props.colors, props.labels, {});
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