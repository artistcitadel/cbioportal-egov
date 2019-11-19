var leftpadding = 90;
var paperWidth = 1245;
var paperHeight = 30;
var paper;
var yRuler = 15;
var XGRIDS=[];
var PAPERNODE=[];
var LASTYPOS=0;
var TIME;
var DATA;
var chmName;
var xt;
var m;
var UNIT;
var dig=[];
var LTEXTLENGTH=[];
var OLINE=[];
var pixelMap=[];
var HRC_LAB;
var LINEEND;
var RAW;
//var XTREETEXTPADDING=24;
var XTREETEXTPADDING=4;
var MODE='N';

function dformat(dat){
    /*if(UNIT==='d')return dat.substring(0,4)+'.'+dat.substring(4,6)+'.'+dat.substring(6,8);
    if(UNIT==='m')return dat.substring(0,4)+'.'+dat.substring(4,6);
    if(UNIT==='y')return dat.substring(0,4);*/
    if(UNIT==='d')return util.subtractzero(dat.substring(6,8))+'일';
    if(UNIT==='m')return util.subtractzero(dat.substring(4,6))+'월';
    if(UNIT==='y')return dat.substring(0,4)+'년';
}
/*function dunformat(dat){
    console.log(UNIT, dat);
    if(UNIT==='d')return dat.split(".")[0]+dat.split(".")[1]+dat.split(".")[2];
    if(UNIT==='m')return dat.split(".")[0]+dat.split(".")[1];
    if(UNIT==='y')return dat.substring(0,4);
}*/

var TITLE ={
    "Specimen" : "1",
    "Lab_test" : "2"
};

function getAsocite(mdata){
    var udata = util.arrayToTree(mdata);

}

function exist(data, key){
    var find=false;
    for(var i=0;i<data.length;i++){
        if(data[i]===key){
            find=true;
            break;
        }
    }
    return find;
}
function setData(crow, data) {
    var mdata = _.uniqBy(data, 'id');
    var pdata = util.arrayToTreeParent(mdata);
    //pdata = _.uniq(pdata);
    console.log('parent key ' , pdata);
    for (var i = 0; i < data.length; i++) {
        var item = {};
        item.leaf = false;
        item.time = data[i].time;
        item.id = data[i].id;
        item.name = data[i].name;
        item.show = true;
        item.level = 1;
        item.folder = false;
        item.pid = data[i].pid;
        item.subject = data[i].subject;
        if(_.isUndefined(item.pid))
            item.pid=TITLE[item.subject];
        if (_.isUndefined(item.name))
            item.name = '';

        if(!_.isUndefined(data[i].crte)) {item.crte = data[i].crte; item.leaf=true;}
        if(!_.isUndefined(data[i].exam)) {item.exam = data[i].exam; item.leaf=true;}
        if(!_.isUndefined(data[i].mark)) {item.mark = data[i].mark; item.leaf=true;}

        if(exist(pdata,item.id) || item.leaf){
            console.log(item.id);
            item.level = findLevel(item.pid, data, item.level);
            crow.push(item);
            LTEXTLENGTH.push(item.name.length + XTREETEXTPADDING);
        }
    }
    return crow;
}


function disposer(json) {
    var crow = [];
    if(json.result.length>0){
        var data = json.result;
        //console.log(data);
        if(data[0].subject==='Lab_test'){
            var htem = {};
            htem.id="2";
            htem.pid="0";
            htem.name='Lab_test';
            htem.level=0;
            htem.show=true;
            htem.folder=false;
            htem.always=true;
            htem.leaf = false;
            crow.push(htem);
        }
        //console.log(' init data ', data);
        var raw_lab_text = _.union(HRC_LAB, data);
        crow = setData(crow, raw_lab_text);
        console.log('crow is ', crow);
        RAW=crow;
        setTimeLine('C', crow);
    }
}

