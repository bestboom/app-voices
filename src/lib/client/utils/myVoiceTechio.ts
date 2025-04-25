// // Replace with your desired voice IDs and weights (sum must = 1)
// export const PREDEFINED_FORMULA = {
//   "af_sky": 0.17, 
//   "af_heart": 0.1,
//   "am_fenrir": 0.33, 
//   "am_liam": 0.32, 
//   "am_eric": 0.08   // Japanese voice
// } as const;

// Use fractions that can be represented exactly in binary
// export const PREDEFINED_FORMULA = {
//   "af_sky": 0.171875,    // 11/64
//   "af_river": 0.09375,    // 3/32
//   "am_fenrir": 0.328125,  // 21/64
//   "am_liam": 0.3203125,   // 41/128
//   "am_eric": 0.0859375    // 11/128
// } as const;


// export const PREDEFINED_FORMULA = {
//   "af_sky": 0.1015625,
//   "af_river": 0.078125,
//   "am_fenrir": 0.25,
//   "am_liam": 0.3671875,
//   "am_eric": 0.203125
// } as const;

// Its formula no.1 
// export const PREDEFINED_FORMULA = {
//   "af_sky": 13/128,    // ≈ 0.1015625 (10.16%)
//   "af_river": 10/128,  // ≈ 0.078125 (7.81%)
//   "am_fenrir": 32/128, // = 0.25 (25%)
//   "am_liam": 47/128,   // ≈ 0.3671875 (36.72%)
//   "am_eric": 26/128    // ≈ 0.203125 (20.31%)
// } as const;

// its formula no 2 with one british (alice) voice
// export const PREDEFINED_FORMULA = {
//   // Original voices
//   "af_sky": 10/128,    // 7.8125% (target: 7.63%)
//   "af_river": 10/128,    // 6.25% (target: 6.14%)
//   "am_fenrir": 31/128,  // 24.21875% (target: 24%)
//   "am_liam": 49/128,    // 35.9375% (target: 36%)
//   "am_eric": 16/128,    // 18.75% (target: 19%)
//   "bf_alice": 12/128     // 7.03125% (target: 7.23%)
// } as const;


// its formula looks good but not final
// export const PREDEFINED_FORMULA = {
//   // Original voices
//   "af_sky": 11/128,    // 7.8125% (target: 7.63%)
//   "af_river": 10/128,    // 6.25% (target: 6.14%)
//   "am_fenrir": 30/128,  // 24.21875% (target: 24%)
//   "am_liam": 50/128,    // 35.9375% (target: 36%)
//   "am_eric": 12/128,    // 18.75% (target: 19%)
//   "bf_alice": 9/128,    // 7.03125% (target: 7.23%)
//   "bm_fable": 6/128    // 18.75% (target: 19%)
// } as const;


// much better now
// export const PREDEFINED_FORMULA = {
//   // Original voices
//   "af_sky": 10/128,    // 7.8125% (target: 7.63%)
//   "af_river": 10/128,    // 6.25% (target: 6.14%)
//   "am_fenrir": 30/128,  // 24.21875% (target: 24%)
//   "am_liam": 50/128,    // 35.9375% (target: 36%)
//   "am_eric": 15/128,    // 18.75% (target: 19%)
//   "bf_alice": 8/128,    // 7.03125% (target: 7.23%)
//   "bm_fable": 5/128    // 18.75% (target: 19%)
// } as const;


// adding 2 new  --- good ha
// export const PREDEFINED_FORMULA = {
//   // Original voices
//   "af_sky": 7/128,   
//   "af_heart": 17/128,   //16
//   "af_river": 4/128,    
//   "am_fenrir": 13/128,   //14
//   "am_liam": 45/128, 
//   "am_eric": 21/128,    //22
//   "bf_alice": 5/128,    
//   "bm_fable": 9/128,    //8
//   "af_sarah": 7/128,  
// } as const;



// its passed by AQ  ---- finally
export const PREDEFINED_FORMULA = {
    // Original voices
    "af_sky": 4/128,      //5
    "af_heart": 15/128,   
    "af_river": 3/128,    
    "am_fenrir": 13/128,  //14
    "am_liam": 50/128,    //48
    "am_eric": 23/128,    //22
    "bf_alice": 5/128,    
    "bm_fable": 10/128,    
    "af_sarah": 5/128,    
  } as const;
  
  
  
  
  // Verify programmatically
  const sum = Object.values(PREDEFINED_FORMULA).reduce((a, b) => a + b, 0);
  console.assert(Math.abs(sum - 1) < 1e-10, `Sum is ${sum * 100}%`);
  
  
  // // Helper function to create exact voice formula without rounding
  export function createExactFormula(): string {
    return Object.entries(PREDEFINED_FORMULA)
      .map(([voiceId, weight]) => `${voiceId}*${weight}`)
      .join(" + ");
  }
  