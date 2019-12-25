
function processEvidence(evidences) {
    var result = {}; //id based.
    if (evidences && evidences.length > 0) {
        _.forEach(evidences, function(record) {
            var id = record.query.id;
            var datum = initEvidence();
            var sensitivityTreatments = [];
            var resistanceTreatments = [];

            var evidenceArr = [];
            evidenceArr = evidenceArr.concat(record.evidences);

            _.forEach(evidenceArr, function(evidence) {
                var description = '';
                if (evidence.shortDescription) {
                    description = evidence.shortDescription;
                } else {
                    description = evidence.description;
                }
                if (evidence.evidenceType === 'GENE_SUMMARY') {
                    datum.gene.summary = description;
                } else if (evidence.evidenceType === 'GENE_BACKGROUND') {
                    datum.gene.background = description;
                } else if (evidence.evidenceType === 'ONCOGENIC') {
                    if (evidence.articles) {
                        datum.oncogenicRefs = evidence.articles;
                    }
                } else if (evidence.evidenceType === 'MUTATION_EFFECT') {
                    var _datum = {};
                    if (evidence.knownEffect) {
                        _datum.knownEffect = evidence.knownEffect;
                    }
                    if (evidence.articles) {
                        _datum.refs = evidence.articles;
                    }
                    if (description) {
                        _datum.description = description;
                    }
                    datum.alteration.push(_datum);
                } else if (evidence.levelOfEvidence) {
                    //if evidence has level information, that means this is treatment evidence.
                    if ([LevelOfEvidence.LEVEL_0].indexOf(evidence.levelOfEvidence) === -1) {
                        var _treatment = {};
                        _treatment.alterations = evidence.alterations;
                        _treatment.articles = evidence.articles;
                        _treatment.tumorType = getTumorTypeFromEvidence(evidence);
                        _treatment.level = evidence.levelOfEvidence;
                        _treatment.content = evidence.treatments;
                        _treatment.description = description || '';

                        if (LEVELS.sensitivity.indexOf(getLevel(evidence.levelOfEvidence)) !== -1) {
                            sensitivityTreatments.push(_treatment);
                        } else {
                            resistanceTreatments.push(_treatment);
                        }
                    }
                }
            });

            if (datum.alteration.length > 0) {
                datum.mutationEffect = datum.alteration[0];
            }

            datum.treatments.sensitivity = sensitivityTreatments;
            datum.treatments.resistance = resistanceTreatments;
            // id.split('*ONCOKB*').forEach(function(_id) {
            //     result[_id] = datum;
            // })
            result[id] = datum;
        });
    }

    return result;
}


function initEvidence()
{
    return {
        id: '',
        gene: {},
        alteration: [],
        prevalence: [],
        progImp: [],
        treatments: {
            sensitivity: [],
            resistance: []
        }, //separated by level type
        trials: [],
        oncogenic: '',
        oncogenicRefs: [],
        mutationEffect: {},
        mutationEffectRefs: [],
        summary: ''
    };
}


function getTumorTypeFromEvidence(evidence) {
    var tumorType = _.isObject(evidence.tumorType) ? evidence.tumorType.name : (evidence.subtype || evidence.cancerType);
    var oncoTreeTumorType = '';

    if (_.isObject(evidence.oncoTreeType)) {
        oncoTreeTumorType = evidence.oncoTreeType.name ? evidence.oncoTreeType.name :
            (evidence.oncoTreeType.mainType ? evidence.oncoTreeType.mainType.name : '');
    }

    if(oncoTreeTumorType) {
        tumorType = oncoTreeTumorType;
    }

    return tumorType;
}

function getLevel(level) {
    if (level) {
        var _level = level.match(/LEVEL_(R?\d[AB]?)/);
        if (_level instanceof Array && _level.length >= 2) {
            return _level[1];
        } else {
            return level;
        }
    } else {
        return "";
    }
}


