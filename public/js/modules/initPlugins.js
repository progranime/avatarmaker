/*
    Author: Jeremy Espinosa
    File Name: initplugins.js
    Description: Initializing of the functions / pluigns
*/

var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.initPlugins = {

		init: function() {
			if($(".pagination--container")) {
				//initialize the pagination if this pagination--container class exists
				AVATAR.pagination.init();
			}

			if($(".favorite")) {
				//initialize the favorites js if favorite class exists
				AVATAR.favorites.init();
			}
		}

	}

	$(function() {
		AVATAR.initPlugins.init();
	})


})(jQuery);