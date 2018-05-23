var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.hbHelper = {

		init: function() {

			Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {

	        	switch(operator) {
	        		case '==':
			            return (v1 == v2) ? options.fn(this) : options.inverse(this);
			        case '===':
			            return (v1 === v2) ? options.fn(this) : options.inverse(this);
			        case '!=':
			            return (v1 != v2) ? options.fn(this) : options.inverse(this);
			        case '!==':
			            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
			        case '<':
			            return (v1 < v2) ? options.fn(this) : options.inverse(this);
			        case '<=':
			            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			        case '>':
			            return (v1 > v2) ? options.fn(this) : options.inverse(this);
			        case '>=':
			            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			        case '&&':
			            return (v1 && v2) ? options.fn(this) : options.inverse(this);
			        case '||':
			            return (v1 || v2) ? options.fn(this) : options.inverse(this);
			        default:
			            return options.inverse(this);
	        	}

	        });


	        Handlebars.registerHelper("isEmpty", function(v1, type) {

	        	if(type == "object") {
	        		return $.isEmptyObject(v1);
	        	}

	        	return "";

	        });

	        var randomId;
	        Handlebars.registerHelper("generateRandomId", function(property) {
	        	randomId = property + Math.random();
	        });

	        Handlebars.registerHelper("getRandomId", function() {
	        	return randomId;
	        });

		}
	}

	$(function() {
		AVATAR.hbHelper.init();
	});


})(jQuery);