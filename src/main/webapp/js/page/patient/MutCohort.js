/*
      Author 오세영
     */
var renderMutCohort = function(data, obj) {
    var totalCount = data.length;
    var numberOfSampleWithGeneWithkeyword = 0;
    var numberOfSampleWithGeneWithGene = 0;
    for (var i = 0; i < data.length; i++) {
        var sampleWithGeneWithkeyword = data[i].geneNm + data[i].hgvspVal + data[i].geneVariClsfNm;
        var sampleWithGene = data[i].geneNm;
        var keyword = obj.geneNm + obj.hgvspVal + obj.geneVariClsfNm;
        var gene = obj.geneNm;
        if (gene == sampleWithGene) {
          ++numberOfSampleWithGeneWithGene;
        }
        if (keyword == sampleWithGeneWithkeyword) {
            ++numberOfSampleWithGeneWithkeyword;
        }
    }
    var counts = [numberOfSampleWithGeneWithGene,numberOfSampleWithGeneWithkeyword];

    // console.log('counts', counts);

    var frequencyBar = new FrequencyBar();
    return frequencyBar.init(counts, totalCount);
}