/**
 * @author 오세영
 */
function Event() {
    var self = this;
    var util = new Util();

    self.getPlotColor = function(sub,id){
        // console.log('pdata[i].subject ', sub, id);
        var color =  (sub === subject.pathology) ? '#3941FF':
            (id === subject.tissue) ? '#fb65f4' :
            (id === subject.brc) ? '#ff0000' :
            (sub === subject.biopsy) ? '#ff8040' :
            (sub === subject.surgery) ? '#6ed2f6' :
            // (sub === subject.imaging) ? '#f6df23' :
            (id === subject.ct) ? '#27176b' :
            (id === subject.mri) ? '#b2bccc' :
            (id === subject.petct) ? '#81abf6' :
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
            tip += "<span>처방코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].ordrCd + "</span></br>";
            tip += "<span>검사코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].examCd + "</span></br>";
            tip += "<span>검사번호 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].examNo + "</span></br>";
            tip += "<span>검체번호 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].spcnNo + "";
            if(_.includes(SAMPLENAMES,data[i].spcnNo)){
                tissue_seq = util.getExamNo(SAMPLES, SAMPLENAMES, data[i].spcnNo);
                tip+=getDivSample("plot_"+tissue_seq, parseInt(tissue_seq) ) +"</span>";
            }
            tip += "</br><span>검체검사처방유형코드 &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;" + data[i].spcnExamOrdrTypCd + "</span></span>";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_brc = function(data,  UNIT) {
        var tip = '';
        tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</p>";
        for(var i=0;i<data.length;i++) {
            tip += "<span>검체번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].spcnNo + "</span>";
            if(_.includes(SAMPLENAMES,data[i].spcnNo)){
                tissue_seq = util.getExamNo(SAMPLES, SAMPLENAMES, data[i].spcnNo);
                tip+=getDivSample("plot_"+tissue_seq, parseInt(tissue_seq) ) +"</span>";
            }
            tip += "</br><span>검체형태 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].tissColecCd + "</span></br>";
            tip += "<span>장기코드 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].cellOrganDiyCd + "</span></br>";
            // tip += "<input class='btn-link' type='button' value='분양' onClick=regBrc('"+PATIENTID+"','"+replaceAll(data[i].spcnNo,' ','_')+"')>";
            tip+="<button class='btn-xs btn-danger' onClick=regBrc('"+PATIENTID+"','"+replaceAll(data[i].spcnNo,' ','_')+"')> \n" +
                "            분양\n" +
                "        </button>";
            tip += "</span></span><hr />";
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
            tip += "<span>검사코드 &nbsp;&nbsp; : &nbsp;&nbsp;" + data[i].examCd + "</span></br>";
            tip += "<span>검사명 &nbsp;&nbsp; : &nbsp;&nbsp;" + data[i].examKorNm + "</span></span>";
            tip += "<hr />";
        }
        return tip;
    }

    self.classify_sugery = function(data,  UNIT) {
        var tip = '';
        // tip += "<span>" + util.dateFormat(UNIT, data[0].time) + "</p>";
        for(var i=0;i<data.length;i++) {
            // tip += "<hr />";
            tip += "<span>수술일자 : " + data[i].opDt + "</span></br>";
            tip += "<span>수술과  : " + data[i].opdpCdNm + "</span></br>";
            tip += "<span>원내수술코드 : " + data[i].inhospOpCd + "</span></br>";
            tip += "<span>원내수술명 : " + util.null2str(data[i].inhospOpEngNm) + "</span>";
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
            tip += "<span>검체체취일자  : " + data[i].spcnColecDt + "</span></br>";
            tip += "<span>검체번호 : " + data[i].spcnNo + "</span></br>";
            tip += "<span>장기코드 : " + data[i].organCd + "</span></br>";
            tip += "<span>장기부위코드 : " + data[i].organSiteCd + "</span></br>";
            tip += "<span>병리검체위치코드 : " + data[i].dpSpcnLocCd + "";
            tip += "</span></span><hr />";
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
            tip += "<span>처방부서  : " + util.null2str(data[i].cdValNm) + "</span></br>";
            tip += "<span>처방일자 : " + data[i].clinicdate + "</span></br>";
            tip += "<span>MOD : " + data[i].modality + "</span></br>";
            tip += "<span>검사코드 : " + data[i].ordercode + "</span></br>";
            tip += "<span>검사코드명 : " + data[i].ordrEngNm + "";
            tip += "</span></span><hr />";
        }
        //console.log('data_biopsy ', tip);
        return tip;
    }


}