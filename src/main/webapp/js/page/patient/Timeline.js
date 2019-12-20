function TimeLine() {
    var self = this;
    var leftpadding = 90, lvalue = 90;
    var paperWidth = 1435;
    var paperHeight = 30;
    var paper;
    var yRuler = 15;
    var XGRIDS = [];
    var PAPERNODE = [];
    var LASTYPOS = 0;
    var TIME;
    var DATA;
    var chmName;
    var xt;
    var m;
    var UNIT;
    var dig = [];
    var LTEXTLENGTH = [];
    var OLINE = [];
    var pixelMap = [];
    var HRC_LAB;
    var LINEEND;
    var RAW;
//var XTREETEXTPADDING=24;
    var XTREETEXTPADDING = 5, xtreevalue = 5;
    var MODE = 'N';
    var XSCALE = 1;
    var HMIN;
    var HMAX;
    var INITUNIT;
    var ISROUNDMUTATION = false;

    var util, action, event;

    function exist(data, key) {
        var digcategory=[];
        var find = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i] === key) {
                find = true;
                break;
            }
        }
        return find;
    }


    function findLevel(pid, data, lvl) {
        var id = _.findIndex(data, function (o) {
            return o.id === pid;
        });
        if (id == -1) {
            return lvl;
        }
        if (id != -1 && util._isUndefined(data[id].pid)) {
            return ++lvl;
        }
        if (id !== -1 && !util._isUndefined(data[id].pid)) {
            return findLevel(data[id].pid, data, ++lvl);
        }
    }

    function moveMutation(){
        var pt = new PatientViewMutationTable();
        pt.init();
        ISROUNDMUTATION=true;
    }
    function setTimeLine(node, data) {
        if(data.length<1){
            util.hideLoader();
            $('div.member').find('img').trigger('click');
            if (!ISROUNDMUTATION) {
                moveMutation();
            }
            return;
        }
        XTREETEXTPADDING = 0;
        leftpadding *= 2;
        leftpadding += XTREETEXTPADDING;

        var start = leftpadding + XTREETEXTPADDING;
        (node === 'C') ? chmName = setTrack(data) : null;
        //paperWidth = chmName.length * dynamicWidthPartial;
        console.log(chmName);
        xt = setXposition(start, chmName.length);
        console.log('xt is ', xt);
        m = setXnamePosition(xt);
        console.log(m);
        var end = xt[xt.length - 1];
        var margin = paperWidth - end;
        end += margin;
        LINEEND = end;
        console.log('xt[xt.length-1] ', end);
        drawTimeLine(start, chmName, xt, m, end);
        (node !== 'R') ? makeEventBarChart() : makeEventBarChartCache();
    }

    function setTrack(data) {
        dig = data;
        console.log(' data is ', dig);
        var chmName = [];
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            ////if(!util._isUndefined(data[i].time))
            if (data[i].time !== '00000000')
                temp.push(data[i].time);
        }
        var tmp = _.uniq(temp);
        tmp = _.sortBy(tmp);
        //console.log('tmp ', tmp);
        var min = _.min(tmp) + "";
        var max = _.max(tmp) + "";
        HMIN = min;
        HMAX = max;
        var size = 0;
        //var unit = 'd';
        //min = '20010101';
        //max = '20040101';
        size = util.monthAndYearDiff(min, max, 'd');
        size += 1;
        console.log('size ', size);

        //if(util._isUndefined(UNIT))
        if (MODE == 'N') (size < 32) ? UNIT = 'd' : ((size < 32 * 30 - 29 && size > 31) ? UNIT = 'm' : (size > 32 * 30 - 29) ? UNIT = 'y' : '');
        else {
            if (UNIT === 'm') {
                UNIT = 'd';
            }
            if (UNIT === 'y') {
                UNIT = 'm';
            }
        }

        console.log(UNIT);

        console.log('min ', min, max, size);
        if (UNIT === 'd') {
            size = util.monthAndYearDiff(min, max, 'd') + 1;
        }
        if (UNIT === 'm') {
            size = util.monthAndYearDiff(min, max, 'm') + 1;
            size += Number(max.substring(0, 4)) - Number(min.substring(0, 4));
        }
        if (UNIT === 'y') {
            size = util.monthAndYearDiff(min, max, 'y') + 1;
            if (size > 1) size += 1;
        }
        console.log(' size ', size);

        //size+=2;
        for (var k = 0; k < size; k++) {
            chmName.push(getChmDay(min, k, UNIT));
        }
        console.log('chmName is ' , chmName);
        (INITUNIT == null) ? INITUNIT = UNIT : INITUNIT;
        return chmName;
    }

    function getChmDay(day, k, unit) {
//console.log(day , k , unit);
        var time = moment(day, 'YYYYMMDD');
        if (unit === 'd') {
            var next = moment(time).add(k, 'days');
            //console.log(moment(next).format('YYYYMMDD'));
            return moment(next).format('YYYYMMDD');
        }
        if (unit === 'm') {
            var next = moment(time).add(k, 'M');
            //console.log('next is ',next);
            return moment(next).format('YYYYMM');
        }
        if (unit === 'y') {
            var next = moment(time).add(k, 'years');
            return moment(next).format('YYYY');
        }
    }

    function setXposition(start, count) {
        console.log('setXposition is ', start, count);
        var xt = [];

        var gap = (paperWidth - start) / count / 2;
        console.log('gap ', gap);

        for (var i = 0; i < count * 2; i++) {
            if (i > 0) xt[i] = xt[i - 1] + gap;
            if (i == 0) xt[i] = start;
        }
        //alert(xt[xt.length-1]);
        return xt;
    }

    function setXnamePosition(xt) {
        var m = [];
        var uend;
        for (var i = 0; i < xt.length - 1; i++) {
            //m[i] = xt[i] + ( (xt[i+1]-xt[i]) / 2);
            //console.log(xt.length, uend = xt[i+1]);
            if (xt.length < 3) uend = xt[i + 1];
            else uend = xt[i + 2];
            //console.log(uend);
            m[i] = (xt[i] + uend) / 2;
        }

        if (xt.length < 3) return m;
        else m[m.length - 1] = (m[m.length - 2]) + ((paperWidth - m[m.length - 2]) / 2);
        return m;
    }

    var COUNTMAP;

    function drawTimeLine(start, chmName, xt, m, end) {
        COUNTMAP = null;
        //console.log('dig ', dig);
        var names = _.countBy(dig, function (v) {
            //if(!util._isUndefined(v.time))
            if (v.time !== '00000000') {
                //console.log(v);
                return getDpTime(v.time);
            }
        });
        var countTime =
            Object.keys(names).map(function (x) {
                return {
                    time: x,
                    count: names[x],
                    axis: 0
                };
            })
        countTime = _.filter(countTime, function(o){
            return o.time != 'undefined';
        });
        console.log('countTime ', countTime);
        console.log('start ', yRuler, start, end);

        var startXruler = end;
        var oline = drawLine(start, yRuler, end, yRuler, paper, '#000', 1);
        OLINE.push(oline);
        //drawLine(xt[0], yRuler, xt[0], 5, paper, '#000', 1);
        console.log('start ', start, xt);
        var txtCnt = 0;
        for (var i = 0; i < xt.length; i++) {
            if (i % 2 === 0) {
                //var mx = xt[i]+rootNodePadding;
                var mx = xt[i];
                //console.log('mx ', xt[i]);

                ///->for plot axis/////////////////////////////////
                //console.log('countTime[txtCnt] ' ,countTime[txtCnt]);
                var cidx = _.findIndex(countTime, function (v) {
                    return v.time == chmName[txtCnt];
                })
                console.log('countTime[cidx ', countTime[cidx]);
                if (cidx !== -1) {
                    //countTime[cidx].axis = m[i];
                    countTime[cidx].axis = mx;
                }
                ///->for plot axis/////////////////////////////////

                oline = drawLine(mx, yRuler+4, mx, 5, paper, '#b2bccc', 1);
                OLINE.push(oline);
                var txt = paper.text(m[i], 10, util.dformat(UNIT, chmName[txtCnt]));
                txt.attr({"cursor": "pointer"});
                //txt.attr("font-family", "Malgun Gothic");
                // txt.attr("font-family", "Nanum Gothic, sans-serif");
                // txt.attr("fill", "#5e586b");
                txt.attr({
                    'text-anchor': 'center',
                    'fill': 'black',
                    'cursor': 'pointer',
                    'font-size': '11',
                    'font-family': 'Nanum Gothic, sans-serif'
                });
                txt.data({id: chmName[txtCnt]});
                //addToolTip(txt.node, '클릭하여 확대', 100, '');
                txt.click(function () {
                    if (UNIT === 'd') return;
                    //var temp = dunformat(this.attr('text'));
                    var temp = this.data('id');
                    console.log(temp);
                    //console.log(RAW);
                    var state = RAW;
                    console.log(state);
                    state = _.filter(state, function (o) {
                        var time = o.time;
                        //console.log('click temp is ',time, '=> ',UNIT,  temp);
                        ////if(util._isUndefined(time))time="00000000"
                        //console.log(time.substring(0,4));
                        if (UNIT === 'd') {
                            return (time === temp);
                        }
                        if (UNIT === 'm') {
                            return (time.substring(0, 6) === temp);
                        }
                        if (UNIT === 'y') {
                            return (time.substring(0, 4) === temp);
                        }
                    });
                    console.log('state is ', state);
                    if (state.length < 1) return;
                    var dat = [];
                    state = util.makeHrc(state, RAW, dat);
                    //state = _.reverse(state);
                    var state = _.uniqBy(state, function (o) {
                        return o.id + util.nt(o.time);
                    })
                    console.log('make hrc state ', state);
                    //return;
                    MODE = 'P';

                    $("#spinner1").show();

                    _.delay(function () {
                        removeLine();
                        clearPaperPlotNode();
                        setTimeLine('C', state);

                    }, 1000);
                });
                ++txtCnt;
                OLINE.push(txt);
            }
        }
        oline = drawLine(end - 1, yRuler, end - 1, 5, paper, '#000', 1);
        OLINE.push(oline);
        COUNTMAP = countTime;
        console.log(" COUNTMAP ", COUNTMAP);
    }

    function drawLine(x1, y1, x2, y2, p, cl, width) {
        //console.log('drawLine ', y1);
        width = 1;
        var path = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
        var line = p.path(path);
        line.attr("stroke", cl);
        line.attr("stroke-width", width);
        line.attr("opacity", 0.5);
        line.translate(0.5, 0.5);
        return line;
    }

