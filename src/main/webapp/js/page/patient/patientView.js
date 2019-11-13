var action;
var util;
$(document).ready(function () {
  paper = Raphael("genomicOverviewTracksContainer", paperWidth, paperHeight);
  paper.scale({ zoom: true});

  action = new Action();
  util = new Util();
  var ds_cond = {};
  ds_cond.data = {"qid":"selectDigClssify","patientId":"6128737361" };
  ds_cond.callback = disposer;
  action.selectList(ds_cond);

    var scale = 1;
    var overview = $('#genomicOverviewTracksContainer').children(1);
    $('#zoomin').click(function() {
        scale *= 1.2
        paper.canvas.setAttribute("transform", "scale("+scale+")")
        var w = overview.attr('width');
        w*=scale;
        overview.css('width',w);
        LASTYPOS*=scale;
    });

    $('#zoomout').click(function() {
        scale *= 0.8
        paper.canvas.setAttribute("transform", "scale("+scale+")")
        var w = overview.attr('width');
        w*=scale;
        overview.css('width',w);
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
