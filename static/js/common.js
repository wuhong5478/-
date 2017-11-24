
$(function(){

	var contentFrame = $(".contentFrame");

	//一级导航切换
	$("header .navbar .j-item").click(function(){
			
		$(this).addClass('active').siblings().removeClass('active')
		
		var _index = $(this).index();
		$(".leftnav").addClass('hidden');
		$(".leftnav").eq(_index).removeClass('hidden').addClass('show');
	});

	//二级导航切换
	$(".leftnav-menu-item>a").click(function(){
		$(".leftnav-menu-item>a").removeClass('active');
		$(this).parents(".leftnav").find('.leftnav-sub-menu').hide();
		$(this).addClass('active');

		if($(this).next().length){
			//如果有三级导航
			if($(this).find('i.arrow').hasClass('glyphicon-menu-right')){
				$(this).find('i.arrow').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-right');
				$(this).next().show();

			}else{
				$(this).find('i.arrow').addClass('glyphicon-menu-right').removeClass('glyphicon-menu-down');
				$(this).next().hide();
			}
		}else{
			$(".leftnav-sub-menu a").removeClass('active');
			$(".leftnav-menu-item>a i.arrow").addClass('glyphicon-menu-right').removeClass('glyphicon-menu-down');
			//没有三级导航直接打开页面
			var _url = $(this).data('url');
			var _name = $(this).text();
			addContentFrame(_url,_name);
		}	
	});
	
	//三级导航切换
	$(".leftnav-sub-menu a").click(function(){
		$(".leftnav-sub-menu a").removeClass('active');
		$(this).addClass('active');

		var _name = $(this).text();
		var _url = $(this).data('url');
		addContentFrame(_url,_name);
	});	

	//页面标签点击切换
	$(".page-tab-box").on('click','li',function(){
		var _url = $(this).find('a').data('url');
		addContentFrame(_url);
	});

	//页面标签删除
	$(".page-tab-box").on('click','a',function(){
		var _url = $(this).data('url');
		removeFrame(_url,this);
		return false;
	});

	//tab切换
	$('.page-tab .toLeft').on('click',function(){
		$(".page-tab-box").css({'right':'','left':0})
	});
	$('.page-tab .toRight').on('click',function(){
		$(".page-tab-box").css({'right':0,'left':''})
	});

	//关闭所有选项卡
	$('#closeAllTab').on('click',function(){
		$('.contentFrame').each(function(index,obj){
			if(index>0){
				$(obj).remove();
			}
		});

		$('.page-tab-box li').each(function(index,obj){
			if(index>0){
				$(obj).remove();
			}
		});
		$('.contentFrame').show();
		$('.page-tab-box li button').addClass('active');
		$('.page-tab-box').css({'right':'','left':0});
	})
	//关闭其他选项卡
	$('#closeOtherTab').on('click',function(){
		$('.contentFrame').each(function(index,obj){
			if( index>0&& $(obj).css('display')=='none' ){
				$(obj).remove();
			}
		});

		$('.page-tab-box li').each(function(index,obj){
			if(index>0&&!$(obj).find('button').hasClass('active')){
				$(obj).remove();
			}
		});
		$('.page-tab-box').css({'right':'','left':0});
	})

	/**
	 * 添加iframe页面
	 * @param {String} url	页面地址
	 * @param {String} name	模块名字
	 */
	function addContentFrame(url,name){
		var onOff =true;
		$(".contentFrame").each(function(index,obj){
			if($(obj).attr('src') == url){
				//如果页面存在，切换到对应页面和对应标签
				$(obj).siblings('.contentFrame').hide();
				$(obj).show();

				$(".page-tab-box button").removeClass('active');
				$(".page-tab-box button a").each(function(index,obj){
					if( $(obj).data('url')==url ){
						$(obj).parent().addClass('active');
						return false;
					}
				});

				onOff = false;
				return false;
			}
		});
   		
		if (!onOff) return;
   		var _frame = `<iframe class="contentFrame" src="${url}" frameborder="0" border="0" width="100%" height="100%"></iframe>`;
		$("#page-content").find('.contentFrame').hide();
		$("#page-content").append(_frame);
		//生成页面切换标签
		var _li = `<li>
						<button type="button" class="btn btn-default active">
							${name}
							<a href="javascript: void(0)" data-url="${url}"><i class="fa fa-times-circle"></i></a>
						</button>
				   </li>`;
		$(".page-tab-box button").removeClass('active');
		$(".page-tab-box").append(_li);

		//动态计算ul的宽度
		var ulLength = 0;
		$(".page-tab-box li").each(function(index,obj){
			ulLength+= $(obj).width();	
		});
		$(".page-tab-box").css('width',ulLength+2);

		//如果page-tab-box 宽度大page-tabcontain  则定位到最后	
		if(ulLength>$('.page-tabcontain').width()){
			$(".page-tab-box").css('right',0);
		}
	}

	/**
	 * 删除iframe页面
	 * @param {String} url	页面地址
	 * @param {obj} thisTab	当前页面标签
	 */
	function removeFrame(url,thisTab){
		//上个页面选中
		if($(thisTab).parents('button').hasClass('active')){
			var _prev = $(thisTab).parents('li').prev();
			_prev.find('button').addClass('active');
			var _prevUrl = _prev.find('a').data('url');

			$(".contentFrame").each(function(index,obj){
				if($(obj).attr('src')==_prevUrl){
					$(obj).show();
				}	
			});	
		}
			
		$(thisTab).parent().remove();
		$(".contentFrame").each(function(index,obj){
			if($(obj).attr('src')==url){
				$(obj).remove();
				return false;
			}	
		});		
	}

});

//关闭打开的layer弹窗
$(function(){
	$("#cancelButton").click(function(){
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	    parent.layer.close(index); //再执行关闭
	});
});


