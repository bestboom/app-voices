<script lang="ts">
  import { PRESET_FORMULAS, createExactFormula } from "$lib/client/utils/myVoice";
  import { onMount } from "svelte";
  import { profile, getCurrentPreset } from "./store.svelte";

  let selectedPreset: keyof typeof PRESET_FORMULAS = getCurrentPreset(profile.voiceFormula);

  function handlePresetChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedPreset = target.value as keyof typeof PRESET_FORMULAS;
    updateProfile();
  }

  function updateProfile() {
    profile.voiceFormula = createExactFormula(selectedPreset);
    profile.voiceMode = "advanced";
  }

  // Reactive update when profile changes
  $: {
    selectedPreset = getCurrentPreset(profile.voiceFormula);
  }

  $: currentFormula = PRESET_FORMULAS[selectedPreset];
  $: totalWeight = Object.values(currentFormula).reduce((sum, w) => sum + w, 0);
</script>

<div>
  <div class="flex items-end justify-between">
    <span class="text-xs font-semibold">
      Voice Formula Preset
    </span>
  </div>

  <div class="mt-2">
    <select 
      class="select select-bordered w-full text-xs" 
      on:change={handlePresetChange}
      value={selectedPreset}
    >
      <option value="verse">Verse Voice</option>
      <option value="techio">Techio</option>
    </select>

    <!-- Uncomment if you want to show the formula and total weight -->
    <!-- <div class="mt-2">
      <input 
        type="text" 
        class="input input-bordered w-full text-xs mt-2" 
        value={createExactFormula(selectedPreset)}
        disabled
        title="Active voice formula"
      />
    </div>
    
    <div class="text-xs mt-1 text-right {totalWeight === 1 ? 'text-green-600' : 'text-red-600'}">
      Total: {(totalWeight * 100).toFixed(2)}%
    </div> -->
  </div>
</div>