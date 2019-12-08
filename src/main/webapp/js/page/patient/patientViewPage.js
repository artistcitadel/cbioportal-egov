function Noop(){
    var self = this;
    self.movePage = function(page){
    document.pform.patient.value=patients;
    document.pform.pages.value=page;
    document.pform.patientId.value=patients.split(",")[parseInt(page)-1];
    PATIENTID = document.pform.patientId.value;
    console.log("PATIENTID ", PATIENTID);
    console.log(patients);
    document.pform.submit();
    }
}

$(document).ready(function () {
    var $movable = $('<div id="movable"></div>')
        .appendTo('body');
    var bioBaseStyles = {
            display: 'none',
            height: '5px',
            width: '25px'
        },
        bioEffects = {
            duration: 800,
            easing: 'easeOutQuart',
            specialEasing: {
                opacity: 'linear'
            }
        };

    $("#patientname").text(PATIENTID);
    var pager = new Pager();
    var sel = $("#summary_pageview");
    var udata = [];
    // var patients = document.pform.patient.value;
    // var pages = document.pform.pages.value;
    if(patients.indexOf(",")!==-1){
        var ps = patients.split(",");
        for(var i=0;i<ps.length;i++){
            udata.push(ps[i]);
        }
    }else{
        udata.push(patients);
    }

    console.log(document.pform.pages.value);
    console.log(document.pform.patient.value);
    var page = parseInt(document.pform.pages.value);
    var tpage = udata.length;
    //alert(udata.length + ' '+ page);

    pager.buildPage(page, tpage, sel, new Noop, udata, 'simple');



    function showBio() {
        var $member = $(this).parent(),
            $bio = $member.find('p.bio'),
            startStyles = $.extend(bioBaseStyles, $member.offset()),
            endStyles = {
                width: $bio.width(),
                top: $member.offset().top + 5,
                //left: $member.width() + $member.offset().left - 5,
                left: $member.width()-5,
                opacity: 'show'
            };

        $movable
            .html($bio.clone())
            .css(startStyles)
            .animate(endStyles, bioEffects)
            .animate({height: $bio.height()}, {easing: 'easeOutQuart'});
    }

        $('div.member').find('img').click(showDetails);
    function showDetails() {
        var $member = $(this).parent();
        if ($member.hasClass('active')) {
            return;
        }
        $movable.fadeOut();

        $('div.member.active')
            .removeClass('active')
            .children('div').fadeOut();

        $member.addClass('active');
        $member.find('div').css({
            display: 'block',
            left: '-300px',
            top: 0
        }).each(function(index) {

            $(this).animate({
                left: 0,
                top: 25 * index
            }, {
                duration: 'slow',
                specialEasing: {
                    top: 'easeInQuart'
                }
            });
        }).promise().done(showBio);
    }
    // $('div.member').find('img').trigger('click');
 });
