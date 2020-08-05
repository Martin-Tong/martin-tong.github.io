(function () {
    var mySwiper1 = new Swiper('#ex-1', {
        direction: 'horizontal',
        grabCursor: true,
        effect: "slide",
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            type: "bullets"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        observer: true,
        observeParents: true
    });
    var mySwiper2 = new Swiper('#ex-2', {
        direction: "horizontal",
        slidesPerView: "auto",
        speed: 1000,
        navigation: {
            nextEl: ".custom-pagination.right",
            prevEl: '.custom-pagination.left'
        },
        /* watchSlidesProgress: true,
        watchSlidesVisibility: true, */
        resistanceRatio: 0,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        on: {
            init: function () {
                var _this = this;
                this.slides.each(function (index, element) {
                    _this.slides.eq(index).children().css({ "animation-duration": _this.params.speed + 'ms', transform: "translate3d(0,0,0)" });
                });
                var target = this.slides.eq(0).children();
                target.addClass('bounceInUp');
                target.css("visibility", "visible");
            },
            transitionStart: function () {
                /* console.time('transitionstart')
                console.timeLog('transitionstart', this.activeIndex)
                console.timeEnd('transitionstart') */
                var target = this.slides.eq(this.previousIndex).children('.swiper-slide-content');
                target.css("visibility", "hidden");
                target.removeClass('bounceInUp');
            },
            transitionEnd: function () {
                var target = this.slides.eq(this.activeIndex).children();
                target.addClass('bounceInUp');
                target.css("visibility", "visible");
            }
        }
    });
})();
