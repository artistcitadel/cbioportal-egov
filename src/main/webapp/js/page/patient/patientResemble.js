$(document).ready(function () {

    // var pager = new Pager();
    // var el = $("#tresemble");
    // var tpage = Math.ceil(getMutation().length/10);
    // pager.buildPage(1, tpage, el, self, getMutation(), self.NODE);

    $("#cview").on("click",function(){
        document.pform.action='patientSample';
        moveTab();
    });
    $("#pview").on("click",function(){
        // document.dform.submit();
        window.close();
    });

    var moveTab = function(){
        document.pform.samples.value=samples;
        document.pform.samplenames.value=samplenames;
        document.pform.samplespermutation.value=samplespermutation;

        document.pform.mutationcount.value=MUTATIOINCOUNT;
        document.pform.sex.value=SEX;
        document.pform.age.value=AGE;
        document.pform.cancertype.value=CANCERTYPE;
        document.pform.cancertypedetail.value=CANCERTYPEDETAIL;
        document.pform.oncotreecode.value=ONCOTREECODE;
        // document.pform.target = "_blank";
        document.pform.submit();
    }

    $("#patientage").on("mouseover", "[id='patienthead']", function (e) {
        var id = e.target.id;
        var prop = {};
        prop.sex = SEX;
        prop.age = AGE;
        prop.samplecount = samples.length;

        var patientInfo = new PatientInfo();
        $('#' + id + '').tooltipster({
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
            arrow: true,
            content: patientInfo.init(prop)
        });
        $('#' + id + '').tooltipster('open');
    });

    $("#divsample").on("mouseover", "[id^='samplelabel_']", function (e) {
        var id = e.target.id;
        loadSampleAttr(id);
    });

    var loadSampleAttr = function (id) {
        // console.log('loadSampleAtrr called');
        var prop = {};
        // prop.cancertype = CANCERTYPE;
        // prop.cancertypedetail = CANCERTYPEDETAIL;
        // prop.oncotreecode = ONCOTREECODE;

        var patientAttr = new PatientAttr();
        $('#' + id + '').tooltipster({
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
            arrow: true,
            content: patientAttr.init(id)
        });
        $('#' + id + '').tooltipster('open');
    }
});
