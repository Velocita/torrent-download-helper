// ==UserScript==
// @name         torrent-download-helper
// @namespace    Velocita/torrent-download-helper
// @version      0.1.0
// @author       Velocita
// @description  Support batch select and copy magnet link in torrent site
// @match        https://share.dmhy.org/
// @match        https://nyaa.si/
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.38/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const a=document.createElement("style");a.textContent=t,document.head.append(a)})(" .toolbar-btn[data-v-cf9ca68a]{cursor:pointer}.toolbar-btn+.toolbar-btn[data-v-cf9ca68a]{margin-left:8px} ");

(function (vue) {
  'use strict';

  const DmhyConfig = {
    name: "dmhy",
    sites: ["share.dmhy.org"],
    table: "#topic_list",
    col: {
      magnet: "a[href^='magnet']"
    }
  };
  const NyaaConfig = {
    name: "nyaa",
    sites: ["nyaa.si"],
    table: "table.torrent-list",
    col: {
      magnet: "a[href^='magnet']"
    }
  };
  const configs = [DmhyConfig, NyaaConfig];
  function loadConfig() {
    const host = location.hostname;
    for (const config of configs) {
      for (const site of config.sites) {
        if (site === host) {
          return config;
        }
      }
    }
    return null;
  }
  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_setClipboard = /* @__PURE__ */ (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
  const store = vue.reactive({
    all: [],
    selected: [],
    toggle(magnet) {
      if (this.selected.includes(magnet)) {
        this.selected = this.selected.filter((mag) => mag !== magnet);
      } else {
        this.selected = [...this.selected, magnet];
      }
    },
    selectAll() {
      this.selected = this.all.slice();
    },
    clear() {
      this.selected = [];
    },
    inverse() {
      this.selected = this.all.filter((mag) => !this.selected.includes(mag));
    },
    copy() {
      const content = this.all.filter((mag) => this.selected.includes(mag)).join("\n");
      _GM_setClipboard(content, "{ type: 'text', mimetype: 'text/plain'}");
    }
  });
  const _hoisted_1$1 = ["checked", "indeterminate"];
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "TotalCheckBox",
    setup(__props) {
      const total = vue.computed(() => store.all.length);
      const isChecked = vue.computed(
        () => total.value !== 0 && total.value === store.selected.length
      );
      const isIndeterminate = vue.computed(
        () => total.value !== 0 && store.selected.length > 0 && store.selected.length < total.value
      );
      function onClick() {
        if (isChecked.value) {
          store.clear();
        } else {
          store.selectAll();
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("input", {
          type: "checkbox",
          checked: isChecked.value,
          indeterminate: isIndeterminate.value,
          onClick
        }, null, 8, _hoisted_1$1);
      };
    }
  });
  const _hoisted_1 = ["checked"];
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "CheckBox",
    props: {
      index: {},
      magnet: {}
    },
    setup(__props) {
      const { index, magnet } = __props;
      const checked = vue.computed(() => store.selected.includes(magnet));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("input", {
          type: "checkbox",
          checked: checked.value
        }, null, 8, _hoisted_1);
      };
    }
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "Toolbar",
    props: {
      name: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("span", {
            class: "toolbar-btn",
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => vue.unref(store).selectAll && vue.unref(store).selectAll(...args))
          }, "全选"),
          vue.createElementVNode("span", {
            class: "toolbar-btn",
            onClick: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => vue.unref(store).inverse && vue.unref(store).inverse(...args))
          }, "反选"),
          vue.createElementVNode("span", {
            class: "toolbar-btn",
            onClick: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => vue.unref(store).clear && vue.unref(store).clear(...args))
          }, "清空"),
          vue.createElementVNode("span", {
            class: "toolbar-btn",
            onClick: _cache[3] || (_cache[3] = //@ts-ignore
            (...args) => vue.unref(store).copy && vue.unref(store).copy(...args))
          }, "复制")
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const Toolbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf9ca68a"]]);
  function init() {
    var _a, _b;
    const config = loadConfig();
    if (config) {
      let insertHead = function() {
        const head = table == null ? void 0 : table.querySelector("thead tr");
        const th = document.createElement("th");
        th.style.width = "20px";
        head == null ? void 0 : head.insertAdjacentElement("afterbegin", th);
        vue.createApp(_sfc_main$2).mount(th);
      }, insertRow = function() {
        const rows = Array.from((table == null ? void 0 : table.querySelectorAll("tbody tr")) || []);
        rows.forEach((row, index) => {
          var _a2;
          const td = document.createElement("td");
          td.style.width = "20px";
          row.insertAdjacentElement("afterbegin", td);
          const { magnet = "" } = (config == null ? void 0 : config.col) || {};
          const m = ((_a2 = row.querySelector(magnet)) == null ? void 0 : _a2.href) || "";
          store.all.push(m);
          row.addEventListener("click", () => {
            store.toggle(m);
          });
          vue.createApp(_sfc_main$1, {
            index,
            magnet: m
          }).mount(td);
        });
      };
      const table = document.querySelector(config.table);
      if (!table) {
        console.error("get table error");
        return;
      }
      insertHead();
      insertRow();
      if (config.name === "dmhy") {
        const container = (_a = table.parentElement) == null ? void 0 : _a.parentElement;
        if (container) {
          const div = document.createElement("div");
          div.className = "nav_title";
          container.insertAdjacentElement("afterbegin", div);
          vue.createApp(Toolbar, { name: "dmhy" }).mount(div);
        }
      }
      if (config.name === "nyaa") {
        const container = (_b = table.parentElement) == null ? void 0 : _b.parentElement;
        if (container) {
          const div = document.createElement("div");
          container.insertAdjacentElement("afterbegin", div);
          vue.createApp(Toolbar, { name: "nyaa" }).mount(div);
        }
        _GM_addStyle(`
          table.torrent-list td:first-child { padding: 0 8px; }
          table.torrent-list td:nth-child(2) { padding: 0 4px !important; }
        `);
      }
    }
  }
  init();

})(Vue);