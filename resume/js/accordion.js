function initAccordion() {
    let contents = $('.block .content');

    contents.hide();
    contents.first().show().prev('h2').addClass('active');

    $('.block h2').off('click').on('click', function() {
        let content = $(this).next('.content');
        contents.not(content).slideUp(300).prev('h2').removeClass('active');
        content.slideToggle(300);
        $(this).toggleClass('active');
    });
}
