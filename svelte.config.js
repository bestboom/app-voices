import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapterNode from "@sveltejs/adapter-node";
import adapterStatic from "@sveltejs/adapter-static";

let adapter = adapterNode();

if (process.env.ADAPTER === "static") {
  adapter = adapterStatic({
    strict: false,
    fallback: "index.html"
  });
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter,
    paths: {
      base: '/aqua',      // for routing
      // assets: '/aqua'     // for static asset URLs
    },
    env: {
      privatePrefix: "KW_SECRET_",
      publicPrefix: "KW_PUBLIC_"
    }
  }
};

export default config;