function findLevel(pid, data, lvl){
    var id = _.findIndex(data, function(o) { return o.id === pid; });
    if(id ==- 1) {
        return lvl;
    }
    if (id !=- 1 && _.isUndefined(data[id].pid) ) {
        return ++lvl;
    }
    if( id !==-1 && !_.isUndefined(data[id].pid) ) {
        return findLevel(data[id].pid, data, ++lvl);
    }
}

function setTimeLine(node, data){
    leftpadding += _.max(LTEXTLENGTH);
    leftpadding*=2;
    leftpadding+=XTREETEXTPADDING;

    var start = leftpadding+XTREETEXTPADDING;
    //( node==='C') ? chmName = setChmName(data) : (node==='F')?(chmName = setTrack(data), node='R'):null;
    ( node==='C') ? chmName = setTrack(data) : null;
    console.log(chmName);
    xt = setXposition(start, chmName.length);
    console.log(xt);
    m = setXnamePosition(xt);
    console.log(m);
    var end = xt[xt.length-1];
    var margin = paperWidth-end;
    end +=  margin;
    LINEEND=end;
    console.log('xt[xt.length-1] ',end);
    drawTimeLine(start, chmName,xt,m, end);

    (node !=='R') ? makeEventBarChart() : makeEventBarChartCache();
}

function setTrack(data){
    dig = data;
    console.log(' data is ',dig);
    var chmName=[];
    var temp = [];
    for(var i=0; i<data.length; i++){
        if(!_.isUndefined(data[i].time))
        temp.push(data[i].time);
    }
    var tmp = _.uniq(temp);
    tmp = _.sortBy(tmp);
    console.log('tmp ', tmp);
    var min = _.min(tmp)+"";
    var max = _.max(tmp)+"";
    var size = 0;
    //var unit = 'd';
    //min = '20010101';
    //max = '20040101';
    size =util.monthAndYearDiff(min,max,'d');
    size+=1;
    console.log('size ' , size);

    //if(_.isUndefined(UNIT))
    if(MODE=='N') (size < 32) ? UNIT = 'd' : ((size < 32 * 30 - 29 && size > 31) ? UNIT = 'm' : (size > 32 * 30 - 29) ? UNIT = 'y' : '');
    else{
        if(UNIT==='m'){UNIT='d';}
        if(UNIT==='y'){UNIT='m';}
    }

    console.log(UNIT);

    console.log('min ', min, max, size);
    if(UNIT==='d') {size =util.monthAndYearDiff(min,max,'d')+2;}
    if(UNIT==='m') {size =util.monthAndYearDiff(min,max,'m')+2;}
    if(UNIT==='y') {size =util.monthAndYearDiff(min,max,'y')+2;}
    console.log(' size ', size);
    //size+=2;
    for(var k=0;k<size;k++){
        chmName.push(getChmDay(min, k, UNIT));
    }
    console.log(chmName);
    return chmName;
}

function getChmDay(day, k, unit){
//console.log(day , k , unit);
    var time = moment(day,'YYYYMMDD');
    if(unit==='d'){
        var next = moment(time).add(k, 'days');
        //console.log(moment(next).format('YYYYMMDD'));
        return moment(next).format('YYYYMMDD');
    }
    if(unit==='m'){
        var next = moment(time).add(k, 'M');
        //console.log('next is ',next);
        return moment(next).format('YYYYMM');
    }
    if(unit==='y'){
        var next = moment(time).add(k, 'years');
        return moment(next).format('YYYY');
    }
}
var gap;
function setXposition(start, count){
    var xt=[];
    //var gap = ((paperWidth-leftpadding)/count)/2;
    gap = (paperWidth-start)/count/2;
    console.log('gap ', gap);
    //gap = gap + gap/2;
    //console.log(gap);
    //var length = start*count;
    for (var i=0; i<count*2; i++){
        if(i>0)  xt[i] = xt[i-1]+gap;
        if(i==0) xt[i]=start;
    }
    //alert(xt[xt.length-1]);
    return xt;
}

