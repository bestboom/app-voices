<script lang="ts">
  import { onMount } from "svelte";
  import { detectWebGPU } from "$lib/client/utils";
  import { langs, models } from "$lib/shared/resources";
  const { VITE_ADMIN_USERNAME, VITE_ADMIN_PASSWORD } = import.meta.env;
  import SelectControl from "$lib/client/components/SelectControl.svelte";
  import TextareaControl from "$lib/client/components/TextareaControl.svelte";
  import RangeControl from "$lib/client/components/RangeControl.svelte";
  import AudioPlayer from "$lib/client/components/AudioPlayer.svelte";
  import { toaster } from "$lib/client/toaster";
  import VoicePicker from "./VoicePicker.svelte";
  import GenerateButton from "./GenerateButton.svelte";
  import ProfileManager from "./ProfileManager.svelte";
  import ExecutionPlacePicker from "./ExecutionPlacePicker.svelte";
  import VersionChecker from "./VersionChecker.svelte";
  import { profile } from "./store.svelte";
  import { generate } from "./generate";

  // Authentication state
  let username = $state("");
  let password = $state("");
  let authError = $state("");
  let authenticated = $state(false);
  let webgpuSupported = $state(false);
  let loading = $state(false);
  let voiceUrl = $state("");

  onMount(() => {
    webgpuSupported = detectWebGPU();
    // Check existing session
    authenticated = sessionStorage.getItem("authenticated") === "true";
  });

  const handleLogin = () => {
    if (username === VITE_ADMIN_USERNAME && password === VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem("authenticated", "true");
      authenticated = true;
      authError = "";
      // Clear credentials from memory
      username = "";
      password = "";
    } else {
      authError = "Invalid credentials";
      password = ""; // Clear password field on failure
    }
  };

  // const process = async () => {
  //   if (loading) return;
  //   if (!profile.text) return;

  //   loading = true;
  //   try {
  //     voiceUrl = await generate(profile);
  //     toaster.success("Audio generated successfully");
  //   } catch (error) {
  //     console.error(error);
  //     toaster.error((error as any).message ?? "An error occurred, see console");
  //   } finally {
  //     loading = false;
  //   }
  // };
  const process = async () => {
  if (loading) return;
  if (!profile.text) {
    toaster.error("Please enter some text before generating audio.");
    return;
  }

  // 🛑 Prevent generating if no voice preset selected
  if (!profile.voiceFormula || profile.voiceFormula.trim() === "") {
    toaster.error("Please select a voice preset before generating audio.");
    return;
  }

  loading = true;
  try {
    voiceUrl = await generate(profile);
    toaster.success("Audio generated successfully");
  } catch (error) {
    console.error(error);
    toaster.error((error as any).message ?? "An error occurred, see console");
  } finally {
    loading = false;
  }
};

</script>

{#if !authenticated}
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-base-100 rounded-lg shadow-xl p-6 space-y-4">
      <div class="text-center">
        <h1 class="text-2xl font-bold mb-2">Admin Access Required</h1>
        <p class="text-sm text-gray-500">Enter privileged credentials to continue</p>
      </div>

      <div class="space-y-4">
        <input
          type="text"
          bind:value={username}
          placeholder="Username"
          class="input input-bordered w-full"
        />
        <input
          type="password"
          bind:value={password}
          placeholder="Password"
          class="input input-bordered w-full"
          onkeyup={(e) => e.key === 'Enter' && handleLogin()}
        />
        
        {#if authError}
          <div class="text-error text-sm text-center">{authError}</div>
        {/if}

        <button 
          onclick={handleLogin}
          class="btn btn-primary w-full"
        >
          Authenticate
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="space-y-4">
    <VersionChecker />

    <h2 class="text-xl font-bold">Input</h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ProfileManager />
      <ExecutionPlacePicker />

      <SelectControl
        bind:value={profile.acceleration}
        disabled={profile.executionPlace === "api"}
        title={profile.executionPlace === "browser"
          ? "Acceleration"
          : "Acceleration (Browser only)"}
        selectClass="w-full"
      >
        <option value="cpu">CPU</option>
        {#if webgpuSupported}
          <option value="webgpu">WebGPU (Faster)</option>
        {:else}
          <option disabled>WebGPU (not supported by your browser)</option>
        {/if}
      </SelectControl>

      <SelectControl
        bind:value={profile.model}
        title="Model quantization"
        selectClass="w-full"
      >
        {#each models as mo}
          <option value={mo.id}>
            {mo.size} - {mo.id} ({mo.quantization})
          </option>
        {/each}
      </SelectControl>

      <SelectControl
        bind:value={profile.lang}
        title="Language accent (region)"
        selectClass="w-full"
      >
        {#each langs as lng}
          <option value={lng.id}>{lng.name}</option>
        {/each}
      </SelectControl>

      <VoicePicker />
    </div>

    <TextareaControl
      bind:value={profile.text}
      title="Text to process"
      helpText="You can add synthetic pauses by adding a silence tags measured in seconds. E.g. Hello[1s]Kokoro[0.2s]Web"
      textareaClass="w-full"
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <RangeControl
        bind:value={profile.speed}
        hideValue={true}
        title={`Speed ${profile.speed}x`}
        inputClass="w-full max-w-[400px]"
        min="0.1"
        max="2"
        step="0.1"
      />

      <GenerateButton {loading} onclick={() => process()} />
    </div>

    {#if voiceUrl !== ""}
      <div class="space-y-4 pt-2">
        <h2 class="text-xl font-bold">Output</h2>
        <AudioPlayer audioUrl={voiceUrl} showSpectrogram={true} />
      </div>
    {/if}
  </div>
{/if}