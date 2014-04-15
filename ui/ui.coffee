DATA_MEMBERS_URL = 'data/members.json'

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

jQuery ->
  Member.load_data()