
function Sugery() {
    var self = this;
    var action = new Action();
    var util = new Util();
    var crow = [];

    self.init = function(findLevel, exist, callback){
        plotFilter = new PlotFilter();
        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        if(plotFilter.searchPlot(subject.surgery) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectSugeryList", "patientId": PATIENTID};
            ds_cond.callback = setSugery;
            action.selectEventList(ds_cond);
        }else{
            disposer();
        }
    }

    var setHeader = function(){
        var htem = {};
        htem.id = TITLE.surgery;
        htem.pid = "0";
        htem.name = 'Surgery';
        htem.subject = subject.surgery;
        htem.level = 1;
        htem.show = true;
        htem.folder = false;
        htem.always = true;
        htem.leaf = false;
        htem.time = '00000000';
        crow.push(htem);
    }
    var setSugery = function(json) {
        console.log('setSugery ',json.length); 
            sugery_setData(json);
       
    }



    function sugery_setData(data) {
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.surgery;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;
            item.opDt = data[i].opDt;
            item.opdpCdNm = data[i].opdpCdNm;
            item.inhospOpCd = data[i].inhospOpCd;
            item.inhospOpEngNm = data[i].inhospOpEngNm;
            item.show = true;
            item.level = 1;
            item.folder = false;
            item.pid = '0';
            item.subject = data[i].subject;
            if (util._isUndefined(item.name))
                item.name = '';
            if(item.time!=='00000000')
                item.leaf = true;

                crow.push(item);
        }
        console.log('surgery_setData => ', crow);
        disposer();
    }

    var disposer = function(){
        self.callback(crow);
    }

}
