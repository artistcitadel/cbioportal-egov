/**
 * @author 오세영
 * based on the grch307 build
 */
GENOMICOVERVIEWDATA = [];
MUTATIONGENOMICDATA = [];
MERGEDMUTATION=[];
// MERGEDSEQ=[];
function GenomicOverview() {
    var self = this;
    var util,action;
    var getXtAxis = function(){
        console.log("getMutation");
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientMutAxis", "patientId": PATIENTID};
        ds_cond.callback = setChromesome;
        action.selectPatientMuList(ds_cond);
    }
    self.init = function(mutation) {
        // setWindowSize();
        action = new Action();
        util = new Util();
        self.mutObjData = mutation['MUTATIONS'];
        self.cnaObjData = mutation['CNV'];
        self.stObjData = mutation['SV'];
        MUTATIONGENOMICDATA = mutation;
        getXtAxis();
    }

    self.ROW = 0;
    var plotChromosomes = function(genomeRef, p) {
        var yRuler = self.rowMargin+self.ticHeight;
        drawLine(self.wideLeftText,yRuler,self.wideLeftText+self.GenomeWidth,yRuler,p,'#000',1);
        for (var i=1; i<genomeRef.length; i++) {
                var xt = loc2xpixil(i,0);
                // console.log(' xt is ', xt);
                drawLine(xt,yRuler,xt,self.rowMargin,p,'#000',1);

                var m = middle(i,genomeRef);
                p.text(m,yRuler-self.rowMargin,chmName(i));
                self.chmName.push(chmName(i));

        }
       drawLine(self.wideLeftText+self.GenomeWidth,yRuler,self.wideLeftText+self.GenomeWidth,self.rowMargin,p,'#000',1);

       getMutationPixelMap(p, self.ROW);// mut,sv,
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
        // console.log('chm is ', chm);
        // console.log('goConfig.GenomeWidth + goConfig.wideLeftText ', self.GenomeWidth , self.wideLeftText);
        return loc2perc(chm,loc) * self.GenomeWidth+self.wideLeftText;
    }
    var loc2perc = function(chm, loc){
        //console.log('GenomicOverview.genomeRef ', self.genomeRef);
        // console.log('GenomicOverview.total ', self.total);
        var perc = getChmEndsPerc(self.genomeRef, self.total);
        // console.log('chm-1 ', chm-1, loc, self.total, perc[chm-1], perc[chm-1] + loc / self.total);
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


    self.redraw = function(xtjson){
        if(xtjson.length===0)return;
        action = new Action();
        util = new Util();
        self.mutObjData = MUTATIONGENOMICDATA['MUTATIONS'];
        self.cnaObjData = MUTATIONGENOMICDATA['CNV'];
        self.stObjData = MUTATIONGENOMICDATA['SV'];
        setChromesome(xtjson);
    }
    var setChromesome = function(xtjson){
        if(GENOMICOVERVIEWDATA.length===0)
            GENOMICOVERVIEWDATA= xtjson;
        self.dig = [];
        self.xt=[];
        self.m = [];
        self.chmName = [];
        self.width = window.innerWidth-160;
        self.wideGenePanelIcon = 20;
        self.heigthGenePanelIcon = 18;
        self.pixelsPerBinMut = 3;
        self.rowHeight = 20;
        self.rowMargin = 5;
        self.ticHeight = 10;
        self.cnTh = [0.2,1.5];
        self.cnLengthTh = 50000;
        self.canvasWidth = self.width;
        self.wideLeftText = 37;
        self.wideRightText = 35;
        // self.pixelMap = [];
        // console.log('self.canvasWidth ',self.canvasWidth , self.wideLeftText, self.wideRightText);
        self.GenomeWidth = self.canvasWidth-self.wideLeftText-self.wideRightText;
        // console.log(' self.genomewidth ',self.GenomeWidth);

        self.LASTYPOS;
        self.YPOS = 0;
        self.paper = Raphael("genomicOverviewTracksContainer1", self.width, 215);
        self.paper.scale({zoom: true});
        //var t = paper.text(151, 20, "Raphaël\nkicks\nbutt!");
        self.genomeRef = [];
        self.genomeRef.push(0);
        for(var i=0;i<xtjson.length-1;i++){
            self.genomeRef.push(Number(xtjson[i].geneEndLocVal));
        }
        self.total = _.sum(self.genomeRef);
        plotChromosomes(self.genomeRef,self.paper);

    }

    var xGenePanelIcon = function() {
        return xRightText() + 30;
    };
    var xGenePanelIconText = function() {
        return xRightText() + 30 + self.wideGenePanelIcon/2;
    };


    var drawLine = function(x1, y1, x2, y2, p, cl, width) {
        // console.log("self.YPOS " , x1, y1, x2, y2);

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

    var translateChm = function(chm) {
        if (chm.toLowerCase().indexOf("chr")===0) chm=chm.substring(3);
        if (chm==='X'||chm==='x') chm = 23;
        if (chm==='Y'||chm==='y') chm = 24;
        if (isNaN(chm) || chm < 1 || chm > 24) return null;
        return parseInt(chm);
    }

    var drawPlot = function(pixelMap, p ,row, len,seq){
        var maxCount = 5; // set max height to 5 mutations

        var yRow = self.yRow(row)+self.rowHeight;
        $.each(pixelMap, function(i, arr) {
            var pixil = i;
            if (arr) {
                // console.log( 'arr ',arr);
                var h = arr.length>maxCount ? self.rowHeight : (self.rowHeight*arr.length/maxCount);
                var r = p.rect(pixil,yRow-h,self.pixelsPerBinMut,h);
                r.attr("fill","#0f0");
                r.attr("stroke", "#0f0");
                r.attr("stroke-width", 1);
                r.attr("opacity", 0.5);
                r.translate(0.5, 0.5);
                addToolTip(r.node, arr.join("</br>"), 100, '');
            }
        });
        var label = "MUT("+seq+")";
        var t = p.text(18,yRow-self.rowHeight/2,label).attr({'text-anchor': 'center', 'fill':'black'});

        t.node.setAttribute('id','mutTrack'+seq);
        var $container = $('[id="mutTrack'+seq+'"]');
        var pos = {x: parseInt($container.attr('x')) - 9, y: parseInt($container.attr('y')) - 1};
        var $newContainer = $('<svg height="12" width="12" />').attr(pos);
        $newContainer.append(getSampleLabel(seq));
        $container.replaceWith($newContainer);

        t = p.text(xRightText(),yRow-self.rowHeight/2,len).attr({'text-anchor': 'start','font-weight': 'bold'});
        underlineText(t,p);
        var tip = "Number of mutation events.";
        addToolTip(t.node,tip,null,{my:'top right',at:'bottom left'});
    }

    var getMutationPixelMap = function(p,row) {
         console.log('getMutationPixelMap called');
        var mutObj = self.mutObjData;
        // console.log('mutObj ', mutObj);


        var spcnSeq = [];
        for (var i = 0; i < mutObj.length; i++) {
            var examSeq = mutObj[i].geneExamSpcnSeq;
            (examSeq.indexOf(',') === -1) ?
                spcnSeq.push($.trim(examSeq)) :
                (
                    _.forEach(examSeq.split(","), function (v) {
                        spcnSeq.push($.trim(v))
                    })
                )
        }
        spcnSeq = _.uniq(spcnSeq);

         // MERGEDSEQ = MERGEDSEQ.concat(spcnSeq);
         MERGEDMUTATION = MERGEDMUTATION.concat(mutObj);

        // console.log('MUT spcnSeq ',spcnSeq);
        // spcnSeq = util.spcnSeqFilter(spcnSeq, SAMPLEID);

        _.forEach(spcnSeq, function (v) {
             // console.log(' vis ', v);
            var pixelMap = [];
            var len = 0;
            for (var i = 0; i < mutObj.length; i++) {
                if (mutObj[i].geneExamSpcnSeq.indexOf(v) !== -1) {
                    var chm = translateChm(mutObj[i].chrnNo);
                    // console.log('start end ', mutObj[i].geneVariStLocVal, mutObj[i].geneVariEndLocVal, (Number(mutObj[i].geneVariStLocVal) + Number(mutObj[i].geneVariEndLocVal)) / 2);
                    var x = Math.round(loc2xpixil(chm, (Number(mutObj[i].geneVariStLocVal) + Number(mutObj[i].geneVariEndLocVal)) / 2));
                    // console.log('x is ', x);
                    var xBin = x - x % 3;
                    if (pixelMap[xBin] == null) pixelMap[xBin] = [];
                    pixelMap[xBin].push(mutObj[i].geneNm + ": " + mutObj[i].hgvspVal);
                    ++len;
                    SAMPLEPERMUTATION[v]+=1;
                }
            }

        // console.log('GenomicOverview pixelMap ', pixelMap);
        drawPlot(pixelMap, p, row, len, v);
         ++row;
         len=0;
        });

        getCnaPixelMap(p, row); //cna, sv,

        // if(mutObj.length>0){
        //     var thumbnailExpandVAFPlot = new ThumbnailExpandVAFPlot();
        //     thumbnailExpandVAFPlot.init(spcnSeq, mutObj);
        // }
    }


    var getCnaPixelMap = function(p,row) {
        row-=0.5;
        // console.log('getCnaPixelMap called');
        var cnaObj = self.cnaObjData;
        // console.log('cnaObj ', cnaObj);

        var spcnSeq = [];
        for (var i = 0; i < cnaObj.length; i++) {
            var examSeq = cnaObj[i].geneExamSpcnSeq;
            (examSeq.indexOf(',') === -1) ?
                spcnSeq.push($.trim(examSeq)) :
                (
                    _.forEach(examSeq.split(","), function (v) {
                        spcnSeq.push($.trim(v))
                    })
                )
        }
        var spcnSeq1 = _.uniq(spcnSeq);
         // console.log('CNA spcnSeq ',spcnSeq1);
        // spcnSeq1 = util.spcnSeqFilter(spcnSeq1, SAMPLEID);

         // MERGEDSEQ = MERGEDSEQ.concat(spcnSeq1);
         MERGEDMUTATION = MERGEDMUTATION.concat(cnaObj);

        _.forEach(spcnSeq1, function (v) {
            // console.log(' vis ', v);
            var pixelMap = [];
            var len = 0;
            var genomeMeasured = 0;
            var genomeAltered = 0;
            var yRow = self.yRow(row)+self.rowHeight;
            for (var i = 0; i < cnaObj.length; i++) {
              if (cnaObj[i].geneExamSpcnSeq.indexOf(v) !== -1) {
                var chm = translateChm(cnaObj[i].chrnNo);
                var start = Number(cnaObj[i].geneVariStLocVal);
                var end = Number(cnaObj[i].geneVariEndLocVal);
                var segMean = Number(cnaObj[i].segCol);
                genomeMeasured += end-start;

                if (Math.abs(segMean)<self.cnTh[0]) return;
                if (end-start<self.cnLengthTh) return; //filter cnv
                genomeAltered += end-start;

                var x1 = loc2xpixil(chm,start);
                var x2 = loc2xpixil(chm,end);
                var r  = p.rect(x1,yRow,x2-x1,self.rowHeight);
                var cl = self.getCnColor(segMean);
                r.attr("fill",cl);
                r.attr("stroke", cl);
                r.attr("stroke-width", 1);
                r.attr("opacity", 0.5);
                r.translate(0.5, 0.5);
                var tip = "Mean copy number log2 value: "+segMean+"<br/>from "+loc2string(chm,start)+"<br/>to "+loc2string(chm,end);
                addToolTip(r.node,tip, '', '');
                ++len;
                SAMPLEPERMUTATION[v]+=1;
              }
            }
            var label = "CNA("+v+")";
            var t = p.text(16,yRow+self.rowHeight/2,label).attr({'text-anchor': 'center', 'fill':'black'});

            t.node.setAttribute('id','cnaTrack'+v);
            var $container = $('[id="cnaTrack'+v+'"]');
            var pos = {x: parseInt($container.attr('x')) - 9, y: parseInt($container.attr('y')) - 1};
            var $newContainer = $('<svg height="12" width="12" />').attr(pos);
            $newContainer.append(getSampleLabel(v));
            $container.replaceWith($newContainer);


            var label = genomeMeasured===0 ? 'N/A' : (100*genomeAltered/genomeMeasured).toFixed(1)+'%';
            var tip = genomeMeasured===0 ? 'Copy number segment data not available' :
                ("Percentage of copy number altered chromosome regions (mean copy number log value >0.2 or <-0.2) out of measured regions.");

            var t = p.text(xRightText()-4, yRow+self.rowHeight/2, label).attr({'text-anchor': 'start','font-weight': 'bold'});

            underlineText(t,p);
            addToolTip(t.node, tip,null,{my:'top right',at:'bottom left'});
            var noGenePanelMessage = 'Gene panel information not found. Sample is presumed to be whole exome/genome sequenced.';

        ++row;
        len=0;
        });

        getStPixelMap(p, row);// st,
    }

    var getStPixelMap = function(p,row) {
        row+=1;
        var mutObj = self.stObjData;
        // console.log('sttObj ', mutObj);
        // console.log('getStPixelMap called',mutObj);
        var spcnSeq = [];
        for (var i = 0; i < mutObj.length; i++) {
            var examSeq = mutObj[i].geneExamSpcnSeq;
            //console.log('==>',examSeq, examSeq.indexOf(','));
            (examSeq.indexOf(',') === -1) ?
                spcnSeq.push(examSeq) :
                (
                    _.forEach(examSeq.split(","), function (v) {
                        spcnSeq.push(v)
                    })
                )
        }
        spcnSeq = _.uniq(spcnSeq);
        // console.log('ST spcnSeq ',spcnSeq);

         // MERGEDSEQ = MERGEDSEQ.concat(spcnSeq);
         MERGEDMUTATION = MERGEDMUTATION.concat(mutObj);

        // spcnSeq = util.spcnSeqFilter(spcnSeq, SAMPLEID);

        _.forEach(spcnSeq, function (v) {
            // console.log(' vis ', v);
            var pixelMap = [];
            var len = 0;
            for (var i = 0; i < mutObj.length; i++) {
                if (mutObj[i].geneExamSpcnSeq.indexOf(v) !== -1) {

                    var chm = translateChm(mutObj[i].chrnNo);
                    var x = Math.round(loc2xpixil(chm, (Number(mutObj[i].geneVariStLocVal) + Number(mutObj[i].geneVariStLocVal)) / 2));
                    var xBin = x - x % 1;
                    if (pixelMap[xBin] == null) pixelMap[xBin] = [];
                    pixelMap[xBin].push(mutObj[i].geneNm + ": " + mutObj[i].cytbNm);

                    var chm1 = translateChm(mutObj[i].chrnNo1);
                    var x1 = Math.round(loc2xpixil(chm1, (Number(mutObj[i].geneVariEndLocVal) + Number(mutObj[i].geneVariEndLocVal)) / 2));
                    var xBin1 = x1 - x1 % 1;
                    if (pixelMap[xBin1] == null) pixelMap[xBin1] = [];
                    pixelMap[xBin1].push(mutObj[i].geneNm1 + ": " + mutObj[i].cytbNm1);
                    ++len;
                    SAMPLEPERMUTATION[v]+=1;
                }
            }

            // console.log('ST pixelMap ', pixelMap);
            drawPlotSt(pixelMap, p, row, len, v);
            ++row;
            len=0;
        });

        if(MERGEDMUTATION.length>0){
          // MERGEDSEQ = _.uniq(MERGEDSEQ);
            // console.log('MERGEDSEQ ',MERGEDSEQ);
            // console.log('MERGEDMUTATION ',MERGEDMUTATION);
          var thumbnailExpandVAFPlot = new ThumbnailExpandVAFPlot();
          thumbnailExpandVAFPlot.init(SAMPLES, MERGEDMUTATION);
        }

   }
    var drawPlotSt = function(pixelMap, p ,row, len,seq){
        var maxCount = 5; // set max height to 5 mutations

        var yRow = self.yRow(row)+self.rowHeight;
        var odd = 0;
        var j=0;
        $.each(pixelMap, function(i, arr) {
            var pixil = i;
            if (arr) {
                if(j%2 === 0){
                    odd=pixil;
                }
                //console.log( 'pixil ',pixil);
                var h = arr.length>maxCount ? self.rowHeight : (self.rowHeight*arr.length/maxCount);
                var r = p.rect(pixil,yRow-h,self.pixelsPerBinMut,h+2);
                r.attr("fill","#0f0");
                r.attr("stroke", "#0f0");
                r.attr("stroke-width", 1);
                r.attr("opacity", 0.5);
                r.translate(0.5, 0.5);
                addToolTip(r.node, arr.join("</br>"), 100, '');

                if(j%2 !== 0) {
                    drawLine(odd+1, yRow - h+2, pixil, yRow - h+2, p, '#0f0', 3);
                }
                // console.log('jis ', j, pixil, odd);
                ++j;
            }
        });
        var label = "ST("+seq+")";
        var t = p.text(18,yRow-self.rowHeight/2,label).attr({'text-anchor': 'center', 'fill':'black'});

        t.node.setAttribute('id','svTrack'+seq);
        var $container = $('[id="svTrack'+seq+'"]');
        var pos = {x: parseInt($container.attr('x')) - 9, y: parseInt($container.attr('y')) - 5};
        var $newContainer = $('<svg height="12" width="12" />').attr(pos);
        $newContainer.append(getSampleLabel(seq));
        $container.replaceWith($newContainer);

        t = p.text(xRightText(),yRow-self.rowHeight/2,len).attr({'text-anchor': 'start','font-weight': 'bold'});
        underlineText(t,p);
        var tip = "Number of mutation events.";
        addToolTip(t.node,tip,null,{my:'top right',at:'bottom left'});
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

    addToolTip = function(node, tip, showDelay, position) {
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

    self.getCnColor = function(cnValue) {
        if (cnValue>=self.cnTh[1])
            return "#f00";
        if (cnValue<=-self.cnTh[1])
            return "#00f";
        var c = Math.round(255*(self.cnTh[1]-Math.abs(cnValue))/(self.cnTh[1]-self.cnTh[0]));
        if (cnValue<0)
            return "rgb("+c+","+c+",255)";
        else
            return "rgb(255,"+c+","+c+")";
    };

    function loc2string(chm,loc) {
        //console.log('loc2string ', chm , self.chmName);
        return "chr"+chm+":"+addCommas(loc);
    }

    function addCommas(x)
    {
        var strX = x+"";
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(strX)) {
            strX = strX.replace(rgx, '$1' + ',' + '$2');
        }
        return strX;
    }

}