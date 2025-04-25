import { browser } from "$app/environment";
import { detectWebGPU } from "$lib/client/utils";
import {
  getRandomQuote,
  modelsMap,
  voicesMap,
  type LangId,
  type ModelId,
} from "$lib/shared/resources";
import { PRESET_FORMULAS, createExactFormula } from "$lib/client/utils/myVoice";

export interface ProfileData {
  name: string;
  text: string;
  lang: LangId;
  voiceMode: "simple" | "advanced";
  voiceFormula: string;
  model: ModelId;
  speed: number;
  format: "mp3" | "wav";
  acceleration: "cpu" | "webgpu";
  executionPlace: "browser" | "api";
  apiBaseUrl: string;
  apiKey: string;
}

function getCurrentHost() {
  if (!browser) return "";
  return `${window.location.protocol}//${window.location.host}`;
}

export const defaultProfile: ProfileData = {
  name: "default",
  text: getRandomQuote(),
  lang: "en-us",
  voiceMode: "advanced",
  voiceFormula: createExactFormula('techio'), // Explicit default
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

// Add this function to help find current preset
export function getCurrentPreset(formula: string): keyof typeof PRESET_FORMULAS {
  const presets = Object.keys(PRESET_FORMULAS) as Array<keyof typeof PRESET_FORMULAS>;
  return presets.find(preset => createExactFormula(preset) === formula) || 'techio';
}

export const loadProfile = (newProfile: ProfileData) => {
  const keys = Object.keys(newProfile);
  for (const key of keys) {
    // @ts-ignore
    profile[key] = newProfile[key];
  }
};