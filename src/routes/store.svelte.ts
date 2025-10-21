// src/lib/client/store.svelte.ts
import { browser } from "$app/environment";
import { detectWebGPU } from "$lib/client/utils";
import {
  getRandomQuote,
  modelsMap,
  type LangId,
  type ModelId,
} from "$lib/shared/resources";
import {
  PRESET_FORMULAS,
  createExactFormula,
  type PresetKey,
} from "$lib/client/utils/myVoice";

export interface ProfileData {
  name: string;
  text: string;
  lang: LangId;
  voiceMode: "simple" | "advanced";
  voiceFormula: string; // can be empty string when not chosen
  model: ModelId;
  speed: number;
  format: "mp3" | "wav";
  acceleration: "cpu" | "webgpu";
  executionPlace: "browser" | "api";
  apiBaseUrl: string;
  apiKey: string;
}

function getCurrentHost(): string {
  if (!browser) return "";
  return `${window.location.protocol}//${window.location.host}`;
}

export const defaultProfile: ProfileData = {
  name: "default",
  text: getRandomQuote(),
  lang: "en-us",
  voiceMode: "advanced",
  // Start empty so user must choose
  voiceFormula: "",
  model: modelsMap.model.id,
  speed: 1,
  format: "mp3",
  acceleration: detectWebGPU() ? "webgpu" : "cpu",
  executionPlace: "browser",
  apiBaseUrl: `${getCurrentHost()}/api/v1`,
  apiKey: "",
};

export const profile: ProfileData = $state({
  ...defaultProfile,
});

/**
 * Returns which preset matches a formula.
 * If formula is empty or no preset matches, returns the empty string "".
 */
export function getCurrentPreset(formula: string): PresetKey | "" {
  if (!formula) return "";
  const presets = Object.keys(PRESET_FORMULAS) as PresetKey[];
  const match = presets.find((preset) => createExactFormula(preset) === formula);
  return match ?? "";
}

export function loadProfile(newProfile: ProfileData) {
  Object.assign(profile, newProfile);
}
