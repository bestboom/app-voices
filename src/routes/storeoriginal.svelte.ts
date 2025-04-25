import { browser } from "$app/environment";
import { detectWebGPU } from "$lib/client/utils";
import {
  getRandomQuote,
  modelsMap,
  voicesMap,
  type LangId,
  type ModelId,
} from "$lib/shared/resources";
import { createExactFormula } from "$lib/client/utils/myVoice";

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

// Create predefined formula string with exact weights
const predefinedFormulaString = createExactFormula();

export const defaultProfile: ProfileData = {
  name: "default",
  text: getRandomQuote(),
  lang: "en-us", // Default language
  voiceMode: "advanced", // Always use advanced mode to support formula
  voiceFormula: predefinedFormulaString,
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

export const loadProfile = (newProfile: ProfileData) => {
  const keys = Object.keys(newProfile);
  for (const key of keys) {
    // @ts-ignore
    profile[key] = newProfile[key];
  }
};
