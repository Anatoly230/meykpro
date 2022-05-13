"use strict";

$(document).ready(function () {
  var sliderWork = function sliderWork() {
    $('.js-carousel-thumb').each(function () {
      var $slider = $('.js-carousel-main'),
          $thumb = $(this);
      $thumb.slick({
        slidesToShow: 5.5,
        slidesToScroll: 1,
        swipe: false,
        infinite: false,
        asNavFor: $slider,
        focusOnSelect: true,
        arrows: true,
        vertical: true,
        nextArrow: '<span class="portfolio-carousel-thumb__arrow portfolio-carousel-thumb__arrow--next"></span>',
        prevArrow: '<span class="portfolio-carousel-thumb__arrow portfolio-carousel-thumb__arrow--prev"></span>',
        responsive: [{
          breakpoint: 800,
          settings: {
            vertical: false,
            slidesToShow: 4.5
          }
        }, {
          breakpoint: 500,
          settings: {
            vertical: false,
            slidesToShow: 3
          }
        }]
      });
      $slider.slick({
        asNavFor: $thumb,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 400,
        infinite: false,
        vertical: true,
        responsive: [{
          breakpoint: 768,
          settings: {
            vertical: false,
            numeric: true,
            mobileFirst: true,
            swipeToSlide: true
          }
        }]
      });
    });
  };

  var modalWindow = function modalWindow() {
    $('.js-modal').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation;
      var modal = $("#modal-callback");
      $(modal).parents('.overlay').addClass('open');
      setTimeout(function () {
        $(modal).addClass('open');
      }, 200);
      $(document).on('click', function (e) {
        var target = $(e.target);

        if ($(target).hasClass('overlay')) {
          $(target).find('.popup').each(function () {
            $(this).removeClass('open');
          });
          setTimeout(function () {
            $(target).removeClass('open');
          }, 350);
        }
      });
    });
    $('.close-modal, .overlay').on('click', function (e) {
      var $this = $(this),
          modal = $($this).data('modal');
      $(modal).removeClass('open');
      setTimeout(function () {
        $(modal).parents('.overlay').removeClass('open');
      }, 350);
    });
  };

  var scrollNav = function scrollNav() {
    $('.js-anchor').on('click', function (e) {
        console.log($("#menu-toggle").hasClass("active"));
      if ($("#menu-toggle").hasClass("active")) {
        $("#menu-toggle").toggleClass("active");
        $(".overlay-menu").toggleClass("open");
        $("body").toggleClass("locked");
      }

      $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 500);
      e.preventDefault();
    });
    $('.lnk-up').on('click', function (e) {
      $('html,body').animate({
        scrollTop: 0
      }, 500);
      e.preventDefault();
    });
  };

  var form = function form() {
    var closeModal = function closeModal() {
      var modal = $('.popup.open');
      $(modal).removeClass('open');
      setTimeout(function () {
        $(modal).parents('.overlay').removeClass('open');
      }, 350);
    };

    var openModal = function openModal(e) {
      var modal = $(e);
      modal.parents('.overlay').addClass('open');
      setTimeout(function () {
        modal.addClass('open');
      }, 200);
      $(document).on('click', function (e) {
        var target = $(e.target);

        if ($(target).hasClass('overlay')) {
          $(target).find('.popup').each(function () {
            $(this).removeClass('open');
          });
          setTimeout(function () {
            $(target).removeClass('open');
          }, 350);
        }
      });
    };

    $('body').on('submit', '.js-callback-form', function (e) {
      e.preventDefault();
      var form = $(this);
      $.ajax({
        url: 'action.php',
        type: 'POST',
        dataType: 'json',
        data: form.serialize(),
        success: function success(data) {
          closeModal();
          openModal('#popup-thank');
        }
      });
    });
  };

  var inputMask = function inputMask() {
    $('input[type="tel"]').inputmask('+7 (999) 999-99-99');
  };

  var menu = function menu() {
    $("#menu-toggle").click(function () {
      $(this).toggleClass("active");
      $(".overlay-menu").toggleClass("open"); // this line ▼ prevents content scroll-behind

      $("body").toggleClass("locked");
    });
  };

  inputMask();
  scrollNav();
  sliderWork();
  modalWindow();
  form();
  menu();
});