function setXnamePosition(xt){
    var m=[];
    var uend;
    for(var i=0; i<xt.length-1; i++){
        //m[i] = xt[i] + ( (xt[i+1]-xt[i]) / 2);
        //console.log(xt.length, uend = xt[i+1]);
        if(xt.length<3) uend = xt[i+1];
        else uend =xt[i+2];
        //console.log(uend);
        m[i] = (xt[i] + uend) /2 ;
    }
    // console.log(m[m.length-2]);
    // console.log((paperWidth-m[m.length-2]) /2);
    // console.log((m[m.length-2]) + ((paperWidth-m[m.length-2]) /2));
    if(xt.length<3)return m;
    else m[m.length-1] = (m[m.length-2]) + ((paperWidth-m[m.length-2]) /2);
    return m;
}

function drawTimeLine(start, chmName,xt,m, end){
    console.log(yRuler, start);
    var oline = drawLine(start, yRuler, end, yRuler, paper, '#000', 1);
    OLINE.push(oline);
    //drawLine(xt[0], yRuler, xt[0], 5, paper, '#000', 1);
    console.log( 'start ', start);
    var txtCnt = 0;
    for (var i = 0; i < xt.length; i++) {
        if(i%2===0) {
            //var mx = xt[i]+rootNodePadding;
            var mx = xt[i];
            //console.log('mx ', xt[i]);
            oline = drawLine(mx, yRuler, mx, 5, paper, '#000', 1);
            OLINE.push(oline);
            var txt = paper.text(m[i], 10, dformat(chmName[txtCnt]));
            txt.data({id:chmName[txtCnt]});
            txt.click(function () {
                //var temp = dunformat(this.attr('text'));
                var temp = this.data('id');
                console.log(temp);
                //console.log(RAW);
                var state = RAW;
                console.log(state);
                state = _.filter(state, function(o) {
                     var time = o.time;
                     //console.log('click temp is ',time, '=> ',UNIT,  temp);
                     if(_.isUndefined(time))time="00000000"
                     //console.log(time.substring(0,4));
                     if(UNIT==='d') {return (time===temp);}
                     if(UNIT==='m') {return (time.substring(0,6)===temp);}
                     if(UNIT==='y') {return (time.substring(0,4)===temp);}
                 });
                console.log('state is ', state);
                if(state.length<1)return;
                var dat = [];
                state = util.makeHrc(state, RAW, dat);
                state = _.reverse(state);
                var state = _.uniqBy(state, function(o) {
                    return o.id + this.util.nt(o.time);
                })
                console.log('make hrc state ', state);
                //return;
                MODE='P';
                removeLine();
                clearPaperPlotNode();
                setTimeLine('C', state);
                /*if (this.attr('text-anchor') == 'middle') {
                    this.attr({
                        'text-anchor': 'start',
                        'font-size': 13,
                        'fill': "#62f"
                    });
                } else {
                    this.attr({
                        'text-anchor': 'middle',
                        'font-size': 10,
                        'fill': "#000"
                    })
                }*/
            });
            ++txtCnt;
            OLINE.push(txt);
        }
    }
    oline = drawLine(end-1, yRuler, end-1, 5, paper, '#000', 1);
    OLINE.push(oline);
}

function drawLine(x1, y1, x2, y2, p, cl, width) {
    //console.log('drawLine ', y1);
    width=1;
    var path = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
    var line = p.path(path);
    line.attr("stroke", cl);
    line.attr("stroke-width", width);
    line.attr("opacity", 0.5);
    line.translate(0.5, 0.5);
    return line;
}

// -- event bar chart -- //

function classify_labtest(data) {
    var item = {};
    var  tip = "<strong>[" + data.id + "]</strong><br/>";
         tip += "[" + data.name + "]<hr/>";
         tip+="<span class='font-small'>검사 결과값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.exam + "</br>";
         tip+="<span class='font-small'>표시 결과값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.mark + "</br>";
         tip+="<span class='font-small'>기준 단위값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.crte + "</br>";
    return tip;
}

