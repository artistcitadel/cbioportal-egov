var action;
var util;
$(document).ready(function () {
  paper = Raphael("genomicOverviewTracksContainer", paperWidth, paperHeight);
  paper.scale({ zoom: true});

  action = new Action();
  util = new Util();
  var ds_cond = {};
  ds_cond.data = {"patientId":"6128737361" };
  ds_cond.callback = disposer;
  action.getPatientView(ds_cond);

});

