define(['jquery'], function($){  // 相对于本文件查找jquery文件，路径结合baseUrl和paths
	var lazyLoad = {
		inint: function($imgs){
			var lazyLoadSelf = this; 
			this.$target = $imgs;
			this.bind();
			lazyLoadSelf.checkShow();
		},
		bind: function(){
			var lazyLoadSelf = this;
			$(window).on('scroll', function(){
				lazyLoadSelf.checkShow();
			});
		},
		checkShow: function(){
			var lazyLoadSelf = this;
			this.$target.each(function(){
				var $cur = $(this);
				if($cur.attr('isloaded')){
					return;
				}
				if(lazyLoadSelf.isShow($cur)){
					setTimeout(function(){
						lazyLoadSelf.showImg($cur);
					}, 1000);
				}
			});
		},
		isShow: function($element){
			var scrollTop = $(window).scrollTop(),
				winH = $(window).height(),
				eleH = $element.offset().top;
			if(eleH < winH+scrollTop){
				return true;
			}else{
				return false;
			}
		},
		showImg: function($element){
			$element.attr('src', $element.attr('data-src'));
			$element.attr('isloaded', 'true');
		}
	};
	return lazyLoad;
});

