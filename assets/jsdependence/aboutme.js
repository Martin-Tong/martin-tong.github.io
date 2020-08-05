(function () {
    var container = $('.aboutme-wraper')[0], stageContainer = $('.aboutme-stage')[0], loader = PIXI.Loader.shared, sprites, pixiIns, pixiInsInitialed;
    var swiper1, isMobile = PIXI.utils.isMobile.phone;
    anime({
        targets: ".aboutme-cover path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function (el, i) { return i * 250; },
        direction: 'alternate',
        loop: true,
        loopComplete: function () {
            if (pixiInsInitialed) {
                $('.aboutme-cover').animate({
                    height: isMobile ? '10%' : '20%',
                    top: 0,
                    zIndex: 3
                }, {
                    duration: 1200,
                    easing: "linear",
                    complete: function () {
                        //$(this).remove()
                    }
                });
                pixiInsInitialed = !pixiInsInitialed;
            }
        }
    });
    pixiIns = new PIXI.Application({
        width: container.offsetWidth,
        height: container.offsetHeight,
        resolution: 1,
        resizeTo: container
    });
    loader.add('ex', '/assets/swiper/midouzi.jpg').add('ex1', "/assets/570daa012808c.png").load(function (loader, resources) {
        sprites = new PIXI.Sprite(resources.ex.texture);
        sprites.filters = [new PIXI.filters.NoiseFilter()];
        sprites.width = pixiIns.renderer.view.width;
        sprites.height = pixiIns.renderer.view.height;
        //sprites.position.set(100)
        //pixiIns.stage.addChild(sprites)
        pixiInsInitialed = true;
    });
    loader.onProgress.add(function (loader, resources) {
        console.log('loaded: ' + loader.progress + '%');
    });
    loader.onComplete.add(function (loader, resources) {
        swiper1 = new Swiper('#description', {
            direction: 'vertical',
            slidesPerView: 'auto',
            slideToClickedSlide: false,
            shortSwipes: true,
            longSwipesRatio: 0.3,
            followFinger: false,
            hashNavigation: true,
            passiveListeners: isMobile,
            mousewheel: {
                sensitivity: 0.6
            },
            pagination: isMobile ? false : {
                el: '.swiper-pagination',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                    return "<span class=\"" + currentClass + "\"></span>\u2014\u2014\u2014\u2014<span class=\"" + totalClass + "\"></span>";
                }
            },
            on: {
                transitionEnd: function () {
                    sprites.texture = resources.ex1.texture;
                }
            }
        });
    });
    stageContainer.appendChild(pixiIns.view);
    window.addEventListener('resize', function () {
        sprites.width = pixiIns.renderer.view.width;
        sprites.height = pixiIns.renderer.view.height;
    });
})();
