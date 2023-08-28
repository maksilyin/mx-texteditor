var Er = Object.defineProperty;
var _r = (t, e, o) => e in t ? Er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var he = (t, e, o) => (_r(t, typeof e != "symbol" ? e + "" : e, o), o);
import { inject as Nr, watch as Te, effectScope as Sr, reactive as Jt, computed as Ae, ref as K, defineComponent as Vn, onMounted as $e, onBeforeMount as Fn, openBlock as z, createBlock as Pe, resolveDynamicComponent as ht, resolveComponent as Xe, createElementBlock as ee, createVNode as dt, toDisplayString as $n, createCommentVNode as et, Fragment as pt, renderList as Ut, withCtx as un, normalizeClass as wt, createElementVNode as Z, pushScopeId as Ct, popScopeId as Mt, withDirectives as xo, vModelText as Oo, createTextVNode as wr, mergeProps as bo, onUnmounted as Cr, withKeys as Mr, normalizeStyle as Tr, Transition as ao } from "vue";
function Dr() {
  return Io().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Io() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const xr = typeof Proxy == "function", Or = "devtools-plugin:setup", br = "plugin:settings:set";
let Bt, Ln;
function Ir() {
  var t;
  return Bt !== void 0 || (typeof window < "u" && window.performance ? (Bt = !0, Ln = window.performance) : typeof global < "u" && (!((t = global.perf_hooks) === null || t === void 0) && t.performance) ? (Bt = !0, Ln = global.perf_hooks.performance) : Bt = !1), Bt;
}
function Ar() {
  return Ir() ? Ln.now() : Date.now();
}
class Rr {
  constructor(e, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = e, this.hook = o;
    const n = {};
    if (e.settings)
      for (const s in e.settings) {
        const l = e.settings[s];
        n[s] = l.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${e.id}`;
    let c = Object.assign({}, n);
    try {
      const s = localStorage.getItem(r), l = JSON.parse(s);
      Object.assign(c, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return c;
      },
      setSettings(s) {
        try {
          localStorage.setItem(r, JSON.stringify(s));
        } catch {
        }
        c = s;
      },
      now() {
        return Ar();
      }
    }, o && o.on(br, (s, l) => {
      s === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (s, l) => this.target ? this.target.on[l] : (...p) => {
        this.onQueue.push({
          method: l,
          args: p
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (s, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...p) => (this.targetQueue.push({
        method: l,
        args: p,
        resolve: () => {
        }
      }), this.fallbacks[l](...p)) : (...p) => new Promise((u) => {
        this.targetQueue.push({
          method: l,
          args: p,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(e) {
    this.target = e;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function Lr(t, e) {
  const o = t, n = Io(), r = Dr(), c = xr && o.enableEarlyProxy;
  if (r && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !c))
    r.emit(Or, t, e);
  else {
    const s = c ? new Rr(o, r) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: e,
      proxy: s
    }), s && e(s.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var Ao = "store";
function ot(t) {
  return t === void 0 && (t = null), Nr(t !== null ? t : Ao);
}
function It(t, e) {
  Object.keys(t).forEach(function(o) {
    return e(t[o], o);
  });
}
function kr(t) {
  return t !== null && typeof t == "object";
}
function jr(t) {
  return t && typeof t.then == "function";
}
function ct(t, e) {
  if (!t)
    throw new Error("[vuex] " + e);
}
function Br(t, e) {
  return function() {
    return t(e);
  };
}
function Ro(t, e, o) {
  return e.indexOf(t) < 0 && (o && o.prepend ? e.unshift(t) : e.push(t)), function() {
    var n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  };
}
function Lo(t, e) {
  t._actions = /* @__PURE__ */ Object.create(null), t._mutations = /* @__PURE__ */ Object.create(null), t._wrappedGetters = /* @__PURE__ */ Object.create(null), t._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var o = t.state;
  hn(t, o, [], t._modules.root, !0), Yn(t, o, e);
}
function Yn(t, e, o) {
  var n = t._state, r = t._scope;
  t.getters = {}, t._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var c = t._wrappedGetters, s = {}, l = {}, p = Sr(!0);
  p.run(function() {
    It(c, function(u, h) {
      s[h] = Br(u, t), l[h] = Ae(function() {
        return s[h]();
      }), Object.defineProperty(t.getters, h, {
        get: function() {
          return l[h].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), t._state = Jt({
    data: e
  }), t._scope = p, t.strict && Vr(t), n && o && t._withCommit(function() {
    n.data = null;
  }), r && r.stop();
}
function hn(t, e, o, n, r) {
  var c = !o.length, s = t._modules.getNamespace(o);
  if (n.namespaced && (t._modulesNamespaceMap[s] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + s + " for the namespaced module " + o.join("/")), t._modulesNamespaceMap[s] = n), !c && !r) {
    var l = Wn(e, o.slice(0, -1)), p = o[o.length - 1];
    t._withCommit(function() {
      process.env.NODE_ENV !== "production" && p in l && console.warn(
        '[vuex] state field "' + p + '" was overridden by a module with the same name at "' + o.join(".") + '"'
      ), l[p] = n.state;
    });
  }
  var u = n.context = Pr(t, s, o);
  n.forEachMutation(function(h, g) {
    var S = s + g;
    zr(t, S, h, u);
  }), n.forEachAction(function(h, g) {
    var S = h.root ? g : s + g, w = h.handler || h;
    Hr(t, S, w, u);
  }), n.forEachGetter(function(h, g) {
    var S = s + g;
    Ur(t, S, h, u);
  }), n.forEachChild(function(h, g) {
    hn(t, e, o.concat(g), h, r);
  });
}
function Pr(t, e, o) {
  var n = e === "", r = {
    dispatch: n ? t.dispatch : function(c, s, l) {
      var p = dn(c, s, l), u = p.payload, h = p.options, g = p.type;
      if ((!h || !h.root) && (g = e + g, process.env.NODE_ENV !== "production" && !t._actions[g])) {
        console.error("[vuex] unknown local action type: " + p.type + ", global type: " + g);
        return;
      }
      return t.dispatch(g, u);
    },
    commit: n ? t.commit : function(c, s, l) {
      var p = dn(c, s, l), u = p.payload, h = p.options, g = p.type;
      if ((!h || !h.root) && (g = e + g, process.env.NODE_ENV !== "production" && !t._mutations[g])) {
        console.error("[vuex] unknown local mutation type: " + p.type + ", global type: " + g);
        return;
      }
      t.commit(g, u, h);
    }
  };
  return Object.defineProperties(r, {
    getters: {
      get: n ? function() {
        return t.getters;
      } : function() {
        return ko(t, e);
      }
    },
    state: {
      get: function() {
        return Wn(t.state, o);
      }
    }
  }), r;
}
function ko(t, e) {
  if (!t._makeLocalGettersCache[e]) {
    var o = {}, n = e.length;
    Object.keys(t.getters).forEach(function(r) {
      if (r.slice(0, n) === e) {
        var c = r.slice(n);
        Object.defineProperty(o, c, {
          get: function() {
            return t.getters[r];
          },
          enumerable: !0
        });
      }
    }), t._makeLocalGettersCache[e] = o;
  }
  return t._makeLocalGettersCache[e];
}
function zr(t, e, o, n) {
  var r = t._mutations[e] || (t._mutations[e] = []);
  r.push(function(s) {
    o.call(t, n.state, s);
  });
}
function Hr(t, e, o, n) {
  var r = t._actions[e] || (t._actions[e] = []);
  r.push(function(s) {
    var l = o.call(t, {
      dispatch: n.dispatch,
      commit: n.commit,
      getters: n.getters,
      state: n.state,
      rootGetters: t.getters,
      rootState: t.state
    }, s);
    return jr(l) || (l = Promise.resolve(l)), t._devtoolHook ? l.catch(function(p) {
      throw t._devtoolHook.emit("vuex:error", p), p;
    }) : l;
  });
}
function Ur(t, e, o, n) {
  if (t._wrappedGetters[e]) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate getter key: " + e);
    return;
  }
  t._wrappedGetters[e] = function(c) {
    return o(
      n.state,
      // local state
      n.getters,
      // local getters
      c.state,
      // root state
      c.getters
      // root getters
    );
  };
}
function Vr(t) {
  Te(function() {
    return t._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && ct(t._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function Wn(t, e) {
  return e.reduce(function(o, n) {
    return o[n];
  }, t);
}
function dn(t, e, o) {
  return kr(t) && t.type && (o = e, e = t, t = t.type), process.env.NODE_ENV !== "production" && ct(typeof t == "string", "expects string as the type, but found " + typeof t + "."), { type: t, payload: e, options: o };
}
var Fr = "vuex bindings", co = "vuex:mutations", On = "vuex:actions", Pt = "vuex", $r = 0;
function Yr(t, e) {
  Lr(
    {
      id: "org.vuejs.vuex",
      app: t,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [Fr]
    },
    function(o) {
      o.addTimelineLayer({
        id: co,
        label: "Vuex Mutations",
        color: lo
      }), o.addTimelineLayer({
        id: On,
        label: "Vuex Actions",
        color: lo
      }), o.addInspector({
        id: Pt,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), o.on.getInspectorTree(function(n) {
        if (n.app === t && n.inspectorId === Pt)
          if (n.filter) {
            var r = [];
            zo(r, e._modules.root, n.filter, ""), n.rootNodes = r;
          } else
            n.rootNodes = [
              Po(e._modules.root, "")
            ];
      }), o.on.getInspectorState(function(n) {
        if (n.app === t && n.inspectorId === Pt) {
          var r = n.nodeId;
          ko(e, r), n.state = Gr(
            Zr(e._modules, r),
            r === "root" ? e.getters : e._makeLocalGettersCache,
            r
          );
        }
      }), o.on.editInspectorState(function(n) {
        if (n.app === t && n.inspectorId === Pt) {
          var r = n.nodeId, c = n.path;
          r !== "root" && (c = r.split("/").filter(Boolean).concat(c)), e._withCommit(function() {
            n.set(e._state.data, c, n.state.value);
          });
        }
      }), e.subscribe(function(n, r) {
        var c = {};
        n.payload && (c.payload = n.payload), c.state = r, o.notifyComponentUpdate(), o.sendInspectorTree(Pt), o.sendInspectorState(Pt), o.addTimelineEvent({
          layerId: co,
          event: {
            time: Date.now(),
            title: n.type,
            data: c
          }
        });
      }), e.subscribeAction({
        before: function(n, r) {
          var c = {};
          n.payload && (c.payload = n.payload), n._id = $r++, n._time = Date.now(), c.state = r, o.addTimelineEvent({
            layerId: On,
            event: {
              time: n._time,
              title: n.type,
              groupId: n._id,
              subtitle: "start",
              data: c
            }
          });
        },
        after: function(n, r) {
          var c = {}, s = Date.now() - n._time;
          c.duration = {
            _custom: {
              type: "duration",
              display: s + "ms",
              tooltip: "Action duration",
              value: s
            }
          }, n.payload && (c.payload = n.payload), c.state = r, o.addTimelineEvent({
            layerId: On,
            event: {
              time: Date.now(),
              title: n.type,
              groupId: n._id,
              subtitle: "end",
              data: c
            }
          });
        }
      });
    }
  );
}
var lo = 8702998, Wr = 6710886, Qr = 16777215, jo = {
  label: "namespaced",
  textColor: Qr,
  backgroundColor: Wr
};
function Bo(t) {
  return t && t !== "root" ? t.split("/").slice(-2, -1)[0] : "Root";
}
function Po(t, e) {
  return {
    id: e || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: Bo(e),
    tags: t.namespaced ? [jo] : [],
    children: Object.keys(t._children).map(
      function(o) {
        return Po(
          t._children[o],
          e + o + "/"
        );
      }
    )
  };
}
function zo(t, e, o, n) {
  n.includes(o) && t.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: e.namespaced ? [jo] : []
  }), Object.keys(e._children).forEach(function(r) {
    zo(t, e._children[r], o, n + r + "/");
  });
}
function Gr(t, e, o) {
  e = o === "root" ? e : e[o];
  var n = Object.keys(e), r = {
    state: Object.keys(t.state).map(function(s) {
      return {
        key: s,
        editable: !0,
        value: t.state[s]
      };
    })
  };
  if (n.length) {
    var c = qr(e);
    r.getters = Object.keys(c).map(function(s) {
      return {
        key: s.endsWith("/") ? Bo(s) : s,
        editable: !1,
        value: kn(function() {
          return c[s];
        })
      };
    });
  }
  return r;
}
function qr(t) {
  var e = {};
  return Object.keys(t).forEach(function(o) {
    var n = o.split("/");
    if (n.length > 1) {
      var r = e, c = n.pop();
      n.forEach(function(s) {
        r[s] || (r[s] = {
          _custom: {
            value: {},
            display: s,
            tooltip: "Module",
            abstract: !0
          }
        }), r = r[s]._custom.value;
      }), r[c] = kn(function() {
        return t[o];
      });
    } else
      e[o] = kn(function() {
        return t[o];
      });
  }), e;
}
function Zr(t, e) {
  var o = e.split("/").filter(function(n) {
    return n;
  });
  return o.reduce(
    function(n, r, c) {
      var s = n[r];
      if (!s)
        throw new Error('Missing module "' + r + '" for path "' + e + '".');
      return c === o.length - 1 ? s : s._children;
    },
    e === "root" ? t : t.root._children
  );
}
function kn(t) {
  try {
    return t();
  } catch (e) {
    return e;
  }
}
var lt = function(e, o) {
  this.runtime = o, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = e;
  var n = e.state;
  this.state = (typeof n == "function" ? n() : n) || {};
}, Ho = { namespaced: { configurable: !0 } };
Ho.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
lt.prototype.addChild = function(e, o) {
  this._children[e] = o;
};
lt.prototype.removeChild = function(e) {
  delete this._children[e];
};
lt.prototype.getChild = function(e) {
  return this._children[e];
};
lt.prototype.hasChild = function(e) {
  return e in this._children;
};
lt.prototype.update = function(e) {
  this._rawModule.namespaced = e.namespaced, e.actions && (this._rawModule.actions = e.actions), e.mutations && (this._rawModule.mutations = e.mutations), e.getters && (this._rawModule.getters = e.getters);
};
lt.prototype.forEachChild = function(e) {
  It(this._children, e);
};
lt.prototype.forEachGetter = function(e) {
  this._rawModule.getters && It(this._rawModule.getters, e);
};
lt.prototype.forEachAction = function(e) {
  this._rawModule.actions && It(this._rawModule.actions, e);
};
lt.prototype.forEachMutation = function(e) {
  this._rawModule.mutations && It(this._rawModule.mutations, e);
};
Object.defineProperties(lt.prototype, Ho);
var At = function(e) {
  this.register([], e, !1);
};
At.prototype.get = function(e) {
  return e.reduce(function(o, n) {
    return o.getChild(n);
  }, this.root);
};
At.prototype.getNamespace = function(e) {
  var o = this.root;
  return e.reduce(function(n, r) {
    return o = o.getChild(r), n + (o.namespaced ? r + "/" : "");
  }, "");
};
At.prototype.update = function(e) {
  Uo([], this.root, e);
};
At.prototype.register = function(e, o, n) {
  var r = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && Vo(e, o);
  var c = new lt(o, n);
  if (e.length === 0)
    this.root = c;
  else {
    var s = this.get(e.slice(0, -1));
    s.addChild(e[e.length - 1], c);
  }
  o.modules && It(o.modules, function(l, p) {
    r.register(e.concat(p), l, n);
  });
};
At.prototype.unregister = function(e) {
  var o = this.get(e.slice(0, -1)), n = e[e.length - 1], r = o.getChild(n);
  if (!r) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + n + "', which is not registered"
    );
    return;
  }
  r.runtime && o.removeChild(n);
};
At.prototype.isRegistered = function(e) {
  var o = this.get(e.slice(0, -1)), n = e[e.length - 1];
  return o ? o.hasChild(n) : !1;
};
function Uo(t, e, o) {
  if (process.env.NODE_ENV !== "production" && Vo(t, o), e.update(o), o.modules)
    for (var n in o.modules) {
      if (!e.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      Uo(
        t.concat(n),
        e.getChild(n),
        o.modules[n]
      );
    }
}
var uo = {
  assert: function(t) {
    return typeof t == "function";
  },
  expected: "function"
}, Kr = {
  assert: function(t) {
    return typeof t == "function" || typeof t == "object" && typeof t.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, fo = {
  getters: uo,
  mutations: uo,
  actions: Kr
};
function Vo(t, e) {
  Object.keys(fo).forEach(function(o) {
    if (e[o]) {
      var n = fo[o];
      It(e[o], function(r, c) {
        ct(
          n.assert(r),
          Jr(t, o, c, r, n.expected)
        );
      });
    }
  });
}
function Jr(t, e, o, n, r) {
  var c = e + " should be " + r + ' but "' + e + "." + o + '"';
  return t.length > 0 && (c += ' in module "' + t.join(".") + '"'), c += " is " + JSON.stringify(n) + ".", c;
}
function Xr(t) {
  return new Ge(t);
}
var Ge = function t(e) {
  var o = this;
  e === void 0 && (e = {}), process.env.NODE_ENV !== "production" && (ct(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), ct(this instanceof t, "store must be called with the new operator."));
  var n = e.plugins;
  n === void 0 && (n = []);
  var r = e.strict;
  r === void 0 && (r = !1);
  var c = e.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new At(e), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = c;
  var s = this, l = this, p = l.dispatch, u = l.commit;
  this.dispatch = function(S, w) {
    return p.call(s, S, w);
  }, this.commit = function(S, w, _) {
    return u.call(s, S, w, _);
  }, this.strict = r;
  var h = this._modules.root.state;
  hn(this, h, [], this._modules.root), Yn(this, h), n.forEach(function(g) {
    return g(o);
  });
}, Qn = { state: { configurable: !0 } };
Ge.prototype.install = function(e, o) {
  e.provide(o || Ao, this), e.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && Yr(e, this);
};
Qn.state.get = function() {
  return this._state.data;
};
Qn.state.set = function(t) {
  process.env.NODE_ENV !== "production" && ct(!1, "use store.replaceState() to explicit replace store state.");
};
Ge.prototype.commit = function(e, o, n) {
  var r = this, c = dn(e, o, n), s = c.type, l = c.payload, p = c.options, u = { type: s, payload: l }, h = this._mutations[s];
  if (!h) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + s);
    return;
  }
  this._withCommit(function() {
    h.forEach(function(S) {
      S(l);
    });
  }), this._subscribers.slice().forEach(function(g) {
    return g(u, r.state);
  }), process.env.NODE_ENV !== "production" && p && p.silent && console.warn(
    "[vuex] mutation type: " + s + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
Ge.prototype.dispatch = function(e, o) {
  var n = this, r = dn(e, o), c = r.type, s = r.payload, l = { type: c, payload: s }, p = this._actions[c];
  if (!p) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + c);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(h) {
      return h.before;
    }).forEach(function(h) {
      return h.before(l, n.state);
    });
  } catch (h) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(h));
  }
  var u = p.length > 1 ? Promise.all(p.map(function(h) {
    return h(s);
  })) : p[0](s);
  return new Promise(function(h, g) {
    u.then(function(S) {
      try {
        n._actionSubscribers.filter(function(w) {
          return w.after;
        }).forEach(function(w) {
          return w.after(l, n.state);
        });
      } catch (w) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(w));
      }
      h(S);
    }, function(S) {
      try {
        n._actionSubscribers.filter(function(w) {
          return w.error;
        }).forEach(function(w) {
          return w.error(l, n.state, S);
        });
      } catch (w) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(w));
      }
      g(S);
    });
  });
};
Ge.prototype.subscribe = function(e, o) {
  return Ro(e, this._subscribers, o);
};
Ge.prototype.subscribeAction = function(e, o) {
  var n = typeof e == "function" ? { before: e } : e;
  return Ro(n, this._actionSubscribers, o);
};
Ge.prototype.watch = function(e, o, n) {
  var r = this;
  return process.env.NODE_ENV !== "production" && ct(typeof e == "function", "store.watch only accepts a function."), Te(function() {
    return e(r.state, r.getters);
  }, o, Object.assign({}, n));
};
Ge.prototype.replaceState = function(e) {
  var o = this;
  this._withCommit(function() {
    o._state.data = e;
  });
};
Ge.prototype.registerModule = function(e, o, n) {
  n === void 0 && (n = {}), typeof e == "string" && (e = [e]), process.env.NODE_ENV !== "production" && (ct(Array.isArray(e), "module path must be a string or an Array."), ct(e.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(e, o), hn(this, this.state, e, this._modules.get(e), n.preserveState), Yn(this, this.state);
};
Ge.prototype.unregisterModule = function(e) {
  var o = this;
  typeof e == "string" && (e = [e]), process.env.NODE_ENV !== "production" && ct(Array.isArray(e), "module path must be a string or an Array."), this._modules.unregister(e), this._withCommit(function() {
    var n = Wn(o.state, e.slice(0, -1));
    delete n[e[e.length - 1]];
  }), Lo(this);
};
Ge.prototype.hasModule = function(e) {
  return typeof e == "string" && (e = [e]), process.env.NODE_ENV !== "production" && ct(Array.isArray(e), "module path must be a string or an Array."), this._modules.isRegistered(e);
};
Ge.prototype.hotUpdate = function(e) {
  this._modules.update(e), Lo(this, !0);
};
Ge.prototype._withCommit = function(e) {
  var o = this._committing;
  this._committing = !0, e(), this._committing = o;
};
Object.defineProperties(Ge.prototype, Qn);
class tt {
}
he(tt, "getCaretPos", (e) => {
  if (e.focus(), document.selection) {
    const o = document.selection.createRange(), n = o.duplicate();
    return o.collapse(!0), n.moveToElementText(e), n.setEndPoint("EndToEnd", o), n.text.length;
  } else
    return window.getSelection().getRangeAt(0).startOffset;
}), he(tt, "getSelectionCoordinates", (e) => {
  const o = e.startContainer, n = e.startOffset, r = e.nativeRange.getBoundingClientRect();
  document.createRange().setStart(o, n);
  const s = r.left, l = r.top;
  return { x: s, y: l };
}), he(tt, "checkImageClipboard", (e) => {
  const o = e.items, n = [].slice.call(o).filter(function(s) {
    return s.type.indexOf("image") !== -1 && s.type.indexOf("image-uri") !== 0;
  });
  if (n.length === 0)
    return;
  let c = n[0].getAsFile();
  return c || !1;
}), he(tt, "isMobile", () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
const nt = {
  props: {
    blockId: Number,
    startValue: {
      default: null
    },
    select: {
      default: !1
    },
    class: {
      default: ""
    }
  },
  setup(t) {
    const e = ot("textEditor"), o = K(e.getters.getBlock(t.blockId).value);
    let n = () => {
    };
    return Te(o, (p) => {
      e.commit("updateBlock", [t.blockId, p, n()]);
    }), {
      value: o,
      setOutput: (p) => {
        n = p;
      },
      keyDownHandler: (p) => {
        p.which === 13 && (p.preventDefault(), e.dispatch("addBlockByCode", "text"));
      },
      setElementSelect: (p, u) => {
        p.onmouseup = function() {
          let h = "", g = null;
          window.getSelection ? (g = window.getSelection().getRangeAt(0), h = window.getSelection().toString()) : document.selection && document.selection.type !== "Control" && (g = document.selection.createRange(), h = g.text), h !== "" ? (e.commit("setElementSelectTextCoordinates", tt.getSelectionCoordinates()), e.commit("setSelectedElement", p), e.state.selected = {
            range: g,
            value: u
          }, console.log(e.state.selected)) : (e.commit("setElementSelectTextCoordinates", null), e.commit("setSelectedElement", null), e.state.selected = {
            range: null,
            value: null
          });
        };
      },
      onMouseupHandler: (p, u) => {
        const h = p.target;
        let g = "", S = null;
        window.getSelection ? (S = window.getSelection().getRangeAt(0), g = window.getSelection().toString()) : document.selection && document.selection.type !== "Control" && (S = document.selection.createRange(), g = S.text), g !== "" ? (e.commit("setElementSelectTextCoordinates", tt.getSelectionCoordinates()), e.commit("setSelectedElement", h), e.state.selected = {
          range: S,
          value: u
        }, console.log(e.state.selected)) : (e.commit("setElementSelectTextCoordinates", null), e.commit("setSelectedElement", null), e.state.selected = {
          range: null,
          value: null
        });
      }
    };
  }
};
function es(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Fo = { exports: {} };
(function(t, e) {
  (function(o, n) {
    t.exports = o();
  })(function() {
    var o = "object", n = "function", r = "undefined", c = [
      "startContainer",
      "startOffset",
      "endContainer",
      "endOffset",
      "collapsed",
      "commonAncestorContainer"
    ], s = [
      "setStart",
      "setStartBefore",
      "setStartAfter",
      "setEnd",
      "setEndBefore",
      "setEndAfter",
      "collapse",
      "selectNode",
      "selectNodeContents",
      "compareBoundaryPoints",
      "deleteContents",
      "extractContents",
      "cloneContents",
      "insertNode",
      "surroundContents",
      "cloneRange",
      "toString",
      "detach"
    ], l = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"], p = [
      "collapse",
      "compareEndPoints",
      "duplicate",
      "moveToElementText",
      "parentElement",
      "select",
      "setEndPoint",
      "getBoundingClientRect"
    ];
    function u(m, T) {
      var C = typeof m[T];
      return C == n || !!(C == o && m[T]) || C == "unknown";
    }
    function h(m, T) {
      return !!(typeof m[T] == o && m[T]);
    }
    function g(m, T) {
      return typeof m[T] != r;
    }
    function S(m) {
      return function(T, C) {
        for (var R = C.length; R--; )
          if (!m(T, C[R]))
            return !1;
        return !0;
      };
    }
    var w = S(u), _ = S(h), b = S(g);
    function V(m) {
      return m && w(m, p) && b(m, l);
    }
    function Ne(m) {
      return h(m, "body") ? m.body : m.getElementsByTagName("body")[0];
    }
    var Re = [].forEach ? function(m, T) {
      m.forEach(T);
    } : function(m, T) {
      for (var C = 0, R = m.length; C < R; ++C)
        T(m[C], C);
    }, ze = {}, ge = typeof window != r && typeof document != r, Le = {
      isHostMethod: u,
      isHostObject: h,
      isHostProperty: g,
      areHostMethods: w,
      areHostObjects: _,
      areHostProperties: b,
      isTextRange: V,
      getBody: Ne,
      forEach: Re
    }, W = {
      version: "1.3.1",
      initialized: !1,
      isBrowser: ge,
      supported: !0,
      util: Le,
      features: {},
      modules: ze,
      config: {
        alertOnFail: !1,
        alertOnWarn: !1,
        preferTextRange: !1,
        autoInitialize: typeof rangyAutoInitialize == r ? !0 : rangyAutoInitialize
      }
    };
    function gt(m) {
      typeof console != r && u(console, "log") && console.log(m);
    }
    function _t(m, T) {
      ge && T ? alert(m) : gt(m);
    }
    function vt(m) {
      W.initialized = !0, W.supported = !1, _t("Rangy is not supported in this environment. Reason: " + m, W.config.alertOnFail);
    }
    W.fail = vt;
    function mr(m) {
      _t("Rangy warning: " + m, W.config.alertOnWarn);
    }
    W.warn = mr;
    var tn;
    ({}).hasOwnProperty ? (Le.extend = tn = function(m, T, C) {
      var R, k;
      for (var Q in T)
        T.hasOwnProperty(Q) && (R = m[Q], k = T[Q], C && R !== null && typeof R == "object" && k !== null && typeof k == "object" && tn(R, k, !0), m[Q] = k);
      return T.hasOwnProperty("toString") && (m.toString = T.toString), m;
    }, Le.createOptions = function(m, T) {
      var C = {};
      return tn(C, T), m && tn(C, m), C;
    }) : vt("hasOwnProperty not supported"), ge || vt("Rangy can only run in a browser"), function() {
      var m;
      if (ge) {
        var T = document.createElement("div");
        T.appendChild(document.createElement("span"));
        var C = [].slice;
        try {
          C.call(T.childNodes, 0)[0].nodeType == 1 && (m = function(R) {
            return C.call(R, 0);
          });
        } catch {
        }
      }
      m || (m = function(R) {
        for (var k = [], Q = 0, F = R.length; Q < F; ++Q)
          k[Q] = R[Q];
        return k;
      }), Le.toArray = m;
    }();
    var nn;
    ge && (u(document, "addEventListener") ? nn = function(m, T, C) {
      m.addEventListener(T, C, !1);
    } : u(document, "attachEvent") ? nn = function(m, T, C) {
      m.attachEvent("on" + T, C);
    } : vt("Document does not have required addEventListener or attachEvent method"), Le.addListener = nn);
    var Sn = [];
    function Xn(m) {
      return m.message || m.description || String(m);
    }
    function wn() {
      if (!(!ge || W.initialized)) {
        var m, T = !1, C = !1;
        u(document, "createRange") && (m = document.createRange(), w(m, s) && b(m, c) && (T = !0));
        var R = Ne(document);
        if (!R || R.nodeName.toLowerCase() != "body") {
          vt("No body element found");
          return;
        }
        if (R && u(R, "createTextRange") && (m = R.createTextRange(), V(m) && (C = !0)), !T && !C) {
          vt("Neither Range nor TextRange are available");
          return;
        }
        W.initialized = !0, W.features = {
          implementsDomRange: T,
          implementsTextRange: C
        };
        var k, Q;
        for (var F in ze)
          (k = ze[F]) instanceof on && k.init(k, W);
        for (var ve = 0, we = Sn.length; ve < we; ++ve)
          try {
            Sn[ve](W);
          } catch (Oe) {
            Q = "Rangy init listener threw an exception. Continuing. Detail: " + Xn(Oe), gt(Q);
          }
      }
    }
    function eo(m, T, C) {
      C && (m += " in module " + C.name), W.warn("DEPRECATED: " + m + " is deprecated. Please use " + T + " instead.");
    }
    function to(m, T, C, R) {
      m[T] = function() {
        return eo(T, C, R), m[C].apply(m, Le.toArray(arguments));
      };
    }
    Le.deprecationNotice = eo, Le.createAliasForDeprecatedMethod = to, W.init = wn, W.addInitListener = function(m) {
      W.initialized ? m(W) : Sn.push(m);
    };
    var Cn = [];
    W.addShimListener = function(m) {
      Cn.push(m);
    };
    function gr(m) {
      m = m || window, wn();
      for (var T = 0, C = Cn.length; T < C; ++T)
        Cn[T](m);
    }
    ge && (W.shim = W.createMissingNativeApi = gr, to(W, "createMissingNativeApi", "shim"));
    function on(m, T, C) {
      this.name = m, this.dependencies = T, this.initialized = !1, this.supported = !1, this.initializer = C;
    }
    on.prototype = {
      init: function() {
        for (var m = this.dependencies || [], T = 0, C = m.length, R, k; T < C; ++T) {
          if (k = m[T], R = ze[k], !R || !(R instanceof on))
            throw new Error("required module '" + k + "' not found");
          if (R.init(), !R.supported)
            throw new Error("required module '" + k + "' not supported");
        }
        this.initializer(this);
      },
      fail: function(m) {
        throw this.initialized = !0, this.supported = !1, new Error(m);
      },
      warn: function(m) {
        W.warn("Module " + this.name + ": " + m);
      },
      deprecationNotice: function(m, T) {
        W.warn("DEPRECATED: " + m + " in module " + this.name + " is deprecated. Please use " + T + " instead");
      },
      createError: function(m) {
        return new Error("Error in Rangy " + this.name + " module: " + m);
      }
    };
    function no(m, T, C) {
      var R = new on(m, T, function(k) {
        if (!k.initialized) {
          k.initialized = !0;
          try {
            C(W, k), k.supported = !0;
          } catch (F) {
            var Q = "Module '" + m + "' failed to load: " + Xn(F);
            gt(Q), F.stack && gt(F.stack);
          }
        }
      });
      return ze[m] = R, R;
    }
    W.createModule = function(m) {
      var T, C;
      arguments.length == 2 ? (T = arguments[1], C = []) : (T = arguments[2], C = arguments[1]);
      var R = no(m, C, T);
      W.initialized && W.supported && R.init();
    }, W.createCoreModule = function(m, T, C) {
      no(m, T, C);
    };
    function oo() {
    }
    W.RangePrototype = oo, W.rangePrototype = new oo();
    function vr() {
    }
    W.selectionPrototype = new vr(), W.createCoreModule("DomUtil", [], function(m, T) {
      var C = "undefined", R = m.util, k = R.getBody;
      R.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || T.fail("document missing a Node creation method"), R.isHostMethod(document, "getElementsByTagName") || T.fail("document missing getElementsByTagName method");
      var Q = document.createElement("div");
      R.areHostMethods(Q, ["insertBefore", "appendChild", "cloneNode"]) || T.fail("Incomplete Element implementation"), R.isHostProperty(Q, "innerHTML") || T.fail("Element is missing innerHTML property");
      var F = document.createTextNode("test");
      R.areHostMethods(F, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"]) || T.fail("Incomplete Text Node implementation");
      var ve = (
        /*Array.prototype.indexOf ?
        function(arr, val) {
            return arr.indexOf(val) > -1;
        }:*/
        function(v, O) {
          for (var Y = v.length; Y--; )
            if (v[Y] === O)
              return !0;
          return !1;
        }
      );
      function we(v) {
        var O;
        return typeof v.namespaceURI == C || (O = v.namespaceURI) === null || O == "http://www.w3.org/1999/xhtml";
      }
      function Oe(v) {
        var O = v.parentNode;
        return O.nodeType == 1 ? O : null;
      }
      function de(v) {
        for (var O = 0; v = v.previousSibling; )
          ++O;
        return O;
      }
      function qe(v) {
        switch (v.nodeType) {
          case 7:
          case 10:
            return 0;
          case 3:
          case 8:
            return v.length;
          default:
            return v.childNodes.length;
        }
      }
      function He(v, O) {
        var Y = [], P;
        for (P = v; P; P = P.parentNode)
          Y.push(P);
        for (P = O; P; P = P.parentNode)
          if (ve(Y, P))
            return P;
        return null;
      }
      function Ee(v, O, Y) {
        for (var P = Y ? O : O.parentNode; P; ) {
          if (P === v)
            return !0;
          P = P.parentNode;
        }
        return !1;
      }
      function ke(v, O) {
        return Ee(v, O, !0);
      }
      function pe(v, O, Y) {
        for (var P, _e = Y ? v : v.parentNode; _e; ) {
          if (P = _e.parentNode, P === O)
            return _e;
          _e = P;
        }
        return null;
      }
      function Ye(v) {
        var O = v.nodeType;
        return O == 3 || O == 4 || O == 8;
      }
      function D(v) {
        if (!v)
          return !1;
        var O = v.nodeType;
        return O == 3 || O == 8;
      }
      function te(v, O) {
        var Y = O.nextSibling, P = O.parentNode;
        return Y ? P.insertBefore(v, Y) : P.appendChild(v), v;
      }
      function j(v, O, Y) {
        var P = v.cloneNode(!1);
        if (P.deleteData(0, O), v.deleteData(O, v.length - O), te(P, v), Y)
          for (var _e = 0, le; le = Y[_e++]; )
            le.node == v && le.offset > O ? (le.node = P, le.offset -= O) : le.node == v.parentNode && le.offset > de(v) && ++le.offset;
        return P;
      }
      function ae(v) {
        if (v.nodeType == 9)
          return v;
        if (typeof v.ownerDocument != C)
          return v.ownerDocument;
        if (typeof v.document != C)
          return v.document;
        if (v.parentNode)
          return ae(v.parentNode);
        throw T.createError("getDocument: no document found for node");
      }
      function ye(v) {
        var O = ae(v);
        if (typeof O.defaultView != C)
          return O.defaultView;
        if (typeof O.parentWindow != C)
          return O.parentWindow;
        throw T.createError("Cannot get a window object for node");
      }
      function ne(v) {
        if (typeof v.contentDocument != C)
          return v.contentDocument;
        if (typeof v.contentWindow != C)
          return v.contentWindow.document;
        throw T.createError("getIframeDocument: No Document object found for iframe element");
      }
      function G(v) {
        if (typeof v.contentWindow != C)
          return v.contentWindow;
        if (typeof v.contentDocument != C)
          return v.contentDocument.defaultView;
        throw T.createError("getIframeWindow: No Window object found for iframe element");
      }
      function me(v) {
        return v && R.isHostMethod(v, "setTimeout") && R.isHostObject(v, "document");
      }
      function ce(v, O, Y) {
        var P;
        if (v ? R.isHostProperty(v, "nodeType") ? P = v.nodeType == 1 && v.tagName.toLowerCase() == "iframe" ? ne(v) : ae(v) : me(v) && (P = v.document) : P = document, !P)
          throw O.createError(Y + "(): Parameter must be a Window object or DOM node");
        return P;
      }
      function se(v) {
        for (var O; O = v.parentNode; )
          v = O;
        return v;
      }
      function Ze(v, O, Y, P) {
        var _e, le, it, Je, Ve;
        if (v == Y)
          return O === P ? 0 : O < P ? -1 : 1;
        if (_e = pe(Y, v, !0))
          return O <= de(_e) ? -1 : 1;
        if (_e = pe(v, Y, !0))
          return de(_e) < P ? -1 : 1;
        if (le = He(v, Y), !le)
          throw new Error("comparePoints error: nodes have no common ancestor");
        if (it = v === le ? le : pe(v, le, !0), Je = Y === le ? le : pe(Y, le, !0), it === Je)
          throw T.createError("comparePoints got to case 4 and childA and childB are the same!");
        for (Ve = le.firstChild; Ve; ) {
          if (Ve === it)
            return -1;
          if (Ve === Je)
            return 1;
          Ve = Ve.nextSibling;
        }
      }
      var A = !1;
      function H(v) {
        var O;
        try {
          return O = v.parentNode, !1;
        } catch {
          return !0;
        }
      }
      (function() {
        var v = document.createElement("b");
        v.innerHTML = "1";
        var O = v.firstChild;
        v.innerHTML = "<br />", A = H(O), m.features.crashyTextNodes = A;
      })();
      function oe(v) {
        if (!v)
          return "[No node]";
        if (A && H(v))
          return "[Broken node]";
        if (Ye(v))
          return '"' + v.data + '"';
        if (v.nodeType == 1) {
          var O = v.id ? ' id="' + v.id + '"' : "";
          return "<" + v.nodeName + O + ">[index:" + de(v) + ",length:" + v.childNodes.length + "][" + (v.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]";
        }
        return v.nodeName;
      }
      function fe(v) {
        for (var O = ae(v).createDocumentFragment(), Y; Y = v.firstChild; )
          O.appendChild(Y);
        return O;
      }
      var Ce;
      typeof window.getComputedStyle != C ? Ce = function(v, O) {
        return ye(v).getComputedStyle(v, null)[O];
      } : typeof document.documentElement.currentStyle != C ? Ce = function(v, O) {
        return v.currentStyle ? v.currentStyle[O] : "";
      } : T.fail("No means of obtaining computed style properties found");
      function Ke(v, O, Y) {
        var P = k(v), _e = v.createElement("div");
        _e.contentEditable = "" + !!Y, O && (_e.innerHTML = O);
        var le = P.firstChild;
        return le ? P.insertBefore(_e, le) : P.appendChild(_e), _e;
      }
      function Ue(v) {
        return v.parentNode.removeChild(v);
      }
      function be(v) {
        this.root = v, this._next = v;
      }
      be.prototype = {
        _current: null,
        hasNext: function() {
          return !!this._next;
        },
        next: function() {
          var v = this._current = this._next, O, Y;
          if (this._current)
            if (O = v.firstChild, O)
              this._next = O;
            else {
              for (Y = null; v !== this.root && !(Y = v.nextSibling); )
                v = v.parentNode;
              this._next = Y;
            }
          return this._current;
        },
        detach: function() {
          this._current = this._next = this.root = null;
        }
      };
      function Ie(v) {
        return new be(v);
      }
      function je(v, O) {
        this.node = v, this.offset = O;
      }
      je.prototype = {
        equals: function(v) {
          return !!v && this.node === v.node && this.offset == v.offset;
        },
        inspect: function() {
          return "[DomPosition(" + oe(this.node) + ":" + this.offset + ")]";
        },
        toString: function() {
          return this.inspect();
        }
      };
      function We(v) {
        this.code = this[v], this.codeName = v, this.message = "DOMException: " + this.codeName;
      }
      We.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11,
        INVALID_NODE_TYPE_ERR: 24
      }, We.prototype.toString = function() {
        return this.message;
      }, m.dom = {
        arrayContains: ve,
        isHtmlNamespace: we,
        parentElement: Oe,
        getNodeIndex: de,
        getNodeLength: qe,
        getCommonAncestor: He,
        isAncestorOf: Ee,
        isOrIsAncestorOf: ke,
        getClosestAncestorIn: pe,
        isCharacterDataNode: Ye,
        isTextOrCommentNode: D,
        insertAfter: te,
        splitDataNode: j,
        getDocument: ae,
        getWindow: ye,
        getIframeWindow: G,
        getIframeDocument: ne,
        getBody: k,
        isWindow: me,
        getContentDocument: ce,
        getRootContainer: se,
        comparePoints: Ze,
        isBrokenNode: H,
        inspectNode: oe,
        getComputedStyleProperty: Ce,
        createTestElement: Ke,
        removeNode: Ue,
        fragmentFromNodeChildren: fe,
        createIterator: Ie,
        DomPosition: je
      }, m.DOMException = We;
    }), W.createCoreModule("DomRange", ["DomUtil"], function(m, T) {
      var C = m.dom, R = m.util, k = C.DomPosition, Q = m.DOMException, F = C.isCharacterDataNode, ve = C.getNodeIndex, we = C.isOrIsAncestorOf, Oe = C.getDocument, de = C.comparePoints, qe = C.splitDataNode, He = C.getClosestAncestorIn, Ee = C.getNodeLength, ke = C.arrayContains, pe = C.getRootContainer, Ye = m.features.crashyTextNodes, D = C.removeNode;
      function te(a, d) {
        return a.nodeType != 3 && (we(a, d.startContainer) || we(a, d.endContainer));
      }
      function j(a) {
        return a.document || Oe(a.startContainer);
      }
      function ae(a) {
        return pe(a.startContainer);
      }
      function ye(a) {
        return new k(a.parentNode, ve(a));
      }
      function ne(a) {
        return new k(a.parentNode, ve(a) + 1);
      }
      function G(a, d, E) {
        var x = a.nodeType == 11 ? a.firstChild : a;
        return F(d) ? E == d.length ? C.insertAfter(a, d) : d.parentNode.insertBefore(a, E == 0 ? d : qe(d, E)) : E >= d.childNodes.length ? d.appendChild(a) : d.insertBefore(a, d.childNodes[E]), x;
      }
      function me(a, d, E) {
        if (ue(a), ue(d), j(d) != j(a))
          throw new Q("WRONG_DOCUMENT_ERR");
        var x = de(a.startContainer, a.startOffset, d.endContainer, d.endOffset), B = de(a.endContainer, a.endOffset, d.startContainer, d.startOffset);
        return E ? x <= 0 && B >= 0 : x < 0 && B > 0;
      }
      function ce(a) {
        for (var d, E, x = j(a.range).createDocumentFragment(), B; E = a.next(); ) {
          if (d = a.isPartiallySelectedSubtree(), E = E.cloneNode(!d), d && (B = a.getSubtreeIterator(), E.appendChild(ce(B)), B.detach()), E.nodeType == 10)
            throw new Q("HIERARCHY_REQUEST_ERR");
          x.appendChild(E);
        }
        return x;
      }
      function se(a, d, E) {
        var x, B;
        E = E || { stop: !1 };
        for (var X, M; X = a.next(); )
          if (a.isPartiallySelectedSubtree()) {
            if (d(X) === !1) {
              E.stop = !0;
              return;
            } else if (M = a.getSubtreeIterator(), se(M, d, E), M.detach(), E.stop)
              return;
          } else
            for (x = C.createIterator(X); B = x.next(); )
              if (d(B) === !1) {
                E.stop = !0;
                return;
              }
      }
      function Ze(a) {
        for (var d; a.next(); )
          a.isPartiallySelectedSubtree() ? (d = a.getSubtreeIterator(), Ze(d), d.detach()) : a.remove();
      }
      function A(a) {
        for (var d, E = j(a.range).createDocumentFragment(), x; d = a.next(); ) {
          if (a.isPartiallySelectedSubtree() ? (d = d.cloneNode(!1), x = a.getSubtreeIterator(), d.appendChild(A(x)), x.detach()) : a.remove(), d.nodeType == 10)
            throw new Q("HIERARCHY_REQUEST_ERR");
          E.appendChild(d);
        }
        return E;
      }
      function H(a, d, E) {
        var x = !!(d && d.length), B, X = !!E;
        x && (B = new RegExp("^(" + d.join("|") + ")$"));
        var M = [];
        return se(new fe(a, !1), function(L) {
          if (!(x && !B.test(L.nodeType)) && !(X && !E(L))) {
            var U = a.startContainer;
            if (!(L == U && F(U) && a.startOffset == U.length)) {
              var J = a.endContainer;
              L == J && F(J) && a.endOffset == 0 || M.push(L);
            }
          }
        }), M;
      }
      function oe(a) {
        var d = typeof a.getName > "u" ? "Range" : a.getName();
        return "[" + d + "(" + C.inspectNode(a.startContainer) + ":" + a.startOffset + ", " + C.inspectNode(a.endContainer) + ":" + a.endOffset + ")]";
      }
      function fe(a, d) {
        if (this.range = a, this.clonePartiallySelectedTextNodes = d, !a.collapsed) {
          this.sc = a.startContainer, this.so = a.startOffset, this.ec = a.endContainer, this.eo = a.endOffset;
          var E = a.commonAncestorContainer;
          this.sc === this.ec && F(this.sc) ? (this.isSingleCharacterDataNode = !0, this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc === E && !F(this.sc) ? this.sc.childNodes[this.so] : He(this.sc, E, !0), this._last = this.ec === E && !F(this.ec) ? this.ec.childNodes[this.eo - 1] : He(this.ec, E, !0));
        }
      }
      fe.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: !1,
        reset: function() {
          this._current = null, this._next = this._first;
        },
        hasNext: function() {
          return !!this._next;
        },
        next: function() {
          var a = this._current = this._next;
          return a && (this._next = a !== this._last ? a.nextSibling : null, F(a) && this.clonePartiallySelectedTextNodes && (a === this.ec && (a = a.cloneNode(!0)).deleteData(this.eo, a.length - this.eo), this._current === this.sc && (a = a.cloneNode(!0)).deleteData(0, this.so))), a;
        },
        remove: function() {
          var a = this._current, d, E;
          F(a) && (a === this.sc || a === this.ec) ? (d = a === this.sc ? this.so : 0, E = a === this.ec ? this.eo : a.length, d != E && a.deleteData(d, E - d)) : a.parentNode && D(a);
        },
        // Checks if the current node is partially selected
        isPartiallySelectedSubtree: function() {
          var a = this._current;
          return te(a, this.range);
        },
        getSubtreeIterator: function() {
          var a;
          if (this.isSingleCharacterDataNode)
            a = this.range.cloneRange(), a.collapse(!1);
          else {
            a = new Me(j(this.range));
            var d = this._current, E = d, x = 0, B = d, X = Ee(d);
            we(d, this.sc) && (E = this.sc, x = this.so), we(d, this.ec) && (B = this.ec, X = this.eo), re(a, E, x, B, X);
          }
          return new fe(a, this.clonePartiallySelectedTextNodes);
        },
        detach: function() {
          this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
        }
      };
      var Ce = [1, 3, 4, 5, 7, 8, 10], Ke = [2, 9, 11], Ue = [5, 6, 10, 12], be = [1, 3, 4, 5, 7, 8, 10, 11], Ie = [1, 3, 4, 5, 7, 8];
      function je(a) {
        return function(d, E) {
          for (var x, B = E ? d : d.parentNode; B; ) {
            if (x = B.nodeType, ke(a, x))
              return B;
            B = B.parentNode;
          }
          return null;
        };
      }
      var We = je([9, 11]), v = je(Ue), O = je([6, 10, 12]), Y = je([1]);
      function P(a, d) {
        if (O(a, d))
          throw new Q("INVALID_NODE_TYPE_ERR");
      }
      function _e(a, d) {
        if (!ke(d, a.nodeType))
          throw new Q("INVALID_NODE_TYPE_ERR");
      }
      function le(a, d) {
        if (d < 0 || d > (F(a) ? a.length : a.childNodes.length))
          throw new Q("INDEX_SIZE_ERR");
      }
      function it(a, d) {
        if (We(a, !0) !== We(d, !0))
          throw new Q("WRONG_DOCUMENT_ERR");
      }
      function Je(a) {
        if (v(a, !0))
          throw new Q("NO_MODIFICATION_ALLOWED_ERR");
      }
      function Ve(a, d) {
        if (!a)
          throw new Q(d);
      }
      function $t(a, d) {
        return d <= (F(a) ? a.length : a.childNodes.length);
      }
      function Tt(a) {
        return !!a.startContainer && !!a.endContainer && !(Ye && (C.isBrokenNode(a.startContainer) || C.isBrokenNode(a.endContainer))) && pe(a.startContainer) == pe(a.endContainer) && $t(a.startContainer, a.startOffset) && $t(a.endContainer, a.endOffset);
      }
      function ue(a) {
        if (!Tt(a))
          throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: (" + a.inspect() + ")");
      }
      var Yt = document.createElement("style"), yt = !1;
      try {
        Yt.innerHTML = "<b>x</b>", yt = Yt.firstChild.nodeType == 3;
      } catch {
      }
      m.features.htmlParsingConforms = yt;
      var Wt = yt ? (
        // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
        // discussion and base code for this implementation at issue 67.
        // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
        // Thanks to Aleks Williams.
        function(a) {
          var d = this.startContainer, E = Oe(d);
          if (!d)
            throw new Q("INVALID_STATE_ERR");
          var x = null;
          return d.nodeType == 1 ? x = d : F(d) && (x = C.parentElement(d)), x === null || x.nodeName == "HTML" && C.isHtmlNamespace(Oe(x).documentElement) && C.isHtmlNamespace(x) ? x = E.createElement("body") : x = x.cloneNode(!1), x.innerHTML = a, C.fragmentFromNodeChildren(x);
        }
      ) : (
        // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
        // previous versions of Rangy used (with the exception of using a body element rather than a div)
        function(a) {
          var d = j(this), E = d.createElement("body");
          return E.innerHTML = a, C.fragmentFromNodeChildren(E);
        }
      );
      function Rt(a, d) {
        ue(a);
        var E = a.startContainer, x = a.startOffset, B = a.endContainer, X = a.endOffset, M = E === B;
        F(B) && X > 0 && X < B.length && qe(B, X, d), F(E) && x > 0 && x < E.length && (E = qe(E, x, d), M ? (X -= x, B = E) : B == E.parentNode && X >= ve(E) && X++, x = 0), a.setStartAndEnd(E, x, B, X);
      }
      function q(a) {
        ue(a);
        var d = a.commonAncestorContainer.parentNode.cloneNode(!1);
        return d.appendChild(a.cloneContents()), d.innerHTML;
      }
      var Lt = [
        "startContainer",
        "startOffset",
        "endContainer",
        "endOffset",
        "collapsed",
        "commonAncestorContainer"
      ], kt = 0, Dt = 1, rn = 2, Nt = 3, xt = 0, Qt = 1, Gt = 2, jt = 3;
      R.extend(m.rangePrototype, {
        compareBoundaryPoints: function(a, d) {
          ue(this), it(this.startContainer, d.startContainer);
          var E, x, B, X, M = a == Nt || a == kt ? "start" : "end", L = a == Dt || a == kt ? "start" : "end";
          return E = this[M + "Container"], x = this[M + "Offset"], B = d[L + "Container"], X = d[L + "Offset"], de(E, x, B, X);
        },
        insertNode: function(a) {
          if (ue(this), _e(a, be), Je(this.startContainer), we(a, this.startContainer))
            throw new Q("HIERARCHY_REQUEST_ERR");
          var d = G(a, this.startContainer, this.startOffset);
          this.setStartBefore(d);
        },
        cloneContents: function() {
          ue(this);
          var a, d;
          if (this.collapsed)
            return j(this).createDocumentFragment();
          if (this.startContainer === this.endContainer && F(this.startContainer))
            return a = this.startContainer.cloneNode(!0), a.data = a.data.slice(this.startOffset, this.endOffset), d = j(this).createDocumentFragment(), d.appendChild(a), d;
          var E = new fe(this, !0);
          return a = ce(E), E.detach(), a;
        },
        canSurroundContents: function() {
          ue(this), Je(this.startContainer), Je(this.endContainer);
          var a = new fe(this, !0), d = a._first && te(a._first, this) || a._last && te(a._last, this);
          return a.detach(), !d;
        },
        surroundContents: function(a) {
          if (_e(a, Ie), !this.canSurroundContents())
            throw new Q("INVALID_STATE_ERR");
          var d = this.extractContents();
          if (a.hasChildNodes())
            for (; a.lastChild; )
              a.removeChild(a.lastChild);
          G(a, this.startContainer, this.startOffset), a.appendChild(d), this.selectNode(a);
        },
        cloneRange: function() {
          ue(this);
          for (var a = new Me(j(this)), d = Lt.length, E; d--; )
            E = Lt[d], a[E] = this[E];
          return a;
        },
        toString: function() {
          ue(this);
          var a = this.startContainer;
          if (a === this.endContainer && F(a))
            return a.nodeType == 3 || a.nodeType == 4 ? a.data.slice(this.startOffset, this.endOffset) : "";
          var d = [], E = new fe(this, !0);
          return se(E, function(x) {
            (x.nodeType == 3 || x.nodeType == 4) && d.push(x.data);
          }), E.detach(), d.join("");
        },
        // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
        // been removed from Mozilla.
        compareNode: function(a) {
          ue(this);
          var d = a.parentNode, E = ve(a);
          if (!d)
            throw new Q("NOT_FOUND_ERR");
          var x = this.comparePoint(d, E), B = this.comparePoint(d, E + 1);
          return x < 0 ? B > 0 ? Gt : xt : B > 0 ? Qt : jt;
        },
        comparePoint: function(a, d) {
          return ue(this), Ve(a, "HIERARCHY_REQUEST_ERR"), it(a, this.startContainer), de(a, d, this.startContainer, this.startOffset) < 0 ? -1 : de(a, d, this.endContainer, this.endOffset) > 0 ? 1 : 0;
        },
        createContextualFragment: Wt,
        toHtml: function() {
          return q(this);
        },
        // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
        // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
        intersectsNode: function(a, d) {
          if (ue(this), pe(a) != ae(this))
            return !1;
          var E = a.parentNode, x = ve(a);
          if (!E)
            return !0;
          var B = de(E, x, this.endContainer, this.endOffset), X = de(E, x + 1, this.startContainer, this.startOffset);
          return d ? B <= 0 && X >= 0 : B < 0 && X > 0;
        },
        isPointInRange: function(a, d) {
          return ue(this), Ve(a, "HIERARCHY_REQUEST_ERR"), it(a, this.startContainer), de(a, d, this.startContainer, this.startOffset) >= 0 && de(a, d, this.endContainer, this.endOffset) <= 0;
        },
        // The methods below are non-standard and invented by me.
        // Sharing a boundary start-to-end or end-to-start does not count as intersection.
        intersectsRange: function(a) {
          return me(this, a, !1);
        },
        // Sharing a boundary start-to-end or end-to-start does count as intersection.
        intersectsOrTouchesRange: function(a) {
          return me(this, a, !0);
        },
        intersection: function(a) {
          if (this.intersectsRange(a)) {
            var d = de(this.startContainer, this.startOffset, a.startContainer, a.startOffset), E = de(this.endContainer, this.endOffset, a.endContainer, a.endOffset), x = this.cloneRange();
            return d == -1 && x.setStart(a.startContainer, a.startOffset), E == 1 && x.setEnd(a.endContainer, a.endOffset), x;
          }
          return null;
        },
        union: function(a) {
          if (this.intersectsOrTouchesRange(a)) {
            var d = this.cloneRange();
            return de(a.startContainer, a.startOffset, this.startContainer, this.startOffset) == -1 && d.setStart(a.startContainer, a.startOffset), de(a.endContainer, a.endOffset, this.endContainer, this.endOffset) == 1 && d.setEnd(a.endContainer, a.endOffset), d;
          } else
            throw new Q("Ranges do not intersect");
        },
        containsNode: function(a, d) {
          return d ? this.intersectsNode(a, !1) : this.compareNode(a) == jt;
        },
        containsNodeContents: function(a) {
          return this.comparePoint(a, 0) >= 0 && this.comparePoint(a, Ee(a)) <= 0;
        },
        containsRange: function(a) {
          var d = this.intersection(a);
          return d !== null && a.equals(d);
        },
        containsNodeText: function(a) {
          var d = this.cloneRange();
          d.selectNode(a);
          var E = d.getNodes([3]);
          if (E.length > 0) {
            d.setStart(E[0], 0);
            var x = E.pop();
            return d.setEnd(x, x.length), this.containsRange(d);
          } else
            return this.containsNodeContents(a);
        },
        getNodes: function(a, d) {
          return ue(this), H(this, a, d);
        },
        getDocument: function() {
          return j(this);
        },
        collapseBefore: function(a) {
          this.setEndBefore(a), this.collapse(!1);
        },
        collapseAfter: function(a) {
          this.setStartAfter(a), this.collapse(!0);
        },
        getBookmark: function(a) {
          var d = j(this), E = m.createRange(d);
          a = a || C.getBody(d), E.selectNodeContents(a);
          var x = this.intersection(E), B = 0, X = 0;
          return x && (E.setEnd(x.startContainer, x.startOffset), B = E.toString().length, X = B + x.toString().length), {
            start: B,
            end: X,
            containerNode: a
          };
        },
        moveToBookmark: function(a) {
          var d = a.containerNode, E = 0;
          this.setStart(d, 0), this.collapse(!0);
          for (var x = [d], B, X = !1, M = !1, L, U, J; !M && (B = x.pop()); )
            if (B.nodeType == 3)
              L = E + B.length, !X && a.start >= E && a.start <= L && (this.setStart(B, a.start - E), X = !0), X && a.end >= E && a.end <= L && (this.setEnd(B, a.end - E), M = !0), E = L;
            else
              for (J = B.childNodes, U = J.length; U--; )
                x.push(J[U]);
        },
        getName: function() {
          return "DomRange";
        },
        equals: function(a) {
          return Me.rangesEqual(this, a);
        },
        isValid: function() {
          return Tt(this);
        },
        inspect: function() {
          return oe(this);
        },
        detach: function() {
        }
      });
      function i(a) {
        a.START_TO_START = kt, a.START_TO_END = Dt, a.END_TO_END = rn, a.END_TO_START = Nt, a.NODE_BEFORE = xt, a.NODE_AFTER = Qt, a.NODE_BEFORE_AND_AFTER = Gt, a.NODE_INSIDE = jt;
      }
      function f(a) {
        i(a), i(a.prototype);
      }
      function N(a, d) {
        return function() {
          ue(this);
          var E = this.startContainer, x = this.startOffset, B = this.commonAncestorContainer, X = new fe(this, !0), M, L;
          E !== B && (M = He(E, B, !0), L = ne(M), E = L.node, x = L.offset), se(X, Je), X.reset();
          var U = a(X);
          return X.detach(), d(this, E, x, E, x), U;
        };
      }
      function I(a, d) {
        function E(M, L) {
          return function(U) {
            _e(U, Ce), _e(pe(U), Ke);
            var J = (M ? ye : ne)(U);
            (L ? x : B)(this, J.node, J.offset);
          };
        }
        function x(M, L, U) {
          var J = M.endContainer, Fe = M.endOffset;
          (L !== M.startContainer || U !== M.startOffset) && ((pe(L) != pe(J) || de(L, U, J, Fe) == 1) && (J = L, Fe = U), d(M, L, U, J, Fe));
        }
        function B(M, L, U) {
          var J = M.startContainer, Fe = M.startOffset;
          (L !== M.endContainer || U !== M.endOffset) && ((pe(L) != pe(J) || de(L, U, J, Fe) == -1) && (J = L, Fe = U), d(M, J, Fe, L, U));
        }
        var X = function() {
        };
        X.prototype = m.rangePrototype, a.prototype = new X(), R.extend(a.prototype, {
          setStart: function(M, L) {
            P(M, !0), le(M, L), x(this, M, L);
          },
          setEnd: function(M, L) {
            P(M, !0), le(M, L), B(this, M, L);
          },
          /**
           * Convenience method to set a range's start and end boundaries. Overloaded as follows:
           * - Two parameters (node, offset) creates a collapsed range at that position
           * - Three parameters (node, startOffset, endOffset) creates a range contained with node starting at
           *   startOffset and ending at endOffset
           * - Four parameters (startNode, startOffset, endNode, endOffset) creates a range starting at startOffset in
           *   startNode and ending at endOffset in endNode
           */
          setStartAndEnd: function() {
            var M = arguments, L = M[0], U = M[1], J = L, Fe = U;
            switch (M.length) {
              case 3:
                Fe = M[2];
                break;
              case 4:
                J = M[2], Fe = M[3];
                break;
            }
            P(L, !0), le(L, U), P(J, !0), le(J, Fe), d(this, L, U, J, Fe);
          },
          setBoundary: function(M, L, U) {
            this["set" + (U ? "Start" : "End")](M, L);
          },
          setStartBefore: E(!0, !0),
          setStartAfter: E(!1, !0),
          setEndBefore: E(!0, !1),
          setEndAfter: E(!1, !1),
          collapse: function(M) {
            ue(this), M ? d(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : d(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
          },
          selectNodeContents: function(M) {
            P(M, !0), d(this, M, 0, M, Ee(M));
          },
          selectNode: function(M) {
            P(M, !1), _e(M, Ce);
            var L = ye(M), U = ne(M);
            d(this, L.node, L.offset, U.node, U.offset);
          },
          extractContents: N(A, d),
          deleteContents: N(Ze, d),
          canSurroundContents: function() {
            ue(this), Je(this.startContainer), Je(this.endContainer);
            var M = new fe(this, !0), L = M._first && te(M._first, this) || M._last && te(M._last, this);
            return M.detach(), !L;
          },
          splitBoundaries: function() {
            Rt(this);
          },
          splitBoundariesPreservingPositions: function(M) {
            Rt(this, M);
          },
          normalizeBoundaries: function() {
            ue(this);
            var M = this.startContainer, L = this.startOffset, U = this.endContainer, J = this.endOffset, Fe = function(Qe) {
              var ut = Qe.nextSibling;
              ut && ut.nodeType == Qe.nodeType && (U = Qe, J = Qe.length, Qe.appendData(ut.data), D(ut));
            }, so = function(Qe) {
              var ut = Qe.previousSibling;
              if (ut && ut.nodeType == Qe.nodeType) {
                M = Qe;
                var yr = Qe.length;
                if (L = ut.length, Qe.insertData(0, ut.data), D(ut), M == U)
                  J += L, U = M;
                else if (U == Qe.parentNode) {
                  var io = ve(Qe);
                  J == io ? (U = Qe, J = yr) : J > io && J--;
                }
              }
            }, Tn = !0, rt;
            if (F(U))
              J == U.length ? Fe(U) : J == 0 && (rt = U.previousSibling, rt && rt.nodeType == U.nodeType && (J = rt.length, M == U && (Tn = !1), rt.appendData(U.data), D(U), U = rt));
            else {
              if (J > 0) {
                var Dn = U.childNodes[J - 1];
                Dn && F(Dn) && Fe(Dn);
              }
              Tn = !this.collapsed;
            }
            if (Tn) {
              if (F(M))
                L == 0 ? so(M) : L == M.length && (rt = M.nextSibling, rt && rt.nodeType == M.nodeType && (U == rt && (U = M, J += M.length), M.appendData(rt.data), D(rt)));
              else if (L < M.childNodes.length) {
                var xn = M.childNodes[L];
                xn && F(xn) && so(xn);
              }
            } else
              M = U, L = J;
            d(this, M, L, U, J);
          },
          collapseToPoint: function(M, L) {
            P(M, !0), le(M, L), this.setStartAndEnd(M, L);
          },
          parentElement: function() {
            ue(this);
            var M = this.commonAncestorContainer;
            return M ? Y(this.commonAncestorContainer, !0) : null;
          }
        }), f(a);
      }
      function $(a) {
        a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset, a.commonAncestorContainer = a.collapsed ? a.startContainer : C.getCommonAncestor(a.startContainer, a.endContainer);
      }
      function re(a, d, E, x, B) {
        a.startContainer = d, a.startOffset = E, a.endContainer = x, a.endOffset = B, a.document = C.getDocument(d), $(a);
      }
      function Me(a) {
        re(this, a, 0, a, 0);
      }
      I(Me, re), R.extend(Me, {
        rangeProperties: Lt,
        RangeIterator: fe,
        copyComparisonConstants: f,
        createPrototypeRange: I,
        inspect: oe,
        toHtml: q,
        getRangeDocument: j,
        rangesEqual: function(a, d) {
          return a.startContainer === d.startContainer && a.startOffset === d.startOffset && a.endContainer === d.endContainer && a.endOffset === d.endOffset;
        }
      }), m.DomRange = Me;
    }), W.createCoreModule("WrappedRange", ["DomRange"], function(m, T) {
      var C, R, k = m.dom, Q = m.util, F = k.DomPosition, ve = m.DomRange, we = k.getBody, Oe = k.getContentDocument, de = k.isCharacterDataNode;
      if (m.features.implementsDomRange && function() {
        var D, te = ve.rangeProperties;
        function j(A) {
          for (var H = te.length, oe; H--; )
            oe = te[H], A[oe] = A.nativeRange[oe];
          A.collapsed = A.startContainer === A.endContainer && A.startOffset === A.endOffset;
        }
        function ae(A, H, oe, fe, Ce) {
          var Ke = A.startContainer !== H || A.startOffset != oe, Ue = A.endContainer !== fe || A.endOffset != Ce, be = !A.equals(A.nativeRange);
          (Ke || Ue || be) && (A.setEnd(fe, Ce), A.setStart(H, oe));
        }
        var ye;
        C = function(A) {
          if (!A)
            throw T.createError("WrappedRange: Range must be specified");
          this.nativeRange = A, j(this);
        }, ve.createPrototypeRange(C, ae), D = C.prototype, D.selectNode = function(A) {
          this.nativeRange.selectNode(A), j(this);
        }, D.cloneContents = function() {
          return this.nativeRange.cloneContents();
        }, D.surroundContents = function(A) {
          this.nativeRange.surroundContents(A), j(this);
        }, D.collapse = function(A) {
          this.nativeRange.collapse(A), j(this);
        }, D.cloneRange = function() {
          return new C(this.nativeRange.cloneRange());
        }, D.refresh = function() {
          j(this);
        }, D.toString = function() {
          return this.nativeRange.toString();
        };
        var ne = document.createTextNode("test");
        we(document).appendChild(ne);
        var G = document.createRange();
        G.setStart(ne, 0), G.setEnd(ne, 0);
        try {
          G.setStart(ne, 1), D.setStart = function(A, H) {
            this.nativeRange.setStart(A, H), j(this);
          }, D.setEnd = function(A, H) {
            this.nativeRange.setEnd(A, H), j(this);
          }, ye = function(A) {
            return function(H) {
              this.nativeRange[A](H), j(this);
            };
          };
        } catch {
          D.setStart = function(H, oe) {
            try {
              this.nativeRange.setStart(H, oe);
            } catch {
              this.nativeRange.setEnd(H, oe), this.nativeRange.setStart(H, oe);
            }
            j(this);
          }, D.setEnd = function(H, oe) {
            try {
              this.nativeRange.setEnd(H, oe);
            } catch {
              this.nativeRange.setStart(H, oe), this.nativeRange.setEnd(H, oe);
            }
            j(this);
          }, ye = function(H, oe) {
            return function(fe) {
              try {
                this.nativeRange[H](fe);
              } catch {
                this.nativeRange[oe](fe), this.nativeRange[H](fe);
              }
              j(this);
            };
          };
        }
        D.setStartBefore = ye("setStartBefore", "setEndBefore"), D.setStartAfter = ye("setStartAfter", "setEndAfter"), D.setEndBefore = ye("setEndBefore", "setStartBefore"), D.setEndAfter = ye("setEndAfter", "setStartAfter"), D.selectNodeContents = function(A) {
          this.setStartAndEnd(A, 0, k.getNodeLength(A));
        }, G.selectNodeContents(ne), G.setEnd(ne, 3);
        var me = document.createRange();
        me.selectNodeContents(ne), me.setEnd(ne, 4), me.setStart(ne, 2), G.compareBoundaryPoints(G.START_TO_END, me) == -1 && G.compareBoundaryPoints(G.END_TO_START, me) == 1 ? D.compareBoundaryPoints = function(A, H) {
          return H = H.nativeRange || H, A == H.START_TO_END ? A = H.END_TO_START : A == H.END_TO_START && (A = H.START_TO_END), this.nativeRange.compareBoundaryPoints(A, H);
        } : D.compareBoundaryPoints = function(A, H) {
          return this.nativeRange.compareBoundaryPoints(A, H.nativeRange || H);
        };
        var ce = document.createElement("div");
        ce.innerHTML = "123";
        var se = ce.firstChild, Ze = we(document);
        Ze.appendChild(ce), G.setStart(se, 1), G.setEnd(se, 2), G.deleteContents(), se.data == "13" && (D.deleteContents = function() {
          this.nativeRange.deleteContents(), j(this);
        }, D.extractContents = function() {
          var A = this.nativeRange.extractContents();
          return j(this), A;
        }), Ze.removeChild(ce), Ze = null, Q.isHostMethod(G, "createContextualFragment") && (D.createContextualFragment = function(A) {
          return this.nativeRange.createContextualFragment(A);
        }), we(document).removeChild(ne), D.getName = function() {
          return "WrappedRange";
        }, m.WrappedRange = C, m.createNativeRange = function(A) {
          return A = Oe(A, T, "createNativeRange"), A.createRange();
        };
      }(), m.features.implementsTextRange) {
        var qe = function(D) {
          var te = D.parentElement(), j = D.duplicate();
          j.collapse(!0);
          var ae = j.parentElement();
          j = D.duplicate(), j.collapse(!1);
          var ye = j.parentElement(), ne = ae == ye ? ae : k.getCommonAncestor(ae, ye);
          return ne == te ? ne : k.getCommonAncestor(te, ne);
        }, He = function(D) {
          return D.compareEndPoints("StartToEnd", D) == 0;
        }, Ee = function(D, te, j, ae, ye) {
          var ne = D.duplicate();
          ne.collapse(j);
          var G = ne.parentElement();
          if (k.isOrIsAncestorOf(te, G) || (G = te), !G.canHaveHTML) {
            var me = new F(G.parentNode, k.getNodeIndex(G));
            return {
              boundaryPosition: me,
              nodeInfo: {
                nodeIndex: me.offset,
                containerElement: me.node
              }
            };
          }
          var ce = k.getDocument(G).createElement("span");
          ce.parentNode && k.removeNode(ce);
          for (var se, Ze = j ? "StartToStart" : "StartToEnd", A, H, oe, fe, Ce = ye && ye.containerElement == G ? ye.nodeIndex : 0, Ke = G.childNodes.length, Ue = Ke, be = Ue; be == Ke ? G.appendChild(ce) : G.insertBefore(ce, G.childNodes[be]), ne.moveToElementText(ce), se = ne.compareEndPoints(Ze, D), !(se == 0 || Ce == Ue); ) {
            if (se == -1) {
              if (Ue == Ce + 1)
                break;
              Ce = be;
            } else
              Ue = Ue == Ce + 1 ? Ce : be;
            be = Math.floor((Ce + Ue) / 2), G.removeChild(ce);
          }
          if (fe = ce.nextSibling, se == -1 && fe && de(fe)) {
            ne.setEndPoint(j ? "EndToStart" : "EndToEnd", D);
            var Ie;
            if (/[\r\n]/.test(fe.data)) {
              var je = ne.duplicate(), We = je.text.replace(/\r\n/g, "\r").length;
              for (Ie = je.moveStart("character", We); (se = je.compareEndPoints("StartToEnd", je)) == -1; )
                Ie++, je.moveStart("character", 1);
            } else
              Ie = ne.text.length;
            oe = new F(fe, Ie);
          } else
            A = (ae || !j) && ce.previousSibling, H = (ae || j) && ce.nextSibling, H && de(H) ? oe = new F(H, 0) : A && de(A) ? oe = new F(A, A.data.length) : oe = new F(G, k.getNodeIndex(ce));
          return k.removeNode(ce), {
            boundaryPosition: oe,
            nodeInfo: {
              nodeIndex: be,
              containerElement: G
            }
          };
        }, ke = function(D, te) {
          var j, ae, ye = D.offset, ne = k.getDocument(D.node), G, me, ce = we(ne).createTextRange(), se = de(D.node);
          return se ? (j = D.node, ae = j.parentNode) : (me = D.node.childNodes, j = ye < me.length ? me[ye] : null, ae = D.node), G = ne.createElement("span"), G.innerHTML = "&#feff;", j ? ae.insertBefore(G, j) : ae.appendChild(G), ce.moveToElementText(G), ce.collapse(!te), ae.removeChild(G), se && ce[te ? "moveStart" : "moveEnd"]("character", ye), ce;
        };
        R = function(D) {
          this.textRange = D, this.refresh();
        }, R.prototype = new ve(document), R.prototype.refresh = function() {
          var D, te, j, ae = qe(this.textRange);
          He(this.textRange) ? te = D = Ee(
            this.textRange,
            ae,
            !0,
            !0
          ).boundaryPosition : (j = Ee(this.textRange, ae, !0, !1), D = j.boundaryPosition, te = Ee(
            this.textRange,
            ae,
            !1,
            !1,
            j.nodeInfo
          ).boundaryPosition), this.setStart(D.node, D.offset), this.setEnd(te.node, te.offset);
        }, R.prototype.getName = function() {
          return "WrappedTextRange";
        }, ve.copyComparisonConstants(R);
        var pe = function(D) {
          if (D.collapsed)
            return ke(new F(D.startContainer, D.startOffset), !0);
          var te = ke(new F(D.startContainer, D.startOffset), !0), j = ke(new F(D.endContainer, D.endOffset), !1), ae = we(ve.getRangeDocument(D)).createTextRange();
          return ae.setEndPoint("StartToStart", te), ae.setEndPoint("EndToEnd", j), ae;
        };
        if (R.rangeToTextRange = pe, R.prototype.toTextRange = function() {
          return pe(this);
        }, m.WrappedTextRange = R, !m.features.implementsDomRange || m.config.preferTextRange) {
          var Ye = function(D) {
            return D("return this;")();
          }(Function);
          typeof Ye.Range > "u" && (Ye.Range = R), m.createNativeRange = function(D) {
            return D = Oe(D, T, "createNativeRange"), we(D).createTextRange();
          }, m.WrappedRange = R;
        }
      }
      m.createRange = function(D) {
        return D = Oe(D, T, "createRange"), new m.WrappedRange(m.createNativeRange(D));
      }, m.createRangyRange = function(D) {
        return D = Oe(D, T, "createRangyRange"), new ve(D);
      }, Q.createAliasForDeprecatedMethod(m, "createIframeRange", "createRange"), Q.createAliasForDeprecatedMethod(m, "createIframeRangyRange", "createRangyRange"), m.addShimListener(function(D) {
        var te = D.document;
        typeof te.createRange > "u" && (te.createRange = function() {
          return m.createRange(te);
        }), te = D = null;
      });
    }), W.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(m, T) {
      m.config.checkSelectionRanges = !0;
      var C = "boolean", R = "number", k = m.dom, Q = m.util, F = Q.isHostMethod, ve = m.DomRange, we = m.WrappedRange, Oe = m.DOMException, de = k.DomPosition, qe, He, Ee = m.features, ke = "Control", pe = k.getDocument, Ye = k.getBody, D = ve.rangesEqual;
      function te(i) {
        return typeof i == "string" ? /^backward(s)?$/i.test(i) : !!i;
      }
      function j(i, f) {
        if (i) {
          if (k.isWindow(i))
            return i;
          if (i instanceof ue)
            return i.win;
          var N = k.getContentDocument(i, T, f);
          return k.getWindow(N);
        } else
          return window;
      }
      function ae(i) {
        return j(i, "getWinSelection").getSelection();
      }
      function ye(i) {
        return j(i, "getDocSelection").document.selection;
      }
      function ne(i) {
        var f = !1;
        return i.anchorNode && (f = k.comparePoints(i.anchorNode, i.anchorOffset, i.focusNode, i.focusOffset) == 1), f;
      }
      var G = F(window, "getSelection"), me = Q.isHostObject(document, "selection");
      Ee.implementsWinGetSelection = G, Ee.implementsDocSelection = me;
      var ce = me && (!G || m.config.preferTextRange);
      if (ce)
        qe = ye, m.isSelectionValid = function(i) {
          var f = j(i, "isSelectionValid").document, N = f.selection;
          return N.type != "None" || pe(N.createRange().parentElement()) == f;
        };
      else if (G)
        qe = ae, m.isSelectionValid = function() {
          return !0;
        };
      else
        return T.fail("Neither document.selection or window.getSelection() detected."), !1;
      m.getNativeSelection = qe;
      var se = qe();
      if (!se)
        return T.fail("Native selection was null (possibly issue 138?)"), !1;
      var Ze = m.createNativeRange(document), A = Ye(document), H = Q.areHostProperties(
        se,
        ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]
      );
      Ee.selectionHasAnchorAndFocus = H;
      var oe = F(se, "extend");
      Ee.selectionHasExtend = oe;
      var fe = F(se, "setBaseAndExtent");
      Ee.selectionHasSetBaseAndExtent = fe;
      var Ce = typeof se.rangeCount == R;
      Ee.selectionHasRangeCount = Ce;
      var Ke = !1, Ue = !0, be = oe ? function(i, f) {
        var N = ve.getRangeDocument(f), I = m.createRange(N);
        I.collapseToPoint(f.endContainer, f.endOffset), i.addRange(P(I)), i.extend(f.startContainer, f.startOffset);
      } : null;
      Q.areHostMethods(se, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof se.rangeCount == R && Ee.implementsDomRange && function() {
        var i = window.getSelection();
        if (i) {
          for (var f = i.rangeCount, N = f > 1, I = [], $ = ne(i), re = 0; re < f; ++re)
            I[re] = i.getRangeAt(re);
          var Me = k.createTestElement(document, "", !1), a = Me.appendChild(document.createTextNode("   ")), d = document.createRange();
          if (d.setStart(a, 1), d.collapse(!0), i.removeAllRanges(), i.addRange(d), Ue = i.rangeCount == 1, i.removeAllRanges(), !N) {
            var E = window.navigator.appVersion.match(/Chrome\/(.*?) /);
            if (E && parseInt(E[1]) >= 36)
              Ke = !1;
            else {
              var x = d.cloneRange();
              d.setStart(a, 0), x.setEnd(a, 3), x.setStart(a, 2), i.addRange(d), i.addRange(x), Ke = i.rangeCount == 2;
            }
          }
          for (k.removeNode(Me), i.removeAllRanges(), re = 0; re < f; ++re)
            re == 0 && $ ? be ? be(i, I[re]) : (m.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend"), i.addRange(I[re])) : i.addRange(I[re]);
        }
      }(), Ee.selectionSupportsMultipleRanges = Ke, Ee.collapsedNonEditableSelectionsSupported = Ue;
      var Ie = !1, je;
      A && F(A, "createControlRange") && (je = A.createControlRange(), Q.areHostProperties(je, ["item", "add"]) && (Ie = !0)), Ee.implementsControlRange = Ie, H ? He = function(i) {
        return i.anchorNode === i.focusNode && i.anchorOffset === i.focusOffset;
      } : He = function(i) {
        return i.rangeCount ? i.getRangeAt(i.rangeCount - 1).collapsed : !1;
      };
      function We(i, f, N) {
        var I = N ? "end" : "start", $ = N ? "start" : "end";
        i.anchorNode = f[I + "Container"], i.anchorOffset = f[I + "Offset"], i.focusNode = f[$ + "Container"], i.focusOffset = f[$ + "Offset"];
      }
      function v(i) {
        var f = i.nativeSelection;
        i.anchorNode = f.anchorNode, i.anchorOffset = f.anchorOffset, i.focusNode = f.focusNode, i.focusOffset = f.focusOffset;
      }
      function O(i) {
        i.anchorNode = i.focusNode = null, i.anchorOffset = i.focusOffset = 0, i.rangeCount = 0, i.isCollapsed = !0, i._ranges.length = 0, Y(i);
      }
      function Y(i) {
        i.type = i.rangeCount == 0 ? "None" : He(i) ? "Caret" : "Range";
      }
      function P(i) {
        var f;
        return i instanceof ve ? (f = m.createNativeRange(i.getDocument()), f.setEnd(i.endContainer, i.endOffset), f.setStart(i.startContainer, i.startOffset)) : i instanceof we ? f = i.nativeRange : Ee.implementsDomRange && i instanceof k.getWindow(i.startContainer).Range && (f = i), f;
      }
      function _e(i) {
        if (!i.length || i[0].nodeType != 1)
          return !1;
        for (var f = 1, N = i.length; f < N; ++f)
          if (!k.isAncestorOf(i[0], i[f]))
            return !1;
        return !0;
      }
      function le(i) {
        var f = i.getNodes();
        if (!_e(f))
          throw T.createError("getSingleElementFromRange: range " + i.inspect() + " did not consist of a single element");
        return f[0];
      }
      function it(i) {
        return !!i && typeof i.text < "u";
      }
      function Je(i, f) {
        var N = new we(f);
        i._ranges = [N], We(i, N, !1), i.rangeCount = 1, i.isCollapsed = N.collapsed, Y(i);
      }
      function Ve(i) {
        if (i._ranges.length = 0, i.docSelection.type == "None")
          O(i);
        else {
          var f = i.docSelection.createRange();
          if (it(f))
            Je(i, f);
          else {
            i.rangeCount = f.length;
            for (var N, I = pe(f.item(0)), $ = 0; $ < i.rangeCount; ++$)
              N = m.createRange(I), N.selectNode(f.item($)), i._ranges.push(N);
            i.isCollapsed = i.rangeCount == 1 && i._ranges[0].collapsed, We(i, i._ranges[i.rangeCount - 1], !1), Y(i);
          }
        }
      }
      function $t(i, f) {
        for (var N = i.docSelection.createRange(), I = le(f), $ = pe(N.item(0)), re = Ye($).createControlRange(), Me = 0, a = N.length; Me < a; ++Me)
          re.add(N.item(Me));
        try {
          re.add(I);
        } catch {
          throw T.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
        }
        re.select(), Ve(i);
      }
      var Tt;
      F(se, "getRangeAt") ? Tt = function(i, f) {
        try {
          return i.getRangeAt(f);
        } catch {
          return null;
        }
      } : H && (Tt = function(i) {
        var f = pe(i.anchorNode), N = m.createRange(f);
        return N.setStartAndEnd(i.anchorNode, i.anchorOffset, i.focusNode, i.focusOffset), N.collapsed !== this.isCollapsed && N.setStartAndEnd(i.focusNode, i.focusOffset, i.anchorNode, i.anchorOffset), N;
      });
      function ue(i, f, N) {
        this.nativeSelection = i, this.docSelection = f, this._ranges = [], this.win = N, this.refresh();
      }
      ue.prototype = m.selectionPrototype;
      function Yt(i) {
        i.win = i.anchorNode = i.focusNode = i._ranges = null, i.rangeCount = i.anchorOffset = i.focusOffset = 0, i.detached = !0, Y(i);
      }
      var yt = [];
      function Wt(i, f) {
        for (var N = yt.length, I, $; N--; )
          if (I = yt[N], $ = I.selection, f == "deleteAll")
            Yt($);
          else if (I.win == i)
            return f == "delete" ? (yt.splice(N, 1), !0) : $;
        return f == "deleteAll" && (yt.length = 0), null;
      }
      var Rt = function(i) {
        if (i && i instanceof ue)
          return i.refresh(), i;
        i = j(i, "getNativeSelection");
        var f = Wt(i), N = qe(i), I = me ? ye(i) : null;
        return f ? (f.nativeSelection = N, f.docSelection = I, f.refresh()) : (f = new ue(N, I, i), yt.push({ win: i, selection: f })), f;
      };
      m.getSelection = Rt, Q.createAliasForDeprecatedMethod(m, "getIframeSelection", "getSelection");
      var q = ue.prototype;
      function Lt(i, f) {
        for (var N = pe(f[0].startContainer), I = Ye(N).createControlRange(), $ = 0, re, Me = f.length; $ < Me; ++$) {
          re = le(f[$]);
          try {
            I.add(re);
          } catch {
            throw T.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
          }
        }
        I.select(), Ve(i);
      }
      if (!ce && H && Q.areHostMethods(se, ["removeAllRanges", "addRange"])) {
        q.removeAllRanges = function() {
          this.nativeSelection.removeAllRanges(), O(this);
        };
        var kt = function(i, f) {
          be(i.nativeSelection, f), i.refresh();
        };
        Ce ? q.addRange = function(i, f) {
          if (Ie && me && this.docSelection.type == ke)
            $t(this, i);
          else if (te(f) && oe)
            kt(this, i);
          else {
            var N;
            Ke ? N = this.rangeCount : (this.removeAllRanges(), N = 0);
            var I = P(i).cloneRange();
            try {
              this.nativeSelection.addRange(I);
            } catch {
            }
            if (this.rangeCount = this.nativeSelection.rangeCount, this.rangeCount == N + 1) {
              if (m.config.checkSelectionRanges) {
                var $ = Tt(this.nativeSelection, this.rangeCount - 1);
                $ && !D($, i) && (i = new we($));
              }
              this._ranges[this.rangeCount - 1] = i, We(this, i, Nt(this.nativeSelection)), this.isCollapsed = He(this), Y(this);
            } else
              this.refresh();
          }
        } : q.addRange = function(i, f) {
          te(f) && oe ? kt(this, i) : (this.nativeSelection.addRange(P(i)), this.refresh());
        }, q.setRanges = function(i) {
          if (Ie && me && i.length > 1)
            Lt(this, i);
          else {
            this.removeAllRanges();
            for (var f = 0, N = i.length; f < N; ++f)
              this.addRange(i[f]);
          }
        };
      } else if (F(se, "empty") && F(Ze, "select") && Ie && ce)
        q.removeAllRanges = function() {
          try {
            if (this.docSelection.empty(), this.docSelection.type != "None") {
              var i;
              if (this.anchorNode)
                i = pe(this.anchorNode);
              else if (this.docSelection.type == ke) {
                var f = this.docSelection.createRange();
                f.length && (i = pe(f.item(0)));
              }
              if (i) {
                var N = Ye(i).createTextRange();
                N.select(), this.docSelection.empty();
              }
            }
          } catch {
          }
          O(this);
        }, q.addRange = function(i) {
          this.docSelection.type == ke ? $t(this, i) : (m.WrappedTextRange.rangeToTextRange(i).select(), this._ranges[0] = i, this.rangeCount = 1, this.isCollapsed = this._ranges[0].collapsed, We(this, i, !1), Y(this));
        }, q.setRanges = function(i) {
          this.removeAllRanges();
          var f = i.length;
          f > 1 ? Lt(this, i) : f && this.addRange(i[0]);
        };
      else
        return T.fail("No means of selecting a Range or TextRange was found"), !1;
      q.getRangeAt = function(i) {
        if (i < 0 || i >= this.rangeCount)
          throw new Oe("INDEX_SIZE_ERR");
        return this._ranges[i].cloneRange();
      };
      var Dt;
      if (ce)
        Dt = function(i) {
          var f;
          m.isSelectionValid(i.win) ? f = i.docSelection.createRange() : (f = Ye(i.win.document).createTextRange(), f.collapse(!0)), i.docSelection.type == ke ? Ve(i) : it(f) ? Je(i, f) : O(i);
        };
      else if (F(se, "getRangeAt") && typeof se.rangeCount == R)
        Dt = function(i) {
          if (Ie && me && i.docSelection.type == ke)
            Ve(i);
          else if (i._ranges.length = i.rangeCount = i.nativeSelection.rangeCount, i.rangeCount) {
            for (var f = 0, N = i.rangeCount; f < N; ++f)
              i._ranges[f] = new m.WrappedRange(i.nativeSelection.getRangeAt(f));
            We(i, i._ranges[i.rangeCount - 1], Nt(i.nativeSelection)), i.isCollapsed = He(i), Y(i);
          } else
            O(i);
        };
      else if (H && typeof se.isCollapsed == C && typeof Ze.collapsed == C && Ee.implementsDomRange)
        Dt = function(i) {
          var f, N = i.nativeSelection;
          N.anchorNode ? (f = Tt(N, 0), i._ranges = [f], i.rangeCount = 1, v(i), i.isCollapsed = He(i), Y(i)) : O(i);
        };
      else
        return T.fail("No means of obtaining a Range or TextRange from the user's selection was found"), !1;
      q.refresh = function(i) {
        var f = i ? this._ranges.slice(0) : null, N = this.anchorNode, I = this.anchorOffset;
        if (Dt(this), i) {
          var $ = f.length;
          if ($ != this._ranges.length || this.anchorNode != N || this.anchorOffset != I)
            return !0;
          for (; $--; )
            if (!D(f[$], this._ranges[$]))
              return !0;
          return !1;
        }
      };
      var rn = function(i, f) {
        var N = i.getAllRanges();
        i.removeAllRanges();
        for (var I = 0, $ = N.length; I < $; ++I)
          D(f, N[I]) || i.addRange(N[I]);
        i.rangeCount || O(i);
      };
      Ie && me ? q.removeRange = function(i) {
        if (this.docSelection.type == ke) {
          for (var f = this.docSelection.createRange(), N = le(i), I = pe(f.item(0)), $ = Ye(I).createControlRange(), re, Me = !1, a = 0, d = f.length; a < d; ++a)
            re = f.item(a), re !== N || Me ? $.add(f.item(a)) : Me = !0;
          $.select(), Ve(this);
        } else
          rn(this, i);
      } : q.removeRange = function(i) {
        rn(this, i);
      };
      var Nt;
      !ce && H && Ee.implementsDomRange ? (Nt = ne, q.isBackward = function() {
        return Nt(this);
      }) : Nt = q.isBackward = function() {
        return !1;
      }, q.isBackwards = q.isBackward, q.toString = function() {
        for (var i = [], f = 0, N = this.rangeCount; f < N; ++f)
          i[f] = "" + this._ranges[f];
        return i.join("");
      };
      function xt(i, f) {
        if (i.win.document != pe(f))
          throw new Oe("WRONG_DOCUMENT_ERR");
      }
      function Qt(i, f) {
        if (f < 0 || f > (k.isCharacterDataNode(i) ? i.length : i.childNodes.length))
          throw new Oe("INDEX_SIZE_ERR");
      }
      q.collapse = function(i, f) {
        xt(this, i);
        var N = m.createRange(i);
        N.collapseToPoint(i, f), this.setSingleRange(N), this.isCollapsed = !0;
      }, q.collapseToStart = function() {
        if (this.rangeCount) {
          var i = this._ranges[0];
          this.collapse(i.startContainer, i.startOffset);
        } else
          throw new Oe("INVALID_STATE_ERR");
      }, q.collapseToEnd = function() {
        if (this.rangeCount) {
          var i = this._ranges[this.rangeCount - 1];
          this.collapse(i.endContainer, i.endOffset);
        } else
          throw new Oe("INVALID_STATE_ERR");
      }, q.selectAllChildren = function(i) {
        xt(this, i);
        var f = m.createRange(i);
        f.selectNodeContents(i), this.setSingleRange(f);
      }, fe ? q.setBaseAndExtent = function(i, f, N, I) {
        this.nativeSelection.setBaseAndExtent(i, f, N, I), this.refresh();
      } : oe && (q.setBaseAndExtent = function(i, f, N, I) {
        Qt(i, f), Qt(N, I), xt(this, i), xt(this, N);
        var $ = m.createRange(node), re = k.comparePoints(i, f, N, I) == -1;
        re ? $.setStartAndEnd(N, I, i, f) : $.setStartAndEnd(i, f, N, I), this.setSingleRange($, re);
      }), q.deleteFromDocument = function() {
        if (Ie && me && this.docSelection.type == ke) {
          for (var i = this.docSelection.createRange(), f; i.length; )
            f = i.item(0), i.remove(f), k.removeNode(f);
          this.refresh();
        } else if (this.rangeCount) {
          var N = this.getAllRanges();
          if (N.length) {
            this.removeAllRanges();
            for (var I = 0, $ = N.length; I < $; ++I)
              N[I].deleteContents();
            this.addRange(N[$ - 1]);
          }
        }
      }, q.eachRange = function(i, f) {
        for (var N = 0, I = this._ranges.length; N < I; ++N)
          if (i(this.getRangeAt(N)))
            return f;
      }, q.getAllRanges = function() {
        var i = [];
        return this.eachRange(function(f) {
          i.push(f);
        }), i;
      }, q.setSingleRange = function(i, f) {
        this.removeAllRanges(), this.addRange(i, f);
      }, q.callMethodOnEachRange = function(i, f) {
        var N = [];
        return this.eachRange(function(I) {
          N.push(I[i].apply(I, f || []));
        }), N;
      };
      function Gt(i) {
        return function(f, N) {
          var I;
          this.rangeCount ? (I = this.getRangeAt(0), I["set" + (i ? "Start" : "End")](f, N)) : (I = m.createRange(this.win.document), I.setStartAndEnd(f, N)), this.setSingleRange(I, this.isBackward());
        };
      }
      q.setStart = Gt(!0), q.setEnd = Gt(!1), m.rangePrototype.select = function(i) {
        Rt(this.getDocument()).setSingleRange(this, i);
      }, q.changeEachRange = function(i) {
        var f = [], N = this.isBackward();
        this.eachRange(function(I) {
          i(I), f.push(I);
        }), this.removeAllRanges(), N && f.length == 1 ? this.addRange(f[0], "backward") : this.setRanges(f);
      }, q.containsNode = function(i, f) {
        return this.eachRange(function(N) {
          return N.containsNode(i, f);
        }, !0) || !1;
      }, q.getBookmark = function(i) {
        return {
          backward: this.isBackward(),
          rangeBookmarks: this.callMethodOnEachRange("getBookmark", [i])
        };
      }, q.moveToBookmark = function(i) {
        for (var f = [], N = 0, I, $; I = i.rangeBookmarks[N++]; )
          $ = m.createRange(this.win), $.moveToBookmark(I), f.push($);
        i.backward ? this.setSingleRange(f[0], "backward") : this.setRanges(f);
      }, q.saveRanges = function() {
        return {
          backward: this.isBackward(),
          ranges: this.callMethodOnEachRange("cloneRange")
        };
      }, q.restoreRanges = function(i) {
        this.removeAllRanges();
        for (var f = 0, N; N = i.ranges[f]; ++f)
          this.addRange(N, i.backward && f == 0);
      }, q.toHtml = function() {
        var i = [];
        return this.eachRange(function(f) {
          i.push(ve.toHtml(f));
        }), i.join("");
      }, Ee.implementsTextRange && (q.getNativeTextRange = function() {
        var i;
        if (i = this.docSelection) {
          var f = i.createRange();
          if (it(f))
            return f;
          throw T.createError("getNativeTextRange: selection is a control selection");
        } else {
          if (this.rangeCount > 0)
            return m.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));
          throw T.createError("getNativeTextRange: selection contains no range");
        }
      });
      function jt(i) {
        var f = [], N = new de(i.anchorNode, i.anchorOffset), I = new de(i.focusNode, i.focusOffset), $ = typeof i.getName == "function" ? i.getName() : "Selection";
        if (typeof i.rangeCount < "u")
          for (var re = 0, Me = i.rangeCount; re < Me; ++re)
            f[re] = ve.inspect(i.getRangeAt(re));
        return "[" + $ + "(Ranges: " + f.join(", ") + ")(anchor: " + N.inspect() + ", focus: " + I.inspect() + "]";
      }
      q.getName = function() {
        return "WrappedSelection";
      }, q.inspect = function() {
        return jt(this);
      }, q.detach = function() {
        Wt(this.win, "delete"), Yt(this);
      }, ue.detachAll = function() {
        Wt(null, "deleteAll");
      }, ue.inspect = jt, ue.isDirectionBackward = te, m.Selection = ue, m.selectionPrototype = q, m.addShimListener(function(i) {
        typeof i.getSelection > "u" && (i.getSelection = function() {
          return Rt(i);
        }), i = null;
      });
    });
    var ro = !1, Mn = function(m) {
      ro || (ro = !0, !W.initialized && W.config.autoInitialize && wn());
    };
    return ge && (document.readyState == "complete" ? Mn() : (u(document, "addEventListener") && document.addEventListener("DOMContentLoaded", Mn, !1), nn(window, "load", Mn))), W;
  });
})(Fo);
var ts = Fo.exports;
const $o = /* @__PURE__ */ es(ts), Se = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, r] of e)
    o[n] = r;
  return o;
}, ns = Vn({
  name: "EditorBlockList",
  props: {
    tag: String,
    contenteditable: {
      type: [Boolean, String],
      default: !0
    },
    modelValue: String,
    noHtml: {
      type: Boolean,
      default: !0
    },
    noNl: {
      type: Boolean,
      default: !0
    },
    onPasteHandler: {
      default: null
    },
    noSelect: {
      type: Boolean,
      default: !0
    }
  },
  setup(t, { emit: e }) {
    const o = K(null), n = ot("textEditor"), r = K(null);
    function c(S, w, _) {
      return S.split(w).join(_);
    }
    function s() {
      var S, w;
      return t.noHtml ? (S = o.value) == null ? void 0 : S.innerText : (w = o.value) == null ? void 0 : w.innerHTML;
    }
    function l(S) {
      t.noHtml ? o.value.innerText = S : o.value.innerHTML = S;
    }
    function p() {
      e("update:modelValue", s());
    }
    let u = K((S) => {
      S.preventDefault();
      let w = (S.originalEvent || S).clipboardData.getData("text/plain");
      t.noNl && (w = c(w, `\r
`, " "), w = c(w, `
`, " "), w = c(w, "\r", " ")), window.document.execCommand("insertText", !1, w);
    });
    function h(S) {
      S.key == "Enter" && t.noNl && (S.preventDefault(), e("returned", s()));
    }
    function g() {
      n.commit("resetSelect"), !t.noSelect && setTimeout(() => {
        n.dispatch("updateSelection", o.value);
      });
    }
    return $e(() => {
      l(t.modelValue ?? ""), tt.isMobile() && setInterval(() => {
        const S = $o.getSelection();
        S.type === "Range" && r.value !== S.toString() ? (r.value = S.toString(), g()) : S.type === "Caret" && (r.value = null);
      }, 200);
    }), Fn(() => {
      t.onPasteHandler && (u.value = t.onPasteHandler);
    }), Te(() => t.modelValue, (S) => {
      S != s() && l(S ?? "");
    }), Te(() => t.noHtml, () => {
      l(t.modelValue ?? "");
    }), Te(() => t.tag, () => {
      l(t.modelValue ?? "");
    }, { flush: "post" }), {
      onKeypress: h,
      onPaste: u,
      update: p,
      element: o,
      onMouseupHandler: g
    };
  }
});
function os(t, e, o, n, r, c) {
  return z(), Pe(ht(t.tag), {
    contenteditable: t.contenteditable,
    onInput: t.update,
    onBlur: t.update,
    onPaste: t.onPaste,
    onKeypress: t.onKeypress,
    onMouseup: t.onMouseupHandler,
    ref: "element"
  }, null, 40, ["contenteditable", "onInput", "onBlur", "onPaste", "onKeypress", "onMouseup"]);
}
const Vt = /* @__PURE__ */ Se(ns, [["render", os]]), rs = /* @__PURE__ */ Vn({
  __name: "contenteditable",
  props: {
    tag: String,
    contenteditable: {
      type: [Boolean, String],
      default: !0
    },
    modelValue: String,
    noHtml: {
      type: Boolean,
      default: !0
    },
    noNl: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    returned: String,
    "update:modelValue": String
  },
  setup(t, { emit: e }) {
    const o = t;
    function n(h, g, S) {
      return h.split(g).join(S);
    }
    const r = K();
    function c() {
      return o.noHtml ? r.value.innerText : r.value.innerHTML;
    }
    function s(h) {
      o.noHtml ? r.value.innerText = h : r.value.innerHTML = h;
    }
    function l(h) {
      e("update:modelValue", c());
    }
    function p(h) {
      h.preventDefault();
      let g = (h.originalEvent || h).clipboardData.getData("text/plain");
      o.noNl && (g = n(g, `\r
`, " "), g = n(g, `
`, " "), g = n(g, "\r", " ")), window.document.execCommand("insertText", !1, g);
    }
    function u(h) {
      h.key == "Enter" && o.noNl && (h.preventDefault(), e("returned", c()));
    }
    return $e(() => {
      var h;
      s((h = o.modelValue) != null ? h : "");
    }), Te(() => o.modelValue, (h, g) => {
      h != c() && s(h ?? "");
    }), Te(() => o.noHtml, (h, g) => {
      var S;
      s((S = o.modelValue) != null ? S : "");
    }), Te(() => o.tag, (h, g) => {
      var S;
      s((S = o.modelValue) != null ? S : "");
    }, { flush: "post" }), (h, g) => (z(), Pe(ht(t.tag), {
      contenteditable: t.contenteditable,
      onInput: l,
      onBlur: l,
      onPaste: p,
      onKeypress: u,
      ref_key: "element",
      ref: r
    }, null, 40, ["contenteditable"]));
  }
}), ss = { class: "text-editor" }, is = {
  key: 0,
  class: "text-editor__placeholder placeholder"
};
function as(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), ee("div", ss, [
    dt(s, {
      contenteditable: "true",
      tag: o.tag,
      modelValue: n.text,
      "onUpdate:modelValue": e[0] || (e[0] = (l) => n.text = l),
      ref: "inputBlock",
      onKeypress: o.pressHandler
    }, null, 8, ["tag", "modelValue", "onKeypress"]),
    n.isPlaceholder ? (z(), ee("p", is, $n(o.placeholder), 1)) : et("", !0)
  ]);
}
const cs = {
  name: "TextInput",
  components: {
    contentEditable: rs
  },
  props: {
    tag: {
      type: String,
      default: "p"
    },
    placeholder: {
      type: String,
      default: ""
    },
    focus: {
      default: !0
    },
    pressHandler: {
      type: Function,
      default: () => {
      }
    },
    value: {
      type: String,
      required: !0
    }
  },
  setup(t, { emit: e }) {
    const o = K(!0), n = K(null), r = K(t.value), c = () => {
    };
    return Te(r, (s) => {
      s !== "" ? o.value = !1 : o.value = !0, e("update:modelValue", s);
    }), $e(() => {
      t.focus && n.value.$el.focus();
    }), {
      text: r,
      isPlaceholder: o,
      inputBlock: n,
      inputHandler: c
    };
  }
}, pn = /* @__PURE__ */ Se(cs, [["render", as], ["__scopeId", "data-v-4064fff7"]]);
class Yo {
  constructor(e) {
    he(this, "arHtmlFragments", []);
    he(this, "inlineNodes", []);
    this.html = e;
  }
  process() {
    const e = this.getDoc(this.html);
    return Array.from(e.body.childNodes).forEach((o) => {
      this.processNode(o);
    }), this.inlineNodes.length && this.setInlineFragment(), this.arHtmlFragments.length && this.arHtmlFragments.forEach((o) => {
      o.clear || (o.value = this.clearText(o.value));
    }), this.arHtmlFragments.filter((o) => o.value !== "");
  }
  getDoc(e) {
    return new DOMParser().parseFromString(e, "text/html");
  }
  processNode(e, o = !0) {
    if (!((e.nodeType === Node.TEXT_NODE || !e.tagName || this.isInline(e.tagName.toLowerCase())) && !o)) {
      if (this.processInline(e), e.nodeType === Node.ELEMENT_NODE) {
        const n = e.tagName.toLowerCase();
        if (n === "div")
          return this.processDiv(e);
        if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(n))
          this.setFragment(Be.TYPES.SUBTITLE, e.textContent.trim(), !0, e.attributes);
        else if (n === "img") {
          const r = this.processImage(e);
          this.setFragment(Be.TYPES.IMAGE, { upload: r }, !0, e.attributes);
        } else if (["p"].includes(n))
          this.setFragment(Be.TYPES.TEXT, e.innerHTML, !1, e.attributes);
        else if (["ul", "ol"].includes(n)) {
          const r = this.processList(e);
          let c = Be.TYPES.LIST_NUM;
          n === "ul" && (c = Be.TYPES.LIST), this.setFragment(c, r, !0, e.attributes);
        } else
          ["iframe", "embed"].includes(n) ? this.setFragment(Be.TYPES.EMBED, e.src, e.attributes) : this.setFragment(Be.TYPES.TEXT, e.innerHTML, !1, e.attributes);
        !this.isInline(e.tagName.toLowerCase()) && !["ul", "ol"].includes(n) && e.childNodes.forEach((r) => {
          this.processNode(r, !1);
        });
      }
      return null;
    }
  }
  isInline(e) {
    return ["a", "span", "b", "i", "em", "strong", "noindex", "mark", "abbr", "del", "ins", "sup", "sub", "var", "samp", "kbd", "code"].includes(e);
  }
  setFragment(e, o, n = !1, r = {}) {
    const c = {}, s = ["class"];
    for (let l in r)
      r[l].value && r[l].value !== void 0 && s.includes(r[l].name) && (c[r[l].name] = r[l].value);
    this.arHtmlFragments.push({
      code: e,
      value: o,
      clear: n,
      attr: c
    });
  }
  getInlineString(e, o) {
    if (e && o.textContent.trim() !== "") {
      const n = document.createElement(e);
      return o.classList.forEach((r) => {
        n.classList.add(r);
      }), n.innerHTML = o.innerHTML, e === "a" && (n.href = o.href), n.outerHTML;
    } else
      return o.textContent;
  }
  setInlineFragment() {
    let e = "";
    this.inlineNodes.forEach((o) => {
      o !== "" && (e += o + " ");
    }), e !== "" && this.setFragment(Be.TYPES.TEXT, e, !0), this.inlineNodes = [];
  }
  processInline(e) {
    let o = "";
    e.nodeType === Node.TEXT_NODE ? e.textContent.trim() !== "" && this.inlineNodes.push(e.textContent) : e.nodeType === Node.ELEMENT_NODE && this.isInline(e.tagName.toLowerCase()) ? (o = this.getContentInline(e), o.trim() !== "" && this.inlineNodes.push(o)) : this.inlineNodes && this.setInlineFragment();
  }
  getContentInline(e) {
    let o = "";
    const n = e.tagName.toLowerCase();
    return ["b", "i", "a"].includes(n) ? o = this.getInlineString(n, e) : n === "em" ? o = this.getInlineString("i", e) : n === "strong" ? o = this.getInlineString("b", e) : o = this.getInlineString(n, e), o;
  }
  getClearText(e) {
    let o = "";
    return e.nodeType === Node.TEXT_NODE ? o = e.textContent : e.nodeType === Node.ELEMENT_NODE && (o = this.getContentInline(e)), o;
  }
  processDiv(e) {
    const o = document.createElement("p");
    return Array.from(e.childNodes).forEach((n) => {
      const r = this.processNode(n);
      r && o.appendChild(r);
    }), o;
  }
  processList(e) {
    const o = e.childNodes, n = [];
    return o.forEach((r) => {
      r.nodeType === Node.ELEMENT_NODE && r.tagName.toLowerCase() === "li" && n.push(this.clearText(r.innerHTML));
    }), n;
  }
  processImage(e) {
    return [e.getAttribute("src")];
  }
  clearText(e) {
    let o = "";
    const n = this.getDoc(e);
    return Array.from(n.body.childNodes).forEach((r) => {
      o += this.getClearText(r);
    }), o;
  }
}
const at = class at {
};
he(at, "baseUrl", ""), he(at, "uploadImage", "http://v1755698.hosted-by-vdsina.ru/upload.php"), he(at, "uploadImageByPath", "http://v1755698.hosted-by-vdsina.ru/upload.php"), he(at, "setEndpoints", (e) => {
  for (let o in e)
    at[o] && (at[o] = e[o]);
}), he(at, "getUrl", (e) => `${at.baseUrl}${at[e]}`);
let Zt = at;
class ls {
  constructor() {
    he(this, "uploadImage", (e) => {
      const o = new FormData();
      o.append("image", e);
      const n = {
        "Content-Type": "multipart/form-data"
      };
      return axios({
        method: "post",
        url: Zt.getUrl("uploadImage"),
        data: o,
        headers: n
      });
    });
    he(this, "uploadImageByPath", async (e) => {
      const o = new FormData();
      o.append("path", e);
      const n = {
        "Content-Type": "multipart/form-data"
      };
      return axios({
        method: "post",
        url: Zt.getUrl("uploadImageByPath"),
        data: o,
        headers: n
      });
    });
    he(this, "sendResult", (e) => axios({
      method: "post",
      url: "/backend.php",
      data: e
    }));
  }
}
const mn = new ls();
function us(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), Pe(s, {
    contenteditable: t.editable,
    "no-select": !1,
    tag: "p",
    modelValue: t.value,
    "onUpdate:modelValue": e[0] || (e[0] = (l) => t.value = l),
    "no-html": !1,
    "on-paste-handler": t.onPaste,
    ref: "inputBlock",
    onKeypress: t.keyDownHandler,
    disabled: ""
  }, null, 8, ["contenteditable", "modelValue", "on-paste-handler", "onKeypress"]);
}
const ds = Vn({
  name: "simpleText",
  mixins: [nt],
  components: {
    contentEditable: Vt
  },
  setup(t) {
    const e = ot("textEditor"), o = nt.setup(t), n = K(null), { value: r, keyDownHandler: c } = o, s = K(!0);
    o.setOutput(() => {
      let p = "";
      return t.class && (p = ' class="' + t.class + '"'), `<p${p}>${r.value}</p>`;
    });
    const l = async (p) => {
      const u = p.clipboardData || window.clipboardData, h = tt.checkImageClipboard(u);
      if (h) {
        s.value = !1;
        try {
          const { data: g } = await mn.uploadImage(h);
          if ((g == null ? void 0 : g.status) === "success") {
            const S = Be.getParamsBlock("image");
            S.value = {
              images: [
                { path: g.path }
              ]
            }, S.props = {
              startValue: S.value
            }, r.value === "" && await e.dispatch("deleteBlock", t.blockId), await e.dispatch("addBlock", S), await e.dispatch("addBlockByCode", "text");
          }
        } catch {
        }
        s.value = !0;
      } else {
        let g = u.getData("text/html");
        if (g === "" && (g = u.getData("text/plain")), e.commit("setDebug", g), g !== "") {
          p.preventDefault();
          const w = new Yo(g).process();
          e.dispatch("addArBlocks", { blockId: t.blockId, data: w, clipboard: !0 });
        }
      }
    };
    return $e(() => {
      n.value.$el.focus(), t.startValue && (r.value = t.startValue);
    }), {
      value: r,
      inputBlock: n,
      editable: s,
      keyDownHandler: c,
      onPaste: l
    };
  }
}), fs = /* @__PURE__ */ Se(ds, [["render", us], ["__scopeId", "data-v-cf2d9977"]]), hs = { class: "editor-block-wrapper" }, ps = {
  key: 0,
  class: "placeholder"
};
function ms(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), ee("div", hs, [
    dt(s, {
      contenteditable: "true",
      tag: "h2",
      modelValue: n.value,
      "onUpdate:modelValue": e[0] || (e[0] = (l) => n.value = l),
      ref: "inputBlock",
      onKeypress: n.keyDownHandler
    }, null, 8, ["modelValue", "onKeypress"]),
    n.isPlaceholder ? (z(), ee("div", ps, "Заголовок")) : et("", !0)
  ]);
}
const gs = {
  name: "SubTitle",
  mixins: [nt],
  components: {
    contentEditable: Vt,
    TextInput: pn
  },
  setup(t) {
    const e = nt.setup(t), o = K(null), { value: n, keyDownHandler: r } = e, c = Ae(() => n.value === "");
    return e.setOutput(() => {
      let s = "";
      return t.class && (s = ' class="' + t.class + '"'), `<h2${s}>${n.value}</h2>`;
    }), $e(() => {
      o.value.$el.focus(), t.startValue && (n.value = t.startValue);
    }), {
      value: n,
      inputBlock: o,
      isPlaceholder: c,
      keyDownHandler: r
    };
  }
}, vs = /* @__PURE__ */ Se(gs, [["render", ms], ["__scopeId", "data-v-8f7b91a5"]]), ys = {
  class: "editor-quote",
  ref: "inputBlock"
};
function Es(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), ee("div", ys, [
    (z(!0), ee(pt, null, Ut(n.text, (l, p) => (z(), Pe(s, {
      class: "editor-quote__text",
      tag: "p",
      "no-select": !1,
      "no-html": !1,
      contenteditable: "true",
      modelValue: n.text[p],
      "onUpdate:modelValue": (u) => n.text[p] = u,
      onKeypress: n.onPressTextHandler,
      onKeydown: (u) => n.handleBackspace(p, u)
    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeypress", "onKeydown"]))), 256)),
    dt(s, {
      class: "editor-quote__author",
      tag: "p",
      contenteditable: "true",
      modelValue: n.author,
      "onUpdate:modelValue": e[0] || (e[0] = (l) => n.author = l),
      pressHandler: n.keyDownHandler,
      ref: "inputBlockAuthor"
    }, null, 8, ["modelValue", "pressHandler"])
  ], 512);
}
const _s = {
  name: "QuoteBlock",
  mixins: [nt],
  components: {
    TextInput: pn,
    contentEditable: Vt
  },
  setup(t) {
    const e = nt.setup(t), o = K(null), n = K(null), { value: r, keyDownHandler: c } = e, s = Jt([""]), l = K(""), p = Ae(() => r.value === "");
    e.setOutput(() => {
      let _ = "";
      return r.value.text !== void 0 && r.value.text.forEach((b) => {
        _ += '<p class="quote-text">' + b + "</p>";
      }), `<div class="quote-wrapper">${_}<p class="quote-author">${r.value.author}</p></div>`;
    }), Te(s, (_) => {
      u(_, l.value);
    }), Te(l, (_) => {
      u(s, _);
    });
    const u = (_, b) => {
      r.value = {
        text: _,
        author: b
      };
    }, h = (_) => {
      if (_.which === 13) {
        if (_.preventDefault(), s[s.length - 1] !== "")
          s.push(""), setTimeout(() => {
            g().focus();
          });
        else if (s.length > 1) {
          const V = s.length - 1;
          V > 0 && o.value.querySelector(".editor-quote__text:nth-child(" + V + ")").focus(), w(V), n.value.$el.focus();
        }
      }
    };
    $e(() => {
      t.startValue && (t.startValue.text.forEach((b) => {
        s.length === 1 && s[0] === "" ? s[0] = b : s.push(b);
      }), l.value = t.startValue.author);
      const _ = g();
      _ && _.focus();
    });
    const g = () => {
      const _ = o.value.querySelectorAll(".editor-quote__text");
      return _.length ? _[_.length - 1] : null;
    }, S = (_, b) => {
      const V = b.target, Ne = tt.getCaretPos(V);
      b.key === "Backspace" && s.length > 1 && (s[_] === "" || Ne === 0) && (_ > 0 && o.value.querySelector(".editor-quote__text:nth-child(" + _ + ")").focus(), w(_));
    }, w = (_) => {
      s.splice(_, 1);
    };
    return {
      text: s,
      author: l,
      inputBlock: o,
      isPlaceholder: p,
      inputBlockAuthor: n,
      onPressTextHandler: h,
      keyDownHandler: c,
      handleBackspace: S
    };
  }
}, Ns = /* @__PURE__ */ Se(_s, [["render", Es], ["__scopeId", "data-v-96eb81e3"]]);
function Ss(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), Pe(ht(o.tag), {
    class: "editor-list",
    ref: "listElement"
  }, {
    default: un(() => [
      (z(!0), ee(pt, null, Ut(n.list, (l, p) => (z(), Pe(s, {
        tag: "li",
        "no-select": !1,
        "no-html": !1,
        contenteditable: "true",
        key: p,
        modelValue: n.list[p],
        "onUpdate:modelValue": (u) => n.list[p] = u,
        onKeypress: (u) => n.addElement(p, u),
        onKeydown: (u) => n.handleBackspace(p, u)
      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeypress", "onKeydown"]))), 128))
    ]),
    _: 1
  }, 512);
}
const ws = {
  name: "ListBlock",
  mixins: [nt],
  components: {
    contentEditable: Vt
  },
  props: {
    tag: {
      default: "ul"
    }
  },
  setup(t) {
    const e = ot("textEditor"), o = nt.setup(t), n = K(null), r = Jt([""]), { value: c, keyDownHandler: s, onMouseupHandler: l } = o;
    o.setOutput(() => {
      let h = "";
      return c.value.li.forEach((g) => h += "<li>" + g.trim() + "</li>"), `<${c.value.tag}>${h}</${c.value.tag}>`;
    }), Te(r, (h) => {
      c.value = {
        tag: t.tag,
        li: h
      };
    });
    const p = (h, g) => {
      g.which === 13 && (g.preventDefault(), r[r.length - 1] !== "" ? (r.push(""), setTimeout(() => {
        n.value.querySelector("li:last-child").focus();
      })) : r.length > 1 && (h > 0 && n.value.querySelector("li:nth-child(" + h + ")").focus(), r.splice(h, 1), e.dispatch("addBlockByCode", "text")));
    }, u = (h, g) => {
      const S = g.target, w = tt.getCaretPos(S);
      g.key === "Backspace" && r.length > 1 && (r[h] === "" || w === 0) && (h > 0 && n.value.querySelector("li:nth-child(" + h + ")").focus(), r.splice(h, 1));
    };
    return $e(() => {
      t.startValue && t.startValue.forEach((h) => {
        r.length === 1 && r[0] === "" ? r[0] = h : r.push(h);
      }), n.value.querySelector("li:last-child").focus();
    }), {
      list: r,
      value: c,
      listElement: n,
      addElement: p,
      keyDownHandler: s,
      handleBackspace: u,
      onMouseupHandler: l
    };
  }
}, ho = /* @__PURE__ */ Se(ws, [["render", Ss], ["__scopeId", "data-v-46bd5ea8"]]), Cs = (t) => (Ct("data-v-f0b0ac19"), t = t(), Mt(), t), Ms = /* @__PURE__ */ Cs(() => /* @__PURE__ */ Z("svg", {
  width: "25px",
  height: "25px",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ Z("path", {
    fill: "#000000",
    d: "M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
  }),
  /* @__PURE__ */ Z("path", {
    fill: "#000000",
    d: "M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"
  })
], -1));
function Ts(t, e, o, n, r, c) {
  return z(), ee("label", {
    class: wt({ disabled: n.isLoad })
  }, [
    Z("input", {
      type: "file",
      accept: "image/*",
      ref: "inputFile",
      onChange: e[0] || (e[0] = (...s) => n.handleFileUpload && n.handleFileUpload(...s))
    }, null, 544),
    Ms
  ], 2);
}
const Ds = {
  name: "ImageUploader",
  setup(t, { emit: e }) {
    const o = K(null), n = K(!1), r = async (s) => {
      var p;
      if (n.value) {
        s.preventDefault();
        return;
      }
      const l = s.target.files[0];
      if (l && l.type.startsWith("image/")) {
        n.value = !0;
        try {
          const u = await mn.uploadImage(l);
          ((p = u.data) == null ? void 0 : p.status) === "success" && e("upload", u.data.path);
        } catch (u) {
          console.log(u.message);
        }
        n.value = !1;
      }
      c();
    }, c = () => {
      o.value.value = null;
    };
    return {
      inputFile: o,
      isLoad: n,
      handleFileUpload: r
    };
  }
}, xs = /* @__PURE__ */ Se(Ds, [["render", Ts], ["__scopeId", "data-v-f0b0ac19"]]), Os = (t) => (Ct("data-v-e6cff921"), t = t(), Mt(), t), bs = { class: "editor-images" }, Is = { class: "editor-images__item--img" }, As = ["src"], Rs = ["onClick"], Ls = /* @__PURE__ */ Os(() => /* @__PURE__ */ Z("svg", {
  "data-v-17ff85c0": "",
  width: "20px",
  height: "20px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ Z("g", {
    "data-v-17ff85c0": "",
    id: "Menu / Close_SM"
  }, [
    /* @__PURE__ */ Z("path", {
      "data-v-17ff85c0": "",
      id: "Vector",
      d: "M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1)), ks = [
  Ls
];
function js(t, e, o, n, r, c) {
  const s = Xe("imageUploader");
  return z(), ee("div", bs, [
    (z(!0), ee(pt, null, Ut(n.files, (l, p) => (z(), ee("div", {
      class: "editor-images__item",
      key: p
    }, [
      Z("div", Is, [
        Z("img", {
          src: l.path
        }, null, 8, As)
      ]),
      Z("span", {
        class: "editor-images__close",
        onClick: (u) => n.deleteFile(p)
      }, ks, 8, Rs)
    ]))), 128)),
    n.isShowUploader ? (z(), Pe(s, {
      key: 0,
      onUpload: n.handleUpload
    }, null, 8, ["onUpload"])) : et("", !0)
  ]);
}
const Bs = {
  name: "ImageBlock",
  components: {
    imageUploader: xs
  },
  mixins: [nt],
  props: {
    multiple: {
      default: !1
    },
    upload: {
      default: null
    },
    load: {
      default: !1
    }
  },
  setup(t) {
    const e = nt.setup(t), o = Jt([]), { value: n, keyDownHandler: r } = e, c = Ae(() => !(!t.multiple && o.length)), s = (p) => {
      o.push({
        path: p
      });
    }, l = (p) => {
      o.splice(p, 1);
    };
    return Te(o, (p) => {
      n.value = {
        images: p
      };
    }), e.setOutput(() => {
      let p = "", u = "";
      return t.class && (u = ' class="' + t.class + '"'), n.value.images.forEach((h) => {
        p += `<img${u} style="max-width: 100%" src="${h.path}">`;
      }), `<p>${p}</p>`;
    }), $e(() => {
      var p;
      t.upload ? t.upload.forEach((u) => {
        /^(?:https?:\/\/)/i.test(u) && t.load ? mn.uploadImageByPath(u).then((h) => {
          var g;
          ((g = h.data) == null ? void 0 : g.status) === "success" && o.push({ path: h.data.path });
        }) : o.push({ path: u });
      }) : (p = t.startValue) != null && p.images && t.startValue.images.forEach((u) => {
        o.push(u);
      });
    }), {
      files: o,
      isShowUploader: c,
      handleUpload: s,
      keyDownHandler: r,
      deleteFile: l
    };
  }
}, Ps = /* @__PURE__ */ Se(Bs, [["render", js], ["__scopeId", "data-v-e6cff921"]]), zs = ["cite", "data-video-id"], Hs = /* @__PURE__ */ Z("section", null, null, -1), Us = [
  Hs
];
function Vs(t, e, o, n, r, c) {
  return z(), ee(pt, null, [
    Z("blockquote", {
      class: "tiktok-embed",
      cite: o.src,
      "data-video-id": n.id,
      style: { "max-width": "605px", "min-width": "325px" }
    }, Us, 8, zs),
    (z(), Pe(ht("script"), {
      async: "",
      src: "https://www.tiktok.com/embed.js"
    }))
  ], 64);
}
const Fs = {
  name: "TikTokEmbed",
  props: {
    src: {
      required: !0
    }
  },
  setup(t) {
    return {
      id: Ae(() => {
        const o = /\/(\d+)(?:\?|$)/, n = t.src.match(o);
        return n ? n[1] : !1;
      })
    };
  }
}, po = /* @__PURE__ */ Se(Fs, [["render", Vs]]);
const $s = {
  name: "VkEmbed",
  props: {
    src: {
      required: !0
    },
    hash: {
      default: null
    }
  },
  setup(t, { emit: e }) {
    const o = K(t.hash), n = K(!1), r = Ae(() => {
      const l = {}, p = /wall(-[0-9_]+)/, u = t.src.match(p);
      if (u) {
        const h = u[1].split("_");
        l.string = u[1], l.owner = h[0], l.post = h[1];
      }
      return l;
    }), c = (l = "vk_post") => `
                (function() {
                    VK.Widgets.Post("${l}_${r.value.string}", ${r.value.owner}, ${r.value.post}, '${o.value}');
                }());
            `, s = Ae(() => {
      const l = document.createElement("div");
      l.id = "vk_post-output_" + r.value.string;
      const p = document.createElement("script");
      p.type = "text/javascript", p.src = "https://vk.com/js/api/openapi.js?169";
      const u = document.createElement("script");
      u.type = "text/javascript", u.innerHTML = `${c("vk_post-output")}`;
      const h = document.createElement("div");
      return h.appendChild(l), h.appendChild(p), h.appendChild(u), h.innerHTML;
    });
    return Te(o, (l) => {
      e("change", {
        props: {
          hash: l
        },
        output: s.value
      });
    }), {
      postId: r,
      vkScript: c,
      hashString: o,
      isLoad: n
    };
  }
}, Ys = { key: 0 }, Ws = ["id"];
function Qs(t, e, o, n, r, c) {
  return z(), ee(pt, null, [
    xo(Z("input", {
      placeholder: "Hash",
      "onUpdate:modelValue": e[0] || (e[0] = (s) => n.hashString = s)
    }, null, 512), [
      [Oo, n.hashString]
    ]),
    (z(), Pe(ht("script"), {
      onLoad: e[1] || (e[1] = (s) => n.isLoad = !0),
      src: "https://vk.com/js/api/openapi.js?169"
    }, null, 32)),
    n.hashString && n.hashString !== "" && n.isLoad ? (z(), ee("div", Ys, [
      Z("div", {
        id: "vk_post_" + n.postId.string
      }, null, 8, Ws),
      (z(), Pe(ht("script"), null, {
        default: un(() => [
          wr($n(n.vkScript()), 1)
        ]),
        _: 1
      }))
    ])) : et("", !0)
  ], 64);
}
const mo = /* @__PURE__ */ Se($s, [["render", Qs], ["__scopeId", "data-v-2a84242e"]]);
const Gs = {
  name: "TelegramEmbed",
  props: {
    src: {
      required: !0
    }
  },
  setup(t, { emit: e }) {
    const o = Ae(() => {
      const r = /\/t.me\/(.+\/[0-9]+)/, c = t.src.match(r);
      return c ? c[1] : "";
    }), n = Ae(() => {
      const r = document.createElement("script");
      r.src = "https://telegram.org/js/telegram-widget.js", r.setAttribute("data-telegram-post", o.value), r.setAttribute("data-width", "100%");
      const c = document.createElement("div");
      return c.appendChild(r), c.innerHTML;
    });
    return $e(() => {
      e("change", { output: n.value });
    }), {
      postId: o
    };
  }
}, qs = {
  key: 0,
  class: "editor-telegram"
};
function Zs(t, e, o, n, r, c) {
  return n.postId ? (z(), ee("div", qs, [
    (z(), Pe(ht("script"), {
      src: "https://telegram.org/js/telegram-widget.js",
      "data-telegram-post": n.postId,
      "data-width": "100%"
    }, null, 8, ["data-telegram-post"]))
  ])) : et("", !0);
}
const go = /* @__PURE__ */ Se(Gs, [["render", Zs], ["__scopeId", "data-v-0f67abb3"]]), Ks = { key: 0 }, Js = ["src"];
function Xs(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), ee(pt, null, [
    Z("div", {
      class: wt(["editor-embed", { error: !n.isValid }])
    }, [
      dt(s, {
        placeholder: "Вставьте ссылку",
        tag: "div",
        modelValue: n.link.value,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => n.link.value = l),
        pressHandler: n.keyDownHandler,
        ref: "inputBlock"
      }, null, 8, ["modelValue", "pressHandler"])
    ], 2),
    n.isValid && n.link.value !== "" ? (z(), ee("div", Ks, [
      n.currentDomain.component ? (z(), Pe(ht(n.currentDomain.component), bo({
        key: 1,
        src: n.link.value,
        onChange: e[1] || (e[1] = (l) => n.onChangeHandler(n.currentDomain.name, l))
      }, n.currentDomain.props), null, 16, ["src"])) : (z(), ee("embed", {
        key: 0,
        src: n.link.value,
        autostart: "0",
        hspace: "10",
        vspace: "10",
        width: "400",
        height: "255"
      }, null, 8, Js))
    ])) : et("", !0)
  ], 64);
}
const ei = {
  name: "EmbedBlock",
  components: {
    TextInput: pn,
    contentEditable: Vt,
    TikTokEmbed: po,
    VkEmbed: mo,
    TelegramEmbed: go
  },
  mixins: [nt],
  setup(t) {
    const e = nt.setup(t), o = K(null), n = Jt({ value: "", domain: null, props: null }), r = K(!0), { value: c, keyDownHandler: s } = e, l = /^https?:\/\/(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/im, u = [
      { name: "youtube.com", component: !1 },
      { name: "instagram.com", component: !1 },
      { name: "tiktok.com", component: po, output: () => `<p class="tiktok-embed" align="center"><embed src="${c.value}" width="100%" height="750"></p>` },
      { name: "coub.com", component: !1 },
      { name: "vk.com", component: mo, output: () => "" },
      { name: "t.me", component: go }
    ];
    e.setOutput(() => !r.value || c.value.value === "" ? "" : S.value.output ? S.value.output() : `<p><embed src="${c.value.value}" width="700" height="450"></p>`), $e(() => {
      if (t.startValue && (Object.assign(n, t.startValue), t.startValue.domain && t.startValue.props)) {
        const b = u.find((V) => V.name === t.startValue.domain);
        b.props = t.startValue.props;
      }
      o.value.$el.focus();
    }), Te(n, (b) => {
      let V = b.value;
      w(V) || V === "" ? (/coub.com\/view\//.test(V) ? (V = V.replace("/view/", "/embed/"), n.value = V) : S.value.name === "tiktok.com" && (V = V.replace(/\/@.+\/video\//, "/embed/v2/"), n.value = V), c.value = {
        value: b.value,
        props: b.props,
        domain: b.domain
      }, r.value = !0) : r.value = !1;
    });
    const h = Ae(() => u.map((b) => b.name)), g = (b) => {
      const V = b.match(l);
      return V ? V[1] : !1;
    }, S = Ae(() => {
      const b = g(n.value);
      return u.find((V) => V.name === b);
    }), w = (b) => h.value.includes(g(b));
    return {
      value: c,
      inputBlock: o,
      keyDownHandler: s,
      link: n,
      isValid: r,
      currentDomain: S,
      onChangeHandler: (b, V) => {
        n.domain = b, n.props = V.props, console.log(V), V.output && e.setOutput(() => V.output);
      }
    };
  }
}, ti = /* @__PURE__ */ Se(ei, [["render", Xs]]), ni = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxLjM4aDE0VjBIMHYxLjM4em0wIDMuNzkyaDE2VjMuNzkzSDB2MS4zOHptMTQgMy43OTNIMFY3LjU4NmgxNHYxLjM4eiIvPjwvc3ZnPgo=", oi = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTguMjQ3IDB2NS42NTFIMS43NTNWMEgwdjEzaDEuNzUzVjcuMzQ4aDYuNDk0VjEzSDEwVjB6Ii8+PC9zdmc+Cg==", ri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMSI+CiAgPHBhdGggZD0iTTguODg5IDMuNDI5YzAtMS44ODYgMS42LTMuNDI5IDMuNTU1LTMuNDI5QzE0LjQgMCAxNiAxLjU0MyAxNiAzLjQyOWMwIDMuNzg4LTMuMTgyIDYuODU3LTcuMTExIDYuODU3IDAgMCAyLjMyOS0uODQgMy41MzgtMy40MjktMS45NTYgMC0zLjUzOC0xLjU0My0zLjUzOC0zLjQyOE0zLjUzOCA2Ljg1N0MxLjU4MiA2Ljg1NyAwIDUuMzE0IDAgMy40MyAwIDEuNTQzIDEuNiAwIDMuNTU2IDAgNS41MSAwIDcuMTEgMS41NDMgNy4xMSAzLjQyOWMwIDMuNzg4LTMuMTgyIDYuODU3LTcuMTExIDYuODU3IDAgMCAyLjMyOS0uODQgMy41MzgtMy40MjkiLz4KPC9zdmc+", vo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiI+CiAgPHBhdGggZD0iTTEuNDEgNC4zMzVjLjc2NiAwIDEuNDExLjYxIDEuNDExIDEuMzggMCAuNzY4LS42MjUgMS4zNzktMS40MSAxLjM3OUMuNjI1IDcuMDk0IDAgNi40ODMgMCA1LjcxNGMwLS43NjguNjI1LTEuMzc5IDEuNDEtMS4zNzl6bTMuNzA4IDIuMTY3VjQuOTI2SDE2djEuNTc2SDUuMTE4ek0wIDEuMzhDMCAuNjExLjYyNSAwIDEuNDEgMGMuNzY2IDAgMS40MTEuNjEgMS40MTEgMS4zOCAwIC43NjgtLjYyNSAxLjM3OS0xLjQxIDEuMzc5Qy42MjUgMi43NTkgMCAyLjE0OCAwIDEuMzc5em01LjExOC43ODhWLjU5MUgxNnYxLjU3Nkg1LjExOHpNMCAxMC4wNWMwLS43NjkuNjI1LTEuMzggMS40MS0xLjM4Ljc2NiAwIDEuNDExLjYxIDEuNDExIDEuMzggMCAuNzY4LS42MjUgMS4zNzktMS40MSAxLjM3OS0uNzg2IDAtMS40MTEtLjYxMS0xLjQxMS0xLjM4em01LjExOC43ODhWOS4yNjFIMTZ2MS41NzZINS4xMTh6Ii8+Cjwvc3ZnPgo=", si = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTUuNjcxIDMuODA5YTEuODkgMS44OSAwIDEgMCAwIDMuNzggMS44OSAxLjg5IDAgMCAwIDAtMy43OHpNMTUuMDY4LjAyOEguOTU4YS45NDUuOTQ1IDAgMCAwLS45NDYuOTQ1djEzLjEwNWMwIC41MjIuNDI0Ljk0NS45NDUuOTQ1aDE0LjExYS45NDUuOTQ1IDAgMCAwIC45NDUtLjk0NVYuOTczYS45NDQuOTQ0IDAgMCAwLS45NDQtLjk0NXpNMTMuNjUgMTMuMTMzSDUuOTk2bDUuMjk0LTUuMTY3IDIuODMyIDIuODMydjEuODYyYS40NzIuNDcyIDAgMCAxLS40NzIuNDczem0tMS41ODctNy4wM2EuOTMzLjkzMyAwIDAgMC0uNzgtLjQwMy45My45MyAwIDAgMC0uNjY5LjI3MS45MjkuOTI5IDAgMCAwLS4wODYuMTA2bC03LjE4MyA3LjA1NmgtLjk3YS40NzMuNDczIDAgMCAxLS40NzItLjQ3MlYyLjM5YzAtLjI2MS4yMTItLjQ3My40NzItLjQ3M0gxMy42NWMuMjYgMCAuNDcyLjIxMi40NzIuNDczdjUuNzcxbC0yLjA1OS0yLjA2eiIvPjwvc3ZnPg==", ii = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGQ9Ik03My4zOTEsMjYxLjY2N2wxMDcuNTA3LTEwNy41MDhjMTAuNzM5LTEwLjczOSwxMC43MzktMjguMTUxLDAtMzguODkxYy0xMC43MzktMTAuNzQtMjguMTUxLTEwLjczOS0zOC44OTEsMA0KCUwxNS40MzUsMjQxLjg0MWMtNS40NjksNS40NjgtOC4xNDYsMTIuNjY3LTguMDQ1LDE5LjgzM2MtMC4wOTcsNy4xNjIsMi41ODEsMTQuMzU0LDguMDQ1LDE5LjgxOWwxMjYuNTcyLDEyNi41NzENCgljMTAuNzM4LDEwLjczOSwyOC4xNTEsMTAuNzM5LDM4Ljg5MSwwczEwLjczOS0yOC4xNTEsMC0zOC44OTFMNzMuMzkxLDI2MS42Njd6Ii8+DQo8cGF0aCBkPSJNNDg4LjA2NSwyMzYuMTc0TDM2MS40OTIsMTA5LjYwMmMtMTAuNzM5LTEwLjczOS0yOC4xNTEtMTAuNzQtMzguODkxLDBjLTEwLjczOSwxMC43MzktMTAuNzM5LDI4LjE1MiwwLDM4Ljg5MUw0MzAuMTEsMjU2DQoJTDMyMi42MDIsMzYzLjUwOGMtMTAuNzM5LDEwLjczOC0xMC43MzksMjguMTUsMCwzOC44OTFjMTAuNzM5LDEwLjczOCwyOC4xNTIsMTAuNzM4LDM4Ljg5MSwwbDEyNi41NzItMTI2LjU3Mg0KCWM1LjQ2Ny01LjQ2Nyw4LjE0NC0xMi42NjIsOC4wNDUtMTkuODI2QzQ5Ni4yMDgsMjQ4LjgzNiw0OTMuNTMxLDI0MS42NCw0ODguMDY1LDIzNi4xNzR6Ii8+DQo8cGF0aCBkPSJNMjU1LjU5Niw0MTYuMDkyYy0yLjY4NywxNi4zNS0xOC4xMTksMjcuNDI2LTM0LjQ2OCwyNC43MzlsMCwwYy0xNi4zNDktMi42ODctMjcuNDI1LTE4LjExOC0yNC43MzgtMzQuNDY4bDUxLjAxNS0zMTAuNDU2DQoJYzIuNjg3LTE2LjM0OSwxOC4xMTgtMjcuNDI1LDM0LjQ2OC0yNC43MzlsMCwwYzE2LjM0OSwyLjY4NywyNy40MjUsMTguMTE5LDI0LjczOCwzNC40NjhMMjU1LjU5Niw0MTYuMDkyeiIvPg0KPC9zdmc+DQo=", De = class De {
};
he(De, "TYPES", {
  TEXT: "text",
  SUBTITLE: "subtitle",
  QUOTE: "quote",
  LIST: "list",
  LIST_NUM: "list-num",
  IMAGE: "image",
  EMBED: "embed"
}), he(De, "blockList", [
  {
    name: "Текст",
    code: De.TYPES.TEXT,
    icon: ni,
    component: fs
  },
  {
    name: "Заголовок",
    code: De.TYPES.SUBTITLE,
    icon: oi,
    component: vs
  },
  {
    name: "Цитата",
    code: De.TYPES.QUOTE,
    icon: ri,
    component: Ns
  },
  {
    name: "Список",
    code: De.TYPES.LIST,
    icon: vo,
    component: ho,
    props: {
      tag: "ul"
    }
  },
  {
    name: "Нумерованный список",
    code: De.TYPES.LIST_NUM,
    icon: vo,
    component: ho,
    props: {
      tag: "ol"
    }
  },
  {
    name: "Изображение",
    code: De.TYPES.IMAGE,
    icon: si,
    component: Ps
  },
  {
    name: "Embed ссылка",
    code: De.TYPES.EMBED,
    icon: ii,
    component: ti
  }
]), he(De, "set", (e, o, n, r) => {
  De.blockList.push({
    name: e,
    code: o,
    component: n,
    icon: r
  });
}), he(De, "get", (e) => De.blockList.find((o) => o.code === e)), he(De, "getParamsBlock", (e) => {
  const o = De.get(e);
  return {
    id: De.uid(),
    component: o.component,
    code: e,
    props: o.props
  };
}), he(De, "uid", () => (/* @__PURE__ */ new Date()).getTime());
let jn = De;
const Be = jn;
class Ot {
}
he(Ot, "save", (e) => {
  const o = [];
  e.forEach((n) => {
    n.code === Be.TYPES.LIST || n.code === Be.TYPES.LIST_NUM ? o.push({
      code: n.code,
      value: n.value.li
    }) : o.push({
      code: n.code,
      value: n.value
    });
  }), localStorage.setItem("blocks", JSON.stringify(o));
}), he(Ot, "load", () => {
  let e = localStorage.getItem("blocks");
  return e ? e = JSON.parse(e) : e = [], e;
}), he(Ot, "saveTitle", (e) => {
  localStorage.setItem("title", e);
}), he(Ot, "loadTitle", () => {
  const e = localStorage.getItem("title");
  return e || null;
}), he(Ot, "clear", () => {
  localStorage.removeItem("title"), localStorage.removeItem("blocks");
});
const ai = { class: "editor-block-wrapper" }, ci = {
  key: 0,
  class: "placeholder"
};
function li(t, e, o, n, r, c) {
  const s = Xe("contentEditable");
  return z(), ee("div", ai, [
    dt(s, {
      contenteditable: "true",
      tag: "h1",
      modelValue: n.value,
      "onUpdate:modelValue": e[0] || (e[0] = (l) => n.value = l),
      ref: "inputBlock"
    }, null, 8, ["modelValue"]),
    n.isPlaceholder ? (z(), ee("div", ci, "Заголовок")) : et("", !0)
  ]);
}
const ui = {
  name: "TitleBlock",
  mixins: [nt],
  components: {
    contentEditable: Vt,
    TextInput: pn
  },
  setup() {
    const t = ot("textEditor"), e = K(null), o = K(""), n = Ae(() => o.value === "");
    return Te(o, (r) => {
      t.commit("setTitle", r);
    }), $e(() => {
      Ot.loadTitle() && (o.value = Ot.loadTitle());
    }), {
      value: o,
      inputBlock: e,
      isPlaceholder: n
    };
  }
}, di = /* @__PURE__ */ Se(ui, [["render", li], ["__scopeId", "data-v-86ce5782"]]), fi = (t) => (Ct("data-v-58a7bafc"), t = t(), Mt(), t), hi = { class: "block-list" }, pi = /* @__PURE__ */ fi(() => /* @__PURE__ */ Z("div", { class: "block-list__search" }, null, -1)), mi = { class: "block-list__items" }, gi = ["onClick"], vi = { class: "block-list__icon" }, yi = ["src"], Ei = { class: "block-list__name" };
function _i(t, e, o, n, r, c) {
  return z(), ee("div", hi, [
    pi,
    Z("div", mi, [
      (z(!0), ee(pt, null, Ut(n.blockList, (s) => (z(), ee("div", {
        class: wt(["block-list__item", { selected: n.blockList[n.selected].code === s.code }]),
        key: s.code,
        onClick: (l) => n.onSelectBlock(s.code)
      }, [
        Z("div", vi, [
          Z("img", {
            src: s.icon
          }, null, 8, yi)
        ]),
        Z("div", Ei, $n(s.name), 1)
      ], 10, gi))), 128))
    ])
  ]);
}
const Ni = {
  name: "BlockList",
  setup() {
    const t = ot("textEditor"), e = Be.blockList, o = K(0), n = (u) => {
      t.dispatch("addBlockByCode", u);
    };
    $e(() => {
      document.addEventListener("keydown", s), document.addEventListener("keyup", l), document.addEventListener("keydown", p);
    }), Cr(() => {
      document.removeEventListener("keydown", s), document.removeEventListener("keyup", l), document.removeEventListener("keydown", p);
    });
    const r = () => {
      if (e.length - 1 === o.value) {
        o.value = 0;
        return;
      }
      o.value++;
    }, c = () => {
      if (o.value === 0) {
        o.value = e.length - 1;
        return;
      }
      o.value--;
    };
    function s(u) {
      if (u.key === "ArrowDown")
        return u.preventDefault(), u.stopPropagation(), r(), !1;
    }
    function l(u) {
      if (u.key === "ArrowUp")
        return u.preventDefault(), u.stopPropagation(), window.scrollBy(0, 0), c(), !1;
    }
    function p(u) {
      u.key === "Enter" && (u.preventDefault(), n(e[o.value].code));
    }
    return {
      blockList: e,
      onSelectBlock: n,
      selected: o
    };
  }
}, Si = /* @__PURE__ */ Se(Ni, [["render", _i], ["__scopeId", "data-v-58a7bafc"]]), wi = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZD0iTTUuODMzIDQuMTY2YzAtLjQ2LjM3My0uODMzLjgzNC0uODMzaDMuNzVhMy43NSAzLjc1IDAgMCAxIDIuOTU0IDYuMDYgMy43NTEgMy43NTEgMCAwIDEtMS4yODggNy4yNzNINi42NjdhLjgzMy44MzMgMCAwIDEtLjgzNC0uODMzVjQuMTY2ek03LjUgMTAuODMzVjE1aDQuNTgzYTIuMDgzIDIuMDgzIDAgMCAwIDAtNC4xNjdINy41em0wLTEuNjY3aDIuOTE3YTIuMDgzIDIuMDgzIDAgMSAwIDAtNC4xNjZINy41djQuMTY2eiI+PC9wYXRoPg0KPC9zdmc+DQo=", zt = {
  name: "modifierMixin",
  setup() {
    const t = ot("textEditor");
    return {
      updateValue: () => {
        const o = t.state.selection.element;
        o && o.dispatchEvent(new Event("input"));
      }
    };
  }
}, Ci = (t) => (Ct("data-v-0ecb9d63"), t = t(), Mt(), t), Mi = /* @__PURE__ */ Ci(() => /* @__PURE__ */ Z("svg", {
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ Z("path", { d: "M5.833 4.166c0-.46.373-.833.834-.833h3.75a3.75 3.75 0 0 1 2.954 6.06 3.751 3.751 0 0 1-1.288 7.273H6.667a.833.833 0 0 1-.834-.833V4.166zM7.5 10.833V15h4.583a2.083 2.083 0 0 0 0-4.167H7.5zm0-1.667h2.917a2.083 2.083 0 1 0 0-4.166H7.5v4.166z" })
], -1)), Ti = [
  Mi
];
function Di(t, e, o, n, r, c) {
  return z(), ee("button", {
    onClick: e[0] || (e[0] = (...s) => n.process && n.process(...s)),
    class: wt({ active: n.isSelected })
  }, Ti, 2);
}
const xi = {
  name: "BoldText",
  mixins: [zt],
  setup() {
    const t = ot("textEditor"), e = K(!1), { updateValue: o } = zt.setup(), n = () => {
      document.execCommand("bold", !1, null), t.dispatch("updateSelection"), o(), r();
    }, r = () => {
      try {
        e.value = !!t.getters.range.parentElement().closest("b");
      } catch {
        e.value = !1;
      }
    };
    return $e(() => {
      r();
    }), {
      icon: wi,
      isSelected: e,
      checkForBold: r,
      process: n
    };
  }
}, Wo = /* @__PURE__ */ Se(xi, [["render", Di], ["__scopeId", "data-v-0ecb9d63"]]), Oi = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZD0iTTExLjY0NyAzLjMzM2gtMi40OGEuODMzLjgzMyAwIDAgMCAwIDEuNjY3aDEuMzk1TDcuNzA1IDE1SDUuODMzYS44MzMuODMzIDAgMCAwIDAgMS42NjdoNWEuODMzLjgzMyAwIDEgMCAwLTEuNjY3SDkuNDM4bDIuODU3LTEwaDEuODcyYS44MzMuODMzIDAgMCAwIDAtMS42NjdoLTIuNTJ6Ij48L3BhdGg+DQo8L3N2Zz4NCg==", bi = (t) => (Ct("data-v-21e107fe"), t = t(), Mt(), t), Ii = /* @__PURE__ */ bi(() => /* @__PURE__ */ Z("svg", {
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ Z("path", { d: "M11.647 3.333h-2.48a.833.833 0 0 0 0 1.667h1.395L7.705 15H5.833a.833.833 0 0 0 0 1.667h5a.833.833 0 1 0 0-1.667H9.438l2.857-10h1.872a.833.833 0 0 0 0-1.667h-2.52z" })
], -1)), Ai = [
  Ii
];
function Ri(t, e, o, n, r, c) {
  return z(), ee("button", {
    onClick: e[0] || (e[0] = (...s) => n.process && n.process(...s)),
    class: wt({ active: n.isSelected })
  }, Ai, 2);
}
const Li = {
  name: "ItalicText",
  mixins: [zt],
  setup() {
    const t = ot("textEditor"), { updateValue: e } = zt.setup(), o = K(!1), n = () => {
      document.execCommand("italic", !1, null), t.dispatch("updateSelection"), e(), r();
    }, r = () => {
      try {
        o.value = !!t.getters.range.parentElement().closest("i");
      } catch {
        o.value = !1;
      }
    };
    return $e(() => {
      r();
    }), {
      icon: Oi,
      isSelected: o,
      process: n,
      checkForItalic: r
    };
  }
}, Qo = /* @__PURE__ */ Se(Li, [["render", Ri], ["__scopeId", "data-v-21e107fe"]]), ki = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZD0iTTEwLjI4NiAzLjcwNUE0LjI0MyA0LjI0MyAwIDAgMSAxMy4yODMgMi41YTQuMjQ0IDQuMjQ0IDAgMCAxIDIuOTc2IDEuMjU3IDQuMjk4IDQuMjk4IDAgMCAxIDEuMjQ0IDIuOTkgNC4yOTggNC4yOTggMCAwIDEtMS4xOTIgMy4wMTFsLS4wMS4wMS0yLjA1NSAyLjA3MWE0LjIzMyA0LjIzMyAwIDAgMS01LjA1Ny43MzIgNC4yNjYgNC4yNjYgMCAwIDEtMS4zNjctMS4xOTUuODMzLjgzMyAwIDAgMSAxLjMzOC0uOTkzIDIuNTcyIDIuNTcyIDAgMCAwIDMuOTAzLjI4M2wyLjA1LTIuMDY2Yy40NjktLjQ5My43My0xLjE1Mi43MjQtMS44MzlhMi42MyAyLjYzIDAgMCAwLS43NjEtMS44MyAyLjU3OCAyLjU3OCAwIDAgMC0xLjgwNy0uNzY0IDIuNTc3IDIuNTc3IDAgMCAwLTEuODE2LjcyOEwxMC4yOCA2LjA3MUEuODMzLjgzMyAwIDAgMSA5LjEgNC44OTRsMS4xNzgtMS4xOC4wMDgtLjAxek03LjI3NyA3LjE3YTQuMjMzIDQuMjMzIDAgMCAxIDMuNTM0LjI1NSA0LjI2NiA0LjI2NiAwIDAgMSAxLjM2NyAxLjE5NS44MzMuODMzIDAgMCAxLTEuMzM4Ljk5MyAyLjU3MSAyLjU3MSAwIDAgMC0zLjkwMy0uMjgzbC0yLjA0OSAyLjA2NmEyLjYzMiAyLjYzMiAwIDAgMC0uNzI0IDEuODM4Yy4wMDUuNjg5LjI4IDEuMzQ2Ljc2IDEuODMuNDgxLjQ4NSAxLjEzLjc1OSAxLjgwOC43NjVhMi41NzcgMi41NzcgMCAwIDAgMS44MTUtLjcyOGwxLjE2NS0xLjE3NWEuODMzLjgzMyAwIDAgMSAxLjE4NCAxLjE3NGwtMS4xNzIgMS4xOC0uMDEuMDFhNC4yNDMgNC4yNDMgMCAwIDEtMi45OTcgMS4yMDYgNC4yNDQgNC4yNDQgMCAwIDEtMi45NzYtMS4yNTcgNC4yOTggNC4yOTggMCAwIDEtMS4yNDQtMi45OSA0LjI5OSA0LjI5OSAwIDAgMSAxLjE5My0zLjAxMWwuMDEtLjAxIDIuMDU0LTIuMDcxYy40MzEtLjQzNS45NS0uNzcyIDEuNTIzLS45ODd6Ij48L3BhdGg+DQo8L3N2Zz4NCg==", ji = (t) => (Ct("data-v-9f32ebbe"), t = t(), Mt(), t), Bi = /* @__PURE__ */ ji(() => /* @__PURE__ */ Z("svg", {
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ Z("path", { d: "M10.286 3.705A4.243 4.243 0 0 1 13.283 2.5a4.244 4.244 0 0 1 2.976 1.257 4.298 4.298 0 0 1 1.244 2.99 4.298 4.298 0 0 1-1.192 3.011l-.01.01-2.055 2.071a4.233 4.233 0 0 1-5.057.732 4.266 4.266 0 0 1-1.367-1.195.833.833 0 0 1 1.338-.993 2.572 2.572 0 0 0 3.903.283l2.05-2.066c.469-.493.73-1.152.724-1.839a2.63 2.63 0 0 0-.761-1.83 2.578 2.578 0 0 0-1.807-.764 2.577 2.577 0 0 0-1.816.728L10.28 6.071A.833.833 0 0 1 9.1 4.894l1.178-1.18.008-.01zM7.277 7.17a4.233 4.233 0 0 1 3.534.255 4.266 4.266 0 0 1 1.367 1.195.833.833 0 0 1-1.338.993 2.571 2.571 0 0 0-3.903-.283l-2.049 2.066a2.632 2.632 0 0 0-.724 1.838c.005.689.28 1.346.76 1.83.481.485 1.13.759 1.808.765a2.577 2.577 0 0 0 1.815-.728l1.165-1.175a.833.833 0 0 1 1.184 1.174l-1.172 1.18-.01.01a4.243 4.243 0 0 1-2.997 1.206 4.244 4.244 0 0 1-2.976-1.257 4.298 4.298 0 0 1-1.244-2.99 4.299 4.299 0 0 1 1.193-3.011l.01-.01 2.054-2.071c.431-.435.95-.772 1.523-.987z" })
], -1)), Pi = [
  Bi
];
function zi(t, e, o, n, r, c) {
  return z(), ee("div", null, [
    Z("button", {
      onClick: e[0] || (e[0] = (...s) => n.clickHandler && n.clickHandler(...s)),
      class: wt({ active: n.isHasLink })
    }, Pi, 2),
    n.isInput && !n.isMobile() ? xo((z(), ee("input", {
      key: 0,
      "onUpdate:modelValue": e[1] || (e[1] = (s) => n.url = s),
      placeholder: "Введите ссылку",
      onKeyup: e[2] || (e[2] = Mr((...s) => n.handleEnterKey && n.handleEnterKey(...s), ["enter"])),
      ref: "inputElement"
    }, null, 544)), [
      [Oo, n.url]
    ]) : et("", !0)
  ]);
}
const Hi = {
  name: "LinkText",
  mixins: [zt],
  setup(t) {
    const e = ot("textEditor"), { updateValue: o } = zt.setup(t), n = K(""), r = K(!1), c = K(null), s = K(!1), l = K(null), p = () => e.getters.range.parentElement().closest("a"), u = () => {
      const w = e.getters.selection;
      w.removeAllRanges(), w.addRange(e.state.selection.range), n.value !== "" && !l.value ? (document.execCommand("createLink", !1, n.value), e.dispatch("updateSelection"), o(), s.value = !0, w.anchorNode.parentElement.tagName === "A" ? l.value = w.anchorNode.parentElement : l.value = p()) : n.value !== "" && l.value ? (l.value.href = n.value, e.dispatch("updateSelection"), o()) : l.value && S();
    }, h = () => tt.isMobile(), g = () => {
      if (h()) {
        const w = prompt("Введите ссылку", n.value);
        if (w) {
          document.execCommand("createLink", !1, w), n.value = w, e.dispatch("updateSelection"), o();
          const _ = e.getters.selection;
          s.value = !0, _.anchorNode.parentElement.tagName === "A" ? l.value = _.anchorNode.parentElement : l.value = p();
        } else
          w === "" && S();
      } else
        r.value ? l.value && S() : (r.value = !0, setTimeout(() => {
          c.value.focus();
        }));
    };
    Fn(() => {
      const w = p();
      w && (l.value = w, n.value = w.href, r.value = !0, s.value = !0);
    });
    const S = () => {
      document.execCommand("unlink", !1, null), e.dispatch("updateSelection"), r.value = !1, n.value = "", s.value = !1, l.value = null;
    };
    return {
      icon: ki,
      url: n,
      store: e,
      isInput: r,
      inputElement: c,
      clickHandler: g,
      handleEnterKey: u,
      checkForLink: p,
      isHasLink: s,
      removeLink: S,
      isMobile: h
    };
  }
}, Go = /* @__PURE__ */ Se(Hi, [["render", zi], ["__scopeId", "data-v-9f32ebbe"]]), bt = class bt {
};
he(bt, "list", [
  {
    name: "Жирный",
    component: Wo,
    code: "bold"
  },
  {
    name: "Курсив",
    component: Qo,
    code: "italic"
  },
  {
    name: "Ссылка",
    component: Go,
    code: "link"
  }
]), he(bt, "set", (e, o, n) => {
  bt.list.push({
    name: e,
    component: n,
    code: o
  });
}), he(bt, "get", (e) => bt.list.find((o) => o.code === e));
let Bn = bt;
const Ui = { class: "editor-modifier__list" };
function Vi(t, e, o, n, r, c) {
  return z(), ee("div", Ui, [
    (z(!0), ee(pt, null, Ut(n.list, (s) => (z(), ee("div", {
      class: "editor-modifier__item",
      key: s.code
    }, [
      (z(), Pe(ht(s.component)))
    ]))), 128))
  ]);
}
const Fi = {
  name: "SelectModifier",
  components: {
    BoldText: Wo,
    ItalicText: Qo,
    LinkText: Go
  },
  setup() {
    return {
      list: Bn.list
    };
  }
}, $i = /* @__PURE__ */ Se(Fi, [["render", Vi]]), qo = (t) => (Ct("data-v-a21e6440"), t = t(), Mt(), t), Yi = ["draggable", "onDragstart", "onDragover", "onDrop"], Wi = ["onClick"], Qi = /* @__PURE__ */ qo(() => /* @__PURE__ */ Z("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16"
}, [
  /* @__PURE__ */ Z("path", { d: "M4.44 1.44a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm5-11a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Z" })
], -1)), Gi = [
  Qi
], qi = ["onClick"], Zi = /* @__PURE__ */ qo(() => /* @__PURE__ */ Z("svg", {
  width: "25px",
  height: "25px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ Z("g", { id: "Menu / Close_SM" }, [
    /* @__PURE__ */ Z("path", {
      id: "Vector",
      d: "M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16",
      stroke: "#000000",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1)), Ki = [
  Zi
];
function Ji(t, e, o, n, r, c) {
  return z(!0), ee(pt, null, Ut(n.blocks, (s) => (z(), ee("div", {
    class: wt(["editor-block", { "drag-over": s.id === n.draggedOverBlockId }]),
    key: s.id,
    draggable: n.isDraggable,
    onDragstart: (l) => n.onDragStart(l, s.id),
    onDragover: (l) => n.onDragOver(l, s.id),
    onDragleave: e[2] || (e[2] = (...l) => n.onDragLeave && n.onDragLeave(...l)),
    onDrop: (l) => n.onDrop(l, s.id)
  }, [
    (z(), Pe(ht(s.component), bo({
      "block-id": s.id
    }, s.props), null, 16, ["block-id"])),
    Z("span", {
      class: "editor-block__moved-btn",
      onClick: (l) => n.onMove(s.id),
      onMouseover: e[0] || (e[0] = (l) => n.onHoverChange(!0)),
      onMouseleave: e[1] || (e[1] = (l) => n.onHoverChange(!1))
    }, Gi, 40, Wi),
    Z("span", {
      class: "editor-block__close-btn",
      onClick: (l) => n.onCloseBlock(s.id)
    }, Ki, 8, qi)
  ], 42, Yi))), 128);
}
const Xi = {
  name: "EditorBlockList",
  setup() {
    const t = ot("textEditor"), e = K(null), o = K(null), n = K(!1), r = Ae({
      get() {
        return t.state.blocks;
      },
      set(w) {
        t.commit("updateBlocks", w);
      }
    }), c = (w) => {
      t.dispatch("deleteBlock", w);
    }, s = (w, _) => {
      e.value = _, w.dataTransfer.setData("text/plain", _);
    }, l = (w, _) => {
      w.preventDefault(), o.value = _;
    }, p = () => {
      o.value = null;
    }, u = (w, _) => {
      const b = parseInt(w.dataTransfer.getData("text/plain"));
      if (b && _ !== b) {
        const V = [...r.value], Ne = S(b), Re = S(_), ze = V.splice(Ne, 1)[0];
        V.splice(Re, 0, ze), r.value = V;
      }
      e.value = null, o.value = null;
    }, h = (w) => {
      if (e.value && e.value !== w) {
        const _ = [...r.value], b = _.findIndex((Re) => Re.id === e.value), V = _.findIndex((Re) => Re.id === w), Ne = _.splice(b, 1)[0];
        _.splice(V, 0, Ne), r.value = _, e.value = null;
      }
    }, g = (w) => {
      w ? n.value = !0 : n.value = !1;
    }, S = (w) => r.value.map((_) => _.id).indexOf(w);
    return {
      blocks: r,
      onCloseBlock: c,
      onDragStart: s,
      onDragOver: l,
      onDrop: u,
      onMove: h,
      onDragLeave: p,
      onHoverChange: g,
      draggedOverBlockId: o,
      isDraggable: n
    };
  }
}, ea = /* @__PURE__ */ Se(Xi, [["render", Ji], ["__scopeId", "data-v-a21e6440"]]), ta = { class: "result-container" }, na = ["innerHTML"];
function oa(t, e, o, n, r, c) {
  return z(), ee("div", ta, [
    Z("div", {
      class: "result",
      innerHTML: n.store.getters.resultHtml
    }, null, 8, na)
  ]);
}
const ra = {
  name: "ResultHtml",
  setup() {
    return {
      store: ot("textEditor")
    };
  }
}, sa = /* @__PURE__ */ Se(ra, [["render", oa]]), ia = (t) => (Ct("data-v-e330cede"), t = t(), Mt(), t), aa = {
  class: "editor__blocks-wrapper",
  ref: "editorBlocks"
}, ca = {
  key: 0,
  class: "editor__modifier",
  ref: "modifierBlock"
}, la = {
  key: 0,
  class: "editor__select-block",
  ref: "selectBlock"
}, ua = {
  class: "editor__blocks-list",
  ref: "editorBlockList"
}, da = { class: "editor__empty" }, fa = /* @__PURE__ */ ia(() => /* @__PURE__ */ Z("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, [
  /* @__PURE__ */ Z("path", { d: "M10 3.333c.46 0 .833.373.833.833v5h5a.833.833 0 1 1 0 1.667h-5v5a.833.833 0 0 1-1.666 0v-5h-5a.833.833 0 1 1 0-1.667h5v-5c0-.46.373-.833.833-.833z" })
], -1)), ha = [
  fa
], pa = {
  key: 0,
  class: "editor__bottom"
}, ma = ["disabled"];
function ga(t, e, o, n, r, c) {
  const s = Xe("SelectModifier"), l = Xe("BlockList"), p = Xe("Title"), u = Xe("EditorBlockList"), h = Xe("Result");
  return z(), ee(pt, null, [
    Z("div", {
      class: "editor",
      ref: "emptyBlock",
      style: Tr({ width: o.width, height: o.height })
    }, [
      Z("div", aa, [
        dt(ao, { name: "fade" }, {
          default: un(() => [
            n.isSelectModifier ? (z(), ee("div", ca, [
              dt(s)
            ], 512)) : et("", !0)
          ]),
          _: 1
        }),
        dt(ao, { name: "fade" }, {
          default: un(() => [
            n.isSelect ? (z(), ee("div", la, [
              dt(l)
            ], 512)) : et("", !0)
          ]),
          _: 1
        }),
        Z("div", ua, [
          o.showH1 ? (z(), Pe(p, { key: 0 })) : et("", !0),
          dt(u),
          Z("div", da, [
            Z("input", {
              class: "editor__empty-text",
              placeholder: "Нажмите Tab для выбора инструмента",
              onInput: e[0] || (e[0] = (...g) => n.onInputEmpty && n.onInputEmpty(...g)),
              onKeydown: e[1] || (e[1] = (...g) => n.handleKeyDown && n.handleKeyDown(...g))
            }, null, 32),
            Z("span", {
              class: wt(["editor__empty-add-btn", { open: n.isSelect }]),
              onClick: e[2] || (e[2] = (...g) => n.openSelectBlock && n.openSelectBlock(...g)),
              ref: "closeBtn"
            }, ha, 2)
          ])
        ], 512)
      ], 512),
      o.showSaveBtn ? (z(), ee("div", pa, [
        Z("button", {
          class: "editor__send",
          onClick: e[3] || (e[3] = (...g) => n.sendResult && n.sendResult(...g)),
          disabled: n.isSending
        }, "Опубликовать", 8, ma)
      ])) : et("", !0)
    ], 4),
    o.debug ? (z(), Pe(h, { key: 0 })) : et("", !0)
  ], 64);
}
const va = {
  name: "App",
  components: {
    Title: di,
    BlockList: Si,
    EditorBlockList: ea,
    SelectModifier: $i,
    Result: sa
  },
  props: {
    modelValue: String,
    data: {
      type: Object,
      default: {}
    },
    showH1: {
      default: !1
    },
    showSaveBtn: {
      default: !1
    },
    width: {
      default: "100%"
    },
    height: {
      default: "150px"
    },
    debug: {
      default: !1
    },
    endpoints: {
      type: Object,
      default: null
    }
  },
  setup(t, { emit: e }) {
    const o = K(!1), n = ot("textEditor"), r = K(null), c = K(null), s = K(null), l = K(null), p = K(null), u = K(null), h = Ae(() => n.state.blocks), g = Ae(() => n.state.isSelect), S = K(!1), w = () => {
      const ge = p.value.getBoundingClientRect();
      n.commit("setIsSelect", !g.value), g.value && setTimeout(() => {
        const Le = c.value.getBoundingClientRect().height, W = l.value.getBoundingClientRect().height;
        let gt = ge.height;
        ge.height + Le / 4 > W && (gt -= Le + 40), c.value.style.top = gt + "px";
      });
    }, _ = (ge) => {
      (ge.code === "Tab" || ge.key === "Tab") && w();
    }, b = (ge) => {
      ge.target.value = "", ge.target.blur(), n.dispatch("addBlockByCode", "text");
    }, V = async () => {
      S.value = !0;
      try {
        await n.dispatch("send");
      } catch (ge) {
        console.log(ge.message);
      }
      S.value = !1;
    }, Ne = Ae(() => !!n.state.elementSelectTextCoordinates);
    Te(Ne, (ge) => {
      if (ge) {
        const Le = n.state.elementSelectTextCoordinates, W = l.value.getBoundingClientRect();
        let gt = Le.y - W.top + l.value.scrollTop, _t = Le.x - W.left;
        setTimeout(() => {
          const vt = u.value.getBoundingClientRect().width;
          _t + vt > W.width && (_t -= _t + vt - W.width + 15), tt.isMobile() && (_t = 10), u.value.style.top = gt - 50 + "px", u.value.style.left = _t + "px";
        });
      }
    });
    const Re = Ae(() => n.getters.resultHtml), ze = () => {
      o.value = !0;
      const Le = new Yo(t.modelValue).process();
      n.dispatch("addArBlocks", { data: Le, reset: !0 });
    };
    return Te(Re, (ge) => {
      e("update:modelValue", ge);
    }), Te(() => t.modelValue, (ge) => {
      o.value || ze();
    }), Fn(() => {
      t.endpoints && Zt.setEndpoints(t.endpoints);
    }), $e(() => {
      t.data.blocks && n.dispatch("loadBlocks", t.data.blocks), t.modelValue && t.modelValue !== "" && ze();
    }), {
      store: n,
      blocks: h,
      isSelect: g,
      openSelectBlock: w,
      selectBlock: c,
      closeBtn: r,
      emptyBlock: s,
      handleKeyDown: _,
      onInputEmpty: b,
      isSelectModifier: Ne,
      editorBlocks: l,
      isSending: S,
      sendResult: V,
      editorBlockList: p,
      modifierBlock: u
    };
  }
}, ya = /* @__PURE__ */ Se(va, [["render", ga], ["__scopeId", "data-v-e330cede"]]), Ea = Xr({
  state() {
    return {
      title: null,
      blocks: [],
      isSelect: !1,
      elementSelectTextCoordinates: null,
      selection: {
        element: null,
        range: null,
        selection: null
      },
      debug: null
    };
  },
  getters: {
    getBlock: (t) => (e) => t.blocks.find((o) => o.id === e),
    resultHtml: (t) => {
      let e = "";
      return t.title && (e = "<h1>" + t.title + "</h1>"), t.blocks.forEach((o) => {
        e += o.output;
      }), e;
    },
    result: (t, e) => ({
      title: t.title,
      blocks: t.blocks,
      html: e.resultHtml
    }),
    selection: (t) => t.selection.selection,
    range: (t) => t.selection.range
  },
  mutations: {
    updateBlock(t, [e, o, n]) {
      const r = t.blocks.find((c) => c.id === e);
      r && (r.value = o, r.output = n);
    },
    setBlock(t, e) {
      t.blocks.push({
        ...e
      });
    },
    setIsSelect(t, e) {
      t.isSelect = e;
    },
    setElementSelectTextCoordinates(t, e) {
      t.elementSelectTextCoordinates = e;
    },
    updateBlocks(t, e) {
      t.blocks = e;
    },
    setSelectedElement(t, e) {
      t.selectedElement = e;
    },
    setTitle(t, e) {
      t.title = e;
    },
    resetSelect(t) {
      t.elementSelectTextCoordinates = null, t.selection = {
        element: null,
        range: null,
        selection: null
      };
    },
    setDebug(t, e) {
      t.debug = e;
    },
    resetBlocks(t) {
      t.blocks = [];
    }
  },
  actions: {
    addBlock: (t, e) => {
      const o = t.state.blocks[t.state.blocks.length - 1];
      t.state.blocks.length > 0 && o.code !== Be.TYPES.IMAGE && o.value === "" || t.commit("setBlock", { value: "", output: "", ...e });
    },
    addBlockByCode: (t, e) => {
      const o = Be.getParamsBlock(e);
      t.dispatch("addBlock", o), t.commit("setIsSelect", !1);
    },
    deleteBlock: (t, e) => {
      const o = t.state.blocks.map(function(n) {
        return n.id;
      }).indexOf(e);
      t.state.blocks.splice(o, 1);
    },
    addArBlocks: async (t, { blockId: e, data: o, reset: n, clipboard: r }) => {
      var c;
      n === !0 && (t.commit("resetBlocks"), t.commit("resetSelect")), e && t.getters.getBlock(e).value === "" && await t.dispatch("deleteBlock", e);
      for (let s = 0; s < o.length; s++) {
        const l = o[s], p = Be.getParamsBlock(l.code);
        p.props = {
          ...p.props
        }, (c = l.attr) != null && c.class && (p.props.class = l.attr.class), l.code === Be.TYPES.IMAGE && l.value.upload ? (p.props.upload = l.value.upload, r === !0 && (p.props.load = !0)) : p.props.startValue = l.value, await t.dispatch("addBlock", p), t.commit("setIsSelect", !1);
      }
    },
    loadBlocks: (t, e = []) => {
      e.length && t.dispatch("addArBlocks", { data: e });
    },
    updateSelection(t, e) {
      const o = $o.getSelection();
      if (o.rangeCount && o.type === "Range") {
        const n = o.getRangeAt(0);
        t.commit("setElementSelectTextCoordinates", tt.getSelectionCoordinates(n)), t.state.selection = {
          range: n,
          selection: o
        }, e && (t.state.selection.element = e);
      } else
        t.commit("resetSelect");
    },
    async send(t) {
      const e = t.getters.result;
      await mn.sendResult(e);
    }
  }
});
function Zo(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: _a } = Object.prototype, { getPrototypeOf: Gn } = Object, gn = ((t) => (e) => {
  const o = _a.call(e);
  return t[o] || (t[o] = o.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), mt = (t) => (t = t.toLowerCase(), (e) => gn(e) === t), vn = (t) => (e) => typeof e === t, { isArray: Ft } = Array, Kt = vn("undefined");
function Na(t) {
  return t !== null && !Kt(t) && t.constructor !== null && !Kt(t.constructor) && st(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Ko = mt("ArrayBuffer");
function Sa(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Ko(t.buffer), e;
}
const wa = vn("string"), st = vn("function"), Jo = vn("number"), yn = (t) => t !== null && typeof t == "object", Ca = (t) => t === !0 || t === !1, sn = (t) => {
  if (gn(t) !== "object")
    return !1;
  const e = Gn(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, Ma = mt("Date"), Ta = mt("File"), Da = mt("Blob"), xa = mt("FileList"), Oa = (t) => yn(t) && st(t.pipe), ba = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || st(t.append) && ((e = gn(t)) === "formdata" || // detect form-data instance
  e === "object" && st(t.toString) && t.toString() === "[object FormData]"));
}, Ia = mt("URLSearchParams"), Aa = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Xt(t, e, { allOwnKeys: o = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, r;
  if (typeof t != "object" && (t = [t]), Ft(t))
    for (n = 0, r = t.length; n < r; n++)
      e.call(null, t[n], n, t);
  else {
    const c = o ? Object.getOwnPropertyNames(t) : Object.keys(t), s = c.length;
    let l;
    for (n = 0; n < s; n++)
      l = c[n], e.call(null, t[l], l, t);
  }
}
function Xo(t, e) {
  e = e.toLowerCase();
  const o = Object.keys(t);
  let n = o.length, r;
  for (; n-- > 0; )
    if (r = o[n], e === r.toLowerCase())
      return r;
  return null;
}
const er = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), tr = (t) => !Kt(t) && t !== er;
function Pn() {
  const { caseless: t } = tr(this) && this || {}, e = {}, o = (n, r) => {
    const c = t && Xo(e, r) || r;
    sn(e[c]) && sn(n) ? e[c] = Pn(e[c], n) : sn(n) ? e[c] = Pn({}, n) : Ft(n) ? e[c] = n.slice() : e[c] = n;
  };
  for (let n = 0, r = arguments.length; n < r; n++)
    arguments[n] && Xt(arguments[n], o);
  return e;
}
const Ra = (t, e, o, { allOwnKeys: n } = {}) => (Xt(e, (r, c) => {
  o && st(r) ? t[c] = Zo(r, o) : t[c] = r;
}, { allOwnKeys: n }), t), La = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), ka = (t, e, o, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), o && Object.assign(t.prototype, o);
}, ja = (t, e, o, n) => {
  let r, c, s;
  const l = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (r = Object.getOwnPropertyNames(t), c = r.length; c-- > 0; )
      s = r[c], (!n || n(s, t, e)) && !l[s] && (e[s] = t[s], l[s] = !0);
    t = o !== !1 && Gn(t);
  } while (t && (!o || o(t, e)) && t !== Object.prototype);
  return e;
}, Ba = (t, e, o) => {
  t = String(t), (o === void 0 || o > t.length) && (o = t.length), o -= e.length;
  const n = t.indexOf(e, o);
  return n !== -1 && n === o;
}, Pa = (t) => {
  if (!t)
    return null;
  if (Ft(t))
    return t;
  let e = t.length;
  if (!Jo(e))
    return null;
  const o = new Array(e);
  for (; e-- > 0; )
    o[e] = t[e];
  return o;
}, za = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Gn(Uint8Array)), Ha = (t, e) => {
  const n = (t && t[Symbol.iterator]).call(t);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const c = r.value;
    e.call(t, c[0], c[1]);
  }
}, Ua = (t, e) => {
  let o;
  const n = [];
  for (; (o = t.exec(e)) !== null; )
    n.push(o);
  return n;
}, Va = mt("HTMLFormElement"), Fa = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(o, n, r) {
    return n.toUpperCase() + r;
  }
), yo = (({ hasOwnProperty: t }) => (e, o) => t.call(e, o))(Object.prototype), $a = mt("RegExp"), nr = (t, e) => {
  const o = Object.getOwnPropertyDescriptors(t), n = {};
  Xt(o, (r, c) => {
    e(r, c, t) !== !1 && (n[c] = r);
  }), Object.defineProperties(t, n);
}, Ya = (t) => {
  nr(t, (e, o) => {
    if (st(t) && ["arguments", "caller", "callee"].indexOf(o) !== -1)
      return !1;
    const n = t[o];
    if (st(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + o + "'");
      });
    }
  });
}, Wa = (t, e) => {
  const o = {}, n = (r) => {
    r.forEach((c) => {
      o[c] = !0;
    });
  };
  return Ft(t) ? n(t) : n(String(t).split(e)), o;
}, Qa = () => {
}, Ga = (t, e) => (t = +t, Number.isFinite(t) ? t : e), bn = "abcdefghijklmnopqrstuvwxyz", Eo = "0123456789", or = {
  DIGIT: Eo,
  ALPHA: bn,
  ALPHA_DIGIT: bn + bn.toUpperCase() + Eo
}, qa = (t = 16, e = or.ALPHA_DIGIT) => {
  let o = "";
  const { length: n } = e;
  for (; t--; )
    o += e[Math.random() * n | 0];
  return o;
};
function Za(t) {
  return !!(t && st(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const Ka = (t) => {
  const e = new Array(10), o = (n, r) => {
    if (yn(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[r] = n;
        const c = Ft(n) ? [] : {};
        return Xt(n, (s, l) => {
          const p = o(s, r + 1);
          !Kt(p) && (c[l] = p);
        }), e[r] = void 0, c;
      }
    }
    return n;
  };
  return o(t, 0);
}, Ja = mt("AsyncFunction"), Xa = (t) => t && (yn(t) || st(t)) && st(t.then) && st(t.catch), y = {
  isArray: Ft,
  isArrayBuffer: Ko,
  isBuffer: Na,
  isFormData: ba,
  isArrayBufferView: Sa,
  isString: wa,
  isNumber: Jo,
  isBoolean: Ca,
  isObject: yn,
  isPlainObject: sn,
  isUndefined: Kt,
  isDate: Ma,
  isFile: Ta,
  isBlob: Da,
  isRegExp: $a,
  isFunction: st,
  isStream: Oa,
  isURLSearchParams: Ia,
  isTypedArray: za,
  isFileList: xa,
  forEach: Xt,
  merge: Pn,
  extend: Ra,
  trim: Aa,
  stripBOM: La,
  inherits: ka,
  toFlatObject: ja,
  kindOf: gn,
  kindOfTest: mt,
  endsWith: Ba,
  toArray: Pa,
  forEachEntry: Ha,
  matchAll: Ua,
  isHTMLForm: Va,
  hasOwnProperty: yo,
  hasOwnProp: yo,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: nr,
  freezeMethods: Ya,
  toObjectSet: Wa,
  toCamelCase: Fa,
  noop: Qa,
  toFiniteNumber: Ga,
  findKey: Xo,
  global: er,
  isContextDefined: tr,
  ALPHABET: or,
  generateString: qa,
  isSpecCompliantForm: Za,
  toJSONObject: Ka,
  isAsyncFn: Ja,
  isThenable: Xa
};
function ie(t, e, o, n, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), o && (this.config = o), n && (this.request = n), r && (this.response = r);
}
y.inherits(ie, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const rr = ie.prototype, sr = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  sr[t] = { value: t };
});
Object.defineProperties(ie, sr);
Object.defineProperty(rr, "isAxiosError", { value: !0 });
ie.from = (t, e, o, n, r, c) => {
  const s = Object.create(rr);
  return y.toFlatObject(t, s, function(p) {
    return p !== Error.prototype;
  }, (l) => l !== "isAxiosError"), ie.call(s, t.message, e, o, n, r), s.cause = t, s.name = t.name, c && Object.assign(s, c), s;
};
const ec = null;
function zn(t) {
  return y.isPlainObject(t) || y.isArray(t);
}
function ir(t) {
  return y.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function _o(t, e, o) {
  return t ? t.concat(e).map(function(r, c) {
    return r = ir(r), !o && c ? "[" + r + "]" : r;
  }).join(o ? "." : "") : e;
}
function tc(t) {
  return y.isArray(t) && !t.some(zn);
}
const nc = y.toFlatObject(y, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function En(t, e, o) {
  if (!y.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), o = y.toFlatObject(o, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, V) {
    return !y.isUndefined(V[b]);
  });
  const n = o.metaTokens, r = o.visitor || h, c = o.dots, s = o.indexes, p = (o.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(e);
  if (!y.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(_) {
    if (_ === null)
      return "";
    if (y.isDate(_))
      return _.toISOString();
    if (!p && y.isBlob(_))
      throw new ie("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(_) || y.isTypedArray(_) ? p && typeof Blob == "function" ? new Blob([_]) : Buffer.from(_) : _;
  }
  function h(_, b, V) {
    let Ne = _;
    if (_ && !V && typeof _ == "object") {
      if (y.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), _ = JSON.stringify(_);
      else if (y.isArray(_) && tc(_) || (y.isFileList(_) || y.endsWith(b, "[]")) && (Ne = y.toArray(_)))
        return b = ir(b), Ne.forEach(function(ze, ge) {
          !(y.isUndefined(ze) || ze === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? _o([b], ge, c) : s === null ? b : b + "[]",
            u(ze)
          );
        }), !1;
    }
    return zn(_) ? !0 : (e.append(_o(V, b, c), u(_)), !1);
  }
  const g = [], S = Object.assign(nc, {
    defaultVisitor: h,
    convertValue: u,
    isVisitable: zn
  });
  function w(_, b) {
    if (!y.isUndefined(_)) {
      if (g.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      g.push(_), y.forEach(_, function(Ne, Re) {
        (!(y.isUndefined(Ne) || Ne === null) && r.call(
          e,
          Ne,
          y.isString(Re) ? Re.trim() : Re,
          b,
          S
        )) === !0 && w(Ne, b ? b.concat(Re) : [Re]);
      }), g.pop();
    }
  }
  if (!y.isObject(t))
    throw new TypeError("data must be an object");
  return w(t), e;
}
function No(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function qn(t, e) {
  this._pairs = [], t && En(t, this, e);
}
const ar = qn.prototype;
ar.append = function(e, o) {
  this._pairs.push([e, o]);
};
ar.toString = function(e) {
  const o = e ? function(n) {
    return e.call(this, n, No);
  } : No;
  return this._pairs.map(function(r) {
    return o(r[0]) + "=" + o(r[1]);
  }, "").join("&");
};
function oc(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function cr(t, e, o) {
  if (!e)
    return t;
  const n = o && o.encode || oc, r = o && o.serialize;
  let c;
  if (r ? c = r(e, o) : c = y.isURLSearchParams(e) ? e.toString() : new qn(e, o).toString(n), c) {
    const s = t.indexOf("#");
    s !== -1 && (t = t.slice(0, s)), t += (t.indexOf("?") === -1 ? "?" : "&") + c;
  }
  return t;
}
class rc {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, o, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: o,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    y.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const So = rc, lr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, sc = typeof URLSearchParams < "u" ? URLSearchParams : qn, ic = typeof FormData < "u" ? FormData : null, ac = typeof Blob < "u" ? Blob : null, cc = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), lc = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ft = {
  isBrowser: !0,
  classes: {
    URLSearchParams: sc,
    FormData: ic,
    Blob: ac
  },
  isStandardBrowserEnv: cc,
  isStandardBrowserWebWorkerEnv: lc,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function uc(t, e) {
  return En(t, new ft.classes.URLSearchParams(), Object.assign({
    visitor: function(o, n, r, c) {
      return ft.isNode && y.isBuffer(o) ? (this.append(n, o.toString("base64")), !1) : c.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function dc(t) {
  return y.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function fc(t) {
  const e = {}, o = Object.keys(t);
  let n;
  const r = o.length;
  let c;
  for (n = 0; n < r; n++)
    c = o[n], e[c] = t[c];
  return e;
}
function ur(t) {
  function e(o, n, r, c) {
    let s = o[c++];
    const l = Number.isFinite(+s), p = c >= o.length;
    return s = !s && y.isArray(r) ? r.length : s, p ? (y.hasOwnProp(r, s) ? r[s] = [r[s], n] : r[s] = n, !l) : ((!r[s] || !y.isObject(r[s])) && (r[s] = []), e(o, n, r[s], c) && y.isArray(r[s]) && (r[s] = fc(r[s])), !l);
  }
  if (y.isFormData(t) && y.isFunction(t.entries)) {
    const o = {};
    return y.forEachEntry(t, (n, r) => {
      e(dc(n), r, o, 0);
    }), o;
  }
  return null;
}
const hc = {
  "Content-Type": void 0
};
function pc(t, e, o) {
  if (y.isString(t))
    try {
      return (e || JSON.parse)(t), y.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (o || JSON.stringify)(t);
}
const _n = {
  transitional: lr,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, o) {
    const n = o.getContentType() || "", r = n.indexOf("application/json") > -1, c = y.isObject(e);
    if (c && y.isHTMLForm(e) && (e = new FormData(e)), y.isFormData(e))
      return r && r ? JSON.stringify(ur(e)) : e;
    if (y.isArrayBuffer(e) || y.isBuffer(e) || y.isStream(e) || y.isFile(e) || y.isBlob(e))
      return e;
    if (y.isArrayBufferView(e))
      return e.buffer;
    if (y.isURLSearchParams(e))
      return o.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (c) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return uc(e, this.formSerializer).toString();
      if ((l = y.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const p = this.env && this.env.FormData;
        return En(
          l ? { "files[]": e } : e,
          p && new p(),
          this.formSerializer
        );
      }
    }
    return c || r ? (o.setContentType("application/json", !1), pc(e)) : e;
  }],
  transformResponse: [function(e) {
    const o = this.transitional || _n.transitional, n = o && o.forcedJSONParsing, r = this.responseType === "json";
    if (e && y.isString(e) && (n && !this.responseType || r)) {
      const s = !(o && o.silentJSONParsing) && r;
      try {
        return JSON.parse(e);
      } catch (l) {
        if (s)
          throw l.name === "SyntaxError" ? ie.from(l, ie.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ft.classes.FormData,
    Blob: ft.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
y.forEach(["delete", "get", "head"], function(e) {
  _n.headers[e] = {};
});
y.forEach(["post", "put", "patch"], function(e) {
  _n.headers[e] = y.merge(hc);
});
const Zn = _n, mc = y.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), gc = (t) => {
  const e = {};
  let o, n, r;
  return t && t.split(`
`).forEach(function(s) {
    r = s.indexOf(":"), o = s.substring(0, r).trim().toLowerCase(), n = s.substring(r + 1).trim(), !(!o || e[o] && mc[o]) && (o === "set-cookie" ? e[o] ? e[o].push(n) : e[o] = [n] : e[o] = e[o] ? e[o] + ", " + n : n);
  }), e;
}, wo = Symbol("internals");
function qt(t) {
  return t && String(t).trim().toLowerCase();
}
function an(t) {
  return t === !1 || t == null ? t : y.isArray(t) ? t.map(an) : String(t);
}
function vc(t) {
  const e = /* @__PURE__ */ Object.create(null), o = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = o.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const yc = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function In(t, e, o, n, r) {
  if (y.isFunction(n))
    return n.call(this, e, o);
  if (r && (e = o), !!y.isString(e)) {
    if (y.isString(n))
      return e.indexOf(n) !== -1;
    if (y.isRegExp(n))
      return n.test(e);
  }
}
function Ec(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, o, n) => o.toUpperCase() + n);
}
function _c(t, e) {
  const o = y.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + o, {
      value: function(r, c, s) {
        return this[n].call(this, e, r, c, s);
      },
      configurable: !0
    });
  });
}
class Nn {
  constructor(e) {
    e && this.set(e);
  }
  set(e, o, n) {
    const r = this;
    function c(l, p, u) {
      const h = qt(p);
      if (!h)
        throw new Error("header name must be a non-empty string");
      const g = y.findKey(r, h);
      (!g || r[g] === void 0 || u === !0 || u === void 0 && r[g] !== !1) && (r[g || p] = an(l));
    }
    const s = (l, p) => y.forEach(l, (u, h) => c(u, h, p));
    return y.isPlainObject(e) || e instanceof this.constructor ? s(e, o) : y.isString(e) && (e = e.trim()) && !yc(e) ? s(gc(e), o) : e != null && c(o, e, n), this;
  }
  get(e, o) {
    if (e = qt(e), e) {
      const n = y.findKey(this, e);
      if (n) {
        const r = this[n];
        if (!o)
          return r;
        if (o === !0)
          return vc(r);
        if (y.isFunction(o))
          return o.call(this, r, n);
        if (y.isRegExp(o))
          return o.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, o) {
    if (e = qt(e), e) {
      const n = y.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!o || In(this, this[n], n, o)));
    }
    return !1;
  }
  delete(e, o) {
    const n = this;
    let r = !1;
    function c(s) {
      if (s = qt(s), s) {
        const l = y.findKey(n, s);
        l && (!o || In(n, n[l], l, o)) && (delete n[l], r = !0);
      }
    }
    return y.isArray(e) ? e.forEach(c) : c(e), r;
  }
  clear(e) {
    const o = Object.keys(this);
    let n = o.length, r = !1;
    for (; n--; ) {
      const c = o[n];
      (!e || In(this, this[c], c, e, !0)) && (delete this[c], r = !0);
    }
    return r;
  }
  normalize(e) {
    const o = this, n = {};
    return y.forEach(this, (r, c) => {
      const s = y.findKey(n, c);
      if (s) {
        o[s] = an(r), delete o[c];
        return;
      }
      const l = e ? Ec(c) : String(c).trim();
      l !== c && delete o[c], o[l] = an(r), n[l] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const o = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (n, r) => {
      n != null && n !== !1 && (o[r] = e && y.isArray(n) ? n.join(", ") : n);
    }), o;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, o]) => e + ": " + o).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...o) {
    const n = new this(e);
    return o.forEach((r) => n.set(r)), n;
  }
  static accessor(e) {
    const n = (this[wo] = this[wo] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function c(s) {
      const l = qt(s);
      n[l] || (_c(r, s), n[l] = !0);
    }
    return y.isArray(e) ? e.forEach(c) : c(e), this;
  }
}
Nn.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.freezeMethods(Nn.prototype);
y.freezeMethods(Nn);
const Et = Nn;
function An(t, e) {
  const o = this || Zn, n = e || o, r = Et.from(n.headers);
  let c = n.data;
  return y.forEach(t, function(l) {
    c = l.call(o, c, r.normalize(), e ? e.status : void 0);
  }), r.normalize(), c;
}
function dr(t) {
  return !!(t && t.__CANCEL__);
}
function en(t, e, o) {
  ie.call(this, t ?? "canceled", ie.ERR_CANCELED, e, o), this.name = "CanceledError";
}
y.inherits(en, ie, {
  __CANCEL__: !0
});
function Nc(t, e, o) {
  const n = o.config.validateStatus;
  !o.status || !n || n(o.status) ? t(o) : e(new ie(
    "Request failed with status code " + o.status,
    [ie.ERR_BAD_REQUEST, ie.ERR_BAD_RESPONSE][Math.floor(o.status / 100) - 4],
    o.config,
    o.request,
    o
  ));
}
const Sc = ft.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(o, n, r, c, s, l) {
        const p = [];
        p.push(o + "=" + encodeURIComponent(n)), y.isNumber(r) && p.push("expires=" + new Date(r).toGMTString()), y.isString(c) && p.push("path=" + c), y.isString(s) && p.push("domain=" + s), l === !0 && p.push("secure"), document.cookie = p.join("; ");
      },
      read: function(o) {
        const n = document.cookie.match(new RegExp("(^|;\\s*)(" + o + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(o) {
        this.write(o, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function wc(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Cc(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function fr(t, e) {
  return t && !wc(e) ? Cc(t, e) : e;
}
const Mc = ft.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a");
    let n;
    function r(c) {
      let s = c;
      return e && (o.setAttribute("href", s), s = o.href), o.setAttribute("href", s), {
        href: o.href,
        protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
        host: o.host,
        search: o.search ? o.search.replace(/^\?/, "") : "",
        hash: o.hash ? o.hash.replace(/^#/, "") : "",
        hostname: o.hostname,
        port: o.port,
        pathname: o.pathname.charAt(0) === "/" ? o.pathname : "/" + o.pathname
      };
    }
    return n = r(window.location.href), function(s) {
      const l = y.isString(s) ? r(s) : s;
      return l.protocol === n.protocol && l.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function Tc(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Dc(t, e) {
  t = t || 10;
  const o = new Array(t), n = new Array(t);
  let r = 0, c = 0, s;
  return e = e !== void 0 ? e : 1e3, function(p) {
    const u = Date.now(), h = n[c];
    s || (s = u), o[r] = p, n[r] = u;
    let g = c, S = 0;
    for (; g !== r; )
      S += o[g++], g = g % t;
    if (r = (r + 1) % t, r === c && (c = (c + 1) % t), u - s < e)
      return;
    const w = h && u - h;
    return w ? Math.round(S * 1e3 / w) : void 0;
  };
}
function Co(t, e) {
  let o = 0;
  const n = Dc(50, 250);
  return (r) => {
    const c = r.loaded, s = r.lengthComputable ? r.total : void 0, l = c - o, p = n(l), u = c <= s;
    o = c;
    const h = {
      loaded: c,
      total: s,
      progress: s ? c / s : void 0,
      bytes: l,
      rate: p || void 0,
      estimated: p && s && u ? (s - c) / p : void 0,
      event: r
    };
    h[e ? "download" : "upload"] = !0, t(h);
  };
}
const xc = typeof XMLHttpRequest < "u", Oc = xc && function(t) {
  return new Promise(function(o, n) {
    let r = t.data;
    const c = Et.from(t.headers).normalize(), s = t.responseType;
    let l;
    function p() {
      t.cancelToken && t.cancelToken.unsubscribe(l), t.signal && t.signal.removeEventListener("abort", l);
    }
    y.isFormData(r) && (ft.isStandardBrowserEnv || ft.isStandardBrowserWebWorkerEnv ? c.setContentType(!1) : c.setContentType("multipart/form-data;", !1));
    let u = new XMLHttpRequest();
    if (t.auth) {
      const w = t.auth.username || "", _ = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      c.set("Authorization", "Basic " + btoa(w + ":" + _));
    }
    const h = fr(t.baseURL, t.url);
    u.open(t.method.toUpperCase(), cr(h, t.params, t.paramsSerializer), !0), u.timeout = t.timeout;
    function g() {
      if (!u)
        return;
      const w = Et.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), b = {
        data: !s || s === "text" || s === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: w,
        config: t,
        request: u
      };
      Nc(function(Ne) {
        o(Ne), p();
      }, function(Ne) {
        n(Ne), p();
      }, b), u = null;
    }
    if ("onloadend" in u ? u.onloadend = g : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(g);
    }, u.onabort = function() {
      u && (n(new ie("Request aborted", ie.ECONNABORTED, t, u)), u = null);
    }, u.onerror = function() {
      n(new ie("Network Error", ie.ERR_NETWORK, t, u)), u = null;
    }, u.ontimeout = function() {
      let _ = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const b = t.transitional || lr;
      t.timeoutErrorMessage && (_ = t.timeoutErrorMessage), n(new ie(
        _,
        b.clarifyTimeoutError ? ie.ETIMEDOUT : ie.ECONNABORTED,
        t,
        u
      )), u = null;
    }, ft.isStandardBrowserEnv) {
      const w = (t.withCredentials || Mc(h)) && t.xsrfCookieName && Sc.read(t.xsrfCookieName);
      w && c.set(t.xsrfHeaderName, w);
    }
    r === void 0 && c.setContentType(null), "setRequestHeader" in u && y.forEach(c.toJSON(), function(_, b) {
      u.setRequestHeader(b, _);
    }), y.isUndefined(t.withCredentials) || (u.withCredentials = !!t.withCredentials), s && s !== "json" && (u.responseType = t.responseType), typeof t.onDownloadProgress == "function" && u.addEventListener("progress", Co(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", Co(t.onUploadProgress)), (t.cancelToken || t.signal) && (l = (w) => {
      u && (n(!w || w.type ? new en(null, t, u) : w), u.abort(), u = null);
    }, t.cancelToken && t.cancelToken.subscribe(l), t.signal && (t.signal.aborted ? l() : t.signal.addEventListener("abort", l)));
    const S = Tc(h);
    if (S && ft.protocols.indexOf(S) === -1) {
      n(new ie("Unsupported protocol " + S + ":", ie.ERR_BAD_REQUEST, t));
      return;
    }
    u.send(r || null);
  });
}, cn = {
  http: ec,
  xhr: Oc
};
y.forEach(cn, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const bc = {
  getAdapter: (t) => {
    t = y.isArray(t) ? t : [t];
    const { length: e } = t;
    let o, n;
    for (let r = 0; r < e && (o = t[r], !(n = y.isString(o) ? cn[o.toLowerCase()] : o)); r++)
      ;
    if (!n)
      throw n === !1 ? new ie(
        `Adapter ${o} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        y.hasOwnProp(cn, o) ? `Adapter '${o}' is not available in the build` : `Unknown adapter '${o}'`
      );
    if (!y.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: cn
};
function Rn(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new en(null, t);
}
function Mo(t) {
  return Rn(t), t.headers = Et.from(t.headers), t.data = An.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), bc.getAdapter(t.adapter || Zn.adapter)(t).then(function(n) {
    return Rn(t), n.data = An.call(
      t,
      t.transformResponse,
      n
    ), n.headers = Et.from(n.headers), n;
  }, function(n) {
    return dr(n) || (Rn(t), n && n.response && (n.response.data = An.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = Et.from(n.response.headers))), Promise.reject(n);
  });
}
const To = (t) => t instanceof Et ? t.toJSON() : t;
function Ht(t, e) {
  e = e || {};
  const o = {};
  function n(u, h, g) {
    return y.isPlainObject(u) && y.isPlainObject(h) ? y.merge.call({ caseless: g }, u, h) : y.isPlainObject(h) ? y.merge({}, h) : y.isArray(h) ? h.slice() : h;
  }
  function r(u, h, g) {
    if (y.isUndefined(h)) {
      if (!y.isUndefined(u))
        return n(void 0, u, g);
    } else
      return n(u, h, g);
  }
  function c(u, h) {
    if (!y.isUndefined(h))
      return n(void 0, h);
  }
  function s(u, h) {
    if (y.isUndefined(h)) {
      if (!y.isUndefined(u))
        return n(void 0, u);
    } else
      return n(void 0, h);
  }
  function l(u, h, g) {
    if (g in e)
      return n(u, h);
    if (g in t)
      return n(void 0, u);
  }
  const p = {
    url: c,
    method: c,
    data: c,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: l,
    headers: (u, h) => r(To(u), To(h), !0)
  };
  return y.forEach(Object.keys(Object.assign({}, t, e)), function(h) {
    const g = p[h] || r, S = g(t[h], e[h], h);
    y.isUndefined(S) && g !== l || (o[h] = S);
  }), o;
}
const hr = "1.4.0", Kn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Kn[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Do = {};
Kn.transitional = function(e, o, n) {
  function r(c, s) {
    return "[Axios v" + hr + "] Transitional option '" + c + "'" + s + (n ? ". " + n : "");
  }
  return (c, s, l) => {
    if (e === !1)
      throw new ie(
        r(s, " has been removed" + (o ? " in " + o : "")),
        ie.ERR_DEPRECATED
      );
    return o && !Do[s] && (Do[s] = !0, console.warn(
      r(
        s,
        " has been deprecated since v" + o + " and will be removed in the near future"
      )
    )), e ? e(c, s, l) : !0;
  };
};
function Ic(t, e, o) {
  if (typeof t != "object")
    throw new ie("options must be an object", ie.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let r = n.length;
  for (; r-- > 0; ) {
    const c = n[r], s = e[c];
    if (s) {
      const l = t[c], p = l === void 0 || s(l, c, t);
      if (p !== !0)
        throw new ie("option " + c + " must be " + p, ie.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (o !== !0)
      throw new ie("Unknown option " + c, ie.ERR_BAD_OPTION);
  }
}
const Hn = {
  assertOptions: Ic,
  validators: Kn
}, St = Hn.validators;
class fn {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new So(),
      response: new So()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(e, o) {
    typeof e == "string" ? (o = o || {}, o.url = e) : o = e || {}, o = Ht(this.defaults, o);
    const { transitional: n, paramsSerializer: r, headers: c } = o;
    n !== void 0 && Hn.assertOptions(n, {
      silentJSONParsing: St.transitional(St.boolean),
      forcedJSONParsing: St.transitional(St.boolean),
      clarifyTimeoutError: St.transitional(St.boolean)
    }, !1), r != null && (y.isFunction(r) ? o.paramsSerializer = {
      serialize: r
    } : Hn.assertOptions(r, {
      encode: St.function,
      serialize: St.function
    }, !0)), o.method = (o.method || this.defaults.method || "get").toLowerCase();
    let s;
    s = c && y.merge(
      c.common,
      c[o.method]
    ), s && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (_) => {
        delete c[_];
      }
    ), o.headers = Et.concat(s, c);
    const l = [];
    let p = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(o) === !1 || (p = p && b.synchronous, l.unshift(b.fulfilled, b.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(b) {
      u.push(b.fulfilled, b.rejected);
    });
    let h, g = 0, S;
    if (!p) {
      const _ = [Mo.bind(this), void 0];
      for (_.unshift.apply(_, l), _.push.apply(_, u), S = _.length, h = Promise.resolve(o); g < S; )
        h = h.then(_[g++], _[g++]);
      return h;
    }
    S = l.length;
    let w = o;
    for (g = 0; g < S; ) {
      const _ = l[g++], b = l[g++];
      try {
        w = _(w);
      } catch (V) {
        b.call(this, V);
        break;
      }
    }
    try {
      h = Mo.call(this, w);
    } catch (_) {
      return Promise.reject(_);
    }
    for (g = 0, S = u.length; g < S; )
      h = h.then(u[g++], u[g++]);
    return h;
  }
  getUri(e) {
    e = Ht(this.defaults, e);
    const o = fr(e.baseURL, e.url);
    return cr(o, e.params, e.paramsSerializer);
  }
}
y.forEach(["delete", "get", "head", "options"], function(e) {
  fn.prototype[e] = function(o, n) {
    return this.request(Ht(n || {}, {
      method: e,
      url: o,
      data: (n || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(e) {
  function o(n) {
    return function(c, s, l) {
      return this.request(Ht(l || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: c,
        data: s
      }));
    };
  }
  fn.prototype[e] = o(), fn.prototype[e + "Form"] = o(!0);
});
const ln = fn;
class Jn {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let o;
    this.promise = new Promise(function(c) {
      o = c;
    });
    const n = this;
    this.promise.then((r) => {
      if (!n._listeners)
        return;
      let c = n._listeners.length;
      for (; c-- > 0; )
        n._listeners[c](r);
      n._listeners = null;
    }), this.promise.then = (r) => {
      let c;
      const s = new Promise((l) => {
        n.subscribe(l), c = l;
      }).then(r);
      return s.cancel = function() {
        n.unsubscribe(c);
      }, s;
    }, e(function(c, s, l) {
      n.reason || (n.reason = new en(c, s, l), o(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const o = this._listeners.indexOf(e);
    o !== -1 && this._listeners.splice(o, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Jn(function(r) {
        e = r;
      }),
      cancel: e
    };
  }
}
const Ac = Jn;
function Rc(t) {
  return function(o) {
    return t.apply(null, o);
  };
}
function Lc(t) {
  return y.isObject(t) && t.isAxiosError === !0;
}
const Un = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Un).forEach(([t, e]) => {
  Un[e] = t;
});
const kc = Un;
function pr(t) {
  const e = new ln(t), o = Zo(ln.prototype.request, e);
  return y.extend(o, ln.prototype, e, { allOwnKeys: !0 }), y.extend(o, e, null, { allOwnKeys: !0 }), o.create = function(r) {
    return pr(Ht(t, r));
  }, o;
}
const xe = pr(Zn);
xe.Axios = ln;
xe.CanceledError = en;
xe.CancelToken = Ac;
xe.isCancel = dr;
xe.VERSION = hr;
xe.toFormData = En;
xe.AxiosError = ie;
xe.Cancel = xe.CanceledError;
xe.all = function(e) {
  return Promise.all(e);
};
xe.spread = Rc;
xe.isAxiosError = Lc;
xe.mergeConfig = Ht;
xe.AxiosHeaders = Et;
xe.formToJSON = (t) => ur(y.isHTMLForm(t) ? new FormData(t) : t);
xe.HttpStatusCode = kc;
xe.default = xe;
const jc = xe, zc = {
  install: (t, e) => {
    window.axios || (window.axios = jc), t.component("TextEditor", ya), t.use(Ea, "textEditor");
  }
};
export {
  zc as default
};
