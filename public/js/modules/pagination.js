/*
    Author: Jeremy Espinosa
    File Name: pagination.js
    Description: Custom pagination for front-end
    Sample Code:
            <div class="pagination--container">
                
                <div class="pagination--lists">
                    <!-- List of Items -->
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <!-- List of Items -->
                </div>
                
                <div class="pagination--number">
                    
                </div>

            </div>
            
    How to use: 
            1. Use the "pagination--container" as your "Parent Class" the card-holder-paginate and mg-pagination class
               must strictly enclosed with this class.
            2. Inside "pagination--container" class add "pagination--lists" class to hold all of the items.
            3. Inside "pagination--container" class add "pagination--number" class to hold all of the page number for pagination.
*/


var AVATAR = AVATAR || {};

(function($) {
	"use strict";

	AVATAR.pagination = {
		init: function(options) {
			// console.log("pagination ...");
			var options = {
				parentClass: "pagination--container",
				itemHolderClass: "pagination--lists",
				itemsOnPage: 8,
				numberPerPagination: 5,
				firstIcon: "<img src='public/images/icons/pagination-arrow-left-2.png'>",
	            prevIcon: "<img src='public/images/icons/pagination-arrow-left.png'>",
	            nextIcon: "<img src='public/images/icons/pagination-arrow-right.png'>",
	            lastIcon: "<img src='public/images/icons/pagination-arrow-right-2.png'>"
			};

			// default options for pagination configuration
			this._options = $.extend({
                parentClass: "pagination--container",
                itemHolderClass: "pagination--lists",
                itemsOnPage: 8,
				numberPerPagination: 5,
                firstIcon: "<img src='public/images/icons/pagination-arrow-left-2.png'>",
	            prevIcon: "<img src='public/images/icons/pagination-arrow-left.png'>",
	            nextIcon: "<img src='public/images/icons/pagination-arrow-right.png'>",
	            lastIcon: "<img src='public/images/icons/pagination-arrow-right-2.png'>"
            }, options);

			if(!$("." + this._options.parentClass).length) { return ; }

			this.initPaginate();
		},

		initPaginate: function() {
			var self, items, $container, $parentClass;
            self = AVATAR.pagination;
            $parentClass = $("." + self._options.parentClass);
            
            $.each($parentClass, function() {
                $container = $(this);
                items = $(this).find("." + self._options.itemHolderClass).children().length;

                self.paginate({
                    container: $container,
                    items: items,
                    itemsOnPage: self._options.itemsOnPage,
                    maxPage: self.maxPage(items, self._options.itemsOnPage)
                });
            });
		},

		maxPage: function(items, itemsOnPage) {
            return Math.ceil(parseFloat(items / itemsOnPage));
        },

        paginate: function(config) {
            var self;
            self = AVATAR.pagination;

            //show pagination if page > 1
            if(config.maxPage > 1) {
                //then render the pagination
                self.renderPagination(config);
            }

        },

        renderPagination: function(config) {
            var self, $pagination, $active, pageNumber, start, startHandler, end;
            self = AVATAR.pagination;
            $pagination = config.container.find(".pagination--number");

            // to avoid appending everytime
            if(!$pagination.find("ul").length) {
                
                $pagination.append('<li class="first"><a>' + self._options.firstIcon + '</a></li>');
                $pagination.append('<li class="prev"><a><span>' + self._options.prevIcon + 'Prev</span></a></li>');

                for(var x = 1; x <= config.maxPage; x++) {
                    if(x == 1) {
                        $pagination.append('<li class="is-page-number active"><a href="#">'+ x +'</a></li>');
                    } else {
                        $pagination.append('<li class="is-page-number"><a href="#">'+ x +'</a></li>');
                    }
                }

                $pagination.append('<li class="next"><a><span>Next' + self._options.nextIcon + '</span></a></li>');
                $pagination.append('<li class="last"><a>' + self._options.lastIcon + '</a></li>');

                $pagination.wrapInner("<ul></ul>");

            }

            //adding and removing active to the pagination page number
            $pagination.find(".is-page-number").on("click", "a", self.changeLists("pageNumber", config));

            // Go to next item
            $pagination.find(".next").on("click", self.changeLists("next", config));

            // Go to previous item
            $pagination.find(".prev").on("click", self.changeLists("previous", config));

            // Go to last item
            $pagination.find(".last").on("click", self.changeLists("last", config));

            // Go to first item
            $pagination.find(".first").on("click", self.changeLists("first", config));

            self.renderLists(config);
            self.displayPaginationCustomButtons(config);
            self.paginationLists(config);
        },

        changeLists: function(direction ,config) {
            return function(e) {
                var self, $pagination, $active, pageNumber, lastPageNumber, negate, paginationLength, start, end;
                self = AVATAR.pagination;
                $pagination = config.container.find(".pagination--number");
                $active = $pagination.find(".is-page-number.active");
                pageNumber = $active.find("a").text();
                paginationLength = $pagination.find(".is-page-number").length;

                if(direction == "next") {
                    if(pageNumber < config.maxPage) {
                        $active.removeClass("active").next().addClass("active");
                    }
                } else if(direction == "previous") {
                    if(pageNumber != 1) {
                        $active.removeClass("active").prev().addClass("active");
                    }
                } else if(direction == "first") {
                    $active.removeClass("active");
                    $pagination.find("ul li").eq(2).addClass("active");
                } else if(direction == "last") {
                    $active.removeClass("active");
                    $pagination.find("ul li").eq(config.maxPage + 1).addClass("active");

                } else {
                    $(this).parent("li").addClass("active")
                     .siblings().removeClass("active");
                }

                //need to call the active pagination to get the recent page number
                $pagination = config.container.siblings(".mg-pagination").find(".paginate-this");
                $active = $pagination.find(".is-page-number.active");
                pageNumber = $active.find("a").text();

                self.paginationLists(config);
                self.renderLists(config);

                e.preventDefault();
                e.stopImmediatePropagation();
            }
        },

        renderLists: function(config) {
            var self, $container, start, end, $pagination, $active, pageNumber;
            self = AVATAR.pagination;
            $container = config.container;
            $pagination = $container.find(".pagination--number");
            $active = $pagination.find(".is-page-number.active");
            pageNumber = $active.find("a").text();

            start = config.itemsOnPage * (pageNumber - 1);
            end = start + config.itemsOnPage;
            // hide all the lists
            // then show needed items only
            $container.find("." + self._options.itemHolderClass).children().hide()
                      .slice(start, end).removeAttr("style");

            //display or hide the pagination custom buttons
            self.displayPaginationCustomButtons(config);

        },

        displayPaginationCustomButtons: function(config) {
            var self, $container, $pagination, $active, pageNumber;
            self = AVATAR.pagination;
            $container = config.container;
            $pagination = $container.find(".pagination--number");
            pageNumber = $pagination.find(".is-page-number.active").text();

            if(pageNumber == 1) {
                $pagination.find(".first, .prev").addClass("disabled");
                $pagination.find(".next, .last").removeClass("disabled");
            } else if(pageNumber == config.maxPage) {
                $pagination.find(".first, .prev").removeClass("disabled");
                $pagination.find(".next, .last").addClass("disabled");
            } else {
                $pagination.find(".first, .prev, .next, .last").removeClass("disabled");
            }
        },

        //refresh the pagination lists
        paginationLists: function(config) {
            var self, $container, $pagination, pageNumber, start, end, limit;
            self = AVATAR.pagination;

            $container = config.container;
            $pagination = $container.find(".pagination--number");
            pageNumber = $pagination.find(".is-page-number.active").text();
            limit = Math.ceil(self._options.numberPerPagination / 2);

            //formula to get the start and end of the pagination
            if(pageNumber <= limit) {
                start = 0;
                end = start + (self._options.numberPerPagination - 1);
            } else if(pageNumber >= config.maxPage - 2) {
                start = (config.maxPage - 1) - (self._options.numberPerPagination - 1);
                end = start + (self._options.numberPerPagination - 1);
            } else {
                start = parseInt(pageNumber) - limit;
                end = start + (self._options.numberPerPagination - 1);
            }

            //hide first all the pagination lists
            $pagination.find(".is-page-number").hide();
            for(var x = start; x <= end; x++) {
                //show the pagination lists
                $pagination.find(".is-page-number").eq(x).removeAttr("style");
            }
        }

	}	

	/*$(function() {
		AVATAR.pagination.init();
	});*/

})(jQuery);