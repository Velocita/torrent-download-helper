import { DmhyConfig } from "./dmhy";
import { NyaaConfig } from "./nyaa";

const configs = [DmhyConfig, NyaaConfig];

export function loadConfig() {
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
