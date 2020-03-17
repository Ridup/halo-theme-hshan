/**
 * Main JS file for Subtle behaviours
 */
// Responsive video embeds
var videoEmbeds = [
    'iframe[src*="youtube.com"]',
    'iframe[src*="vimeo.com"]',
]
reframe(videoEmbeds.join(','))

// Smooth scroll to anchors
var scroll = new SmoothScroll('[data-scroll]', {
    speed: 300,
    updateURL: false,
})


// Sidebar toggle
var sidebarToggle = document.querySelectorAll('.sidebar-toggle')
if (sidebarToggle)
    for (var i = 0; i < sidebarToggle.length; i++)
        sidebarToggle[i].addEventListener(
            'click',
            function (e) {
                var menuCtrl = $('#sidebarToggle')
                if (menuCtrl)
                    menuCtrl.toggleClass('menu-ctrl-on')
                var scrollMenu = $('#scrollMenu')
                if (scrollMenu)
                    scrollMenu.toggleClass('scroll-menu-show')
                var siteHeader = $('#siteHeader')
                if (siteHeader)
                    siteHeader.toggleClass('site-header-scroll')
                siteHeader.toggleClass('site-header-bg')
                var sideBar = $('#sidebar')
                if (sideBar)
                    sideBar.toggleClass('sidebar-show')
                e.preventDefault()

                // 滚动条
                $(document.body).toggleClass('cancel-scroll')
            },
            {
                passive: false,
            })


function load() {
    function linksAddBlank() {
        var links = $('.post-content a')
        if (links)
            for (var i = 0; i < links.length; i++)
                $(links[i]).attr('target', '_blank')
    }

    var oldScrollTop

    // 获取滚动条距离顶部位置

    function getScrollTop() {
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop)
            scrollTop = document.documentElement.scrollTop
        else if (document.body)
            scrollTop = document.body.scrollTop
        return scrollTop
    }

    function scollHeader() {
        window.addEventListener(
            'scroll',
            function () {
                var siteHeader = $('#siteHeader')
                var scrollMenu = $('#scrollMenu')
                var sidebarToggle = $('#sidebarToggle')
                var scrollTop = getScrollTop()
                if (siteHeader && scrollTop > 0) {
                    siteHeader.addClass('site-header-scroll')
                    scrollMenu.addClass('scroll-menu-show')
                    sidebarToggle.hide()
                } else {
                    siteHeader.removeClass('site-header-scroll')
                    scrollMenu.removeClass('scroll-menu-show')
                    sidebarToggle.show()
                }
                oldScrollTop = scrollTop
            },
            false)
    }

    function toggleSearch() {
        // 搜索框
        $('.js-toggle-search').on('click', function () {
            openSearchPanel()
            $('.searchbox-input').focus()
            $('#sidebar').removeClass('sidebar-show')
            $('#sidebarToggle').removeClass('menu-ctrl-on')
            $(document.body).removeClass('sidebar-opened')
            $(document.body).removeClass('cancel-scroll')
        })
    }

    // 当前菜单菜单高亮

    function highlightMenu() {
        var nav = document.getElementById('scrollMenu')
        if (!nav) {
            return;
        }
        var links = nav.getElementsByTagName('a');
        var currenturl = document.location.href
        var last = 0
        for (var i = 0; i < links.length; i++) {
            var linkurl = links[i].getAttribute('href')
            if (currenturl.indexOf(linkurl) !== -1) {
                last = i
            }
        }
        $(links[last]).addClass('active-current')
        var currentLinks = links[last]
        if ($(currentLinks).parents('.sub-menu')) {
            var subMenu = $(currentLinks).parents('.sub-menu')
            $(subMenu[0]).siblings('a').addClass('active-current')
        }

        for (var i = 0; i < links.length; i++) {
            if (i !== last) {
                $(links[i]).removeClass('active-current')
            }
        }
    }

    function foldSubMenu() {
        $(".nav-menu-link").click(function (e) {
            var angle = $(this).children('.fa')[0];
            $(angle).toggleClass('angle-transform');
            var subMenu = $(this).siblings('.nav-sub-menu');
            if (subMenu && !$(this).siblings('.nav-sub-menu').hasClass('nav-menu-show')) {
                subMenu.velocity("transition.slideDownIn", {duration: 300});
                subMenu.addClass('nav-menu-show')
            } else if (subMenu && $(this).siblings('.nav-sub-menu').hasClass('nav-menu-show')) {
                subMenu.velocity("transition.slideUpOut", {duration: 300});
                subMenu.removeClass('nav-menu-show')
            }
        });
    }

    function pagination() {
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $('body').on('click', '#pagination a', function () {
            var pageContent = $('#pagination');
            pageContent.html("")
            pageContent.append('<div class="loader-inner ball-pulse"><div/><div/><div/></div>');
            $.ajax({
                type: "GET",
                url: $(this).attr("href"),
                success: function (data) {
                    result = $(data).find("#post-list .postItem");
                    pageInner = $(data).find("#pagination .inner");
                    // In the new content
                    $("#post-list").html(result.fadeIn(500));
                    pageContent.empty();
                    pageContent.append(pageInner);
                    document.getElementById("post-list").scrollIntoView()
                }
            });
            return false;
        });
    }

    function postItemHover() {
        $('.card').hover(function () {
            $(this).find(".card-shadow").addClass('card-shadow-hover')
        }, function () {
            $(this).find(".card-shadow").removeClass('card-shadow-hover');
        });
    }

    // 卡片hover事件
    postItemHover()

    linksAddBlank()

    // 头部菜单滚动时间
    scollHeader()

    toggleSearch()

    // 当前目录菜单高亮
    highlightMenu()

    // 菜单点击事件
    foldSubMenu()

    // 分页
    pagination()
}

