
$(document).ready(function(){
  $('.caorusel__inner').slick(
    {
      speed: 1200,
      autoplay: true,
      autoplaySpeed: 8000,
      prevArrow: '<button type="button" class="slick-prev"><img src="ico/arrow-left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="ico/arrow-right.png"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            arrows: false,
            dots: false,
          }
        }
      ]
    });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item){
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //modal
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thank, #order').fadeOut();
  });
  
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  });

  $('input[name=phone]').mask("+7 (999) 999 99-99");

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thank').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  //smooth and scroll
  $(window).scroll(function(){
    if ($(this).scrollTop() > 1000){
      $('.pageup__item').fadeIn();
    } else{
      $('.pageup__item').fadeOut();
    }
  });

  $("a[href=#upper], [href=#catalog]").on("click", function(e){
    e.preventDefault();
    var anchor = $(this).attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 60
    }, 800);
  });

  new WOW().init();

});