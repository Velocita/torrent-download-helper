import { createApp } from "vue";
import "./style.css";
import { loadConfig } from "./site";
import TotalCheckBox from "./components/TotalCheckBox.vue";
import CheckBox from "./components/CheckBox.vue";
import { GM_addStyle } from "$";
import { store } from "./store";
import Toolbar from "./components/Toolbar.vue";

function init() {
  const config = loadConfig();

  if (config) {
    const table = document.querySelector(config.table);
    if (!table) {
      console.error("get table error");
      return;
    }

    function insertHead() {
      const head = table?.querySelector("thead tr");
      const th = document.createElement("th");
      th.style.width = "20px";
      head?.insertAdjacentElement("afterbegin", th);
      createApp(TotalCheckBox).mount(th);
    }

    function insertRow() {
      const rows = Array.from(table?.querySelectorAll("tbody tr") || []);
      rows.forEach((row, index) => {
        const td = document.createElement("td");
        td.style.width = "20px";
        row.insertAdjacentElement("afterbegin", td);

        // get data
        const { magnet = "" } = config?.col || {};
        const m = (row.querySelector(magnet) as any)?.href || "";

        store.all.push(m);
        row.addEventListener("click", () => {
          store.toggle(m);
        });

        createApp(CheckBox, {
          index,
          magnet: m,
        }).mount(td);
      });
    }

    insertHead();

    insertRow();

    if (config.name === "dmhy") {
      const container = table.parentElement?.parentElement;
      if (container) {
        const div = document.createElement("div");
        div.className = "nav_title";
        container.insertAdjacentElement("afterbegin", div);
        createApp(Toolbar, { name: "dmhy" }).mount(div);
      }
    }

    if (config.name === "nyaa") {
      const container = table.parentElement?.parentElement;
      if (container) {
        const div = document.createElement("div");
        container.insertAdjacentElement("afterbegin", div);
        createApp(Toolbar, { name: "nyaa" }).mount(div);
      }

      GM_addStyle(`
          table.torrent-list td:first-child { padding: 0 8px; }
          table.torrent-list td:nth-child(2) { padding: 0 4px !important; }
        `);
    }
  }
}

init();
