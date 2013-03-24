/* =====================================================================
*
*    utility.js
*
* =================================================================== */

jQuery.extend(jQuery.easing,
{
	easeInQuart: function (x, t, b, c, d)
	{
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d)
	{
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d)
	{
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	}
});

var Util = function()
{
	var init = function()
	{
		$(document).ready(function()
		{
			$(window).load(function(){
				$('a[href^="#"]').click(function()
				{
					var e = $(this);
					if(e.attr("href") == "#") return false;
					var ty = $(e.attr("href")).position().top;
					var destId = e.attr("href");
					animateAnchorClick(destId);
					//$('html,body').animate({scrollTop: ty}, 1000, 'easeInOutQuint');
					return false;
				});
				$(".btn1").commonBtn();
				$(".g-nav li a").globalNavBtn();
				$(".mod-product-section li a").commonBtn();
			});
		});
	}();


	return{

	}
}();

function animateAnchorClick(destAnchor)
{
	if (!$("html,body").is(":has(" + destAnchor + ")"))
	{
		return false;
	}
	var destPos = $(destAnchor).position().top;
	$('html,body').animate({scrollTop: destPos}, 1000, 'easeInOutQuint');
}


/**
 *
 * @param {Object} $
 */
(function($){
	$.fn.globalNavBtn = function(options)
	{
		var defaults = {
			vec: 0
		};
		var options = $.extend(defaults, options);

		$(this).hover(function(){
			$(this).stop(true, false).animate({ opacity: 0.6 }, 300);

		},function(){
			$(this).stop(true, false).animate({ opacity: 1 }, 300);
		});

		return this;
	};
	$.fn.localNavBtn = function(options)
	{
		var defaults = {
			vec: 0
		};
		var options = $.extend(defaults, options);

		$(this).hover(function(){
			$(this).stop(true, false).animate({ opacity: 0.6 }, 300);

		},function(){
			$(this).stop(true, false).animate({ opacity: 1 }, 300);
		});

		return this;
	};
	$.fn.commonBtn = function(options)
	{
		var defaults = {
			vec: 0
		};
		var options = $.extend(defaults, options);

		$(this).hover(function(){
			$(this).stop(true, false).animate({ opacity: 0.6 }, 100);

		},function(){
			$(this).stop(true, false).animate({ opacity: 1 }, 300);
		});

		return this;
	};
})(jQuery);
