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
var UNIT="D";
var dig=[];
var LTEXTLENGTH=[];
var PLOTDATA=[];
var OLINE=[];
var pixelMap=[];

function disposer(json) {
    //console.log(result.patientView);
    if(json.result.length>0){
        var data = json.result;
        var crow = [];
        for(var i=0;i<data.length;i++){
            var item = {};
            item.time = data[i].time;
            item.id   = data[i].id;
            item.name = data[i].name;
            item.unit = data[i].unit;
            item.pid = data[i].pid;
            item.show = "1";
            item.order=0;
            var level=1;
            if(!_.isUndefined(item.pid)) {
                level = findLevel(item.pid, data, ++level);
                //console.log(' level ', item.pid,  item.id, 'level ',level);
            }
            item.level = level;
            var leaf = findLeaf(data[i].id, data);
            item.leaf = leaf;
            crow.push(item);
            LTEXTLENGTH.push(item.name.length);
        }
        console.log(crow);
        setTimeLine('C', crow);
    }
}

function findLevel(pid, data,lvl){
    //console.log('&&&&&&&&&&&&&&&&&&&&&&');
    //console.log( 'data ', data);
    //console.log('pid ', pid);
    var findindex = _.findIndex(data, function(o) { return o.id === pid; });
    //console.log(pid, findindex, lvl);
    if(_.isUndefined(data[findindex].pid)) {
        //console.log('undefined ',pid, findindex, lvl);
        return lvl;
    }
    if(findindex!==-1) {
        return findLevel(data[findindex].pid, data, ++lvl);
    }
    //else return lvl;
}

function findLeaf(id, data){
    var findindex = _.findIndex(data, function(o) { return o.pid === id; });
    if(findindex!==-1) return false;
    else return true;
}

function setTimeLine(node, data){
    leftpadding += _.max(LTEXTLENGTH);
    leftpadding*=2;
    var start = 25 + leftpadding;
    (node!=='R') ? chmName = setChmName(data) : null;
    console.log(chmName);
    xt = setXposition(start, chmName.length);
    console.log(xt);
    m = setXnamePosition(xt);
    console.log(m);
    var end = xt[xt.length-1];
    var margin = paperWidth-end;
    end +=  margin;
    console.log('xt[xt.length-1] ',end);
    drawTimeLine(start, chmName,xt,m, end);
    getSpec(node);
    //makeEventBarChart();
}

function getSpec(node){
    var ds_cond = {};
    ds_cond.data = {"qid":"selectTestSpec","patientId":"6128737361" };
    ds_cond.callback = makeEventBarChart;
    (node !=='R') ? action.selectList(ds_cond) : makeEventBarChartCache();
}

function setChmName(data){
    var temp = [];
    var chmName=[];
    for(var i=0; i<data.length; i++){
        temp.push(data[i].time);
    }
    var tmp = _.uniq(temp);
    tmp = _.sortBy(tmp);
    TIME = tmp;
    var min = _.min(tmp)+"";
    var max = _.max(tmp)+"";
    var size = 0;
    //var unit = 'd';
    size =util.dateDiff(min,max);
    /*if(data[0].unit==='D') size =util.dateDiff(min,max);
    if(data[0].unit==='M') {size =util.monthAndYearDiff(min,max,'m'); unit='m';}
    if(data[0].unit==='Y') {size =Number(max)-Number(min); unit='y'}*/
    console.log('min ', min, max, size);


    for(var k=0;k<size;k++){
        //chmName.push((k+1)+unit);
        chmName.push((k+1));
    }
    //DATA = data;
    dig = data;
    return chmName;
}

function setXposition(start, count){
    var xt=[];
    var gap = ((paperWidth-leftpadding)/count)/2;
    console.log('gap ', gap);
    //gap = gap + gap/2;
    //console.log(gap);
    //var length = start*count;
    for (var i=0; i<count*2; i++){
        if(i>0)  xt[i] = xt[i-1]+gap;
        if(i==0) xt[i]=start;
    }
    return xt;
}

function setXnamePosition(xt){
    var m=[];
    for(var i=0; i<xt.length-1; i++){
        //m[i] = xt[i] + ( (xt[i+1]-xt[i]) / 2);
        m[i] = (xt[i] + xt[i+2]) /2 ;
    }
    // console.log(m[m.length-2]);
    // console.log((paperWidth-m[m.length-2]) /2);
    // console.log((m[m.length-2]) + ((paperWidth-m[m.length-2]) /2));
    m[m.length-1] = (m[m.length-2]) + ((paperWidth-m[m.length-2]) /2);
    return m;
}

function drawTimeLine(start, chmName,xt,m, end){
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
            var txt = paper.text(m[i], 10, chmName[txtCnt]);
            txt.click(function () {
                if (this.attr('text-anchor') == 'middle') {
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
                }
            });
            ++txtCnt;
            OLINE.push(txt);
        }
    }
    oline = drawLine(end-1, yRuler, end-1, 5, paper, '#000', 1);
    OLINE.push(oline);
}

