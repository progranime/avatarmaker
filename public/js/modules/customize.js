/*
	Author: Jeremy Espinosa
	File name: customize.js
	Description: 
				Customizing the avatar by:
				1. Changing assets
				2. Changing color assets

				If done customizing the avatar you have choices:
				1. Download it with options of PNG / JPEG.
				2. Save it to the database, after saving it will be redirect in myavatars.php .
				3. Keep designing 
	Page Used: custom-avatar.php
*/

var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.customize = {

		init: function() {

			// For Skin Selection
			this.colorSelection();

			// Enable the applying of the colors
			this.applyColor('skin');
			this.applyColor('hair');
			this.applyColor('clothes-upper');
			this.applyColor('clothes-lower');
			this.applyColor('shoes');
			// this.applyColor('eyebrow');

			this.eventHandler();
		},

		eventHandler: function() {
			var self;
			self = AVATAR.customize;

			$(document).on('click', '.collection__item', function(){
				var $this = $(this);
				$this.siblings('.is-active').removeClass('is-active');
				$this.addClass('is-active');
			});

			// For changing hair
			$(document).on('click', '.collection__hair > .collection__item', function(){
				var $hairFront   =   $(document).find('#svgOutput .avatar-hair-front');
				var $hairBack    =   $(document).find('#svgOutput .avatar-hair-back');

				//to refresh the content
				$hairFront.empty();
				$hairBack.empty();

		  		$hairFront.html($(this).find('.avatar-hair-front').html());
		  		$hairBack.html($(this).find('.avatar-hair-back').html());

		  		self.rePaint('hair');
			});

			// For changing head
			$(document).on('click', '.collection__head > .collection__item', function(){
				var $head    =   $(document).find('#svgOutput .avatar-head');

		  		$head.html($(this).find('.avatar-head').html());

		  		self.rePaint('skin');
			});

			// For changing eyebrows
			$(document).on('click', '.collection__eyebrows > .collection__item', function(){
				var $eyebrows    =   $(document).find('#svgOutput .avatar-eyebrows');

		  		$eyebrows.html($(this).find('.avatar-eyebrows').html());

		  		self.rePaint('eyebrow');
			});

			// For changing mouth
			$(document).on('click', '.collection__mouth > .collection__item', function(){
				var $mouth   =   $(document).find('#svgOutput .avatar-mouth');

		  		$mouth.html($(this).find('.avatar-mouth').html());

		  		self.rePaint('mouth');
			});

			// For changing eyes
			$(document).on('click', '.collection__eyes > .collection__item', function(){
				var $eyes   =   $(document).find('#svgOutput .avatar-eyes');

		  		$eyes.html($(this).find('.avatar-eyes').html());

		  		self.rePaint('eyes');
			});


			// For changing clothes top
			$(document).on('click', '.collection__clothes-upper > .collection__item', function(){
				var $clothesUpper   =   $(document).find('#svgOutput .avatar-clothes-upper');
				var $clothesLower   =   $(document).find('#svgOutput .avatar-clothes-lower');

		  		$clothesUpper.html($(this).find('.avatar-clothes-upper').html());

		  		//if the clothes is dress
		  		self.isDress($clothesUpper, $clothesLower);

		  		self.rePaint('clothes-upper');
		  		self.rePaint('skin');
			});

			// For changing clothes lower
			$(document).on('click', '.collection__clothes-lower > .collection__item', function(){
				var $clothesLower   =   $(document).find('#svgOutput .avatar-clothes-lower');

		  		$clothesLower.html($(this).find('.avatar-clothes-lower').html());

		  		self.rePaint('clothes-lower');
		  		self.rePaint('skin');
			});

			// For changing shoes
			$(document).on('click', '.collection__shoes > .collection__item', function(){
				var $shoes   =   $(document).find('#svgOutput .avatar-shoes');
				var $clothesLower   =   $(document).find('#svgOutput .avatar-clothes-lower');
				var html = $shoes.html($(this).find('.avatar-shoes').html());

				//for changing layering (either top layer = tl or bottom layer = bl)
				self.layering(html, $shoes, $clothesLower);

		  		self.rePaint('shoes');
		  		self.rePaint('skin');
			});

			// For changing instruments
			$(document).on('click', '.collection__instruments > .collection__item', function(){
				var $instruments    =   $(document).find('#svgOutput .avatar-instrument');
				console.log($(this).find('.avatar-instrument').html());
		  		$instruments.html($(this).find('.avatar-instrument').html());
			});

			// For changing devices
			$(document).on('click', '.collection__instruments > .collection__item', function(){
				var $instruments    =   $(document).find('#svgOutput .avatar-device');
		  		$instruments.html($(this).find('.avatar-device').html());
		  		self.rePaint('skin');
			});

			// For changing keyboards
			$(document).on('click', '.collection__instruments > .collection__item', function(){
				var $instruments    =   $(document).find('#svgOutput .avatar-keyboard');
		  		$instruments.html($(this).find('.avatar-keyboard').html());
		  		self.rePaint('skin');
			});
		},

		colorSelection: function(){
			$('.collection-color .collection__item').each(function(index, item){
				$(this).css({
					'background-color' : $(this).data('color')
				})
			});
		},

		applyColor: function(part){
			var self = AVATAR.customize;
			var newColorBase;

			$(document).on('click', '.collection-color__' + part + ' .collection__item', function(){
				var $this = $(this);

				$this.siblings().removeAttr('style');
				self.colorSelection();

				$this.css({
					'border-color' : self.adjustColor($(this).data('color'), 125),
					'box-shadow'   : '0px 0px 0px 1px ' + $(this).data('color')
				});

				$this.siblings('.is-active').removeClass('is-active');
				$this.addClass('is-active');

				self.rePaint(part);
			});
		},

		adjustColor: function(color, adjustment){
			var self = AVATAR.customize;
			// Empty array for the new colors
		    var adjustColors = [];
		    var adjust;

		    // Getting the array of the color
		    var newColor = self.rgbColors(color);

			$.each(newColor, function(index, item){

				var int = parseInt(item) + adjustment;

				int < 0 ? int = 0 : int;
				int > 255 ? int = 255 : int;

				adjustColors.push(int);
			});

			return adjust = 'rgb(' + adjustColors[0] + ',' + adjustColors[1] + ',' + adjustColors[2] + ')';
		},

		rgbColors: function(hex) {
			// Remove whitespaces in hex
			var hex = hex.replace(/\s/g, "");

			// Separating the R, G and B
		    var result = /^rgb\(?([a-fA-F\d]{1,})+\,+([a-fA-F\d]{1,})+\,+([a-fA-F\d]{1,})\)$/i.exec(hex);

		    // Dropping the first element
		    result.shift();

		    return result;
		},

		rePaint: function(part){
			var self, gender, newColorBase, $fillToColorBase, $fillToColorShade, $fillToColorTint, $strokeToColorBase, $strokeToColorShade, 
			colorCollection;
			self = AVATAR.customize;
			gender = $(".avatar-position_lists").find(".img-holder.is-active").data("gender");

			if((part == "hair" || part == "eyebrow") && (gender == "female" || gender == "male")) {
				// console.log("OK!");
				part = "hair";
				newColorBase       	   =    $('.collection-color__' + part).find('.is-active').data('color');
				$fillToColorBase       =    $('.avatar-maker_output [data-fill="' + "eyebrow" + '-color_base"]');
				$fillToColorShade      =    $('.avatar-maker_output [data-fill="' + "eyebrow" + '-color_shade"]');
				$fillToColorTint       =    $('.avatar-maker_output [data-fill="' + "eyebrow" + '-color_tint"]');
				$strokeToColorBase     =    $('.avatar-maker_output [data-stroke="' + "eyebrow" + '-color_base"]');
				$strokeToColorShade    =    $('.avatar-maker_output [data-stroke="' + "eyebrow" + '-color_shade"]');

				$fillToColorBase.attr('fill', self.adjustColor(newColorBase, -50));
			}

			newColorBase       	   =    $('.collection-color__' + part).find('.is-active').data('color');
			$fillToColorBase       =    $('.avatar-maker_output [data-fill="' + part + '-color_base"]');
			$fillToColorShade      =    $('.avatar-maker_output [data-fill="' + part + '-color_shade"]');
			$fillToColorTint       =    $('.avatar-maker_output [data-fill="' + part + '-color_tint"]');
			$strokeToColorBase     =    $('.avatar-maker_output [data-stroke="' + part + '-color_base"]');
			$strokeToColorShade    =    $('.avatar-maker_output [data-stroke="' + part + '-color_shade"]');

			if(newColorBase == undefined) { return };

			$fillToColorBase.attr('fill', newColorBase);
			$fillToColorShade.attr('fill', self.adjustColor(newColorBase, -15));
			$fillToColorTint.attr('fill', self.adjustColor(newColorBase, 30));
			$strokeToColorBase.attr('stroke', newColorBase);
			$strokeToColorShade.attr('stroke', self.adjustColor(newColorBase, -30));
			
		},

		isDress: function($clothes, $clothesLower) {

			var isDress = $clothes.find('.dress').length;
			  		
			if(isDress) {
				$clothesLower.attr("display","none");
			}else{	
				$clothesLower.attr("display","block");
			}

		},

		layering: function(html, obj, dependentObj) {
			if(obj.find('.tl').length) {
				html.insertAfter(dependentObj);
			}else{
				html.insertBefore(dependentObj);
			}
		}

	};

	$(function() {

		AVATAR.customize.init();

	});


})(jQuery);