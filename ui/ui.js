// Generated by CoffeeScript 1.7.1
(function() {
  var Data, Member, Server, Service, build, icon, link;

  build = function(klass) {
    return jQuery("<div></div>").addClass(klass);
  };

  icon = function(klass) {
    return jQuery("<i></i>").addClass("fa fa-" + klass);
  };

  link = function(url) {
    return jQuery("<a href='" + url + "' target='_blank'>" + url + "</a>");
  };

  Data = (function() {
    function Data() {}

    Data.json_cache = function(klass, func) {
      return jQuery.ajax({
        url: klass.DATA_URL,
        type: 'GET',
        dataType: 'json',
        cache: true,
        success: (function(_this) {
          return function(res) {
            return func(res);
          };
        })(this)
      });
    };

    Data.all = function(klass, func) {
      return this.json_cache(klass, function(res) {
        var o, obj, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          obj = res[_i];
          o = new klass(obj);
          _results.push(func(o));
        }
        return _results;
      });
    };

    Data.one_by_id = function(klass, id, func) {
      return this.json_cache(klass, function(res) {
        var o, obj, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          obj = res[_i];
          if (obj.id === id) {
            o = new klass(obj);
            func(o);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    Data.all_by_key_value = function(klass, key, value, func) {
      return this.json_cache(klass, function(res) {
        var o, obj, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          obj = res[_i];
          if (obj[key] === value) {
            o = new klass(obj);
            _results.push(func(o));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    Data.count_by_key_value = function(klass, key, value, func) {
      return this.json_cache(klass, function(res) {
        var count, obj, _i, _len;
        count = 0;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          obj = res[_i];
          if (obj[key] === value) {
            count += 1;
          }
        }
        return func(count);
      });
    };

    return Data;

  })();

  Member = (function() {
    Member.DATA_URL = 'data/members.json';

    function Member(obj) {
      this.name = obj.name;
      this.realname = obj.realname;
      this.email = obj.email;
      this.avatar = obj.avatar;
      this.weibo = obj.weibo;
      this.zhihu = obj.zhihu;
      this.github = obj.github;
      this.$members = jQuery('.page-members .members');
    }

    Member.prototype.render = function() {
      this.$elm = build('member').appendTo(this.$members).hide().fadeIn();
      this.$avatar = build('pie avatar s100 bordered').appendTo(this.$elm);
      this.$avatar_img = jQuery("<img />").attr('src', this.avatar).appendTo(this.$avatar);
      this.$name = build('name bold').html(this.name).appendTo(this.$elm);
      this.$email = build('email').html(this.email).prepend(icon('envelope-o')).appendTo(this.$elm);
      if (this.weibo) {
        this.$weibo = build('weibo').append(icon('weibo')).append("<a href='" + this.weibo + "' target='_blank'>" + this.weibo + "</a>").appendTo(this.$elm);
      }
      if (this.zhihu) {
        this.$zhihu = build('zhihu').append(icon('zhihu')).append("<a href='" + this.zhihu + "' target='_blank'>" + this.zhihu + "</a>").appendTo(this.$elm);
      }
      if (this.github) {
        return this.$github = build('github').append(icon('github')).append("<a href='" + this.github + "' target='_blank'>" + this.github + "</a>").appendTo(this.$elm);
      }
    };

    return Member;

  })();

  Server = (function() {
    Server.DATA_URL = 'data/servers.json';

    function Server(obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.nickname = obj.nickname;
      this.location = obj.location;
      this.ip = obj.ip;
      this.os = obj.os;
      this.manage_site = obj.manage_site;
      this.$servers = jQuery('.page-servers .servers');
    }

    Server.prototype.url = function() {
      return "servers.html?id=" + this.id;
    };

    Server.prototype.render = function() {
      this.$elm = jQuery("<a href='" + (this.url()) + "' class='server' target='_blank'></a>").appendTo(this.$servers).hide().fadeIn();
      this.$name = build('name').html(this.name).appendTo(this.$elm);
      this.$nickname = build('nickname').html(this.nickname).appendTo(this.$elm);
      this.$location = build('location').html(this.location).appendTo(this.$elm);
      this.$ip = build('ip').html(this.ip).appendTo(this.$elm);
      return Data.count_by_key_value(Service, "server_id", this.id, (function(_this) {
        return function(count) {
          return _this.$services_count = build('services-count').html("" + count + " 个服务").appendTo(_this.$elm);
        };
      })(this));
    };

    Server.prototype.render_detail = function() {
      this.$detail = jQuery('.page-server-detail');
      this.$detail.find('.name').html(this.name);
      this.$detail.find('.nickname').html(this.nickname);
      this.$detail.find('.ip').html(this.ip);
      this.$detail.find('.location').html(this.location);
      this.$detail.find('.os').html(this.os);
      if (this.manage_site) {
        return this.$manage_site = jQuery("<a href='" + this.manage_site + "' class='manage-site' target='_blank'></a>").append(icon('arrow-right')).append("前往管理").appendTo(this.$detail);
      }
    };

    return Server;

  })();

  Service = (function() {
    Service.DATA_URL = 'data/services.json';

    function Service(obj) {
      this.id = obj.id;
      this.server_id = obj.server_id;
      this.name = obj.name;
      this.desc = obj.desc;
      this.url = obj.url;
      this.github = obj.github;
    }

    Service.prototype.render_for_server = function() {
      var $desc, $github, $name, $service, $services, $url;
      $services = jQuery('.page-server-services');
      $service = build('service').appendTo($services);
      $name = build('name').html(this.name).appendTo($service);
      $desc = build('desc').html(this.desc).appendTo($service);
      if (this.url) {
        $url = build('url').append(icon('arrow-circle-right')).append(link(this.url)).appendTo($service);
      }
      if (this.github) {
        return $github = build('github').append(icon('github')).append(link(this.github)).appendTo($service);
      }
    };

    return Service;

  })();

  jQuery(function() {
    var match, server_id;
    if (jQuery(document.body).hasClass('servers')) {
      match = location.search.match(/id=([A-Za-z0-9-]+)/);
      server_id = match[1];
      Data.one_by_id(Server, server_id, function(server) {
        return server.render_detail();
      });
      return Data.all_by_key_value(Service, "server_id", server_id, function(service) {
        return service.render_for_server();
      });
    } else {
      Data.all(Member, function(member) {
        return member.render();
      });
      return Data.all(Server, function(server) {
        return server.render();
      });
    }
  });

}).call(this);

//# sourceMappingURL=ui.map
