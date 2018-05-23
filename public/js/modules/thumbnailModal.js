var AVATAR = AVATAR || {};

(function ($) {
	"use strict";

	AVATAR.thumbnailModal = {

		init: function () {

			this.domCache();
			this.eventHandler();

		},

		domCache: function () {
			var self = AVATAR.thumbnailModal;

			this.$card 			  = $(".card");
			this.$imgHolder 	  = this.$card.find(".img-holder");

			// thumbnail modal elements
			this.$thumbnailModal  = $("#thumbnail-modal");
			this.$tmSvg			  = this.$thumbnailModal.find(".img-holder");
			this.$downloadOptions = this.$thumbnailModal.find(".download-options");
			this.$tmBtnDownload	  = this.$thumbnailModal.find(".btn-download");

		},

		eventHandler: function () {
			var self = AVATAR.thumbnailModal;

			self.$imgHolder.on("click", function () {
				console.log("thumbnail");
				
				var data, $container;
				$container = $("#thumbnail-modal");
				$container.modal('show'); // show the modal

				data = self.cloneData($(this)); // this will return an object
				self.attachData($container, data); // attached the data to the container given

			});

			self.$tmBtnDownload.on("click", self.downloadSvg);

			$(".btn-download-type, .btn-download-size").on("click", self.isActive);

		},

		cloneData: function ($el) {
			var self, $parent, title, description, image, cb, favorite, data;

			self 		= AVATAR.thumbnailModal;
			$parent 	= $el.parents(".card");
			title		= $parent.find(".title").text();
			description	= $parent.find(".description").data("content");
			image 		= $parent.find(".img-holder").html();
			cb 			= $parent.find(".checkbox").clone();
			favorite 	= $parent.find(".favorite").clone();


			data = {
				"title"			: title,
				"description"	: description,
				"image"			: image,
				"cb"			: cb,
				"favorite" 		: favorite
			};

			console.log(data);
			console.log($parent.find(".title"));
			console.log($parent.find(".description"));

			return data;
		},

		attachData: function ($container, obj) {

			$container.find(".title").text(obj.title); // appending title
			// $container.find(".description").attr("data-content", obj.description); // appending description
			// console.log(obj.description);
			$container.find(".description").text(obj.description);
			$container.find(".img-holder").html(obj.image); // appending the svg image
			/*$container.find(".opt").append(obj.favorite) // appeding star/favorite
								   .append(obj.cb); // appending checkbox */

			// console.log(obj);

		},

		isActive: function(e) {
			$(this).addClass("is-active").siblings().removeClass("is-active");
			e.preventDefault();
		},

		downloadSvg: function(e) {
			var self, $svg, type, size;
			self = AVATAR.thumbnailModal;
			$svg = self.$tmSvg.find("svg");
			type = self.$downloadOptions.find(".btn-download-type.is-active").data("option");
			size = self.$downloadOptions.find(".btn-download-size.is-active").data("option");

			AVATAR.downloads.singleDownload($svg, type, size, "My Avatar");

			e.stopImmediatePropagation();
		}


	}

	$( function () {

		AVATAR.thumbnailModal.init();

	});




})(jQuery);