define('home:client/widget/backtotop/backtotop', function(require, exports, module) {

  var backtotop = {
  	init : function(){
  		this.render();
  		this.scrollFn();
  		this.navAppFn();
  	},
  	/**
  	 * 添加到dom树
  	 */
  	render : function(){
  		var _tpl = function(obj){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  with(obj||{}){
  __p+='<div class="hy-side" id="J_hySide">\r\n    <div class="hy-side-nav">\r\n        <a class="hy-side-nav-item clickstat" target="_blank" href="http://www.huya.com/download/" eid="click/navi/right/download" eid_desc="点击/导航/右侧/下载">\r\n            <i class="hy-side-nav-phone"></i>\r\n            <p class="hy-side-nav-txt">下载</p>\r\n            <div class="hy-side-nav-download" id="J_hySideDl"><i id="J_hySideDlGif"></i></div>\r\n        </a>\r\n        <a class="hy-side-nav-item clickstat" target="_blank" href="http://www.huya.com/e/zhubo" eid="click/navi/right/shower" eid_desc="点击/导航/右侧/我要直播">\r\n            <i class="hy-side-nav-video"></i>\r\n            <p class="hy-side-nav-txt">开播</p>\r\n        </a>\r\n        <a class="hy-side-nav-item clickstat" target="_blank" href="http://blog.huya.com/product/81" eid="click/navi/right/kefu" eid_desc="点击/导航/右侧/客服">\r\n            <i class="hy-side-nav-qa"></i>\r\n            <p class="hy-side-nav-txt">反馈</p>\r\n        </a>\r\n        <a class="hy-side-nav-item clickstat" target="_blank" href="http://help.huya.com" eid="click/navi/right/help" eid_desc="点击/导航/右侧/帮助">\r\n            <i class="hy-side-nav-help"></i>\r\n            <p class="hy-side-nav-txt">帮助</p>\r\n        </a>\r\n        <a class="hy-side-nav-item" id="J_hyBackToTop" style="display:none;" href="#">\r\n            <i class="hy-side-nav-top"></i>\r\n            <p class="hy-side-nav-txt">顶部</p>\r\n        </a>\r\n    </div>\r\n</div>';
  }
  return __p;
  };
  		$("body").append( _tpl() );
  	},
  	/**
  	 * 滚动事件
  	 */
  	scrollFn : function(){
  		var _timeout = null;
  		var $navBackTop = $("#J_hyBackToTop");
  
  		// 有些页面的滚动条是 生成到 .js-responded-list 元素里的
  		var $win = $('.js-responded-list')
  
  		if ($win.length == 0) $win = $(window);
  
  		$win.on('scroll', function(){
  		    clearTimeout(_timeout);
  
  		    _timeout = setTimeout(function(){
  		        if($win.scrollTop() > 200){
  		            $navBackTop.show()
  		        }else{
  		            $navBackTop.hide()
  		        }
  		    }, 60);
  		});
  
  		$navBackTop.click(function(e) {
  			e.preventDefault()
  			
  			if ($win[0] === window) {
  				$('html,body').animate({scrollTop: 0}, 500)
  			} else {
  				$win.animate({scrollTop: 0}, 500)
  			}
  		});
  	},
  	/**
  	 * app滑动图片效果
  	 */
  	navAppFn : function(){
  		var gif = $('#J_hySideDlGif')
  		var timeout = null
  		var visible = false
  
  		$("#J_hySideDl").mouseenter(function(){
  			if (visible) return;
  
  			var img = new Image()
  			img.src =  'http://127.0.0.1:8085/static/home/widget/backtotop/img/app.gif' + '?t=' + (new Date()).getTime()    // 为了让gif每次都能 “嗨起来”
  
  			gif.append(img)
  
  			timeout = setTimeout(function(){
  				clear()
  			}, 2000)
  
  			visible = true;
  		}).mouseleave(function(){
  			clear()
  			visible = false;
  		})
  
  		function clear () {
  			if (timeout) clearTimeout(timeout);
  			gif.empty()
  		}
  	}
  }
  
  
  backtotop.init();
  
  
  

});

