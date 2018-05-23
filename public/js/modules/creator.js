/*
	Author: Jeremy Espinosa
	File name: creator.js
	Description: 
				Choosing Gender and Position:
				1. Need to determine if avatar-position-lists is present 
				2. If present populate the lists using the data inside data folder with the file of public/data/avatarPosition.js
				3. make a eventhandler for img-holder to determine if active

*/

var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.creator = {
		init: function() {
			if(!$(".avatar-position_container").length) { return ; }
			this.requestAvatarPositions();
		},

		domCache: function() {
			//for avatar position elements
			this.$avatarPositionContainer = $(".avatar-position_container");
			this.$avatarPositionLists 	  = this.$avatarPositionContainer.find(".avatar-position_lists");
			this.$avatarPosition 		  = this.$avatarPositionLists.find(".img-holder");
			this.$btnNext 				  = this.$avatarPositionLists.find(".btn-next");
			//for avatar maker elements
			this.$avatarMakerContainer 	  = $(".avatar-maker_container");
			this.$btnFinish 			  = this.$avatarMakerContainer.find(".btn-finish");
			this.$btnBack 			  	  = this.$avatarMakerContainer.find(".btn-back");
			
			this.$terminalModal 		  = $("#terminal-modal");
			this.$downloadOptions 		  = this.$terminalModal.find(".download-options");
			this.$btnDownload 			  = this.$terminalModal.find(".btn-download");
			this.$saveForm 				  = this.$terminalModal.find("#saveForm");

			this.$terminalModalOptions 	  = this.$terminalModal.find(".terminal-modal--options");
			this.$tmoDownloads 			  = this.$terminalModalOptions.find(".downloads");
			this.$tmoSave 				  = this.$terminalModalOptions.find(".save");
			this.$tmoBack 				  = this.$terminalModal.find(".btn-back");


			this.$svgOutput = this.$avatarMakerContainer.find("#svgOutput");

			//collection elements
			
			// check if the dropdown is visible 
			// then if show the the back button
			// else hide it
			this.$tmoBack.hide();
			
		},

		eventHandler: function() {
			var self;
			self = AVATAR.creator;

			this.$avatarPosition.on("click", self.isActiveAll);

			this.$btnNext.on("click", function() {
				self.$avatarPositionContainer.addClass("d-none");
				self.$avatarPositionContainer.siblings(".avatar-maker_container").removeClass("d-none");

				//must get also the attributes need to pass
				//then request the json for the avatar to be created
				
				//get the base svg for this avatar
				self.baseSvg();
				
				// preventing the user from exiting and reloading page without confirmation
				/*$(window).bind('beforeunload', function(){
				  return 'Are you sure you want to leave?';
				});*/


			});

			// going back from the avatar positions
			this.$btnBack.on("click", function () {
				self.$avatarMakerContainer.addClass("d-none")
					.siblings(".avatar-position_container").removeClass("d-none");
			});

			this.$terminalModal.on("shown.bs.modal", function() {
				var $imgHolder;
				$imgHolder = $(this).find(".img-holder");
				$imgHolder.empty().append(self.$svgOutput.find("svg").clone());
			});

			$(".btn-download-type, .btn-download-size").on("click", self.isActive);

			this.$btnDownload.on("click", self.downloadSvg);

			this.$saveForm.on("submit", self.saveSvg);

			this.$tmoDownloads.on("click", "> img", function() {
				self.isVisible($(this).parents(".downloads").find(".downloads-dropdown"));
				self.$tmoSave.find(".save-dropdown").removeClass("is-visible");
				self.$tmoBack.show();
			});

			this.$tmoSave.on("click", "> img", function() {
				self.isVisible($(this).parents(".save").find(".save-dropdown"));
				self.$tmoDownloads.find(".downloads-dropdown").removeClass("is-visible");
				self.$tmoBack.show();
			});

			this.$tmoBack.on("click", function() {

				if(self.$tmoDownloads.find(".downloads-dropdown.is-active")) {
					self.$tmoDownloads.find(".downloads-dropdown").removeClass("is-visible");
				} 
				if(self.$tmoSave.find(".save-dropdown.is-active")) {
					self.$tmoSave.find(".save-dropdown").removeClass("is-visible");
				}
				self.$tmoBack.hide();

			});

		},

		isActive: function() {
			$(this).addClass("is-active").siblings().removeClass("is-active");
		},

		isActiveAll: function() {
			var self = AVATAR.creator;
			$(this).parents(".avatar-position_lists").find(".img-holder").removeClass("is-active");
			$(this).addClass("is-active");

			//remove the disabled class of the next button
			self.$btnNext.removeClass("is-disabled");
		},

		requestAvatarPositions: function() {
			var self;
			self = AVATAR.creator;
			AVATAR.requestData.getData({
				url: "public/data/avatarPosition.json",
				method: "get",
				containerClass: "avatar-position_lists",
				templateId: "hb-avatar-position",
				callback: function() {
					AVATAR.creator.domCache();
					AVATAR.creator.eventHandler();
				}
			});
		},

		baseSvg: function() {
			var self, gender, position, url, svg;
			self = AVATAR.creator;

			//get the gender and position
			gender = self.$avatarPositionContainer.find(".img-holder.is-active").data("gender");
			position = self.$avatarPositionContainer.find(".img-holder.is-active").data("position");
			url = "public/images/base/avatar" + gender + position + ".svg";

			$.get({
				url: url,
				dataType: "text",
				success: function(data) {
					svg   =   $.parseHTML(data);
					svg   =   svg[0];
					self.$svgOutput.html(data);
				}

			});

			//renderAvatarAssets
			self.renderAvatarAssets(gender,position);

		},

		downloadSvg: function() {
			var self, $svg, type, size;
			self = AVATAR.creator;
			$svg = self.$svgOutput.find("svg");
			type = self.$downloadOptions.find(".btn-download-type.is-active").data("option");
			size = self.$downloadOptions.find(".btn-download-size.is-active").data("option");

			AVATAR.downloads.singleDownload($svg, type, size, "My Avatar");
			self.flashMessage($(".flash-message"), "Avatar has been downloaded successfully!", false);

		},

		saveSvg: function(e) {
			var self, $form, $svg, $gender, getGender;
			self = AVATAR.creator;

			$form = $(this);
			$svg = $form.find(".txt-svg");
			$gender = $form.find(".txt-gender");
			getGender = self.$avatarPositionLists.find(".img-holder.is-active").data("gender");

			// adding svg to the hidden input
			$svg.val(self.$svgOutput.html());
			// adding gender to the hidden input
			$gender.val(getGender);

			$.ajax({
				url: $form.prop("action"),
				method: $form.prop("method"),
				data: $form.serialize(),
				success: function(data) {
					console.log(data);
					// alert("Successfully Added to Database");
					// disabled the save button
					$form.find(".btn-save").prop("disabled", "disabled");
					self.flashMessage($(".flash-message"), "Avatar has been saved successfully!", true);

				}
			});

			e.preventDefault();
		},

		renderAvatarAssets: function(gender, position) {
			var self, url, avatarColors;
			self = AVATAR.creator;
			url = "public/data/avatar"+ gender + "" + position + ".json";
			avatarColors = "public/data/avatarColors.json";

			$.when(
				//get data of selected SVG
				$.getJSON({
					url: url
				}),
				//get avatar default colors
				$.getJSON({
					url: avatarColors
				})

			).done(function(avatar, colors) {
				var data;
				data = $.extend(avatar[0], colors[0]);
				console.log(data);
				AVATAR.requestData.template("avatar-maker_customization", "hbAvatarCustomization", data);
				// console.log($(".nav-container .nav-wrapper .nav"));
				// add here the function of changing the images in tabs
				self.changeTabImage();

			});

		},

		isVisible: function(toVisible) {
			toVisible.toggleClass("is-visible");
		},

		flashMessage: function(selector, message, redirect) {
			var timeOut;
			$(selector).text(message).addClass("is-visible");
			
			timeOut = setTimeout(function() {
				$(selector).removeClass("is-visible");

				if (redirect) {
					window.location = "avatars";
				}

			}, 3000);

		},

		changeTabImage: function() {
			var nav, $image, active = -1;

			$(".nav-container .nav-wrapper .nav li").on("click", function() {
				console.log("click");
				// inactive all images
				$.each($(this).siblings(), function(index, value) {
					$image = $(this).find("img");
					$image.prop("src", $image.data("inactive"));
				});

				// change the image of the active tab
				$image = $(this).find("img");
				$image.prop("src", $image.data("active"));

				// add active class to the tab
				$(this).siblings().removeClass("active");
				$(this).addClass("active");

				// revert the active value to -1
				active = -1;
			});

			$(".nav-container .nav-wrapper .nav li").on("mouseenter", function() {
				if(active == -1) {
					active = $(this).parent().find(".active").index();
				}

				// reverting all images to inactive
				$.each($(this).siblings(), function(index, value) {
					$image = $(this).find("img");
					$image.prop("src", $image.data("inactive"));
				});

				// change the image of the active tab
				$image = $(this).find("img");
				$image.prop("src", $image.data("active"));
			});

			$(".nav-container .nav-wrapper .nav").on("mouseleave", function() {
				// reverting all images to inactive
				$.each($(this).find("li").siblings(), function(index, value) {
					$image = $(this).find("img");
					$image.prop("src", $image.data("inactive"));
				});

				// revert the active image to be highlight
				$image = $(this).find("li.active img");
				$(this).find("li.active img").prop("src", $image.data("active"));

			});

				
		}

	}

	$(function() {
		AVATAR.creator.init();
	});


})(jQuery);