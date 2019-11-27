// getMutationCosmic();
    function getMutationList() {
        console.log("getMutation");
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientMuList", "patientId": PATIENTID};
        ds_cond.callback = mutation_disposer;
        action.selectPatientMuList(ds_cond);
    }

    function getMutationCosmic(){
        var ds_cond = {};
        ds_cond.data = {"queryId": "selectPatientMuCosmic", "patientId": PATIENTID};
        ds_cond.callback = cosmic_disposer;
        action.selectPatientMuList(ds_cond);
    }
    var COSMIC;
    function cosmic_disposer(json){
        COSMIC = json;
        console.log("COSMIC ", COSMIC);
        getMutationList();
    }
    function mutation_disposer(json) {
        // $("#mutation_con").empty();
        // $("#mutation_template").tmpl(page.model).appendTo($("#mutation_con"));
        setMutation(json);
        buildRowsMutation(json);
        buildSort();

        // $("[id^='cosmic_']").on('mouseenter mouseleave', function () {
        //     $(this).addClass('active').html('Wait...');
        // });

       /* $("[id^='cosmic_']").on('mouseleave', function (e) {
           // $(this).removeClass('active').html('Wait...');
        });*/

        // $("[id^='cosmic_']").jBox('Tooltip', {
        //     width: 300,
        //     closeOnMouseleave: true,
        //     //animation: 'move',
        //     content: setCosmicToolTip
        // });
        // function setCosmicToolTip(){
        //     console.log('abc');
        // }

        $("[id^='cosmic_']").on('hover', function (e) {
            var id = e.target.id;
            var count = $(this).text();
            var geneNm =$(this).data("geneNm");
            var protein =$(this).data("protein");
            var temp = getCosmic(id.split("_")[1]);
            var cosmic = buildCosmic(count,geneNm, protein,temp);

            new jBox('Tooltip', {
            //$(this).jBox('Tooltip', {
                attach: '#'+id+'',
                width: 290,
                closeOnMouseleave: true,
                animation: 'move',
                content: cosmic
            });
        });
        $("[id^='cosmic_']").trigger('hover');
    }

    function buildCosmic(count,geneNm, protein, data){
        console.log('buildCosmic ', data);
        var str = '<div className="rc-tooltip-arrow-inner"><div class="font-msmall"><strong>'+count+'</strong> occurrences of <strong>'+geneNm+' '+protein+'</strong> missense mutations in COSMIC</div>';
            str+='<table id="t-3" class="simple-table table table-striped table-border-top sortable">\n' +
                 ' <thead>\n' +
                 ' <tr>\n' +
                 ' <th data-sort=\'{"key":"csmcId"}\'  role="button"><span class="font-msmall">COSMIC ID</span></th>\n' +
                 ' <th data-sort=\'{"key":"hgvspVal"}\' role="button"><span class="font-msmall">Protein Change</span></th>\n' +
                 ' <th data-sort=\'{"key":"geneVariOccurCnt"}\' role="button"><span class="font-msmall">Occurence</span></th>\n' +
                 ' </tr>\n' +
                 ' </thead>\n' +
                 ' <tbody id="cosmic_con">\n';

        _.forEach(data, function(v) {
            str +='<tr><td><span class="mutation-table-gene-column font-msmall" style="cursor:pointer;color:blue;" onClick="moveSanger('+v.csmcId+')">'+v.csmcId+'</span></td>\n' +
                  '<td><span data-test="mutation-table-gene-column class="font-msmall">'+v.hgvspVal+'</span></td>\n' +
                  '<td><span data-test="mutation-table-gene-column class="font-msmall">'+count+'</span></td>\n' +
                  '</tr>\n';
        });

            str+=' </tbody>\n' +
                 ' </table></div>';
        return str;
    }

    function getCosmic(id){
        console.log('geneExamMthNm ', id);
        console.log(COSMIC);
        var item = _.filter(COSMIC, function(v){
           return id === v.mttnExamRsltId;
        });
        console.log('result ' , item);
        return item;
    }

    var mutation=[];
    function setMutation(data){
        mutation = data;
    }
    function getMutation(){
        return mutation;
    }
    function buildRowsMutation(json){
        console.log('buildRowMutation called');
        var txt = '';
        _.forEach(json, function(v) {
            txt +='<tr><td><span class="mutation-table-gene-column">'+v.geneNm+'</span></td>\n' +
                '<td><span data-test="mutation-table-gene-column">'+v.geneExamMthNm+'</span></td>\n' +
                '    <td><span class="proteinChange-module__proteinChange__2xJ_V" style="white-space: nowrap;">'+v.hgvspVal+'</span></td>\n' +
                '    <td><span style="display: flex; min-width: 100px;">\n' +
                '        <span class="annotation-module_annotation-item__2EgnB">\n' +
                '            <i class="oncokb annotation-icon oncogenic level-3A" data-test="oncogenic-icon-image" data-test2="NRAS">\n' +
                '            </i></span><span class="annotation-module__annotation-item__1YzCz">\n' +
                '        </span></span>\n' +
                '    </td>\n' +
                '    <td><span data-test="mutation-table-gene-column">'+v.chrnNo+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.geneVariStLocVal+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.geneVariEndLocVal+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.refAlleleSqncVal+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.variAlleleSqncVal+'</span></td>\n' +
                '    <td><span class="mutationStatus-module__unknown__mbYor">'+v.ms+'</span></td>\n' +
                '    <td><span class="proteinChange-module__proteinChange__2xJ_V">'+v.geneVariClsfNm+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.variAlleleReadRt+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.variAlleleReadCnt+'</span></td>\n' +
                '    <td><span class="mutation-table-gene-column">'+v.refAlleleReadCnt+'</span></td>\n' +
                '    <td><span class="mutationStatus-module__unknown__mbYor">'+v.copy+'</span></td>\n' +
                '    <td>\n' +
                '        <div>\n' +
                '            <svg width="71" height="12">\n' +
                '                <text x="36" y="9.5" text-anchor="start" font-size="10">10.5%</text>\n' +
                '                <rect y="2" width="30" height="8" fill="#ccc"></rect>\n' +
                '                <rect y="2" width="3.1578947368421053" height="8" fill="lightgreen"></rect>\n' +
                '                <rect y="2" width="2.3684210526315788" height="8" fill="green"></rect>\n' +
                '            </svg>\n' +
                '        </div>\n' +
                '    </td>\n' +
                '    <td>\n' +
                '        <div class="styles-module__integer-data__1Bn0H" id="cosmic_'+v.mttnExamRsltId+'" data-gene-nm="'+v.geneNm+'" data-protein="'+v.hgvspVal+'">'+v.cosmic+'</div>\n' +
                '    </td>\n' +
                '</tr>';
        });
        //console.log(txt);
        $("#mutation_con").html(txt);

        var gene = new GenomeOverView(LASTYPOS);
        gene.init();
    }

    function buildSort(){
        var $table3 = $('#t-3');
        var rows = getMutation();
        var $headers = $table3.find('thead th').slice(0);
        $headers
            .wrapInner('<a href="#"></a>')
            .addClass('sort');

        $headers.on('click', function(event) {
            event.preventDefault();
            var $header = $(this),
                sortKey = $header.data('sort').key,
                sortDirection = 1;

            if ($header.hasClass('sorted-asc')) {
                sortDirection = -1;
            }

            rows.sort(function(a, b) {
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

function moveSanger(id){
    window.open('https://cancer.sanger.ac.uk/cosmic/mutation/overview?id='+id+'');
}