define('home:client/modules/respondHeight/respondHeight', function(require, exports, module) {

  /*
  * @Author: xiejinlong
  * @Date:   2016-10-08 17:37:14
  * @Last Modified by:   xiejinlong
  * @Last Modified time: 2016-10-08 17:37:57
  */
  
  //响应式列表页
  function respondHeight($jsRespondedList){
      var $duyaHeader = $('#duya-header');
      var $win = $(window);
  
      // 高度
      function setContentWrap () {
          $jsRespondedList.css({
              'height': ($win.height() - $duyaHeader.height())
          });
      }
  
      DUYA_SUB.subscribe('resizeWide', setContentWrap);
      setContentWrap();
  
  }
  
  module.exports = respondHeight;
  
  

});

define('home:client/modules/respondCard/respondCard', function(require, exports, module) {

  /*
  * @Author: xiejinlong
  * @Date:   2016-10-09 09:55:18
  * @Last Modified by:   xiejinlong
  * @Last Modified time: 2016-10-09 09:55:52
  */
  
  /**
   * 响应式卡片
   */
  function RespondCard(){
      this.initialize.apply(this,arguments)
  
  }
  RespondCard.prototype ={
      initialize : function(obj){
          this.$wrapElement = $(obj.wrapElement);
          this.$itemElement = this.$wrapElement.find(obj.itemElement);
          this.itemWidth = this.$itemElement.outerWidth();
          this.createCsstext = obj.createCsstext;
  
          this.iMargin = this.$itemElement.outerWidth(true) - this.itemWidth; //获取边距;
  
          this.scale = obj.scale;
  
          this.calculation();
  
          this.bindEvent();
      },
      /**
       * 插入样式
       */
      _importStyle : function(cssText, id){
          if (document.getElementById(id)) return;
  
          var element = document.createElement('style');
  
          id && (element.id = id);
  
          // Adds to DOM first to avoid the css hack invalid
          document.getElementsByTagName('head')[0].appendChild(element);
  
          // IE
          if (element.styleSheet) {
  
          // http://support.microsoft.com/kb/262161
          if (document.getElementsByTagName('style').length > 31) {
            throw new Error('Exceed the maximal count of style tags in IE')
          }
  
          element.styleSheet.cssText = cssText;
          }
          // W3C
          else {
              element.innerHTML = cssText;
          }
      },
      /**
       * 计算比例
       */
      calculation : function(){
          // 父元素的宽度
          var iWrapWidth = this.$wrapElement.innerWidth();
          // 看一行能放多少个
          var num = Math.floor(iWrapWidth / (this.itemWidth + this.iMargin));
          // 得出新的宽度
          var newWidth = Math.floor(iWrapWidth / num) - this.iMargin;
          var newHeight = Math.floor(newWidth / this.scale);
  
  
          //插入新的CSS样式，如果用EACH的话，耗性能;
          var cssText = this.createCsstext(newWidth,newHeight);
          var respondStyleElement = document.getElementById('respondStyle');
  
          if(respondStyleElement){
               if (respondStyleElement.styleSheet) { //for ie
                  respondStyleElement.styleSheet.cssText = cssText;
               } else {//for w3c
                  respondStyleElement.innerHTML = cssText;
               }
          }else{
              this._importStyle(cssText,'respondStyle');
          }
      },
      bindEvent : function(){
  
          var _this = this;
  
          $(window).on('resize.responseCard',function(){
              _this.calculation()
          })
      }
  }
  
  module.exports = RespondCard; 
  

});

