hljs.initHighlightingOnLoad();

SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '{{ .Site.BaseURL }}/search.json',
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: ['Welcome']
})

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
    $('body').velocity("scroll", {
        duration: 1000,
        easing: [25, 10]
    });
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