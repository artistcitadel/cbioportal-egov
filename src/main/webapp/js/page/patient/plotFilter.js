/**
 * @author 오세영
 */

function PlotFilter() {
    var self = this;
    self.searchPlot = function(id) {
        console.log('id is ', id);
        var digcategory = [];
        if (!_.isUndefined(localStorage["digcategory"]))
            digcategory = JSON.parse(localStorage.getItem("digcategory"));
        var searchIdx = _.findIndex(digcategory, function (v) {
            // console.log(v.pid, id);
            return v.pid === id;
        });
        return searchIdx;
    }

    self.searchPlotId = function(id) {
        var digcategory = [];
        if (!_.isUndefined(localStorage["digcategory"]))
            digcategory = JSON.parse(localStorage.getItem("digcategory"));
        var searchIdx = _.findIndex(digcategory, function (v) {
            return v.idd === id;
        });
        console.log('id is ', id, searchIdx);
        return searchIdx;
    }
}