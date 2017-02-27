define(['jquery'], function($){
	var WaterFall = function(){
		//点击加载代码
		var clock;
		$("#load").on('click', function(){
			if(clock){
				clearTimeout(clock);
			}
			clock = setTimeout(function(){
				loadAndPlace();
			}, 100)
		});
		//用户第一次打开页面，还没点击按钮时进行一次操作
		loadAndPlace();

		//获取数据，拼装dom，瀑布流摆放
		var curPage = 1,
			perPageCount = 11;

		function loadAndPlace(){ 
			$.ajax({
				url: 'http://platform.sina.com.cn/slide/album_tech',
				dataType: 'jsonp', 
				jsonp:"jsoncallback",
				data: {
					app_key: '1271687855',
					num: perPageCount,
					page: curPage
				},
				success: function(ret){
					if(ret.status.code == 0){  
						onSeccess(ret.data); //获取数据成功，生成节点并摆放位置
					}
					else{
						console.log("获取数据失败");
					}
				},
				error: function(){
					console.log("系统异常");
				}
			});
		}


		function onSeccess(nodeList){
			var $nodes = renderData(nodeList);

			var deferreds = [];
			$nodes.find('img').each(function(){
				var defer = $.Deferred();
				$(this).load(function(){
					defer.resolve();
				});
				deferreds.push(defer);
			});
			$.when.apply(null, deferreds).done(function(){
				waterFallPlace($nodes);
			});
		}
		//拼接数据，添加到html中
		function renderData(items){
			var tpl = "";
			for(var i=0;i<items.length;i++){
				tpl += '<li class="item">';
				tpl += '<a href="'+ items[i].url +'" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
				tpl += ' <h4 class="header">'+ items[i].short_name +'</h4>';
				tpl += '<p class="desp">'+items[i].short_intro+'</p>';
				tpl += '</li>';
			}
			var $nodes = $(tpl);
			$(".waterfall-ct").append($nodes);
			return $nodes;
		}


		//瀑布流
		var nodeWidth = $(".item").outerWidth(true),  //节点的宽度
			colNum = parseInt( $(".waterfall-ct").width()/nodeWidth );  //窗口的宽度除以节点宽度再取整，计算出页面可以放几列
		var	colSumHeight = [];  //每一列的高度，放在一个数组里

		for(var i=0;i<colNum;i++){
			colSumHeight.push(0);  //先在每一列里面放进高度0
		}
		function waterFallPlace($nodes){
			$nodes.each(function(){  //对所有的块执行操作，确定它们的位置
				var $cur = $(this);

				var idx = 0,
					minSumHeight = colSumHeight[0];  //这里假设数组里第一个数最小
				for(var i=0;i<colSumHeight.length;i++){
					if(colSumHeight[i] < minSumHeight){  //将数组后面的元素依次和第一个比较，从而确定最小的
						idx = i;  //得到最小值的位置
						minSumHeight = colSumHeight[i];  //那么最小值变为该位置对应的值
					}
				}

				$cur.css({
					"top": minSumHeight,  //上偏移位置为最小高度列的值
					"left": nodeWidth*idx  //左偏移为列宽*最小列高指数
				});
				colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];  //最后也就是要将元素放在这个最小高度元素下面
				$('.waterfall-ct').height(Math.max.apply(null,colSumHeight));
			});    
		}
	};
	return WaterFall;
});

