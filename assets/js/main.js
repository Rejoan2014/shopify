(function ($) {
  "use strict";

  $(document).ready(function () {


    /*---------- Mobile Menu  ----------*/
    $.fn.etmobilemenu = function (options) {
      var opt = $.extend(
        {
          menuToggleBtn: ".et-menu-toggle",
          bodyToggleClass: "et-body-visible",
          subMenuClass: "et-submenu",
          subMenuParent: "menu-item-has-children",
          gtSubMenuParent: "menu-item-has-children",
          subMenuParentToggle: "et-active",
          meanExpandClass: "et-mean-expand",
          appendElement: '<span class="et-mean-expand"></span>',
          subMenuToggleClass: "et-open",
          toggleSpeed: 400,
        },
        options
      );

      return this.each(function () {
        var menu = $(this); // Select menu

        // Menu Show & Hide
        function menuToggle() {
          menu.toggleClass(opt.bodyToggleClass);

          // collapse submenu on menu hide or show
          var subMenu = "." + opt.subMenuClass;
          $(subMenu).each(function () {
            if ($(this).hasClass(opt.subMenuToggleClass)) {
              $(this).removeClass(opt.subMenuToggleClass);
              $(this).css("display", "none");
              $(this).parent().removeClass(opt.subMenuParentToggle);
            }
          });
        }

        // Class Set Up for every submenu
        menu.find("." + opt.subMenuParent).each(function () {
          var submenu = $(this).find("ul");
          submenu.addClass(opt.subMenuClass);
          submenu.css("display", "none");
          $(this).addClass(opt.subMenuParent);
          $(this).addClass(opt.gtSubMenuParent); // Add menu-item-has-children class
          $(this).children("a").append(opt.appendElement);
        });

        // Toggle Submenu
        function toggleDropDown($element) {
          var submenu = $element.children("ul");
          if (submenu.length > 0) {
            $element.toggleClass(opt.subMenuParentToggle);
            submenu.slideToggle(opt.toggleSpeed);
            submenu.toggleClass(opt.subMenuToggleClass);
          }
        }

        // Submenu toggle Button
        var itemHasChildren = "." + opt.gtSubMenuParent + " > a";
        $(itemHasChildren).each(function () {
          $(this).on("click", function (e) {
            e.preventDefault();
            toggleDropDown($(this).parent());
          });
        });

        // Menu Show & Hide On Toggle Btn click
        $(opt.menuToggleBtn).each(function () {
          $(this).on("click", function () {
            menuToggle();
          });
        });

        // Hide Menu On outside click
        menu.on("click", function (e) {
          e.stopPropagation();
          menuToggle();
        });


        // Stop Hide full menu on menu click
        menu.on("click", function (e) {
          e.stopPropagation();
        });

        // Prevent submenu from hiding when clicking inside the menu
        menu.find("div").on("click", function (e) {
          e.stopPropagation();
        });
      });
    };

    $(".et-menu-wrapper").etmobilemenu();



    /*---------- 02.Sticky fix ----------*/
    $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if (topPos > 10) {
        $('.sticky-wrapper').addClass('sticky');
        $('.category-menu').addClass('close-category');
      } else {
        $('.sticky-wrapper').removeClass('sticky')
        $('.category-menu').removeClass('close-category');
      }
    })

    // After
    $('.menu-expand').on('click', function (e) {
      e.preventDefault();
      $('.category-menu').toggleClass('open-category');
    });



    /*---------- 03.Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {

      $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
      });
      var sideMenuChild = $sideMenu + ' > div';
      $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
      });

      $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    };


    popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
    popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');



    /*-----------------------------------
          04. Counterup 
        -----------------------------------*/
    if ($('.counter-number').length) {
      $('.counter-number').counterUp({
        delay: 10,
        time: 1000,
      });
    }


    /*-----------------------------------
          05. Wow Animation 
        -----------------------------------*/
    new WOW().init();


    /*-----------------------------------
          06. Set Background Image & Mask   
        -----------------------------------*/
    if ($("[data-bg-src]").length > 0) {
      $("[data-bg-src]").each(function () {
        var src = $(this).attr("data-bg-src");
        $(this).css("background-image", "url(" + src + ")");
        $(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }

    if ($("[data-mask-src]").length > 0) {
      $("[data-mask-src]").each(function () {
        var mask = $(this).attr("data-mask-src");
        $(this).css({
          "mask-image": "url(" + mask + ")",
          "-webkit-mask-image": "url(" + mask + ")",
        });
        $(this).addClass("bg-mask");
        $(this).removeAttr("data-mask-src");
      });
    }


    /*-----------------------------------
          07.Global Slider
        -----------------------------------*/
    function applyAnimationProperties() {
      $("[data-ani]").each(function () {
        var animationClass = $(this).data("ani");
        $(this).addClass(animationClass);
      });

      $("[data-ani-delay]").each(function () {
        var delay = $(this).data("ani-delay");
        $(this).css("animation-delay", delay);
      });
    }

    // Call the animation properties function
    applyAnimationProperties();

    // Function to initialize Swiper
    function initializeSwiper(sliderContainer) {
      var sliderOptions = sliderContainer.data("slider-options");

      console.log("Slider options: ", sliderOptions);

      var previousArrow = sliderContainer.find(".slider-prev");
      var nextArrow = sliderContainer.find(".slider-next");
      var paginationElement = sliderContainer.find(".slider-pagination");
      var numberedPagination = sliderContainer.find(
        ".slider-pagination.pagi-number"
      );

      var paginationStyle = sliderOptions["paginationType"] || "bullets";
      var autoplaySettings = sliderOptions["autoplay"] || {
        delay: 6000,
        disableOnInteraction: false,
      };

      var defaultSwiperConfig = {
        slidesPerView: 1,
        spaceBetween: sliderOptions["spaceBetween"] || 24,
        loop: sliderOptions.hasOwnProperty("loop") ? sliderOptions["loop"] !== false : true,

        speed: sliderOptions["speed"] || 1000,
        initialSlide: sliderOptions["initialSlide"] || 0,
        centeredSlides: !!sliderOptions["centeredSlides"],
        effect: sliderOptions["effect"] || "slide",
        fadeEffect: {
          crossFade: true,
        },
        autoplay: autoplaySettings,
        navigation: {
          nextEl: nextArrow.length ? nextArrow.get(0) : null,
          prevEl: previousArrow.length ? previousArrow.get(0) : null,
        },
        pagination: {
          el: paginationElement.length ? paginationElement.get(0) : null,
          type: paginationStyle,
          clickable: true,
          renderBullet: function (index, className) {
            var bulletNumber = index + 1;
            var formattedNumber =
              bulletNumber < 10 ? "0" + bulletNumber : bulletNumber;
            if (numberedPagination.length) {
              return (
                '<span class="' +
                className +
                ' number">' +
                formattedNumber +
                "</span>"
              );
            } else {
              return (
                '<span class="' +
                className +
                '" aria-label="Go to Slide ' +
                formattedNumber +
                '"></span>'
              );
            }
          },
        },
        on: {
          slideChange: function () {
            setTimeout(
              function () {
                this.params.mousewheel.releaseOnEdges = false;
              }.bind(this),
              500
            );
          },
          reachEnd: function () {
            setTimeout(
              function () {
                this.params.mousewheel.releaseOnEdges = true;
              }.bind(this),
              750
            );
          },
        },
      };

      var finalConfig = $.extend({}, defaultSwiperConfig, sliderOptions);
      console.log("Complete Swiper options: ", finalConfig);

      // Initialize the Swiper instance
      return new Swiper(sliderContainer.get(0), finalConfig);
    }

    // Initialize Swipers on page load
    var swiperInstances = [];
    $(".global-slider").each(function () {
      var sliderContainer = $(this);
      var swiperInstance = initializeSwiper(sliderContainer);
      swiperInstances.push(swiperInstance);
    });

    // Bootstrap tab show event
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      var targetTab = $(e.target).attr("href");
      $(targetTab)
        .find(".global-slider")
        .each(function () {
          var sliderContainer = $(this);
          if (!sliderContainer[0].swiper) {
            initializeSwiper(sliderContainer);
          } else {
            sliderContainer[0].swiper.update();
          }
        });
    });

    // Add click event handlers for external slider arrows based on data attributes
    $("[data-slider-prev], [data-slider-next]").on("click", function () {
      var targetSliderSelector =
        $(this).data("slider-prev") || $(this).data("slider-next");
      var targetSlider = $(targetSliderSelector);

      if (targetSlider.length) {
        var swiper = targetSlider[0].swiper;

        if (swiper) {
          if ($(this).data("slider-prev")) {
            swiper.slidePrev();
          } else {
            swiper.slideNext();
          }
        }
      }
    });


            // Initialize Swipers on page load
            var swiperInstances = [];
            $('.ct-slider').each(function () {
                var sliderContainer = $(this);
                var swiperInstance = initializeSwiper(sliderContainer);
                swiperInstances.push(swiperInstance);
            });

    /*-----------------------------------
           08. Back to top    
        -----------------------------------*/
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 20) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $(document).on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });



    /*-----------------------------------
            09. MagnificPopup  view    
    -----------------------------------*/
    $(".popup-video").magnificPopup({
      type: "iframe",
      removalDelay: 260,
      mainClass: "mfp-zoom-in",
    });

    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });



    /*-----------------------------------
            10. NiceSelect     
    -----------------------------------*/
    if ($(".single-select").length) {
      $(".single-select").niceSelect();
    }



    /*-----------------------------------
           Mouse Cursor    
    -----------------------------------*/
    function mousecursor() {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover");
            t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "a, .cursor-pointer", function () {
            ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
                t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
    $(function () {
      mousecursor();
    });






    /*-----------------------------------
          Text Splitting
    -----------------------------------*/
    Splitting();


      /*-----------------------------------
          Img TO Svg Convert
      -----------------------------------*/ 

        // Convert All Image to SVG
        $("img.svg").each(function () {
          var $img = $(this),
              imgID = $img.attr("id"),
              imgClass = $img.attr("class"),
              imgURL = $img.attr("src");

          $.get(
              imgURL,
              function (data) {
                  var $svg = $(data).find("svg");
                  if (typeof imgID !== "undefined") {
                      $svg = $svg.attr("id", imgID);
                  }
                  if (typeof imgClass !== "undefined") {
                      $svg = $svg.attr("class", imgClass);
                  }
                  $svg = $svg.removeAttr("xmlns:a");
                  $img.replaceWith($svg);
              },
              "xml"
          );
      });


  }); // End Document Ready Function



})(jQuery); // End jQuery

