// $(document).ready(function () {
// });
function GenomicOverview() {
    var self = this;

    self.getXtAxis = function(){
        console.log("getMutation");
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientMutAxis", "patientId": PATIENTID};
        ds_cond.callback = self.setChromesome;
        action.selectPatientMuList(ds_cond);
    }
    self.init = function(mutation) {
        self.mutObjData = mutation;
        self.getXtAxis();
    }

    var plotChromosomes = function(genomeRef, p) {
        var yRuler = self.rowMargin+self.ticHeight;
        drawLine(self.wideLeftText,yRuler,self.wideLeftText+self.GenomeWidth,yRuler,p,'#000',1);

        for (var i=1; i<genomeRef.length; i++) {
                var xt = loc2xpixil(i,0);
                console.log(' xt is ', xt);
                drawLine(xt,yRuler,xt,self.rowMargin,p,'#000',1);

                var m = middle(i,genomeRef);
                p.text(m,yRuler-self.rowMargin,chmName(i));

        }
       drawLine(self.wideLeftText+self.GenomeWidth,yRuler,self.wideLeftText+self.GenomeWidth,self.rowMargin,p,'#000',1);
    }
    var middle = function(chm, genomeRef) {
        var loc = genomeRef[chm]/2;
        return loc2xpixil(chm,loc);
    };
    var chmName = function(chm) {
        if (chm === 23) return "X";
        if (chm === 24) return "Y";
        return chm;
    }

    var loc2xpixil = function(chm, loc){
        console.log('chm loc ', chm, loc);
        console.log('loc2perc(chm,loc ',loc2perc(chm,loc));
        console.log('self.GenomeWidth ',self.GenomeWidth,self.wideLeftText )
        return loc2perc(chm,loc) * self.GenomeWidth+self.wideLeftText;
    }
    var loc2perc = function(chm, loc){
        //console.log('GenomicOverview.genomeRef ', self.genomeRef);
        console.log('GenomicOverview.total ', self.total);
        var perc = getChmEndsPerc(self.genomeRef, self.total);
        console.log('chm-1 ', chm-1, loc, self.total, perc[chm-1], perc[chm-1] + loc / self.total);
        return perc[chm-1] + loc / self.total;
    }

    var getChmEndsPerc = function(chms, total) {
        console.log('getChmEnmdsPerc ', chms, total);
        var ends = [];
        ends.push(1);
        for (var i=1; i<chms.length; i++) {
            ends.push(ends[i-1] + Number(chms[i]) / total);
        }
        // console.log('total ', total);
        // console.log('chms ', chms);
        console.log('getchmEndsPerc ends ', ends);
        return ends;
    }


    self.setChromesome = function(xtjson){

        self.dig = [];
        self.xt=[];
        self.m = [];
        self.chmName = [];
        self.width = size.width-20;
        self.wideGenePanelIcon = 20;
        self.heigthGenePanelIcon = 18;
        self.pixelsPerBinMut = 3;
        self.rowHeight = 20;
        self.rowMargin = 5;
        self.ticHeight = 10;
        self.cnTh = [0.2,1.5];
        self.cnLengthTh = 50000;
        self.ticHeight = 10;
        self.canvasWidth = self.width;
        self.wideLeftText = 25;
        self.wideRightText = 35;
        self.pixelMap = [];
        console.log('self.canvasWidth ',self.canvasWidth , self.wideLeftText, self.wideRightText);
        self.GenomeWidth = self.canvasWidth-self.wideLeftText-self.wideRightText;
        console.log(' self.genomewidth ',self.GenomeWidth);

        self.LASTYPOS;
        self.YPOS = 0;
        self.paper = Raphael("genomicOverviewTracksContainer1", self.width, 115);
        self.paper.scale({zoom: true});
        //var t = paper.text(151, 20, "Raphaël\nkicks\nbutt!");
        self.genomeRef = [];
        self.genomeRef.push(1);
        for(var i=0;i<xtjson.length-1;i++){
            self.genomeRef.push(Number(xtjson[i].geneEndLocVal));
        }
        self.total = _.sum(self.genomeRef);

        plotChromosomes(self.genomeRef,self.paper);
        return;
        /*self.chmName = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'
        ];
        self.xt = [25, 110, 193, 261, 326, 388, 447, 501, 552, 600, 646, 693, 738, 778, 815, 850, 881, 908, 935, 955, 977, 993, 1011, 1064];
        self.m = [67, 151, 227, 294, 357, 418, 474, 526, 572, 623, 669, 715, 758, 796, 832, 865, 894, 922, 945, 966, 985, 1002, 1038, 1074];
        for (var i = 0; i < self.xt.length; i++) {
            self.xt[i] += 145;
            self.m[i] += 145;
        }*/
        var start = 50;
        self.xt.push(start);
        var i=1;
        console.log(xtjson);
        _.forEach(xtjson, function (v) {
            self.chmName.push(v.chrmNo);
            start = self.xt[i-1];
            if(xt>1)start= Number(v.geneEndLocVal) * 0.000001;
            self.xt.push(Number(start) + Number(v.geneEndLocVal)*0.000001);
            //self.m.push((Number(self.xt[i]) - Number(self.xt[i-1]) ) / 2);
            ++i;
        });

        for(var i=1;i<self.xt.length;i++){
            self.m.push(Number(self.xt[i-1]) + ( (Number(self.xt[i]) - Number(self.xt[i-1]) ) / 2) );
        }
        var width = self.xt[self.xt.length-1];
        self.width = width;
        $('#genomicOverviewTracksContainer1').children(1).css('width',(width+40)+'px');
        console.log("genomeoverview xt is ", self.xt);
        console.log("genomeoverview m is ", self.m);
        console.log("genomeoverview chmName ", self.chmName);

        self.yRuler = 15;
        drawLine(self.xt[0], self.yRuler, self.width, self.yRuler, self.paper, '#000', 1);
        //drawLine('25', yRuler, 1090, yRuler, paper, '#000', 1);

        for (var i = 0; i < self.chmName.length-1; i++) {
            drawLine(self.xt[i], self.yRuler, self.xt[i], 5, self.paper, '#000', 1);
            var txt = self.paper.text(self.m[i], 10, self.chmName[i]);
            //console.log('text ', m[i], 10, chmName[i]);
        }

        drawLine(self.width-1, self.yRuler, self.width-1, 5, self.paper, '#000', 1);

        self.getMutationPixelMap();
        //self.makeEventBarChart();
    }

    drawLine = function(x1, y1, x2, y2, p, cl, width) {
        console.log("self.YPOS " , x1, y1, x2, y2);

        width = 1;
        //console.log( 'x1 ', x1 , ' y1 ', y1, ' x2 ', x2, ' y2 ',y2, ' p ', p, ' cl ', cl, ' width ', width);
        var path = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
        var line = p.path(path);
        line.attr("stroke", cl);
        line.attr("stroke-width", width);
        line.attr("opacity", 0.5);
        line.translate(0.5, 0.5);
        return line;
    }

//--event bar chart
    self.category = {
        "id": "0",
        "name": "",
        "level": "0",
        "data": [
            {
                "name": "MUT",
                "id": "1",
                "pid": "0",
                "level": "1",
                "show": "1"
            }
            ,
            {
                "name": "CNA",
                "id": "2",
                "pid": "0",
                "level": "1",
                "show": "1",
            },
            {
                "name": "EXP",
                "level": "1",
                "id": "3",
                "pid": "0",
                "show": "1",
            },
            {
                "name": "STR",
                "level": "1",
                "id": "4",
                "pid": "0",
                "show": "1",
            }

        ]
    };

    self.makeEventBarChart = function(){
        self.cat(self.category);
        self.plotdrawing(self.dig);
    }

    self.cat = function(cate) {
        var txt = '';
        var item = {};
        console.log(' cate is ', cate['id']);
        item.id = cate['id'];
        item.pid = cate['pid'];
        _.map(cate, function (v, k) {
            console.log(k, '--> ', v);
            if (k == 'name') {
                console.log('name ==> ', v);
                item.name = v;
                item.leaf = true;
            }
            if (k == 'show') item.show = v;
            if (k == 'level') {/*console.log('level ==> ', d);*/
                item.level = v;
                self.dig.push(item);
            }
            if (k == 'data' || _.isNumber(k)) self.cat(v);
        });

        self.dig = _.filter(self.dig, function (o) {
            return (o.name != null && o.name !== '');
        });
        console.log('gene.dig ', self.dig);
    }

    self.getHolderIndex = function() {
        var positionIndex = [];
        for (var i = 0; i < self.chmName.length; i++) {
            positionIndex.push(i);
        }
        return positionIndex;
    }


    self.fyRow = function(row) {
        return 2 * 5 + 10 + row * (20 + 5)+self.YPOS;
    }

    /* var pixelMap = [[],[]];
     pixelMap[0][78] = ["SLC27A3: G111D"];
     pixelMap[0][123] = ["ZFP36L2: C174Sfs*302"];
     pixelMap[0][249] = ["SI: V109I"];
     pixelMap[0][519] = ["PRKDC: X133_splice"];
     pixelMap[0][708] = ["KMT2D: V5208Wfs*35"];
     pixelMap[0][711] = ["KRT85: G85R"];
     pixelMap[0][1056] = ["ENOX2: H250Q"];

     pixelMap[1][18] = ["SLC27A3: G111D"];
     pixelMap[1][183] = ["ZFP36L2: C174Sfs*302"];
     pixelMap[1][289] = ["SI: V109I"];
     pixelMap[1][569] = ["PRKDC: X133_splice"];
     pixelMap[1][768] = ["KMT2D: V5208Wfs*35"];
     pixelMap[1][761] = ["KRT85: G85R"];
     pixelMap[1][1096] = ["ENOX2: H250Q"];*/

    // self.pixelMap = [{
    //         "name": "MUT",
    //         "data": [
    //             {"axis": "78", "name": ["SLC27A3: G111D"]},
    //             {"axis": "123", "name": ["ZFP36L2: C174Sfs*302"]},
    //             {"axis": "249", "name": ["SI: V109I"]},
    //             {"axis": "519", "name": ["PRKDC: X133_splice"]},
    //             {"axis": "708", "name": ["KMT2D: V5208Wfs*35"]},
    //             {"axis": "711", "name": ["KRT85: G85R"]},
    //             {"axis": "1056", "name": ["ENOX2: H250Q"]}
    //         ]
    //     }
    //         ,
    //         {
    //             "name": "CNA",
    //             "data": [
    //                 {"axis": "18", "name": ["SLC27A3: G111D"]},
    //                 {"axis": "183", "name": ["ZFP36L2: C174Sfs*302"]},
    //                 {"axis": "289", "name": ["SI: V109I"]},
    //                 {"axis": "569", "name": ["PRKDC: X133_splice"]},
    //                 {"axis": "768", "name": ["KMT2D: V5208Wfs*35"]},
    //                 {"axis": "761", "name": ["KRT85: G85R"]},
    //                 {"axis": "1096", "name": ["ENOX2: H250Q"]}
    //             ]
    //         }]
    // ;

    self.getMutationPixelMap = function(){
        var mutObj = self.mutObjData;
        console.log('mutObj ', mutObj);
        for(var i=0; i<mutObj.length; i++){
            // var x = Math.round(self.loc2xpixil(mutObj[i].chrnNo, (mutObj[i].geneVariStLocVal + mutObj[i].geneVariEndLocVal)/2));
            // var xBin = x - x%3;
            // if (self.pixelMap[xBin] == null) self.pixelMap[xBin] = [];
            var x = Number(mutObj.geneVariEndLocVal) -  Number(mutObj.geneVariStLocVal);
            if(x===0)x=1;
            var chm = mutObj.chrnNo;
            var p = self.xt[chm-1];
            p+=x;
            var xBin = x - x%3;

            self.pixelMap[xBin].push(mutObj.geneNm + ": " + mutObj.hgvspVal);
        }
        console.log('GenomicOverview pixelMap ', self.pixelMap);
    }


    //var label = ['ABC','DEF'];
    // console.log(' dig ', self.dig);
    // self.label = "Time since diagnosis";
    // self.t = self.paper.text(55, 10, self.label).attr({'text-anchor': 'center', 'fill': 'black', "font-size": 12});

    self.getHundreadRatio = function() {
        var track = [];
        for (var i = 1; i < self.xt.length; i++) {
            var trackUnitPeriod = self.xt[i] - self.xt[i - 1];
            track.push(trackUnitPeriod);
        }
        console.log(' track period is ', track);
        //console.log(' average is ' , _.meanBy(track));
        return track;
    }

    self.getAddRatio = function(value) {
        var temp = value.toString();

        var seed = "0" + "." + value;
        console.log(' seed ', seed);
        return Number(seed);
    }

    self.getTargetPosition = function(seed) {
        var track = self.getHundreadRatio();
        console.log(seed);
        var f = seed.substring(0, 1);  //prefix
        var l = seed.substring(1);   //surfix
        console.log(' l ', l);
        var z = '';
        for (var i = 0; i < l.length; i++) {
            z += '0';
        }
        var t = f + z;
        var ratio = 10;
        console.log('zero base ', t);   //ex) 78 123 249 519 708 => 0 100 200 500 700
        console.log(' surfix length is ', l.length);
        var temp = Number("1" + z);
        console.log('temp ', temp);
        var index = t / temp;
        console.log('index ', index);

        var idx = 0;
        if (Number(t) < 100) idx = 0;
        if (Number(t) >= 100 && Number(t) < 1000) {
            idx = index;
            ratio = 100;
        }
        if (Number(t) >= 1000 && Number(t) < 10000) {
            idx = index + '0';
            ratio = 1000;
        }
        if (Number(t) >= 10000 && Number(t) < 100000) {
            idx = index + '00';
            ratio = 1000;
        }

        var holder = self.getHolderIndex();
        console.log('idx ', idx);
        var position = holder[idx];
        //if(idx>9){position = holder[idx-(l.length-(l.length-1))];}
        console.log('position value ', position);
        console.log(' the horzantal position is ', self.xt[position]);
        var addup = Number(l) * self.getAddRatio(track[position]);
        console.log(' addup ', addup);

        //var targetPosition = (xt[position] + (Number(l)/ratio * (ratio/10) ) );
        var targetPosition = self.xt[position] + addup;
        if (idx === 0) targetPosition += 25;
        console.log(' target position ', targetPosition);
        //console.log(' track is ', track[position-1]);
        return targetPosition;
    }

    self.getPixelMap = function(pixel, item) {
        console.log(pixel);
        console.log('item ', item);
        var spot = [];
        for (var i = 0; i < pixel.length; i++) {
            var pitem = _.map(pixel[i], function (value, key) {
                console.log(' key ', key);
                console.log('value ', value);
                if (key == 'name' && value == item) {
                    find = true;
                    console.log('find ');
                    spot.push(pixel[i].data);
                }
            });
        }
        return spot;
    }

    self.plotMuts = function(p, row, label) {
        console.log(' plotMuts called====> ', label.pid, ' ', label.name, label.leaf);
        var maxCount = 5; // set max height to 5 mutations
        var yRow = self.fyRow(row) + 20;
        //var rowindex = 0;
        if (label.leaf == true) {
            var pixeldataV = self.getPixelMap(self.pixelMap, label.name) || [];
            console.log('pixeldata length =>', pixeldataV);
            _.map(pixeldataV, function (pixeldata, k) {
                console.log('k ', k, 'v ', pixeldata.length);
                var idx = 0;
                //var pary=[];
                for (var i = 0; i < pixeldata.length; i++) {
                    //console.log("  pixeldata[i].axis  ", pixeldata[i]);
                    var position = self.getTargetPosition(pixeldata[i].axis);
                    console.log(" position => ", position);
                    var h = pixeldata[i].name.length > maxCount ? 20 : (20 * pixeldata[i].name.length / maxCount);
                    //console.log(yRow-h);
                    pixil = 150;
                    var r = p.rect(position, yRow - h, 3, h);
                    r.attr("fill", "#0f0");
                    r.attr("stroke", "#0f0");
                    r.attr("stroke-width", 1);
                    r.attr("opacity", 0.5);
                    r.translate(0.5, 0.5);
                    r.hover(function () {
                            //r.animate({'scale': [1.25, 1.25]}, 750, 'easeOutCubic', callback);
                            this.transform('S1.5,1.5');
                        }, function () {
                            this.transform('s1,1');
                        }
                    );
                    self.addToolTip(r.node, pixeldata[i].name.join("</br>"), 100, '');
                    ++idx;

                }
            });
        }
        var deep = label.level;
        var lbl = label.name;
        //console.log(' LAVEL DEEP ==> ', Number(deep));
        var t = p.text((12 + Number(deep) * 8), yRow + 7 - (row + 8), lbl).attr({
            'text-anchor': 'start',
            'fill': 'black',
            'cursor': 'pointer',
            'font-size': '12'
        });
        var ypos = yRow + 5;
        self.LASTYPOS = ypos;

    }

    self.plotdrawing = function(diagnosis) {
        var k = 0;
        for (var i = 0; i < diagnosis.length; i++) {
            //console.log( ' diagnosis[i] ', diagnosis[i])
            if (diagnosis[i].show == '1') {
                self.plotMuts(self.paper, k, diagnosis[i]);
                ++k;
            }
        }
    }

    self.addToolTip = function (node, tip, showDelay, position) {
        var param = {
            content: {text: tip},
            show: {event: "mouseover"},
            hide: {fixed: true, delay: 100, event: "mouseout"},
            style: {classes: 'qtip-light qtip-rounded'},
            position: {
                my: "bottom right",
                at: "top left",
                viewport: $("body")
            }
        };
        $(node).qtip(param);

    }

}