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
var PLOTDATA=[];
var OLINE=[];
var pixelMap=[];
var HRC_LAB;
var LINEEND;
var RAW;
var XTREETEXTPADDING=24;
var MODE='N';

function dformat(dat){
    if(UNIT==='d')return dat.substring(0,4)+'.'+dat.substring(4,6)+'.'+dat.substring(6,8);
    if(UNIT==='m')return dat.substring(0,4)+'.'+dat.substring(4,6);
    if(UNIT==='y')return dat.substring(0,4);
}
function dunformat(dat){
    console.log(UNIT, dat);
    if(UNIT==='d')return dat.split(".")[0]+dat.split(".")[1]+dat.split(".")[2];
    if(UNIT==='m')return dat.split(".")[0]+dat.split(".")[1];
    if(UNIT==='y')return dat.substring(0,4);
}

function setData(crow, data){
    for(var i=0;i<data.length;i++){
        var pid='1';
        var item = {};
        item.time = data[i].time;
        item.id   = data[i].id;
        item.name = data[i].name;
        if(_.isUndefined(item.name))item.name='';
        item.pid = data[i].pid;
        //for Lab_test
        item.crte = data[i].crte;
        item.exam = data[i].exam;
        item.mark = data[i].mark;
        var labTestNotShow = (_.isUndefined(item.crte)  && _.isUndefined(item.exam) && _.isUndefined(item.mark));  //for lab_test
        //for Lab_test end
        if(_.isUndefined(item.pid)){
            pid='0';
            item.pid=TITLE[data[i].subject];
        }
        //item.show = "1";
        item.order=0;
        item.level = 1;
        if(!labTestNotShow) {   //is a lab tet leaf
            crow = setLevelData(item,data,crow);

            item.subject=data[i].subject;
            item.leaf = true;
            item.show='1';
            if(pid !== '0')
                item.level = findLevel(item.pid, data, item.level);
            crow.push(item);
            LTEXTLENGTH.push(item.name.length+XTREETEXTPADDING);
            //console.log(' level ', item.pid,  item.id, 'level ',level);
        }

    }
    return crow;
}

var TITLE ={
    "Specimen" : "1",
    "Lab_test" : "2"
};

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
            htem.show='1';
            htem.folder='0';
            htem.always=true;
            crow.push(htem);
        }

        console.log(' data ', data);
        var temp = _.union(HRC_LAB, data);
        crow = setData(crow, temp);
        console.log('crow is ', crow);
        RAW=crow;
        setTimeLine('C', crow);
    }
}

function findLevel(pid, data, lvl){
    var id = _.findIndex(data, function(o) { return o.id === pid; });

    if(id ==-1 || _.isUndefined(data[id].pid)) {
        return lvl;
    }
    if( id !==-1 && !_.isUndefined(data[id].pid)) {
        return findLevel(data[id].pid, data, ++lvl);
    }
}

function setLevelData(item, data, crow) {
    var findindex = _.findIndex(data, function (o) {
        return o.id === item.pid;
    });
    var pitem = {};
    //exists pid
    if (findindex !== -1) {
        pitem.subject=data[findindex].subject;
        pitem.id = data[findindex].id;
        pitem.pid = data[findindex].pid;
        pitem.level=1;
        pitem.folder='0';
        if (_.isUndefined(pitem.pid)) {
            pitem.pid = TITLE[data[findindex].subject];
        } else {
            setLevelData(pitem, data, crow);
            pitem.level = findLevel(pitem.pid, data, pitem.level);
        }
        pitem.name = data[findindex].name;
        pitem.leaf = false;
        crow.push(pitem);
        LTEXTLENGTH.push(pitem.name.length+XTREETEXTPADDING);
    }
    return crow;
}

