/**
 * validators v0.0.1
 * require jquery 1.9+
 * MIT License
 * for more info pls visit https://github.com/yidroid/yExcel
 */

; (function($, window, document, undefined) {
	// Create the defaults once
    var pluginName = "surround",
        defaults = {
            time : [300,200,300,200],
            width : 2,
            color : '#000'
        };

    function Surround(element,options) {
    	this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.init();
    }

    Surround.prototype = {
        init: function() {
            //disable on touch devices
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return;
            }
            console.log('init');
			this.create4edge($(this.element));
        },
        create4edge:function(e){
        	var width = e.width();
        	var height = e.height();
        	var time1 = this.settings.time[0];
			var time2 = this.settings.time[1];
			var time3 = this.settings.time[2];
			var time4 = this.settings.time[3];
        	e.css({position:'relative'});
        	var $div1 = $("<div style='z-index:999;position: absolute;top: -"+this.settings.width+"px;left: -"+this.settings.width+"px;width: 0px;height: 0px;border: "+this.settings.width/2+"px solid "+this.settings.color+";display: none;'></div>")
	        var $div2 = $("<div style='z-index:999;position: absolute;top: -"+this.settings.width+"px;right: -"+this.settings.width+"px;width: 0px;height: 0px;border: "+this.settings.width/2+"px solid "+this.settings.color+";display: none;'></div>")
	        var $div3 = $("<div style='z-index:999;position: absolute;bottom: -"+this.settings.width+"px;right: -"+this.settings.width+"px;width: 0px;height: 0px;border: "+this.settings.width/2+"px solid "+this.settings.color+";display: none;'></div>")
	        var $div4 = $("<div style='z-index:999;position: absolute;bottom: -"+this.settings.width+"px;left: -"+this.settings.width+"px;width: 0px;height: 0px;border: "+this.settings.width/2+"px solid "+this.settings.color+";display: none;'></div>")
        	e.append($div1)
        	 .append($div2)
        	 .append($div3)
        	 .append($div4);
        	e.on('mouseenter',function(){
				var $div1 = $($(this).find('div')[0]).stop();
				var $div2 = $($(this).find('div')[1]).stop();
				var $div3 = $($(this).find('div')[2]).stop();
				var $div4 = $($(this).find('div')[3]).stop();
				var t1 = time1;
				var t2 = time2;
				var t3 = time3;
				var t4 = time4;
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