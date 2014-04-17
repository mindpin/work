build = (klass)->
  jQuery("<div></div>").addClass klass

icon = (klass)->
  jQuery("<i></i>").addClass "fa fa-#{klass}"

link = (url)->
  jQuery("<a href='#{url}' target='_blank'>#{url}</a>")

class Data
  # 查找某个类的所有对象，并按回调方法处理
  @all = (klass, func)->
    jQuery.ajax
      url : klass.DATA_URL
      type : 'GET'
      dataType : 'json'
      success : (res)->
        for obj in res
          o = new klass obj
          func(o)

  @one_by_id = (klass, id, func)->
    jQuery.ajax
      url : klass.DATA_URL
      type : 'GET'
      dataType : 'json'
      success : (res)->
        for obj in res
          if obj.id == id
            o = new klass obj
            func o
            break

  @all_by_key_value = (klass, key, value, func)->
    jQuery.ajax
      url : klass.DATA_URL
      type : 'GET'
      dataType : 'json'
      success : (res)->
        for obj in res
          if obj[key] == value
            o = new klass obj
            func o

class Member
  @DATA_URL = 'data/members.json'

  constructor: (obj)->
    @name = obj.name
    @realname = obj.realname
    @email = obj.email
    @avatar = obj.avatar
    @weibo = obj.weibo
    @zhihu = obj.zhihu

    @$members = jQuery('.page-members .members')

  render: ->
    @$elm = build 'member'
      .appendTo @$members
      .hide()
      .fadeIn()

    @$avatar = build 'pie avatar s100 bordered'
      .appendTo @$elm

    @$avatar_img = jQuery("<img />")
      .attr 'src', @avatar
      .appendTo @$avatar

    @$name = build 'name bold'
      .html @name
      .appendTo @$elm

    @$email = build 'email'
      .html @email
      .prepend icon 'envelope-o'
      .appendTo @$elm

    if @weibo
      @$weibo = build 'weibo'
        .append icon 'weibo'
        .append "<a href='#{@weibo}' target='_blank'>#{@weibo}</a>"
        .appendTo @$elm

    if @zhihu
      @$zhihu = build 'zhihu'
        .append icon 'zhihu'
        .append "<a href='#{@zhihu}' target='_blank'>#{@zhihu}</a>"
        .appendTo @$elm

class Server
  @DATA_URL = 'data/servers.json'

  constructor: (obj)->
    @id = obj.id
    @name = obj.name
    @nickname = obj.nickname
    @location = obj.location
    @ip = obj.ip
    @os = obj.os

    @manage_site = obj.manage_site

    @$servers = jQuery('.page-servers .servers')

  url: ->
    "servers.html?id=#{@id}"

  render: ->
    @$elm = jQuery "<a href='#{@url()}' class='server' target='_blank'></a>"
      .appendTo @$servers
      .hide()
      .fadeIn()

    @$name = build 'name'
      .html @name
      .appendTo @$elm

    @$nickname = build 'nickname'
      .html @nickname
      .appendTo @$elm

    @$location = build 'location'
      .html @location
      .appendTo @$elm

    @$ip = build 'ip'
      .html @ip
      .appendTo @$elm

  render_detail: ->
    @$detail = jQuery('.page-server-detail')

    @$detail.find '.name'
      .html @name

    @$detail.find '.nickname'
      .html @nickname

    @$detail.find '.ip'
      .html @ip

    @$detail.find '.location'
      .html @location

    @$detail.find '.os'
      .html @os

    if @manage_site
      @$manage_site = jQuery "<a href='#{@manage_site}' class='manage-site' target='_blank'></a>"
        .append icon 'arrow-right'
        .append "前往管理"
        .appendTo @$detail

class Service
  @DATA_URL = 'data/services.json'

  constructor: (obj)->
    @id = obj.id
    @server_id = obj.server_id
    @name = obj.name
    @url = obj.url
    @github = obj.github
    @memo = obj.memo

  render_for_server: ->
    $services = jQuery('.page-server-services')

    $service = build 'service'
      .appendTo $services

    $name = build 'name'
      .html @name
      .appendTo $service

    if @url
      $url = build 'url'
      .append icon 'arrow-circle-right'
      .append link @url
      .appendTo $service

    $github = build 'github'
      .append icon 'github'
      .append link @github
      .appendTo $service

    if @memo
      $memo = build 'memo'
        .html @memo
        .appendTo $service

jQuery ->

  if jQuery(document.body).hasClass 'servers'
    match = location.search.match /id=([A-Za-z0-9-]+)/
    server_id = match[1]

    Data.one_by_id Server, server_id, (server)->
      server.render_detail()

    Data.all_by_key_value Service, "server_id", server_id, (service)->
      service.render_for_server()

  else
    Data.all Member, (member)->
      member.render()

    Data.all Server, (server)->
      server.render()
