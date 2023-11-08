$(window).scroll(animateNumbers);
var viewed = false;

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};

window.addEventListener('scroll', function (e) {
    var headernavbar = document.getElementById("headernavbar");
    var logo = document.getElementById("navbar-brand");
    if(headernavbar && logo){
        if (window.scrollY > headernavbar.offsetHeight){
            var headerNavbarNav = document.querySelector('#headerNavbarNav')
            headernavbar.classList.add('scrolled');
            logo.classList.add('scrolled');
        }else{
            headernavbar.classList.remove('scrolled');
            logo.classList.remove('scrolled');
        }
    }

});

var width = $(window).width();


$(document).ready(function() {
    // $("nav").removeClass("no-transition");
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}


    var loggedInMenuNavbar = $('.navbar-loggedin-user');
    loggedInMenuNavbar.find('#menu').removeAttr('id');


	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    if (width < 992) { // mobile
        $('#menuToggle input[type="checkbox"]').change(function(){
            var checked = $(this).is(":checked");
            if(checked){
                $('#menu').show("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('#menu, #menu *').css({
                    'visibility': 'visible'
                });
                $('body', 'html').css({
                    'overflow': 'hidden'
                });
            }else{
                $('#menu').hide("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('body', 'html').css({
                    'overflow': 'auto'
                });
            }
        });
    }


    $('.work_packages .accordion-content, .projects_services .accordion-toggle').each(function( index, value ) {
        $(value).find('a').attr( "onclick", "window.open(this.href, '_blank');" )
    });

    $('p:has(.edit-link)').each(function(){
        $(this).find('a').attr( "onclick", "window.open(this.href, '_blank');" )
    });

	onHashChange();
	$(window).on("hashchange", function() {
		onHashChange();
	});

	$('.nav.nav-pills').removeAttr('id');

	var count = $("h1").text().length;


    $('.tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');
        var speed = "fast";
        var activeTab = $(location.hash);
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

        if(!$(this).parent().parent().hasClass('library')){
            $active.addClass('active');
        }

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        if(activeTab.length){
            $content.slideDown(speed);
            //scroll to element
            $('html, body').animate({
                scrollTop:  activeTab.offset().top - $('header').height()
            }, speed);
        }

        // Bind the click event handler
        $(this).find("a").click(function (e) {
            if($(this)[0].innerText == 'Relevant publications' || $(this)[0].innerText == 'SELINA publications'){
                $('.row.center-xs.mb-1:has(form)').hide();
            }else{
                $('.row.center-xs.mb-1:has(form)').show();
            }
            if($(this).hasClass('active') && $content.length) {
                $content.slideDown({
                    scrollTop: $content.offset().top - $('header').height()
                }, speed);
                var screenSize = getScreenSize();
                if (screenSize.width < 800) {
                    // scroll to element
                    $('html, body').animate({
                        scrollTop: $content.offset().top - $('header').height() + 300  // mobile
                    }, speed);
                }else{
                    //scroll to element icons top
                    $('html, body').animate({
                        scrollTop:  $content.offset().top - $('header').height() + 300
                    }, speed);
                }
                e.preventDefault();
                return false;
            }
            // Make the old tab inactive.
            $active.removeClass('active');
            // $content.slideUp({
            // 	scrollTop: $content.offset().top - $('header').height() - $('.left_sidebar').height()
            // }, speed);
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            location.hash = $active[0].hash;

            // Make the tab active.
            $active.addClass('active');
            if($content.length){
                $content.slideDown({
                    scrollTop: $content.offset().top - $('header').height()
                }, speed);
            }

            // Prevent the anchor\'s default click action
            e.preventDefault();
        });
    });

    $( ".tabs" ).tabs();
    $( ".subtabs" ).tabs();
    openParentTab();

	$('.numbers').attr('data-aos', 'fade-up');
	$('.card-img-top').attr('data-aos', 'fade-up');
	$('.logo-container').attr('data-aos', 'fade-up');
	$('.about h1.display-1').attr('data-aos', 'fade-up');
	$('h2.underline').attr('data-aos', 'fade-up');
	$('.news_column').attr('data-aos', 'fade-up');
	// about page
	$('.about img').attr('data-aos', 'fade-up');

	// media
	$('.card-container').attr('data-aos', 'fade-up');

	$('.see_all_partners_link').hide();
    $('<div class="mark"></div>').insertAfter($('.group-holder input'));

    $(".partner-item .read-more").click(function() {

        var $el, $ps, $up, totalHeight;

        totalHeight = 150;

        $el = $(this) // read-more link

        $up  = $el.parent().find('.partners-insider'); // partner-item
        if ($el.html() == "<a href=\"\" class=\"plus\"></a>") {

            $ps = $up.find(".members_container");

            // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
            $ps.each(function() {
                totalHeight += $(this).outerHeight();
            });
            $up.addClass('changed');

            $el.css({
                bottom: -36
            });
            // $el.html('<a class="revert" href="" onclick="revertChanges(this);">Read less</a>');

            $up.css({
                // Set height to prevent instant jumpdown when max height is removed
                "height": $up.height(),
                "max-height": 9999,
            })
                .animate({
                    "height": totalHeight - 100
                });

            //Stuff to do when btn is in the read more state
            $el.html("<a href=\"\" class=\"minus\"></a>");
            // $up.slideDown();
        } else {

            $up.removeClass('changed');

            $el.css({
                bottom: -36
            });
            // $el.html('<a class="revert" href="" onclick="revertChanges(this);">Read less</a>');

            $up.css({
                // Set height to prevent instant jumpdown when max height is removed
                "height": $up.height(),
                "max-height": 360,
            })
                .animate({
                    "height": totalHeight
                });
            //Stuff to do when btn is in the read less state
            $el.html("<a href=\"\" class=\"plus\"></a>");

            $('html, body').animate({
                scrollTop:  $up.offset().top - $('header').height() - 300
            });
        }
        return false;
    });


    // bootstrap 3 breakpoints
    const breakpoint = {
        // extra small screen / phone
        xs: 280,
        // small screen / tablet
        sm: 768,
        // medium screen / desktop
        md: 992,
        // large screen / large desktop
        lg: 1200
    };

