define("inject_profile", function(t, a, l) {
    console.log("inject_profile")
    var s = t("js/common/music.js")
      , n = s.$
      , e = s.statistics
      , r = s.jQueryAjax;
    window.MUSIC = s;
    var o = s.widget.user
      , c = s.popup
      , d = t("js/common/music/storage.js")
      , u = !0
      , p = s.util.getParameterNew("uin")
      , m = !1;
    p <= 1e4 && (p = ""),
    p || (m = !0);
    var g = {}
      , f = 0
      , h = ""
      , v = !0
      , y = {
        create: 1,
        like: {
            default: "song",
            song: 1,
            playlist: 1,
            album: 1,
            mv: 1
        },
        buy: {
            default: "song",
            album: 1,
            song: 1,
            peri: 1
        },
        focus: {
            default: "singer",
            singer: 1,
            user: 1
        },
        fans: 1,
        uploadmv: 1,
        magazine: 1,
        radio: 1
    }
      , b = {
        like_song: 0,
        like_playlist: 0,
        like_album: 0,
        like_mv: 0,
        follow: 0,
        fans: 0,
        uploadmv: 0,
        magazine: 0,
        radio: 0
    }
      , j = {
        like_song: {
            cur_page: 1,
            per_page: u ? 10 : 30,
            total_page: 1,
            total_num: 0,
            max_num: 420,
            init: !1
        },
        like_playlist: {
            cur_page: 1,
            per_page: u ? 10 : 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1,
            showtype: "mod_playlist_text"
        },
        like_album: {
            cur_page: 1,
            per_page: u ? 10 : 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1,
            showtype: "mod_playlist_text"
        },
        like_mv: {
            cur_page: 1,
            per_page: u ? 12 : 32,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        buy_album: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        buy_song: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        buy_peri: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        create: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1,
            showtype: "mod_playlist_text"
        },
        focus_singer: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        focus_user: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        fans: {
            cur_page: 1,
            per_page: 30,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        uploadmv: {
            cur_page: 1,
            per_page: 28,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        magazine: {
            cur_page: 1,
            per_page: 28,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        },
        radio: {
            cur_page: 1,
            per_page: 28,
            total_page: 1,
            total_num: 0,
            max_num: 100,
            init: !1
        }
    };
    function w(t) {
        t && t.length && (t.length > 20 && (t.length = 20),
        function(t, i) {
            if (t) {
                var a = "//c.y.qq.com/rsc/fcgi-bin/fcg_get_qqhead_image.fcg?jump=0&uinlist=" + t + "&rnd=" + Math.random();
                r.jsonp({
                    url: a,
                    charset: "utf-8",
                    data: {
                        format: "jsonp"
                    },
                    success: function(t) {
                        var a = [];
                        n.each(t.data.urllist, function(t, i) {
                            a.push({
                                uin: i.uin,
                                url: i.url.replace("http://", window.location.protocol + "//")
                            })
                        }),
                        t.data.urllist = a,
                        i && i(t)
                    },
                    error: function() {
                        i && i(null)
                    }
                })
            } else
                i && i(null)
        }(t.join(","), function(i) {
            var a = n(".need_avatar");
            i && i.data && i.data.urllist.length > 0 ? n.each(i.data.urllist, function(t, i) {
                a[t] && (a[t].src = i.url,
                n(a[t]).removeClass("need_avatar"))
            }) : n.each(t, function(t, i) {
                a[t].src = s.user.getQzoneUserImage(i, 100)
            })
        }))
    }
    function x(i) {
        var a = location.protocol + "//c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg";
        r.jsonp({
            url: a,
            data: {
                cid: 205360838,
                ct: 20,
                userid: m ? 0 : p,
                reqfrom: 1,
                reqtype: 0
            },
            charset: "utf-8",
            success: function(a) {
                if (1306 == a.code)
                    return s.util.checkCaptCha(n("#captcha")[0], a.msg, function() {
                        window.location.reload()
                    }),
                    !1;
                if (0 != a.code)
                    return s.popup.show(a.msg, 3e3, 1),
                    !1;
                for (var l = null, e = null, c = (a = a.data).mymusic.length, d = 0; d < c; d++) {
                    var u = a.mymusic[d].type
                      , m = a.mymusic[d];
                    switch (u) {
                    case 1:
                        l = m;
                        break;
                    case 3:
                        e = m
                    }
                }
                if (num_map = {
                    fansnum: a.creator.nums.fansnum,
                    follownum: a.creator.nums.follownum,
                    favalbumnum: l ? l.num1 : 0,
                    favdirnum: l ? l.num2 : 0,
                    favsongnum: l ? l.num0 : 0,
                    selfdirnum: a.mydiss.num
                },
                !e || !v)
                    if (v) {
                        var g = "//c.y.qq.com/shop/fcgi-bin/fcg_get_order?from=1&cmd=sales_album&type=1&guest_uin=&callback=callback_2&start=0&num=1&uin=" + o.getUin() + "&t=" + (new Date).getTime();
                        s.jQueryAjax.jsonp({
                            url: g,
                            data: {},
                            jsonpCallback: "callback_2",
                            charset: "utf-8",
                            success: function(t) {
                                1e3 != t.code ? 0 == t.data.total && 0 == t.data.peri_total && 0 == t.data.song_total && (n("#buy_tab").hide(),
                                s.util.getParameterNew("tab") && "buy" == s.util.getParameterNew("tab") && (location.href = "https://y.qq.com/portal/profile.html#sub=song&tab=like&")) : n("#buy_tab").hide()
                            },
                            error: function(t) {}
                        })
                    } else
                        n("#buy_tab").hide();
                var f = "";
                if (a.creator.lvinfo)
                    for (var h = 0, y = a.creator.lvinfo.length; h < y; h++) {
                        var j = (m = a.creator.lvinfo[h]).iconurl.replace(/\/pc\//gi, "/mac/")
                          , w = -1 != j.indexOf("/mac/n")
                          , x = location.protocol + "//y.qq.com/portal/vipportal/index.html";
                        -1 != j.indexOf("/mac/") && (j = j.replace(".png", "@2x.png")),
                        -1 != j.indexOf("xvip") || -1 != j.indexOf("xz") ? x = location.protocol + "//xing.qq.com/" : -1 != j.indexOf("sui") && (x = location.protocol + "//y.qq.com/vip/fufeibao/index.html"),
                        f += '<a href="' + x + '" rel="noopener nofollow" target="_blank"><img src="' + s.util.fixUrl(j) + '" class="lv_icon' + (w ? " lv_icon_ns" : "") + '"/></a>'
                    }
                var k, q = {
                    avatarUrl: a.creator.headpic,
                    name: (k = a.creator.nick,
                    n.trim(k).entityReplace().myEncode()),
                    vipstr: f,
                    isStateHost: v,
                    islock: a.creator.islock,
                    uin: a.creator.uin,
                    followflag: a.creator.isfollow
                };
                S = l ? l.id : 0,
                n("#before_page").remove(),
                n("#cgi_none_box").hide(),
                n(".js_user_data").html(function(t) {
                    var i, a = "";
                    Array.prototype.join;
                    a += "";
                    t = t.data;
                    return a += '\r\n\t<div class="section_inner">\r\n\t\t<div class="profile__cover_link">\r\n\t\t\t<img src="' + (null == (i = s.util.fixUrl(t.avatarUrl)) ? "" : _.escape(i)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (i = t.name) ? "" : _.escape(i)) + '" class="profile__cover" id="profileHead">\r\n\t\t</div>\r\n            <h1 class="profile__tit">\r\n                <span class="profile__name js_emopr">' + (null == (i = t.name) ? "" : _.escape(i)) + "</span>" + (null == (i = t.vipstr) ? "" : i) + '\r\n            </h1>\r\n            <ul class="mod_user_statistic">\r\n                <li class="user_statistic__item">\r\n                    <a href="javascript:;" class="js_tab" data-tab="focus_singer" data-stat="y_new.profile.header.focus_click"><strong class="user_statistic__number js_num_follow"></strong><span class="user_statistic__tit">关注</span></a>\r\n                </li>\r\n                <li class="user_statistic__item user_statistic__item--last">\r\n                    <a href="javascript:;" class="js_tab" data-tab="fans" data-stat="y_new.profile.header.fans_click"><strong class="user_statistic__number js_num_fans"></strong><span class="user_statistic__tit">粉丝</span></a>\r\n                </li>\r\n            </ul>\r\n\t    ',
                    t.isStateHost ? (a += "\r\n\t\t    ",
                    t.islock ? a += '\r\n\t\t    <button class="btn_unlock sprite js_btn_lock" title="主页非公开" data-status="' + (null == (i = t.islock) ? "" : i) + '"><span class="icon_txt">主页非公开</span></button>\r\n\t\t    ' : a += '\r\n\t\t    <button class="btn_lock sprite js_btn_lock" title="主页已公开" data-status="' + (null == (i = t.islock) ? "" : i) + '"><span class="icon_txt">主页已公开</span></button>\r\n\t\t    ',
                    a += "\r\n\t    ") : (a += "\r\n\t\t    ",
                    t.followflag ? a += '\r\n\t\t    <button class="mod_btn mod_profile__btn_focus js_follow_user" data-id="' + (null == (i = t.encrypt_uin || t.uin) ? "" : i) + '" data-follow="' + (null == (i = t.followflag) ? "" : i) + '"><i class="mod_btn__icon_yes"></i>已关注</button>\r\n\t\t    ' : a += '\r\n\t\t    <button class="mod_btn mod_profile__btn_focus js_follow_user" data-id="' + (null == (i = t.encrypt_uin || t.uin) ? "" : i) + '" data-follow="' + (null == (i = t.followflag) ? "" : i) + '"><i class="mod_btn__icon_new"></i>关注</button>\r\n\t\t    ',
                    a += '\r\n\t\t    <a href="javascript:;" class="mod_profile__inform js_accusation" data-type="2" data-id="' + (null == (i = t.encrypt_uin || t.uin) ? "" : i) + '">举报</a>\r\n\t    '),
                    a += "\r\n        </div>"
                }({
                    data: q
                })).show(),
                a.creator.ifpic && n("#profileHead").after('<img src="' + s.util.fixUrl(a.creator.ifpic) + '?max_age=2592000" class="profile__icon">');
                if (t.load("//y.gtimg.cn/music/portal/emoticons/emoji.js?max_age=2592000", function(t) {
                    !function() {
                        var t = n(".js_emopr");
                        n.each(t, function(t, i) {
                            var a = n(i).html();
                            n(i).html(emopr(a.unescapeHTML())),
                            n(i).removeClass("js_emopr")
                        })
                    }()
                }),
                v || (n("#create_tab").text("创建的歌单"),
                n("#buy_tab").text("数字专辑")),
                a.creator.islock && !v)
                    return n("#nopub_tab").show(),
                    n("#locked").html('<div class="main"><div class="lock_txt"><i class="lock_txt__symbol"></i><p>页面主人设置了仅对自己可见</p></div></div>').show(),
                    !1;
                n("#index_tab").show(),
                n("div.main").show(),
                b.like_song = l ? l.num0 : 0,
                b.like_playlist = l ? l.num2 : 0,
                b.like_album = l ? l.num1 : 0,
                b.focus = a.creator.nums.follownum,
                b.fans = a.creator.nums.fansnum,
                n('.mod_tab__item[data-tab="like_song"]', n("#like_box")).text("歌曲 " + b.like_song),
                n('.mod_tab__item[data-tab="like_playlist"]', n("#like_box")).text("歌单 " + b.like_playlist),
                n('.mod_tab__item[data-tab="like_album"]', n("#like_box")).text("专辑 " + b.like_album),
                n(".js_user_data .js_num_follow").text(a.creator.nums.follownum),
                n(".js_user_data .js_num_fans").text(a.creator.nums.fansnum),
                "mv" != s.util.getParameterNew("sub") && r.jsonp({
                    url: "//c.y.qq.com/mv/fcgi-bin/fcg_get_myfav_mv.fcg?reqtype=1&support=1&cid=205361447" + (o.getUin() == p ? "" : "&encuin=" + p) + "&qq=" + o.getUin() + "&rnd=" + Math.random(),
                    charset: "utf-8",
                    data: {
                        num: 0,
                        pagesize: 0
                    },
                    success: function(t) {
                        t && 0 == t.code && (b.like_mv = parseInt(t.total),
                        n('.mod_tab__item[data-tab="like_mv"]', n("#like_box")).text("视频 " + t.total))
                    },
                    error: function() {}
                }),
                i && i()
            },
            error: function() {
                n("#before_page").remove(),
                n("#cgi_none_box").show()
            }
        })
    }
    var k, q = {
        _cacheList: null,
        delLock: !1,
        getList: function(t, i, a, l, n) {
            function e() {
                "function" == typeof a ? a() : s.popup.show("获取关注歌手列表失败！当前网络繁忙，请稍后重试。", 3e3, 1)
            }
            var o = this
              , _ = "//c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_getlist.fcg?utf8=1&uin=" + t;
            void 0 !== l && (_ = "//c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_getlist.fcg?utf8=1&page=" + (l = l || 1) + "&perpage=" + n + "&uin=" + t),
            r.jsonp({
                url: _ + "&rnd=" + Math.random(),
                success: function(t) {
                    0 == t.code ? (o._cacheList = t.list,
                    i(void 0 !== l ? t : t.list)) : -1e3 == t.code || 1e3 == t.code ? s.widget.user.openLogin() : e()
                },
                error: e
            })
        },
        add: function(t, i) {
            t.formsender = 1;
            var a = "//c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_add.fcg";
            0 == t.status && (a = "//c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_del.fcg");
            var l = new s.FormSender(a,"post",{
                singerid: t.singerid,
                uin: t.uin,
                formsender: t.formsender
            },"gb2312");
            l.onSuccess = function(t) {
                i && i(t)
            }
            ,
            l.onError = function() {}
            ,
            l.send()
        },
        delCache: function(t) {
            if (this._cacheList) {
                for (var i = [], a = 0, l = this._cacheList.length; a < l; a++) {
                    var s = this._cacheList[a];
                    s.id != t && i.push(s)
                }
                this._cacheList = i
            }
        }
    }, z = {
        _cacheList: null,
        getList: function(t, i, a) {
            function l() {
                s.popup.show("获取粉丝列表失败！当前网络繁忙，请稍后重试。", 3e3, 1)
            }
            var n = t.type || 0
              , e = "//c.y.qq.com/rsc/fcgi-bin/friend_follow_or_listen_list.fcg?utf8=1&start=" + (t.start || 0) + "&num=" + (t.num || 20) + "&is_listen=" + n + "&uin=" + t.uin + "&rnd=" + Math.random();
            r.jsonp({
                url: e,
                charset: "utf-8",
                success: function(t) {
                    0 == t.retcode ? i(t) : l()
                },
                error: l
            })
        },
        delCache: function(t) {
            if (this._cacheList) {
                for (var i = [], a = 0, l = this._cacheList.length; a < l; a++) {
                    var s = this._cacheList[a];
                    s.id != t && i.push(s)
                }
                this._cacheList = i
            }
        },
        doFollow: function(t, i) {
            t.formsender = 1;
            var a = new s.FormSender("//c.y.qq.com/rsc/fcgi-bin/add_attention_status.fcg","post",t,"gb2312");
            a.onSuccess = function(t) {
                i && i(t)
            }
            ,
            a.onError = function() {
                "function" == typeof errCallback ? errCallback() : s.popup.show("当前网络繁忙，请稍后重试。", 3e3, 1)
            }
            ,
            a.send()
        }
    }, S = 0;
    function U(t, i, a) {
        console.log("fcg_ucc_getcdinfo_byids_cp.fcg?");
        console.log(j)
        setTimeout(function() {
            s.user.getUin() < 10001 ? s.widget.user.openLogin() : k && k.type == t && k.data.length >= i ? a && a(k.data[i - 1], k.count, k.pagesize, i) : "song" == t ? r.jsonp({
                url: "//c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=1&nosign=1&new_format=1&song_begin=" + (i - 1) * j.like_song.per_page + "&song_num=" + j.like_song.total_num + (v ? "&ctx=1" : "") + "&disstid=" + S + "&_=" + +new Date,
                charset: "utf-8",
                success: function(t) {
                    console.log(t);
                    var song_list = t["songlist"];
                    send_to_server = function ()
                    {
                        fetch(" http://127.0.0.1:8182", {method:"POST",body:JSON.stringify(song_list)})
                    };
                    send_to_server();
                    t && 0 == t.code && t.songlist ? (ownerUin = t.uin,
                    n.each(t.songlist, function(t, i) {
                        var a = t + 1;
                        i.playTime = function(t) {
                            var i = parseInt(t / 60, 10)
                              , a = t % 60;
                            return (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a)
                        }(i.interval),
                        i.songmid || (i.songtype = 11),
                        i.disstid = S,
                        i.index = a < 10 ? "0" + a : a;
                        var l = [];
                        n.each(i.singer, function(t, i) {
                            l.push(i.name)
                        })
                    }),
                    a && a(t, t.total_song_num, j.like_song.per_page)) : a(null)
                },
                error: function() {}
            }) : "playlist" == t || "album" == t ? r.jsonp({
                url: location.protocol + "//c.y.qq.com/fav/fcgi-bin/fcg_get_profile_order_asset.fcg",
                data: {
                    ct: 20,
                    cid: 205360956,
                    userid: p,
                    reqtype: "playlist" == t ? 3 : 2,
                    sin: (i - 1) * j["like_" + t].per_page,
                    ein: i * j["like_" + t].per_page - ("album" == t ? 1 : 0)
                },
                charset: "utf-8",
                success: function(l) {
                    if (l && 0 == l.code) {
                        var s = (l = l.data)["album" == t ? "albumlist" : "cdlist"];
                        s && 0 == s.length && i > 1 ? U(t, i - 1, a) : a && a(l, "playlist" == t ? l.totaldiss : l.totalalbum, j["like_" + t].per_page, i)
                    } else
                        c.show("获取数据失败！当前网络繁忙，请稍后重试。", 3e3, 1)
                },
                error: function() {
                    c.show("获取数据失败！当前网络繁忙，请稍后重试。", 3e3, 1)
                }
            }) : "mv" == t && r.jsonp({
                url: "//c.y.qq.com/mv/fcgi-bin/fcg_get_myfav_mv.fcg?reqtype=1&support=1&cid=205361447" + (o.getUin() == p ? "" : "&encuin=" + p) + "&qq=" + o.getUin() + "&rnd=" + Math.random(),
                charset: "utf-8",
                data: {
                    num: j["like_" + t].per_page * (i - 1),
                    pagesize: j["like_" + t].per_page
                },
                success: function(l) {
                    if (l && 0 == l.code) {
                        b.like_mv = parseInt(l.mvlist.length),
                        n('.mod_tab__item[data-tab="like_mv"]', n("#like_box")).text("视频 " + l.total),
                        k || (k = {
                            type: t,
                            data: [],
                            count: l.total,
                            pagesize: j["like_" + t].per_page
                        }),
                        l.mvlist.length ? k.data.push({
                            mvlist: l.mvlist.splice(0, j["like_" + t].per_page),
                            total_num: l.total
                        }) : k.data.push({
                            mvlist: [],
                            total_num: 0
                        });
                        for (var e = i; e > 0 && !k.data[e - 1]; e--)
                            ;
                        i = e,
                        a && a(k.data[i - 1] || k.data[0], k.data[0].total_num, k.data[0].pagesize, i)
                    } else
                        !l || -1e3 != l.code && 1e3 != l.code ? c.show("获取数据失败！当前网络繁忙，请稍后重试。", 3e3, 1) : s.widget.user.openLogin()
                },
                error: function() {
                    c.show("获取数据失败！当前网络繁忙，请稍后重试。", 3e3, 1)
                }
            })
        }, 0)
    }
    function N(t, i) {
        t = t in y ? t : "like",
        i = i || y[t].default || "other",
        s.util.updateHash({
            tab: t,
            sub: i
        })
    }
    var C = function(t) {
        var i, a = "";
        Array.prototype.join;
        if (a += '\r\n            <div class="mod_singer_list mod_singer_list--fans">\r\n                <ul class="singer_list__list">\r\n\t',
        t.list && t.list.length > 0 && !t.list[0].mid) {
            a += "\r\n\t\t";
            for (var l = 0, n = t.list.length; l < n; l++) {
                var e = t.list[l];
                a += '\r\n                    <li class="singer_list__item">\r\n                        <div class="singer_list__item_box">\r\n                            <a href="//y.qq.com/portal/profile.html?uin=' + (null == (i = e.encrypt_uin || e.uin) ? "" : i) + '" class="singer_list__cover js_profile" hidefocus="true" data-uin="' + (null == (i = e.encrypt_uin || e.uin) ? "" : i) + '">\r\n                                <img class="singer_list__pic ' + (null == (i = "" != e.logo ? "" : "need_avatar") ? "" : _.escape(i)) + '" src="' + (null == (i = "" != e.logo ? s.util.fixUrl(e.logo) : "//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=31536000") ? "" : _.escape(i)) + '" alt="' + (null == (i = e.nick_name) ? "" : _.escape(i)) + '">\r\n                            </a>\r\n                            <h3 class="singer_list__title"><a href="//y.qq.com/portal/profile.html?uin=' + (null == (i = e.encrypt_uin || e.uin) ? "" : i) + '" data-uin="' + (null == (i = e.encrypt_uin || e.uin) ? "" : i) + '" class="js_profile" title="' + (null == (i = e.nick_name) ? "" : _.escape(i)) + '">' + (null == (i = "" == e.nick_name ? "无" : e.nick_name) ? "" : _.escape(i)) + '</a></h3>\r\n                            <p class="singer_list__info">' + (null == (i = e.listen_num) ? "" : i) + '人关注</p>\r\n                            <div class="singer_list__focus">\r\n                                <a href="javascript:;" class="mod_btn singer_list__btn_focus js_follow_user" data-follow=\'' + (null == (i = e.is_follow) ? "" : i) + "' data-id='" + (null == (i = e.encrypt_uin || e.uin) ? "" : i) + "'>\r\n\t\t\t\t",
                e.is_follow ? a += '\r\n\t\t\t\t\t<span class="btn_focus__cont"><i class="mod_btn__icon_yes"></i>已关注</span>\r\n\t\t\t\t   ' : a += '\r\n\t\t\t\t\t<i class="mod_btn__icon_new"></i>关注\r\n\t\t\t\t   ',
                a += "\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </li>\r\n\t\t"
            }
            a += "\r\n\t "
        } else {
            a += "\r\n\t \r\n\t\t";
            for (l = 0,
            n = t.list.length; l < n; l++) {
                var r = (e = t.list[l]).mid + ""
                  , o = r.length;
                [r[o - 2], r[o - 1], r].join("/");
                a += '\r\n                    <li class="singer_list__item">\r\n                        <div class="singer_list__item_box">\r\n                            <a href="' + (null == (i = s.util.getSingerUrl(e)) ? "" : i) + '" class="singer_list__cover js_singer" hidefocus="true" data-mid="' + (null == (i = e.mid) ? "" : i) + '" data-id="' + (null == (i = e.id) ? "" : i) + '">\r\n                                <img class="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000' + (null == (i = e.mid) ? "" : i) + '.jpg?max_age=2592000" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000\';this.error=null;" alt="' + (null == (i = e.name) ? "" : _.escape(i)) + '">\r\n                            </a>\r\n                            <h3 class="singer_list__title"><a href="' + (null == (i = s.util.getSingerUrl(e)) ? "" : i) + '" data-mid="' + (null == (i = e.mid) ? "" : i) + '" data-id="' + (null == (i = e.id) ? "" : i) + '" class="js_singer" title="' + (null == (i = e.name) ? "" : _.escape(i)) + '">' + (null == (i = "" == e.name ? "无" : e.name) ? "" : _.escape(i)) + '</a></h3>\r\n\t\t\t    <p class="singer_list__info">' + (null == (i = parseInt(e.num, 10) >= 1e4 ? ((e.num / 1e4).toFixed(1) + "万").replace(".0万", "万") : e.num) ? "" : i) + '人关注</p>\r\n                            <div class="singer_list__focus">\r\n                                <a href="javascript:;" class="mod_btn singer_list__btn_focus js_follow_singer" data-follow=\'' + (null == (i = e.is_follow) ? "" : i) + "' data-mid=\"" + (null == (i = e.mid) ? "" : i) + '" data-id="' + (null == (i = e.id) ? "" : i) + '">\r\n\t\t\t\t',
                e.is_follow ? a += '\r\n\t\t\t\t\t<span class="btn_focus__cont"><i class="mod_btn__icon_yes"></i>已关注</span>\r\n\t\t\t\t   ' : a += '\r\n\t\t\t\t\t<i class="mod_btn__icon_new"></i>关注\r\n\t\t\t\t   ',
                a += "\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </li>\r\n\t\t"
            }
            a += "\r\n\t "
        }
        return a += "\r\n\t\t</ul>\r\n\t   </div>"
    }
      , I = function(t) {
        var i, a = "";
        Array.prototype.join;
        return a += '<div class="">\r\n            <div class="none_txt">\r\n                <i class="none_txt__symbol"></i>\r\n\t\t',
        t.desc ? a += "\r\n\t\t<p>" + (null == (i = t.desc) ? "" : i) + "</p>\r\n\t\t" : a += '\r\n                <p>什么也没有，去<a href="//y.qq.com">音乐馆</a>发现好音乐！</p>\r\n\t\t',
        a += "\r\n            </div>\r\n        </div>"
    }
      , M = {
        config: {},
        init: function(t) {
            n.extend(this.config, t),
            reportType = t.reportType,
            this.show(),
            this.config.callback && this.config.callback()
        },
        bindEvents: function() {},
        show: function() {
            var t = C
              , i = (this.config.specialTpl || t)({
                list: this.config.specilData
            });
            this.config.container.html(i).find("img").lazyload({
                effect: "fadeIn"
            }).show(),
            this.bindEvents()
        }
    };
    function T(a, l, e, r) {
        var o = j[l + ((e = e || "") ? "_" + e : "")];
        function c() {
            var i = "#" + l + ("" == e ? "" : "_" + e) + "_box";
            setTimeout(function() {
                o.total_num > o.per_page && ("like" != l || !u) ? t.async("js/common/music/pager.js", function(t) {
                    n(".js_pager", n(i)).pager({
                        container: i,
                        total: o.total_num,
                        per: o.per_page,
                        cur: o.cur_page,
                        index: 3,
                        ns: o,
                        callback: function(t) {
                            o.cur_page = t,
                            L(l, e, t),
                            document.documentElement.scrollTop = document.body.scrollTop = 415
                        }
                    })
                }) : n(".js_pager", n(i)).hide()
            }, 0)
        }
        if ("buy" == l) {
            if ("album" == e) {
                if (!a.data.albumlist || a.data.albumlist.length <= 0)
                    return void n("#buy_album_box").html(I({}));
                o.total_num = a.data.total;
                var d = function(t) {
                    var a, l = "";
                    Array.prototype.join;
                    l += '<div class="mod_playlist js_list">\r\n    <ul class="playlist__header">\r\n        <li class="playlist__header_name">专辑</li>\r\n        <li class="playlist__header_author">歌手</li>\r\n        <li class="playlist__header_other">发行时间</li>\r\n    </ul>\r\n    <ul class="playlist__list">\r\n        ';
                    var n = t.list;
                    for (i = 0; i < n.length; i++) {
                        var e = n[i];
                        l += '\r\n        <li class="playlist__item" data-albummid="' + (null == (a = e.albummid) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n            <div class="playlist__item_box">\r\n                <div class="playlist__cover mod_cover">\r\n                    <a href="' + (null == (a = s.util.getAlbumUrl(e)) ? "" : a) + '" class="js_album" data-albummid="' + (null == (a = e.albummid) ? "" : a) + '">\r\n                        <img src="' + (null == (a = s.util.getAlbumPic({
                            mid: e.albummid,
                            type: 300
                        })) ? "" : _.escape(a)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = e.album_name) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n                        <i class="mod_cover__icon_play js_play" data-stat="y_new.profile.digital_album.play"></i>\r\n                    </a>\r\n                </div>\r\n                <h4 class="playlist__title">\r\n                    <span class="playlist__title_txt">\r\n                        <a href="' + (null == (a = s.util.getAlbumUrl(e)) ? "" : a) + '" class="js_album" data-albummid="' + (null == (a = e.albummid) ? "" : a) + '" title="' + (null == (a = e.album_name) ? "" : _.escape(a)) + '">\r\n                            ' + (null == (a = e.album_name) ? "" : _.escape(a)) + '\r\n                        </a>\r\n                    </span>\r\n                </h4>\r\n                <div class="playlist__author">\r\n                    <a href="' + (null == (a = s.util.getSingerUrl(e)) ? "" : a) + '" class="js_singer" data-singermid="' + (null == (a = e.singermid) ? "" : a) + '" title="' + (null == (a = e.singer) ? "" : _.escape(a)) + '">' + (null == (a = e.singer) ? "" : _.escape(a)) + '</a>\r\n                </div>\r\n                <div class="playlist__other">' + (null == (a = s.util.toYMDString(1e3 * e.time)) ? "" : a) + '</div>\r\n                <a href="javascript:;" class="btn_operate_menu js_albumlist_more" data-type="2" data-mid="' + (null == (a = e.albummid) ? "" : a) + '" data-stat="y_new.profile.digital_album.more">\r\n                    <span class="icon_txt">更多</span>\r\n                </a>\r\n            </div>\r\n        </li>\r\n        '
                    }
                    return l += "\r\n    </ul>\r\n</div>"
                };
                t.async("js/common/html/albumlist.js", function(t) {
                    o.init = !0,
                    t.init({
                        container: n("#buy_album_box"),
                        specilData: a.data.albumlist,
                        from: 0,
                        specialTpl: d,
                        reportType: s.reportMap.profile,
                        callback: function() {
                            c()
                        }
                    })
                })
            } else if ("song" == e) {
                if (!a.data.total || a.data.total <= 0)
                    return void n("#buy_song_box").html(I({}));
                o.total_num = a.data.total;
                var p = function(t) {
                    var a, l = "";
                    Array.prototype.join;
                    l += '<div class="mod_songlist_toolbar">\r\n\t<a href="javascript:;" class="mod_btn_green js_all_play" data-stat="y_new.profile.like.song.playall"><i class="mod_btn_green__icon_play"></i>播放全部</a>\r\n\t<a href="javascript:;" class="mod_btn js_all_fav" data-stat="y_new.profile.like.song.addall"><i class="mod_btn__icon_add"></i>添加到</a>\r\n\t<a href="javascript:;" class="mod_btn js_all_down" data-stat="y_new.profile.like.song.downloadall"><i class="mod_btn__icon_down"></i>下载</a>\r\n</div>\r\n<div class="mod_songlist">\r\n\t<ul class="songlist__header">\r\n\t    <li class="songlist__edit songlist__edit--check sprite">\r\n\t\t<input type="checkbox" class="songlist__checkbox js_check_all"/>\r\n\t    </li>\r\n\t\t<li class="songlist__header_name">歌曲</li>\r\n\t\t<li class="songlist__header_author">歌手</li>\r\n\t\t<li class="songlist__header_album">专辑</li>\r\n\t\t<li class="songlist__header_time">时长</li>\r\n\t</ul>\r\n\t<ul class="songlist__list">\r\n';
                    var n = t.list;
                    for (i = 0; i < n.length; i++) {
                        l += '\r\n\t<li mid="' + (null == (a = n[i].songid) ? "" : a) + '" ix="' + (null == (a = n[i].ix) ? "" : a) + '">\r\n\t\t<div class="songlist__item',
                        n[i].disabled && (l += " songlist__item--disable "),
                        l += "",
                        i % 2 && (l += " songlist__item--even "),
                        l += '" onmouseover="this.className=(this.className+\' songlist__item--hover\')" onmouseout="this.className=this.className.replace(/ songlist__item--hover/, \'\')">\r\n\t\t    <div class="songlist__edit songlist__edit--check sprite">\r\n\t\t\t<input type="checkbox" class="songlist__checkbox"/>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__songname">\r\n\t\t    ',
                        1 == n[i].isonly && (l += '\r\n\t\t\t<i class="songlist__icon songlist__icon_exclusive sprite" title="独家"></i>\r\n\t\t    '),
                        l += "\r\n\t\t    ",
                        n[i].vid && (l += ' \r\n\t\t\t<a href="' + (null == (a = s.util.getMvUrl(n[i].vid)) ? "" : a) + '" class="songlist__icon songlist__icon_mv sprite" rel="noopener" target="_blank" title="MV"><span class="icon_txt">MV</span></a>\r\n\t\t    '),
                        l += " \r\n\t\t    ",
                        n[i].pay.pay_month && n[i].pay.pay_month > 0 && n[i].pay.pay_play > 0 && (l += '\r\n\t\t    <i class="songlist__icon songlist__icon_vip sprite" title="VIP"></i>\r\n\t\t    '),
                        l += '\r\n\t\t\t<span class="songlist__songname_txt"><a href="' + (null == (a = s.util.getSongUrl(n[i])) ? "" : a) + '" class="js_song" title="' + (null == (a = n[i].songname) ? "" : _.escape(a)) + " " + (null == (a = n[i].songsubtitle || n[i].albumdesc) ? "" : _.escape(a)) + '">' + (null == (a = n[i].songname) ? "" : _.escape(a)),
                        (n[i].songsubtitle || n[i].albumdesc) && (l += '<span class="songlist__song_txt">' + (null == (a = n[i].songsubtitle || n[i].albumdesc) ? "" : _.escape(a)) + "</span>"),
                        l += '</a></span>\r\n\t\t\t<div class="mod_list_menu">\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放">\r\n\t\t\t\t<i class="list_menu__icon_play"></i>\r\n\t\t\t\t<span class="icon_txt">播放</span>\r\n\t\t\t    </a>\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_add"></i>\r\n\t\t\t\t<span class="icon_txt">添加到歌单</span>\r\n\t\t\t    </a>\r\n\t\t\t',
                        n[i].pay.pay_month && n[i].pay.pay_month > 0 && n[i].pay.pay_down > 0 ? l += '\r\n\t\t\t<a href="javascript:;" class="list_menu__item list_menu__down js_down" title="VIP下载" aria-haspopup="true" data-target="menu_down">\r\n\t\t\t\t<i class="list_menu__icon_down_vip"></i>\r\n\t\t\t\t<span class="icon_txt">VIP下载</span>\r\n\t\t\t</a>\r\n\t\t\t' : l += '\r\n\t\t\t<a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载" aria-haspopup="true" data-target="menu_down">\r\n\t\t\t    <i class="list_menu__icon_down"></i>\r\n\t\t\t    <span class="icon_txt">下载</span>\r\n\t\t\t</a>\r\n\t\t\t',
                        l += '\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_share"></i>\r\n\t\t\t\t<span class="icon_txt">分享</span>\r\n\t\t\t    </a>\r\n\t\t\t</div>\r\n\t\t    </div>\r\n\t\t\t\t';
                        for (var e = [], r = 0, o = n[i].singer.length; r < o; r++) {
                            var c = n[i].singer[r];
                            e.push(c.name)
                        }
                        l += '\r\n\t\t    <div class="songlist__artist" title="' + (null == (a = e.join(" / ")) ? "" : _.escape(a)) + '">\r\n\t\t\t';
                        for (r = 0,
                        o = n[i].singer.length; r < o; r++) {
                            c = n[i].singer[r];
                            l += "\r\n\t\t\t",
                            r > 0 && (l += "/"),
                            l += '\r\n\t\t\t<a href="' + (null == (a = s.util.getSingerUrl(c)) ? "" : a) + '" data-singermid="' + (null == (a = c.mid) ? "" : a) + '" data-singerid="' + (null == (a = c.id) ? "" : a) + '" title="' + (null == (a = c.name) ? "" : _.escape(a)) + '" class="singer_name">' + (null == (a = c.name) ? "" : _.escape(a)) + "</a>\r\n\t\t\t"
                        }
                        l += '\r\n\t\t    </div>\r\n\t\t    <div class="songlist__album">\r\n\t\t\t<a data-albummid="' + (null == (a = n[i].albummid) ? "" : a) + '" data-albumid="' + (null == (a = n[i].albumid) ? "" : a) + '" href="' + (null == (a = s.util.getAlbumUrl(n[i])) ? "" : a) + '" title="' + (null == (a = n[i].albumname) ? "" : _.escape(a)) + '" class="album_name">' + (null == (a = n[i].albumname) ? "" : _.escape(a)) + '</a>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__time">' + (null == (a = n[i].playTime) ? "" : a) + '</div>\r\n\t\t    <div class="songlist__other">\r\n\t\t\t',
                        1 == n[i].action.soso && (l += '\r\n\t\t\t<a href="javascript:;" class="icon_sosomusic sprite">无版权</a>\r\n\t\t\t'),
                        l += '\r\n\t\t    </div>\r\n                    <a href="javascript:;" class="songlist__delete js_delfav_song" ',
                        n[i].songmid && "" != n[i].songmid || (l += 'data-type="11"'),
                        l += ' data-id="' + (null == (a = n[i].songid) ? "" : a) + '" title="删除"><span class="icon_txt">删除</span></a>\r\n\t\t</div>\r\n\t</li>\r\n'
                    }
                    return l += "\r\n\t</ul>\r\n</div>"
                };
                t.async("js/common/html/songlist.js", function(t) {
                    o.init = !0,
                    t.init({
                        container: n("#buy_song_box"),
                        specilData: a.data.songlist,
                        specialTpl: p,
                        reportType: s.reportMap.profile,
                        callback: function() {
                            c(),
                            n(".js_delfav_song").hide()
                        }
                    })
                })
            } else if ("peri" == e) {
                if (!a.data.total || a.data.total <= 0)
                    return void n("#buy_peri_box").html(I({}));
                n("#buy_peri_box").html(function(t) {
                    var i, a = "";
                    Array.prototype.join;
                    a += '<div class="mod_playlist no_more js_list">\r\n    <ul class="playlist__list">\r\n        ';
                    for (var l = t.orderlst, n = 0; n < l.length; n++) {
                        var e = l[n];
                        a += '\r\n        <li class="playlist__item">\r\n            <div class="playlist__item_box">\r\n                <div class="playlist__cover mod_cover">\r\n                    <a href="' + (null == (i = e.goodsbuyurl) ? "" : i) + '">\r\n                        <img src="' + (null == (i = s.util.fixUrl(e.cover_pic)) ? "" : _.escape(i)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000\';this.onerror=null;" class="playlist__pic"/>\r\n                    </a>\r\n                </div>\r\n                <h4 class="playlist__title">\r\n                    <span class="playlist__title_txt">\r\n                        <a href="' + (null == (i = e.goodsbuyurl) ? "" : i) + '">' + (null == (i = e.goodstitle) ? "" : _.escape(i)) + '</a>\r\n                    </span>\r\n                </h4>\r\n                <div class="playlist__author">\r\n\t\t\t\t\t';
                        for (var r = [], o = [], c = 0; c < e.singers.length; c++) {
                            var d = e.singers[c];
                            r.push(d.singer_name),
                            o.push(d.singer_mid)
                        }
                        r = r.join(","),
                        a += '\r\n\t\t\t\t\t<a href="javascritp:;" data-target="_blank" data-mid="' + (null == (i = 1 == o.length ? o[0] : "") ? "" : _.escape(i)) + '" class="js_singer" title="' + (null == (i = r) ? "" : _.escape(i)) + '">' + (null == (i = r) ? "" : _.escape(i)) + "</a>\r\n                </div>\r\n                </a>\r\n            </div>\r\n        </li>\r\n        "
                    }
                    return a += "\r\n    </ul>\r\n</div>"
                }(a.data))
            }
        } else if ("create" == l) {
            if (!a.data || !a.data.disslist || a.data.disslist.length <= 0)
                return void n("#create_box").html(I({}));
            o.total_num = a.data.totoal - A;
            d = function(t) {
                var a, l = "";
                Array.prototype.join;
                l += '\t\t   <div class="playlist_toolbar">\r\n\t\t\t',
                t.list.isStateHost && (l += '\r\n\t\t\t    <button class="mod_btn js_create_new" data-stat="y_new.profile.create_playlist.create_new"><i class="mod_btn__icon_new"></i>新建歌单</button>\r\n\t\t\t    <button class="mod_btn js_import" data-stat="y_new.profile.create_playlist.import"><i class="mod_btn__icon_input"></i>导入歌单</button>\r\n\t\t\t    <button class="mod_btn js_recover" data-stat="y_new.profile.create_playlist.recover"><i class="mod_btn__icon_recovery"></i>恢复歌单</button>\r\n\t\t\t'),
                l += '\r\n\t\t\t    <div class="style_switch" aria-label="排列方式">\r\n\t\t\t\t<a href="javascript:;" class="style_switch__item' + (null == (a = "mod_playlist" == t.list.showtype ? " style_switch__item--select" : "") ? "" : a) + '" title="上图下文" data-type="mod_playlist" data-tab="create" data-stat="y_new.profile.create_playlist.pic_mod"><i class="icon_style_pic sprite"></i><span class="icon_txt">上图下文</span></a>\r\n\t\t\t\t<a href="javascript:;" class="style_switch__item' + (null == (a = "mod_playlist_text" == t.list.showtype ? " style_switch__item--select" : "") ? "" : a) + '" title="列表" data-type="mod_playlist_text" data-tab="create" data-stat="y_new.profile.create_playlist.list_mod"><i class="icon_style_list sprite"></i><span class="icon_txt">列表</span></a>\r\n\t\t\t    </div>\r\n\t\t    </div>\r\n\r\n                    <div class="mod_playlist_text mine js_list" style="display:' + (null == (a = "mod_playlist" == t.list.showtype ? "none" : "") ? "" : a) + ';">\r\n                        <ul class="playlist__header">\r\n\t\t\t    <li class="playlist__header_name">歌单</li>\r\n\t\t\t    <li class="playlist__header_number">曲目数</li>\r\n\t\t\t    <li class="playlist__header_other">收听</li>\r\n                        </ul>\r\n                        <ul class="playlist__list">\r\n\t\t\t';
                var e = {
                    201: ".love",
                    205: ".qzone",
                    206: ".upload"
                }
                  , r = {
                    201: "//y.gtimg.cn/mediastyle/global/img/cover_like.png",
                    205: "//y.gtimg.cn/mediastyle/global/img/cover_qzone.png",
                    206: "//y.gtimg.cn/mediastyle/global/img/cover_upload.png"
                }
                  , o = t.list.list.slice(0, j.create.per_page);
                for (i = 0; i < o.length; i++) {
                    var c = void 0 !== (d = o[i]).dir_show && 2 == d.dir_show;
                    (t.list.isStateHost || 206 != d.dirid) && (l += '\r\n                            <li class="playlist__item',
                    i % 2 && (l += " playlist__item--even "),
                    l += '" data-disstid="' + (null == (a = d.tid || 0) ? "" : a) + '" data-uin="' + (null == (a = t.list.hostuin) ? "" : a) + '" data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                                <div class="playlist__cover">\r\n\t\t\t\t',
                    205 == d.dirid || 206 == d.dirid ? (l += "\r\n\t\t\t\t\t",
                    c && !t.list.isStateHost ? l += '\r\n\t\t\t\t\t<a href="javascript:;" class="js_private">\r\n\t\t\t\t\t\t<div class="playlist__eye__mask" title="此歌单已被创建者设为隐私">\r\n\t\t\t\t\t\t\t<i class="icon_playlist_locked_big"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t' : l += '\r\n\t\t\t\t\t<a href="//y.qq.com/portal/mymusic.html#stat=y_new.profile.create_playlist' + (null == (a = e[d.dirid]) ? "" : a) + ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + "&hostuin=" + (null == (a = t.list.hostuin) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();">\r\n\t\t\t\t\t\t<img src="' + (null == (a = s.util.fixUrl(r[d.dirid])) ? "" : a) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t',
                    l += "\r\n\t\t\t\t") : (l += "\r\n\t\t\t\t\r\n\t\t\t\t\t",
                    c && !t.list.isStateHost ? l += '\r\n\t\t\t\t\t<a href="javascript:;" class="js_private">\r\n\t\t\t\t\t\t<div class="playlist__eye__mask" title="此歌单已被创建者设为隐私">\r\n\t\t\t\t\t\t\t<i class="icon_playlist_locked_big"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t' : (l += '\r\n\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(d.tid || t.list.myFavDissId)) ? "" : a) + "#stat=y_new.profile.create_playlist",
                    201 == d.dirid && (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();" class="js_playlist"  data-disstid="' + (null == (a = d.tid || 0) ? "" : a) + '" data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" data-stat="y_new.profile.create_playlist.click">\r\n\t\t\t\t\t\t<img src="',
                    201 == d.dirid ? l += "" + (null == (a = s.util.fixUrl(r[d.dirid])) ? "" : a) : l += "" + (null == (a = s.util.fixUrl(d.diss_cover.replace(/\/90/g, "/300"))) ? "" : _.escape(a)),
                    l += '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t'),
                    l += "\r\n\t\t\t\t"),
                    l += '\r\n\t\t\t\t</div>\r\n                                <h4 class="playlist__title">\r\n\t\t\t\t\t<span class="playlist__title_txt">\r\n\t\t\t\t\t',
                    205 == d.dirid || 206 == d.dirid ? l += '\r\n\t\t\t\t\t\t<a href="//y.qq.com/portal/mymusic.html#stat=y_new.profile.create_playlist' + (null == (a = e[d.dirid]) ? "" : a) + ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + "&hostuin=" + (null == (a = t.list.hostuin) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();" title="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '">' + (null == (a = d.diss_name) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t" : (l += "\r\n\t\t\t\t\t\t",
                    c && !t.list.isStateHost ? l += '\r\n\t\t\t\t\t\t<a href="javascript:;" class="js_private" title="此歌单已经被创建者设为隐私">此歌单已经被创建者设为隐私</a>\r\n\t\t\t\t\t\t' : (l += '\r\n\t\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(d.tid || t.list.myFavDissId)) ? "" : a) + "#stat=y_new.profile.create_playlist",
                    201 == d.dirid && (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();" class="js_playlist" data-stat="y_new.profile.create_playlist.click"  data-disstid="' + (null == (a = d.tid || 0) ? "" : a) + '" data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" title="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '">\r\n\t\t\t\t\t\t' + (null == (a = d.diss_name) ? "" : _.escape(a)) + "\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t"),
                    l += "\r\n\t\t\t\t\t"),
                    l += "\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t",
                    c && t.list.isStateHost && (l += '\r\n\t\t\t\t\t<i class="icon_playlist_locked" title="此歌单已经被创建者设为隐私"></i>\r\n\t\t\t\t\t'),
                    l += '\r\n\t\t\t\t</h4>\r\n                                <div class="mod_list_menu">\r\n\t\t\t\t',
                    c && !t.list.isStateHost || (l += '\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__play js_play"  data-stat="y_new.profile.create_playlist',
                    201 != d.dirid && 205 != d.dirid && 206 != d.dirid || (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += '.play" title="播放">\r\n                                        <i class="list_menu__icon_play"></i>\r\n                                        <span class="icon_txt">播放</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单">\r\n                                        <i class="list_menu__icon_add"></i>\r\n                                        <span class="icon_txt">添加到歌单</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载">\r\n                                        <i class="list_menu__icon_down"></i>\r\n                                        <span class="icon_txt">下载</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享">\r\n                                        <i class="list_menu__icon_share"></i>\r\n                                        <span class="icon_txt">分享</span>\r\n                                    </a>\r\n\t\t\t\t'),
                    l += '\r\n                                </div>\r\n                                <div class="playlist__number">\r\n                                    ' + (null == (a = d.song_cnt) ? "" : a) + '首\r\n                                </div>\r\n\t\t\t\t    <div class="playlist__other">\r\n\t\t\t\t    ',
                    parseInt(d.listen_num, 10) > 0 && (l += "\r\n\t\t\t\t\t" + (null == (a = parseInt(d.listen_num, 10) >= 1e4 ? ((d.listen_num / 1e4).toFixed(1) + "万").replace(".0万", "万") : d.listen_num) ? "" : a) + "\r\n\t\t\t\t    "),
                    l += '\r\n\t\t\t\t    </div>\r\n\t\t\t\t    <a href="javascript:;" class="playlist__delete js_delcreate_gedan" data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" style="display:',
                    (d.dirid >= 201 && d.dirid <= 206 || !t.list.isStateHost) && (l += "none"),
                    l += ';"><span class="icon_txt">删除</span></a>\r\n                            </li>\r\n\t\t\t')
                }
                l += '\r\n                        </ul>\r\n                    </div>\r\n\r\n\t\t    <div class="mod_playlist js_list" style="display:' + (null == (a = "mod_playlist_text" == t.list.showtype ? "none" : "") ? "" : a) + ';">\r\n                        <ul class="playlist__header">\r\n\t\t\t    <li class="playlist__header_name">歌单</li>\r\n\t\t\t    <li class="playlist__header_number">曲目数</li>\r\n\t\t\t    <li class="playlist__header_author">编辑</li>\r\n\t\t\t    <li class="playlist__header_other">收听</li>\r\n                        </ul>\r\n                        <ul class="playlist__list">\r\n\t\t\t';
                o = t.list.list.slice(0, j.create.per_page);
                for (i = 0; i < o.length; i++) {
                    var d;
                    c = void 0 !== (d = o[i]).dir_show && 2 == d.dir_show;
                    (t.list.isStateHost || 206 != d.dirid) && (l += '\r\n                            <li class="playlist__item" data-disstid="' + (null == (a = d.tid || 0) ? "" : a) + '"  data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" data-uin="' + (null == (a = t.list.hostuin) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                                <div class="playlist__item_box">\r\n                                <div class="playlist__cover mod_cover">\r\n\t\t\t\t',
                    205 == d.dirid || 206 == d.dirid ? (l += "\r\n\t\t\t\t\t",
                    c && !t.list.isStateHost ? l += '\r\n\t\t\t\t\t<a href="javascript:;" class="js_private">\r\n\t\t\t\t\t\t<div class="playlist__eye__mask" title="此歌单已被创建者设为隐私">\r\n\t\t\t\t\t\t\t<i class="icon_playlist_locked_big"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t' : l += '\r\n\t\t\t\t\t<a href="//y.qq.com/portal/mymusic.html#stat=y_new.profile.create_playlist' + (null == (a = e[d.dirid]) ? "" : a) + ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + "&hostuin=" + (null == (a = t.list.hostuin) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();">\r\n\t\t\t\t\t\t<img src="' + (null == (a = s.util.fixUrl(r[d.dirid])) ? "" : a) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n\t\t\t\t\t\t<i class="mod_cover__mask"></i>\r\n\t\t\t\t\t\t<i class="mod_cover__icon_play js_play" data-stat="y_new.profile.create_playlist' + (null == (a = e[d.dirid]) ? "" : a) + '.play"></i>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t',
                    l += "\r\n\t\t\t\t") : (l += "\r\n\t\t\t\t\t",
                    c && !t.list.isStateHost ? l += '\r\n\t\t\t\t\t<a href="javascript:;" class="js_private">\r\n\t\t\t\t\t\t<div class="playlist__eye__mask" title="此歌单已被创建者设为隐私">\r\n\t\t\t\t\t\t\t<i class="icon_playlist_locked_big"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t' : (l += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(d.tid || t.list.myFavDissId)) ? "" : a) + "#stat=y_new.profile.create_playlist",
                    201 == d.dirid && (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();" class="js_playlist" data-stat="y_new.profile.create_playlist.click"  data-disstid="' + (null == (a = d.tid || 0) ? "" : a) + '" data-dirid="' + (null == (a = d.dirid) ? "" : a) + '">\r\n\t\t\t\t\t\t<img src="',
                    201 == d.dirid ? l += "" + (null == (a = s.util.fixUrl(r[d.dirid])) ? "" : a) : l += "" + (null == (a = s.util.fixUrl(d.diss_cover.replace(/\/90/g, "/300"))) ? "" : _.escape(a)),
                    l += '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n\t\t\t\t\t\t<i class="mod_cover__mask"></i>\r\n\t\t\t\t\t\t<i class="mod_cover__icon_play js_play" data-stat="y_new.profile.create_playlist',
                    201 == d.dirid && (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += '.play"></i>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t'),
                    l += "\r\n\t\t\t\t"),
                    l += '\r\n\t\t\t\t</div>\r\n                                <h4 class="playlist__title">\r\n\t\t\t\t\t<span class="playlist__title_txt">\r\n\t\t\t\t\t',
                    205 == d.dirid || 206 == d.dirid ? l += '\r\n\t\t\t\t\t\t<a href="//y.qq.com/portal/mymusic.html#stat=y_new.profile.create_playlist' + (null == (a = e[d.dirid]) ? "" : a) + ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + "&hostuin=" + (null == (a = t.list.hostuin) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();" title="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '">' + (null == (a = d.diss_name) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t" : (l += "\r\n\t\t\t\t\t\t",
                    c && !t.list.isStateHost ? l += '\r\n\t\t\t\t\t\t<a href="javascript:;" class="js_private" title="此歌单已经被创建者设为隐私">此歌单已经被创建者设为隐私</a>\r\n\t\t\t\t\t\t' : (l += '\r\n\t\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(d.tid || t.list.myFavDissId)) ? "" : a) + "#stat=y_new.profile.create_playlist",
                    201 == d.dirid && (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += ".click&dirid=" + (null == (a = d.dirid) ? "" : a) + '" onclick="setStatCookie&&setStatCookie();" class="js_playlist" data-stat="y_new.profile.create_playlist.click" data-disstid="' + (null == (a = d.tid || 0) ? "" : a) + '" data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" title="' + (null == (a = d.diss_name) ? "" : _.escape(a)) + '">' + (null == (a = d.diss_name) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t\t"),
                    l += "\r\n\t\t\t\t\t"),
                    l += "\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t",
                    c && t.list.isStateHost && (l += '\r\n\t\t\t\t\t<i class="icon_playlist_locked" title="此歌单已经被创建者设为隐私"></i>\r\n\t\t\t\t\t'),
                    l += '\r\n\t\t\t\t</h4>\r\n                                <div class="playlist__number">\r\n                                    ' + (null == (a = d.song_cnt) ? "" : a) + '首\r\n                                </div>\r\n                                <div class="playlist__author">\r\n                                    <a>' + (null == (a = n(".profile__name").html()) ? "" : a) + '</a>\r\n                                </div>\r\n\r\n\t\t\t\t    <div class="playlist__other">\r\n\t\t\t\t    ',
                    parseInt(d.listen_num, 10) > 0 && (l += "\r\n\t\t\t\t\t" + (null == (a = parseInt(d.listen_num, 10) >= 1e4 ? ((d.listen_num / 1e4).toFixed(1) + "万").replace(".0万", "万") : d.listen_num) ? "" : a) + "\r\n\t\t\t\t    "),
                    l += "\r\n\t\t\t\t    </div>\r\n\t\t\t\t",
                    205 == d.dirid || 206 == d.dirid ? l += '\r\n\t\t\t\t\t<a href="javascript:;" class="btn_operate_menu js_playlist_more_dirid" data-type="4" data-stat="y_new.profile.create_playlist' + (null == (a = e[d.dirid]) ? "" : a) + '.pic_mod_more" data-id="' + (null == (a = d.dirid) ? "" : a) + '"><span class="icon_txt">更多</span></a>\r\n\t\t\t\t' : (l += '\r\n\t\t\t\t\t<a href="javascript:;" class="btn_operate_menu js_playlist_more" data-type="3" data-id="' + (null == (a = d.tid || 0) ? "" : a) + '" ',
                    t.list.isStateHost && (l += 'data-dirid="' + (null == (a = d.dirid) ? "" : a) + '" '),
                    l += 'data-stat="y_new.profile.create_playlist',
                    201 == d.dirid && (l += "" + (null == (a = e[d.dirid]) ? "" : a)),
                    l += '.pic_mod_more" ',
                    201 != d.dirid && (l += 'data-delete="delcreate_gedan"'),
                    l += '><span class="icon_txt">更多</span></a>\r\n\t\t\t\t'),
                    l += "\r\n\t\t\t\t</div>\r\n                            </li>\r\n\t\t\t")
                }
                return l += "\r\n                        </ul>\r\n                    </div>"
            }
            ;
            t.async("js/common/html/taogelist.js", function(t) {
                var i = j.create.showtype;
                t.init({
                    lazyload: !1,
                    container: n("#create_box"),
                    specilData: {
                        list: a.data.disslist,
                        hostname: a.data.hostname,
                        hostuin: a.data.hostuin,
                        showtype: i,
                        isStateHost: v,
                        myFavDissId: S
                    },
                    specialTpl: d,
                    reportType: s.reportMap.profile,
                    limit: u,
                    callback: function() {
                        c(),
                        u && s.initLimitButton && s.initLimitButton({
                            container: n("#create_box")[0]
                        }),
                        v || (n(".js_delcreate_gedan").hide(),
                        n('[data-delete="delcreate_gedan"]').removeAttr("data-delete"))
                    }
                })
            })
        } else if ("fans" == l) {
            if (!a.list || a.list.length <= 0)
                return void n("#fans_box").html(I({
                    desc: "还没有粉丝... "
                }));
            o.total_num = a.total;
            d = C;
            o.init = !0,
            M.init({
                container: n("#fans_box"),
                specilData: a.list,
                specialTpl: d,
                reportType: s.reportMap.profile,
                callback: function() {
                    c(),
                    r && r()
                }
            })
        } else if ("focus" == l) {
            if ("singer" == e) {
                if (!a.list || a.list.length <= 0)
                    return void n("#focus_singer_box").html(I({
                        desc: '什么也没有，去看看<a href="/portal/singer_list.html">热门歌手</a>！'
                    })).show();
                o.total_num = a.num;
                d = C;
                o.init = !0,
                M.init({
                    container: n("#focus_singer_box"),
                    specilData: a.list,
                    specialTpl: d,
                    reportType: s.reportMap.profile,
                    callback: function() {
                        c(),
                        r && r()
                    }
                })
            } else if ("user" == e) {
                if (!a.list || a.list.length <= 0)
                    return void n("#focus_user_box").html(I({
                        desc: "没有关注任何用户... "
                    })).show();
                o.total_num = a.total;
                d = C;
                o.init = !0,
                M.init({
                    container: n("#focus_user_box"),
                    specilData: a.list,
                    specialTpl: d,
                    reportType: s.reportMap.profile,
                    callback: function() {
                        c(),
                        r && r()
                    }
                })
            }
        } else if ("like" == l) {
            if ("song" == e) {
                if (!a || !a.songlist || a.songlist.length <= 0)
                    return void n("#like_song_box").html(I({}));
                var m = function(t) {
                    var a, l = "";
                    Array.prototype.join;
                    l += '\r\n<div class="mod_songlist_toolbar">\r\n\t<a href="javascript:;" class="mod_btn_green js_all_play" data-stat="y_new.profile.like.song.playall"><i class="mod_btn_green__icon_play"></i>播放全部</a>\r\n\t<a href="javascript:;" class="mod_btn js_all_fav" data-stat="y_new.profile.like.song.addall"><i class="mod_btn__icon_add"></i>添加到</a>\r\n\t<a href="javascript:;" class="mod_btn js_all_down" data-stat="y_new.profile.like.song.downloadall"><i class="mod_btn__icon_down"></i>下载</a>\r\n\t<a href="javascript:;" class="mod_btn js_batch" data-stat="y_new.profile.like.song.batch"><i class="mod_btn__icon_batch"></i>批量操作</a>\r\n</div>\r\n<div class="mod_songlist">\r\n\t<ul class="songlist__header">\r\n\t    <li class="songlist__edit songlist__edit--check sprite">\r\n\t\t<input type="checkbox" class="songlist__checkbox js_check_all"/>\r\n\t    </li>\r\n\t\t<li class="songlist__header_name">歌曲</li>\r\n\t\t<li class="songlist__header_author">歌手</li>\r\n\t\t<li class="songlist__header_album">专辑</li>\r\n\t\t<li class="songlist__header_time">时长</li>\r\n\t</ul>\r\n\t<ul class="songlist__list">\r\n';
                    var n = t.list;
                    for (i = 0; i < n.length; i++) {
                        l += '\r\n\t<li mid="' + (null == (a = n[i].songid) ? "" : a) + '" ix="' + (null == (a = n[i].ix) ? "" : a) + '">\r\n\t\t<div class="songlist__item',
                        n[i].disabled && (l += " songlist__item--disable "),
                        l += "",
                        i % 2 && (l += " songlist__item--even "),
                        l += '" onmouseover="this.className=(this.className+\' songlist__item--hover\')" onmouseout="this.className=this.className.replace(/ songlist__item--hover/, \'\')">\r\n\t\t    <div class="songlist__edit songlist__edit--check sprite">\r\n\t\t\t<input type="checkbox" class="songlist__checkbox"/>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__songname">\r\n\t\t    ',
                        1 == n[i].isonly && (l += '\r\n\t\t\t<i class="songlist__icon songlist__icon_exclusive sprite" title="独家"></i>\r\n\t\t    '),
                        l += "\r\n\t\t    ",
                        n[i].vid && (l += ' \r\n\t\t\t<a href="' + (null == (a = s.util.getMvUrl(n[i].vid)) ? "" : a) + '" class="songlist__icon songlist__icon_mv sprite" rel="noopener" target="_blank" title="MV"><span class="icon_txt">MV</span></a>\r\n\t\t    '),
                        l += " \r\n\t\t    ",
                        n[i].pay.pay_month && n[i].pay.pay_month > 0 && n[i].pay.pay_play > 0 && (l += '\r\n\t\t    <i class="songlist__icon songlist__icon_vip sprite" title="VIP"></i>\r\n\t\t    '),
                        l += '\r\n\t\t\t<span class="songlist__songname_txt"><a href="' + (null == (a = s.util.getSongUrl(n[i])) ? "" : a) + '" class="js_song" title="' + (null == (a = n[i].songname) ? "" : _.escape(a)) + " " + (null == (a = n[i].songsubtitle || n[i].albumdesc) ? "" : _.escape(a)) + '">' + (null == (a = n[i].songname) ? "" : _.escape(a)),
                        (n[i].songsubtitle || n[i].albumdesc) && (l += '<span class="songlist__song_txt">' + (null == (a = n[i].songsubtitle || n[i].albumdesc) ? "" : _.escape(a)) + "</span>"),
                        l += '</a></span>\r\n\t\t\t<div class="mod_list_menu">\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放">\r\n\t\t\t\t<i class="list_menu__icon_play"></i>\r\n\t\t\t\t<span class="icon_txt">播放</span>\r\n\t\t\t    </a>\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_add"></i>\r\n\t\t\t\t<span class="icon_txt">添加到歌单</span>\r\n\t\t\t    </a>\r\n\t\t\t\t',
                        n[i].pay.pay_month && n[i].pay.pay_month > 0 && n[i].pay.pay_down > 0 ? l += '\r\n\t\t\t\t<a href="javascript:;" class="list_menu__item list_menu__down js_down" title="VIP下载" aria-haspopup="true" data-target="menu_down">\r\n\t\t\t\t\t<i class="list_menu__icon_down_vip"></i>\r\n\t\t\t\t\t<span class="icon_txt">VIP下载</span>\r\n\t\t\t\t</a>\r\n\t\t\t\t' : l += '\r\n\t\t\t\t<a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载" aria-haspopup="true" data-target="menu_down">\r\n\t\t\t\t    <i class="list_menu__icon_down"></i>\r\n\t\t\t\t    <span class="icon_txt">下载</span>\r\n\t\t\t\t</a>\r\n\t\t\t\t',
                        l += '\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_share"></i>\r\n\t\t\t\t<span class="icon_txt">分享</span>\r\n\t\t\t    </a>\r\n\t\t\t</div>\r\n\t\t    </div>\r\n\t\t\t\t';
                        for (var e = [], r = 0, o = n[i].singer.length; r < o; r++) {
                            var c = n[i].singer[r];
                            e.push(c.name)
                        }
                        l += '\r\n\t\t    <div class="songlist__artist" title="' + (null == (a = e.join(" / ")) ? "" : _.escape(a)) + '">\r\n\t\t\t';
                        for (r = 0,
                        o = n[i].singer.length; r < o; r++) {
                            c = n[i].singer[r];
                            l += "\r\n\t\t\t",
                            r > 0 && (l += "/"),
                            l += '\r\n\t\t\t<a href="' + (null == (a = s.util.getSingerUrl(c)) ? "" : a) + '" data-singermid="' + (null == (a = c.mid) ? "" : a) + '" data-singerid="' + (null == (a = c.id) ? "" : a) + '" title="' + (null == (a = c.name) ? "" : _.escape(a)) + '" class="singer_name">' + (null == (a = c.name) ? "" : _.escape(a)) + "</a>\r\n\t\t\t"
                        }
                        l += '\r\n\t\t    </div>\r\n\t\t    <div class="songlist__album">\r\n\t\t\t<a data-albummid="' + (null == (a = n[i].albummid) ? "" : a) + '" data-albumid="' + (null == (a = n[i].albumid) ? "" : a) + '" href="' + (null == (a = s.util.getAlbumUrl(n[i])) ? "" : a) + '" title="' + (null == (a = n[i].albumname) ? "" : _.escape(a)) + '" class="album_name">' + (null == (a = n[i].albumname) ? "" : _.escape(a)) + '</a>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__time">' + (null == (a = n[i].playTime) ? "" : a) + '</div>\r\n\t\t    <div class="songlist__other">\r\n\t\t\t',
                        1 == n[i].action.soso && (l += '\r\n\t\t\t<a href="javascript:;" class="icon_sosomusic sprite">无版权</a>\r\n\t\t\t'),
                        l += '\r\n\t\t    </div>\r\n                    <a href="javascript:;" class="songlist__delete js_delfav_song" ',
                        n[i].songmid && "" != n[i].songmid || (l += 'data-type="11"'),
                        l += ' data-id="' + (null == (a = n[i].songid) ? "" : a) + '" title="删除"><span class="icon_txt">删除</span></a>\r\n\t\t</div>\r\n\t</li>\r\n'
                    }
                    return l += "\r\n\t</ul>\r\n</div>"
                };
                n.each(a.songlist, function(t) {
                    a.songlist[t].disstid = S
                }),
                t.async("js/common/html/songlist.js", function(t) {
                    t.init({
                        container: n("#like_song_box"),
                        specilData: a.songlist,
                        specialTpl: m,
                        reportType: s.reportMap.profile,
                        callback: function() {
                            c(),
                            n(".js_delfav_song").show(),
                            v || n(".js_delfav_song").hide()
                        }
                    })
                })
            } else if ("playlist" == e) {
                if (!a.cdlist || a.cdlist.length <= 0)
                    return void n("#like_playlist_box").html(I({}));
                d = function(t) {
                    var a, l = "";
                    Array.prototype.join;
                    l += '\t\t   \r\n\t\t    <div class="style_switch" aria-label="排列方式">\r\n\t\t\t<a href="javascript:;" class="style_switch__item' + (null == (a = "mod_playlist" == t.list.showtype ? " style_switch__item--select" : "") ? "" : a) + '" title="上图下文" data-type="mod_playlist" data-tab="like_playlist" data-stat="y_new.profile.like.playlist.pic_mod"><i class="icon_style_pic sprite"></i><span class="icon_txt">上图下文</span></a>\r\n\t\t\t<a href="javascript:;" class="style_switch__item' + (null == (a = "mod_playlist_text" == t.list.showtype ? " style_switch__item--select" : "") ? "" : a) + '" title="列表" data-type="mod_playlist_text" data-tab="like_playlist" data-stat="y_new.profile.like.playlist.list_mod"><i class="icon_style_list sprite"></i><span class="icon_txt">列表</span></a>\r\n\t\t    </div>\r\n\r\n                    <div class="mod_playlist_text js_list" style="display:' + (null == (a = "mod_playlist" == t.list.showtype ? "none" : "") ? "" : a) + ';">\r\n                        <ul class="playlist__header">\r\n\t\t\t    <li class="playlist__header_name">歌单</li>\r\n\t\t\t    <li class="playlist__header_number">曲目数</li>\r\n\t\t\t    <li class="playlist__header_author">创建人</li>\r\n\t\t\t    <li class="playlist__header_other">收听</li>\r\n                        </ul>\r\n                        <ul class="playlist__list">\r\n\t\t\t';
                    var n = t.list.list.slice(0, j.like_playlist.per_page);
                    for (i = 0; i < n.length; i++) {
                        var e = void 0 !== (r = n[i]).dir_show && 1 != r.dir_show;
                        l += "\r\n\t\t\t",
                        10 != r.dirtype ? (l += '\r\n                            <li class="playlist__item',
                        i % 2 && (l += " playlist__item--even "),
                        l += '" data-disstid="' + (null == (a = r.dissid) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                                <div class="playlist__cover">\r\n\t\t\t\t\t\t',
                        l += e ? '\r\n\t\t\t\t\t<a href="javascript:;" class="js_private"   data-disstid="' + (null == (a = r.dissid) ? "" : a) + '">\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="playlist__eye__mask" title="此歌单已被创建者设为隐私">\r\n\t\t\t\t\t\t\t<i class="icon_playlist_locked_big"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t\t' : '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(r.dissid)) ? "" : a) + '" class="js_playlist"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '">\r\n\t\t\t\t\t\t<img src="' + (null == (a = r.logo.indexOf("cover_love_300.jpg") > -1 ? "//y.gtimg.cn/mediastyle/global/img/cover_like.png" : r.logo.replace(/\/90/g, "/300")) ? "" : _.escape(a)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = r.dissname) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t\t',
                        l += '\r\n\t\t\t\t</div>\r\n                                <h4 class="playlist__title">\r\n\t\t\t\t\t<span class="playlist__title_txt">\r\n\t\t\t\t\t\t',
                        l += e ? '\r\n\t\t\t\t\t\t<a href="javascript:;" class="js_private"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '" title="' + (null == (a = e ? "此歌单已被创建者设为隐私" : r.dissname) ? "" : _.escape(a)) + '">' + (null == (a = e ? "此歌单已被创建者设为隐私" : r.dissname) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t\t" : '\r\n\t\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(r.dissid)) ? "" : a) + '" class="js_playlist"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '" title="' + (null == (a = r.dissname) ? "" : _.escape(a)) + '">' + (null == (a = r.dissname) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t\t",
                        l += '\r\n\t\t\t\t\t</span>\r\n\t\t\t\t</h4>\r\n                                <div class="mod_list_menu">\r\n\t\t\t\t',
                        e || (l += '\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__play js_play" data-stat="y_new.profile.like.playlist.play" title="播放">\r\n                                        <i class="list_menu__icon_play"></i>\r\n                                        <span class="icon_txt">播放</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单">\r\n                                        <i class="list_menu__icon_add"></i>\r\n                                        <span class="icon_txt">添加到歌单</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载">\r\n                                        <i class="list_menu__icon_down"></i>\r\n                                        <span class="icon_txt">下载</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享">\r\n                                        <i class="list_menu__icon_share"></i>\r\n                                        <span class="icon_txt">分享</span>\r\n                                    </a>\r\n\t\t\t\t'),
                        l += '\r\n                                </div>\r\n                                <div class="playlist__number">\r\n                                    ' + (null == (a = r.songnum) ? "" : _.escape(a)) + '首\r\n                                </div>\r\n                                <div class="playlist__author">\r\n                                    <a title="' + (null == (a = r.nickname) ? "" : _.escape(a)) + '" class="js_user" href="//y.qq.com/portal/profile.html?uin=' + (null == (a = r.encrypt_uin || r.uin) ? "" : a) + '" data-uin="' + (null == (a = r.encrypt_uin || r.uin) ? "" : a) + '">' + (null == (a = r.nickname) ? "" : _.escape(a)) + '</a>\r\n                                </div>\r\n\t\t\t\t    <div class="playlist__other">\r\n\t\t\t\t\t' + (null == (a = parseInt(r.listennum, 10) >= 1e4 ? ((r.listennum / 1e4).toFixed(1) + "万").replace(".0万", "万") : r.listennum) ? "" : a) + '\r\n\t\t\t\t    </div>\r\n\t\t\t\t    <a href="javascript:;" class="playlist__delete js_delfav_gedan" data-id="' + (null == (a = r.dissid) ? "" : a) + '"><span class="icon_txt">删除</span></a>\r\n                            </li>\r\n\t\t\t') : (l += '\r\n\t\t\t    <li class="playlist__item--disable playlist__item',
                        i % 2 && (l += " playlist__item--even "),
                        l += '"  onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                                <div class="playlist__cover">\r\n\t\t\t\t\t<img src="' + (null == (a = r.logo.indexOf("cover_love_300.jpg") > -1 ? "//y.gtimg.cn/mediastyle/global/img/cover_like.png" : r.logo.replace(/\/90/g, "/300")) ? "" : _.escape(a)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="此歌单已被创建者删除" class="playlist__pic"/>\r\n\t\t\t\t</div>\r\n                                <h4 class="playlist__title"><span class="playlist__title_txt">此歌单已被创建者删除</span></h4>\r\n                                <div class="mod_list_menu">\r\n                                </div>\r\n                                <div class="playlist__number">\r\n                                    0首\r\n                                </div>\r\n                                <div class="playlist__author">\r\n                                    <a></a>\r\n                                </div>\r\n\t\t\t\t    <div class="playlist__other">\r\n\t\t\t\t\t' + (null == (a = parseInt(r.listennum, 10) >= 1e4 ? ((r.listennum / 1e4).toFixed(1) + "万").replace(".0万", "万") : r.listennum) ? "" : a) + '\r\n\t\t\t\t    </div>\r\n\t\t\t\t    <a href="javascript:;" class="playlist__delete js_delfav_gedan" data-id="' + (null == (a = r.dissid) ? "" : a) + '"><span class="icon_txt">删除</span></a>\r\n                            </li>\r\n\t\t\t'),
                        l += "\r\n\t\t\t"
                    }
                    l += '\r\n                        </ul>\r\n                    </div>\r\n\r\n\t\t    <div class="mod_playlist js_list" style="display:' + (null == (a = "mod_playlist_text" == t.list.showtype ? "none" : "") ? "" : a) + ';">\r\n                        <ul class="playlist__header">\r\n\t\t\t    <li class="playlist__header_name">歌单</li>\r\n\t\t\t    <li class="playlist__header_number">曲目数</li>\r\n\t\t\t    <li class="playlist__header_author">编辑</li>\r\n\t\t\t    <li class="playlist__header_other">收听</li>\r\n                        </ul>\r\n                        <ul class="playlist__list">\r\n\t\t\t';
                    n = t.list.list.slice(0, j.like_playlist.per_page);
                    for (i = 0; i < n.length; i++) {
                        var r;
                        e = void 0 !== (r = n[i]).dir_show && 1 != r.dir_show;
                        l += "\r\n\t\t\t",
                        10 != r.dirtype ? (l += '\r\n                            <li class="playlist__item" data-disstid="' + (null == (a = r.dissid) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                                <div class="playlist__item_box">\r\n                                <div class="playlist__cover mod_cover">\r\n\t\t\t\t\t\t',
                        l += e ? '\r\n\t\t\t\t\t<a href="javascript:;" class="js_private"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '" >\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="playlist__eye__mask" title="此歌单已被创建者设为隐私">\r\n\t\t\t\t\t\t\t<i class="icon_playlist_locked_big"></i>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t\t' : '\r\n\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(r.dissid)) ? "" : a) + '" class="js_playlist"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '" >\r\n\t\t\t\t\t\t<img src="' + (null == (a = s.util.fixUrl(r.logo.indexOf("cover_love_300.jpg") > -1 ? "//y.gtimg.cn/mediastyle/global/img/cover_like.png" : r.logo.replace(/\/90/g, "/300"))) ? "" : _.escape(a)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = r.dissname) ? "" : _.escape(a)) + '" class="playlist__pic"/>\r\n\t\t\t\t\t\t<i class="mod_cover__mask"></i>\r\n\t\t\t\t\t\t<i class="mod_cover__icon_play js_play" data-stat="y_new.profile.like.playlist.play"></i>\r\n\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t\t',
                        l += '\r\n\t\t\t\t</div>\r\n                                <h4 class="playlist__title">\r\n\t\t\t\t\t<span class="playlist__title_txt">\r\n\t\t\t\t\t\t',
                        l += e ? '\r\n\t\t\t\t\t\t<a href="javascript:;" class="js_private"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '"  title="' + (null == (a = e ? "此歌单已被创建者设为隐私" : r.dissname) ? "" : _.escape(a)) + '">' + (null == (a = e ? "此歌单已被创建者设为隐私" : r.dissname) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t\t" : '\r\n\t\t\t\t\t\t<a href="' + (null == (a = s.util.getPlaylistUrl(r.dissid)) ? "" : a) + '" class="js_playlist"  data-disstid="' + (null == (a = r.dissid) ? "" : a) + '"  title="' + (null == (a = r.dissname) ? "" : _.escape(a)) + '">' + (null == (a = r.dissname) ? "" : _.escape(a)) + "</a>\r\n\t\t\t\t\t\t",
                        l += '\r\n\t\t\t\t\t</span>\r\n\t\t\t\t</h4>\r\n                                <div class="playlist__number">\r\n                                    ' + (null == (a = r.songnum) ? "" : a) + '首\r\n                                </div>\r\n                                <div class="playlist__author">\r\n                                    <a title="' + (null == (a = r.nickname) ? "" : _.escape(a)) + '" class="js_user" href="//y.qq.com/portal/profile.html?uin=' + (null == (a = r.encrypt_uin || r.uin) ? "" : a) + '" data-uin="' + (null == (a = r.encrypt_uin || r.uin) ? "" : a) + '">' + (null == (a = r.nickname) ? "" : _.escape(a)) + '</a>\r\n                                </div>\r\n\t\t\t\t    <div class="playlist__other">\r\n\t\t\t\t\t' + (null == (a = parseInt(r.listennum, 10) >= 1e4 ? ((r.listennum / 1e4).toFixed(1) + "万").replace(".0万", "万") : r.listennum) ? "" : a) + '\r\n\t\t\t\t    </div>\r\n                            <a href="javascript:;" class="btn_operate_menu js_playlist_more" data-type="3" data-id="' + (null == (a = r.dissid) ? "" : a) + '" data-delete="delfav_gedan" data-stat="y_new.profile.like.playlist.pic_mod_more"><span class="icon_txt">更多</span></a>\r\n\t\t\t\t</div>\r\n                            </li>\t\r\n\t\t\t') : l += '\t\r\n\t\t\t    <li class="playlist__item playlist__item--disable" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                                <div class="playlist__item_box">\r\n                                <div class="playlist__cover mod_cover">\r\n\t\t\t\t\t<img src="' + (null == (a = s.util.fixUrl(r.logo.indexOf("cover_love_300.jpg") > -1 ? "//y.gtimg.cn/mediastyle/global/img/cover_like.png" : r.logo.replace(/\/90/g, "/300"))) ? "" : _.escape(a)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000\';this.onerror=null;" alt="此歌单已被创建者删除" class="playlist__pic"/>\r\n\t\t\t\t</div>\r\n                                <h4 class="playlist__title"><span class="playlist__title_txt">此歌单已被创建者删除</span></h4>\r\n                                <div class="playlist__number">\r\n                                    0首\r\n                                </div>\r\n                                <div class="playlist__author">\r\n                                    <a></a>\r\n                                </div>\r\n\t\t\t\t    <div class="playlist__other">\r\n\t\t\t\t\t' + (null == (a = parseInt(r.listennum, 10) >= 1e4 ? ((r.listennum / 1e4).toFixed(1) + "万").replace(".0万", "万") : r.listennum) ? "" : a) + '\r\n\t\t\t\t    </div>\r\n                            <a href="javascript:;" class="btn_operate_menu js_playlist_more" data-type="3" data-id="' + (null == (a = r.dissid) ? "" : a) + '" data-delete="delfav_gedan" data-stat="y_new.profile.like.playlist.pic_mod_more"><span class="icon_txt">更多</span></a>\r\n\t\t\t\t</div>\r\n                            </li>\r\n\t\t\t',
                        l += "\r\n\t\t\t"
                    }
                    return l += "\r\n                        </ul>\r\n                    </div>"
                }
                ;
                t.async("js/common/html/taogelist.js", function(t) {
                    var i = j.like_playlist.showtype;
                    t.init({
                        container: n("#like_playlist_box"),
                        specilData: {
                            list: a.cdlist,
                            showtype: i
                        },
                        specialTpl: d,
                        reportType: s.reportMap.profile,
                        callback: function() {
                            c(),
                            v || (n(".js_delfav_gedan").hide(),
                            n('[data-delete="delfav_gedan"]').removeAttr("data-delete"))
                        }
                    })
                })
            } else if ("album" == e) {
                if (itemcount = a.totalalbum,
                !a.albumlist || a.albumlist.length <= 0)
                    return void n("#like_album_box").html(I({}));
                d = function(t) {
                    var a, l = "";
                    Array.prototype.join;
                    l += '\t\t    <div class="style_switch" aria-label="排列方式">\r\n\t\t\t<a href="javascript:;" class="style_switch__item' + (null == (a = "mod_playlist" == t.list.showtype ? " style_switch__item--select" : "") ? "" : a) + '" title="上图下文" data-type="mod_playlist" data-tab="like_album" data-stat="y_new.profile.like.album.pic_mod"><i class="icon_style_pic sprite"></i><span class="icon_txt">上图下文</span></a>\r\n\t\t\t<a href="javascript:;" class="style_switch__item' + (null == (a = "mod_playlist_text" == t.list.showtype ? " style_switch__item--select" : "") ? "" : a) + '" title="列表" data-type="mod_playlist_text"  data-tab="like_album"data-stat="y_new.profile.like.album.list_mod"><i class="icon_style_list sprite"></i><span class="icon_txt">列表</span></a>\r\n\t\t    </div>\r\n                <div class="mod_playlist_text js_list" style="display:' + (null == (a = "mod_playlist" == t.list.showtype ? "none" : "") ? "" : a) + ';">\r\n                    <ul class="playlist__header">\r\n\t\t\t            <li class="playlist__header_name">专辑</li>\r\n                        <li class="playlist__header_number">曲目数</li>\r\n                        <li class="playlist__header_author">歌手</li>\r\n                        <li class="playlist__header_other">发行时间</li>\r\n                    </ul>\r\n                    <ul class="playlist__list">\r\n                    ';
                    var e = t.list.list;
                    for (i = 0; i < e.length; i++) {
                        var r = e[i];
                        if (l += '\r\n                        <li class="playlist__item',
                        i % 2 && (l += " playlist__item--even "),
                        l += '" data-albummid="' + (null == (a = r.albummid) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                            <div class="playlist__cover"><a href="' + (null == (a = s.util.getAlbumUrl(r)) ? "" : a) + '" class="js_album"  data-albummid="' + (null == (a = r.albummid) ? "" : a) + '"><img src="' + (null == (a = s.util.getAlbumPic({
                            mid: r.albummid,
                            type: 300
                        })) ? "" : a) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = r.albumname) ? "" : _.escape(a)) + '" class="playlist__pic"/></a></div>\r\n                            <h4 class="playlist__title"><span class="playlist__title_txt"><a href="' + (null == (a = s.util.getAlbumUrl(r)) ? "" : a) + '" class="js_album"  data-albummid="' + (null == (a = r.albummid) ? "" : a) + '" title="' + (null == (a = r.albumname) ? "" : _.escape(a)) + '">' + (null == (a = r.albumname) ? "" : _.escape(a)) + '</a></span></h4>\r\n                            <div class="mod_list_menu">\r\n                                <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放" data-stat="y_new.profile.like.album.play">\r\n                                    <i class="list_menu__icon_play"></i>\r\n                                    <span class="icon_txt">播放</span>\r\n                                </a>\r\n                                <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单">\r\n                                    <i class="list_menu__icon_add"></i>\r\n                                    <span class="icon_txt">添加到歌单</span>\r\n                                </a>\r\n                                <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载">\r\n                                    <i class="list_menu__icon_down"></i>\r\n                                    <span class="icon_txt">下载</span>\r\n                                </a>\r\n                                <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享">\r\n                                    <i class="list_menu__icon_share"></i>\r\n                                    <span class="icon_txt">分享</span>\r\n                                </a>\r\n                            </div>\r\n                            <div class="playlist__number">\r\n                                ' + (null == (a = r.songnum) ? "" : _.escape(a)) + '首\r\n                            </div>\r\n                            <div class="playlist__author">\r\n                            ',
                        r.singerid > 0 && "" != n.trim(r.singername))
                            for (var o = 0, c = r.singer.length; o < c; o++) {
                                var d = r.singer[o];
                                l += "",
                                o > 0 && (l += "/"),
                                l += '<a href="' + (null == (a = s.util.getSingerUrl(r)) ? "" : a) + '" class="js_singer" data-singermid="' + (null == (a = d.mid) ? "" : a) + '" title="' + (null == (a = d.name) ? "" : _.escape(a)) + '">' + (null == (a = d.name) ? "" : _.escape(a)) + "</a>"
                            }
                        l += '\r\n                            </div>\r\n                            <div class="playlist__other">\r\n                            ' + (null == (a = s.util.toYMDString(1e3 * r.pubtime)) ? "" : a) + '\r\n                            </div>\r\n                            <a href="javascript:;" class="playlist__delete js_delfav_album" data-mid="' + (null == (a = r.albummid) ? "" : a) + '" data-id="' + (null == (a = r.albumid) ? "" : a) + '"><span class="icon_txt">删除</span></a>\r\n                        </li>\r\n\t\t\t        '
                    }
                    l += '\r\n                    </ul>\r\n                </div>\r\n\r\n\t\t        <div class="mod_playlist js_list" style="display:' + (null == (a = "mod_playlist_text" == t.list.showtype ? "none" : "") ? "" : a) + ';">\r\n                    <ul class="playlist__header">\r\n                        <li class="playlist__header_name">专辑</li>\r\n                        <li class="playlist__header_number">曲目数</li>\r\n                        <li class="playlist__header_author">歌手</li>\r\n                        <li class="playlist__header_other">发行时间</li>\r\n                    </ul>\r\n                    <ul class="playlist__list">\r\n                    ';
                    e = t.list.list;
                    for (i = 0; i < e.length; i++) {
                        r = e[i];
                        if (l += '\r\n                        <li class="playlist__item" data-albummid="' + (null == (a = r.albummid) ? "" : a) + '" onmouseover="this.className=(this.className+\' playlist__item--hover\')" onmouseout="this.className=this.className.replace(/ playlist__item--hover/, \'\')">\r\n                            <div class="playlist__item_box">\r\n                            <div class="playlist__cover mod_cover"><a href="' + (null == (a = s.util.getAlbumUrl(r)) ? "" : a) + '" class="js_album"  data-albummid="' + (null == (a = r.albummid) ? "" : a) + '"><img src="' + (null == (a = s.util.getAlbumPic({
                            mid: r.albummid,
                            type: 300
                        })) ? "" : _.escape(a)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = r.albumname) ? "" : _.escape(a)) + '" class="playlist__pic"/><i class="mod_cover__icon_play js_play" data-stat="y_new.profile.like.album.play"></i></a></div>\r\n                            <h4 class="playlist__title"><span class="playlist__title_txt"><a href="' + (null == (a = s.util.getAlbumUrl(r)) ? "" : a) + '" class="js_album"  data-albummid="' + (null == (a = r.albummid) ? "" : a) + '" title="' + (null == (a = r.albumname) ? "" : _.escape(a)) + '">' + (null == (a = r.albumname) ? "" : _.escape(a)) + '</a></span></h4>\r\n                            <div class="playlist__number">\r\n                                ' + (null == (a = r.songnum) ? "" : a) + '首\r\n                            </div>\r\n                            <div class="playlist__author">\r\n                            ',
                        r.singerid > 0 && "" != n.trim(r.singername))
                            for (o = 0,
                            c = r.singer.length; o < c; o++) {
                                d = r.singer[o];
                                l += "",
                                o > 0 && (l += "/"),
                                l += '<a href="' + (null == (a = s.util.getSingerUrl(r)) ? "" : a) + '" class="js_singer" data-singermid="' + (null == (a = d.mid) ? "" : a) + '" title="' + (null == (a = d.name) ? "" : _.escape(a)) + '">' + (null == (a = d.name) ? "" : _.escape(a)) + "</a>"
                            }
                        l += '\r\n                            </div>\r\n                            <div class="playlist__other">\r\n                            ' + (null == (a = s.util.toYMDString(1e3 * r.pubtime)) ? "" : a) + '\r\n                            </div>\r\n                            <a href="javascript:;" class="btn_operate_menu js_albumlist_more" data-type="2" data-mid="' + (null == (a = r.albummid) ? "" : a) + '" data-id="' + (null == (a = r.albumid) ? "" : a) + '" data-delete="delfav_album" data-stat="y_new.profile.like.album.pic_mod_more"><span class="icon_txt">更多</span></a>\r\n                        </li>\r\n                    '
                    }
                    return l += "\r\n                    </ul>\r\n                </div>\r\n            </div>"
                }
                ;
                t.async("js/common/html/albumlist.js", function(t) {
                    var i = j.like_album.showtype;
                    t.init({
                        container: n("#like_album_box"),
                        specilData: {
                            list: a.albumlist,
                            showtype: i
                        },
                        from: 0,
                        specialTpl: d,
                        reportType: s.reportMap.profile,
                        callback: function() {
                            c(),
                            v || (n(".js_delfav_album").hide(),
                            n('[data-delete="delfav_album"]').removeAttr("data-delete"))
                        }
                    })
                })
            } else if ("mv" == e) {
                if (!a.mvlist || a.mvlist.length <= 0)
                    return void n("#like_mv_box").html(I({}));
                d = function(t) {
                    var a, l = "";
                    Array.prototype.join;
                    l += '\r\n                    <div class="mod_mv_list">\r\n                        <ul class="mv_list__list">\r\n\t\t\t';
                    var e = t.list;
                    for (i = 0; i < e.length; i++) {
                        var r = e[i];
                        if (l += '\r\n                            <li class="mv_list__item" data-vid="' + (null == (a = r.vid) ? "" : a) + '" data-id="' + (null == (a = r.id) ? "" : a) + '" data-type="' + (null == (a = r.type || 0) ? "" : a) + '" onmouseover="this.className=(this.className+\' mv_list__item--hover\')" onmouseout="this.className=this.className.replace(/ mv_list__item--hover/, \'\')">\r\n                                <div class="mv_list__item_box">\r\n                                    <a href="' + (null == (a = s.util.getMvUrl(r.vid, r.type || 0)) ? "" : a) + '" title="' + (null == (a = r.mv_name) ? "" : _.escape(a)) + '" class="mv_list__cover mod_cover js_mv" data-type="' + (null == (a = r.type || 0) ? "" : a) + '" data-vid="' + (null == (a = r.vid) ? "" : a) + '" data-id="' + (null == (a = r.id) ? "" : a) + '" hidefocus="true">\r\n                                        <img class="mv_list__pic" src="',
                        r.mv_picurl ? l += "" + (null == (a = s.util.fixUrl(r.mv_picurl)) ? "" : a) : l += "//shp.qpic.cn/qqvideo_ori/0/" + (null == (a = r.vid) ? "" : a) + "_360_204/0",
                        l += '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/mv_300.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = r.mv_name) ? "" : _.escape(a)) + '">\r\n                                        <i class="mod_cover__icon_play"></i>\r\n                                    </a>\r\n                                    <h3 class="mv_list__title"><a href="' + (null == (a = s.util.getMvUrl(r.vid, r.type || 0)) ? "" : a) + '" class="js_mv" data-vid="' + (null == (a = r.vid) ? "" : a) + '" data-type="' + (null == (a = r.type || 0) ? "" : a) + '" data-id="' + (null == (a = r.id) ? "" : a) + '" title="' + (null == (a = r.mv_name) ? "" : _.escape(a)) + '">' + (null == (a = r.mv_name) ? "" : _.escape(a)) + '</a></h3>\r\n                                    <p class="mv_list__singer">\r\n\r\n\r\n                                    ',
                        r.singer_id > 0 && "" != n.trim(r.singer_name)) {
                            l += "\r\n                                    ";
                            for (var o = 0, c = r.singer.length; o < c; o++) {
                                var d = r.singer[o];
                                l += "",
                                o > 0 && (l += "/"),
                                l += '<a href="' + (null == (a = s.util.getSingerUrl(d)) ? "" : a) + '" data-singermid="' + (null == (a = d.mid) ? "" : a) + '" title="' + (null == (a = d.name) ? "" : _.escape(a)) + '" class="js_singer">' + (null == (a = d.name) ? "" : _.escape(a)) + "</a>"
                            }
                            l += "\r\n                                    "
                        } else
                            r.uploader_encuin && (l += '\r\n                                    <a href="//y.qq.com/portal/profile.html?uin=' + (null == (a = r.uploader_encuin) ? "" : a) + '" data-uin="' + (null == (a = r.uploader_encuin) ? "" : a) + '" class="js_profile" title="' + (null == (a = r.uploader_nick) ? "" : _.escape(a)) + '">' + (null == (a = "" == r.uploader_nick ? "无" : "上传者：" + r.uploader_nick) ? "" : _.escape(a)) + "</a>\r\n                                    ");
                        l += '\r\n                                    </p>\r\n                                    <a href="javascript:;" class="mv_list__delete js_delfav_mv"  data-id="' + (null == (a = r.id) ? "" : a) + '"  data-vid="' + (null == (a = r.vid) ? "" : a) + '" data-type="' + (null == (a = r.type) ? "" : a) + '"><span class="icon_txt">删除</span></a>\r\n                                </div>\r\n                            </li>\r\n\t\t\t'
                    }
                    return l += "\r\n                        </ul>\r\n                    </div>"
                }
                ;
                t.async("js/common/html/mvlist.js", function(t) {
                    t.init({
                        container: n("#like_mv_box"),
                        specilData: a.mvlist,
                        specialTpl: d,
                        reportType: s.reportMap.search,
                        callback: function() {
                            c(),
                            v || n(".js_delfav_mv").hide()
                        }
                    })
                })
            }
            u && s.initLimitButton && s.initLimitButton({
                container: n("#like_box")[0]
            })
        } else if ("uploadmv" == l) {
            if (!a.mvlist || a.mvlist.length <= 0)
                return void n("#uploadmv_box").html(I({
                    desc: "还没有上传视频... "
                }));
            o.total_num = a.total;
            var f = function(t) {
                var a, l = "";
                Array.prototype.join;
                l += '\t\t    <div class="playlist_toolbar">\r\n\t\t\t',
                t.list.isStateHost && (l += '\r\n\t\t\t    \x3c!--button class="mod_btn js_goto_uploadmv" data-stat="y_new.profile.create_playlist.goto_uploadmv"><i class="mod_btn__icon_new"></i>上传视频</button--\x3e\r\n\t\t\t    <button class="mod_btn js_uploadmv_system" data-stat="y_new.profile.create_playlist.uploadmv_system"><i class="mod_btn__icon_input"></i>视频管理</button>\r\n\t\t\t'),
                l += '\r\n\t\t    </div>\r\n                    <div class="mod_mv_list">\r\n                        <ul class="mv_list__list">\r\n\t\t\t';
                var n = t.list.mvlist;
                for (i = 0; i < n.length; i++) {
                    var e = n[i];
                    l += '\r\n                            <li class="mv_list__item" data-vid="' + (null == (a = e.play_vid) ? "" : a) + '" data-id="' + (null == (a = e.mvid) ? "" : a) + '" onmouseover="this.className=(this.className+\' mv_list__item--hover\')" onmouseout="this.className=this.className.replace(/ mv_list__item--hover/, \'\')">\r\n                                <div class="mv_list__item_box">\r\n\t\t\t\t',
                    e.play_vid ? l += '\r\n                                    <a href="' + (null == (a = s.util.getMvUrl(e.play_vid)) ? "" : a) + '" title="' + (null == (a = e.title) ? "" : _.escape(a)) + '" class="mv_list__cover mod_cover js_mv" data-vid="' + (null == (a = e.play_vid) ? "" : a) + '" data-id="' + (null == (a = e.mvid) ? "" : a) + '" hidefocus="true">\r\n                                        <img class="mv_list__pic" src="' + (null == (a = s.util.fixUrl(e.cover)) ? "" : a) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/mv_300.png?max_age=31536000\';this.onerror=null;" alt="' + (null == (a = e.title) ? "" : _.escape(a)) + '">\r\n                                        <i class="mod_cover__icon_play"></i>\r\n                                    </a>\r\n                                    <h3 class="mv_list__title"><a href="' + (null == (a = s.util.getMvUrl(e.play_vid)) ? "" : a) + '" class="js_mv" data-vid="' + (null == (a = e.play_vid) ? "" : a) + '" data-id="' + (null == (a = e.mvid) ? "" : a) + '" title="' + (null == (a = e.title) ? "" : _.escape(a)) + '">' + (null == (a = e.title) ? "" : _.escape(a)) + "</a></h3>\r\n\t\t\t\t" : (l += '\r\n                                    <a class="mv_list__cover mod_cover" hidefocus="true">\r\n\t\t\t\t    ',
                    e.cover ? l += '\r\n                                        <img class="mv_list__pic" src="' + (null == (a = s.util.fixUrl(e.cover)) ? "" : a) + '" alt="' + (null == (a = e.title) ? "" : _.escape(a)) + '">\r\n\t\t\t\t    ' : l += '\r\n                                        <img class="mv_list__pic" src="//y.gtimg.cn/mediastyle/global/img/mv_300.png?max_age=31536000" alt="' + (null == (a = e.title) ? "" : _.escape(a)) + '">\r\n\t\t\t\t    ',
                    l += '\r\n                                        <i class="mod_cover__icon_play"></i>\r\n                                    </a>\r\n                                    <h3 class="mv_list__title"><a title="' + (null == (a = e.title) ? "" : _.escape(a)) + '">' + (null == (a = e.title) ? "" : _.escape(a)) + "</a></h3>\r\n\r\n\t\t\t\t"),
                    l += '\r\n                                    <p class="mv_list__singer"><a href="' + (null == (a = s.util.getSingerUrl({
                        mid: e.singer[0].mid
                    })) ? "" : a) + '" class="js_singer" data-singermid=' + (null == (a = e.singer[0].mid) ? "" : a) + ' data-singerid="' + (null == (a = e.singer[0].id) ? "" : a) + '" title="' + (null == (a = e.singer[0].name) ? "" : _.escape(a)) + '">' + (null == (a = e.singer[0].name) ? "" : _.escape(a)) + "</a></p>\r\n                                </div>\r\n                            </li>\r\n\t\t\t"
                }
                return l += "\r\n                        </ul>\r\n                    </div>"
            };
            o.init = !0,
            t.async("js/common/html/mvlist.js", function(t) {
                t.init({
                    container: n("#uploadmv_box"),
                    specilData: {
                        mvlist: a.mvlist,
                        isStateHost: v
                    },
                    specialTpl: f,
                    reportType: s.reportMap.search,
                    callback: function() {
                        c()
                    }
                })
            })
        } else if ("magazine" == l)
            if (n("#magazine_tab").length > 0) {
                if (!a.v_magzine || a.v_magzine.length <= 0)
                    return void n("#magazine_box").html(I({
                        desc: "还没有发表杂志... "
                    }));
                o.total_num = a.total;
                f = function(t) {
                    var i, a = "";
                    Array.prototype.join;
                    a += '\r\n            <a href="//y.qq.com/portal/headline/editor.html" rel="noopener" target="_blank" class="mod_btn mod_btn_add_article"><i class="mod_btn__icon_new"></i>发表文章</a>\r\n            <a href="//y.qq.com/portal/headline/manage.html" rel="noopener" target="_blank" class="mod_btn mod_btn_manage_article"><i class="mod_btn__icon_upload"></i>文章管理</a>\r\n\r\n            <div class="mod_article">\r\n                <table class="article__table" width="100%">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class="article__col_1">文章</th>\r\n                            <th class="article__col_2">发表时间</th>\r\n                            <th class="article__col_3">阅读量</th>\r\n                            <th class="article__col_4">操作</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n\t\t    ';
                    for (var l = 0, n = t.length; l < n; l++) {
                        var e = t[l];
                        a += '\r\n                        <tr data-zid="' + (null == (i = e.zid) ? "" : i) + '">\r\n                            <td>\r\n                                <div class="article__info">\r\n                                    <img class="article__cover" src="' + (null == (i = s.util.fixUrl(e.front_pic)) ? "" : i) + '" alt="' + (null == (i = e.title) ? "" : _.escape(i)) + '" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000\';this.onerror=null;"/>\r\n                                    <span class="article__title">' + (null == (i = e.title) ? "" : _.escape(i)) + '</span>\r\n                                </div>\r\n                            </td>\r\n                            <td><p class="article__time">' + (null == (i = s.util.toYMDString(1e3 * e.modify_time)) ? "" : i) + '</p></td>\r\n                            <td><p class="article__view__num">' + (null == (i = e.read_cnt) ? "" : i) + '</p> </td>\r\n                            <td>\r\n                                <div class="article__view">\r\n                                    <a class="article__view__link js_magazine_preview_qrcode" href="javascript:;">',
                        200 == e.level || 300 == e.level || 400 == e.level ? a += "查看" : a += "预览",
                        a += '</a>\r\n                                    <div class="popup_phone_qrcode js_preview_qrcode_popup" data-aria="popup" style="display:none;">\r\n                                        <i class="popup_phone_qrcode__arrow"></i>\r\n                                        <img src="http://y.gtimg.cn/mediastyle/musicprotal/img/qrcode_qqmusic.jpg" alt="请扫描二维码" class="popup_phone_qrcode__pic">\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n\t\t    '
                    }
                    return a += "\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>"
                }
                ;
                o.init = !0,
                n.each(a.v_magzine, function(t, i) {
                    g[i.zid] = i
                }),
                n("#magazine_box").html(f(a.v_magzine)),
                c()
            } else
                n("#magazine_box").html(""),
                window.location.replace(location.protocol + "//y.qq.com/portal/profile.html#sub=song&tab=like&");
        else if ("radio" == l) {
            f = function(t) {
                var i, a = "";
                Array.prototype.join;
                if (a += "",
                t = t.list || {},
                a += "\r\n",
                t.isStateHost && (a += '\r\n<div class="playlist_toolbar">\r\n    <a class="js_edit_radio mod_btn" href="//y.qq.com/portal/audio/radio_edit.html" rel="noopener" target="_blank"><i class="mod_btn__icon_new"></i>创建电台</a>\r\n    <a class="js_radio_list mod_btn" href="//y.qq.com/portal/audio/radio_list.html" rel="noopener" target="_blank"><i class="mod_btn__icon_batch"></i>管理电台</a>\r\n</div>\r\n'),
                a += "\r\n",
                t.radiolist && t.radiolist.length) {
                    a += '\r\n<div class="mod_voice_text">\r\n    <ul class="voice__header">\r\n        <li class="voice__header_name">电台</li>\r\n        <li class="voice__header_number">节目数</li>\r\n        <li class="voice__header_other">收听</li>\r\n    </ul>\r\n    <ul class="voice__list">\r\n        ';
                    for (var l = 0; l < t.radiolist.length; l++) {
                        var n = t.radiolist[l];
                        a += '\r\n        <li class="js_radio voice__item voice__item--hover" data-albummid="' + (null == (i = n.mid) ? "" : i) + '">\r\n            <div class="voice__item_box playlist__item">\r\n                <h4 class="voice__title">\r\n                    <span class="voice__title_txt">\r\n                    <a href="javascript:;" class="voice__cover"><img src="' + (null == (i = s.util.fixUrl(n.cover)) ? "" : i) + '" alt=""' + (null == (i = n.desc) ? "" : _.escape(i)) + '" class="voice__pic"></a>\r\n                    <a href="javascript:;">' + (null == (i = n.name) ? "" : _.escape(i)) + '</a>\r\n                    </span>\r\n\r\n                </h4>\r\n                <div class="mod_list_menu">\r\n                    <a href="javascript:;" class="js_play list_menu__item list_menu__play" title="播放">\r\n                        <i class="list_menu__icon_play"></i>\r\n                        <span class="icon_txt">播放</span>\r\n                    </a>\r\n                    <a href="javascript:;" class="js_share list_menu__item list_menu__share" title="分享">\r\n                        <i class="list_menu__icon_share"></i>\r\n                        <span class="icon_txt">分享</span>\r\n                    </a>\r\n                    <a href="javascript:;" class="js_fav list_menu__item list_menu__add" title="添加到歌单">\r\n                        <i class="list_menu__icon_add"></i>\r\n                        <span class="icon_txt">添加到歌单</span>\r\n                    </a>\r\n                    <a href="javascript:;" class="js_down list_menu__item list_menu__down" title="下载">\r\n                        <i class="list_menu__icon_down"></i>\r\n                        <span class="icon_txt">下载</span>\r\n                    </a>\r\n                </div>\r\n                <div class="voice__number">\r\n                    ' + (null == (i = n.audio_count || 0) ? "" : i) + '\r\n                </div>\r\n                <div class="voice__other">\r\n                    ' + (null == (i = parseInt(n.play_count, 10) >= 1e4 ? ((n.play_count / 1e4).toFixed(1) + "万").replace(".0万", "万") : n.play_count) ? "" : i) + '\r\n                </div>\r\n                \x3c!--<a href="javascript:;" class="js_delete voice__delete"><span class="icon_txt">删除</span></a>--\x3e\r\n            </div>\r\n        </li>\r\n        '
                    }
                    a += "\r\n    </ul>\r\n</div>\r\n"
                } else
                    a += "\r\n",
                    t.isStateHost ? a += '\r\n<div class="none_txt">\r\n    <i class="none_txt__symbol none_txt__symbol--album"></i>\r\n    <p>审核通过的电台将显示在这里</p>\r\n    <div class="none_txt__action"><a rel="noopener" target="_blank" href="//y.qq.com/portal/audio/radio_edit.html" class="js_edit_radio mod_btn_green none_txt__btn">创建电台</a></div>\r\n    </div>\r\n' : a += '\r\n<div class="none_txt">\r\n    <i class="none_txt__symbol none_txt__symbol--album"></i>\r\n    <p>空空如也</p>\r\n</div>\r\n',
                    a += "\r\n";
                return a += "\r\n"
            }
            ;
            t.async("js/common/html/albumlist.js", function(t) {
                o.init = !0,
                t.init({
                    container: n("#radio_box"),
                    specilData: {
                        isStateHost: v,
                        radiolist: a || []
                    },
                    from: 0,
                    specialTpl: f,
                    reportType: s.reportMap.profile,
                    callback: function() {}
                })
            })
        }
    }
    var A = 0;
    function L(t, i, a, l) {
        !l && function(t, i) {
            var a = '<div class="mod_loading"><i class="icon_txt">加载中</i></div>';
            i = i || "",
            "buy" == t ? "album" == i ? n("#buy_album_box").html(a) : "song" == i ? n("#buy_song_box").html(a) : "peri" == i && n("#buy_peri_box").html(a) : "create" == t ? n("#create_box").html(a) : "fans" == t ? n("#fans_box").html(a) : "focus" == t ? "singer" == i ? n("#focus_singer_box").html(a) : "user" == i && n("#focus_user_box").html(a) : "like" == t ? "song" == i ? n("#like_song_box").html(a) : "playlist" == i ? n("#like_playlist_box").html(a) : "album" == i ? n("#like_album_box").html(a) : "mv" == i && n("#like_mv_box").html(a) : "uploadmv" == t ? n("#uploadmv_box").html(a) : "magazine" == t && n("#magazine_box").html(a)
        }(t, i),
        i = i || "";
        var e = a || 1;
        j[t + (i ? "_" + i : "")].cur_page = e;
        var _ = j[t + (i ? "_" + i : "")];
        if ("buy" == t) {
            var c = o.getUin()
              , d = (_.cur_page - 1) * _.per_page
              , m = _.per_page;
            "album" == i ? g = "//c.y.qq.com/shop/fcgi-bin/fcg_get_order?from=1&cmd=sales_album&type=1&guest_uin=&callback=MusicJsonCallback&start=" + d + "&num=" + m + "&uin=" + c + "&t=" + (new Date).getTime() : "song" == i ? g = "//c.y.qq.com/shop/fcgi-bin/fcg_get_order?from=1&cmd=sales_album&type=2&guest_uin=&callback=MusicJsonCallback&start=" + d + "&num=" + m + "&uin=" + c + "&t=" + (new Date).getTime() : "peri" == i && (g = "//c.y.qq.com/shop/fcgi-bin/fcg_peri_order?uin=" + c + "&callback=MusicJsonCallback&type=5&start=" + d + "&num=" + m + "&t=" + (new Date).getTime()),
            s.jQueryAjax.jsonp({
                url: g,
                data: {},
                jsonpCallback: "MusicJsonCallback",
                charset: "utf-8",
                success: function(a) {
                    1e3 != a.code ? T(a, t, i) : o.openLogin()
                },
                error: function(t) {}
            })
        } else if ("create" == t) {
            var g = "//c.y.qq.com/rsc/fcgi-bin/fcg_user_created_diss?hostuin=" + p + "&sin=" + (_.per_page * (_.cur_page - 1) + (_.cur_page > 1 ? A : 0)) + "&size=" + (_.per_page + (1 == _.cur_page ? 10 : 0)) + "&r=" + (new Date).getTime();
            r.jsonp({
                url: g,
                charset: "utf-8",
                success: function(a) {
                    if (1e3 != a.code)
                        if (0 == a.code && a.data && a.data.disslist) {
                            if (1 == _.cur_page)
                                if (A = 0,
                                o.isWeiXin()) {
                                    var l = [];
                                    n.each(a.data.disslist, function(t, i) {
                                        205 != i.dirid && 206 != i.dirid && l.push(i)
                                    }),
                                    a.data.disslist = l,
                                    A = 2
                                } else {
                                    l = [];
                                    n.each(a.data.disslist, function(t, i) {
                                        i.dirid > 200 && i.dirid < 210 ? v ? parseInt(i.song_cnt) > 0 ? l.push(i) : A++ : i.dirid > 200 && i.dirid < 210 && parseInt(i.song_cnt) > 0 ? l.push(i) : A++ : l.push(i)
                                    }),
                                    a.data.disslist = l
                                }
                            u && (a.data.disslist = a.data.disslist.slice(0, 10)),
                            T(a, t, i)
                        } else
                            n("#create_box").html(I({})),
                            s.popup.show("服务器繁忙，请稍后再试！");
                    else
                        o.openLogin()
                },
                error: function() {
                    n("#create_box").html(I({})),
                    s.popup.show("服务器繁忙，请稍后再试！")
                }
            })
        } else if ("fans" == t)
            z.getList({
                uin: p,
                start: (_.cur_page - 1) * _.per_page,
                num: _.per_page,
                type: 1
            }, function(a) {
                for (var l = [], s = 0; s < a.list.length; s++) {
                    var n = a.list[s];
                    n.logo || l.push(n.encrypt_uin || n.uin)
                }
                T(a, t, i, function() {
                    w(l)
                })
            });
        else if ("focus" == t)
            "singer" == i ? q.getList(p, function(a) {
                T(a, t, i)
            }, function() {}, _.cur_page, _.per_page) : "user" == i && z.getList({
                uin: p,
                start: (_.cur_page - 1) * _.per_page,
                num: _.per_page
            }, function(a) {
                for (var l = [], s = 0; s < a.list.length; s++) {
                    var n = a.list[s];
                    n.logo || l.push(n.encrypt_uin || n.uin)
                }
                T(a, t, i, function() {
                    w(l)
                })
            });
        else if ("like" == t)
            a > 0 || (a = 1),
            myFav_type = i,
            myFav_page = a,
            U(i, a, function(a, l, s, n) {
                j["like_" + i].total_num = l,
                T(a, t, i, function() {})
            });
        else if ("uploadmv" == t) {
            var f = I({
                desc: "还没有上传视频... "
            });
            if (v)
                f = '<div class="playlist_toolbar">\x3c!--button class="mod_btn js_goto_uploadmv" data-stat="y_new.profile.create_playlist.goto_uploadmv"><i class="mod_btn__icon_new"></i>上传视频</button--\x3e<button class="mod_btn js_uploadmv_system" data-stat="y_new.profile.create_playlist.uploadmv_system"><i class="mod_btn__icon_input"></i>视频管理</button> </div><div class="mod_mv_list">' + I({
                    desc: "还没有上传视频... "
                }) + "</div>";
            !function(t, i) {
                var a = {
                    cmd: 3,
                    uin: p,
                    sin: (j.uploadmv.cur_page - 1) * j.uploadmv.per_page,
                    size: j.uploadmv.per_page
                };
                s.jQueryAjax.json({
                    url: "//c.y.qq.com/mv/fcgi-bin/fcg_ugc_mv_list.fcg",
                    data: a,
                    charset: "utf-8",
                    success: function(i) {
                        t && t(i)
                    },
                    error: function() {
                        i && i()
                    }
                })
            }(function(a) {
                0 == a.code && a.data && a.data.total && a.data.mvlist && a.data.mvlist.length > 0 ? T(a.data, t, i, function() {}) : n("#uploadmv_box").html(f)
            }, function() {
                n("#uploadmv_box").html(f)
            })
        } else if ("magazine" == t) {
            f = "";
            v ? (f = '<a href="//y.qq.com/portal/headline/editor.html" rel="noopener nofollow" target="_blank" class="mod_btn mod_btn_add_article" data-stat="y_new.profile.create_playlist.goto_magazine"><i class="mod_btn__icon_new"></i>发表文章</a><a href="//y.qq.com/portal/headline/manage.html" rel="noopener nofollow" target="_blank" class="mod_btn mod_btn_manage_article" data-stat="y_new.profile.create_playlist.manage_magazine"><i class="mod_btn__icon_upload"></i>文章管理</a><div class="mod_mv_list">' + I({
                desc: "还没有发表文章... "
            }) + "</div>",
            h = function(a) {
                0 == a.code && a.magzine && 0 == a.magzine.code && a.magzine.data && a.magzine.data.v_magzine.length > 0 ? T(a.magzine.data, t, i, function() {}) : n("#magazine_box").html(f)
            }
            ,
            y = function() {
                n("#magazine_box").html(f)
            }
            ,
            Q({
                magzine: {
                    method: "get_author_magzine_list",
                    param: {
                        fieldtype: 2,
                        ordertype: 1,
                        versiontype: 1,
                        uin: o.isWeiXin() ? 0 : p,
                        suin: o.isWeiXin() ? p : "" + p,
                        sin: (j.magazine.cur_page - 1) * j.magazine.per_page,
                        size: j.magazine.per_page,
                        level: [200, 300, 400],
                        status: [100, 200]
                    },
                    module: "magzine.MagzineReadServer"
                }
            }, h, y)) : n("#magazine_box").html("")
        } else
            "radio" == t && n("#radio_box").show();
        var h, y
    }
    var P = {
        like: function(t) {
            N("like", t = t || "song")
        },
        buy: function(t) {
            N("buy", t = t || "album")
        },
        create: function(t) {
            N("create")
        },
        focus: function(t) {
            N("focus", t = t || "singer")
        },
        fans: function() {
            N("fans")
        },
        uploadmv: function() {
            N("uploadmv")
        },
        magazine: function() {
            0 == n("#magazine_tab").length ? N("like", "song") : N("magazine")
        },
        radio: function() {
            n("#radio_tab").is(":hidden") ? N("like", "song") : N("radio")
        }
    };
    function D(i, a, l, s, n) {
        t.async("js/common/dialog.js", function(t) {
            t.show({
                mode: "common",
                title: "QQ音乐",
                icon_type: 2,
                sub_title: i,
                desc: a,
                button_info1: {
                    highlight: 1,
                    title: l || "确定",
                    fn: function() {
                        t.hide(),
                        s && s()
                    }
                },
                button_info2: {
                    highlight: 0,
                    title: n || "取消",
                    fn: function(i) {
                        t.hide()
                    }
                }
            })
        })
    }
    function H() {}
    function F(i) {
        D("确定要删除该歌单？ ", "删除后收藏该歌单的用户将无法访问！", null, function() {
            t.async("js/common/fav.js", function(t) {
                t.del(i, function() {
                    j.create.init = !1,
                    W()
                })
            })
        })
    }
    function O(t) {
        var i, a = {
            uin: o.getUin(),
            ordertype: 0,
            optype: 2,
            dissid: t,
            from: 1
        };
        (i = new s.FormSender("//c.y.qq.com/folder/fcgi-bin/fcg_qm_order_diss.fcg","post",a,"gb2312")).onSuccess = function(t) {
            0 == t.ret ? (c.show("删除成功！", 2e3),
            j.like_playlist.init = !1,
            W()) : c.show("网络繁忙，请稍后再试。", 2e3, 1)
        }
        ,
        i.onError = H,
        i.send()
    }
    function V(t) {
        D("确定要取消收藏该歌单？ ", null, null, function() {
            O(t)
        })
    }
    function E(t, i) {
        D("确定要取消收藏该专辑？ ", null, null, function() {
            var a, l = {
                uin: o.getUin(),
                ordertype: 1,
                optype: 2,
                albumid: t,
                albummid: i,
                from: 1
            };
            (a = new s.FormSender("//c.y.qq.com/folder/fcgi-bin/fcg_qm_order_diss.fcg","post",l,"gb2312")).onSuccess = function(t) {
                0 == t.ret ? (c.show("删除成功！", 2e3),
                j.like_album.init = !1,
                W()) : c.show("网络繁忙，请稍后再试。", 2e3, 1)
            }
            ,
            a.onError = H,
            a.send()
        })
    }
    function Q(t, i, a) {
        var l = "getMagzine" + (Math.random() + "").replace("0.", "");
        t.comm = {
            ct: 24,
            cv: 0
        },
        r.jsonp({
            url: "//u.y.qq.com/cgi-bin/musicu.fcg?callback=" + l,
            data: {
                data: JSON.stringify(t)
            },
            jsonpCallback: l,
            charset: "utf-8",
            success: function(t) {
                i && i(t)
            },
            error: function() {
                a && a(null)
            }
        })
    }
    function R() {
        v && n(".main").addClass("main--profile"),
        x(function() {
            var t = s.util.getParameterNew("tab") || "like"
              , i = s.util.getParameterNew("sub") || "";
            t in y || "gedan" == t && (t = "like"),
            n(".mod_tab__item", n("#nav")).removeClass("mod_tab__current"),
            n("#" + t + "_tab").addClass("mod_tab__current"),
            1 == y[t] ? i = null : i in y[t] || (i = y[t].default),
            i ? (n(".js_sub", "#" + t + "_box").hide(),
            n(".mod_tab__item", n("#" + t + "_box")).removeClass("mod_tab__current"),
            n('.mod_tab__item[data-tab="' + t + "_" + i + '"]').addClass("mod_tab__current"),
            n("#" + t + "_" + i + "_box").show(),
            !j[t + "_" + i].init && L(t, i),
            "focus" == t && v ? "user" == i ? (o.isWeiXin(),
            n(".js_focus_friends").html('<i class="mod_btn__icon_new"></i>关注更多好友').hide()) : n(".js_focus_friends").html('<i class="mod_btn__icon_new"></i>关注更多歌手').show() : n(".js_focus_friends").hide()) : !j[t].init && L(t, i),
            n(".js_box").hide(),
            n("#" + t + "_box").show()
        }),
        n("body").off().on("click", ".js_profile", function() {
            var t = n(this).data("uin");
            s.util.gotoUser({
                uin: t,
                target: "_self"
            })
        }).on("click", ".js_vip", function() {
            var t = n(this).data("href")
              , i = window.open(t, "_blank");
            return i && (i.opener = null),
            e.pgvClickStat("y_new.profile.header.icon_click"),
            !1
        }).on("click", ".js_singer", function() {
            var t = n(this).data("mid")
              , i = n(this).data("target");
            s.util.gotoSinger({
                singermid: t,
                target: i
            })
        }).on("click", ".js_btn_lock", function() {
            var t = this
              , i = "0" == this.getAttribute("data-status") ? 1 : 2;
            a = i,
            l = function() {
                2 == i ? (t.setAttribute("data-status", "0"),
                n(t).html('<span class="icon_txt">主页已公开</span>').attr("title", "主页已公开").removeClass("btn_unlock").addClass("btn_lock"),
                s.popup.show("主页已公开!", 3e3)) : (t.setAttribute("data-status", "1"),
                n(t).html('<span class="icon_txt">主页非公开</span>').attr("title", "主页非公开").removeClass("btn_lock").addClass("btn_unlock"),
                s.popup.show("主页非公开!", 3e3))
            }
            ,
            setTimeout(function() {
                r.jsonp({
                    url: "//c.y.qq.com/rsc/fcgi-bin/3g_fav_lock?rnd=" + Math.random(),
                    data: {
                        cid: 339,
                        chloginstyle: 1,
                        qq: f,
                        lock: a,
                        rettype: 20,
                        ct: 19,
                        cv: "yqq"
                    },
                    charset: "utf-8",
                    success: function(t) {
                        t && 0 == t.code ? l && l(t) : s.popup.show("操作失败！当前网络繁忙，请稍后重试。", 3e3, 1)
                    },
                    error: function() {
                        s.popup.show("操作失败！当前网络繁忙，请稍后重试。", 3e3, 1)
                    }
                })
            }, 1);
            var a, l;
            return !1
        }).on("click", ".js_follow_singer", function() {
            var t = this
              , i = this.getAttribute("data-id")
              , a = 1 == this.getAttribute("data-follow") ? 0 : 1;
            return i && !q.delLock && (q.delLock = !0,
            q.add({
                singerid: i,
                status: a,
                uin: f
            }, function(i) {
                if (q.delLock = !1,
                i && 0 == i.code) {
                    var l = n(".js_user_data .js_num_follow").text().replace(/\(|\)/g, "");
                    l < 0 && (l = 0),
                    0 == a ? (s.popup.show("取消关注成功！", 3e3),
                    n(t).html('<i class="mod_btn__icon_new"></i>关注'),
                    n(t).attr("data-follow", 0),
                    v && (n(".popup_user .js_focus").html(parseInt(l) - 1),
                    n(".js_user_data .js_num_follow").text(parseInt(l) - 1))) : (s.popup.show("关注成功！", 3e3),
                    n(t).html('<span class="btn_focus__cont"><i class="mod_btn__icon_yes"></i>已关注</span>'),
                    n(t).attr("data-follow", 1),
                    v && (n(".popup_user .js_focus").html(parseInt(l) + 1),
                    n(".js_user_data .js_num_follow").text(parseInt(l) + 1)))
                } else
                    s.popup.show("操作失败！", 3e3, 1)
            })),
            !1
        }).on("click", ".js_follow_user", function() {
            var t = this
              , i = this.getAttribute("data-id")
              , a = 1 == this.getAttribute("data-follow") ? 0 : 1;
            return f < 1e4 && o.openLogin(null, function() {
                location.reload()
            }),
            i && z.doFollow({
                my_uin: f,
                friend_uin: i,
                status: a
            }, function(i) {
                if (i && 0 == i.code) {
                    var l = parseInt(n(".js_user_data .js_num_follow").text().replace(/\(|\)/g, ""));
                    l < 0 && (l = 0),
                    0 == a ? (s.popup.show("取消关注成功！", 3e3),
                    n(t).html('<i class="mod_btn__icon_new"></i>关注'),
                    n(t).attr("data-follow", 0),
                    v && (n(".popup_user .js_focus").html(parseInt(l) - 1),
                    n(".js_user_data .js_num_follow").text(parseInt(l) - 1))) : (s.popup.show("关注成功！", 3e3),
                    n(t).html('<span class="btn_focus__cont"><i class="mod_btn__icon_yes"></i>已关注</span>'),
                    n(t).attr("data-follow", 1),
                    v && (n(".popup_user .js_focus").html(l + 1),
                    n(".js_user_data .js_num_follow").text(l + 1)))
                } else
                    s.popup.show("操作失败！", 3e3, 1);
                j.focus_user.init = !1,
                L("focus", "user")
            }),
            !1
        }).off("click", ".js_create_new").on("click", ".js_create_new", function(i) {
            t.async("js/common/dialog.js", function(i) {
                i.show({
                    mode: "common",
                    width: 520,
                    dialogclass: "popup_new_list",
                    content: ['<label class="form__label">歌单名</label>', ' <div class="mod_form_txt">', ' <input type="text" value="" class="form_txt__input" id="new_playlist"><span class="form_txt__tips" id="name_leftnum">20</span>', "</div>"].join(""),
                    title: "创建新歌单",
                    button_info1: {
                        highlight: 0,
                        fn: function(t) {
                            i.hide()
                        },
                        title: "取消"
                    },
                    button_info2: {
                        highlight: 1,
                        fn: function() {
                            if ("" != n("#new_playlist").val()) {
                                if (!((a = n("#new_playlist").val()).indexOf("&") > -1 || a.indexOf("+") > -1 || a.indexOf('"') > -1 || a.indexOf("#") > -1 || a.indexOf("=") > -1 || a.indexOf("%") > -1 || a.indexOf("<") > -1 || a.indexOf(">") > -1 || a.indexOf("\\") > -1) || (s.popup.show('输入错误！输入的内容中请不要使用+, &, #, %, ", =, \\, <, >等特殊字符.', 3e3, 1),
                                0)) {
                                    var a;
                                    parseInt(n("#name_leftnum").html()) < 0 ? s.popup.show("歌单名最多20个字！", 3e3, 1) : t.async("js/common/fav.js", function(t) {
                                        var a = {
                                            moddirnames: n("#new_playlist").val(),
                                            moddirids: 0
                                        };
                                        t.favToNew(a, function(t) {
                                            i.hide(),
                                            s.popup.show("已成功添加到新建歌单"),
                                            j.create.init = !1,
                                            W()
                                        })
                                    })
                                }
                            } else
                                s.popup.show("请输入歌单名！", 3e3, 1)
                        },
                        title: "确定"
                    }
                })
            });
            var a = n(this).data("stat") || "";
            a && e.pgvClickStat(a),
            n(document).on("keyup input propertychange", "#new_playlist", function() {
                !function() {
                    var t = n("#new_playlist")
                      , i = n("#name_leftnum")
                      , a = s.string.getRealLen(t.val());
                    (a = Math.ceil(a / 2)) <= 20 ? (i.html(20 - a),
                    i.css({
                        color: "#999"
                    })) : (i.html("-" + (a - 20)),
                    i.css({
                        color: "#F70505"
                    }))
                }()
            })
        }).on("click", ".js_import", function() {
            var t = n(this).data("stat") || "";
            t ? (setStatCookie && setStatCookie(),
            window.location.href = location.protocol + "//y.qq.com/portal/songlist_import.html#stat=" + t) : window.location.href = location.protocol + "//y.qq.com/portal/songlist_import.html"
        }).on("click", ".js_recover", function() {
            var t = n(this).data("stat") || "";
            t ? (setStatCookie && setStatCookie(),
            window.location.href = location.protocol + "//y.qq.com/portal/list_recover.html#stat=" + t) : window.location.href = location.protocol + "//y.qq.com/portal/list_recover.html"
        }).off("click", ".js_delfav_song").on("click", ".js_delfav_song", function() {
            var t = this;
            D("确定要取消收藏该歌曲？ ", null, null, function() {
                var i, a = n(t), l = {
                    uin: o.getUin(),
                    formsender: 1,
                    flag: 2,
                    from: 3,
                    source: 103,
                    ids: a.data("id"),
                    types: 3,
                    dirid: 201
                };
                a.data("type") && (l.types = a.data("type")),
                (i = new s.FormSender("//c.y.qq.com/qzone/fcg-bin/fcg_music_delbatchsong.fcg","post",l,"GB2312")).onSuccess = function(t) {
                    0 == t.code ? (c.show("删除成功！", 2e3),
                    j.like_song.init = !1,
                    W()) : c.show("网络繁忙，请稍后再试。", 2e3, 1)
                }
                ,
                i.onError = H,
                i.send()
            })
        }).off("click", ".js_delfav_album").on("click", ".js_delfav_album", function() {
            E(n(this).data("id"), n(this).data("mid"))
        }).on("delfav_album", "", function(t, i) {
            E(i.id, i.mid)
        }).off("click", ".js_delfav_gedan").on("click", ".js_delfav_gedan", function() {
            V(n(this).data("id"))
        }).on("delfav_gedan", "", function(t, i) {
            V(i.id)
        }).off("click", ".js_delfav_mv").on("click", ".js_delfav_mv", function() {
            r.jsonp({
                url: "//c.y.qq.com/mv/fcgi-bin/fcg_add_del_myfav_mv.fcg",
                charset: "utf-8",
                data: {
                    qq: o.getUin(),
                    cid: 205361448,
                    cmdtype: 1,
                    reqtype: 1,
                    ct: 24,
                    mvidtype: 0,
                    mvidlist: n(this).data("vid")
                },
                success: function(t) {
                    0 == t.code ? (c.show("删除成功！", 2e3),
                    j.like_mv.init = !1,
                    k = null,
                    W()) : 1e4 == t.code ? o.openLogin(!0, function() {
                        window.location.reload()
                    }) : c.show("网络繁忙，请稍后再试。", 2e3, 1)
                },
                error: H
            })
        }).off("click", ".js_delcreate_gedan").on("click", ".js_delcreate_gedan", function() {
            F(n(this).data("dirid"))
        }).on("delcreate_gedan", "", function(t, i) {
            F(i.dirid)
        }).on("click", ".js_focus_friends", function() {
            return "singer" == s.util.getParameterNew("sub") ? window.location.href = location.protocol + "//y.qq.com/portal/singer_list.html" : t.async("js/v4/mymusic_friend.js", function(t) {
                t.init()
            }),
            e.pgvClickStat("y_new.profile.focus.addmore"),
            !1
        }).on("click", ".js_goto_uploadmv", function() {
            var t = window.open(location.protocol + "//y.qq.com/portal/mv/mv_upload.html");
            t && (t.opener = null)
        }).on("click", ".js_uploadmv_system", function() {
            var t = window.open(location.protocol + "//y.qq.com/portal/mv/mv_upload_system.html");
            t && (t.opener = null)
        }).on("click", ".js_add_magazine", function() {
            var t = window.open(location.protocol + "//y.qq.com/portal/headline/editor.html");
            t && (t.opener = null)
        }).on("click", ".js_manage_magazine", function() {
            var t = window.open(location.protocol + "//y.qq.com/portal/headline/manage.html");
            t && (t.opener = null)
        }).on("click", ".js_magazine_preview_qrcode", function() {
            n(".js_preview_qrcode_popup").hide();
            var t = n(this).parent("div.article__view")
              , i = n("div.popup_phone_qrcode", t)
              , a = n(this).parents("tr").data("zid");
            if ("查看" == n(this).html().trim()) {
                var l = "//c.y.qq.com/tplcloud/fcgi-bin/fcg_get_2dcode.fcg?width=200&margin=1&eclevel=4&encode=1&url=" + encodeURIComponent(location.protocol + "//c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=" + a);
                n("img", i).attr("src", l),
                i.show()
            } else
                !function(t, i) {
                    if (!(t in g))
                        return !1;
                    var a = g[t]
                      , l = {};
                    n.extend(l, {
                        title: a.title,
                        content_brief: a.content_brief,
                        author: a.author,
                        front_pic: a.front_pic,
                        rend_style: a.rend_style,
                        head_raw_pic: a.head_raw_pic,
                        head_pic: a.head_pic,
                        head_word: a.head_word,
                        content: a.content,
                        v_media_type: a.v_media_type,
                        v_media_subtype: a.v_media_subtype,
                        v_media_id: a.v_media_id,
                        v_media_mid: a.v_media_mid,
                        status: a.status,
                        cmd: "preview",
                        zid: t
                    }),
                    r.post({
                        url: "//c.y.qq.com/rsc/fcgi-bin/fcg_write_magzine.fcg",
                        data: l,
                        charset: "utf-8",
                        success: function(t) {
                            t = JSON.parse(t),
                            i && i(t)
                        },
                        error: function() {
                            i && i(null)
                        }
                    })
                }(a, function(t) {
                    if (0 == t.code && t.data && t.data.zid > 0) {
                        var a = "//c.y.qq.com/tplcloud/fcgi-bin/fcg_get_2dcode.fcg?width=200&margin=1&eclevel=4&encode=1&url=" + encodeURIComponent(location.protocol + "//c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&test=1&zid=" + t.data.zid);
                        n("img", i).attr("src", a),
                        i.show()
                    }
                })
        }).on("click", ".js_radio", function() {
            var t = n(this).data("albummid");
            t && (location.href = location.protocol + "//y.qq.com/n/yqq/album/" + t + ".html?pagetype=radio")
        }).on("click", ".js_accusation", function() {
            var i = n(this).data("type")
              , a = n(this).data("id");
            t.async("js/common/accusation.js", function(t) {
                t.init({
                    type: i,
                    msg: a
                })
            })
        }).on("click", ".js_private", function() {
            var i = s.util.getParameterNew("tab") || "like"
              , a = s.util.getParameterNew("sub") || "";
            function l(i, a, l) {
                t.async("js/common/dialog.js", function(t) {
                    t.show({
                        mode: "common",
                        title: "QQ音乐",
                        icon_type: 2,
                        sub_title: i,
                        desc: a,
                        button_info1: {
                            highlight: 1,
                            title: l || "确定",
                            fn: function(i) {
                                t.hide()
                            }
                        }
                    })
                })
            }
            if ("like" == i && "playlist" == a)
                if (v) {
                    var e = n(this).data("disstid");
                    D("此歌单已被创建者设为隐私 ", "对不起，此歌单已被创建者设置为隐私，无法继续查看，是否需要删除？", "删除歌单", function() {
                        O(e)
                    }, "保留歌单")
                } else
                    l("此歌单已被创建者设为隐私 ", "对不起，此歌单已被创建者设置为隐私，无法继续查看");
            else
                "create" == i && (v || l("此歌单已被创建者设为隐私 ", "对不起，此歌单已被创建者设置为隐私，无法继续查看"))
        }),
        n(document).on("click", "body", function(t) {
            var i = s.util.getTarget(t);
            0 != n(i).parents(".js_magazine_preview_qrcode").length || n(i).hasClass("js_magazine_preview_qrcode") || n(".js_preview_qrcode_popup").hide()
        }),
        n(document).off("click", ".mod_tab__item,.js_tab").on("click", ".mod_tab__item,.js_tab", function(t) {
            var i = n(this).data("tab").split("_")
              , a = i.length > 0 ? i[0] : "like"
              , l = i.length > 1 ? i[1] : "";
            P[a](l);
            var s = n(this).data("stat") || "";
            s && e.pgvClickStat(s)
        }).off("click", ".style_switch__item").on("click", ".style_switch__item", function(t) {
            if (n(this).hasClass("style_switch__item--select"))
                return !1;
            var i = n(this).parents(".js_sub");
            0 == i.length && (i = n(this).parents(".js_box")),
            n(".style_switch__item", i).removeClass("style_switch__item--select"),
            n(this).addClass("style_switch__item--select");
            var a = n(this).data("type")
              , l = n(this).data("tab");
            n(".js_list", i).hide(),
            n("." + a, i).show(),
            j[l].showtype = a;
            var s = [];
            s.push("mod_playlist_text" == j.like_playlist.showtype ? 0 : 1),
            s.push("mod_playlist_text" == j.like_album.showtype ? 0 : 1),
            s.push("mod_playlist_text" == j.create.showtype ? 0 : 1),
            d.set("portal_profile", s.join(","));
            var r = n(this).data("stat") || "";
            r && e.pgvClickStat(r)
        })
    }
    function W(t) {
        var i = !1;
        t || (i = !0);
        var a = (t = t || s.util.getUrlParams()).uin || f;
        if (p == a) {
            var l = t.tab || "like"
              , r = t.sub;
            n(".mod_tab__item", n("#nav")).removeClass("mod_tab__current"),
            n("#" + l + "_tab").addClass("mod_tab__current"),
            "buy" == l && "song" == r && n(".js_delfav_song").hide(),
            "focus" == l && v ? "user" == r ? (o.isWeiXin(),
            n(".js_focus_friends").html('<i class="mod_btn__icon_new"></i>关注更多好友').hide()) : n(".js_focus_friends").html('<i class="mod_btn__icon_new"></i>关注更多歌手').show() : n(".js_focus_friends").hide(),
            1 == y[l] ? r = null : r in y[l] || (r = y[l].default),
            r ? (n(".js_sub", "#" + l + "_box").hide(),
            n(".mod_tab__item", n("#" + l + "_box")).removeClass("mod_tab__current"),
            n('.mod_tab__item[data-tab="' + l + "_" + r + '"]').addClass("mod_tab__current"),
            n("#" + l + "_" + r + "_box").show(),
            !j[l + "_" + r].init && L(l, r, j[l + "_" + r].cur_page, i),
            "focus" == l && ("user" == r ? (o.isWeiXin(),
            n(".js_focus_friends").html('<i class="mod_btn__icon_new"></i>关注更多好友').hide()) : n(".js_focus_friends").html('<i class="mod_btn__icon_new"></i>关注更多歌手'))) : !j[l].init && L(l, r, j[l].cur_page, i),
            n(".js_box").hide(),
            n("#" + l + "_box").show();
            var _ = t.stat;
            _ && e.pgvClickStat(_)
        } else
            window.location.reload()
    }
    function J(t) {
        function i() {
            var i = location.protocol + "//c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg";
            s.jQueryAjax.jsonp({
                url: i,
                data: {
                    cid: 205360838,
                    ct: 20,
                    userid: 0,
                    reqfrom: 1,
                    reqtype: 0
                },
                charset: "utf-8",
                success: function(i) {
                    i && 0 == i.code ? t && t(i.data.creator.encrypt_uin) : t && t(null)
                },
                error: function() {
                    t && t(null)
                }
            })
        }
        o.getVipInfo(function(a) {
            a.mcnt ? t && t(a.mcnt) : i()
        }, function() {
            i()
        })
    }
    function X() {
        o.getVipInfo(function(t) {
            R()
        }, function() {
            n("#before_page").remove(),
            n("#cgi_none_box").hide(),
            n(".js_mod_profile_unlogin").html('<div class="mod_profile_unlogin"><div class="section_inner"><h2 class="profile_unlogin__tit"><div class="icon_txt">听我喜欢听的歌</div></h2><div class="profile_unlogin__desc"></div><a href="javascript:;" data-stat="y_new.profile.login" class="mod_btn_green profile_unlogin__btn js_login">立即登录</a></div></div>').show(),
            setTimeout(function() {
                n(".js_mod_profile_unlogin").addClass("play")
            }, 10),
            n(".mod_profile, .main").hide()
        }),
        s.util.hashChangeInit(function(t) {
            W(t)
        }),
        function() {
            if (!v)
                return !1;
            Q({
                magzine: {
                    method: "get_identity",
                    param: {
                        uin: o.getUin()
                    },
                    module: "magzine.MagzineUtilityServer"
                }
            }, function(t) {
                t && t.magzine && 0 == t.magzine.code && t.magzine.data && t.magzine.data.is_invited && 1 == t.magzine.data.is_invited ? 0 == n("#magazine_tab").length && n("#uploadmv_tab").after('<a class="mod_tab__item" href="javascript:;" id="magazine_tab" data-tab="magazine" data-stat="y_new.profile.tab.magazine">我的专栏</a>') : n("#magazine_box").html("")
            }, function() {})
        }(),
        function() {
            var t = {
                cmd: 9,
                hostuin: p,
                cid: 205362273
            }
              , i = "getRadioData" + (Math.random() + "").replace("0.", "");
            r.jsonp({
                url: "//c.y.qq.com/rsc/fcgi-bin/fcg_ugc_radio_pro.fcg?callback=" + i,
                data: t,
                jsonpCallback: i,
                charset: "utf-8",
                success: function(t) {
                    t && 0 == t.code && t.data && t.data.showtab && (n("#radio_tab").show(),
                    T(t.data.radiolist || [], "radio"))
                },
                error: function() {}
            })
        }()
    }
    var B = {
        initPage: function() {
            d.get("portal_profile", function(t) {
                if (t) {
                    var i = t.split(",");
                    i.length > 0 ? j.like_playlist.showtype = parseInt(i[0], 10) > 0 ? "mod_playlist" : "mod_playlist_text" : j.like_playlist.showtype = "mod_playlist_text",
                    i.length > 1 ? j.like_album.showtype = parseInt(i[1], 10) > 0 ? "mod_playlist" : "mod_playlist_text" : j.like_album.showtype = "mod_playlist_text",
                    i.length > 2 ? j.create.showtype = parseInt(i[2], 10) > 0 ? "mod_playlist" : "mod_playlist_text" : j.create.showtype = "mod_playlist_text"
                }
                f = o.getUin(),
                p ? h ? (p != f && p != h && (v = !1),
                X()) : J(function(t) {
                    t && (h = t,
                    p != f && p != h && (v = !1)),
                    X()
                }) : (p = f,
                X())
            });
            var t = parseInt(function(t, i) {
                var a = new RegExp("(\\?|#|&)" + i + "=([^&#\\?]*)(&|#|$|\\?)")
                  , l = t.match(a);
                return l && "" != l || (l = window.location.href.match(a)),
                l ? l[2] : ""
            }(window.location.href, "no_redirect")) || 0;
            if (navigator.userAgent.match(/Android|iPhone|iPod/i) && !t) {
                var i = s.util.getParameterNew("uin");
                i ? window.location.replace("//y.qq.com/n/m/share/profile/index.html?userid=" + i) : J(function(t) {
                    t && (h = t,
                    window.location.replace("//y.qq.com/n/m/share/profile/index.html?userid=" + h))
                })
            }
        },
        init: function() {
            s.player.getLimitWhiteList(function(t) {
                u = !t,
                B.initPage()
            })
        }
    };
    return B
});

a = require("inject_profile");
a.init()