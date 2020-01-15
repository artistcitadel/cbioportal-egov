
$(document).ready(function () {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    // $(document.body).click(function(e) {
    //     console.log(e.target);
    // });
    var PINFO;

    $("#pat_inquiry").on("click",function(){
        var v = $.trim(document.patientsearchform.search_PAT.value);
        if(v.length!=10){alert('10자리수를 입력하세요');return;}
        document.location.href='/pmp/patient/patientView?RESCH_PAT_ID='+v;
    });

    $("#cview").on("click",function(){
      document.pform.action='patientSample';
        moveTab();
    });
    $("#sview").on("click",function(){
        document.pform.action='patientResemble';
        moveTab();
    });

    var moveTab = function(){
        console.log('SAMPLES ', SAMPLES);
        document.pform.samples.value=SAMPLES.join(",");
        document.pform.samplenames.value=SAMPLENAMES.join(",");
        console.log(document.pform.samples.value);
        document.pform.target = "_blank";
        console.log('SAMPLEPERMUTATION',SAMPLEPERMUTATION);
        var samplespermutation = Object.values(SAMPLEPERMUTATION).join(",");
        document.pform.samplespermutation.value=samplespermutation;

        document.pform.mutationcount.value=MUTATIONCOUNT;
        document.pform.sex.value=SEX;
        document.pform.age.value=AGE;
        document.pform.cancertype.value=CANCERTYPE;
        document.pform.cancertypedetail.value=CANCERTYPEDETAIL;
        document.pform.oncotreecode.value=ONCOTREECODE;
        document.pform.submit();
    }

    $("#patientage").on("mouseover", "[id='patienthead']", function (e) {
        var id = e.target.id;
        var prop = {};
        prop.sex = SEX;
        prop.age = AGE;
        prop.samplecount = SAMPLES.length;
        
        var patientInfo = new PatientInfo();
        if(_.isUndefined(PINFO)) {
            PINFO = $('#' + id + '').tooltipster({
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: true,
                content: patientInfo.init(prop)
            });
        }
        $('#'+id+'').tooltipster('open');
    });

    // $("#divsample").on("mouseover", function (e) {
    //     //console.log($(this).find('svg').attr('id'));
    //     loadSampleAttr($(this).find('svg').attr('id'));
    // });

    // $("#divsample").on('click', function (e) {
    $("#divsample").on("click", "[id^='samplespan_']", function (e) {
        // var id = $(this).find('text').attr('id');
        var id = e.target.id;
        document.pform.sampleId.value = id.split("_")[1];
        // alert(document.pform.sampleId.value);
        document.pform.submit();
    });

    $("#divsample").on("mouseover", "[id^='samplelabel_']", function (e) {
    	var id = e.target.id;
    	loadSampleAttr(id);
    });
    /*$("#MUTATIONS_con").on("mouseover", "[id^='samplelabel_']", function (e) {
        var id = e.target.id;
        loadSampleAttr(id);
    });
    $("#CNV_con").on("mouseover", "[id^='samplelabel_']", function (e) {
        var id = e.target.id;
        loadSampleAttr(id);
    });
    $("#SV_con").on("mouseover", "[id^='samplelabel_']", function (e) {
        var id = e.target.id;
        loadSampleAttr(id);
    });*/
    var loadSampleAttr = function(id){
        // console.log('loadSampleAtrr called');
        var prop = {};
        prop.id = id;
        prop.cancertype = CANCERTYPE;
        prop.cancertypedetail = CANCERTYPEDETAIL;
        prop.oncotreecode = ONCOTREECODE;

        var sname = PATIENTID+"_"+SAMPLENAMES[parseInt(id.split("_")[2])-1];
        prop.sname=sname;
        var patientAttr = new PatientAttr();
        $('#'+id+'').tooltipster({
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
            arrow: true,
            //content: patientAttr.init(id,sname)
            content: patientAttr.init(prop)
        });
        $('#'+id+'').tooltipster('open');
        /*$('#'+id+'').tooltipster({
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
            arrow: true,
            content:  'Loading...',
            functionBefore: function(instance, helper) {
                //var $origin = $(helper.origin);
                //if ($origin.data('ajax') !== 'cached') {
                    instance.content(patientAttr.init(id, prop));
                  //  $origin.data('ajax', 'cached');
                //}
            },
            functionAfter: function(instance) {

            }
        });
        $('#'+id+'').tooltipster('open');*/
    }

    //console.log('localStorage["digcategory"]) ',localStorage["digcategory"]);
    var digcategory=[];
    if(!_.isUndefined(localStorage["digcategory"]))
        digcategory = JSON.parse(localStorage.getItem("digcategory"));
    else{
        var item = {};
        item.idd = 'TISSUE';item.pid='SPECIMEN';digcategory.push(item);item = {};
        item.idd = 'BRC';item.pid='SPECIMEN';digcategory.push(item);item = {};
        item.idd = 'IHC';item.pid='PATHOLOGY_EXAM';digcategory.push(item);item = {};
        item.idd = 'ISH';item.pid='PATHOLOGY_EXAM';digcategory.push(item);item = {};
        item.idd = 'PCR';item.pid='PATHOLOGY_EXAM';digcategory.push(item);item = {};
        item.idd = 'SURGERY';item.pid='SURGERY';digcategory.push(item);item = {};
        item.idd = 'BIOPSY';item.pid='BIOPSY';digcategory.push(item);item = {};
        item.idd = 'CT';item.pid='IMAGING';digcategory.push(item);item = {};
        item.idd = 'MRI';item.pid='IMAGING';digcategory.push(item);item = {};
        item.idd = 'PET-CT';item.pid='IMAGING';digcategory.push(item);item = {};
        item.idd = 'UTRASONO';item.pid='IMAGING';digcategory.push(item);item = {};
        localStorage.setItem("digcategory",JSON.stringify(digcategory));
    }
    // console.log('digcategory ', digcategory);
    var cindex = [];
    var action = new Action();
    var util = new Util();
    var ds_cond = {};
    ds_cond.data = {"queryId": "selectPatientCategory"};
    ds_cond.callback = setCategory;
    action.selectList(ds_cond);
    var CATE_TREE=[];

    function setCategory(json){
        CATE_TREE = json;
        var txt = '';
        // console.log(" category rawdata is ", json);
        var data  = util.arrayToTree(json);
        // console.log('category tree data ',data);

        for (var i=0; i<data.length; i++) {
            var checked = '';
            if( _.findIndex(digcategory, function(o) {return o.idd === data[i].id;} ) !== -1){
                checked = 'checked';
            }
            txt += '<tr>' ;
            if(data[i].data.length==0) txt +='<td><input type="checkbox" id="catechk_' + data[i].id + '" ' + checked + '/></td>' ;
            else txt += '<td class="active">+</td>';
            txt+=  '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].name + '</td>' +
                '</tr>';
            if(data[i].data.length>0){
                for(var j=0; j< data[i].data.length;j++){
                    checked='';
                    if( _.findIndex(digcategory, function(o) {return o.idd === data[i].data[j].id;} ) !== -1){
                        checked = 'checked';
                    }
                    txt += '<tr>' +
                        '<td><input type="checkbox" id="catechk_' + data[i].data[j].id + '" ' + checked + '/></td>' +
                        '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].data[j].id + '</td>' +
                        '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].data[j].name + '</td>' +
                        '</tr>';
                }
            }

        }

        //console.log('txt is ', txt);
        $("#cate_con").empty();
        $("#cate_con").append(txt);
    }

    $("#cate_con").on("click", "[id^='catechk_']",function (e) {
        //alert($(this).prop("checked"));
        var idd = this.id.split("_")[1];
        var idx = _.findIndex(digcategory, function(o) {return o.idd === idd;} );
        var pid = _.find(CATE_TREE, function(o){return o.id === idd;}).pid;
        if(idx===-1 && $(this).prop("checked")){
            var item = {};
            item.idd=idd;
            item.pid = pid;
            digcategory.push(item);
        }
        if(idx !==-1 && !$(this).prop("checked")){
            digcategory.splice(idx,1);
        }
    });

    $("#cateApply").on("click", function(e){
        localStorage.setItem("digcategory",JSON.stringify(digcategory));
        $("#contactModal .close").click();
        //console.log(digcategory);
        location.reload();
    });
});

