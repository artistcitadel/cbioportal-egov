function ThumbnailExpandVAFPlot(){
    var self = this;
    self.init = function(mutObj){
        computeMutationFrequencyBySample(mutObj);
    }
    var computeMutationFrequencyBySample = function(mergedMutations) {
        var MutationFrequenciesBySample = {};
        var sampleId;
        var freq;
        for(var i=0;i< mergedMutations.length;i++) {
            mutation = mergedMutations[i];
            //console.log("ThumbnailExpandVAFPlot computeMutationFrequencyBySample", mutation);
            var tumorRefCount = mutation.refAlleleReadCnt;
            var tumorAltCount = mutation.hgvspVal;
        }
          /*if (mutation.tumorAltCount >= 0 && mutation.tumorRefCount >= 0) {
              sampleId = mutation.sampleId;
              freq = mutation.tumorAltCount / (mutation.tumorRefCount + mutation.tumorAltCount);
              ret[sampleId] = ret[sampleId] || [];
              ret[sampleId].push(freq);
             }
        }
        for (const sampleId of Object.keys(this.props.sampleOrder)) {
            ret[sampleId] = ret[sampleId] || [];
            const shouldAdd = mergedMutations.length - ret[sampleId].length;
            for (let i=0; i<shouldAdd; i++) {
                ret[sampleId].push(NaN);
            }
        }
        return ret;*/
    }
}