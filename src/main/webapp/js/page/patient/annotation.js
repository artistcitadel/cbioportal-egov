function Annotation() {
    var self = this;
    var action;
    var util;
    var ENTRY=[];

    self.init = function (geans,callback) {
        action = new Action();
        util = new Util();
        self.geans = geans;
        self.callback = callback;
        var ds_cond = {};
        ds_cond.queryId = "/utils/cancerGeneList";
        ds_cond.callback = setcancerGean;
        action.cancerGeanList(ds_cond);
    }

    var setcancerGean = function (json) {
        console.log("annoataion entryzeanId ", json);
        console.log("self.geans ", self.geans);
        for(var i=0;i<self.geans.length;i++) {
            var idx = _.findIndex(json, function (v) {
                return v.hugoSymbol === self.geans[i].geneNm;
            });
            if(idx!==-1){
                var item = {};
                item.entrezGeneId = json[idx].entrezGeneId;
                item.hugoSymbol = json[idx].hugoSymbol;
                item.oncogene = json[idx].oncogene;
                item.oncokbAnnotated = json[idx].oncokbAnnotated;
                item.tumorType = self.geans[i].tumorNm;
                item.mutationType = self.geans[i].mutationType;
                item.alteration = self.geans[i].hgvspVal;
                item.proteinStart = self.geans[i].geneVariStLocVal;
                item.proteinEnd = self.geans[i].geneVariEndLocVal;
                //item.alterationType = '';
                ENTRY.push(item);
            }
        }

       console.log('find entryzeanid is ', ENTRY);
        search(ENTRY);
    }

    var search = function (ENTRY) {
        for(var i=0;i<ENTRY.length;i++){
          /*ENTRY[i].entrezGeneId;
          ENTRY[i].tumorType;
          ENTRY[i].alteration;
          ENTRY[i].mutationType;
          ENTRY[i].proteinPosStart;
          ENTRY[i].proteinPosEnd;
          ENTRY[i].alterationType;*/

        }
        var query1 = util.generateQueryVariant(ENTRY[0]);
        var ds_cond = {};
        ds_cond.query = {};
        ds_cond.query = query1;
        ds_cond.callback = setIndicator;
        action.getCancerGeanAnnotation(ds_cond);
    }
    setIndicator = function (json) {
        console.log('indicator post', json);
    }

}