function tabToggle(seq,id){
    if(seq===1){
        $(".oncogenicity").addClass("enable-hover-active");
        $(".mutation-effect").removeClass("enable-hover-active");
        $("#tab1_"+id+"").show();
        $("#tab2_"+id+"").hide();
        $('.oncokb-treatment-table').show();
    }
    if(seq===2){
        $(".mutation-effect").addClass("enable-hover-active");
        $(".oncogenicity").removeClass("enable-hover-active");
        $("#tab1_"+id+"").hide();
        $("#tab2_"+id+"").show();
        $('.oncokb-treatment-table').hide();
    }
}
var toggle=false;
function levelToggle(id){
    console.log(id, toggle);
    (!toggle) ? ($("#secret1_"+id+"").show(),toggle=true, $("#ardown_"+id+"").show(),$("#arup_"+id+"").hide() ) :
        ( $("#secret1_"+id+"").hide(),toggle=false, $("#arup_"+id+"").show(),$("#ardown_"+id+"").hide() )
}

var EVA;
function pmidtooltip(id, index){

    console.log('id is ', id, index);
//    console.log('EVA is ', EVA);
    var cache;
    var key = id.substring(0,id.length-1);
    for(var i=0;i<EVA.length;i++) {
        _.map(EVA[i], function (v, k) {
            //console.log(k, id);
            if ($.trim(k) === key) {
                console.log('bingo');
                cache = v.data.treatments.sensitivity;
//                console.log(' bingo ', v.data.treatments);
            }
        });
    }
    var data = cache;
    console.log(' datais ', data);
//    var abstracts = data.abstracts;
    var articles = data[index].articles;
    console.log('articles ', articles);
    var content = '<ul class="no-style-ul">';
    var abstract = '';
    var article = '';
//    console.log('abstracts is ', abstracts);

//    if(!_.isUndefined(abstracts) && abstracts.length>0) {
//        for(var i=0;i<abstracts.length;i++) {
//            abstract +=
//                '   <li class="list-group-item">\n' +
//                '    <span className="list-group-item-title"><a href="' + abstracts[i].link + '" target="_blank">' + abstracts[i].abstract + '</a></span>\n' +
//                '  </li>';
//        }
//
//    }
    if(!_.isUndefined(articles) && articles.length>0){
        for(var i=0;i<articles.length;i++){
            if(articles[i].pmid==null)continue;
            article +=
                ' <li key='+articles[i].pmid+' class="list-group-item">\n' +
                '                <a\n' +
                '                    class="list-group-item-title"\n' +
                '                    href="getNCBIlink(/pubmed/'+articles[i].pmid+')" \n' +
                '                    target="_blank"\n>' +
                '                    <b>'+articles[i].title+'</b>\n' +
                '                </a>\n' +
                '                <div class="list-group-item-content">\n' +
                '                    <span>'+articles[i].authors+''+ articles[i].reference +'.'+ articles[i].pubDate+'</span>\n' +
                // '                    <span>PMID: '+articles[i].pmid+'</span>\n' +
                '                </div>\n' +
                '                <div class="list-group-item-content">\n' +
                '                    <span>PMID: '+articles[i].pmid+'</span>\n' +
                '                </div>\n' +
                '            </li>';
        }
    }

    content+=abstract+article+'</ul>';

//    console.log(id);
    //console.log(content);

    // $('#article_'+id+'').trigger('hover');
    console.log('article-id ', id);
    //$(".tooltipstered").tooltipster('destroy');
    //var instances = $.tooltipster.instancesLatest();
    var artiletip = $('#article_'+id+'').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        interactive: true,
        distance: 0,
        content : content,
        // trigger: 'custom',
        // triggerOpen: {
        //     mouseenter: true
        // },
        // triggerClose: {
        //     mouseleave: true
        // },

    });
    artiletip.on('mouseover', function() {
        $(this).tooltipster('instance').open();
    }).on('mouseout', function() {
        //console.log($(this).find('.tooltipstered'));
        //$(this).tooltipster('instance').close();
        //$("#ann_PIK3CA_Q546H").tooltipster('close');
    });
    //$('#article_'+id+'').tooltipster('open');
    artiletip.tooltipster('open');

