/*
	Author: Jeremy Espinosa
	File name: downloads.js
	Description: User can download with the image type of PNG/JPEG , 
				 It can be single / multiple download.
	Page Used: index.php, myavatars.php, custom-avatar.php
*/

var AVATAR = AVATAR || {};

(function($){
	"use strict";
	AVATAR.downloads = {
		init: function() {
			this.domCache();
			this.eventHandler();
		},

		domCache: function() {
			this.$cardContainer = $(".card-container");
			this.$cardMenu = $(".card-menu");
			this.$cardDownloadSize = this.$cardMenu.find(".card-download-size");
			this.$cardDownloadType = this.$cardMenu.find(".card-download-type");
			this.$download = this.$cardDownloadType.find(".options");
			this.$cbkGroupDownload = $(".group-download");

			//for modal elements
			this.$groupDownloadModal = $("#group-download-modal");
			this.$btnGroupDownloadModal = this.$groupDownloadModal.find(".btn-group-download");
			this.$btnDownloadTypeModal = this.$groupDownloadModal.find(".btn-download-type");
			this.$btnDownloadSizeModal = this.$groupDownloadModal.find(".btn-download-size");
		},

		eventHandler: function() {
			var self;
			self = AVATAR.downloads;

			// opening and hiding the dropdown options
			$(".card-download-size, .card-download-type").on({
				click: function(e) {
					$(this).find(".options").toggle();
					e.stopImmediatePropagation();
				},

				mouseleave: function() {
					$(this).find(".options").hide();
				}
			});

			// when click to any place in the document except the card options it will close the options
			$(document).on("click", function() {
				// hiding the custom options when clicked outside the cards
				$.each($(".custom-select"), function() {
					$(this).find(".options").hide();
				});
			});

			// changing the image when its hovered
			// did this way because image color can't control in css
			$(".card-download-size, .card-download-type").on({
				mouseenter: function() {
					self.changeImage(this, "active");
				},

				mouseleave: function() {
					self.changeImage(this, "inactive");
				}
			});


			$(".card-download-size, .card-download-type").find(".options").on("click", "div", self.isActive);

			this.$download.on("click", self.downloadSvg);

			this.$groupDownloadModal.on("shown.bs.modal", self.groupDownloadList);

			this.$cbkGroupDownload.on("change", self.isDisabled);

			this.$btnGroupDownloadModal.on("click", self.multipleDownloads);

			this.$btnDownloadTypeModal.on("click", self.isActive);
			this.$btnDownloadSizeModal.on("click", self.isActive);

		},

		changeImage: function(elem, status) {
			var image = $(elem).find("img").data(status);
			$(elem).find("img").prop("src", image);
		},

		downloadSvg: function() {
			//must choose image size in able to preceed
			var self, $cardMenu, $target, size, type;
			self = AVATAR.downloads;
			$cardMenu = $(this).parents(".card-menu");
			$target = $cardMenu.parents(".card").find(".img-holder svg");
			size = $cardMenu.find(".card-download-size .options .is-active").data("option");
			type = $cardMenu.find(".card-download-type .options .is-active").data("option");
		
			self.singleDownload($target, type, size, 'My Avatar');
		},

		// Save SVG to different format -- still need to test
		singleDownload: function(target, type, newScale, fileName){
			var self, svg, canvas, tempLink, ctx, newHeight, newWidth;
			self = AVATAR.download;
			svg = target;

			console.log(svg);

			newWidth = svg[0].width.animVal.value * newScale;
			newHeight = svg[0].height.animVal.value * newScale;
			
			if(newScale != undefined) {
				if(type == 'JPG' || type == 'jpg') {

					if(!isNaN(newWidth) && !isNaN(newHeight)) {
						saveSvgAsPng(svg[0], fileName + ".jpg", {
				    		scale: newScale,
				    		backgroundColor: "#fff"
				    	});
			     	}

				} else if(type == 'PNG' || type == 'png') {
					saveSvgAsPng(svg[0], fileName + ".png", {
			    		scale: newScale
			    	});
				}
			}
		},

		groupDownloadList: function(e) {
			var self, $children, isChecked, avatarObj, name, svg;
			self = AVATAR.downloads;
			avatarObj = [];

			//get all list of avatar that will be downloaded
			$.each(self.$cardContainer, function() {
				$children = $(this).find(".card");
				$.each($children, function(index, value) {
					isChecked = $(this).find(".group-download").is(":checked");

					if(isChecked) {
						//add to object consist of name and avatar svg
						name = $(this).find(".title").text();
						svg = $(this).find(".img-holder").html();

						avatarObj.push({
							"name": name,
							"svg": svg
						});
					}
				});
			});

			// the used the colleted obj to output using handlebar
			AVATAR.requestData.template("group-download-lists", "hb-avatar-group-download-lists", avatarObj);

			e.stopImmediatePropagation();
		},

		isActive: function(e) {
			//adding class to active element and remove class for its siblings
			$(this).addClass("is-active").siblings().removeClass("is-active");
			e.preventDefault();

		},

		isDisabled: function(e) {
			var self, $children, $btnGroupDownload, isChecked, inc = 0;
			self = AVATAR.downloads;
			$btnGroupDownload = $(".btn-group-download");

			$.each(self.$cardContainer, function() {

				$children = $(this).find(".card");

				$.each($children, function(index, value) {
					isChecked = $(this).find(".group-download").is(":checked");

					if(isChecked) {
						inc++;
					}
				});
			});

			// this will determine if button for opening the group modal button will be disabled or not
			if(inc > 1) {
				$btnGroupDownload.removeClass("disabled");
			} else {
				$btnGroupDownload.addClass("disabled");
			}

			e.stopImmediatePropagation();
		},

		multipleDownloads: function(e) {
			var self, svg, type, size, fileName;
			self = AVATAR.downloads;

			$.each($(".group-download-lists"), function() {
				type = $(this).parents(".group-download-container").find(".group-download-options .btn-download-type.is-active").data("option");
				size = $(this).parents(".group-download-container").find(".group-download-options .btn-download-size.is-active").data("option");

				$.each($(this).find(".list-panel"), function() {
					svg = $(this).find(".img-holder svg");
					fileName = $(this).find(".title").text();

					//iterate and download every svg
					self.singleDownload(svg, type, size, fileName);
				});

			});

			e.stopImmediatePropagation();
		}
	}

	$(function() {
		AVATAR.downloads.init();
	});


})(jQuery);