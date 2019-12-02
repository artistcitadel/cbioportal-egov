
    function PatientViewMutationTable() {
        var self = this;
        var action;

        self.init = function (){
            action = new Action();
            getMutationCosmic();
            //$("[id^='cosmic_']").on('hover', function (e) {
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
            getMutationList();
        }

        var setCosmic = function(data){
            self.COSMIC = data;
        }
        var mutation_disposer = function(json) {
            $("#mutation_con").empty();
            // $("#mutation_template").tmpl(page.model).appendTo($("#mutation_con"));
            setMutation(json);
            buildRowsMutation(json);
            buildSort();

            $("[id^='cosmic_']").trigger('hover');
        }

        var buildCosmic = function(count, geneNm, protein, data) {
            //console.log('buildCosmic ', data);
            var str = '<div class="text-dark font-msmall"><strong>' + count + '</strong> occurrences of <strong>' + geneNm + ' ' + protein + '</strong> missense mutations in COSMIC';
            str += '<table id="stats" class="table table-striped table-bordered">\n' +
                ' <thead>\n' +
                ' <tr>\n' +
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

        self.mutation = [];

        var setMutation = function(data) {
            self.mutation = data;
            //console.log('PatientViewMutationTable ', self.getMutation());
        }

        var getMutation = function() {
            return self.mutation;
        }

        buildRowsMutation = function(json) {
            console.log('buildRowMutation called');
            var txt = '';
            _.forEach(json, function (v) {
                txt += '<tr><td><span font-msmall">' + v.geneNm + '</span></td>\n' +
                    '<td><span class="font-msmall">' + v.geneExamMthNm + '</span></td>\n' +
                    '    <td><span class="font-msmall" style="white-space: nowrap;">' + v.hgvspVal + '</span></td>\n' +
                    '    <td><span style="display: flex; min-width: 100px;">\n' +
                    '        <span>\n' +
                    '            <i class="oncokb annotation-icon oncogenic level-3A" >\n' +
                    '            </i></span></span></td> \n' +
                    '    <td><span class="font-msmall">' + v.chrnNo + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.geneVariStLocVal + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.geneVariEndLocVal + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.refAlleleSqncVal + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.variAlleleSqncVal + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.ms + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.geneVariClsfNm + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.variAlleleReadRt + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.variAlleleReadCnt + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.refAlleleReadCnt + '</span></td>\n' +
                    '    <td><span class="font-msmall">' + v.copy + '</span></td>\n' +
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
                    '        <div id="cosmic_' + v.mttnExamRsltId + '" data-gene-nm="' + v.geneNm + '" data-protein="' + v.hgvspVal + '">' + null2str(v.cosmic) + '</div>\n' +
                    '    </td>\n' +
                    '</tr>';
            });
            //console.log(txt);
            $("#mutation_con").html(txt);

            //var gene = new GenomicOverview(LASTYPOS);
            var gene = new GenomicOverview();
            gene.init(getMutation());
            ISROUNDMUTATION = true;

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

                $table3.children('tbody').html(self.buildRowsMutation(rows));
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