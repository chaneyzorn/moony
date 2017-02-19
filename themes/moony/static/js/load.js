hljs.initHighlightingOnLoad();

$('.ui.dropdown').dropdown({
    on: 'hover'
});

$('.lg-img').dimmer({
    on: 'hover',
    opacity: 0.2,
    duration: {
        show: 300,
        hide: 300
    },
});

$(window).on('scroll', function() {
    $('.back-top').toggleClass('show-on', window.pageYOffset > 50);
});

$('.back-top').on('click', function() {
    $('html').velocity("scroll", {
        duration: 1000,
        easing: [25, 10]
    });
});

var TOC = $('#TableOfContents').children("ul").addClass("ui styled accordion");
TOC.find("li").find("a").addClass("title");
$("#TableOfContents li a:only-child").removeClass("title");
TOC.find(".title").prepend("<i class='dropdown icon'></i>");
TOC.find("ul").addClass("content");

$('.ui.accordion').accordion({
    selector: {
        trigger: '.title .icon'
    }
});

$('#article-content,#info-card').lightGallery({
    selector: '.lg-img',
    subHtmlSelectorRelative: true,
    pager: true,
    thumbnail: false,
    hideBarsDelay: 1500
});

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