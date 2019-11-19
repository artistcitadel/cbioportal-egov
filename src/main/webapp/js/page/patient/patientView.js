var action;
var util;
//var PATIENTID="6905950076";
var overview;
var zcnt=0;

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
      //console.log(json);
      if(json.result.length>0){
          HRC_LAB = json.result;
          console.log("HRC_LAB ", HRC_LAB);
          var ds_cond = {};
          ds_cond.data = {"qid":"selectLabTest","patientId":PATIENTID};
          ds_cond.callback = disposer;
          action.selectList(ds_cond);
      }
  }

    var scale = 1;
    overview = $('#genomicOverviewTracksContainer').children(1);
    //alert(paperWidth);
    //zcnt=0;
    var w = overview.attr('width');
    $('#zoomin').click(function() {
        //scale = zcnt*1.2;
        scale = (1.1*(zcnt+1));
        //paper.canvas.setAttribute("transform", "scale("+scale+")")
        w*=1.1;
        //w = paperWidth * scale;
        overview.css('width',w);
        LASTYPOS*=scale;

        ++zcnt;
        removeLine();
        clearPaperPlotNode();
        //paperWidth *= scale;
        paperWidth = w;
        XSCALE = scale;
        setTimeLine('R', dig);
        //alert(paperWidth);

        //alert(w);
    });

    $('#zoomout').click(function() {
        if(zcnt===0)return;

        scale=(1*zcnt)+(0.1*zcnt);
        //paper.canvas.setAttribute("transform", "scale("+scale+")")
        //scale=1.2;
        //alert(scale);
        w/=1.1;
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
        MODE='N';
        removeLine();
        clearPaperPlotNode();
        setTimeLine('C', RAW);
    })
     /*$('svg').on("click", "[id^='text_']", function(){
         console.log(this.id);
     });*/
});
