
function Pathology() {
    var self = this;
    var action = new Action();
    var util = new Util();
    var crow = [];

    self.init = function(findLevel, exist, callback){
        plotFilter = new PlotFilter();
        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        if(plotFilter.searchPlot(subject.pathology) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPathologyList", "patientId": PATIENTID};
            ds_cond.callback = setPath;
            action.selectEventList(ds_cond);
        }else{
            disposer();
        }
    }

    var setPathologyHeader = function(){
        var htem = {};
        htem.id = TITLE.pathology;
        htem.pid = "0";
        htem.name = 'Pathology';
        htem.subject = subject.pathology;
        htem.level = 1;
        htem.show = true;
        htem.folder = false;
        htem.always = true;
        htem.leaf = false;
        htem.time = '00000000';
        crow.push(htem);
    }
    var setPath = function(json) {
        // console.log('setPath ',json.length);
        if(json.length>0){
            setPathologyHeader();
        }
        path_setData(json);
    }



    function path_setData(data) {
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.pathology;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;
            item.examCd = data[i].examCd;
            item.examKorNm = data[i].examKorNm;
            item.show = true;
            item.level = 1;
            item.folder = false;
            item.pid = TITLE.pathology;
            item.subject = data[i].subject;
            if (util._isUndefined(item.name))
                item.name = '';
            if(item.time!=='00000000')
                item.leaf = true;

            if (plotFilter.searchPlotId(item.id) !== -1)
              crow.push(item);
        }
        console.log('path_setData => ', crow);
        disposer();
    }

    var disposer = function(){
        self.callback(crow);
    }

}
