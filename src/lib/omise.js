/*!
 * OmiseJs v2.4.1
 * Copyright: Omise
 *
 * Date: 2018/08/29 14:34
 */
! function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = n[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
  }
  var n = {};
  t.m = e, t.c = n, t.i = function (e) {
    return e
  }, t.d = function (e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, {
      configurable: !1,
      enumerable: !0,
      get: r
    })
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return t.d(n, "a", n), n
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, t.p = "/", t(t.s = 7)
}([function (e, t, n) {
  "use strict";
  var r = {
    test: {
      vaultUrl: "http://vault.lvh.me:4500",
      cardHost: "http://localhost:5002",
      interfaceUrl: "http://api.lvh.me:3000"
    },
    development: {
      vaultUrl: "http://vault.lvh.me:4500",
      cardHost: "http://localhost:5002",
      interfaceUrl: "http://api.lvh.me:3000"
    },
    staging: {
      vaultUrl: "https://vault-staging.omise.co",
      cardHost: "https://cdn.dev-omise.co",
      interfaceUrl: "https://api-staging.omise.co"
    },
    production: {
      vaultUrl: "https://vault.omise.co",
      cardHost: "https://cdn.omise.co",
      interfaceUrl: "https://api.omise.co"
    }
  };
  e.exports = r.production
}, function (e, t) {
  var n;
  n = function () {
    return this
  }();
  try {
    n = n || Function("return this")() || (0, eval)("this")
  } catch (e) {
    "object" == typeof window && (n = window)
  }
  e.exports = n
}, function (e, t, n) {
  "use strict";

  function r(e, t) {
    return Object.assign({}, e, t)
  }

  function o(e) {
    return i(JSON.stringify(e))
  }

  function i(e) {
    try {
      return JSON.parse(e)
    } catch (t) {
      return e
    }
  }

  function a(e) {
    return null == e || "" === e
  }

  function s(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2")
  }

  function c(e) {
    return e.replace(/-([a-z])/g, function (e) {
      return e[1].toUpperCase()
    })
  }

  function u(e) {
    for (var t = {}, n = e.attributes.length, r = 0; r < n; r++) {
      var o = e.attributes[r];
      if (/^data/.test(o.name)) {
        t[c(o.name.replace("data-", ""))] = o.value
      }
    }
    return t
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.merge = r, t.clone = o, t.safeJsonParse = i, t.isEmpty = a, t.camelCaseToDash = s, t.dashToCamelCase = c, t.extractDataFromElement = u
}, function (e, t, n) {
  "use strict";

  function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function o(e) {
    var t = {
      error: !1,
      message: ""
    };
    return e.vaultUrl && (0, a.isUri)(e.vaultUrl) ? e.cardHost && (0, a.isUri)(e.cardHost) ? e.interfaceUrl && (0, a.isUri)(e.interfaceUrl) || (t.message = "Missing interfaceUrl") : t.message = "Missing cardHost" : t.message = "Missing valutUrl", t.error = "" !== t.message, t
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t
    }
  }();
  t.verifyConfigStructure = o;
  var a = n(9);
  n(11);
  var s = function () {
    function e(t) {
      r(this, e);
      var n = o(t);
      if (n.error) throw new Error(n.message);
      this.config = t, this.publicKey = null, this._rpc = null
    }
    return i(e, [{
      key: "_createRpc",
      value: function (e) {
        var t = this;
        if (this._rpc) return this._rpc;
        var n = this.config.vaultUrl,
          r = setTimeout(function () {
            t._rpc.destroy(), t._rpc = null, e && e()
          }, 3e4);
        return this._rpc = new easyXDM.Rpc({
          remote: n + "/provider",
          onReady: function () {
            clearTimeout(r)
          }
        }, {
          remote: {
            createToken: {}
          }
        }), this._rpc
      }
    }, {
      key: "setPublicKey",
      value: function (e) {
        return this.publicKey = e, this.publicKey
      }
    }, {
      key: "createSource",
      value: function (e, t, n) {
        var r = btoa(this.publicKey);
        t.type = e;
        var o = this.config.interfaceUrl + "/sources/";
        fetch(o, {
          method: "post",
          headers: {
            Authorization: "Basic " + r,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(t)
        }).then(function (e) {
          return e.json().then(function (t) {
            return n(e.status, t)
          })
        }).catch(function (e) {
          n(0, {
            code: "create_source_error",
            error: e.message
          })
        })
      }
    }, {
      key: "createToken",
      value: function (e, t, n) {
        var r = {};
        r[e] = t, this._createRpc(function () {
          n(0, {
            code: "rpc_error",
            message: "unable to connect to provider after timeout"
          })
        }).createToken(this.publicKey, r, function (e) {
          n(e.status, e.data)
        }, function (e) {
          n(e.data.status, e.data.data)
        })
      }
    }]), e
  }();
  t.default = s
}, function (e, t, n) {
  "use strict";

  function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function o(e) {
    var t = {},
      n = {
        publicKey: "key",
        logo: "image",
        locationField: "location"
      };
    for (var r in e) {
      var o = n[r];
      o ? t[o] = e[r] : t[r] = e[r]
    }
    return t
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.iframeDefaultStyle = t.defaultIframeAppConfig = void 0;
  var i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
      }
      return e
    },
    a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
      }
      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }();
  t.fixConfigName = o;
  var s = n(8),
    c = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(s),
    u = n(2),
    l = t.defaultIframeAppConfig = {
      key: "",
      amount: 0,
      currency: "THB",
      image: "https://cdn.omise.co/assets/frontend-images/store-logo.svg",
      frameLabel: "Omise",
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
      frameDescription: "Secured by Omise",
      submitLabel: "Pay",
      buttonLabel: "Pay with Omise",
      location: "no",
      submitAuto: "yes",
      submitFormTarget: "",
      cardBrands: "visa mastercard",
      locale: "en",
      autoCardNumberFormat: "yes",
      expiryDateStyle: ""
    },
    f = t.iframeDefaultStyle = ["display: none", "visibility: visible", "position: fixed", "left: 0px", "top: 0px", "width: 100%", "height: 100%", "z-index: 2147483647", "padding: 0", "margin: 0", "border: 0 none transparent", "background-color: rgba(0, 0, 0, 0)", "overflow-x: hidden", "overflow-y: auto", "-webkit-tap-highlight-color: transparent", "transition: background-color .2s"],
    p = function () {},
    d = function () {
      function e(t) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        r(this, e), this.setup(t), n && this.init()
      }
      return a(e, [{
        key: "setup",
        value: function (e) {
          return this.app = {
            settings: i({}, e),
            iframe: null,
            omiseScriptTag: null,
            omiseGenerateCheckoutButton: null,
            iframeAppId: "omise-checkout-iframe-app",
            defaultConfig: i({}, l),
            configForIframeOnLoad: i({}, l),
            currentOpenConfig: {},
            formElement: null,
            allConfigureButtons: []
          }, this.app
        }
      }, {
        key: "init",
        value: function () {
          for (var e = null != this.app.iframe, t = document.getElementsByTagName("script"), n = t.length, r = 0; r < n; r++) {
            var o = t[r];
            if (o.hasAttribute("data-key") && o.hasAttribute("data-amount")) {
              this.app.omiseScriptTag = o;
              break
            }
          }
          e || this.isInsideIframeApp() || !this.app.omiseScriptTag || (this.createIframe(), this.app.omiseGenerateCheckoutButton = this.createOmiseCheckoutButton(), (0, c.default)(this))
        }
      }, {
        key: "getDefaultConfig",
        value: function () {
          return this.app.defaultConfig
        }
      }, {
        key: "getAllConfigureButtons",
        value: function () {
          return this.app.allConfigureButtons
        }
      }, {
        key: "setTokenAtOmiseTokenField",
        value: function (e) {
          var t = i({}, this.app.defaultConfig, this.app.currentOpenConfig),
            n = t.submitAuto,
            r = t.onCreateTokenSuccess;
          this.app.formElement && (this.isOmiseSource(e) ? this.app.formElement.omiseSource.value = e : this.app.formElement.omiseToken.value = e), "yes" === n && this.app.formElement && this.app.formElement.submit(), (r || p)(e), this.app.currentOpenConfig = {}
        }
      }, {
        key: "isOmiseSource",
        value: function (e) {
          return /^src_/.test(e)
        }
      }, {
        key: "getFormByTarget",
        value: function (e) {
          for (var t = e; t && "FORM" !== t.tagName;) t = t.parentNode;
          return t
        }
      }, {
        key: "createIframe",
        value: function () {
          var e = this,
            t = document.createElement("iframe");
          return t.id = this.app.iframeAppId, t.src = this.app.settings.cardHost + "/pay.html", t.setAttribute("style", f.join("; ")), document.body.appendChild(t), t.onload = function () {
            "block" === e.app.iframe.style.display && (0, s.messageShowIframeAppForm)(t.contentWindow, {
              config: e.app.configForIframeOnLoad
            })
          }, this.app.iframe = t, this.app.iframe
        }
      }, {
        key: "createHiddenInputForOmiseToken",
        value: function (e) {
          var t = null;
          if (e && "FORM" === e.tagName && (t = e), !t) throw new Error(["Missing form element. Generate button or custom button must contain in form element.", "https://github.com/omise/examples/blob/master/omise.js/example-4-custom-integration-multiple-buttons.html", "Or setting submit form target", "https://github.com/omise/examples/blob/master/omise.js/example-5-custom-integration-specify-checkout-form.html"].join("\n"));
          var n = t.querySelector('input[name="omiseToken"]');
          null == n && (n = document.createElement("input"), n.setAttribute("type", "hidden"), n.setAttribute("name", "omiseToken"), t.appendChild(n));
          var r = t.querySelector('input[name="omiseSource"]');
          return null == r && (r = document.createElement("input"), r.setAttribute("type", "hidden"), r.setAttribute("name", "omiseSource"), t.appendChild(r)), n
        }
      }, {
        key: "createOmiseCheckoutButton",
        value: function () {
          var e = this,
            t = this.prepareConfig((0, u.extractDataFromElement)(this.app.omiseScriptTag)),
            n = document.createElement("button");
          n.className = "omise-checkout-button", n.innerHTML = t.buttonLabel;
          var r = this.app.omiseScriptTag;
          if (r) {
            var o = this.getFormByTarget(r);
            this.app.formElement = o, this.createHiddenInputForOmiseToken(o)
          } else console.warn("Missing Omise script tag");
          return n.addEventListener("click", function (t) {
            if (t.preventDefault(), r) {
              var n = (0, u.extractDataFromElement)(r),
                o = e.prepareConfig(n);
              e.app.configForIframeOnLoad = i({}, o), e.open(o)
            } else console.warn("Missing Omise script tag")
          }, !1), r.parentNode.insertBefore(n, r.nextSibling), n
        }
      }, {
        key: "isInsideIframeApp",
        value: function () {
          return null != document.getElementById(this.app.iframeAppId)
        }
      }, {
        key: "prepareConfig",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.otherPaymentMethods;
          return t && "string" == typeof t && (e.otherPaymentMethods = this.stringToArray(t)), (0, u.merge)(this.app.defaultConfig, o(e))
        }
      }, {
        key: "stringToArray",
        value: function (e) {
          return e.split(",").map(function (e) {
            return e.trim()
          })
        }
      }, {
        key: "configure",
        value: function (e) {
          return this.app.defaultConfig = this.prepareConfig(e), this.isInsideIframeApp() || this.app.iframe || (this.createIframe(), (0, c.default)(this)), this.app.defaultConfig
        }
      }, {
        key: "open",
        value: function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;
          if (!this.app.iframe) return !1;
          this.app.iframe.style.display = "block";
          var r = this.prepareConfig(t);
          return this.app.currentOpenConfig = i({}, r), setTimeout(function () {
            e.app.iframe.style.backgroundColor = "rgba(0, 0, 0, .4)", (0, s.messageShowIframeAppForm)(e.app.iframe.contentWindow, {
              config: r
            }), n(e.app.iframe)
          }), !0
        }
      }, {
        key: "close",
        value: function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p;
          return !!this.app.iframe && (this.app.iframe.style.backgroundColor = "rgba(0, 0, 0, 0)", setTimeout(function () {
            e.app.iframe.style.display = "none", t(e.app.iframe), (e.app.currentOpenConfig.onFormClosed || p)(e.app.iframe)
          }, 250), !0)
        }
      }, {
        key: "destroy",
        value: function () {
          var e = document.getElementById(this.app.iframeAppId);
          if (this.app.iframe && e) {
            var t = document.getElementById(this.app.iframeAppId);
            document.body.removeChild(t), this.setup()
          }
        }
      }, {
        key: "createParentFrameHandler",
        value: function () {
          return {
            closeIframe: function () {
              (0, s.messageCloseIframe)()
            },
            closeAndSendToken: function (e) {
              (0, s.messageCloseAndSendToken)(e)
            }
          }
        }
      }, {
        key: "configureButton",
        value: function (e, t) {
          var n = this.prepareConfig(t),
            r = {
              buttonId: e,
              configuration: n
            };
          return this.app.allConfigureButtons.push(r), r
        }
      }, {
        key: "attach",
        value: function () {
          var e = this,
            t = [];
          return this.app.allConfigureButtons.forEach(function (n) {
            var r = n.configuration,
              o = document.querySelector(n.buttonId),
              i = e.app.defaultConfig.buttonLabel,
              a = i;
            r.buttonLabel && a !== r.buttonLabel ? a = r.buttonLabel : o.innerHTML && (a = o.innerHTML), o.innerHTML = a;
            var s = e.app.defaultConfig.submitFormTarget,
              c = s ? document.querySelector(s) : e.getFormByTarget(o);
            e.createHiddenInputForOmiseToken(c), o.addEventListener("click", function (t) {
              t.preventDefault();
              t.target;
              e.app.configForIframeOnLoad = r, e.app.formElement = c, e.open(r)
            }, !1), t.push(o)
          }), this.isInsideIframeApp() || this.app.iframe || (this.createIframe(), (0, c.default)(this)), t
        }
      }]), e
    }();
  t.default = d
}, function (e, t, n) {
  "use strict";
  "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
    value: function (e, t) {
      if (null == e) throw new TypeError("Cannot convert undefined or null to object");
      for (var n = Object(e), r = 1; r < arguments.length; r++) {
        var o = arguments[r];
        if (null != o)
          for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
      }
      return n
    },
    writable: !0,
    configurable: !0
  })
}, function (e, t, n) {
  "use strict";
  var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  };
  ! function (e, t, n, o, i, a) {
    function s(e, t) {
      var n = r(e[t]);
      return "function" == n || !("object" != n || !e[t]) || "unknown" == n
    }

    function c(e, t) {
      return !("object" != r(e[t]) || !e[t])
    }

    function u(e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    }

    function l() {
      var e = "Shockwave Flash",
        t = "application/x-shockwave-flash";
      if (!w(navigator.plugins) && "object" == r(navigator.plugins[e])) {
        var n = navigator.plugins[e].description;
        n && !w(navigator.mimeTypes) && navigator.mimeTypes[t] && navigator.mimeTypes[t].enabledPlugin && (A = n.match(/\d+/g))
      }
      if (!A) {
        var o;
        try {
          o = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), A = Array.prototype.slice.call(o.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1), o = null
        } catch (e) {}
      }
      if (!A) return !1;
      var i = parseInt(A[0], 10),
        a = parseInt(A[1], 10);
      return P = i > 9 && a > 0, !0
    }

    function f() {
      if (!W) {
        W = !0;
        for (var e = 0; e < K.length; e++) K[e]();
        K.length = 0
      }
    }

    function p(e, t) {
      if (W) return void e.call(t);
      K.push(function () {
        e.call(t)
      })
    }

    function d() {
      var e = parent;
      if ("" !== L)
        for (var t = 0, n = L.split("."); t < n.length; t++) e = e[n[t]];
      return e.easyXDM
    }

    function h(t) {
      return e.easyXDM = U, L = t, L && (J = "easyXDM_" + L.replace(".", "_") + "_"), H
    }

    function m(e) {
      return e.match(j)[3]
    }

    function y(e) {
      return e.match(j)[4] || ""
    }

    function g(e) {
      var t = e.toLowerCase().match(j),
        n = t[2],
        r = t[3],
        o = t[4] || "";
      return ("http:" == n && ":80" == o || "https:" == n && ":443" == o) && (o = ""), n + "//" + r + o
    }

    function v(e) {
      if (e = e.replace(N, "$1/"), !e.match(/^(http||https):\/\//)) {
        var t = "/" === e.substring(0, 1) ? "" : n.pathname;
        "/" !== t.substring(t.length - 1) && (t = t.substring(0, t.lastIndexOf("/") + 1)), e = n.protocol + "//" + n.host + t + e
      }
      for (; D.test(e);) e = e.replace(D, "");
      return e
    }

    function b(e, t) {
      var n = "",
        r = e.indexOf("#"); - 1 !== r && (n = e.substring(r), e = e.substring(0, r));
      var o = [];
      for (var i in t) t.hasOwnProperty(i) && o.push(i + "=" + a(t[i]));
      return e + (q ? "#" : -1 == e.indexOf("?") ? "?" : "&") + o.join("&") + n
    }

    function w(e) {
      return void 0 === e
    }

    function _(e, t, n) {
      var o;
      for (var i in t) t.hasOwnProperty(i) && (i in e ? (o = t[i], "object" === (void 0 === o ? "undefined" : r(o)) ? _(e[i], o, n) : n || (e[i] = t[i])) : e[i] = t[i]);
      return e
    }

    function k() {
      var e = t.body.appendChild(t.createElement("form")),
        n = e.appendChild(t.createElement("input"));
      n.name = J + "TEST" + I, S = n !== e.elements[n.name], t.body.removeChild(e)
    }

    function O(e) {
      w(S) && k();
      var n;
      S ? n = t.createElement('<iframe name="' + e.props.name + '"/>') : (n = t.createElement("IFRAME"), n.name = e.props.name), n.id = n.name = e.props.name, delete e.props.name, "string" == typeof e.container && (e.container = t.getElementById(e.container)), e.container || (_(n.style, {
        position: "absolute",
        top: "-2000px",
        left: "0px"
      }), e.container = t.body);
      var o = e.props.src;
      if (e.props.src = "javascript:false", _(n, e.props), n.border = n.frameBorder = 0, n.allowTransparency = !0, e.container.appendChild(n), e.onLoad && F(n, "load", e.onLoad), e.usePost) {
        var i, a = e.container.appendChild(t.createElement("form"));
        if (a.target = n.name, a.action = o, a.method = "POST", "object" === r(e.usePost))
          for (var s in e.usePost) e.usePost.hasOwnProperty(s) && (S ? i = t.createElement('<input name="' + s + '"/>') : (i = t.createElement("INPUT"), i.name = s), i.value = e.usePost[s], a.appendChild(i));
        a.submit(), a.parentNode.removeChild(a)
      } else n.src = o;
      return e.props.src = o, n
    }

    function x(e, t) {
      "string" == typeof e && (e = [e]);
      for (var n, r = e.length; r--;)
        if (n = e[r], n = new RegExp("^" == n.substr(0, 1) ? n : "^" + n.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"), n.test(t)) return !0;
      return !1
    }

    function T(r) {
      var o, i = r.protocol;
      if (r.isHost = r.isHost || w($.xdm_p), q = r.hash || !1, r.props || (r.props = {}), r.isHost) r.remote = v(r.remote), r.channel = r.channel || "default" + I++, r.secret = Math.random().toString(16).substring(2), w(i) && (i = g(n.href) == g(r.remote) ? "4" : s(e, "postMessage") || s(t, "postMessage") ? "1" : r.swf && s(e, "ActiveXObject") && l() ? "6" : "Gecko" === navigator.product && "frameElement" in e && -1 == navigator.userAgent.indexOf("WebKit") ? "5" : r.remoteHelper ? "2" : "0");
      else if (r.channel = $.xdm_c.replace(/["'<>\\]/g, ""), r.secret = $.xdm_s, r.remote = $.xdm_e.replace(/["'<>\\]/g, ""), i = $.xdm_p, r.acl && !x(r.acl, r.remote)) throw new Error("Access denied for " + r.remote);
      switch (r.protocol = i, i) {
        case "0":
          if (_(r, {
              interval: 100,
              delay: 2e3,
              useResize: !0,
              useParent: !1,
              usePolling: !1
            }, !0), r.isHost) {
            if (!r.local) {
              for (var a, c = n.protocol + "//" + n.host, u = t.body.getElementsByTagName("img"), f = u.length; f--;)
                if (a = u[f], a.src.substring(0, c.length) === c) {
                  r.local = a.src;
                  break
                } r.local || (r.local = e)
            }
            var p = {
              xdm_c: r.channel,
              xdm_p: 0
            };
            r.local === e ? (r.usePolling = !0, r.useParent = !0, r.local = n.protocol + "//" + n.host + n.pathname + n.search, p.xdm_e = r.local, p.xdm_pa = 1) : p.xdm_e = v(r.local), r.container && (r.useResize = !1, p.xdm_po = 1), r.remote = b(r.remote, p)
          } else _(r, {
            channel: $.xdm_c,
            remote: $.xdm_e,
            useParent: !w($.xdm_pa),
            usePolling: !w($.xdm_po),
            useResize: !r.useParent && r.useResize
          });
          o = [new H.stack.HashTransport(r), new H.stack.ReliableBehavior({}), new H.stack.QueueBehavior({
            encode: !0,
            maxLength: 4e3 - r.remote.length
          }), new H.stack.VerifyBehavior({
            initiate: r.isHost
          })];
          break;
        case "1":
          o = [new H.stack.PostMessageTransport(r)];
          break;
        case "2":
          r.isHost && (r.remoteHelper = v(r.remoteHelper)), o = [new H.stack.NameTransport(r), new H.stack.QueueBehavior, new H.stack.VerifyBehavior({
            initiate: r.isHost
          })];
          break;
        case "3":
          o = [new H.stack.NixTransport(r)];
          break;
        case "4":
          o = [new H.stack.SameOriginTransport(r)];
          break;
        case "5":
          o = [new H.stack.FrameElementTransport(r)];
          break;
        case "6":
          A || l(), o = [new H.stack.FlashTransport(r)]
      }
      return o.push(new H.stack.QueueBehavior({
        lazy: r.lazy,
        remove: !0
      })), o
    }

    function E(e) {
      for (var t, n = {
          incoming: function (e, t) {
            this.up.incoming(e, t)
          },
          outgoing: function (e, t) {
            this.down.outgoing(e, t)
          },
          callback: function (e) {
            this.up.callback(e)
          },
          init: function () {
            this.down.init()
          },
          destroy: function () {
            this.down.destroy()
          }
        }, r = 0, o = e.length; r < o; r++) t = e[r], _(t, n, !0), 0 !== r && (t.down = e[r - 1]), r !== o - 1 && (t.up = e[r + 1]);
      return t
    }

    function C(e) {
      e.up.down = e.down, e.down.up = e.up, e.up = e.down = null
    }
    var S, A, P, F, M, B = this,
      I = Math.floor(1e4 * Math.random()),
      R = Function.prototype,
      j = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
      D = /[\-\w]+\/\.\.\//,
      N = /([^:])\/\//g,
      L = "",
      H = {},
      U = e.easyXDM,
      J = "easyXDM_",
      q = !1;
    if (s(e, "addEventListener")) F = function (e, t, n) {
      e.addEventListener(t, n, !1)
    }, M = function (e, t, n) {
      e.removeEventListener(t, n, !1)
    };
    else {
      if (!s(e, "attachEvent")) throw new Error("Browser not supported");
      F = function (e, t, n) {
        e.attachEvent("on" + t, n)
      }, M = function (e, t, n) {
        e.detachEvent("on" + t, n)
      }
    }
    var z, W = !1,
      K = [];
    if ("readyState" in t ? (z = t.readyState, W = "complete" == z || ~navigator.userAgent.indexOf("AppleWebKit/") && ("loaded" == z || "interactive" == z)) : W = !!t.body, !W) {
      if (s(e, "addEventListener")) F(t, "DOMContentLoaded", f);
      else if (F(t, "readystatechange", function () {
          "complete" == t.readyState && f()
        }), t.documentElement.doScroll && e === top) {
        ! function e() {
          if (!W) {
            try {
              t.documentElement.doScroll("left")
            } catch (t) {
              return void o(e, 1)
            }
            f()
          }
        }()
      }
      F(e, "load", f)
    }
    var $ = function (e) {
        e = e.substring(1).split("&");
        for (var t, n = {}, r = e.length; r--;) t = e[r].split("="), n[t[0]] = i(t[1]);
        return n
      }(/xdm_e=/.test(n.search) ? n.search : n.hash),
      X = function () {
        var e = {},
          t = {
            a: [1, 2, 3]
          },
          n = '{"a":[1,2,3]}';
        return "undefined" != typeof JSON && "function" == typeof JSON.stringify && JSON.stringify(t).replace(/\s/g, "") === n ? JSON : (Object.toJSON && Object.toJSON(t).replace(/\s/g, "") === n && (e.stringify = Object.toJSON), "function" == typeof String.prototype.evalJSON && (t = n.evalJSON(), t.a && 3 === t.a.length && 3 === t.a[2] && (e.parse = function (e) {
          return e.evalJSON()
        })), e.stringify && e.parse ? (X = function () {
          return e
        }, e) : null)
      };
    _(H, {
        version: "2.4.19.3",
        query: $,
        stack: {},
        apply: _,
        getJSONObject: X,
        whenReady: p,
        noConflict: h
      }), H.DomHelper = {
        on: F,
        un: M,
        requiresJSON: function (n) {
          c(e, "JSON") || t.write('<script type="text/javascript" src="' + n + '"><\/script>')
        }
      },
      function () {
        var e = {};
        H.Fn = {
          set: function (t, n) {
            e[t] = n
          },
          get: function (t, n) {
            if (e.hasOwnProperty(t)) {
              var r = e[t];
              return n && delete e[t], r
            }
          }
        }
      }(), H.Socket = function (e) {
        var t = E(T(e).concat([{
            incoming: function (t, n) {
              e.onMessage(t, n)
            },
            callback: function (t) {
              e.onReady && e.onReady(t)
            }
          }])),
          n = g(e.remote);
        this.origin = g(e.remote), this.destroy = function () {
          t.destroy()
        }, this.postMessage = function (e) {
          t.outgoing(e, n)
        }, t.init()
      }, H.Rpc = function (e, t) {
        if (t.local)
          for (var n in t.local)
            if (t.local.hasOwnProperty(n)) {
              var r = t.local[n];
              "function" == typeof r && (t.local[n] = {
                method: r
              })
            } var o = E(T(e).concat([new H.stack.RpcBehavior(this, t), {
          callback: function (t) {
            e.onReady && e.onReady(t)
          }
        }]));
        this.origin = g(e.remote), this.destroy = function () {
          o.destroy()
        }, o.init()
      }, H.stack.SameOriginTransport = function (e) {
        var t, r, i, a;
        return t = {
          outgoing: function (e, t, n) {
            i(e), n && n()
          },
          destroy: function () {
            r && (r.parentNode.removeChild(r), r = null)
          },
          onDOMReady: function () {
            a = g(e.remote), e.isHost ? (_(e.props, {
              src: b(e.remote, {
                xdm_e: n.protocol + "//" + n.host + n.pathname,
                xdm_c: e.channel,
                xdm_p: 4
              }),
              name: J + e.channel + "_provider"
            }), r = O(e), H.Fn.set(e.channel, function (e) {
              return i = e, o(function () {
                  t.up.callback(!0)
                }, 0),
                function (e) {
                  t.up.incoming(e, a)
                }
            })) : (i = d().Fn.get(e.channel, !0)(function (e) {
              t.up.incoming(e, a)
            }), o(function () {
              t.up.callback(!0)
            }, 0))
          },
          init: function () {
            p(t.onDOMReady, t)
          }
        }
      }, H.stack.FlashTransport = function (e) {
        function r(e, t) {
          o(function () {
            s.up.incoming(e, u)
          }, 0)
        }

        function i(n) {
          var r = e.swf + "?host=" + e.isHost,
            o = "easyXDM_swf_" + Math.floor(1e4 * Math.random());
          H.Fn.set("flash_loaded" + n.replace(/[\-.]/g, "_"), function () {
            H.stack.FlashTransport[n].swf = l = f.firstChild;
            for (var e = H.stack.FlashTransport[n].queue, t = 0; t < e.length; t++) e[t]();
            e.length = 0
          }), e.swfContainer ? f = "string" == typeof e.swfContainer ? t.getElementById(e.swfContainer) : e.swfContainer : (f = t.createElement("div"), _(f.style, P && e.swfNoThrottle ? {
            height: "20px",
            width: "20px",
            position: "fixed",
            right: 0,
            top: 0
          } : {
            height: "1px",
            width: "1px",
            position: "absolute",
            overflow: "hidden",
            right: 0,
            top: 0
          }), t.body.appendChild(f));
          var i = "callback=flash_loaded" + a(n.replace(/[\-.]/g, "_")) + "&proto=" + B.location.protocol + "&domain=" + a(m(B.location.href)) + "&port=" + a(y(B.location.href)) + "&ns=" + a(L);
          f.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + o + "' data='" + r + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + r + "'></param><param name='flashvars' value='" + i + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + i + "' allowScriptAccess='always' wmode='transparent' src='" + r + "' height='1' width='1'></embed></object>"
        }
        var s, c, u, l, f;
        return s = {
          outgoing: function (t, n, r) {
            l.postMessage(e.channel, t.toString()), r && r()
          },
          destroy: function () {
            try {
              l.destroyChannel(e.channel)
            } catch (e) {}
            l = null, c && (c.parentNode.removeChild(c), c = null)
          },
          onDOMReady: function () {
            u = e.remote, H.Fn.set("flash_" + e.channel + "_init", function () {
              o(function () {
                s.up.callback(!0)
              })
            }), H.Fn.set("flash_" + e.channel + "_onMessage", r), e.swf = v(e.swf);
            var t = m(e.swf),
              a = function () {
                H.stack.FlashTransport[t].init = !0, l = H.stack.FlashTransport[t].swf, l.createChannel(e.channel, e.secret, g(e.remote), e.isHost), e.isHost && (P && e.swfNoThrottle && _(e.props, {
                  position: "fixed",
                  right: 0,
                  top: 0,
                  height: "20px",
                  width: "20px"
                }), _(e.props, {
                  src: b(e.remote, {
                    xdm_e: g(n.href),
                    xdm_c: e.channel,
                    xdm_p: 6,
                    xdm_s: e.secret
                  }),
                  name: J + e.channel + "_provider"
                }), c = O(e))
              };
            H.stack.FlashTransport[t] && H.stack.FlashTransport[t].init ? a() : H.stack.FlashTransport[t] ? H.stack.FlashTransport[t].queue.push(a) : (H.stack.FlashTransport[t] = {
              queue: [a]
            }, i(t))
          },
          init: function () {
            p(s.onDOMReady, s)
          }
        }
      }, H.stack.PostMessageTransport = function (t) {
        function r(e) {
          if (e.origin) return g(e.origin);
          if (e.uri) return g(e.uri);
          if (e.domain) return n.protocol + "//" + e.domain;
          throw "Unable to retrieve the origin of the event"
        }

        function i(e) {
          var n = r(e);
          n == u && e.data.substring(0, t.channel.length + 1) == t.channel + " " && a.up.incoming(e.data.substring(t.channel.length + 1), n)
        }
        var a, s, c, u;
        return a = {
          outgoing: function (e, n, r) {
            c.postMessage(t.channel + " " + e, n || u), r && r()
          },
          destroy: function () {
            M(e, "message", i), s && (c = null, s.parentNode.removeChild(s), s = null)
          },
          onDOMReady: function () {
            if (u = g(t.remote), t.isHost) {
              F(e, "message", function n(r) {
                r.data == t.channel + "-ready" && (c = "postMessage" in s.contentWindow ? s.contentWindow : s.contentWindow.document, M(e, "message", n), F(e, "message", i), o(function () {
                  a.up.callback(!0)
                }, 0))
              }), _(t.props, {
                src: b(t.remote, {
                  xdm_e: g(n.href),
                  xdm_c: t.channel,
                  xdm_p: 1
                }),
                name: J + t.channel + "_provider"
              }), s = O(t)
            } else F(e, "message", i), c = "postMessage" in e.parent ? e.parent : e.parent.document, c.postMessage(t.channel + "-ready", u), o(function () {
              a.up.callback(!0)
            }, 0)
          },
          init: function () {
            p(a.onDOMReady, a)
          }
        }
      }, H.stack.FrameElementTransport = function (r) {
        var i, a, s, c;
        return i = {
          outgoing: function (e, t, n) {
            s.call(this, e), n && n()
          },
          destroy: function () {
            a && (a.parentNode.removeChild(a), a = null)
          },
          onDOMReady: function () {
            c = g(r.remote), r.isHost ? (_(r.props, {
              src: b(r.remote, {
                xdm_e: g(n.href),
                xdm_c: r.channel,
                xdm_p: 5
              }),
              name: J + r.channel + "_provider"
            }), a = O(r), a.fn = function (e) {
              return delete a.fn, s = e, o(function () {
                  i.up.callback(!0)
                }, 0),
                function (e) {
                  i.up.incoming(e, c)
                }
            }) : (t.referrer && g(t.referrer) != $.xdm_e && (e.top.location = $.xdm_e), s = e.frameElement.fn(function (e) {
              i.up.incoming(e, c)
            }), i.up.callback(!0))
          },
          init: function () {
            p(i.onDOMReady, i)
          }
        }
      }, H.stack.NameTransport = function (e) {
        function t(t) {
          var n = e.remoteHelper + (s ? "#_3" : "#_2") + e.channel;
          c.contentWindow.sendMessage(t, n)
        }

        function n() {
          s ? 2 != ++l && s || a.up.callback(!0) : (t("ready"), a.up.callback(!0))
        }

        function r(e) {
          a.up.incoming(e, d)
        }

        function i() {
          f && o(function () {
            f(!0)
          }, 0)
        }
        var a, s, c, u, l, f, d, h;
        return a = {
          outgoing: function (e, n, r) {
            f = r, t(e)
          },
          destroy: function () {
            c.parentNode.removeChild(c), c = null, s && (u.parentNode.removeChild(u), u = null)
          },
          onDOMReady: function () {
            s = e.isHost, l = 0, d = g(e.remote), e.local = v(e.local), s ? (H.Fn.set(e.channel, function (t) {
              s && "ready" === t && (H.Fn.set(e.channel, r), n())
            }), h = b(e.remote, {
              xdm_e: e.local,
              xdm_c: e.channel,
              xdm_p: 2
            }), _(e.props, {
              src: h + "#" + e.channel,
              name: J + e.channel + "_provider"
            }), u = O(e)) : (e.remoteHelper = e.remote, H.Fn.set(e.channel, r));
            var t = function t() {
              var r = c || this;
              M(r, "load", t), H.Fn.set(e.channel + "_load", i),
                function e() {
                  "function" == typeof r.contentWindow.sendMessage ? n() : o(e, 50)
                }()
            };
            c = O({
              props: {
                src: e.local + "#_4" + e.channel
              },
              onLoad: t
            })
          },
          init: function () {
            p(a.onDOMReady, a)
          }
        }
      }, H.stack.HashTransport = function (t) {
        function n(e) {
          if (m) {
            var n = t.remote + "#" + d++ + "_" + e;
            (c || !y ? m.contentWindow : m).location = n
          }
        }

        function r(e) {
          f = e, s.up.incoming(f.substring(f.indexOf("_") + 1), v)
        }

        function i() {
          if (h) {
            var e = h.location.href,
              t = "",
              n = e.indexOf("#"); - 1 != n && (t = e.substring(n)), t && t != f && r(t)
          }
        }

        function a() {
          u = setInterval(i, l)
        }
        var s, c, u, l, f, d, h, m, y, v;
        return s = {
          outgoing: function (e, t) {
            n(e)
          },
          destroy: function () {
            e.clearInterval(u), !c && y || m.parentNode.removeChild(m), m = null
          },
          onDOMReady: function () {
            if (c = t.isHost, l = t.interval, f = "#" + t.channel, d = 0, y = t.useParent, v = g(t.remote), c) {
              if (_(t.props, {
                  src: t.remote,
                  name: J + t.channel + "_provider"
                }), y) t.onLoad = function () {
                h = e, a(), s.up.callback(!0)
              };
              else {
                var n = 0,
                  r = t.delay / 50;
                ! function e() {
                  if (++n > r) throw new Error("Unable to reference listenerwindow");
                  try {
                    h = m.contentWindow.frames[J + t.channel + "_consumer"]
                  } catch (e) {}
                  h ? (a(), s.up.callback(!0)) : o(e, 50)
                }()
              }
              m = O(t)
            } else h = e, a(), y ? (m = parent, s.up.callback(!0)) : (_(t, {
              props: {
                src: t.remote + "#" + t.channel + new Date,
                name: J + t.channel + "_consumer"
              },
              onLoad: function () {
                s.up.callback(!0)
              }
            }), m = O(t))
          },
          init: function () {
            p(s.onDOMReady, s)
          }
        }
      }, H.stack.ReliableBehavior = function (e) {
        var t, n, r = 0,
          o = 0,
          i = "";
        return t = {
          incoming: function (e, a) {
            var s = e.indexOf("_"),
              c = e.substring(0, s).split(",");
            e = e.substring(s + 1), c[0] == r && (i = "", n && n(!0)), e.length > 0 && (t.down.outgoing(c[1] + "," + r + "_" + i, a), o != c[1] && (o = c[1], t.up.incoming(e, a)))
          },
          outgoing: function (e, a, s) {
            i = e, n = s, t.down.outgoing(o + "," + ++r + "_" + e, a)
          }
        }
      }, H.stack.QueueBehavior = function (e) {
        function t() {
          if (e.remove && 0 === s.length) return void C(n);
          if (!c && 0 !== s.length && !r) {
            c = !0;
            var i = s.shift();
            n.down.outgoing(i.data, i.origin, function (e) {
              c = !1, i.callback && o(function () {
                i.callback(e)
              }, 0), t()
            })
          }
        }
        var n, r, s = [],
          c = !0,
          u = "",
          l = 0,
          f = !1,
          p = !1;
        return n = {
          init: function () {
            w(e) && (e = {}), e.maxLength && (l = e.maxLength, p = !0), e.lazy ? f = !0 : n.down.init()
          },
          callback: function (e) {
            c = !1;
            var r = n.up;
            t(), r.callback(e)
          },
          incoming: function (t, r) {
            if (p) {
              var o = t.indexOf("_"),
                a = parseInt(t.substring(0, o), 10);
              u += t.substring(o + 1), 0 === a && (e.encode && (u = i(u)), n.up.incoming(u, r), u = "")
            } else n.up.incoming(t, r)
          },
          outgoing: function (r, o, i) {
            e.encode && (r = a(r));
            var c, u = [];
            if (p) {
              for (; 0 !== r.length;) c = r.substring(0, l), r = r.substring(c.length), u.push(c);
              for (; c = u.shift();) s.push({
                data: u.length + "_" + c,
                origin: o,
                callback: 0 === u.length ? i : null
              })
            } else s.push({
              data: r,
              origin: o,
              callback: i
            });
            f ? n.down.init() : t()
          },
          destroy: function () {
            r = !0, n.down.destroy()
          }
        }
      }, H.stack.VerifyBehavior = function (e) {
        function t() {
          r = Math.random().toString(16).substring(2), n.down.outgoing(r)
        }
        var n, r, o;
        return n = {
          incoming: function (i, a) {
            var s = i.indexOf("_"); - 1 === s ? i === r ? n.up.callback(!0) : o || (o = i, e.initiate || t(), n.down.outgoing(i)) : i.substring(0, s) === o && n.up.incoming(i.substring(s + 1), a)
          },
          outgoing: function (e, t, o) {
            n.down.outgoing(r + "_" + e, t, o)
          },
          callback: function (n) {
            e.initiate && t()
          }
        }
      }, H.stack.RpcBehavior = function (e, t) {
        function n(e) {
          e.jsonrpc = "2.0", i.down.outgoing(a.stringify(e))
        }

        function r(e, t) {
          var r = Array.prototype.slice;
          return function () {
            var o, i = arguments.length,
              a = {
                method: t
              };
            i > 0 && "function" == typeof arguments[i - 1] ? (i > 1 && "function" == typeof arguments[i - 2] ? (o = {
              success: arguments[i - 2],
              error: arguments[i - 1]
            }, a.params = r.call(arguments, 0, i - 2)) : (o = {
              success: arguments[i - 1]
            }, a.params = r.call(arguments, 0, i - 1)), c["" + ++s] = o, a.id = s) : a.params = r.call(arguments, 0), e.namedParams && 1 === a.params.length && (a.params = a.params[0]), n(a)
          }
        }

        function o(e, t, r, o) {
          if (!r) return void(t && n({
            id: t,
            error: {
              code: -32601,
              message: "Procedure not found."
            }
          }));
          var i, a;
          t ? (i = function (e) {
            i = R, n({
              id: t,
              result: e
            })
          }, a = function (e, r) {
            a = R;
            var o = {
              id: t,
              error: {
                code: -32099,
                message: e
              }
            };
            r && (o.error.data = r), n(o)
          }) : i = a = R, u(o) || (o = [o]);
          try {
            var s = r.method.apply(r.scope, o.concat([i, a]));
            w(s) || i(s)
          } catch (e) {
            a(e.message)
          }
        }
        var i, a = t.serializer || X(),
          s = 0,
          c = {};
        return i = {
          incoming: function (e, r) {
            var i = a.parse(e);
            if (i.method) t.handle ? t.handle(i, n) : o(i.method, i.id, t.local[i.method], i.params);
            else {
              var s = c[i.id];
              i.error ? s.error && s.error(i.error) : s.success && s.success(i.result), delete c[i.id]
            }
          },
          init: function () {
            if (t.remote)
              for (var n in t.remote) t.remote.hasOwnProperty(n) && (e[n] = r(t.remote[n], n));
            i.down.init()
          },
          destroy: function () {
            for (var n in t.remote) t.remote.hasOwnProperty(n) && e.hasOwnProperty(n) && delete e[n];
            i.down.destroy()
          }
        }
      }, e.easyXDM = H
  }(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent)
}, function (e, t, n) {
  "use strict";
  (function (t) {
    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    n(5), n(6);
    var o = n(0),
      i = r(o),
      a = n(3),
      s = r(a),
      c = n(4),
      u = r(c);
    e.exports = s.default, t.Omise = new s.default(i.default), t.OmiseCard = new u.default(i.default)
  }).call(t, n(1))
}, function (e, t, n) {
  "use strict";
  (function (e) {
    function r(t) {
      e.addEventListener("message", function (e) {
        var n = (0, f.safeJsonParse)(e.data),
          r = n.type,
          o = n.data;
        s(t, r, o)
      }, !1)
    }

    function o(e, t) {
      c(e, p.SHOW_IFRAME_APP_FORM, t, l.default.cardHost)
    }

    function i() {
      c(parent.window, p.CLOSE_IFRAME, null, "*")
    }

    function a(e) {
      c(parent.window, p.CLOSE_AND_SEND_TOKEN, e, "*")
    }

    function s(e, t, n) {
      switch (t) {
        case p.CLOSE_IFRAME:
          e.close();
          break;
        case p.CLOSE_AND_SEND_TOKEN:
          e.close(), e.setTokenAtOmiseTokenField(n)
      }
    }

    function c(e, t, n, r) {
      var o = JSON.stringify({
        type: t,
        data: n
      });
      e.postMessage(o, r)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.messageType = void 0, t.default = r, t.messageShowIframeAppForm = o, t.messageCloseIframe = i, t.messageCloseAndSendToken = a;
    var u = n(0),
      l = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(u),
      f = n(2),
      p = t.messageType = {
        CLOSE_IFRAME: "CLOSE_IFRAME",
        SHOW_IFRAME_APP_FORM: "SHOW_IFRAME_APP_FORM",
        CLOSE_AND_SEND_TOKEN: "CLOSE_AND_SEND_TOKEN"
      }
  }).call(t, n(1))
}, function (e, t, n) {
  (function (e) {
    ! function (e) {
      "use strict";

      function t(e) {
        if (e && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(e) && !/%[^0-9a-f]/i.test(e) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(e)) {
          var t = [],
            n = "",
            r = "",
            o = "",
            a = "",
            s = "",
            c = "";
          if (t = i(e), n = t[1], r = t[2], o = t[3], a = t[4], s = t[5], n && n.length && o.length >= 0) {
            if (r && r.length) {
              if (0 !== o.length && !/^\//.test(o)) return
            } else if (/^\/\//.test(o)) return;
            if (/^[a-z][a-z0-9\+\-\.]*$/.test(n.toLowerCase())) return c += n + ":", r && r.length && (c += "//" + r), c += o, a && a.length && (c += "?" + a), s && s.length && (c += "#" + s), c
          }
        }
      }

      function n(e, n) {
        if (t(e)) {
          var r = [],
            o = "",
            a = "",
            s = "",
            c = "",
            u = "",
            l = "",
            f = "";
          if (r = i(e), o = r[1], a = r[2], s = r[3], u = r[4], l = r[5], o) {
            if (n) {
              if ("https" != o.toLowerCase()) return
            } else if ("http" != o.toLowerCase()) return;
            if (a) return /:(\d+)$/.test(a) && (c = a.match(/:(\d+)$/)[0], a = a.replace(/:\d+$/, "")), f += o + ":", f += "//" + a, c && (f += c), f += s, u && u.length && (f += "?" + u), l && l.length && (f += "#" + l), f
          }
        }
      }

      function r(e) {
        return n(e, !0)
      }

      function o(e) {
        return n(e) || r(e)
      }
      e.exports.is_uri = t, e.exports.is_http_uri = n, e.exports.is_https_uri = r, e.exports.is_web_uri = o, e.exports.isUri = t, e.exports.isHttpUri = n, e.exports.isHttpsUri = r, e.exports.isWebUri = o;
      var i = function (e) {
        return e.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/)
      }
    }(e)
  }).call(t, n(10)(e))
}, function (e, t) {
  e.exports = function (e) {
    return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
      enumerable: !0,
      get: function () {
        return e.l
      }
    }), Object.defineProperty(e, "id", {
      enumerable: !0,
      get: function () {
        return e.i
      }
    }), e.webpackPolyfill = 1), e
  }
}, function (e, t) {
  ! function (e) {
    "use strict";

    function t(e) {
      if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
      return e.toLowerCase()
    }

    function n(e) {
      return "string" != typeof e && (e = String(e)), e
    }

    function r(e) {
      var t = {
        next: function () {
          var t = e.shift();
          return {
            done: void 0 === t,
            value: t
          }
        }
      };
      return g.iterable && (t[Symbol.iterator] = function () {
        return t
      }), t
    }

    function o(e) {
      this.map = {}, e instanceof o ? e.forEach(function (e, t) {
        this.append(t, e)
      }, this) : Array.isArray(e) ? e.forEach(function (e) {
        this.append(e[0], e[1])
      }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
        this.append(t, e[t])
      }, this)
    }

    function i(e) {
      if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
      e.bodyUsed = !0
    }

    function a(e) {
      return new Promise(function (t, n) {
        e.onload = function () {
          t(e.result)
        }, e.onerror = function () {
          n(e.error)
        }
      })
    }

    function s(e) {
      var t = new FileReader,
        n = a(t);
      return t.readAsArrayBuffer(e), n
    }

    function c(e) {
      var t = new FileReader,
        n = a(t);
      return t.readAsText(e), n
    }

    function u(e) {
      for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
      return n.join("")
    }

    function l(e) {
      if (e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return t.set(new Uint8Array(e)), t.buffer
    }

    function f() {
      return this.bodyUsed = !1, this._initBody = function (e) {
        if (this._bodyInit = e, e)
          if ("string" == typeof e) this._bodyText = e;
          else if (g.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
        else if (g.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
        else if (g.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
        else if (g.arrayBuffer && g.blob && b(e)) this._bodyArrayBuffer = l(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
        else {
          if (!g.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !w(e)) throw new Error("unsupported BodyInit type");
          this._bodyArrayBuffer = l(e)
        } else this._bodyText = "";
        this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : g.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
      }, g.blob && (this.blob = function () {
        var e = i(this);
        if (e) return e;
        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
        if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
        return Promise.resolve(new Blob([this._bodyText]))
      }, this.arrayBuffer = function () {
        return this._bodyArrayBuffer ? i(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
      }), this.text = function () {
        var e = i(this);
        if (e) return e;
        if (this._bodyBlob) return c(this._bodyBlob);
        if (this._bodyArrayBuffer) return Promise.resolve(u(this._bodyArrayBuffer));
        if (this._bodyFormData) throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText)
      }, g.formData && (this.formData = function () {
        return this.text().then(h)
      }), this.json = function () {
        return this.text().then(JSON.parse)
      }, this
    }

    function p(e) {
      var t = e.toUpperCase();
      return _.indexOf(t) > -1 ? t : e
    }

    function d(e, t) {
      t = t || {};
      var n = t.body;
      if (e instanceof d) {
        if (e.bodyUsed) throw new TypeError("Already read");
        this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new o(e.headers)), this.method = e.method, this.mode = e.mode, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0)
      } else this.url = String(e);
      if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new o(t.headers)), this.method = p(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
      this._initBody(n)
    }

    function h(e) {
      var t = new FormData;
      return e.trim().split("&").forEach(function (e) {
        if (e) {
          var n = e.split("="),
            r = n.shift().replace(/\+/g, " "),
            o = n.join("=").replace(/\+/g, " ");
          t.append(decodeURIComponent(r), decodeURIComponent(o))
        }
      }), t
    }

    function m(e) {
      var t = new o;
      return e.split(/\r?\n/).forEach(function (e) {
        var n = e.split(":"),
          r = n.shift().trim();
        if (r) {
          var o = n.join(":").trim();
          t.append(r, o)
        }
      }), t
    }

    function y(e, t) {
      t || (t = {}), this.type = "default", this.status = "status" in t ? t.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new o(t.headers), this.url = t.url || "", this._initBody(e)
    }
    if (!e.fetch) {
      var g = {
        searchParams: "URLSearchParams" in e,
        iterable: "Symbol" in e && "iterator" in Symbol,
        blob: "FileReader" in e && "Blob" in e && function () {
          try {
            return new Blob, !0
          } catch (e) {
            return !1
          }
        }(),
        formData: "FormData" in e,
        arrayBuffer: "ArrayBuffer" in e
      };
      if (g.arrayBuffer) var v = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        b = function (e) {
          return e && DataView.prototype.isPrototypeOf(e)
        },
        w = ArrayBuffer.isView || function (e) {
          return e && v.indexOf(Object.prototype.toString.call(e)) > -1
        };
      o.prototype.append = function (e, r) {
        e = t(e), r = n(r);
        var o = this.map[e];
        this.map[e] = o ? o + "," + r : r
      }, o.prototype.delete = function (e) {
        delete this.map[t(e)]
      }, o.prototype.get = function (e) {
        return e = t(e), this.has(e) ? this.map[e] : null
      }, o.prototype.has = function (e) {
        return this.map.hasOwnProperty(t(e))
      }, o.prototype.set = function (e, r) {
        this.map[t(e)] = n(r)
      }, o.prototype.forEach = function (e, t) {
        for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
      }, o.prototype.keys = function () {
        var e = [];
        return this.forEach(function (t, n) {
          e.push(n)
        }), r(e)
      }, o.prototype.values = function () {
        var e = [];
        return this.forEach(function (t) {
          e.push(t)
        }), r(e)
      }, o.prototype.entries = function () {
        var e = [];
        return this.forEach(function (t, n) {
          e.push([n, t])
        }), r(e)
      }, g.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
      var _ = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      d.prototype.clone = function () {
        return new d(this, {
          body: this._bodyInit
        })
      }, f.call(d.prototype), f.call(y.prototype), y.prototype.clone = function () {
        return new y(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new o(this.headers),
          url: this.url
        })
      }, y.error = function () {
        var e = new y(null, {
          status: 0,
          statusText: ""
        });
        return e.type = "error", e
      };
      var k = [301, 302, 303, 307, 308];
      y.redirect = function (e, t) {
        if (-1 === k.indexOf(t)) throw new RangeError("Invalid status code");
        return new y(null, {
          status: t,
          headers: {
            location: e
          }
        })
      }, e.Headers = o, e.Request = d, e.Response = y, e.fetch = function (e, t) {
        return new Promise(function (n, r) {
          var o = new d(e, t),
            i = new XMLHttpRequest;
          i.onload = function () {
            var e = {
              status: i.status,
              statusText: i.statusText,
              headers: m(i.getAllResponseHeaders() || "")
            };
            e.url = "responseURL" in i ? i.responseURL : e.headers.get("X-Request-URL");
            var t = "response" in i ? i.response : i.responseText;
            n(new y(t, e))
          }, i.onerror = function () {
            r(new TypeError("Network request failed"))
          }, i.ontimeout = function () {
            r(new TypeError("Network request failed"))
          }, i.open(o.method, o.url, !0), "include" === o.credentials && (i.withCredentials = !0), "responseType" in i && g.blob && (i.responseType = "blob"), o.headers.forEach(function (e, t) {
            i.setRequestHeader(t, e)
          }), i.send(void 0 === o._bodyInit ? null : o._bodyInit)
        })
      }, e.fetch.polyfill = !0
    }
  }("undefined" != typeof self ? self : this)
}]);
