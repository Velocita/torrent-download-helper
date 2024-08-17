import { ISiteConfig } from "./type";

export const DmhyConfig: ISiteConfig = {
  name: "dmhy",
  sites: ["share.dmhy.org"],
  table: "#topic_list",
  col: {
    magnet: "a[href^='magnet']",
  },
};
