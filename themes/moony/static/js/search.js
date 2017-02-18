var $search = document.getElementById("search");
var $input = document.getElementById("search-input");
var $resultContent = document.getElementById("search-results");

//搜索框交互，根据使用的UI而定
function show() {
    $('#search-results').removeClass("animating scale out").addClass("animating scale in");
    $('#search-results').removeClass("hidden").addClass("visible");
}

function hide() {
    $('#search-results').removeClass("animating scale in").addClass("animating scale out");
    setTimeout('$("#search-results").removeClass("visible").addClass("hidden")', 200); //给它一段动画的时间
}

$("#search-input").focus(function() {
    $('#search').addClass("focus");
    show();
});
$("#search-input").blur(function() {
    if (!$('#search-results').is(':hover')) {
        hide();
    }
    $('#search').removeClass("focus");
});

//静态博客站内搜索
$.getJSON("/index_json/", function(index) {
    $input.addEventListener('input', function() {
        //置空结果
        $resultContent.innerHTML = "";
        //获取输入的关键词
        var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
        if (keywords == "") {
            //如果关键词为空，则不生成搜查结果，并且隐藏
            setTimeout('$("#search-results").removeClass("transition")', 200);
            hide();
        } else {
            var matchedArticles = 0; //匹配的文章数量
            var str = ''; //准备为搜索结果生成的内容
            //遍历本站文章索引
            index.forEach(function(article) { //当前文章
                    //准备搜索的内容
                    var article_title = article.title.trim().toLowerCase();
                    var article_url = article.url;
                    var article_content = article.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var isMatch = false;
                    var first_occur = -1; //内容里匹配关键词的第一个位置
                    if (article_title != '') {
                        var index_title = -1; //标题里匹配关键词的位置
                        var index_content = -1; //内容里匹配关键词的位置
                        //搜索每一个关键词
                        keywords.forEach(function(keyword, i) {
                            index_title = article_title.indexOf(keyword);
                            index_content = article_content.indexOf(keyword);
                            if (index_title >= 0 || index_content >= 0) {
                                isMatch = true;
                                if (i == 0) { //记录匹配的第一个位置
                                    first_occur = index_content;
                                }
                            }
                        }); //关键词搜索结束
                    }
                    if (isMatch) { //在本文章中有匹配结果，为本文章生成展示
                        matchedArticles += 1;
                        var content = article.content.trim().replace(/<[^>]+>/g, "");
                        //标题
                        str += "<a href='" + article_url + "' class='result'><div class='content'><div class='title'>" + article_title + "</div>";
                        if (first_occur >= 0) { //内容中有匹配的结果
                            // 根据匹配的第一个位置，截取附近的100个字符
                            var start = first_occur - 20;
                            var end = first_occur + 80;
                            if (start < 0) { start = 0; }
                            if (start == 0) { end = 50; }
                            if (end > content.length) {
                                end = content.length;
                            }
                            var showMatched = content.substring(start, end);
                            // 高亮所有搜索关键词
                            keywords.forEach(function(keyword) {
                                var regS = new RegExp(keyword, "gi");
                                showMatched = showMatched.replace(regS, "<b class=\"search-keyword\">" + keyword + "</b>");
                            });
                            str += "<div class='description'>" + showMatched + "...</div>"
                        }
                        str += "</div></a>";
                    } //当前文章处理完毕
                }) //本站索引遍历完毕
            if (matchedArticles == 0) { //没有匹配的文章
                str = '<div class="message empty"><div class="header">No Results</div><div class="description">Your search returned no results</div></div>'
            }
            //设置结果并显示
            $resultContent.innerHTML = str;
            $("#search-results").addClass("transition");
            show();
        };
    });
});