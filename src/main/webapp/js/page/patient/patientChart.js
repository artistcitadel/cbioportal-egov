var leftpadding = 90;
var paperWidth = 1245;
var paperHeight = 30;
var paper;
var yRuler = 15;
var XGRIDS=[];
var dig = [];
var PAPERNODE=[];
var LASTYPOS=0;
var TIME;
var DATA;
var xt;
var m;

function disposer(result) {
   //console.log(result.patientView);
  if(result.patientView.length>0){
      var data = result.patientView;
      var crow = [];
      for(var i=0;i<data.length;i++){
        var item = {};
            item.time = data[i].TIME;
            item.id   = data[i].ID;
            item.name = data[i].NAME;
            item.unit = data[i].UNIT;
            item.pid = data[i].PID;
            item.show = "1";
            item.order=0;
            var level=1;
            if(!_.isUndefined(data[i].PID)) level = findLevel(data[i].PID,data,++level);
            item.level = level;
            var leaf = findLeaf(data[i].ID, data);
            item.leaf = leaf;
            crow.push(item);
      }
      console.log(crow);
      setTimeLine(crow);
  }
}

function findLevel(pid, data,lvl){
    var findindex = _.findIndex(data, function(o) { return o.ID === pid; });
    //console.log(pid, findindex, lvl);
    if(_.isUndefined(data[findindex].PID)) return lvl;
    if(findindex!==-1) findLevel(data[findindex].PID, data, ++lvl);
    //else return lvl;
}

function findLeaf(id, data){
    var findindex = _.findIndex(data, function(o) { return o.PID === id; });
    if(findindex!==-1) return false;
    else return true;
}

function setTimeLine(data){
  var start = 25 + leftpadding;
  var chmName = setChmName(data);
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
  makeEventBarChart();
}