define('home:client/components/lay-page/lay-page', function(require, exports, module) {

  /*!
   
   @Name : layPage v1.3- 分页插件
   @Author: 贤心
   @Site：http://sentsin.com/layui/laypage
   @License：MIT
   
   */
  
  //;!function(){
      //"use strict";
  
      function laypage(options){
  
          new Page(options);
  
      }
  
      /**
       * 包含函数
       * @method contains
       * @param element 目标
       * @param oParent 父亲元素
       * @return {boolean}
       */
      function contains(element,oParent){
          if(oParent.contains) {
              return oParent.contains(element)
          }
          else if(oParent.compareDocumentPosition) {
              return !!(oParent.compareDocumentPosition(element) & 16)
          }
      }
  
      /**
       * 判断子元素是否在包含的元素
       * @method isParent
       * @param element
       * @param tagName
       * @return {boolean}
       */
      function isParent(element, tagName) {
          while(element != undefined && element != null && element.tagName.toUpperCase() !== "BODY") {
              if(element.tagName.toUpperCase() == tagName.toUpperCase())
                  return element;
              element = element.parentNode;
          }
          return false
      }
  
      laypage.v = '1.3';
  
      var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
  
      var index = 0, Page = function(options){
          var that = this;
          var conf = that.config = options || {};
          var type = that.type();
  
          conf.item = index++;
  
          if(type === 2){
              conf.cont = conf.cont;
          } else if(type === 3){
              conf.cont = conf.cont[0];
          } else {
              conf.cont = doc[id](conf.cont);
          }
  
          
          that.render(true);
          that.jump(conf.cont);
      };
  
      Page.on = function(elem, even, fn){
          elem.attachEvent ? elem.attachEvent('on'+ even, function(){
              fn.call(elem, window.even); //for ie, this指向为当前dom元素
          }) : elem.addEventListener(even, fn, false);
          return Page;
      };
  
  
  
      //判断传入的容器类型
      Page.prototype.type = function(){
          var conf = this.config;
          if(typeof conf.cont === 'object'){
              return conf.cont.length === undefined ? 2 : 3;
          }
      };
  
      //分页视图
      Page.prototype.view = function(){
          var that = this, conf = that.config, view = [], dict = {};
          conf.pages = conf.pages|0;
          conf.curr = (conf.curr|0) || 1;
  
          conf.groups = 'groups' in conf ? (conf.groups|0) : 5;
          //首页
          conf.first = 'first' in conf ? conf.first : '&#x9996;&#x9875;';
          //尾页 
          conf.last = 'last' in conf ? conf.last : '&#x5C3E;&#x9875;';
          //上一页
          conf.prev = 'prev' in conf ? conf.prev : '&#x4E0A;&#x4E00;&#x9875;';
          //下一页
          conf.next = 'next' in conf ? conf.next : '&#x4E0B;&#x4E00;&#x9875;';
          
          //只有一页的话
          if(conf.pages <= 1){
              return '';
          }
  
          //分组数大于总页数
          if(conf.groups > conf.pages){
              conf.groups = conf.pages;
          }
          
          //计算当前组
          //dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0))/(conf.groups === 0 ? 1 : conf.groups));
  
  
          if(conf.groups === 0){
              dict.index = conf.curr;
          }else{
              dict.index =  Math.ceil((conf.curr+1)/conf.groups);
          }
  
          
          
          //当前页非首页，则输出上一页
          if(conf.curr > 1 && conf.prev){
              view.push('<a href="javascript:;" class="laypage_prev" data-page="'+ (conf.curr - 1) +'">'+ conf.prev +'</a>');
          }
          
          //当前组非首组，则输出首页
          if(dict.index > 1 && conf.first && conf.groups !== 0 && conf.groups !== conf.pages){
              if(conf.pages-1 > conf.groups){
                  view.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">'+ conf.first +'</a><span>&#x2026;</span>');
              }else{
                  view.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">'+ conf.first +'</a>');
              }
              
          }
          
          //输出当前页组,当前的页码左右取值,比如5    34 5 67
          dict.poor = Math.floor((conf.groups-1)/2);
          //大于第一组，
          dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
  
          dict.end = dict.index > 1 ? (function(){
              var max = conf.curr + (conf.groups - dict.poor - 1);
              return max > conf.pages ? conf.pages : max;
          }()) : conf.groups;
  
  
  
          if(dict.end - dict.start < conf.groups - 1){ //最后一组状态
              dict.start = dict.end - conf.groups + 1;
          }
  
  
          for(; dict.start <= dict.end; dict.start++){
              if(dict.start === conf.curr){
                  view.push('<span class="laypage_curr" '+ (/^#/.test(conf.skin) ? 'style="background-color:'+ conf.skin +'"' : '') +'>'+ dict.start +'</span>');
              } else {
                  view.push('<a href="javascript:;" data-page="'+ dict.start +'">'+ dict.start +'</a>');
              }
          }
  
          
          //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
          if(conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0){
              if(conf.pages-1 > conf.groups){
                  view.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="'+ conf.pages +'">'+ conf.last +'</a>');
              }else{
                  view.push('<a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="'+ conf.pages +'">'+ conf.last +'</a>');
              }
          }
          
          //当前页不为尾页时，输出下一页
          dict.flow = !conf.prev && conf.groups === 0;
          if(conf.curr !== conf.pages && conf.next || dict.flow){
              view.push((function(){
                  return (dict.flow && conf.curr === conf.pages) 
                  ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">'+ conf.next +'</span>'
                  : '<a href="javascript:;" class="laypage_next" data-page="'+ (conf.curr + 1) +'">'+ conf.next +'</a>';
              }()));
          }
          
          return '<div name="laypage'+ laypage.v +'" class="laypage_main laypageskin_'+ (conf.skin ? (function(skin){
              return /^#/.test(skin) ? 'molv' : skin;
          }(conf.skin)) : 'default') +'" id="laypage_'+ that.config.item +'">'+ view.join('') + function(){
              return conf.skip 
              ? '<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label>'
              + '<button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>' 
              : '';
          }() +'</div>';
      };
  
      //跳页
      Page.prototype.jump = function(elem){
          if(!elem) return;
  
          var that = this, conf = that.config;
          elem.onclick=function(e){
              var e = e || event,
                  oTarget = e.target || e.srcElement;
  
              if(contains(oTarget, this)) {
  
                  if(isParent(oTarget, "a")){
  
                      var curr = oTarget.getAttribute('data-page')|0;
                      conf.curr = curr;
                      that.render();
  
                  }else if(isParent(oTarget, "button")){
  
                      var input = elem[tag]('input')[0];
                      var curr = input.value.replace(/\s|\D/g, '')|0;
                      if(curr){
                          conf.curr = curr > conf.pages? conf.pages : curr;
                                   
                          that.render();
                      }
                  }
                  
              }
          }
  
          elem.onkeydown = function(e){
              var e = e || event,
                  oTarget = e.target || e.srcElement;
  
              if(contains(oTarget, this)) {
                  if(isParent(oTarget, "input") && e.keyCode==13){
  
                      var input = elem[tag]('input')[0];
                      var curr = input.value.replace(/\s|\D/g, '')|0;
                      if(curr){
                          conf.curr = curr > conf.pages? conf.pages : curr;
                                   
                          that.render();
                      }
                  }
              }
          }
      };
  
      //渲染分页
      Page.prototype.render = function(load){
          var that = this, conf = that.config;
          var view = that.view();
  
          conf.cont.innerHTML = view;
  
          conf.jump && conf.jump(conf, load);
  
          if(conf.hash && !load){
              location.hash = '!'+ conf.hash +'='+ conf.curr;
          }
      };
  
      //for 页面模块加载、Node.js运用、页面普通应用
      
      //window.laypage = laypage;
      module.exports = laypage
  //}();

});

define('home:client/modules/formatNumber/formatNumber', function(require, exports, module) {

  /**
   * [formatNumber 格式化数字，如果大于1万，则显示X.X万,否则按原来显示]
   * @param  {[string]} number [要格式化的数字]
   * @return {[string]}        [格式后的数字]
   */
  var util = {
  
  	isFormatNumber: false,
  
  	formatNumber: function(number) {
  		var num = Number(number);
  		if (num && num > 10000) {
  			return (num / 1e4).toFixed(1) + '万';
  		}
  		return num;
  	},
  	
  	fnFormat: function($wrap) {
  		if (!this.isFormatNumber) {
  			var $num = $wrap.find('.js-num');
  			var _this = this;
  			$num.each(function(index, item) {
  				var value = $.trim($(item).text());
  				$(item).text(_this.formatNumber(value));
  			})
  			this.isFormatNumber = true;
  		}
  	}
  }
  
  return util;

});

define('home:client/modules/listTags/listTags', function(require, exports, module) {

  /*
  * @Author: xiejinlong
  * @Date:   2016-10-09 18:52:51
  * @Last Modified by:   xiejinlong
  * @Last Modified time: 2017-01-13 17:03:24
  */
  
  var laypage =  require('home:client/components/lay-page/lay-page');
  var format = require("home:client/modules/formatNumber/formatNumber");
  
  
  
  
  
  
  /**
   * 标签分页筛选功能
   */
  function ListTags(){
      this.initialize.apply(this,arguments);
  }
  ListTags.prototype = {
      initialize : function(obj){
          this.$tagNav = $(obj.tagNav);
          this.$tagContainer = $(obj.tagContainer);
          this.$jsListPage = $(obj.jsListPage);
          this.$jsRespondedList = $(obj.jsRespondedList);
  
          this.eid = obj.eid;
          this.position = obj.position;
  
          this.gameType = obj.gameType;
  
  
          this.id = obj.id || 0;
          this.type = obj.type || 'tagAll';
  
          this.url = window.APP_URL || 'http://www.huya.com/';
          this.liveTpl = function(obj){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  with(obj||{}){
  __p+='';
  
  
      for(var i = 0, len=list.length; i<len; i ++){
          var data = list[i];
  
  __p+='\n\n<li class="game-live-item">\n    ';
  
          var url = APP_URL + data['privateHost'];
  
          if(data['screenType'] == 1 && data['liveSourceType'] == 2){
              var screenshot = data['screenshot']+'?imageview/4/0/w/190/h/338/rotate/270';
          }else{
              var screenshot = data['screenshot']+'?imageview/4/0/w/338/h/190/blur/1';
          }
  
  
      
  __p+='\n    <a href="'+
  ((__t=(url))==null?'':__t)+
  '" class="video-info new-clickstat" target="_blank">\n        <img class="pic" data-original="'+
  ((__t=(screenshot))==null?'':__t)+
  '" src="http://assets.dwstatic.com/amkit/p/duya/common/img/default_live.jpg" alt="'+
  ((__t=(data['nick']))==null?'':__t)+
  '的直播" title="'+
  ((__t=(data['nick']))==null?'':__t)+
  '的直播">\n        ';
   if(data['recommendTagName']){
  __p+='<em class="tag tag-recommend">'+
  ((__t=(data['recommendTagName']))==null?'':__t)+
  '</em>';
   }
  __p+='\n        <div class="item-mask"></div>\n        <i class="btn-link__hover_i"></i>\n        ';
   if(data['isBluRay']==1){ 
  __p+='<em class="tag tag-blue">蓝光</em>';
   }
  __p+=' \n    </a>\n    <a href="'+
  ((__t=(url))==null?'':__t)+
  '" class="title new-clickstat" target="_blank" target="_blank">'+
  ((__t=( data['introduction']))==null?'':__t)+
  '</a>\n    <span class="txt">\n        <span class="avatar fl">\n            <img data-original="'+
  ((__t=(data['avatar180']))==null?'':__t)+
  '" src="http://assets.dwstatic.com/amkit/p/duya/common/img/default_profile.jpg" alt="'+
  ((__t=(data['nick']))==null?'':__t)+
  '" title="'+
  ((__t=(data['nick']))==null?'':__t)+
  '">\n            <i class="nick" title="'+
  ((__t=(data['nick']))==null?'':__t)+
  '">'+
  ((__t=(data['nick']))==null?'':__t)+
  '</i>\n        </span>\n        ';
  
              if( data['gameHostName'] != ""){
                  var gameTypeUrl = "http://www.huya.com/g/" + data['gameHostName'];
              }else{
                  var gameTypeUrl = "http://www.huya.com/g/" + data['gid'];
              }
          
  __p+='\n        <span class="game-type fr"><a target="_blank" href="'+
  ((__t=(gameTypeUrl))==null?'':__t)+
  '" title="'+
  ((__t=(data['gameFullName']))==null?'':__t)+
  '">'+
  ((__t=(data['gameFullName']))==null?'':__t)+
  '</a></span>\n\n        <span class="num"><i class="num-icon"></i><i class="js-num">'+
  ((__t=(data['totalCount']))==null?'':__t)+
  '</i></span>\n    </span>\n</li>\n';
  }
  __p+='';
  }
  return __p;
  };
  
          //从第几页开始
          this.currPage = obj.currPage || 1;
  
          //一页120个
          this.pageSize = 120;     
  
          //因为蓝光和其他的标签、还有全部标签 不一样，存在是三个系统
          this.tagParams = obj.tagParams;
  
  
          this.bindEvent();
      },
      _getData : function(paramObj,callback){
  
          this.ajaxGet && this.ajaxGet.abort();
  
          this.ajaxGet = $.ajax({
              url: this.url+paramObj.url,
              type: 'GET',
              dataType: 'jsonp',
              data: {
                  page: paramObj.page
              }
          })
          .done(function(response) {
              if(response.status === 200){
                  callback && callback(response.data);
              }
              
          });
          
      },
      /**
       * php的第一次同步渲染
       * @return {[type]} [description]
       */
      syncRender : function(){
  
          this.$tagContainer.css('visibility','visible');
  
          this.createPageList();
  
          this.$tagContainer.find('img').lazyload({
              threshold: 200,
              container: this.$jsRespondedList
          });
      },
      /**
       * 导航高亮
       * @param  {Number} id 字段
       */
      _navHighlight : function(id){
          var $tag = this.$tagNav.find('[data-id=' + id + ']');
          var type = $tag.data('type');
  
          $tag.addClass('active').siblings('dd').removeClass('active');
  
          this.id = id;
          this.type = type;
      },
      /**
       *创建页面
       */
      createPageView : function(){
          var _this = this;
  
          this._getData({
              url : this.tagParams[this.type] + '&' + this.type + '=' + this.id,
              page : this.currPage,
          },function(oData){
  
  
              _this._renderList(oData);
          
          });
      },
      /**
       * 渲染页面
       * @return {[type]} [description]
       */
      _renderList : function(oData){
  
  
          if(oData.datas && oData.datas.length > 0){
              var _tpl = this.liveTpl({
                  list: oData.datas,
                  eid : this.eid,
                  position : this.position + '/' + this.id + '/' + oData.page,  //位置，看文档
                  gameType : this.gameType,
                  APP_URL: this.url
              });
  
              this.$tagContainer.html(_tpl);
  
              //上报曝光的数据
              var route = this.position + '/' + this.id + '/' + oData.page;  //路径
  
  
              //懒加载
              this.$tagContainer.find('img').lazyload({
                  threshold: 200,
                  container: this.$jsRespondedList
              });
  
  
          }
  
  
  
          //第一页数据，且为空
          if(oData.totalPage === 1 && oData.totalCount === 0){
   
          }else if(oData.totalPage === 1){
  
          }else{
              this.createPageList(oData.totalPage);
          }
   
          
      },
      /**
       * 开始的状态
       * @return {[type]} [description]
       */
      startStatus : function(callback){
  
          this.currPage = 1;
  
          this.$tagContainer.html('');
          this.$jsListPage.html('');
  
  
  
          callback && callback();
      },
      /**
       * 切换选项页面
       * @param  {Number} id 字段
       */
      togglePageView : function(id,callback){
  
  
  
          this._navHighlight(id);
  
          this.startStatus(callback);
  
          this.createPageView();
  
          
          
      },
      /**
       * 创建分页
       * @param  {Number} totalPage 总页数
       */
      createPageList : function(totalPage){
          var _this = this;
  
          laypage({
              cont: this.$jsListPage, //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: totalPage || this.$jsListPage.attr('data-pages'), //通过后台拿到的总页数
              curr: this.currPage, //当前页
              skip: true, //是否开启跳页
              groups: 7,
              first: 1,
              last: totalPage || this.$jsListPage.attr('data-pages'),
              jump: function(obj, first){ //触发分页后的回调
                  if(!first){
  
                      _this.currPage = obj.curr;
                      _this.createPageView();
                      _this.$jsRespondedList.scrollTop(0);
                  }
                  
              }
          });
      },
      bindEvent : function(){
          var _this = this;
          //标签切换功能
          this.$tagNav.on('click', 'dd', function() {
              var $this = $(this);
              if($this.hasClass('active')){
                  return false;
              }
              var id = $(this).data('id');
              
              window.location.hash = 'tag' + id;
              _this.togglePageView(id);  
          });
      }
  };
  
  
  module.exports = ListTags; 

});

define('home:client/modules/index', function(require, exports, module) {

  /*
  * @Author: xiejinlong
  * @Date:   2016-10-08 15:06:20
  * @Last Modified by:   xiejinlong
  * @Last Modified time: 2017-01-14 13:33:52
  */
  
  // 返回顶部
  require('home:client/widget/backtotop/backtotop');
  
  
  // 响应式高度
  var respondHeight = require('home:client/modules/respondHeight/respondHeight');
  // 响应式卡片
  var RespondCard = require('home:client/modules/respondCard/respondCard');
  // 标签分类功能
  var ListTags = require('home:client/modules/listTags/listTags');
  
  var $jsRespondedList = $('.js-responded-list');
  
  
  
  
  respondHeight($jsRespondedList);
  
  
  
  //响应式卡片
  var respondCard = new RespondCard({
      wrapElement : '#js-live-list', //父元素
      itemElement : '.game-live-item', //子元素
      scale : 280/158, //图片宽高比率
      createCsstext : function(newWidth,newHeight){
          var cssText = '.live-list .game-live-item {width:' + newWidth + 'px!important;}';
              cssText += '.live-list .video-info {height:' + newHeight + 'px!important;}';
          return cssText;
      }
  });
  
  //侧栏响应式
  DUYA_SUB.subscribe('sidebarShow', function () {
      $jsRespondedList.addClass('narrow');
      respondCard.calculation();
  
  });
  //侧栏响应式
  DUYA_SUB.subscribe('sidebarHide', function () {
      $jsRespondedList.removeClass('narrow');
      respondCard.calculation();
  });
  
  
  var listTags = new ListTags({
      tagNav : '#js-filter-list',   //标签切换导航
      jsListPage : '#js-list-page',   //分页包裹层
      tagContainer : '#js-live-list',  // 列表包裹层
      jsRespondedList : '.js-responded-list', // 最外面的包裹层，用来做滚动到顶部的
      eid : 'click/position',
      gameType : true,
      position : window.GAME_HOMENAME,  //位置
      //标签系统
      tagParams : {
          tagAll : 'cache.php?m=LiveList&do=getLiveListByPage',  //全部
          tagId : 'cache.php?m=LiveList&do=getTagLiveByPage',    //新标签
          recTag : 'cache.php?m=LiveList&do=getRecTagLivePage'  //蓝光
      }
  });
  
  //获取HASH值,#tag1
  var currentHash = location.hash.substring(4);
  
  //当没指定的页面参数时,全部视频显示出来
  if (currentHash === '' || currentHash === 0) {
      //php的第一次同步渲染
      listTags.syncRender();
  }else{
      listTags.togglePageView(currentHash,function(){
          $('#js-live-list').css('visibility','visible');
      });
  }
  
  
  

});

