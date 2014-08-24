/**
 * @author cj
 * @version 1.0
 * email : <a href='mailto:honeychen502@gmail.com' >发送邮件</a>
 */
/**
 * @param options{element,direction,height,width}，配置参数
 * 滚动面板，支持水平和纵向滚动
 */
var Scroll = function( options ) {
	if( !options || typeof options != 'object' ) {
		alert("请输入要求配置参数");
		return;
	}
	var settings = {
		//目标元素
		element : null,
		direction : 'vertical',
		//列表垂直滚动height长度后停顿
		height : null,
		//列表水平滚动width长度后停顿
		width : null,
		speed : 30,
		scrollNum : null
	};
	//配置属性合并
	$.extend(settings, options);
	if( !settings.element ) {
		alert("请输入要滚动元素的ID");
		return;
	}
	if( !settings.scrollNum ) {
		alert("请输入要开始滚动的个数");
		return;
	}
	//目标元素
	this.element = $(settings.element)[0];
	//列表垂直滚动height长度后停顿
	this.height = settings.height || this.element.scrollHeight;
	//列表水平滚动width长度后停顿
	this.width = settings.width || this.element.scrollWidth;
	//滚动方向
	this.direction = ( settings.direction == 'vertical' ) ? 'vertical' : 'horizontal';
	//纵向
	this.maxHeight = this.element.scrollHeight;
	//水平
	this.maxWidth = this.element.scrollWidth;
	//计数器
	this.counter = 0;
	//计时器
	this.timer = "";
	//当滚动列表不够多时，不用滚动，直接结束
	var scrollStartNum = $(settings.element).find(".slider-item").size();
	if( scrollStartNum < settings.scrollNum ) {
		console.log("面板不用滚动的");
		return;
	}
	//滚动速度
	this.speed = settings.speed;
	//把元素复制成两份
	this.element.innerHTML += this.element.innerHTML;
	if( this.direction == 'horizontal' ) {
		this.element.innerHTML = '<div style="width:800%;float:left;">' + this.element.innerHTML + '</div>';
	}
	var scrollFn = ( settings.direction == 'vertical' ) ? this.scrollVertical.bind(this) : this.scrollHorizontal.bind(this);
	//鼠标移进来，暂停滚动
	this.element.onmouseover = this.stop.bind(this);
	//鼠标移出去，开始滚动
	this.element.onmouseout = function() {
		//计时器赋值
		this.timer = setTimeout(scrollFn, 1000);
	}.bind(this);
};
/**
 * 原型事件注册
 * <strong>滚动事件绑定<strong>
 */
Function.prototype.bind = function(object) {
	var method = this;
	return function() {
		method.apply(object, arguments);
	};
};
/**
 * <strong>原型事件赋值<strong>
 */
Scroll.prototype = {
	/**
	 * 面板滚动函数
	 */
	scrollHorizontal : function() {
		//水平滚动
		console.log("水平滚动");
		if (this.element.scrollLeft < this.maxWidth) {
			this.element.scrollLeft++;
			this.counter++;
		} else {
			this.element.scrollLeft = 0;
			this.counter = 0;
		}
		if (this.counter < this.width) {
			this.timer = setTimeout(this.scrollHorizontal.bind(this), this.speed);
		} else {
			this.counter = 0;
			this.timer = setTimeout(this.scrollHorizontal.bind(this), 3000);
		}
	},
	scrollVertical : function() {
		//垂直滚动
		console.log("垂直滚动");
		if (this.element.scrollTop < this.maxHeight) {
			this.element.scrollTop++;
			this.counter++;
		} else {
			this.element.scrollTop = 0;
			this.counter = 0;
		}
		if (this.counter < this.height) {
			this.timer = setTimeout(this.scrollVertical.bind(this), this.speed);
		} else {
			this.counter = 0;
			this.timer = setTimeout(this.scrollVertical.bind(this), 3000);
		}
	},
	/**
	 * 停止面板滚动函数
	 */
	stop : function() {
		clearTimeout(this.timer);
	}
};
