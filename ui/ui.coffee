DATA_MEMBERS_URL = 'data/members.json'
DATA_SERVERS_URL = 'data/servers.json'

build = (klass)->
  jQuery("<div></div>").addClass klass

icon = (klass)->
  jQuery("<i></i>").addClass "fa fa-#{klass}"

load_data = (url, klass)->
  jQuery.ajax
    url : url
    type : 'GET'
    dataType : 'json'
    success : (res)->
      for obj in res
        o = new klass obj
        o.render()

class Member
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
  constructor: (obj)->
    @id = obj.id
    @name = obj.name
    @nickname = obj.nickname
    @location = obj.location
    @ip = obj.ip

    @$servers = jQuery('.page-servers .servers')

  render: ->
    @$elm = build 'server'
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

jQuery ->
  load_data DATA_MEMBERS_URL, Member
  load_data DATA_SERVERS_URL, Server