function drawLine(x1, y1, x2, y2, p, cl, width) {
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
function findClassify(subject, data) {
    var slot={};
    if(subject=='LAB_TEST') {
        slot = {"검사 결과값":data.exam,"표시 결과값":data.mark,"기준 단위값" : data.crte};
    }
    return slot;
}

function setPlotAxis(pdata){
    console.log(pdata);
    var subject = pdata[0].subject;
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
    _.map(group, function(gv, gk){
        var id = gk.split(",")[0];
        var time = gk.split(",")[1];
        var slot={};
        slot.name=[];
        slot.axis = getAxis(time) + (lineW + pad);
        for(var i=0;i < gv.length;i++){
            if(i===0){
                var tip = "["+subject+"]<br/>";
                tip+="["+gv[i].NAME+"]<br/>";
                slot.name.push(tip);
            }
            slot.name.push(findClassify(subject, gv[i]));
        }
        ++pad;
        if(k>0 && (oid!==id || k === len-1)) {
            item.data = temp;
            pixelMap.push(item);
            item = {};
            item.data = [];
            pad=0;
            temp=[];
        }
        item.id = id;
        //console.log(' slot ', slot);
        temp.push(slot);
        oid=id;
        ++k;
        if(k===len && id === pixelMap[pixelMap.length-1].id){
            pixelMap[pixelMap.length-1].data.push(slot);
        }
        if(k===len && id !== pixelMap[pixelMap.length-1].id){
            var tmp = {};
            tmp.id = id;
            tmp.data=temp;
            pixelMap.push(tmp);
        }
    });
    console.log(k);
    console.log('pixelMap ', pixelMap);
    //setCalcXsis();
}

function setCalcXsis(){
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
}



function getXTposition(time) {
    var axis;
    //console.log('TIME ', TIME);
    for (var i = 0; i < TIME.length; i++) {
        if (time === TIME[i]) {
            //axis = xt[(i+1)]*2;
            axis = xt[(i+1)];
            console.log('getXTposition ', i, xt[i+1], time, axis);
            // console.log(item);
            // console.log(axis);
        }
    }
    return axis;
}

function getAxis(time) {
    return getXTposition(time);
}

function makeEventBarChart(json) {
    if(json.result.length > 0) {
        PLOTDATA = json.result;
    }
    setPlotAxis(PLOTDATA);
    makeEventBarChartSub();
    plotdrawing(dig, true);
}
function makeEventBarChartCache(){
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
    //console.log('getPixelMap ', pixel);
    //console.log('id ', id);
    var spot = [];
    for(var i=0;i<pixel.length;i++) {
        var pitem = _.map(pixel[i], function (value, key) {
            //console.log(' key ', key);
            //console.log('value ', value);
            //if(key=='name' && value==item){
            if(key=='id' && value==id){
                find = true;
                //console.log('find ');
                spot.push(pixel[i].data);
            }
        });
    }
    console.log(' spot ', spot);
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
function plotMuts(p, row, label) {
    //console.log(' plotMuts called====> ', label.pid, ' ', label.name);
    var maxCount = 5; // set max height to 5 mutations
    var yRow = fyRow(row)   +20;
    //var rowindex = 0;
    if(label.leaf==true){
        //var pixeldataV = getPixelMap(pixelMap,label.name.toLowerCase()) || [];
        var pixeldataV = getPixelMap(pixelMap, label.id) || [];
        console.log('pixeldata length =>', pixeldataV);
        _.map(pixeldataV,function(pixeldata,k){
            console.log('k ', k, 'v ', pixeldata.length);
            var idx = 0;
            for(var i=0;i<pixeldata.length;i++){
                //console.log("  pixeldata[i].axis  ", pixeldata[i]);
                var position =  getTargetPosition(pixeldata[i].axis+"");
                console.log(" position => ", position);
                console.log(" pixeldata[i].name.length ",pixeldata[i].name.length);
                var h = pixeldata[i].name.length>maxCount ? 20 : (20*pixeldata[i].name.length/maxCount);
                console.log(yRow-h);
                pixil = 150;
                var r = p.rect(position, yRow-h-6, 3, h);
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
                        tip+= item;
                    }else {
                        _.map(item, function (v, k) {
                            tip += k + " : " + v + "</br>";
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
    var lbl = label.name;
    //console.log('label_text length ', lbl.length);
    var t = p.text((12+Number(deep)*8), yRow + 7 - (row + 8), lbl).attr({'text-anchor': 'start', 'fill': 'black',  'cursor': 'pointer','font-size':'12' });
    t.click(function (){
        setTreeNode(label.id);
    });
    PAPERNODE.push(t);
    var ypos = yRow + 5;
    LASTYPOS = ypos;
    ////var xgrid = drawLine('170', ypos, 1090+150, ypos, paper, '#ccc', 1);
    ////xgrid.hide();
    //console.log(' LASTYPOS ', LASTYPOS);
    ////XGRIDS.push(xgrid);
}

function getHideId(redrawnonids,dig, id) {
    console.log('id is ' , id);
    for (var i = 0; i < dig.length; i++) {
        if (dig[i].pid === id) {
            redrawnonids.push(dig[i].id);
            getHideId(redrawnonids, dig, dig[i].id);
        }
    }
    console.log('redrawnonids ids ', redrawnonids);
    return redrawnonids;
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
    var redrawnonids = [];
    redrawnonids = getHideId(redrawnonids, dig, id);
    for(var k=0; k < redrawnonids.length;k++){
        var idx = _.findIndex(dig, function(o) { return o.id===redrawnonids[k]; });
        console.log(' mark ', idx);
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
        temp = util.arrayToTree(temp);
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
    paper.setViewBox(0,0,1090+150, LASTYPOS+3, true);
    $('#genomicOverviewTracksContainer').children(1).css('height',LASTYPOS+3+'px');
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
    return item;
}
