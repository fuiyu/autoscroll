autoscroll
==========

javascript插件，个支持同时横向、纵向滚动的广告插件，只要一句简单的配置代码初始化就可以搞定滚动的广告栏，一处引用，多处可用。
调用代码：

//初始化滚动

new Scroll({
	element : "#" + target,
	
	direction : 'horizontal',
	
	width : 1128,
	
	scrollNum : 3,
	
	speed : 30
	
}).scrollHorizontal();

用到的属性：
scrollHeight: 获取对象的滚动高度。

scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离

scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离

scrollWidth:获取对象的滚动宽度

offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度

offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置

offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 

实现原理：
要实现图片列表的无缝滚动，其实就是把要滚动的列表复制成两份滚动，这里记为slider-list1和slider-list2。就如下图所示，蓝色的为可见窗体区域，红色的部分为滚动列表，滚动的内容超过了可见窗体的范围。初始的时候，可见窗体slider-wrap(即可见窗体,也就是父窗体)的scrollLeft的值为0,当它滚动两个第二张图那个位置的时候，slider-list1的左半部分滚动出了可见窗体视线，slider-list2的左半部分滚动到了窗体可见区。这样就实现了滚动列表的无缝隙滚动。
有点像流量滑动窗口原理，父窗体在滚动列表上滑动。
 

注：计时操作用的是setTimeout，而不是setInterval，用setTimeout设计定时器原理这个网上也有挺多讨论的帖子的，大家可以了解到哦! 要在网页卡顿的时候两种方式实现的定时要过特别明显。