/*function generateTreatments(evidenceTreatments)
{
    var treatments = {};
    var result = [];
    console.log('evidenceTreatments ',evidenceTreatments);
    _.each(evidenceTreatments, function(content) {
        console.log('content ',content);
        _.each(content, function(item) {
            var _level = getLevel(item.level);
            var _treatment = treatmentsToStr(item.content);
            var _tumorType = item.tumorType;
            /!*var _alterations = item.alterations.map(function(alt) {
                return alt.name;
            }).join(',');*!/
            var _alterations;
            if (!treatments.hasOwnProperty(_level)) {
                treatments[_level] = {};
            }
            if (!treatments[_level].hasOwnProperty(_alterations)) {
                treatments[_level][_alterations] = {};
            }

            if (!treatments[_level][_alterations].hasOwnProperty(_treatment)) {
                treatments[_level][_alterations][_treatment] = {};
            }

            if (!treatments[_level][_alterations][_treatment].hasOwnProperty(_tumorType)) {
                treatments[_level][_alterations][_treatment][_tumorType] = {
                    articles: [],
                    tumorType: _tumorType,
                    alterations: item.alterations,
                    level: _level,
                    description: item.description,
                    treatment: _treatment
                };
            } else {
                treatments[_level][_alterations][_treatment][_tumorType].description = [treatments[_level][_alterations][_treatment][_tumorType].description, '<br/>', item.description].join();
            }
            treatments[_level][_alterations][_treatment][_tumorType].articles = _.union(treatments[_level][_alterations][_treatment][_tumorType].articles, item.articles);
        });
    });

    _.each(_.keys(treatments).sort(levelComparator), function(level) {
        _.each(_.keys(treatments[level]).sort(), function(_alteration) {
            _.each(_.keys(treatments[level][_alteration]).sort(), function(_treatment) {
                _.each(_.keys(treatments[level][_alteration][_treatment]).sort(), function(_tumorType) {
                    var content = treatments[level][_alteration][_treatment][_tumorType];
                    result.push({
                        level: content.level,
                        variant: content.alterations.map(function(alteration) {
                        return alteration.name;
                    }),
                    treatment: _treatment,
                        pmids: content.articles.filter(function(article) {
                        return !isNaN(article.pmid);
                    }).map(function(article) {
                        return Number(article.pmid);
                    }).sort(),
                        abstracts: content.articles.filter(function(article) {
                        return _.isString(article.abstract);
                    }).map(function(article) {
                        return {
                            abstract: article.abstract,
                            link: article.link
                        };
                    }),
                    description: content.description,
                        cancerType: content.tumorType
                });
                });
            });
        });
    });

    return result;
}*/
function generateTreatments(evidenceTreatments)
{
    var treatments = {};
    var result = [];
    console.log('evidenceTreatments ',evidenceTreatments);
    _.each(evidenceTreatments, function(item) {
        console.log('item ',item);
      //  _.each(content, function(item) {
            var _level = getLevel(item.level);
            console.log('level ', _level);
            var _treatment = treatmentsToStr(item.content);
            console.log('_treatment ', _treatment);
            var _tumorType = item.tumorType;
            console.log('_tumorType ', _tumorType);
            /*var _alterations = item.alterations.map(function(alt) {
                return alt.name;
            }).join(',');*/
            var _alterations;
            if (!treatments.hasOwnProperty(_level)) {
                treatments[_level] = {};
            }
            if (!treatments[_level].hasOwnProperty(_alterations)) {
                treatments[_level][_alterations] = {};
            }

            if (!treatments[_level][_alterations].hasOwnProperty(_treatment)) {
                treatments[_level][_alterations][_treatment] = {};
            }

            if (!treatments[_level][_alterations][_treatment].hasOwnProperty(_tumorType)) {
                treatments[_level][_alterations][_treatment][_tumorType] = {
                    articles: [],
                    tumorType: _tumorType,
                    alterations: item.alterations,
                    level: _level,
                    description: item.description,
                    treatment: _treatment
                };
            } else {
                treatments[_level][_alterations][_treatment][_tumorType].description = [treatments[_level][_alterations][_treatment][_tumorType].description, '<br/>', item.description].join();
            }
            treatments[_level][_alterations][_treatment][_tumorType].articles = _.union(treatments[_level][_alterations][_treatment][_tumorType].articles, item.articles);
       // });
    });

    _.each(_.keys(treatments).sort(levelComparator), function(level) {
        _.each(_.keys(treatments[level]).sort(), function(_alteration) {
            _.each(_.keys(treatments[level][_alteration]).sort(), function(_treatment) {
                _.each(_.keys(treatments[level][_alteration][_treatment]).sort(), function(_tumorType) {
                    var content = treatments[level][_alteration][_treatment][_tumorType];
                    result.push({
                        level: content.level,
                        variant: content.alterations.map(function(alteration) {
                            return alteration.name;
                        }),
                        treatment: _treatment,
                        pmids: content.articles.filter(function(article) {
                            return !isNaN(article.pmid);
                        }).map(function(article) {
                            return Number(article.pmid);
                        }).sort(),
                        abstracts: content.articles.filter(function(article) {
                            return _.isString(article.abstract);
                        }).map(function(article) {
                            return {
                                abstract: article.abstract,
                                link: article.link
                            };
                        }),
                        description: content.description,
                        cancerType: content.tumorType
                    });
                });
            });
        });
    });

    return result;
}