// bootstrap 3 responsive multi column slick carousel
    $('#slick').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: true,
        pauseOnHover: true,
        infinite: true,
        dots: false,
        arrows: true,
        speed: 1000,

        mobileFirst: true,

        slidesToShow: 4,
        slidesToScroll: 3,
        autoSlidesToShow: true,
        variableWidth: true,
        // prevArrow: true,
        // nextArrow: true,

        responsive: [
            {
            breakpoint: breakpoint.xs,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
            {
                breakpoint: breakpoint.sm,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true
                }
            },
            {
                breakpoint: breakpoint.md,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true
                }
            },
            {
                breakpoint: breakpoint.lg,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    arrows: true
                }
            }
        ]
    });


    $('body').on('click', '.projects_services .accordion-toggle', function () {
        $('.ui-accordion-header').show();
        if ($(this).next(".accordion-content").is(':visible')) {
            $(this).next(".accordion-content").slideUp(300);
            $(this).children().find(".plusminus").text('+');
            $(this).children(".plusminus").html('<span class="plus"></span>');
        } else {
            $(this).next(".accordion-content").slideDown(300);
            $(this).children().find(".plusminus").text('-');
            $(this).children(".plusminus").html('<span class="minus"></span>');
        }
    });


});


function openParentTab() {
    locationHash = location.hash.substring( 1 );
    // Check if we have an location Hash
    if (locationHash) {
        // Check if the location hash exsist.
        var hash = jQuery('#'+locationHash);
        if (hash.length) {
            // Check of the location Hash is inside a tab.
            if (hash.closest(".tabContent").length) {
                // Grab the index number of the parent tab so we can activate it
                var tabNumber = hash.closest(".tabContent").index();
                jQuery(".tabs.fix").tabs({ active: tabNumber });
                // Not need but this puts the focus on the selected hash
                hash.get(0).scrollIntoView();
                setTimeout(function() {
                    hash.get(0).scrollIntoView();
                }, 1000);
            }
        }
    }
}

function showHideWP(target){
    // if (width < 1024) {
    // $('.work_packages_container .wp_content').hide();
    //     $(target).find('.prefix_container').removeClass('active');
    $('.prefix_container').removeClass('active');
        if (!$(target).find('.wp_content').is(':visible')) {
            $('.work_packages_container .wp_content').slideUp();
            $(target).find('.wp_content').slideDown();
            $(target).find('.prefix_container').addClass('active');
        } else {
            $(target).find('.wp_content').slideUp();

        }
    // }
}

