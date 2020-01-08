/*
      Author 오세영
     */
function renderCnaCohort(data, obj){
    var colors = obj.hgvscVal=='AMPLIFICATION' ? ["red"] : ["blue"];
    // var totalCount = data.length;
    var totalCount = parseInt(document.pform.patients.value.length);
    var numberOfSampleWithGeneWithGene = 0;
    for (var i = 0; i < data.length; i++) {
        var sampleWithGene = data[i].geneNm + data[i].hgvspVal;
        var gene = obj.geneNm + obj.hgvspVal;
        if (gene == sampleWithGene) {
            ++numberOfSampleWithGeneWithGene;
        }
    }
    var counts = [numberOfSampleWithGeneWithGene];

    // console.log('counts', counts);

    var frequencyBar = new FrequencyBar();
    return frequencyBar.init(counts, totalCount, colors);
}