function calcMinuteTime(time){
    if(UNIT==='y')return time.substring(0,4);
    if(UNIT==='m')return time.substring(0,6);
    if(UNIT==='d')return time.substring(0,8);
}
function getRestPosition(t){
    var pad=5;
    var t = calcMinuteTime(t);
    for(var i=0;i<pixelMap.length;i++){
        var compare = calcMinuteTime(pixelMap[i].time);
        if(t===compare)pad+=5;
    }
  return pad;
}
function setPlotAxis(pdata){
    console.log('pdata is ' , pdata);
    for(var i=0;i< pdata.length;i++){
        if(pdata[i].leaf) {
            var p = getXTposition(pdata[i].time);
            var r = getRestPosition(pdata[i].time);
            var item = {};
            item.id = pdata[i].id;
            item.time = pdata[i].time;
            item.axis = p+r;
            item.name = classify_labtest(pdata[i]);
            pixelMap.push(item);
        }
    }
    console.log('pixelMap ', pixelMap);
}

function getXTposition(t) {
    var axis;
    // console.log('chmName ', chmName, t);
    t = calcMinuteTime(t);
    //console.log(' xt', xt);
    var indent = 0;
    indent = (UNIT==='d') ? gap : 4;
    for (var i = 0,k=0; i < chmName.length; i++,k++) {
        if (t === chmName[i]) {
            //console.log('time ', t , ' == ', chmName[i])
            if(i==0)axis = xt[i]+indent;
            if(i>0) axis=xt[k]+indent;
            //console.log('getXTposition ', t, axis);
        }
        ++k;
    }
    return axis;
}

function makeEventBarChart() {
    setPlotAxis(dig);
    makeEventBarChartSub();
    //console.log('makeEventBarChart ', dig);
    plotdrawing(dig);
}
function makeEventBarChartCache(){
    //console.log('makeEventBarChartCache ',dig);
    setPlotAxis(dig);
    makeEventBarChartSub();
    plotdrawing(dig);
}
function makeEventBarChartSub(){
    console.log('dig-> ', dig);
    var label = "Time since diagnosis";
    var t = paper.text(55, 10, label).attr({'text-anchor': 'center', 'fill': 'black', "font-size": 12});
    var d = chmName[0];
    d = util.setDateTitle(UNIT, d);
    d="("+d+")";
    $("#dhead").html(d);
    //alert(UNIT + ' ' + chmName[0]);
//  plotdrawing(dig, true);
}

var ycnt=0;
function plotdrawing(dig){
    console.log('dig is ', dig);
    ycnt=0
    dig = _.uniqBy(dig,'id');
    console.log('uniq dig is ', dig);
    //if(tdata.length<1)
     var tdata = util.arrayToTree(dig);
    console.log('tdata ', tdata);
    console.log('tdata.data ', tdata[0]['data']);
    XGRIDS=[];

    plotMuts(paper, ycnt, tdata[0]);
    if(tdata[0]['data'].length>0)
      printPlot(paper, tdata[0]['data']);
    //console.log(' LASTYPOS ', LASTYPOS);
    $('#genomicOverviewTracksContainer').children(1).css('height',LASTYPOS+3+'px');
    MODE='N';
    $('.spinner').hide();
}

function printPlot(paper, tdata){
    var data = _.uniqBy(tdata, 'id');
    //console.log('data ', data);
    for(var i=0;i<data.length;i++) {
        plotMuts(paper, ycnt, data[i]);
        if(data[i].data.length>0) {
            printPlot(paper, data[i].data);
        }
    }
}

function fyRow(row) {
    return 2*5+10+row*(20+5);
}

