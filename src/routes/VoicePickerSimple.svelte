<script lang="ts">
  interface Props {
    orderedVoices: Voice[][];
  }
  let { orderedVoices }: Props = $props();

  import { type Voice } from "$lib/shared/resources";
  import SelectControl from "$lib/client/components/SelectControl.svelte";
  import { profile } from "./store.svelte";
  import { PREDEFINED_FORMULA } from "$lib/client/utils/myVoice";
  import { serializeVoiceFormula } from "$lib/shared/kokoro";

  // Every time the selected language changes, select the first voice.
  $effect(() => {
    let firstVoice = orderedVoices[0][0];
    profile.voiceFormula = firstVoice.id;
  });
  
  function usePredefinedFormula() {
    // Convert predefined formula to the format expected by the application
    const selections = Object.entries(PREDEFINED_FORMULA).map(([voiceId, weight]) => ({
      voiceId,
      weight: Number(weight)
    }));
    
    profile.voiceFormula = serializeVoiceFormula(selections);
    profile.voiceMode = "advanced"; // Switch to advanced mode to show the formula
  }
</script>

<div class="flex flex-col space-y-2">
  <SelectControl bind:value={profile.voiceFormula} selectClass="w-full mt-[6px]">
    {#each orderedVoices as voicesArr}
      <optgroup label={voicesArr[0].lang.name}>
        {#each voicesArr as vo}
          <option value={vo.id}>{vo.name} ({vo.overallGrade})</option>
        {/each}
      </optgroup>
    {/each}
  </SelectControl>
  
  <div class="flex justify-end">
    <button 
      class="btn btn-xs btn-soft" 
      onclick={usePredefinedFormula}
      title="Use predefined voice formula from myVoice.ts">
      Use Predefined Formula
    </button>
  </div>
</div>
