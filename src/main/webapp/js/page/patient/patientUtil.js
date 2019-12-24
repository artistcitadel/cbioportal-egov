/**
 * @return {string}
 */
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
    };

    self.monthAndYearDiff = function (_date1, _date2, node) {
        /*_date1 = _date1.substring(0,4)+"-"+_date1.substring(4,6)+"-"+_date1.substring(6,8);
        _date2 = _date2.substring(0,4)+"-"+_date2.substring(4,6)+"-"+_date2.substring(6,8);
        var da1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var da2 = _date2 instanceof Date ? _date2 : new Date(_date2);
        var dif = da2 - da1;
        var cDay = 24 * 60 * 60 * 1000;
        var cMonth = cDay * 30;
        var cYear = cMonth * 12;*/
        var date1 = moment(_date1);
        var date2 = moment(_date2);
        if(node==='m') return date2.diff(date1,'M');
        if(node==='y') return date2.diff(date1,'years');
        if(node==='d') return date2.diff(date1,'days');
        // if(node==='m') return parseInt(dif / cMonth);
        // if(node==='y') return parseInt(dif / cYear);
    };

    self.arrayToTree = function(data, options){
            options = options || {};
            var ID_KEY = options.idKey || 'id';
            var PARENT_KEY = options.parentKey || 'pid';
            var CHILDREN_KEY = options.childrenKey || 'data';

            var tree = [],
                childrenOf = {};
            var item, id, parentId;

            for (var i = 0; i < data.length; i++) {
                item = data[i];
                id = item[ID_KEY];
                parentId = item[PARENT_KEY] || '0';
                childrenOf[id] = childrenOf[id] || [];
                item[CHILDREN_KEY] = childrenOf[id];
                if (parentId !== '0') {
                    childrenOf[parentId] = childrenOf[parentId] || [];
                    childrenOf[parentId].push(item);
                } else {
                    tree.push(item);
                }
            }

            return tree;
    };

    self.arrayToTreeParent = function(data, options){
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
            childrenOf[id] = childrenOf[id] || [];
            item[CHILDREN_KEY] = childrenOf[id];
            console.log('item[CHILDREN_KEY] ', parentId);
            if(parentId!==0){
                tree.push(parentId);
            }
        }
        return tree;
    };

    self.findAll = function(items,id) {
        var i = 0, found, result = [];
        for (; i < items.length; i++) {
            if (items[i].pid === id) {
                result.push(items[i].id);
                console.log('result ', result);
            } else if (_.isArray(items[i].data) && items[i].data.length>0) {
                found = this.findAll(items[i].data[0].id,  items[i].data);
                 if (found.length) {
                     result = result.concat(found);
                 }
            }
        }
        return result;
    };

    self.find = function(fdata, dat){
        //dat.push(fdata.id);
        if(_.isArray(fdata.data) && fdata.data.length>0) {
            this.find(fdata.data[0], dat);
        }
        return dat;
    };

    self.makeHrc = function(partial, complete, dat){
        //var partial = _.uniqBy(partial, "id");
        for(var i=0; i< partial.length;i++) {
            dat.push(partial[i]);
            dat = this.concatUp(partial[i], complete, dat);
        }
        return dat;
    };

    self.concatUp = function(partial, complete, dat) {
        var x = _.findIndex(complete, function (o) {
            return o.id === partial.pid;
        });
        if (x !== -1) {
            dat.push(complete[x]);
            this.concatUp(complete[x], complete, dat);
        }
        return dat;
    };
    self.nt = function(t){
        if(_.isUndefined(t))return "";
        else return t;
    };
    self.subtractzero = function(dat){
        if(dat.substring(0,1)==='0')
            return dat.substring(1);
        else return dat;
    };

    self.setDateTitle = function(UNIT, dat){
       if(UNIT==='d')return dat.substring(0,4)+'년 '+dat.substring(4,6)+'월';
       if(UNIT==='m')return dat.substring(0,4)+'년';
        if(UNIT==='y')return '';
    };

    self.dateFormat = function (unit, dat){
        return dat.substring(0,4)+'.'+dat.substring(4,6)+'.'+dat.substring(6,8);
        /*if(unit==='d')return dat.substring(0,4)+'.'+dat.substring(4,6)+'.'+dat.substring(6,8);
        if(unit==='m')return dat.substring(0,4)+'.'+dat.substring(4,6);
        if(unit==='y')return dat.substring(0,4);*/
    };

    self.dformat=function(UNIT, dat){
        /*if(UNIT==='d')return dat.substring(0,4)+'.'+dat.substring(4,6)+'.'+dat.substring(6,8);
        if(UNIT==='m')return dat.substring(0,4)+'.'+dat.substring(4,6);
        if(UNIT==='y')return dat.substring(0,4);*/
        if(UNIT==='d')return self.subtractzero(dat.substring(6,8))+'일';
        if(UNIT==='m')return self.subtractzero(dat.substring(4,6))+'월';
        // if(UNIT==='y')return dat.substring(0,4)+'년';
        if(UNIT==='y')return dat.substring(0,4);
    };
    /*function dunformat(dat){
    console.log(UNIT, dat);
    if(UNIT==='d')return dat.split(".")[0]+dat.split(".")[1]+dat.split(".")[2];
    if(UNIT==='m')return dat.split(".")[0]+dat.split(".")[1];
    if(UNIT==='y')return dat.substring(0,4);
}*/
    self.showLoader = function(){
        $.blockUI({
                message: null,
                overlayCSS: {backgroundColor: '#FFFFFF', opacity: 1.0, cursor: 'wait'}
            }
        );
        $("#spinner").show();
    };
    self.hideLoader = function(){
        $("#spinner").delay(800).hide();
        $.unblockUI();
        //$('.content-wrapper').show();
    };
    self._isUndefined = function(data){
        return !!(_.isUndefined(data) || data == null);
    };

    self.generateQueryVariant = function(e)
    {
        var query = {
            id: self.generateQueryVariantId(e.entrezGeneId, e.tumorType, e.alteration, e.mutationType),
            hugoSymbol:e.hugoSymbol,
            tumorType: e.tumorType, // generated api typings are wrong, it can accept null
            alterationType: e.alterationType || 0,
            entrezGeneId: e.entrezGeneId,
            alteration: e.alteration || "",
            consequence: e.mutationType || "any",
            proteinStart: e.proteinPosStart === undefined ? -1 : e.proteinPosStart,
            proteinEnd: e.proteinPosEnd === undefined ? -1 : e.proteinPosEnd,
            type: "web",
            hgvs: "",
            svType: "DELETION" // TODO: hack because svType is not optional
        };

        // Use proper parameters for Intragenic variant
        if(query.alteration.toLowerCase().indexOf("intragenic") !== -1) {
            query.alterationType = 'structural_variant';
            query.svType = 'DELETION';
            query.consequence = '';
        }
        return query;
    };

    self.generateQueryVariantId = function(entrezGeneId,
        tumorType,
        alteration,
        mutationType)
    {
        var id = (tumorType) ? entrezGeneId+'_'+tumorType : entrezGeneId;
        if (alteration) {
            id = id+'_'+alteration;
        }
        if (mutationType) {
            id = id+'_'+mutationType;
        }
        return $.trim(id).replace(/\s/g, "_");
    };

    self.annotationIconClassNames = function (indicatorQueryResp) {
        var classNames = ["oncokb", "annotation-icon", "unknown", "no-level"];

        if (indicatorQueryResp) {
            var sl = normalizeLevel(indicatorQueryResp.highestSensitiveLevel);
            var rl = normalizeLevel(indicatorQueryResp.highestResistanceLevel);
            // console.log('sl ', sl);
            // console.log('rl ', rl);
            classNames[2] = ONCOGENIC_CLASS_NAMES[indicatorQueryResp.oncogenic] || (indicatorQueryResp.vus ? "vus" : "unknown");

            if (sl || rl) {
                var levelName = 'level';

                if (sl) {
                    levelName = levelName+"-"+sl;
                }

                if (rl) {
                    levelName = levelName+"-"+rl;
                }

                classNames[3] = levelName;
            }
        }
        // console.log("classNames ", classNames);
        return classNames.join(" ");
    }

    function normalizeLevel(level)
    {
        if (level)
        {
            var matchArray = level.match(/LEVEL_(R?\d[AB]?)/);

            if (matchArray && matchArray.length >= 2) {
                return matchArray[1];
            }
            else {
                return level;
            }
        }
        else {
            return null;
        }
    }

}
