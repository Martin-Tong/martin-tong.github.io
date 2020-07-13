
    $('.menu').click(
        function() {
            $('nav').slideToggle()
        }
    )

let a = window.matchMedia('(max-width: 600px)')
function a1(e) {
    if(!e.matches) {
        $('nav').css('display', 'block')
    }
}
a.addListener(a1)