function levelComparator(a, b) {
    return LEVELS.all.indexOf(a) > LEVELS.all.indexOf(b) ? -1 : 1;
}

function getLevel(level) {
    if (level) {
        var _level = level.match(/LEVEL_(R?\d[AB]?)/);
        if (_level instanceof Array && _level.length >= 2) {
            return _level[1];
        } else {
            return level;
        }
    } else {
        return "";
    }
}

function treatmentsToStr(data) {
    if (_.isArray(data)) {
        var treatments = [];

        _.forEach(data, function(treatment) {
            treatments.push(drugToStr((treatment.drugs)));
        });

        return treatments.sort().join(', ');
    }
    else {
        return "";
    }
}

function drugToStr(data) {
    var drugs = [];

    data.forEach(function(drug) {
        drugs.push(drug.drugName);
    });

    return drugs.sort().join(' + ');
}

function getNCBIlink(pathnameOrParams) {
    return 'https://www.ncbi.nlm.nih.gov'+pathnameOrParams;
}

function createVariantMap(variantArray){
    var variantMap = {};
    if (variantArray && variantArray.length > 0) {
        variantArray.forEach(function(variant) {
            variantMap[variant.name] = variant.id;
        });
    }
    return variantMap;
}

function generateVariants(variantMap) {
    var list = [];

    if (variantMap) {
            for (var name in variantMap) {
                var variant = variantMap[name];
                var entryTypes = '';
                for (var evidenceType in variant.evidence) {
                    entryTypes += evidenceType.toLowerCase() + ': ' + variant.evidence[evidenceType] + ', ';
                }
                entryTypes = entryTypes.slice(0, -2) + '.';

                list.push(variantItem(variant.url, variant.name, entryTypes, variant.description));
            }

    } else {
        list.push(this.variantItem());
    }

    return list;
}

function variantItem(url, name, entryTypes, description) {
    var result='';

    if (url || name || entryTypes || description) {
        result += '<div className="civic-card-variant">\n' +
            '            <div className="civic-card-variant-header">\n' +
            '            <span className="civic-card-variant-name"><a href='+url+' target="_blank">'+name+'</a></span>\n' +
            '        <span className="civic-card-variant-entry-types"> Entries: '+entryTypes+'</span>\n' +
            '        </div>\n' +
            '        <div className="civic-card-variant-description summary">'+description+'</div>\n' +
            '            </div>';

    } else {
        result+='<div className="civic-card-variant">\n' +
            '            <div className="civic-card-variant-description summary">Information about the oncogenic activity of\n' +
            '        this alteration is not yet available in CIViC.\n' +
            '        </div>\n' +
            '        </div>';
    }

    return result;
}


