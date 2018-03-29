$(document).ready(function () {

  $(window).on('scroll', function() {
    $('.target').each(function() {
        if($(window).scrollTop() >= $(this).offset().top - 100) {
            var id = $(this).attr('id');
            $('.container ul li a').removeClass('active');
            $('.container ul li a[href=#'+ id +']').addClass('active');
        }
    });
});
    

});        