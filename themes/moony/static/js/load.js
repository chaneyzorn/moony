// 代码高亮
hljs.initHighlightingOnLoad();

// 下拉菜单
$('.ui.dropdown').dropdown({
    on: 'hover'
});

// 图片悬鼠暗幕
$('.lg-img').dimmer({
    on: 'hover',
    opacity: 0.2,
    duration: {
        show: 300,
        hide: 300
    },
});

// 返回顶部按钮及回滚顶部
$(window).on('scroll', function() {
    $('.back-top').toggleClass('show-on', window.pageYOffset > 50);
});
$('.back-top').on('click', function() {
    $('html').velocity("scroll", {
        duration: 1000,
        easing: [25, 10]
    });
});

// 文章目录 Hook
var TOC = $('#TableOfContents').addClass("ui styled accordion");
if (TOC.length == 0) {
    $("#TOC-container").remove();
} else {
    $("#TableOfContents li a:only-child").addClass("last-level");
    TOC.find("li").find("a:not(.last-level)").wrap("<div class='title'></div>");
    TOC.find(".title").prepend("<i class='dropdown icon'></i>");
    TOC.children("ul").find("ul").addClass("content");
    // 层叠目录
    $('.ui.accordion').accordion({
        selector: {
            trigger: '.title .icon'
        },
        exclusive: false
    });
    // 目录弹出按钮
    var $tocButton = document.getElementById("toc-button");
    $tocButton.addEventListener("click", function() {
        $("#TOC-container").toggleClass("toc-hide toc-show");
        $("#sidebar").toggleClass("sidebar-hide sidebar-show");
    });
    // 章节位置滚动监听
    var lastY = new Array(); //记录每一个标题上次的位置
    $(window).on('scroll', function() {
        TOC.find("a").each(function(index, element) {
            id = $(element).attr('href');
            var currY = document.getElementById(id.replace("#", "")).getBoundingClientRect().top;
            // 两次位置发生跨越
            if (lastY[index] && ((lastY[index] - 65) * (currY - 65) <= 0)) {
                // 打印调试日志
                console.log(id + "last:" + lastY[index] + "curr:" + currY);
                if ($(element).is(".last-level")) { console.log(id + ":last") }
                // 移除所有curr标志
                TOC.find(".last-level, .title, .content, a").removeClass("curr");
                // 添加新的curr标志
                $(element).addClass("curr");
                // 父级目录全部标记curr
                $(element).parentsUntil("#TableOfContents").filter(".title, .content").each(function() {
                    // 根据文档结构，每一层提供了.title/.content其中的一个,被选中的情况如下：
                    // .last-level: /.content/.content/../.content
                    // .title: /.content/.content/../.title
                    // 利用父层全部选中,添加标记
                    $(this).parent().children().each(function() { $(this).addClass("curr") });
                    if ($(this).is(".content")) {
                        var tIndex = TOC.find(".content").index($(this));
                        console.log(tIndex + ":content");
                        TOC.accordion('open', tIndex);
                    }
                    if ($(this).is(".title")) {
                        var tIndex = TOC.find(".title").index($(this));
                        console.log(tIndex + ":title");
                        TOC.accordion('open', tIndex);
                    }
                });
                // 非curr的全部关闭
                TOC.find(".title, .content").not(".curr").each(function() {
                    $(this).removeClass("active");
                });
            }
            lastY[index] = currY;
        });
    });
    // 目录链接定位
    TOC.find("a").on("click", function() {
        var position = $($(this).attr('href')).offset().top - 70;
        $('html, body').animate({
            scrollTop: position
        }, 500);
    });
}

// lightGallery 图片展示
$('#article-content,#info-card').lightGallery({
    selector: '.lg-img',
    subHtmlSelectorRelative: true,
    pager: true,
    thumbnail: false,
    hideBarsDelay: 1500
});

// MathJax 公式显示
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [
            ['$', '$']
        ],
        displayMath: [
            ['$$', '$$']
        ],
        processEscapes: true,
        processEnvironments: true,
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        TeX: {
            equationNumbers: {
                autoNumber: "AMS"
            },
            extensions: ["AMSmath.js", "AMSsymbols.js"]
        }
    }
});

MathJax.Hub.Queue(function() {
    // Fix <code> tags after MathJax finishes running. This is a
    // hack to overcome a shortcoming of Markdown. Discussion at
    // https://github.com/mojombo/jekyll/issues/199
    var all = MathJax.Hub.getAllJax(),
        i;
    for (i = 0; i < all.length; i += 1) {
        all[i].SourceElement().parentNode.className += 'mathjax';
    }
});