function setChmName(data){
    var temp = [];
    var chmName=[];
    for(var i=0; i<data.length; i++){
        temp.push(data[i].time);
    }
    var tmp = _.uniq(temp);
    TIME = tmp;
    tmp = _.sortBy(tmp);
    var min = _.min(tmp)+"";
    var max = _.max(tmp)+"";
    var size = 0;
    var unit = 'd';
    if(data[0].unit==='D') size =util.dateDiff(min,max);
    if(data[0].unit==='M') {size =util.monthAndYearDiff(min,max,'m'); unit='m';}
    if(data[0].unit==='Y') {size =Number(max)-Number(min); unit='y'}

    for(var k=0;k<size;k++){
        chmName.push((k+1)+unit);
    }
    DATA = data;
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
    drawLine(start, yRuler, end, yRuler, paper, '#000', 1);
    //drawLine(xt[0], yRuler, xt[0], 5, paper, '#000', 1);
    console.log( 'start ', start);
    var txtCnt = 0;
    for (var i = 0; i < xt.length; i++) {
        if(i%2===0) {
            //var mx = xt[i]+rootNodePadding;
            var mx = xt[i];
            console.log('mx ', xt[i]);
            drawLine(mx, yRuler, mx, 5, paper, '#000', 1);
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
        }
    }
    drawLine(end-1, yRuler, end-1, 5, paper, '#000', 1);
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

function setPlotAxis(){
    var lineW = (xt[1]-xt[0])/10;
    for(var i=0;i<TIME.length;i++){
        var otime=TIME[i];
        var order = 0;
        for(var j=0;j<DATA.length; j++) {
            if(DATA[j].leaf && DATA[j].time===TIME[i]){
                //console.log(DATA[i].time,' ===' ,TIME[j])
                if(otime===DATA[j].time){console.log("bingo ",TIME[i]); order+=1; DATA[j].order=order;}
                //console.log(DATA[j].order, TIME[i]);
                DATA[j].axis = xt[(i+1)*2]+(lineW*order);
            }
        }
    }

    for(var i=0;i<pixelMap.length;i++){
      var findindex = _.findIndex(DATA, function(o) { return o.id === pixelMap[0].name; });
        var pad = 0;
        for(j=0;j<pixelMap[i].data.length;j++) {
            pixelMap[i].data[j].axis += pad;
            pixelMap[i].data[j].axis = DATA[i].axis;
            pad+=2;
        }
    }
}
function makeEventBarChart() {
    setPlotAxis();
    console.log(DATA);
    var label = "Time since diagnosis";
    var t = paper.text(55, 10, label).attr({'text-anchor': 'center', 'fill': 'black', "font-size": 12});
    plotdrawing(DATA);
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
        var temp = value.toString();
        var seed = "0"+"."+value;
        console.log( ' seed ', seed);
        return Number(seed);
    }
    function getTargetPosition(seed){
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

    function getPixelMap(pixel, item) {
        //console.log('item ', item);
        var spot = [];
        for(var i=0;i<pixel.length;i++) {
            var pitem = _.map(pixel[i], function (value, key) {
                //console.log(' key ', key);
                //console.log('value ', value);
                if(key=='name' && value==item){
                    find = true;
                    console.log('find ');
                    spot.push(pixel[i].data);
                }
            });
        }
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
          var pixeldataV = getPixelMap(pixelMap,label.name.toLowerCase()) || [];
          //console.log('pixeldata length =>', pixeldataV);
          _.map(pixeldataV,function(pixeldata,k){
              console.log('k ', k, 'v ', pixeldata.length);
              var idx = 0;
              for(var i=0;i<pixeldata.length;i++){
                  //console.log("  pixeldata[i].axis  ", pixeldata[i]);
                  var position =  getTargetPosition(pixeldata[i].axis);
                  console.log(" position => ", position);
                  var h = pixeldata[i].name.length>maxCount ? 20 : (20*pixeldata[i].name.length/maxCount);
                  //console.log(yRow-h);
                  pixil = 150;
                  var r = p.rect(position, yRow-h, 3, h);
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
                  addToolTip(r.node, pixeldata[i].name.join("</br>"), 100, '');
                  ++idx;
                  PAPERNODE.push(r);
              }
          });
      }
      var deep = label.level;
      var lbl = label.name;
      var t = p.text((12+Number(deep)*8), yRow + 7 - (row + 8), lbl).attr({'text-anchor': 'start', 'fill': 'black',  'cursor': 'pointer','font-size':'12' });
      t.click(function (){
          setTreeNode(label.id);
      });
      PAPERNODE.push(t);
      var ypos = yRow + 5;
      LASTYPOS = ypos;
      var xgrid = drawLine('170', ypos, 1090+150, ypos, paper, '#ccc', 1);
      xgrid.hide();
      XGRIDS.push(xgrid);
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
    function clearPaperNode() {
        console.log(' PAPERNODE ', PAPERNODE.length);
        for (var i = 0; i < PAPERNODE.length; i++) {
            PAPERNODE[i].remove();
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
        clearPaperNode();
        plotdrawing(dig);
    }

    function plotdrawing(diagnosis){
        var k = 0;
        XGRIDS=[];
        for(var i=0;i<diagnosis.length;i++) {
            //console.log( ' diagnosis[i] ', diagnosis[i])
            if(diagnosis[i].show=='1') {
                plotMuts(paper, k, diagnosis[i]);
                ++k;
            }
        }
        paper.setViewBox(0,0,1090+150,LASTYPOS+3,true);
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

var pixelMap = [{
        "name": "BKLPNE",
        "data": [
            {"axis": "78", "name": ["SLC27A3: G111D"]},
            {"axis": "123", "name": ["ZFP36L2: C174Sfs*302"]},
            {"axis": "249", "name": ["SI: V109I"]},
            {"axis": "519", "name": ["PRKDC: X133_splice"]},
            {"axis": "708", "name": ["KMT2D: V5208Wfs*35"]},
            {"axis": "711", "name": ["KRT85: G85R"]},
            {"axis": "1056", "name": ["ENOX2: H250Q"]}
        ]
    }
        ,
        {"name": "DB0064",
            "data": [
                {"axis": "18", "name": ["SLC27A3: G111D"]},
                {"axis": "183", "name": ["ZFP36L2: C174Sfs*302"]},
                {"axis": "289", "name": ["SI: V109I"]},
                {"axis": "569", "name": ["PRKDC: X133_splice"]},
                {"axis": "768", "name": ["KMT2D: V5208Wfs*35"]},
                {"axis": "761", "name": ["KRT85: G85R"]},
                {"axis": "1096", "name": ["ENOX2: H250Q"]}
            ]
        }]
;

