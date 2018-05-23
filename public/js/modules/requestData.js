/*
    Author: Jeremy Espinosa
    File Name: requestData.js
    Description: 
    			1. Requesting the data to the backend (PHP) and retrieve the converted data into json
				2. Passing the data to the Handlebar Template
				3. Then initialize the callback function most of it are initialization of functions / plugins,
				   because the the functions will not work if the template is not yet rendered.
*/

var AVATAR = AVATAR || {};

(function($){
	"use strict";

	AVATAR.requestData = {

		init: function() {
			var self;
			self = AVATAR.requestData;
			self.dataCongfig();
			if($(".avatar-library").length) {
				//need to request data from database which will return json to the handlebar to output
				this.getData(self.libraryConfig);
			}

			if($(".avatar-gallery").length) {
				//need to request data from database which will return json to the handlebar to output
				this.getData(self.galleryConfig);
			}

			if($(".avatar-favorites").length) {
				//need to request data from database which will return json to the handlebar to output
				this.getData(self.favoritesConfig);
			}

		},

		dataCongfig: function() {
			this.libraryConfig = {
				url: "get/getAllLibrary",
				method: "get",
				containerClass: "avatar-library",
				templateId: "hb-avatar-lists",
				data: {

				},
				callback: function() {
					AVATAR.downloads.init();
					AVATAR.favorites.init();
					AVATAR.pagination.init();
					AVATAR.popover.init();
					AVATAR.thumbnailModal.init();
				}
			};

			this.galleryConfig = {
				url: "get/getAllMyGallery",
				method: "get",
				containerClass: "avatar-gallery",
				templateId: "hb-avatar-lists",
				data: {
					// requestId: "getAllMyGallery"
				},
				callback: function() {
					AVATAR.downloads.init();
					AVATAR.favorites.init();
					AVATAR.pagination.init();
					AVATAR.popover.init();
					AVATAR.thumbnailModal.init();
				}
			};

			this.favoritesConfig = {
				url: "get/getAllMyFavoritesInAllTable",
				method: "get",
				containerClass: "avatar-favorites",
				templateId: "hb-avatar-lists",
				data: {
					// requestId: "getAllMyFavoritesInAllTable"
				},
				callback: function() {
					AVATAR.favorites.init();
					AVATAR.downloads.init();
					AVATAR.pagination.init();
					AVATAR.popover.init();
					AVATAR.thumbnailModal.init();
				}
			};
		},

		getData: function(config) {
			var self;
			self = AVATAR.requestData;
			$.ajax({
				url: config.url,
				method: config.method,
				data: config.data,
				success: function(data) {
					console.log(data);
					//create a handlebar to create this
					self.template(config.containerClass, config.templateId, data);
					// console.log(data);
				}
			}).done(function() {
				//must load this after creating the template
				//for the function to work
				config.callback();
			});
		},

		template: function(containerClass, templateId, data) {
			var $container, template, templateScript, html;

			$container = $("." + containerClass);
			template = $("#" + templateId).html();
			templateScript = Handlebars.compile(template);

			
			// catching if the json is valid or not
			try {
				html = templateScript($.parseJSON(data));
			} catch(e) {
				html = templateScript(data);
			}

			if($container.find(".hb-wrapper").length) {
				$container.find('.hb-wrapper').remove().promise().done(function() {
					$container.append(html);
				});
			} else {
				$container.append(html);
			}
			
		}

	}

	$(function() {
		AVATAR.requestData.init();
	});


})(jQuery);