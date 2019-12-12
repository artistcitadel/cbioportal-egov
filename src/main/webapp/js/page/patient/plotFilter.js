function searchPlot(id) {
    console.log('id is ', id);
    var digcategory = [];
    if (!_.isUndefined(localStorage["digcategory"]))
        digcategory = JSON.parse(localStorage.getItem("digcategory"));
    var searchIdx = _.findIndex(digcategory, function (v) {
        return v.idd === id;
    });
  return searchIdx;
}