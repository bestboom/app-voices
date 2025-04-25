// src/lib/client/utils/adjustVoiceWeights.ts
import { PREDEFINED_FORMULA } from './myVoice';

// Convert your formula to number-based weights
const fixedWeights: Record<string, number> = Object.entries(PREDEFINED_FORMULA)
  .reduce((acc, [voice, weight]) => ({
    ...acc,
    [voice]: Number(weight)
  }), {});

export function adjustVoiceWeights(): Record<string, number> {
  // Simply return the predefined weights
  return fixedWeights;
}