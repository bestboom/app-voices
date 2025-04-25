export const PRESET_FORMULAS = {
  // Add your two presets here
  "verse": {
    "af_sky": 4/128,      //5
    "af_heart": 10/128,   
    "af_river": 3/128,    
    "am_fenrir": 13/128,  //14
    "am_liam": 15/128,    //48
    "am_eric": 10/128,    //22
    "bf_alice": 5/128,    
    "bm_fable": 10/128,    
    "am_adam": 58/128, 
  },
  // Keep original voices available if needed
  "techio": {
    "af_sky": 4/128,
    "af_heart": 15/128,
    "af_river": 3/128,
    "am_fenrir": 13/128,
    "am_liam": 50/128,
    "am_eric": 23/128,
    "bf_alice": 5/128,
    "bm_fable": 10/128,
    "af_sarah": 5/128,
  }
} as const;

// Verify all presets
export type PresetKey = keyof typeof PRESET_FORMULAS;

// Updated helper function with type safety
export function createExactFormula(preset: PresetKey = 'techio'): string {
  const formula = PRESET_FORMULAS[preset];
  return Object.entries(formula)
    .map(([voiceId, weight]) => `${voiceId}*${weight}`)
    .join(" + ");
}