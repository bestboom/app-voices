import type { VoiceId } from "../resources";
import type { VoiceWeight } from "./combineVoices";

/**
 * Parses a voice formula into an array of voice weights.
 *
 * The formula must follow the pattern:
 *    voice1*weight1 + voice2*weight2 + ... + voiceN*weightN
 *
 * - Voice IDs may include alphanumeric characters, hyphens (-) and underscores (_).
 * - Each weight must be a number between 0 and 1.
 * - If a single voice is provided without an asterisk, it is assumed to have weight 1.
 *
 * @param {string} formula - The voice formula, e.g. "voice1*0.3 + voice-2*0.7".
 * @returns {VoiceWeight[]} An array of objects with voiceId and weight.
 * @throws {Error} If the formula is empty, contains invalid characters or format,
 *                 or if the sum of weights does not equal 1.
 */
export function parseVoiceFormula(formula: string): VoiceWeight[] {
  // Remove all whitespace characters
  formula = formula.replace(/\s+/g, "");
  if (formula === "") {
    throw new Error("Voice or voice formula cannot be empty");
  }

  // Allowed characters pattern
  const allowedChars = /^[A-Za-z0-9\-\_.\*\+]+$/;
  if (!allowedChars.test(formula)) {
    throw new Error(
      "Invalid formula. Only alphanumeric characters, hyphens (-), underscores (_), " +
      "periods (.), asterisks (*) and plus signs (+) are allowed"
    );
  }

  // Split terms by plus sign
  const terms = formula.split("+").filter((term) => term !== "");

  // Handle single voice without asterisk
  if (terms.length === 0 && !formula.includes("*")) {
    return [{ voiceId: formula as VoiceId, weight: 1 }];
  }

  if (terms.length === 1 && !terms[0].includes("*")) {
    return [{ voiceId: terms[0] as VoiceId, weight: 1 }];
  }

  const voices: VoiceWeight[] = [];
  let totalWeight = 0;

  terms.forEach((term, index) => {
    if (!term.includes("*")) {
      throw new Error(
        `Term ${index + 1} ("${term}") is invalid. ` +
        `Each term must contain an asterisk (*) separating voice and weight`
      );
    }

    const parts = term.split("*");
    if (parts.length !== 2 || parts[0] === "" || parts[1] === "") {
      throw new Error(
        `Term ${index + 1} ("${term}") format is incorrect. Expected: voice*weight`
      );
    }

    const voiceId = parts[0];
    const weight = parseFloat(parts[1]);

    if (isNaN(weight)) {
      throw new Error(`Weight for voice "${voiceId}" is not a valid number`);
    }

    if (weight < 0 || weight > 1) {
      throw new Error(
        `Weight for voice "${voiceId}" must be between 0 and 1, got ${weight}`
      );
    }

    // Preserve 4 decimal places for precision
    const preciseWeight = Number(weight.toFixed(6));
    totalWeight += preciseWeight;
    
    voices.push({
      voiceId: voiceId as VoiceId,
      weight: preciseWeight
    });
  });

  // Allow 0.01% tolerance for floating point errors
  const EPSILON = 0.0001;
  if (Math.abs(totalWeight - 1) > EPSILON) {
    throw new Error(
      `The sum of weights must be 100% but is ${(totalWeight * 100).toFixed(4)}%`
    );
  }

  return voices;
}

/**
 * Serializes an array of voice weights back into its formula string representation.
 *
 * The resulting string follows the pattern:
 *    voice1*weight1 + voice2*weight2 + ... + voiceN*weightN
 *
 * @param {VoiceWeight[]} voiceWeights - Array of voice weight objects.
 * @returns {string} The serialized voice formula.
 */
export function serializeVoiceFormula(voiceWeights: VoiceWeight[]): string {
  return voiceWeights
    .sort((a, b) => b.weight - a.weight)
    .filter((vw) => vw.weight > 0)
    .map((vw) => `${vw.voiceId}*${vw.weight.toFixed(4)}`)
    .join(" + ");
}