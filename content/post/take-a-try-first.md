---
date: "2016-12-31T22:29:56+08:00"
title: "take a try first"
tag: []
---

# 内容模版的语法

# 配置项


# markdown练习

---
# 一级标题
一级标题
==
## 二级标题
二级标题
--
###### 六级标题
---
> 试一试。

>      试一试。(前面五个空格，有回车，其实只是引用和缩进的简单组合)
> 试一试。

/
> 引用注释
      前面五个空格（无回车）
回车实验
> xxx
>
> 隔行实验

---
*斜体*
_斜体_

**粗体**
__粗体__

_**斜粗体实验**_
__*斜粗体实验*__
***粗斜体实验***

~~长长长长长的删除线~~

---
* 列表
+ listplus
- listreduce
 + 子列表
     + 三级子列表
     + 三级子列表
+ + 子子列表
 + 子子列表

---
1. 有序列表
2. 有序列表
3.无空格实验（标号后面无空格为普通文本）
4. 行号为4，再次有空格

---
[百度链接](http://www.baidu.com "百度")
[百度链接有空格] (http://www.baidu.com "百度")

I get 10 times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3].

[1]: http://google.com/        "Google" 
[2]: http://search.yahoo.com/  "Yahoo Search" 
[3]: http://search.msn.com/    "MSN Search"

---

```

#include<iostream>

using namespace std;

void main()

{

    cout << "Hello World!" << endl;

}

```

    #include<iostream>

    using namespace std;

    void main()

    {

        cout << "Hello World!" << endl;

    }
