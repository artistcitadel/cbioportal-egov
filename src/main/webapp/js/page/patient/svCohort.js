/*
      Author 오세영
     */
var renderSvCohort = function(data, obj) {
    // var totalCount = data.length;
    var totalCount = parseInt(document.pform.patients.value.length);
    var numberOfSampleWithGeneWithkeyword = 0;
    var numberOfSampleWithGeneWithGene = 0;
    for (var i = 0; i < data.length; i++) {
        var sampleWithGeneWithkeyword = data[i].geneNm1;
        var sampleWithGene = data[i].geneNm;
        var keyword = obj.geneNm1;
        var gene = obj.geneNm;
        if (gene == sampleWithGene) {
            ++numberOfSampleWithGeneWithGene;
        }
        if (keyword == sampleWithGeneWithkeyword) {
            ++numberOfSampleWithGeneWithkeyword;
        }
    }
    var counts = [numberOfSampleWithGeneWithGene,numberOfSampleWithGeneWithkeyword];

    console.log('counts', counts);

    var frequencyBar = new FrequencyBar();
    return frequencyBar.init(counts, totalCount);
}