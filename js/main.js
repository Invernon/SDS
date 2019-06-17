// Navbar JS

var onresize = function () {
    width = document.body.clientWidth;
    if (width > 767) {
        $('body').removeClass("no-scroll");
        $('.sds-sidenav').removeClass("active");
        $('.sds-sidenav .action').html(`<i class="fas fa-caret-down"></i>`);
    }
}
window.addEventListener("resize", onresize);

$("#menu").click(function () {
    $(".sds-navbar__navigation").toggleClass("active");
});

$(".element__title").click(function () {
    var ele = this;
    var subEle = ele.parentElement.lastElementChild;

    $(ele.parentElement).toggleClass("active");

    if (subEle.className.includes('element__sub-elements')) {
        $(subEle).toggleClass('open');
    }
});

$(".element__sub-elements li").click(function () {
    var ele = this;
    $(ele).toggleClass("active");
});

$(".sds-sidenav .action").click(function () {
    $('body').toggleClass("no-scroll");
    $('.sds-sidenav').toggleClass("active");
    if ($('.sds-sidenav').hasClass("active")) {
        $(this).html(`<i class="fas fa-caret-up"></i>`);
    } else {
        $(this).html(`<i class="fas fa-caret-down"></i>`);
    }
});

// Progress Bar
// UN FINISHED
// $(document).on('click', '[data-toggle="progress-bar"]', function () {
//     console.log("click");
//     var $target = $($(this).data('target'));
//     var isPaused = false;
//     var progress = 0;
//     var progress = setInterval( function(){
//         if( isPaused ){
//             progress++;
//             if(progress > 100){
//                 progress = 0;
//                 isPaused = false;
//             }
//             $target.html(`${progress}%`);
//             $target.css( 'width' , `${progress}%` );
//         }
//     }, 100);
//     return false;
// });

// Dropdown

$(document).on('click', function (event) {
    resetDropdowns();
})

$(document).on('click', '[data-toggle="dropdown"]', function () {
    var $target = $($(this).data('target'));

    if ($target.hasClass('show')) {
        $target.toggleClass('show');
    } else {
        resetDropdowns()
        $target.toggleClass('show');
    }
    return false;
});

function resetDropdowns() {
    var dropdowns = document.getElementsByClassName('sds-dropdown');
    for (i = 0; i < dropdowns.length; i++) {
        var dropdown = dropdowns[i];
        if ($(dropdown.lastElementChild).hasClass('show')) {
            $(dropdown.lastElementChild).removeClass("show");
        }
    }
}

// Alerts 
$(document).on('click', '[data-dismiss="alert"]', function () {
    console.log("click" , this);
    
    var $alert = $(this.parentElement);
    $alert.addClass('hide');
    setTimeout(() => {
        $alert.remove();
    }, 550);
    return false;
});

// Modals 

$(document).on('click', '[data-toggle="modal"]', function () {
    var $target = $($(this).data('target'));
    $target.addClass("open");
    $('body').addClass("no-scroll");
    return false;
});

$(document).on('click', '[data-dismiss="modal"]', function () {
    var $modal = $(this.parentElement.parentElement.parentElement.parentElement);
    $modal.removeClass("open");
    $('body').removeClass("no-scroll");
    return false;
});

$(document).on('click', '.sds-modal', function (event) {
    if (event.target.className === "modal-wrapper") {
        $(this).removeClass("open");
        $('body').removeClass("no-scroll");
    }
    return false;
});

// Btn Navigation
$(document).on('click', '[data-toggle="navigate"]', function (event) {
    window.location.assign($(this).data('href'));
    return false;
});


// Slider

$(document).on('click', '[data-toggle="slider"]', function () {
    var $action = $(this).data('action');
    var $target = $($(this).data('target'));
    var slides = $target.children();
    current = '';

    for (let i = 0; i < slides.length; i++) {
        const $slide = $(slides[i]);
        if  ( $slide.hasClass("current") ){
            current = $($slide);
        }
    }

    if ( $action === 'next') {
        if( current.next().length > 0 ){
            var next = current.next();
            var nextOfNext = next.next().length > 0 ? next.next() : undefined;

            current.removeClass('current');
            current.addClass('prev');
            setTimeout(() => {
                next.removeClass('next');
                next.addClass('current');
                if( nextOfNext ){
                    nextOfNext.addClass('next');
                }
            }, 300);

        }else {
            var next = $(slides[0]);
            var nextOfNext = next.next().length > 0 ? next.next() : undefined;
            current.removeClass('current');
            setTimeout(() => {
                nextOfNext.removeClass('prev');
                next.removeClass('prev');
                next.addClass('current');
                if( nextOfNext ){
                    nextOfNext.addClass('next');
                }
            }, 300);
        }
    
    } else if( $action === 'prev' ) {
        if( current.prev().length > 0 ){
            var prev = current.prev();
            var prevOfPrev = prev.prev().length > 0 ? prev.prev() : undefined;

            current.removeClass('current');
            current.addClass('next');
            setTimeout(() => {
                prev.removeClass('prev');
                prev.addClass('current');
                if( prevOfPrev ){
                    prevOfPrev.addClass('prev');
                }
            }, 300);
        }else {
            var prev = $(slides[slides.length-1]);
            var prevOfPrev = prev.prev().length > 0 ? prev.prev() : undefined;

            current.removeClass('current');
            setTimeout(() => {
                prevOfPrev.removeClass('next');
                prev.removeClass('next');
                prev.addClass('current');
                if( prevOfPrev ){
                    prevOfPrev.addClass('prev');
                }
            }, 300);
        }
    }
    return false;
});