var CALLBACK;
var MSPEC;
var ID;
function getCivicVariants(civicGenes, mutationSpecs, isCna, callback, id){
  MSPEC = mutationSpecs;
  CALLBACK = callback;
  ID = id;

  console.log('getCivicVariants id ', id);
  console.log('getCivicVariants ', civicGenes);
  console.log('mutationSpecs' , mutationSpecs);
  console.log('isCna' , isCna);
  var civicVariants = {};
  var promises = [];

if (!isCna) {
    var calledVariants = new Set([]);
    for (var i=0;i<mutationSpecs.length;i++) {
        var mutation = mutationSpecs[i];
        var geneSymbol = mutation.query.hugoSymbol;
        var geneEntry = _.filter(civicGenes,['name',geneSymbol]);
        console.log('geneEntry is ', geneEntry);
        var proteinChange = mutation.query.alteration.toUpperCase();

        console.log('geneEntry.variants ',geneEntry[0].variants);
        addCivicVariant(civicVariants,
                        geneEntry[0].variants[proteinChange],
                        // geneEntry[0].variants['L1196M'], for testable only
                        proteinChange,
                        geneSymbol,
                        geneEntry[0].id);

                }

} else {
    for (var i=0; i< civicGenes.length; i++) {
        var geneName = civicGenes[i].name;
        var geneEntry = civicGenes[i];
        console.log('geneEntry', geneEntry);
        console.log('mutationSpecs[0].query.alteration',mutationSpecs[0].query.alteration);

        var geneVariantz = geneEntry.variants;
        console.log('geneVariantz', geneVariantz);
        var geneVariants = Object.keys(geneVariantz);
        if (!_.isEmpty(geneVariants)) {
            for (var j=0; j<geneVariants.length;j++) {
                var variantName = geneVariants[j];
                // Only retrieve CNA variants
                // console.log('variantName', mutationSpecs[0].query.alteration.toUpperCase(), variantName);
                if(mutationSpecs[0].query.alteration.toUpperCase() == variantName) {
                    if (variantName == 'AMPLIFICATION' || variantName == 'DELETION') {
                        addCivicVariant(civicVariants,
                            geneVariantz[variantName],
                            variantName,
                            geneName,
                            geneEntry.id);
                    }
                }
            }
            // if (geanVariants['AMPLIFICATION'] || geanVariants['DELETION']) {
            //     addCivicVariant(civicVariants,
            //         geneEntry[0].variants[proteinChange],
            //         proteinChange,
            //         geneSymbol,
            //         geneEntry[0].id);
            //   }
            }
        }
    }
}


function addCivicVariant(variantMap, variantId, variantName, geneSymbol, geneId) {
    console.log('addCivicVariant called');
    console.log('varientMap ', variantMap);
    console.log('variendId ', variantId);
    console.log('varientName', variantName);
    console.log('geneSymbol', geneSymbol);
    console.log('geneId', geneId);

    // getVariant(variantId, variantName, geneId);
    var id  = variantId;
    var name  = variantName;
    var geneId = geneId;
    var action = new Action();
    var ds_cond = {};
    ds_cond.id = id;
    ds_cond.name = name;
    ds_cond.geneId = geneId;
    console.log('getVarient search condition', ds_cond);
    ds_cond.callback = setVarient;
    action.getVarient(ds_cond);
    // console.log('addCivicVariant get after', result);
    // if (result) {
    //     if (!variantMap[geneSymbol]) {
    //         variantMap[geneSymbol] = {};
    //     }
    //     variantMap[geneSymbol][variantName] = result;
    // }

}

function setVarient(result, props) {
    console.log('setVarient is ', result, props);
    var item = {};
    item.id = props.id;
    item.name = props.name;
    item.geneId = props.geneId;
    item.description = result.description;
    item.url = 'https://civicdb.org/#/events/genes/' + props.geneId +
    '/summary/variants/' + props.id + '/summary#variant';
    item.evidence = countEvidenceTypes(result.evidence_items);
    console.log('setVarient ', item);
    CALLBACK(item, ID, MSPEC);
}

function countEvidenceTypes(evidenceItems){
    var evidence  = {};
    evidenceItems.forEach(function (evidenceItem) {
        var evidenceType = evidenceItem.evidence_type;
        if (evidence.hasOwnProperty(evidenceType)) {
            evidence[evidenceType] += 1;
        }
        else {
            evidence[evidenceType] = 1;
        }
    });
    return evidence;
}