function onHashChange(){
	$("path").removeClass('active_path');
	$(".accordion-content").hide();
	var caseStudiesHashTitle = location.hash;

	if(caseStudiesHashTitle){
		var caseStudiesTitle = caseStudiesHashTitle.substring(1, caseStudiesHashTitle.length);
		$("path[title='"+caseStudiesTitle.toUpperCase()+"']").addClass('active_path');

		$('.pilots .accordion-border').each(function(){
			var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
			var toggler = $(this).find(".accordion-toggle");
			if ( title.indexOf(caseStudiesTitle.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
				toggler.trigger( "click" );
			}
		});
	}
}

function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}


function appendSearchAndSocialMedia(){
	var liSearch = '<li class="nav-item search_field"><a href=\"javascript: void(0);\" onclick=\"showSearchForm();\"></a></li>';
	var liSocial = '<li class="nav-item social">' +
        '<a href=\"https://twitter.com/ANERISproject\" target=\"_blank\" class=\"pr p-twitter big\" target=\"_blank\"></a>' +
        '<a href=\"https://www.linkedin.com/company/anerisproject/\" target=\"_blank\" class=\"pr p-linkedin big\" target=\"_blank\"></a>' +
        '<a href=\"https://www.instagram.com/aneris_project/" target=\"_blank\" class=\"pr p-instagram big\" target=\"_blank\"></a></li>';
	var menu = $('#menuToggle');
	menu.find('>ul').append(liSearch).append(liSocial);
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}


function showSearchForm(){
    // if ($(".search").is(':visible')) {
    // 	$('#menu').show();
    // } else {
    // 	$(".search").slideDown(300);
    // 	$('#menu').hide();
    // }
    // $('#menu').hide();
    $('#layout-header').toggleClass('full-width');
    $('#search').toggle();
    $('#menu').hide();
    $('nav a:not(.navbar-brand)').hide();
}

function hideSearchForm(){
    $('#layout-header').toggleClass('full-width');
    $('#search').hide();
    $('#menu').show();
    $('nav a').show();
}

