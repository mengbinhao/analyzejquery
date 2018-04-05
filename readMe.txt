# analyzejquery(based on version 2.0.3)

#### 1. define constroctor
    jQuery.fn.init.prototype = jQuery.fn;

#### 2. add method to jQuery's prototype
    version 
    constructor
    init()   
            elem && elem.parentNode  --> double check dom element if exists
    selector
    length
    toArray()
    get()
    pushStack()
    each()
    ready()
    slice()
    first()
    last()
    eq()
    map()
    end()
    push()     (internal)
    sort()     (internal)
    splice()   (internal)

#### 3. jQuery.extend = jQuery.fn.extend    same code implement different function
            $.extend({xxx}) 
                    一个参数扩展插件的形式   
                    多个参数扩展到第一个对象上
                    还可以深拷贝浅拷贝   $.extend(true, aObj, bObj) 
            $.fn.extend({xxx})   一个参数扩展实例方法

#### 4. JQuery.extend   扩展工具方法
        expando()         (internal)
        noConflict()    
        isReady()         (internal)    
        readyWait         (internal)
        holdReady() 
        ready()
        isFunction()
        isArray()
        isWindow()
        isNumberic()
        type()
        isPlainObject()
        isEmptyObject()
        error()
        parseHTML()
        parseJSON()
        parseXMLs()
        noop()
        gloabalEval()
                  eval  window.eval
        camelCase()        (internal)    
        nodeName()         (internal)    
        each()
        trim()
        makeArray()
        inArray()
        merge()
        grep()      filter
        map()
        guid                     (internal)    
        proxy()     change this       
        access()    多功能值操作  (internal)    
        now()
        swap()       css交换      (internal)    
    jQuery.ready.promise() = function(){}   (internal)    
    isArrayLike    (internal)    

#### 5. Sizzle 

#### 6. Callback    函数统一管理(观察者模式)
        once memory unique stopOnFalse
        add
        remove
        has
        empty
        disable
        disabled
        lock
        locked
        fireWith
        fire
        fired

#### 7. Deferred    异步统一管理
        resolve --> done
        reject  --> fail
        notify  --> progress
        promise
            state
            always
            then
            promise
            pipe
            done
            fail
            progress
        $.when(xxx, yyyy).done(function(){}).fail(function() {})   针对多延迟对象

#### 8. support     功能检测
        support just check
        hooks is implement compatibility
        $(function() {
            for (var attr in $.support) {
                $("body").append("<div>" + attr + ":" + $.support[attr] + "</div>");
            }
        }); 

#### 9. data        数据缓存(避免内存泄漏)
    jQuery.extend(
        accessData
        hasData
        data
        removeData
        _data
        _removeData
    )

    jQuery.fn.extend(
        data
        removeData
    )

    Data.prototype= {
        key
        set
        get
        access
        remove
        hasData
        discard
    }
#### 10. queue       队列管理(针对多异步)
    jQuery.extend(
        queue
        dequeue
        _queueHooks
    )

    jQuery.fn.extend(
        queue
        dequeue
        delay
        clearQueue  
        promise
    )
#### 11. attr() prop() addClass() .....
    jQuery.extend(
        valHooks
        attr
        removeAttr
        attrHooks
        propFix
        prop
        propHooks
    )

    jQuery.fn.extend(
        attr
        removeAttr
        prop
        removeProp
        addClass
        removeClass
        hasClass
        toggleClass
        val
    )

    attr ==> setAttribute()
    prop ==> obj.name | obj[name]

    1 prop() is not support custom attribute
    2 attr() get a's href attribute is differernt with prop()
    3 removeProp() can not delete id attibute

#### 12. on() off() trigger()   core thought(62)
    jQuery.event = {
        global 事件全局属性
        add
        remove
        trigger
        dispatch   配发事件的具体操作
        handles    函数执行顺序操作
        props      JQ共享原生JS的evnet属性
        fixHooks   收集event兼容集合
        keyHooks
        mouseHooks
        fix        event对象兼容处理
        special    特殊事件兼容处理
        simulate   fousein模拟操作(trigger dispatch)
    }

    jQuery.Event = function()
    jQuery.Event.prototype = {
        isDefaultPrevented
        isPropagationStopped
        isImmediatePropagationStopped
        preventDefault
        stopPropagation
        stopImmediatePropagation
    }
    jQuery.fn.extend = {
        on
        off
        one
        trigger
        triggerHandler     不会触发默认行为
    }

    .click .mouseover .....

    jQuery.fn.extend = {
        hover
        bind
        unbind
        delegate
        undelegate
    }
                             ev.originaEvent原生event
    jQuery.event.special = {
        load
        focus
        blur
        click
        beforeunload
        mouseenter
        mouseleave
        focusin
        focusout
    }

