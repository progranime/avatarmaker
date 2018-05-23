/*
    Author: Jeremy Espinosa
    File Name: switcher.js
    Description: 
    			1. This is a Background Switcher it means that background will changed depends on the 
    			   window / device size. 
    			2. The device size are:
    				Desktop - 1024px and above
    				Tablet - between 768px and 1023px
    				Mobile - 767px and below
    How to use:
    			1. Add data attribute of "bg" 
    			2. There must be 3 images given and the sequence are mobile, tablet, and desktop
    			3. Sample code:
						data-bg="img/homepage1-mobile.jpg,img/homepage1-desktop.png,img/homepage1-desktop.png"

	Page used:
				1. index.php used in banner.
*/

var AVATAR = AVATAR || {};
(function($) {
	"use strict";
	AVATAR.switcher = {

		init: function() {
			if(!$(".bg-switcher").length) {return ;}
			this.domCache();
			this.BGSwitcher();
			this.onWindowResize();
		},

		domCache: function() {
			this.$bgSwitcher = $(".bg-switcher");
		},

		BGSwitcher: function() {
			var self = AVATAR.switcher;
			//get current window using tools.js
			var currentWindow = AVATAR.tools.currentWindow();

			//need to find all using the bt-bg class in the document
			$.each(self.$bgSwitcher, function(index, value) {
				var arrBg = $(this).data("bg").split(",");
				// console.log(arrBg[0] + ":" + arrBg[1] + ":" + arrBg[2]);

				if(currentWindow == "mobile") {
					console.log("mobile");
					$(this).css({
						'background-image' : 'url("' + arrBg[0] + '")'
					});
				}else if(currentWindow == "tablet") {
					console.log("tablet");
					$(this).css({
						'background-image' : 'url("' + arrBg[1] + '")'
					});
				}else {
					console.log("desktop");
					$(this).css({
						'background-image' : 'url("' + arrBg[2] + '")'
					});
				}
			});

				
			
		},

		onWindowResize: function() {
			var self;
			self = AVATAR.switcher;
			$(window).on("resize", AVATAR.tools.debounce(function() {
				self.BGSwitcher();
				console.log("resize");
			},100,false));

		}

	}

	$(function() {
		AVATAR.switcher.init();
	});


})(jQuery);