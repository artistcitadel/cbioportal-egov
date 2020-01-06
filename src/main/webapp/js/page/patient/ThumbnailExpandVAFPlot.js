function ThumbnailExpandVAFPlot() {
    var self = this;
    var LOADTOOLTIP=false;
    var LEAVETOOLTIP=true;
    self.init = function (samples, mutObj) {
        self.samples=samples;
        self.mutObj = mutObj;
        computeMutationFrequencyBySample(samples, mutObj,false);
        //var x = $("#vafplot").position().top-400;
       /*var x = $("#vafplot").position().left-500;
       $('.tooltip-content').offset({left: x});*/
        //computeMutationFrequencyBySample(samples, mutObj,true);

        $("#vafplot").mouseover(function (e) {
            if(LOADTOOLTIP)return;
            //loadVAFPlot();
            setTimeout(function() {
                // showVAFPlot();
                loadVAFPlot();
            }, 1000);

            /*$('#genomicOverviewTracksContainer1').find('svg').attr('z-index',0);
            loadVAFPlot();*/
            // $('.tooltip-content').find('svg').remove();
            // $('.tooltip-content').empty();
            // computeMutationFrequencyBySample(self.samples, self.mutObj,true);
            // $('.tooltip-content').show();

        });
        // showVAFPlot();
        $("#vafplot").find('svg').mouseleave(function (e) {
            setTimeout(function() {
                if(!LEAVETOOLTIP)return;
                $('.tooltip-content').hide();
                LOADTOOLTIP=false;
            }, 2000);

        });
        $('.tooltip-content').on('mouseleave', 'div#miniature',function (e) {
            LEAVETOOLTIP=true;
            setTimeout(function() {
                $('.tooltip-content').hide();
                LOADTOOLTIP=false;
            }, 2000);
        });

        $('.tooltip-content').on('mouseover', 'div#miniature',function (e) {
            LEAVETOOLTIP=false;
        });
    }

    var showVAFPlot = function(){
        $('#vafplot1').find('svg').remove();
        $('#vafplot1').empty();

        $('.tooltip-content').show();
        var x = $("#vafplot").position().left-540;
        $('.tooltip-content').offset({left: x});
        computeMutationFrequencyBySample(self.samples, self.mutObj,true);
        /*$('#vafplot1').find('svg').remove();
        $('#vafplot1').empty();

        $('.tooltip-content').show();
        var x = $("#vafplot").position().left-540;
        $('.tooltip-content').offset({left: x});

        var tooltipInstance;
        //$("#grch137").on('mouseover', '#vafplot:not(.tooltipstered)', function(){
            //tooltipInstance = $(this).tooltipster({
        $("#vafplot").mouseover(function (e) {
            tooltipInstance= $('.tooltip-content').tooltipster({
                trigger: 'hover',
                delay: 3000,
                contentAsHTML: true,
                maxWidth: 200,
                position: 'right',
                speed: 150,
                arrow:false,
                // multiple: true,
                positionTracker:true,
                onlyOne: true,
                trigger:'hover',
                // offsetX:x,
                side: 'left',
                content : computeMutationFrequencyBySample(self.samples, self.mutObj,true),
                // offsetY:-80,
                //theme: '.onlyforcategory',
            });
            tooltipInstance.tooltipster('open');
        });*/
    }

    var loadVAFPlot = function(){
        if(LOADTOOLTIP)return;
        //LEAVETOOLTIP=false;
        LOADTOOLTIP=true;
        $('.tooltip-content').find('svg').remove();
        $('.tooltip-content').empty();

        $('.tooltip-content').show();
        var x = $("#vafplot").position().left-540;
        $('.tooltip-content').offset({left: x});

        $('.tooltip-content').tooltipster({
            trigger: 'hover',
            // delay: 3000,
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
            arrow: true,
            //speed: 150,
            side: 'left',
            // offsetX:x,
            //content:'abc',
            content : computeMutationFrequencyBySample(self.samples, self.mutObj,true),
            /*functionReady: function(){
                $('.tooltip-content').mouseleave(function(){
                    alert('');
                    LEAVETOOLTIP=true;
                });
            },*/
            //content :'abc',
            /*trigger: 'custom',
            triggerOpen: {
                click: true,
                hover:false
            },
            triggerClose: {
                click: true,

            }*/


        });
         // $('#vafplot1').tooltipster('open');
    }
    var computeMutationFrequencyBySample = function (samples, mergedMutations, isTooltip) {
        var MutationFrequenciesBySample = {};
        var sampleId;
        var freq;
        var ret = {};
        var colors = {};
        var labels = {};
        var orders = {};
        var count=0;
        var max=0;
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
            if(max<temp.length)max=temp.length;
            ret[PATIENTID+"_"+value] = temp;
            colors[PATIENTID+"_"+value] = SAMPLE_COLOR[count];
            labels[PATIENTID+"_"+value] = PATIENTID+"_"+value;
            orders[PATIENTID+"_"+value] = count;
            ++count;
        });
        _.map(ret, function(v, k){
            if(v.length<max){
                for(var i=v.length;i<max;i++){
                    v[i]=NaN;
                }
            }
        });

        console.log('computeMutationFrequencyBySample', ret);
       // return ret;
       //  console.log('freq data',ret);
        var options={};
        var props = {};
        props.colors = colors;
        props.orders = orders;
        props.data = ret;
        props.labels = labels;

        if(!isTooltip) {
            options = {
                show_controls: false,
                nolegend: true,
                width: 64,
                height: 64,
                label_font_size: "6.5px",
                xticks: 0,
                yticks: 0,
                margin_bottom: 15,
                margin: {
                    top: 20,
                    left: 50,
                    right: 30,
                    bottom: 30
                },
            }
        }else {
            options = {
                show_controls: true,
                label_font_size: "11.5px",
                xticks: 3,
                yticks: 8,
                nolegend: false,
                margin:{
                    top: 20,
                    left: 50,
                    right: 30,
                    bottom: 30
                },
                width: 400,
                height: 364,
            };
        }
        props.options = options;
        var vAFPlot = new VAFPlot();
        vAFPlot.init(props);
    }
}