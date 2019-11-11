var paperWidth = 1245;
var paperHeight = 30;
var paper;
var yRuler = 15;
var XGRIDS=[];
var dig = [];
var PAPERNODE=[];
var LASTYPOS=0;
var xPath = '170';

function disposer(result) {
  if(result.patientView.length>0){
      var data = result.patientView;
      var crow = [];
      for(var i=0;i<data.length;i++){
        var item = {};
            item.time = data[i].TIME;
            item.id   = data[i].ID;
            item.name = data[i].NAME;
            item.unit = data[i].UNIT;
            var level=1;
            if(data[i].PID != null) level = findLevel(data[i].PID,data,++level);
            item.level = level;
            crow.push(item);
      }
      console.log(crow);
      setTimeLine(crow);
  }
}

function findLevel(id, data,lvl){
    var findindex = _.findIndex(data, function(o) { return o.id === id; });
    if(findindex!==-1) findLevel(data[findindex].PID, data, ++lvl);
    else return lvl;
}

function setTimeLine(data){
  var start = 25;
  var chmName = setChmName(data);
  console.log(chmName);
  var xt = setXposition(start, chmName.length);
  console.log(xt);
  var m = setXnamePosition(xt);
  console.log(m);
  console.log('xt[xt.length-1] ',xt[xt.length-1]);
  drawTimeLine(start, chmName,xt,m, xt[xt.length-1]);
}

function setChmName(data){
    var temp = [];
    var chmName=[];
    for(var i=0; i<data.length; i++){
        temp.push(data[i].time);
    }
    var tmp = _.uniq(temp);
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
    return chmName;
}

function setXposition(start, count){
  var xt=[];
  var gap = (paperWidth/count)/2;
  //gap = gap + gap/2;
    console.log(gap);
  var length = start*count;
  for (var i=0; i<count*2; i++){
      if(i>0)  xt[i] = xt[i-1]+gap;
      if(i==0) xt[i]=start;
  }

  return xt;
}

function setXnamePosition(xt){
    var m=[];
  for(var i=0; i<xt.length-1; i++){
      m[i] = xt[i] + ( (xt[i+1]-xt[i]) / 2);
    }
    return m;
}

function drawTimeLine(start, chmName,xt,m, end){
    drawLine(start, yRuler, end, yRuler, paper, '#000', 1);
    for (var i = 0; i < chmName.length; i++) {
        var mx = xt[i];
        if(i>0)mx=xt[i+1];
        drawLine(xt[i], yRuler, mx, 5, paper, '#000', 1);
        var txt = paper.text(m[i], 10, chmName[i]);
        txt.click(function() {
            if(this.attr('text-anchor')=='middle') {
                this.attr({
                    'text-anchor': 'start',
                    'font-size': 13,
                    'fill': "#62f"
                });
            }else {
                this.attr({
                    'text-anchor': 'middle',
                    'font-size': 10,
                    'fill': "#000"
                })
            }
        });
    }

    drawLine(end, yRuler, end, 5, paper, '#000', 1);
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
