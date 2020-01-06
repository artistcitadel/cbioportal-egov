function Specimen() {
    var self = this;
    var action = new Action();
    var util = new Util();
    var RAW = [];
    var crow = [];
    var plotFilter;

    self.init = function(findLevel, exist, callback){
        plotFilter = new PlotFilter();
        self.findLevel = findLevel;
        self.exist = exist;
        self.callback = callback;
        if(plotFilter.searchPlotId(subject.tissue) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectTissueList", "patientId": PATIENTID};
            ds_cond.callback = setTissue;
            action.selectEventList(ds_cond);
        }else{
            setTissue([]);
        }
    }

    var setSpecimenHeader = function(){
        var htem = {};
        htem.id = TITLE.specimen;
        htem.pid = "0";
        htem.name = 'Specimen';
        htem.subject = subject.specimen;
        htem.level = 1;
        htem.show = true;
        htem.folder = false;
        htem.always = true;
        htem.leaf = false;
        htem.time = '00000000';
        crow.push(htem);
    }
    var setTissue = function(json) {
        // if(json.length>0){
            setSpecimenHeader();
            tissue_setData(json);
        // }
        //   if (plotFilter.searchPlotId(subject.brc) !== -1) {
        //       round_brc();
        //   }

    }

    function round_brc(json) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectBrcList", "patientId": PATIENTID};
            ds_cond.callback = brc_setData;
            action.selectEventList(ds_cond);
    }

    function tissue_setData(data) {
        console.log('tissue_setData called');
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.specimen;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;
            item.ordrCd = data[i].ordrCd;
            item.examCd = data[i].examCd;
            item.examNo = data[i].examNo;
            item.spcnNo = data[i].spcnNo;
            item.spcnExamOrdrTypCd = data[i].spcnExamOrdrTypCd;
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
        // console.log('round tissue => ', crow);
     //return crow;
        if (plotFilter.searchPlotId(subject.brc) !== -1) {
            round_brc();
        }else{
            disposer();
        }
    }

    function brc_setData(data) {
        if(data.length>0 && crow.length===0){
            setSpecimenHeader();
        }
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.specimen;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;

            item.dpSpcnNo = data[i].dpSpcnNo;
            item.tissColecCd = data[i].tissColecCd;
            item.cellOrganDiyCd = data[i].cellOrganDiyCd;
            item.cdNm = data[i].cdNm;

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
        // console.log('round brc => ', crow);
        disposer();
    }

   var disposer = function(){
       self.callback(crow);
   }
}
