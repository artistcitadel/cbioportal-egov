<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<section class="content-header">
    <h1>
        RAPHAEL VIEW
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
        <li class="active">RAPHAEL VIEW</li>
    </ol>
</section>
<p style="bottom-margin:125px;"></p>
<p style="bottom-margin:125px;"></p>
<section class="contents" >
    <div class="container-fluid" >
        <div id="genomicOverviewTracksContainer" width="1120px" height="45px" style="overflow-x: auto;"/>
    </div>

</section>
<script>
    $(document).ready(function () {

        var paper = Raphael("genomicOverviewTracksContainer", 1120, 445);
        //var t = paper.text(151, 20, "Raphaël\nkicks\nbutt!");

        var chmName = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'
        ];
        var xt = [25, 110, 193, 261, 326, 388, 447, 501, 552, 600, 646, 693, 738, 778, 815, 850, 881, 908, 935, 955, 977, 993, 1011,1064];
        var m  = [67, 151, 227, 294, 357, 418, 474, 526, 572, 623, 669, 715, 758, 796, 832, 865, 894, 922, 945, 966, 985, 1002, 1038, 1074];

        var yRuler = 15;

        drawLine('25', yRuler, 1090, yRuler, paper, '#000', 1);

        for (var i = 0; i < chmName.length; i++) {
            drawLine(xt[i], yRuler, xt[i], 5, paper, '#000', 1);
            paper.text(m[i], 10, chmName[i]);
            //console.log('text ', m[i], 10, chmName[i]);
        }

        drawLine(1090, yRuler, 1090, 5, paper, '#000', 1);

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


      // for(var k=0;k<pixelMap.length;k++) {
      //     //plotMuts(paper, sel, chmInfo, rowIndex, _trackData, 'AdCC10T');
      //     plotMuts(paper, pixelMap[k], k);
      // }

      function fyRow(row) {
        return 2*5+10+row*(20+5);
      }

        var pixelMap = [[],[]];
        pixelMap[0][78] = ["SLC27A3: G111D"];
        //pixelMap[0][123] = ["ZFP36L2: C174Sfs*302"];
        //pixelMap[0][249] = ["SI: V109I"];
         pixelMap[0][519] = ["PRKDC: X133_splice"];
        //pixelMap[0][708] = ["KMT2D: V5208Wfs*35"];
        //pixelMap[0][711] = ["KRT85: G85R"];
        pixelMap[0][1056] = ["ENOX2: H250Q"];
/*
        pixelMap[1][18] = ["SLC27A3: G111D"];
        pixelMap[1][183] = ["ZFP36L2: C174Sfs*302"];
        pixelMap[1][289] = ["SI: V109I"];
        pixelMap[1][569] = ["PRKDC: X133_splice"];
        pixelMap[1][768] = ["KMT2D: V5208Wfs*35"];
        pixelMap[1][761] = ["KRT85: G85R"];
        pixelMap[1][1096] = ["ENOX2: H250Q"];*/


         for(var i=0;i<pixelMap.length;i++) {
            plotMuts(paper, pixelMap[i], i);
        }

       function getZeroBase(seed){
             console.log(seed);
             var f = seed.substring(0,1);
             var l = seed.substring(1);
             //console.log( ' l ', l);
             var z='';
             for(var i=0;i<l.length;i++){
                 z+='0';
             }
             var t = f+z;
             console.log('zero base ', t);
             var idx = 0;
             if(Number(t)<100)idx = 1;
             if(Number(t)>=100 && Number(t)<1000) idx = f;
             if(Number(t)>=1000 && Number(t)<10000) idx = f+'0';
             console.log( 'getZeroBase ', idx);
             return idx;
       }
      function getIdx(pos){
        return xt[pos];
      }

      function plotMuts(p,pixelMap, row) {
          var r = p.rect(110-22, 26, 3, 10);
          r.attr("fill","#0f0");
          r.attr("stroke", "#0f0");
          r.attr("stroke-width", 1);
          r.attr("opacity", 0.5);
          r.translate(0.5, 0.5);

             return ;
          //console.log('call plotMuts ');
          var maxCount = 5; // set max height to 5 mutations
          var yRow = fyRow(row)   +20;
          var idx = 0;
          $.each(pixelMap, function(i, arr) {
               if (arr) {
                  var position =  getZeroBase(i.toString());
                   //var pixil = i;
                   var pixil = getIdx(position-1);
                   console.log( ' mpo ', i , ' ', pixil);
                   if(pixil <= 25 && idx===0)pixil=25+(25-pixil);
                  console.log('pixil ', pixil);
                  var h = arr.length>maxCount ? 20 : (20*arr.length/maxCount);
                  console.log(yRow-h);
                   pixil = 150;
                  var r = p.rect(pixil, yRow-h, 3, h);
                  r.attr("fill","#0f0");
                  r.attr("stroke", "#0f0");
                  r.attr("stroke-width", 1);
                  r.attr("opacity", 0.5);
                  r.translate(0.5, 0.5);
                    //console.log(r.node, arr.join("</br>"));
                    //addToolTip(r.node, arr.join("</br>"), 100, '');
                   ++idx;
              }
          });

        //var label = "MUT"+row;
        //var t = p.text(12,yRow-20/2-(row+8),label).attr({'text-anchor': 'center', 'fill':'black'});
       }



 //--wheel zoom
    //var paper         = Raphael('paper');
    //paper.setViewBox(0,0,paper.width,paper.height);
    //var c             = paper.rect(0,0,150,150).attr({'fill':'#ff0000'});
    //c.translate((paper.width / 2) - (c.attr('width') / 2), (paper.height / 2) - (c.attr('height') / 2));
    var viewBoxWidth  = paper.width;
    var viewBoxHeight = paper.height;
    //var canvasID      = "#paper";
    //var startX,startY;
    //var mousedown     = false;
    //var dX,dY;
    var oX            = 0, oY = 0, oWidth = viewBoxWidth, oHeight = viewBoxHeight;
    var viewBox       = paper.setViewBox(oX, oY, viewBoxWidth, viewBoxHeight);
    viewBox.X         = oX;
    viewBox.Y         = oY;
    //var vB            = paper.rect(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight);
    //vB.attr({stroke: "#009", "stroke-width": 5});
    /** This is high-level function.
     * It must react to delta being more/less than zero.
     */
    function handle(delta) {
        vBHo = viewBoxHeight;
        vBWo = viewBoxWidth;
        if(delta < 0){
            viewBoxWidth  *= 0.95;
            viewBoxHeight *= 0.95;
            paper.setSize(viewBoxWidth, viewBoxHeight);
            //$(paper.canvas).css({left: $(this).position().left+3.5});
        }else{
            viewBoxWidth  *= 1.05;
            viewBoxHeight *= 1.05;
            paper.setSize(2.0*viewBoxWidth, 2.0*viewBoxHeight);
            //$(paper.canvas).css({left: $(this).position().left-3.5});
            //paper.set().animate().translate((paper.width / 2) , 0);
        }
        viewBox.X -= (viewBoxWidth - vBWo) / 2;
        viewBox.Y -= (viewBoxHeight - vBHo) / 2;

        paper.setViewBox(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight,true);
    }

   /* function wheel(event){
        var delta = 0;
        if(!event){ /!* For IE. *!/
            event = window.event;
        }
        if(event.wheelDelta){ /!* IE/Opera. *!/
            delta = event.wheelDelta/120;
        } else if (event.detail) { /!** Mozilla case. *!/
            delta = -event.detail/3;
        }
        if(delta){
            handle(delta);
        }
        if(event.preventDefault){
            event.preventDefault();
        }
        event.returnValue = false;
    }

    if (window.addEventListener)
        /!** DOMMouseScroll is for mozilla. *!/
        window.addEventListener('DOMMouseScroll', wheel, false);
    /!** IE/Opera. *!/
    window.onmousewheel = document.onmousewheel = wheel;*/

    });

</script>