// -- event bar chart -- //

 /*   function classify_labtest(data) {
        var item = {};
        //var tip = "[" + data.id + "]";
        var tip='';
        tip += "<span>" + util.dateFormat(UNIT, data.time) + "</p>";
        tip += "<strong>[" + data.name + "]</strong><br/>";
        tip += "<hr />";
        //tip += "<span>" + util.dateFormat(UNIT, data.time) + "</br>";
        tip += "<span>검사 결과값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.exam + "</br>";
        tip += "<span>표시 결과값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.mark + "</br>";
        tip += "<span>기준 단위값 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp : &nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;" + data.crte + "</br>";
        return tip;
    }*/

    function setPlotAxis(pdata) {
        pixelMap = [];
        //pdata = _.sortBy(pdata,['time']);
        console.log('pdata is ', pdata);
        console.log('xt ', xt);
        console.log('m ', m);
        console.log('chmName ', chmName);
        console.log(' COUNTMAP ', COUNTMAP);
        var temp_name = [];
        var item = {};
        for (var i = 0; i < pdata.length; i++) {
            if (pdata[i].leaf) {
                var p = _.filter(COUNTMAP, function (v) {
                    return v.time == getDpTime(pdata[i].time);
                });
                //console.log(' p is ',p);
                //console.log(getDpTime(pdata[i].time));
                // console.log(' position is ', p);
                // console.log(' position is ', p['0'].axis);
                //console.log('pdata[i].subject ', pdata[i].subject);
                //console.log(( (i+1) < pdata.length) && pdata[i].id === pdata[i+1].id && pdata[i].time);
                //if(pdata[0].subject ==='PATHOLOGY_EXAM' && ( (i+1) < pdata.length) && pdata[i].id === pdata[i+1].id && pdata[i].time === pdata[i+1].time) {
                if( ( (i+1) < pdata.length) && pdata[i].id === pdata[i+1].id && pdata[i].time === pdata[i+1].time) {
                    temp_name.push(pdata[i]);//temp_name.push(pdata[i+1]);
                    continue;
                }
                else {
                    console.log('temp_name.length ',temp_name.length);
                    item = {};
                    item.axis = p['0'].axis;
                    item.count = p['0'].count;
                    if(temp_name.length>1) {
                        //console.log('temp_name',temp_name[0].subject , subject.sugery);
                        item.id = temp_name[0].id;
                        item.time = temp_name[0].time;
                        item.name =
                            (temp_name[0].id === subject.tissue) ? (event.classify_tissue(temp_name, UNIT)) :
                            (temp_name[0].id === subject.brc) ? (event.classify_brc(temp_name, UNIT)) :
                            (temp_name[0].subject === subject.pathology) ? (event.classify_pathology(temp_name, UNIT)) :
                            (temp_name[0].subject === subject.surgery) ? (event.classify_sugery(temp_name, UNIT)) :
                            (temp_name[0].subject === subject.biopsy) ? (event.classify_biopsy(temp_name, UNIT)) :
                            (temp_name[0].subject === subject.imaging) ? (event.classify_image(temp_name, UNIT)) : '';
                    item.stroke = Math.ceil(temp_name.length/2);
                    // console.log('item.name ', item.name);
                    // console.log('pitem is ', item);
                    pixelMap.push(item);
                    console.log('pixelMap.push ', pixelMap);
                    temp_name=[];
                    }
                    else {
                        temp_name.push(pdata[i]);
                        item.id = pdata[i].id;
                        item.time = pdata[i].time;
                        item.name =
                            (pdata[i].id === subject.tissue) ? (event.classify_tissue(temp_name, UNIT)) :
                            (pdata[i].id === subject.brc) ? (event.classify_brc(temp_name, UNIT)) :
                            (pdata[i].subject === subject.pathology) ? (event.classify_pathology(temp_name, UNIT)) :
                            (pdata[i].subject === subject.surgery) ? (event.classify_sugery(temp_name, UNIT)) :
                            (pdata[i].subject === subject.biopsy) ? (event.classify_biopsy(temp_name, UNIT)) :
                            (pdata[i].subject === subject.imaging) ? (event.classify_image(temp_name, UNIT)) : '';

                        console.log('item is ', item);
                        item.stroke = temp_name.length;
                        pixelMap.push(item);
                        temp_name=[];
                    }
                }
            }
        }
        console.log('pixelMap ', pixelMap);
    }

    function getDpTime(d) {
        var dptime = (UNIT === 'm') ? (d.substring(0, 6)) : (UNIT === 'y') ? (d.substring(0, 4)) : d;
        return dptime;
    }

    function makeEventBarChart() {
        setPlotAxis(dig);
        makeEventBarChartSub();
        //console.log('makeEventBarChart ', dig);
        plotdrawing(dig);
    }

    function makeEventBarChartCache() {
        //console.log('makeEventBarChartCache ',dig);
        setPlotAxis(dig);
        makeEventBarChartSub();
        plotdrawing(dig);
    }

    function makeEventBarChartSub() {
        console.log('dig-> ', dig);
        /*var label = "Time since diagnosis";
        var t = paper.text(55, 10, label).attr({'text-anchor': 'center', 'fill': 'black', "font-size": 12});*/

        $("#dhead").html("");
        var d = HMIN;
        console.log(HMIN);
        d = util.setDateTitle(UNIT, d);
        d = "" + d + "";
        //alert(d);
        if (UNIT === 'm') {
            var d1 = HMAX;
            d1 = util.setDateTitle(UNIT, d1);
            d1 = "" + d1 + "";
            //alert(d1);
            var head = d+" ~ "+d1;
            // var head = d;
            $("#dhead").html(head);
            //$("#dhead").html(d);
        }

        //alert(UNIT + ' ' + chmName[0]);
//  plotdrawing(dig, true);
    }

    var ycnt = 0;

    function plotdrawing(dig) {
        //console.log('dig is ', dig);
        ycnt = 0
        dig = _.uniqBy(dig, 'id');
        console.log('uniq dig is ', dig);
        //if(tdata.length<1)
        var tdata = util.arrayToTree(dig);
        console.log('tdata ', tdata);
        //console.log('tdata.data ', tdata[0]['data']);
        XGRIDS = [];

        for(var i=0;i<tdata.length;i++) {
            plotMuts(paper, ycnt, tdata[i]);
            if (tdata[i]['data'].length > 0)
                printPlot(paper, tdata[i]['data']);
        }

        //console.log(' LASTYPOS ', LASTYPOS);
        $('#genomicOverviewTracksContainer').children(1).css('height', LASTYPOS + 3 + 'px');
        MODE = 'N';

        util.hideLoader();
        $("#spinner1").hide();
        $('div.member').find('img').trigger('click');
        $('#timeline').scrollLeft(0);
        //console.log('last dig is ', dig);
        if (!ISROUNDMUTATION) {
            moveMutation();
            /*var pt = new PatientViewMutationTable();
            pt.init();
            ISROUNDMUTATION=true;*/
        }
    }

    function printPlot(paper, data) {
        // var data = _.uniqBy(tdata, 'id');
        //console.log('data ', data);
        for (var i = 0; i < data.length; i++) {
            plotMuts(paper, ycnt, data[i]);
            if (data[i].data.length > 0) {
                printPlot(paper, data[i].data);
            }
        }
    }

    function fyRow(row) {
        return 2 * 5 + 10 + row * (20 + 5);
    }

    function getPositionSpec(p, size, time) {
        var x1 = xt[0];
        var x2 = (xt.length > 2) ? xt[2] : xt[1];
        var space = x2 - x1;
        if (UNIT === 'd') {
            return space / 2 + p;
        }
        var span = (UNIT === 'm') ? 30 : 12;
        //console.log('space ', space, space/span);
        var xp = space / span;
        var t = (UNIT === 'm') ? Number(util.subtractzero(time.substring(6, 8))) : Number(time.substring(4, 6));
        //console.log(time, t);
        xp *= (t-1);
        return p + xp;
    }

    function plotMuts(p, row, item) {
        if (!item.show) return;
        //console.log('--> ', item.id, row);
        var yRow = fyRow(row) + 20 - 6;
        ++ycnt;
        if (item.leaf) {
            var maxCount = 6;
            var pw = 3;
            var tnumber = _.round(Number(XSCALE));
            var pixelAry = _.filter(pixelMap, {'id': item.id});

            console.log('pixelAry is ', pixelAry);
            //var tcnt = 0;
            var plen = pixelAry.length;
            for (var i = 0; i < pixelAry.length; i++) {
                var position = pixelAry[i].axis;
                // if(i===0)first = position;
                var size = pixelAry[i].count;
                //if(UNIT==='y') pw=0.3;
                //console.log('-->size ', size);
                if (UNIT === 'y') {
                    // pw = (size>20 && size < 41) ? 2 :  (size>40 && size<61) ? 1 : (size>60 && size < 81) ? (0.5) : (0.1);
                    pw = (plen > 100) ? 2 : (plen > 200) ? 1 : (plen > 300) ? 0.5 : 3;
                }
                position = getPositionSpec(position, size, pixelAry[i].time);
                //position = (i>0) ? (position+deepCalcPosition(i)) : position;
                //var h = pixelMap[i].name.length>maxCount ? 20 : (20*pixeldata[i].name.length/maxCount);
                var h = maxCount;
                // console.log('yrow ', yRow, h);
                //var r = p.rect(position, yRow-4, pw, h);
                //var r = p.circle(position, yRow - 4, pw);
                //console.log(leftpadding, yRow-4, pw);
                var r = p.circle(leftpadding, yRow - 4, pw);
                // r.attr("fill", "#0f0");
                // r.attr("stroke", "#0f0");
                //r.attr("fill", "#ffaf8a");

                /*r.attr("fill", "#ffa670");
                r.attr("stroke", "#ffa670");*/
                //console.log('stroke is ',pixelAry[i].stroke);
                r.attr("fill", event.getPlotColor(item.subject, item.id));
                r.attr("stroke", event.getPlotColor(item.subject, item.id));
                r.attr("stroke-width", pixelAry[i].stroke);
                r.attr("opacity", 0.5);
                r.translate(0.5, 0.5);
                r.hover(function () {
                        this.transform('S1.5,1.5');
                    }, function () {
                        this.transform('s1,1');
                    }
                );
                r.animate({ cx:position}, 1900);
                //r.transform('S'+tnumber,tnumber+'');
                //addToolTip(r.node, pixeldata[i].name.join("</br>"), 100, '');
                addToolTip(r.node, pixelAry[i].name, 100, '');
                PAPERNODE.push(r);
                //++tcnt;
            }
            //console.log('tcnt ', tcnt, item.name);
        }


        var label = item;
        //~~ for tree  ~~//
        if (label.show) {
            var deep = label.level;
            if (label.leaf) deep += 2;
            //console.log("label texting ",  label.subject);
            //console.log('label texting ', label.subject, subject.biopsy, subject.surgery);
            if (label.subject===subject.biopsy || label.subject === subject.surgery) {
                console.log('label texting ', label.subject);
                deep=2;
            }
            // console.log('label.id ', label.id, label.name);
            // console.log('show ', label, label.folder);
            var ar = "❯ ";
            //var ar = '開';
            //if (label.leaf) ar = '';
            //console.log(' label ', label.folder, label.name, label.leaf);
            if (!label.leaf) {
                //ar = "﹀ ";V✅
                /*  var r = p.circle((7 + Number(deep) * 8), yRow, 4);
                  r.attr("fill", "#5918ff");
                  r.attr("stroke", "#5918ff");
                  r.attr("stroke-width", 1);
                  r.attr("opacity", 0.5);
                  r.translate(0.5, 0.5);
                  ar='';*/
                ar = '＋';
                //ar ='﹀';//ar = '閉';//ar ='﹀';//
                //console.log(label.folder);
                //if (!label.folder) ar = "﹀ ";
                if (label.folder) ar = '❯ ' //ar = "閉";
            } else ar = '';

            var lbl = label.name;
            if(lbl.length>10)lbl=lbl.substring(0,10)+'...';
            lbl = ar + lbl;
            //console.log('label_text length ', lbl.length);
            //var t = p.text((12 + Number(deep) * 8), yRow + 7 - (row + 8), lbl).attr({
            var t = p.text((12 + Number(deep) * 8), yRow, lbl).attr({
                'text-anchor': 'start',
                'fill': 'black',
                'cursor': 'pointer',
                'font-size': '12',
                'font-family': 'Nanum Gothic, sans-serif'
            });

            t.click(function () {
                if (!label.leaf) {
                    setTreeNode(label.id);
                }
            });
            if(lbl.length>12)addToolTip(t.node, label.name, 100, '','qtip-light');

            //if(ar!=='')underlineText(t,p);

            PAPERNODE.push(t);
            var ypos = yRow + 5;
            LASTYPOS = ypos;
            //var xgrid = drawLine('170', ypos, 1090+150, ypos, paper, '#ccc', 1);
            var xgrid = drawLine(xt[0], ypos, LINEEND, ypos, paper, '#ccc', 1);
            ////xgrid.hide();
            //console.log(' LASTYPOS ', LASTYPOS);
            XGRIDS.push(xgrid);
        }
    }

    function clearPaperPlotNode() {
        //console.log(' PAPERNODE ', PAPERNODE.length);
        for (var i = 0; i < PAPERNODE.length; i++) {
            PAPERNODE[i].remove();
        }

        for (var i = 0; i < XGRIDS.length; i++) {
            XGRIDS[i].remove();
        }

    }

    function removeLine() {
        XTREETEXTPADDING = xtreevalue;
        leftpadding = lvalue;
        //LTEXTLENGTH=[];
        pixelMap = [];
        for (var i = 0; i < OLINE.length; i++) {
            OLINE[i].remove();
        }
    }

    function setTreeNode(id) {
        //util.showLoader();
        $("#spinner1").show();
        _.delay(function () {
            setTreeNodePost(id);
        }, 1000);
    }

    function setTreeNodePost(id) {
        var idx = _.findIndex(dig, function (o) {
            return o.id === id;
        });
        dig[idx].folder = !dig[idx].folder;
        setShow(dig, id, 'y');

        function setShow(dig, p) {
            for (var i = 0; i < dig.length; i++) {
                if (dig[i].pid === id || p === 'x') {
                    dig[i].folder = !dig[i].folder;
                    dig[i].show = !dig[i].show;
                    if (_.isArray(dig[i].data) && dig[i].data.length > 0) {
                        setShow(dig[i].data, 'x');
                    }
                }
            }
        }

        clearPaperPlotNode();
        plotdrawing(dig);
        //$('#genomicOverviewTracksContainer').children(1).scrollLeft(0);
        $("#spinner1").hide();
    }

    function addToolTip(node, tip, showDelay, position, theme) {
        var theme = theme;
        if(_.isUndefined(theme)) theme = 'qtip-dark';
        var param = {
            content: {text: tip},
            show: {event: "mouseover"},
            hide: {fixed: true, delay: 100, event: "mouseout"},
            //style: {classes: ''+theme+' qtip-rounded'},
            style: {classes: ''+theme+' qtip-bootstrap'},
            position: {
                my: "bottom right",
                at: "top left",
                viewport: $("body")
            }
        };
        $(node).qtip(param);
    }

    function underlineText(textElement, p) {
        var textBBox = textElement.getBBox();
        return p.path("M" + textBBox.x + " " + (textBBox.y + textBBox.height) + "L" + (textBBox.x + textBBox.width) + " " + (textBBox.y + textBBox.height));
    }


    self.init = function () {
        // setWindowSize();
        setDom(self);
        action = new Action();
        util = new Util();
        event = new Event();

        util.showLoader();
        event = new Event();
        paper = Raphael("genomicOverviewTracksContainer", paperWidth, paperHeight);
        paper.scale({zoom: true});

        var label = "Time since diagnosis";
        var t = paper.text(55, 11, label).attr({'text-anchor': 'center', 'fill': 'black', 'font-family': 'Nanum Gothic, sans-serif', 'font-size': 12});


        var pathology = new Pathology();
        var specimen = new Specimen();
        var sugery = new Sugery();
        var biopsy = new Biopsy();
        var image = new Image();

        // var digcategory=[];
        // if(!_.isUndefined(localStorage["digcategory"]))
        //     digcategory = JSON.parse(localStorage.getItem("digcategory"));
        // console.log('digcategory ',digcategory);
        //
        // var pids = [];
        // for(var i=0;i<digcategory.length;i++){
        //     pids.push(digcategory[i].pid);
        // }
        // pids = _.uniq(pids);
        // console.log('pids ', pids);
        // if(pids.length<1){
        //     util.hideLoader();
        //     return;
        // }
        // console.log(pids.length);
        var pids = [];
        pids.push('SPECIMEN');
        pids.push('SUGERY');
        pids.push('BIOPSY');
        pids.push('PATHOLOGY_EXAM');
        pids.push('IMAGING');
        var run=0;
        // for(var i=0;i<pids.length;i++) {
        //     (pids[i] === subject.specimen) ? specimen.init(findLevel, exist, setSpecimenData) : null;
        //     (pids[i] === subject.sugery) ? sugery.init(findLevel, exist, setSugeryData) : null;
        //     (pids[i] === subject.biopsy) ? biopsy.init(findLevel, exist, setBiopsyData) : null;
        //     (pids[i] === subject.pathology) ? pathology.init(findLevel, exist, setPathlogyData) : null;
        //     (pids[i] === subject.imaging) ? image.init(findLevel, exist, setImageData) : null;
        // }
        specimen.init(findLevel, exist, setSpecimenData);
        function setRound(data){
            ++run;
            console.log('run ', run, pids.length);
            RAW = _.union(RAW, data);
            if(run===pids.length) {
                console.log('initRAW ', RAW);
                setTimeLine('C', RAW);
            }
        }
        //console.log(run, pids.length);
        function setSpecimenData(data) {
            console.log('call specimen');
            setRound(data);
            sugery.init(findLevel, exist, setSugeryData)
        }
        function setSugeryData(data) {
            console.log('call sugery ');
            setRound(data);
            biopsy.init(findLevel, exist, setBiopsyData)
        }
        function setBiopsyData(data) {
            console.log('call biopsy');
            setRound(data);
            pathology.init(findLevel, exist, setPathlogyData)
        }
        function setPathlogyData(data) {
            console.log('call pathology');
            setRound(data);
            image.init(findLevel, exist, setImageData)
        }
        function setImageData(data) {
            console.log('call image');
            setRound(data);
        }

    }




    self.setZoom = function(scale,w, node){
        (node===1) ? LASTYPOS *= scale : LASTYPOS /= scale;
        removeLine();
        clearPaperPlotNode();
        paperWidth = w;
        XSCALE = scale;
        console.log('dig is ', dig, paperWidth, w);
        setTimeLine('R', dig);
    }
    self.setxgrid = function(show){
//        console.log(show);
        for (var i = 0; i < XGRIDS.length; i++) {
            if (!show) XGRIDS[i].show();
            else XGRIDS[i].hide();
        }
    }
    self.setreset = function(){
        if (INITUNIT == null || INITUNIT === UNIT) return;
        $("#spinner1").show();
        _.delay(function () {
            MODE = 'N';
            removeLine();
            clearPaperPlotNode();
            setTimeLine('C', RAW);
        }, 1000);
    }

    var setDom = function(that) {
        var scale, TFORM, overview, zcnt = 0;
        scale = 1;
        TFORM = 1.5;
        var w = paperWidth;
        $('#zoomin').click(function () {
            $("#spinner1").show();
            overview = $('#genomicOverviewTracksContainer').children(1);
            //w = overview.attr('width');
            _.delay(function () {
                scale = (TFORM * (zcnt + 1));
                w *= TFORM;
                overview.css('width', w);
                ++zcnt;
                that.setZoom(scale, w, 1);

            }, 1000);
        });

        $('#zoomout').click(function () {
            if (zcnt === 0) return;
            $("#spinner1").show();

            _.delay(function () {
                scale = (1 * zcnt) + (0.5 * zcnt);
                w /= TFORM;
                overview.css('width', w);
                --zcnt;
                that.setZoom(scale, w, 0);
            }, 1000);
        });

        $('#xgrid').on('click', function () {
            var val = $(this).val();
            var show = true;
            if (val === 'Grid on') {
                $(this).val('Grid off');
                show = false;
            }
            if (val === 'Grid off') {
                $(this).val('Grid on');
                show = true;
            }
            that.setxgrid(show);

        });
        $('#xgrid').trigger('click');
        $('#xgrid').hide();

        $("#reset").click(function () {

            that.setreset();
        });
    }

}