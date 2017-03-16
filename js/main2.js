if (navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js");
}

(function () {
    var sticky = false;
    var currentPosition = 0;

    var imageCounter = parseInt($("[data-name='image-counter']").attr("content"));

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        sendForm($(this));
        return false;
    });

    $("#stickyNavigation").removeClass("hidden");
    $("#stickyNavigation").slideUp(0);
    checkScroll();
    isOpen();

    $("#menu-opener").on("click", toggleNav);

    $(".menu-link").on("click", toggleNav);

    function toggleNav() {
        $("#responsive-nav ul").toggleClass("active");
        $("#menu-opener").toggleClass("glyphicon-menu-hamburger");
    }

    setInterval(function () {

        if (currentPosition < imageCounter) {
            currentPosition++;
        } else {
            currentPosition = 0;
        }
        $("#gallery .inner").css({
            left: "-" + currentPosition * 100 + "%"
        })
        ;
    }, 4000);

    $(window).scroll(checkScroll);

    function checkScroll() {
        var inBottom = isInBottom();

        if (inBottom && !sticky) {
            // Mostar la navegacion sticky
            sticky = true;
            stickNavigation();
        }
        if (!inBottom && sticky) {
            // Ocultar la navegacion sticky
            sticky = false;
            unStickNavigation();
        }
    }

    function isOpen() {
        var date = new Date();
        var current_hour = date.getHours();

        if (current_hour < 17 || current_hour > 23) {
            $("#is_open .text").html("Cerrado ahora <br>Abierto de 5:00pm - 11:00pm");
        }
    }


    function isInBottom() {
        var description = $("#description");
        var descriptionH = description.height();

        return $(window).scrollTop() > $(window).height() - (descriptionH * 2);
    }

    function stickNavigation() {
        $("#description").addClass("fixed").removeClass("absolute");
        $("#navigation").slideUp("fast");
        $("#stickyNavigation").slideDown("fast");
    }

    function unStickNavigation() {
        $("#description").removeClass("fixed").addClass("absolute");
        $("#navigation").slideDown("fast");
        $("#stickyNavigation").slideUp("fast");
    }
})();