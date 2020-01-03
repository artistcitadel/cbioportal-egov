function ThumbnailExpandVAFPlot() {
    var self = this;
    self.init = function (samples, mutObj) {
        computeMutationFrequencyBySample(samples, mutObj);
    }

    var computeMutationFrequencyBySample = function (samples, mergedMutations) {
        var MutationFrequenciesBySample = {};
        var sampleId;
        var freq;
        var ret = {};
        var colors = {};
        var labels = {};
        _.forEach(samples, function(value) {
            console.log('sample value', value);
            var temp=[];
            for (var i = 0; i < mergedMutations.length; i++) {
                mutation = mergedMutations[i];
                // console.log("ThumbnailExpandVAFPlot computeMutationFrequencyBySample", mutation);
                var tumorSeq = $.trim(mutation.geneExamSpcnSeq);   // tumoreseq
                var tumorRefCount = parseInt(mutation.refAlleleReadCnt);   // tumorRefCount
                var tumorAltCount = parseInt(mutation.variAlleleReadCnt);  // tumorAltCount
                var seq = $.trim(value);

                if (tumorSeq.indexOf(seq) !=-1 && tumorAltCount >= 0 && tumorRefCount >= 0) {
                    freq = tumorAltCount / (tumorRefCount + tumorAltCount);
                    temp.push(freq);
                }
            }
            ret[PATIENTID+"_"+value] = temp;
            colors[PATIENTID+"_"+value] = '#000';
            labels[PATIENTID+"_"+value] = PATIENTID+"_"+value;
        });
        console.log('computeMutationFrequencyBySample', ret);
       // return ret;
        var props = {};
        props.colors = colors;
        props.data = ret;
        props.labels = labels;
        var vAFPlot = new VAFPlot();
        vAFPlot.init(props);
    }
}