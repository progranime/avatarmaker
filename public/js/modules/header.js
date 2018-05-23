var AVATAR = AVATAR || {};

(function ($) {
	"use strict";

	AVATAR.header = {

		init: function () {
			this.domCache();
			this.eventHandler();
		},

		domCache: function () {
			this.$ghOverlay			= $(".global-overlay");

			this.$gh			= $(".global-header");
			this.$ghNav 		= this.$gh.find(".global-header__nav");

			this.$ghSearch 				= this.$gh.find(".global-header__search");
			this.$ghSearchContainer 	= this.$gh.find(".search--container");
			this.$ghSearchBtnClose		= this.$ghSearchContainer.find(".btn-close");

			this.$ghLists 			= this.$gh.find(".global-header__lists");
			this.$ghListsSignIn 	= this.$ghLists.find(".signin");
			this.$ghSigninContainer = this.$ghListsSignIn.find(".signin--container");
			this.$ghScBtnClose		= this.$ghSigninContainer.find(".btn-close");

			this.$ghFloatingAction  = $(".global-header__floating-action");
		},

		eventHandler: function () {
			var self;
			self = AVATAR.header;

			this.$ghNav.on("click", function () {
				// item click , to be active class, overlay
				self.addActive($(this), self.$ghLists, self.$ghOverlay);
				
			});

			this.$ghSearch.on("click", "> a", function () {
				self.addActive($(this), self.$ghSearchContainer, null);
			});

			this.$ghListsSignIn.on("click", ".btn-signin", function () {
				self.$ghLists.css({
					"overflow-y" : "unset"
				});

				self.addActive(self.$ghListsSignIn, self.$ghSigninContainer, null);
			});

			this.$ghScBtnClose.on("click", function () {
				self.closeActive(self.$ghSigninContainer, self.$ghSigninContainer);
			});

			this.$ghSearchBtnClose.on("click", function () {
				self.closeActive(self.$ghSearchContainer, self.$ghSearchContainer);
			});

			this.$ghFloatingAction.on("click", function() {
				self.$gh.toggleClass("is-visible");
				$(this).toggleClass("is-active");
			});
		},

		addActive: function(toActive, toOpen, toOverlay) {

			toActive.toggleClass("is-active");
			toOpen.toggleClass("is-visible");
			if(toOverlay != null) {
				toOverlay.toggleClass("is-visible");
			}
		},

		closeActive: function(toInActive, toHide) {
			toHide.removeClass("is-visible");
		}

	}

	$(function () {
		AVATAR.header.init();
	});



})(jQuery);