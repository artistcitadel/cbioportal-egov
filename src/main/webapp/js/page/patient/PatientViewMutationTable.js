
    function PatientViewMutationTable() {
        var self = this;
        self.init = function (){
            self.getMutationCosmic();
        }
        self.getMutationList = function() {
            console.log("getMutation");
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPatientMuList", "patientId": PATIENTID};
            ds_cond.callback = self.mutation_disposer;
            action.selectPatientMuList(ds_cond);
        }

        self.getMutationCosmic = function() {
            var ds_cond = {};
            ds_cond.data = {"queryId": "selectPatientMuCosmic", "patientId": PATIENTID};
            ds_cond.callback = self.cosmic_disposer;
            action.selectPatientMuList(ds_cond);
        }

        self.COSMIC;

        self.cosmic_disposer = function(json) {
            COSMIC = json;
            console.log("COSMIC ", self.COSMIC);
            self.getMutationList();
        }

        self.mutation_disposer = function(json) {
            // $("#mutation_con").empty();
            // $("#mutation_template").tmpl(page.model).appendTo($("#mutation_con"));
            self.setMutation(json);
            self.buildRowsMutation(json);
            self.buildSort();

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
                var geneNm = $(this).data("geneNm");
                var protein = $(this).data("protein");
                var temp = self.getCosmic(id.split("_")[1]);
                var cosmic = self.buildCosmic(count, geneNm, protein, temp);

                new jBox('Tooltip', {
                    //$(this).jBox('Tooltip', {
                    attach: '#' + id + '',
                    width: 290,
                    closeOnMouseleave: true,
                    animation: 'move',
                    content: cosmic
                });
            });
            $("[id^='cosmic_']").trigger('hover');
        }

        self.buildCosmic = function(count, geneNm, protein, data) {
            console.log('buildCosmic ', data);
            var str = '<div className="rc-tooltip-arrow-inner"><div class="font-msmall"><strong>' + count + '</strong> occurrences of <strong>' + geneNm + ' ' + protein + '</strong> missense mutations in COSMIC</div>';
            str += '<table id="t-3" class="simple-table table table-striped table-border-top sortable">\n' +
                ' <thead>\n' +
                ' <tr>\n' +
                ' <th data-sort=\'{"key":"csmcId"}\'  role="button"><span class="font-msmall">COSMIC ID</span></th>\n' +
                ' <th data-sort=\'{"key":"hgvspVal"}\' role="button"><span class="font-msmall">Protein Change</span></th>\n' +
                ' <th data-sort=\'{"key":"geneVariOccurCnt"}\' role="button"><span class="font-msmall">Occurence</span></th>\n' +
                ' </tr>\n' +
                ' </thead>\n' +
                ' <tbody id="cosmic_con">\n';

            _.forEach(data, function (v) {
                str += '<tr><td><span class="mutation-table-gene-column font-msmall" style="cursor:pointer;color:blue;" onClick="self.moveSanger(' + v.csmcId + ')">' + v.csmcId + '</span></td>\n' +
                    '<td><span data-test="mutation-table-gene-column class="font-msmall">' + v.hgvspVal + '</span></td>\n' +
                    '<td><span data-test="mutation-table-gene-column class="font-msmall">' + count + '</span></td>\n' +
                    '</tr>\n';
            });

            str += ' </tbody>\n' +
                ' </table></div>';
            return str;
        }

        self.getCosmic = function(id) {
            console.log('geneExamMthNm ', id);
            console.log(self.COSMIC);
            var item = _.filter(self.COSMIC, function (v) {
                return id === v.mttnExamRsltId;
            });
            console.log('result ', item);
            return item;
        }

        self.mutation = [];

        self.setMutation = function(data) {
            self.mutation = data;
            //console.log('PatientViewMutationTable ', self.getMutation());
        }

        self.getMutation = function() {
            return self.mutation;
        }

        self.buildRowsMutation = function(json) {
            console.log('buildRowMutation called');
            var txt = '';
            _.forEach(json, function (v) {
                txt += '<tr><td><span class="mutation-table-gene-column font-msmall">' + v.geneNm + '</span></td>\n' +
                    '<td><span data-test="mutation-table-gene-column font-msmall">' + v.geneExamMthNm + '</span></td>\n' +
                    '    <td><span class="proteinChange-module__proteinChange__2xJ_V font-msmall" style="white-space: nowrap;">' + v.hgvspVal + '</span></td>\n' +
                    '    <td><span style="display: flex; min-width: 100px;">\n' +
                    '        <span class="annotation-module_annotation-item__2EgnB">\n' +
                    '            <i class="oncokb annotation-icon oncogenic level-3A" data-test="oncogenic-icon-image" data-test2="NRAS">\n' +
                    '            </i></span><span class="annotation-module__annotation-item__1YzCz">\n' +
                    '        </span></span>\n' +
                    '    </td>\n' +
                    '    <td><span data-test="mutation-table-gene-column font-msmall">' + v.chrnNo + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.geneVariStLocVal + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.geneVariEndLocVal + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.refAlleleSqncVal + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.variAlleleSqncVal + '</span></td>\n' +
                    '    <td><span class="mutationStatus-module__unknown__mbYor">' + v.ms + '</span></td>\n' +
                    '    <td><span class="proteinChange-module__proteinChange__2xJ_V font-msmall">' + v.geneVariClsfNm + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.variAlleleReadRt + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.variAlleleReadCnt + '</span></td>\n' +
                    '    <td><span class="mutation-table-gene-column font-msmall">' + v.refAlleleReadCnt + '</span></td>\n' +
                    '    <td><span class="mutationStatus-module__unknown__mbYor font-msmall">' + v.copy + '</span></td>\n' +
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
                    '        <div class="styles-module__integer-data__1Bn0H" id="cosmic_' + v.mttnExamRsltId + '" data-gene-nm="' + v.geneNm + '" data-protein="' + v.hgvspVal + '">' + v.cosmic + '</div>\n' +
                    '    </td>\n' +
                    '</tr>';
            });
            //console.log(txt);
            $("#mutation_con").html(txt);

            //var gene = new GenomicOverview(LASTYPOS);
            var gene = new GenomicOverview();
            gene.init(self.getMutation());
            ISROUNDMUTATION = true;

            var copytip = "Copy";
            var downloadtip = 'Download TSV';
            gene.addToolTip($('#copyButton'),copytip,null,{my:'top right',at:'bottom left'});
            gene.addToolTip($('#downloadButton'),downloadtip,null,{my:'top right',at:'bottom left'});
        }

        self.buildSort = function() {
            var $table3 = $('#t-1');
            var rows = self.getMutation();
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

                $table3.children('tbody').html(self.buildRowsMutation(rows));
            });
        }

        self.moveSanger = function(id) {
            window.open('https://cancer.sanger.ac.uk/cosmic/mutation/overview?id=' + id + '');
        }

    }