// src/lib/client/utils/myVoice.ts

/**
 * Preset voice formulas
 * Each preset defines a weighted blend of available voice IDs.
 * Add new presets below — they’ll automatically be available
 * everywhere via PRESET_FORMULAS and createExactFormula().
 */
export const PRESET_FORMULAS = {
  "verse": {
    "af_sky": 4 / 128,
    "af_heart": 10 / 128,
    "af_river": 3 / 128,
    "am_fenrir": 13 / 128,
    "am_liam": 15 / 128,
    "am_eric": 10 / 128,
    "bf_alice": 5 / 128,
    "bm_fable": 10 / 128,
    "am_adam": 58 / 128,
  },

  "techio": {
    "af_sky": 4 / 128,
    "af_heart": 15 / 128,
    "af_river": 3 / 128,
    "am_fenrir": 13 / 128,
    "am_liam": 50 / 128,
    "am_eric": 23 / 128,
    "bf_alice": 5 / 128,
    "bm_fable": 10 / 128,
    "af_sarah": 5 / 128,
  },
  "history 1": {
    "af_sky": 1 / 128,
    "af_heart": 6 / 128,
    "af_river": 2 / 128,
    "am_fenrir": 6 / 128,
    "am_liam": 7 / 128,
    "am_eric": 5 / 128,
    "am_michael": 28 / 128,
    "bm_daniel": 29 / 128,
    "af_sarah": 4 / 128,
    "bm_george": 19 / 128,
    "am_adam": 21 / 128,
  },
} as const;

/**
 * Type representing all preset keys (e.g. "verse", "techio", "history 1").
 */
export type PresetKey = keyof typeof PRESET_FORMULAS;

/**
 * Returns a weighted voice formula string for a given preset.
 * Example output: "af_sky*0.03125 + am_liam*0.390625 + ..."
 */
export function createExactFormula(preset: PresetKey = "techio"): string {
  const formula = PRESET_FORMULAS[preset];
  return Object.entries(formula)
    .map(([voiceId, weight]) => `${voiceId}*${weight}`)
    .join(" + ");
}

/**
 * Returns a list of all available preset keys.
 * (Useful for dynamically generating dropdowns in the UI.)
 */
export function listAllPresets(): PresetKey[] {
  return Object.keys(PRESET_FORMULAS) as PresetKey[];
}





  //   "techio": {
  //   "af_sky": 1/128,
  //   "af_heart": 5/128,
  //   "af_river": 2/128,
  //   "am_fenrir": 10/128,
  //   "am_liam": 18/128,
  //   "am_eric": 15/128,
  //   "am_michael": 12/128,
  //   "bm_daniel": 37/128,
  //   "af_sarah": 4/128,
  //   "bm_george": 13/128,
  //   "am_adam": 11/128,
  // }