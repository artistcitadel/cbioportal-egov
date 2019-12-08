

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
    //$('div.member').find('img').trigger('click');
 });
