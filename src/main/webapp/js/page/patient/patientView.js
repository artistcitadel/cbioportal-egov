var action;
var util;
var PATIENTID="6905950076";

$(document).ready(function () {
  action = new Action();
  util = new Util();
  paper = Raphael("genomicOverviewTracksContainer", paperWidth, paperHeight);
  paper.scale({ zoom: true});

  var ds_cond = {};
  ds_cond.data = {"qid":"selectLabTestHrc","patientId":PATIENTID};
  ds_cond.callback = setClassifyHrc;
 action.selectList(ds_cond);

  function setClassifyHrc(json){
      if(json.result.length>0){
          HRC = json.result;
          //console.log("HRC ", HRC);
          var ds_cond = {};
          ds_cond.data = {"qid":"selectLabTest","patientId":PATIENTID};
          ds_cond.callback = disposer;
          action.selectList(ds_cond);
      }
  }

    var scale = 1;
    var overview = $('#genomicOverviewTracksContainer').children(1);
    //alert(paperWidth);
    zcnt=1;
    var w = overview.attr('width');
    $('#zoomin').click(function() {
        scale = zcnt*1.2;
        //paper.canvas.setAttribute("transform", "scale("+scale+")")
        w*=scale;
        overview.css('width',w);
        LASTYPOS*=scale;

        removeLine();
        clearPaperPlotNode();
        paperWidth *= scale;
        setTimeLine('R', dig);
        //alert(paperWidth);
        ++zcnt;
    });

    $('#zoomout').click(function() {
        if(zcnt===1)return;
        scale=1.2*(zcnt-1);
        //paper.canvas.setAttribute("transform", "scale("+scale+")")
        w/=scale;
        //alert(w);
        overview.css('width',w);
        LASTYPOS/=scale;

        removeLine();
        clearPaperPlotNode();
        paperWidth /= scale;
        //alert(paperWidth);
        setTimeLine('R', dig);
        --zcnt;
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

    // $( "[id^='txt']" ).click(function(){
    // });
});
