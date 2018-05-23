
var AVATAR = AVATAR || {};

(function($){
    "use strict";

    AVATAR.converter = {

        init: function() {
            this.globalVar();
            this.domCache();

            this.bindEvents();

            // this.addHtmlContent();
            /*console.log(this.delete_null_properties({
                "background": {},
                "hello": {flo1: "ada"}
            }));*/

            var data = {
                "female": {
                    "background": {},
                    "hello": {flo1: "ada"}
                }
            };

            // console.log($.isEmptyObject(data.hello));

            console.log(this.removeEmptyObject(data));

        },

        globalVar: function() {
            //avatar json
            this._avatarJson = {
                "avatar": {
                    "male" : {
                        "hair": {},
                        "head": {},
                        "eyebrows": {},
                        "eyes": {},
                        "mouth": {},
                        "clothesUpper": {},
                        "clothesLower": {},
                        "guitars": {},
                        "drums": {},
                        "devices": {},
                        "keyboards" : {},
                        "shoes": {},
                        "background": {}
                    },
                    "female": {
                        "hair": {},
                        "head": {},
                        "eyebrows": {},
                        "eyes": {},
                        "mouth": {},
                        "clothesUpper": {},
                        "clothesLower": {},
                        "guitars": {},
                        "drums": {},
                        "devices": {},
                        "keyboards" : {},
                        "shoes": {},
                        "background": {}
                    }
                }
            };

            //for elements class
            this._idsKey = {
                "hf": {
                    "class": "avatar-hair-front",
                    "bodyPart": "hair"
                },
                "hb": {
                    "class": "avatar-hair-back",
                    "bodyPart": "hair"
                },
                "hd": {
                    "class": "avatar-head",
                    "bodyPart": "head"
                },
                "eb": {
                    "class": "avatar-eyebrows",
                    "bodyPart": "eyebrows"
                },
                "ey": {
                    "class": "avatar-eyes",
                    "bodyPart": "eyes"
                },
                "mo": {
                    "class": "avatar-mouth",
                    "bodyPart": "mouth"
                },
                "up": {
                    "class": "avatar-clothes-upper",
                    "bodyPart": "clothesUpper"
                },
                "lo": {
                    "class": "avatar-clothes-lower",
                    "bodyPart": "clothesLower"
                },
                "gtr": {
                    "class": "avatar-instrument",
                    "bodyPart": "guitars"
                },
                "drm": {
                    "class": "avatar-instrument",
                    "bodyPart": "drums"
                },
                "dev": {
                    "class": "avatar-device",
                    "bodyPart": "devices"
                },
                "kb" : {
                    "class": "avatar-keyboard",
                    "bodyPart": "keyboards"
                },
                "sh": {
                    "class": "avatar-shoes",
                    "bodyPart": "shoes"
                },
                "bg": {
                    "class": "avatar-background",
                    "bodyPart": "background"
                }
            };

            this._styles = ["fill","stroke"];
            this._combinedParts = {
                "hf": "hr",
                "hb": "hr"
            };

        },

        bindEvents: function() {
            var self = AVATAR.converter;
            this.$svgFile.on('change', self.addFileContent);
            this.$btnJson.on('click', function() {
                self.clearData();
                self.initAttachAttr(self.$content.children());
            });
            this.$btnClear.on('click', self.clearData);
            this.$btnJson.on('click', self.addHtmlContent);
        },

        domCache: function() {
            this.$content = $(".content");
            this.$maleContent = $(".male-content");
            this.$femaleContent = $(".female-content");

            this.$svgField = $(".svg-field");
            this.$jsonField = $(".json-field");
            this.$maleField = $(".male-field");
            this.$femaleField = $(".female-field");


            this.$svgFile = $(".svg-file");

            this.$btnJson = $(".btn-json");
            this.$btnClear = $(".btn-clear");
        },

        addFileContent: function(evt) {
            var self, file, reader;
            self = AVATAR.converter;
            file = evt.target.files[0];
            if(file) {
                reader = new FileReader();
                reader.onload = function(e) {
                    var text = e.target.result;
                    var html = $.parseHTML(text);
                    self.$content.empty().append(html);
                    self.$content.children().addClass('parent');

                }
                reader.readAsText(file);
            }

            
        },

        addHtmlContent: function() {
            var self, html;
            self = AVATAR.converter;
            html = $.parseHTML(self.$svgField.val());
            //add to dom
            self.$content.append(html);
            self.initAttachAttr(self.$content.children().addClass("parent"));
        },

        initAttachAttr: function(obj) {
            var self, children, id;
            self = AVATAR.converter;
            children = obj.children();

            $.each(children, function(index, obj) {
                id = self.get("id", obj);
                self.attachAttr(obj, "xmlns", "http://www.w3.org/2000/svg");
                self.convertIdToClass(obj);
                self.initAttachDataAttr(obj);
            });

            console.table(self._avatarJson);

            // the data to their respective field
            self.addToField();

        },

        

        convertIdToClass: function(obj, cond) {
            var self, id, children, splitIds, match;
            self = AVATAR.converter;
            match = self.get(obj,"" ,"match");

            try{
                if(cond == "splitter") {
                    id = self.get(obj,"id");

                    if(id != undefined) {
                        splitIds = self.splitter(id, "_");

                        for(var x=0; x < splitIds.length; x++) {
                            if(splitIds[x] == "dress" || splitIds[x] == "tl") {
                                self.attachAttr($(obj).children(), "class", splitIds[x]);
                            }
                        }
                    }

                } else {
                    console.log("Match: " + match);
                    self.attachAttr(obj, "class", self._idsKey[match]["class"]);
                }
            }catch(err) {
                console.log("Error in class: " + err);
            }   

        },

        initAttachDataAttr: function(obj) {
            var self, parent, id, children, splitIds;
            self = AVATAR.converter;

            $.each($(obj), function(index, obj) {
                parent = $(obj);
                children = parent.find("*");
                
                $.each(children, function(sIndex, sObj) {
                    id = self.get(sObj,"id");
                    
                    if(id != undefined) {
                        splitIds = self.splitter(id, "_");
                        self.convertIdToDataAttr(splitIds, $(sObj));
                    } else {
                        self.attachAttr(sObj, "data", self._styles);
                    }

                });

                // if have additional class like dress
                self.convertIdToClass(obj, "splitter");

                //coverting the html to json
                self.initConverter($(obj));

                //display all parts with index of 1
                //for displaying the base SVG
                self.displaySvgBase($(obj));
               
            });

            //attaching all attribute of an element
            self.attachAllElementsAttr(self.$content.find('svg'), self.$maleContent.find('svg'));
            self.attachAllElementsAttr(self.$content.find('svg'), self.$femaleContent.find('svg'));


        },

        convertIdToDataAttr: function(splitIds, obj) {
            var self, styles, convert;
            self = AVATAR.converter;
            styles = self._styles;

            for(var x = 0; x < splitIds.length; x++) {
                for(var y = 0; y < styles.length; y++) {
                    if(splitIds[x].match(styles[y])) {
                        //converting it to lowercase
                        convert = (splitIds[x].replace(/([a-z](?=[A-Z]))/g, '$1-')).toLowerCase();
                        //replace the color- to color_ based on naming convention
                        convert = convert.replace('color-','color_');
                        //replace styles with blank space
                        convert = convert.replace(styles[y] + "-", "");
                        //add data attr
                        self.attachAttr(obj, "data-" + styles[y], convert);
                    }
                }
            }

        },

        initConverter: function(obj) {
            var self, match, gender;
            self = AVATAR.converter;
            match = self.get(obj, "", "match");
            //need to consider for static parts like body "bo"
            if(match != undefined) {
                gender = self.get(obj, "", "gender");

                //for combined parts like hair (hair front and back)
                self.combinedParts(obj, match);
                //for either male or female
                self.separateParts(obj, gender);
            }

        },

        displaySvgBase: function(obj) {
            var self, index, gender, uKey;
            self = AVATAR.converter;
            index = self.get(obj, "", "index");

            if(index == 1) {
                obj.removeAttr('display');
                gender = self.get(obj, "", "gender");
                

                if(typeof gender === "object") {    
                    uKey = self.get(obj, "", "uKey");
                    for(var x =0; x < gender.length; x++) {
                        self.attachAttr(obj, "id", uKey[x]);
                        $("." + gender[x] + "-content svg").append(obj[0].outerHTML);
                    }
                } else {
                    $("." + gender + "-content svg").append(obj[0].outerHTML);
                }
            } else {
                self.attachAttr(obj, "display", "none");
            }

        },

        combinedParts: function(obj, match) {
            var self, gender, cKey;
            self = AVATAR.converter;

            if(match == "hf" || match == "hb") {
                gender = self.get(obj, "", "gender");
                cKey = self.get(obj, "", "cKey");

                if(typeof gender === "object") {
                    for(var x=0; x < cKey.length; x++) {
                        self.convertHtmlToJson(obj, gender[x], cKey[x]);
                    }
                } else {
                    self.convertHtmlToJson(obj, gender, cKey);
                }
            }

        },

        separateParts: function(obj, gender) {
            var self;
            self = AVATAR.converter;

            if(typeof gender === "object") {
                //for unisex
                self.neutralGender(obj, gender);
            } else {
                self.singleGender(obj, gender);
            }

        },

        neutralGender: function(obj, gender) {
            var self, gender, uKey, match;
            self = AVATAR.converter;
            gender = self.get(obj, "", "gender");
            match = self.get(obj, "", "match");

            // get unisex key ex. mey1 fey1
            uKey = self.get(obj, "", "uKey");

            for(var x=0; x < gender.length; x++) {
                if(match != "hf" && match != "hb") {
                    console.log("wew");
                   self.convertHtmlToJson(obj, gender[x], uKey[x]); 
                }
            }

        },

        singleGender: function(obj, gender) {
            var self, match, gender, key;
            self = AVATAR.converter;
            match = self.get(obj, "", "match");
            gender = self.get(obj, "", "gender");
            key = self.get(obj, "", "key");

            if(match != "hf" && match != "hb") {
                self.convertHtmlToJson(obj, gender, key);
            }
        },


        convertHtmlToJson: function(obj, gender, key) {
            var self, match, bodyPart, avatarJson, key, html, replace;
            self = AVATAR.converter;
            match = self.get(obj, "", "match");
            bodyPart = self._idsKey[match]["bodyPart"];
            avatarJson = self._avatarJson["avatar"][gender][bodyPart];

            //replacing the ' to "
            replace = obj[0].outerHTML.replace(/\"/g, "\'");
            //replacing the attribute of display with blank space
            replace = replace.replace(/display=\'none\'/g, "");
            // replace = replace.replace(/id=\'[a-zA-Z0-9]*\'/g,"");
            html = replace;
            //to avoid giving undefined value
            avatarJson[key] = avatarJson[key] || [];
            //appending the value
            avatarJson[key] += html;

        },

        get: function(obj, attr, cond) {
            var self, id, match, initials, index, key, uKey, genderInitials, cKey;
            self = AVATAR.converter;
            uKey = [];
            cKey = [];
            genderInitials = ["m", "f"];

            try {
                
                if(cond == "match") {
                    id = self.get($(obj), "id");
                    match = id.match(/(hf|hb|hd|eb|ey|mo|up|lo|gtr|drm|dev|kb|sh|bg)/g);
                    return match != undefined ? match : undefined;
                } else if(cond == "gender") {   
                    initials = self.get(obj, "id", "initials");

                    if(initials == "m") return "male";
                    else if(initials == "f") return "female";
                    else return ["male","female"];

                } else if(cond == "initials") {
                    return $(obj).attr(attr).charAt(0);
                } else if(cond == "key") {
                    id = self.get(obj, "id");
                    initials = self.get(obj, "id", "initials");
                    match = self.get(obj, "", "match") != undefined ? self.get(obj, "", "match") : id;
                    index = self.get(obj, "", "index");
                    key = initials + match + index;
                    return key;

                } else if(cond == "uKey") {

                    for(var x = 0; x < genderInitials.length; x++) {
                        id = self.get(obj, "id");
                        initials = self.get(obj, "id", "initials").replace('u', genderInitials[x]);
                        match = self.get(obj, "", "match") != undefined ? self.get(obj, "", "match") : id;
                        index = self.get(obj, "", "index");
                        uKey.push(initials + match + index);
                    }
                    
                    return uKey;

                } else if(cond == "cKey") {
                    initials = self.get(obj, "id", "initials");
                    if(initials == "u") {
                        index = self.get(obj, "", "index");
                        match = self._combinedParts[self.get(obj, "", "match")];
                        for(var x=0; x < genderInitials.length; x++) {
                            cKey.push(genderInitials[x] + match + index);
                        }
                    } else {
                        index = self.get(obj, "", "index");
                        match = self._combinedParts[self.get(obj, "", "match")];
                        cKey = initials + match + index;
                    }
                    
                    return cKey;
                } else if(cond == "index") {
                    id = self.get(obj, "id");
                    return id.match(/[0-9]+/g) != null ? id.match(/[0-9]+/g)[0] : 0;
                } else {
                    return $(obj).attr(attr) != undefined ?  $(obj).attr(attr) : undefined;
                }

            }catch(err) {
                console.log("Error in " + cond + ": " + err);
            }
        },

        attachAttr: function(obj, attr, value) {
            var self;
            self = AVATAR.converter;

            if(typeof value === "object") {
                for(var x =0 ; x < value.length; x++) {
                    if(self.get(obj, value[x]) != "none") {
                        self.attachAttr(obj, attr + "-" + value[x], self.get(obj, value[x]));
                    }
                }
            } else {
                $(obj).attr(attr, value);

            }
        },

        splitter: function(val, delimeter) {
            try {
                return val.split(delimeter);
            }catch(err){
                console.log("Error: " + err);
            }
        },

        attachAllElementsAttr: function(elem, obj) {

            $.each($(elem), function() {
                $.each(this.attributes, function(index, attr) {
                    $(obj).attr(attr.name, attr.value);
                });
            });
        },

        addToField: function() {
            var self, replace;
            self = AVATAR.converter;

            // before adding to json field remove the empty object

            self.removeEmptyObject(self._avatarJson);

            replace = (JSON.stringify(self._avatarJson)).replace(/(\\n|\\t)/g, "");
            self.$jsonField.val(replace);

            self.$maleField.val($(".male-content").html());
            self.$femaleField.val($(".female-content").html());
        }, 

        clearData: function() {
            var self = AVATAR.converter;
            self.clearJson();
            self.$maleField.val('');
            self.$femaleField.val('');
            self.$jsonField.val('');
        },

        clearJson: function() {
            this._avatarJson = {
                "avatar": {
                    "male" : {
                        "hair": {},
                        "head": {},
                        "eyebrows": {},
                        "eyes": {},
                        "mouth": {},
                        "clothesUpper": {},
                        "clothesLower": {},
                        "guitars": {},
                        "drums": {},
                        "devices": {},
                        "keyboards" : {},
                        "shoes": {},
                        "background": {}
                    },
                    "female": {
                        "hair": {},
                        "head": {},
                        "eyebrows": {},
                        "eyes": {},
                        "mouth": {},
                        "clothesUpper": {},
                        "clothesLower": {},
                        "guitars": {},
                        "drums": {},
                        "devices": {},
                        "keyboards" : {},
                        "shoes": {},
                        "background": {}
                    }
                }
            };
        },

        /**
         * Delete all null (or undefined) properties from an object.
         * Set 'recurse' to true if you also want to delete properties in nested objects.
         */
        removeEmptyObject: function (myObj) {
            var self = AVATAR.converter;

            /*$.each(myObj, function (key, value) {
                console.log($.isEmptyObject(myObj[key]));
                if ($.isEmptyObject(myObj[key])) {
                    delete myObj[key];
                }
            });*/

            $.each(myObj, function (key, value) {
                console.log($.isEmptyObject(myObj[key]));
                /*if ($.isEmptyObject(myObj[key])) {
                    delete myObj[key];
                }*/
                $.each(myObj[key], function (key, value) {
                    if (myObj[key][key] !== undefined) {
                        console.log(myObj[key][key]);
                    }
                });
            });


            return myObj;
        }

    }

    $(function(){
        AVATAR.converter.init();
    });



})(jQuery);