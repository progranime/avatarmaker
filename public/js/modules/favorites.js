/*
    Author: Jeremy Espinosa
    File Name: favorites.js
    Description: Adding / Removing Favorites from the database
    Page Used:
    			1. index.php, myavatars.php
*/

var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.favorites = {

		init: function() {
			this.domCache();
			this.eventHandler();
		},

		domCache: function() {
			this.$cardContainer = $(".card-container");
			this.$favorite = this.$cardContainer.find(".favorite");
		},

		eventHandler: function() {
			var self = AVATAR.favorites;
			this.$favorite.on("click", self.addRemoveFavorite);
		},

		addRemoveFavorite: function(e) {
			var self, table, id;
			self = AVATAR.favorites;
			// removing active class to the favorites icon
			self.isActive(this);

			table = $(this).data("table");
			id = $(this).data("id");

			// console.log("Table: " + table);
			// console.log("id: " + id);

			//check if is-active 
			//then if yes removed it from favorites table
			//else add it
			$.ajax({
				// url: "postData.php",
				url: "post/addRemoveFavorites",
				method: "post",
				data: {
					// requestId: "postToFavorites",
					table: table,
					id: id
				},
				success: function(data) {
					console.log(data);
				}
			});

			e.stopImmediatePropagation();

		},

		isActive: function(elem) {
			var isActive, $this;
			$this = $(elem);

			isActive = $this.hasClass("is-active");

			if(isActive) {
				$this.removeClass("is-active");
			} else {
				$this.addClass("is-active");
			}


		}

	}

	/*$(function() {
		AVATAR.favorites.init();
	});*/

})(jQuery);