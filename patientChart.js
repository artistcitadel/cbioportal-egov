$(document).ready(function () {
    var XGRIDS=[];
    var dig = [];
    var PAPERNODE=[];
    var LASTYPOS=0;
    //var BOTTOMLINE;
    var leaf = [{"name": "Tissue"},{"name": "BRC"},{"name": "Sugery"},{"name": "Imaging"},{"name": "CEA"},{"name": "IHC"},{"name": "MSI"},{"name": "bevacizumab [100mg]"},{"name": "5-fluorouracil [1000mg]"}];
    var paper = Raphael("genomicOverviewTracksContainer", 1245, 315);
    paper.scale({ zoom: true});
    //var t = paper.text(151, 20, "Raphaël\nkicks\nbutt!");

    var chmName = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'
    ];
    var xt = [25, 110, 193, 261, 326, 388, 447, 501, 552, 600, 646, 693, 738, 778, 815, 850, 881, 908, 935, 955, 977, 993, 1011,1064];
    var m  = [67, 151, 227, 294, 357, 418, 474, 526, 572, 623, 669, 715, 758, 796, 832, 865, 894, 922, 945, 966, 985, 1002, 1038, 1074];
    for(var i=0;i<xt.length;i++){
        xt[i]+=145;
        m[i]+=145;
    }

    var yRuler = 15;
    drawLine('170', yRuler, 1090+150, yRuler, paper, '#000', 1);
    //drawLine('25', yRuler, 1090, yRuler, paper, '#000', 1);

    for (var i = 0; i < chmName.length; i++) {
        drawLine(xt[i], yRuler, xt[i], 5, paper, '#000', 1);
        var txt = paper.text(m[i], 10, chmName[i]);
        txt.click(function() {
            //alert(this.attr('text-anchor'));
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
        //console.log('text ', m[i], 10, chmName[i]);
    }

    drawLine(1090+150, yRuler, 1090+150, 5, paper, '#000', 1);

    function drawLine(x1, y1, x2, y2, p, cl, width) {
        width=1;
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
    var category =  {
        "id":"0",
        "name":"Time since diagnosis",
        "level":"0",
        "data": [
            {
                "name": "Specimen",
                "id":"1",
                "pid":"0",
                "level": "1",
                "show":"1",
                "data": [
                    {"name": "Tissue","level": "2", "id":"2", "pid":"1","show":"1",},
                    {"name": "BRC","level": "2", "id":"3", "pid":"1","show":"1",}
                ]
            }
            ,
            {
                "name": "Sugery",
                "id":"4",
                "pid":"0",
                "level": "1",
                "show":"1",
            },
            {
                "name": "Imaging",
                "level": "1",
                "id":"5",
                "pid":"0",
                "show":"1",
            },
            {
                "name": "Lab_test",
                "level": "1",
                "id":"6",
                "pid":"0",
                "show":"1",
                "data": [
                    {"name": "CEA", "level": "2", "id":"7", "pid":"6","show":"1",},
                    {"name": "IHC", "level": "2", "id":"8", "pid":"6","show":"1",},
                    {"name": "MSI", "level": "2", "id":"9", "pid":"6","show":"1",}
                ]
            }
            ,
            {
                "name": "Treatment",
                "id":"10",
                "pid":"0",
                "level": "1",
                "show":"1",
                "data":
                    {
                        "name": "Chemonotherapy",
                        "id":"11",
                        "pid":"10",
                        "level": "2",
                        "show":"1",
                        "data":
                            [
                                {"name": "bevacizumab [100mg]", "level": "3", "id":"12", "pid":"11","show":"1",},
                                {"name": "5-fluorouracil [1000mg]", "level": "3", "id":"13", "pid":"11","show":"1",}
                            ]
                    }
            }
        ]
    };

    function cat(cate) {
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
                var leafnode = _.find(leaf, function (o) {
                    return o.name == v;
                });
                item.leaf = (leafnode != null)
            }
            if (k == 'show') item.show = v;
            if (k == 'level') {/*console.log('level ==> ', d);*/
                item.level = v;
                dig.push(item);
            }
            if (k == 'data' || _.isNumber(k)) cat(v);
        });
    }
    cat(category);
    dig =  _.filter(dig, function(o) { return (o.name!=null && o.name!=='Time since diagnosis'); });
    console.log('dig ', dig);

    function getHolderIndex() {
        var positionIndex = [];
        for (var i = 0; i < chmName.length; i++) {
            positionIndex.push(i);
        }
        return positionIndex;
    }
    // for(var k=0;k<pixelMap.length;k++) {
    //     //plotMuts(paper, sel, chmInfo, rowIndex, _trackData, 'AdCC10T');
    //     plotMuts(paper, pixelMap[k], k);
    // }

    function fyRow(row) {
        return 2*5+10+row*(20+5);
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

    var pixelMap = [{
            "name": "tissue",
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
            {"name": "brc",
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



    //var label = ['ABC','DEF'];
    console.log(' dig ', dig);
    var label = "Time since diagnosis";
    var t = paper.text(55, 10,label).attr({'text-anchor': 'center', 'fill':'black', "font-size": 12});

    plotdrawing(dig);

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
        // var len = temp.length;
        // var seed="";
        // for(var i=0;i<len;i++){
        //     if(i==len-1)seed+="1";
        //     else seed+="0"
        // }
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
        //if(idx>9){position = holder[idx-(l.length-(l.length-1))];}
        console.log('position value ', position);
        console.log(' the horzantal position is ', xt[position]);
        var addup = Number(l)*getAddRatio(track[position]);
        console.log( ' addup ', addup);

        //var targetPosition = (xt[position] + (Number(l)/ratio * (ratio/10) ) );
        var targetPosition = xt[position] + addup;
        if(idx===0)targetPosition+=25;
        console.log(' target position ' , targetPosition);
        //console.log(' track is ', track[position-1]);
        return targetPosition;
    }

    function getPixelMap(pixel, item) {
        console.log('item ', item);
        var spot = [];
        for(var i=0;i<pixel.length;i++) {
            var pitem = _.map(pixel[i], function (value, key) {
                console.log(' key ', key);
                console.log('value ', value);
                if(key=='name' && value==item){
                    find = true;
                    console.log('find ');
                    spot.push(pixel[i].data);
                }
                // if(find && key=='data'){
                //     console.log('find value' , value);
                //     spot.push(value);
                // }
            });
        }
        return spot;
    }

    function plotMuts(p, row, label) {

        console.log(' plotMuts called====> ', label.pid, ' ', label.name);
        // var r = p.rect(110-22, 26, 3, 10);
        // r.attr("fill","#0f0");
        // r.attr("stroke", "#0f0");
        // r.attr("stroke-width", 1);
        // r.attr("opacity", 0.5);
        // r.translate(0.5, 0.5);
        //    return ;
        //console.log('call plotMuts ');
        var maxCount = 5; // set max height to 5 mutations
        var yRow = fyRow(row)   +20;
        //var rowindex = 0;
        if(label.leaf==true){
            var pixeldataV = getPixelMap(pixelMap,label.name.toLowerCase()) || [];
            console.log('pixeldata length =>', pixeldataV);
            _.map(pixeldataV,function(pixeldata,k){
                console.log('k ', k, 'v ', pixeldata.length);
                var idx = 0;
                //var pary=[];
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
                            //r.animate({'scale': [1.25, 1.25]}, 750, 'easeOutCubic', callback);
                            this.transform('S1.5,1.5');
                        }, function () {
                            this.transform('s1,1');
                        }
                    );
                    addToolTip(r.node, pixeldata[i].name.join("</br>"), 100, '');
                    /*r.mouseout(function(){
                        //r.animate({'scale': [1.25, 1.25]}, 750, 'easeOutCubic', callback);
                        this.transform('s-1.5,-1.5');
                    });*/
                    /* var r = p.circle(position, yRow-h, 5);
                    r.attr("fill", "#000");
                    r.attr("stroke", "#fff");
                    $(r.node).fadeIn(2000);*/
                    //console.log(r.node, arr.join("</br>"));
                    //addToolTip(r.node, arr.join("</br>"), 100, '');
                    ++idx;
                    PAPERNODE.push(r);
                }
            });
        }
        var deep = label.level;
        var lbl = label.name;
        //console.log(' LAVEL DEEP ==> ', Number(deep));
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
        /*if(BOTTOMLINE)BOTTOMLINE.remove();
        BOTTOMLINE = drawLine('1', LASTYPOS, 1090+150, LASTYPOS, paper, '#ccc', 1);*/
        //paper.setSize(1090+150, LASTYPOS+5);
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

    var scale = 1;
    $('#zoomin').click(function() {
        scale *= 1.2
        paper.canvas.setAttribute("transform", "scale("+scale+")")
        var w = $('svg').attr('width');
        w*=scale;
        $('svg').css('width',w);
        LASTYPOS*=scale;
    });

    $('#zoomout').click(function() {
        scale *= 0.8
        paper.canvas.setAttribute("transform", "scale("+scale+")")
        var w = $('svg').attr('width');
        w*=scale;
        $('svg').css('width',w);
        LASTYPOS*=scale;
    });

    $('#xgrid').click(function() {
        var val = $(this).val();
        var show=true;
        if(val==='Grid on'){$(this).val('Grid off');show=true;}
        if(val==='Grid off'){$(this).val('Grid on');show=false;}
        for(var i=0;i<XGRIDS.length;i++){
            //console.log(XGRIDS[i]);
            if(show)XGRIDS[i].show();
            if(!show)XGRIDS[i].hide();
        }
    });
    $('#xgrid').trigger('click');

});