function requestFormLibrary() {
	$('#mylibraryForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function requestFormPartners() {
	$('#myPartnersForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	if($(elem).height()){
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	return;

}



function scrollDown(){
	var element = $('#layout-content');
	$("html, body").animate({ scrollTop: element.offset().top - 190 }, 500);
}

function onMapCustomPartners(code) {
		$('.partner-item').removeClass('active_partner');
		$.request('onPartners', {
			update: { 'components/partners_list': '#mycomponentpartners',
			},
			data: {
                code: code
			},
		}).then(response => {
            $('html, body').animate({
                scrollTop: $("#mycomponentpartners").offset().top - 200
            }, 1000);
            var tooltip = document.getElementById("tooltip");
            tooltip.classList.remove("active");
		});
}


function handleCustomSVGMapMouseMove(event) {
    var countryCode = $(event.target).parent().parent().attr('country_code');
    var title = $(event.target).parent().parent().attr('title');
    var tooltip = document.getElementById("tooltip");


    switch (countryCode) {
        case "AF":
        case "AX":
        case "AL":
        case "DZ":
        case "AS":
        case "AD":
        case "AD":
        case "AO":
        case "AI":
        case "AQ":
        case "AG":
        case "AR":
        case "AM":
        case "AW":
        case "AT":
        case "AZ":
        case "BS":
        case "BH":
        case "BD":
        case "BB":
        case "BY":
        case "BE":
        case "BZ":
        case "BJ":
        case "BM":
        case "BT":
        case "BO":
        case "BQ":
        case "BA":
        case "BW":
        case "BV":
        case "BR":
        case "IO":
        case "BN":
        case "BG":
        case "BF":
        case "BI":
        case "KH":
        case "CM":
        case "CV":
        case "KY":
        case "CF":
        case "TD":
        case "CL":
        case "CN":
        case "CX":
        case "CC":
        case "CO":
        case "KM":
        case "CG":
        case "CD":
        case "CK":
        case "CR":
        case "CI":
        case "HR":
        case "CU":
        case "CW":
        case "CY":
        case "CZ":
        case "DK":
        case "DJ":
        case "DM":
        case "DO":
        case "EC":
        case "EG":
        case "SV":
        case "GQ":
        case "ER":
        case "EE":
        case "ET":
        case "FK":
        case "FO":
        case "FI":
        case "FJ":
        case "GF":
        case "PF":
        case "TF":
        case "GA":
        case "GM":
        case "GE":
        case "GH":
        case "GI":
        case "GR":
        case "GL":
        case "GD":
        case "GP":
        case "GU":
        case "GT":
        case "GG":
        case "GN":
        case "GW":
        case "GY":
        case "HT":
        case "HM":
        case "VA":
        case "HN":
        case "HK":
        case "IS":
        case "ID":
        case "IR":
        case "IQ":
        case "IM":
        case "IL":
        case "IT":
        case "JM":
        case "JP":
        case "JE":
        case "JO":
        case "KZ":
        case "KE":
        case "KI":
        case "KP":
        case "KR":
        case "KW":
        case "KG":
        case "LA":
        case "LV":
        case "LB":
        case "LS":
        case "LR":
        case "LY":
        case "LI":
        case "LT":
        case "LU":
        case "MO":
        case "MK":
        case "MG":
        case "MW":
        case "MY":
        case "MV":
        case "ML":
        case "MT":
        case "MH":
        case "MQ":
        case "MR":
        case "MU":
        case "YT":
        case "MX":
        case "FM":
        case "MD":
        case "MC":
        case "MN":
        case "ME":
        case "MS":
        case "MA":
        case "MZ":
        case "MM":
        case "NA":
        case "NR":
        case "NP":
        case "NC":
        case "FR":
        case "IN":
        case "NL":
        case "HU":
        case "IE":
        case "CA":
        case "NZ":
        case "DE":
        case "NI":
        case "NE":
        case "NG":
        case "NU":
        case "NF":
        case "MP":
        case "NO":
        case "OM":
        case "PK":
        case "PW":
        case "PS":
        case "PA":
        case "PG":
        case "PY":
        case "PE":
        case "PH":
        case "PN":
        case "PT":
        case "PR":
        case "QA":
        case "RE":
        case "RU":
        case "RW":
        case "BL":
        case "SH":
        case "KN":
        case "LC":
        case "MF":
        case "PM":
        case "VC":
        case "WS":
        case "SM":
        case "ST":
        case "SA":
        case "SN":
        case "RS":
        case "SC":
        case "SL":
        case "SG":
        case "SX":
        case "SK":
        case "SI":
        case "SB":
        case "SO":
        case "ZA":
        case "GS":
        case "LK":
        case "SD":
        case "SR":
        case "SJ":
        case "SZ":
        case "SE":
        case "SY":
        case "TW":
        case "TJ":
        case "TZ":
        case "TH":
        case "TL":
        case "TG":
        case "TK":
        case "TO":
        case "TT":
        case "TN":
        case "TR":
        case "TM":
        case "TC":
        case "TV":
        case "UG":
        case "UA":
        case "AE":
        case "UM":
        case "UY":
        case "UZ":
        case "VU":
        case "VE":
        case "VN":
        case "VG":
        case "VI":
        case "WF":
        case "EH":
        case "YE":
        case "ZM":
        case "ZW":
        case "US":
        case "GB":
        case "ES":
        case "AU":
        case "RO":
        case "CH":
        case "PL":
            break;
        default:
            return tooltip.classList.remove("active");
    }

    var x = event.clientX;
    var y = event.clientY;

    tooltip.style.left = (x + 20) + "px";
    tooltip.style.top = (y - 20) + "px";

    tooltip.innerHTML = title;
    tooltip.classList.add("active");

}


function onCustomPartners(code) {
    $('.partner-item').removeClass('active_partner');
    $.request('onPartners', {
        update: { 'components/partners_list': '#mycomponentpartners',
        },
        data: {
            code: code
        },
    }).then(response => {
        $('html, body').animate({
            scrollTop: $("#mycomponentpartners").offset().top - 200
        }, 1000);
        var tooltip = document.getElementById("tooltip");
        tooltip.classList.remove("active");
    });
}



function animateNumbers() {
    if (isScrolledIntoView($(".numbers")) && !viewed) {
        viewed = true;
        $('.count').each(function () {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 1800,
                easing: 'swing',
                step: function (now) {
                    $(this).text(parseFloat(now).toFixed(size));
                }
            });
        });
    }
}


function hideMe(elem){
    $(elem).parent().hide();
}

