function Specimen() {
    var self = this;
    var action = new Action();
    var util = new Util();
    var SPDATA = [];
    self.init = function(findLevel, exist, callback){
        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        if(searchPlot(subject.tissue) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectTissueList", "patientId": PATIENTID};
            ds_cond.callback = setTissue;
            action.selectEventList(ds_cond);
        }else{
            setTissue([]);
        }
    }
    var setTissue = function(json){
        //if(json.length>0)
        console.log('Tissue ', json);
          SPDATA = json;
        if(searchPlot(subject.tissue) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectBrcList", "patientId": PATIENTID};
            ds_cond.callback = disposer;
            action.selectEventList(ds_cond);
        }else{
            disposer([]);
        }
    }

    function disposer(json) {
        console.log('brc ', json);
        var crow = [];
        if (json.length > 0) {
            //SPDATA = _.union(SPDATA, json);
            console.log("SPDATA ", SPDATA);

            var htem = {};
            htem.id = TITLE.specimen;
            htem.pid = "0";
            htem.name = 'Specimen';
            htem.level = 0;
            htem.show = true;
            htem.folder = false;
            htem.always = true;
            htem.leaf = false;
            htem.time = '00000000';
            crow.push(htem);

            var raw = _.union(SPDATA, json);
            console.log('raw ', raw);
            crow = setData(crow, raw);
            console.log('specimen crow is ', crow);
            self.callback(crow);
        }else{
            self.callback([]);
        }
    }

    function setData(crow, data) {
        // var mdata = _.uniqBy(data, 'id');
        // console.log('mdata ', mdata);
        // data = mdata;
        console.log('data length', data);
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.specimen;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;
            item.show = true;
            item.level = 1;
            item.folder = false;
            item.pid = TITLE.specimen;
            item.subject = data[i].subject;
            if (util._isUndefined(item.name))
                item.name = '';
            if(item.time!=='00000000')
                item.leaf = true;
                crow.push(item);
        }
        console.log('====> ', crow);
        return crow;
    }

}
