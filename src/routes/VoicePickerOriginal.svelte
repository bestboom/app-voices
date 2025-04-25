<script lang="ts">
    import { PREDEFINED_FORMULA, createExactFormula } from "$lib/client/utils/myVoice";
    import { onMount } from "svelte";
    import { profile } from "./store.svelte";
  
    // Apply the predefined formula on component initialization
    onMount(() => {
      // Apply exact predefined formula without rounding
      profile.voiceFormula = createExactFormula();
      profile.voiceMode = "advanced"; // Make sure we're using advanced mode
    });
  
    // Calculate the total weight to ensure it's exactly 100%
    const totalWeight = Object.values(PREDEFINED_FORMULA).reduce((sum, weight) => sum + Number(weight), 0);
  </script>
  
  <div>
    <div class="flex items-end justify-between">
      <span class="text-xs font-semibold">
        Voice Formula
      </span>
    </div>
  
    <div class="mt-2">
      <input 
        type="text" 
        class="input input-bordered w-full text-xs" 
        value={createExactFormula()}
        disabled
        title="Predefined voice formula from myVoice.ts"
      />
      <div class="text-xs mt-1 text-right {totalWeight === 1 ? 'text-green-600' : 'text-red-600'}">
        <!-- Total: {(totalWeight * 100).toFixed(2)}% -->
      </div>
    </div>
  </div>
  