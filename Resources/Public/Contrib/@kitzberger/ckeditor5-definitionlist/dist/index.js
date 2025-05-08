import { ObservableMixin as Q, Collection as Ne, CKEditorError as j, EmitterMixin as ct, isNode as Be, toArray as ee, DomEmitterMixin as lt, isIterable as se, uid as dt, env as ut, delay as ft, getEnvKeystrokeText as ae } from "@ckeditor/ckeditor5-utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class ht extends Q() {
  /**
   * @inheritDoc
   */
  constructor(t) {
    super(), this._disableStack = /* @__PURE__ */ new Set(), this.editor = t, this.set("isEnabled", !0);
  }
  /**
   * Disables the plugin.
   *
   * Plugin may be disabled by multiple features or algorithms (at once). When disabling a plugin, unique id should be passed
   * (e.g. feature name). The same identifier should be used when {@link #clearForceDisabled enabling back} the plugin.
   * The plugin becomes enabled only after all features {@link #clearForceDisabled enabled it back}.
   *
   * Disabling and enabling a plugin:
   *
   * ```ts
   * plugin.isEnabled; // -> true
   * plugin.forceDisabled( 'MyFeature' );
   * plugin.isEnabled; // -> false
   * plugin.clearForceDisabled( 'MyFeature' );
   * plugin.isEnabled; // -> true
   * ```
   *
   * Plugin disabled by multiple features:
   *
   * ```ts
   * plugin.forceDisabled( 'MyFeature' );
   * plugin.forceDisabled( 'OtherFeature' );
   * plugin.clearForceDisabled( 'MyFeature' );
   * plugin.isEnabled; // -> false
   * plugin.clearForceDisabled( 'OtherFeature' );
   * plugin.isEnabled; // -> true
   * ```
   *
   * Multiple disabling with the same identifier is redundant:
   *
   * ```ts
   * plugin.forceDisabled( 'MyFeature' );
   * plugin.forceDisabled( 'MyFeature' );
   * plugin.clearForceDisabled( 'MyFeature' );
   * plugin.isEnabled; // -> true
   * ```
   *
   * **Note:** some plugins or algorithms may have more complex logic when it comes to enabling or disabling certain plugins,
   * so the plugin might be still disabled after {@link #clearForceDisabled} was used.
   *
   * @param id Unique identifier for disabling. Use the same id when {@link #clearForceDisabled enabling back} the plugin.
   */
  forceDisabled(t) {
    this._disableStack.add(t), this._disableStack.size == 1 && (this.on("set:isEnabled", ce, { priority: "highest" }), this.isEnabled = !1);
  }
  /**
   * Clears forced disable previously set through {@link #forceDisabled}. See {@link #forceDisabled}.
   *
   * @param id Unique identifier, equal to the one passed in {@link #forceDisabled} call.
   */
  clearForceDisabled(t) {
    this._disableStack.delete(t), this._disableStack.size == 0 && (this.off("set:isEnabled", ce), this.isEnabled = !0);
  }
  /**
   * @inheritDoc
   */
  destroy() {
    this.stopListening();
  }
  /**
   * @inheritDoc
   */
  static get isContextPlugin() {
    return !1;
  }
}
function ce(e) {
  e.return = !1, e.stop();
}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class Me extends Q() {
  /**
   * Creates a new `Command` instance.
   *
   * @param editor The editor on which this command will be used.
   */
  constructor(t) {
    super(), this.editor = t, this.set("value", void 0), this.set("isEnabled", !1), this._affectsData = !0, this._isEnabledBasedOnSelection = !0, this._disableStack = /* @__PURE__ */ new Set(), this.decorate("execute"), this.listenTo(this.editor.model.document, "change", () => {
      this.refresh();
    }), this.listenTo(t, "change:isReadOnly", () => {
      this.refresh();
    }), this.on("set:isEnabled", (n) => {
      if (!this.affectsData)
        return;
      const i = t.model.document.selection, o = !(i.getFirstPosition().root.rootName == "$graveyard") && t.model.canEditAt(i);
      (t.isReadOnly || this._isEnabledBasedOnSelection && !o) && (n.return = !1, n.stop());
    }, { priority: "highest" }), this.on("execute", (n) => {
      this.isEnabled || n.stop();
    }, { priority: "high" });
  }
  /**
   * A flag indicating whether a command execution changes the editor data or not.
   *
   * Commands with `affectsData` set to `false` will not be automatically disabled in
   * the {@link module:core/editor/editor~Editor#isReadOnly read-only mode} and
   * {@glink features/read-only#related-features other editor modes} with restricted user write permissions.
   *
   * **Note:** You do not have to set it for your every command. It is `true` by default.
   *
   * @default true
   */
  get affectsData() {
    return this._affectsData;
  }
  set affectsData(t) {
    this._affectsData = t;
  }
  /**
   * Refreshes the command. The command should update its {@link #isEnabled} and {@link #value} properties
   * in this method.
   *
   * This method is automatically called when
   * {@link module:engine/model/document~Document#event:change any changes are applied to the document}.
   */
  refresh() {
    this.isEnabled = !0;
  }
  /**
   * Disables the command.
   *
   * Command may be disabled by multiple features or algorithms (at once). When disabling a command, unique id should be passed
   * (e.g. the feature name). The same identifier should be used when {@link #clearForceDisabled enabling back} the command.
   * The command becomes enabled only after all features {@link #clearForceDisabled enabled it back}.
   *
   * Disabling and enabling a command:
   *
   * ```ts
   * command.isEnabled; // -> true
   * command.forceDisabled( 'MyFeature' );
   * command.isEnabled; // -> false
   * command.clearForceDisabled( 'MyFeature' );
   * command.isEnabled; // -> true
   * ```
   *
   * Command disabled by multiple features:
   *
   * ```ts
   * command.forceDisabled( 'MyFeature' );
   * command.forceDisabled( 'OtherFeature' );
   * command.clearForceDisabled( 'MyFeature' );
   * command.isEnabled; // -> false
   * command.clearForceDisabled( 'OtherFeature' );
   * command.isEnabled; // -> true
   * ```
   *
   * Multiple disabling with the same identifier is redundant:
   *
   * ```ts
   * command.forceDisabled( 'MyFeature' );
   * command.forceDisabled( 'MyFeature' );
   * command.clearForceDisabled( 'MyFeature' );
   * command.isEnabled; // -> true
   * ```
   *
   * **Note:** some commands or algorithms may have more complex logic when it comes to enabling or disabling certain commands,
   * so the command might be still disabled after {@link #clearForceDisabled} was used.
   *
   * @param id Unique identifier for disabling. Use the same id when {@link #clearForceDisabled enabling back} the command.
   */
  forceDisabled(t) {
    this._disableStack.add(t), this._disableStack.size == 1 && (this.on("set:isEnabled", le, { priority: "highest" }), this.isEnabled = !1);
  }
  /**
   * Clears forced disable previously set through {@link #forceDisabled}. See {@link #forceDisabled}.
   *
   * @param id Unique identifier, equal to the one passed in {@link #forceDisabled} call.
   */
  clearForceDisabled(t) {
    this._disableStack.delete(t), this._disableStack.size == 0 && (this.off("set:isEnabled", le), this.refresh());
  }
  /**
   * Executes the command.
   *
   * A command may accept parameters. They will be passed from {@link module:core/editor/editor~Editor#execute `editor.execute()`}
   * to the command.
   *
   * The `execute()` method will automatically abort when the command is disabled ({@link #isEnabled} is `false`).
   * This behavior is implemented by a high priority listener to the {@link #event:execute} event.
   *
   * In order to see how to disable a command from "outside" see the {@link #isEnabled} documentation.
   *
   * This method may return a value, which would be forwarded all the way down to the
   * {@link module:core/editor/editor~Editor#execute `editor.execute()`}.
   *
   * @fires execute
   */
  execute(...t) {
  }
  /**
   * Destroys the command.
   */
  destroy() {
    this.stopListening();
  }
}
function le(e) {
  e.return = !1, e.stop();
}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class Ue extends Ne {
  /**
   * Creates a new instance of the {@link module:ui/viewcollection~ViewCollection}.
   *
   * @param initialItems The initial items of the collection.
   */
  constructor(t = []) {
    super(t, {
      // An #id Number attribute should be legal and not break the `ViewCollection` instance.
      // https://github.com/ckeditor/ckeditor5-ui/issues/93
      idProperty: "viewUid"
    }), this.on("add", (n, i, r) => {
      this._renderViewIntoCollectionParent(i, r);
    }), this.on("remove", (n, i) => {
      i.element && this._parentElement && i.element.remove();
    }), this._parentElement = null;
  }
  /**
   * Destroys the view collection along with child views.
   * See the view {@link module:ui/view~View#destroy} method.
   */
  destroy() {
    this.map((t) => t.destroy());
  }
  /**
   * Sets the parent HTML element of this collection. When parent is set, {@link #add adding} and
   * {@link #remove removing} views in the collection synchronizes their
   * {@link module:ui/view~View#element elements} in the parent element.
   *
   * @param element A new parent element.
   */
  setParent(t) {
    this._parentElement = t;
    for (const n of this)
      this._renderViewIntoCollectionParent(n);
  }
  /**
   * Delegates selected events coming from within views in the collection to any
   * {@link module:utils/emittermixin~Emitter}.
   *
   * For the following views and collection:
   *
   * ```ts
   * const viewA = new View();
   * const viewB = new View();
   * const viewC = new View();
   *
   * const views = parentView.createCollection();
   *
   * views.delegate( 'eventX' ).to( viewB );
   * views.delegate( 'eventX', 'eventY' ).to( viewC );
   *
   * views.add( viewA );
   * ```
   *
   * the `eventX` is delegated (fired by) `viewB` and `viewC` along with `customData`:
   *
   * ```ts
   * viewA.fire( 'eventX', customData );
   * ```
   *
   * and `eventY` is delegated (fired by) `viewC` along with `customData`:
   *
   * ```ts
   * viewA.fire( 'eventY', customData );
   * ```
   *
   * See {@link module:utils/emittermixin~Emitter#delegate}.
   *
   * @param events {@link module:ui/view~View} event names to be delegated to another
   * {@link module:utils/emittermixin~Emitter}.
   * @returns Object with `to` property, a function which accepts the destination
   * of {@link module:utils/emittermixin~Emitter#delegate delegated} events.
   */
  delegate(...t) {
    if (!t.length || !pt(t))
      throw new j("ui-viewcollection-delegate-wrong-events", this);
    return {
      to: (n) => {
        for (const i of this)
          for (const r of t)
            i.delegate(r).to(n);
        this.on("add", (i, r) => {
          for (const o of t)
            r.delegate(o).to(n);
        }), this.on("remove", (i, r) => {
          for (const o of t)
            r.stopDelegating(o, n);
        });
      }
    };
  }
  /**
   * This method {@link module:ui/view~View#render renders} a new view added to the collection.
   *
   * If the {@link #_parentElement parent element} of the collection is set, this method also adds
   * the view's {@link module:ui/view~View#element} as a child of the parent in DOM at a specified index.
   *
   * **Note**: If index is not specified, the view's element is pushed as the last child
   * of the parent element.
   *
   * @param view A new view added to the collection.
   * @param index An index the view holds in the collection. When not specified,
   * the view is added at the end.
   */
  _renderViewIntoCollectionParent(t, n) {
    t.isRendered || t.render(), t.element && this._parentElement && this._parentElement.insertBefore(t.element, this._parentElement.children[n]);
  }
  /**
   * Removes a child view from the collection. If the {@link #setParent parent element} of the
   * collection has been set, the {@link module:ui/view~View#element element} of the view is also removed
   * in DOM, reflecting the order of the collection.
   *
   * See the {@link #add} method.
   *
   * @param subject The view to remove, its id or index in the collection.
   * @returns The removed view.
   */
  remove(t) {
    return super.remove(t);
  }
}
function pt(e) {
  return e.every((t) => typeof t == "string");
}
var Re = typeof global == "object" && global && global.Object === Object && global, bt = typeof self == "object" && self && self.Object === Object && self, m = Re || bt || Function("return this")(), A = m.Symbol, ze = Object.prototype, gt = ze.hasOwnProperty, mt = ze.toString, O = A ? A.toStringTag : void 0;
function yt(e) {
  var t = gt.call(e, O), n = e[O];
  try {
    e[O] = void 0;
    var i = !0;
  } catch {
  }
  var r = mt.call(e);
  return i && (t ? e[O] = n : delete e[O]), r;
}
var vt = Object.prototype, _t = vt.toString;
function Tt(e) {
  return _t.call(e);
}
var wt = "[object Null]", xt = "[object Undefined]", de = A ? A.toStringTag : void 0;
function V(e) {
  return e == null ? e === void 0 ? xt : wt : de && de in Object(e) ? yt(e) : Tt(e);
}
function N(e) {
  return e != null && typeof e == "object";
}
var te = Array.isArray;
function B(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var jt = "[object AsyncFunction]", At = "[object Function]", Et = "[object GeneratorFunction]", $t = "[object Proxy]";
function Ge(e) {
  if (!B(e))
    return !1;
  var t = V(e);
  return t == At || t == Et || t == jt || t == $t;
}
var W = m["__core-js_shared__"], ue = function() {
  var e = /[^.]+$/.exec(W && W.keys && W.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ct(e) {
  return !!ue && ue in e;
}
var Dt = Function.prototype, St = Dt.toString;
function w(e) {
  if (e != null) {
    try {
      return St.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ot = /[\\^$.*+?()[\]{}|]/g, Pt = /^\[object .+?Constructor\]$/, Lt = Function.prototype, kt = Object.prototype, It = Lt.toString, Ft = kt.hasOwnProperty, Vt = RegExp(
  "^" + It.call(Ft).replace(Ot, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Nt(e) {
  if (!B(e) || Ct(e))
    return !1;
  var t = Ge(e) ? Vt : Pt;
  return t.test(w(e));
}
function Bt(e, t) {
  return e == null ? void 0 : e[t];
}
function x(e, t) {
  var n = Bt(e, t);
  return Nt(n) ? n : void 0;
}
var X = x(m, "WeakMap"), fe = Object.create, Mt = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!B(t))
      return {};
    if (fe)
      return fe(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), he = function() {
  try {
    var e = x(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function Ut(e, t) {
  for (var n = -1, i = e == null ? 0 : e.length; ++n < i && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var Rt = 9007199254740991, zt = /^(?:0|[1-9]\d*)$/;
function Gt(e, t) {
  var n = typeof e;
  return t = t ?? Rt, !!t && (n == "number" || n != "symbol" && zt.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Kt(e, t, n) {
  t == "__proto__" && he ? he(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Ke(e, t) {
  return e === t || e !== e && t !== t;
}
var Ht = Object.prototype, Wt = Ht.hasOwnProperty;
function qt(e, t, n) {
  var i = e[t];
  (!(Wt.call(e, t) && Ke(i, n)) || n === void 0 && !(t in e)) && Kt(e, t, n);
}
var Xt = 9007199254740991;
function He(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Xt;
}
function Yt(e) {
  return e != null && He(e.length) && !Ge(e);
}
var Jt = Object.prototype;
function We(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Jt;
  return e === n;
}
function Zt(e, t) {
  for (var n = -1, i = Array(e); ++n < e; )
    i[n] = t(n);
  return i;
}
var Qt = "[object Arguments]";
function pe(e) {
  return N(e) && V(e) == Qt;
}
var qe = Object.prototype, en = qe.hasOwnProperty, tn = qe.propertyIsEnumerable, nn = pe(/* @__PURE__ */ function() {
  return arguments;
}()) ? pe : function(e) {
  return N(e) && en.call(e, "callee") && !tn.call(e, "callee");
};
function rn() {
  return !1;
}
var Xe = typeof exports == "object" && exports && !exports.nodeType && exports, be = Xe && typeof module == "object" && module && !module.nodeType && module, on = be && be.exports === Xe, ge = on ? m.Buffer : void 0, sn = ge ? ge.isBuffer : void 0, Ye = sn || rn, an = "[object Arguments]", cn = "[object Array]", ln = "[object Boolean]", dn = "[object Date]", un = "[object Error]", fn = "[object Function]", hn = "[object Map]", pn = "[object Number]", bn = "[object Object]", gn = "[object RegExp]", mn = "[object Set]", yn = "[object String]", vn = "[object WeakMap]", _n = "[object ArrayBuffer]", Tn = "[object DataView]", wn = "[object Float32Array]", xn = "[object Float64Array]", jn = "[object Int8Array]", An = "[object Int16Array]", En = "[object Int32Array]", $n = "[object Uint8Array]", Cn = "[object Uint8ClampedArray]", Dn = "[object Uint16Array]", Sn = "[object Uint32Array]", u = {};
u[wn] = u[xn] = u[jn] = u[An] = u[En] = u[$n] = u[Cn] = u[Dn] = u[Sn] = !0;
u[an] = u[cn] = u[_n] = u[ln] = u[Tn] = u[dn] = u[un] = u[fn] = u[hn] = u[pn] = u[bn] = u[gn] = u[mn] = u[yn] = u[vn] = !1;
function On(e) {
  return N(e) && He(e.length) && !!u[V(e)];
}
function ne(e) {
  return function(t) {
    return e(t);
  };
}
var Je = typeof exports == "object" && exports && !exports.nodeType && exports, P = Je && typeof module == "object" && module && !module.nodeType && module, Pn = P && P.exports === Je, q = Pn && Re.process, E = function() {
  try {
    var e = P && P.require && P.require("util").types;
    return e || q && q.binding && q.binding("util");
  } catch {
  }
}(), me = E && E.isTypedArray, Ln = me ? ne(me) : On, kn = Object.prototype, In = kn.hasOwnProperty;
function Fn(e, t) {
  var n = te(e), i = !n && nn(e), r = !n && !i && Ye(e), o = !n && !i && !r && Ln(e), s = n || i || r || o, c = s ? Zt(e.length, String) : [], a = c.length;
  for (var l in e)
    In.call(e, l) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Gt(l, a))) && c.push(l);
  return c;
}
function Ze(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Vn = Ze(Object.keys, Object), Nn = Object.prototype, Bn = Nn.hasOwnProperty;
function Mn(e) {
  if (!We(e))
    return Vn(e);
  var t = [];
  for (var n in Object(e))
    Bn.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Un(e) {
  return Yt(e) ? Fn(e) : Mn(e);
}
var I = x(Object, "create");
function Rn() {
  this.__data__ = I ? I(null) : {}, this.size = 0;
}
function zn(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Gn = "__lodash_hash_undefined__", Kn = Object.prototype, Hn = Kn.hasOwnProperty;
function Wn(e) {
  var t = this.__data__;
  if (I) {
    var n = t[e];
    return n === Gn ? void 0 : n;
  }
  return Hn.call(t, e) ? t[e] : void 0;
}
var qn = Object.prototype, Xn = qn.hasOwnProperty;
function Yn(e) {
  var t = this.__data__;
  return I ? t[e] !== void 0 : Xn.call(t, e);
}
var Jn = "__lodash_hash_undefined__";
function Zn(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = I && t === void 0 ? Jn : t, this;
}
function T(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
T.prototype.clear = Rn;
T.prototype.delete = zn;
T.prototype.get = Wn;
T.prototype.has = Yn;
T.prototype.set = Zn;
function Qn() {
  this.__data__ = [], this.size = 0;
}
function G(e, t) {
  for (var n = e.length; n--; )
    if (Ke(e[n][0], t))
      return n;
  return -1;
}
var ei = Array.prototype, ti = ei.splice;
function ni(e) {
  var t = this.__data__, n = G(t, e);
  if (n < 0)
    return !1;
  var i = t.length - 1;
  return n == i ? t.pop() : ti.call(t, n, 1), --this.size, !0;
}
function ii(e) {
  var t = this.__data__, n = G(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function ri(e) {
  return G(this.__data__, e) > -1;
}
function oi(e, t) {
  var n = this.__data__, i = G(n, e);
  return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
}
function v(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
v.prototype.clear = Qn;
v.prototype.delete = ni;
v.prototype.get = ii;
v.prototype.has = ri;
v.prototype.set = oi;
var F = x(m, "Map");
function si() {
  this.size = 0, this.__data__ = {
    hash: new T(),
    map: new (F || v)(),
    string: new T()
  };
}
function ai(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function K(e, t) {
  var n = e.__data__;
  return ai(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function ci(e) {
  var t = K(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function li(e) {
  return K(this, e).get(e);
}
function di(e) {
  return K(this, e).has(e);
}
function ui(e, t) {
  var n = K(this, e), i = n.size;
  return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
}
function C(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
C.prototype.clear = si;
C.prototype.delete = ci;
C.prototype.get = li;
C.prototype.has = di;
C.prototype.set = ui;
function fi(e, t) {
  for (var n = -1, i = t.length, r = e.length; ++n < i; )
    e[r + n] = t[n];
  return e;
}
var hi = Ze(Object.getPrototypeOf, Object);
function pi() {
  this.__data__ = new v(), this.size = 0;
}
function bi(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function gi(e) {
  return this.__data__.get(e);
}
function mi(e) {
  return this.__data__.has(e);
}
var yi = 200;
function vi(e, t) {
  var n = this.__data__;
  if (n instanceof v) {
    var i = n.__data__;
    if (!F || i.length < yi - 1)
      return i.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new C(i);
  }
  return n.set(e, t), this.size = n.size, this;
}
function D(e) {
  var t = this.__data__ = new v(e);
  this.size = t.size;
}
D.prototype.clear = pi;
D.prototype.delete = bi;
D.prototype.get = gi;
D.prototype.has = mi;
D.prototype.set = vi;
var Qe = typeof exports == "object" && exports && !exports.nodeType && exports, ye = Qe && typeof module == "object" && module && !module.nodeType && module, _i = ye && ye.exports === Qe, ve = _i ? m.Buffer : void 0;
ve && ve.allocUnsafe;
function Ti(e, t) {
  return e.slice();
}
function wi(e, t) {
  for (var n = -1, i = e == null ? 0 : e.length, r = 0, o = []; ++n < i; ) {
    var s = e[n];
    t(s, n, e) && (o[r++] = s);
  }
  return o;
}
function xi() {
  return [];
}
var ji = Object.prototype, Ai = ji.propertyIsEnumerable, _e = Object.getOwnPropertySymbols, Ei = _e ? function(e) {
  return e == null ? [] : (e = Object(e), wi(_e(e), function(t) {
    return Ai.call(e, t);
  }));
} : xi;
function $i(e, t, n) {
  var i = t(e);
  return te(e) ? i : fi(i, n(e));
}
function Ci(e) {
  return $i(e, Un, Ei);
}
var Y = x(m, "DataView"), J = x(m, "Promise"), Z = x(m, "Set"), Te = "[object Map]", Di = "[object Object]", we = "[object Promise]", xe = "[object Set]", je = "[object WeakMap]", Ae = "[object DataView]", Si = w(Y), Oi = w(F), Pi = w(J), Li = w(Z), ki = w(X), y = V;
(Y && y(new Y(new ArrayBuffer(1))) != Ae || F && y(new F()) != Te || J && y(J.resolve()) != we || Z && y(new Z()) != xe || X && y(new X()) != je) && (y = function(e) {
  var t = V(e), n = t == Di ? e.constructor : void 0, i = n ? w(n) : "";
  if (i)
    switch (i) {
      case Si:
        return Ae;
      case Oi:
        return Te;
      case Pi:
        return we;
      case Li:
        return xe;
      case ki:
        return je;
    }
  return t;
});
var Ii = Object.prototype, Fi = Ii.hasOwnProperty;
function Vi(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Fi.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Ee = m.Uint8Array;
function ie(e) {
  var t = new e.constructor(e.byteLength);
  return new Ee(t).set(new Ee(e)), t;
}
function Ni(e, t) {
  var n = ie(e.buffer);
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Bi = /\w*$/;
function Mi(e) {
  var t = new e.constructor(e.source, Bi.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var $e = A ? A.prototype : void 0, Ce = $e ? $e.valueOf : void 0;
function Ui(e) {
  return Ce ? Object(Ce.call(e)) : {};
}
function Ri(e, t) {
  var n = ie(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
var zi = "[object Boolean]", Gi = "[object Date]", Ki = "[object Map]", Hi = "[object Number]", Wi = "[object RegExp]", qi = "[object Set]", Xi = "[object String]", Yi = "[object Symbol]", Ji = "[object ArrayBuffer]", Zi = "[object DataView]", Qi = "[object Float32Array]", er = "[object Float64Array]", tr = "[object Int8Array]", nr = "[object Int16Array]", ir = "[object Int32Array]", rr = "[object Uint8Array]", or = "[object Uint8ClampedArray]", sr = "[object Uint16Array]", ar = "[object Uint32Array]";
function cr(e, t, n) {
  var i = e.constructor;
  switch (t) {
    case Ji:
      return ie(e);
    case zi:
    case Gi:
      return new i(+e);
    case Zi:
      return Ni(e);
    case Qi:
    case er:
    case tr:
    case nr:
    case ir:
    case rr:
    case or:
    case sr:
    case ar:
      return Ri(e);
    case Ki:
      return new i();
    case Hi:
    case Xi:
      return new i(e);
    case Wi:
      return Mi(e);
    case qi:
      return new i();
    case Yi:
      return Ui(e);
  }
}
function lr(e) {
  return typeof e.constructor == "function" && !We(e) ? Mt(hi(e)) : {};
}
var dr = "[object Map]";
function ur(e) {
  return N(e) && y(e) == dr;
}
var De = E && E.isMap, fr = De ? ne(De) : ur, hr = "[object Set]";
function pr(e) {
  return N(e) && y(e) == hr;
}
var Se = E && E.isSet, br = Se ? ne(Se) : pr, et = "[object Arguments]", gr = "[object Array]", mr = "[object Boolean]", yr = "[object Date]", vr = "[object Error]", tt = "[object Function]", _r = "[object GeneratorFunction]", Tr = "[object Map]", wr = "[object Number]", nt = "[object Object]", xr = "[object RegExp]", jr = "[object Set]", Ar = "[object String]", Er = "[object Symbol]", $r = "[object WeakMap]", Cr = "[object ArrayBuffer]", Dr = "[object DataView]", Sr = "[object Float32Array]", Or = "[object Float64Array]", Pr = "[object Int8Array]", Lr = "[object Int16Array]", kr = "[object Int32Array]", Ir = "[object Uint8Array]", Fr = "[object Uint8ClampedArray]", Vr = "[object Uint16Array]", Nr = "[object Uint32Array]", d = {};
d[et] = d[gr] = d[Cr] = d[Dr] = d[mr] = d[yr] = d[Sr] = d[Or] = d[Pr] = d[Lr] = d[kr] = d[Tr] = d[wr] = d[nt] = d[xr] = d[jr] = d[Ar] = d[Er] = d[Ir] = d[Fr] = d[Vr] = d[Nr] = !0;
d[vr] = d[tt] = d[$r] = !1;
function U(e, t, n, i, r, o) {
  var s;
  if (n && (s = r ? n(e, i, r, o) : n(e)), s !== void 0)
    return s;
  if (!B(e))
    return e;
  var c = te(e);
  if (c)
    s = Vi(e);
  else {
    var a = y(e), l = a == tt || a == _r;
    if (Ye(e))
      return Ti(e);
    if (a == nt || a == et || l && !r)
      s = l ? {} : lr(e);
    else {
      if (!d[a])
        return r ? e : {};
      s = cr(e, a);
    }
  }
  o || (o = new D());
  var h = o.get(e);
  if (h)
    return h;
  o.set(e, s), br(e) ? e.forEach(function(b) {
    s.add(U(b, t, n, b, e, o));
  }) : fr(e) && e.forEach(function(b, g) {
    s.set(g, U(b, t, n, g, e, o));
  });
  var p = Ci, f = c ? void 0 : p(e);
  return Ut(f || e, function(b, g) {
    f && (g = b, b = e[g]), qt(s, g, U(b, t, n, g, e, o));
  }), s;
}
var Br = 1, Mr = 4;
function Ur(e, t) {
  return t = typeof t == "function" ? t : void 0, U(e, Br | Mr, t);
}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
const Rr = "http://www.w3.org/1999/xhtml";
class L extends ct() {
  /**
   * Creates an instance of the {@link ~Template} class.
   *
   * @param def The definition of the template.
   */
  constructor(t) {
    super(), Object.assign(this, Pe(Oe(t))), this._isRendered = !1, this._revertData = null;
  }
  /**
   * Renders a DOM Node (an HTML element or text) out of the template.
   *
   * ```ts
   * const domNode = new Template( { ... } ).render();
   * ```
   *
   * See: {@link #apply}.
   */
  render() {
    const t = this._renderNode({
      intoFragment: !0
    });
    return this._isRendered = !0, t;
  }
  /**
   * Applies the template to an existing DOM Node, either HTML element or text.
   *
   * **Note:** No new DOM nodes will be created. Applying extends:
   *
   * {@link module:ui/template~TemplateDefinition attributes},
   * {@link module:ui/template~TemplateDefinition event listeners}, and
   * `textContent` of {@link module:ui/template~TemplateDefinition children} only.
   *
   * **Note:** Existing `class` and `style` attributes are extended when a template
   * is applied to an HTML element, while other attributes and `textContent` are overridden.
   *
   * **Note:** The process of applying a template can be easily reverted using the
   * {@link module:ui/template~Template#revert} method.
   *
   * ```ts
   * const element = document.createElement( 'div' );
   * const observable = new Model( { divClass: 'my-div' } );
   * const emitter = Object.create( EmitterMixin );
   * const bind = Template.bind( observable, emitter );
   *
   * new Template( {
   * 	attributes: {
   * 		id: 'first-div',
   * 		class: bind.to( 'divClass' )
   * 	},
   * 	on: {
   * 		click: bind( 'elementClicked' ) // Will be fired by the observable.
   * 	},
   * 	children: [
   * 		'Div text.'
   * 	]
   * } ).apply( element );
   *
   * console.log( element.outerHTML ); // -> '<div id="first-div" class="my-div"></div>'
   * ```
   *
   * @see module:ui/template~Template#render
   * @see module:ui/template~Template#revert
   * @param node Root node for the template to apply.
   */
  apply(t) {
    return this._revertData = Ie(), this._renderNode({
      node: t,
      intoFragment: !1,
      isApplying: !0,
      revertData: this._revertData
    }), t;
  }
  /**
   * Reverts a template {@link module:ui/template~Template#apply applied} to a DOM node.
   *
   * @param node The root node for the template to revert. In most of the cases, it is the
   * same node used by {@link module:ui/template~Template#apply}.
   */
  revert(t) {
    if (!this._revertData)
      throw new j("ui-template-revert-not-applied", [this, t]);
    this._revertTemplateFromNode(t, this._revertData);
  }
  /**
   * Returns an iterator which traverses the template in search of {@link module:ui/view~View}
   * instances and returns them one by one.
   *
   * ```ts
   * const viewFoo = new View();
   * const viewBar = new View();
   * const viewBaz = new View();
   * const template = new Template( {
   * 	tag: 'div',
   * 	children: [
   * 		viewFoo,
   * 		{
   * 			tag: 'div',
   * 			children: [
   * 				viewBar
   * 			]
   * 		},
   * 		viewBaz
   * 	]
   * } );
   *
   * // Logs: viewFoo, viewBar, viewBaz
   * for ( const view of template.getViews() ) {
   * 	console.log( view );
   * }
   * ```
   */
  *getViews() {
    function* t(n) {
      if (n.children)
        for (const i of n.children)
          z(i) ? yield i : re(i) && (yield* t(i));
    }
    yield* t(this);
  }
  /**
   * An entry point to the interface which binds DOM nodes to
   * {@link module:utils/observablemixin~Observable observables}.
   * There are two types of bindings:
   *
   * * HTML element attributes or text `textContent` synchronized with attributes of an
   * {@link module:utils/observablemixin~Observable}. Learn more about {@link module:ui/template~BindChain#to}
   * and {@link module:ui/template~BindChain#if}.
   *
   * ```ts
   * const bind = Template.bind( observable, emitter );
   *
   * new Template( {
   * 	attributes: {
   * 		// Binds the element "class" attribute to observable#classAttribute.
   * 		class: bind.to( 'classAttribute' )
   * 	}
   * } ).render();
   * ```
   *
   * * DOM events fired on HTML element propagated through
   * {@link module:utils/observablemixin~Observable}. Learn more about {@link module:ui/template~BindChain#to}.
   *
   * ```ts
   * const bind = Template.bind( observable, emitter );
   *
   * new Template( {
   * 	on: {
   * 		// Will be fired by the observable.
   * 		click: bind( 'elementClicked' )
   * 	}
   * } ).render();
   * ```
   *
   * Also see {@link module:ui/view~View#bindTemplate}.
   *
   * @param observable An observable which provides boundable attributes.
   * @param emitter An emitter that listens to observable attribute
   * changes or DOM Events (depending on the kind of the binding). Usually, a {@link module:ui/view~View} instance.
   */
  static bind(t, n) {
    return {
      to(i, r) {
        return new zr({
          eventNameOrFunction: i,
          attribute: i,
          observable: t,
          emitter: n,
          callback: r
        });
      },
      if(i, r, o) {
        return new it({
          observable: t,
          emitter: n,
          attribute: i,
          valueIfTrue: r,
          callback: o
        });
      }
    };
  }
  /**
   * Extends an existing {@link module:ui/template~Template} instance with some additional content
   * from another {@link module:ui/template~TemplateDefinition}.
   *
   * ```ts
   * const bind = Template.bind( observable, emitter );
   *
   * const template = new Template( {
   * 	tag: 'p',
   * 	attributes: {
   * 		class: 'a',
   * 		data-x: bind.to( 'foo' )
   * 	},
   * 	children: [
   * 		{
   * 			tag: 'span',
   * 			attributes: {
   * 				class: 'b'
   * 			},
   * 			children: [
   * 				'Span'
   * 			]
   * 		}
   * 	]
   *  } );
   *
   * // Instance-level extension.
   * Template.extend( template, {
   * 	attributes: {
   * 		class: 'b',
   * 		data-x: bind.to( 'bar' )
   * 	},
   * 	children: [
   * 		{
   * 			attributes: {
   * 				class: 'c'
   * 			}
   * 		}
   * 	]
   * } );
   *
   * // Child extension.
   * Template.extend( template.children[ 0 ], {
   * 	attributes: {
   * 		class: 'd'
   * 	}
   * } );
   * ```
   *
   * the `outerHTML` of `template.render()` is:
   *
   * ```html
   * <p class="a b" data-x="{ observable.foo } { observable.bar }">
   * 	<span class="b c d">Span</span>
   * </p>
   * ```
   *
   * @param template An existing template instance to be extended.
   * @param def Additional definition to be applied to a template.
   */
  static extend(t, n) {
    if (t._isRendered)
      throw new j("template-extend-render", [this, t]);
    at(t, Pe(Oe(n)));
  }
  /**
   * Renders a DOM Node (either an HTML element or text) out of the template.
   *
   * @param data Rendering data.
   */
  _renderNode(t) {
    let n;
    if (t.node ? n = this.tag && this.text : n = this.tag ? this.text : !this.text, n)
      throw new j("ui-template-wrong-syntax", this);
    return this.text ? this._renderText(t) : this._renderElement(t);
  }
  /**
   * Renders an HTML element out of the template.
   *
   * @param data Rendering data.
   */
  _renderElement(t) {
    let n = t.node;
    return n || (n = t.node = document.createElementNS(this.ns || Rr, this.tag)), this._renderAttributes(t), this._renderElementChildren(t), this._setUpListeners(t), n;
  }
  /**
   * Renders a text node out of {@link module:ui/template~Template#text}.
   *
   * @param data Rendering data.
   */
  _renderText(t) {
    let n = t.node;
    return n ? t.revertData.text = n.textContent : n = t.node = document.createTextNode(""), R(this.text) ? this._bindToObservable({
      schema: this.text,
      updater: Kr(n),
      data: t
    }) : n.textContent = this.text.join(""), n;
  }
  /**
   * Renders HTML element attributes out of {@link module:ui/template~Template#attributes}.
   *
   * @param data Rendering data.
   */
  _renderAttributes(t) {
    if (!this.attributes)
      return;
    const n = t.node, i = t.revertData;
    for (const r in this.attributes) {
      const o = n.getAttribute(r), s = this.attributes[r];
      i && (i.attributes[r] = o);
      const c = ke(s) ? s[0].ns : null;
      if (R(s)) {
        const a = ke(s) ? s[0].value : s;
        i && Fe(r) && a.unshift(o), this._bindToObservable({
          schema: a,
          updater: Hr(n, r, c),
          data: t
        });
      } else if (r == "style" && typeof s[0] != "string")
        this._renderStyleAttribute(s[0], t);
      else {
        i && o && Fe(r) && s.unshift(o);
        const a = s.map((l) => l && (l.value || l)).reduce((l, h) => l.concat(h), []).reduce(st, "");
        $(a) || n.setAttributeNS(c, r, a);
      }
    }
  }
  /**
   * Renders the `style` attribute of an HTML element based on
   * {@link module:ui/template~Template#attributes}.
   *
   * A style attribute is an object with static values:
   *
   * ```ts
   * attributes: {
   * 	style: {
   * 		color: 'red'
   * 	}
   * }
   * ```
   *
   * or values bound to {@link module:ui/model~Model} properties:
   *
   * ```ts
   * attributes: {
   * 	style: {
   * 		color: bind.to( ... )
   * 	}
   * }
   * ```
   *
   * Note: The `style` attribute is rendered without setting the namespace. It does not seem to be
   * needed.
   *
   * @param styles Styles located in `attributes.style` of {@link module:ui/template~TemplateDefinition}.
   * @param data Rendering data.
   */
  _renderStyleAttribute(t, n) {
    const i = n.node;
    for (const r in t) {
      const o = t[r];
      R(o) ? this._bindToObservable({
        schema: [o],
        updater: Wr(i, r),
        data: n
      }) : i.style[r] = o;
    }
  }
  /**
   * Recursively renders HTML element's children from {@link module:ui/template~Template#children}.
   *
   * @param data Rendering data.
   */
  _renderElementChildren(t) {
    const n = t.node, i = t.intoFragment ? document.createDocumentFragment() : n, r = t.isApplying;
    let o = 0;
    for (const s of this.children)
      if (oe(s)) {
        if (!r) {
          s.setParent(n);
          for (const c of s)
            i.appendChild(c.element);
        }
      } else if (z(s))
        r || (s.isRendered || s.render(), i.appendChild(s.element));
      else if (Be(s))
        i.appendChild(s);
      else if (r) {
        const c = t.revertData, a = Ie();
        c.children.push(a), s._renderNode({
          intoFragment: !1,
          node: i.childNodes[o++],
          isApplying: !0,
          revertData: a
        });
      } else
        i.appendChild(s.render());
    t.intoFragment && n.appendChild(i);
  }
  /**
   * Activates `on` event listeners from the {@link module:ui/template~TemplateDefinition}
   * on an HTML element.
   *
   * @param data Rendering data.
   */
  _setUpListeners(t) {
    if (this.eventListeners)
      for (const n in this.eventListeners) {
        const i = this.eventListeners[n].map((r) => {
          const [o, s] = n.split("@");
          return r.activateDomEventListener(o, s, t);
        });
        t.revertData && t.revertData.bindings.push(i);
      }
  }
  /**
   * For a given {@link module:ui/template~TemplateValueSchema} containing {@link module:ui/template~TemplateBinding}
   * activates the binding and sets its initial value.
   *
   * Note: {@link module:ui/template~TemplateValueSchema} can be for HTML element attributes or
   * text node `textContent`.
   *
   * @param options Binding options.
   * @param options.updater A function which updates the DOM (like attribute or text).
   * @param options.data Rendering data.
   */
  _bindToObservable({ schema: t, updater: n, data: i }) {
    const r = i.revertData;
    rt(t, n, i);
    const o = t.filter((s) => !$(s)).filter((s) => s.observable).map((s) => s.activateAttributeListener(t, n, i));
    r && r.bindings.push(o);
  }
  /**
   * Reverts {@link module:ui/template~RenderData#revertData template data} from a node to
   * return it to the original state.
   *
   * @param node A node to be reverted.
   * @param revertData An object that stores information about what changes have been made by
   * {@link #apply} to the node. See {@link module:ui/template~RenderData#revertData} for more information.
   */
  _revertTemplateFromNode(t, n) {
    for (const r of n.bindings)
      for (const o of r)
        o();
    if (n.text) {
      t.textContent = n.text;
      return;
    }
    const i = t;
    for (const r in n.attributes) {
      const o = n.attributes[r];
      o === null ? i.removeAttribute(r) : i.setAttribute(r, o);
    }
    for (let r = 0; r < n.children.length; ++r)
      this._revertTemplateFromNode(i.childNodes[r], n.children[r]);
  }
}
class M {
  /**
   * Creates an instance of the {@link module:ui/template~TemplateBinding} class.
   *
   * @param def The definition of the binding.
   */
  constructor(t) {
    this.attribute = t.attribute, this.observable = t.observable, this.emitter = t.emitter, this.callback = t.callback;
  }
  /**
   * Returns the value of the binding. It is the value of the {@link module:ui/template~TemplateBinding#attribute} in
   * {@link module:ui/template~TemplateBinding#observable}. The value may be processed by the
   * {@link module:ui/template~TemplateBinding#callback}, if such has been passed to the binding.
   *
   * @param node A native DOM node, passed to the custom {@link module:ui/template~TemplateBinding#callback}.
   * @returns The value of {@link module:ui/template~TemplateBinding#attribute} in
   * {@link module:ui/template~TemplateBinding#observable}.
   */
  getValue(t) {
    const n = this.observable[this.attribute];
    return this.callback ? this.callback(n, t) : n;
  }
  /**
   * Activates the listener which waits for changes of the {@link module:ui/template~TemplateBinding#attribute} in
   * {@link module:ui/template~TemplateBinding#observable}, then updates the DOM with the aggregated
   * value of {@link module:ui/template~TemplateValueSchema}.
   *
   * @param schema A full schema to generate an attribute or text in the DOM.
   * @param updater A DOM updater function used to update the native DOM attribute or text.
   * @param data Rendering data.
   * @returns A function to sever the listener binding.
   */
  activateAttributeListener(t, n, i) {
    const r = () => rt(t, n, i);
    return this.emitter.listenTo(this.observable, `change:${this.attribute}`, r), () => {
      this.emitter.stopListening(this.observable, `change:${this.attribute}`, r);
    };
  }
}
class zr extends M {
  constructor(t) {
    super(t), this.eventNameOrFunction = t.eventNameOrFunction;
  }
  /**
   * Activates the listener for the native DOM event, which when fired, is propagated by
   * the {@link module:ui/template~TemplateBinding#emitter}.
   *
   * @param domEvtName The name of the native DOM event.
   * @param domSelector The selector in the DOM to filter delegated events.
   * @param data Rendering data.
   * @returns A function to sever the listener binding.
   */
  activateDomEventListener(t, n, i) {
    const r = (o, s) => {
      (!n || s.target.matches(n)) && (typeof this.eventNameOrFunction == "function" ? this.eventNameOrFunction(s) : this.observable.fire(this.eventNameOrFunction, s));
    };
    return this.emitter.listenTo(i.node, t, r), () => {
      this.emitter.stopListening(i.node, t, r);
    };
  }
}
class it extends M {
  constructor(t) {
    super(t), this.valueIfTrue = t.valueIfTrue;
  }
  /**
   * @inheritDoc
   */
  getValue(t) {
    const n = super.getValue(t);
    return $(n) ? !1 : this.valueIfTrue || !0;
  }
}
function R(e) {
  return e ? (e.value && (e = e.value), Array.isArray(e) ? e.some(R) : e instanceof M) : !1;
}
function Gr(e, t) {
  return e.map((n) => n instanceof M ? n.getValue(t) : n);
}
function rt(e, t, { node: n }) {
  const i = Gr(e, n);
  let r;
  e.length == 1 && e[0] instanceof it ? r = i[0] : r = i.reduce(st, ""), $(r) ? t.remove() : t.set(r);
}
function Kr(e) {
  return {
    set(t) {
      e.textContent = t;
    },
    remove() {
      e.textContent = "";
    }
  };
}
function Hr(e, t, n) {
  return {
    set(i) {
      e.setAttributeNS(n, t, i);
    },
    remove() {
      e.removeAttributeNS(n, t);
    }
  };
}
function Wr(e, t) {
  return {
    set(n) {
      e.style[t] = n;
    },
    remove() {
      e.style[t] = null;
    }
  };
}
function Oe(e) {
  return Ur(e, (n) => {
    if (n && (n instanceof M || re(n) || z(n) || oe(n)))
      return n;
  });
}
function Pe(e) {
  if (typeof e == "string" ? e = Yr(e) : e.text && Jr(e), e.on && (e.eventListeners = Xr(e.on), delete e.on), !e.text) {
    e.attributes && qr(e.attributes);
    const t = [];
    if (e.children)
      if (oe(e.children))
        t.push(e.children);
      else
        for (const n of e.children)
          re(n) || z(n) || Be(n) ? t.push(n) : t.push(new L(n));
    e.children = t;
  }
  return e;
}
function qr(e) {
  for (const t in e)
    e[t].value && (e[t].value = ee(e[t].value)), ot(e, t);
}
function Xr(e) {
  for (const t in e)
    ot(e, t);
  return e;
}
function Yr(e) {
  return {
    text: [e]
  };
}
function Jr(e) {
  e.text = ee(e.text);
}
function ot(e, t) {
  e[t] = ee(e[t]);
}
function st(e, t) {
  return $(t) ? e : $(e) ? t : `${e} ${t}`;
}
function Le(e, t) {
  for (const n in t)
    e[n] ? e[n].push(...t[n]) : e[n] = t[n];
}
function at(e, t) {
  if (t.attributes && (e.attributes || (e.attributes = {}), Le(e.attributes, t.attributes)), t.eventListeners && (e.eventListeners || (e.eventListeners = {}), Le(e.eventListeners, t.eventListeners)), t.text && e.text.push(...t.text), t.children && t.children.length) {
    if (e.children.length != t.children.length)
      throw new j("ui-template-extend-children-mismatch", e);
    let n = 0;
    for (const i of t.children)
      at(e.children[n++], i);
  }
}
function $(e) {
  return !e && e !== 0;
}
function z(e) {
  return e instanceof k;
}
function re(e) {
  return e instanceof L;
}
function oe(e) {
  return e instanceof Ue;
}
function ke(e) {
  return B(e[0]) && e[0].ns;
}
function Ie() {
  return {
    children: [],
    bindings: [],
    attributes: {}
  };
}
function Fe(e) {
  return e == "class" || e == "style";
}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class k extends lt(Q()) {
  /**
   * Creates an instance of the {@link module:ui/view~View} class.
   *
   * Also see {@link #render}.
   *
   * @param locale The localization services instance.
   */
  constructor(t) {
    super(), this.element = null, this.isRendered = !1, this.locale = t, this.t = t && t.t, this._viewCollections = new Ne(), this._unboundChildren = this.createCollection(), this._viewCollections.on("add", (n, i) => {
      i.locale = t, i.t = t && t.t;
    }), this.decorate("render");
  }
  /**
   * Shorthand for {@link module:ui/template~Template.bind}, a binding
   * {@link module:ui/template~BindChain interface} pre–configured for the view instance.
   *
   * It provides {@link module:ui/template~BindChain#to `to()`} and
   * {@link module:ui/template~BindChain#if `if()`} methods that initialize bindings with
   * observable attributes and attach DOM listeners.
   *
   * ```ts
   * class SampleView extends View {
   * 	constructor( locale ) {
   * 		super( locale );
   *
   * 		const bind = this.bindTemplate;
   *
   * 		// These {@link module:utils/observablemixin~Observable observable} attributes will control
   * 		// the state of the view in DOM.
   * 		this.set( {
   * 			elementClass: 'foo',
   * 		 	isEnabled: true
   * 		 } );
   *
   * 		this.setTemplate( {
   * 			tag: 'p',
   *
   * 			attributes: {
   * 				// The class HTML attribute will follow elementClass
   * 				// and isEnabled view attributes.
   * 				class: [
   * 					bind.to( 'elementClass' )
   * 					bind.if( 'isEnabled', 'present-when-enabled' )
   * 				]
   * 			},
   *
   * 			on: {
   * 				// The view will fire the "clicked" event upon clicking <p> in DOM.
   * 				click: bind.to( 'clicked' )
   * 			}
   * 		} );
   * 	}
   * }
   * ```
   */
  get bindTemplate() {
    return this._bindTemplate ? this._bindTemplate : this._bindTemplate = L.bind(this, this);
  }
  /**
   * Creates a new collection of views, which can be used as
   * {@link module:ui/template~Template#children} of this view.
   *
   * ```ts
   * class SampleView extends View {
   * 	constructor( locale ) {
   * 		super( locale );
   *
   * 		const child = new ChildView( locale );
   * 		this.items = this.createCollection( [ child ] );
   *
   * 		this.setTemplate( {
   * 			tag: 'p',
   *
   * 			// `items` collection will render here.
   * 			children: this.items
   * 		} );
   * 	}
   * }
   *
   * const view = new SampleView( locale );
   * view.render();
   *
   * // It will append <p><child#element></p> to the <body>.
   * document.body.appendChild( view.element );
   * ```
   *
   * @param views Initial views of the collection.
   * @returns A new collection of view instances.
   */
  createCollection(t) {
    const n = new Ue(t);
    return this._viewCollections.add(n), n;
  }
  /**
   * Registers a new child view under the view instance. Once registered, a child
   * view is managed by its parent, including {@link #render rendering}
   * and {@link #destroy destruction}.
   *
   * To revert this, use {@link #deregisterChild}.
   *
   * ```ts
   * class SampleView extends View {
   * 	constructor( locale ) {
   * 		super( locale );
   *
   * 		this.childA = new SomeChildView( locale );
   * 		this.childB = new SomeChildView( locale );
   *
   * 		this.setTemplate( { tag: 'p' } );
   *
   * 		// Register the children.
   * 		this.registerChild( [ this.childA, this.childB ] );
   * 	}
   *
   * 	render() {
   * 		super.render();
   *
   * 		this.element.appendChild( this.childA.element );
   * 		this.element.appendChild( this.childB.element );
   * 	}
   * }
   *
   * const view = new SampleView( locale );
   *
   * view.render();
   *
   * // Will append <p><childA#element><b></b><childB#element></p>.
   * document.body.appendChild( view.element );
   * ```
   *
   * **Note**: There's no need to add child views if they're already referenced in the
   * {@link #template}:
   *
   * ```ts
   * class SampleView extends View {
   * 	constructor( locale ) {
   * 		super( locale );
   *
   * 		this.childA = new SomeChildView( locale );
   * 		this.childB = new SomeChildView( locale );
   *
   * 		this.setTemplate( {
   * 			tag: 'p',
   *
   * 			// These children will be added automatically. There's no
   * 			// need to call {@link #registerChild} for any of them.
   * 			children: [ this.childA, this.childB ]
   * 		} );
   * 	}
   *
   * 	// ...
   * }
   * ```
   *
   * @param children Children views to be registered.
   */
  registerChild(t) {
    se(t) || (t = [t]);
    for (const n of t)
      this._unboundChildren.add(n);
  }
  /**
   * The opposite of {@link #registerChild}. Removes a child view from this view instance.
   * Once removed, the child is no longer managed by its parent, e.g. it can safely
   * become a child of another parent view.
   *
   * @see #registerChild
   * @param children Child views to be removed.
   */
  deregisterChild(t) {
    se(t) || (t = [t]);
    for (const n of t)
      this._unboundChildren.remove(n);
  }
  /**
   * Sets the {@link #template} of the view with with given definition.
   *
   * A shorthand for:
   *
   * ```ts
   * view.setTemplate( definition );
   * ```
   *
   * @param definition Definition of view's template.
   */
  setTemplate(t) {
    this.template = new L(t);
  }
  /**
   * {@link module:ui/template~Template.extend Extends} the {@link #template} of the view with
   * with given definition.
   *
   * A shorthand for:
   *
   * ```ts
   * Template.extend( view.template, definition );
   * ```
   *
   * **Note**: Is requires the {@link #template} to be already set. See {@link #setTemplate}.
   *
   * @param definition Definition which extends the {@link #template}.
   */
  extendTemplate(t) {
    L.extend(this.template, t);
  }
  /**
   * Recursively renders the view.
   *
   * Once the view is rendered:
   * * the {@link #element} becomes an HTML element out of {@link #template},
   * * the {@link #isRendered} flag is set `true`.
   *
   * **Note**: The children of the view:
   * * defined directly in the {@link #template}
   * * residing in collections created by the {@link #createCollection} method,
   * * and added by {@link #registerChild}
   * are also rendered in the process.
   *
   * In general, `render()` method is the right place to keep the code which refers to the
   * {@link #element} and should be executed at the very beginning of the view's life cycle.
   *
   * It is possible to {@link module:ui/template~Template.extend} the {@link #template} before
   * the view is rendered. To allow an early customization of the view (e.g. by its parent),
   * such references should be done in `render()`.
   *
   * ```ts
   * class SampleView extends View {
   * 	constructor() {
   * 		this.setTemplate( {
   * 			// ...
   * 		} );
   * 	},
   *
   * 	render() {
   * 		// View#element becomes available.
   * 		super.render();
   *
   * 		// The "scroll" listener depends on #element.
   * 		this.listenTo( window, 'scroll', () => {
   * 			// A reference to #element would render the #template and make it non-extendable.
   * 			if ( window.scrollY > 0 ) {
   * 				this.element.scrollLeft = 100;
   * 			} else {
   * 				this.element.scrollLeft = 0;
   * 			}
   * 		} );
   * 	}
   * }
   *
   * const view = new SampleView();
   *
   * // Let's customize the view before it gets rendered.
   * view.extendTemplate( {
   * 	attributes: {
   * 		class: [
   * 			'additional-class'
   * 		]
   * 	}
   * } );
   *
   * // Late rendering allows customization of the view.
   * view.render();
   * ```
   */
  render() {
    if (this.isRendered)
      throw new j("ui-view-render-already-rendered", this);
    this.template && (this.element = this.template.render(), this.registerChild(this.template.getViews())), this.isRendered = !0;
  }
  /**
   * Recursively destroys the view instance and child views added by {@link #registerChild} and
   * residing in collections created by the {@link #createCollection}.
   *
   * Destruction disables all event listeners:
   * * created on the view, e.g. `view.on( 'event', () => {} )`,
   * * defined in the {@link #template} for DOM events.
   */
  destroy() {
    this.stopListening(), this._viewCollections.map((t) => t.destroy()), this.template && this.template._revertData && this.template.revert(this.element);
  }
}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class H extends k {
  /**
   * @inheritDoc
   */
  constructor() {
    super();
    const t = this.bindTemplate;
    this.set("content", ""), this.set("viewBox", "0 0 20 20"), this.set("fillColor", ""), this.set("isColorInherited", !0), this.setTemplate({
      tag: "svg",
      ns: "http://www.w3.org/2000/svg",
      attributes: {
        class: [
          "ck",
          "ck-icon",
          // Exclude icon internals from the CSS reset to allow rich (non-monochromatic) icons
          // (https://github.com/ckeditor/ckeditor5/issues/12599).
          "ck-reset_all-excluded",
          // The class to remove the dynamic color inheritance is toggleable
          // (https://github.com/ckeditor/ckeditor5/issues/12599).
          t.if("isColorInherited", "ck-icon_inherit-color")
        ],
        viewBox: t.to("viewBox")
      }
    });
  }
  /**
   * @inheritDoc
   */
  render() {
    super.render(), this._updateXMLContent(), this._colorFillPaths(), this.on("change:content", () => {
      this._updateXMLContent(), this._colorFillPaths();
    }), this.on("change:fillColor", () => {
      this._colorFillPaths();
    });
  }
  /**
   * Updates the {@link #element} with the value of {@link #content}.
   */
  _updateXMLContent() {
    if (this.content) {
      const n = new DOMParser().parseFromString(this.content.trim(), "image/svg+xml").querySelector("svg"), i = n.getAttribute("viewBox");
      i && (this.viewBox = i);
      for (const { name: r, value: o } of Array.from(n.attributes))
        H.presentationalAttributeNames.includes(r) && this.element.setAttribute(r, o);
      for (; this.element.firstChild; )
        this.element.removeChild(this.element.firstChild);
      for (; n.childNodes.length > 0; )
        this.element.appendChild(n.childNodes[0]);
    }
  }
  /**
   * Fills all child `path.ck-icon__fill` with the `#fillColor`.
   */
  _colorFillPaths() {
    this.fillColor && this.element.querySelectorAll(".ck-icon__fill").forEach((t) => {
      t.style.fill = this.fillColor;
    });
  }
}
H.presentationalAttributeNames = [
  "alignment-baseline",
  "baseline-shift",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-rendering",
  "cursor",
  "direction",
  "display",
  "dominant-baseline",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "image-rendering",
  "letter-spacing",
  "lighting-color",
  "marker-end",
  "marker-mid",
  "marker-start",
  "mask",
  "opacity",
  "overflow",
  "paint-order",
  "pointer-events",
  "shape-rendering",
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-anchor",
  "text-decoration",
  "text-overflow",
  "text-rendering",
  "transform",
  "unicode-bidi",
  "vector-effect",
  "visibility",
  "white-space",
  "word-spacing",
  "writing-mode"
];
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class Zr extends k {
  /**
   * @inheritDoc
   */
  constructor(t) {
    super(t), this._focusDelayed = null;
    const n = this.bindTemplate, i = dt();
    this.set("ariaChecked", void 0), this.set("ariaLabel", void 0), this.set("ariaLabelledBy", `ck-editor__aria-label_${i}`), this.set("class", void 0), this.set("labelStyle", void 0), this.set("icon", void 0), this.set("isEnabled", !0), this.set("isOn", !1), this.set("isVisible", !0), this.set("isToggleable", !1), this.set("keystroke", void 0), this.set("label", void 0), this.set("role", void 0), this.set("tabindex", -1), this.set("tooltip", !1), this.set("tooltipPosition", "s"), this.set("type", "button"), this.set("withText", !1), this.set("withKeystroke", !1), this.children = this.createCollection(), this.labelView = this._createLabelView(), this.iconView = new H(), this.iconView.extendTemplate({
      attributes: {
        class: "ck-button__icon"
      }
    }), this.keystrokeView = this._createKeystrokeView(), this.bind("_tooltipString").to(this, "tooltip", this, "label", this, "keystroke", this._getTooltipString.bind(this));
    const r = {
      tag: "button",
      attributes: {
        class: [
          "ck",
          "ck-button",
          n.to("class"),
          n.if("isEnabled", "ck-disabled", (o) => !o),
          n.if("isVisible", "ck-hidden", (o) => !o),
          n.to("isOn", (o) => o ? "ck-on" : "ck-off"),
          n.if("withText", "ck-button_with-text"),
          n.if("withKeystroke", "ck-button_with-keystroke")
        ],
        role: n.to("role"),
        type: n.to("type", (o) => o || "button"),
        tabindex: n.to("tabindex"),
        "aria-label": n.to("ariaLabel"),
        "aria-labelledby": n.to("ariaLabelledBy"),
        "aria-disabled": n.if("isEnabled", !0, (o) => !o),
        "aria-checked": n.to("isOn"),
        "aria-pressed": n.to("isOn", (o) => this.isToggleable ? String(!!o) : !1),
        "data-cke-tooltip-text": n.to("_tooltipString"),
        "data-cke-tooltip-position": n.to("tooltipPosition")
      },
      children: this.children,
      on: {
        click: n.to((o) => {
          this.isEnabled ? this.fire("execute") : o.preventDefault();
        })
      }
    };
    ut.isSafari && (this._focusDelayed || (this._focusDelayed = ft(() => this.focus(), 0)), r.on.mousedown = n.to(() => {
      this._focusDelayed();
    }), r.on.mouseup = n.to(() => {
      this._focusDelayed.cancel();
    })), this.setTemplate(r);
  }
  /**
   * @inheritDoc
   */
  render() {
    super.render(), this.icon && (this.iconView.bind("content").to(this, "icon"), this.children.add(this.iconView)), this.children.add(this.labelView), this.withKeystroke && this.keystroke && this.children.add(this.keystrokeView);
  }
  /**
   * Focuses the {@link #element} of the button.
   */
  focus() {
    this.element.focus();
  }
  /**
   * @inheritDoc
   */
  destroy() {
    this._focusDelayed && this._focusDelayed.cancel(), super.destroy();
  }
  /**
   * Creates a label view instance and binds it with button attributes.
   */
  _createLabelView() {
    const t = new k(), n = this.bindTemplate;
    return t.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-button__label"
        ],
        style: n.to("labelStyle"),
        id: this.ariaLabelledBy
      },
      children: [
        {
          text: n.to("label")
        }
      ]
    }), t;
  }
  /**
   * Creates a view that displays a keystroke next to a {@link #labelView label }
   * and binds it with button attributes.
   */
  _createKeystrokeView() {
    const t = new k();
    return t.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-button__keystroke"
        ]
      },
      children: [
        {
          text: this.bindTemplate.to("keystroke", (n) => ae(n))
        }
      ]
    }), t;
  }
  /**
   * Gets the text for the tooltip from the combination of
   * {@link #tooltip}, {@link #label} and {@link #keystroke} attributes.
   *
   * @see #tooltip
   * @see #_tooltipString
   * @param tooltip Button tooltip.
   * @param label Button label.
   * @param keystroke Button keystroke.
   */
  _getTooltipString(t, n, i) {
    return t ? typeof t == "string" ? t : (i && (i = ae(i)), t instanceof Function ? t(n, i) : `${n}${i ? ` (${i})` : ""}`) : "";
  }
}
const Qr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.22509 100.22509"><g transform="translate(-25.036325,-22.233511)"><rect width="54.620625" height="10.888565" x="33.952618" y="39.922672" ry="5.4442825"/><rect width="54.620625" height="10.888565" x="64.154762" y="57.341919" ry="5.4442825"/><rect width="54.620625" height="10.888565" x="34.054344" y="75.9683" ry="5.4442825"/><rect width="54.620625" height="10.888565" x="64.256485" y="93.387543" ry="5.4442825"/></g></svg>
`;
class no extends ht {
  static get pluginName() {
    return "DefinitionList";
  }
  init() {
    const t = this.editor, n = t.t;
    this.defineSchema(), this.defineConverters(), t.commands.add("insertDefinitionList", new eo(t)), t.commands.add("indentDefinitionTerm", new Ve(t, "forward")), t.commands.add("outdentDefinitionDescription", new Ve(t, "backward")), t.ui.componentFactory.add("definitionList", (i) => {
      const r = new Zr(i);
      r.set({
        label: n("Definition list"),
        icon: Qr,
        tooltip: !0
      });
      const o = t.commands.get("insertDefinitionList");
      return r.bind("isOn").to(o, "value"), r.on("execute", () => {
        t.execute("insertDefinitionList"), t.editing.view.focus();
      }), r;
    });
  }
  afterInit() {
    const t = this.editor, n = t.commands, i = t.model, r = i.document, o = n.get("indent"), s = n.get("outdent");
    o && o.registerChildCommand(n.get("indentDefinitionTerm"), { priority: "high" }), s && s.registerChildCommand(n.get("outdentDefinitionDescription"), { priority: "lowest" }), t.editing.view.document.on("keydown", (c, a) => {
      const h = r.selection.getFirstPosition(), p = h == null ? void 0 : h.parent;
      if ((a.domEvent.key === "Enter" || a.domEvent.key === "ArrowDown") && (p != null && p.is("element", "definitionDescription"))) {
        const f = p.findAncestor("definitionList"), b = (f == null ? void 0 : f.getChild(f.childCount - 1)) === p, g = h.isAtEnd;
        f && b && g && (a.preventDefault(), c.stop(), i.change((_) => {
          const S = _.createElement("paragraph");
          _.insert(S, i.createPositionAfter(f)), _.setSelection(S, "in");
        }));
      }
      if (a.domEvent.key === "ArrowUp" && (p != null && p.is("element", "definitionTerm"))) {
        const f = p.findAncestor("definitionList"), b = (f == null ? void 0 : f.getChild(0)) === p, g = h.isAtStart;
        f && b && g && (a.preventDefault(), c.stop(), i.change((_) => {
          const S = _.createElement("paragraph");
          _.insert(S, i.createPositionBefore(f)), _.setSelection(S, "in");
        }));
      }
    });
  }
  defineSchema() {
    const t = this.editor.model.schema;
    t.register("definitionList", {
      allowWhere: "$block",
      allowContentOf: "$block",
      isBlock: !0
    }), t.register("definitionTerm", {
      allowIn: "definitionList",
      allowContentOf: "$block",
      isBlock: !0
    }), t.register("definitionDescription", {
      allowIn: "definitionList",
      allowContentOf: "$block",
      isBlock: !0
    });
  }
  defineConverters() {
    const t = this.editor.conversion;
    t.for("upcast").elementToElement({
      view: "dl",
      model: "definitionList"
    }), t.for("upcast").elementToElement({
      view: "dt",
      model: "definitionTerm"
    }), t.for("upcast").elementToElement({
      view: "dd",
      model: "definitionDescription"
    }), t.for("dataDowncast").elementToElement({
      model: "definitionList",
      view: "dl"
    }), t.for("dataDowncast").elementToElement({
      model: "definitionTerm",
      view: "dt"
    }), t.for("dataDowncast").elementToElement({
      model: "definitionDescription",
      view: "dd"
    }), t.for("editingDowncast").elementToElement({
      model: "definitionList",
      view: (n, { writer: i }) => i.createContainerElement("dl")
    }), t.for("editingDowncast").elementToElement({
      model: "definitionTerm",
      view: (n, { writer: i }) => i.createEditableElement("dt")
    }), t.for("editingDowncast").elementToElement({
      model: "definitionDescription",
      view: (n, { writer: i }) => i.createEditableElement("dd")
    });
  }
}
class eo extends Me {
  constructor(t) {
    super(t), this.value = !1;
  }
  execute() {
    var o;
    const n = this.editor.model;
    (o = n.document.selection.getFirstPosition()) != null && o.findAncestor("definitionList") || n.change((s) => {
      const c = s.createElement("definitionList"), a = s.createElement("definitionTerm"), l = s.createElement("definitionDescription");
      s.insertText("Term", a), s.insertText("Definition", l), s.append(a, c), s.append(l, c), n.insertContent(c), s.setSelection(a, "end");
    });
  }
  refresh() {
    var r;
    const i = !!((r = this.editor.model.document.selection.getFirstPosition()) != null && r.findAncestor("definitionList"));
    this.isEnabled = !0, this.value = i;
  }
}
class Ve extends Me {
  constructor(t, n) {
    super(t), this._direction = n, this._source = this._direction === "forward" ? "definitionTerm" : "definitionDescription", this._target = this._direction === "backward" ? "definitionTerm" : "definitionDescription";
  }
  refresh() {
    const i = this.editor.model.document.selection.getFirstPosition(), r = i == null ? void 0 : i.parent;
    this.isEnabled = (r == null ? void 0 : r.is("element", this._source)) ?? !1;
  }
  execute() {
    this._transformElement(this._source, this._target, () => {
    });
  }
  _transformElement(t, n, i) {
    const r = this.editor.model, s = r.document.selection.getFirstPosition(), c = s == null ? void 0 : s.parent;
    return c != null && c.is("element", t) ? (r.change((a) => {
      const l = a.createElement(n);
      a.insert(l, c, "after");
      const h = a.createRangeIn(c);
      a.move(h, a.createPositionAt(l, 0)), a.remove(c), a.setSelection(l, "in");
    }), i(), !0) : !1;
  }
}
export {
  no as DefinitionList,
  no as default
};
