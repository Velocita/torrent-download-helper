import { GM_setClipboard } from "$";
import { reactive } from "vue";

interface IStore {
  all: string[];
  selected: string[];
  toggle: (magnet: string) => void;
  selectAll: () => void;
  clear: () => void;
  inverse: () => void;
  copy: () => void;
}

export const store = reactive<IStore>({
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
    const content = this.all
      .filter((mag) => this.selected.includes(mag))
      .join("\n");
    GM_setClipboard(content, "{ type: 'text', mimetype: 'text/plain'}");
  },
});
