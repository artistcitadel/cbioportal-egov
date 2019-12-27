function Image() {
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
        if(plotFilter.searchPlotId(subject.ct) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectCtList", "patientId": PATIENTID};
            ds_cond.callback = setCt;
            action.selectEventList(ds_cond);
        }else{
            round_mri();
        }
    }

    var setHeader = function(){
        var htem = {};
        htem.id = TITLE.imaging;
        htem.pid = "0";
        htem.name = 'Imaging';
        htem.subject = subject.imaging;
        htem.level = 1;
        htem.show = true;
        htem.folder = false;
        htem.always = true;
        htem.leaf = false;
        htem.time = '00000000';
        crow.push(htem);
    }
    function round_mri() {
        console.log('round_mri called');
        if(plotFilter.searchPlotId(subject.mri) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectMriList", "patientId": PATIENTID};
            ds_cond.callback = setMri;
            action.selectEventList(ds_cond);
        }else{
           round_petct();
        }

    }
    function round_petct(json) {
        if(plotFilter.searchPlotId(subject.petct) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPetCtList", "patientId": PATIENTID};
            ds_cond.callback = setPetct;
            action.selectEventList(ds_cond);
        }else{
        	round_us();
        }
    }
    
    function round_us(json) {
        if(plotFilter.searchPlotId(subject.us) !==-1) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectUsList", "patientId": PATIENTID};
            ds_cond.callback = setUs;
            action.selectEventList(ds_cond);
        }else{
            disposer([]);
        }
    }

    var setCt = function(json) {
    	console.log('setCt called');
         setHeader();
         ct_setData(json);
    }

    var setMri = function(json) {
         mri_setData(json);
    }

    var setPetct = function(json) {
        petct_setData(json);
    }
    var setUs = function(json) {
        us_setData(json);
    }



    function ct_setData(data) {
        console.log('ct_setData');
        setData(data);
        round_mri();
    }

    function mri_setData(data) {
        console.log('mri_setData');
        setData(data);
        round_petct();
    }

    function petct_setData(data){
        console.log('petct_setData');
        setData(data);
        round_us();
       
    }
    function us_setData(data){
        console.log('us_setData');
        setData(data);
        disposer();
    }

    var disposer = function(){
        self.callback(crow);
    }

    function setData(data) {
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.subject = subject.specimen;
            item.leaf = true;
            item.time = data[i].time;
            if (util._isUndefined(data[i].time))
                item.time = '00000000';
            item.id = data[i].id;
            item.name = data[i].name;

            item.examdate = data[i].examdate;
            item.cdValNm = data[i].cdValNm;
            item.clinicdate = data[i].clinicdate;
            item.modality = data[i].modality;
            item.ordercode = data[i].ordercode;
            item.ordrEngNm = data[i].ordrEngNm;

            item.show = true;
            item.level = 1;
            item.folder = false;
            item.pid = TITLE.imaging;
            item.subject = data[i].subject;
            if (util._isUndefined(item.name))
                item.name = '';
            if (item.time !== '00000000')
                item.leaf = true;
            crow.push(item);
        }
        // console.log('round imaging => ', crow);
    }
}
