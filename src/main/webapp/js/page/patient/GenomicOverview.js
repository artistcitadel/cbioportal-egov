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
        getMutationPixelMap(p,0);// mut,sv,
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
        console.log('chm is ', chm);
        console.log('goConfig.GenomeWidth + goConfig.wideLeftText ', self.GenomeWidth , self.wideLeftText);
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
        //console.log('getChmEnmdsPerc ', chms, total);
        var ends = [0];

        for (var i=1; i<chms.length; i++) {
            ends.push(ends[i-1] + Number(chms[i]) / total);
        }
        // console.log('total ', total);
        // console.log('chms ', chms);
        //console.log('getchmEndsPerc ends ', ends);
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
        self.genomeRef.push(0);
        for(var i=0;i<xtjson.length-1;i++){
            self.genomeRef.push(Number(xtjson[i].geneEndLocVal));
        }
        self.total = _.sum(self.genomeRef);

        plotChromosomes(self.genomeRef,self.paper);

        /*self.chmName = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'
        ];
        self.xt = [25, 110, 193, 261, 326, 388, 447, 501, 552, 600, 646, 693, 738, 778, 815, 850, 881, 908, 935, 955, 977, 993, 1011, 1064];
        self.m = [67, 151, 227, 294, 357, 418, 474, 526, 572, 623, 669, 715, 758, 796, 832, 865, 894, 922, 945, 966, 985, 1002, 1038, 1074];
        for (var i = 0; i < self.xt.length; i++) {
            self.xt[i] += 145;
            self.m[i] += 145;
        }*/


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
    var translateChm = function(chm) {
        if (chm.toLowerCase().indexOf("chr")===0) chm=chm.substring(3);
        if (chm==='X'||chm==='x') chm = 23;
        if (chm==='Y'||chm==='y') chm = 24;
        if (isNaN(chm) || chm < 1 || chm > 24) return null;
        return parseInt(chm);
    }
    var getMutationPixelMap = function(p,row){
        console.log('getMutationPixelMap called');
        var mutObj = self.mutObjData;
        console.log('mutObj ', mutObj);
        for(var i=0; i<mutObj.length; i++){
            var chm = translateChm(mutObj[i].chrnNo);
            console.log('start end ',mutObj[i].geneVariStLocVal, mutObj[i].geneVariEndLocVal,  (Number(mutObj[i].geneVariStLocVal) + Number(mutObj[i].geneVariEndLocVal) )/2);
            var x = Math.round(loc2xpixil(chm, (Number(mutObj[i].geneVariStLocVal) + Number(mutObj[i].geneVariEndLocVal) )/2));
            console.log('x is ',x);
            var xBin = x - x%3;
            if (self.pixelMap[xBin] == null) self.pixelMap[xBin] = [];

            self.pixelMap[xBin].push(mutObj[i].geneNm + ": " + mutObj[i].hgvspVal);
        }
        console.log('GenomicOverview pixelMap ', self.pixelMap);

        var maxCount = 5; // set max height to 5 mutations

        var yRow = self.yRow(row)+self.rowHeight;
        $.each(self.pixelMap, function(i, arr) {
            var pixil = i;
            if (arr) {
                console.log( 'arr ',arr);
                var h = arr.length>maxCount ? self.rowHeight : (self.rowHeight*arr.length/maxCount);
                var r = p.rect(pixil,yRow-h,self.pixelsPerBinMut,h);
                r.attr("fill","#0f0");
                r.attr("stroke", "#0f0");
                r.attr("stroke-width", 1);
                r.attr("opacity", 0.5);
                r.translate(0.5, 0.5);
                self.addToolTip(r.node, arr.join("</br>"), 100, '');
            }
        });
        var label = "MUT";
        var t = p.text(12,yRow-self.rowHeight/2,label).attr({'text-anchor': 'center', 'fill':'black'});
        var t = p.text(xRightText(),yRow-self.rowHeight/2,mutObj.length).attr({'text-anchor': 'start','font-weight': 'bold'});
        underlineText(t,p);
        var tip = "Number of mutation events.";
        self.addToolTip(t.node,tip,null,{my:'top right',at:'bottom left'});
    }

    self.yRow = function(row) {
        return 2*self.rowMargin+self.ticHeight+row*(self.rowHeight+self.rowMargin);
    };
    var xRightText = function() {
        return self.wideLeftText + self.GenomeWidth+5;
    };
    var underlineText = function(textElement,p) {
        var textBBox = textElement.getBBox();
        return p.path("M"+textBBox.x+" "+(textBBox.y+textBBox.height)+"L"+(textBBox.x+textBBox.width)+" "+(textBBox.y+textBBox.height));
    }

    self.addToolTip = function(node, tip, showDelay, position) {
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

}