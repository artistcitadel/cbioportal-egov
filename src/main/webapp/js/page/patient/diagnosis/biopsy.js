
function Biopsy() {
    var self = this;
    var action = new Action();
    var util = new Util();
    var crow = [];

    self.init = function(findLevel, exist, callback){
        plotFilter = new PlotFilter();
        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        if(plotFilter.searchPlot(subject.biopsy) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectBiopsyList", "patientId": PATIENTID};
            ds_cond.callback = setBiopsy;
            action.selectEventList(ds_cond);
        }else{
            disposer();
        }
    }

    var setHeader = function(){
        var htem = {};
        htem.id = TITLE.biospy;
        htem.pid = "0";
        htem.name = 'Biopsy';
        htem.subject = subject.biopsy;
        htem.level = 1;
        htem.show = true;
        htem.folder = false;
        htem.always = true;
        htem.leaf = false;
        htem.time = '00000000';
        crow.push(htem);
    }
    var setBiopsy = function(json) {
        console.log('setBiopsy ',json.length);
          biopsy_setData(json);
    }



    function biopsy_setData(data) {
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.biopsy;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;

            item.spcnColecDt = data[i].spcnColecDt;
            item.spcnNo = data[i].spcnNo;
            item.organCd = data[i].organCd;
            item.organSiteCd = data[i].organSiteCd;
            item.dpSpcnLocCd = data[i].dpSpcnLocCd;

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
        // console.log('biopsy_setData => ', crow);
        disposer();
    }

    var disposer = function(){
        self.callback(crow);
    }

}
