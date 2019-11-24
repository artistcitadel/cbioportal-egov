var action;
var util;
//var PATIENTID="6905950076";
var overview;
var zcnt=0;

$(document).ready(function () {
  setWindowSize();
  $("#ifr").css('height',size.height);

  action = new Action();
  util = new Util();
  util.showLoader();
  paper = Raphael("genomicOverviewTracksContainer", paperWidth, paperHeight);
  paper.scale({ zoom: true});

  var label = "Time since diagnosis";
  var t = paper.text(55, 10, label).attr({'text-anchor': 'center', 'fill': 'black', "font-size": 12});

  var ds_cond = {};
  ds_cond.data = {"queryId":"selectLabTestHrc","patientId":PATIENTID};
  ds_cond.callback = setClassifyHrc;
 action.selectList(ds_cond);

  function setClassifyHrc(json){
      //console.log(json);
      //if(json.result.length>0){
      if(json.length>0){
          //HRC_LAB = json.result;
          HRC_LAB = json;
          console.log("HRC_LAB ", HRC_LAB);
          var ds_cond = {};
          ds_cond.data = {"queryId":"selectLabTest","patientId":PATIENTID};
          ds_cond.callback = disposer;
          action.selectList(ds_cond);
      }
  }

    var scale = 1;
    var TFORM=1.5;
    overview = $('#genomicOverviewTracksContainer').children(1);
    //alert(paperWidth);
    //zcnt=0;
    var w = overview.attr('width');

    $('#zoomin').click(function() {
        $("#swave").show();

         _.delay(function() {


        //scale = zcnt*1.2;
        scale = (TFORM * (zcnt + 1));
        //paper.canvas.setAttribute("transform", "scale("+scale+")")
        w *= TFORM;
        //w = paperWidth * scale;
        overview.css('width', w);
        LASTYPOS *= scale;

        ++zcnt;

        removeLine();
        clearPaperPlotNode();
        //paperWidth *= scale;
        paperWidth = w;
        XSCALE = scale;
       setTimeLine('R', dig);
         }, 1000);
        //alert(paperWidth);

        //alert(w);
    });

    $('#zoomout').click(function() {
        if(zcnt===0)return;
        $("#swave").show();
        _.delay(function() {

        scale=(1*zcnt)+(0.5*zcnt);
        //paper.canvas.setAttribute("transform", "scale("+scale+")")
        //scale=1.2;
        //alert(scale);
        w/=TFORM;
        //alert(w);
        overview.css('width',w);
        LASTYPOS/=scale;

        --zcnt;
        XSCALE = scale;
        removeLine();
        clearPaperPlotNode();
        //paperWidth /= scale;
        paperWidth =w;
        //alert(paperWidth);
        setTimeLine('R', dig);

        }, 1000);
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

    $("#reset").click(function(){
        if(INITUNIT==null || INITUNIT===UNIT)return;
        $("#swave").show();
        _.delay(function() {

        MODE='N';
        removeLine();
        clearPaperPlotNode();
        setTimeLine('C', RAW);

        }, 1000);

    });
     /*$('svg').on("click", "[id^='text_']", function(){
         console.log(this.id);
     });*/
});