//     var articlebox = new jBox('Tooltip', {
//         //$(this).jBox('Tooltip', {
//         attach: '#article_' + id + '',
//         width: 350,
//         closeOnMouseleave: true,
//         animation: 'move',
//         content: content,
//         zIndex:999999,
//     });
//     articlebox.open();

    // $('#article_'+id+'').trigger('mouseover');
    // $('#article_'+id+'').trigger('mouseout');
    // addpmidToolTip(id, content, 100, '','qtip-light');
}
function addpmidToolTip(node, tip, showDelay, position, theme) {
    var theme = theme;
    if(_.isUndefined(theme)) theme = 'qtip-dark';
    var param = {
        content: {text: tip},
        show: {event: "mouseover"},
        hide: {fixed: true, delay: 100, event: "mouseout"},
        //style: {classes: ''+theme+' qtip-rounded'},
        style: {classes: ''+theme+' qtip-bootstrap'},
        position: {
            my: "bottom right",
            at: "top left",
            viewport: $("body")
        }
    };
    $('#'+node+'').qtip(param);
}

function regBrc(patientId, examNo){
    if (window.confirm("분양신청 하시겠습니까?")) {
        var eno = examNo.split("_")[0] + ' '+examNo.split("_")[1];
        console.log('regBrc ',perCode, PATIENTID, eno);
        var action = new Action();
        var ds_cond = {};
        ds_cond.data = {"queryId": "patient.insertBrc",'perCode':perCode,'patientId':patientId,'examNo':eno};
        ds_cond.callback = postRegBrc;
        action.regBrc(ds_cond);
    }

}
function postRegBrc(res){
    alert('신청되었습니다');
}
