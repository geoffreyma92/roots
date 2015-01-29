/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$( document ).ready(function() {
  $('.textwidget > p img').addClass('img-responsive');

  $(".menu-about-us a").attr("disabled");

  $(function(){
    $(".dropdown").hover(
      function() {
        $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
        $(this).toggleClass('open');
        $('b', this).toggleClass("caret caret-up");
      },
      function() {
        $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
        $(this).toggleClass('open');
        $('b', this).toggleClass("caret caret-up");
      }
    );
  });

  $("li.menu-about > a").click(function() {
    $(this).removeAttr('data-toggle data-target');
  });

  //Form
  $('.collection-form').hide();
  // $('#panel-274-0-0-1').hide();
  $(".jumper").on("click", function( e ) {
      e.preventDefault();
      $('.collection-form').show();
      $("body, html").animate({ 
          scrollTop: $( $(this).attr('href') ).offset().top 
      }, 600);
      
  });


  // Maps JS
  $(".wpgmza_sl_search_button").appendTo($(".modal-footer"));
  $(".map-submit").appendTo($(".wpgmza_sl_query_div"));
  $(".wpgmza_sl_search_button, .wpgmaps_get_directions").addClass("btn");
  $(".wpgmza_sl_search_button").val("Agree");

  $( ".wpgmza_sl_search_button").click(function() {
    $(this).css("margin-left", "12px");
    $('.maps-modal-lg').modal('hide');
    $(".wpgmza_sl_search_button").appendTo($(".wpgmza_sl_query_div"));
    $(".map-submit").appendTo($(".modal-footer"));
    $(".wpgmza_sl_search_button").val("Submit");
  });

  validate();
  $('#addressInput').change(validate);

});

function validate(){
    if ($('#addressInput').val().length >  0) {
        $(".map-submit").prop("disabled", false);
    }
    else {
        $(".map-submit").prop("disabled", true);
    }
}

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
