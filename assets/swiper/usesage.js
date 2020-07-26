(function() {
    
    var swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev"
        }
    })
    window.abc = swiper
})()