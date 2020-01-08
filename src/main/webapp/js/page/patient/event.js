/**
 * @author 오세영
 */
function Event() {
    var self = this;
    var util = new Util();

    self.getPlotColor = function(sub,id){
        // console.log('pdata[i].subject ', sub, id);
        var color =  (sub === subject.pathology) ? '#3941FF':
            (id === subject.tissue) ? '#000' :
            (id === subject.brc) ? '#8fe623' :
            (sub === subject.biopsy) ? '#b4c4cc' :
            (sub === subject.surgery) ? '#6ed2f6' :
            // (sub === subject.imaging) ? '#f6df23' :
            (id === subject.ct) ? '#27176b' :
            (id === subject.mri) ? '#e97c18' :
            (id === subject.petct) ? '#871982' :
            (id === subject.us) ? '#1a21e6' :
            '';
         // if(id === subject.brc)
         //     console.log('eventcolor', color);
        return color;
    }

    self.classify_tissue= function(data,  UNIT) {
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</p>";
        for(var i=0;i<data.length;i++) {
            tip += "<span>처방코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].ordrCd + "</br>";
            tip += "<span>검사코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].examCd + "</br>";
            tip += "<span>검사번호 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].examNo + "</br>";
            tip += "<span>검체번호 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].spcnNo + "</br>";
            tip += "<span>검체검사처방유형코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].spcnExamOrdrTypCd + "";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_brc = function(data,  UNIT) {
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</p>";
        for(var i=0;i<data.length;i++) {
            tip += "<span>검체번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].dpSpcnNo + "</br>";
            tip += "<span>검체형태 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].tissColecCd + "</br>";
            tip += "<span>장기코드 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].cellOrganDiyCd + "</br>";
            tip += "<input class='btn-link' type='button' value='분양' onClick=regBrc('"+PATIENTID+"','"+replaceAll(data[i].dpSpcnNo,' ','_')+"')>";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_pathology = function(data, UNIT) {
        //console.log('event pathology ', data);
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</br>";
        for(var i=0;i<data.length;i++) {
            // tip += "<span>" + util.dateFormat(UNIT, data[i].time) + "</p>";
            // tip += "[" + data[i].name + "]<br/>";
            // tip += "<hr />";
            tip += "<span>검사코드 &nbsp;&nbsp; : &nbsp;&nbsp;" + data[i].examCd + "</br>";
            tip += "<span>검사명 &nbsp;&nbsp; : &nbsp;&nbsp;" + data[i].examKorNm + "";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_sugery = function(data,  UNIT) {
        var tip = '';
        // tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</p>";
        for(var i=0;i<data.length;i++) {
            // tip += "<hr />";
            tip += "<span>수술일자 : " + data[i].opDt + "</br>";
            tip += "<span>수술과  : " + data[i].opdpCdNm + "</br>";
            tip += "<span>원내수술코드 : " + data[i].inhospOpCd + "</br>";
            tip += "<span>원내수술명 : " + util.null2str(data[i].inhospOpEngNm) + "";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_biopsy = function(data,  UNIT) {
        // console.log('data_biopsy ', data);
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "<br/>";
        for(var i=0;i<data.length;i++) {
            // tip += "<hr />";
            tip += "<span>검체체취일자  : " + data[i].spcnColecDt + "</br>";
            tip += "<span>검체번호 : " + data[i].spcnNo + "</br>";
            tip += "<span>장기코드 : " + data[i].organCd + "</br>";
            tip += "<span>장기부위코드 : " + data[i].organSiteCd + "</br>";
            tip += "<span>병리검체위치코드 : " + data[i].dpSpcnLocCd + "";
            tip += "<hr />";
        }
        //console.log('data_biopsy ', tip);
        return tip;
    }

    self.classify_image = function(data,  UNIT) {
        // console.log('data_biopsy ', data);
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</br>";
        for(var i=0;i<data.length;i++) {
            // tip += "<hr />";
            tip += "<span>처방부서  : " + util.null2str(data[i].cdValNm) + "</br>";
            tip += "<span>처방일자 : " + data[i].clinicdate + "</br>";
            tip += "<span>MOD : " + data[i].modality + "</br>";
            tip += "<span>검사코드 : " + data[i].ordercode + "</br>";
            tip += "<span>검사코드명 : " + data[i].ordrEngNm + "";
            tip += "<hr />";
        }
        //console.log('data_biopsy ', tip);
        return tip;
    }


}