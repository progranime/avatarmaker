/*
	Author: Jeremy Espinosa
	Filename: views.js
	Description: Changing the card list into gridview / listview
	Dependencies: none
*/

var AVATAR = AVATAR || {};

(function($){
	"use strict";

	AVATAR.views = {

		init: function() {
			this.domCache();
			this.eventHandler();
		},

		domCache: function() {
			this.$btnViews = $(".btn-views");
		},

		eventHandler: function() {
			var self;
			self = AVATAR.views;

			this.$btnViews.on("click", self.changeView);
		},

		changeView: function(e) {
			var $container, view;
			$container = $(".card-container");
			view = $(this).data("view");

			if(view == "grid") {
				$container.removeClass("listview");
			} else {
				$container.addClass("listview");
			}

		}
	}

	$(function(){
		AVATAR.views.init();
	});

})(jQuery);