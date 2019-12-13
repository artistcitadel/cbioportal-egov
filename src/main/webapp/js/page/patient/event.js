function Event() {
    var self = this;
    var util = new Util();

    self.getPlotColor = function(sub,id){
        console.log('pdata[i].subject ', sub,id);
        return (sub === subject.pathlogy) ? '#3941FF':
               (sub === subject.lab_test) ? '#ff9361' :
               (id === subject.tissue) ? '#ff9361' :
               (id === subject.brc) ? '#81abf6' :
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

    self.classify_pathlogy = function(data,  UNIT) {
        var item = {};
        var tip = '';
        for(var i=0;i<data.length;i++) {
            tip += "<span>" + util.dateFormat(UNIT, data[i].time) + "</p>";
            tip += "[" + data[i].name + "]<br/>";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_tissue= function(data,  UNIT) {
        var item = {};
        var tip = '';
        for(var i=0;i<data.length;i++) {
            tip += "<span>" + util.dateFormat(UNIT, data[i].time) + "</p>";
            tip += "<span>처방코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].ordrCd + "</br>";
            tip += "<span>검사코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].examCd + "</br>";
            tip += "<span>검사번호 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].examNo + "</br>";
            tip += "<span>검체번호 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].spcnNo + "</br>";
            tip += "<span>검체검사처방유형코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].spcnExamOrdrTypCd + "</br>";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_brc = function(data,  UNIT) {
        var item = {};
        var tip = '';
        for(var i=0;i<data.length;i++) {
            tip += "<span>" + util.dateFormat(UNIT, data[i].time) + "</p>";
            tip += "<span>검체번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].dpSpcnNo + "</br>";
            tip += "<span>검체형태 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].tissColecCd + "</br>";
            tip += "<span>장기코드 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].cellOrganDiyCd + "</br>";
            tip += "<hr />";
        }
        return tip;
    }
}