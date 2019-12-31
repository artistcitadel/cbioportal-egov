/**
 * @author 오세영
 */
    function PatientViewMutationTable() {
        var self = this;
        var action,util, annotation;
        self.EVIDENCE = [];
        self.CIVICGENE = [];
        self.GEANDATA = [];
        self.annotationList = [];
        self.civicList = [];

        self.ISROUNDMUTATION = false;
        self.NODE = 'MUTATIONS';
        self.TABLE={};
        self.NODES = ['MUTATIONS','CNV','EXPRESSION','SV'];
        //self.PAGE = [{'MUTATIONS':1},{'CNV':1},{'EXPRESSION':1},{'SV':1}];
        self.GOALCNT = self.NODES.length-1;
        //self.GOALCNT = 2;
        self.QID = ['selectPatientMuList','selectPatientCNAList','selectPatientEXPRESSIONList','selectPatientSVList']

        self.mutMap = [
           {id:'geneExamSpcnSeq', name:'TUMORS', show:false},
           {id:'geneNm',name:'GENE', show:true},
           {id:'geneExamMthNm', name:'METHODS', show:false},
           {id:'hgvspVal', name:'PROTEIN_CHANGE', show:false},
           {id:'annotation', name:'ANNOTATION',show:false},
           {id:'chrnNo', name:'CHROMOSOME',show:false},
           {id:'geneVariStLocVal', name:'START_POS',show:false},
           {id:'geneVariEndLocVal', name:'END_POS',show:false},
           {id:'refAlleleSqncVal', name:'REF',show:false},
           {id:'variAlleleSqncVal',name:'VAR', show:false},
           {id:'ms', name:'MS',show:false},
           {id:'geneVariClsfNm',name:'MUTATION_TYPE', show:false},
           {id:'variAlleleReadRt', name:'ALLELE_FREQ',show:false},
           {id:'variAlleleReadCnt', name:'VARIANT_READS',show:false},
           {id:'refAlleleReadCnt',name:'REF_READS', show:false},
           {id :'copy',name:'COPY#', show:false},
           {id:'cohort', name:'COHORT',show:false},
           {id:'cosmic', name:'COSMIC',show:false}
        ];
        self.cnaMap = [
            {id:'geneExamSpcnSeq', name:'TUMORS', show:false},
            {id:'geneNm',name:'GENE', show:true},
            {id:'geneExamMthNm', name:'METHODS', show:false},
            {id:'annotation', name:'ANNOTATION',show:false},
            {id:'cytbNm', name:'Cytoband',show:false},
            {id:'cohort', name:'COHORT',show:false},
        ];

        self.expMap = [
            {id:'geneNm', name:'GENE', show:true},
            {id:'annotation', name:'ANNOTATION',show:false},
            {id:'geneExamMthNm', name:'METHODS',show:false},
            {id:'ptegGeneReadRsltVal', name:'EXP_RESULT',show:false},
            {id:'gnex', name:'EXP_VALUE',show:false},
            {id:'gnexMsrVal', name:'EXP_UNIT',show:false},
        ];
        self.svMap = [
            {id:'geneExamSpcnSeq', name:'TUMORS', show:true},
            {id:'geneNm', name:'GENE1', show:true},
            {id:'geneNm1', name:'GENE2', show:true},
            {id:'geneExamMthNm', name:'METHODS',show:false},
            {id:'annotation', name:'ANNOTATION',show:true},
            {id:'cytbNm', name:'Cytoband1',show:false},
            {id:'cytbNm1', name:'Cytoband2',show:false},
            {id:'cohort', name:'COHORT',show:false},
        ];

        self.TH = {},

        self.TH.MUTATIONS = self.mutMap;
        self.TH.CNV = self.cnaMap;
        self.TH.EXPRESSION = self.expMap;
        self.TH.SV = self.svMap;
        self.ROUNDCNT = 0;
        self.GENE = [];

        var buildAnnotation = function(con,id){
            // console.log('self.EVIDENCE', self.EVIDENCE);
          //  console.log('con is', con[0].query.id);
            var cache;
            for(var i=0;i<self.EVIDENCE.length;i++){
                _.map(self.EVIDENCE[i],function(v,k){
                    // console.log(k);
                    if(k===con[0].query.id){
                        cache = v.data;
                    }
                })
            }
            // console.log('cache is ', cache);
            var annotation = new Annotation();
            EVA = self.EVIDENCE;
            return annotation.buildToolbox(con[0],id,cache, con[0].query.id);
        }

        var buildCivic = function(con, id, varient){
            console.log('buildCivic ', con, id, varient);
            var cache =_.filter(self.CIVICGENE, ['name', con[0].query.hugoSymbol]);
            console.log('cache is ', cache);

            var civic = new Civic();
            return civic.buildToolbox(cache[0], id, varient);
        }

        var loadAnnotation = function(id, v){
        	if(v.length<1)return;
      	    /*new jBox('Tooltip', {
               attach: '#' + id + '',
               width: 600,
               closeOnMouseleave: true,
               animation: 'move',
               content: buildAnnotation(v, id),
                onOpen: function() {

               //    new jBox('Notice', {content: id.split("_")[1], color: 'green'});
               },
              onClose: function() {
               //   new jBox('Notice', {content: 'See ya later!', color: 'red'});

              }
            });*/
            // tip.open();
        	$('#'+id+'').tooltipster({
                plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
//                positionTracker:true,
//                trackOrigin:true,
//                trackTooltip:true,
                arrow: false,
                content : buildAnnotation(v,id),
                
//                trigger: 'custom',
//                triggerClose: {
//                    click: true,
//                    tap: true
//                }
                
            });
            $('#'+id+'').tooltipster('open');
        }

        var loadCivic = function(id, v, varient) {
            // new jBox('Tooltip', {
            //     attach: '#' + id + '',
            //     width: 500,
            //     closeOnMouseleave: true,
            //     animation: 'move',
            //     content: buildCivic(v,id, varient) ,
            // });
            console.log('loadCivic', id);
            $('#'+id+'').tooltipster({
                    theme: 'tooltipster-shadow',
                    contentAsHTML: true,
                    interactive: true,
                    arrow: false,
                    content: buildCivic(v,id, varient)
                });
                $('#'+id+'').tooltipster('open');
        }

        var loadHotspot = function(id){
            var hotspot = new Hotspot();
            $('#'+id+'').tooltipster({
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                content: hotspot.init()
            });
            $('#'+id+'').tooltipster('open');
        }

        var loadMycancergenome = function(id) {
            var myCancerGenome = new CancerGenome();
            var data = _.filter(MYCANCERGENOME, function(o){
                return o.hugoGeneSymbol == id.split("_")[1];
            });
            $('#'+id+'').tooltipster({
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                content: myCancerGenome.init(data)
            });
            $('#'+id+'').tooltipster('open');
        }

        self.init = function (){
            // console.log('PatientViewMutationTable called');
            $('.ttt').show();
            $('#xgrid').hide();
            $("#mut_loader").show();
            $("#cna_loader").show();
            $("#st_loader").show();


            action = new Action();
            util = new Util();
            annotation = new Annotation();

            roundRobin();
            // getMutationCosmic();

            // $("#CNV_con").on("mouseover", "[id^='ann_']",function (e) {
            //     alert('');
            // });
            //$("[id^='cosmic_']").on('hover', function (e) {
            $('input[type="checkbox"]').change(function() {
                setColumn(this.id);
            });

            //~ mutation annotation

            $("#MUTATIONS_con").on("mouseover", "[id^='ann_']",function (e) {
                var id = e.target.id;
                var v = _.filter(self.GENE['MUTATIONS'], function(o){
                    return o.query.hugoSymbol === id.split("_")[1];
                })
                // console.log('vis ', v);
                loadAnnotation(id,v);
            });
            $("#CNV_con").on("mouseover", "[id^='ann_']",function (e) {
                var id = e.target.id;
                console.log(id);
                var v = _.filter(self.GENE['CNV'], function(o){
                    return o.query.hugoSymbol === id.split("_")[1];
                })
                console.log('vis ', v);
                // if(TOOLTIP)
                // TOOLTIP.destroy();
                loadAnnotation(id,v);
            });
            $("#SV_con").on("mouseover", "[id^='ann_']",function (e) {
                var id = e.target.id;
                var v = _.filter(self.GENE['SV'], function(o){
                    return o.query.hugoSymbol === id.split("_")[1];
                })
                console.log('vis ', v);
                loadAnnotation(id,v);
            });
            //~ end mutation annotation

            //~ civic annotation
            var showCivic = function(variant,id,v){
                console.log('variantsis ', variant);
                loadCivic(id, v, variant);
            }

            $("#MUTATIONS_con").on("mouseover", "[id^='civic_']",function (e) {
                var id = e.target.id;
                var v = _.filter(self.GENE['MUTATIONS'], function(o){
                    return o.query.hugoSymbol === id.split("_")[1];
                });
                console.log('vis ', v);
                getCivicVariants(self.CIVICGENE, v, false, showCivic , id);

            });
            $("#CNV_con").on("mouseover", "[id^='civic_']",function (e) {
                // console.log('self.GENE[CNV]',self.GENE['CNV']);
                var id = e.target.id;
                var v = _.filter(self.GENE['CNV'], function(o){
                    var alteration = id.split("_")[2];if(alteration=='LOSS')alteration="Deletion";else alteration="Amplification";
                    // console.log(o.query.hugoSymbol === id.split("_")[1]) && ( o.query.alteration===alteration ,  o.query.hugoSymbol, alteration);
                    return (o.query.hugoSymbol === id.split("_")[1]) && ( o.query.alteration===alteration );
                })
                console.log('vis ', v);
                if(v.length===0)return;
                getCivicVariants(self.CIVICGENE, v, true, showCivic , id);
            });
            $("#SV_con").on("mouseover", "[id^='civic_']",function (e) {
                var id = e.target.id;
                var v = _.filter(self.GENE['SV'], function(o){
                    return o.query.hugoSymbol === id.split("_")[1];
                })
                console.log('vis ', v);
                getCivicVariants(self.CIVICGENE, v, false, showCivic , id);
            });
            //~ end civic annotation

            //~ hotspot annotation
            $("#MUTATIONS_con").on("mouseover", "[id^='hot_']",function (e) {
                var id = e.target.id;
                loadHotspot(id);
            });
            $("#CNV_con").on("mouseover", "[id^='hot_']",function (e) {
                var id = e.target.id;
                loadHotspot(id);
            });
            $("#SV_con").on("mouseover", "[id^='hot_']",function (e) {
                var id = e.target.id;
                loadHotspot(id);
            });
            //~ end hotspot annotation

            //~ myCancerGenome annotation
            $("#MUTATIONS_con").on("mouseover", "[id^='my_']",function (e) {
                var id = e.target.id;
                loadMycancergenome(id);
            });
            $("#CNV_con").on("mouseover", "[id^='my_']",function (e) {
                var id = e.target.id;
                loadMycancergenome(id);
            });
            $("#SV_con").on("mouseover", "[id^='my_']",function (e) {
                var id = e.target.id;
                loadMycancergenome(id);
            });
            //~ end myCancerGenome annotation

            $("[id^='search_']").keyup(function (event) {
                event.preventDefault();
                var id = this.id;
                var value = $(this).val();
                self.NODE = this.id.split("_")[1];
                var temp=[];
                if($.trim(value).length>0) {
                    //console.log(self.TABLE[self.NODE]);
                    /*for (var i = 0; i < self.TABLE[self.NODE].length; i++) {
                        console.log(self.TABLE[self.NODE][i]);
                        var fi = _.includes(self.TABLE[self.NODE][i], value);
                        console.log('includes', fi, value);
                        if (fi) {
                            temp.push(self.TABLE[self.NODE][i]);
                        }
                    }*/
                    for (var i = 0; i < self.TABLE[self.NODE].length; i++) {
                       _.map(self.TABLE[self.NODE][i],function(v){
                            if(v===value){
                                temp.push(self.TABLE[self.NODE][i]);
                            }
                        });
                    }
                    console.log('includes', temp, value);
                }
                if($.trim(temp).length===0)temp=self.TABLE[self.NODE];
                self.SORT = true;
                buildRowsMutation(temp,'1');
                });

            $("#MUTATIONS_con").on("mouseover", "[id^='cosmic_']",function (e) {
            //$("#MUTATIONS_con td").last().on("hover", "td:eq(last)",function (e) {
                var id = e.target.id;
                var count = $(this).text();
                var geneNm = $(this).data("geneNm");
                var protein = $(this).data("protein");
                var temp = getCosmic(id.split("_")[1]);
                var prop = {};
                prop.count  = count;
                prop.geneNm = geneNm;
                prop.protein = protein;
                prop.temp = temp;
                prop.id = id;
                getMutationCosmic(prop);

                /*var id = e.target.id;
                var count = $(this).text();
                var geneNm = $(this).data("geneNm");
                var protein = $(this).data("protein");
                var temp = getCosmic(id.split("_")[1]);
                var cosmic = buildCosmic(count, geneNm, protein, temp);

               new jBox('Tooltip', {
                    //$(this).jBox('Tooltip', {
                    attach: '#' + id + '',
                    width: 290,
                    closeOnMouseleave: true,
                    animation: 'move',
                    content: cosmic
                });*/
            });

            // $("#MUTATIONS_ann").on("hover", "[id^='ann_']",function (e) {
            //     var id = e.target.id;
            //     var geneNm = $(this).data("geneNm");
            //     var protein = $(this).data("protein");
            //     //annoation.init();
            //     // var onkokb = buildOncokb(geneNm, protein);
            //     //
            //     // new jBox('Tooltip', {
            //     //     //$(this).jBox('Tooltip', {
            //     //     attach: '#' + id + '',
            //     //     width: 290,
            //     //     closeOnMouseleave: true,
            //     //     animation: 'move',
            //     //     content: onkokb
            //     // });
            // });

        }

        var loadCosmic = function(cosmic, prop){
            var cosmic = buildCosmic(prop.count, prop.geneNm, prop.protein, prop.temp);
            $('#'+prop.id+'').tooltipster({
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                content: cosmic,
            });
            $('#'+prop.id+'').tooltipster('open');

            // new jBox('Tooltip', {
            //     //$(this).jBox('Tooltip', {
            //     attach: '#' + id + '',
            //     width: 290,
            //     closeOnMouseleave: true,
            //     animation: 'move',
            //     content: cosmic
            // });

        }

        getMutationList = function(qid) {
            // console.log("getround ", self.ROUNDCNT);
            //console.log("getMutation ", self.NODE);
            // console.log(QUERY);
            var ds_cond = {};
            ds_cond.data = {"queryId": qid, "patientId": PATIENTID, 'query':QUERY};
            ds_cond.callback = mutation_disposer;
            action.selectPatientMuList(ds_cond);
        }

        var getMutationCosmic = function(prop) {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPatientMuCosmic", "patientId": PATIENTID};
            ds_cond.callback = cosmic_disposer;
            action.selectPatientMuList(ds_cond, prop);
        }


        var cosmic_disposer = function(json, prop) {
            setCosmic(json, prop);
        }

        var setCosmic = function(data, prop){
            self.COSMIC = data;
            loadCosmic(self.COSMIC, prop);
            // roundRobin();
        }

        var roundRobin = function(){
            self.NODE = self.NODES[self.ROUNDCNT];
            getMutationList(self.QID[self.ROUNDCNT]);
        }
        var mutation_disposer = function(json) {
            // console.log('mutation_disposer ', self.NODE);
            self.TABLE[self.NODE] = json;

            setTh();
        }
        var setTh=function(){
             var ds_cond = {};
             ds_cond.data = {"queryId": "selectPatientMutCol", "patientId": PATIENTID};
             ds_cond.callback = tableDisposer;
             action.selectPatientMuList(ds_cond);
        }

        var tableDisposer = function(thdata){
            // console.log('thdata ', thdata , self.NODE);
            var data = _.filter(thdata, function(o){
                //console.log(o.subject , self.NODE);
                return o.subject === self.NODE;
            })
            // console.log('subject data ', data);
            for(var i=0;i<data.length;i++){
                var idx = _.findIndex(self.TH[self.NODE], function(o){
                    return o.name === data[i].id;
                });
                if(idx !==-1){
                    self.TH[self.NODE][idx].show=true;
                    $("#"+self.TH[self.NODE][idx].id+"_"+self.NODE).prop('checked',"true");
                    /*console.log(self.NODE, '==> ',self.TH[self.NODE][idx]);
                    $("#mut_loader").hide();
                    $("#cna_loader").hide();
                    $("#exp_loader").hide();
                    $("#st_loader").hide();*/

                }
            }
            buildTh();
        }

        var renderTh = function(){
            var txt = '';
            // console.log('self.TH[self.NODE]', self.TH[self.NODE],self.NODE);
            for(var i=0;i<self.TH[self.NODE].length;i++) {
                if(self.TH[self.NODE][i].show) {
                    txt += '<th data-sort=\'{"key":"' + self.TH[self.NODE][i].id + '"}\' role="button"><span>' + self.TH[self.NODE][i].name + '</span></th>'
                }
            }
            $("#" + self.NODE).empty();
            $("#" + self.NODE).append(txt);
        }

        var buildTh = function() {

            renderTh();

            if(self.ROUNDCNT < self.GOALCNT){
                ++self.ROUNDCNT;
                //console.log('ROUNCCNT ', self.ROUNDCNT);
                roundRobin();
            }else{
                var gene = new GenomicOverview();
                gene.init(self.TABLE);


                var temp = {};
                temp['MUTATIONS'] = self.TABLE['MUTATIONS'];
                temp['CNV'] = self.TABLE['CNV'];
                temp['SV'] = self.TABLE['SV'];
                // console.log('temp.TABLE ', temp);
                var annotation = new Annotation();
                annotation.init(temp, setGeans);
            }


        }

        var setColumn = function (id){
            self.NODE = id.split("_")[1];
            id = id.split("_")[0];
            var i = _.findIndex(self.TH[self.NODE], function(o){
                return o.id === id;
            });
            self.TH[self.NODE][i].show = !self.TH[self.NODE][i].show;

            renderTh();

            buildRowsMutation(self.TABLE[self.NODE]);
        }

        var buildCosmic = function(count, geneNm, protein, data) {
            //console.log('buildCosmic ', data);
            var str = '<div class="text-dark font-msmall"><strong>' + count + '</strong> occurrences of <strong>' + geneNm + ' ' + protein + '</strong> missense mutations in COSMIC';
            str += '<table class="table table table-bordered">\n' +
                ' <thead>\n' +
                ' <tr class="success">\n' +
                ' <th>COSMIC ID</th>\n' +
                ' <th>Protein Change</th>\n' +
                ' <th>Occurence</th>\n' +
                ' </tr>\n' +
                ' </thead>\n' +
                ' <tbody id="cosmic_con">\n';

            _.forEach(data, function (v) {
                str += '<tr><td style="cursor:pointer;color:blue;" onClick="moveSanger(\' + v.csmcId + \')">' + v.csmcId + '</td>\n' +
                    '<td>' + v.hgvspVal + '</td>\n' +
                    '<td>' + count + '</td>\n' +
                    '</tr>\n';
            });

            str += ' </tbody>\n' +
                ' </table></div>';
            return str;
        }

        var getCosmic = function(id) {
            console.log('geneExamMthNm ', id);
            var item = _.filter(self.COSMIC, function (v) {
                return id === v.mttnExamRsltId;
            });
            console.log('result ', item);
            return item;
        }

        var getMutation = function(temp) {
            // console.log('getMutation ', self.TABLE[self.NODE]);
            if(_.isUndefined(temp))
            return self.TABLE[self.NODE];
            else return temp;
        }


        var _includes = function(data, item){
             // console.log(item, self.TH[self.NODE]);
            // if(self.NODE=='CNV'){
            //     console.log('NODE', item, data);
            // }
            var idx = _.findIndex(data, function(o){
                return o.id === item;
            });
            if(idx===-1)return false;
            // console.log(item, idx, self.TH[self.NODE][idx]);
            if(self.TH[self.NODE][idx].show)return true;
            else return false;
        }
        var setRange = function(data,page){
            // var t = Math.ceil(data.length/10);
            // console.log('setRange ',t, page, data.length);
            var start = page*10-10;
            var end = start+10;
            if(end>data.length)end = data.length;
            // console.log('data slice ',start, end);
            return data.slice(start, end);
        }
        self.showPageBuild = function(data, page, node){

            //self.PAGE[node] = page;
            //console.log('pageNode ', self.PAGE[node]);
            self.NODE = node;
            buildTd(data,page);
        }

        var buildTd = function (json, page){
            if(util._isUndefined(page)) page = 1;
            json = setRange(json, page);
            // console.log('page is ', page,  json);

            // console.log('annotation list', self.annotationList);
            // console.log('civic list', self.civicList);
            var txt = '';
 console.log('self.civicList ',self.civicList);
            _.forEach(json, function (v,i) {

                txt += '<tr>';
                (_includes(self.TH[self.NODE], 'geneExamSpcnSeq'))? (txt+='<td align="center"><span font-msmall">' + v.geneExamSpcnSeq + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneNm'))? (txt+='<td align="center"><span font-msmall">' + v.geneNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneNm1'))? (txt+='<td align="center"><span font-msmall">' + v.geneNm1 + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneExamMthNm'))? (txt+='<td align="center"><span class="font-msmall">' + v.geneExamMthNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'hgvspVal'))? (txt+='<td align="center"><span class="font-msmall" style="white-space: nowrap;"><strong>' + v.hgvspVal + '</strong></span></td>') : '';
                if(_includes(self.TH[self.NODE], 'annotation')){
                    // console.log('td annotation ','ann_'+v.geneNm+'_'+astoempty(v.hgvspVal)+'')
                    var ann = _.filter(self.annotationList,function(o){
                        // console.log(o.id, 'ann_'+v.geneNm+'_'+astoempty(v.hgvspVal));
                        return o.id == 'ann_'+v.geneNm+'_'+astoempty(v.hgvspVal);
                    });
                    var civic = _.filter(self.civicList,function(o){
                        // if(v.geneNm == 'AKT1') console.log(o.id, 'civic_'+v.geneNm+'_'+astoempty(v.hgvspVal));
                        // var alteration = v.hgvspVal;
                        // if(alteration=='LOSS')alteration="Deletion";if(alteration=='AMPLIFICATION') alteration="Amplification";
                         return o.id == 'civic_'+v.geneNm+'_'+astoempty(v.hgvspVal);
                        // return o.id == 'civic_'+v.geneNm+'_'+alteration;
                    });
                    // console.log('maatch ann', ann);
                    // console.log('match civic', civic);
                    var isHot = _.includes(HOTSPOT, v.geneNm);

                    var hasCancerGenome =_.findIndex(MYCANCERGENOME, ['hugoGeneSymbol',v.geneNm]);
                    // console.log('MYCANCERGENOME ', MYCANCERGENOME);
                    // console.log('v.geneNm ', v.geneNm);
                    // console.log('hasCancerGenome ', hasCancerGenome);
                    var userGenomeData = [];
                    if(hasCancerGenome!=-1){
                        var userGenome = _.filter(MYCANCERGENOME, function(o){
                            return o.hugoGeneSymbol == v.geneNm;
                        });
                    }

                    txt+='<td>' +
                        '<span class="annotationspan" style="display: flex; min-width: 100px;">\n' ;
                    if(ann.length>0) {
                       txt+= '<span data-gene-nm="' + v.geneNm + '" data-protein="' + v.hgvspVal + '" style="width: 20px;">\n' +
                             ' <i id="ann_'+v.geneNm+'_'+astoempty(v.hgvspVal)+'" class="'+ann[0].class+'" ></i></span>&nbsp;&nbsp;';
                   }else{
                        txt+='<span style="width: 20px;">&nbsp;</span>&nbsp;&nbsp;';
                    }

                   if(civic.length>0) {
                       //console.log('civic[0].id ',civic[0].id, getCivicEl(civic[0].id));
                       var idx=0;
                       var alteration = civic[0].id.split("_")[2];
                       if(alteration=='LOSS')alteration="Deletion";else alteration="Amplification";
                       if(alteration === 'Amplification' || alteration==='Deletion') {
                           idx = _.findIndex(self.GENE['CNV'], function (o) {
                               return (o.query.hugoSymbol === civic[0].id.split("_")[1]) && ( o.query.alteration===alteration );
                           });
                       }
                       if(idx!==-1)
                       txt+=getCivicEl(civic[0].id)+'&nbsp;&nbsp;';
                       else{
                           txt+='<span style="width: 14px;">&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;'
                       }
                   }else{
                       txt+='<span style="width: 14px;">&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;'
                   }


                   if(isHot)
                     txt+=getHotspot('hot_'+v.geneNm+'_'+astoempty(v.hgvspVal)+'') +'&nbsp;&nbsp;';
                   else{
                       txt+='<span style="width: 14px;">&nbsp;</span>&nbsp;&nbsp;'
                   }
                   // txt+='</span>&nbsp;';

                    if(hasCancerGenome!=-1){
                        txt+=getUserGenome('my_'+v.geneNm+'_'+astoempty(v.hgvspVal)+'') +'&nbsp;&nbsp;';
                    }else{
                        txt+='<span style="width: 14px;">&nbsp;</span>&nbsp;&nbsp;'
                    }

                        // ' <span>\n' +
                        // ' <i class="oncokb annotation-icon oncogenic level-3A" >\n' +
                        // ' </i></span></span>' +
                        txt+='</span></span></td>';
                }

                (_includes(self.TH[self.NODE], 'chrnNo'))? (txt+='<td align="center"><span class="font-msmall">' + v.chrnNo + '</span></td>') : '';

                (_includes(self.TH[self.NODE], 'cytbNm'))? (txt+='<td align="center"><span class="font-msmall">' + v.cytbNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'cytbNm1'))? (txt+='<td align="center"><span class="font-msmall">' + v.cytbNm1 + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'ptegGeneReadRsltVal'))? (txt+='<td align="center"><span class="font-msmall">' + v.ptegGeneReadRsltVal + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'gnex'))? (txt+='<td align="center"><span class="font-msmall">' + v.gnex + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'gnexMsrVal'))? (txt+='<td align="center"><span class="font-msmall">' + v.gnexMsrVal + '</span></td>') : '';


                (_includes(self.TH[self.NODE], 'geneVariStLocVal'))? (txt+='<td align="center"><span class="font-msmall">' + v.geneVariStLocVal + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneVariEndLocVal'))? (txt+='<td align="center"><span class="font-msmall">' + v.geneVariEndLocVal + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'refAlleleSqncVal'))? (txt+='<td align="center"><span class="font-msmall">' + v.refAlleleSqncVal + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'variAlleleSqncVal'))? (txt+='<td align="center"><span class="font-msmall">' + v.variAlleleSqncVal + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'ms'))? (txt+='<td align="center"><span class="font-msmall">' + v.ms + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneVariClsfNm'))? (txt+='<td align="center"><span class="font-msmall">' + v.geneVariClsfNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'variAlleleReadRt'))? (txt+='<td align="center"><span class="font-msmall">' + v.variAlleleReadRt + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'variAlleleReadCnt'))? (txt+='<td align="center"><span class="font-msmall">' + v.variAlleleReadCnt + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'refAlleleReadCnt'))? (txt+='<td align="center"><span class="font-msmall">' + v.refAlleleReadCnt + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'copy'))? (txt+='<td align="center"><span class="font-msmall">' + v.copy + '</span></td>') : '';
              if(_includes(self.TH[self.NODE], 'cohort')){ txt+='<td><span class="font-msmall">\n';
                  if(self.NODE==='MUTATIONS')
                    txt+=renderMutCohort(json,v);
                  if(self.NODE==='CNV')
                      txt+=renderCnaCohort(json,v);
                  if(self.NODE==='SV')
                      txt+=renderSvCohort(json,v);
                    // ' <div>\n' +
                    // ' <svg width="71" height="12">\n' +
                    // ' <text x="36" y="9.5" text-anchor="start" font-size="10">10.5%</text>\n' +
                    // ' <rect y="2" width="30" height="8" fill="#ccc"></rect>\n' +
                    // ' <rect y="2" width="3.1578947368421053" height="8" fill="lightgreen"></rect>\n' +
                    // ' <rect y="2" width="2.3684210526315788" height="8" fill="green"></rect>\n' + '' +
                    // ' </svg>\n' +
                    // ' </div>\n' +
                    txt+='</span></td>';
                }
                (_includes(self.TH[self.NODE], 'cosmic'))? (txt+='<td align="center"><div id="cosmic_' + v.geneExamSpcnId + '"  data-gene-nm="' + v.geneNm + '" data-protein="' + v.hgvspVal + '">' + null2str(v.cosmic) + '</div></td>'):'';
                txt+='</tr>';
            });
            //console.log(txt);
            var targetdiv = self.NODE+"_con";
            //console.log('targetdiv ',targetdiv);
            $("#"+targetdiv).html(txt);
        }


        var setGeans = function(data, evidence, civicGene){
            self.EVIDENCE = evidence;
            self.CIVICGENE = civicGene;
            // console.log('setGeans called ',data);
            // console.log('evidence called ',evidence);
            //  console.log('civicGene called ',civicGene);
            if(!_.isUndefined((data['MUTATIONS']))){
                self.GENE['MUTATIONS'] = data['MUTATIONS'];
            }
            if(!_.isUndefined((data['CNV']))){
                self.GENE['CNV'] = data['CNV'];
            }
            if(!_.isUndefined((data['SV']))){
                self.GENE['SV'] = data['SV'];
            }

            // self.GENE[self.NODE] = data;
            _.forEach(data, function(v,n){
                for(var i=0;i<v.length;i++) {
                  // console.log('v[i].query.alteration',v[i].query.alteration , n);
                  var id = v[i].query.hugoSymbol+'_'+astoempty(v[i].query.alteration);
                  if(n==='CNV' && astoempty(v[i].query.alteration==='Amplification')){
                      id = v[i].query.hugoSymbol+'_AMPLIFICATION';
                  }
                  if(n==='CNV' && astoempty(v[i].query.alteration==='Deletion')){
                        id = v[i].query.hugoSymbol+'_LOSS';
                  }

                  //console.log('id is ', id);
                  var className = util.annotationIconClassNames(v[i]);
                  var annid =  "ann_"+id+"";
                  // console.log('ann_id', annid);
                  var annotationmap = {};
                  annotationmap.id = annid;
                  annotationmap.class = className;
                  self.annotationList.push(annotationmap);


                 var cidx = _.findIndex(self.CIVICGENE, function(o){
                      // console.log(o.name , v[i].query.hugoSymbol);
                     return (o.description!=="") && o.name === v[i].query.hugoSymbol;
                 });
//               var cidx = _.findIndex(self.CIVICGENE,['id', v[i].query.entrezGeneId]);
                  

                  if(cidx!==-1) {
                      var civicid = "civic_"+id+"";
                      var civicmap = {};
                      civicmap.id = civicid;
                      self.civicList.push(civicmap);
                	  // console.log('cidxx' , v[i].query.entrezGeneId, v[i].query.hugoSymbol);
                      // annid.parent('span').append(getCivicEl(civicid));
                  }


                }
            });

            for(var i=0;i<self.NODES.length;i++) {
                // console.log('self.TABLE ',self.TABLE[self.NODES[i]]);
                if(self.TABLE[self.NODES[i]].length<1)continue;
                self.NODE = self.NODES[i];
                buildRowsMutation(self.TABLE[self.NODES[i]]);
            }


            // $("[id^='ann_']").trigger('hover');
            // $("[id^='civic_']").trigger('hover');
            $("#mut_loader").hide();
            $("#cna_loader").hide();
            // $("#exp_loader").hide();
            $("#st_loader").hide();
            $("#MUTATIONS_t").show();
            $("#CNV_t").show();
            // $("#EXPRESSION_t").show();
            $("#SV_t").show();

            var mutcount = self.TABLE[self.NODES[0]].length;
            var cnacount = self.TABLE[self.NODES[1]].length;
            var expcount = self.TABLE[self.NODES[2]].length;
            var svcount = self.TABLE[self.NODES[3]].length;
            $("#mutcount").text(mutcount);
            $("#cnacount").text(cnacount);
            $("#expcount").text(expcount);
            $("#svcount").text(svcount);
        }


        var buildRowsMutation = function(json, dirty) {
            // console.log('buildRowMutation called ',self.ROUNDCNT, json);

            buildTd(json);

            //var gene = new GenomicOverview(LASTYPOS);
            /*if(!self.ISROUNDMUTATION) {
                var gene = new GenomicOverview();
                gene.init(getMutation());
            }
            self.ISROUNDMUTATION = true;*/

            //console.log('self.TABLE[self.NODE].length ', self.NODE);
            var pager = new Pager();
            var el = $("#"+self.NODE+"_pageview");
            var tpage = Math.ceil(getMutation().length/10);
            if(!_.isUndefined(dirty)){
                tpage = Math.ceil(getMutation(json).length/10);
            }
            pager.buildPage(1, tpage, el, self, getMutation(), self.NODE);

            if(!self.SORT) {
                //alert(self.ROUNDCNT + ' ' +self.GOALCNT);
                buildSort();
            }
             // $("[id^='cosmic_']").trigger('hover');

            //alert($("#MUTATIONS_con td").last().find('div').prop('id'));

            /*var copytip = "Copy";
            var downloadtip = 'Download TSV';
            gene.addToolTip($('#copyButton'),copytip,null,{my:'top right',at:'bottom left'});
            gene.addToolTip($('#downloadButton'),downloadtip,null,{my:'top right',at:'bottom left'});*/
        }

        self.SORT = false;
        var buildSort = function() {
            var targetTable = self.NODE+"_t";
            //var $table3 = $('#t-1');
            var $table3 = $('#'+targetTable);
            console.log('$table3 ', $table3);
            var rows = getMutation();
            var $headers = $table3.find('thead th').slice(0);
            $headers
                .wrapInner('<a href="#"></a>')
                .addClass('sort');

            $headers.on('click', function (event) {
                event.preventDefault();
                self.SORT = true;
                var $header = $(this),
                    sortKey = $header.data('sort').key,
                    sortDirection = 1;
                //console.log('sortKey ',sortKey);
                //console.log($header.parents('tr').prop('id'));
                self.NODE = $header.parents('tr').prop('id');
                console.log('self.NODE ', self.NODE);
                rows = getMutation();
                if ($header.hasClass('sorted-asc')) {
                    sortDirection = -1;
                }
                console.log('rows ',rows);
                rows.sort(function (a, b) {
                    var keyA = a[sortKey];
                    var keyB = b[sortKey];

                    if (keyA < keyB) return -sortDirection;
                    if (keyA > keyB) return sortDirection;
                    return 0;
                });

                //$header.parents('tr').children('th').removeClass();
                $headers.removeClass('sorted-asc sorted-desc');
                $header.addClass(sortDirection == 1 ? 'sorted-asc' : 'sorted-desc');
                // $table3.children('tbody').empty();
                //$table3.children('tbody').html(buildRowsMutation(rows));
                $table3.children('tbody').html(buildTd(rows));
            });


        }

        var moveSanger = function(id) {
            window.open('https://cancer.sanger.ac.uk/cosmic/mutation/overview?id=' + id + '');
        }

    }

    var astoempty = function(dat){
     var temp = _.replace(dat,'*','');
     return null2str(temp);
    }
    var null2str = function(dat){
      if(dat==null)return '';
      else return dat;
    }

    var getCivicEl = function(civicid){
      var txt ='<span class="annotation-item">\n' +
          '  <img id="'+civicid+'" width="14px" height="14px" src="/pmp/js/page/patient/images/civic-logo.png"  alt=\'Civic Variant Entry\'  />\n' +
          '</span>';
      return txt;
    }

    var getHotspot = function(hotspotId){
    var txt='<span class="annotation-item chang_hotspot">\n' +
        '    <img id="'+hotspotId+'"  \n' +
        '        width="14px" ' +
        '        height="14px" \n' +
        '        src="/pmp/js/page/patient/images/3d-hotspots.svg" \n' +
        '        alt=\'Recurrent Hotspot Symbol\'\n' +
        '            />\n' +
        '            </span>';
        return txt;
    }

    var getUserGenome = function(id){
       var txt='';
       txt+=' <span class="annotation-item mcg">\n' +
           '  <img id='+id+' width="14px" height="14px" src="/pmp/js/page/patient/images/mcg_logo.png" alt="My Cancer Genome Symbol" />\n' +
           '  </span>';
       return txt;
    }
