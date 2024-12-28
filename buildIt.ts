// deno-lint-ignore-file no-explicit-any
import type { Config } from "jsr:@ndh/config@1.0.2";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.11.0";
import { build, stop } from "npm:esbuild@0.24.0";

/** 
 * builds and bundles an entrypoint into a single ESM output. 
 * @param {Config} cfg - the configuration to build from, object that contains:        
 *    - Out: string - the folder to place the bundle in (defaults to 'dist')   
 *    - Entry: string[] - the entry points to build from (defaults to ["./src/main.ts"])   
 *    - Minify: boolean - whether or not to minify the bundle
 */
export async function buildIt(cfg: Config) {
   console.log(`Bundling ${cfg.Entry} to ${cfg.OutPath} - minified = ${cfg.Minify}`)
   await build({
      plugins: [...denoPlugins()],
      entryPoints: cfg.Entry,
      outfile: cfg.OutPath,
      bundle: true,
      minify: cfg.Minify,
      keepNames: true,
      banner: { js: '// deno-lint-ignore-file' },
      format: "esm"
   }).catch((e: any) => console.info(e));
   stop();
}
