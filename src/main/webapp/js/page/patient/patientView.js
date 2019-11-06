$(document).ready(function () {
    var paper = Raphael("genomicOverviewTracksContainer", 1120, 45);
    function getChmEndsPerc(chms, total) {
        var ends = [0];
        for (var i=1; i<chms.length; i++) {
            ends.push(ends[i-1]+chms[i]/total);
        }
        return ends;
    }
    var chmInfo = {
        "genomeRef": [
            {0: 0},
            {1: 249250621},
            {2: 243199373},
            {3: 198022430},
            {4: 191154276},
            {5: 180915260},
            {6: 171115067},
            {7: 159138663},
            {8: 146364022},
            {9: 141213431},
            {10: 135534747},
            {11: 135006516},
            {12: 133851895},
            {13: 115169878},
            {14: 107349540},
            {15: 102531392},
            {16: 90354753},
            {17: 81195210},
            {18: 78077248},
            {19: 59128983},
            {20: 63025520},
            {21: 48129895},
            {22: 51304566},
            {23: 155270560},
            {24: 59373566}
        ],
        "total": 3095677412,
        "perc": [
            {0: 0},
            {1: 0.08051569586476022},
            {2: 0.15907665058739007},
            {3: 0.22304404888037474},
            {4: 0.2847928200084693},
            {5: 0.34323407079858875},
            {6: 0.3985095547158387},
            {7: 0.44991628798304517},
            {8: 0.4971964152445739},
            {9: 0.5428127415622336},
            {10: 0.5865946764869182},
            {11: 0.6302059763842087},
            {12: 0.6734442978194914},
            {13: 0.7106477472336838},
            {14: 0.7453249844625609},
            {15: 0.7784458101669932},
            {16: 0.807633203094225},
            {17: 0.8338617790063201},
            {18: 0.8590831563040138},
            {19: 0.8781836552031542},
            {20: 0.8985428566353479},
            {21: 0.9140903083218288},
            {22: 0.9306632773919019},
            {23: 0.980820493191621},
            {24: 1.0000000000000002}
        ]
    };
    chmInfo.perc = getChmEndsPerc(chmInfo.genomeRef,chmInfo.total);
    chmInfo.loc2perc = function(chm,loc) {
        return chmInfo.perc[chm-1] + loc/chmInfo.total;
    };
    chmInfo.loc2xpixil = function(chm, loc, goConfig) {
        return chmInfo.loc2perc(chm,loc)*goConfig.GenomeWidth+goConfig.wideLeftText;
    };
    chmInfo.perc2loc = function(xPerc,startChm) {
        var chm;
        if (!startChm) {//binary search
            var low = 1, high = chmInfo.genomeRef.length-1, i;
            while (low <= high) {
                i = Math.floor((low + high) / 2);
                if (chmInfo.perc[i] >= xPerc)  {high = i - 1;}
                else  {low = i + 1;}
            }
            chm = low;
        } else {//linear search
            var i;
            for (i=startChm; i<chmInfo.genomeRef.length; i++) {
                if (xPerc<=chmInfo.perc[i]) break;
            }
            chm = i;
        }
        var loc = Math.round(chmInfo.total*(xPerc-chmInfo.perc[chm-1]));
        return [chm,loc];
    };
    chmInfo.xpixil2loc = function(goConfig, x, startChm) {
        var xPerc = (x-goConfig.wideLeftText)/goConfig.GenomeWidth;
        return chmInfo.perc2loc(xPerc,startChm);
    };
    chmInfo.middle = function(chm, goConfig) {
        var loc = chmInfo.genomeRef[chm]/2;
        return chmInfo.loc2xpixil(chm,loc,goConfig);
    };
    chmInfo.chmName = function(chm) {
        if (chm === 23) return "X";
        if (chm === 24) return "Y";
        return chm;
    }
    var chmName = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'
    ];

    var yRuler = 15;
    var genomeBuild = "GRCh37";
    drawLine('25', yRuler, 1090, yRuler, paper, '#f0f', 1);
    var xt = [25, 110.34663761664584, 193.62124962263348, 261.42669181319724, 326.8803892089774, 388.8281150465041, 447.42012799878904, 501.9112652620279, 552.0282001592484,
        600.3815060559676, 646.7903570761333, 693.0183349672612, 738.850955688661, 778.2866120677048, 815.0444835303146, 850.1525587770128,
        881.0911952798785, 908.8934857466993, 935.6281456822546, 955.8746745153435, 977.4554280334688, 993.9357268211386, 1011.503074035416,
        1064.6697227831182];

    var m = [67.67331880832292, 151.98394361963966, 227.52397071791538, 294.15354051108733, 357.8542521277408, 418.1241215226466, 474.66569663040843,
        526.9697327106381, 572.9245600897901, 623.5859315660505, 669.9043460216972, 715.9346453279611, 758.5687838781829, 796.6655477990097, 832.5985211536636, 865.6218770284456,
        894.9923405132889, 922.260815714477, 945.751410098799, 966.6650512744061, 985.6955774273036, 1002.7194004282773, 1038.086398409267, 1074.8348613915593];
    for (var i = 0; i < chmInfo.genomeRef.length-1; i++) {
            drawLine(xt[i], yRuler, xt[i], 5, paper, '#f0f', 1);
            paper.text(m[i], 10, chmName[i]);
            console.log('text ', m[i], 10, chmName[i]);
    }
    drawLine(1090, yRuler, 1090, 5, paper, '#f0f', 1);

    function drawLine(x1, y1, x2, y2, p, cl, width) {
        width=2;
        //console.log( 'x1 ', x1 , ' y1 ', y1, ' x2 ', x2, ' y2 ',y2, ' p ', p, ' cl ', cl, ' width ', width);
        var path = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
        var line = p.path(path);
        line.attr("stroke", cl);
        line.attr("stroke-width", width);
        line.attr("opacity", 0.5);
        line.translate(0.5, 0.5);
        return line;
    }


var _trackData = [
    {
        center: "MSKCC",
        chr: "22",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 29758989,
        entrezGeneId: 162,
        fisValue: 1.4013,
        functionalImpactScore: "",
        gene: {entrezGeneId: 162, hugoGeneSymbol: "AP1B1", type: "protein-coding"},
        keyword: "AP1B1 truncating",
        linkMsa: "",
        linkPdb: "",
        linkXvar: "",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Splice_Site",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "X48_splice",
        proteinPosEnd: 48,
        proteinPosStart: 48,
        referenceAllele: "C",
        refseqMrnaId: "NA",
        sampleId: "AdCC10T",
        startPosition: 29758989,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 37,
        tumorRefCount: 63,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "G",
        variantType: "SNP"
    },{
        center: "MSKCC",
        chr: "1",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 11194409,
        entrezGeneId: 2475,
        fisValue:1.4013,
        functionalImpactScore: "",
        gene: {entrezGeneId: 2475, hugoGeneSymbol: "MTOR", type: "protein-coding"},
        keyword: "MTOR R1749 missense",
        linkMsa: "",
        linkPdb: "",
        linkXvar: "",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Missense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "R1749G",
        proteinPosEnd: 1749,
        proteinPosStart: 1749,
        referenceAllele: "G",
        refseqMrnaId: "NM_004958.3",
        sampleId: "AdCC10T",
        startPosition: 11194409,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 15,
        tumorRefCount: 85,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "C",
        variantType: "SNP"
    },{
        center: "MSKCC",
        chr: "NA",
        endPosition: -1,
        entrezGeneId: 4602,
        fisValue: -1,
        functionalImpactScore: "NA",
        gene: {entrezGeneId: 4602, hugoGeneSymbol: "MYB", type: "protein-coding"},
        keyword: "MYB MYB-NFIB Fusion",
        linkMsa: "NA",
        linkPdb: "NA",
        linkXvar: "NA",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "NA",
        mutationType: "Fusion",
        ncbiBuild: "NA",
        normalAltCount: -1,
        normalRefCount: -1,
        patientId: "AdCC10T",
        proteinChange: "MYB-NFIB Fusion",
        proteinPosEnd: -1,
        proteinPosStart: -1,
        referenceAllele: "NA",
        refseqMrnaId: "NA",
        sampleId: "AdCC10T",
        startPosition: -1,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: -1,
        tumorRefCount: -1,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "NA",
        variantAllele: "",
        variantType: "NA"
    },{
        center: "MSKCC",
        chr: "15",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 52643623,
        entrezGeneId: 4644,
        fisValue:1.4013,
        functionalImpactScore: "",
        gene: {entrezGeneId: 4644, hugoGeneSymbol: "MYO5A", type: "protein-coding"},
        keyword: "MYO5A R1226 missense",
        linkMsa: "",
        linkPdb: "",
        linkXvar: "",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Missense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "R1226H",
        proteinPosEnd: 1226,
        proteinPosStart: 1226,
        referenceAllele: "C",
        refseqMrnaId: "NM_000259.3",
        sampleId: "AdCC10T",
        startPosition: 52643623,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 36,
        tumorRefCount: 64,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "T",
        variantType: "SNP"
    },{
        center: "MSKCC",
        chr: "NA",
        endPosition: -1,
        entrezGeneId: 4781,
        fisValue: -1,
        functionalImpactScore: "NA",
        gene: {entrezGeneId: 4781, hugoGeneSymbol: "NFIB", type: "protein-coding"},
        keyword: "NFIB MYB-NFIB Fusion",
        linkMsa: "NA",
        linkPdb: "NA",
        linkXvar: "NA",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "NA",
        mutationType: "Fusion",
        ncbiBuild: "NA",
        normalAltCount: -1,
        normalRefCount: -1,
        patientId: "AdCC10T",
        proteinChange: "MYB-NFIB Fusion",
        proteinPosEnd: -1,
        proteinPosStart: -1,
        referenceAllele: "NA",
        refseqMrnaId: "NA",
        sampleId: "AdCC10T",
        startPosition: -1,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: -1,
        tumorRefCount: -1,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "NA",
        variantAllele: "",
        variantType: "NA",
    },{
        center: "MSKCC",
        chr: "15",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 28483865,
        entrezGeneId: 8924,
        fisValue: 2.25,
        functionalImpactScore: "M",
        gene: {entrezGeneId: 8924, hugoGeneSymbol: "HERC2", type: "protein-coding"},
        keyword: "HERC2 R1211 missense",
        linkMsa: "getma.org/?cm=msa&ty=f&p=HERC2_HUMAN&rb=1209&re=1283&var=R1211C",
        linkPdb: "getma.org/pdb.php?prot=HERC2_HUMAN&from=1209&to=1283&var=R1211C",
        linkXvar: "getma.org/?cm=var&var=hg19,15,28483865,G,A&fts=all",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Missense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "R1211C",
        proteinPosEnd: 1211,
        proteinPosStart: 1211,
        referenceAllele: "G",
        refseqMrnaId: "NM_004667.5",
        sampleId: "AdCC10T",
        startPosition: 28483865,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 7,
        tumorRefCount: 93,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "A",
        variantType: "SNP",
    },{
        center: "MSKCC",
        chr: "2",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 198267483,
        entrezGeneId: 23451,
        fisValue: 3.805,
        functionalImpactScore: "H",
        gene: {entrezGeneId: 23451, hugoGeneSymbol: "SF3B1", type: "protein-coding"},
        keyword: "SF3B1 R625 missense",
        linkMsa: "getma.org/?cm=msa&ty=f&p=SF3B1_HUMAN&rb=458&re=657&var=R625H",
        linkPdb: "NA",
        linkXvar: "getma.org/?cm=var&var=hg19,2,198267483,C,T&fts=all",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Missense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "R625H",
        proteinPosEnd: 625,
        proteinPosStart: 625,
        referenceAllele: "C",
        refseqMrnaId: "NM_012433.2",
        sampleId: "AdCC10T",
        startPosition: 198267483,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 36,
        tumorRefCount: 64,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "T",
        variantType: "SNP",
    },{
        center: "MSKCC",
        chr: "5",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 167988433,
        entrezGeneId: 79646,
        fisValue: 3.745,
        functionalImpactScore: "H",
        gene: {entrezGeneId: 79646, hugoGeneSymbol: "PANK3", type: "protein-coding"},
        keyword: "PANK3 I301 missense",
        linkMsa: "getma.org/?cm=msa&ty=f&p=PANK3_HUMAN&rb=12&re=367&var=I301F",
        linkPdb: "getma.org/pdb.php?prot=PANK3_HUMAN&from=12&to=367&var=I301F",
        linkXvar: "getma.org/?cm=var&var=hg19,5,167988433,T,A&fts=all",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Missense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "I301F",
        proteinPosEnd: 301,
        proteinPosStart: 301,
        referenceAllele: "T",
        refseqMrnaId: "NM_024594.3",
        sampleId: "AdCC10T",
        startPosition: 167988433,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 13,
        tumorRefCount: 87,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "A",
        variantType: "SNP",
    },{
        center: "MSKCC",
        chr: "17",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 30351758,
        entrezGeneId: 114659,
        fisValue:1.4013,
        functionalImpactScore: "",
        gene: {entrezGeneId: 114659, hugoGeneSymbol: "LRRC37B", type: "protein-coding"},
        keyword: "LRRC37B L570 missense",
        linkMsa: "",
        linkPdb: "",
        linkXvar: "",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Missense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "L570I",
        proteinPosEnd: 570,
        proteinPosStart: 570,
        referenceAllele: "C",
        refseqMrnaId: "NM_052888.2",
        sampleId: "AdCC10T",
        startPosition: 30351758,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 9,
        tumorRefCount: 91,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "A",
        variantType: "SNP"
    },{
        center: "MSKCC",
        chr: "2",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 205990357,
        entrezGeneId: 117583,
        fisValue:1.4013,
        functionalImpactScore: "",
        gene: {entrezGeneId: 117583, hugoGeneSymbol: "PARD3B", type: "protein-coding"},
        keyword: "PARD3B truncating",
        linkMsa: "",
        linkPdb: "",
        linkXvar: "",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Nonsense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "R444*",
        proteinPosEnd: 444,
        proteinPosStart: 444,
        referenceAllele: "C",
        refseqMrnaId: "NM_205863.3",
        sampleId: "AdCC10T",
        startPosition: 205990357,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 27,
        tumorRefCount: 73,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "T",
        variantType: "SNP"
    },{
        center: "MSKCC",
        chr: "23",
        driverFilter: "",
        driverFilterAnnotation: "",
        driverTiersFilter: "",
        driverTiersFilterAnnotation: "",
        endPosition: 71359543,
        entrezGeneId: 340527,
        fisValue:1.4013,
        functionalImpactScore: "",
        gene: {entrezGeneId: 340527, hugoGeneSymbol: "NHSL2", type: "protein-coding"},
        keyword: "NHSL2 truncating",
        linkMsa: "",
        linkPdb: "",
        linkXvar: "",
        molecularProfileId: "acbc_mskcc_2015_mutations",
        mutationStatus: "SOMATIC",
        mutationType: "Nonsense_Mutation",
        ncbiBuild: "GRCh37",
        patientId: "AdCC10T",
        proteinChange: "Y484*",
        proteinPosEnd: 484,
        proteinPosStart: 484,
        referenceAllele: "C",
        refseqMrnaId: "NA",
        sampleId: "AdCC10T",
        startPosition: 71359543,
        studyId: "acbc_mskcc_2015",
        tumorAltCount: 33,
        tumorRefCount: 67,
        uniquePatientKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        uniqueSampleKey: "QWRDQzEwVDphY2JjX21za2NjXzIwMTU",
        validationStatus: "Unknown",
        variantAllele: "A",
        variantType: "SNP"
    }

];

var sel = {
    nRows: 1, canvasWidth: 1056, wideLeftText: 25, wideRightText: 35, GenomeWidth: 996,
    GenomeWidth: 996,canvasWidth: 1056,
    cnLengthTh: 50000,
    cnTh: [0.2, 1.5],
    nRows: 1,
    pixelsPerBinMut: 3,
    rowHeight: 20,
    rowMargin: 5,
    ticHeight: 10,
    wideLeftText: 25,
    wideRightText: 35,

};
sel.xRightText = function() {
    return sel.wideLeftText + sel.GenomeWidth+5;
};
sel.yRow = function(row) {
    return 2*sel.rowMargin+sel.ticHeight+row*(sel.rowHeight+sel.rowMargin);
};
sel.getCnColor = function(cnValue) {
    if (cnValue>=sel.cnTh[1])
        return "#f00";
    if (cnValue<=-sel.cnTh[1])
        return "#00f";
    var c = Math.round(255*(sel.cnTh[1]-Math.abs(cnValue))/(sel.cnTh[1]-sel.cnTh[0]));
    if (cnValue<0)
        return "rgb("+c+","+c+",255)";
    else
        return "rgb(255,"+c+","+c+")";
};
sel.canvasHeight = function() {
    return 2*sel.rowMargin+sel.ticHeight+sel.nRows*(sel.rowHeight+sel.rowMargin);
};

// --- chromsomes end --- //>

// --- mutation events bar chart ---
//_.each(this.props.sampleManager.samples, (sample: ClinicalDataBySampleId) => {
    //if (mutSamples[sample.id]) {
    var rowIndex=0;
for(var i=0;i<10;i++) {
    plotMuts(paper, sel, chmInfo, rowIndex, _trackData, 'AdCC10T');
    rowIndex = rowIndex + 1;
}
    //};
//});
// --- end of mutation events bar chart ---
function plotMuts(p, config,chmInfo,row, mutations ,caseId) {
    console.log('call plotMuts ');
    var pixelMap=[];
    pixelMap[78]=["SLC27A3: G111D"];
    pixelMap[123]=["ZFP36L2: C174Sfs*302"];
    pixelMap[249]=["SI: V109I"];
    pixelMap[519]=["PRKDC: X133_splice"];
    pixelMap[708]=["KMT2D: V5208Wfs*35"];
    pixelMap[711]=["KRT85: G85R"];
    pixelMap[1056]=["ENOX2: H250Q"];
    var maxCount = 5; // set max height to 5 mutations
    //2*sel.rowMargin+sel.ticHeight+row*(sel.rowHeight+sel.rowMargin
    //2*5+10+row*(20+5)
    //config.rowHeight=20
    var yRow = config.yRow(row)+config.rowHeight;
    $.each(pixelMap, function(i, arr) {
        var pixil = i;
        if (arr) {
            console.log(i);
            var h = arr.length>maxCount ? config.rowHeight : (config.rowHeight*arr.length/maxCount);
            var r = p.rect(pixil,yRow-h,config.pixelsPerBinMut,h);
            r.attr("fill","#0f0");
            r.attr("stroke", "#0f0");
            r.attr("stroke-width", 1);
            r.attr("opacity", 0.5);
            r.translate(0.5, 0.5);
            console.log(r.node, arr.join("</br>"));
            //addToolTip(r.node, arr.join("</br>"), 100, '');
        }
    });

    /*if (caseId!==null) {
        //var label = caseMetaData.label[caseId]; //TODO: needed for patient view
        var label = "MUT";
        //var c = p.circle(12,yRow-config.rowHeight/2,6).attr({'stroke':caseMetaData.color[caseId], 'fill':caseMetaData.color[caseId]}); //TODO: needed for patient view
        var t = p.text(12,yRow-config.rowHeight/2,label).attr({'text-anchor': 'center', 'fill':'black'});
        t.node.setAttribute('id','mutTrack' + caseId);
        //addToolTip(c.node, caseMetaData.tooltip[caseId],false,{my:'middle left',at:'middle right'}); //TODO: needed for patient view
        //addToolTip(t.node, caseMetaData.tooltip[caseId],false,{my:'middle left',at:'middle right'}); //TODO: needed for patient view
        console.log(" t is ", t);
    }
    else {
        console.log(0,yRow-config.rowHeight/2,'MUT').attr({'text-anchor': 'start'});
        p.text(0,yRow-config.rowHeight/2,'MUT').attr({'text-anchor': 'start'});
    }
    var t = p.text(config.xRightText(),yRow-config.rowHeight/2,mutations.length).attr({'text-anchor': 'start','font-weight': 'bold'});
    console.log(t);
    //underlineText(t,p);
    var tip =  "Number of mutation events.";
    //addToolTip(t.node,tip,null,{my:'top right',at:'bottom left'});*/

}
function translateChm(chm) {
    if (chm.toLowerCase().indexOf("chr")===0) chm=chm.substring(3);
    if (chm==='X'||chm==='x') chm = 23;
    if (chm==='Y'||chm==='y') chm = 24;
    if (isNaN(chm) || chm < 1 || chm > 24) return null;
    return parseInt(chm);
}

});
