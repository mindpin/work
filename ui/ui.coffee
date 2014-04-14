DATA_MEMBERS_URL = '../data/members.json'
DATA_PAGES_URL = '../data/pages.json'

build = (klass)->
  jQuery("<div></div>").addClass klass

icon = (klass)->
  jQuery("<i></i>").addClass "fa fa-#{klass}"

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


  @load_data: ->
    jQuery.ajax
      url : DATA_MEMBERS_URL
      type : 'GET'
      dataType : 'json'
      success : (res)=>
        for obj in res
          member = new Member obj
          member.render()

class Page
  constructor: (obj)->
    @title = obj.title
    @desc = obj.desc
    @url = obj.url
    @github = obj.github

    @$pages = jQuery('.page-pages .pages')

  render: ->
    @$elm = build 'page'
      .appendTo @$pages
      .hide()
      .fadeIn()

    @$title = build 'title'
      .html @title
      .appendTo @$elm

    @$desc = build 'desc'
      .html @desc
      .appendTo @$elm

    @$url = build 'url'
      .append icon 'arrow-circle-right'
      .append "<a href='#{@url}' target='_blank'>#{@url}</a>"
      .appendTo @$elm

  @load_data: ->
    jQuery.ajax
      url : DATA_PAGES_URL
      type : 'GET'
      dataType : 'json'
      success : (res)=>
        for obj in res
          page = new Page obj
          page.render()

jQuery ->
  Page.load_data()
  Member.load_data()