function setTimeLine(node, data){
    leftpadding += _.max(LTEXTLENGTH);
    leftpadding*=2;
    leftpadding+=XTREETEXTPADDING;

    var start = leftpadding+XTREETEXTPADDING;
    //( node==='C') ? chmName = setChmName(data) : (node==='F')?(chmName = setTrack(data), node='R'):null;
    ( node==='C') ? chmName = setChmName(data) : null;
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

function setChmName(data){
    dig = data;
    return setTrack(data);
}

function setTrack(data){
    console.log(' data is ',data);
    var chmName=[];
    var temp = [];
    for(var i=0; i<data.length; i++){
        if(!_.isUndefined(data[i].time))
        temp.push(data[i].time);
    }
    var tmp = _.uniq(temp);
    tmp = _.sortBy(tmp);
    //temp = _.sortBy(temp);
    //console.log(' tmp is ', tmp);
    //TIME = tmp;
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
    if(MODE=='N')    (size < 32) ? UNIT = 'd' : ((size < 32 * 30 - 29 && size > 31) ? UNIT = 'm' : (size > 32 * 30 - 29) ? UNIT = 'y' : '');
    else{
        if(UNIT==='m'){UNIT='d';}
        if(UNIT==='y'){UNIT='m';}
    }

    console.log(UNIT);

    console.log('min ', min, max, size);
    if(UNIT==='d') {size =util.monthAndYearDiff(min,max,'d');}
    if(UNIT==='m') {size =util.monthAndYearDiff(min,max,'m');}
    if(UNIT==='y') {size =util.monthAndYearDiff(min,max,'y');}
    console.log(' size ', size);
    size+=2;
    for(var k=0;k<size;k++){
    //for(var k=0;k<tmp.length;k++){
        //chmName.push((k+1)+unit);
        //chmName.push((k+1));
        //chmDay.push(getChmDay(min,(k+1), UNIT));
        chmName.push(getChmDay(min, k, UNIT));
    }
    //console.log(chmDay);
    //DATA = data;
//    dig = data;
    console.log(chmName);
    return chmName;
}

function getChmDay(day, k, unit){
console.log(day , k , unit);
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
function setXposition(start, count){
    var xt=[];
    //var gap = ((paperWidth-leftpadding)/count)/2;
    var gap = (paperWidth-start)/count/2;
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
        console.log(xt.length, uend = xt[i+1]);
        if(xt.length<3) uend = xt[i+1];
        else uend =xt[i+2];
        console.log(uend);
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
            console.log('mx ', xt[i]);
            oline = drawLine(mx, yRuler, mx, 5, paper, '#000', 1);
            OLINE.push(oline);
            var txt = paper.text(m[i], 10, dformat(chmName[txtCnt]));
            //txt.attr({id:"text_"+txtCnt});
            txt.click(function () {
                var temp = dunformat(this.attr('text'));
                //console.log(dig);
                var state = RAW;
                state = _.filter(state, function(o) {
                     var time = o.time;
                     console.log('click temp is ',time, '=> ', temp);
                     if(_.isUndefined(time))time="00000000"
                     //console.log(time.substring(0,4));
                     if(UNIT==='d') {return (o.always || time===temp);}
                     if(UNIT==='m') {return (o.always || time.substring(0,6)===temp);}
                     if(UNIT==='y') {return (o.always || time.substring(0,4)===temp);}
                 });
                console.log('state is ', state);
                if(state.length<2)return;
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
    console.log('drawLine ', y1);
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
function findClassify(subject, data, slot) {
    //var slot={};
    var tip = "[" + data.subject + "]<br/>";
        tip += "[" + data.name + "]<br/>";
        slot.name.push(tip);
    //console.log('subject is ', subject);
    if(data.subject=='Lab_test') {
        slot.name.push({"검사 결과값":data.exam,"표시 결과값":data.mark,"기준 단위값" : data.crte});
    }
    return slot;
}

function calcMinuteTime(time){
    if(UNIT==='y')return time.substring(0,4);
    if(UNIT==='m')return time.substring(0,6);
    if(UNIT==='d')return time.substring(0,8);
}
function calcRestTime(time){
    if(UNIT==='y') {
        var rest = time.substring(4);
        return Number(rest)*0.01;

    }
    if(UNIT==='m') {
        var rest = time.substring(6);
        return Number(rest)*0.1;

    }if (UNIT=='d') return 0;
}
function setPlotAxis(pdata){
    console.log(pdata);
    var subject = pdata[0].name;
    var lineW = (xt[1]-xt[0])/10;
    var group = _.groupBy(pdata, function(o){
        return o.id+","+o.time;
    });
    var oid;
    var pad=0;
    var item={};
    item.data = [];
    console.log('group ', group);
    console.log(Object.keys(group).length);
    var len = Object.keys(group).length;
    var k=0;
    var temp = [];
    _.map(group, function(gv, gk) {
        var id = gk.split(",")[0];
        var time = gk.split(",")[1];
        var slot = {};
        slot.name = [];
        if(time!=='undefined' ) {
            var mtime  = calcMinuteTime(time);
            //slot.axis = getAxis(mtime) + (lineW + pad);
            var p = getAxis(mtime);
            var rest = calcRestTime(time);
            console.log(' rest ',p, ' => ', rest);
            slot.axis = p + rest+10;
            slot.show = gv[0].leaf;
            for (var i = 0; i < gv.length; i++) {
                if (gv[i].leaf) {
                    console.log('gv[i] ', gv);
                    // var tip = "[" + subject + "]<br/>";
                    // tip += "[" + gv[i].name + "]<br/>";
                    // slot.name.push(tip);

                    slot = (findClassify(subject, gv[i], slot));
                }
            }
            ++pad;
            if (k > 0 && (oid !== id || k === len - 1)) {
                item.data = temp;
                pixelMap.push(item);
                item = {};
                item.data = [];
                pad = 0;
                temp = [];
            }
            item.id = id;
            item.time = time;
            console.log(' slot ', slot);
            temp.push(slot);
            oid = id;
            ++k;
            console.log('k ', k , ' len ', len, ' id ',id );
            if(len==2) {   //~for one item
                var tmp = {};
                tmp.id = id;
                tmp.data = temp;
                pixelMap.push(tmp);
                console.log(' pixelMap __>', pixelMap);
                k=0;
            }

            if (k === len-1 && id === pixelMap[pixelMap.length - 1].id) {
                pixelMap[pixelMap.length - 1].data.push(slot);
            }
            if (k === len-1 && id !== pixelMap[pixelMap.length - 1].id) {
                var tmp = {};
                tmp.id = id;
                tmp.time = time;
                tmp.data = temp;
                pixelMap.push(tmp);
            }

        }
    });
    console.log(k);
    console.log('pixelMap ', pixelMap);
    //setCalcXsis();
}

/*function setCalcXsis(){
    console.log(' setCalcXsis called ');
    var range = [];
    for (var i=0;i< pixelMap.length;i ++){
        var item = pixelMap[i];
        for(var j=0; j<xt.length; j++);
        if(xt[j] >= item.axis && xt[j] <= item){
            range.push(j);
        }
    }
    console.log(' range is ', range);
}*/



function getXTposition(t) {
    var axis;
    console.log('chmName ', chmName, t);
    console.log(' xt', xt);
    for (var i = 0,k=0; i < chmName.length; i++,k++) {
        if (t === chmName[i]) {
            //axis = xt[(i+1)]*2;
            console.log('time ', t , ' == ', chmName[i])
            if(i==0)axis = xt[i];
            if(i>0) axis=xt[k];
            console.log('getXTposition ', t, axis);
            // console.log(item);
            // console.log(axis);
        }
        ++k;
    }
    return axis;
}

function getAxis(time) {
    return getXTposition(time);
}

function makeEventBarChart() {
    PLOTDATA = dig;
    setPlotAxis(PLOTDATA);
    makeEventBarChartSub();
    console.log('makeEventBarChart ', dig);
    plotdrawing(dig, true);
}
function makeEventBarChartCache(){
    console.log('makeEventBarChartCache ',dig);
    //PLOTDATA = dig;
    setPlotAxis(PLOTDATA);
    makeEventBarChartSub();
    plotdrawing(dig, false);
}
function makeEventBarChartSub(){
    console.log('PLOTDATA-> ', PLOTDATA);
    var label = "Time since diagnosis";
    var t = paper.text(55, 10, label).attr({'text-anchor': 'center', 'fill': 'black', "font-size": 12});
//  plotdrawing(dig, true);
}

function getHundreadRatio(){
    var track = [];
    for(var i=1; i< xt.length;i++){
        var trackUnitPeriod = xt[i]-xt[i-1];
        track.push(trackUnitPeriod);
    }
    console.log(' track period is ', track);
    //console.log(' average is ' , _.meanBy(track));
    return track;
}
function getAddRatio(value){
    console.log(' value ', value);
    var temp = value.toString();
    var seed = "0"+"."+value;
    console.log( ' seed ', seed);
    return Number(seed);
}
function getTargetPosition(seed){
    console.log('seed is ', seed);
    return seed;

    var track = getHundreadRatio();
    console.log(seed);
    var f = seed.substring(0,1);  //prefix
    var l = seed.substring(1);   //surfix
    console.log( ' l ', l);
    var z='';
    for(var i=0;i<l.length;i++){
        z+='0';
    }
    var t = f+z;
    var ratio=10;
    console.log('zero base ', t);   //ex) 78 123 249 519 708 => 0 100 200 500 700
    console.log(' surfix length is ', l.length);
    var temp = Number("1"+z);
    console.log('temp ', temp);
    var index = t/temp;
    console.log('index ', index);

    var idx = 0;
    if(Number(t)<100)idx = 0;
    if(Number(t)>=100 && Number(t)<1000) {idx = index; ratio=100; }
    if(Number(t)>=1000 && Number(t)<10000) {idx = index+'0'; ratio=1000;}
    if(Number(t)>=10000 && Number(t)<100000) {idx = index+'00'; ratio=1000;}

    var holder = getHolderIndex();
    console.log( 'idx ', idx);
    var position = holder[idx];
    console.log('position value ', position);
    console.log(' the horzantal position is ', xt[position]);
    var addup = Number(l)*getAddRatio(track[position]);
    console.log( ' addup ', addup);

    var targetPosition = xt[position] + addup;
    if(idx===0)targetPosition+=25;
    console.log(' target position ' , targetPosition);
    return targetPosition;
}

function getPixelMap(pixel, id) {
    console.log('getPixelMap ', pixel);
    console.log('id ', id);
    var spot = [];
    for(var i=0;i<pixel.length;i++) {
        var pitem = _.map(pixel[i], function (value, key) {
            //console.log(' key ', key);
            //console.log('value ', value);
            //if(key=='name' && value==item){
            if(key=='id' && value==id){
                find = true;
                console.log('find ');
                if(pixel[i].data[0].show)
                    spot.push(pixel[i].data);
            }
        });
    }
    // console.log(' spot ', spot);
    return spot;
}

function getHolderIndex() {
    var positionIndex = [];
    for (var i = 0; i < chmName.length; i++) {
        positionIndex.push(i);
    }
    return positionIndex;
}

function fyRow(row) {
    return 2*5+10+row*(20+5);
}
// var prevtime='00000001';
// var yRow;
var vtime=[];
function plotMuts(p, row, label) {
    console.log(' plotMuts called====> ', row, label);
    console.log('row ', row);
    var maxCount = 5; // set max height to 5 mutations
    var yRow = fyRow(row) + 20;
    //var rowindex = 0;
    // var pad=0;
    // var isdup=false;
    if(label.leaf==true){
       /* console.log('plot print ',UNIT, prevtime, label.time);
        if(UNIT==='y' && prevtime.substring(0,4)===label.time.substring(0,4)){
            pad+=2;
            isdup=true;
        }
        if(UNIT==='m' && prevtime.substring(0,6)===label.time.substring(0,6)){
            pad+=2;
            isdup=true;
        }
        if(UNIT==='d' && prevtime.substring(0,8)===label.time.substring(0,8)){
            pad+=2;
            isdup=true;
        }
        if(!isdup || row===0) {
            yRow = fyRow(row) + 20;
            pad=0;
        }*/
        var pad=0;
        console.log(' label.name ->', label.id, label.time, yRow);
        //var pixeldataV = getPixelMap(pixelMap,label.name.toLowerCase()) || [];
        var pixeldataV = getPixelMap(pixelMap, label.id) || [];
        console.log('pixeldata length =>', pixeldataV);
        _.map(pixeldataV,function(pixeldata,k){
            console.log('k ', k, 'v ', pixeldata);
            var idx = 0;
            for(var i=0;i<pixeldata.length;i++){
                var y=yRow;
                var vdx = _.findIndex(vtime, function (v){
                    v.time = pixeldata[i].time;
                })
                if(vdx==-1) {
                    var v = {};
                    v.time = pixeldata[i].time;
                    v.pad = 0;
                    v.yRow = yRow;
                    vtime.push(v);
                }else{
                  vtime[vdx].pad=+1;
                  pad+=vtime[vdx].pad;
                  y=vtime[vdx].yRow;
                }

                //console.log("  pixeldata[i].axis  ", pixeldata[i]);
                //var position =  getTargetPosition(pixeldata[i].axis+"");
                var position = pixeldata[i].axis+pad;
                console.log(" position => ", position);
                console.log(" pixeldata[i].name.length ",pixeldata[i].name.length);
                var h = pixeldata[i].name.length>maxCount ? 20 : (20*pixeldata[i].name.length/maxCount);
                console.log(yRow-h);
                pixil = 150;
                console.log('y_row ', yRow);
                //var r = p.rect(position, yRow-h-6, 4, h);
                var r = p.rect(position, y, 4, h);
                r.attr("fill","#0f0");
                r.attr("stroke", "#0f0");
                r.attr("stroke-width", 1);
                r.attr("opacity", 0.5);
                r.translate(0.5, 0.5);
                r.hover(function(){
                        this.transform('S1.5,1.5');
                    }, function () {
                        this.transform('s1,1');
                    }
                );
                var tip="";
                // var tip = "["+label.subject+"]<br/>";
                // tip+="["+label.name+"]<br/>";

                for(var j=0;j<pixeldata[i].name.length;j++){
                    var item = pixeldata[i].name[j];
                    if(j===0){
                        tip+= "<strong>"+item+"</strong></p>";
                    }else {
                        _.map(item, function (v, k) {
                            tip += "<span class='font-small'>"+k+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp :  &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + v + "</br>";
                        });
                        tip += "<hr/>";
                    }
                }
                //addToolTip(r.node, pixeldata[i].name.join("</br>"), 100, '');
                addToolTip(r.node, tip, 100, '');
                ++idx;
                PAPERNODE.push(r);
            }
        });
    }
    var deep = label.level;
    if(label.leaf)deep+=1;
    console.log('show ',label.show );
    //var ar = '❯ ';
    var ar = "❯ ";
    if(label.leaf)ar='';

    if(!label.leaf) {
        console.log(label.folder);
        if (label.folder === '0') ar = "﹀ ";
    }
    var lbl = label.name;
    lbl=ar+lbl;
    //console.log('label_text length ', lbl.length);

    var t = p.text((12+Number(deep)*8), yRow + 7 - (row + 8), lbl).attr({'text-anchor': 'start', 'fill': 'black',  'cursor': 'pointer','font-size':'12' });
    t.click(function (){
        setTreeNode(label.id);
    });

    PAPERNODE.push(t);
    var ypos = yRow + 5;
    LASTYPOS = ypos;
    //var xgrid = drawLine('170', ypos, 1090+150, ypos, paper, '#ccc', 1);
    var xgrid = drawLine(xt[0], ypos, LINEEND, ypos, paper, '#ccc', 1);
    xgrid.hide();
    //console.log(' LASTYPOS ', LASTYPOS);
    XGRIDS.push(xgrid);

    $('.spinner').hide();
}

function findDup(ar,id){
    var dup=false;
    for(var i=0;i<ar.length;i++){
        //console.log('ar ', ar[i], id);
        if(ar[i]===id){
            dup=true;
            break;
        }
    }
    return dup;
}
function getHideId(redrawnonids, dig, id) {
    console.log('id is ' , id, dig);
    for (var i = 0; i < dig.length; i++) {
        if (dig[i].pid === id) {
            if(!findDup(redrawnonids,dig[i].id))redrawnonids.push(dig[i].id);
            getHideId(redrawnonids, dig, dig[i].id);
        }
        if(dig[i].id === id && !_.isUndefined(dig[i].folder)){
            dig[i].folder = (dig[i].folder==='1') ? '0': '1';
        }
    }
    console.log('redrawnonids ids ', redrawnonids);
    return redrawnonids;
}
function clearPaperPlotNode() {
    console.log(' PAPERNODE ', PAPERNODE.length);
    vtime=[];
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
    var redrawnonids = [];
    redrawnonids = getHideId(redrawnonids, dig, id);
    for(var k=0; k < redrawnonids.length;k++){
        var idx = _.findIndex(dig, function(o) { return o.id===redrawnonids[k]; });
        console.log(' mark ', idx, dig[idx].id,  dig[idx].show);
        dig[idx].show = (dig[idx].show=='1') ? '0': '1';
    }
    console.log(dig);
    clearPaperPlotNode();
    plotdrawing(dig, false);
}

function plotdrawing(diagnosis, refine){
    //console.log(' diagnosis ', diagnosis);
    if(refine) {
        var temp = [];
        for (var i = 0; i < diagnosis.length; i++) {
            var fdx = _.findIndex(temp, function (o) {
                return o.id === diagnosis[i].id;
            });
            //console.log(fdx);
            if (fdx === -1) {
                var item = {};
                item = setPlotItem(item, diagnosis[i]);
                temp.push(item);
            }
        }
        //console.log(' temp ', temp);
        console.log(' temp ', temp);
        var ttemp = util.arrayToTree(temp);
        console.log('tree set ', ttemp);
        if(ttemp.length>1){
            temp = ttemp;
        }
        dig=[];
        orderCategory(temp);
    }
    console.log('dig is ', dig);
    var k = 0;
    XGRIDS=[];
    for(var i=0;i<dig.length;i++) {
        //console.log( ' diagnosis[i] ', diagnosis[i])
        if(dig[i].show=='1') {
            plotMuts(paper, k, dig[i]);
            ++k;
        }
    }
    //console.log(' LASTYPOS ', LASTYPOS);
    //paper.setViewBox(0,0,1090+150, LASTYPOS+3, true);
    $('#genomicOverviewTracksContainer').children(1).css('height',LASTYPOS+3+'px');
    MODE='N';
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

function orderCategory(dat){
    console.log(' orderCategory ', dat);
    for(var i=0;i<dat.length;i++){
        var item = {};
        item = setPlotItem(item, dat[i]);
        //console.log(' item=>, ', item);
        dig.push(item);
        if(dat[i].data.length>0){
            orderCategory(dat[i].data);
        }
    }
}

function setPlotItem(item, dat){
    item.id = dat.id;
    item.pid = dat.pid;
    item.name = dat.name;
    item.level = dat.level;
    item.show = dat.show;
    item.leaf = dat.leaf;
    item.time = dat.time;
    item.folder = dat.folder;
    return item;
}