function plotMuts(p, row, item) {
    if(!item.show)return;
    ++ycnt;
    console.log('--> ', item.id, row);

    var maxCount = 5; // set max height to 5 mutations
    var yRow = fyRow(row) + 20;

    if(item.leaf) {
        var pixelAry = _.filter(pixelMap, {'id': item.id});
        for (var i = 0; i < pixelAry.length; i++) {
            var position = pixelAry[i].axis;
            //var h = pixelMap[i].name.length>maxCount ? 20 : (20*pixeldata[i].name.length/maxCount);
            var h = maxCount;
            console.log('yrow ', yRow, h);
            var r = p.rect(position, yRow - 6, 3, h);
            r.attr("fill", "#0f0");
            r.attr("stroke", "#0f0");
            r.attr("stroke-width", 1);
            r.attr("opacity", 0.5);
            r.translate(0.5, 0.5);
            r.hover(function () {
                    this.transform('S1.5,1.5');
                }, function () {
                    this.transform('s1,1');
                }
            );
            //addToolTip(r.node, pixeldata[i].name.join("</br>"), 100, '');
            addToolTip(r.node, pixelMap[i].name, 100, '');
            PAPERNODE.push(r);
        }
    }


    var label = item;
    //~~ for tree  ~~//
    if(label.show) {
        var deep = label.level;
        if (label.leaf) deep += 2;
        console.log('show ', label, label.folder);
        //var ar = '❯ ';
        var ar = "❯ ";
        if (label.leaf) ar = '';

        if (!label.leaf) {
            console.log(label.folder);
            if (!label.folder) ar = "﹀ ";
        }
        var lbl = label.name;
        lbl = ar + lbl;
        //console.log('label_text length ', lbl.length);
        var t = p.text((12 + Number(deep) * 8), yRow + 7 - (row + 8), lbl).attr({
            'text-anchor': 'start',
            'fill': 'black',
            'cursor': 'pointer',
            'font-size': '12'
        });

        if(!label.leaf) {
            t.click(function () {
                setTreeNode(label.id);
            });
        }

        PAPERNODE.push(t);
        var ypos = yRow + 5;
        LASTYPOS = ypos;
        //var xgrid = drawLine('170', ypos, 1090+150, ypos, paper, '#ccc', 1);
        var xgrid = drawLine(xt[0], ypos, LINEEND, ypos, paper, '#ccc', 1);
        xgrid.hide();
        //console.log(' LASTYPOS ', LASTYPOS);
        XGRIDS.push(xgrid);
    }
}

function clearPaperPlotNode() {
    console.log(' PAPERNODE ', PAPERNODE.length);
    for (var i = 0; i < PAPERNODE.length; i++) {
        PAPERNODE[i].remove();
    }
}

function removeLine(){
    leftpadding=90;
    pixelMap=[];
    for (var i=0;i<OLINE.length; i++){
        OLINE[i].remove();
    }
}


function setTreeNode(id){
    var idx = _.findIndex(dig, function (o) {
        return o.id === id;
    });
    var folder = !dig[idx].folder;
    dig[idx].folder = folder;
    var show =  !folder;



    var dat = [];
    var fdata = _.filter(dig, ["pid", id]);
    console.log('fdata ',fdata);
       for(var i=0; i<fdata.length;i++){
           dat.push(fdata[i].id);
           if(_.isArray(fdata[i].data) && fdata[i].data.length>0) {
               dat.push(fdata[i].data[0].id);
               dat = util.find(fdata[i].data[0], dat);
           }
       }


    dat = _.uniq(dat);
    console.log(' dat is ', dat);

    for(var i=0;i<dat.length;i++){
        var x = _.findIndex(dig, function (o) {
            return o.id === dat[i];
        });
        dig[x].folder = folder;
        dig[x].show = show;
    }

    clearPaperPlotNode();
    plotdrawing(dig);
}

function addToolTip(node, tip, showDelay, position) {
    var param = {
        content: {text:tip},
        show: {event: "mouseover"},
        hide: {fixed: true, delay: 100, event:"mouseout"},
        style: { classes: 'qtip-light qtip-rounded' },
        position: {
            my: "bottom right",
            at: "top left",
            viewport: $("body")
        }
    };
    $(node).qtip(param);

}

