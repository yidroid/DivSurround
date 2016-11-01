/**
 * Surround v0.0.1
 * require jquery 1.9+
 * MIT License
 * for more info pls visit https://github.com/yidroid/surround
 */

; (function($, window, document, undefined) {
	// Create the defaults once
	//time 上右下左 时间单位毫秒
	//width 边框
	//color 颜色
	//type 类型（'CW'顺时针，'CCW' 逆时针，'MID' 中间扩散，'ARO' 四周向四边滑动，'GRA' 渐显等）
    var pluginName = "surround",
        defaults = {
            time : [200],
            width : 2,
            color : '#000',
            type : 'CW'
        };

    function Surround(element,options) {
    	this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._name = pluginName;
        this.version = 'v1.0.1';
        this.init();
    }

    Surround.prototype = {
        init: function() {
            //disable on touch devices
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return;
            }
			this.create4edge($(this.element));
        },
        create4edge:function(e){
        	var borderWidth = this.settings.width;
        	var width = e.width() + borderWidth/2;
        	var height = e.height()+ borderWidth/2;
        	var time1;
			var time2;
			var time3;
			var time4;
			if (Array.isArray(this.settings.time)) {
				if (this.settings.time.length = 3) {
	        		time1 = this.settings.time[0];
	        		time2 = this.settings.time[1];
	        		time3 = this.settings.time[2];
	        		time4 = this.settings.time[1];
        		} else if (this.settings.time.length = 2) {
	        		time1 = this.settings.time[0];
	        		time2 = this.settings.time[1];
	        		time3 = this.settings.time[0];
	        		time4 = this.settings.time[1];
	        	} else if (this.settings.time.length = 2) {
	        		time1 = this.settings.time[0];
	        		time2 = this.settings.time[0];
	        		time3 = this.settings.time[0];
	        		time4 = this.settings.time[0];
	        	} else if (this.settings.time.length = 4) {
	        		time1 = this.settings.time[0];
	        		time2 = this.settings.time[1];
	        		time3 = this.settings.time[2];
	        		time4 = this.settings.time[3];
	        	} else {
	        		time1 = 200;
	        		time2 = 200;
	        		time3 = 200;
	        		time4 = 200;
	        	}
			} else if (typeof(this.settings.time) == 'number') {
					time1 = this.settings.time;
	        		time2 = this.settings.time;
	        		time3 = this.settings.time;
	        		time4 = this.settings.time;
			}
			var borderWidth = this.settings.width;
			var type = this.settings.type;
        	e.css({position:'relative'});
        	var $div1 = $("<div style='z-index:999;position: absolute;width: 0px;height: 0px;border: "+borderWidth/2+"px solid "+this.settings.color+";display: none;border-radius:"+borderWidth/2+"px'></div>")
        	var $div2 = $("<div style='z-index:999;position: absolute;width: 0px;height: 0px;border: "+borderWidth/2+"px solid "+this.settings.color+";display: none;border-radius:"+borderWidth/2+"px'></div>")
        	var $div3 = $("<div style='z-index:999;position: absolute;width: 0px;height: 0px;border: "+borderWidth/2+"px solid "+this.settings.color+";display: none;border-radius:"+borderWidth/2+"px'></div>")
        	var $div4 = $("<div style='z-index:999;position: absolute;width: 0px;height: 0px;border: "+borderWidth/2+"px solid "+this.settings.color+";display: none;border-radius:"+borderWidth/2+"px'></div>")
        	switch (type) {
        		case 'MID':
        			$div1.css({"top" : -borderWidth,   "left" : width/2      });
		        	$div2.css({"top" : height/2,       "right" : -borderWidth});
		        	$div3.css({"bottom" : -borderWidth,"right" : width/2     });
		        	$div4.css({"bottom" : height/2,    "left" : -borderWidth });
		        	break;
		        case 'GRA': //gradient 渐变
		        	$div1.css({'width' : width  ,'opacity' : 0,"top"    : -borderWidth , "left"  : -borderWidth });
		        	$div2.css({'height': height ,'opacity' : 0,"top"    : -borderWidth , "right" : -borderWidth });
		        	$div3.css({'width' : width  ,'opacity' : 0,"bottom" : -borderWidth , "right" : -borderWidth });
		        	$div4.css({'height': height ,'opacity' : 0,"bottom" : -borderWidth , "left"  : -borderWidth });
		        	break;
		        case 'ARO':
		        	$div1.css({"top"    : -borderWidth        , "left"  : -borderWidth-width });
		        	$div2.css({"top"    : -borderWidth-height , "right" : -borderWidth });
		        	$div3.css({"bottom" : -borderWidth        , "right" : -borderWidth-width });
		        	$div4.css({"bottom" : -borderWidth-height , "left"  : -borderWidth });
		        	break;
		        case 'CW':
        		case 'CCW':
        		default:
	        		$div1.css({"top"    : -borderWidth ,"left"  : -borderWidth });
		        	$div2.css({"top"    : -borderWidth ,"right" : -borderWidth });
		        	$div3.css({"bottom" : -borderWidth ,"right" : -borderWidth });
		        	$div4.css({"bottom" : -borderWidth ,"left"  : -borderWidth });
        			break;
        	}
        	e.append($div1)
        	 .append($div2)
        	 .append($div3)
        	 .append($div4);
        	e.on('mouseover',function(){
				var $div1 = $($(this).find('div')[0]).stop();
				var $div2 = $($(this).find('div')[1]).stop();
				var $div3 = $($(this).find('div')[2]).stop();
				var $div4 = $($(this).find('div')[3]).stop();
				var t1 = time1;
				var t2 = time2;
				var t3 = time3;
				var t4 = time4;
				switch (type){
					//逆时针
					case 'CCW':
						if ($div2.width() >= width) {
							t1 = 0;
						}
						if ($div1.height() >= height ) {
							t2 = 0;
						}
						if ($div4.width() >= width) {
							t3 = 0;
						}
						if ($div3.height() >= height ) {
							t4 = 0;
						}
						$div2.css({display:'block'});
						$div2.animate({width:width},t1,function(){
							$div1.css({display:'block'});
							$div1.animate({height:height},t2,function(){
								$div4.css({display:'block'});
								$div4.animate({width:width},t3,function(){
									$div3.css({display:'block'});
									$div3.animate({height:height},t4,function(){
									});
								});
							});
						})
						break;
					//中间向俩边
					case 'MID':
						if ($div1.width() >= width) {
							t1 = 0;
						}
						$div1.css({display:'block'});
						$div1.animate({width:width,left:-borderWidth},t1,function(){
						});
						$div2.css({display:'block'});
						$div2.animate({height:height,top:-borderWidth},t1,function(){
						})
						$div3.css({display:'block'});
						$div3.animate({width:width,right:-borderWidth},t1,function(){
						});
						$div4.css({display:'block'});
						$div4.animate({height:height,bottom:-borderWidth},t1,function(){
						});
						break;
					case 'GRA':
						if ($div1.css('opacity') >= 1) {
							t1 = 0;
						}
						$div1.css({display:'block'});
						$div1.animate({'opacity' : 1},t1,function(){
						});
						$div2.css({display:'block'});
						$div2.animate({'opacity' : 1},t1,function(){
						})
						$div3.css({display:'block'});
						$div3.animate({'opacity' : 1},t1,function(){
						});
						$div4.css({display:'block'});
						$div4.animate({'opacity' : 1},t1,function(){
						});
						break;
					case 'ARO':
						if ($div1.width() >= width) {
							t1 = 0;
						}
						$div1.css({display:'block'});
						$div1.animate({'width' : width,'left' : -borderWidth},t1,function(){
						});
						$div2.css({display:'block'});
						$div2.animate({'height' : height,'top' : -borderWidth},t1,function(){
						})
						$div3.css({display:'block'});
						$div3.animate({'width' : width,'right':-borderWidth},t1,function(){
						});
						$div4.css({display:'block'});
						$div4.animate({'height' : height,'bottom' : -borderWidth},t1,function(){
						});
						break;
					//顺时针 和默认
					case 'CW':
					default:
						if ($div1.width() >= width) {
							t1 = 0;
						}
						if ($div2.height() >= height ) {
							t2 = 0;
						}
						if ($div3.width() >= width) {
							t3 = 0;
						}
						if ($div4.height() >= height ) {
							t4 = 0;
						}
						$div1.css({display:'block'});
						$div1.animate({width:width},t1,function(){
							$div2.css({display:'block'});
							$div2.animate({height:height},t2,function(){
								$div3.css({display:'block'});
								$div3.animate({width:width},t3,function(){
									$div4.css({display:'block'});
									$div4.animate({height:height},t4,function(){
									});
								});
							})
						});
						break;
				}
				
			});
			e.on('mouseout',function(){
				var $div1 = $($(this).find('div')[0]).stop();
				var $div2 = $($(this).find('div')[1]).stop();
				var $div3 = $($(this).find('div')[2]).stop();
				var $div4 = $($(this).find('div')[3]).stop();
				var t1 = time1;
				var t2 = time2;
				var t3 = time3;
				var t4 = time4;
				
				switch (type){
					case 'CCW':
						// 3,4,1,2
						if ($div3.height() <= 0) {
							t1 = 0;
						}
						if ($div4.width() <= 0 ) {
							t2 = 0;
						}
						if ($div1.height() <= 0) {
							t3 = 0;
						}
						if ($div2.width() <= 0 ) {
							t4 = 0;
						}
						$div3.animate({height:'0px'},t1,function(){
							$div3.css({display:'none'});
							$div4.animate({width:'0px'},t2,function(){
								$div4.css({display:'none'});
								$div1.animate({height:'0px'},t3,function(){
									$div1.css({display:'none'});
									$div2.animate({width:'0px'},t4,function(){
										$div2.css({display:'none'});
									});
								});
							});
						});
						break;
					case 'MID':
						if ($div1.width() < width) {
							t1 = 0;
						}
						$div1.animate({width:0,left:width/2},t1,function(){
							$(this).css({display:'none'});
						});
						$div2.animate({height:0,top:height/2},t1,function(){
							$(this).css({display:'none'});
						})
						$div3.animate({width:0,right:width/2},t1,function(){
							$(this).css({display:'none'});
						});
						$div4.animate({height:0,bottom:height/2},t1,function(){
							$(this).css({display:'none'});
						});
						break;
					case 'GRA':
						if ($div1.css('opacity') <= 0) {
							t1 = 0;
						}
						$div1.animate({'opacity' : 0},t1,function(){
							$(this).css({display:'none'});
						});
						$div2.animate({'opacity' : 0},t1,function(){
							$(this).css({display:'none'});
						})
						$div3.animate({'opacity' : 0},t1,function(){
							$(this).css({display:'none'});
						});
						$div4.animate({'opacity' : 0},t1,function(){
							$(this).css({display:'none'});
						});
						break;
					case 'ARO':
						if ($div1.width() < width) {
							t1 = 0;
						}
						$div1.animate({width:0,left:-borderWidth-width},t1,function(){
							$(this).css({display:'none'});
						});
						$div2.animate({height:0,top:-borderWidth-height},t1,function(){
							$(this).css({display:'none'});
						})
						$div3.animate({width:0,right:-borderWidth-width},t1,function(){
							$(this).css({display:'none'});
						});
						$div4.animate({height:0,bottom:-borderWidth - height},t1,function(){
							$(this).css({display:'none'});
						});
						break;
					//顺时针和默认
					case 'CW':
					default:
						if ($div1.width() <= 0) {
							t1 = 0;
						}
						if ($div2.height() <= 0 ) {
							t2 = 0;
						}
						if ($div3.width() <= 0) {
							t3 = 0;
						}
						if ($div4.height() <= 0 ) {
							t4 = 0;
						}
						$div4.animate({height:'0px'},t4,function(){
							$div4.css({display:'none'});
							$div3.animate({width:'0px'},t3,function(){
								$div3.css({display:'none'});
								$div2.animate({height:'0px'},t2,function(){
									$div2.css({display:'none'});
									$div1.animate({width:'0px'},t1,function(){
										$div1.css({display:'none'});
									});
								});
							});
						});
						break;
				}
				
			});
        }
    };

    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Surround(this, options));
            }
        });
        return this;
    };
	
})(jQuery, window, document);