function fetchMails(i, searchStr){
    // $('.group_mailing_list').hide();
    if($('.group_mailing_list_'+i).is(":visible")){
        $('.group_mailing_list_'+i).hide();
    }else{
        //groups
        $.request('onFetchMailingList', {
            update: { 'mailing_list': '#mailing_list_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('.group_mailing_list_'+i).html('<a class="close-btn" onclick="hideMe(this)">X</a>' + response.mailing_list);
        });
        $('.group_mailing_list').hide();
        $('.group_mailing_list_'+i).show();
    }

}


function fetchSingleMail(i, searchStr){
    if($('.single_mailing_list_'+i).is(":visible")){
        $('.single_mailing_list_'+i).hide();
    }else{
        //groups
        $.request('onFetchSingleMail', {
            update: { 'individual_email': '#individual_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('.single_mailing_list_'+i).html('<a class="close-btn" onclick="hideMe(this)">X</a>' + response.individual_email);
        });
        $('.single_mailing_list').hide();
        $('.single_mailing_list_'+i).show();
    }
}

function initMailingTooltip(){
    var searchStr = '';
    $('.group-holder').eq(0).find('.inputWithTooltip span').each(function(i, obj) {
        searchStr = $.trim($(obj).text());
        $(this).parent().css('display', 'inline-grid');
        $('<img src="/storage/app/media/CMS_icons_groups.svg" style="max-width: 16px; margin-left: 5px;" class="icon mailing_list_tooltip_'+i+'" onclick="fetchMails('+i+', \'' + searchStr + '\')" />').insertAfter($(this).parent());
        $('<div class="group_mailing_list group_mailing_list_' + i + '" style="display: none;"></div>').insertAfter($(this).parent());


    });
    $('.group-holder').eq(1).find('.inputWithTooltip span').each(function(i, obj) {
        searchStr = $.trim($(obj).text());
        $('<img src="/storage/app/media/CMS_icons_individuals.svg" style="max-width: 16px; margin-left: 5px;" class="icon mailing_list_tooltip_individuals_'+i+'" onclick="fetchSingleMail('+i+', \'' + searchStr + '\')" />').insertAfter($(this).parent());
        $(this).parent().css('display', 'inline-grid');
        $('<div class="single_mailing_list single_mailing_list_' + i + '" style="display: none;"></div>').insertAfter($(this).parent());
    });

    $('.group-holder').eq(0).prepend( "<p style='margin-left: 10px; width: 100%;'>Prior to sending group emails, please make sure that all individuals you want to contact have been included in the respective group by clicking on the group icon.</p><p></p>" );
    $('.group-holder').eq(1).prepend( "<p style='margin-left: 10px; width: 100%;'>To see each person’s email, click on the account icon.</p><p></p>" );

}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
		appendSearchAndSocialMedia()
		requestFormLibrary()
		// requestFormPartners()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}


function handlePilotsSVGMapMouseMove(event) {
	var title = $(event.target).attr('title');
	var tooltip = document.getElementById("tooltip");
	if (!title) {
		title = $(event.target).parent().attr('title');
	}

	switch (title) {
		case 'Salisbury Plain':
		case 'French Mediterranean natural reserves':
		case 'Friedeburg':
		case 'LTER Petrohan':
		case 'Mols Bjerge National Park':
		case 'Oostvaardersplassen Nature Reserve':
		case 'Island of Comino and surrounding islets':
			break;
		default:
			return tooltip.classList.remove("active");
	}

	var x = event.clientX;
	var y = event.clientY;

	tooltip.style.left = (x + 20) + "px";
	tooltip.style.top = (y - 20) + "px";

	tooltip.innerHTML = $(event.target).attr('title');
	tooltip.classList.add("active");

}

function onPilots(pTitle) {
	// $("path").removeClass('active_path');
	var tooltip = document.getElementById("tooltip");
	tooltip.classList.remove("active");
	if(!$("path[title='"+pTitle+"']").hasClass('active_path')){
        $("path[title='"+pTitle+"']").addClass('active_path');

        $('.accordion-border').each(function(){
            var title = $(this).find(".accordion-toggle .col-xs.start-xs").text();
            var toggler = $(this).find(".accordion-toggle");
            if ( title.indexOf(pTitle) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                toggler.trigger( "click" );
                $('html, body').animate({
                    scrollTop: toggler.parent().offset().top - 150
                }, 500);
            }
        });
    }else{
        $("path[title='"+pTitle+"']").removeClass('active_path');
        $('.accordion-border').each(function(){
            var title = $(this).find(".accordion-toggle .col-xs.start-xs").text();
            var toggler = $(this).find(".accordion-toggle");
            if ( title.indexOf(pTitle) >= 0 && toggler.next(".accordion-content").is(':visible') ){
                toggler.trigger( "click" );
            }
        });
    }

}

init()
