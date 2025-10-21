<script lang="ts">
  import { PRESET_FORMULAS, createExactFormula } from "$lib/client/utils/myVoice";
  import { profile, getCurrentPreset } from "./store.svelte";

  const presetKeys = Object.keys(PRESET_FORMULAS) as Array<keyof typeof PRESET_FORMULAS>;

  // Initialize from profile only if formuala matches a preset; otherwise empty
  let initial = getCurrentPreset(profile.voiceFormula);
  let selectedPreset: keyof typeof PRESET_FORMULAS | "" = initial || "";

  function handlePresetChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedPreset = target.value as keyof typeof PRESET_FORMULAS | "";

    if (selectedPreset) {
      // Only update profile when a valid preset is selected
      profile.voiceFormula = createExactFormula(selectedPreset);
      profile.voiceMode = "advanced";
    } else {
      // If user explicitly selects the empty option, clear the profile formula
      profile.voiceFormula = "";
    }
  }

  // derived (safe) values
  $: currentFormula = selectedPreset ? PRESET_FORMULAS[selectedPreset] : null;
  $: totalWeight = currentFormula ? Object.values(currentFormula).reduce((s, w) => s + w, 0) : 0;
</script>

<div>
  <div class="flex items-end justify-between">
    <span class="text-xs font-semibold">Voice Formula Preset</span>
  </div>

  <div class="mt-2">
    <select
      class="select select-bordered w-full text-xs"
      on:change={handlePresetChange}
      bind:value={selectedPreset}
    >
      <option value="">-- Select a voice preset --</option>
      {#each presetKeys as key}
        <option value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
      {/each}
    </select>
  </div>
</div>
