!function (n) {
  "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function (e, t) {
    return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t), t;
  } : n(jQuery);
}(function (t) {
  var e, n, p, o, r, h, f, g, m, v, y, s, i, _, a, a = (t && t.fn && t.fn.select2 && t.fn.select2.amd && (u = t.fn.select2.amd), u && u.requirejs || (u ? n = u : u = {}, g = {}, m = {}, v = {}, y = {}, s = Object.prototype.hasOwnProperty, i = [].slice, _ = /\.js$/, h = function (e, t) {
    var n, s, i = c(e), o = i[0], t = t[1];
    return e = i[1], o && (n = x(o = l(o, t))), o ? e = n && n.normalize ? n.normalize(e, (s = t, function (e) {
      return l(e, s);
    })) : l(e, t) : (o = (i = c(e = l(e, t)))[0], e = i[1], o && (n = x(o))), {f: o ? o + "!" + e : e, n: e, pr: o, p: n};
  }, f = {require: function (e) {
    return w(e);
  }, exports: function (e) {
    var t = g[e];
    return void 0 !== t ? t : g[e] = {};
  }, module: function (e) {
    return {id: e, uri: "", exports: g[e], config: (t = e, function () {
      return v && v.config && v.config[t] || {};
    })};
    var t;
  }}, o = function (e, t, n, s) {
    var i, o, r, a, l, c = [], u = typeof n, d = A(s = s || e);
    if ("undefined" == u || "function" == u) {
      for (t = !t.length && n.length ? ["require", "exports", "module"] : t, a = 0; a < t.length; a += 1) if ("require" === (o = (r = h(t[a], d)).f)) c[a] = f.require(e); else if ("exports" === o) c[a] = f.exports(e), l = true; else if ("module" === o) i = c[a] = f.module(e); else if (s.call(g, o) || s.call(m, o) || s.call(y, o)) c[a] = x(o); else {
        if (!r.p) throw new Error(e + " missing " + o);
        r.p.load(r.n, w(s, true), function (t) {
          return function (e) {
            g[t] = e;
          };
        }(o), {}), c[a] = g[o];
      }
      u = n ? n.apply(g[e], c) : void 0, e && (i && i.exports !== p && i.exports !== g[e] ? g[e] = i.exports : u === p && l || (g[e] = u));
    } else e && (g[e] = n);
  }, e = n = r = function (e, t, n, s, i) {
    if ("string" == typeof e) return f[e] ? f[e](t) : x(h(e, A(t)).f);
    if (!e.splice) {
      if ((v = e).deps && r(v.deps, v.callback), !t) return;
      t.splice ? (e = t, t = n, n = null) : e = p;
    }
    return t = t || function () {}, "function" == typeof n && (n = s, s = i), s ? o(p, e, t, n) : setTimeout(function () {
      o(p, e, t, n);
    }, 4), r;
  }, r.config = function (e) {
    return r(e);
  }, e._defined = g, (a = function (e, t, n) {
    if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
    t.splice || (n = t, t = []), s.call(g, e) || s.call(m, e) || (m[e] = [e, t, n]);
  }).amd = {jQuery: true}, u.requirejs = e, u.require = n, u.define = a), u.define("almond", function () {}), u.define("jquery", [], function () {
    var e = t || $;
    return null == e && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), e;
  }), u.define("select2/utils", ["jquery"], function (o) {
    var s = {};
    function c(e) {
      var t, n = e.prototype, s = [];
      for (t in n) "function" == typeof n[t] && "constructor" !== t && s.push(t);
      return s;
    }
    s.Extend = function (e, t) {
      var n, s = {}.hasOwnProperty;
      function i() {
        this.constructor = e;
      }
      for (n in t) s.call(t, n) && (e[n] = t[n]);
      return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e;
    }, s.Decorate = function (s, i) {
      var e = c(i), t = c(s);
      function o() {
        var e = Array.prototype.unshift, t = i.prototype.constructor.length, n = s.prototype.constructor;
        0 < t && (e.call(arguments, s.prototype.constructor), n = i.prototype.constructor), n.apply(this, arguments);
      }
      i.displayName = s.displayName, o.prototype = new function () {
        this.constructor = o;
      };
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        o.prototype[r] = s.prototype[r];
      }
      for (var a = 0; a < e.length; a++) {
        var l = e[a];
        o.prototype[l] = function (e) {
          var t = function () {};
          e in o.prototype && (t = o.prototype[e]);
          var n = i.prototype[e];
          return function () {
            return Array.prototype.unshift.call(arguments, t), n.apply(this, arguments);
          };
        }(l);
      }
      return o;
    };
    function e() {
      this.listeners = {};
    }
    e.prototype.on = function (e, t) {
      this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t];
    }, e.prototype.trigger = function (e) {
      var t = Array.prototype.slice, n = t.call(arguments, 1);
      this.listeners = this.listeners || {}, null == n && (n = []), 0 === n.length && n.push({}), (n[0]._type = e) in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
    }, e.prototype.invoke = function (e, t) {
      for (var n = 0, s = e.length; n < s; n++) e[n].apply(this, t);
    }, s.Observable = e, s.generateChars = function (e) {
      for (var t = "", n = 0; n < e; n++) t += Math.floor(36 * Math.random()).toString(36);
      return t;
    }, s.bind = function (e, t) {
      return function () {
        e.apply(t, arguments);
      };
    }, s._convertData = function (e) {
      for (var t in e) {
        var n = t.split("-"), s = e;
        if (1 !== n.length) {
          for (var i = 0; i < n.length; i++) {
            var o = n[i];
            (o = o.substring(0, 1).toLowerCase() + o.substring(1)) in s || (s[o] = {}), i == n.length - 1 && (s[o] = e[t]), s = s[o];
          }
          delete e[t];
        }
      }
      return e;
    }, s.hasScroll = function (e, t) {
      var n = o(t), s = t.style.overflowX, i = t.style.overflowY;
      return (s !== i || "hidden" !== i && "visible" !== i) && ("scroll" === s || "scroll" === i || (n.innerHeight() < t.scrollHeight || n.innerWidth() < t.scrollWidth));
    }, s.escapeMarkup = function (e) {
      var t = {"\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;"};
      return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function (e) {
        return t[e];
      });
    }, s.__cache = {};
    var n = 0;
    return s.GetUniqueElementId = function (e) {
      var t = e.getAttribute("data-select2-id");
      return null != t || (t = e.id ? "select2-data-" + e.id : "select2-data-" + (++n).toString() + "-" + s.generateChars(4), e.setAttribute("data-select2-id", t)), t;
    }, s.StoreData = function (e, t, n) {
      e = s.GetUniqueElementId(e);
      s.__cache[e] || (s.__cache[e] = {}), s.__cache[e][t] = n;
    }, s.GetData = function (e, t) {
      var n = s.GetUniqueElementId(e);
      return t ? s.__cache[n] && null != s.__cache[n][t] ? s.__cache[n][t] : o(e).data(t) : s.__cache[n];
    }, s.RemoveData = function (e) {
      var t = s.GetUniqueElementId(e);
      null != s.__cache[t] && delete s.__cache[t], e.removeAttribute("data-select2-id");
    }, s.copyNonInternalCssClasses = function (e, t) {
      var n = (n = e.getAttribute("class").trim().split(/\s+/)).filter(function (e) {
        return 0 === e.indexOf("select2-");
      }), t = (t = t.getAttribute("class").trim().split(/\s+/)).filter(function (e) {
        return 0 !== e.indexOf("select2-");
      }), t = n.concat(t);
      e.setAttribute("class", t.join(" "));
    }, s;
  }), u.define("select2/results", ["jquery", "./utils"], function (d, p) {
    function s(e, t, n) {
      this.$element = e, this.data = n, this.options = t, s.__super__.constructor.call(this);
    }
    return p.Extend(s, p.Observable), s.prototype.render = function () {
      var e = d('<ul class="select2-results__options" role="listbox"></ul>');
      return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), this.$results = e;
    }, s.prototype.clear = function () {
      this.$results.empty();
    }, s.prototype.displayMessage = function (e) {
      var t = this.options.get("escapeMarkup");
      this.clear(), this.hideLoading();
      var n = d('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'), s = this.options.get("translations").get(e.message);
      n.append(t(s(e.args))), n[0].className += " select2-results__message", this.$results.append(n);
    }, s.prototype.hideMessages = function () {
      this.$results.find(".select2-results__message").remove();
    }, s.prototype.append = function (e) {
      this.hideLoading();
      var t = [];
      if (null != e.results && 0 !== e.results.length) {
        e.results = this.sort(e.results);
        for (var n = 0; n < e.results.length; n++) {
          var s = e.results[n], s = this.option(s);
          t.push(s);
        }
        this.$results.append(t);
      } else 0 === this.$results.children().length && this.trigger("results:message", {message: "noResults"});
    }, s.prototype.position = function (e, t) {
      t.find(".select2-results").append(e);
    }, s.prototype.sort = function (e) {
      return this.options.get("sorter")(e);
    }, s.prototype.highlightFirstItem = function () {
      var e = this.$results.find(".select2-results__option--selectable"), t = e.filter(".select2-results__option--selected");
      (0 < t.length ? t : e).first().trigger("mouseenter"), this.ensureHighlightVisible();
    }, s.prototype.setClasses = function () {
      var t = this;
      this.data.current(function (e) {
        var s = e.map(function (e) {
          return e.id.toString();
        });
        t.$results.find(".select2-results__option--selectable").each(function () {
          var e = d(this), t = p.GetData(this, "data"), n = "" + t.id;
          null != t.element && t.element.selected || null == t.element && -1 < s.indexOf(n) ? (this.classList.add("select2-results__option--selected"), e.attr("aria-selected", "true")) : (this.classList.remove("select2-results__option--selected"), e.attr("aria-selected", "false"));
        });
      });
    }, s.prototype.showLoading = function (e) {
      this.hideLoading();
      e = {disabled: true, loading: true, text: this.options.get("translations").get("searching")(e)}, e = this.option(e);
      e.className += " loading-results", this.$results.prepend(e);
    }, s.prototype.hideLoading = function () {
      this.$results.find(".loading-results").remove();
    }, s.prototype.option = function (e) {
      var t = document.createElement("li");
      t.classList.add("select2-results__option"), t.classList.add("select2-results__option--selectable");
      var n, s = {role: "option"}, i = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
      for (n in (null != e.element && i.call(e.element, ":disabled") || null == e.element && e.disabled) && (s["aria-disabled"] = "true", t.classList.remove("select2-results__option--selectable"), t.classList.add("select2-results__option--disabled")), null == e.id && t.classList.remove("select2-results__option--selectable"), null != e._resultId && (t.id = e._resultId), e.title && (t.title = e.title), e.children && (s.role = "group", s["aria-label"] = e.text, t.classList.remove("select2-results__option--selectable"), t.classList.add("select2-results__option--group")), s) {
        var o = s[n];
        t.setAttribute(n, o);
      }
      if (e.children) {
        var r = d(t), a = document.createElement("strong");
        a.className = "select2-results__group", this.template(e, a);
        for (var l = [], c = 0; c < e.children.length; c++) {
          var u = e.children[c], u = this.option(u);
          l.push(u);
        }
        i = d("<ul></ul>", {class: "select2-results__options select2-results__options--nested", role: "none"});
        i.append(l), r.append(a), r.append(i);
      } else this.template(e, t);
      return p.StoreData(t, "data", e), t;
    }, s.prototype.bind = function (t, e) {
      var i = this, n = t.id + "-results";
      this.$results.attr("id", n), t.on("results:all", function (e) {
        i.clear(), i.append(e.data), t.isOpen() && (i.setClasses(), i.highlightFirstItem());
      }), t.on("results:append", function (e) {
        i.append(e.data), t.isOpen() && i.setClasses();
      }), t.on("query", function (e) {
        i.hideMessages(), i.showLoading(e);
      }), t.on("select", function () {
        t.isOpen() && (i.setClasses(), i.options.get("scrollAfterSelect") && i.highlightFirstItem());
      }), t.on("unselect", function () {
        t.isOpen() && (i.setClasses(), i.options.get("scrollAfterSelect") && i.highlightFirstItem());
      }), t.on("open", function () {
        i.$results.attr("aria-expanded", "true"), i.$results.attr("aria-hidden", "false"), i.setClasses(), i.ensureHighlightVisible();
      }), t.on("close", function () {
        i.$results.attr("aria-expanded", "false"), i.$results.attr("aria-hidden", "true"), i.$results.removeAttr("aria-activedescendant");
      }), t.on("results:toggle", function () {
        var e = i.getHighlightedResults();
        0 !== e.length && e.trigger("mouseup");
      }), t.on("results:select", function () {
        var e, t = i.getHighlightedResults();
        0 !== t.length && (e = p.GetData(t[0], "data"), t.hasClass("select2-results__option--selected") ? i.trigger("close", {}) : i.trigger("select", {data: e}));
      }), t.on("results:previous", function () {
        var e, t = i.getHighlightedResults(), n = i.$results.find(".select2-results__option--selectable"), s = n.index(t);
        s <= 0 || (e = s - 1, 0 === t.length && (e = 0), (s = n.eq(e)).trigger("mouseenter"), t = i.$results.offset().top, n = s.offset().top, s = i.$results.scrollTop() + (n - t), 0 === e ? i.$results.scrollTop(0) : n - t < 0 && i.$results.scrollTop(s));
      }), t.on("results:next", function () {
        var e, t = i.getHighlightedResults(), n = i.$results.find(".select2-results__option--selectable"), s = n.index(t) + 1;
        s >= n.length || ((e = n.eq(s)).trigger("mouseenter"), t = i.$results.offset().top + i.$results.outerHeight(false), n = e.offset().top + e.outerHeight(false), e = i.$results.scrollTop() + n - t, 0 === s ? i.$results.scrollTop(0) : t < n && i.$results.scrollTop(e));
      }), t.on("results:focus", function (e) {
        e.element[0].classList.add("select2-results__option--highlighted"), e.element[0].setAttribute("aria-selected", "true");
      }), t.on("results:message", function (e) {
        i.displayMessage(e);
      }), d.fn.mousewheel && this.$results.on("mousewheel", function (e) {
        var t = i.$results.scrollTop(), n = i.$results.get(0).scrollHeight - t + e.deltaY, t = 0 < e.deltaY && t - e.deltaY <= 0, n = e.deltaY < 0 && n <= i.$results.height();
        t ? (i.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : n && (i.$results.scrollTop(i.$results.get(0).scrollHeight - i.$results.height()), e.preventDefault(), e.stopPropagation());
      }), this.$results.on("mouseup", ".select2-results__option--selectable", function (e) {
        var t = d(this), n = p.GetData(this, "data");
        t.hasClass("select2-results__option--selected") ? i.options.get("multiple") ? i.trigger("unselect", {originalEvent: e, data: n}) : i.trigger("close", {}) : i.trigger("select", {originalEvent: e, data: n});
      }), this.$results.on("mouseenter", ".select2-results__option--selectable", function (e) {
        var t = p.GetData(this, "data");
        i.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false"), i.trigger("results:focus", {data: t, element: d(this)});
      });
    }, s.prototype.getHighlightedResults = function () {
      return this.$results.find(".select2-results__option--highlighted");
    }, s.prototype.destroy = function () {
      this.$results.remove();
    }, s.prototype.ensureHighlightVisible = function () {
      var e, t, n, s, i = this.getHighlightedResults();
      0 !== i.length && (e = this.$results.find(".select2-results__option--selectable").index(i), s = this.$results.offset().top, t = i.offset().top, n = this.$results.scrollTop() + (t - s), s = t - s, n -= 2 * i.outerHeight(false), e <= 2 ? this.$results.scrollTop(0) : (s > this.$results.outerHeight() || s < 0) && this.$results.scrollTop(n));
    }, s.prototype.template = function (e, t) {
      var n = this.options.get("templateResult"), s = this.options.get("escapeMarkup"), e = n(e, t);
      null == e ? t.style.display = "none" : "string" == typeof e ? t.innerHTML = s(e) : d(t).append(e);
    }, s;
  }), u.define("select2/keys", [], function () {
    return {BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46};
  }), u.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (n, s, i) {
    function o(e, t) {
      this.$element = e, this.options = t, o.__super__.constructor.call(this);
    }
    return s.Extend(o, s.Observable), o.prototype.render = function () {
      var e = n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
      return this._tabindex = 0, null != s.GetData(this.$element[0], "old-tabindex") ? this._tabindex = s.GetData(this.$element[0], "old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), e.attr("title", this.$element.attr("title")), e.attr("tabindex", this._tabindex), e.attr("aria-disabled", "false"), this.$selection = e;
    }, o.prototype.bind = function (e, t) {
      var n = this, s = e.id + "-results";
      this.container = e, this.$selection.on("focus", function (e) {
        n.trigger("focus", e);
      }), this.$selection.on("blur", function (e) {
        n._handleBlur(e);
      }), this.$selection.on("keydown", function (e) {
        n.trigger("keypress", e), e.which === i.SPACE && e.preventDefault();
      }), e.on("results:focus", function (e) {
        n.$selection.attr("aria-activedescendant", e.data._resultId);
      }), e.on("selection:update", function (e) {
        n.update(e.data);
      }), e.on("open", function () {
        n.$selection.attr("aria-expanded", "true"), n.$selection.attr("aria-owns", s), n._attachCloseHandler(e);
      }), e.on("close", function () {
        n.$selection.attr("aria-expanded", "false"), n.$selection.removeAttr("aria-activedescendant"), n.$selection.removeAttr("aria-owns"), n.$selection.trigger("focus"), n._detachCloseHandler(e);
      }), e.on("enable", function () {
        n.$selection.attr("tabindex", n._tabindex), n.$selection.attr("aria-disabled", "false");
      }), e.on("disable", function () {
        n.$selection.attr("tabindex", "-1"), n.$selection.attr("aria-disabled", "true");
      });
    }, o.prototype._handleBlur = function (e) {
      var t = this;
      window.setTimeout(function () {
        document.activeElement == t.$selection[0] || n.contains(t.$selection[0], document.activeElement) || t.trigger("blur", e);
      }, 1);
    }, o.prototype._attachCloseHandler = function (e) {
      n(document.body).on("mousedown.select2." + e.id, function (e) {
        var t = n(e.target).closest(".select2");
        n(".select2.select2-container--open").each(function () {
          this != t[0] && s.GetData(this, "element").select2("close");
        });
      });
    }, o.prototype._detachCloseHandler = function (e) {
      n(document.body).off("mousedown.select2." + e.id);
    }, o.prototype.position = function (e, t) {
      t.find(".selection").append(e);
    }, o.prototype.destroy = function () {
      this._detachCloseHandler(this.container);
    }, o.prototype.update = function (e) {
      throw new Error("The `update` method must be defined in child classes.");
    }, o.prototype.isEnabled = function () {
      return !this.isDisabled();
    }, o.prototype.isDisabled = function () {
      return this.options.get("disabled");
    }, o;
  }), u.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (e, t, n, s) {
    function i() {
      i.__super__.constructor.apply(this, arguments);
    }
    return n.Extend(i, t), i.prototype.render = function () {
      var e = i.__super__.render.call(this);
      return e[0].classList.add("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e;
    }, i.prototype.bind = function (t, e) {
      var n = this;
      i.__super__.bind.apply(this, arguments);
      var s = t.id + "-container";
      this.$selection.find(".select2-selection__rendered").attr("id", s).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", s), this.$selection.attr("aria-controls", s), this.$selection.on("mousedown", function (e) {
        1 === e.which && n.trigger("toggle", {originalEvent: e});
      }), this.$selection.on("focus", function (e) {}), this.$selection.on("blur", function (e) {}), t.on("focus", function (e) {
        t.isOpen() || n.$selection.trigger("focus");
      });
    }, i.prototype.clear = function () {
      var e = this.$selection.find(".select2-selection__rendered");
      e.empty(), e.removeAttr("title");
    }, i.prototype.display = function (e, t) {
      var n = this.options.get("templateSelection");
      return this.options.get("escapeMarkup")(n(e, t));
    }, i.prototype.selectionContainer = function () {
      return e("<span></span>");
    }, i.prototype.update = function (e) {
      var t, n;
      0 !== e.length ? (n = e[0], t = this.$selection.find(".select2-selection__rendered"), e = this.display(n, t), t.empty().append(e), (n = n.title || n.text) ? t.attr("title", n) : t.removeAttr("title")) : this.clear();
    }, i;
  }), u.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (i, e, c) {
    function o(e, t) {
      o.__super__.constructor.apply(this, arguments);
    }
    return c.Extend(o, e), o.prototype.render = function () {
      var e = o.__super__.render.call(this);
      return e[0].classList.add("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e;
    }, o.prototype.bind = function (e, t) {
      var n = this;
      o.__super__.bind.apply(this, arguments);
      var s = e.id + "-container";
      this.$selection.find(".select2-selection__rendered").attr("id", s), this.$selection.on("click", function (e) {
        n.trigger("toggle", {originalEvent: e});
      }), this.$selection.on("click", ".select2-selection__choice__remove", function (e) {
        var t;
        n.isDisabled() || (t = i(this).parent(), t = c.GetData(t[0], "data"), n.trigger("unselect", {originalEvent: e, data: t}));
      }), this.$selection.on("keydown", ".select2-selection__choice__remove", function (e) {
        n.isDisabled() || e.stopPropagation();
      });
    }, o.prototype.clear = function () {
      var e = this.$selection.find(".select2-selection__rendered");
      e.empty(), e.removeAttr("title");
    }, o.prototype.display = function (e, t) {
      var n = this.options.get("templateSelection");
      return this.options.get("escapeMarkup")(n(e, t));
    }, o.prototype.selectionContainer = function () {
      return i('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>');
    }, o.prototype.update = function (e) {
      if (this.clear(), 0 !== e.length) {
        for (var t = [], n = this.$selection.find(".select2-selection__rendered").attr("id") + "-choice-", s = 0; s < e.length; s++) {
          var i = e[s], o = this.selectionContainer(), r = this.display(i, o), a = n + c.generateChars(4) + "-";
          i.id ? a += i.id : a += c.generateChars(4), o.find(".select2-selection__choice__display").append(r).attr("id", a);
          var l = i.title || i.text;
          l && o.attr("title", l);
          r = this.options.get("translations").get("removeItem"), l = o.find(".select2-selection__choice__remove");
          l.attr("title", r()), l.attr("aria-label", r()), l.attr("aria-describedby", a), c.StoreData(o[0], "data", i), t.push(o);
        }
        this.$selection.find(".select2-selection__rendered").append(t);
      }
    }, o;
  }), u.define("select2/selection/placeholder", [], function () {
    function e(e, t, n) {
      this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n);
    }
    return e.prototype.normalizePlaceholder = function (e, t) {
      return "string" == typeof t && (t = {id: "", text: t}), t;
    }, e.prototype.createPlaceholder = function (e, t) {
      var n = this.selectionContainer();
      n.html(this.display(t)), n[0].classList.add("select2-selection__placeholder"), n[0].classList.remove("select2-selection__choice");
      t = t.title || t.text || n.text();
      return this.$selection.find(".select2-selection__rendered").attr("title", t), n;
    }, e.prototype.update = function (e, t) {
      var n = 1 == t.length && t[0].id != this.placeholder.id;
      if (1 < t.length || n) return e.call(this, t);
      this.clear();
      t = this.createPlaceholder(this.placeholder);
      this.$selection.find(".select2-selection__rendered").append(t);
    }, e;
  }), u.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function (i, s, a) {
    function e() {}
    return e.prototype.bind = function (e, t, n) {
      var s = this;
      e.call(this, t, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (e) {
        s._handleClear(e);
      }), t.on("keypress", function (e) {
        s._handleKeyboardClear(e, t);
      });
    }, e.prototype._handleClear = function (e, t) {
      if (!this.isDisabled()) {
        var n = this.$selection.find(".select2-selection__clear");
        if (0 !== n.length) {
          t.stopPropagation();
          var s = a.GetData(n[0], "data"), i = this.$element.val();
          this.$element.val(this.placeholder.id);
          var o = {data: s};
          if (this.trigger("clear", o), o.prevented) this.$element.val(i); else {
            for (var r = 0; r < s.length; r++) if (o = {data: s[r]}, this.trigger("unselect", o), o.prevented) return void this.$element.val(i);
            this.$element.trigger("input").trigger("change"), this.trigger("toggle", {});
          }
        }
      }
    }, e.prototype._handleKeyboardClear = function (e, t, n) {
      n.isOpen() || t.which != s.DELETE && t.which != s.BACKSPACE || this._handleClear(t);
    }, e.prototype.update = function (e, t) {
      var n, s;
      e.call(this, t), this.$selection.find(".select2-selection__clear").remove(), this.$selection[0].classList.remove("select2-selection--clearable"), 0 < this.$selection.find(".select2-selection__placeholder").length || 0 === t.length || (n = this.$selection.find(".select2-selection__rendered").attr("id"), s = this.options.get("translations").get("removeAllItems"), (e = i('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>')).attr("title", s()), e.attr("aria-label", s()), e.attr("aria-describedby", n), a.StoreData(e[0], "data", t), this.$selection.prepend(e), this.$selection[0].classList.add("select2-selection--clearable"));
    }, e;
  }), u.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (s, a, l) {
    function e(e, t, n) {
      e.call(this, t, n);
    }
    return e.prototype.render = function (e) {
      var t = this.options.get("translations").get("search"), n = s('<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>');
      this.$searchContainer = n, this.$search = n.find("textarea"), this.$search.prop("autocomplete", this.options.get("autocomplete")), this.$search.attr("aria-label", t());
      e = e.call(this);
      return this._transferTabIndex(), e.append(this.$searchContainer), e;
    }, e.prototype.bind = function (e, t, n) {
      var s = this, i = t.id + "-results", o = t.id + "-container";
      e.call(this, t, n), s.$search.attr("aria-describedby", o), t.on("open", function () {
        s.$search.attr("aria-controls", i), s.$search.trigger("focus");
      }), t.on("close", function () {
        s.$search.val(""), s.resizeSearch(), s.$search.removeAttr("aria-controls"), s.$search.removeAttr("aria-activedescendant"), s.$search.trigger("focus");
      }), t.on("enable", function () {
        s.$search.prop("disabled", false), s._transferTabIndex();
      }), t.on("disable", function () {
        s.$search.prop("disabled", true);
      }), t.on("focus", function (e) {
        s.$search.trigger("focus");
      }), t.on("results:focus", function (e) {
        e.data._resultId ? s.$search.attr("aria-activedescendant", e.data._resultId) : s.$search.removeAttr("aria-activedescendant");
      }), this.$selection.on("focusin", ".select2-search--inline", function (e) {
        s.trigger("focus", e);
      }), this.$selection.on("focusout", ".select2-search--inline", function (e) {
        s._handleBlur(e);
      }), this.$selection.on("keydown", ".select2-search--inline", function (e) {
        var t;
        e.stopPropagation(), s.trigger("keypress", e), s._keyUpPrevented = e.isDefaultPrevented(), e.which !== l.BACKSPACE || "" !== s.$search.val() || 0 < (t = s.$selection.find(".select2-selection__choice").last()).length && (t = a.GetData(t[0], "data"), s.searchRemoveChoice(t), e.preventDefault());
      }), this.$selection.on("click", ".select2-search--inline", function (e) {
        s.$search.val() && e.stopPropagation();
      });
      var t = document.documentMode, r = t && t <= 11;
      this.$selection.on("input.searchcheck", ".select2-search--inline", function (e) {
        r ? s.$selection.off("input.search input.searchcheck") : s.$selection.off("keyup.search");
      }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (e) {
        var t;
        r && "input" === e.type ? s.$selection.off("input.search input.searchcheck") : (t = e.which) != l.SHIFT && t != l.CTRL && t != l.ALT && t != l.TAB && s.handleSearch(e);
      });
    }, e.prototype._transferTabIndex = function (e) {
      this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
    }, e.prototype.createPlaceholder = function (e, t) {
      this.$search.attr("placeholder", t.text);
    }, e.prototype.update = function (e, t) {
      var n = this.$search[0] == document.activeElement;
      this.$search.attr("placeholder", ""), e.call(this, t), this.resizeSearch(), n && this.$search.trigger("focus");
    }, e.prototype.handleSearch = function () {
      var e;
      this.resizeSearch(), this._keyUpPrevented || (e = this.$search.val(), this.trigger("query", {term: e})), this._keyUpPrevented = false;
    }, e.prototype.searchRemoveChoice = function (e, t) {
      this.trigger("unselect", {data: t}), this.$search.val(t.text), this.handleSearch();
    }, e.prototype.resizeSearch = function () {
      this.$search.css("width", "25px");
      var e = "100%";
      "" === this.$search.attr("placeholder") && (e = 0.75 * (this.$search.val().length + 1) + "em"), this.$search.css("width", e);
    }, e;
  }), u.define("select2/selection/selectionCss", ["../utils"], function (n) {
    function e() {}
    return e.prototype.render = function (e) {
      var t = e.call(this), e = this.options.get("selectionCssClass") || "";
      return -1 !== e.indexOf(":all:") && (e = e.replace(":all:", ""), n.copyNonInternalCssClasses(t[0], this.$element[0])), t.addClass(e), t;
    }, e;
  }), u.define("select2/selection/eventRelay", ["jquery"], function (r) {
    function e() {}
    return e.prototype.bind = function (e, t, n) {
      var s = this, i = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"], o = ["opening", "closing", "selecting", "unselecting", "clearing"];
      e.call(this, t, n), t.on("*", function (e, t) {
        var n;
        -1 !== i.indexOf(e) && (t = t || {}, n = r.Event("select2:" + e, {params: t}), s.$element.trigger(n), -1 !== o.indexOf(e) && (t.prevented = n.isDefaultPrevented()));
      });
    }, e;
  }), u.define("select2/translation", ["jquery", "require"], function (t, n) {
    function s(e) {
      this.dict = e || {};
    }
    return s.prototype.all = function () {
      return this.dict;
    }, s.prototype.get = function (e) {
      return this.dict[e];
    }, s.prototype.extend = function (e) {
      this.dict = t.extend({}, e.all(), this.dict);
    }, s._cache = {}, s.loadPath = function (e) {
      var t;
      return e in s._cache || (t = n(e), s._cache[e] = t), new s(s._cache[e]);
    }, s;
  }), u.define("select2/diacritics", [], function () {
    return {"â’¶": "A", "ï¼¡": "A", "Ã€": "A", "Ã": "A", "Ã‚": "A", "áº¦": "A", "áº¤": "A", áºª: "A", "áº¨": "A", Ãƒ: "A", "Ä€": "A", "Ä‚": "A", "áº°": "A", "áº®": "A", "áº´": "A", "áº²": "A", "È¦": "A", "Ç ": "A", "Ã„": "A", Çž: "A", "áº¢": "A", "Ã…": "A", Çº: "A", "Ç": "A", "È€": "A", "È‚": "A", "áº ": "A", "áº¬": "A", "áº¶": "A", "á¸€": "A", "Ä„": "A", Èº: "A", "â±¯": "A", "êœ²": "AA", "Ã†": "AE", "Ç¼": "AE", "Ç¢": "AE", "êœ´": "AO", "êœ¶": "AU", "êœ¸": "AV", êœº: "AV", "êœ¼": "AY", "â’·": "B", "ï¼¢": "B", "á¸‚": "B", "á¸„": "B", "á¸†": "B", Éƒ: "B", "Æ‚": "B", "Æ": "B", "â’¸": "C", "ï¼£": "C", "Ä†": "C", Äˆ: "C", ÄŠ: "C", ÄŒ: "C", "Ã‡": "C", "á¸ˆ": "C", "Æ‡": "C", "È»": "C", "êœ¾": "C", "â’¹": "D", "ï¼¤": "D", "á¸Š": "D", ÄŽ: "D", "á¸Œ": "D", "á¸": "D", "á¸’": "D", "á¸Ž": "D", "Ä": "D", "Æ‹": "D", ÆŠ: "D", "Æ‰": "D", "ê¹": "D", "Ç±": "DZ", "Ç„": "DZ", "Ç²": "Dz", "Ç…": "Dz", "â’º": "E", "ï¼¥": "E", Ãˆ: "E", "Ã‰": "E", ÃŠ: "E", "á»€": "E", "áº¾": "E", "á»„": "E", "á»‚": "E", "áº¼": "E", "Ä’": "E", "á¸”": "E", "á¸–": "E", "Ä”": "E", "Ä–": "E", "Ã‹": "E", áºº: "E", Äš: "E", "È„": "E", "È†": "E", "áº¸": "E", "á»†": "E", "È¨": "E", "á¸œ": "E", "Ä˜": "E", "á¸˜": "E", "á¸š": "E", "Æ": "E", ÆŽ: "E", "â’»": "F", "ï¼¦": "F", "á¸ž": "F", "Æ‘": "F", "ê»": "F", "â’¼": "G", "ï¼§": "G", "Ç´": "G", Äœ: "G", "á¸ ": "G", Äž: "G", "Ä ": "G", "Ç¦": "G", "Ä¢": "G", "Ç¤": "G", "Æ“": "G", "êž ": "G", "ê½": "G", "ê¾": "G", "â’½": "H", "ï¼¨": "H", "Ä¤": "H", "á¸¢": "H", "á¸¦": "H", Èž: "H", "á¸¤": "H", "á¸¨": "H", "á¸ª": "H", "Ä¦": "H", "â±§": "H", "â±µ": "H", "êž": "H", "â’¾": "I", "ï¼©": "I", ÃŒ: "I", "Ã": "I", ÃŽ: "I", "Ä¨": "I", Äª: "I", "Ä¬": "I", "Ä°": "I", "Ã": "I", "á¸®": "I", "á»ˆ": "I", "Ç": "I", Èˆ: "I", ÈŠ: "I", "á»Š": "I", "Ä®": "I", "á¸¬": "I", "Æ—": "I", "â’¿": "J", "ï¼ª": "J", "Ä´": "J", Éˆ: "J", "â“€": "K", "ï¼«": "K", "á¸°": "K", "Ç¨": "K", "á¸²": "K", "Ä¶": "K", "á¸´": "K", "Æ˜": "K", "â±©": "K", "ê€": "K", "ê‚": "K", "ê„": "K", "êž¢": "K", "â“": "L", "ï¼¬": "L", "Ä¿": "L", "Ä¹": "L", "Ä½": "L", "á¸¶": "L", "á¸¸": "L", "Ä»": "L", "á¸¼": "L", "á¸º": "L", "Å": "L", "È½": "L", "â±¢": "L", "â± ": "L", "êˆ": "L", "ê†": "L", "êž€": "L", "Ç‡": "LJ", Çˆ: "Lj", "â“‚": "M", "ï¼­": "M", "á¸¾": "M", "á¹€": "M", "á¹‚": "M", "â±®": "M", Æœ: "M", "â“ƒ": "N", "ï¼®": "N", "Ç¸": "N", Åƒ: "N", "Ã‘": "N", "á¹„": "N", "Å‡": "N", "á¹†": "N", "Å…": "N", "á¹Š": "N", "á¹ˆ": "N", "È ": "N", "Æ": "N", "êž": "N", "êž¤": "N", ÇŠ: "NJ", "Ç‹": "Nj", "â“„": "O", "ï¼¯": "O", "Ã’": "O", "Ã“": "O", "Ã”": "O", "á»’": "O", "á»": "O", "á»–": "O", "á»”": "O", "Ã•": "O", "á¹Œ": "O", "È¬": "O", "á¹Ž": "O", ÅŒ: "O", "á¹": "O", "á¹’": "O", ÅŽ: "O", "È®": "O", "È°": "O", "Ã–": "O", Èª: "O", "á»Ž": "O", "Å": "O", "Ç‘": "O", ÈŒ: "O", ÈŽ: "O", "Æ ": "O", "á»œ": "O", "á»š": "O", "á» ": "O", "á»ž": "O", "á»¢": "O", "á»Œ": "O", "á»˜": "O", Çª: "O", "Ç¬": "O", "Ã˜": "O", "Ç¾": "O", "Æ†": "O", ÆŸ: "O", "êŠ": "O", "êŒ": "O", "Å’": "OE", "Æ¢": "OI", "êŽ": "OO", "È¢": "OU", "â“…": "P", "ï¼°": "P", "á¹”": "P", "á¹–": "P", "Æ¤": "P", "â±£": "P", "ê": "P", "ê’": "P", "ê”": "P", "â“†": "Q", "ï¼±": "Q", "ê–": "Q", "ê˜": "Q", ÉŠ: "Q", "â“‡": "R", "ï¼²": "R", "Å”": "R", "á¹˜": "R", "Å˜": "R", "È": "R", "È’": "R", "á¹š": "R", "á¹œ": "R", "Å–": "R", "á¹ž": "R", ÉŒ: "R", "â±¤": "R", "êš": "R", "êž¦": "R", "êž‚": "R", "â“ˆ": "S", "ï¼³": "S", áºž: "S", Åš: "S", "á¹¤": "S", Åœ: "S", "á¹ ": "S", "Å ": "S", "á¹¦": "S", "á¹¢": "S", "á¹¨": "S", "È˜": "S", Åž: "S", "â±¾": "S", "êž¨": "S", "êž„": "S", "â“‰": "T", "ï¼´": "T", "á¹ª": "T", "Å¤": "T", "á¹¬": "T", Èš: "T", "Å¢": "T", "á¹°": "T", "á¹®": "T", "Å¦": "T", "Æ¬": "T", "Æ®": "T", "È¾": "T", "êž†": "T", "êœ¨": "TZ", "â“Š": "U", "ï¼µ": "U", "Ã™": "U", Ãš: "U", "Ã›": "U", "Å¨": "U", "á¹¸": "U", Åª: "U", "á¹º": "U", "Å¬": "U", Ãœ: "U", "Ç›": "U", "Ç—": "U", "Ç•": "U", "Ç™": "U", "á»¦": "U", "Å®": "U", "Å°": "U", "Ç“": "U", "È”": "U", "È–": "U", "Æ¯": "U", "á»ª": "U", "á»¨": "U", "á»®": "U", "á»¬": "U", "á»°": "U", "á»¤": "U", "á¹²": "U", "Å²": "U", "á¹¶": "U", "á¹´": "U", "É„": "U", "â“‹": "V", "ï¼¶": "V", "á¹¼": "V", "á¹¾": "V", "Æ²": "V", "êž": "V", "É…": "V", "ê ": "VY", "â“Œ": "W", "ï¼·": "W", "áº€": "W", "áº‚": "W", "Å´": "W", "áº†": "W", "áº„": "W", áºˆ: "W", "â±²": "W", "â“": "X", "ï¼¸": "X", áºŠ: "X", áºŒ: "X", "â“Ž": "Y", "ï¼¹": "Y", "á»²": "Y", "Ã": "Y", "Å¶": "Y", "á»¸": "Y", "È²": "Y", áºŽ: "Y", "Å¸": "Y", "á»¶": "Y", "á»´": "Y", "Æ³": "Y", ÉŽ: "Y", "á»¾": "Y", "â“": "Z", "ï¼º": "Z", "Å¹": "Z", "áº": "Z", "Å»": "Z", "Å½": "Z", "áº’": "Z", "áº”": "Z", Æµ: "Z", "È¤": "Z", "â±¿": "Z", "â±«": "Z", "ê¢": "Z", "â“": "a", "ï½": "a", áºš: "a", "Ã ": "a", "Ã¡": "a", "Ã¢": "a", "áº§": "a", "áº¥": "a", "áº«": "a", "áº©": "a", "Ã£": "a", "Ä": "a", Äƒ: "a", "áº±": "a", "áº¯": "a", áºµ: "a", "áº³": "a", "È§": "a", "Ç¡": "a", "Ã¤": "a", ÇŸ: "a", "áº£": "a", "Ã¥": "a", "Ç»": "a", ÇŽ: "a", "È": "a", Èƒ: "a", "áº¡": "a", "áº­": "a", áº·: "a", "á¸": "a", "Ä…": "a", "â±¥": "a", "É": "a", "êœ³": "aa", "Ã¦": "ae", "Ç½": "ae", "Ç£": "ae", êœµ: "ao", êœ·: "au", "êœ¹": "av", "êœ»": "av", "êœ½": "ay", "â“‘": "b", "ï½‚": "b", "á¸ƒ": "b", "á¸…": "b", "á¸‡": "b", "Æ€": "b", Æƒ: "b", "É“": "b", "â“’": "c", "ï½ƒ": "c", "Ä‡": "c", "Ä‰": "c", "Ä‹": "c", "Ä": "c", "Ã§": "c", "á¸‰": "c", Æˆ: "c", "È¼": "c", "êœ¿": "c", "â†„": "c", "â““": "d", "ï½„": "d", "á¸‹": "d", "Ä": "d", "á¸": "d", "á¸‘": "d", "á¸“": "d", "á¸": "d", "Ä‘": "d", ÆŒ: "d", "É–": "d", "É—": "d", "êº": "d", "Ç³": "dz", "Ç†": "dz", "â“”": "e", "ï½…": "e", "Ã¨": "e", "Ã©": "e", Ãª: "e", "á»": "e", "áº¿": "e", "á»…": "e", "á»ƒ": "e", "áº½": "e", "Ä“": "e", "á¸•": "e", "á¸—": "e", "Ä•": "e", "Ä—": "e", "Ã«": "e", "áº»": "e", "Ä›": "e", "È…": "e", "È‡": "e", "áº¹": "e", "á»‡": "e", "È©": "e", "á¸": "e", "Ä™": "e", "á¸™": "e", "á¸›": "e", "É‡": "e", "É›": "e", "Ç": "e", "â“•": "f", "ï½†": "f", "á¸Ÿ": "f", "Æ’": "f", "ê¼": "f", "â“–": "g", "ï½‡": "g", Çµ: "g", "Ä": "g", "á¸¡": "g", ÄŸ: "g", "Ä¡": "g", "Ç§": "g", "Ä£": "g", "Ç¥": "g", "É ": "g", "êž¡": "g", "áµ¹": "g", "ê¿": "g", "â“—": "h", "ï½ˆ": "h", "Ä¥": "h", "á¸£": "h", "á¸§": "h", ÈŸ: "h", "á¸¥": "h", "á¸©": "h", "á¸«": "h", "áº–": "h", "Ä§": "h", "â±¨": "h", "â±¶": "h", "É¥": "h", "Æ•": "hv", "â“˜": "i", "ï½‰": "i", "Ã¬": "i", "Ã­": "i", "Ã®": "i", "Ä©": "i", "Ä«": "i", "Ä­": "i", "Ã¯": "i", "á¸¯": "i", "á»‰": "i", "Ç": "i", "È‰": "i", "È‹": "i", "á»‹": "i", "Ä¯": "i", "á¸­": "i", "É¨": "i", "Ä±": "i", "â“™": "j", "ï½Š": "j", Äµ: "j", "Ç°": "j", "É‰": "j", "â“š": "k", "ï½‹": "k", "á¸±": "k", "Ç©": "k", "á¸³": "k", Ä·: "k", "á¸µ": "k", "Æ™": "k", "â±ª": "k", "ê": "k", "êƒ": "k", "ê…": "k", "êž£": "k", "â“›": "l", "ï½Œ": "l", "Å€": "l", Äº: "l", "Ä¾": "l", "á¸·": "l", "á¸¹": "l", "Ä¼": "l", "á¸½": "l", "á¸»": "l", "Å¿": "l", "Å‚": "l", Æš: "l", "É«": "l", "â±¡": "l", "ê‰": "l", "êž": "l", "ê‡": "l", "Ç‰": "lj", "â“œ": "m", "ï½": "m", "á¸¿": "m", "á¹": "m", "á¹ƒ": "m", "É±": "m", "É¯": "m", "â“": "n", "ï½Ž": "n", "Ç¹": "n", "Å„": "n", "Ã±": "n", "á¹…": "n", Åˆ: "n", "á¹‡": "n", "Å†": "n", "á¹‹": "n", "á¹‰": "n", Æž: "n", "É²": "n", "Å‰": "n", "êž‘": "n", "êž¥": "n", ÇŒ: "nj", "â“ž": "o", "ï½": "o", "Ã²": "o", "Ã³": "o", "Ã´": "o", "á»“": "o", "á»‘": "o", "á»—": "o", "á»•": "o", Ãµ: "o", "á¹": "o", "È­": "o", "á¹": "o", "Å": "o", "á¹‘": "o", "á¹“": "o", "Å": "o", "È¯": "o", "È±": "o", "Ã¶": "o", "È«": "o", "á»": "o", "Å‘": "o", "Ç’": "o", "È": "o", "È": "o", "Æ¡": "o", "á»": "o", "á»›": "o", "á»¡": "o", "á»Ÿ": "o", "á»£": "o", "á»": "o", "á»™": "o", "Ç«": "o", "Ç­": "o", "Ã¸": "o", "Ç¿": "o", "É”": "o", "ê‹": "o", "ê": "o", Éµ: "o", "Å“": "oe", "Æ£": "oi", "È£": "ou", "ê": "oo", "â“Ÿ": "p", "ï½": "p", "á¹•": "p", "á¹—": "p", "Æ¥": "p", "áµ½": "p", "ê‘": "p", "ê“": "p", "ê•": "p", "â“ ": "q", "ï½‘": "q", "É‹": "q", "ê—": "q", "ê™": "q", "â“¡": "r", "ï½’": "r", "Å•": "r", "á¹™": "r", "Å™": "r", "È‘": "r", "È“": "r", "á¹›": "r", "á¹": "r", "Å—": "r", "á¹Ÿ": "r", "É": "r", "É½": "r", "ê›": "r", "êž§": "r", êžƒ: "r", "â“¢": "s", "ï½“": "s", ÃŸ: "s", "Å›": "s", "á¹¥": "s", "Å": "s", "á¹¡": "s", "Å¡": "s", "á¹§": "s", "á¹£": "s", "á¹©": "s", "È™": "s", ÅŸ: "s", "È¿": "s", "êž©": "s", "êž…": "s", "áº›": "s", "â“£": "t", "ï½”": "t", "á¹«": "t", "áº—": "t", "Å¥": "t", "á¹­": "t", "È›": "t", "Å£": "t", "á¹±": "t", "á¹¯": "t", "Å§": "t", "Æ­": "t", Êˆ: "t", "â±¦": "t", "êž‡": "t", "êœ©": "tz", "â“¤": "u", "ï½•": "u", "Ã¹": "u", Ãº: "u", "Ã»": "u", "Å©": "u", "á¹¹": "u", "Å«": "u", "á¹»": "u", "Å­": "u", "Ã¼": "u", Çœ: "u", "Ç˜": "u", "Ç–": "u", Çš: "u", "á»§": "u", "Å¯": "u", "Å±": "u", "Ç”": "u", "È•": "u", "È—": "u", "Æ°": "u", "á»«": "u", "á»©": "u", "á»¯": "u", "á»­": "u", "á»±": "u", "á»¥": "u", "á¹³": "u", "Å³": "u", "á¹·": "u", "á¹µ": "u", "Ê‰": "u", "â“¥": "v", "ï½–": "v", "á¹½": "v", "á¹¿": "v", "Ê‹": "v", "êŸ": "v", ÊŒ: "v", "ê¡": "vy", "â“¦": "w", "ï½—": "w", "áº": "w", áºƒ: "w", Åµ: "w", "áº‡": "w", "áº…": "w", "áº˜": "w", "áº‰": "w", "â±³": "w", "â“§": "x", "ï½˜": "x", "áº‹": "x", "áº": "x", "â“¨": "y", "ï½™": "y", "á»³": "y", "Ã½": "y", Å·: "y", "á»¹": "y", "È³": "y", "áº": "y", "Ã¿": "y", "á»·": "y", "áº™": "y", "á»µ": "y", "Æ´": "y", "É": "y", "á»¿": "y", "â“©": "z", "ï½š": "z", Åº: "z", "áº‘": "z", "Å¼": "z", "Å¾": "z", "áº“": "z", "áº•": "z", "Æ¶": "z", "È¥": "z", "É€": "z", "â±¬": "z", "ê£": "z", "Î†": "Î‘", Îˆ: "Î•", "Î‰": "Î—", ÎŠ: "Î™", Îª: "Î™", ÎŒ: "ÎŸ", ÎŽ: "Î¥", "Î«": "Î¥", "Î": "Î©", "Î¬": "Î±", "Î­": "Îµ", "Î®": "Î·", "Î¯": "Î¹", ÏŠ: "Î¹", "Î": "Î¹", ÏŒ: "Î¿", "Ï": "Ï…", "Ï‹": "Ï…", "Î°": "Ï…", ÏŽ: "Ï‰", "Ï‚": "Ïƒ", "â€™": "'"};
  }), u.define("select2/data/base", ["../utils"], function (n) {
    function s(e, t) {
      s.__super__.constructor.call(this);
    }
    return n.Extend(s, n.Observable), s.prototype.current = function (e) {
      throw new Error("The `current` method must be defined in child classes.");
    }, s.prototype.query = function (e, t) {
      throw new Error("The `query` method must be defined in child classes.");
    }, s.prototype.bind = function (e, t) {}, s.prototype.destroy = function () {}, s.prototype.generateResultId = function (e, t) {
      e = e.id + "-result-";
      return e += n.generateChars(4), null != t.id ? e += "-" + t.id.toString() : e += "-" + n.generateChars(4), e;
    }, s;
  }), u.define("select2/data/select", ["./base", "../utils", "jquery"], function (e, a, l) {
    function n(e, t) {
      this.$element = e, this.options = t, n.__super__.constructor.call(this);
    }
    return a.Extend(n, e), n.prototype.current = function (e) {
      var t = this;
      e(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"), function (e) {
        return t.item(l(e));
      }));
    }, n.prototype.select = function (i) {
      var e, o = this;
      if (i.selected = true, null != i.element && "option" === i.element.tagName.toLowerCase()) return i.element.selected = true, void this.$element.trigger("input").trigger("change");
      this.$element.prop("multiple") ? this.current(function (e) {
        var t = [];
        (i = [i]).push.apply(i, e);
        for (var n = 0; n < i.length; n++) {
          var s = i[n].id;
          -1 === t.indexOf(s) && t.push(s);
        }
        o.$element.val(t), o.$element.trigger("input").trigger("change");
      }) : (e = i.id, this.$element.val(e), this.$element.trigger("input").trigger("change"));
    }, n.prototype.unselect = function (i) {
      var o = this;
      if (this.$element.prop("multiple")) {
        if (i.selected = false, null != i.element && "option" === i.element.tagName.toLowerCase()) return i.element.selected = false, void this.$element.trigger("input").trigger("change");
        this.current(function (e) {
          for (var t = [], n = 0; n < e.length; n++) {
            var s = e[n].id;
            s !== i.id && -1 === t.indexOf(s) && t.push(s);
          }
          o.$element.val(t), o.$element.trigger("input").trigger("change");
        });
      }
    }, n.prototype.bind = function (e, t) {
      var n = this;
      (this.container = e).on("select", function (e) {
        n.select(e.data);
      }), e.on("unselect", function (e) {
        n.unselect(e.data);
      });
    }, n.prototype.destroy = function () {
      this.$element.find("*").each(function () {
        a.RemoveData(this);
      });
    }, n.prototype.query = function (t, e) {
      var n = [], s = this;
      this.$element.children().each(function () {
        var e;
        "option" !== this.tagName.toLowerCase() && "optgroup" !== this.tagName.toLowerCase() || (e = l(this), e = s.item(e), null !== (e = s.matches(t, e)) && n.push(e));
      }), e({results: n});
    }, n.prototype.addOptions = function (e) {
      this.$element.append(e);
    }, n.prototype.option = function (e) {
      var t;
      e.children ? (t = document.createElement("optgroup")).label = e.text : void 0 !== (t = document.createElement("option")).textContent ? t.textContent = e.text : t.innerText = e.text, void 0 !== e.id && (t.value = e.id), e.disabled && (t.disabled = true), e.selected && (t.selected = true), e.title && (t.title = e.title);
      e = this._normalizeItem(e);
      return e.element = t, a.StoreData(t, "data", e), l(t);
    }, n.prototype.item = function (e) {
      var t = {};
      if (null != (t = a.GetData(e[0], "data"))) return t;
      var n = e[0];
      if ("option" === n.tagName.toLowerCase()) t = {id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title")}; else if ("optgroup" === n.tagName.toLowerCase()) {
        t = {text: e.prop("label"), children: [], title: e.prop("title")};
        for (var s = e.children("option"), i = [], o = 0; o < s.length; o++) {
          var r = l(s[o]), r = this.item(r);
          i.push(r);
        }
        t.children = i;
      }
      return (t = this._normalizeItem(t)).element = e[0], a.StoreData(e[0], "data", t), t;
    }, n.prototype._normalizeItem = function (e) {
      e !== Object(e) && (e = {id: e, text: e});
      return null != (e = l.extend({}, {text: ""}, e)).id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), l.extend({}, {selected: false, disabled: false}, e);
    }, n.prototype.matches = function (e, t) {
      return this.options.get("matcher")(e, t);
    }, n;
  }), u.define("select2/data/array", ["./select", "../utils", "jquery"], function (e, t, c) {
    function s(e, t) {
      this._dataToConvert = t.get("data") || [], s.__super__.constructor.call(this, e, t);
    }
    return t.Extend(s, e), s.prototype.bind = function (e, t) {
      s.__super__.bind.call(this, e, t), this.addOptions(this.convertToOptions(this._dataToConvert));
    }, s.prototype.select = function (n) {
      var e = this.$element.find("option").filter(function (e, t) {
        return t.value == n.id.toString();
      });
      0 === e.length && (e = this.option(n), this.addOptions(e)), s.__super__.select.call(this, n);
    }, s.prototype.convertToOptions = function (e) {
      var t = this, n = this.$element.find("option"), s = n.map(function () {
        return t.item(c(this)).id;
      }).get(), i = [];
      for (var o = 0; o < e.length; o++) {
        var r, a, l = this._normalizeItem(e[o]);
        0 <= s.indexOf(l.id) ? (r = n.filter(function (e) {
          return function () {
            return c(this).val() == e.id;
          };
        }(l)), a = this.item(r), a = c.extend(true, {}, l, a), a = this.option(a), r.replaceWith(a)) : (a = this.option(l), l.children && (l = this.convertToOptions(l.children), a.append(l)), i.push(a));
      }
      return i;
    }, s;
  }), u.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (e, t, o) {
    function n(e, t) {
      this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), n.__super__.constructor.call(this, e, t);
    }
    return t.Extend(n, e), n.prototype._applyDefaults = function (e) {
      var t = {data: function (e) {
        return o.extend({}, e, {q: e.term});
      }, transport: function (e, t, n) {
        e = o.ajax(e);
        return e.then(t), e.fail(n), e;
      }};
      return o.extend({}, t, e, true);
    }, n.prototype.processResults = function (e) {
      return e;
    }, n.prototype.query = function (t, n) {
      var s = this;
      null != this._request && ("function" == typeof this._request.abort && this._request.abort(), this._request = null);
      var i = o.extend({type: "GET"}, this.ajaxOptions);
      function e() {
        var e = i.transport(i, function (e) {
          e = s.processResults(e, t);
          s.options.get("debug") && window.console && console.error && (e && e.results && Array.isArray(e.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), n(e);
        }, function () {
          "status" in e && (0 === e.status || "0" === e.status) || s.trigger("results:message", {message: "errorLoading"});
        });
        s._request = e;
      }
      "function" == typeof i.url && (i.url = i.url.call(this.$element, t)), "function" == typeof i.data && (i.data = i.data.call(this.$element, t)), this.ajaxOptions.delay && null != t.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(e, this.ajaxOptions.delay)) : e();
    }, n;
  }), u.define("select2/data/tags", ["jquery"], function (t) {
    function e(e, t, n) {
      var s = n.get("tags"), i = n.get("createTag");
      void 0 !== i && (this.createTag = i);
      i = n.get("insertTag");
      if (void 0 !== i && (this.insertTag = i), e.call(this, t, n), Array.isArray(s)) for (var o = 0; o < s.length; o++) {
        var r = s[o], r = this._normalizeItem(r), r = this.option(r);
        this.$element.append(r);
      }
    }
    return e.prototype.query = function (e, c, u) {
      var d = this;
      this._removeOldTags(), null != c.term && null == c.page ? e.call(this, c, function e(t, n) {
        for (var s = t.results, i = 0; i < s.length; i++) {
          var o = s[i], r = null != o.children && !e({results: o.children}, true);
          if ((o.text || "").toUpperCase() === (c.term || "").toUpperCase() || r) return !n && (t.data = s, void u(t));
        }
        if (n) return true;
        var a, l = d.createTag(c);
        null != l && ((a = d.option(l)).attr("data-select2-tag", "true"), d.addOptions([a]), d.insertTag(s, l)), t.results = s, u(t);
      }) : e.call(this, c, u);
    }, e.prototype.createTag = function (e, t) {
      if (null == t.term) return null;
      t = t.term.trim();
      return "" === t ? null : {id: t, text: t};
    }, e.prototype.insertTag = function (e, t, n) {
      t.unshift(n);
    }, e.prototype._removeOldTags = function (e) {
      this.$element.find("option[data-select2-tag]").each(function () {
        this.selected || t(this).remove();
      });
    }, e;
  }), u.define("select2/data/tokenizer", ["jquery"], function (c) {
    function e(e, t, n) {
      var s = n.get("tokenizer");
      void 0 !== s && (this.tokenizer = s), e.call(this, t, n);
    }
    return e.prototype.bind = function (e, t, n) {
      e.call(this, t, n), this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field");
    }, e.prototype.query = function (e, t, n) {
      var s = this;
      t.term = t.term || "";
      var i = this.tokenizer(t, this.options, function (e) {
        var t, n = s._normalizeItem(e);
        s.$element.find("option").filter(function () {
          return c(this).val() === n.id;
        }).length || ((t = s.option(n)).attr("data-select2-tag", true), s._removeOldTags(), s.addOptions([t])), t = n, s.trigger("select", {data: t});
      });
      i.term !== t.term && (this.$search.length && (this.$search.val(i.term), this.$search.trigger("focus")), t.term = i.term), e.call(this, t, n);
    }, e.prototype.tokenizer = function (e, t, n, s) {
      for (var i = n.get("tokenSeparators") || [], o = t.term, r = 0, a = this.createTag || function (e) {
        return {id: e.term, text: e.term};
      }; r < o.length;) {
        var l = o[r];
        -1 !== i.indexOf(l) ? (l = o.substr(0, r), null != (l = a(c.extend({}, t, {term: l}))) ? (s(l), o = o.substr(r + 1) || "", r = 0) : r++) : r++;
      }
      return {term: o};
    }, e;
  }), u.define("select2/data/minimumInputLength", [], function () {
    function e(e, t, n) {
      this.minimumInputLength = n.get("minimumInputLength"), e.call(this, t, n);
    }
    return e.prototype.query = function (e, t, n) {
      t.term = t.term || "", t.term.length < this.minimumInputLength ? this.trigger("results:message", {message: "inputTooShort", args: {minimum: this.minimumInputLength, input: t.term, params: t}}) : e.call(this, t, n);
    }, e;
  }), u.define("select2/data/maximumInputLength", [], function () {
    function e(e, t, n) {
      this.maximumInputLength = n.get("maximumInputLength"), e.call(this, t, n);
    }
    return e.prototype.query = function (e, t, n) {
      t.term = t.term || "", 0 < this.maximumInputLength && t.term.length > this.maximumInputLength ? this.trigger("results:message", {message: "inputTooLong", args: {maximum: this.maximumInputLength, input: t.term, params: t}}) : e.call(this, t, n);
    }, e;
  }), u.define("select2/data/maximumSelectionLength", [], function () {
    function e(e, t, n) {
      this.maximumSelectionLength = n.get("maximumSelectionLength"), e.call(this, t, n);
    }
    return e.prototype.bind = function (e, t, n) {
      var s = this;
      e.call(this, t, n), t.on("select", function () {
        s._checkIfMaximumSelected();
      });
    }, e.prototype.query = function (e, t, n) {
      var s = this;
      this._checkIfMaximumSelected(function () {
        e.call(s, t, n);
      });
    }, e.prototype._checkIfMaximumSelected = function (e, t) {
      var n = this;
      this.current(function (e) {
        e = null != e ? e.length : 0;
        0 < n.maximumSelectionLength && e >= n.maximumSelectionLength ? n.trigger("results:message", {message: "maximumSelected", args: {maximum: n.maximumSelectionLength}}) : t && t();
      });
    }, e;
  }), u.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
    function n(e, t) {
      this.$element = e, this.options = t, n.__super__.constructor.call(this);
    }
    return e.Extend(n, e.Observable), n.prototype.render = function () {
      var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>');
      return e.attr("dir", this.options.get("dir")), this.$dropdown = e;
    }, n.prototype.bind = function () {}, n.prototype.position = function (e, t) {}, n.prototype.destroy = function () {
      this.$dropdown.remove();
    }, n;
  }), u.define("select2/dropdown/search", ["jquery"], function (o) {
    function e() {}
    return e.prototype.render = function (e) {
      var t = e.call(this), n = this.options.get("translations").get("search"), e = o('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
      return this.$searchContainer = e, this.$search = e.find("input"), this.$search.prop("autocomplete", this.options.get("autocomplete")), this.$search.attr("aria-label", n()), t.prepend(e), t;
    }, e.prototype.bind = function (e, t, n) {
      var s = this, i = t.id + "-results";
      e.call(this, t, n), this.$search.on("keydown", function (e) {
        s.trigger("keypress", e), s._keyUpPrevented = e.isDefaultPrevented();
      }), this.$search.on("input", function (e) {
        o(this).off("keyup");
      }), this.$search.on("keyup input", function (e) {
        s.handleSearch(e);
      }), t.on("open", function () {
        s.$search.attr("tabindex", 0), s.$search.attr("aria-controls", i), s.$search.trigger("focus"), window.setTimeout(function () {
          s.$search.trigger("focus");
        }, 0);
      }), t.on("close", function () {
        s.$search.attr("tabindex", -1), s.$search.removeAttr("aria-controls"), s.$search.removeAttr("aria-activedescendant"), s.$search.val(""), s.$search.trigger("blur");
      }), t.on("focus", function () {
        t.isOpen() || s.$search.trigger("focus");
      }), t.on("results:all", function (e) {
        null != e.query.term && "" !== e.query.term || (s.showSearch(e) ? s.$searchContainer[0].classList.remove("select2-search--hide") : s.$searchContainer[0].classList.add("select2-search--hide"));
      }), t.on("results:focus", function (e) {
        e.data._resultId ? s.$search.attr("aria-activedescendant", e.data._resultId) : s.$search.removeAttr("aria-activedescendant");
      });
    }, e.prototype.handleSearch = function (e) {
      var t;
      this._keyUpPrevented || (t = this.$search.val(), this.trigger("query", {term: t})), this._keyUpPrevented = false;
    }, e.prototype.showSearch = function (e, t) {
      return true;
    }, e;
  }), u.define("select2/dropdown/hidePlaceholder", [], function () {
    function e(e, t, n, s) {
      this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n, s);
    }
    return e.prototype.append = function (e, t) {
      t.results = this.removePlaceholder(t.results), e.call(this, t);
    }, e.prototype.normalizePlaceholder = function (e, t) {
      return "string" == typeof t && (t = {id: "", text: t}), t;
    }, e.prototype.removePlaceholder = function (e, t) {
      for (var n = t.slice(0), s = t.length - 1; 0 <= s; s--) {
        var i = t[s];
        this.placeholder.id === i.id && n.splice(s, 1);
      }
      return n;
    }, e;
  }), u.define("select2/dropdown/infiniteScroll", ["jquery"], function (n) {
    function e(e, t, n, s) {
      this.lastParams = {}, e.call(this, t, n, s), this.$loadingMore = this.createLoadingMore(), this.loading = false;
    }
    return e.prototype.append = function (e, t) {
      this.$loadingMore.remove(), this.loading = false, e.call(this, t), this.showLoadingMore(t) && (this.$results.append(this.$loadingMore), this.loadMoreIfNeeded());
    }, e.prototype.bind = function (e, t, n) {
      var s = this;
      e.call(this, t, n), t.on("query", function (e) {
        s.lastParams = e, s.loading = true;
      }), t.on("query:append", function (e) {
        s.lastParams = e, s.loading = true;
      }), this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
    }, e.prototype.loadMoreIfNeeded = function () {
      var e = n.contains(document.documentElement, this.$loadingMore[0]);
      !this.loading && e && (e = this.$results.offset().top + this.$results.outerHeight(false), this.$loadingMore.offset().top + this.$loadingMore.outerHeight(false) <= e + 50 && this.loadMore());
    }, e.prototype.loadMore = function () {
      this.loading = true;
      var e = n.extend({}, {page: 1}, this.lastParams);
      e.page++, this.trigger("query:append", e);
    }, e.prototype.showLoadingMore = function (e, t) {
      return t.pagination && t.pagination.more;
    }, e.prototype.createLoadingMore = function () {
      var e = n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'), t = this.options.get("translations").get("loadingMore");
      return e.html(t(this.lastParams)), e;
    }, e;
  }), u.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (u, r) {
    function e(e, t, n) {
      this.$dropdownParent = u(n.get("dropdownParent") || document.body), e.call(this, t, n);
    }
    return e.prototype.bind = function (e, t, n) {
      var s = this;
      e.call(this, t, n), t.on("open", function () {
        s._showDropdown(), s._attachPositioningHandler(t), s._bindContainerResultHandlers(t);
      }), t.on("close", function () {
        s._hideDropdown(), s._detachPositioningHandler(t);
      }), this.$dropdownContainer.on("mousedown", function (e) {
        e.stopPropagation();
      });
    }, e.prototype.destroy = function (e) {
      e.call(this), this.$dropdownContainer.remove();
    }, e.prototype.position = function (e, t, n) {
      t.attr("class", n.attr("class")), t[0].classList.remove("select2"), t[0].classList.add("select2-container--open"), t.css({position: "absolute", top: -999999}), this.$container = n;
    }, e.prototype.render = function (e) {
      var t = u("<span></span>"), e = e.call(this);
      return t.append(e), this.$dropdownContainer = t;
    }, e.prototype._hideDropdown = function (e) {
      this.$dropdownContainer.detach();
    }, e.prototype._bindContainerResultHandlers = function (e, t) {
      var n;
      this._containerResultsHandlersBound || (n = this, t.on("results:all", function () {
        n._positionDropdown(), n._resizeDropdown();
      }), t.on("results:append", function () {
        n._positionDropdown(), n._resizeDropdown();
      }), t.on("results:message", function () {
        n._positionDropdown(), n._resizeDropdown();
      }), t.on("select", function () {
        n._positionDropdown(), n._resizeDropdown();
      }), t.on("unselect", function () {
        n._positionDropdown(), n._resizeDropdown();
      }), this._containerResultsHandlersBound = true);
    }, e.prototype._attachPositioningHandler = function (e, t) {
      var n = this, s = "scroll.select2." + t.id, i = "resize.select2." + t.id, o = "orientationchange.select2." + t.id, t = this.$container.parents().filter(r.hasScroll);
      t.each(function () {
        r.StoreData(this, "select2-scroll-position", {x: u(this).scrollLeft(), y: u(this).scrollTop()});
      }), t.on(s, function (e) {
        var t = r.GetData(this, "select2-scroll-position");
        u(this).scrollTop(t.y);
      }), u(window).on(s + " " + i + " " + o, function (e) {
        n._positionDropdown(), n._resizeDropdown();
      });
    }, e.prototype._detachPositioningHandler = function (e, t) {
      var n = "scroll.select2." + t.id, s = "resize.select2." + t.id, t = "orientationchange.select2." + t.id;
      this.$container.parents().filter(r.hasScroll).off(n), u(window).off(n + " " + s + " " + t);
    }, e.prototype._positionDropdown = function () {
      var e = u(window), t = this.$dropdown[0].classList.contains("select2-dropdown--above"), n = this.$dropdown[0].classList.contains("select2-dropdown--below"), s = null, i = this.$container.offset();
      i.bottom = i.top + this.$container.outerHeight(false);
      var o = {height: this.$container.outerHeight(false)};
      o.top = i.top, o.bottom = i.top + o.height;
      var r = this.$dropdown.outerHeight(false), a = e.scrollTop(), l = e.scrollTop() + e.height(), c = a < i.top - r, e = l > i.bottom + r, a = {left: i.left, top: o.bottom}, l = this.$dropdownParent;
      "static" === l.css("position") && (l = l.offsetParent());
      i = {top: 0, left: 0};
      (u.contains(document.body, l[0]) || l[0].isConnected) && (i = l.offset()), a.top -= i.top, a.left -= i.left, t || n || (s = "below"), e || !c || t ? !c && e && t && (s = "below") : s = "above", ("above" == s || t && "below" !== s) && (a.top = o.top - i.top - r), null != s && (this.$dropdown[0].classList.remove("select2-dropdown--below"), this.$dropdown[0].classList.remove("select2-dropdown--above"), this.$dropdown[0].classList.add("select2-dropdown--" + s), this.$container[0].classList.remove("select2-container--below"), this.$container[0].classList.remove("select2-container--above"), this.$container[0].classList.add("select2-container--" + s)), this.$dropdownContainer.css(a);
    }, e.prototype._resizeDropdown = function () {
      var e = {width: this.$container.outerWidth(false) + "px"};
      this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.position = "relative", e.width = "auto"), this.$dropdown.css(e);
    }, e.prototype._showDropdown = function (e) {
      this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
    }, e;
  }), u.define("select2/dropdown/minimumResultsForSearch", [], function () {
    function e(e, t, n, s) {
      this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = Infinity), e.call(this, t, n, s);
    }
    return e.prototype.showSearch = function (e, t) {
      return !(function e(t) {
        for (var n = 0, s = 0; s < t.length; s++) {
          var i = t[s];
          i.children ? n += e(i.children) : n++;
        }
        return n;
      }(t.data.results) < this.minimumResultsForSearch) && e.call(this, t);
    }, e;
  }), u.define("select2/dropdown/selectOnClose", ["../utils"], function (s) {
    function e() {}
    return e.prototype.bind = function (e, t, n) {
      var s = this;
      e.call(this, t, n), t.on("close", function (e) {
        s._handleSelectOnClose(e);
      });
    }, e.prototype._handleSelectOnClose = function (e, t) {
      if (t && null != t.originalSelect2Event) {
        var n = t.originalSelect2Event;
        if ("select" === n._type || "unselect" === n._type) return;
      }
      n = this.getHighlightedResults();
      n.length < 1 || (null != (n = s.GetData(n[0], "data")).element && n.element.selected || null == n.element && n.selected || this.trigger("select", {data: n}));
    }, e;
  }), u.define("select2/dropdown/closeOnSelect", [], function () {
    function e() {}
    return e.prototype.bind = function (e, t, n) {
      var s = this;
      e.call(this, t, n), t.on("select", function (e) {
        s._selectTriggered(e);
      }), t.on("unselect", function (e) {
        s._selectTriggered(e);
      });
    }, e.prototype._selectTriggered = function (e, t) {
      var n = t.originalEvent;
      n && (n.ctrlKey || n.metaKey) || this.trigger("close", {originalEvent: n, originalSelect2Event: t});
    }, e;
  }), u.define("select2/dropdown/dropdownCss", ["../utils"], function (n) {
    function e() {}
    return e.prototype.render = function (e) {
      var t = e.call(this), e = this.options.get("dropdownCssClass") || "";
      return -1 !== e.indexOf(":all:") && (e = e.replace(":all:", ""), n.copyNonInternalCssClasses(t[0], this.$element[0])), t.addClass(e), t;
    }, e;
  }), u.define("select2/dropdown/tagsSearchHighlight", ["../utils"], function (s) {
    function e() {}
    return e.prototype.highlightFirstItem = function (e) {
      var t = this.$results.find(".select2-results__option--selectable:not(.select2-results__option--selected)");
      if (0 < t.length) {
        var n = t.first(), t = s.GetData(n[0], "data").element;
        if (t && t.getAttribute && "true" === t.getAttribute("data-select2-tag")) return void n.trigger("mouseenter");
      }
      e.call(this);
    }, e;
  }), u.define("select2/i18n/en", [], function () {
    return {errorLoading: function () {
      return "The results could not be loaded.";
    }, inputTooLong: function (e) {
      var t = e.input.length - e.maximum, e = "Please delete " + t + " character";
      return 1 != t && (e += "s"), e;
    }, inputTooShort: function (e) {
      return "Please enter " + (e.minimum - e.input.length) + " or more characters";
    }, loadingMore: function () {
      return "Loading more resultsâ€¦";
    }, maximumSelected: function (e) {
      var t = "You can only select " + e.maximum + " item";
      return 1 != e.maximum && (t += "s"), t;
    }, noResults: function () {
      return "No results found";
    }, searching: function () {
      return "Searchingâ€¦";
    }, removeAllItems: function () {
      return "Remove all items";
    }, removeItem: function () {
      return "Remove item";
    }, search: function () {
      return "Search";
    }};
  }), u.define("select2/defaults", ["jquery", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/selectionCss", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./dropdown/dropdownCss", "./dropdown/tagsSearchHighlight", "./i18n/en"], function (l, o, r, a, c, u, d, p, h, f, g, t, m, v, y, _, b, w, $, x, A, D, S, O, L, E, C, T, q, I, e) {
    function n() {
      this.reset();
    }
    return n.prototype.apply = function (e) {
      var t;
      null == (e = l.extend(true, {}, this.defaults, e)).dataAdapter && (null != e.ajax ? e.dataAdapter = y : null != e.data ? e.dataAdapter = v : e.dataAdapter = m, 0 < e.minimumInputLength && (e.dataAdapter = f.Decorate(e.dataAdapter, w)), 0 < e.maximumInputLength && (e.dataAdapter = f.Decorate(e.dataAdapter, $)), 0 < e.maximumSelectionLength && (e.dataAdapter = f.Decorate(e.dataAdapter, x)), e.tags && (e.dataAdapter = f.Decorate(e.dataAdapter, _)), null == e.tokenSeparators && null == e.tokenizer || (e.dataAdapter = f.Decorate(e.dataAdapter, b))), null == e.resultsAdapter && (e.resultsAdapter = o, null != e.ajax && (e.resultsAdapter = f.Decorate(e.resultsAdapter, O)), null != e.placeholder && (e.resultsAdapter = f.Decorate(e.resultsAdapter, S)), e.selectOnClose && (e.resultsAdapter = f.Decorate(e.resultsAdapter, C)), e.tags && (e.resultsAdapter = f.Decorate(e.resultsAdapter, I))), null == e.dropdownAdapter && (e.multiple ? e.dropdownAdapter = A : (t = f.Decorate(A, D), e.dropdownAdapter = t), 0 !== e.minimumResultsForSearch && (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, E)), e.closeOnSelect && (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, T)), null != e.dropdownCssClass && (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, q)), e.dropdownAdapter = f.Decorate(e.dropdownAdapter, L)), null == e.selectionAdapter && (e.multiple ? e.selectionAdapter = a : e.selectionAdapter = r, null != e.placeholder && (e.selectionAdapter = f.Decorate(e.selectionAdapter, c)), e.allowClear && (e.selectionAdapter = f.Decorate(e.selectionAdapter, u)), e.multiple && (e.selectionAdapter = f.Decorate(e.selectionAdapter, d)), null != e.selectionCssClass && (e.selectionAdapter = f.Decorate(e.selectionAdapter, p)), e.selectionAdapter = f.Decorate(e.selectionAdapter, h)), e.language = this._resolveLanguage(e.language), e.language.push("en");
      for (var n = [], s = 0; s < e.language.length; s++) {
        var i = e.language[s];
        -1 === n.indexOf(i) && n.push(i);
      }
      return e.language = n, e.translations = this._processTranslations(e.language, e.debug), e;
    }, n.prototype.reset = function () {
      function a(e) {
        return e.replace(/[^\u0000-\u007E]/g, function (e) {
          return t[e] || e;
        });
      }
      this.defaults = {amdLanguageBase: "./i18n/", autocomplete: "off", closeOnSelect: true, debug: false, dropdownAutoWidth: false, escapeMarkup: f.escapeMarkup, language: {}, matcher: function e(t, n) {
        if (null == t.term || "" === t.term.trim()) return n;
        if (n.children && 0 < n.children.length) {
          for (var s = l.extend(true, {}, n), i = n.children.length - 1; 0 <= i; i--) null == e(t, n.children[i]) && s.children.splice(i, 1);
          return 0 < s.children.length ? s : e(t, s);
        }
        var o = a(n.text).toUpperCase(), r = a(t.term).toUpperCase();
        return -1 < o.indexOf(r) ? n : null;
      }, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: false, scrollAfterSelect: false, sorter: function (e) {
        return e;
      }, templateResult: function (e) {
        return e.text;
      }, templateSelection: function (e) {
        return e.text;
      }, theme: "default", width: "resolve"};
    }, n.prototype.applyFromElement = function (e, t) {
      var n = e.language, s = this.defaults.language, i = t.prop("lang"), t = t.closest("[lang]").prop("lang"), t = Array.prototype.concat.call(this._resolveLanguage(i), this._resolveLanguage(n), this._resolveLanguage(s), this._resolveLanguage(t));
      return e.language = t, e;
    }, n.prototype._resolveLanguage = function (e) {
      if (!e) return [];
      if (l.isEmptyObject(e)) return [];
      if (l.isPlainObject(e)) return [e];
      for (var t, n = Array.isArray(e) ? e : [e], s = [], i = 0; i < n.length; i++) s.push(n[i]), "string" == typeof n[i] && 0 < n[i].indexOf("-") && (t = n[i].split("-")[0], s.push(t));
      return s;
    }, n.prototype._processTranslations = function (e, t) {
      for (var n = new g, s = 0; s < e.length; s++) {
        var i = new g, o = e[s];
        if ("string" == typeof o) try {
          i = g.loadPath(o);
        } catch (e) {
          try {
            o = this.defaults.amdLanguageBase + o, i = g.loadPath(o);
          } catch (e) {
            t && window.console && console.warn && console.warn('Select2: The language file for "' + o + '" could not be automatically loaded. A fallback will be used instead.');
          }
        } else i = l.isPlainObject(o) ? new g(o) : o;
        n.extend(i);
      }
      return n;
    }, n.prototype.set = function (e, t) {
      var n = {};
      n[l.camelCase(e)] = t;
      n = f._convertData(n);
      l.extend(true, this.defaults, n);
    }, new n;
  }), u.define("select2/options", ["jquery", "./defaults", "./utils"], function (c, n, u) {
    function e(e, t) {
      this.options = e, null != t && this.fromElement(t), null != t && (this.options = n.applyFromElement(this.options, t)), this.options = n.apply(this.options);
    }
    return e.prototype.fromElement = function (e) {
      var t = ["select2"];
      null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.autocomplete && e.prop("autocomplete") && (this.options.autocomplete = e.prop("autocomplete")), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), u.GetData(e[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), u.StoreData(e[0], "data", u.GetData(e[0], "select2Tags")), u.StoreData(e[0], "tags", true)), u.GetData(e[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", u.GetData(e[0], "ajaxUrl")), u.StoreData(e[0], "ajax-Url", u.GetData(e[0], "ajaxUrl")));
      var n = {};
      for (var i = 0; i < e[0].attributes.length; i++) {
        var o = e[0].attributes[i].name, r = "data-";
        o.substr(0, r.length) == r && (o = o.substring(r.length), r = u.GetData(e[0], o), n[o.replace(/-([a-z])/g, s)] = r);
      }
      c.fn.jquery && "1." == c.fn.jquery.substr(0, 2) && e[0].dataset && (n = c.extend(true, {}, e[0].dataset, n));
      var a, l = c.extend(true, {}, u.GetData(e[0]), n);
      for (a in l = u._convertData(l)) -1 < t.indexOf(a) || (c.isPlainObject(this.options[a]) ? c.extend(this.options[a], l[a]) : this.options[a] = l[a]);
      return this;
    }, e.prototype.get = function (e) {
      return this.options[e];
    }, e.prototype.set = function (e, t) {
      this.options[e] = t;
    }, e;
  }), u.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (t, i, o, s) {
    var r = function (e, t) {
      null != o.GetData(e[0], "select2") && o.GetData(e[0], "select2").destroy(), this.$element = e, this.id = this._generateId(e), t = t || {}, this.options = new i(t, e), r.__super__.constructor.call(this);
      var n = e.attr("tabindex") || 0;
      o.StoreData(e[0], "old-tabindex", n), e.attr("tabindex", "-1");
      t = this.options.get("dataAdapter");
      this.dataAdapter = new t(e, this.options);
      n = this.render();
      this._placeContainer(n);
      t = this.options.get("selectionAdapter");
      this.selection = new t(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, n);
      t = this.options.get("dropdownAdapter");
      this.dropdown = new t(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, n);
      n = this.options.get("resultsAdapter");
      this.results = new n(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
      var s = this;
      this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (e) {
        s.trigger("selection:update", {data: e});
      }), e[0].classList.add("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), o.StoreData(e[0], "select2", this), e.data("select2", this);
    };
    return o.Extend(r, o.Observable), r.prototype._generateId = function (e) {
      return "select2-" + (null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + o.generateChars(2) : o.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "");
    }, r.prototype._placeContainer = function (e) {
      e.insertAfter(this.$element);
      var t = this._resolveWidth(this.$element, this.options.get("width"));
      null != t && e.css("width", t);
    }, r.prototype._resolveWidth = function (e, t) {
      var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
      if ("resolve" == t) {
        var s = this._resolveWidth(e, "style");
        return null != s ? s : this._resolveWidth(e, "element");
      }
      if ("element" == t) {
        s = e.outerWidth(false);
        return s <= 0 ? "auto" : s + "px";
      }
      if ("style" != t) return "computedstyle" != t ? t : window.getComputedStyle(e[0]).width;
      e = e.attr("style");
      if ("string" != typeof e) return null;
      for (var i = e.split(";"), o = 0, r = i.length; o < r; o += 1) {
        var a = i[o].replace(/\s/g, "").match(n);
        if (null !== a && 1 <= a.length) return a[1];
      }
      return null;
    }, r.prototype._bindAdapters = function () {
      this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
    }, r.prototype._registerDomEvents = function () {
      var t = this;
      this.$element.on("change.select2", function () {
        t.dataAdapter.current(function (e) {
          t.trigger("selection:update", {data: e});
        });
      }), this.$element.on("focus.select2", function (e) {
        t.trigger("focus", e);
      }), this._syncA = o.bind(this._syncAttributes, this), this._syncS = o.bind(this._syncSubtree, this), this._observer = new window.MutationObserver(function (e) {
        t._syncA(), t._syncS(e);
      }), this._observer.observe(this.$element[0], {attributes: true, childList: true, subtree: false});
    }, r.prototype._registerDataEvents = function () {
      var n = this;
      this.dataAdapter.on("*", function (e, t) {
        n.trigger(e, t);
      });
    }, r.prototype._registerSelectionEvents = function () {
      var n = this, s = ["toggle", "focus"];
      this.selection.on("toggle", function () {
        n.toggleDropdown();
      }), this.selection.on("focus", function (e) {
        n.focus(e);
      }), this.selection.on("*", function (e, t) {
        -1 === s.indexOf(e) && n.trigger(e, t);
      });
    }, r.prototype._registerDropdownEvents = function () {
      var n = this;
      this.dropdown.on("*", function (e, t) {
        n.trigger(e, t);
      });
    }, r.prototype._registerResultsEvents = function () {
      var n = this;
      this.results.on("*", function (e, t) {
        n.trigger(e, t);
      });
    }, r.prototype._registerEvents = function () {
      var n = this;
      this.on("open", function () {
        n.$container[0].classList.add("select2-container--open");
      }), this.on("close", function () {
        n.$container[0].classList.remove("select2-container--open");
      }), this.on("enable", function () {
        n.$container[0].classList.remove("select2-container--disabled");
      }), this.on("disable", function () {
        n.$container[0].classList.add("select2-container--disabled");
      }), this.on("blur", function () {
        n.$container[0].classList.remove("select2-container--focus");
      }), this.on("query", function (t) {
        n.isOpen() || n.trigger("open", {}), this.dataAdapter.query(t, function (e) {
          n.trigger("results:all", {data: e, query: t});
        });
      }), this.on("query:append", function (t) {
        this.dataAdapter.query(t, function (e) {
          n.trigger("results:append", {data: e, query: t});
        });
      }), this.on("keypress", function (e) {
        var t = e.which;
        n.isOpen() ? t === s.ESC || t === s.UP && e.altKey ? (n.close(e), e.preventDefault()) : t === s.ENTER || t === s.TAB ? (n.trigger("results:select", {}), e.preventDefault()) : t === s.SPACE && e.ctrlKey ? (n.trigger("results:toggle", {}), e.preventDefault()) : t === s.UP ? (n.trigger("results:previous", {}), e.preventDefault()) : t === s.DOWN && (n.trigger("results:next", {}), e.preventDefault()) : (t === s.ENTER || t === s.SPACE || t === s.DOWN && e.altKey) && (n.open(), e.preventDefault());
      });
    }, r.prototype._syncAttributes = function () {
      this.options.set("disabled", this.$element.prop("disabled")), this.isDisabled() ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
    }, r.prototype._isChangeMutation = function (e) {
      var t = this;
      if (e.addedNodes && 0 < e.addedNodes.length) {
        for (var n = 0; n < e.addedNodes.length; n++) if (e.addedNodes[n].selected) return true;
      } else {
        if (e.removedNodes && 0 < e.removedNodes.length) return true;
        if (Array.isArray(e)) return e.some(function (e) {
          return t._isChangeMutation(e);
        });
      }
      return false;
    }, r.prototype._syncSubtree = function (e) {
      var e = this._isChangeMutation(e), t = this;
      e && this.dataAdapter.current(function (e) {
        t.trigger("selection:update", {data: e});
      });
    }, r.prototype.trigger = function (e, t) {
      var n = r.__super__.trigger, s = {open: "opening", close: "closing", select: "selecting", unselect: "unselecting", clear: "clearing"};
      if (void 0 === t && (t = {}), e in s) {
        var i = s[e], s = {prevented: false, name: e, args: t};
        if (n.call(this, i, s), s.prevented) return void (t.prevented = true);
      }
      n.call(this, e, t);
    }, r.prototype.toggleDropdown = function () {
      this.isDisabled() || (this.isOpen() ? this.close() : this.open());
    }, r.prototype.open = function () {
      this.isOpen() || this.isDisabled() || this.trigger("query", {});
    }, r.prototype.close = function (e) {
      this.isOpen() && this.trigger("close", {originalEvent: e});
    }, r.prototype.isEnabled = function () {
      return !this.isDisabled();
    }, r.prototype.isDisabled = function () {
      return this.options.get("disabled");
    }, r.prototype.isOpen = function () {
      return this.$container[0].classList.contains("select2-container--open");
    }, r.prototype.hasFocus = function () {
      return this.$container[0].classList.contains("select2-container--focus");
    }, r.prototype.focus = function (e) {
      this.hasFocus() || (this.$container[0].classList.add("select2-container--focus"), this.trigger("focus", {}));
    }, r.prototype.enable = function (e) {
      this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != e && 0 !== e.length || (e = [true]);
      e = !e[0];
      this.$element.prop("disabled", e);
    }, r.prototype.data = function () {
      this.options.get("debug") && 0 < arguments.length && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
      var t = [];
      return this.dataAdapter.current(function (e) {
        t = e;
      }), t;
    }, r.prototype.val = function (e) {
      if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == e || 0 === e.length) return this.$element.val();
      e = e[0];
      Array.isArray(e) && (e = e.map(function (e) {
        return e.toString();
      })), this.$element.val(e).trigger("input").trigger("change");
    }, r.prototype.destroy = function () {
      o.RemoveData(this.$container[0]), this.$container.remove(), this._observer.disconnect(), this._observer = null, this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", o.GetData(this.$element[0], "old-tabindex")), this.$element[0].classList.remove("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), o.RemoveData(this.$element[0]), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
    }, r.prototype.render = function () {
      var e = t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
      return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container[0].classList.add("select2-container--" + this.options.get("theme")), o.StoreData(e[0], "element", this.$element), e;
    }, r;
  }), u.define("select2/dropdown/attachContainer", [], function () {
    function e(e, t, n) {
      e.call(this, t, n);
    }
    return e.prototype.position = function (e, t, n) {
      n.find(".dropdown-wrapper").append(t), t[0].classList.add("select2-dropdown--below"), n[0].classList.add("select2-container--below");
    }, e;
  }), u.define("select2/dropdown/stopPropagation", [], function () {
    function e() {}
    return e.prototype.bind = function (e, t, n) {
      e.call(this, t, n);
      this.$dropdown.on(["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"].join(" "), function (e) {
        e.stopPropagation();
      });
    }, e;
  }), u.define("select2/selection/stopPropagation", [], function () {
    function e() {}
    return e.prototype.bind = function (e, t, n) {
      e.call(this, t, n);
      this.$selection.on(["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"].join(" "), function (e) {
        e.stopPropagation();
      });
    }, e;
  }), a = function (u) {
    var d, p, e = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], t = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], h = Array.prototype.slice;
    if (u.event.fixHooks) for (var n = e.length; n;) u.event.fixHooks[e[--n]] = u.event.mouseHooks;
    var f = u.event.special.mousewheel = {version: "3.1.12", setup: function () {
      if (this.addEventListener) for (var e = t.length; e;) this.addEventListener(t[--e], s, false); else this.onmousewheel = s;
      u.data(this, "mousewheel-line-height", f.getLineHeight(this)), u.data(this, "mousewheel-page-height", f.getPageHeight(this));
    }, teardown: function () {
      if (this.removeEventListener) for (var e = t.length; e;) this.removeEventListener(t[--e], s, false); else this.onmousewheel = null;
      u.removeData(this, "mousewheel-line-height"), u.removeData(this, "mousewheel-page-height");
    }, getLineHeight: function (e) {
      var t = u(e), e = t["offsetParent" in u.fn ? "offsetParent" : "parent"]();
      return e.length || (e = u("body")), parseInt(e.css("fontSize"), 10) || parseInt(t.css("fontSize"), 10) || 16;
    }, getPageHeight: function (e) {
      return u(e).height();
    }, settings: {adjustOldDeltas: true, normalizeOffset: true}};
    function s(e) {
      var t, n = e || window.event, s = h.call(arguments, 1), i = 0, o = 0, r = 0, a = 0, l = 0, c = 0;
      if (e = u.event.fix(n), e.type = "mousewheel", "detail" in n && (r = -1 * n.detail), "wheelDelta" in n && (r = n.wheelDelta), "wheelDeltaY" in n && (r = n.wheelDeltaY), "wheelDeltaX" in n && (o = -1 * n.wheelDeltaX), "axis" in n && n.axis === n.HORIZONTAL_AXIS && (o = -1 * r, r = 0), i = 0 === r ? o : r, "deltaY" in n && (i = r = -1 * n.deltaY), "deltaX" in n && (o = n.deltaX, 0 === r && (i = -1 * o)), 0 !== r || 0 !== o) return 1 === n.deltaMode ? (i *= t = u.data(this, "mousewheel-line-height"), r *= t, o *= t) : 2 === n.deltaMode && (i *= t = u.data(this, "mousewheel-page-height"), r *= t, o *= t), a = Math.max(Math.abs(r), Math.abs(o)), (!p || a < p) && (f.settings.adjustOldDeltas && "mousewheel" === n.type && (p = a) % 120 == 0) && (p /= 40), f.settings.adjustOldDeltas && "mousewheel" === n.type && a % 120 == 0 && (i /= 40, o /= 40, r /= 40), i = Math[1 <= i ? "floor" : "ceil"](i / p), o = Math[1 <= o ? "floor" : "ceil"](o / p), r = Math[1 <= r ? "floor" : "ceil"](r / p), f.settings.normalizeOffset && this.getBoundingClientRect && (a = this.getBoundingClientRect(), l = e.clientX - a.left, c = e.clientY - a.top), e.deltaX = o, e.deltaY = r, e.deltaFactor = p, e.offsetX = l, e.offsetY = c, e.deltaMode = 0, s.unshift(e, i, o, r), d && clearTimeout(d), d = setTimeout(g, 200), (u.event.dispatch || u.event.handle).apply(this, s);
    }
    function g() {
      p = null;
    }
    u.fn.extend({mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
    }, unmousewheel: function (e) {
      return this.unbind("mousewheel", e);
    }});
  }, "function" == typeof u.define && u.define.amd ? u.define("jquery-mousewheel", ["jquery"], a) : "object" == typeof exports ? module.exports = a : a(t), u.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function (i, e, o, t, r) {
    var a;
    return null == i.fn.select2 && (a = ["open", "close", "destroy"], i.fn.select2 = function (t) {
      if ("object" == typeof (t = t || {})) return this.each(function () {
        var e = i.extend(true, {}, t);
        new o(i(this), e);
      }), this;
      if ("string" != typeof t) throw new Error("Invalid arguments for Select2: " + t);
      var n, s = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var e = r.GetData(this, "select2");
        null == e && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), n = e[t].apply(e, s);
      }), -1 < a.indexOf(t) ? this : n;
    }), null == i.fn.select2.defaults && (i.fn.select2.defaults = t), o;
  }), {define: u.define, require: u.require});
  function l(e, t) {
    var n, s, i, o, r, a, l, c, u, d, p = t && t.split("/"), h = v.map, f = h && h["*"] || {};
    if (e) {
      for (t = (e = e.split("/")).length - 1, v.nodeIdCompat && _.test(e[t]) && (e[t] = e[t].replace(_, "")), "." === e[0].charAt(0) && p && (e = p.slice(0, p.length - 1).concat(e)), c = 0; c < e.length; c++) "." === (d = e[c]) ? (e.splice(c, 1), --c) : ".." === d && (0 === c || 1 === c && ".." === e[2] || ".." === e[c - 1] || 0 < c && (e.splice(c - 1, 2), c -= 2));
      e = e.join("/");
    }
    if ((p || f) && h) {
      for (c = (n = e.split("/")).length; 0 < c; --c) {
        if (s = n.slice(0, c).join("/"), p) for (u = p.length; 0 < u; --u) if (i = h[p.slice(0, u).join("/")], i = i && i[s]) {
          o = i, r = c;
          break;
        }
        if (o) break;
        !a && f && f[s] && (a = f[s], l = c);
      }
      !o && a && (o = a, r = l), o && (n.splice(0, r, o), e = n.join("/"));
    }
    return e;
  }
  function w(t, n) {
    return function () {
      var e = i.call(arguments, 0);
      return "string" != typeof e[0] && 1 === e.length && e.push(null), r.apply(p, e.concat([t, n]));
    };
  }
  function x(e) {
    var t;
    if (s.call(m, e) && (t = m[e], delete m[e], y[e] = true, o.apply(p, t)), !s.call(g, e) && !s.call(y, e)) throw new Error("No " + e);
    return g[e];
  }
  function c(e) {
    var t, n = e ? e.indexOf("!") : -1;
    return -1 < n && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e];
  }
  function A(e) {
    return e ? c(e) : [];
  }
  var u = a.require("jquery.select2");
  return t.fn.select2.amd = a, u;
});