// 删除日志中的空元素
$(document).ready(
    function () {
        var treeHoleBoxs = document.querySelectorAll('.tree-hole-box')
        if (treeHoleBoxs)
            for (var i = 0; i < treeHoleBoxs.length; i++) {
                var childrens = $(treeHoleBoxs[i]).children('p:empty')
                for (var j = 0; j < childrens.length; j++)
                    childrens[j].remove()
            }
    });


function nodeMode() {
    var nightModeId = 'nightMode';

    function autoNightMode() {
        var nightModes = $('.night-mode');
        var day = new Date();
        var D = day.getHours();
        var isNightMode = getLocalStorage(nightModeId);
        if (D <= nightModeStartTime && D > nightModeEndTime) {
            // 白天
            if (isNightMode === true) {
                // 是暗黑模式
                changeNightMode(nightModes);
                return;
            }
            changeLightMode(nightModes);
        } else {
            // 晚上
            if (isNightMode === false) {
                // 不是暗黑模式
                changeLightMode(nightModes);
                return;
            }
            changeNightMode(nightModes);
        }
        if (typeof renderComment === 'function') {
            renderComment();
        }
    }

    function changeLightMode(nightModes) {
        $(document.body).removeClass('night');
        for (var i = 0; i < nightModes.length; i++) {
            var nightMode = $(nightModes[i]);
            nightMode.addClass('fa-moon-o');
            nightMode.removeClass('fa-lightbulb-o');
        }
        setLocalStorage(nightModeId, false)
    }

    function changeNightMode(nightModes) {
        $(document.body).addClass('night');
        for (var i = 0; i < nightModes.length; i++) {
            var nightMode = $(nightModes[i]);
            nightMode.addClass('fa-lightbulb-o');
            nightMode.removeClass('fa-moon-o');
        }
        setLocalStorage(nightModeId, true)
    }

    function nightModeFuc() {
        var nightModes = $('.night-mode');
        if (!nightModes) {
            return;
        }
        for (var i = 0; i < nightModes.length; i++) {
            var nightMode = $(nightModes[i]);
            doFuncNightMode(nightMode);
        }

    }

    function doFuncNightMode(nightMode) {
        var nightModeBtn = $('.night-mode');
        if ($(document.body).hasClass('night')) {
            nightModeBtn.addClass('fa-lightbulb-o');
            nightModeBtn.removeClass('fa-moon-o');
        } else {
            nightModeBtn.addClass('fa-moon-o');
            nightModeBtn.removeClass('fa-lightbulb-o');
        }


        nightMode.click(function (e) {
            if (nightMode.hasClass('fa-moon-o')) {
                $(document.body).addClass('night');
                nightModeBtn.addClass('fa-lightbulb-o');
                nightModeBtn.removeClass('fa-moon-o');
                setLocalStorage(nightModeId, true);
            } else if (nightMode.hasClass('fa-lightbulb-o')) {
                $(document.body).removeClass('night');
                nightModeBtn.addClass('fa-moon-o');
                nightModeBtn.removeClass('fa-lightbulb-o');

                setLocalStorage(nightModeId, false);
            }
            $(document.body).removeClass('sidebar-opened');
            if (typeof renderComment === 'function') {
                renderComment();
            }
        })
    }

    function setLocalStorage(key, value) {
        var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
        var valueDate = JSON.stringify({
            val: value,
            timer: curtime
        });
        try {
            localStorage.setItem(key, valueDate);
        } catch (e) {
            // 兼容性写法
            if (isQuotaExceeded(e)) {
                console.log("Error: 本地存储超过限制");
                localStorage.clear();
            } else {
                console.log("Error: 保存到本地存储失败");
            }
        }
    }

    function isQuotaExceeded(e) {
        var quotaExceeded = false;
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014: // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if (e.number === -2147024882) { // IE8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    }

    function getLocalStorage(key) {
        var exp = 60 * 60 * 1000; // 一个小时的秒数
        if (localStorage.getItem(key)) {
            var vals = localStorage.getItem(key); // 获取本地存储的值
            var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
            // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
            var isTimed = (new Date().getTime() - dataObj.timer) > exp;
            if (isTimed) {
                console.log("存储已过期");
                localStorage.removeItem(key);
                return null;
            } else {
                var newValue = dataObj.val;
            }
            return newValue;
        } else {
            return null;
        }
    }

// 自动暗黑模式
    autoNightMode();

// 暗黑模式
    nightModeFuc();
}

//获取滚动条距离顶部位置
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function scollTocbot() {
    var Obj = $('#tocFlag');

    //判断元素是否存在
    if (Obj.length != 1) {
        return false;
    }

    var tocId = '#toc';
    var tocFixed = $(tocId);
    var ObjTop = Obj.offset().top - $(window).height() * 0.5;

    // 滚动条离页面顶端的距离
    var scrollTop = getScrollTop();
    var postHeaderHeight = $('#postHeader').height();
    if (scrollTop > postHeaderHeight) {
        tocFixed.show();
    } else {
        tocFixed.hide();
    }

    var tocEle = document.querySelector(tocId);
    var tocHeight = tocEle.getBoundingClientRect().height;
    if (scrollTop > ObjTop - tocHeight * 0.5) {
        tocFixed.addClass('right-fixed');
    } else {
        tocFixed.removeClass('right-fixed');
    }
}

function loadPost() {
    function appreciateModel() {
        $(".appreciate-btn").on("click", function (e) {
            // $(".qr-code-wrap").velocity("transition.expandIn", { duration: 300 });
            $(".qr-code-wrap").show();
            $(document).one("click", function () {
                $(".qr-code-wrap").hide();
                // $(".qr-code-wrap").velocity("transition.expandOut", { duration: 300 });

            });
            e.stopPropagation();
        });
    }

    function toggleSocialShare() {
        $('.share-btn').on("click", function (e) {
            $('#socialShare').toggleClass('no-show');
        });
    }

    // 赞赏点击事件
    function appreciate() {

        $(".qr-code").on("click", function (e) {
            e.stopPropagation();
        });
        $(".closinglayer").on("click", function (e) {
            $(".qr-code-wrap").hide();
        });
        $(".zfb-btn").on("click", function (e) {
            $(".qr_code_zfb").css("height", "300px");
            $(".qr_code_wx").css("height", "0");
        });
        $(".wx-btn").on("click", function (e) {
            $(".qr_code_wx").css("height", "300px");
            $(".qr_code_zfb").css("height", "0");
        });
    }

// 因为不使用后端渲染目录, 所以如果在发布文章的时候在文章开头加上 [TOC] 会在文章页面开头有一个ul 标签
// 这里粗暴的去除
    function removeFirstUL() {
        var post_content = document.getElementById('post-content');
        var firstNodeName = post_content.firstElementChild.nodeName;
        if (firstNodeName === 'UL') {
            $(post_content.firstElementChild).hide();
        }
    }

    function scrollTocFixed() {
        window.addEventListener('scroll', scollTocbot);
    }

    function initToc() {
        var headerEl = 'h1,h2,h3,h4,h5,h6',  //headers
            content = '.post-content';//文章容器
        tocbot.init({
            tocSelector: '#toc',
            contentSelector: content,
            headingSelector: headerEl,
            scrollSmooth: true,
            headingsOffset: 0 - $('#postHeader').height(),
            hasInnerContainers: false,
        });

        var tocLinks = $('.toc-link');
        if (tocLinks) {
            for (var i = 0; i < tocLinks.length; i++) {
                var tocLink = tocLinks[i];
                tocLink.after(document.createElement("span"));
            }
        }
    }

    /**
     * 阅读进度（阅读进度条和目录高亮功能）
     */
    function readProgress() {

        // 文章内容
        var $content = $("#siteMain");
        // 阅读进度条
        var $readProgressBar = $("#readProgress .read-progress-bar");

        /**
         * 改变阅读进度条
         */
        var changeReadProgress = function () {
            // contentHeight 实际总阅读高度 = 内容的高度 - 窗口的可视高度
            var contentHeight = $content.height() - window.innerHeight;
            if (contentHeight <= 0) return;
            // readHeight 已经阅读的高度 = 当前页面的垂直偏移量 - 内容元素上边的多余部分
            var readHeight = window.pageYOffset - $content.offset().top;
            // 进度条的宽度
            var progressWidth = readHeight / contentHeight * 100 + '%';
            $readProgressBar.width(progressWidth);
        };

        // 改变阅读进度条
        displayReadProgress && changeReadProgress();

        $(window).on('scroll', function () {
            // 改变阅读进度条
            displayReadProgress && changeReadProgress();
        });
    }

    appreciate();

// 初始化toc
    initToc()

    removeFirstUL()

// 目录事件
    scrollTocFixed();

// 搞一个阅读进度，为了提高准确度，数据都要实时获取
    readProgress();

// 按钮事件
    appreciateModel()

// 分享
    toggleSocialShare()
}

window.onload = function () {
    if (isNightModeSwitch === true) {
        nodeMode();
    }

    load()
}
