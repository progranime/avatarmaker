/*
    Author: Jeremy Espinosa
    File Name: filter.js
    Description: Options in filtering the data:  
    			 1. Favorites - your favorites in merge data of library and gallery
    			 2. Library - all avatars in library
    			 3. Library (M/F) - can filter avatar library based on its gender
    			 4. Library And Gallery - Merge data of library and gallery in a one object and pass it to a handlebar template
    			 5. Library and Gallery (M/F) - can filter merge data of library and gallery based on its gender
    Paged Used:
    			 1. index.php, myavatars.php
*/

var AVATAR = AVATAR || {};
(function($) {
	"use strict";

	AVATAR.filter = {
		init: function() {
			this.domCache();
			this.eventHandler();
		},

		domCache: function() {
			this.$filter = $(".filter");
		},

		eventHandler: function() {
			var self;
			self = AVATAR.filter;

			this.$filter.on("change", self.filtering);
		},

		filtering: function() {
			var value, requestId, search, containerClass, templateId, requestData;
			requestId = new Array();
			containerClass = new Array();
			requestData = AVATAR.requestData;

			value = $(this).prop("value");
			search = $(this).find("option:selected").data("search");

			templateId = "hb-avatar-lists";
			console.log(search);

			if(search == "getMyFavoritesInLibrary") {

				requestData.libraryConfig.url = "get/getMyFavoritesInLibrary";
				AVATAR.requestData.getData(requestData.libraryConfig);

			} else if(search == "getAllLibrary") {

				requestData.libraryConfig.url = "get/getAllLibrary";
				AVATAR.requestData.getData(requestData.libraryConfig);

			} else if(search == "getAllLibraryBasedOnGender") {

				requestData.libraryConfig.url = "get/getAllLibraryBasedOnGender";
				requestData.libraryConfig.data.value = value;
				AVATAR.requestData.getData(requestData.libraryConfig);

			} else if(search == "getAllTable") {

				requestData.galleryConfig.url = "get/getAllMyGallery";
				AVATAR.requestData.getData(requestData.galleryConfig);

				requestData.favoritesConfig.url = "get/getAllMyFavoritesInAllTable";
				AVATAR.requestData.getData(requestData.favoritesConfig);

			} else if(search == "getAllMyGallery") {
				
				requestData.galleryConfig.url = "get/getAllMyGallery";
				AVATAR.requestData.getData(requestData.galleryConfig);
				$(document).find(".avatar-favorites .hb-wrapper").empty();

			} else if(search == "getAllMyFavoritesInAllTable") {

				requestData.favoritesConfig.url = "get/getAllMyFavoritesInAllTable";
				AVATAR.requestData.getData(requestData.favoritesConfig);
				$(document).find(".avatar-gallery .hb-wrapper").empty();

			} else if(search == "getAllTableBasedOnGender") {

				requestData.favoritesConfig.data.value = value;
				requestData.favoritesConfig.url = "get/getMyFavoritesInAllTableBasedOnGender";
				AVATAR.requestData.getData(requestData.favoritesConfig);
				
				requestData.galleryConfig.data.value = value;
				requestData.galleryConfig.url = "get/getAllMyGalleryBasedOnGender";
				AVATAR.requestData.getData(requestData.galleryConfig);

			}


			/*if(search == "getMyFavoritesInLibrary") {

				requestData.libraryConfig.data.requestId = "getMyFavoritesInLibrary";
				AVATAR.requestData.getData(requestData.libraryConfig);

			} else if(search == "getAllLibrary") {

				requestData.libraryConfig.data.requestId = "getAllLibrary";
				AVATAR.requestData.getData(requestData.libraryConfig);

			} else if(search == "getAllLibraryBasedOnGender") {

				requestData.libraryConfig.data.requestId = "getAllLibraryBasedOnGender";
				requestData.libraryConfig.data.value = value;
				AVATAR.requestData.getData(requestData.libraryConfig);

			} else if(search == "getAllTable") {

				requestData.galleryConfig.data.requestId = "getAllMyGallery";
				AVATAR.requestData.getData(requestData.galleryConfig);

				requestData.favoritesConfig.data.requestId = "getAllMyFavoritesInAllTable";
				AVATAR.requestData.getData(requestData.favoritesConfig);

			} else if(search == "getAllMyGallery") {
				
				requestData.galleryConfig.data.requestId = "getAllMyGallery";
				AVATAR.requestData.getData(requestData.galleryConfig);
				$(document).find(".avatar-favorites .hb-wrapper").empty();

			} else if(search == "getAllMyFavoritesInAllTable") {

				requestData.favoritesConfig.data.requestId = "getAllMyFavoritesInAllTable";
				AVATAR.requestData.getData(requestData.favoritesConfig);
				$(document).find(".avatar-gallery .hb-wrapper").empty();

			} else if(search == "getAllTableBasedOnGender") {

				requestData.favoritesConfig.data.value = value;
				requestData.favoritesConfig.data.requestId = "getAllMyFavoritesInAllTableBasedOnGender";
				AVATAR.requestData.getData(requestData.favoritesConfig);
				
				requestData.galleryConfig.data.value = value;
				requestData.galleryConfig.data.requestId = "getAllMyGalleryBasedOnGender";
				AVATAR.requestData.getData(requestData.galleryConfig);

			}*/

		}
	}

	$(function(){
		AVATAR.filter.init();
	});

})(jQuery);