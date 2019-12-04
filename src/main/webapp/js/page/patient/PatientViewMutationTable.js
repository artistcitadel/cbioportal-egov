
    function PatientViewMutationTable() {
        var self = this;
        var action,util;
        self.ISROUNDMUTATION = false;
        self.NODE = 'MUTATIONS';
        self.TABLE={};

        self.mutMap = [
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
           {id:'chort', name:'COHORT',show:false},
           {id:'cosmic', name:'COSMIC',show:false}
        ];
        self.cnaMap = [
           {id:'geneNm',name:'GENE', show:true}
        ];
        self.TH = {},

        self.TH.MUTATIONS = self.mutMap;
        self.TH.CNV = self.cnaMap;

        self.init = function (){
            action = new Action();
            util = new Util();
            getMutationCosmic();
            //$("[id^='cosmic_']").on('hover', function (e) {
            $('input[type="checkbox"]').change(function() {
                setColumn(this.id);
            });

            $("table").on("hover", "[id^='cosmic_']",function (e) {
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
        getMutationList = function() {
            console.log("getMutation");
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPatientMuList", "patientId": PATIENTID};
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
            getMutationList();
        }

        var mutation_disposer = function(json) {
            $("#mutation_con").empty();
            // $("#mutation_template").tmpl(page.model).appendTo($("#mutation_con"));
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
            //console.log('thdata ', thdata);
            var data = _.filter(thdata, function(o){
                console.log(o.subject , self.NODE);
                return o.subject === self.NODE;
            })
            console.log('subject data ', data);
            for(var i=0;i<data.length;i++){
                var idx = _.findIndex(self.TH[self.NODE], function(o){
                    return o.name === data[i].id;
                });
                if(idx !==-1){
                    self.TH[self.NODE][idx].show=true;
                    $("#"+self.TH[self.NODE][idx].id).prop('checked',"true");
                }
            }
            buildTh();
        }

        var buildTh = function() {
            var txt = '';
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
                ' <tr class="warning">\n' +
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

        var getMutation = function() {
            return self.TABLE[self.NODE];
        }


        var _includes = function(data, item){
            console.log(item, self.TH[self.NODE]);
            var idx = _.findIndex(data, function(o){
                return o.id === item;
            });
            console.log(item, idx, self.TH[self.NODE][idx]);
            if(self.TH[self.NODE][idx].show)return true;
            else return false;
        }
        var buildRowsMutation = function(json) {
            console.log('buildRowMutation called ',json);
            var txt = '';
            _.forEach(json, function (v) {

                txt += '<tr>';
                (_includes(self.TH[self.NODE], 'geneNm'))? (txt+='<td align="center"><span font-msmall">' + v.geneNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'geneExamMthNm'))? (txt+='<td align="center"><span class="font-msmall">' + v.geneExamMthNm + '</span></td>') : '';
                (_includes(self.TH[self.NODE], 'hgvspVal'))? (txt+='<td align="center"><span class="font-msmall" style="white-space: nowrap;">' + v.hgvspVal + '</span></td>') : '';
                if(_includes(self.TH[self.NODE], 'annotation')){
                    txt+='<td><span style="display: flex; min-width: 100px;">\n' +
                    ' <span>\n' +
                    ' <i class="oncokb annotation-icon oncogenic level-3A" >\n' +
                    ' </i></span></span></td>';
                }

                (_includes(self.TH[self.NODE], 'chrnNo'))? (txt+='<td align="center"><span class="font-msmall">' + v.chrnNo + '</span></td>') : '';
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
                if(_includes(self.TH[self.NODE], 'chort')){ txt+='<td>\n' +
                                                ' <div>\n' +
                                                ' <svg width="71" height="12">\n' +
                                                ' <text x="36" y="9.5" text-anchor="start" font-size="10">10.5%</text>\n' +
                                                ' <rect y="2" width="30" height="8" fill="#ccc"></rect>\n' +
                                                ' <rect y="2" width="3.1578947368421053" height="8" fill="lightgreen"></rect>\n' +
                                                ' <rect y="2" width="2.3684210526315788" height="8" fill="green"></rect>\n' + '' +
                                                ' </svg>\n' +
                                                ' </div>\n' +
                                                '</td>';
                }
                (_includes(self.TH[self.NODE], 'cosmic'))? (txt+='<td align="center"><div id="cosmic_' + v.mttnExamRsltId + '" data-gene-nm="' + v.geneNm + '" data-protein="' + v.hgvspVal + '">' + null2str(v.cosmic) + '</div></td>'):'';
                txt+='</tr>';
            });
            //console.log(txt);
            $("#mutation_con").html(txt);

            //var gene = new GenomicOverview(LASTYPOS);
            if(!self.ISROUNDMUTATION) {
                var gene = new GenomicOverview();
                gene.init(getMutation());
            }
            self.ISROUNDMUTATION = true;

            buildSort();
            $("[id^='cosmic_']").trigger('hover');

            /*var copytip = "Copy";
            var downloadtip = 'Download TSV';
            gene.addToolTip($('#copyButton'),copytip,null,{my:'top right',at:'bottom left'});
            gene.addToolTip($('#downloadButton'),downloadtip,null,{my:'top right',at:'bottom left'});*/
        }

        var buildSort = function() {
            var $table3 = $('#t-1');
            var rows = getMutation();
            var $headers = $table3.find('thead th').slice(0);
            $headers
                .wrapInner('<a href="#"></a>')
                .addClass('sort');

            $headers.on('click', function (event) {
                event.preventDefault();
                var $header = $(this),
                    sortKey = $header.data('sort').key,
                    sortDirection = 1;

                if ($header.hasClass('sorted-asc')) {
                    sortDirection = -1;
                }

                rows.sort(function (a, b) {
                    var keyA = a[sortKey];
                    var keyB = b[sortKey];

                    if (keyA < keyB) return -sortDirection;
                    if (keyA > keyB) return sortDirection;
                    return 0;
                });

                $headers.removeClass('sorted-asc sorted-desc');
                $header.addClass(sortDirection == 1 ? 'sorted-asc' : 'sorted-desc');

                $table3.children('tbody').html(buildRowsMutation(rows));
            });
        }

        var moveSanger = function(id) {
            window.open('https://cancer.sanger.ac.uk/cosmic/mutation/overview?id=' + id + '');
        }

    }
    var null2str = function(dat){
      if(dat==null)return '';
      else return dat;
    }