function Event() {
    var self = this;
    var util = new Util();

    self.getPlotColor = function(subject){
        return (subject==='PATHOLOGY_EXAM') ? '#3941FF':
               (subject==='Lab_test') ? '#ffa670' :
               '';
    }
    self.classify_labtest = function(data, UNIT) {
        var item = {};
        //var tip = "[" + data.id + "]";
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data.time) + "</p>";
        //tip += "<strong>[" + data.name + "]</strong><br/>";
        tip += "[" + data.name + "]<br/>";
        tip += "<hr />";
        //tip += "<span>" + util.dateFormat(UNIT, data.time) + "</br>";
        tip += "<span>검사 결과값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.exam + "</br>";
        tip += "<span>표시 결과값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.mark + "</br>";
        tip += "<span>기준 단위값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.crte + "</br>";
        return tip;
    }

    self.classify_pathlogy = function(data, UNIT) {
        var item = {};
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data.time) + "</p>";
        tip += "[" + data.name + "]<br/>";
        tip += "<hr />";
        return tip;
    }

}