
    $('.menu').click(
        function() {
            $('nav').slideToggle()
        }
    )

let a = window.matchMedia('(max-width: 600px)')
a.addEventListener(function(e) {
    if(!e.matches) {
        $('nav').css('display', 'block')
    }
})