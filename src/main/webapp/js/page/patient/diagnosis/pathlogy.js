
function Pathlogy() {
    var self = this;
    var action = new Action();
    var util = new Util();

    self.init = function(findLevel, exist, callback){



        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPathHrc", "patientId": PATIENTID};
        ds_cond.callback = setClassifyHrc;
        action.selectList(ds_cond);
    }
    var setClassifyHrc = function (json) {
        if (json.length > 0) {
            self.HRC = json;
            //console.log("PATHLOGY ", self.HRC);

            //~~~category filter query
            var digcategory=[];
            if(!_.isUndefined(localStorage["digcategory"]))
                digcategory = JSON.parse(localStorage.getItem("digcategory"));
            var itemsub = _.filter(digcategory, function(v){
                return v.pid === subject.pathlogy;
            });
            //console.log('itemsub ', itemsub);
            var temp=[];
            for(var i=0;i<itemsub.length;i++){
                temp.push(itemsub[i].idd);
            }

            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPathList", "patientId": PATIENTID};
            if(temp.length>0){
                var qtr = '';
                // console.log('temp.join(",") ', temp);
                // console.log('temp.join(",") ', temp[0]);
                if(temp.length>1)
                    qtr = temp.join(",");
                else
                    qtr = temp[0];
                ds_cond.data.inParam = qtr;
            }
            //console.log('temp.join(",") ', ds_cond.data.inParam);
            //~~~category filter query


            ds_cond.callback = disposer;
            action.selectList(ds_cond);
        }
    }

    function disposer(json) {
        console.log(json);
        var crow = [];
        if (json.length > 0) {
            var htem = {};
            htem.id = "2";
            htem.pid = "0";
            htem.name = 'Pathlogy';
            htem.level = 0;
            htem.show = true;
            htem.folder = false;
            htem.always = true;
            htem.leaf = false;
            htem.time = '00000000';
            crow.push(htem);

            var raw = _.union(self.HRC, json);
            console.log('raw ', raw);
            crow = setData(crow, raw);
            console.log('pathlogy crow is ', crow);
            self.callback(crow);
        }else{
            self.callback([]);
        }
    }

    function setData(crow, data) {
        var mdata = _.uniqBy(data, 'id');
        console.log('mdata ', mdata);
        data = mdata;
        var pdata = util.arrayToTreeParent(mdata);
        console.log('parent key ', pdata);
        console.log('data length', data.length);
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.Pathlogy;
            item.leaf = false;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;
            item.show = true;
            item.level = 1;
            item.folder = false;
            item.pid = data[i].pid;
            item.subject = data[i].subject;
            if (util._isUndefined(item.pid))
                item.pid = TITLE[item.subject];
            if (util._isUndefined(item.name))
                item.name = '';

            console.log("-> ", item.id, item.leaf);
            console.log(self.exist(pdata, item.id));
            if(item.time!=='00000000')
              item.leaf = true;
            if (self.exist(pdata, item.id) || item.leaf) {
                item.level = self.findLevel(item.pid, data, item.level);
                crow.push(item);
            }
        }
        console.log('====> ', crow);
        return crow;
    }

}