#### 13. DOM opertion
    jQuery.fn.extend = {
        filter() --> 自身
        not()    --> 自身
        has()    --> 子项
        find()   --> 子项
        is()
        closeset() -->找最近的 包括自身 
        index()   -->兄弟节点的索引
        add()
        addBack()
    }
    function sibling(){}
    jQuery.each({
        parent()
        parents()
        parentUntil()
        next()
        prev()
        nextAll()
        prevAll()
        nextUntil()
        prevUntil()
        siblings()
        children()
        content()
    })
    jQuery.extend = ({
        filter()
        dir()
        sibling()
    })

    function window(){}
    jQuery.fn.extend = {
        text()  
        append()
        before()    
        after()
        remove()
        detach()
        empty()
        clone()
        html()
        replaceWith()
        domManip()
    }
    jQuery.each({
        appendTo : "append"
        prependTo : "prepend"
        insertBefore : "before"
        insertAfter : "after"
        replaceAll : "replaceWith"
    })

    jQuery.extend = ({
        clone()
        buildFragment()
        cleanData()
        _evalUrl
    })
    function manipulationTarget(){}
    function disableScript(){}
    function restoreScript(){}
    function setGlobalScript(){}
    function cloneCopyEvent(){}
    function getAll(){}
    function fixInput(){}
    jQuery.fn.extend = ({
        wrapAll()
        wrapInner()
        wrap()
        unwrap()
    })

#### 14. css()
    function vendorPropName(){}
    function isHidden(){}
    function getStyle(){}
    function showHide(){}
    jQuery.fn.extend = ({
        css()
        show()
        hide()
        toggle()
    })
    jQuery.extend = ({
        cssHooks()
        cssNumber()
        cssProps()
        style()
        css()
    })
    curCSS = function(){}
    function setPositiveNumber(){}
    function augmentWidthOrHeight(){}
    function getWidthOrHeight(){}
    function css_defaultDisplay(){}
    function actualDisplay(){}
    some Hooks

#### 15. ajax()    98
    $.param
    $.serialize
    $.serializeArray

    function addToPrefiltersOrTransports(){}
    function inspectPrefiltersOrTransports(){}
    function ajaxExtend(){}

    jQuery.fn.load = function(){}
    jQuery.extend = (
        ajaxSettings
        ajaxSetup
        ajaxPrefilter
        ajaxTransport
        ajax
        getJSON
        getScript
    )
    jQuery.each(["get", "post"], function(){})
    function ajaxHandleResponses(){}
    function ajaxConvert(){}
#### 16. animate()
    tweeners = {}
    function createFxNow(){}
    function createTween(){}
    function Animation(){}
    function propFilter(){}
    jQuery.Animation = jQuery.extend(Animation, {
        tweener,
        prefilter
    })
    function defaultPrefilter(){}
    function Tween(){}
    Tween.prototype = {
        init,
        cur,
        run
    }
    Tween.propHooks = {}
    jQuery.each(["toggle", "show", "hide"], function(){})
    jQuery.fn.extend = (
        fadeTo
        animate
        stop
        finish
    )
    function getFx(){}
    jQuery.each({
        slideDown
        slideUp
        slideToggle
        fadeIn
        fadeOut
        fadeToggle
    }, function(){})
    jQuery.speed = function(){}
    jQuery.easing = {
        linear,
        swing
    }
    jQuery.timers= []
    jQuery.fx.tick = function(){}
    jQuery.fx.timer = function(){}
    jQuery.fx.interval = function(){}
    jQuery.fx.start = function(){}
    jQuery.fx.stop = function(){}
    jQuery.fx.speeds = function(){}

#### 17. offset()
    width()           -->  width 
    innerWidth()      -->  width + padding
    outerWidth()      -->  width + padding + border
    outerWidth(true)  -->  width + padding + border + margin
    
    offset()
    position()    不会计算margin
    scrollTop()
#### 18. support module

#### 19. window.jquery = window.$ = jquery