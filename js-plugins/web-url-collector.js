// Generated by CoffeeScript 1.7.1
(function() {
  var M4YE_SITE, USER_SECRET, init;

  USER_SECRET = window.USER_SECRET;

  M4YE_SITE = window.M4YE_SITE;

  init = function(func) {
    var script;
    if (window.jQuery) {
      return func();
    } else {
      script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('charset', 'UTF-8');
      script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js');
      script.onload = function() {
        jQuery.noConflict();
        return func();
      };
      return document.body.appendChild(script);
    }
  };

  init(function() {
    var Collector, build;
    build = function(klass) {
      return jQuery("<div></div>").addClass(klass);
    };
    Collector = (function() {
      function Collector() {
        this.ANIMATE_DURATION = 100;
        this.STRING_SAVING = '正在努力保存 …';
        this.STRING_SUCCESS = '✔ 保存好了。';
        this.STRING_FAILURE = '出错了！';
      }

      Collector.prototype.render = function() {
        this.$elm = build('mindpin-web-url-collector').css({
          'font-family': 'helvetica, arial, 微软雅黑'
        }).appendTo(jQuery(document.body));
        this.$overlay = build('mindpin-web-url-collector-overlay').css({
          'position': 'fixed',
          'top': 0,
          'left': 0,
          'right': 0,
          'bottom': 0,
          'background-color': 'rgba(0, 0, 0, 0.6)',
          'z-index': 100000001
        }).hide().fadeIn(this.ANIMATE_DURATION).appendTo(this.$elm);
        this.$form = build('mindpin-web-url-collector-form').css({
          'position': 'fixed',
          'top': -300,
          'right': 40,
          'width': 320,
          'background-color': '#f4f4f4',
          'box-shadow': '0 0 5px rgba(0, 0, 0, 0.5)',
          'z-index': 100000002
        }).animate({
          'top': 0
        }, this.ANIMATE_DURATION).appendTo(this.$elm);
        this.$current_url = build('mwuc-url').css({
          'padding': 10,
          'background-color': 'rgba(255, 255, 255, 0.7)',
          'border-bottom': 'dashed 1px #ddd',
          'font-size': '14px',
          'word-break': 'break-all',
          'margin-bottom': '10px',
          'text-align': 'left',
          'line-height': '16px'
        }).html("收集：" + document.URL).appendTo(this.$form);
        this.$loading = build('mwuc-loading').css({
          'height': 24,
          'line-height': '24px',
          'font-size': '14px',
          'margin': '0 10px 10px',
          'padding': 10,
          'box-sizing': 'content-box'
        }).appendTo(this.$form).hide();
        this.$loading_icon = build('mwuc-loading-icon').css({
          'height': 24,
          'width': 24,
          'background': "url(" + M4YE_SITE + "ajax-loader.gif) no-repeat",
          'float': 'left',
          'margin-right': 10
        }).appendTo(this.$loading);
        this.$loading_info = build('mwuc-loading-info').css({
          'height': 24,
          'line-height': '24px',
          'float': 'left'
        }).html(this.STRING_SAVING).appendTo(this.$loading);
        this.$success = build('mwuc-success').css({
          'height': 24,
          'line-height': '24px',
          'margin': '0 10px 10px',
          'padding': '10px',
          'background-color': '#E0EFD6',
          'box-sizing': 'content-box',
          'color': '#009800',
          'border': 'dashed 1px rgba(0, 0, 0, 0.1)',
          'font-size': '14px'
        }).html(this.STRING_SUCCESS).appendTo(this.$form).hide();
        this.$failure = build('mwuc-failure').css({
          'height': 24,
          'line-height': '24px',
          'margin': '0 10px 10px',
          'padding': '10px',
          'background-color': '#EFD6D8',
          'box-sizing': 'content-box',
          'color': '#980000',
          'border': 'dashed 1px rgba(0, 0, 0, 0.1)',
          'font-size': '14px'
        }).html(this.STRING_FAILURE).appendTo(this.$form).hide();
        this.$inputs = build('mwuc-inputs').appendTo(this.$form);
        this.$title_input = jQuery('<input />').addClass('mwuc-title').attr('name', 'mwuc-title').attr('placeholder', '网页标题').css({
          'cssText': 'color: #222 !important;',
          'border': 'solid 1px #BBBBBB',
          'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.15)',
          'width': 320 - 20 - 14,
          'height': 20,
          'line-height': '20px',
          'margin': '0px 10px 5px',
          'padding': '4px 6px',
          'font-size': '14px',
          'font-family': 'helvetica, arial, 微软雅黑',
          'transition': 'none',
          'border-radius': 0,
          'display': 'block',
          'box-sizing': 'content-box'
        }).focus(function() {
          return jQuery(this).css('border-color', '#08c');
        }).blur(function() {
          return jQuery(this).css('border-color', '#bbb');
        }).val(document.title).appendTo(this.$inputs);
        this.$desc_input = jQuery('<textarea />').addClass('mwuc-desc').attr('name', 'mwuc-desc').attr('placeholder', '写点什么呗 …').css({
          'cssText': 'color: #222 !important;',
          'border': 'solid 1px #BBBBBB',
          'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.15)',
          'width': 320 - 20 - 14,
          'height': 100,
          'line-height': '20px',
          'margin': '0px 10px 5px',
          'padding': '4px 6px',
          'font-size': '14px',
          'font-family': 'helvetica, arial, 微软雅黑',
          'transition': 'none',
          'border-radius': 0,
          'display': 'block',
          'resize': 'none',
          'box-sizing': 'content-box'
        }).focus(function() {
          return jQuery(this).css('border-color', '#08c');
        }).blur(function() {
          return jQuery(this).css('border-color', '#bbb');
        }).appendTo(this.$inputs);
        this.$tags_input = jQuery('<input />').addClass('mwuc-tags').attr('name', 'mwuc-tags').attr('placeholder', 'TAGs').css({
          'cssText': 'color: #222 !important;',
          'border': 'solid 1px #BBBBBB',
          'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.15)',
          'width': 320 - 20 - 14,
          'height': 20,
          'line-height': '20px',
          'margin': '0px 10px 5px',
          'padding': '4px 6px',
          'font-size': '14px',
          'font-family': 'helvetica, arial, 微软雅黑',
          'transition': 'none',
          'border-radius': 0,
          'display': 'block',
          'box-sizing': 'content-box'
        }).focus((function(_this) {
          return function() {
            return _this.$tags_input.css('border-color', '#08c');
          };
        })(this)).blur((function(_this) {
          return function() {
            return _this.$tags_input.css('border-color', '#bbb');
          };
        })(this)).appendTo(this.$inputs);
        this.$buttons = build('mwuc-buttons').css({
          'height': 32,
          'margin': 10
        }).appendTo(this.$form);
        this.$submit = jQuery('<a></a>').addClass('mwuc-submit').html('收集！到四叶书签').css({
          'float': 'left',
          'color': 'white',
          'text-align': 'center',
          'height': 32,
          'line-height': '32px',
          'background-color': '#009800',
          'display': 'block',
          'width': 320 - 20 - 2 - 70 - 5,
          'font-size': '14px',
          'font-weight': 'bold',
          'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.15)',
          'cursor': 'pointer',
          'margin': '0 5px 0 0',
          'border': 'solid 1px rgba(0, 0, 0, 0.1)',
          'border-radius': 3,
          'position': 'relative',
          'transition': 'all .1s ease-in',
          'text-shadow': '0 0 3px rgba(0, 0, 0, 0.5)',
          'box-sizing': 'content-box'
        }).appendTo(this.$buttons).mouseenter(function() {
          if (!jQuery(this).hasClass('disabled')) {
            return jQuery(this).css({
              'background-color': '#00ab00',
              'text-decoration': 'none'
            });
          }
        }).mouseleave(function() {
          return jQuery(this).css({
            'background-color': '#009800'
          });
        }).click((function(_this) {
          return function() {
            if (!_this.$submit.hasClass('disabled')) {
              return _this.do_collect();
            }
          };
        })(this));
        return this.$close = jQuery('<a></a>').addClass('mwuc-close').html('关闭').css({
          'float': 'left',
          'color': 'rgba(255, 255, 255, 0.8)',
          'text-align': 'center',
          'height': 32,
          'line-height': '32px',
          'background-color': '#333',
          'display': 'block',
          'width': 70 - 2,
          'font-size': '14px',
          'font-weight': 'bold',
          'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.15)',
          'cursor': 'pointer',
          'margin': '0',
          'border': 'solid 1px rgba(0, 0, 0, 0.1)',
          'border-radius': 3,
          'position': 'relative',
          'transition': 'all .1s ease-in',
          'text-shadow': '0 0 3px rgba(0, 0, 0, 0.5)',
          'box-sizing': 'content-box'
        }).appendTo(this.$buttons).mouseenter(function() {
          return jQuery(this).css({
            'background-color': '#222',
            'color': 'white',
            'text-decoration': 'none'
          });
        }).mouseleave(function() {
          return jQuery(this).css({
            'background-color': '#333',
            'color': 'rgba(255, 255, 255, 0.8)'
          });
        }).click(function() {
          return Collector.close();
        });
      };

      Collector.prototype.do_collect = function() {
        var desc, tags, title, url;
        url = document.URL;
        title = this.$title_input.val();
        desc = this.$desc_input.val();
        tags = this.$tags_input.val();
        console.log(url, title, desc, tags);
        this.$submit.addClass('disabled').css('opacity', 0.4);
        this.$inputs.slideUp(this.ANIMATE_DURATION);
        return this.$loading.slideDown(this.ANIMATE_DURATION, (function(_this) {
          return function() {
            return jQuery.ajax({
              url: 'http://collect.4ye.me/collect_url',
              type: 'POST',
              data: {
                secret: USER_SECRET,
                url: url,
                title: title,
                desc: desc,
                tags: tags
              },
              success: function(res) {
                _this.$loading.slideUp(_this.ANIMATE_DURATION);
                return _this.$success.slideDown(_this.ANIMATE_DURATION);
              },
              error: function(xhr) {
                _this.$loading.slideUp(_this.ANIMATE_DURATION);
                return _this.$failure.slideDown(_this.ANIMATE_DURATION);
              }
            });
          };
        })(this));
      };

      Collector.close = function() {
        jQuery('.mindpin-web-url-collector').fadeOut(100, function() {
          return jQuery('.mindpin-web-url-collector').remove();
        });
        return console.clear();
      };

      return Collector;

    })();
    if (jQuery('.mindpin-web-url-collector').length > 0) {
      return Collector.close();
    } else {
      return new Collector().render();
    }
  });

}).call(this);
