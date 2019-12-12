
    function PatientViewMutationTable() {
        var self = this;
        var action,util;
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
            {id:'geneExamSpcnSeq', name:'TUMORS', show:true},
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
            {id:'annotation', name:'ANNOTATION',show:false},
            {id:'cytbNm', name:'Cytoband1',show:false},
            {id:'cytbNm1', name:'Cytoband2',show:false},
            {id:'cohort', name:'Cohort',show:false},
        ];

        self.TH = {},

        self.TH.MUTATIONS = self.mutMap;
        self.TH.CNV = self.cnaMap;
        self.TH.EXPRESSION = self.expMap;
        self.TH.SV = self.svMap;
        self.ROUNDCNT = 0;
        self.gean = [];

        self.init = function (){
            action = new Action();
            util = new Util();

            var ds_cond = {};
            ds_cond.queryId = "/utils/cancerGeneList";
            ds_cond.callback = setcancerGean;
            action.cancerGeanList(ds_cond);

            //getMutationCosmic();

            //$("[id^='cosmic_']").on('hover', function (e) {
            $('input[type="checkbox"]').change(function() {
                setColumn(this.id);
            });
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

            $("#MUTATIONS_con").on("hover", "[id^='cosmic_']",function (e) {
            //$("#MUTATIONS_con td").last().on("hover", "td:eq(last)",function (e) {
                var id = e.target.id;
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
                });
            });
        }

        setcancerGean = function(json){
            self.gean = json;
            getMutationCosmic();
        }
        search = function(entrezGeneId,
                          tumorType,
                          alteration,
                          mutationType,
                          proteinPosStart,
                          proteinPosEnd,
                          alterationType){
            var query = util.generateQueryVariant(entrezGeneId,
                tumorType,
                alteration,
                mutationType,
                proteinPosStart,
                proteinPosEnd,
                alterationType);

            var ds_cond = {};
            ds_cond.queryId = "/search";
            ds_cond.callback = setIndicator;
            action.cancerGeanList(ds_cond);
        }
        setIndicator = function(json){
            console.log(json)
        }
        getMutationList = function(qid) {
            console.log("getround ", self.ROUNDCNT);
            //console.log("getMutation ", self.NODE);
            var ds_cond = {};
            ds_cond.data = {"queryId": qid, "patientId": PATIENTID};
            ds_cond.callback = mutation_disposer;
            action.selectPatientMuList(ds_cond);
        }

        var getMutationCosmic = function() {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPatientMuCosmic", "patientId": PATIENTID};
            ds_cond.callback = cosmic_disposer;
            action.selectPatientMuList(ds_cond);
        }


        var cosmic_disposer = function(json) {
            setCosmic(json);
        }

        var setCosmic = function(data){
            self.COSMIC = data;
            roundRobin();
        }

        var roundRobin = function(){
            self.NODE = self.NODES[self.ROUNDCNT];
            getMutationList(self.QID[self.ROUNDCNT]);
        }
        var mutation_disposer = function(json) {
            //$("#mutation_con").empty();
            // $("#mutation_template").tmpl(page.model).appendTo($("#mutation_con"));
            console.log('mutation_disposer ', self.NODE);
            self.TABLE[self.NODE] = json;
              //setMutation(self.TABLE[self.NODE]);
             setTh();
        }
        var setTh=function(){
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPatientMutCol", "patientId": PATIENTID};
            ds_cond.callback = tableDisposer;
            action.selectPatientMuList(ds_cond);
        }

        var tableDisposer = function(thdata){
            console.log('thdata ', thdata , self.NODE);
            var data = _.filter(thdata, function(o){
                //console.log(o.subject , self.NODE);
                return o.subject === self.NODE;
            })
            console.log('subject data ', data);
            for(var i=0;i<data.length;i++){
                var idx = _.findIndex(self.TH[self.NODE], function(o){
                    return o.name === data[i].id;
                });
                if(idx !==-1){
                    self.TH[self.NODE][idx].show=true;
                    $("#"+self.TH[self.NODE][idx].id+"_"+self.NODE).prop('checked',"true");
                }
            }
            buildTh();
        }

        var buildTh = function() {
            var txt = '';
            // console.log('self.TH[self.NODE]', self.TH[self.NODE],self.NODE);
            for(var i=0;i<self.TH[self.NODE].length;i++) {
                if(self.TH[self.NODE][i].show) {
                    txt += '<th data-sort=\'{"key":"' + self.TH[self.NODE][i].id + '"}\' role="button"><span>' + self.TH[self.NODE][i].name + '</span></th>'
                }
            }
            $("#" + self.NODE).empty();
            $("#" + self.NODE).append(txt);
            buildRowsMutation(self.TABLE[self.NODE]);
        }

        var setColumn = function (id){
            self.NODE = id.split("_")[1];
            id = id.split("_")[0];
            var i = _.findIndex(self.TH[self.NODE], function(o){
                return o.id === id;
            });
            self.TH[self.NODE][i].show = !self.TH[self.NODE][i].show;
            buildTh();
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
            console.log('getMutation ', self.TABLE[self.NODE]);
            if(_.isUndefined(temp))
            return self.TABLE[self.NODE];
            else return temp;
        }


        var _includes = function(data, item){
            console.log(item, self.TH[self.NODE]);
            var idx = _.findIndex(data, function(o){
                return o.id === item;
            });
            if(idx===-1)return false;
            console.log(item, idx, self.TH[self.NODE][idx]);
            if(self.TH[self.NODE][idx].show)return true;
            else return false;
        }
        var setRange = function(data,page){
            // var t = Math.ceil(data.length/10);
            // console.log('setRange ',t, page, data.length);
            var start = page*10-10;
            var end = start+10;
            if(end>data.length)end = data.length;
            console.log('data slice ',start, end);
            return data.slice(start, end);
        }
        self.showPageBuild = function(data, page, node){

            //self.PAGE[node] = page;
            //console.log('pageNode ', self.PAGE[node]);
            self.NODE = node;
            buildTd(data,page);
        }

        var buildTd = function (json,page){
            if(util._isUndefined(page)) page = 1;
            json = setRange(json, page);
            console.log('page is ', page,  json);


            var txt = '';
            _.forEach(json, function (v,i) {

                txt += '<tr>';
                (_includes(self.TH[self.NODE], 'geneExamSpcnSeq'))? (txt+='<td align="center"><span font-msmall">' + v.geneExamSpcnSeq + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneNm'))? (txt+='<td align="center"><span font-msmall">' + v.geneNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneNm1'))? (txt+='<td align="center"><span font-msmall">' + v.geneNm1 + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneExamMthNm'))? (txt+='<td align="center"><span class="font-msmall">' + v.geneExamMthNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'hgvspVal'))? (txt+='<td align="center"><span class="font-msmall" style="white-space: nowrap;">' + v.hgvspVal + '</span></td>') : '';
                if(_includes(self.TH[self.NODE], 'annotation')){
                    txt+='<td><span style="display: flex; min-width: 100px;">\n' +
                        // ' <span>\n' +
                        // ' <i class="oncokb annotation-icon oncogenic level-3A" >\n' +
                        // ' </i></span></span>' +
                        '</td>';
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
                if(_includes(self.TH[self.NODE], 'cohort')){ txt+='<td>\n' +
                    // ' <div>\n' +
                    // ' <svg width="71" height="12">\n' +
                    // ' <text x="36" y="9.5" text-anchor="start" font-size="10">10.5%</text>\n' +
                    // ' <rect y="2" width="30" height="8" fill="#ccc"></rect>\n' +
                    // ' <rect y="2" width="3.1578947368421053" height="8" fill="lightgreen"></rect>\n' +
                    // ' <rect y="2" width="2.3684210526315788" height="8" fill="green"></rect>\n' + '' +
                    // ' </svg>\n' +
                    // ' </div>\n' +
                    '</td>';
                }
                (_includes(self.TH[self.NODE], 'cosmic'))? (txt+='<td align="center"><div id="cosmic_' + v.geneExamSpcnId + '"  data-gene-nm="' + v.geneNm + '" data-protein="' + v.hgvspVal + '">' + null2str(v.cosmic) + '</div></td>'):'';
                txt+='</tr>';
            });
            //console.log(txt);
            var targetdiv = self.NODE+"_con";
            //console.log('targetdiv ',targetdiv);
            $("#"+targetdiv).html(txt);
        }


        var buildRowsMutation = function(json, dirty) {
            console.log('buildRowMutation called ',self.NODE);
            buildTd(json);

            //var gene = new GenomicOverview(LASTYPOS);
            if(!self.ISROUNDMUTATION) {
                var gene = new GenomicOverview();
                gene.init(getMutation());
            }
            self.ISROUNDMUTATION = true;

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
             $("[id^='cosmic_']").trigger('hover');

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

            if(self.ROUNDCNT < self.GOALCNT){
                ++self.ROUNDCNT;
                roundRobin();
            }
        }

        var moveSanger = function(id) {
            window.open('https://cancer.sanger.ac.uk/cosmic/mutation/overview?id=' + id + '');
        }

    }
    var null2str = function(dat){
      if(dat==null)return '';
      else return dat;
    }