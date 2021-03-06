
function Labtest() {
    var self = this;
    var action = new Action();
    var util = new Util();
    self.init = function(findLevel, exist, callback){
        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectLabTestHrc", "patientId": PATIENTID};
        ds_cond.callback = setClassifyHrc;
        action.selectList(ds_cond, false);
    }
    var setClassifyHrc = function (json) {
        if (json.length > 0) {
            self.PAR = json;
            console.log("PAR ", self.PAR);
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectLabTest", "patientId": PATIENTID};
            ds_cond.callback = disposer;
            action.selectList(ds_cond, false);
        }
    }

    function disposer(json) {
        console.log(json);
        var crow = [];
        if (json.length > 0) {
            var htem = {};
            htem.id = "3";
            htem.pid = "0";
            htem.name = 'Lab_test';
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
            console.log('labtest is ', crow);
            self.callback(crow);
        }
    }

    function setData(crow, data) {
        var mdata = _.uniqBy(data, 'id');
        console.log('mdata ', mdata);
        data = mdata;
        var pdata = util.arrayToTreeParent(mdata);
        console.log('parent key ', pdata);
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.lab_test;
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

            if (!util._isUndefined(data[i].crte)) {
                item.crte = data[i].crte;
                item.leaf = true;
            }
            if (!util._isUndefined(data[i].exam)) {
                item.exam = data[i].exam;
                item.leaf = true;
            }
            if (!util._isUndefined(data[i].mark)) {
                item.mark = data[i].mark;
                item.leaf = true;
            }

            if (self.exist(pdata, item.id) || item.leaf) {
                item.level = self.findLevel(item.pid, data, item.level);
                crow.push(item);
            }
        }
        return crow;
    }

}

