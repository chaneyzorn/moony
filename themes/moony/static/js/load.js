// 导航栏自动显隐
var navHeader = document.getElementById("nav-menu");
var headroom = new Headroom(navHeader, {
    "tolerance": 5,
    "offset": 200,
    "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
    }
});
headroom.init();

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

// 多说评论
if ($(".ds-thread").length != 0 || $(".ds-thread-count").length != 0) {
    var duoshuoQuery = { short_name: "campanula" };
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';
        ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] ||
            document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
}