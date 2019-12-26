function CancerGenome(){
    var self = this;
    self.init = function(data) {
        // console.log(data);
        var txt='';
        txt+='<div class="rc-tooltip-inner" role="tooltip">\n' +
            '    <span><b>My Cancer Genome links:</b>\n' +
            '        <br>\n' +
            '        <ul class="myCancerGenome-module_link-list">\n';
            for(var i=0;i<data.length;i++){
               var links =  parseMyCancerGenomeLink(data[i].linkHTML);
               txt+=' <li>' +
                   '<a href='+links.url+' target="_blank">'+links.text+'</a>'
                   '</li>\n';
        }
            // '            <li><a href="http://mycancergenome.org/content/disease/colorectal-cancer/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) Mutation in Colorectal Cancer</a>\n' +
            // '            </li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/gist/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) mutation in GIST</a>\n' +
            // '            </li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/glioma/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) Mutation in Glioma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/lung-cancer/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) Mutation in Non-Small Cell Lung Cancer</a>\n' +
            // '            </li><li><a href="http://mycancergenome.org/content/disease/melanoma/braf/111/" target="_blank">BRAF c.1799_1800delTGinsAA (V600E) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/melanoma/braf/114/" target="_blank">BRAF c.1799_1800delTGinsAT (V600D) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/melanoma/braf/115/" target="_blank">BRAF c.1799T&gt;G (V600G) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/melanoma/braf/116/" target="_blank">BRAF c.1798_1799delGTinsAA (V600K) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/melanoma/braf/117/" target="_blank">BRAF c.1798G&gt;A (V600M) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/melanoma/braf/118/" target="_blank">BRAF c.1798_1799delGTinsAG (V600R) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/melanoma/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) Mutation in Melanoma</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/ovarian-cancer/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) Mutation in Ovarian Cancer</a></li>\n' +
            // '            <li><a href="http://mycancergenome.org/content/disease/thyroid-cancer/braf/54/" target="_blank">BRAF c.1799T&gt;A (V600E) Mutation in Thyroid Cancer</a></li>\n' +
            txt+='        </ul></span>\n' +
            '</div>';
            return txt;
    }

    function parseMyCancerGenomeLink(link)
    {
        var hrefStart = link.indexOf('"') + 1;
        var hrefEnd = hrefStart + link.slice(hrefStart).indexOf('"');

        var textStart = link.indexOf(">") + 1;
        var textEnd = link.indexOf("</a>");

        var href = link.slice(hrefStart, hrefEnd).trim();
        var text = link.slice(textStart, textEnd).trim();

        if (href.length > 0 && text.length > 0) {
            return {
                url: href,
                text: text
            };
        }
        else {
            return undefined;
        }
    }
}