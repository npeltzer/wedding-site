$(function () {
    $(".nav-link").on("click", function () {
      var curId = $(this).attr("href");
      $(".tab-pane").removeClass("active");
      $(".nav-link").removeClass("active");
      $(".tab-pane" + curId).addClass("active");
    });
    $('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
    $('#clock').countdown('2020/10/30').on('update.countdown', function (event) {
      var $this = $(this).html(event.strftime(''
        + '<span class="h1 font-weight-bold">%D</span> Day%!d'
        + '<span class="h1 font-weight-bold">%H</span> Hr'
        + '<span class="h1 font-weight-bold">%M</span> Min'
        + '<span class="h1 font-weight-bold">%S</span> Sec'));
    });
  })