(function() {
    $('.menu').click(
        function() {
            $('nav').slideToggle()
        }
    )

    //js媒体查询
    let a = window.matchMedia('(max-width: 600px)')
    function a1(e) {
        if(!e.matches) {
            $('nav').css('display', 'block')
        }
    }
    a.addListener(a1)

    window.addEventListener('load', function() {
        setTimeout(function() {
            $('.loading-mask').fadeOut(500, function() {
                $('body').removeClass('loading')
            })       
        }, 0)       
    })
})()
