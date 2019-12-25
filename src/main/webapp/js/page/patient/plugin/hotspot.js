function Hotspot(){
    var self = this;
    self.init = function(){
        var txt ='';
        txt+='<span class="hotspot-info">\n' +
            '<span>\n' +
            '<b>Recurrent Hotspot</b> \n' +
            '    <span>and</span> \n' +
            '    <b>3D Clustered Hotspot</b> \n' +
            '</span>\n' +
            '    <br>\n' +
            '    <span>This mutated amino acid was identified as a recurrent hotspot (statistically significant) and a 3D clustered hotspot in a\n' +
            '    population-scale cohort of tumor samples of various cancer types using methodology based in part on \n' +
            '    <a href="https://www.ncbi.nlm.nih.gov/pubmed/26619011" target="_blank">Chang et al., Nat Biotechnol, 2016</a> and\n' +
            '    <a href="http://genomemedicine.biomedcentral.com/articles/10.1186/s13073-016-0393-x" target="_blank">Gao et al., Genome Medicine, 2017</a>.\n' +
            '</span>\n' +
            '    <br><br>\n' +
            '    <span>Explore all mutations at <a href="https://www.cancerhotspots.org/" target="_blank">https://cancerhotspots.org/</a> \n' +
            '        and <a href="https://www.3dhotspots.org/" target="_blank">https://3dhotspots.org/</a>.\n' +
            '    </span>\n' +
            '</span>';
        return txt;
    }
}