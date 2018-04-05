//1 undefined is a palceholder, in case it is polluted outside
(function (global, undefined) {

    var class2type = {},
        version = "0.0.1",
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

        jQuery = function (selector, context) {
            return new jQuery.prototype.init(selector, context);
        }

    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        init: function (selector, context) {

            //handle $("") $(null) $(false) $(undefiend)
            //return init object
            if (!selector) {
                return this;
            }
            /**
            $(document)   
            $(‘<div>’) 
            $(‘div’) 
            $(‘#test’) 
            $(function(){}) 
            $("input:radio", document.forms[0]); 
            $(‘input’, $(‘div’)) 
            $() 
            $("<div>", { 
                    "class": "test", 
                    text: "Click me!", 
                    click: function(){ $(this).toggleClass("test"); } 
                }).appendTo("body"); 
            $($(".test"))
            $([]) $({})
             */
            if (typeof selector === "string") {

            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.selector = selector;
                return this;
            } else if (selector.isFunction(selector)) {
                console.log("callback");
            }

            //handle $($("div"))
            if (selector.selector !== "undefined") {
                this.context = context;
                this.selector = selector;
            }

            return jQuery.makeArray(selector, this);
        },
        selector: "",

        length: 0,

        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        }
    };

    //point to same prototype!!!
    //which means each init object's function can suitable for jquery object
    jQuery.fn.init.prototype = jQuery.fn;

    /**core extend method
        $.extend({})   extend plugin
        $.extend({}, {}, {})  extend each obj to first obj
        $.extend(true/false, {}, {}) shallow or deep copy
        $.fn.extend({})  extend jquery object method
    */
    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,

            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ?
                            [arr] : arr
                    );
                } else {
                    [].prototype.push.call(ret, arr);
                }
            }

            return ret;
        },

        merge: function (first, second) {
            var l = second.length,
                i = first.length,
                j = 0;

            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },
        isFunction: function (obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray,

        isWindow: function (obj) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },

        // args is for internal usage only
        each: function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        type: function (obj) {
            if (obj == null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[Object.prototype.toString.call(obj)] || "object" :
                typeof obj;
        },

        //{"name", "jack", age : 33}
        isPlainObject: function (obj) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            // Support: Firefox <20
            // The try/catch suppresses exceptions thrown when attempting to access
            // the "constructor" property of certain host objects, ie. |window.location|
            try {
                if (obj.constructor &&
                    !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }

            return true;
        },

        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        }
    });

    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);

        if (jQuery.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || type !== "function" &&
            (length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj);
    }

    /*
    工具函数 Utilities
    异步队列 Deferred
    浏览器测试 Support
    数据缓存 Data
    队列 queue
    属性操作 Attribute
    事件处理 Event
    选择器 Sizzle
    DOM遍历
    DOM操作
    CSS操作
    异步请求 Ajax
    动画 FX
    坐标和大小
    CMD && ADM
    */
    window.jQuery = window.$ = jQuery;

    //1 pass window so function can find window faster according to scope chain
    //2 pass arguments can be compressed easily 
    //3 semicolons must 
})(typeof window !== "undefind" ? window : this);