import type { Config} from "jsr:@ndh/config@1.0.2";
import { getConfig } from "jsr:@ndh/config@1.0.2";

// If Deno.args[0] = -h or ? == 
// we just show help text and exit.
if (Deno.args[0] === '-h' || Deno.args[0] === '?') {
   console.log(`
Build Help --   
Usage:
Commandline arg0:
-h or ? = this help
else ...

Commandline arg0 = Build Entry: string[] - default = ["./src/main.ts"]
Commandline arg1 = Build Minify: boolean - default = false
Commandline arg2 = Build Out: string - default = "dist"

/src/dev.json - build:
Entry: string[] - default = ["./src/main.ts"]
Minify: boolean - true or false (defaults to false)
Out: string - the folder to place the bundle in (defaults to 'dist')`

   );
   Deno.exit(0)
}

/** 
 * Our default build configuration object
 * Any commandline-args must follow the order of this cfg 
*/
const requiredCfg = {
   "BundleName": "bundle.js",             
   "Entry": ["./src/main.ts"], 
   "Minify": false, 
   "Bundle": true,
   "OutPath": "dist", 
} satisfies Config

/** gets an existing config, or builds one.
 *  @param {string} - the name of the configuration object
 */
const cfg = getConfig("build", Deno.args, requiredCfg)

export const Entry = cfg.Entry || ["./src/main.ts"]
export const Minify = cfg.Minify || false
export const Bundle = cfg.Bundle || false
export const Name = cfg.BundleName || "bundle.js"
export const OutPath = (cfg.OutPath && cfg.OutPath.length > 0)
   ? `./${cfg.OutPath}/${Name}`
   : `./${Name}`
