// 文章目录 Hook!!!
var TOC = $('#TableOfContents').addClass("ui styled accordion");
var toclinks = TOC.find("a");
var lastY = new Array(); //用于记录每一个标题上次的位置

// up-向上跨界 un-未跨界 down-向下跨界
function passBy(index, link) {
    title = $(link).attr('href');
    // 获取距离浏览器顶部的位置：$(title).offset().top - $(window).scrollTop()
    var currY = document.getElementById(title.replace("#", "")).getBoundingClientRect().top;
    if (lastY[index] == undefined) {
        lastY[index] = currY; //更新位置
        return "un";
    }
    // 两次位置在75px的两侧，发生跨越
    if ((lastY[index] - 75) * (currY - 75) <= 0) {
        if (lastY[index] < currY) {
            lastY[index] = currY; //更新位置
            return "down";
        }
        lastY[index] = currY; //更新位置
        return "up";
    }
    return "un";
}

function updateY(switchTag) {
    //快速定位会产生批量跨界
    var chain = new Array();
    var direct = "un";
    toclinks.each(function(index, link) {
        switch (passBy(index, link)) {
            case "up":
                direct = "up";
                chain.push(link);
                break;
            case "down":
                if (index != 0) {
                    chain.push(toclinks[index - 1]);
                    direct = "down";
                }
                break;
        }
    });
    if (switchTag && chain.length) {
        switch (direct) {
            case "up": //高亮最后一个
                switchCurr($(chain.pop()));
                break;
            case "down": //高亮头一个
                switchCurr($(chain.shift()));
                break;
        }
    }
}

function switchCurr(toCurr) {
    if (!toCurr.is('.curr')) {
        // 移除所有curr标志
        TOC.find(".curr").removeClass("curr");
        // 添加新的curr标志
        toCurr.addClass("curr");
        // console.log(toCurr.attr('href'));
        // 父级目录全部标记curr
        toCurr.parentsUntil("#TableOfContents").filter(".title, .content").each(function() {
            // 利用父层全部选中,添加标记
            $(this).parent().children().each(function() {
                $(this).addClass("curr active");
            });
        });
        // 非curr的全部关闭
        TOC.find(".title, .content").not(".curr").each(function() {
            $(this).removeClass("active");
        });
        // 定位目录到视野
        toCurr.velocity("scroll", {
            container: TOC,
            duration: 800,
            offset: -120,
            easing: [25, 10]
        });
    }
}

function delayUpdateY() {
    // Hack! Skip the wrong peak value when scroll on click at start
    setTimeout('updateY(true)', 50);
}

if (TOC.length == 0) {
    $("#TOC-container").remove();
} else {
    $("#TableOfContents li a:only-child").addClass("last-level");
    TOC.find("li").find("a:not(.last-level)").wrap("<div class='title'></div>");
    TOC.find(".title").prepend("<i class='dropdown icon'></i>");
    TOC.children("ul").find("ul").addClass("content");
    // 层叠目录
    TOC.accordion({
        selector: {
            trigger: '.title .icon'
        },
        exclusive: false
    });
    // 目录弹出按钮
    $("#toc-button").on("click", function() {
        $("#TOC-container").toggleClass("toc-hide toc-show");
        $("#sidebar").toggleClass("sidebar-hide sidebar-show");
    });
    // 章节位置滚动监听
    $(window).on('scroll', delayUpdateY);
    // 目录链接定位
    toclinks.on("click", function() {
        // 视野在目录上，层叠目录晃眼，取消实时高亮
        $(window).off();
        // 误伤友军
        $(window).on('scroll', function() {
            $('.back-top').toggleClass('show-on', window.pageYOffset > 50);
        });
        $($(this).attr('href')).velocity("scroll", {
            duration: 800,
            offset: -70,
            easing: [25, 10]
        });
        // 手动高亮提高体验
        switchCurr($(this));
        // 滚完再说，防止层叠目录乱颤
        setTimeout('updateY(true)', 1000);
        setTimeout("$(window).on('scroll', delayUpdateY)", 1500);
    });
}