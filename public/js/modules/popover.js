/*
    Author: Jeremy Espinosa
    File Name: popover.js
    Description: This is a must to initilize the popover because in bootstrap it is not initilize automatically
*/

var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.popover = {

		init: function() {
			$('[data-toggle="popover"]').popover();
		}

	}

	$(function() {
		AVATAR.popover.init();
	});


})(jQuery);