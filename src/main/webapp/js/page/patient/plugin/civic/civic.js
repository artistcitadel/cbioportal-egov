function Civic(){
    var self = this;
    var action;
    var util;

    self.init = function (callback,entrez_id) {
        console.log('ids is ', entrez_id);
        action = new Action();
        util = new Util();
        self.callback = callback;
        var ds_cond = {};
        ds_cond.ids = entrez_id;
        ds_cond.callback = setCivic;
        action.getCivic(ds_cond);
    }

    var setCivic = function(json){
         console.log('civic ', json);
        self.callback(json);
    }

    self.buildToolbox = function(record, id, varient) {
      var id = record.id;
      var name = record.name;
      var description = record.description;
      var url = record.url; //'https://civicdb.org/#/events/genes/'+ record.id + '/summary';
      var variants = varient;
      console.log('variants is ', variants);
      var vastr = '';
      var vaname;
      var vaurl;
      _.map(variants, function(v, k){
         if(k=='name')vaname = v;
         if(k=='url')vaurl = v;
     });
    _.map(variants.evidence, function(v,k){
        vastr += k+ ":" + v;
    });

      var txt = '';
      txt +='<div class="civic-card">\n' +
          '  <span>\n' +
          '    <div class="col s12 tip-header">CIViC Variants</div>\n' +
          '    <div class="col s12 civic-card-content">\n' +
          '      <div class="col s12 civic-card-gene">\n' +
          '        <p><span class="civic-card-gene-name"><a href="'+url+'" target="_blank"><b>'+name+'</b></a></span>' +
          '   - '+description+'</p>\n' +
          '    </div>\n' +
          '    <div class="col s12">\n' +
          '        <ul>\n';
         if(!_.isUndefined(variants)) {
             txt += '    <div class="civic-card-variant">\n' +
                 '          <div class="civic-card-variant-header"><span class="civic-card-variant-name">' +
                 '          <a href="' + variants.url + '" target="_blank">' + variants.name + '</a></span>' +
                 '          <span class="civic-card-variant-entry-types"> Entries: ' + vastr + '</span></div>\n' +
                 //'          <span class="civic-card-variant-entry-types"> Entries: prognostic: 1.</span></div>\n' +
                 '          <div class="civic-card-variant-description summary"></div>\n' +
                 '        </div>\n';
         }
          // txt+=generateVariants(variants);
          txt+='        </ul>\n' +
          '    </div>\n' +
          '    <div class="item disclaimer"><span>Disclaimer: This resource is intended for purely research purposes. It should not be used for emergencies or medical or professional advice.</span></div>\n' +
          '</div>\n' +
          '</span>\n' +
          '    <div class="item footer">\n' +
          '        <a href="https://civicdb.org/#/events/genes/14/summary" target="_blank"><img src="https://frontend.cbioportal.org/reactapp/images/71fb7f0a5b1cf694468e7ba7e69bd939.png" class="civic-logo" alt="CIViC"></a>\n' +
          '    </div>\n' +
          '</div>';

      return txt;
    }

}