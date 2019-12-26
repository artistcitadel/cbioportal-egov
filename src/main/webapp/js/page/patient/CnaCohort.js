function CnaCohort(){
    var self = this;
    self.init = function(data){
      var colors = data.hgvscVal=='AMPLIFICATION' ? ["red"] : ["blue"];
      var freq = new FrequencyBar();
      freq.init(counts, colors, totalCount);
    }


}