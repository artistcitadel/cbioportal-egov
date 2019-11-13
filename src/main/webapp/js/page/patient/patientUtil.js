function Util() {
    var self = this;

    self.dateDiff = function (_date1, _date2) {
        _date1 = _date1.substring(0,4)+"-"+_date1.substring(4,6)+"-"+_date1.substring(6,8);
        _date2 = _date2.substring(0,4)+"-"+_date2.substring(4,6)+"-"+_date2.substring(6,8);
        var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
        //console.log(diffDate_2, diffDate_1);
        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());
        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));
        return diff;
    }

    self.monthAndYearDiff = function (_date1, _date2, node) {
        _date1 = _date1.substring(0,4)+"-"+_date1.substring(4,6)+"-"+_date1.substring(6,8);
        _date2 = _date2.substring(0,4)+"-"+_date2.substring(4,6)+"-"+_date2.substring(6,8);
        var da1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var da2 = _date2 instanceof Date ? _date2 : new Date(_date2);
        var dif = da2 - da1;
        var cDay = 24 * 60 * 60 * 1000;
        var cMonth = cDay * 30;
        var cYear = cMonth * 12;
        if(node==='m') return parseInt(dif / cMonth);
        if(node==='y') return parseInt(dif / cYear);
    }

    self.arrayToTree = function(data, options){
            options = options || {};
            var ID_KEY = options.idKey || 'id';
            var PARENT_KEY = options.parentKey || 'pid';
            var CHILDREN_KEY = options.childrenKey || 'data';

            var tree = [],
                childrenOf = {};
            var item, id, parentId;

            for (var i = 0, length = data.length; i < length; i++) {
                item = data[i];
                id = item[ID_KEY];
                parentId = item[PARENT_KEY] || 0;
                // every item may have children
                childrenOf[id] = childrenOf[id] || [];
                // init its children
                item[CHILDREN_KEY] = childrenOf[id];
                if (parentId != 0) {
                    // init its parent's children object
                    childrenOf[parentId] = childrenOf[parentId] || [];
                    // push it into its parent's children object
                    childrenOf[parentId].push(item);
                } else {
                    tree.push(item);
                }
            };

            return tree;

    }
}

/*
function listToTree(data, options) {
    options = options || {};
    var ID_KEY = options.idKey || 'id';
    var PARENT_KEY = options.parentKey || 'pid';
    var CHILDREN_KEY = options.childrenKey || 'data';

    var tree = [],
        childrenOf = {};
    var item, id, parentId;

    for (var i = 0, length = data.length; i < length; i++) {
        item = data[i];
        id = item[ID_KEY];
        parentId = item[PARENT_KEY] || 0;
        // every item may have children
        childrenOf[id] = childrenOf[id] || [];
        // init its children
        item[CHILDREN_KEY] = childrenOf[id];
        if (parentId != 0) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || [];
            // push it into its parent's children object
            childrenOf[parentId].push(item);
        } else {
            tree.push(item);
        }
    };

    return tree;
}*/
