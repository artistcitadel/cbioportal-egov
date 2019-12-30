/**
 * @author 오세영
 */
function Annotation() {
    var self = this;
    var action;
    var util;
    var oncology={};
    var CNT;
    var SIZE;
    var EVIDENCE = [];
    self.entrez_id = [];

    self.init = function (geans,callback) {
        CNT = 0;
        action = new Action();
        util = new Util();
        self.gene = geans;
        self.callback = callback;
        var ds_cond = {};
        ds_cond.queryId = "/utils/cancerGeneList";
        ds_cond.callback = setcancerGean;
        action.cancerGeanList(ds_cond);
    }

    var setcancerGean = function (json) {
        // console.log("annoataion entryzeanId ", json);
        // console.log("self.geans ", self.gene);

        _.forEach(self.gene, function (v,i) {
            // if(i==='EXPRESSION' || i==='SV') return;
            // if(i==='EXPRESSION') return;
            //console.log('entry table', i, v);
            var entry = [];
          for(j=0;j<v.length;j++) {
              var idx = _.findIndex(json, function (o) {
                  return o.hugoSymbol === v[j].geneNm;
              });
              // console.log('entry table', idx);
              if (idx !== -1) {
                  var item = {};
                  item.entrezGeneId = json[idx].entrezGeneId;
                  item.hugoSymbol = json[idx].hugoSymbol;
                  item.oncogene = json[idx].oncogene;
                  item.oncokbAnnotated = json[idx].oncokbAnnotated;
                  item.tumorType = v[j].tumorNm;
                  item.mutationType = v[j].geneVariClsfNm;
                  item.alteration = v[j].hgvspVal;
                  item.proteinStart = v[j].geneVariStLocVal;
                  item.proteinEnd = v[j].geneVariEndLocVal;
                  //item.alterationType = '';
                  entry.push(item);
              }
          }

            // console.log('find entryzeanid is ', entry);
            search(entry, i);
        });
    }

    var search = function (data, node) {
        // console.log('node is ', node);
        var queries = [];
        for(var i=0;i<data.length;i++){
            self.entrez_id.push(data[i].entrezGeneId);
            var entry = {};
            // entry.alteration = data[i].alteration;
            entry.alteration =  (node==='CNV') ? 'Amplification': (node==='MUTATIONS') ? data[i].alteration : '';
            entry.alterationType="Mutation";
            entry.mutationType = data[i].mutationType;
            entry.entrezGeneId = data[i].entrezGeneId;
            entry.hugoSymbol = data[i].hugoSymbol;
            entry.proteinPosEnd = data[i].proteinEnd;
            entry.proteinPosStart = data[i].proteinStart;
            entry.tumorType = data[i].tumorType;
            entry.type = 'web';
            queries.push( util.generateQueryVariant(entry) );
        }

        var ds_cond = {};
        ds_cond = {};
        ds_cond.queries = queries;
        ds_cond.callback = setIndicator;
        action.getCancerGeanAnnotation(ds_cond, node);
    }

    var setIndicator = function (json,node) {
        // console.log('indicator post', node, json, CNT);
        oncology[node] = json;
         ++CNT;
         if(CNT===3) {
             // self.callback(oncology);
             // console.log('oncology length ',_.size(oncology['MUTATIONS'])+_.size(oncology['CNV'])+_.size(oncology['SV']));
             SIZE = _.size(oncology['MUTATIONS'])+_.size(oncology['CNV'])+_.size(oncology['SV']);

             if(SIZE === 0){
                 self.callback(oncology,[],[]);
             }

             CNT=0;
             _.forEach(oncology, function(v,k){
                 for(var i=0;i<v.length;i++) {
                     searchEvidence(v[i]);
                 }
                 // console.log('kis ',k);
             });

         }
    }
    var generateEvidenceQuery = function(queryVariants , evidenceTypes){
        return {
            evidenceTypes: evidenceTypes ? evidenceTypes : "GENE_SUMMARY,GENE_BACKGROUND,ONCOGENIC,MUTATION_EFFECT,VUS,MUTATION_SUMMARY,TUMOR_TYPE_SUMMARY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_SENSITIVITY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_RESISTANCE,INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_SENSITIVITY,INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_RESISTANCE",
            highestLevelOnly: false,
            levels: [LevelOfEvidence.LEVEL_1, LevelOfEvidence.LEVEL_2A, LevelOfEvidence.LEVEL_2B, LevelOfEvidence.LEVEL_3A, LevelOfEvidence.LEVEL_3B, LevelOfEvidence.LEVEL_4, LevelOfEvidence.LEVEL_R1, LevelOfEvidence.LEVEL_R2],
            // source: "cbioportal",
            source: "asancbioportal",
            queries: queryVariants,
        };
    }

    var searchEvidence = function(data){
        var action = new Action();
        var queryVariants = [];
        queryVariants.push(data.query);
        var query = generateEvidenceQuery(queryVariants, "STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_SENSITIVITY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_RESISTANCE,INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_SENSITIVITY,INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_RESISTANCE");
        // console.log('searchEvidence query', query);
        var ds_cond = {};
        ds_cond.body = query;
        ds_cond.callback = setEvidence;
        action.getEvidence(ds_cond, data);
    }
    var setEvidence = function (json, data) {
        // console.log('setEvidence', json);
        var evidenceMap = processEvidence(json);
        var cache={};
        for (var id in evidenceMap) {
            if (evidenceMap.hasOwnProperty(id))
            {
                // cache[id] = {
                //     status: "complete",
                //     data: evidenceMap[id]
                // };
                cache[id] = {
                       id:data.query.entrezGeneId,
                       data: evidenceMap[id]
                    };
            }
        }
        // console.log('evidence cache',cache);
        EVIDENCE.push(cache);
        ++CNT;
        if(CNT===SIZE){
            // console.log('CNT,EVIDENCE', CNT,EVIDENCE);
           // self.callback(oncology,EVIDENCE);

            getCivic();
        }

    }

    var getCivic = function(){
        var civic = new Civic();
        // console.log(self.entrez_id.join());
        civic.init(finalRound,self.entrez_id.join());
    }
    var finalRound = function(result){
        // console.log('finalRound', result);
        var civicData = [];
        for(var i=0;i<result.length;i++){
            var record = result[i];
            var slot = {};
            slot.id = record.id;
            slot.name = record.name;
            slot.description = record.description;
            slot.url='https://civicdb.org/#/events/genes/'+ record.id + '/summary';
            slot.variants = createVariantMap(record.variants);
            civicData.push(slot);
        }
        // console.log('civicData', civicData);
        self.callback(oncology,EVIDENCE, civicData);
    }

    self.buildToolbox = function(data, id, cache, sample){
        // console.log(data.geneExist, id);
        // console.log('cache.treatments ',cache.treatments);
        var oncogenic = (data.oncogenic=='')?"Unknown" : data.oncogenic;
        var mutationEffect = (data.mutationEffect == null) ?'Unknown':data.mutationEffect.knownEffect;
        var geneSummary = data.geneSummary;
        var tumorTypeSummary = data.tumorTypeSummary
        // console.log(oncogenic);
        // console.log(mutationEffect);

        var txt = '';
        if(data.geneExist!==true){
            txt='<div class="oncokb-card>\n' +
                '<div>\n' +
                '<div class="additional-info>\n' +
                'There is currently no information about this gene in OncoKB.\n' +
                '</div>\n' +
                '<div class="footer" style="background-color: white;">\n' +
                '<a href="https://oncokb.org/gene/TSC2/KCTD5-TSC2 Fusion" target="_blank">\n' +
                '          <img src="/pmp/js/page/patient/images/oncokb_logo.png" class="oncokb-logo" alt="OncoKB">\n' +
                '</a>\n' +
                '<span class="pull-right feedback">\n' +
                //'       <button class="btn btn-default btn-sm btn-xs">Feedback</button>\n' +
                '      </span>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>';

        }else{
            txt='<div class="rc-tooltip-inner" role="tooltip">\n' +
                '               <div class="oncokb-card">\n' +
                '                   <div>\n' +
                '                       <span>\n' +
                '                           <div class="tabs-wrapper">\n' +
                '                               <div class="title" style="background-color: #a03f61;">'+data.query.hugoSymbol+' '+data.query.alteration+' in '+data.query.tumorType+'</div>\n' +
                '                               <div class="tabs" style="background-color: #ff9361;">\n' +
                '                                   <div class="tab enable-hover">\n' +
                '                                       <a onClick="tabToggle(1,\''+id+'\');" class="oncogenicity tab-title-a enable-hover-a enable-hover-active">\n' +
                '                                           <span class="tab-title">clinical implications</span>\n' +
                '                                           <span class="tab-subtitle">'+oncogenic+'</span>\n' +
                '                                       </a>\n' +
                '        </div>\n' +
                '        <div class="tab enable-hover">\n' +
                '            <a onClick="tabToggle(2,\''+id+'\');" class="mutation-effect tab-title-a enable-hover-a">\n' +
                '                <span class="tab-title">Biological Effect</span>\n' +
                '                <span class="tab-subtitle">'+mutationEffect+'</span>\n' +
                '            </a>\n' +
                '        </div>\n';

            txt+='<div class="indicator"></div>\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <div id="tab1_'+id+'" class="tab-pane" style="background-color: white;">\n' +
                '            <p>'+geneSummary+'</p>\n' +
                '            <p>'+tumorTypeSummary+'</p>\n' +
                '            <p style="margin-bottom: 0px;">There are no FDA-approved or NCCN-compendium listed treatments specifically for patients with KMT2A-ATP5L fusion positive adrenocortical carcinoma.</p>\n' +
                '    </div>\n' +


                '  <div id="tab2_'+id+'" class="tab-pane" style="background-color:white;display:none;">\n' +
                '    <ul class="no-style-ul">\n';
            if(cache.treatments.sensitivity.length > 0) {
                // console.log('cache.treatments.sensitivity.', cache.treatments.sensitivity);
               var articles =  cache.treatments.sensitivity[0].articles;
               // console.log('articles is ', articles);
                if(!_.isUndefined(articles) && articles.length>0) {
                    for(var i=0;i<articles.length;i++) {
                        if(articles[i].pmid==null)continue;
                        txt +=
                            ' <li key=' + articles[i].pmid + ' class="list-group-item">\n' +
                            '                <a\n' +
                            '                    class="list-group-item-title"\n' +
                            '                    href="getNCBIlink(/pubmed/' + articles[i].pmid + ')" \n' +
                            '                    target="_blank"\n>' +
                            '                    <b>' + articles[i].title + '</b>\n' +
                            '                </a>\n' +
                            '                <div class="list-group-item-content">\n' +
                            '                    <span>' + articles[i].authors + '' + articles[i].reference + '.' + articles[i].pubDate + '</span>\n' +
                            // '                    <span>PMID: '+articles[i].pmid+'</span>\n' +
                            '                </div>\n' +
                            '                <div class="list-group-item-content">\n' +
                            '                    <span>PMID: ' + articles[i].pmid + '</span>\n' +
                            '                </div>\n' +
                            '            </li>';

                        // '      <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/23628958" target="_blank"><b>The MLL recombinome of acute leukemias in 2013.</b></a>\n' +
                        // '        <div class="list-group-item-content"><span>Meyer C et al. Leukemia. 2013</span><span>PMID: 23628958</span></div>\n' +
                        // '      </li>\n' +
                        // '      <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/8681380" target="_blank"><b>An Mll-AF9 fusion gene made by homologous recombination causes acute leukemia in chimeric mice: a method to create fusion oncogenes.</b></a>\n' +
                        // '        <div class="list-group-item-content"><span>Corral J et al. Cell. 1996</span><span>PMID: 8681380</span></div>\n' +
                        // '      </li>\n' +
                        // '      <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/25998713" target="_blank"><b>Hijacked in cancer: the KMT2 (MLL) family of methyltransferases.</b></a>\n' +
                        // '         <div class="list-group-item-content"><span>Rao RC et al. Nat Rev Cancer. 2015</span><span>PMID: 25998713</span></div>\n' +
                        // '      </li>\n' +
                        // '      <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/11265751" target="_blank"><b>Inter-chromosomal recombination of Mll and Af9 genes mediated by cre-loxP in mouse development.</b></a>\n' +
                        // '         <div class="list-group-item-content"><span>Collins EC et al. EMBO Rep. 2000</span><span>PMID: 11265751</span></div>\n' +
                        // '      </li>\n' +
                        // '      <li class="list-group-item"><a class="list-group-item-title" href="https://www.ncbi.nlm.nih.gov/pubmed/18455126" target="_blank"><b>Malignant transformation initiated by Mll-AF9: gene dosage and critical target cells.</b></a>\n' +
                        // '         <div class="list-group-item-content"><span>Chen W et al. Cancer Cell. 2008</span><span>PMID: 18455126</span></div>\n' +
                        // '      </li>\n' +
                    }
                }
            }
                txt+='    </ul>\n' +
                '  </div>' +
                '</div>\n' +

                '</div>\n' +
                '</div>\n';

            if(cache.treatments.sensitivity.length > 0){
                txt+='<div class="oncokb-treatment-table" style="font-size: 1.2rem;">\n' +
                    '      <table class="table table table-bordered" style="margin-top:1px;margin-bottom:1px;">\n' +
                    '            <thead>\n' +
                    '                <tr>\n' +
                    '                    <th scope="col" style="background-color:white;">Level</th>\n' +
                    '                    <th scope="col" style="background-color:white;">Alteration(s)</th>\n' +
                    '                    <th scope="col" style="background-color:white;">Drug(s)</th>\n' +
                    '                    <th scope="col" style="background-color:white;">Level-associated<br/>cancer Type(s)</th>\n' +
                    '                    <th scope="col" style="background-color:white;"></th>\n' +
                    '                </tr>\n' +
                    '            </thead>\n' +
                    '            <tbody style="background-color:white;">\n';
                txt+=OncoKbTreatmentTable(cache.treatments.sensitivity,sample);
                txt+='            </tbody>\n' +
                    '      </table>\n' +
                    '</div>';
            }

            txt+=' <div class="disclaimer" style="background-color: white;">' +
                '<span>The information above is intended for research purposes only and should not be used as a substitute for professional diagnosis and treatment.</span>' +
                '</div><div>\n' +
                '    <div data-toggle="collapse" data-target="#secret1_'+id+'" onClick="levelToggle(\''+id+'\')" class="collapsible-header">Levels<span style="float: right;">\n' +
                '        <i id="ardown_'+id+'" class="fa fa-chevron-down blue-icon"></i>' +
                '        <i id="arup_'+id+'"   class="fa fa-chevron-up blue-icon" style="display:none;"></i>' +
                '</span></div>\n' +
                '    <div id="secret1_'+id+'" data-toggle="collapse" data-target="#topDives" class="ReactCollapse--collapse" style="overflow: hidden; height: 0px;">\n' +
                '        <div id="topDives" class="ReactCollapse--content" style="background-color: white;">\n' +
                '            <div class="levels levels-collapse">\n' +
                '                <ul style="line-height: 8; padding: 0px;">\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-1"></i><span><b>FDA-recognized</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-2A"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-2B"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in another indication</b>, but not standard care for this indication</span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-3A"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in this indication</b></span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-3B"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in another indication</b></span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-4"></i><span><b>Compelling biological evidence</b> supports the biomarker as being predictive of response to a drug</span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-R1"></i><span><b>Standard care</b> biomarker predictive of <b>resistance</b> to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>\n' +
                '                    <li class="levels-li"><i class="oncokb level-icon level-R2"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of <b>resistance</b> to a drug</span></li>\n' +
                '                </ul>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '\n' +
                '    </span>\n' +
                '      <div class="footer" style="background-color: white;">\n' +
                '        <a href="https://oncokb.org/gene/TSC2/KCTD5-TSC2 Fusion" target="_blank">\n' +
                '          <img src="/pmp/js/page/patient/images/oncokb_logo.png" class="oncokb-logo" alt="OncoKB">\n' +
                '       </a>\n' +
                '       <span class="pull-right feedback">\n' +
                // '       <button class="btn btn-default btn-sm btn-xs">Feedback</button>\n' +
                '      </span>\n' +
                '    </div>\n' +
                '   </div>\n' +
                '   </div>\n' +
                '  </div>';

        }
        return txt;
    }

    var OncoKbTreatmentTable = function(treatments, id){
        var treatment = generateTreatments(treatments);
        var txt = '';
        console.log('treatment ', treatment);
         for(var i=0;i<treatment.length;i++){
             var classn = levelIconClassNames(treatment[i].level);
             var alterrations = "Oncogenic Mutations"; //mergeAlterations(treatment[i].approvedIndications);
             txt+='<tr>';
             txt+='<td><i\n' +
                 '  class="'+classn+'"\n' +
                 '  style="margin:auto;"\n' +
                 '  /></td>';
             txt+='<td><div style="whiteSpace: normal;lineHeight:1rem;">\n' +
                 '                    '+mergeAlterations(treatment[i].variant)+ '\n' +
                 '                </div></td>';
             txt+='<td><div style="whiteSpace: normal;lineHeight:1rem;">\n' +
                 ' '+treatment[i].treatment+ '\n' +
                 ' </div></td>';
             txt+='<td><div style="whiteSpace: normal;lineHeight:1rem;">\n' +
                 ' '+treatment[i].cancerType+ '\n' +
                 ' </div></td>';
             txt+='<td> <div style="whiteSpace: normal;lineHeight:1rem;">\n' +
                 '<i id="article_'+(id+''+i)+'" onmouseover="pmidtooltip( \''+(id+''+i)+'\',\''+i+'\')" class="fa fa-book"></i>\n' +
                 ' </div></td>';
             txt+='</tr>';
         }

         // console.log(txt);
         return txt;
    }

    var mergeAlterations = function (alterations)
    {
        var positions = {};
        var regular = [];
        var regExp = new RegExp('^([A-Z])([0-9]+)([A-Z]$)');

        if (_.isString(alterations)) {
            return alterations;
        }

        _.each(alterations, function(alteration) {
            var result = regExp.exec(alteration);
            if (_.isArray(result) && result.length === 4) {
                if (!positions.hasOwnProperty(result[2])) {
                    positions[result[2]] = {};
                }
                if (!positions[result[2]].hasOwnProperty(result[1])) {

                    positions[result[2]][result[1]] = {};
                }
                positions[result[2]][result[1]][result[3]] = 1;
            } else {
                regular.push(alteration);
            }
        });

        _.each(_.keys(positions).map(function(e) {
            return Number(e);
        }).sort(), function(position) {
            _.each(_.keys(positions[position]).sort(), function(aa) {
                regular.push(aa + position + _.keys(positions[position][aa]).sort().join('/'));
            });
        });
        return regular.join(', ');
    }

    var levelIconClassNames = function(level) {
        return 'oncokb level-icon level-'+level+'';
    }



    var levelListItem = function(level)
    {
        var levelIcon = levelIconClassNames(level);
        var txt = '<li key='+level+' className="levels-li">\n' +
            '        <i\n' +
            '        className='+levelIcon+'\n' +
            '        />\n' +
            '        {levelDes}\n' +
            '    </li>';

    }

    var extractPmids = function(evidence)
    {
        var refs = [];

        if (evidence.treatments && _.isArray(evidence.treatments.sensitivity))
        {
            _.forEach(evidence.treatments.sensitivity, function(item) {
            if (_.isArray(item.articles))
            {
                refs = refs.concat(_.map(item.articles,function(article) {
                return Number(article.pmid);
            }));
            }
        });
        }

        if (evidence.treatments &&
            _.isArray(evidence.treatments.resistance))
        {
            _.forEach(evidence.treatments.resistance, function(item) {
            if (_.isArray(item.articles))
            {
                refs = refs.concat(_.map(item.articles, function(article) {
                return Number(article.pmid);
            }));
            }
        });
        }

        return refs;
    }

    var LEVELS = function(){
        return ['1', '2A', '2B', '3A', '3B', '4', 'R1', 'R2'];
    }



    var generateLevelRows = function(levels, levelDes)
    {
       var rows = [];
        _.forEach(levels, function(level) {
            rows.push(this.levelListItem(level, levelDes[level]));
    });

        return rows;
    }




}
