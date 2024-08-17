import { ISiteConfig } from "./type";

export const NyaaConfig: ISiteConfig = {
  name: "nyaa",
  sites: ["nyaa.si"],
  table: "table.torrent-list",
  col: {
    magnet: "a[href^='magnet']",
  },
};
