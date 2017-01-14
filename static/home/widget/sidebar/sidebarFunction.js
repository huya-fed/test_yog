/**
 * sidebar function 侧边栏
 */

/**
 * 广告图
 */
function CreateBanner(){
    this.initialize.apply(this, arguments);
}
CreateBanner.prototype = {
    initialize : function(sidedar){
        var ads = null;
        var _this  = this;
        

        this.URL = window.APP_URL ? window.APP_URL+'cache10min.php' : 'http://www.huya.com/cache10min.php';
        this.sidedar = sidedar;

        //这里比较激进，首次拿不到，要到第二次的时候，才能获取
        if(ads = window.localStorage.getItem('sidebar/ads')){
            try{
                ads = JSON.parse(ads);
                _this.createImage(ads);
            }catch(e){
            }
            
        }

        //肯定要更新的，延迟更新
        $(window).on('load',function(){
            setTimeout(function(){
                _this.ajaxGetAds();
            }, 500)  
        })
    },
    createImage : function(result){
        $('.sidebar-banner').show();
        $('#sidebarBanner').attr({href:result.link,title:result.title,target:'_blank'})
            .html('<img src="'+result.picUrl+'" alt="'+result.title+'" width="200" height="80">');

        this.sidedar.sidebarScrollFn();
    },
    ajaxGetAds : function(){

        $.ajax({
            url:this.URL,
            type:'GET',
            data:{
                'm' : 'Ad',
                'do' : 'ajaxGetAds',
                'type' : 4,
                'area' : 14,
                'num' : 1
            },
            dataType:'json'
        }).done(function(data){
            if(data.status=='1000'){
                var result = data.data[0];
                if(result){
                    window.localStorage.setItem('sidebar/ads',JSON.stringify(result))
                }else{
                    window.localStorage.removeItem('sidebar/ads');
                }
                
            }else{
                window.localStorage.removeItem('sidebar/ads');
            }
        });
    }
}




function ModSidebar(){
    this.initialize.apply(this, arguments);
}
ModSidebar.prototype = {
    initialize : function(){
        var _this = this;
        this.$modSidebar = $('.mod-sidebar');
        this.$sidebarScroll = $('#sidebar-scroll');
        this.$sidebarHide = $('.sidebar-hide');
        this.$sidebarShow = $('.sidebar-show');

        this.URL = window.APP_URL ? window.APP_URL+'cache10min.php' : 'http://www.huya.com/cache10min.php';


        this.highlight();

        this.sidebarScrollFn();

        this.resizeFn();



        this.bindEvent();

        DUYA_SUB.subscribe('sidebarShow', function () {
            _this.sidebarScrollFn();
        });
    },
    /**
     * 导航高亮
     */
    highlight : function(){
        //假如找到子分类是加亮的话，给父级也加亮
        var $m = $('.sidebar-recom').find('.on').parents('.m');
        if($m.length > 0){
            $m.addClass('m-on-bg');  
        }


        var $sidebarIconItem = $('.sidebar-icon-item');
        var href = 'http://'+window.location.host+window.location.pathname;
        //我的订阅，全部直播，全部分类
        $('.sidebar-show-nav').find('a').each(function(index, el) {
            var $this = $(this);
            //假如等于当前的url的话。就加亮
            if($this.attr('href') == href){
                $this.addClass('on');

                $sidebarIconItem.eq(index).addClass('on');
            }
        });
    },
    /**
     * 设置滚动
     */
    sidebarScrollFn : function(){

        var _this = this;
        var api = this.$sidebarScroll.data('jsp');
        this.$sidebarScroll.height(this.$sidebarShow.height() - 130);


        if(api){
            api.reinitialise();
            return;
        }


        //判断是否存在滚动条插件
        if($.isFunction($.fn.jScrollPane)){
            this.$sidebarScroll.jScrollPane({scrollbarWidth: 6, mouseWheelSpeed: 20,verticalGutter : 0});
        }else{

            var scriptUrl = 'http://127.0.0.1:8085/static/home/lib/scrollpane.js';

            $.ajax(scriptUrl, {
                dataType : 'script',
                cache: true,
                success : function() {
                    _this.$sidebarScroll.jScrollPane({scrollbarWidth: 6, mouseWheelSpeed: 20,verticalGutter : 0});
                }
            });
        }
    },
    /**
     */
    resizeFn : function(){
        var $sidebarIconAuthor = $('.sidebar-icon-author');
        var _this = this;
        var $win = $(window);

        $win.on('resize.sidebar',function(){

            _this.sidebarScrollFn();

            if($win.height()<620){
                $sidebarIconAuthor.hide();
            }else{
                $sidebarIconAuthor.show();
            }
        })

    },
    bindEvent : function(){

        if(NAV_UTIL.isLogin()){
            $('.subscribe-text').remove();
        }else{
            $('.js-sub').on('click',function(){
                NAV_UTIL.login()
                return false;
            })
        }
  
    }
}



;(function () {

    

    var sidedar = new ModSidebar();

    //new CreateBanner(sidedar);


    //配合响应式的侧栏.直播间的
    DUYA_SUB.subscribe('sidebarShow', function () {
        $('#J_mainWrap').css('padding-left', 240)
    });
    DUYA_SUB.subscribe('sidebarHide', function () {
        $('#J_mainWrap').css('padding-left',50);
    });

    

    var barbar = window.huya_sidebar = {
        init: function (status) {
            this.status = status // 0, 隐藏; 1, 展开;

            if (status === 1) {
                // css里默认设置了sidebar是show状态
            } else {
                barbar.hide()
            }

            this.inited = true
        },
        show: function () {
            if (this.status === 1 && this.inited) return;

            this.status = 1;

            sidedar.$sidebarHide.hide();
            sidedar.$sidebarShow.show();
            DUYA_SUB.publish('sidebarShow');
            DUYA_SUB.publish('resizeWide');
        },
        hide: function () {
            if (this.status === 0 && this.inited) return;

            this.status = 0;

            sidedar.$sidebarHide.show();
            sidedar.$sidebarShow.hide();
            DUYA_SUB.publish('sidebarHide');
            DUYA_SUB.publish('resizeWide');
        }
    }


    // 初始化
    barbar.init(window.localStorage.getItem('sidebar/status') == '0' ? 0 : 1)

    //展开
    $('#sidebar-show-btn').on('click',function(){
        matchCurrentStatus = 2333
        barbar.show()
        window.localStorage.setItem('sidebar/status',1);
    })

    // 收起
    $('#sidebar-hide-btn').on('click',function(){
        matchCurrentStatus = 2333
        barbar.hide()
        window.localStorage.setItem('sidebar/status',0);
    });

    // 产品逻辑：赛事直播间不理会上一次用户选择的是展开还是收起，只要屏幕小于1366就收起; 但本次的选择还是要理会的
    var matchCurrentStatus = -1;    // -1, 表示用户在本次中尚未做出选择

    (function(){
        if ( $('.on-match').length === 0 ) return;

        var win = $(window)
        var timer = null

        toggle()

        win.resize(function(e){
            clearTimeout(timer)
            timer = setTimeout(function(){
                toggle()
            }, 60)
        })

        function toggle () {
            if (matchCurrentStatus === -1) {            
                if (win.width() <= 1366) {
                    barbar.hide()
                } else {
                    if ( window.localStorage.getItem('sidebar/status') != '0' ) barbar.show();
                }
            } 
        }
    })();

})();