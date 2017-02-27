/**
 * 
 * @authors Phelps Chou
 * @date    2017-02-22 12:27:02
 * @version $Id$
 */

requirejs.config({
	baseUrl: './js/com',  // 以 index.html 文件所在位置为参照进行设置
	paths: {
		'jquery': '../lib/jquery-2.2.3.min'  // 结合baseUrl设置模块简化路径
	}
});

requirejs(['jquery', 'carousel', 'gotop', 'lazyload', 'waterfall'],function($, carouselFullScreen, GoTop, lazyLoad, WaterFall){
	$(".carousel").carouselFullScreen();
	GoTop.inint();
	lazyLoad.inint( $(".about img") );
	WaterFall();
});

// 这里查找 jquery 文件（以 index.html 文件位置为基准）的路径就是 ./js/com/../lib/jquery-2.2.3.min.js
// 同理查找 carousel 文件路径为 ./js/com/carousel.js
// 所以上面依赖里面直接写jquery就代表了路径，写carousel就代表了文件名（去除扩展名）


